"""
Workflow automation API routes for CounselFlow
Provides REST endpoints for workflow management and automation
"""
from typing import List, Dict, Any, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
from app.core.database import get_db
from app.core.auth import get_current_user
from app.models.user import User
from app.services.workflow_service import (
    WorkflowEngine, WorkflowTemplateService, 
    WorkflowNotificationService, WorkflowAnalyticsService
)
from app.schemas.workflow import (
    WorkflowCreate, WorkflowResponse, WorkflowInstanceCreate, WorkflowInstanceResponse,
    WorkflowTaskResponse, WorkflowTemplateCreate, WorkflowTemplateResponse,
    WorkflowMetrics, TaskCompleteRequest
)
from app.core.websocket import manager
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/workflows", response_model=WorkflowResponse)
async def create_workflow(
    workflow_data: WorkflowCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new workflow"""
    try:
        engine = WorkflowEngine(db)
        workflow = await engine.create_workflow(workflow_data.dict(), current_user.id)
        
        # Broadcast workflow creation
        await manager.broadcast_to_room(
            f"user_{current_user.id}",
            {
                "type": "workflow_created",
                "data": {
                    "workflow_id": workflow.id,
                    "name": workflow.name,
                    "status": workflow.status
                }
            }
        )
        
        return WorkflowResponse.from_orm(workflow)
        
    except Exception as e:
        logger.error(f"Error creating workflow: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating workflow: {str(e)}"
        )

@router.get("/workflows", response_model=List[WorkflowResponse])
async def get_workflows(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    status_filter: Optional[str] = Query(None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's workflows with optional filtering"""
    try:
        from app.models.workflow import Workflow, WorkflowStatus
        from sqlalchemy import and_
        
        query = db.query(Workflow).filter(
            or_(
                Workflow.created_by == current_user.id,
                Workflow.assigned_to == current_user.id
            )
        )
        
        if status_filter:
            query = query.filter(Workflow.status == WorkflowStatus(status_filter))
        
        workflows = query.offset(skip).limit(limit).all()
        return [WorkflowResponse.from_attributes(w) for w in workflows]
        
    except Exception as e:
        logger.error(f"Error getting workflows: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error getting workflows: {str(e)}"
        )

@router.get("/workflows/{workflow_id}", response_model=WorkflowResponse)
async def get_workflow(
    workflow_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get specific workflow details"""
    try:
        from app.models.workflow import Workflow
        from sqlalchemy import or_
        
        workflow = db.query(Workflow).filter(
            and_(
                Workflow.id == workflow_id,
                or_(
                    Workflow.created_by == current_user.id,
                    Workflow.assigned_to == current_user.id
                )
            )
        ).first()
        
        if not workflow:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Workflow not found"
            )
        
        return WorkflowResponse.from_orm(workflow)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting workflow: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error getting workflow: {str(e)}"
        )

@router.post("/workflows/{workflow_id}/start", response_model=WorkflowInstanceResponse)
async def start_workflow(
    workflow_id: int,
    instance_data: WorkflowInstanceCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Start a new workflow instance"""
    try:
        engine = WorkflowEngine(db)
        instance = await engine.start_workflow_instance(
            workflow_id, 
            current_user.id, 
            instance_data.context_data
        )
        
        # Broadcast workflow start
        await manager.broadcast_to_room(
            f"user_{current_user.id}",
            {
                "type": "workflow_started",
                "data": {
                    "instance_id": instance.id,
                    "workflow_id": workflow_id,
                    "status": instance.status
                }
            }
        )
        
        return WorkflowInstanceResponse.from_orm(instance)
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
    except Exception as e:
        logger.error(f"Error starting workflow: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error starting workflow: {str(e)}"
        )

@router.get("/workflows/{workflow_id}/instances", response_model=List[WorkflowInstanceResponse])
async def get_workflow_instances(
    workflow_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get instances for a specific workflow"""
    try:
        from app.models.workflow import WorkflowInstance
        
        instances = db.query(WorkflowInstance).filter(
            WorkflowInstance.workflow_id == workflow_id
        ).all()
        
        return [WorkflowInstanceResponse.from_orm(i) for i in instances]
        
    except Exception as e:
        logger.error(f"Error getting workflow instances: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error getting workflow instances: {str(e)}"
        )

@router.get("/tasks/assigned", response_model=List[WorkflowTaskResponse])
async def get_assigned_tasks(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get tasks assigned to current user"""
    try:
        from app.models.workflow import WorkflowTask, TaskStatus
        
        tasks = db.query(WorkflowTask).filter(
            and_(
                WorkflowTask.assigned_to == current_user.id,
                WorkflowTask.status.in_([TaskStatus.PENDING, TaskStatus.IN_PROGRESS])
            )
        ).all()
        
        return [WorkflowTaskResponse.from_orm(t) for t in tasks]
        
    except Exception as e:
        logger.error(f"Error getting assigned tasks: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error getting assigned tasks: {str(e)}"
        )

@router.post("/tasks/{task_id}/complete")
async def complete_task(
    task_id: int,
    request: TaskCompleteRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Complete a workflow task"""
    try:
        engine = WorkflowEngine(db)
        success = await engine.complete_task(task_id, current_user.id, request.form_data)
        
        if success:
            # Broadcast task completion
            await manager.broadcast_to_room(
                f"user_{current_user.id}",
                {
                    "type": "task_completed",
                    "data": {
                        "task_id": task_id,
                        "completed_by": current_user.id
                    }
                }
            )
            
            return {"message": "Task completed successfully"}
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to complete task"
            )
        
    except PermissionError as e:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=str(e)
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
    except Exception as e:
        logger.error(f"Error completing task: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error completing task: {str(e)}"
        )

# Template Management
@router.post("/templates", response_model=WorkflowTemplateResponse)
async def create_workflow_template(
    template_data: WorkflowTemplateCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new workflow template"""
    try:
        service = WorkflowTemplateService(db)
        template = await service.create_template(template_data.dict(), current_user.id)
        return WorkflowTemplateResponse.from_orm(template)
        
    except Exception as e:
        logger.error(f"Error creating workflow template: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating workflow template: {str(e)}"
        )

@router.get("/templates", response_model=List[WorkflowTemplateResponse])
async def get_workflow_templates(
    category: Optional[str] = Query(None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get available workflow templates"""
    try:
        service = WorkflowTemplateService(db)
        
        if category:
            templates = await service.get_templates_by_category(category)
        else:
            from app.models.workflow import WorkflowTemplate
            templates = db.query(WorkflowTemplate).filter(
                or_(
                    WorkflowTemplate.is_public == True,
                    WorkflowTemplate.created_by == current_user.id
                )
            ).all()
        
        return [WorkflowTemplateResponse.from_orm(t) for t in templates]
        
    except Exception as e:
        logger.error(f"Error getting workflow templates: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error getting workflow templates: {str(e)}"
        )

@router.post("/templates/{template_id}/create-workflow", response_model=WorkflowResponse)
async def create_workflow_from_template(
    template_id: int,
    workflow_data: Dict[str, Any],
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a workflow from a template"""
    try:
        service = WorkflowTemplateService(db)
        workflow = await service.create_workflow_from_template(
            template_id, workflow_data, current_user.id
        )
        return WorkflowResponse.from_orm(workflow)
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
    except Exception as e:
        logger.error(f"Error creating workflow from template: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating workflow from template: {str(e)}"
        )

# Analytics and Reporting
@router.get("/analytics/performance", response_model=WorkflowMetrics)
async def get_workflow_performance(
    workflow_id: Optional[int] = Query(None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get workflow performance metrics"""
    try:
        service = WorkflowAnalyticsService(db)
        metrics = await service.get_workflow_performance_metrics(workflow_id)
        return WorkflowMetrics(**metrics)
        
    except Exception as e:
        logger.error(f"Error getting workflow performance: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error getting workflow performance: {str(e)}"
        )

@router.get("/dashboard/summary")
async def get_workflow_dashboard_summary(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get workflow dashboard summary for current user"""
    try:
        from app.models.workflow import Workflow, WorkflowTask, TaskStatus
        from sqlalchemy import func
        
        # Get user's workflow counts
        total_workflows = db.query(Workflow).filter(
            or_(
                Workflow.created_by == current_user.id,
                Workflow.assigned_to == current_user.id
            )
        ).count()
        
        # Get pending tasks count
        pending_tasks = db.query(WorkflowTask).filter(
            and_(
                WorkflowTask.assigned_to == current_user.id,
                WorkflowTask.status == TaskStatus.PENDING
            )
        ).count()
        
        # Get overdue tasks
        from datetime import datetime
        overdue_tasks = db.query(WorkflowTask).filter(
            and_(
                WorkflowTask.assigned_to == current_user.id,
                WorkflowTask.status.in_([TaskStatus.PENDING, TaskStatus.IN_PROGRESS]),
                WorkflowTask.due_date < datetime.utcnow()
            )
        ).count()
        
        # Get completed tasks this week
        from datetime import timedelta
        week_ago = datetime.utcnow() - timedelta(days=7)
        completed_this_week = db.query(WorkflowTask).filter(
            and_(
                WorkflowTask.assigned_to == current_user.id,
                WorkflowTask.status == TaskStatus.COMPLETED,
                WorkflowTask.completed_at >= week_ago
            )
        ).count()
        
        return {
            "total_workflows": total_workflows,
            "pending_tasks": pending_tasks,
            "overdue_tasks": overdue_tasks,
            "completed_this_week": completed_this_week
        }
        
    except Exception as e:
        logger.error(f"Error getting workflow dashboard summary: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error getting workflow dashboard summary: {str(e)}"
        )
