'use client'

import React, { useState, useMemo } from 'react'
import { ComplianceFramework, ComplianceStatus, ComplianceRule } from '@/types'

interface RegulatoryComplianceProps {
  userId?: string
}

type TabType = 'frameworks' | 'requirements' | 'rules' | 'reports'

// Mock data for regulatory compliance
const mockComplianceFrameworks: ComplianceFramework[] = [
  {
    id: '1',
    name: 'GDPR - General Data Protection Regulation',
    type: 'gdpr',
    jurisdiction: 'EU',
    requirements: [
      {
        id: 'gdpr-1',
        title: 'Data Processing Legal Basis',
        description: 'Ensure all data processing has valid legal basis under Art. 6',
        mandatory: true,
        deadline: new Date('2024-06-15'),
        status: 'compliant',
        evidence: [],
        assignee: 'privacy@firm.com'
      },
      {
        id: 'gdpr-2',
        title: 'Data Subject Rights',
        description: 'Implement processes for handling data subject requests',
        mandatory: true,
        status: 'under_review',
        evidence: [],
        assignee: 'legal@firm.com'
      }
    ],
    lastUpdated: new Date('2024-01-15'),
    version: '2.0'
  },
  {
    id: '2',
    name: 'CCPA - California Consumer Privacy Act',
    type: 'ccpa',
    jurisdiction: 'California, US',
    requirements: [
      {
        id: 'ccpa-1',
        title: 'Consumer Privacy Rights Notice',
        description: 'Display clear privacy notice on website',
        mandatory: true,
        status: 'compliant',
        evidence: [],
        assignee: 'marketing@firm.com'
      }
    ],
    lastUpdated: new Date('2024-01-10'),
    version: '1.1'
  },
  {
    id: '3',
    name: 'SOX - Sarbanes-Oxley Act',
    type: 'sox',
    jurisdiction: 'United States',
    requirements: [
      {
        id: 'sox-1',
        title: 'Internal Controls Assessment',
        description: 'Annual assessment of internal controls over financial reporting',
        mandatory: true,
        deadline: new Date('2024-12-31'),
        status: 'pending_review',
        evidence: [],
        assignee: 'cfo@firm.com'
      }
    ],
    lastUpdated: new Date('2024-02-01'),
    version: '1.0'
  }
]

const mockComplianceRules: ComplianceRule[] = [
  {
    id: 'rule-1',
    name: 'Data Encryption at Rest',
    category: 'Data Security',
    status: 'compliant',
    lastChecked: new Date(),
    nextReview: new Date('2024-04-01'),
    description: 'All sensitive data must be encrypted using AES-256',
    severity: 'high',
    automatedChecks: true,
    violations: 0
  },
  {
    id: 'rule-2',
    name: 'Password Policy Compliance',
    category: 'Access Control',
    status: 'partial',
    lastChecked: new Date(),
    nextReview: new Date('2024-03-15'),
    description: 'Passwords must meet minimum complexity requirements',
    severity: 'medium',
    automatedChecks: true,
    violations: 3
  },
  {
    id: 'rule-3',
    name: 'Client Communication Retention',
    category: 'Document Management',
    status: 'non_compliant',
    lastChecked: new Date(),
    nextReview: new Date('2024-03-01'),
    description: 'All client communications must be retained for 7 years',
    severity: 'high',
    automatedChecks: false,
    violations: 12
  }
]

const statusColors = {
  compliant: 'bg-green-100 text-green-800',
  non_compliant: 'bg-red-100 text-red-800',
  partial: 'bg-yellow-100 text-yellow-800',
  under_review: 'bg-blue-100 text-blue-800',
  pending_review: 'bg-purple-100 text-purple-800',
  not_applicable: 'bg-gray-100 text-gray-800',
  exempt: 'bg-indigo-100 text-indigo-800'
}

const severityColors = {
  low: 'text-green-600',
  medium: 'text-yellow-600',
  high: 'text-orange-600',
  critical: 'text-red-600'
}

export default function RegulatoryCompliance({ }: RegulatoryComplianceProps) {
  const [activeTab, setActiveTab] = useState<TabType>('frameworks')
  const [selectedFramework, setSelectedFramework] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<ComplianceStatus | 'all'>('all')
  const [jurisdictionFilter, setJurisdictionFilter] = useState<string>('all')

  // Filter frameworks based on selected filters
  const filteredFrameworks = useMemo(() => {
    return mockComplianceFrameworks.filter(framework => {
      if (jurisdictionFilter !== 'all' && framework.jurisdiction !== jurisdictionFilter) return false
      return true
    })
  }, [jurisdictionFilter])

  // Filter requirements based on selected framework and status
  const filteredRequirements = useMemo(() => {
    const frameworks = selectedFramework 
      ? [mockComplianceFrameworks.find(f => f.id === selectedFramework)!]
      : mockComplianceFrameworks
    
    const allRequirements = frameworks.flatMap(f => f.requirements || [])
    
    return allRequirements.filter(req => {
      if (statusFilter !== 'all' && req.status !== statusFilter) return false
      return true
    })
  }, [selectedFramework, statusFilter])

  // Filter rules based on status
  const filteredRules = useMemo(() => {
    return mockComplianceRules.filter(rule => {
      if (statusFilter !== 'all' && rule.status !== statusFilter) return false
      return true
    })
  }, [statusFilter])

  const getComplianceOverview = () => {
    const totalRequirements = mockComplianceFrameworks.reduce((sum, f) => sum + (f.requirements?.length || 0), 0)
    const compliantCount = mockComplianceFrameworks.reduce((sum, f) => 
      sum + (f.requirements?.filter(r => r.status === 'compliant').length || 0), 0)
    const nonCompliantCount = mockComplianceFrameworks.reduce((sum, f) => 
      sum + (f.requirements?.filter(r => r.status === 'non_compliant').length || 0), 0)
    
    const complianceRate = totalRequirements > 0 ? (compliantCount / totalRequirements * 100) : 0

    return {
      totalRequirements,
      compliantCount,
      nonCompliantCount,
      complianceRate: Math.round(complianceRate)
    }
  }

  const overview = getComplianceOverview()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Regulatory Compliance</h1>
            <p className="mt-1 text-sm text-gray-500">
              Monitor and manage regulatory compliance across all jurisdictions
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Generate Report
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
              Add Framework
            </button>
          </div>
        </div>

        {/* Compliance Overview */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{overview.complianceRate}%</div>
            <div className="text-sm text-green-800">Overall Compliance Rate</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{overview.totalRequirements}</div>
            <div className="text-sm text-blue-800">Total Requirements</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{overview.compliantCount}</div>
            <div className="text-sm text-green-800">Compliant</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{overview.nonCompliantCount}</div>
            <div className="text-sm text-red-800">Non-Compliant</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'frameworks', label: 'Frameworks', count: mockComplianceFrameworks.length },
              { id: 'requirements', label: 'Requirements', count: overview.totalRequirements },
              { id: 'rules', label: 'Rules', count: mockComplianceRules.length },
              { id: 'reports', label: 'Reports', count: 0 }
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
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Status:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as ComplianceStatus | 'all')}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="all">All Statuses</option>
                <option value="compliant">Compliant</option>
                <option value="non_compliant">Non-Compliant</option>
                <option value="partial">Partial</option>
                <option value="under_review">Under Review</option>
                <option value="pending_review">Pending Review</option>
              </select>
            </div>

            {activeTab === 'frameworks' && (
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Jurisdiction:</label>
                <select
                  value={jurisdictionFilter}
                  onChange={(e) => setJurisdictionFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                >
                  <option value="all">All Jurisdictions</option>
                  <option value="EU">European Union</option>
                  <option value="California, US">California, US</option>
                  <option value="United States">United States</option>
                </select>
              </div>
            )}

            {activeTab === 'requirements' && (
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Framework:</label>
                <select
                  value={selectedFramework}
                  onChange={(e) => setSelectedFramework(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                >
                  <option value="">All Frameworks</option>
                  {mockComplianceFrameworks.map(framework => (
                    <option key={framework.id} value={framework.id}>
                      {framework.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'frameworks' && (
            <div className="space-y-4">
              {filteredFrameworks.map(framework => (
                <div key={framework.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{framework.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {framework.jurisdiction} • Version {framework.version}
                      </p>
                      <div className="mt-2 flex items-center space-x-4">
                        <span className="text-sm text-gray-600">
                          {framework.requirements?.length || 0} requirements
                        </span>
                        <span className="text-sm text-gray-600">
                          Last updated: {framework.lastUpdated.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View Details
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

          {activeTab === 'requirements' && (
            <div className="space-y-4">
              {filteredRequirements.map(requirement => (
                <div key={requirement.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-medium text-gray-900">{requirement.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[requirement.status]}`}>
                          {requirement.status.replace('_', ' ')}
                        </span>
                        {requirement.mandatory && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                            Mandatory
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{requirement.description}</p>
                      <div className="mt-2 flex items-center space-x-4">
                        {requirement.assignee && (
                          <span className="text-sm text-gray-600">
                            Assigned to: {requirement.assignee}
                          </span>
                        )}
                        {requirement.deadline && (
                          <span className="text-sm text-gray-600">
                            Due: {requirement.deadline.toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Update Status
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

          {activeTab === 'rules' && (
            <div className="space-y-4">
              {filteredRules.map(rule => (
                <div key={rule.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-medium text-gray-900">{rule.name}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[rule.status]}`}>
                          {rule.status.replace('_', ' ')}
                        </span>
                        <span className={`text-sm font-medium ${severityColors[rule.severity as keyof typeof severityColors]}`}>
                          {rule.severity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{rule.description}</p>
                      <div className="mt-2 flex items-center space-x-4">
                        <span className="text-sm text-gray-600">
                          Category: {rule.category}
                        </span>
                        <span className="text-sm text-gray-600">
                          Last checked: {rule.lastChecked.toLocaleDateString()}
                        </span>
                        <span className="text-sm text-gray-600">
                          Next review: {rule.nextReview.toLocaleDateString()}
                        </span>
                        {rule.violations > 0 && (
                          <span className="text-sm text-red-600 font-medium">
                            {rule.violations} violations
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {rule.automatedChecks && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Automated
                        </span>
                      )}
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Run Check
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

          {activeTab === 'reports' && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No reports available</h3>
              <p className="mt-1 text-sm text-gray-500">
                Compliance reports will appear here once generated.
              </p>
              <div className="mt-6">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Generate Compliance Report
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
