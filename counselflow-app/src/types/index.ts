// Core CounselFlow Type Definitions
import { ReactNode } from 'react'

// User Management Types
export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  firm: string
  jurisdiction: string
  barAdmissions: string[]
  preferredLanguage: LanguageCode
  securityClearance: SecurityLevel
  lastLogin: Date
  permissions: Permission[]
}

export type UserRole = 
  | 'super_admin'
  | 'firm_admin' 
  | 'senior_partner'
  | 'partner'
  | 'senior_associate'
  | 'associate'
  | 'paralegal'
  | 'legal_assistant'
  | 'compliance_officer'
  | 'guest'

export type SecurityLevel = 'standard' | 'elevated' | 'restricted' | 'classified'
export type LanguageCode = 'en' | 'fr' | 'ar' | 'sw'

// Client & Matter Types
export interface Client {
  id: string
  name: string
  type: ClientType
  industry: string
  jurisdiction: string
  encryptionKeyId: string
  privilegeLevel: PrivilegeLevel
  conflictStatus: ConflictStatus
  matters: Matter[]
  createdAt: Date
  metadata: Record<string, unknown>
}

export type ClientType = 'individual' | 'corporation' | 'government' | 'non_profit'
export type PrivilegeLevel = 'standard' | 'elevated' | 'maximum'
export type ConflictStatus = 'cleared' | 'pending' | 'flagged' | 'blocked'

export interface Matter {
  id: string
  title: string
  description: string
  type: MatterType
  status: MatterStatus
  priority: Priority
  clientId: string
  assignedLawyers: User[]
  documents: LegalDocument[]
  businessInsights: BusinessInsight[]
  riskScore: number
  budget: number
  actualCost: number
  deadlines: Deadline[]
  createdAt: Date
  updatedAt: Date
}

export type MatterType = 
  | 'litigation'
  | 'contract_negotiation'
  | 'compliance'
  | 'mergers_acquisitions'
  | 'intellectual_property'
  | 'employment'
  | 'regulatory'
  | 'corporate_governance'
  | 'real_estate'
  | 'tax'

export type MatterStatus = 'active' | 'pending' | 'on_hold' | 'completed' | 'cancelled'
export type Priority = 'low' | 'medium' | 'high' | 'critical'

// Document Management Types
export interface LegalDocument {
  id: string
  title: string
  type: DocumentType
  content: string // Encrypted in production
  originalLanguage: LanguageCode
  availableTranslations: Record<LanguageCode, string>
  clientId: string
  matterId?: string
  createdBy: string
  analyticsAnalysis?: DocumentAnalyticsAnalysis
  riskScore?: number
  privilegeProtected: boolean
  retentionPolicy: string
  version: number
  status: DocumentStatus
  metadata: DocumentMetadata
  createdAt: Date
  updatedAt: Date
}

export type DocumentType = 
  | 'contract'
  | 'pleading'
  | 'brief'
  | 'memorandum'
  | 'agreement'
  | 'policy'
  | 'correspondence'
  | 'evidence'
  | 'regulatory_filing'
  | 'patent_application'
  | 'trademark_filing'

export type DocumentStatus = 'draft' | 'review' | 'approved' | 'executed' | 'archived'

export interface DocumentMetadata {
  fileSize: number
  fileType: string
  checksum: string
  tags: string[]
  customFields: Record<string, unknown>
}

// Analytics Integration Types
export interface AnalyticsAgent {
  id: string
  name: string
  type: AnalyticsAgentType
  capabilities: string[]
  specializations: string[]
  model: string
  confidence: number
  isActive: boolean
}

export type AnalyticsAgentType = 
  | 'legal_researcher'
  | 'contract_analyzer'
  | 'risk_assessor'
  | 'document_generator'
  | 'compliance_monitor'
  | 'litigation_strategist'
  | 'ip_specialist'
  | 'employment_advisor'
  | 'corporate_counsel'
  | 'privacy_officer'

export interface BusinessInsight {
  id: string
  type: InsightType
  title: string
  description: string
  confidence: number
  severity: Severity
  recommendations: string[]
  source: AnalyticsAgentType
  createdAt: Date
  actionTaken?: string
  feedback?: AnalyticsFeedback
}

export type InsightType = 
  | 'risk_alert'
  | 'compliance_issue'
  | 'contract_anomaly'
  | 'deadline_warning'
  | 'cost_optimization'
  | 'process_improvement'
  | 'legal_precedent'
  | 'regulatory_change'

export type Severity = 'info' | 'low' | 'medium' | 'high' | 'critical'

export interface AnalyticsFeedback {
  rating: number // 1-5
  helpful: boolean
  comment?: string
  userId: string
  timestamp: Date
}

// Risk Management Types
export interface RiskAssessment {
  id: string
  entityId: string
  entityType: RiskEntityType
  riskType: RiskType
  severity: Severity
  probability: number // 0-1
  impact: number // 0-1
  compositeScore: number
  analyticsGenerated: boolean
  humanValidated: boolean
  mitigationStrategy: MitigationStrategy
  status: RiskStatus
  createdAt: Date
  updatedAt: Date
}

export type RiskEntityType = 'client' | 'matter' | 'document' | 'contract' | 'firm'
export type RiskType = 
  | 'legal'
  | 'regulatory'
  | 'financial'
  | 'operational'
  | 'reputational'
  | 'security_compliance'
  | 'compliance'

export interface MitigationStrategy {
  description: string
  actions: MitigationAction[]
  timeline: string
  responsible: string[]
  cost: number
  effectiveness: number
}

export interface MitigationAction {
  id: string
  description: string
  status: ActionStatus
  dueDate: Date
  assignee: string
  completedAt?: Date
}

export type ActionStatus = 'pending' | 'in_progress' | 'completed' | 'overdue'
export type RiskStatus = 'open' | 'monitoring' | 'mitigated' | 'accepted' | 'closed'

// Contract Management Types
export interface AIAnalysis {
  summary: string
  keyPoints: string[]
  riskFactors: RiskFactor[]
  recommendations: string[]
  confidence: number
  processingTime: number
  model: string
  version: string
  lastUpdated: Date
  unusualClauses: string[]
  marketComparison: MarketComparison
  negotiationPoints: NegotiationPoint[]
  complianceIssues: string[]
}

export interface Contract {
  id: string
  title: string
  type: ContractType
  parties: ContractParty[]
  status: ContractStatus
  value: number
  currency: string
  startDate: Date
  endDate: Date
  renewalTerms?: RenewalTerms
  keyTerms: ContractTerm[]
  clauses: ContractClause[]
  analyticsAnalysis?: ContractAnalyticsAnalysis
  aiAnalysis?: AIAnalysis
  riskScore: number
  complianceStatus: ComplianceStatus
  metadata: Record<string, unknown>
  createdAt: Date
  updatedAt: Date
}

export type ContractType = 
  | 'service_agreement'
  | 'employment_contract'
  | 'nda'
  | 'licensing_agreement'
  | 'partnership_agreement'
  | 'vendor_contract'
  | 'lease_agreement'
  | 'merger_agreement'
  | 'joint_venture'

export type ContractStatus = 
  | 'draft'
  | 'under_review'
  | 'pending_approval'
  | 'approved'
  | 'executed'
  | 'active'
  | 'expired'
  | 'terminated'
  | 'breached'
  | 'cancelled'

export interface ContractParty {
  id: string
  name: string
  role: PartyRole
  entityType: string
  jurisdiction: string
  signatory: string
  signatureDate?: Date
}

export type PartyRole = 'client' | 'counterparty' | 'vendor' | 'partner' | 'licensee' | 'licensor'

export interface ContractTerm {
  id: string
  category: string
  description: string
  value?: string | number
  importance: Priority
  negotiable: boolean
  standardDeviation?: number
}

export interface ContractClause {
  id: string
  type: ClauseType
  content: string
  riskLevel: Severity
  isStandard: boolean
  precedentSource?: string
  recommendations: string[]
}

export type ClauseType = 
  | 'termination'
  | 'liability'
  | 'indemnification'
  | 'intellectual_property'
  | 'confidentiality'
  | 'governing_law'
  | 'dispute_resolution'
  | 'force_majeure'
  | 'payment_terms'

// Compliance Types
export interface ComplianceFramework {
  id: string
  name: string
  type: ComplianceType
  jurisdiction: string
  requirements: ComplianceRequirement[]
  lastUpdated: Date
  version: string
}

export type ComplianceType = 'gdpr' | 'ccpa' | 'hipaa' | 'sox' | 'pci_dss' | 'iso_27001' | 'custom'

export interface ComplianceRequirement {
  id: string
  title: string
  description: string
  mandatory: boolean
  deadline?: Date
  status: ComplianceStatus
  evidence: ComplianceEvidence[]
  assignee?: string
}

export type ComplianceStatus = 'compliant' | 'non_compliant' | 'partial' | 'under_review' | 'not_applicable' | 'pending_review' | 'exempt'

export interface ComplianceEvidence {
  id: string
  type: EvidenceType
  description: string
  documentId?: string
  url?: string
  lastVerified: Date
  expiryDate?: Date
}

export type EvidenceType = 'document' | 'policy' | 'procedure' | 'training' | 'audit' | 'certification'

// Shared Utility Types
export interface Deadline {
  id: string
  title: string
  description: string
  dueDate: Date
  type: DeadlineType
  priority: Priority
  status: DeadlineStatus
  assignee: string
  reminders: Reminder[]
}

export type DeadlineType = 'filing' | 'response' | 'payment' | 'renewal' | 'review' | 'court_date'
export type DeadlineStatus = 'pending' | 'completed' | 'overdue' | 'cancelled'

export interface Reminder {
  id: string
  type: ReminderType
  beforeDuration: number // minutes
  sent: boolean
  sentAt?: Date
}

export type ReminderType = 'email' | 'sms' | 'in_app' | 'calendar'

export interface Permission {
  id: string
  name: string
  resource: string
  action: PermissionAction
  conditions?: Record<string, unknown>
}

export type PermissionAction = 'create' | 'read' | 'update' | 'delete' | 'execute' | 'approve'

// Component Types
export interface BaseComponentProps {
  className?: string
  children?: ReactNode
}

export interface ModuleProps extends BaseComponentProps {
  userId: string
  permissions: Permission[]
  language: LanguageCode
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: ApiError
  metadata?: {
    pagination?: PaginationInfo
    filters?: Record<string, unknown>
    sort?: SortInfo
  }
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
}

export interface PaginationInfo {
  page: number
  limit: number
  total: number
  pages: number
}

export interface SortInfo {
  field: string
  direction: 'asc' | 'desc'
}

// Analytics Analysis Types
export interface DocumentAnalyticsAnalysis {
  summary: string
  keyPoints: string[]
  riskFactors: RiskFactor[]
  recommendations: string[]
  confidence: number
  processingTime: number
  model: string
  version: string
}

export interface ContractAnalyticsAnalysis extends DocumentAnalyticsAnalysis {
  unusualClauses: UnusualClause[]
  marketComparison: MarketComparison
  negotiationPoints: NegotiationPoint[]
  complianceIssues: ComplianceIssue[]
}

export interface RiskFactor {
  type: string
  description: string
  severity: Severity
  mitigation: string
  precedent?: string
}

export interface UnusualClause {
  clauseId: string
  type: string
  reason: string
  recommendation: string
  riskLevel: Severity
}

export interface MarketComparison {
  metric: string
  firmValue: number | string
  marketAverage: number | string
  percentile: number
  recommendation: string
}

export interface NegotiationPoint {
  clause: string
  currentTerm: string
  suggestedTerm: string
  rationale: string
  priority: Priority
}

export interface ComplianceIssue {
  framework: string
  requirement: string
  status: ComplianceStatus
  remediation: string
  deadline?: Date
}

// Renewal Terms
export interface RenewalTerms {
  autoRenewal: boolean
  renewalPeriod: number // months
  noticePeriod: number // days
  renegotiationRequired: boolean
  escalationClause?: EscalationClause
}

export interface EscalationClause {
  type: 'percentage' | 'fixed' | 'index'
  value: number
  frequency: 'annual' | 'monthly' | 'quarterly'
  cap?: number
}

// Risk Level
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical'

export interface ComplianceRule {
  id: string
  name: string
  category: string
  status: ComplianceStatus
  lastChecked: Date
  nextReview: Date
  description: string
  severity: string
  automatedChecks: boolean
  violations: number
}

// Task Management Types (Module 3)
export interface Task {
  id: string
  title: string
  description: string
  type: TaskType
  status: TaskStatus
  priority: Priority
  assigneeId: string
  assigneeName: string
  creatorId: string
  dueDate: Date
  estimatedHours?: number
  actualHours?: number
  dependencies: string[]
  tags: string[]
  matterId?: string
  clientId?: string
  attachments: TaskAttachment[]
  comments: TaskComment[]
  reminders: Reminder[]
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
}

export type TaskType = 
  | 'research'
  | 'drafting'
  | 'review'
  | 'filing'
  | 'meeting'
  | 'hearing'
  | 'deadline'
  | 'compliance_check'
  | 'client_communication'
  | 'administrative'

export type TaskStatus = 
  | 'not_started'
  | 'in_progress'
  | 'blocked'
  | 'waiting_review'
  | 'completed'
  | 'cancelled'
  | 'overdue'

export interface TaskAttachment {
  id: string
  name: string
  type: string
  size: number
  url: string
  uploadedBy: string
  uploadedAt: Date
}

export interface TaskComment {
  id: string
  content: string
  authorId: string
  authorName: string
  createdAt: Date
  isInternal: boolean
}

// Entity Management Types (Module 2)
export interface Entity {
  id: string
  name: string
  type: EntityType
  description?: string
  industry: string
  jurisdiction: string
  registrationNumber?: string
  taxId?: string
  address: Address
  contacts: EntityContact[]
  ownership: OwnershipStructure[]
  subsidiaries: string[]
  parentEntity?: string
  complianceStatus: ComplianceStatus
  kycDocuments: KYCDocument[]
  relationships: EntityRelationship[]
  riskLevel: RiskLevel
  metadata: Record<string, unknown>
  createdAt: Date
  updatedAt: Date
}

export type EntityType = 
  | 'corporation'
  | 'llc'
  | 'partnership'
  | 'sole_proprietorship'
  | 'non_profit'
  | 'government'
  | 'individual'
  | 'trust'
  | 'foundation'

export interface Address {
  street: string
  city: string
  state: string
  country: string
  postalCode: string
  isPrimary: boolean
}

export interface EntityContact {
  id: string
  name: string
  role: string
  email: string
  phone: string
  isPrimary: boolean
}

export interface OwnershipStructure {
  ownerId: string
  ownerName: string
  ownerType: EntityType
  percentage: number
  shares?: number
  votingRights: boolean
  effectiveDate: Date
}

export interface KYCDocument {
  id: string
  type: KYCDocumentType
  status: DocumentStatus
  expiryDate?: Date
  verifiedBy?: string
  verifiedAt?: Date
  documentUrl: string
}

export type KYCDocumentType = 
  | 'incorporation_certificate'
  | 'tax_registration'
  | 'beneficial_ownership'
  | 'board_resolution'
  | 'financial_statements'
  | 'identity_verification'
  | 'address_verification'

export interface EntityRelationship {
  id: string
  relatedEntityId: string
  relatedEntityName: string
  relationshipType: RelationshipType
  description?: string
  startDate: Date
  endDate?: Date
  isActive: boolean
}

export type RelationshipType = 
  | 'subsidiary'
  | 'parent'
  | 'affiliate'
  | 'joint_venture'
  | 'vendor'
  | 'client'
  | 'partner'
  | 'competitor'

// Knowledge Management Types (Module 4)
export interface KnowledgeDocument {
  id: string
  title: string
  content: string
  type: KnowledgeDocumentType
  category: string
  tags: string[]
  author: User
  reviewers: User[]
  status: DocumentStatus
  version: string
  language: LanguageCode
  accessLevel: AccessLevel
  searchKeywords: string[]
  precedents: string[]
  relatedDocuments: string[]
  attachments: DocumentAttachment[]
  metadata: KnowledgeMetadata
  createdAt: Date
  updatedAt: Date
  lastAccessedAt?: Date
}

export type KnowledgeDocumentType = 
  | 'template'
  | 'precedent'
  | 'procedure'
  | 'guideline'
  | 'research'
  | 'training_material'
  | 'best_practice'
  | 'legal_memo'
  | 'case_brief'
  | 'statute_analysis'

export type AccessLevel = 'public' | 'internal' | 'restricted' | 'confidential'

export interface DocumentAttachment {
  id: string
  name: string
  type: string
  size: number
  url: string
  description?: string
  uploadedAt: Date
}

export interface KnowledgeMetadata {
  jurisdiction: string[]
  practiceArea: string[]
  complexity: 'low' | 'medium' | 'high'
  usage: number
  rating: number
  feedback: DocumentFeedback[]
}

export interface DocumentFeedback {
  id: string
  userId: string
  rating: number
  comment?: string
  helpful: boolean
  createdAt: Date
}

// Outsourcing & Spend Management Types (Module 8)
export interface Vendor {
  id: string
  name: string
  type: VendorType
  specialties: string[]
  jurisdiction: string[]
  address: Address
  contacts: EntityContact[]
  rates: VendorRate[]
  performanceMetrics: VendorPerformance
  contracts: string[]
  status: VendorStatus
  onboardingDate: Date
  lastEngagement?: Date
  metadata: Record<string, unknown>
}

export type VendorType = 
  | 'law_firm'
  | 'consultant'
  | 'expert_witness'
  | 'court_reporter'
  | 'translator'
  | 'investigator'
  | 'technology_provider'
  | 'service_provider'

export interface VendorRate {
  id: string
  rateType: 'hourly' | 'fixed' | 'contingency' | 'retainer'
  amount: number
  currency: string
  effectiveDate: Date
  endDate?: Date
  description?: string
}

export interface VendorPerformance {
  averageRating: number
  responseTime: number // hours
  qualityScore: number
  costEfficiency: number
  completedEngagements: number
  totalSpend: number
  feedback: VendorFeedback[]
}

export interface VendorFeedback {
  id: string
  engagementId: string
  rating: number
  comment: string
  reviewer: string
  createdAt: Date
}

export type VendorStatus = 'active' | 'inactive' | 'suspended' | 'under_review'

export interface SpendRecord {
  id: string
  vendorId: string
  vendorName: string
  engagementId: string
  description: string
  amount: number
  currency: string
  category: SpendCategory
  approvedBy: string
  approvedAt: Date
  invoiceDate: Date
  dueDate: Date
  paidDate?: Date
  status: SpendStatus
  matterId?: string
  clientId?: string
  billable: boolean
}

export type SpendCategory = 
  | 'legal_fees'
  | 'expert_fees'
  | 'court_costs'
  | 'travel_expenses'
  | 'technology'
  | 'research'
  | 'translation'
  | 'other'

export type SpendStatus = 'pending' | 'approved' | 'paid' | 'overdue' | 'disputed'
