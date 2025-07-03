// Core TypeScript interfaces for CounselFlow Legal Management System (Next.js App)

// Base Entity Interface
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

// User Management Types
export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  department?: string;
  isActive: boolean;
  lastLogin?: string;
  securityClearanceLevel: SecurityClearanceLevel;
  mfaEnabled: boolean;
  profilePictureUrl?: string;
}

export enum UserRole {
  ADMIN = 'admin',
  PARTNER = 'partner',
  ATTORNEY = 'attorney',
  PARALEGAL = 'paralegal',
  SECRETARY = 'secretary',
  CLIENT = 'client',
  EXTERNAL_COUNSEL = 'external_counsel'
}

export enum SecurityClearanceLevel {
  PUBLIC = 'public',
  CONFIDENTIAL = 'confidential',
  SECRET = 'secret',
  TOP_SECRET = 'top_secret'
}

// Authentication Types
export interface LoginCredentials {
  email: string;
  password: string;
  mfaCode?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
  expiresIn: number;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  department?: string;
}

// Contract Management Types
export interface Contract extends BaseEntity {
  title: string;
  description: string;
  contractType: ContractType;
  status: ContractStatus;
  clientEntity: string;
  counterparty: string;
  startDate: string;
  endDate: string;
  renewalDate?: string;
  value: number;
  currency: string;
  owner: string;
  assignedLawyer: string;
  tags: string[];
  priority: Priority;
  riskLevel: RiskLevel;
  documentUrls: string[];
  notes: string;
  customFields: Record<string, unknown>;
}

export enum ContractType {
  SERVICE_AGREEMENT = 'service_agreement',
  EMPLOYMENT_CONTRACT = 'employment_contract',
  NDA = 'nda',
  LICENSING_AGREEMENT = 'licensing_agreement',
  PARTNERSHIP_AGREEMENT = 'partnership_agreement',
  VENDOR_AGREEMENT = 'vendor_agreement',
  LEASE_AGREEMENT = 'lease_agreement',
  OTHER = 'other'
}

export enum ContractStatus {
  DRAFT = 'draft',
  UNDER_REVIEW = 'under_review',
  PENDING_SIGNATURE = 'pending_signature',
  ACTIVE = 'active',
  EXPIRED = 'expired',
  TERMINATED = 'terminated',
  RENEWED = 'renewed'
}

// Common Enums
export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export enum RiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

// Matter Management Types
export interface Matter extends BaseEntity {
  matterNumber: string;
  title: string;
  description: string;
  client: string;
  matterType: MatterType;
  status: MatterStatus;
  priority: Priority;
  assignedLawyer: string;
  assignedParalegal?: string;
  startDate: string;
  targetEndDate?: string;
  actualEndDate?: string;
  budgetAmount?: number;
  actualCost?: number;
  billingRate?: number;
  timeSpent: number;
  tags: string[];
  riskAssessment: RiskAssessment;
  confidentialityLevel: SecurityClearanceLevel;
  relatedMatters: string[];
  documents: DocumentReference[];
}

export enum MatterType {
  LITIGATION = 'litigation',
  CORPORATE = 'corporate',
  EMPLOYMENT = 'employment',
  INTELLECTUAL_PROPERTY = 'intellectual_property',
  REAL_ESTATE = 'real_estate',
  TAX = 'tax',
  REGULATORY = 'regulatory',
  MERGERS_ACQUISITIONS = 'mergers_acquisitions',
  COMPLIANCE = 'compliance',
  OTHER = 'other'
}

export enum MatterStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  ON_HOLD = 'on_hold',
  CLOSED = 'closed',
  CANCELLED = 'cancelled'
}

// Risk Assessment Types
export interface RiskAssessment {
  financialRisk: RiskLevel;
  reputationalRisk: RiskLevel;
  legalRisk: RiskLevel;
  operationalRisk: RiskLevel;
  overallRisk: RiskLevel;
  mitigationStrategies: string[];
  lastAssessedDate: string;
  assessedBy: string;
}

// Document Management Types
export interface DocumentReference {
  id: string;
  filename: string;
  url: string;
  type: DocumentType;
  size: number;
  uploadedAt: string;
  uploadedBy: string;
  version: number;
  isConfidential: boolean;
  tags: string[];
}

export enum DocumentType {
  CONTRACT = 'contract',
  BRIEF = 'brief',
  MOTION = 'motion',
  CORRESPONDENCE = 'correspondence',
  EVIDENCE = 'evidence',
  RESEARCH = 'research',
  MEMO = 'memo',
  INVOICE = 'invoice',
  OTHER = 'other'
}

// Analytics and Reporting Types
export interface DashboardMetrics {
  totalMatters: number;
  activeContracts: number;
  pendingTasks: number;
  overdueItems: number;
  revenueThisMonth: number;
  billableHours: number;
  clientSatisfaction: number;
  averageResponseTime: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
  }[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface FormValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: FormValidationError[];
  isSubmitting: boolean;
  isValid: boolean;
}

// Component Props Types
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ModalProps extends ComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export interface TableProps<T> extends ComponentProps {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  pagination?: PaginationConfig;
  onRowClick?: (row: T) => void;
}

export interface TableColumn<T> {
  key: keyof T;
  title: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface PaginationConfig {
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number, pageSize: number) => void;
}

// Search and Filter Types
export interface SearchFilters {
  query?: string;
  status?: string[];
  priority?: Priority[];
  assignedTo?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  tags?: string[];
  customFilters?: Record<string, unknown>;
}

export interface SortConfig {
  field: string;
  direction: 'asc' | 'desc';
}

// Notification Types
export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
  metadata?: Record<string, unknown>;
}

export enum NotificationType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  REMINDER = 'reminder'
}

// Theme and UI Types
export interface ThemeConfig {
  mode: 'light' | 'dark';
  primaryColor: string;
  fontFamily: string;
}

export interface SidebarConfig {
  isCollapsed: boolean;
  activeItem: string;
}

// Error Types
export interface ErrorInfo {
  message: string;
  code?: string;
  field?: string;
  timestamp: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

// Loading States
export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

// Async Data States
export interface AsyncDataState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  lastFetch?: string;
}

// Export all types for easy importing
export type {
  BaseEntity,
  User,
  Contract,
  Matter,
  DocumentReference,
  RiskAssessment,
  DashboardMetrics,
  ChartData,
  ApiResponse,
  PaginatedResponse,
  FormValidationError,
  FormState,
  ComponentProps,
  ModalProps,
  TableProps,
  TableColumn,
  PaginationConfig,
  SearchFilters,
  SortConfig,
  Notification,
  ThemeConfig,
  SidebarConfig,
  ErrorInfo,
  ErrorBoundaryState,
  LoadingState,
  AsyncDataState
};