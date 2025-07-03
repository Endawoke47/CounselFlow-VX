"""
Document Version Control Service
Handles document versioning, diff generation, and collaboration management
"""
import hashlib
import json
import difflib
from typing import List, Dict, Any, Optional, Tuple
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from sqlalchemy import desc, and_, or_
import asyncio
import logging

from app.models.document_versioning import (
    DocumentVersion, DocumentComment, DocumentLock, 
    DocumentDiff, CollaborationSession
)
from app.core.websocket import ConnectionManager
from app.core.security import AuditLogger

logger = logging.getLogger(__name__)

class DocumentVersionService:
    """Service for managing document versions and collaboration"""
    
    def __init__(self, db: Session, connection_manager: ConnectionManager):
        self.db = db
        self.connection_manager = connection_manager
        self.audit_logger = AuditLogger()
    
    async def create_version(
        self, 
        document_id: str, 
        title: str, 
        content: str, 
        author_id: str,
        change_summary: Optional[str] = None,
        change_type: str = "minor"
    ) -> DocumentVersion:
        """Create a new document version"""
        try:
            # Generate content hash for integrity
            content_hash = hashlib.sha256(content.encode()).hexdigest()
            
            # Get next version number
            latest_version = self.db.query(DocumentVersion)\
                .filter(DocumentVersion.document_id == document_id)\
                .order_by(desc(DocumentVersion.version_number))\
                .first()
            
            next_version = (latest_version.version_number + 1) if latest_version else 1
            
            # Create new version
            version = DocumentVersion(
                document_id=document_id,
                version_number=next_version,
                title=title,
                content=content,
                content_hash=content_hash,
                author_id=author_id,
                change_summary=change_summary,
                change_type=change_type
            )
            
            self.db.add(version)
            self.db.commit()
            self.db.refresh(version)
            
            # Generate diff if there's a previous version
            if latest_version:
                await self._generate_diff(latest_version.id, version.id)
            
            # Notify collaborators
            await self._notify_version_created(version)
            
            # Log the action
            self.audit_logger.log_security_event(
                event_type="document_version_created",
                user_id=author_id,
                details={
                    "document_id": str(document_id),
                    "version_id": str(version.id),
                    "version_number": next_version,
                    "change_type": change_type
                }
            )
            
            return version
            
        except Exception as e:
            logger.error(f"Error creating document version: {str(e)}")
            self.db.rollback()
            raise
    
    async def get_version_history(
        self, 
        document_id: str, 
        limit: int = 50
    ) -> List[DocumentVersion]:
        """Get version history for a document"""
        return self.db.query(DocumentVersion)\
            .filter(DocumentVersion.document_id == document_id)\
            .order_by(desc(DocumentVersion.version_number))\
            .limit(limit)\
            .all()
    
    async def get_version_diff(
        self, 
        from_version_id: str, 
        to_version_id: str
    ) -> Optional[DocumentDiff]:
        """Get diff between two versions"""
        return self.db.query(DocumentDiff)\
            .filter(
                and_(
                    DocumentDiff.from_version_id == from_version_id,
                    DocumentDiff.to_version_id == to_version_id
                )
            ).first()
    
    async def _generate_diff(self, from_version_id: str, to_version_id: str):
        """Generate diff between two versions"""
        try:
            from_version = self.db.query(DocumentVersion).get(from_version_id)
            to_version = self.db.query(DocumentVersion).get(to_version_id)
            
            if not from_version or not to_version:
                return
            
            # Generate text diff
            from_lines = from_version.content.splitlines()
            to_lines = to_version.content.splitlines()
            
            diff = list(difflib.unified_diff(
                from_lines, to_lines,
                fromfile=f"Version {from_version.version_number}",
                tofile=f"Version {to_version.version_number}",
                lineterm=""
            ))
            
            # Calculate statistics
            added_lines = sum(1 for line in diff if line.startswith('+') and not line.startswith('+++'))
            removed_lines = sum(1 for line in diff if line.startswith('-') and not line.startswith('---'))
            
            # Calculate similarity score
            similarity = difflib.SequenceMatcher(None, from_version.content, to_version.content)
            similarity_score = int(similarity.ratio() * 100)
            
            # Store diff
            document_diff = DocumentDiff(
                from_version_id=from_version_id,
                to_version_id=to_version_id,
                diff_data={
                    "unified_diff": diff,
                    "changes": {
                        "added": added_lines,
                        "removed": removed_lines,
                        "modified": len([line for line in diff if line.startswith('@@')])
                    }
                },
                statistics={
                    "lines_added": added_lines,
                    "lines_removed": removed_lines,
                    "total_changes": added_lines + removed_lines,
                    "from_word_count": len(from_version.content.split()),
                    "to_word_count": len(to_version.content.split())
                },
                similarity_score=similarity_score
            )
            
            self.db.add(document_diff)
            self.db.commit()
            
        except Exception as e:
            logger.error(f"Error generating diff: {str(e)}")
    
    async def create_comment(
        self,
        version_id: str,
        author_id: str,
        content: str,
        comment_type: str = "general",
        selection_start: Optional[int] = None,
        selection_end: Optional[int] = None,
        parent_comment_id: Optional[str] = None
    ) -> DocumentComment:
        """Create a comment on a document version"""
        try:
            comment = DocumentComment(
                version_id=version_id,
                author_id=author_id,
                content=content,
                comment_type=comment_type,
                selection_start=selection_start,
                selection_end=selection_end,
                parent_comment_id=parent_comment_id
            )
            
            self.db.add(comment)
            self.db.commit()
            self.db.refresh(comment)
            
            # Notify collaborators
            await self._notify_comment_created(comment)
            
            return comment
            
        except Exception as e:
            logger.error(f"Error creating comment: {str(e)}")
            self.db.rollback()
            raise
    
    async def acquire_lock(
        self,
        document_id: str,
        user_id: str,
        lock_type: str = "exclusive",
        duration_minutes: int = 30
    ) -> Optional[DocumentLock]:
        """Acquire a lock on a document for editing"""
        try:
            # Check for existing locks
            existing_lock = self.db.query(DocumentLock)\
                .filter(
                    and_(
                        DocumentLock.document_id == document_id,
                        DocumentLock.is_active == True,
                        DocumentLock.expires_at > datetime.utcnow()
                    )
                ).first()
            
            if existing_lock and lock_type == "exclusive":
                return None  # Cannot acquire exclusive lock
            
            # Create new lock
            expires_at = datetime.utcnow() + timedelta(minutes=duration_minutes)
            lock = DocumentLock(
                document_id=document_id,
                user_id=user_id,
                lock_type=lock_type,
                expires_at=expires_at
            )
            
            self.db.add(lock)
            self.db.commit()
            self.db.refresh(lock)
            
            # Notify other users about the lock
            await self._notify_lock_acquired(lock)
            
            return lock
            
        except Exception as e:
            logger.error(f"Error acquiring lock: {str(e)}")
            self.db.rollback()
            raise
    
    async def release_lock(self, lock_id: str, user_id: str) -> bool:
        """Release a document lock"""
        try:
            lock = self.db.query(DocumentLock)\
                .filter(
                    and_(
                        DocumentLock.id == lock_id,
                        DocumentLock.user_id == user_id,
                        DocumentLock.is_active == True
                    )
                ).first()
            
            if lock:
                lock.is_active = False
                self.db.commit()
                
                # Notify about lock release
                await self._notify_lock_released(lock)
                return True
            
            return False
            
        except Exception as e:
            logger.error(f"Error releasing lock: {str(e)}")
            return False
    
    async def start_collaboration_session(
        self,
        document_id: str,
        session_name: str,
        admin_user_id: str
    ) -> CollaborationSession:
        """Start a real-time collaboration session"""
        try:
            session = CollaborationSession(
                document_id=document_id,
                session_name=session_name,
                admin_permissions=[admin_user_id]
            )
            
            self.db.add(session)
            self.db.commit()
            self.db.refresh(session)
            
            # Create WebSocket room for collaboration
            room_name = f"doc_collab_{session.id}"
            await self.connection_manager.create_room(room_name)
            
            return session
            
        except Exception as e:
            logger.error(f"Error starting collaboration session: {str(e)}")
            self.db.rollback()
            raise
    
    async def _notify_version_created(self, version: DocumentVersion):
        """Notify collaborators about new version"""
        message = {
            "type": "document_version_created",
            "document_id": str(version.document_id),
            "version_id": str(version.id),
            "version_number": version.version_number,
            "author_id": str(version.author_id),
            "change_summary": version.change_summary,
            "timestamp": datetime.utcnow().isoformat()
        }
        
        room_name = f"document_{version.document_id}"
        await self.connection_manager.broadcast_to_room(room_name, message)
    
    async def _notify_comment_created(self, comment: DocumentComment):
        """Notify about new comment"""
        message = {
            "type": "document_comment_created",
            "comment_id": str(comment.id),
            "version_id": str(comment.version_id),
            "author_id": str(comment.author_id),
            "content": comment.content,
            "comment_type": comment.comment_type,
            "timestamp": datetime.utcnow().isoformat()
        }
        
        # Get document ID from version
        version = self.db.query(DocumentVersion).get(comment.version_id)
        if version:
            room_name = f"document_{version.document_id}"
            await self.connection_manager.broadcast_to_room(room_name, message)
    
    async def _notify_lock_acquired(self, lock: DocumentLock):
        """Notify about lock acquisition"""
        message = {
            "type": "document_lock_acquired",
            "lock_id": str(lock.id),
            "document_id": str(lock.document_id),
            "user_id": str(lock.user_id),
            "lock_type": lock.lock_type,
            "expires_at": lock.expires_at.isoformat(),
            "timestamp": datetime.utcnow().isoformat()
        }
        
        room_name = f"document_{lock.document_id}"
        await self.connection_manager.broadcast_to_room(room_name, message)
    
    async def _notify_lock_released(self, lock: DocumentLock):
        """Notify about lock release"""
        message = {
            "type": "document_lock_released",
            "lock_id": str(lock.id),
            "document_id": str(lock.document_id),
            "user_id": str(lock.user_id),
            "timestamp": datetime.utcnow().isoformat()
        }
        
        room_name = f"document_{lock.document_id}"
        await self.connection_manager.broadcast_to_room(room_name, message)

class CollaborationService:
    """Service for real-time document collaboration"""
    
    def __init__(self, connection_manager: ConnectionManager):
        self.connection_manager = connection_manager
    
    async def handle_real_time_edit(
        self,
        document_id: str,
        user_id: str,
        operation: Dict[str, Any]
    ):
        """Handle real-time editing operations"""
        message = {
            "type": "document_edit",
            "document_id": document_id,
            "user_id": user_id,
            "operation": operation,
            "timestamp": datetime.utcnow().isoformat()
        }
        
        room_name = f"document_{document_id}"
        await self.connection_manager.broadcast_to_room(room_name, message, exclude_user=user_id)
    
    async def handle_cursor_position(
        self,
        document_id: str,
        user_id: str,
        position: Dict[str, Any]
    ):
        """Handle cursor position updates"""
        message = {
            "type": "cursor_position",
            "document_id": document_id,
            "user_id": user_id,
            "position": position,
            "timestamp": datetime.utcnow().isoformat()
        }
        
        room_name = f"document_{document_id}"
        await self.connection_manager.broadcast_to_room(room_name, message, exclude_user=user_id)
    
    async def handle_selection_change(
        self,
        document_id: str,
        user_id: str,
        selection: Dict[str, Any]
    ):
        """Handle text selection changes"""
        message = {
            "type": "selection_change",
            "document_id": document_id,
            "user_id": user_id,
            "selection": selection,
            "timestamp": datetime.utcnow().isoformat()
        }
        
        room_name = f"document_{document_id}"
        await self.connection_manager.broadcast_to_room(room_name, message, exclude_user=user_id)
