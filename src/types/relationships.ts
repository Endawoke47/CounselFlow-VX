// Central relationship types for the legal application
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

// Entity/Company structure
export interface Entity extends BaseEntity {
  name: string;
  type: "subsidiary" | "parent" | "joint_venture" | "branch";
  jurisdiction: string;
  registrationNumber: string;
  parentEntityId?: string;
  address: Address;
  contacts: Contact[];
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface Contact {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  isPrimary: boolean;
}

// Contract Management with relationships
export interface Contract extends BaseEntity {
  title: string;
  type: ContractType;
  entityId: string; // Links to Entity
  counterpartyId: string; // Links to Counterparty
  templateId?: string; // Links to Template
  status: ContractStatus;
  value: number;
  currency: string;
  startDate: string;
  endDate: string;
  renewalDate?: string;
  autoRenewal: boolean;
  owner: string;
  priority: Priority;
  
  // Relationships
  relatedMatters: string[]; // Matter IDs
  relatedTasks: string[]; // Task IDs
  relatedRisks: string[]; // Risk IDs
  relatedDisputes: string[]; // Dispute IDs
  relatedDocuments: string[]; // Document IDs
  complianceRequirements: string[]; // Compliance requirement IDs
  
  // Metadata
  tags: string[];
  customFields: Record<string, any>;
}

export interface Counterparty extends BaseEntity {
  name: string;
  type: "individual" | "company" | "government" | "ngo";
  registrationNumber?: string;
  jurisdiction?: string;
  address: Address;
  contacts: Contact[];
  riskRating: "low" | "medium" | "high" | "critical";
  
  // Relationships
  contracts: string[]; // Contract IDs
  disputes: string[]; // Dispute IDs
  matters: string[]; // Matter IDs
}

// Matter Management with relationships
export interface Matter extends BaseEntity {
  matterId: string;
  title: string;
  description: string;
  type: MatterType;
  entityId: string; // Links to Entity
  businessUnit: string;
  owner: string;
  status: MatterStatus;
  priority: Priority;
  budget: number;
  spent: number;
  currency: string;
  slaStatus: "on_track" | "at_risk" | "overdue" | "completed";
  riskLevel: RiskLevel;
  
  // Dates
  openedDate: string;
  targetCloseDate: string;
  actualCloseDate?: string;
  
  // Relationships
  relatedContracts: string[]; // Contract IDs
  relatedTasks: string[]; // Task IDs
  relatedRisks: string[]; // Risk IDs
  relatedDisputes: string[]; // Dispute IDs
  outsourcedVendors: string[]; // Vendor IDs for outsourced work
  complianceRequirements: string[]; // Compliance requirement IDs
  
  // External counsel
  externalCounsel?: ExternalCounsel;
  
  // Metadata
  tags: string[];
  customFields: Record<string, any>;
}

export interface ExternalCounsel {
  firmId: string;
  firmName: string;
  primaryContact: Contact;
  hourlyRate: number;
  currency: string;
  retainerAmount?: number;
}

// Task Management with relationships
export interface Task extends BaseEntity {
  taskId: string;
  title: string;
  description: string;
  type: TaskType;
  module: ModuleType;
  assignee: string;
  assignedBy: string;
  status: TaskStatus;
  priority: Priority;
  
  // Dates
  dueDate: string;
  startDate?: string;
  completedDate?: string;
  
  // Time tracking
  estimatedHours: number;
  actualHours: number;
  
  // Relationships
  entityId?: string; // Links to Entity
  relatedContractId?: string; // Links to Contract
  relatedMatterId?: string; // Links to Matter
  relatedRiskId?: string; // Links to Risk
  relatedDisputeId?: string; // Links to Dispute
  relatedComplianceId?: string; // Links to Compliance requirement
  parentTaskId?: string; // For subtasks
  dependentTasks: string[]; // Task IDs that depend on this task
  
  // Metadata
  tags: string[];
  customFields: Record<string, any>;
}

// Risk Management with relationships
export interface Risk extends BaseEntity {
  riskId: string;
  title: string;
  description: string;
  category: RiskCategory;
  riskLevel: RiskLevel;
  probability: number; // 1-100
  impact: ImpactLevel;
  riskScore: number; // Calculated score
  status: RiskStatus;
  owner: string;
  
  // Dates
  identifiedDate: string;
  reviewDate: string;
  mitigationDeadline?: string;
  
  // Relationships
  entityId?: string; // Links to Entity
  relatedContracts: string[]; // Contract IDs
  relatedMatters: string[]; // Matter IDs
  relatedTasks: string[]; // Task IDs (mitigation actions)
  relatedDisputes: string[]; // Dispute IDs
  relatedCompliance: string[]; // Compliance requirement IDs
  
  // Mitigation
  mitigationActions: MitigationAction[];
  
  // Metadata
  tags: string[];
  customFields: Record<string, any>;
}

export interface MitigationAction {
  id: string;
  description: string;
  owner: string;
  dueDate: string;
  status: "not_started" | "in_progress" | "completed" | "overdue";
  relatedTaskId?: string; // Links to Task
}

// Dispute Resolution with relationships
export interface Dispute extends BaseEntity {
  disputeId: string;
  title: string;
  description: string;
  type: DisputeType;
  entityId: string; // Links to Entity
  counterpartyId: string; // Links to Counterparty
  status: DisputeStatus;
  priority: Priority;
  
  // Financial
  exposure: number;
  provisioned: boolean;
  provisionAmount?: number;
  currency: string;
  
  // Dates
  initiatedDate: string;
  deadline?: string;
  resolvedDate?: string;
  
  // Legal details
  jurisdiction: string;
  governingLaw: string;
  disputeResolutionMethod: "litigation" | "arbitration" | "mediation" | "negotiation";
  
  // Relationships
  relatedContracts: string[]; // Contract IDs
  relatedMatters: string[]; // Matter IDs
  relatedTasks: string[]; // Task IDs
  relatedRisks: string[]; // Risk IDs
  
  // External counsel
  externalCounsel?: ExternalCounsel;
  
  // Metadata
  tags: string[];
  customFields: Record<string, any>;
}

// Knowledge Management with relationships
export interface Template extends BaseEntity {
  title: string;
  type: ContractType;
  version: string;
  jurisdiction: string;
  entityId?: string; // Links to Entity (if entity-specific)
  status: "active" | "draft" | "under_review" | "archived";
  author: string;
  accessLevel: "private" | "team" | "legal_team" | "org_wide";
  
  // Content
  content: string;
  clauses: TemplateClause[];
  
  // Usage tracking
  usageCount: number;
  lastUsed?: string;
  
  // Relationships
  relatedContracts: string[]; // Contract IDs using this template
  parentTemplateId?: string; // For template versions
  
  // Metadata
  tags: string[];
  customFields: Record<string, any>;
}

export interface TemplateClause {
  id: string;
  title: string;
  content: string;
  type: "standard" | "optional" | "conditional";
  position: number;
  relatedClauseLibraryId?: string;
}

// Compliance & Data Protection with relationships
export interface ComplianceRequirement extends BaseEntity {
  title: string;
  framework: ComplianceFramework;
  requirement: string;
  description: string;
  status: ComplianceStatus;
  priority: Priority;
  score: number; // 1-100
  
  // Dates
  lastAssessment: string;
  nextReview: string;
  deadline?: string;
  
  // Ownership
  owner: string;
  reviewer: string;
  
  // Relationships
  entityId?: string; // Links to Entity
  relatedContracts: string[]; // Contract IDs
  relatedMatters: string[]; // Matter IDs
  relatedTasks: string[]; // Task IDs
  relatedRisks: string[]; // Risk IDs
  
  // Evidence and documentation
  evidenceDocuments: string[]; // Document IDs
  
  // Metadata
  tags: string[];
  customFields: Record<string, any>;
}

// Enums and Types
export type ContractType = 
  | "employment" | "service_agreement" | "license_agreement" | "nda" 
  | "purchase_agreement" | "lease" | "vendor_agreement" | "partnership"
  | "consultancy" | "software_license" | "real_estate" | "other";

export type ContractStatus = 
  | "draft" | "under_review" | "approved" | "executed" | "active" 
  | "expiring" | "expired" | "terminated" | "renewed";

export type MatterType = 
  | "contract_review" | "legal_advice" | "compliance" | "litigation" 
  | "employment" | "ip" | "regulatory" | "corporate" | "real_estate" | "other";

export type MatterStatus = 
  | "open" | "in_progress" | "pending_review" | "on_hold" | "completed" | "cancelled";

export type TaskType = 
  | "review" | "draft" | "research" | "filing" | "meeting" | "approval" 
  | "compliance_check" | "due_diligence" | "negotiation" | "other";

export type TaskStatus = 
  | "not_started" | "in_progress" | "completed" | "overdue" | "blocked" | "cancelled";

export type ModuleType = 
  | "contracts" | "matters" | "tasks" | "risks" | "disputes" | "compliance" 
  | "ip" | "company_secretarial" | "dealflow" | "knowledge" | "other";

export type Priority = "low" | "medium" | "high" | "critical";

export type RiskLevel = "low" | "medium" | "high" | "critical";

export type RiskCategory = 
  | "regulatory" | "operational" | "financial" | "strategic" | "legal" 
  | "cyber_security" | "reputational" | "compliance" | "other";

export type RiskStatus = 
  | "open" | "in_progress" | "mitigated" | "monitoring" | "closed";

export type ImpactLevel = "low" | "medium" | "high" | "critical";

export type DisputeType = 
  | "contract_breach" | "employment" | "ip_infringement" | "regulatory" 
  | "commercial" | "real_estate" | "other";

export type DisputeStatus = 
  | "open" | "in_review" | "negotiation" | "mediation" | "arbitration" 
  | "litigation" | "escalated" | "resolved" | "closed";

export type ComplianceFramework = 
  | "gdpr" | "ccpa" | "sox" | "hipaa" | "pci_dss" | "iso27001" | "other";

export type ComplianceStatus = 
  | "compliant" | "non_compliant" | "in_progress" | "needs_review" | "not_applicable";
