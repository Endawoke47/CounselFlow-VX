"""
Document Version Control and Collaboration System
Provides comprehensive document versioning, diff tracking, and real-time collaboration
"""
from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
from datetime import datetime
from typing import List, Dict, Any, Optional

from app.core.database import Base

class DocumentVersion(Base):
    """Document version tracking model"""
    __tablename__ = "document_versions"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    document_id = Column(UUID(as_uuid=True), ForeignKey("documents.id"), nullable=False)
    version_number = Column(Integer, nullable=False)
    title = Column(String(500), nullable=False)
    content = Column(Text, nullable=False)
    content_hash = Column(String(64), nullable=False)  # SHA-256 hash for integrity
    author_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    # Version metadata
    change_summary = Column(Text)
    change_type = Column(String(50), nullable=False)  # major, minor, patch
    tags = Column(JSON, default=list)
    
    # Collaboration data
    collaborators = Column(JSON, default=list)  # List of user IDs
    review_status = Column(String(50), default="draft")  # draft, review, approved, rejected
    review_comments = Column(JSON, default=list)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    published_at = Column(DateTime(timezone=True))
    
    # Relationships
    document = relationship("Document", back_populates="document_versions")
    author = relationship("User", foreign_keys=[author_id])
    comments = relationship("DocumentComment", back_populates="version")
    
class DocumentComment(Base):
    """Document comments and annotations"""
    __tablename__ = "document_comments"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    version_id = Column(UUID(as_uuid=True), ForeignKey("document_versions.id"), nullable=False)
    author_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    # Comment content
    content = Column(Text, nullable=False)
    comment_type = Column(String(50), default="general")  # general, suggestion, correction
    
    # Position in document
    selection_start = Column(Integer)
    selection_end = Column(Integer)
    context_text = Column(Text)
    
    # Status and threading
    status = Column(String(50), default="open")  # open, resolved, closed
    parent_comment_id = Column(UUID(as_uuid=True), ForeignKey("document_comments.id"))
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    resolved_at = Column(DateTime(timezone=True))
    
    # Relationships
    version = relationship("DocumentVersion", back_populates="comments")
    author = relationship("User")
    parent_comment = relationship("DocumentComment", remote_side=[id])
    replies = relationship("DocumentComment", cascade="all, delete-orphan")

class DocumentLock(Base):
    """Document editing locks for collaboration"""
    __tablename__ = "document_locks"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    document_id = Column(UUID(as_uuid=True), ForeignKey("documents.id"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    # Lock details
    lock_type = Column(String(50), nullable=False)  # exclusive, shared, section
    section_start = Column(Integer)  # For section locks
    section_end = Column(Integer)
    
    # Lock metadata
    acquired_at = Column(DateTime(timezone=True), server_default=func.now())
    expires_at = Column(DateTime(timezone=True), nullable=False)
    is_active = Column(Boolean, default=True)
    
    # Relationships
    document = relationship("Document")
    user = relationship("User")

class DocumentDiff(Base):
    """Document change tracking and diff storage"""
    __tablename__ = "document_diffs"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    from_version_id = Column(UUID(as_uuid=True), ForeignKey("document_versions.id"), nullable=False)
    to_version_id = Column(UUID(as_uuid=True), ForeignKey("document_versions.id"), nullable=False)
    
    # Diff data
    diff_data = Column(JSON, nullable=False)  # Structured diff information
    statistics = Column(JSON, default=dict)  # Lines added/removed, word count changes
    
    # Analysis
    similarity_score = Column(Integer)  # 0-100 percentage similarity
    significant_changes = Column(JSON, default=list)  # AI-identified significant changes
    
    # Timestamps
    generated_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    from_version = relationship("DocumentVersion", foreign_keys=[from_version_id])
    to_version = relationship("DocumentVersion", foreign_keys=[to_version_id])

class CollaborationSession(Base):
    """Real-time collaboration sessions"""
    __tablename__ = "collaboration_sessions"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    document_id = Column(UUID(as_uuid=True), ForeignKey("documents.id"), nullable=False)
    
    # Session details
    session_name = Column(String(200))
    is_active = Column(Boolean, default=True)
    max_participants = Column(Integer, default=10)
    
    # Permissions
    view_permissions = Column(JSON, default=list)  # User IDs with view access
    edit_permissions = Column(JSON, default=list)  # User IDs with edit access
    admin_permissions = Column(JSON, default=list)  # User IDs with admin access
    
    # Settings
    auto_save_interval = Column(Integer, default=30)  # seconds
    conflict_resolution = Column(String(50), default="last_writer_wins")
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    ended_at = Column(DateTime(timezone=True))
    
    # Relationships
    document = relationship("Document")
