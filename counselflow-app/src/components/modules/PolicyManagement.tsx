'use client'

import React, { useState, useMemo } from 'react'
import { DocumentStatus, User } from '@/types'

interface PolicyManagementProps {
  userId?: string
}

type TabType = 'policies' | 'templates' | 'approvals' | 'violations'

// Policy specific types
interface Policy {
  id: string
  title: string
  category: PolicyCategory
  description: string
  content: string
  status: DocumentStatus
  version: string
  owner: User
  approvers: User[]
  effectiveDate: Date
  reviewDate: Date
  expiryDate?: Date
  tags: string[]
  applicableRoles: string[]
  mandatory: boolean
  trainingRequired: boolean
  lastUpdated: Date
  createdAt: Date
  attachments: PolicyAttachment[]
  acknowledgments: PolicyAcknowledgment[]
}

interface PolicyTemplate {
  id: string
  name: string
  category: PolicyCategory
  description: string
  content: string
  variables: PolicyVariable[]
  createdBy: string
  createdAt: Date
  usage: number
}

interface PolicyVariable {
  name: string
  type: 'text' | 'date' | 'number' | 'select'
  description: string
  required: boolean
  defaultValue?: string
  options?: string[]
}

interface PolicyAttachment {
  id: string
  name: string
  type: string
  size: number
  url: string
  uploadedAt: Date
}

interface PolicyAcknowledgment {
  id: string
  userId: string
  userName: string
  acknowledgedAt: Date
  version: string
  ipAddress: string
}

interface PolicyViolation {
  id: string
  policyId: string
  policyTitle: string
  userId: string
  userName: string
  description: string
  severity: ViolationSeverity
  status: ViolationStatus
  reportedBy: string
  reportedAt: Date
  resolvedAt?: Date
  resolution?: string
}

type PolicyCategory = 
  | 'data_privacy'
  | 'information_security'
  | 'code_of_conduct'
  | 'hr_policies'
  | 'financial_policies'
  | 'operational_procedures'
  | 'compliance_policies'
  | 'client_service'
  | 'quality_assurance'
  | 'risk_management'

type ViolationSeverity = 'low' | 'medium' | 'high' | 'critical'
type ViolationStatus = 'reported' | 'investigating' | 'resolved' | 'dismissed'

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@firm.com',
    name: 'John Doe',
    role: 'partner',
    firm: 'Smith & Associates',
    jurisdiction: 'New York',
    barAdmissions: ['NY'],
    preferredLanguage: 'en',
    securityClearance: 'standard',
    lastLogin: new Date(),
    permissions: []
  },
  {
    id: '2',
    email: 'jane.smith@firm.com',
    name: 'Jane Smith',
    role: 'senior_associate',
    firm: 'Smith & Associates',
    jurisdiction: 'California',
    barAdmissions: ['CA'],
    preferredLanguage: 'en',
    securityClearance: 'standard',
    lastLogin: new Date(),
    permissions: []
  }
]

const mockPolicies: Policy[] = [
  {
    id: '1',
    title: 'Client Confidentiality Policy',
    category: 'client_service',
    description: 'Comprehensive policy governing the protection of client information and attorney-client privilege',
    content: 'All client information must be treated as strictly confidential...',
    status: 'approved',
    version: '2.1',
    owner: mockUsers[0],
    approvers: [mockUsers[0], mockUsers[1]],
    effectiveDate: new Date('2024-01-01'),
    reviewDate: new Date('2024-12-01'),
    expiryDate: new Date('2025-12-31'),
    tags: ['confidentiality', 'client-service', 'privilege'],
    applicableRoles: ['partner', 'senior_associate', 'associate', 'paralegal'],
    mandatory: true,
    trainingRequired: true,
    lastUpdated: new Date('2024-01-15'),
    createdAt: new Date('2023-11-01'),
    attachments: [],
    acknowledgments: [
      {
        id: '1',
        userId: '1',
        userName: 'John Doe',
        acknowledgedAt: new Date('2024-01-16'),
        version: '2.1',
        ipAddress: '192.168.1.100'
      }
    ]
  },
  {
    id: '2',
    title: 'Information Security Guidelines',
    category: 'information_security',
    description: 'Security protocols for handling sensitive legal documents and client data',
    content: 'All devices must be encrypted with enterprise-grade encryption...',
    status: 'review',
    version: '1.0',
    owner: mockUsers[1],
    approvers: [mockUsers[0]],
    effectiveDate: new Date('2024-03-01'),
    reviewDate: new Date('2024-09-01'),
    tags: ['security', 'data-protection', 'encryption'],
    applicableRoles: ['partner', 'senior_associate', 'associate', 'paralegal', 'legal_assistant'],
    mandatory: true,
    trainingRequired: true,
    lastUpdated: new Date('2024-02-20'),
    createdAt: new Date('2024-02-01'),
    attachments: [],
    acknowledgments: []
  },
  {
    id: '3',
    title: 'Remote Work Policy',
    category: 'hr_policies',
    description: 'Guidelines for working remotely while maintaining security and productivity',
    content: 'Remote work must be conducted in accordance with firm security policies...',
    status: 'approved',
    version: '1.2',
    owner: mockUsers[0],
    approvers: [mockUsers[0]],
    effectiveDate: new Date('2023-06-01'),
    reviewDate: new Date('2024-06-01'),
    tags: ['remote-work', 'hr', 'productivity'],
    applicableRoles: ['partner', 'senior_associate', 'associate', 'paralegal', 'legal_assistant'],
    mandatory: false,
    trainingRequired: false,
    lastUpdated: new Date('2023-12-15'),
    createdAt: new Date('2023-05-01'),
    attachments: [],
    acknowledgments: []
  }
]

const mockTemplates: PolicyTemplate[] = [
  {
    id: '1',
    name: 'Standard Confidentiality Policy Template',
    category: 'client_service',
    description: 'Template for creating client confidentiality policies',
    content: 'This policy governs the handling of confidential information for [CLIENT_TYPE] clients...',
    variables: [
      {
        name: 'CLIENT_TYPE',
        type: 'select',
        description: 'Type of client this policy applies to',
        required: true,
        options: ['Corporate', 'Individual', 'Government', 'Non-Profit']
      },
      {
        name: 'RETENTION_PERIOD',
        type: 'number',
        description: 'Document retention period in years',
        required: true,
        defaultValue: '7'
      }
    ],
    createdBy: 'John Doe',
    createdAt: new Date('2023-10-01'),
    usage: 15
  },
  {
    id: '2',
    name: 'Security Incident Response Template',
    category: 'information_security',
    description: 'Template for security incident response procedures',
    content: 'In the event of a security incident affecting [SYSTEM_TYPE]...',
    variables: [
      {
        name: 'SYSTEM_TYPE',
        type: 'select',
        description: 'Type of system affected',
        required: true,
        options: ['Email System', 'Document Management', 'Financial Systems', 'Client Portal']
      },
      {
        name: 'RESPONSE_TIME',
        type: 'number',
        description: 'Required response time in hours',
        required: true,
        defaultValue: '24'
      }
    ],
    createdBy: 'Jane Smith',
    createdAt: new Date('2023-11-15'),
    usage: 8
  }
]

const mockViolations: PolicyViolation[] = [
  {
    id: '1',
    policyId: '1',
    policyTitle: 'Client Confidentiality Policy',
    userId: '2',
    userName: 'Jane Smith',
    description: 'Unauthorized disclosure of client information in public area',
    severity: 'high',
    status: 'investigating',
    reportedBy: 'John Doe',
    reportedAt: new Date('2024-02-15'),
  },
  {
    id: '2',
    policyId: '2',
    policyTitle: 'Information Security Guidelines',
    userId: '1',
    userName: 'John Doe',
    description: 'Unencrypted device used for client work',
    severity: 'medium',
    status: 'resolved',
    reportedBy: 'IT Department',
    reportedAt: new Date('2024-02-10'),
    resolvedAt: new Date('2024-02-12'),
    resolution: 'Device encrypted and security training completed'
  }
]

const categoryColors = {
  data_privacy: 'bg-purple-100 text-purple-800',
  information_security: 'bg-red-100 text-red-800',
  code_of_conduct: 'bg-blue-100 text-blue-800',
  hr_policies: 'bg-green-100 text-green-800',
  financial_policies: 'bg-yellow-100 text-yellow-800',
  operational_procedures: 'bg-indigo-100 text-indigo-800',
  compliance_policies: 'bg-pink-100 text-pink-800',
  client_service: 'bg-teal-100 text-teal-800',
  quality_assurance: 'bg-orange-100 text-orange-800',
  risk_management: 'bg-gray-100 text-gray-800'
}

const statusColors = {
  draft: 'bg-gray-100 text-gray-800',
  review: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  executed: 'bg-blue-100 text-blue-800',
  archived: 'bg-gray-100 text-gray-600'
}

const violationSeverityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800'
}

const violationStatusColors = {
  reported: 'bg-blue-100 text-blue-800',
  investigating: 'bg-yellow-100 text-yellow-800',
  resolved: 'bg-green-100 text-green-800',
  dismissed: 'bg-gray-100 text-gray-800'
}

export default function PolicyManagement({ }: PolicyManagementProps) {
  const [activeTab, setActiveTab] = useState<TabType>('policies')
  const [statusFilter, setStatusFilter] = useState<DocumentStatus | 'all'>('all')
  const [categoryFilter, setCategoryFilter] = useState<PolicyCategory | 'all'>('all')
  const [mandatoryFilter, setMandatoryFilter] = useState<'all' | 'mandatory' | 'optional'>('all')

  // Filter policies based on selected filters
  const filteredPolicies = useMemo(() => {
    return mockPolicies.filter(policy => {
      if (statusFilter !== 'all' && policy.status !== statusFilter) return false
      if (categoryFilter !== 'all' && policy.category !== categoryFilter) return false
      if (mandatoryFilter === 'mandatory' && !policy.mandatory) return false
      if (mandatoryFilter === 'optional' && policy.mandatory) return false
      return true
    })
  }, [statusFilter, categoryFilter, mandatoryFilter])

  // Filter templates based on category
  const filteredTemplates = useMemo(() => {
    return mockTemplates.filter(template => {
      if (categoryFilter !== 'all' && template.category !== categoryFilter) return false
      return true
    })
  }, [categoryFilter])

  const getPolicyOverview = () => {
    const totalPolicies = mockPolicies.length
    const approvedPolicies = mockPolicies.filter(p => p.status === 'approved').length
    const pendingReview = mockPolicies.filter(p => p.status === 'review').length
    const totalViolations = mockViolations.length
    const openViolations = mockViolations.filter(v => v.status !== 'resolved' && v.status !== 'dismissed').length

    return {
      totalPolicies,
      approvedPolicies,
      pendingReview,
      totalViolations,
      openViolations
    }
  }

  const overview = getPolicyOverview()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Policy Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              Create, manage, and track organizational policies and procedures
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Create Policy
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
              Use Template
            </button>
          </div>
        </div>

        {/* Policy Overview */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{overview.totalPolicies}</div>
            <div className="text-sm text-blue-800">Total Policies</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{overview.approvedPolicies}</div>
            <div className="text-sm text-green-800">Approved</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{overview.pendingReview}</div>
            <div className="text-sm text-yellow-800">Pending Review</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{overview.totalViolations}</div>
            <div className="text-sm text-red-800">Total Violations</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{overview.openViolations}</div>
            <div className="text-sm text-orange-800">Open Violations</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'policies', label: 'Policies', count: mockPolicies.length },
              { id: 'templates', label: 'Templates', count: mockTemplates.length },
              { id: 'approvals', label: 'Pending Approvals', count: overview.pendingReview },
              { id: 'violations', label: 'Violations', count: mockViolations.length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-2 bg-gray-100 text-gray-900 py-1 px-2 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-wrap gap-4">
            {(activeTab === 'policies' || activeTab === 'templates') && (
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Category:</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value as PolicyCategory | 'all')}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                >
                  <option value="all">All Categories</option>
                  <option value="client_service">Client Service</option>
                  <option value="information_security">Information Security</option>
                  <option value="hr_policies">HR Policies</option>
                  <option value="compliance_policies">Compliance</option>
                  <option value="data_privacy">Data Privacy</option>
                  <option value="financial_policies">Financial</option>
                </select>
              </div>
            )}

            {activeTab === 'policies' && (
              <>
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Status:</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as DocumentStatus | 'all')}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                  >
                    <option value="all">All Statuses</option>
                    <option value="draft">Draft</option>
                    <option value="review">Under Review</option>
                    <option value="approved">Approved</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Type:</label>
                  <select
                    value={mandatoryFilter}
                    onChange={(e) => setMandatoryFilter(e.target.value as 'all' | 'mandatory' | 'optional')}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                  >
                    <option value="all">All Types</option>
                    <option value="mandatory">Mandatory</option>
                    <option value="optional">Optional</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'policies' && (
            <div className="space-y-4">
              {filteredPolicies.map(policy => (
                <div key={policy.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{policy.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[policy.status]}`}>
                          {policy.status}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${categoryColors[policy.category]}`}>
                          {policy.category.replace('_', ' ')}
                        </span>
                        {policy.mandatory && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                            Mandatory
                          </span>
                        )}
                        {policy.trainingRequired && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            Training Required
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{policy.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span>Version {policy.version}</span>
                        <span>Owner: {policy.owner.name}</span>
                        <span>Effective: {policy.effectiveDate.toLocaleDateString()}</span>
                        <span>Review: {policy.reviewDate.toLocaleDateString()}</span>
                        <span>Acknowledgments: {policy.acknowledgments.length}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View
                      </button>
                      <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                        Edit
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="space-y-4">
              {filteredTemplates.map(template => (
                <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${categoryColors[template.category]}`}>
                          {template.category.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Variables: {template.variables.length}</span>
                        <span>Created by: {template.createdBy}</span>
                        <span>Used: {template.usage} times</span>
                        <span>Created: {template.createdAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                        Use Template
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm">
                        Preview
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'approvals' && (
            <div className="space-y-4">
              {mockPolicies.filter(p => p.status === 'review').map(policy => (
                <div key={policy.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{policy.title}</h3>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                          Pending Approval
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{policy.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Submitted by: {policy.owner.name}</span>
                        <span>Last updated: {policy.lastUpdated.toLocaleDateString()}</span>
                        <span>Approvers: {policy.approvers.map(a => a.name).join(', ')}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                        Approve
                      </button>
                      <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                        Reject
                      </button>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        Review
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'violations' && (
            <div className="space-y-4">
              {mockViolations.map(violation => (
                <div key={violation.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{violation.policyTitle}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${violationSeverityColors[violation.severity]}`}>
                          {violation.severity}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${violationStatusColors[violation.status]}`}>
                          {violation.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{violation.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>User: {violation.userName}</span>
                        <span>Reported by: {violation.reportedBy}</span>
                        <span>Date: {violation.reportedAt.toLocaleDateString()}</span>
                        {violation.resolvedAt && (
                          <span>Resolved: {violation.resolvedAt.toLocaleDateString()}</span>
                        )}
                      </div>
                      {violation.resolution && (
                        <div className="mt-2 p-2 bg-green-50 rounded text-sm text-green-800">
                          <strong>Resolution:</strong> {violation.resolution}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {violation.status !== 'resolved' && violation.status !== 'dismissed' && (
                        <>
                          <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                            Investigate
                          </button>
                          <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                            Resolve
                          </button>
                        </>
                      )}
                      <button className="text-gray-600 hover:text-gray-800 text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
