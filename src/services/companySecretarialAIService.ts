import { 
  ConstitutionalDocument, 
  ExtractedClause, 
  Resolution, 
  AIResolutionTemplate, 
  DocumentQuery,
  ExecutionBlock 
} from '@/types/company-secretarial';

export class CompanySecretarialAIService {
  private static instance: CompanySecretarialAIService;

  public static getInstance(): CompanySecretarialAIService {
    if (!CompanySecretarialAIService.instance) {
      CompanySecretarialAIService.instance = new CompanySecretarialAIService();
    }
    return CompanySecretarialAIService.instance;
  }

  // Document Analysis and Clause Extraction
  async analyzeDocument(document: ConstitutionalDocument): Promise<ExtractedClause[]> {
    // Simulate AI document analysis
    await this.delay(2000);
    
    const mockClauses: ExtractedClause[] = [
      {
        id: `clause-${Date.now()}-1`,
        documentId: document.id,
        type: 'notice_period_board',
        title: 'Board Meeting Notice Period',
        content: 'Not less than seven (7) clear days\' notice shall be given to all Directors of any meeting of the Board of Directors.',
        pageNumber: 15,
        confidence: 0.95,
        extractedAt: new Date()
      },
      {
        id: `clause-${Date.now()}-2`,
        documentId: document.id,
        type: 'notice_period_shareholder',
        title: 'General Meeting Notice Period',
        content: 'At least twenty-one (21) clear days\' notice shall be given for Annual General Meetings and fourteen (14) clear days for other general meetings.',
        pageNumber: 23,
        confidence: 0.92,
        extractedAt: new Date()
      },
      {
        id: `clause-${Date.now()}-3`,
        documentId: document.id,
        type: 'quorum_board',
        title: 'Board Meeting Quorum',
        content: 'The quorum for meetings of the Board of Directors shall be two (2) Directors or one-third of the total number of Directors, whichever is greater.',
        pageNumber: 16,
        confidence: 0.88,
        extractedAt: new Date()
      },
      {
        id: `clause-${Date.now()}-4`,
        documentId: document.id,
        type: 'voting_threshold',
        title: 'Special Resolution Threshold',
        content: 'A special resolution requires not less than seventy-five percent (75%) of the votes cast by members entitled to vote.',
        pageNumber: 28,
        confidence: 0.91,
        extractedAt: new Date()
      }
    ];

    return mockClauses;
  }

  // AI Document Query
  async queryDocument(documentId: string, query: string): Promise<DocumentQuery> {
    await this.delay(1500);

    const responses: Record<string, string> = {
      'notice period': 'Based on the constitutional documents, board meetings require 7 clear days\' notice, while general meetings require 21 days for AGMs and 14 days for other meetings.',
      'quorum': 'The quorum for board meetings is 2 directors or one-third of total directors (whichever is greater). For general meetings, the quorum is typically 2 members present in person or by proxy.',
      'voting': 'Ordinary resolutions require a simple majority (>50%) of votes cast. Special resolutions require at least 75% of votes cast by members entitled to vote.',
      'director appointment': 'Directors may be appointed by ordinary resolution of shareholders or by the board (if authorized). The maximum number of directors is typically specified in the articles.',
      'dividend': 'Dividends may be declared by the company in general meeting but shall not exceed the amount recommended by the directors. Interim dividends may be paid by the directors.'
    };

    const defaultResponse = 'I found relevant information in the document. The specific clause states that the matter you\'re asking about is governed by the provisions outlined in sections 12-15 of the constitutional documents.';
    
    const response = Object.keys(responses).find(key => 
      query.toLowerCase().includes(key)
    );

    return {
      id: `query-${Date.now()}`,
      documentId,
      query,
      response: response ? responses[response] : defaultResponse,
      confidence: response ? 0.89 : 0.65,
      relevantClauses: ['clause-1', 'clause-2'],
      timestamp: new Date()
    };
  }

  // AI Resolution Drafting
  async generateResolution(
    template: AIResolutionTemplate, 
    variables: Record<string, any>,
    entityId: string
  ): Promise<Resolution> {
    await this.delay(3000);

    let resolutionText = template.template;
    
    // Replace template variables
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      resolutionText = resolutionText.replace(regex, value);
    });

    // Generate execution blocks based on resolution type
    const executionBlocks = this.generateExecutionBlocks(template.category, variables);

    return {
      id: `resolution-${Date.now()}`,
      entityId,
      type: 'ordinary',
      title: variables.title || template.title,
      description: `AI-generated resolution based on ${template.title} template`,
      resolutionText,
      proposedDate: new Date(),
      status: 'draft',
      executionBlocks,
      aiGenerated: true,
      templateUsed: template.id
    };
  }

  // Get Available Resolution Templates
  getResolutionTemplates(): AIResolutionTemplate[] {
    return [
      {
        id: 'director-appointment',
        title: 'Director Appointment Resolution',
        category: 'director_appointment',
        template: `RESOLVED THAT {{appointeeName}} be and is hereby appointed as a Director of the Company with effect from {{effectiveDate}}.

RESOLVED FURTHER THAT the Company Secretary be and is hereby authorized to file all necessary forms and documents with the relevant regulatory authorities to give effect to the above resolution.

RESOLVED FURTHER THAT any Director or the Company Secretary be and is hereby authorized to do all such acts, deeds and things as may be necessary to give effect to the above resolutions.`,
        variables: [
          { name: 'appointeeName', type: 'text', label: 'Appointee Name', required: true },
          { name: 'effectiveDate', type: 'date', label: 'Effective Date', required: true }
        ],
        jurisdiction: 'General',
        lastUpdated: new Date()
      },
      {
        id: 'banking-resolution',
        title: 'Banking Resolution',
        category: 'banking_resolution',
        template: `RESOLVED THAT the Company be and is hereby authorized to open and maintain a bank account with {{bankName}} (the "Bank").

RESOLVED FURTHER THAT {{authorizedSignatories}} be and are hereby authorized to operate the said bank account and to sign cheques, drafts, and other banking instruments on behalf of the Company.

RESOLVED FURTHER THAT the Bank be and is hereby authorized to honor all cheques, drafts, and instructions signed by any {{numberOfSignatories}} of the authorized signatories.

RESOLVED FURTHER THAT the Company Secretary be and is hereby authorized to provide the Bank with certified copies of this resolution and specimen signatures of the authorized signatories.`,
        variables: [
          { name: 'bankName', type: 'text', label: 'Bank Name', required: true },
          { name: 'authorizedSignatories', type: 'text', label: 'Authorized Signatories', required: true },
          { name: 'numberOfSignatories', type: 'select', label: 'Number of Signatories Required', required: true, options: ['one (1)', 'two (2)', 'three (3)'] }
        ],
        jurisdiction: 'General',
        lastUpdated: new Date()
      },
      {
        id: 'share-allotment',
        title: 'Share Allotment Resolution',
        category: 'share_allotment',
        template: `RESOLVED THAT the Company be and is hereby authorized to allot and issue {{numberOfShares}} ordinary shares of {{parValue}} each to {{allotteeName}} at a price of {{issuePrice}} per share.

RESOLVED FURTHER THAT the consideration for the said shares shall be {{considerationType}} and the same is hereby accepted by the Company.

RESOLVED FURTHER THAT the Directors be and are hereby authorized to do all such acts, deeds and things as may be necessary to give effect to the above resolution including but not limited to updating the register of members and issuing share certificates.`,
        variables: [
          { name: 'numberOfShares', type: 'number', label: 'Number of Shares', required: true },
          { name: 'parValue', type: 'text', label: 'Par Value per Share', required: true },
          { name: 'allotteeName', type: 'text', label: 'Allottee Name', required: true },
          { name: 'issuePrice', type: 'text', label: 'Issue Price per Share', required: true },
          { name: 'considerationType', type: 'select', label: 'Consideration Type', required: true, options: ['cash', 'assets', 'services'] }
        ],
        jurisdiction: 'General',
        lastUpdated: new Date()
      },
      {
        id: 'dividend-declaration',
        title: 'Dividend Declaration Resolution',
        category: 'dividend_declaration',
        template: `RESOLVED THAT a dividend of {{dividendRate}} per share be and is hereby declared on the ordinary shares of the Company for the financial year ended {{financialYearEnd}}.

RESOLVED FURTHER THAT the said dividend shall be paid on {{paymentDate}} to shareholders whose names appear on the register of members as at the close of business on {{recordDate}} (the "Record Date").

RESOLVED FURTHER THAT the Company Secretary be and is hereby authorized to take all necessary steps to effect payment of the dividend including but not limited to preparing dividend warrants and updating the Company's records.`,
        variables: [
          { name: 'dividendRate', type: 'text', label: 'Dividend Rate per Share', required: true },
          { name: 'financialYearEnd', type: 'date', label: 'Financial Year End', required: true },
          { name: 'paymentDate', type: 'date', label: 'Payment Date', required: true },
          { name: 'recordDate', type: 'date', label: 'Record Date', required: true }
        ],
        jurisdiction: 'General',
        lastUpdated: new Date()
      }
    ];
  }

  // Generate execution blocks for resolutions
  private generateExecutionBlocks(category: string, variables: Record<string, any>): ExecutionBlock[] {
    const baseBlocks: ExecutionBlock[] = [
      {
        id: `exec-${Date.now()}-1`,
        type: 'director_signature',
        signatoryName: 'John Smith',
        signatoryTitle: 'Chairman',
        signatoryEmail: 'chairman@company.com',
        signatureStatus: 'pending'
      },
      {
        id: `exec-${Date.now()}-2`,
        type: 'secretary_signature',
        signatoryName: 'Jane Doe',
        signatoryTitle: 'Company Secretary',
        signatoryEmail: 'secretary@company.com',
        signatureStatus: 'pending'
      }
    ];

    // Add additional blocks based on resolution category
    if (category === 'share_allotment' || category === 'banking_resolution') {
      baseBlocks.push({
        id: `exec-${Date.now()}-3`,
        type: 'director_signature',
        signatoryName: 'Robert Johnson',
        signatoryTitle: 'Director',
        signatoryEmail: 'director@company.com',
        signatureStatus: 'pending'
      });
    }

    if (category === 'banking_resolution') {
      baseBlocks.push({
        id: `exec-${Date.now()}-4`,
        type: 'company_seal',
        signatoryName: 'Company Seal',
        signatoryTitle: 'Official Seal',
        signatureStatus: 'pending'
      });
    }

    return baseBlocks;
  }

  // Extract key governance information from documents
  async extractGovernanceInfo(documents: ConstitutionalDocument[]): Promise<{
    boardNoticeRequired: number;
    shareholderNoticeRequired: number;
    boardQuorum: string;
    shareholderQuorum: string;
    specialResolutionThreshold: number;
  }> {
    await this.delay(1000);

    // Mock extraction based on typical constitutional documents
    return {
      boardNoticeRequired: 7,
      shareholderNoticeRequired: 21,
      boardQuorum: '2 directors or 1/3 of total directors',
      shareholderQuorum: '2 members present in person or by proxy',
      specialResolutionThreshold: 75
    };
  }

  // Utility method for simulating async operations
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const companySecretarialAIService = CompanySecretarialAIService.getInstance(); 