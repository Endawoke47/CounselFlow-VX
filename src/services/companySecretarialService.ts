import { 
  ConstitutionalDocument, 
  BoardMeeting, 
  BoardPack, 
  Resolution, 
  MeetingCalendarEvent,
  CompanySecretarialMetrics 
} from '@/types/company-secretarial';

export class CompanySecretarialService {
  private static instance: CompanySecretarialService;

  public static getInstance(): CompanySecretarialService {
    if (!CompanySecretarialService.instance) {
      CompanySecretarialService.instance = new CompanySecretarialService();
    }
    return CompanySecretarialService.instance;
  }

  // Document Management
  async getConstitutionalDocuments(entityId?: string): Promise<ConstitutionalDocument[]> {
    // Mock data for constitutional documents
    const documents: ConstitutionalDocument[] = [
      {
        id: 'doc-1',
        entityId: 'entity-1',
        type: 'articles_of_association',
        title: 'Articles of Association - Acme Corporation Ltd',
        fileName: 'articles_of_association_acme_2024.pdf',
        fileUrl: '/documents/articles_acme_2024.pdf',
        uploadDate: new Date('2024-01-15'),
        lastModified: new Date('2024-01-15'),
        version: '2024.1',
        status: 'active',
        extractedClauses: [],
        aiAnalysisComplete: true
      },
      {
        id: 'doc-2',
        entityId: 'entity-1',
        type: 'shareholders_agreement',
        title: 'Shareholders Agreement - Acme Corporation Ltd',
        fileName: 'shareholders_agreement_acme_2024.pdf',
        fileUrl: '/documents/shareholders_agreement_acme_2024.pdf',
        uploadDate: new Date('2024-02-01'),
        lastModified: new Date('2024-02-01'),
        version: '2024.1',
        status: 'active',
        extractedClauses: [],
        aiAnalysisComplete: true
      },
      {
        id: 'doc-3',
        entityId: 'entity-2',
        type: 'memorandum',
        title: 'Memorandum of Association - Global Tech Solutions',
        fileName: 'memorandum_globaltech_2024.pdf',
        fileUrl: '/documents/memorandum_globaltech_2024.pdf',
        uploadDate: new Date('2024-03-10'),
        lastModified: new Date('2024-03-10'),
        version: '2024.1',
        status: 'active',
        extractedClauses: [],
        aiAnalysisComplete: false
      }
    ];

    return entityId ? documents.filter(doc => doc.entityId === entityId) : documents;
  }

  async uploadDocument(file: File, entityId: string, type: string): Promise<ConstitutionalDocument> {
    // Simulate file upload
    await this.delay(2000);

    const document: ConstitutionalDocument = {
      id: `doc-${Date.now()}`,
      entityId,
      type: type as any,
      title: file.name,
      fileName: file.name,
      fileUrl: `/documents/${file.name}`,
      uploadDate: new Date(),
      lastModified: new Date(),
      version: '1.0',
      status: 'active',
      extractedClauses: [],
      aiAnalysisComplete: false
    };

    return document;
  }

  // Meeting Management
  async getMeetings(entityId?: string): Promise<BoardMeeting[]> {
    const meetings: BoardMeeting[] = [
      {
        id: 'meeting-1',
        entityId: 'entity-1',
        title: 'Q4 2024 Board Meeting',
        type: 'board',
        scheduledDate: new Date('2024-12-15'),
        scheduledTime: '14:00',
        status: 'confirmed',
        location: 'Board Room, Level 15',
        isVirtual: false,
        noticeRequired: 7,
        noticeSent: true,
        noticeSentDate: new Date('2024-12-08'),
        agenda: [
          {
            id: 'agenda-1',
            order: 1,
            title: 'Review of Q4 Financial Performance',
            description: 'Discussion of quarterly results and year-end projections',
            presenter: 'CFO',
            estimatedDuration: 30,
            attachments: ['q4_financial_report.pdf']
          },
          {
            id: 'agenda-2',
            order: 2,
            title: 'Approval of Annual Budget 2025',
            description: 'Review and approval of proposed budget for next fiscal year',
            presenter: 'CEO',
            estimatedDuration: 45,
            attachments: ['budget_2025_draft.xlsx']
          }
        ],
        attendees: [
          {
            id: 'attendee-1',
            name: 'John Smith',
            email: 'john.smith@company.com',
            role: 'director',
            isRequired: true,
            responseStatus: 'accepted',
            signatureRequired: true,
            signatureStatus: 'pending'
          },
          {
            id: 'attendee-2',
            name: 'Jane Doe',
            email: 'jane.doe@company.com',
            role: 'secretary',
            isRequired: true,
            responseStatus: 'accepted',
            signatureRequired: false,
            signatureStatus: 'not_required'
          }
        ],
        resolutions: [],
        minutesApproved: false
      },
      {
        id: 'meeting-2',
        entityId: 'entity-1',
        title: 'Annual General Meeting 2024',
        type: 'agm',
        scheduledDate: new Date('2024-12-20'),
        scheduledTime: '10:00',
        status: 'tentative',
        location: 'Virtual Meeting',
        isVirtual: true,
        noticeRequired: 21,
        noticeSent: false,
        agenda: [
          {
            id: 'agenda-3',
            order: 1,
            title: 'Adoption of Annual Accounts',
            description: 'Review and adoption of audited financial statements',
            presenter: 'Chairman',
            estimatedDuration: 20,
            attachments: ['annual_accounts_2024.pdf']
          }
        ],
        attendees: [],
        resolutions: [],
        minutesApproved: false
      }
    ];

    return entityId ? meetings.filter(meeting => meeting.entityId === entityId) : meetings;
  }

  async createMeeting(meetingData: Partial<BoardMeeting>): Promise<BoardMeeting> {
    await this.delay(1000);

    const meeting: BoardMeeting = {
      id: `meeting-${Date.now()}`,
      entityId: meetingData.entityId || '',
      title: meetingData.title || '',
      type: meetingData.type || 'board',
      scheduledDate: meetingData.scheduledDate || new Date(),
      scheduledTime: meetingData.scheduledTime || '10:00',
      status: 'tentative',
      location: meetingData.location || '',
      isVirtual: meetingData.isVirtual || false,
      noticeRequired: meetingData.noticeRequired || 7,
      noticeSent: false,
      agenda: meetingData.agenda || [],
      attendees: meetingData.attendees || [],
      resolutions: [],
      minutesApproved: false
    };

    return meeting;
  }

  // Board Pack Management
  async createBoardPack(meetingId: string, documents: File[]): Promise<BoardPack> {
    await this.delay(2000);

    const boardPackDocuments = documents.map((file, index) => ({
      id: `doc-${Date.now()}-${index}`,
      title: file.name,
      fileName: file.name,
      fileUrl: `/board-packs/${file.name}`,
      order: index + 1,
      requiresSignature: file.name.toLowerCase().includes('resolution') || file.name.toLowerCase().includes('minutes'),
      signatureStatus: 'pending' as const
    }));

    const boardPack: BoardPack = {
      id: `pack-${Date.now()}`,
      meetingId,
      title: `Board Pack - Meeting ${meetingId}`,
      documents: boardPackDocuments,
      createdDate: new Date(),
      status: 'draft'
    };

    return boardPack;
  }

  async sendBoardPackForSignature(boardPackId: string): Promise<{ workflowId: string }> {
    await this.delay(1500);

    // Simulate e-signature workflow creation
    const workflowId = `workflow-${Date.now()}`;
    
    return { workflowId };
  }

  // Calendar and Events
  async getCalendarEvents(startDate: Date, endDate: Date): Promise<MeetingCalendarEvent[]> {
    const meetings = await this.getMeetings();
    
    return meetings
      .filter(meeting => {
        const meetingDate = new Date(meeting.scheduledDate);
        return meetingDate >= startDate && meetingDate <= endDate;
      })
      .map(meeting => ({
        id: meeting.id,
        meetingId: meeting.id,
        title: meeting.title,
        entityName: this.getEntityName(meeting.entityId),
        date: new Date(meeting.scheduledDate),
        time: meeting.scheduledTime,
        type: meeting.type,
        status: meeting.status,
        location: meeting.location,
        isVirtual: meeting.isVirtual,
        attendeeCount: meeting.attendees.length,
        hasNoticeRequirement: meeting.noticeRequired > 0,
        noticeDeadline: this.calculateNoticeDeadline(meeting.scheduledDate, meeting.noticeRequired),
        noticeSent: meeting.noticeSent
      }));
  }

  // Resolutions Management
  async getResolutions(entityId?: string): Promise<Resolution[]> {
    const resolutions: Resolution[] = [
      {
        id: 'res-1',
        entityId: 'entity-1',
        type: 'ordinary',
        title: 'Appointment of New Director',
        description: 'Resolution to appoint Sarah Johnson as Director',
        resolutionText: 'RESOLVED THAT Sarah Johnson be and is hereby appointed as a Director of the Company with effect from 1st January 2025.',
        proposedDate: new Date('2024-12-01'),
        passedDate: new Date('2024-12-15'),
        status: 'passed',
        votingResults: {
          totalVotes: 5,
          votesFor: 5,
          votesAgainst: 0,
          abstentions: 0,
          requiredMajority: 50,
          passed: true
        },
        executionBlocks: [
          {
            id: 'exec-1',
            type: 'director_signature',
            signatoryName: 'John Smith',
            signatoryTitle: 'Chairman',
            signatoryEmail: 'chairman@company.com',
            signatureDate: new Date('2024-12-15'),
            signatureStatus: 'signed'
          }
        ],
        aiGenerated: false
      }
    ];

    return entityId ? resolutions.filter(res => res.entityId === entityId) : resolutions;
  }

  // Metrics and Analytics
  async getMetrics(): Promise<CompanySecretarialMetrics> {
    await this.delay(500);

    return {
      totalEntities: 247,
      activeEntities: 231,
      dormantEntities: 16,
      pendingFilings: 23,
      overdueFilings: 3,
      upcomingMeetings: 12,
      tentativeMeetings: 5,
      confirmedMeetings: 7,
      documentsUploaded: 156,
      clausesExtracted: 423,
      resolutionsDrafted: 89,
      boardPacksSent: 34,
      complianceAlerts: 8
    };
  }

  // Helper methods
  private getEntityName(entityId: string): string {
    const entityNames: Record<string, string> = {
      'entity-1': 'Acme Corporation Ltd',
      'entity-2': 'Global Tech Solutions Pte Ltd',
      'entity-3': 'Innovation Holdings Inc'
    };
    return entityNames[entityId] || 'Unknown Entity';
  }

  private calculateNoticeDeadline(meetingDate: Date, noticeRequired: number): Date {
    const deadline = new Date(meetingDate);
    deadline.setDate(deadline.getDate() - noticeRequired);
    return deadline;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const companySecretarialService = CompanySecretarialService.getInstance(); 