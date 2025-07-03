"""
Advanced Compliance and Security Models
"""
from sqlalchemy import Column, String, DateTime, Boolean, Text, JSON, Integer, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import uuid

Base = declarative_base()

class ComplianceFramework(Base):
    __tablename__ = "compliance_frameworks"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(200), nullable=False)  # GDPR, CCPA, SOX, HIPAA, etc.
    description = Column(Text)
    jurisdiction = Column(String(100))
    version = Column(String(50))
    effective_date = Column(DateTime)
    requirements = Column(JSON)  # Structured requirements
    assessment_criteria = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    assessments = relationship("ComplianceAssessment", back_populates="framework")

class ComplianceAssessment(Base):
    __tablename__ = "compliance_assessments"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    framework_id = Column(String, ForeignKey("compliance_frameworks.id"), nullable=False)
    assessed_entity = Column(String(200))  # What's being assessed
    assessment_date = Column(DateTime, default=datetime.utcnow)
    assessor_id = Column(String(50))
    status = Column(String(50))  # pending, in_progress, completed, failed
    score = Column(Integer)  # 0-100 compliance score
    findings = Column(JSON)
    recommendations = Column(JSON)
    next_assessment_date = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    framework = relationship("ComplianceFramework", back_populates="assessments")
    violations = relationship("ComplianceViolation", back_populates="assessment")

class ComplianceViolation(Base):
    __tablename__ = "compliance_violations"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    assessment_id = Column(String, ForeignKey("compliance_assessments.id"))
    violation_type = Column(String(100))
    severity = Column(String(20))  # low, medium, high, critical
    description = Column(Text)
    affected_systems = Column(JSON)
    remediation_steps = Column(JSON)
    status = Column(String(50))  # open, in_progress, resolved, accepted_risk
    assigned_to = Column(String(50))
    due_date = Column(DateTime)
    resolved_date = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    assessment = relationship("ComplianceAssessment", back_populates="violations")

class DataProcessingActivity(Base):
    __tablename__ = "data_processing_activities"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    activity_name = Column(String(200), nullable=False)
    data_controller = Column(String(200))
    data_processor = Column(String(200))
    purpose = Column(Text)
    legal_basis = Column(String(100))  # GDPR legal basis
    data_categories = Column(JSON)  # Types of personal data
    data_subjects = Column(JSON)  # Categories of individuals
    recipients = Column(JSON)  # Who receives the data
    retention_period = Column(String(100))
    security_measures = Column(JSON)
    international_transfers = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class SecurityIncident(Base):
    __tablename__ = "security_incidents"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(200), nullable=False)
    description = Column(Text)
    incident_type = Column(String(100))  # data_breach, unauthorized_access, etc.
    severity = Column(String(20))
    status = Column(String(50))  # reported, investigating, contained, resolved
    reported_by = Column(String(50))
    assigned_to = Column(String(50))
    affected_systems = Column(JSON)
    affected_data = Column(JSON)
    impact_assessment = Column(Text)
    containment_actions = Column(JSON)
    notification_required = Column(Boolean, default=False)
    notification_sent = Column(Boolean, default=False)
    reported_at = Column(DateTime, default=datetime.utcnow)
    resolved_at = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
