export interface ConstitutionalDocument {
  id: string;
  entityId: string;
  type: 'articles_of_association' | 'memorandum' | 'shareholders_agreement' | 'bylaws' | 'charter' | 'other';
  title: string;
  fileName: string;
  fileUrl: string;
  uploadDate: Date;
  lastModified: Date;
  version: string;
  status: 'active' | 'superseded' | 'draft';
  extractedClauses: ExtractedClause[];
  aiAnalysisComplete: boolean;
}

export interface ExtractedClause {
  id: string;
  documentId: string;
  type: 'notice_period_board' | 'notice_period_shareholder' | 'quorum_board' | 'quorum_shareholder' | 
        'voting_threshold' | 'director_appointment' | 'share_transfer' | 'dividend_policy' | 'other';
  title: string;
  content: string;
  pageNumber?: number;
  confidence: number;
  extractedAt: Date;
}

export interface BoardMeeting {
  id: string;
  entityId: string;
  title: string;
  type: 'board' | 'agm' | 'egm' | 'committee' | 'audit' | 'remuneration';
  scheduledDate: Date;
  scheduledTime: string;
  status: 'tentative' | 'confirmed' | 'completed' | 'cancelled';
  location: string;
  isVirtual: boolean;
  noticeRequired: number; // days
  noticeSent: boolean;
  noticeSentDate?: Date;
  agenda: AgendaItem[];
  attendees: MeetingAttendee[];
  boardPack?: BoardPack;
  resolutions: Resolution[];
  minutes?: string;
  minutesApproved: boolean;
}

export interface AgendaItem {
  id: string;
  order: number;
  title: string;
  description?: string;
  presenter?: string;
  estimatedDuration?: number;
  attachments: string[];
}

export interface MeetingAttendee {
  id: string;
  name: string;
  email: string;
  role: 'director' | 'secretary' | 'observer' | 'advisor';
  isRequired: boolean;
  responseStatus: 'pending' | 'accepted' | 'declined' | 'tentative';
  signatureRequired: boolean;
  signatureStatus: 'pending' | 'signed' | 'not_required';
}

export interface BoardPack {
  id: string;
  meetingId: string;
  title: string;
  documents: BoardPackDocument[];
  createdDate: Date;
  sentDate?: Date;
  status: 'draft' | 'sent' | 'completed';
  eSignatureWorkflowId?: string;
}

export interface BoardPackDocument {
  id: string;
  title: string;
  fileName: string;
  fileUrl: string;
  order: number;
  requiresSignature: boolean;
  signatureStatus: 'pending' | 'signed' | 'not_required';
}

export interface Resolution {
  id: string;
  meetingId?: string;
  entityId: string;
  type: 'ordinary' | 'special' | 'written' | 'unanimous';
  title: string;
  description: string;
  resolutionText: string;
  proposedDate: Date;
  passedDate?: Date;
  status: 'draft' | 'proposed' | 'passed' | 'rejected' | 'withdrawn';
  votingResults?: VotingResults;
  executionBlocks: ExecutionBlock[];
  aiGenerated: boolean;
  templateUsed?: string;
}

export interface VotingResults {
  totalVotes: number;
  votesFor: number;
  votesAgainst: number;
  abstentions: number;
  requiredMajority: number;
  passed: boolean;
}

export interface ExecutionBlock {
  id: string;
  type: 'director_signature' | 'secretary_signature' | 'witness_signature' | 'company_seal';
  signatoryName: string;
  signatoryTitle: string;
  signatoryEmail?: string;
  signatureDate?: Date;
  signatureStatus: 'pending' | 'signed';
  signatureImageUrl?: string;
}

export interface DocumentQuery {
  id: string;
  documentId: string;
  query: string;
  response: string;
  confidence: number;
  relevantClauses: string[];
  timestamp: Date;
}

export interface MeetingCalendarEvent {
  id: string;
  meetingId: string;
  title: string;
  entityName: string;
  date: Date;
  time: string;
  type: 'board' | 'agm' | 'egm' | 'committee';
  status: 'tentative' | 'confirmed' | 'completed' | 'cancelled';
  location: string;
  isVirtual: boolean;
  attendeeCount: number;
  hasNoticeRequirement: boolean;
  noticeDeadline?: Date;
  noticeSent: boolean;
}

export interface AIResolutionTemplate {
  id: string;
  title: string;
  category: 'director_appointment' | 'share_allotment' | 'banking_resolution' | 'dividend_declaration' | 
           'contract_approval' | 'policy_adoption' | 'other';
  template: string;
  variables: TemplateVariable[];
  jurisdiction: string;
  lastUpdated: Date;
}

export interface TemplateVariable {
  name: string;
  type: 'text' | 'date' | 'number' | 'select';
  label: string;
  required: boolean;
  options?: string[];
  defaultValue?: string;
}

export interface CompanySecretarialMetrics {
  totalEntities: number;
  activeEntities: number;
  dormantEntities: number;
  pendingFilings: number;
  overdueFilings: number;
  upcomingMeetings: number;
  tentativeMeetings: number;
  confirmedMeetings: number;
  documentsUploaded: number;
  clausesExtracted: number;
  resolutionsDrafted: number;
  boardPacksSent: number;
  complianceAlerts: number;
} 