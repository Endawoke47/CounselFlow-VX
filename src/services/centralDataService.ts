// Central Data Service - Provides consistent, linked dummy data across all CounselFlow modules
import { ConstitutionalDocument, BoardMeeting, Resolution } from '@/types/company-secretarial';

// Core Entities (Companies/Organizations)
export const ENTITIES = [
  {
    id: 'entity-001',
    name: 'Acme Corporation Ltd',
    type: 'subsidiary',
    jurisdiction: 'United Kingdom',
    companyNumber: 'GB12345678',
    status: 'Active',
    incorporationDate: new Date('2018-03-15'),
    registeredAddress: '123 Business Street, Financial District, London, EC2V 8AS',
    businessAddress: '123 Business Street, Financial District, London, EC2V 8AS',
    industry: 'Technology Services',
    employees: 450,
    revenue: 25000000,
    parentEntityId: null,
    subsidiaries: ['entity-004', 'entity-005'],
    pendingFilings: 2,
    documentCount: 12,
    registerEntries: 18,
    hasOverdue: false,
    riskScore: 'Low',
    complianceStatus: 'Compliant'
  },
  {
    id: 'entity-002',
    name: 'Global Tech Solutions Pte Ltd',
    type: 'subsidiary',
    jurisdiction: 'Singapore',
    companyNumber: 'SG201912345G',
    status: 'Active',
    incorporationDate: new Date('2019-06-20'),
    registeredAddress: '1 Marina Bay, Singapore 018989',
    businessAddress: '1 Marina Bay, Singapore 018989',
    industry: 'Software Development',
    employees: 280,
    revenue: 18000000,
    parentEntityId: 'entity-001',
    subsidiaries: [],
    pendingFilings: 1,
    documentCount: 8,
    registerEntries: 12,
    hasOverdue: true,
    riskScore: 'Medium',
    complianceStatus: 'Action Required'
  },
  {
    id: 'entity-003',
    name: 'Innovation Holdings Inc',
    type: 'holding_company',
    jurisdiction: 'Delaware, USA',
    companyNumber: 'US7891234',
    status: 'Active',
    incorporationDate: new Date('2017-01-10'),
    registeredAddress: '1209 Orange Street, Wilmington, DE 19801',
    businessAddress: '500 Tech Plaza, San Francisco, CA 94105',
    industry: 'Investment Holding',
    employees: 50,
    revenue: 5000000,
    parentEntityId: null,
    subsidiaries: ['entity-001', 'entity-006'],
    pendingFilings: 0,
    documentCount: 15,
    registerEntries: 25,
    hasOverdue: false,
    riskScore: 'Low',
    complianceStatus: 'Compliant'
  },
  {
    id: 'entity-004',
    name: 'Acme Digital Services Ltd',
    type: 'subsidiary',
    jurisdiction: 'United Kingdom',
    companyNumber: 'GB87654321',
    status: 'Active',
    incorporationDate: new Date('2020-09-15'),
    registeredAddress: '456 Innovation Way, Manchester, M1 2AB',
    businessAddress: '456 Innovation Way, Manchester, M1 2AB',
    industry: 'Digital Marketing',
    employees: 120,
    revenue: 8000000,
    parentEntityId: 'entity-001',
    subsidiaries: [],
    pendingFilings: 1,
    documentCount: 6,
    registerEntries: 8,
    hasOverdue: false,
    riskScore: 'Low',
    complianceStatus: 'Compliant'
  },
  {
    id: 'entity-005',
    name: 'Acme Consulting GmbH',
    type: 'subsidiary',
    jurisdiction: 'Germany',
    companyNumber: 'DE123456789',
    status: 'Active',
    incorporationDate: new Date('2021-04-12'),
    registeredAddress: 'Friedrichstraße 123, 10117 Berlin, Germany',
    businessAddress: 'Friedrichstraße 123, 10117 Berlin, Germany',
    industry: 'Management Consulting',
    employees: 85,
    revenue: 6500000,
    parentEntityId: 'entity-001',
    subsidiaries: [],
    pendingFilings: 0,
    documentCount: 9,
    registerEntries: 11,
    hasOverdue: false,
    riskScore: 'Low',
    complianceStatus: 'Compliant'
  },
  {
    id: 'entity-006',
    name: 'TechVenture Capital LP',
    type: 'partnership',
    jurisdiction: 'Delaware, USA',
    companyNumber: 'US9876543',
    status: 'Active',
    incorporationDate: new Date('2019-11-08'),
    registeredAddress: '1209 Orange Street, Wilmington, DE 19801',
    businessAddress: '100 Sand Hill Road, Menlo Park, CA 94025',
    industry: 'Venture Capital',
    employees: 25,
    revenue: 12000000,
    parentEntityId: 'entity-003',
    subsidiaries: [],
    pendingFilings: 0,
    documentCount: 18,
    registerEntries: 15,
    hasOverdue: false,
    riskScore: 'Medium',
    complianceStatus: 'Compliant'
  }
];

// People (Directors, Employees, Contacts)
export const PEOPLE = [
  {
    id: 'person-001',
    firstName: 'John',
    lastName: 'Smith',
    fullName: 'John Smith',
    email: 'john.smith@acmecorp.com',
    phone: '+44 20 7123 4567',
    title: 'Chief Executive Officer',
    department: 'Executive',
    entityId: 'entity-001',
    roles: ['director', 'employee', 'signatory'],
    appointmentDate: new Date('2018-03-15'),
    nationality: 'British',
    address: '789 Executive Row, London, SW1A 1AA',
    isActive: true,
    securityClearance: 'Executive',
    riskLevel: 'Low'
  },
  {
    id: 'person-002',
    firstName: 'Sarah',
    lastName: 'Johnson',
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@acmecorp.com',
    phone: '+44 20 7123 4568',
    title: 'Chief Financial Officer',
    department: 'Finance',
    entityId: 'entity-001',
    roles: ['director', 'employee', 'signatory'],
    appointmentDate: new Date('2018-06-20'),
    nationality: 'British',
    address: '456 Finance Street, London, EC1A 1BB',
    isActive: true,
    securityClearance: 'Executive',
    riskLevel: 'Low'
  },
  {
    id: 'person-003',
    firstName: 'Michael',
    lastName: 'Chen',
    fullName: 'Michael Chen',
    email: 'michael.chen@globaltech.sg',
    phone: '+65 6123 4567',
    title: 'Managing Director',
    department: 'Executive',
    entityId: 'entity-002',
    roles: ['director', 'employee', 'signatory'],
    appointmentDate: new Date('2019-06-20'),
    nationality: 'Singaporean',
    address: '2 Marina Boulevard, Singapore 018987',
    isActive: true,
    securityClearance: 'Executive',
    riskLevel: 'Low'
  },
  {
    id: 'person-004',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    fullName: 'Emily Rodriguez',
    email: 'emily.rodriguez@innovationholdings.com',
    phone: '+1 415 555 0123',
    title: 'Chairman',
    department: 'Board',
    entityId: 'entity-003',
    roles: ['director', 'chairman'],
    appointmentDate: new Date('2017-01-10'),
    nationality: 'American',
    address: '1000 California Street, San Francisco, CA 94108',
    isActive: true,
    securityClearance: 'Board',
    riskLevel: 'Low'
  },
  {
    id: 'person-005',
    firstName: 'David',
    lastName: 'Thompson',
    fullName: 'David Thompson',
    email: 'david.thompson@acmecorp.com',
    phone: '+44 161 123 4567',
    title: 'General Counsel',
    department: 'Legal',
    entityId: 'entity-001',
    roles: ['employee', 'legal_counsel'],
    appointmentDate: new Date('2019-02-15'),
    nationality: 'British',
    address: '123 Legal Chambers, Manchester, M2 3CD',
    isActive: true,
    securityClearance: 'Senior',
    riskLevel: 'Low'
  },
  {
    id: 'person-006',
    firstName: 'Lisa',
    lastName: 'Wang',
    fullName: 'Lisa Wang',
    email: 'lisa.wang@globaltech.sg',
    phone: '+65 6123 4568',
    title: 'Company Secretary',
    department: 'Corporate',
    entityId: 'entity-002',
    roles: ['employee', 'company_secretary'],
    appointmentDate: new Date('2020-01-15'),
    nationality: 'Singaporean',
    address: '3 Marina View, Singapore 018960',
    isActive: true,
    securityClearance: 'Senior',
    riskLevel: 'Low'
  },
  {
    id: 'person-007',
    firstName: 'James',
    lastName: 'Wilson',
    fullName: 'James Wilson',
    email: 'james.wilson@acmedigital.com',
    phone: '+44 161 234 5678',
    title: 'Managing Director',
    department: 'Executive',
    entityId: 'entity-004',
    roles: ['director', 'employee'],
    appointmentDate: new Date('2020-09-15'),
    nationality: 'British',
    address: '789 Digital Avenue, Manchester, M3 4EF',
    isActive: true,
    securityClearance: 'Executive',
    riskLevel: 'Low'
  },
  {
    id: 'person-008',
    firstName: 'Anna',
    lastName: 'Mueller',
    fullName: 'Anna Mueller',
    email: 'anna.mueller@acmeconsulting.de',
    phone: '+49 30 1234 5678',
    title: 'Geschäftsführerin',
    department: 'Executive',
    entityId: 'entity-005',
    roles: ['director', 'employee'],
    appointmentDate: new Date('2021-04-12'),
    nationality: 'German',
    address: 'Unter den Linden 456, 10117 Berlin, Germany',
    isActive: true,
    securityClearance: 'Executive',
    riskLevel: 'Low'
  }
];

// Matters/Cases
export const MATTERS = [
  {
    id: 'matter-001',
    matterNumber: 'MAT-2024-001',
    title: 'Acquisition of TechStart Solutions',
    description: 'Due diligence and acquisition documentation for TechStart Solutions acquisition',
    type: 'M&A',
    status: 'In Progress',
    priority: 'High',
    entityId: 'entity-001',
    clientId: 'entity-001',
    responsibleLawyerId: 'person-001',
    businessUnit: 'Corporate',
    owner: 'John Smith',
    openDate: new Date('2024-01-15'),
    targetCloseDate: new Date('2024-06-30'),
    dueDate: new Date('2024-06-30'),
    estimatedValue: 15000000,
    actualCosts: 125000,
    budgetedCosts: 200000,
    billingRate: 650,
    hoursSpent: 192,
    riskLevel: 'Medium',
    jurisdiction: 'United Kingdom',
    practiceArea: 'Corporate',
    slaStatus: 'On Track',
    tags: ['acquisition', 'due-diligence', 'corporate']
  },
  {
    id: 'matter-002',
    matterNumber: 'MAT-2024-002',
    title: 'Employment Contract Dispute - Singapore',
    description: 'Resolution of employment contract dispute with former senior developer',
    type: 'Employment',
    status: 'Pending Review',
    priority: 'Medium',
    entityId: 'entity-002',
    clientId: 'entity-002',
    responsibleLawyerId: 'person-002',
    businessUnit: 'HR',
    owner: 'Sarah Johnson',
    openDate: new Date('2024-02-20'),
    targetCloseDate: new Date('2024-05-15'),
    dueDate: new Date('2024-05-15'),
    estimatedValue: 250000,
    actualCosts: 35000,
    budgetedCosts: 75000,
    billingRate: 550,
    hoursSpent: 64,
    riskLevel: 'Low',
    jurisdiction: 'Singapore',
    practiceArea: 'Employment',
    slaStatus: 'At Risk',
    tags: ['employment', 'dispute', 'contract']
  },
  {
    id: 'matter-003',
    matterNumber: 'MAT-2024-003',
    title: 'GDPR Compliance Implementation',
    description: 'Implementation of GDPR compliance framework across European operations',
    type: 'Regulatory',
    status: 'Complete',
    priority: 'High',
    entityId: 'entity-001',
    clientId: 'entity-001',
    responsibleLawyerId: 'person-001',
    businessUnit: 'Legal',
    owner: 'John Smith',
    openDate: new Date('2024-01-10'),
    targetCloseDate: new Date('2024-07-31'),
    dueDate: new Date('2024-07-31'),
    estimatedValue: 0,
    actualCosts: 85000,
    budgetedCosts: 150000,
    billingRate: 600,
    hoursSpent: 142,
    riskLevel: 'High',
    jurisdiction: 'European Union',
    practiceArea: 'Data Protection',
    slaStatus: 'Completed',
    tags: ['gdpr', 'compliance', 'data-protection']
  },
  {
    id: 'matter-004',
    matterNumber: 'MAT-2024-004',
    title: 'Digital Marketing Services Agreement',
    description: 'Negotiation and drafting of comprehensive digital marketing services agreement',
    type: 'Commercial',
    status: 'In Progress',
    priority: 'Medium',
    entityId: 'entity-004',
    clientId: 'entity-004',
    responsibleLawyerId: 'person-005',
    businessUnit: 'Commercial',
    owner: 'David Thompson',
    openDate: new Date('2024-03-01'),
    targetCloseDate: new Date('2024-08-15'),
    dueDate: new Date('2024-08-15'),
    estimatedValue: 0,
    actualCosts: 25000,
    budgetedCosts: 50000,
    billingRate: 600,
    hoursSpent: 42,
    riskLevel: 'Low',
    jurisdiction: 'United Kingdom',
    practiceArea: 'Commercial',
    slaStatus: 'On Track',
    tags: ['commercial', 'marketing', 'services']
  },
  {
    id: 'matter-005',
    matterNumber: 'MAT-2024-005',
    title: 'German Subsidiary Compliance Review',
    description: 'Annual compliance review for German consulting subsidiary',
    type: 'Regulatory',
    status: 'Pending',
    priority: 'Medium',
    entityId: 'entity-005',
    clientId: 'entity-005',
    responsibleLawyerId: 'person-005',
    businessUnit: 'Compliance',
    owner: 'David Thompson',
    openDate: new Date('2024-04-01'),
    targetCloseDate: new Date('2024-09-30'),
    dueDate: new Date('2024-09-30'),
    estimatedValue: 0,
    actualCosts: 15000,
    budgetedCosts: 40000,
    billingRate: 550,
    hoursSpent: 27,
    riskLevel: 'Low',
    jurisdiction: 'Germany',
    practiceArea: 'Regulatory',
    slaStatus: 'On Track',
    tags: ['compliance', 'german-law', 'subsidiary']
  }
];

// Contracts
export const CONTRACTS = [
  {
    id: 'contract-001',
    title: 'Master Services Agreement - CloudTech Solutions',
    type: 'Service Agreement',
    status: 'Active',
    entityId: 'entity-001',
    counterpartyName: 'CloudTech Solutions Ltd',
    counterpartyId: 'external-001',
    executionDate: new Date('2024-01-15'),
    effectiveDate: new Date('2024-02-01'),
    expirationDate: new Date('2025-01-31'),
    autoRenewal: true,
    renewalPeriod: 12,
    contractValue: 500000,
    currency: 'GBP',
    paymentTerms: 'Net 30',
    governingLaw: 'English Law',
    jurisdiction: 'England and Wales',
    responsiblePersonId: 'person-001',
    matterId: 'matter-001',
    riskLevel: 'Medium',
    complianceStatus: 'Compliant',
    keyTerms: ['Service Level Agreement', 'Data Processing', 'Termination Rights'],
    renewalNoticeDays: 90,
    tags: ['services', 'technology', 'recurring']
  },
  {
    id: 'contract-002',
    title: 'Software License Agreement - DevTools Pro',
    type: 'License Agreement',
    status: 'Active',
    entityId: 'entity-002',
    counterpartyName: 'DevTools Pro Inc',
    counterpartyId: 'external-002',
    executionDate: new Date('2024-03-10'),
    effectiveDate: new Date('2024-03-15'),
    expirationDate: new Date('2025-03-14'),
    autoRenewal: true,
    renewalPeriod: 12,
    contractValue: 150000,
    currency: 'USD',
    paymentTerms: 'Annual Prepaid',
    governingLaw: 'Singapore Law',
    jurisdiction: 'Singapore',
    responsiblePersonId: 'person-002',
    matterId: null,
    riskLevel: 'Low',
    complianceStatus: 'Compliant',
    keyTerms: ['Usage Rights', 'Support Services', 'Upgrade Rights'],
    renewalNoticeDays: 60,
    tags: ['software', 'license', 'development']
  },
  {
    id: 'contract-003',
    title: 'Office Lease Agreement - London HQ',
    type: 'Real Estate Lease',
    status: 'Active',
    entityId: 'entity-001',
    counterpartyName: 'Prime Properties Ltd',
    counterpartyId: 'external-003',
    executionDate: new Date('2023-06-01'),
    effectiveDate: new Date('2023-07-01'),
    expirationDate: new Date('2028-06-30'),
    autoRenewal: false,
    renewalPeriod: 0,
    contractValue: 2400000,
    currency: 'GBP',
    paymentTerms: 'Monthly in Advance',
    governingLaw: 'English Law',
    jurisdiction: 'England and Wales',
    responsiblePersonId: 'person-002',
    matterId: null,
    riskLevel: 'Medium',
    complianceStatus: 'Compliant',
    keyTerms: ['Rent Review', 'Repair Obligations', 'Assignment Rights'],
    renewalNoticeDays: 180,
    tags: ['real-estate', 'lease', 'headquarters']
  },
  {
    id: 'contract-004',
    title: 'Digital Marketing Services Agreement - AdTech Pro',
    type: 'Service Agreement',
    status: 'Active',
    entityId: 'entity-004',
    counterpartyName: 'AdTech Pro Limited',
    counterpartyId: 'external-004',
    executionDate: new Date('2024-04-01'),
    effectiveDate: new Date('2024-04-15'),
    expirationDate: new Date('2025-04-14'),
    autoRenewal: true,
    renewalPeriod: 12,
    contractValue: 300000,
    currency: 'GBP',
    paymentTerms: 'Monthly in Advance',
    governingLaw: 'English Law',
    jurisdiction: 'England and Wales',
    responsiblePersonId: 'person-007',
    matterId: 'matter-004',
    riskLevel: 'Low',
    complianceStatus: 'Compliant',
    keyTerms: ['Performance Metrics', 'Data Usage Rights', 'Termination Clauses'],
    renewalNoticeDays: 60,
    tags: ['marketing', 'digital-services', 'performance']
  },
  {
    id: 'contract-005',
    title: 'Management Consulting Framework Agreement',
    type: 'Framework Agreement',
    status: 'Active',
    entityId: 'entity-005',
    counterpartyName: 'Strategic Advisors GmbH',
    counterpartyId: 'external-005',
    executionDate: new Date('2024-02-15'),
    effectiveDate: new Date('2024-03-01'),
    expirationDate: new Date('2026-02-28'),
    autoRenewal: false,
    renewalPeriod: 0,
    contractValue: 750000,
    currency: 'EUR',
    paymentTerms: 'Quarterly in Arrears',
    governingLaw: 'German Law',
    jurisdiction: 'Germany',
    responsiblePersonId: 'person-008',
    matterId: 'matter-005',
    riskLevel: 'Medium',
    complianceStatus: 'Compliant',
    keyTerms: ['Scope of Work', 'Intellectual Property', 'Confidentiality'],
    renewalNoticeDays: 120,
    tags: ['consulting', 'framework', 'strategic']
  }
];

// Tasks
export const TASKS = [
  {
    id: 'task-001',
    title: 'Review acquisition due diligence checklist',
    description: 'Complete review of due diligence materials for TechStart acquisition',
    type: 'Review',
    status: 'In Progress',
    priority: 'High',
    assigneeId: 'person-001',
    assignerId: 'person-001',
    entityId: 'entity-001',
    matterId: 'matter-001',
    contractId: null,
    dueDate: new Date('2024-06-20'),
    createdDate: new Date('2024-06-10'),
    estimatedHours: 8,
    actualHours: 5,
    tags: ['due-diligence', 'review', 'urgent'],
    dependencies: [],
    attachments: ['dd-checklist-v2.pdf', 'financial-statements.xlsx']
  },
  {
    id: 'task-002',
    title: 'Draft employment settlement agreement',
    description: 'Prepare settlement agreement for employment dispute resolution',
    type: 'Drafting',
    status: 'Pending',
    priority: 'Medium',
    assigneeId: 'person-002',
    assignerId: 'person-001',
    entityId: 'entity-002',
    matterId: 'matter-002',
    contractId: null,
    dueDate: new Date('2024-06-25'),
    createdDate: new Date('2024-06-12'),
    estimatedHours: 4,
    actualHours: 0,
    tags: ['employment', 'settlement', 'drafting'],
    dependencies: ['task-003'],
    attachments: []
  },
  {
    id: 'task-003',
    title: 'Update GDPR privacy policy',
    description: 'Revise privacy policy to ensure full GDPR compliance',
    type: 'Compliance',
    status: 'Completed',
    priority: 'High',
    assigneeId: 'person-001',
    assignerId: 'person-001',
    entityId: 'entity-001',
    matterId: 'matter-003',
    contractId: null,
    dueDate: new Date('2024-06-30'),
    createdDate: new Date('2024-06-05'),
    estimatedHours: 6,
    actualHours: 6,
    tags: ['gdpr', 'privacy', 'compliance'],
    dependencies: [],
    attachments: ['current-privacy-policy.pdf', 'gdpr-requirements.docx']
  },
  {
    id: 'task-004',
    title: 'Review digital marketing contract terms',
    description: 'Review and negotiate key terms in AdTech Pro services agreement',
    type: 'Review',
    status: 'In Progress',
    priority: 'Medium',
    assigneeId: 'person-007',
    assignerId: 'person-005',
    entityId: 'entity-004',
    matterId: 'matter-004',
    contractId: 'contract-004',
    dueDate: new Date('2024-07-15'),
    createdDate: new Date('2024-06-01'),
    estimatedHours: 6,
    actualHours: 3,
    tags: ['contract-review', 'marketing', 'negotiation'],
    dependencies: [],
    attachments: ['adtech-contract-draft.pdf']
  },
  {
    id: 'task-005',
    title: 'German compliance documentation update',
    description: 'Update compliance documentation for German subsidiary annual review',
    type: 'Compliance',
    status: 'Pending',
    priority: 'Medium',
    assigneeId: 'person-008',
    assignerId: 'person-005',
    entityId: 'entity-005',
    matterId: 'matter-005',
    contractId: null,
    dueDate: new Date('2024-08-30'),
    createdDate: new Date('2024-06-15'),
    estimatedHours: 8,
    actualHours: 0,
    tags: ['compliance', 'documentation', 'german-law'],
    dependencies: [],
    attachments: []
  },
  {
    id: 'task-006',
    title: 'IP portfolio annual review',
    description: 'Conduct annual review of intellectual property portfolio and renewal requirements',
    type: 'Review',
    status: 'Pending',
    priority: 'High',
    assigneeId: 'person-005',
    assignerId: 'person-001',
    entityId: 'entity-001',
    matterId: null,
    contractId: null,
    dueDate: new Date('2024-09-30'),
    createdDate: new Date('2024-06-01'),
    estimatedHours: 12,
    actualHours: 0,
    tags: ['ip', 'portfolio', 'review'],
    dependencies: [],
    attachments: []
  }
];

// Risks
export const RISKS = [
  {
    id: 'risk-001',
    title: 'Regulatory Compliance - GDPR',
    description: 'Potential non-compliance with GDPR data processing requirements',
    category: 'Regulatory',
    severity: 'High',
    probability: 'Medium',
    riskScore: 75,
    status: 'Active',
    entityId: 'entity-001',
    matterId: 'matter-003',
    identifiedDate: new Date('2024-01-15'),
    reviewDate: new Date('2024-06-15'),
    ownerId: 'person-001',
    mitigationPlan: 'Implement comprehensive GDPR compliance framework',
    mitigationStatus: 'In Progress',
    estimatedImpact: 500000,
    tags: ['gdpr', 'regulatory', 'data-protection']
  },
  {
    id: 'risk-002',
    title: 'Contract Renewal Risk - Key Supplier',
    description: 'Risk of unfavorable terms or non-renewal of critical supplier contract',
    category: 'Commercial',
    severity: 'Medium',
    probability: 'Medium',
    riskScore: 50,
    status: 'Active',
    entityId: 'entity-001',
    matterId: null,
    contractId: 'contract-001',
    identifiedDate: new Date('2024-03-01'),
    reviewDate: new Date('2024-09-01'),
    ownerId: 'person-002',
    mitigationPlan: 'Early renewal negotiations and alternative supplier identification',
    mitigationStatus: 'Planned',
    estimatedImpact: 200000,
    tags: ['contract', 'supplier', 'commercial']
  },
  {
    id: 'risk-003',
    title: 'Digital Marketing Performance Risk',
    description: 'Risk of underperformance in digital marketing services delivery',
    category: 'Commercial',
    severity: 'Medium',
    probability: 'Low',
    riskScore: 35,
    status: 'Monitoring',
    entityId: 'entity-004',
    matterId: 'matter-004',
    contractId: 'contract-004',
    identifiedDate: new Date('2024-04-15'),
    reviewDate: new Date('2024-10-15'),
    ownerId: 'person-007',
    mitigationPlan: 'Implement performance monitoring and regular review meetings',
    mitigationStatus: 'In Progress',
    estimatedImpact: 100000,
    tags: ['marketing', 'performance', 'commercial']
  },
  {
    id: 'risk-004',
    title: 'German Regulatory Compliance Risk',
    description: 'Risk of non-compliance with evolving German corporate regulations',
    category: 'Regulatory',
    severity: 'Medium',
    probability: 'Medium',
    riskScore: 50,
    status: 'Active',
    entityId: 'entity-005',
    matterId: 'matter-005',
    identifiedDate: new Date('2024-04-01'),
    reviewDate: new Date('2024-10-01'),
    ownerId: 'person-008',
    mitigationPlan: 'Regular compliance reviews and legal counsel engagement',
    mitigationStatus: 'Planned',
    estimatedImpact: 150000,
    tags: ['regulatory', 'german-law', 'compliance']
  }
];

// Policies
export const POLICIES = [
  {
    id: 'policy-001',
    title: 'Data Protection and Privacy Policy',
    description: 'Comprehensive policy governing data protection and privacy practices',
    type: 'Data Protection',
    status: 'Active',
    version: '2.1',
    entityId: 'entity-001',
    ownerId: 'person-001',
    approvedById: 'person-001',
    effectiveDate: new Date('2024-01-01'),
    reviewDate: new Date('2024-12-31'),
    lastUpdated: new Date('2024-03-15'),
    applicableJurisdictions: ['United Kingdom', 'European Union'],
    relatedMatterId: 'matter-003',
    tags: ['gdpr', 'privacy', 'data-protection'],
    attachments: ['data-protection-policy-v2.1.pdf']
  },
  {
    id: 'policy-002',
    title: 'Code of Conduct and Ethics',
    description: 'Corporate code of conduct and ethical guidelines for all employees',
    type: 'Ethics',
    status: 'Active',
    version: '1.3',
    entityId: 'entity-001',
    ownerId: 'person-001',
    approvedById: 'person-001',
    effectiveDate: new Date('2023-07-01'),
    reviewDate: new Date('2024-07-01'),
    lastUpdated: new Date('2023-12-10'),
    applicableJurisdictions: ['Global'],
    relatedMatterId: null,
    tags: ['ethics', 'conduct', 'compliance'],
    attachments: ['code-of-conduct-v1.3.pdf']
  },
  {
    id: 'policy-003',
    title: 'Digital Marketing Standards Policy',
    description: 'Standards and guidelines for digital marketing activities and data usage',
    type: 'Marketing',
    status: 'Active',
    version: '1.0',
    entityId: 'entity-004',
    ownerId: 'person-007',
    approvedById: 'person-001',
    effectiveDate: new Date('2024-04-01'),
    reviewDate: new Date('2025-04-01'),
    lastUpdated: new Date('2024-04-01'),
    applicableJurisdictions: ['United Kingdom'],
    relatedMatterId: 'matter-004',
    tags: ['marketing', 'digital', 'standards'],
    attachments: ['marketing-standards-v1.0.pdf']
  },
  {
    id: 'policy-004',
    title: 'German Subsidiary Governance Policy',
    description: 'Governance framework and procedures for German consulting operations',
    type: 'Governance',
    status: 'Active',
    version: '2.0',
    entityId: 'entity-005',
    ownerId: 'person-008',
    approvedById: 'person-001',
    effectiveDate: new Date('2024-01-01'),
    reviewDate: new Date('2024-12-31'),
    lastUpdated: new Date('2024-03-15'),
    applicableJurisdictions: ['Germany'],
    relatedMatterId: 'matter-005',
    tags: ['governance', 'german-law', 'subsidiary'],
    attachments: ['german-governance-v2.0.pdf']
  }
];

// Intellectual Property
export const IP_ASSETS = [
  {
    id: 'ip-001',
    title: 'CounselFlow Legal Management System',
    type: 'Trademark',
    status: 'Registered',
    entityId: 'entity-001',
    applicationNumber: 'UK00003456789',
    registrationNumber: 'UK00003456789',
    filingDate: new Date('2023-03-15'),
    registrationDate: new Date('2023-09-20'),
    expirationDate: new Date('2033-09-20'),
    jurisdiction: 'United Kingdom',
    classes: ['Class 9', 'Class 42'],
    description: 'Legal management software and related services',
    inventorIds: ['person-001'],
    assigneeId: 'entity-001',
    matterId: null,
    estimatedValue: 250000,
    maintenanceFees: 5000,
    tags: ['software', 'legal-tech', 'trademark']
  },
  {
    id: 'ip-002',
    title: 'AI-Powered Document Analysis Method',
    type: 'Patent',
    status: 'Pending',
    entityId: 'entity-001',
    applicationNumber: 'US17/123456',
    registrationNumber: null,
    filingDate: new Date('2024-02-10'),
    registrationDate: null,
    expirationDate: null,
    jurisdiction: 'United States',
    classes: ['G06F', 'G06N'],
    description: 'Method and system for AI-powered legal document analysis and clause extraction',
    inventorIds: ['person-001'],
    assigneeId: 'entity-001',
    matterId: null,
    estimatedValue: 500000,
    maintenanceFees: 15000,
    tags: ['ai', 'document-analysis', 'patent']
  },
  {
    id: 'ip-003',
    title: 'Digital Marketing Analytics Platform',
    type: 'Copyright',
    status: 'Registered',
    entityId: 'entity-004',
    applicationNumber: 'UK-CR-2024-001',
    registrationNumber: 'UK-CR-2024-001',
    filingDate: new Date('2024-01-15'),
    registrationDate: new Date('2024-02-20'),
    expirationDate: new Date('2094-02-20'),
    jurisdiction: 'United Kingdom',
    classes: ['Software', 'Analytics'],
    description: 'Proprietary digital marketing analytics and reporting platform',
    inventorIds: ['person-007'],
    assigneeId: 'entity-004',
    matterId: 'matter-004',
    estimatedValue: 150000,
    maintenanceFees: 1000,
    tags: ['software', 'analytics', 'marketing']
  },
  {
    id: 'ip-004',
    title: 'Consulting Methodology Framework',
    type: 'Trade Secret',
    status: 'Active',
    entityId: 'entity-005',
    applicationNumber: null,
    registrationNumber: null,
    filingDate: new Date('2021-04-12'),
    registrationDate: null,
    expirationDate: null,
    jurisdiction: 'Germany',
    classes: ['Methodology', 'Process'],
    description: 'Proprietary consulting methodology and process framework',
    inventorIds: ['person-008'],
    assigneeId: 'entity-005',
    matterId: 'matter-005',
    estimatedValue: 200000,
    maintenanceFees: 500,
    tags: ['consulting', 'methodology', 'trade-secret']
  }
];

// Utility functions to get related data
export class CentralDataService {
  static getEntities() {
    return ENTITIES;
  }

  static getEntityById(id: string) {
    return ENTITIES.find(entity => entity.id === id);
  }

  static getPeople() {
    return PEOPLE;
  }

  static getPersonById(id: string) {
    return PEOPLE.find(person => person.id === id);
  }

  static getPeopleByEntity(entityId: string) {
    return PEOPLE.filter(person => person.entityId === entityId);
  }

  static getMatters() {
    return MATTERS;
  }

  static getMatterById(id: string) {
    return MATTERS.find(matter => matter.id === id);
  }

  static getMattersByEntity(entityId: string) {
    return MATTERS.filter(matter => matter.entityId === entityId);
  }

  static getContracts() {
    return CONTRACTS;
  }

  static getContractById(id: string) {
    return CONTRACTS.find(contract => contract.id === id);
  }

  static getContractsByEntity(entityId: string) {
    return CONTRACTS.filter(contract => contract.entityId === entityId);
  }

  static getTasks() {
    return TASKS;
  }

  static getTaskById(id: string) {
    return TASKS.find(task => task.id === id);
  }

  static getTasksByEntity(entityId: string) {
    return TASKS.filter(task => task.entityId === entityId);
  }

  static getTasksByMatter(matterId: string) {
    return TASKS.filter(task => task.matterId === matterId);
  }

  static getTasksByAssignee(assigneeId: string) {
    return TASKS.filter(task => task.assigneeId === assigneeId);
  }

  static getRisks() {
    return RISKS;
  }

  static getRiskById(id: string) {
    return RISKS.find(risk => risk.id === id);
  }

  static getRisksByEntity(entityId: string) {
    return RISKS.filter(risk => risk.entityId === entityId);
  }

  static getPolicies() {
    return POLICIES;
  }

  static getPolicyById(id: string) {
    return POLICIES.find(policy => policy.id === id);
  }

  static getPoliciesByEntity(entityId: string) {
    return POLICIES.filter(policy => policy.entityId === entityId);
  }

  static getIPAssets() {
    return IP_ASSETS;
  }

  static getIPAssetById(id: string) {
    return IP_ASSETS.find(ip => ip.id === id);
  }

  static getIPAssetsByEntity(entityId: string) {
    return IP_ASSETS.filter(ip => ip.entityId === entityId);
  }

  // Cross-module relationship queries
  static getEntitySummary(entityId: string) {
    const entity = this.getEntityById(entityId);
    if (!entity) return null;

    return {
      entity,
      people: this.getPeopleByEntity(entityId),
      matters: this.getMattersByEntity(entityId),
      contracts: this.getContractsByEntity(entityId),
      tasks: this.getTasksByEntity(entityId),
      risks: this.getRisksByEntity(entityId),
      policies: this.getPoliciesByEntity(entityId),
      ipAssets: this.getIPAssetsByEntity(entityId)
    };
  }

  static getMatterSummary(matterId: string) {
    const matter = MATTERS.find(m => m.id === matterId);
    if (!matter) return null;

    return {
      matter,
      entity: this.getEntityById(matter.entityId),
      responsibleLawyer: this.getPersonById(matter.responsibleLawyerId),
      tasks: this.getTasksByMatter(matterId),
      risks: RISKS.filter(risk => risk.matterId === matterId),
      contracts: CONTRACTS.filter(contract => contract.matterId === matterId)
    };
  }
}