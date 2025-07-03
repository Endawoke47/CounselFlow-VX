"""
Pydantic schemas for workflow automation in CounselFlow
Defines request/response models for workflow API endpoints
"""
from typing import List, Dict, Any, Optional, Union
from pydantic import BaseModel, Field, validator
from datetime import datetime
from enum import Enum

class WorkflowStatusEnum(str, Enum):
    DRAFT = "draft"
    ACTIVE = "active"
    PAUSED = "paused"
    COMPLETED = "completed"
    ARCHIVED = "archived"

class TaskStatusEnum(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"

class WorkflowPriorityEnum(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"

# Workflow Schemas
class WorkflowBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    priority: WorkflowPriorityEnum = WorkflowPriorityEnum.MEDIUM

class WorkflowCreate(WorkflowBase):
    definition: Dict[str, Any] = Field(..., description="Workflow definition with steps and logic")
    triggers: Optional[Dict[str, Any]] = None
    variables: Optional[Dict[str, Any]] = None
    auto_assign: bool = False
    deadline_hours: Optional[int] = None
    escalation_rules: Optional[Dict[str, Any]] = None

class WorkflowUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[WorkflowStatusEnum] = None
    priority: Optional[WorkflowPriorityEnum] = None
    definition: Optional[Dict[str, Any]] = None

class WorkflowResponse(WorkflowBase):
    id: int
    status: WorkflowStatusEnum
    created_by: int
    assigned_to: Optional[int] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Workflow Instance Schemas
class WorkflowInstanceBase(BaseModel):
    context_data: Optional[Dict[str, Any]] = None

class WorkflowInstanceCreate(WorkflowInstanceBase):
    pass

class WorkflowInstanceResponse(WorkflowInstanceBase):
    id: int
    workflow_id: int
    status: WorkflowStatusEnum
    current_step: Optional[str] = None
    progress_percentage: int = 0
    started_by: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    execution_log: Optional[List[Dict[str, Any]]] = None
    
    class Config:
        from_attributes = True

# Workflow Task Schemas
class WorkflowTaskBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    task_type: str = Field(..., description="Type of task: manual, automated, approval, etc.")
    priority: WorkflowPriorityEnum = WorkflowPriorityEnum.MEDIUM

class WorkflowTaskCreate(WorkflowTaskBase):
    configuration: Optional[Dict[str, Any]] = None
    assigned_to: Optional[int] = None
    assigned_role: Optional[str] = None
    due_date: Optional[datetime] = None
    estimated_hours: Optional[int] = None

class WorkflowTaskUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TaskStatusEnum] = None
    priority: Optional[WorkflowPriorityEnum] = None
    assigned_to: Optional[int] = None
    due_date: Optional[datetime] = None

class WorkflowTaskResponse(WorkflowTaskBase):
    id: int
    workflow_id: int
    instance_id: Optional[int] = None
    status: TaskStatusEnum
    assigned_to: Optional[int] = None
    assigned_role: Optional[str] = None
    configuration: Optional[Dict[str, Any]] = None
    form_data: Optional[Dict[str, Any]] = None
    step_order: int = 0
    due_date: Optional[datetime] = None
    estimated_hours: Optional[int] = None
    actual_hours: Optional[int] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class TaskCompleteRequest(BaseModel):
    form_data: Optional[Dict[str, Any]] = None
    comments: Optional[str] = None

# Workflow Template Schemas
class WorkflowTemplateBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    category: str = Field(..., description="Template category: litigation, contract, compliance, etc.")

class WorkflowTemplateCreate(WorkflowTemplateBase):
    template_definition: Dict[str, Any] = Field(..., description="Template workflow definition")
    default_variables: Optional[Dict[str, Any]] = None
    is_public: bool = False

class WorkflowTemplateUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    template_definition: Optional[Dict[str, Any]] = None
    is_public: Optional[bool] = None

class WorkflowTemplateResponse(WorkflowTemplateBase):
    id: int
    template_definition: Dict[str, Any]
    default_variables: Optional[Dict[str, Any]] = None
    usage_count: int = 0
    is_public: bool = False
    created_by: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Notification Schemas
class WorkflowNotificationResponse(BaseModel):
    id: int
    workflow_id: Optional[int] = None
    instance_id: Optional[int] = None
    task_id: Optional[int] = None
    recipient_id: int
    notification_type: str
    subject: str
    message: str
    is_read: bool = False
    sent_at: Optional[datetime] = None
    read_at: Optional[datetime] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

# Analytics and Metrics Schemas
class WorkflowMetrics(BaseModel):
    total_instances: int = 0
    completed_instances: int = 0
    completion_rate: float = 0.0
    avg_completion_time_hours: float = 0.0
    total_tasks: int = 0
    completed_tasks: int = 0
    task_completion_rate: float = 0.0

class WorkflowPerformanceReport(BaseModel):
    workflow_id: int
    workflow_name: str
    metrics: WorkflowMetrics
    period_start: datetime
    period_end: datetime

class TaskPerformanceMetrics(BaseModel):
    task_type: str
    total_tasks: int
    completed_tasks: int
    avg_completion_time_hours: float
    success_rate: float

class WorkflowDashboardSummary(BaseModel):
    total_workflows: int = 0
    pending_tasks: int = 0
    overdue_tasks: int = 0
    completed_this_week: int = 0
    active_instances: int = 0
    task_completion_rate: float = 0.0

# Workflow Builder Schemas (for visual workflow designer)
class WorkflowStepBase(BaseModel):
    id: str = Field(..., description="Unique step identifier")
    name: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    step_type: str = Field(..., description="Step type: start, task, decision, end, etc.")
    position: Dict[str, float] = Field(..., description="Position in visual designer (x, y)")

class WorkflowStepCreate(WorkflowStepBase):
    configuration: Optional[Dict[str, Any]] = None
    conditions: Optional[Dict[str, Any]] = None
    connections: List[str] = Field(default_factory=list, description="Connected step IDs")

class WorkflowStepResponse(WorkflowStepBase):
    configuration: Optional[Dict[str, Any]] = None
    conditions: Optional[Dict[str, Any]] = None
    connections: List[str] = []
    
class WorkflowDefinition(BaseModel):
    """Complete workflow definition for visual builder"""
    steps: List[WorkflowStepCreate] = Field(default_factory=list)
    variables: Dict[str, Any] = Field(default_factory=dict)
    settings: Dict[str, Any] = Field(default_factory=dict)
    
    @validator('steps')
    def validate_steps(cls, v):
        """Validate workflow steps have proper connections"""
        if not v:
            return v
        
        step_ids = {step.id for step in v}
        
        # Check all connections reference valid steps
        for step in v:
            for connection in step.connections:
                if connection not in step_ids:
                    raise ValueError(f"Step {step.id} references invalid connection: {connection}")
        
        # Ensure there's at least one start step
        start_steps = [step for step in v if step.step_type == "start"]
        if not start_steps:
            raise ValueError("Workflow must have at least one start step")
        
        return v

# Search and Filter Schemas
class WorkflowSearchRequest(BaseModel):
    query: Optional[str] = None
    status: Optional[List[WorkflowStatusEnum]] = None
    priority: Optional[List[WorkflowPriorityEnum]] = None
    created_by: Optional[int] = None
    date_from: Optional[datetime] = None
    date_to: Optional[datetime] = None
    limit: int = Field(default=50, ge=1, le=1000)
    offset: int = Field(default=0, ge=0)

class TaskSearchRequest(BaseModel):
    query: Optional[str] = None
    status: Optional[List[TaskStatusEnum]] = None
    priority: Optional[List[WorkflowPriorityEnum]] = None
    assigned_to: Optional[int] = None
    workflow_id: Optional[int] = None
    overdue_only: bool = False
    limit: int = Field(default=50, ge=1, le=1000)
    offset: int = Field(default=0, ge=0)
