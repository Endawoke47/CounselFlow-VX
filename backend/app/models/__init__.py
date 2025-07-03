"""
Comprehensive Legal Database Models for CounselFlow
World-class schema supporting all 10 legal modules with advanced security
"""

from sqlalchemy import (
    Column, Integer, String, Text, DateTime, Boolean, ForeignKey, 
    Numeric, JSON, ARRAY, Index, UniqueConstraint, CheckConstraint
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, backref
from sqlalchemy.dialects.postgresql import UUID, JSONB
from datetime import datetime
import uuid
from enum import Enum

from app.core.database import Base

# ========== CORE MODELS ==========

class UserRole(str, Enum):
    ADMIN = "admin"
    PARTNER = "partner"
    ATTORNEY = "attorney"
    PARALEGAL = "paralegal"
    SECRETARY = "secretary"
    CLIENT = "client"
    GUEST = "guest"

class User(Base):
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    role = Column(String(20), nullable=False, default=UserRole.ATTORNEY.value)
    
    # Professional details
    bar_number = Column(String(50), unique=True, nullable=True)
    bar_state = Column(String(10), nullable=True)
    firm_id = Column(UUID(as_uuid=True), ForeignKey("law_firms.id"), nullable=True)
    
    # Security & Access
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    mfa_enabled = Column(Boolean, default=False)
    security_clearance_level = Column(String(20), default="standard")
    last_login = Column(DateTime, nullable=True)
    
    # Metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    firm = relationship("LawFirm", back_populates="users")
    client_access = relationship("ClientAccess", foreign_keys="[ClientAccess.user_id]", back_populates="user")
    matters = relationship("Matter", back_populates="lead_attorney")
    assigned_tasks = relationship("Task", back_populates="assignee", foreign_keys="[Task.assignee_id]")
    created_tasks = relationship("Task", foreign_keys="[Task.created_by]")

class LawFirm(Base):
    __tablename__ = "law_firms"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    tax_id = Column(String(50), unique=True, nullable=False)
    
    # Contact Information
    address_line_1 = Column(String(255), nullable=False)
    address_line_2 = Column(String(255), nullable=True)
    city = Column(String(100), nullable=False)
    state = Column(String(10), nullable=False)
    zip_code = Column(String(20), nullable=False)
    country = Column(String(50), default="US")
    phone = Column(String(20), nullable=True)
    email = Column(String(255), nullable=True)
    website = Column(String(255), nullable=True)
    
    # Configuration
    security_level = Column(String(20), default="elevated")
    billing_rate_default = Column(Numeric(10, 2), nullable=True)
    
    # Metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    users = relationship("User", back_populates="firm")
    clients = relationship("Client", back_populates="law_firm")

# ========== CLIENT MANAGEMENT ==========

class Client(Base):
    __tablename__ = "clients"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    law_firm_id = Column(UUID(as_uuid=True), ForeignKey("law_firms.id"), nullable=False)
    
    # Basic Information
    name = Column(String(255), nullable=False)
    client_number = Column(String(50), unique=True, nullable=False)
    client_type = Column(String(20), nullable=False)  # individual, corporation, government
    
    # Contact Information
    primary_contact_name = Column(String(255), nullable=True)
    primary_contact_email = Column(String(255), nullable=True)
    primary_contact_phone = Column(String(20), nullable=True)
    
    # Address
    address_line_1 = Column(String(255), nullable=True)
    address_line_2 = Column(String(255), nullable=True)
    city = Column(String(100), nullable=True)
    state = Column(String(10), nullable=True)
    zip_code = Column(String(20), nullable=True)
    country = Column(String(50), default="US")
    
    # Business Details (if applicable)
    industry = Column(String(100), nullable=True)
    tax_id = Column(String(50), nullable=True)
    annual_revenue = Column(Numeric(15, 2), nullable=True)
    employee_count = Column(Integer, nullable=True)
    
    # Legal Status
    privilege_level = Column(String(20), default="attorney_client")
    conflict_check_status = Column(String(20), default="pending")
    retention_agreement_signed = Column(Boolean, default=False)
    
    # Metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_active = Column(Boolean, default=True)
    
    # Relationships
    law_firm = relationship("LawFirm", back_populates="clients")
    matters = relationship("Matter", back_populates="client")
    contracts = relationship("Contract", back_populates="client")
    access_controls = relationship("ClientAccess", back_populates="client")

class ClientAccess(Base):
    __tablename__ = "client_access"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    client_id = Column(UUID(as_uuid=True), ForeignKey("clients.id"), nullable=False)
    access_level = Column(String(20), nullable=False)  # full, limited, read_only
    granted_at = Column(DateTime, default=datetime.utcnow)
    granted_by = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    expires_at = Column(DateTime, nullable=True)
    is_active = Column(Boolean, default=True)
    
    # Relationships
    user = relationship("User", foreign_keys=[user_id], back_populates="client_access")
    client = relationship("Client", back_populates="access_controls")
    granted_by_user = relationship("User", foreign_keys=[granted_by])

# ========== MATTER MANAGEMENT ==========

class MatterType(str, Enum):
    LITIGATION = "litigation"
    CORPORATE = "corporate"
    REGULATORY = "regulatory"
    INTELLECTUAL_PROPERTY = "intellectual_property"
    EMPLOYMENT = "employment"
    REAL_ESTATE = "real_estate"
    TAX = "tax"
    BANKRUPTCY = "bankruptcy"
    IMMIGRATION = "immigration"
    FAMILY = "family"

class MatterStatus(str, Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    CLOSED = "closed"
    ON_HOLD = "on_hold"

class Matter(Base):
    __tablename__ = "matters"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    client_id = Column(UUID(as_uuid=True), ForeignKey("clients.id"), nullable=False)
    lead_attorney_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    # Basic Information
    matter_number = Column(String(50), unique=True, nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    matter_type = Column(String(30), nullable=False)
    status = Column(String(20), default=MatterStatus.ACTIVE.value)
    
    # Financial
    hourly_rate = Column(Numeric(10, 2), nullable=True)
    budget = Column(Numeric(15, 2), nullable=True)
    total_billed = Column(Numeric(15, 2), default=0)
    
    # Dates
    opened_date = Column(DateTime, default=datetime.utcnow)
    closed_date = Column(DateTime, nullable=True)
    statute_of_limitations = Column(DateTime, nullable=True)
    
    # Security & Privilege
    privilege_level = Column(String(20), default="attorney_client")
    confidentiality_level = Column(String(20), default="standard")
    
    # Metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    client = relationship("Client", back_populates="matters")
    lead_attorney = relationship("User", back_populates="matters")
    documents = relationship("Document", back_populates="matter")
    tasks = relationship("Task", back_populates="matter")
    disputes = relationship("Dispute", back_populates="matter")

# ========== DOCUMENT MANAGEMENT ==========

class DocumentType(str, Enum):
    CONTRACT = "contract"
    PLEADING = "pleading"
    BRIEF = "brief"
    CORRESPONDENCE = "correspondence"
    EVIDENCE = "evidence"
    RESEARCH = "research"
    INTERNAL_MEMO = "internal_memo"
    CLIENT_FILE = "client_file"

class Document(Base):
    __tablename__ = "documents"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    matter_id = Column(UUID(as_uuid=True), ForeignKey("matters.id"), nullable=False)
    uploaded_by = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    # Document Information
    title = Column(String(255), nullable=False)
    filename = Column(String(255), nullable=False)
    file_path = Column(String(500), nullable=False)
    file_size = Column(Integer, nullable=False)
    mime_type = Column(String(100), nullable=False)
    document_type = Column(String(30), nullable=False)
    
    # Content & Analysis
    extracted_text = Column(Text, nullable=True)
    ai_summary = Column(Text, nullable=True)
    ai_tags = Column(ARRAY(String), nullable=True)
    
    # Security
    is_privileged = Column(Boolean, default=True)
    encryption_key_id = Column(String(100), nullable=True)
    access_level = Column(String(20), default="attorney_client")
    
    # Version Control
    version = Column(Integer, default=1)
    parent_document_id = Column(UUID(as_uuid=True), ForeignKey("documents.id"), nullable=True)
    
    # Metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    matter = relationship("Matter", back_populates="documents")
    uploader = relationship("User", foreign_keys=[uploaded_by])
    parent_document = relationship("Document", remote_side=[id], back_populates="child_documents")
    child_documents = relationship("Document", back_populates="parent_document", overlaps="parent_document")
    document_versions = relationship("DocumentVersion", back_populates="document")

# ========== CONTRACT MANAGEMENT ==========

class ContractStatus(str, Enum):
    DRAFT = "draft"
    UNDER_REVIEW = "under_review"
    NEGOTIATION = "negotiation"
    PENDING_SIGNATURE = "pending_signature"
    EXECUTED = "executed"
    EXPIRED = "expired"
    TERMINATED = "terminated"

class Contract(Base):
    __tablename__ = "contracts"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    client_id = Column(UUID(as_uuid=True), ForeignKey("clients.id"), nullable=False)
    matter_id = Column(UUID(as_uuid=True), ForeignKey("matters.id"), nullable=True)
    
    # Basic Information
    title = Column(String(255), nullable=False)
    contract_number = Column(String(50), unique=True, nullable=False)
    contract_type = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    status = Column(String(20), default=ContractStatus.DRAFT.value)
    
    # Parties
    counterparty_name = Column(String(255), nullable=False)
    counterparty_contact = Column(String(255), nullable=True)
    
    # Financial Terms
    contract_value = Column(Numeric(15, 2), nullable=True)
    currency = Column(String(3), default="USD")
    payment_terms = Column(Text, nullable=True)
    
    # Dates
    effective_date = Column(DateTime, nullable=True)
    expiration_date = Column(DateTime, nullable=True)
    renewal_date = Column(DateTime, nullable=True)
    auto_renewal = Column(Boolean, default=False)
    
    # Legal Terms
    governing_law = Column(String(100), nullable=True)
    jurisdiction = Column(String(100), nullable=True)
    arbitration_clause = Column(Boolean, default=False)
    
    # AI Analysis
    ai_risk_score = Column(Numeric(3, 2), nullable=True)
    ai_key_terms = Column(JSONB, nullable=True)
    ai_recommendations = Column(Text, nullable=True)
    
    # Metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    client = relationship("Client", back_populates="contracts")
    matter = relationship("Matter")
    clauses = relationship("ContractClause", back_populates="contract")

class ContractClause(Base):
    __tablename__ = "contract_clauses"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    contract_id = Column(UUID(as_uuid=True), ForeignKey("contracts.id"), nullable=False)
    
    clause_type = Column(String(100), nullable=False)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    ai_risk_level = Column(String(20), nullable=True)
    ai_suggestions = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    contract = relationship("Contract", back_populates="clauses")

# ========== RISK MANAGEMENT ==========

class RiskLevel(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"

class RiskCategory(str, Enum):
    LEGAL = "legal"
    FINANCIAL = "financial"
    OPERATIONAL = "operational"
    REGULATORY = "regulatory"
    REPUTATIONAL = "reputational"
    COMPLIANCE = "compliance"

class RiskAssessment(Base):
    __tablename__ = "risk_assessments"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Basic Information
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    
    # Risk Details
    risk_category = Column(String(50), nullable=False, default=RiskCategory.LEGAL.value)
    risk_level = Column(String(20), nullable=False, default=RiskLevel.MEDIUM.value)
    probability = Column(Numeric(3, 2), nullable=True)  # 0.00 to 1.00
    impact_score = Column(Integer, nullable=True)  # 1-10 scale
    
    # Context
    matter_id = Column(UUID(as_uuid=True), ForeignKey("matters.id"), nullable=True)
    client_id = Column(UUID(as_uuid=True), ForeignKey("clients.id"), nullable=True)
    contract_id = Column(UUID(as_uuid=True), ForeignKey("contracts.id"), nullable=True)
    
    # Assessment Details
    identified_by = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    assessed_by = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    mitigation_strategy = Column(Text, nullable=True)
    recommendations = Column(Text, nullable=True)
    
    # Status & Timeline
    status = Column(String(30), nullable=False, default="identified")  # identified, assessed, mitigated, closed
    identified_date = Column(DateTime, default=datetime.utcnow)
    assessed_date = Column(DateTime, nullable=True)
    mitigation_date = Column(DateTime, nullable=True)
    review_date = Column(DateTime, nullable=True)
    
    # AI Analysis
    ai_analysis = Column(JSONB, nullable=True)
    ai_confidence = Column(Numeric(3, 2), nullable=True)
    
    # Metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_active = Column(Boolean, default=True)
    
    # Relationships
    matter = relationship("Matter")
    client = relationship("Client")
    contract = relationship("Contract")
    identified_by_user = relationship("User", foreign_keys=[identified_by])
    assessed_by_user = relationship("User", foreign_keys=[assessed_by])

# ========== TASK & WORKFLOW MANAGEMENT ==========

class TaskStatus(str, Enum):
    TODO = "todo"
    IN_PROGRESS = "in_progress"
    UNDER_REVIEW = "under_review"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class TaskPriority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"

class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    matter_id = Column(UUID(as_uuid=True), ForeignKey("matters.id"), nullable=False)
    assignee_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    created_by = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    # Task Information
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    status = Column(String(20), default=TaskStatus.TODO.value)
    priority = Column(String(10), default=TaskPriority.MEDIUM.value)
    
    # Time Management
    estimated_hours = Column(Numeric(5, 2), nullable=True)
    actual_hours = Column(Numeric(5, 2), nullable=True)
    due_date = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    
    # AI Integration
    ai_generated = Column(Boolean, default=False)
    ai_suggestions = Column(Text, nullable=True)
    
    # Metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    matter = relationship("Matter", back_populates="tasks")
    assignee = relationship("User", back_populates="assigned_tasks", foreign_keys=[assignee_id])
    creator = relationship("User", back_populates="created_tasks", foreign_keys=[created_by])

# ========== LITIGATION & DISPUTES ==========

class DisputeStatus(str, Enum):
    PENDING = "pending"
    ACTIVE = "active"
    SETTLED = "settled"
    DISMISSED = "dismissed"
    JUDGMENT = "judgment"
    APPEAL = "appeal"

class Dispute(Base):
    __tablename__ = "disputes"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    matter_id = Column(UUID(as_uuid=True), ForeignKey("matters.id"), nullable=False)
    
    # Case Information
    case_number = Column(String(100), nullable=True)
    court_name = Column(String(255), nullable=True)
    jurisdiction = Column(String(100), nullable=True)
    dispute_type = Column(String(100), nullable=False)
    
    # Parties
    plaintiff = Column(String(255), nullable=False)
    defendant = Column(String(255), nullable=False)
    our_role = Column(String(50), nullable=False)  # plaintiff, defendant, third_party
    
    # Status & Timeline
    status = Column(String(20), default=DisputeStatus.PENDING.value)
    filed_date = Column(DateTime, nullable=True)
    trial_date = Column(DateTime, nullable=True)
    
    # Financial
    amount_in_dispute = Column(Numeric(15, 2), nullable=True)
    potential_exposure = Column(Numeric(15, 2), nullable=True)
    
    # AI Analysis
    ai_outcome_prediction = Column(Numeric(3, 2), nullable=True)
    ai_strategy_recommendations = Column(Text, nullable=True)
    
    # Metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    matter = relationship("Matter", back_populates="disputes")

# ========== COMPLIANCE & RISK MANAGEMENT ==========

class ComplianceFramework(str, Enum):
    GDPR = "gdpr"
    CCPA = "ccpa"
    SOX = "sox"
    HIPAA = "hipaa"
    FINRA = "finra"
    SEC = "sec"
    OSHA = "osha"
    CUSTOM = "custom"

class ComplianceRequirement(Base):
    __tablename__ = "compliance_requirements"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    client_id = Column(UUID(as_uuid=True), ForeignKey("clients.id"), nullable=False)
    
    # Requirement Details
    framework = Column(String(20), nullable=False)
    requirement_id = Column(String(100), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    
    # Compliance Status
    status = Column(String(20), nullable=False)  # compliant, non_compliant, under_review
    risk_level = Column(String(20), nullable=False)  # low, medium, high, critical
    
    # Timeline
    due_date = Column(DateTime, nullable=True)
    last_reviewed = Column(DateTime, nullable=True)
    next_review_date = Column(DateTime, nullable=True)
    
    # AI Analysis
    ai_compliance_score = Column(Numeric(3, 2), nullable=True)
    ai_recommendations = Column(Text, nullable=True)
    
    # Metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    client = relationship("Client")

# ========== KNOWLEDGE MANAGEMENT ==========

class KnowledgeItem(Base):
    __tablename__ = "knowledge_items"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_by = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    # Content
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    summary = Column(Text, nullable=True)
    category = Column(String(100), nullable=False)
    tags = Column(ARRAY(String), nullable=True)
    
    # Classification
    content_type = Column(String(50), nullable=False)  # case_law, statute, regulation, memo, template
    jurisdiction = Column(String(100), nullable=True)
    practice_area = Column(String(100), nullable=True)
    
    # AI Enhancement
    ai_extracted_concepts = Column(JSONB, nullable=True)
    ai_related_items = Column(ARRAY(String), nullable=True)
    
    # Access Control
    is_public = Column(Boolean, default=False)
    access_level = Column(String(20), default="firm_wide")
    
    # Metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    creator = relationship("User")

# ========== VENDOR & THIRD PARTY MANAGEMENT ==========

class Vendor(Base):
    __tablename__ = "vendors"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Basic Information
    name = Column(String(255), nullable=False)
    vendor_type = Column(String(100), nullable=False)  # expert_witness, court_reporter, process_server, etc.
    
    # Contact Information
    primary_contact = Column(String(255), nullable=True)
    email = Column(String(255), nullable=True)
    phone = Column(String(20), nullable=True)
    
    # Address
    address_line_1 = Column(String(255), nullable=True)
    city = Column(String(100), nullable=True)
    state = Column(String(10), nullable=True)
    
    # Business Details
    business_license = Column(String(100), nullable=True)
    insurance_verified = Column(Boolean, default=False)
    security_clearance = Column(String(20), nullable=True)
    
    # Performance
    rating = Column(Numeric(2, 1), nullable=True)
    total_engagements = Column(Integer, default=0)
    
    # Metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_active = Column(Boolean, default=True)

# ========== SECURITY & AUDIT ==========

class AuditLog(Base):
    __tablename__ = "audit_logs"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Event Information
    event_type = Column(String(50), nullable=False)
    event_category = Column(String(30), nullable=False)  # access, modification, security, system
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    
    # Context
    resource_type = Column(String(50), nullable=True)  # matter, document, client, etc.
    resource_id = Column(String(100), nullable=True)
    client_ip = Column(String(45), nullable=True)
    user_agent = Column(String(500), nullable=True)
    
    # Details
    action = Column(String(100), nullable=False)
    details = Column(JSONB, nullable=True)
    before_state = Column(JSONB, nullable=True)
    after_state = Column(JSONB, nullable=True)
    
    # Security
    privilege_level = Column(String(20), nullable=True)
    encryption_used = Column(Boolean, default=False)
    
    # Metadata
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)
    
    # Relationships
    user = relationship("User")

# ========== INDEXES FOR PERFORMANCE ==========

# Security and access indexes
Index('idx_client_access_user_client', ClientAccess.user_id, ClientAccess.client_id)
Index('idx_audit_logs_timestamp', AuditLog.timestamp.desc())
Index('idx_audit_logs_user_resource', AuditLog.user_id, AuditLog.resource_type, AuditLog.resource_id)

# Matter and document indexes
Index('idx_matters_client_status', Matter.client_id, Matter.status)
Index('idx_documents_matter_type', Document.matter_id, Document.document_type)

# Task management indexes
Index('idx_tasks_assignee_status', Task.assignee_id, Task.status)
Index('idx_tasks_due_date', Task.due_date)

# Contract management indexes
Index('idx_contracts_status_expiration', Contract.status, Contract.expiration_date)

# Risk assessment indexes
Index('idx_risk_assessments_category_level', RiskAssessment.risk_category, RiskAssessment.risk_level)
Index('idx_risk_assessments_matter_status', RiskAssessment.matter_id, RiskAssessment.status)

# Import document versioning models
from .document_versioning import DocumentVersion, DocumentComment, DocumentLock, DocumentDiff
