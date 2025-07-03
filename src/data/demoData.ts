// Demo data for the Professional Legal Management System
import { addDays, addMonths, subDays, subMonths, format } from 'date-fns'

// Contract Management Demo Data
export interface Contract {
  id: string;
  title: string;
  counterparty: string;
  type: 'MSA' | 'NDA' | 'Employment' | 'Lease' | 'License';
  value: number;
  startDate: Date;
  endDate: Date;
  status: 'Active' | 'Pending' | 'Expired' | 'Terminated';
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  renewalTerms: string;
  keyMilestones: Milestone[];
  assignedAttorney: string;
  tags: string[];
  keyTerms: string[];
}

export interface Milestone {
  id: string;
  title: string;
  date: Date;
  status: 'Completed' | 'Pending' | 'Overdue';
  description: string;
}

export const contractsData: Contract[] = [
  {
    id: "MSA-2024-001",
    title: "Master Service Agreement - TechCorp Solutions",
    counterparty: "TechCorp Solutions Inc.",
    type: "MSA",
    value: 2500000,
    startDate: new Date('2024-01-15'),
    endDate: new Date('2026-01-14'),
    status: "Active",
    riskLevel: "Medium",
    renewalTerms: "90 days notice required",
    assignedAttorney: "Sarah Johnson",
    keyTerms: ["Software licensing", "maintenance", "support"],
    tags: ["technology", "enterprise", "recurring"],
    keyMilestones: [
      {
        id: "M1",
        title: "Contract Execution",
        date: new Date('2024-01-15'),
        status: "Completed",
        description: "Initial contract signed"
      },
      {
        id: "M2",
        title: "Year 1 Review",
        date: new Date('2025-01-15'),
        status: "Pending",
        description: "Annual contract review"
      }
    ]
  },
  {
    id: "NDA-2024-087",
    title: "NDA - Quantum Innovations",
    counterparty: "Quantum Innovations Ltd.",
    type: "NDA",
    value: 0,
    startDate: new Date('2024-03-22'),
    endDate: new Date('2027-03-21'),
    status: "Active",
    riskLevel: "Low",
    renewalTerms: "Auto-renewal",
    assignedAttorney: "Michael Chen",
    keyTerms: ["Mutual confidentiality", "3-year term"],
    tags: ["confidential", "innovation"],
    keyMilestones: [
      {
        id: "M3",
        title: "NDA Execution",
        date: new Date('2024-03-22'),
        status: "Completed",
        description: "NDA signed by both parties"
      }
    ]
  },
  {
    id: "EMP-2024-034",
    title: "Employment Agreement - Director of Operations",
    counterparty: "Jennifer Martinez",
    type: "Employment",
    value: 185000,
    startDate: new Date('2024-02-01'),
    endDate: new Date('2025-02-01'),
    status: "Active",
    riskLevel: "Low",
    renewalTerms: "Annual review",
    assignedAttorney: "Lisa Park",
    keyTerms: ["Full-time", "At-will", "Stock options"],
    tags: ["executive", "operations"],
    keyMilestones: [
      {
        id: "M4",
        title: "Start Date",
        date: new Date('2024-02-01'),
        status: "Completed",
        description: "Employee start date"
      },
      {
        id: "M5",
        title: "Performance Review",
        date: new Date('2024-08-01'),
        status: "Pending",
        description: "6-month performance review"
      }
    ]
  },
  {
    id: "RE-2023-012",
    title: "Real Estate Lease - Downtown Office",
    counterparty: "Metropolitan Properties LLC",
    type: "Lease",
    value: 2700000,
    startDate: new Date('2023-06-01'),
    endDate: new Date('2028-05-31'),
    status: "Active",
    riskLevel: "Medium",
    renewalTerms: "5-year option",
    assignedAttorney: "Robert Kim",
    keyTerms: ["15,000 sq ft", "$45k monthly"],
    tags: ["real-estate", "headquarters"],
    keyMilestones: [
      {
        id: "M6",
        title: "Lease Commencement",
        date: new Date('2023-06-01'),
        status: "Completed",
        description: "Lease started"
      },
      {
        id: "M7",
        title: "Mid-term Review",
        date: new Date('2025-12-01'),
        status: "Pending",
        description: "Mid-term lease review"
      }
    ]
  },
  {
    id: "LIC-2024-019",
    title: "Software License - Analytics Platform",
    counterparty: "DataFlow Analytics Corp",
    type: "License",
    value: 850000,
    startDate: new Date('2024-04-01'),
    endDate: new Date('2026-03-31'),
    status: "Active",
    riskLevel: "High",
    renewalTerms: "180 days notice required",
    assignedAttorney: "Sarah Johnson",
    keyTerms: ["Enterprise license", "Unlimited users", "Premium support"],
    tags: ["software", "analytics", "enterprise"],
    keyMilestones: [
      {
        id: "M8",
        title: "License Activation",
        date: new Date('2024-04-01'),
        status: "Completed",
        description: "Software license activated"
      },
      {
        id: "M9",
        title: "Usage Review",
        date: new Date('2024-10-01'),
        status: "Pending",
        description: "Quarterly usage review"
      }
    ]
  }
];

// Entity Management Demo Data
export interface Entity {
  id: string;
  name: string;
  type: 'Corporation' | 'LLC' | 'Partnership' | 'Branch';
  jurisdiction: string[];
  formationDate: Date;
  status: 'Active' | 'Inactive' | 'Dissolved';
  parentEntity?: string;
  subsidiaries: string[];
  filingRequirements: Filing[];
  complianceScore: number;
  ein?: string;
  registeredAgent: string;
  annualReportDue?: Date;
  directors?: number;
  sharesOutstanding?: number;
}

export interface Filing {
  id: string;
  type: string;
  dueDate: Date;
  status: 'Current' | 'Due Soon' | 'Overdue' | 'Filed';
  description: string;
}

export const entitiesData: Entity[] = [
  {
    id: "ENT-001",
    name: "Nexus Global Inc.",
    type: "Corporation",
    jurisdiction: ["Delaware"],
    formationDate: new Date('2015-03-10'),
    status: "Active",
    ein: "47-1234567",
    registeredAgent: "Corporate Services Inc.",
    annualReportDue: new Date('2025-03-01'),
    directors: 7,
    sharesOutstanding: 10000000,
    subsidiaries: ["ENT-002", "ENT-003", "ENT-004"],
    complianceScore: 96,
    filingRequirements: [
      {
        id: "F1",
        type: "Annual Report",
        dueDate: new Date('2025-03-01'),
        status: "Due Soon",
        description: "Delaware Annual Report"
      },
      {
        id: "F2",
        type: "Tax Return",
        dueDate: new Date('2025-04-15'),
        status: "Current",
        description: "Federal Corporate Tax Return"
      }
    ]
  },
  {
    id: "ENT-002",
    name: "Nexus Technologies LLC",
    type: "LLC",
    jurisdiction: ["California"],
    formationDate: new Date('2018-07-22'),
    status: "Active",
    parentEntity: "ENT-001",
    ein: "33-9876543",
    registeredAgent: "Legal Compliance Services",
    complianceScore: 94,
    subsidiaries: [],
    filingRequirements: [
      {
        id: "F3",
        type: "Statement of Information",
        dueDate: new Date('2024-12-31'),
        status: "Current",
        description: "California Statement of Information"
      }
    ]
  },
  {
    id: "ENT-003",
    name: "European Operations B.V.",
    type: "Corporation",
    jurisdiction: ["Netherlands"],
    formationDate: new Date('2020-11-08'),
    status: "Active",
    parentEntity: "ENT-001",
    registeredAgent: "Amsterdam Corporate Services",
    annualReportDue: new Date('2025-05-31'),
    directors: 2,
    complianceScore: 91,
    subsidiaries: [],
    filingRequirements: [
      {
        id: "F4",
        type: "Annual Accounts",
        dueDate: new Date('2025-05-31'),
        status: "Current",
        description: "Dutch Annual Accounts Filing"
      }
    ]
  },
  {
    id: "ENT-004",
    name: "Innovation Ventures LP",
    type: "Partnership",
    jurisdiction: ["Delaware"],
    formationDate: new Date('2021-09-14'),
    status: "Active",
    parentEntity: "ENT-001",
    registeredAgent: "Delaware Trust Company",
    complianceScore: 89,
    subsidiaries: [],
    filingRequirements: [
      {
        id: "F5",
        type: "Partnership Return",
        dueDate: new Date('2025-03-15'),
        status: "Current",
        description: "Federal Partnership Tax Return"
      }
    ]
  }
];

// Task Management Demo Data
export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Not Started' | 'In Progress' | 'Review' | 'Completed';
  estimatedHours: number;
  actualHours?: number;
  dueDate: Date;
  client: string;
  tags: string[];
  dependencies: string[];
  progress: number;
}

export const tasksData: Task[] = [
  {
    id: "TSK-2024-156",
    title: "Contract Review - Software License Agreement",
    description: "Review and negotiate enterprise software license terms",
    assignee: "Sarah Johnson",
    priority: "High",
    status: "In Progress",
    estimatedHours: 8,
    actualHours: 5,
    dueDate: new Date('2024-07-15'),
    client: "Internal - IT Department",
    tags: ["contract-review", "software", "licensing"],
    dependencies: [],
    progress: 65
  },
  {
    id: "TSK-2024-201",
    title: "Corporate Filing - Annual Report Delaware",
    description: "Prepare and file annual corporate report",
    assignee: "Lisa Park",
    priority: "Critical",
    status: "Not Started",
    estimatedHours: 2,
    dueDate: new Date('2024-07-10'),
    client: "Nexus Global Inc.",
    tags: ["corporate", "filing", "compliance"],
    dependencies: [],
    progress: 0
  },
  {
    id: "TSK-2024-143",
    title: "IP Portfolio Review",
    description: "Comprehensive review of patent and trademark portfolio",
    assignee: "Michael Chen",
    priority: "Medium",
    status: "Not Started",
    estimatedHours: 20,
    dueDate: new Date('2024-07-25'),
    client: "Internal - R&D Department",
    tags: ["intellectual-property", "patents", "trademarks"],
    dependencies: [],
    progress: 0
  },
  {
    id: "TSK-2024-178",
    title: "Employment Policy Update",
    description: "Update employee handbook for new state regulations",
    assignee: "Robert Kim",
    priority: "Medium",
    status: "Review",
    estimatedHours: 12,
    actualHours: 8,
    dueDate: new Date('2024-08-01'),
    client: "Internal - HR Department",
    tags: ["employment", "policy", "compliance"],
    dependencies: [],
    progress: 85
  },
  {
    id: "TSK-2024-189",
    title: "Due Diligence - DataFlow Acquisition",
    description: "Legal due diligence for acquisition of DataFlow Systems",
    assignee: "Sarah Johnson",
    priority: "Critical",
    status: "In Progress",
    estimatedHours: 40,
    actualHours: 15,
    dueDate: new Date('2024-08-15'),
    client: "Nexus Global Inc.",
    tags: ["due-diligence", "m&a", "acquisition"],
    dependencies: ["TSK-2024-156"],
    progress: 40
  }
];

// Matter Management Demo Data
export interface Matter {
  id: string;
  title: string;
  client: string;
  matterType: 'Litigation' | 'M&A' | 'Employment' | 'IP' | 'Regulatory';
  leadAttorney: string;
  team: string[];
  budget: number;
  actualSpend: number;
  startDate: Date;
  targetCloseDate?: Date;
  status: 'Active' | 'On Hold' | 'Closed' | 'Pending';
  riskLevel: number;
  milestones: Milestone[];
  description: string;
  opposingCounsel?: string;
  court?: string;
  billableHours: number;
  nonBillableHours: number;
}

export const mattersData: Matter[] = [
  {
    id: "MAT-2024-008",
    title: "Patent Infringement Defense - TechPatent LLC",
    client: "Nexus Technologies LLC",
    matterType: "IP",
    leadAttorney: "Michael Chen",
    team: ["Michael Chen", "Sarah Johnson"],
    budget: 450000,
    actualSpend: 127500,
    startDate: new Date('2024-01-12'),
    targetCloseDate: new Date('2024-12-15'),
    status: "Active",
    riskLevel: 75,
    description: "Defense against patent infringement claims",
    opposingCounsel: "Patterson & Associates",
    court: "Federal District Court, Northern District of California",
    billableHours: 285,
    nonBillableHours: 45,
    milestones: [
      {
        id: "MM1",
        title: "Answer Filed",
        date: new Date('2024-02-15'),
        status: "Completed",
        description: "Initial answer and counterclaims filed"
      },
      {
        id: "MM2",
        title: "Discovery Completion",
        date: new Date('2024-08-30'),
        status: "Pending",
        description: "Complete discovery phase"
      }
    ]
  },
  {
    id: "MAT-2024-015",
    title: "M&A Transaction - Acquisition of DataFlow Systems",
    client: "Nexus Global Inc.",
    matterType: "M&A",
    leadAttorney: "Sarah Johnson",
    team: ["Sarah Johnson", "Robert Kim", "Lisa Park"],
    budget: 275000,
    actualSpend: 89200,
    startDate: new Date('2024-03-01'),
    targetCloseDate: new Date('2024-09-30'),
    status: "Active",
    riskLevel: 60,
    description: "Acquisition of DataFlow Systems Inc. for $85M",
    billableHours: 198,
    nonBillableHours: 32,
    milestones: [
      {
        id: "MM3",
        title: "LOI Signed",
        date: new Date('2024-03-15'),
        status: "Completed",
        description: "Letter of Intent executed"
      },
      {
        id: "MM4",
        title: "Due Diligence Complete",
        date: new Date('2024-08-15'),
        status: "Pending",
        description: "Complete legal and financial due diligence"
      }
    ]
  },
  {
    id: "MAT-2024-021",
    title: "Employment Dispute - Wrongful Termination",
    client: "Nexus Global Inc.",
    matterType: "Employment",
    leadAttorney: "Lisa Park",
    team: ["Lisa Park"],
    budget: 125000,
    actualSpend: 34750,
    startDate: new Date('2024-04-15'),
    status: "Active",
    riskLevel: 45,
    description: "Wrongful termination claim by former VP of Sales",
    opposingCounsel: "Employment Rights Legal Group",
    billableHours: 78,
    nonBillableHours: 12,
    milestones: [
      {
        id: "MM5",
        title: "Initial Response",
        date: new Date('2024-05-01'),
        status: "Completed",
        description: "Response to EEOC complaint"
      }
    ]
  },
  {
    id: "MAT-2024-003",
    title: "Regulatory Investigation - Data Privacy",
    client: "Nexus Global Inc.",
    matterType: "Regulatory",
    leadAttorney: "Robert Kim",
    team: ["Robert Kim", "Michael Chen"],
    budget: 180000,
    actualSpend: 67300,
    startDate: new Date('2024-01-08'),
    status: "Active",
    riskLevel: 80,
    description: "State AG investigation into data handling practices",
    billableHours: 156,
    nonBillableHours: 28,
    milestones: [
      {
        id: "MM6",
        title: "Document Production",
        date: new Date('2024-03-30'),
        status: "Completed",
        description: "Initial document production to AG"
      },
      {
        id: "MM7",
        title: "Settlement Negotiations",
        date: new Date('2024-09-15'),
        status: "Pending",
        description: "Begin settlement discussions"
      }
    ]
  }
];

// Risk Management Demo Data
export interface Risk {
  id: string;
  title: string;
  category: 'Contractual' | 'Regulatory' | 'Litigation' | 'IP' | 'Operational' | 'Financial';
  probability: 'Low' | 'Medium' | 'High';
  impact: 'Low' | 'Medium' | 'High' | 'Very High';
  overallLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
  mitigation: string;
  owner: string;
  reviewDate: Date;
  status: 'Open' | 'Mitigated' | 'Closed';
  probabilityScore: number; // 1-10
  impactScore: number; // 1-10
  residualRisk: number; // 1-100
}

export const risksData: Risk[] = [
  {
    id: "RSK-2024-012",
    title: "Major Vendor Dependency",
    category: "Contractual",
    probability: "High",
    impact: "High",
    overallLevel: "Critical",
    description: "Over-reliance on single cloud provider",
    mitigation: "Negotiate multi-vendor agreements, develop contingency plans",
    owner: "Sarah Johnson",
    reviewDate: new Date('2024-08-15'),
    status: "Open",
    probabilityScore: 8,
    impactScore: 9,
    residualRisk: 72
  },
  {
    id: "RSK-2024-007",
    title: "GDPR Compliance",
    category: "Regulatory",
    probability: "Medium",
    impact: "High",
    overallLevel: "High",
    description: "Potential non-compliance with EU data protection rules",
    mitigation: "Implement privacy by design, conduct regular audits",
    owner: "Michael Chen",
    reviewDate: new Date('2024-07-30'),
    status: "Open",
    probabilityScore: 6,
    impactScore: 8,
    residualRisk: 48
  },
  {
    id: "RSK-2024-019",
    title: "Class Action Exposure",
    category: "Litigation",
    probability: "Low",
    impact: "Very High",
    overallLevel: "Medium",
    description: "Product liability claims for software defects",
    mitigation: "Enhanced QA processes, comprehensive insurance coverage",
    owner: "Lisa Park",
    reviewDate: new Date('2024-09-01'),
    status: "Open",
    probabilityScore: 3,
    impactScore: 10,
    residualRisk: 30
  },
  {
    id: "RSK-2024-004",
    title: "Patent Portfolio Gaps",
    category: "IP",
    probability: "Medium",
    impact: "Medium",
    overallLevel: "Medium",
    description: "Insufficient patent protection for core technologies",
    mitigation: "Accelerate patent filing program, conduct freedom-to-operate analysis",
    owner: "Robert Kim",
    reviewDate: new Date('2024-08-10'),
    status: "Open",
    probabilityScore: 5,
    impactScore: 6,
    residualRisk: 30
  },
  {
    id: "RSK-2024-025",
    title: "Regulatory Change Impact",
    category: "Regulatory",
    probability: "High",
    impact: "Medium",
    overallLevel: "High",
    description: "New financial regulations may require operational changes",
    mitigation: "Monitor regulatory developments, engage with regulators",
    owner: "Sarah Johnson",
    reviewDate: new Date('2024-09-30'),
    status: "Open",
    probabilityScore: 7,
    impactScore: 5,
    residualRisk: 35
  }
];

// Vendor/Spend Management Demo Data
export interface Vendor {
  id: string;
  name: string;
  practiceAreas: string[];
  totalSpend: number;
  performanceRating: number;
  contractTerms: string;
  paymentTerms: number;
  matters: string[];
  relationship: 'Preferred' | 'Panel' | 'Specialty' | 'Occasional';
  hourlyRates: {
    partners: number;
    associates: number;
    paralegals: number;
  };
  annualBudget: number;
  ytdSpend: number;
  serviceFee?: number;
  monthlyRetainer?: number;
}

export const vendorsData: Vendor[] = [
  {
    id: "VEN-LAW-001",
    name: "Patterson & Associates",
    practiceAreas: ["Intellectual Property Litigation"],
    totalSpend: 289450,
    performanceRating: 4.8,
    contractTerms: "Master Service Agreement",
    paymentTerms: 30,
    relationship: "Preferred",
    hourlyRates: {
      partners: 850,
      associates: 450,
      paralegals: 175
    },
    annualBudget: 500000,
    ytdSpend: 289450,
    matters: ["MAT-2024-008"]
  },
  {
    id: "VEN-LAW-007",
    name: "Global Corporate Services",
    practiceAreas: ["Corporate Formation", "Compliance"],
    totalSpend: 67200,
    performanceRating: 4.2,
    contractTerms: "Annual Service Agreement",
    paymentTerms: 15,
    relationship: "Preferred",
    hourlyRates: {
      partners: 0,
      associates: 0,
      paralegals: 0
    },
    annualBudget: 120000,
    ytdSpend: 67200,
    serviceFee: 2500,
    matters: []
  },
  {
    id: "VEN-LAW-012",
    name: "Innovation IP Counsel",
    practiceAreas: ["IP Prosecution", "Patent Filing"],
    totalSpend: 156800,
    performanceRating: 4.5,
    contractTerms: "Panel Agreement",
    paymentTerms: 30,
    relationship: "Panel",
    hourlyRates: {
      partners: 650,
      associates: 350,
      paralegals: 150
    },
    annualBudget: 300000,
    ytdSpend: 156800,
    matters: []
  },
  {
    id: "VEN-LAW-018",
    name: "Regulatory Compliance Advisors",
    practiceAreas: ["Regulatory Affairs", "Government Relations"],
    totalSpend: 94500,
    performanceRating: 4.7,
    contractTerms: "Monthly Retainer",
    paymentTerms: 15,
    relationship: "Specialty",
    monthlyRetainer: 15000,
    annualBudget: 180000,
    ytdSpend: 94500,
    matters: ["MAT-2024-003"]
  }
];

// Dispute Resolution Demo Data
export interface Dispute {
  id: string;
  title: string;
  plaintiff: string;
  defendant: string;
  type: 'Contract' | 'Employment' | 'IP' | 'Regulatory' | 'Commercial' | 'Product Liability';
  status: 'Investigation' | 'Mediation' | 'Arbitration' | 'Litigation' | 'Settled' | 'Closed';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  assignedCounsel: string;
  filingDate: Date;
  nextHearing?: Date;
  estimatedValue: number;
  actualCost: number;
  description: string;
  riskScore: number;
  resolutionProbability: number;
  predictedOutcome: string;
  jurisdiction: string;
  court?: string;
  opposingCounsel: string;
}

export const disputesData: Dispute[] = [
  {
    id: 'DIS-2024-001',
    title: 'TechCorp vs. DataFlow - Patent Infringement',
    plaintiff: 'TechCorp Solutions Inc.',
    defendant: 'DataFlow Systems Inc.',
    type: 'IP',
    status: 'Litigation',
    priority: 'High',
    assignedCounsel: 'Michael Chen',
    filingDate: new Date('2024-02-15'),
    nextHearing: new Date('2024-08-20'),
    estimatedValue: 2500000,
    actualCost: 375000,
    description: 'Patent infringement claim regarding data processing algorithms',
    riskScore: 75,
    resolutionProbability: 65,
    predictedOutcome: 'Settlement likely within 6 months',
    jurisdiction: 'Federal - Northern District of California',
    court: 'US District Court NDCA',
    opposingCounsel: 'Patterson & Associates'
  },
  {
    id: 'DIS-2024-002',
    title: 'Employment Discrimination Claim - Johnson vs. Nexus',
    plaintiff: 'Jennifer Johnson',
    defendant: 'Nexus Global Inc.',
    type: 'Employment',
    status: 'Mediation',
    priority: 'Medium',
    assignedCounsel: 'Lisa Park',
    filingDate: new Date('2024-04-10'),
    nextHearing: new Date('2024-07-25'),
    estimatedValue: 450000,
    actualCost: 125000,
    description: 'Age discrimination and wrongful termination claim',
    riskScore: 45,
    resolutionProbability: 80,
    predictedOutcome: 'Favorable settlement expected',
    jurisdiction: 'State - California',
    opposingCounsel: 'Employment Defense Group'
  },
  {
    id: 'DIS-2024-003',
    title: 'Regulatory Investigation - Data Privacy Violations',
    plaintiff: 'California Attorney General',
    defendant: 'Nexus Global Inc.',
    type: 'Regulatory',
    status: 'Investigation',
    priority: 'Critical',
    assignedCounsel: 'Robert Kim',
    filingDate: new Date('2024-01-08'),
    estimatedValue: 850000,
    actualCost: 89000,
    description: 'State investigation into data handling practices and CCPA compliance',
    riskScore: 85,
    resolutionProbability: 70,
    predictedOutcome: 'Consent decree with compliance monitoring',
    jurisdiction: 'State - California',
    opposingCounsel: 'State AG Office'
  },
  {
    id: 'DIS-2024-004',
    title: 'Contract Dispute - Vendor Services Agreement',
    plaintiff: 'Nexus Global Inc.',
    defendant: 'CloudTech Services LLC',
    type: 'Contract',
    status: 'Arbitration',
    priority: 'Medium',
    assignedCounsel: 'Sarah Johnson',
    filingDate: new Date('2024-03-22'),
    nextHearing: new Date('2024-09-15'),
    estimatedValue: 320000,
    actualCost: 67000,
    description: 'Breach of service level agreements and data security requirements',
    riskScore: 55,
    resolutionProbability: 75,
    predictedOutcome: 'Partial recovery likely',
    jurisdiction: 'AAA Commercial Arbitration',
    opposingCounsel: 'Tech Defense Partners'
  }
];

// Policy Management Demo Data
export interface Policy {
  id: string;
  title: string;
  category: 'Legal' | 'Compliance' | 'HR' | 'Security' | 'Operations' | 'Finance';
  version: string;
  status: 'Draft' | 'Review' | 'Approved' | 'Published' | 'Archived';
  effectiveDate: Date;
  reviewDate: Date;
  owner: string;
  approver: string;
  description: string;
  applicability: string[];
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  complianceFramework: string[];
  lastUpdated: Date;
  attachments: number;
  trainingRequired: boolean;
  acknowledgmentRequired: boolean;
  relatedPolicies: string[];
}

export const policiesData: Policy[] = [
  {
    id: 'POL-2024-001',
    title: 'Data Privacy and Protection Policy',
    category: 'Legal',
    version: '3.2',
    status: 'Published',
    effectiveDate: new Date('2024-01-01'),
    reviewDate: new Date('2024-12-31'),
    owner: 'Michael Chen',
    approver: 'Sarah Johnson',
    description: 'Comprehensive policy governing the collection, use, and protection of personal data',
    applicability: ['All Employees', 'Contractors', 'Third Parties'],
    riskLevel: 'Critical',
    complianceFramework: ['GDPR', 'CCPA', 'PIPEDA'],
    lastUpdated: new Date('2024-06-15'),
    attachments: 5,
    trainingRequired: true,
    acknowledgmentRequired: true,
    relatedPolicies: ['POL-2024-002', 'POL-2024-008']
  },
  {
    id: 'POL-2024-002',
    title: 'Information Security Policy',
    category: 'Security',
    version: '2.8',
    status: 'Published',
    effectiveDate: new Date('2024-02-01'),
    reviewDate: new Date('2024-11-30'),
    owner: 'Robert Kim',
    approver: 'Lisa Park',
    description: 'Security controls and procedures for protecting company information assets',
    applicability: ['All Employees', 'IT Staff', 'Contractors'],
    riskLevel: 'High',
    complianceFramework: ['ISO 27001', 'SOC 2', 'NIST'],
    lastUpdated: new Date('2024-05-20'),
    attachments: 8,
    trainingRequired: true,
    acknowledgmentRequired: true,
    relatedPolicies: ['POL-2024-001', 'POL-2024-004']
  },
  {
    id: 'POL-2024-003',
    title: 'Code of Business Conduct and Ethics',
    category: 'Compliance',
    version: '4.1',
    status: 'Published',
    effectiveDate: new Date('2024-01-01'),
    reviewDate: new Date('2025-01-01'),
    owner: 'Lisa Park',
    approver: 'Sarah Johnson',
    description: 'Standards of ethical conduct and business practices for all personnel',
    applicability: ['All Employees', 'Board Members', 'Contractors'],
    riskLevel: 'High',
    complianceFramework: ['SOX', 'NYSE Listed Company Manual'],
    lastUpdated: new Date('2024-04-10'),
    attachments: 3,
    trainingRequired: true,
    acknowledgmentRequired: true,
    relatedPolicies: ['POL-2024-005', 'POL-2024-006']
  },
  {
    id: 'POL-2024-004',
    title: 'Remote Work and Telecommuting Policy',
    category: 'HR',
    version: '1.5',
    status: 'Review',
    effectiveDate: new Date('2024-07-01'),
    reviewDate: new Date('2024-12-31'),
    owner: 'Sarah Johnson',
    approver: 'Michael Chen',
    description: 'Guidelines and requirements for remote work arrangements',
    applicability: ['All Employees', 'Managers'],
    riskLevel: 'Medium',
    complianceFramework: ['Employment Law', 'OSHA'],
    lastUpdated: new Date('2024-06-01'),
    attachments: 2,
    trainingRequired: false,
    acknowledgmentRequired: true,
    relatedPolicies: ['POL-2024-002']
  },
  {
    id: 'POL-2024-005',
    title: 'Anti-Corruption and Anti-Bribery Policy',
    category: 'Compliance',
    version: '2.3',
    status: 'Published',
    effectiveDate: new Date('2024-01-01'),
    reviewDate: new Date('2024-12-31'),
    owner: 'Robert Kim',
    approver: 'Lisa Park',
    description: 'Policy prohibiting corruption, bribery, and improper payments',
    applicability: ['All Employees', 'Third Parties', 'Business Partners'],
    riskLevel: 'Critical',
    complianceFramework: ['FCPA', 'UK Bribery Act', 'Local Anti-Corruption Laws'],
    lastUpdated: new Date('2024-03-15'),
    attachments: 4,
    trainingRequired: true,
    acknowledgmentRequired: true,
    relatedPolicies: ['POL-2024-003', 'POL-2024-006']
  },
  {
    id: 'POL-2024-006',
    title: 'Conflict of Interest Policy',
    category: 'Legal',
    version: '3.0',
    status: 'Published',
    effectiveDate: new Date('2024-02-01'),
    reviewDate: new Date('2025-02-01'),
    owner: 'Michael Chen',
    approver: 'Sarah Johnson',
    description: 'Policy for identifying and managing conflicts of interest',
    applicability: ['All Employees', 'Board Members', 'Key Contractors'],
    riskLevel: 'High',
    complianceFramework: ['Corporate Governance', 'Securities Law'],
    lastUpdated: new Date('2024-05-05'),
    attachments: 2,
    trainingRequired: true,
    acknowledgmentRequired: true,
    relatedPolicies: ['POL-2024-003', 'POL-2024-005']
  }
];

// Regulatory Compliance Demo Data
export interface ComplianceItem {
  id: string;
  title: string;
  category: 'Data Protection' | 'Financial' | 'Environmental' | 'Health & Safety' | 'Employment' | 'Securities' | 'Anti-Corruption' | 'Trade';
  status: 'Compliant' | 'Non-Compliant' | 'Pending Review' | 'In Progress' | 'Overdue';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  dueDate: Date;
  completionDate?: Date;
  assignee: string;
  reviewer: string;
  description: string;
  requirements: string[];
  evidence: string[];
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  regulatoryBody: string;
  lastAuditDate?: Date;
  nextAuditDate: Date;
  complianceScore: number;
  actionItems: ActionItem[];
}

export interface RegulatoryUpdate {
  id: string;
  title: string;
  description: string;
  effectiveDate: Date;
  publishedDate: Date;
  impact: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'New' | 'Under Review' | 'Assessment Complete' | 'Implementation Required' | 'Implemented';
  category: 'Data Protection' | 'Financial' | 'Environmental' | 'Health & Safety' | 'Employment' | 'Securities' | 'Anti-Corruption' | 'Trade';
  regulatoryBody: string;
  affectedAreas: string[];
  estimatedCost: number;
  implementationDeadline: Date;
  assignedTo: string;
  relatedCompliance: string[];
}

export interface ComplianceAudit {
  id: string;
  title: string;
  type: 'Internal' | 'External' | 'Regulatory';
  status: 'Scheduled' | 'In Progress' | 'Complete' | 'Findings Pending';
  auditor: string;
  startDate: Date;
  endDate: Date;
  scope: string[];
  findings: AuditFinding[];
  overallRating: 'Excellent' | 'Good' | 'Satisfactory' | 'Needs Improvement' | 'Inadequate';
  complianceAreas: string[];
  cost: number;
}

export interface AuditFinding {
  id: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  category: string;
  description: string;
  recommendation: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Accepted Risk';
  dueDate: Date;
  assignee: string;
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Completed' | 'Overdue';
  assignee: string;
  dueDate: Date;
  completionDate?: Date;
  estimatedHours: number;
}

export const complianceData: ComplianceItem[] = [
  {
    id: 'COMP-2024-001',
    title: 'GDPR Data Processing Assessment',
    category: 'Data Protection',
    status: 'Compliant',
    priority: 'High',
    dueDate: new Date('2024-12-31'),
    completionDate: new Date('2024-06-15'),
    assignee: 'Sarah Johnson',
    reviewer: 'Michael Chen',
    description: 'Annual assessment of GDPR compliance for data processing activities',
    requirements: [
      'Data Processing Impact Assessment',
      'Privacy Policy Updates',
      'Data Subject Rights Implementation',
      'Staff Training Completion'
    ],
    evidence: [
      'DPIA Report 2024',
      'Privacy Policy v3.2',
      'Training Certificates',
      'Data Mapping Documentation'
    ],
    riskLevel: 'High',
    regulatoryBody: 'European Data Protection Board',
    lastAuditDate: new Date('2024-03-15'),
    nextAuditDate: new Date('2025-03-15'),
    complianceScore: 94,
    actionItems: [
      {
        id: 'AI-001',
        title: 'Update data retention policies',
        description: 'Review and update data retention schedules for customer data',
        priority: 'Medium',
        status: 'Completed',
        assignee: 'Emily Davis',
        dueDate: new Date('2024-08-01'),
        completionDate: new Date('2024-07-20'),
        estimatedHours: 8
      }
    ]
  },
  {
    id: 'COMP-2024-002',
    title: 'SOX Internal Controls Testing',
    category: 'Financial',
    status: 'In Progress',
    priority: 'Critical',
    dueDate: new Date('2024-09-30'),
    assignee: 'Robert Kim',
    reviewer: 'Lisa Park',
    description: 'Sarbanes-Oxley Act compliance testing of internal financial controls',
    requirements: [
      'Management Assessment',
      'Control Testing',
      'Deficiency Reporting',
      'Remediation Plan'
    ],
    evidence: [
      'Control Testing Results Q1-Q2',
      'Management Assessment Draft',
      'External Auditor Coordination'
    ],
    riskLevel: 'Critical',
    regulatoryBody: 'Securities and Exchange Commission',
    lastAuditDate: new Date('2023-12-15'),
    nextAuditDate: new Date('2024-12-15'),
    complianceScore: 87,
    actionItems: [
      {
        id: 'AI-002',
        title: 'Complete Q3 control testing',
        description: 'Execute remaining control tests for Q3 period',
        priority: 'Critical',
        status: 'In Progress',
        assignee: 'Robert Kim',
        dueDate: new Date('2024-08-15'),
        estimatedHours: 40
      },
      {
        id: 'AI-003',
        title: 'Document control deficiencies',
        description: 'Document and assess any identified control deficiencies',
        priority: 'High',
        status: 'Open',
        assignee: 'Robert Kim',
        dueDate: new Date('2024-08-30'),
        estimatedHours: 16
      }
    ]
  },
  {
    id: 'COMP-2024-003',
    title: 'Anti-Money Laundering Program Review',
    category: 'Anti-Corruption',
    status: 'Pending Review',
    priority: 'High',
    dueDate: new Date('2024-10-15'),
    assignee: 'David Wilson',
    reviewer: 'Sarah Johnson',
    description: 'Annual review of AML policies, procedures, and training programs',
    requirements: [
      'Risk Assessment Update',
      'Customer Due Diligence Review',
      'Suspicious Activity Monitoring',
      'Staff Training Certification'
    ],
    evidence: [
      'AML Risk Assessment 2024',
      'CDD Procedures Manual',
      'SAR Filing Records'
    ],
    riskLevel: 'High',
    regulatoryBody: 'Financial Crimes Enforcement Network',
    lastAuditDate: new Date('2023-10-01'),
    nextAuditDate: new Date('2024-10-01'),
    complianceScore: 91,
    actionItems: [
      {
        id: 'AI-004',
        title: 'Update risk assessment methodology',
        description: 'Revise AML risk assessment to include new product lines',
        priority: 'High',
        status: 'Open',
        assignee: 'David Wilson',
        dueDate: new Date('2024-09-01'),
        estimatedHours: 24
      }
    ]
  },
  {
    id: 'COMP-2024-004',
    title: 'Environmental Impact Assessment',
    category: 'Environmental',
    status: 'Overdue',
    priority: 'Medium',
    dueDate: new Date('2024-07-01'),
    assignee: 'Emily Davis',
    reviewer: 'Michael Chen',
    description: 'Annual environmental compliance assessment for manufacturing operations',
    requirements: [
      'Emissions Monitoring',
      'Waste Management Review',
      'Water Quality Testing',
      'Environmental Management System Audit'
    ],
    evidence: [
      'Emissions Reports Q1-Q2',
      'Waste Disposal Records'
    ],
    riskLevel: 'Medium',
    regulatoryBody: 'Environmental Protection Agency',
    lastAuditDate: new Date('2023-07-15'),
    nextAuditDate: new Date('2024-07-15'),
    complianceScore: 78,
    actionItems: [
      {
        id: 'AI-005',
        title: 'Complete water quality testing',
        description: 'Conduct delayed water quality testing for Q3',
        priority: 'High',
        status: 'Overdue',
        assignee: 'Emily Davis',
        dueDate: new Date('2024-07-15'),
        estimatedHours: 12
      }
    ]
  },
  {
    id: 'COMP-2024-005',
    title: 'OSHA Safety Standards Compliance',
    category: 'Health & Safety',
    status: 'Compliant',
    priority: 'High',
    dueDate: new Date('2024-11-30'),
    completionDate: new Date('2024-05-20'),
    assignee: 'Lisa Park',
    reviewer: 'Robert Kim',
    description: 'Occupational safety and health compliance review for all facilities',
    requirements: [
      'Safety Training Programs',
      'Hazard Communication',
      'Personal Protective Equipment',
      'Incident Reporting System'
    ],
    evidence: [
      'Safety Training Records',
      'PPE Inventory Reports',
      'Incident Investigation Files',
      'Safety Committee Minutes'
    ],
    riskLevel: 'High',
    regulatoryBody: 'Occupational Safety and Health Administration',
    lastAuditDate: new Date('2024-02-10'),
    nextAuditDate: new Date('2025-02-10'),
    complianceScore: 96,
    actionItems: []
  }
];

export const regulatoryUpdatesData: RegulatoryUpdate[] = [
  {
    id: 'REG-2024-001',
    title: 'EU AI Act Implementation Requirements',
    description: 'New European Union Artificial Intelligence Act requiring compliance assessments for AI systems',
    effectiveDate: new Date('2025-08-02'),
    publishedDate: new Date('2024-05-21'),
    impact: 'Critical',
    status: 'Assessment Complete',
    category: 'Data Protection',
    regulatoryBody: 'European Commission',
    affectedAreas: ['Product Development', 'Data Science', 'Legal', 'Compliance'],
    estimatedCost: 250000,
    implementationDeadline: new Date('2025-07-01'),
    assignedTo: 'Sarah Johnson',
    relatedCompliance: ['COMP-2024-001']
  },
  {
    id: 'REG-2024-002',
    title: 'SEC Climate Disclosure Rules',
    description: 'Updated Securities and Exchange Commission rules requiring climate-related disclosures',
    effectiveDate: new Date('2025-03-15'),
    publishedDate: new Date('2024-03-06'),
    impact: 'High',
    status: 'Implementation Required',
    category: 'Securities',
    regulatoryBody: 'Securities and Exchange Commission',
    affectedAreas: ['Finance', 'ESG', 'Legal', 'Operations'],
    estimatedCost: 180000,
    implementationDeadline: new Date('2025-01-31'),
    assignedTo: 'Michael Chen',
    relatedCompliance: ['COMP-2024-002']
  },
  {
    id: 'REG-2024-003',
    title: 'Updated CCPA Privacy Rights',
    description: 'California Consumer Privacy Act amendments affecting data collection and processing practices',
    effectiveDate: new Date('2024-07-01'),
    publishedDate: new Date('2024-04-15'),
    impact: 'Medium',
    status: 'Implemented',
    category: 'Data Protection',
    regulatoryBody: 'California Privacy Protection Agency',
    affectedAreas: ['Privacy', 'Marketing', 'Customer Service', 'IT'],
    estimatedCost: 75000,
    implementationDeadline: new Date('2024-06-15'),
    assignedTo: 'Emily Davis',
    relatedCompliance: ['COMP-2024-001']
  },
  {
    id: 'REG-2024-004',
    title: 'Anti-Money Laundering Modernization Act',
    description: 'Enhanced beneficial ownership and customer due diligence requirements',
    effectiveDate: new Date('2024-09-01'),
    publishedDate: new Date('2024-02-28'),
    impact: 'High',
    status: 'Under Review',
    category: 'Anti-Corruption',
    regulatoryBody: 'Financial Crimes Enforcement Network',
    affectedAreas: ['Finance', 'Legal', 'Customer Onboarding', 'Risk Management'],
    estimatedCost: 120000,
    implementationDeadline: new Date('2024-08-15'),
    assignedTo: 'David Wilson',
    relatedCompliance: ['COMP-2024-003']
  }
];

export const complianceAuditsData: ComplianceAudit[] = [
  {
    id: 'AUD-2024-001',
    title: 'Annual SOX Compliance Audit',
    type: 'External',
    status: 'In Progress',
    auditor: 'KPMG LLP',
    startDate: new Date('2024-07-01'),
    endDate: new Date('2024-09-30'),
    scope: ['Financial Controls', 'IT Controls', 'Entity Level Controls'],
    overallRating: 'Good',
    complianceAreas: ['SOX Section 302', 'SOX Section 404', 'COSO Framework'],
    cost: 185000,
    findings: [
      {
        id: 'F-001',
        severity: 'Medium',
        category: 'IT Controls',
        description: 'Access review process could be enhanced for quarterly reviews',
        recommendation: 'Implement automated access review workflows',
        status: 'Open',
        dueDate: new Date('2024-10-15'),
        assignee: 'Robert Kim'
      },
      {
        id: 'F-002',
        severity: 'Low',
        category: 'Documentation',
        description: 'Some control narratives need minor updates',
        recommendation: 'Update control documentation to reflect current processes',
        status: 'In Progress',
        dueDate: new Date('2024-09-01'),
        assignee: 'Lisa Park'
      }
    ]
  },
  {
    id: 'AUD-2024-002',
    title: 'GDPR Compliance Assessment',
    type: 'External',
    status: 'Complete',
    auditor: 'Privacy Consultants International',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-04-15'),
    scope: ['Data Processing Activities', 'Privacy Policies', 'Data Subject Rights'],
    overallRating: 'Excellent',
    complianceAreas: ['Article 6 Lawful Basis', 'Article 13-14 Information', 'Article 32 Security'],
    cost: 95000,
    findings: [
      {
        id: 'F-003',
        severity: 'Low',
        category: 'Documentation',
        description: 'Data retention schedules could be more specific for certain data types',
        recommendation: 'Enhance data retention schedule granularity',
        status: 'Resolved',
        dueDate: new Date('2024-06-01'),
        assignee: 'Sarah Johnson'
      }
    ]
  },
  {
    id: 'AUD-2024-003',
    title: 'Environmental Compliance Review',
    type: 'Internal',
    status: 'Scheduled',
    auditor: 'Internal Audit Team',
    startDate: new Date('2024-08-15'),
    endDate: new Date('2024-09-15'),
    scope: ['Emissions Monitoring', 'Waste Management', 'Environmental Permits'],
    overallRating: 'Satisfactory',
    complianceAreas: ['Clean Air Act', 'Clean Water Act', 'Resource Conservation'],
    cost: 45000,
    findings: []
  }
];

// Export all data for easy access
export const demoData = {
  contracts: contractsData,
  entities: entitiesData,
  tasks: tasksData,
  matters: mattersData,
  risks: risksData,
  vendors: vendorsData,
  disputes: disputesData,
  policies: policiesData,
  compliance: complianceData,
  regulatoryUpdates: regulatoryUpdatesData,
  complianceAudits: complianceAuditsData
};
