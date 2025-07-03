"""
Workflow automation models for CounselFlow
Supports visual workflow building, automation, and task management
"""
from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey, JSON, Enum as SQLEnum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from enum import Enum
from app.core.database import Base

class WorkflowStatus(str, Enum):
    DRAFT = "draft"
    ACTIVE = "active"
    PAUSED = "paused"
    COMPLETED = "completed"
    ARCHIVED = "archived"

class TaskStatus(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"

class WorkflowPriority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"

class Workflow(Base):
    """Workflow definition model"""
    __tablename__ = "workflows"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    status = Column(SQLEnum(WorkflowStatus), default=WorkflowStatus.DRAFT)
    priority = Column(SQLEnum(WorkflowPriority), default=WorkflowPriority.MEDIUM)
    
    # Workflow definition as JSON
    definition = Column(JSON, nullable=False)  # Visual workflow builder output
    triggers = Column(JSON, nullable=True)     # Event triggers
    variables = Column(JSON, nullable=True)    # Workflow variables
    
    # Ownership and tracking
    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    assigned_to = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    # Automation settings
    auto_assign = Column(Boolean, default=False)
    deadline_hours = Column(Integer, nullable=True)
    escalation_rules = Column(JSON, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    started_at = Column(DateTime(timezone=True), nullable=True)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    creator = relationship("User", foreign_keys=[created_by], back_populates="created_workflows")
    assignee = relationship("User", foreign_keys=[assigned_to], back_populates="assigned_workflows")
    instances = relationship("WorkflowInstance", back_populates="workflow", cascade="all, delete-orphan")
    tasks = relationship("WorkflowTask", back_populates="workflow", cascade="all, delete-orphan")

class WorkflowInstance(Base):
    """Individual workflow execution instance"""
    __tablename__ = "workflow_instances"
    
    id = Column(Integer, primary_key=True, index=True)
    workflow_id = Column(Integer, ForeignKey("workflows.id"), nullable=False)
    
    status = Column(SQLEnum(WorkflowStatus), default=WorkflowStatus.ACTIVE)
    current_step = Column(String(100), nullable=True)
    
    # Instance data
    context_data = Column(JSON, nullable=True)  # Runtime context
    execution_log = Column(JSON, nullable=True)  # Step execution history
    
    # Execution tracking
    started_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    progress_percentage = Column(Integer, default=0)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    completed_at = Column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    workflow = relationship("Workflow", back_populates="instances")
    starter = relationship("User", back_populates="workflow_instances")
    tasks = relationship("WorkflowTask", back_populates="instance", cascade="all, delete-orphan")

class WorkflowTask(Base):
    """Individual tasks within workflow instances"""
    __tablename__ = "workflow_tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    workflow_id = Column(Integer, ForeignKey("workflows.id"), nullable=False)
    instance_id = Column(Integer, ForeignKey("workflow_instances.id"), nullable=True)
    
    # Task definition
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    task_type = Column(String(50), nullable=False)  # manual, automated, approval, etc.
    
    status = Column(SQLEnum(TaskStatus), default=TaskStatus.PENDING)
    priority = Column(SQLEnum(WorkflowPriority), default=WorkflowPriority.MEDIUM)
    
    # Assignment
    assigned_to = Column(Integer, ForeignKey("users.id"), nullable=True)
    assigned_role = Column(String(100), nullable=True)  # Role-based assignment
    
    # Task configuration
    configuration = Column(JSON, nullable=True)  # Task-specific settings
    form_data = Column(JSON, nullable=True)      # User input data
    
    # Dependencies and sequencing
    depends_on = Column(JSON, nullable=True)     # Task IDs this depends on
    step_order = Column(Integer, default=0)
    
    # Timing
    due_date = Column(DateTime(timezone=True), nullable=True)
    estimated_hours = Column(Integer, nullable=True)
    actual_hours = Column(Integer, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    started_at = Column(DateTime(timezone=True), nullable=True)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    workflow = relationship("Workflow", back_populates="tasks")
    instance = relationship("WorkflowInstance", back_populates="tasks")
    assignee = relationship("User", back_populates="workflow_tasks")

class WorkflowTemplate(Base):
    """Reusable workflow templates"""
    __tablename__ = "workflow_templates"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String(100), nullable=False)  # litigation, contract, compliance, etc.
    
    # Template definition
    template_definition = Column(JSON, nullable=False)
    default_variables = Column(JSON, nullable=True)
    
    # Usage tracking
    usage_count = Column(Integer, default=0)
    is_public = Column(Boolean, default=False)
    
    # Ownership
    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    creator = relationship("User", back_populates="workflow_templates")

class WorkflowNotification(Base):
    """Workflow-related notifications and alerts"""
    __tablename__ = "workflow_notifications"
    
    id = Column(Integer, primary_key=True, index=True)
    workflow_id = Column(Integer, ForeignKey("workflows.id"), nullable=True)
    instance_id = Column(Integer, ForeignKey("workflow_instances.id"), nullable=True)
    task_id = Column(Integer, ForeignKey("workflow_tasks.id"), nullable=True)
    
    # Notification details
    recipient_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    notification_type = Column(String(50), nullable=False)  # reminder, escalation, completion
    subject = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    
    # Delivery
    is_read = Column(Boolean, default=False)
    sent_at = Column(DateTime(timezone=True), nullable=True)
    read_at = Column(DateTime(timezone=True), nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    recipient = relationship("User", back_populates="workflow_notifications")
