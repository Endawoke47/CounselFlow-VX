"""
Compliance and Security Schemas
"""
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from datetime import datetime

class ComplianceFrameworkCreate(BaseModel):
    name: str = Field(..., description="Framework name (e.g., GDPR, CCPA)")
    description: Optional[str] = None
    jurisdiction: Optional[str] = None
    version: Optional[str] = None
    effective_date: Optional[datetime] = None
    requirements: Optional[Dict[str, Any]] = None
    assessment_criteria: Optional[Dict[str, Any]] = None

class ComplianceFrameworkResponse(BaseModel):
    id: str
    name: str
    description: Optional[str]
    jurisdiction: Optional[str]
    version: Optional[str]
    effective_date: Optional[datetime]
    created_at: datetime
    
    class Config:
        from_attributes = True

class ComplianceAssessmentResponse(BaseModel):
    id: str
    framework_id: str
    assessed_entity: str
    assessment_date: datetime
    assessor_id: str
    status: str
    score: int
    findings: Optional[Dict[str, Any]]
    recommendations: Optional[Dict[str, Any]]
    next_assessment_date: Optional[datetime]
    
    class Config:
        from_attributes = True

class DataProcessingActivityCreate(BaseModel):
    activity_name: str
    data_controller: str
    data_processor: Optional[str] = None
    purpose: str
    legal_basis: str
    data_categories: List[str]
    data_subjects: List[str]
    recipients: Optional[List[str]] = None
    retention_period: str
    security_measures: List[str]
    international_transfers: Optional[List[str]] = None

class SecurityIncidentCreate(BaseModel):
    title: str
    description: str
    incident_type: str
    severity: str = Field(..., pattern="^(low|medium|high|critical)$")
    affected_systems: Optional[List[str]] = None
    affected_data: Optional[Dict[str, Any]] = None
    impact_assessment: Optional[str] = None

class SecurityIncidentResponse(BaseModel):
    id: str
    title: str
    description: str
    incident_type: str
    severity: str
    status: str
    reported_by: str
    reported_at: datetime
    notification_required: bool
    
    class Config:
        from_attributes = True

class ComplianceDashboard(BaseModel):
    compliance_score: float
    open_violations: int
    critical_violations: int
    recent_incidents: int
    assessments: List[Dict[str, Any]]
    violations: List[Dict[str, Any]]
