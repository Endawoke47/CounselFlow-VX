"""
Document Version Control API Routes
Handles document versioning, collaboration, and real-time editing
"""
from fastapi import APIRouter, Depends, HTTPException, status, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from datetime import datetime
import logging

from app.core.database import get_db
from app.core.auth import get_current_user
from app.core.websocket import ConnectionManager
from app.services.document_version_service import DocumentVersionService, CollaborationService
from app.models import User

logger = logging.getLogger(__name__)
router = APIRouter()

# Initialize services
connection_manager = ConnectionManager()
collaboration_service = CollaborationService(connection_manager)

# Pydantic models for API requests/responses
class CreateVersionRequest(BaseModel):
    title: str = Field(..., min_length=1, max_length=500)
    content: str = Field(..., min_length=1)
    change_summary: Optional[str] = Field(None, max_length=1000)
    change_type: str = Field(default="minor", pattern="^(major|minor|patch)$")

class VersionResponse(BaseModel):
    id: str
    document_id: str
    version_number: int
    title: str
    content: str
    content_hash: str
    author_id: str
    change_summary: Optional[str]
    change_type: str
    review_status: str
    created_at: datetime
    published_at: Optional[datetime]

class CreateCommentRequest(BaseModel):
    content: str = Field(..., min_length=1, max_length=5000)
    comment_type: str = Field(default="general", pattern="^(general|suggestion|correction)$")
    selection_start: Optional[int] = None
    selection_end: Optional[int] = None
    parent_comment_id: Optional[str] = None

class CommentResponse(BaseModel):
    id: str
    version_id: str
    author_id: str
    content: str
    comment_type: str
    status: str
    selection_start: Optional[int]
    selection_end: Optional[int]
    created_at: datetime
    updated_at: Optional[datetime]

class AcquireLockRequest(BaseModel):
    lock_type: str = Field(default="exclusive", pattern="^(exclusive|shared|section)$")
    duration_minutes: int = Field(default=30, ge=1, le=480)  # Max 8 hours
    section_start: Optional[int] = None
    section_end: Optional[int] = None

class LockResponse(BaseModel):
    id: str
    document_id: str
    user_id: str
    lock_type: str
    acquired_at: datetime
    expires_at: datetime
    is_active: bool

class CollaborationSessionRequest(BaseModel):
    session_name: str = Field(..., min_length=1, max_length=200)
    max_participants: int = Field(default=10, ge=1, le=50)
    auto_save_interval: int = Field(default=30, ge=10, le=300)

class DiffResponse(BaseModel):
    id: str
    from_version_id: str
    to_version_id: str
    similarity_score: int
    statistics: Dict[str, Any]
    generated_at: datetime

@router.post("/documents/{document_id}/versions", response_model=VersionResponse)
async def create_version(
    document_id: str,
    request: CreateVersionRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new version of a document"""
    try:
        service = DocumentVersionService(db, connection_manager)
        
        version = await service.create_version(
            document_id=document_id,
            title=request.title,
            content=request.content,
            author_id=current_user.id,
            change_summary=request.change_summary,
            change_type=request.change_type
        )
        
        return VersionResponse(
            id=str(version.id),
            document_id=str(version.document_id),
            version_number=version.version_number,
            title=version.title,
            content=version.content,
            content_hash=version.content_hash,
            author_id=str(version.author_id),
            change_summary=version.change_summary,
            change_type=version.change_type,
            review_status=version.review_status,
            created_at=version.created_at,
            published_at=version.published_at
        )
        
    except Exception as e:
        logger.error(f"Error creating version: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create version"
        )

@router.get("/documents/{document_id}/versions", response_model=List[VersionResponse])
async def get_version_history(
    document_id: str,
    limit: int = 50,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get version history for a document"""
    try:
        service = DocumentVersionService(db, connection_manager)
        versions = await service.get_version_history(document_id, limit)
        
        return [
            VersionResponse(
                id=str(v.id),
                document_id=str(v.document_id),
                version_number=v.version_number,
                title=v.title,
                content=v.content,
                content_hash=v.content_hash,
                author_id=str(v.author_id),
                change_summary=v.change_summary,
                change_type=v.change_type,
                review_status=v.review_status,
                created_at=v.created_at,
                published_at=v.published_at
            ) for v in versions
        ]
        
    except Exception as e:
        logger.error(f"Error getting version history: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get version history"
        )

@router.get("/versions/{from_version_id}/diff/{to_version_id}", response_model=DiffResponse)
async def get_version_diff(
    from_version_id: str,
    to_version_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get diff between two document versions"""
    try:
        service = DocumentVersionService(db, connection_manager)
        diff = await service.get_version_diff(from_version_id, to_version_id)
        
        if not diff:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Diff not found"
            )
        
        return DiffResponse(
            id=str(diff.id),
            from_version_id=str(diff.from_version_id),
            to_version_id=str(diff.to_version_id),
            similarity_score=diff.similarity_score,
            statistics=diff.statistics,
            generated_at=diff.generated_at
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting diff: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get diff"
        )

@router.post("/versions/{version_id}/comments", response_model=CommentResponse)
async def create_comment(
    version_id: str,
    request: CreateCommentRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a comment on a document version"""
    try:
        service = DocumentVersionService(db, connection_manager)
        
        comment = await service.create_comment(
            version_id=version_id,
            author_id=current_user.id,
            content=request.content,
            comment_type=request.comment_type,
            selection_start=request.selection_start,
            selection_end=request.selection_end,
            parent_comment_id=request.parent_comment_id
        )
        
        return CommentResponse(
            id=str(comment.id),
            version_id=str(comment.version_id),
            author_id=str(comment.author_id),
            content=comment.content,
            comment_type=comment.comment_type,
            status=comment.status,
            selection_start=comment.selection_start,
            selection_end=comment.selection_end,
            created_at=comment.created_at,
            updated_at=comment.updated_at
        )
        
    except Exception as e:
        logger.error(f"Error creating comment: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create comment"
        )

@router.post("/documents/{document_id}/lock", response_model=LockResponse)
async def acquire_lock(
    document_id: str,
    request: AcquireLockRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Acquire a lock on a document for editing"""
    try:
        service = DocumentVersionService(db, connection_manager)
        
        lock = await service.acquire_lock(
            document_id=document_id,
            user_id=current_user.id,
            lock_type=request.lock_type,
            duration_minutes=request.duration_minutes
        )
        
        if not lock:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Document is already locked"
            )
        
        return LockResponse(
            id=str(lock.id),
            document_id=str(lock.document_id),
            user_id=str(lock.user_id),
            lock_type=lock.lock_type,
            acquired_at=lock.acquired_at,
            expires_at=lock.expires_at,
            is_active=lock.is_active
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error acquiring lock: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to acquire lock"
        )

@router.delete("/locks/{lock_id}")
async def release_lock(
    lock_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Release a document lock"""
    try:
        service = DocumentVersionService(db, connection_manager)
        
        success = await service.release_lock(lock_id, current_user.id)
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Lock not found or not owned by user"
            )
        
        return {"message": "Lock released successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error releasing lock: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to release lock"
        )

@router.post("/documents/{document_id}/collaboration")
async def start_collaboration_session(
    document_id: str,
    request: CollaborationSessionRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Start a real-time collaboration session"""
    try:
        service = DocumentVersionService(db, connection_manager)
        
        session = await service.start_collaboration_session(
            document_id=document_id,
            session_name=request.session_name,
            admin_user_id=current_user.id
        )
        
        return {
            "session_id": str(session.id),
            "document_id": str(session.document_id),
            "session_name": session.session_name,
            "created_at": session.created_at,
            "websocket_url": f"/api/v1/document-versions/ws/collaborate/{session.id}"
        }
        
    except Exception as e:
        logger.error(f"Error starting collaboration session: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to start collaboration session"
        )

@router.websocket("/ws/collaborate/{session_id}")
async def websocket_collaborate(
    websocket: WebSocket,
    session_id: str,
    token: str
):
    """WebSocket endpoint for real-time collaboration"""
    try:
        # Verify token and get user (implement token verification)
        # user = await verify_websocket_token(token)
        
        await connection_manager.connect(websocket, f"collaborate_{session_id}")
        
        try:
            while True:
                data = await websocket.receive_json()
                
                # Handle different collaboration operations
                operation_type = data.get("type")
                
                if operation_type == "edit":
                    await collaboration_service.handle_real_time_edit(
                        document_id=data.get("document_id"),
                        user_id=data.get("user_id"),
                        operation=data.get("operation")
                    )
                elif operation_type == "cursor":
                    await collaboration_service.handle_cursor_position(
                        document_id=data.get("document_id"),
                        user_id=data.get("user_id"),
                        position=data.get("position")
                    )
                elif operation_type == "selection":
                    await collaboration_service.handle_selection_change(
                        document_id=data.get("document_id"),
                        user_id=data.get("user_id"),
                        selection=data.get("selection")
                    )
                
        except WebSocketDisconnect:
            connection_manager.disconnect(websocket, f"collaborate_{session_id}")
            
    except Exception as e:
        logger.error(f"WebSocket collaboration error: {str(e)}")
        if websocket.client_state.name != "DISCONNECTED":
            await websocket.close(code=1000)
