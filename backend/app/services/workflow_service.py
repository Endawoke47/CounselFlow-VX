"""
Workflow automation service for CounselFlow
Handles workflow execution, task automation, and process management
"""
from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
from datetime import datetime, timedelta
import json
import uuid
from app.models.workflow import (
    Workflow, WorkflowInstance, WorkflowTask, WorkflowTemplate, 
    WorkflowNotification, WorkflowStatus, TaskStatus, WorkflowPriority
)
from app.models.user import User
from app.core.database import get_db
import logging

logger = logging.getLogger(__name__)

class WorkflowEngine:
    """Core workflow automation engine"""
    
    def __init__(self, db: Session):
        self.db = db
    
    async def create_workflow(self, workflow_data: Dict[str, Any], creator_id: int) -> Workflow:
        """Create a new workflow"""
        try:
            workflow = Workflow(
                name=workflow_data["name"],
                description=workflow_data.get("description"),
                definition=workflow_data["definition"],
                triggers=workflow_data.get("triggers", {}),
                variables=workflow_data.get("variables", {}),
                created_by=creator_id,
                priority=WorkflowPriority(workflow_data.get("priority", "medium")),
                auto_assign=workflow_data.get("auto_assign", False),
                deadline_hours=workflow_data.get("deadline_hours"),
                escalation_rules=workflow_data.get("escalation_rules", {})
            )
            
            self.db.add(workflow)
            self.db.commit()
            self.db.refresh(workflow)
            
            logger.info(f"Created workflow: {workflow.name} (ID: {workflow.id})")
            return workflow
            
        except Exception as e:
            logger.error(f"Error creating workflow: {str(e)}")
            self.db.rollback()
            raise
    
    async def start_workflow_instance(self, workflow_id: int, started_by: int, context_data: Dict = None) -> WorkflowInstance:
        """Start a new workflow instance"""
        try:
            workflow = self.db.query(Workflow).filter(Workflow.id == workflow_id).first()
            if not workflow:
                raise ValueError(f"Workflow {workflow_id} not found")
            
            instance = WorkflowInstance(
                workflow_id=workflow_id,
                started_by=started_by,
                context_data=context_data or {},
                execution_log=[],
                status=WorkflowStatus.ACTIVE,
                current_step="start"
            )
            
            self.db.add(instance)
            self.db.commit()
            self.db.refresh(instance)
            
            # Create initial tasks based on workflow definition
            await self._create_initial_tasks(workflow, instance)
            
            logger.info(f"Started workflow instance: {instance.id} for workflow: {workflow.name}")
            return instance
            
        except Exception as e:
            logger.error(f"Error starting workflow instance: {str(e)}")
            self.db.rollback()
            raise
    
    async def _create_initial_tasks(self, workflow: Workflow, instance: WorkflowInstance):
        """Create initial tasks for a workflow instance"""
        try:
            definition = workflow.definition
            steps = definition.get("steps", [])
            
            for i, step in enumerate(steps):
                if step.get("auto_start", True) or i == 0:  # Auto-start first step
                    task = WorkflowTask(
                        workflow_id=workflow.id,
                        instance_id=instance.id,
                        name=step["name"],
                        description=step.get("description"),
                        task_type=step.get("type", "manual"),
                        configuration=step.get("configuration", {}),
                        step_order=i,
                        priority=WorkflowPriority(step.get("priority", "medium"))
                    )
                    
                    # Auto-assignment logic
                    if workflow.auto_assign and step.get("assignee"):
                        task.assigned_to = step["assignee"]
                    elif step.get("role"):
                        task.assigned_role = step["role"]
                    
                    # Set due date
                    if step.get("deadline_hours"):
                        task.due_date = datetime.utcnow() + timedelta(hours=step["deadline_hours"])
                    
                    self.db.add(task)
            
            self.db.commit()
            
        except Exception as e:
            logger.error(f"Error creating initial tasks: {str(e)}")
            raise
    
    async def complete_task(self, task_id: int, user_id: int, form_data: Dict = None) -> bool:
        """Complete a workflow task"""
        try:
            task = self.db.query(WorkflowTask).filter(WorkflowTask.id == task_id).first()
            if not task:
                raise ValueError(f"Task {task_id} not found")
            
            # Verify user can complete this task
            if task.assigned_to and task.assigned_to != user_id:
                raise PermissionError("User not authorized to complete this task")
            
            # Update task
            task.status = TaskStatus.COMPLETED
            task.completed_at = datetime.utcnow()
            task.form_data = form_data or {}
            
            # Update instance progress
            instance = task.instance
            await self._update_instance_progress(instance)
            
            # Check for next tasks
            await self._process_next_tasks(task)
            
            self.db.commit()
            
            logger.info(f"Completed task: {task.name} (ID: {task.id})")
            return True
            
        except Exception as e:
            logger.error(f"Error completing task: {str(e)}")
            self.db.rollback()
            raise
    
    async def _update_instance_progress(self, instance: WorkflowInstance):
        """Update workflow instance progress"""
        try:
            total_tasks = self.db.query(WorkflowTask).filter(
                WorkflowTask.instance_id == instance.id
            ).count()
            
            completed_tasks = self.db.query(WorkflowTask).filter(
                and_(
                    WorkflowTask.instance_id == instance.id,
                    WorkflowTask.status == TaskStatus.COMPLETED
                )
            ).count()
            
            if total_tasks > 0:
                progress = int((completed_tasks / total_tasks) * 100)
                instance.progress_percentage = progress
                
                # Check if workflow is complete
                if progress == 100:
                    instance.status = WorkflowStatus.COMPLETED
                    instance.completed_at = datetime.utcnow()
            
        except Exception as e:
            logger.error(f"Error updating instance progress: {str(e)}")
            raise
    
    async def _process_next_tasks(self, completed_task: WorkflowTask):
        """Process and activate next tasks in the workflow"""
        try:
            workflow = completed_task.workflow
            definition = workflow.definition
            steps = definition.get("steps", [])
            
            # Find next steps based on workflow definition
            current_step_order = completed_task.step_order
            next_steps = [step for step in steps if step.get("depends_on") == completed_task.name]
            
            for step in next_steps:
                # Create next task
                next_task = WorkflowTask(
                    workflow_id=workflow.id,
                    instance_id=completed_task.instance_id,
                    name=step["name"],
                    description=step.get("description"),
                    task_type=step.get("type", "manual"),
                    configuration=step.get("configuration", {}),
                    step_order=current_step_order + 1,
                    priority=WorkflowPriority(step.get("priority", "medium"))
                )
                
                if step.get("assignee"):
                    next_task.assigned_to = step["assignee"]
                elif step.get("role"):
                    next_task.assigned_role = step["role"]
                
                if step.get("deadline_hours"):
                    next_task.due_date = datetime.utcnow() + timedelta(hours=step["deadline_hours"])
                
                self.db.add(next_task)
            
        except Exception as e:
            logger.error(f"Error processing next tasks: {str(e)}")
            raise

class WorkflowTemplateService:
    """Service for managing workflow templates"""
    
    def __init__(self, db: Session):
        self.db = db
    
    async def create_template(self, template_data: Dict[str, Any], creator_id: int) -> WorkflowTemplate:
        """Create a new workflow template"""
        try:
            template = WorkflowTemplate(
                name=template_data["name"],
                description=template_data.get("description"),
                category=template_data["category"],
                template_definition=template_data["template_definition"],
                default_variables=template_data.get("default_variables", {}),
                created_by=creator_id,
                is_public=template_data.get("is_public", False)
            )
            
            self.db.add(template)
            self.db.commit()
            self.db.refresh(template)
            
            logger.info(f"Created workflow template: {template.name}")
            return template
            
        except Exception as e:
            logger.error(f"Error creating workflow template: {str(e)}")
            self.db.rollback()
            raise
    
    async def get_templates_by_category(self, category: str) -> List[WorkflowTemplate]:
        """Get workflow templates by category"""
        try:
            templates = self.db.query(WorkflowTemplate).filter(
                and_(
                    WorkflowTemplate.category == category,
                    WorkflowTemplate.is_public == True
                )
            ).all()
            
            return templates
            
        except Exception as e:
            logger.error(f"Error getting templates by category: {str(e)}")
            raise
    
    async def create_workflow_from_template(self, template_id: int, workflow_data: Dict, creator_id: int) -> Workflow:
        """Create a new workflow from a template"""
        try:
            template = self.db.query(WorkflowTemplate).filter(WorkflowTemplate.id == template_id).first()
            if not template:
                raise ValueError(f"Template {template_id} not found")
            
            # Merge template definition with custom data
            definition = template.template_definition.copy()
            definition.update(workflow_data.get("definition_overrides", {}))
            
            workflow_engine = WorkflowEngine(self.db)
            workflow = await workflow_engine.create_workflow({
                "name": workflow_data["name"],
                "description": workflow_data.get("description"),
                "definition": definition,
                "variables": {**template.default_variables, **workflow_data.get("variables", {})},
                "priority": workflow_data.get("priority", "medium")
            }, creator_id)
            
            # Update template usage count
            template.usage_count += 1
            self.db.commit()
            
            return workflow
            
        except Exception as e:
            logger.error(f"Error creating workflow from template: {str(e)}")
            self.db.rollback()
            raise

class WorkflowNotificationService:
    """Service for workflow notifications and alerts"""
    
    def __init__(self, db: Session):
        self.db = db
    
    async def send_task_reminder(self, task_id: int) -> bool:
        """Send reminder for overdue task"""
        try:
            task = self.db.query(WorkflowTask).filter(WorkflowTask.id == task_id).first()
            if not task or not task.assigned_to:
                return False
            
            notification = WorkflowNotification(
                task_id=task_id,
                workflow_id=task.workflow_id,
                instance_id=task.instance_id,
                recipient_id=task.assigned_to,
                notification_type="reminder",
                subject=f"Task Reminder: {task.name}",
                message=f"Task '{task.name}' is due. Please complete it to keep the workflow moving.",
                sent_at=datetime.utcnow()
            )
            
            self.db.add(notification)
            self.db.commit()
            
            logger.info(f"Sent task reminder for task: {task.name}")
            return True
            
        except Exception as e:
            logger.error(f"Error sending task reminder: {str(e)}")
            self.db.rollback()
            raise
    
    async def escalate_overdue_task(self, task_id: int) -> bool:
        """Escalate overdue task to supervisor"""
        try:
            task = self.db.query(WorkflowTask).filter(WorkflowTask.id == task_id).first()
            if not task:
                return False
            
            workflow = task.workflow
            escalation_rules = workflow.escalation_rules or {}
            
            # Find supervisor or escalation user
            supervisor_id = escalation_rules.get("supervisor_id")
            if supervisor_id:
                notification = WorkflowNotification(
                    task_id=task_id,
                    workflow_id=task.workflow_id,
                    instance_id=task.instance_id,
                    recipient_id=supervisor_id,
                    notification_type="escalation",
                    subject=f"Task Escalation: {task.name}",
                    message=f"Task '{task.name}' is overdue and requires attention.",
                    sent_at=datetime.utcnow()
                )
                
                self.db.add(notification)
                self.db.commit()
                
                logger.info(f"Escalated overdue task: {task.name}")
                return True
            
            return False
            
        except Exception as e:
            logger.error(f"Error escalating task: {str(e)}")
            self.db.rollback()
            raise

class WorkflowAnalyticsService:
    """Service for workflow performance analytics"""
    
    def __init__(self, db: Session):
        self.db = db
    
    async def get_workflow_performance_metrics(self, workflow_id: int = None) -> Dict[str, Any]:
        """Get performance metrics for workflows"""
        try:
            base_query = self.db.query(WorkflowInstance)
            if workflow_id:
                base_query = base_query.filter(WorkflowInstance.workflow_id == workflow_id)
            
            total_instances = base_query.count()
            completed_instances = base_query.filter(
                WorkflowInstance.status == WorkflowStatus.COMPLETED
            ).count()
            
            # Average completion time
            completed_with_times = base_query.filter(
                and_(
                    WorkflowInstance.status == WorkflowStatus.COMPLETED,
                    WorkflowInstance.completed_at.isnot(None)
                )
            ).all()
            
            avg_completion_time = 0
            if completed_with_times:
                total_time = sum([
                    (instance.completed_at - instance.created_at).total_seconds()
                    for instance in completed_with_times
                ])
                avg_completion_time = total_time / len(completed_with_times) / 3600  # Convert to hours
            
            # Task completion rates
            task_query = self.db.query(WorkflowTask)
            if workflow_id:
                task_query = task_query.filter(WorkflowTask.workflow_id == workflow_id)
            
            total_tasks = task_query.count()
            completed_tasks = task_query.filter(WorkflowTask.status == TaskStatus.COMPLETED).count()
            
            metrics = {
                "total_instances": total_instances,
                "completed_instances": completed_instances,
                "completion_rate": (completed_instances / total_instances * 100) if total_instances > 0 else 0,
                "avg_completion_time_hours": round(avg_completion_time, 2),
                "total_tasks": total_tasks,
                "completed_tasks": completed_tasks,
                "task_completion_rate": (completed_tasks / total_tasks * 100) if total_tasks > 0 else 0
            }
            
            return metrics
            
        except Exception as e:
            logger.error(f"Error getting workflow metrics: {str(e)}")
            raise
