// Module 2: Contract Lifecycle Management (CLM)
'use client'

import React, { useState, useMemo } from 'react'
import { Contract, ContractStatus, ModuleProps, ContractType } from '@/types'
import { useContractStore } from '@/store'

type ContractLifecycleManagementProps = ModuleProps

export function ContractLifecycleManagement({
  className
}: ContractLifecycleManagementProps) {
  const { contracts, loading, error } = useContractStore()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeContract, setActiveContract] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'templates' | 'analytics' | 'negotiations'>('overview')
  const [showCreateForm, setShowCreateForm] = useState(false)

  // Contract Templates
  const contractTemplates = [
    {
      id: 'nda_template',
      name: 'Non-Disclosure Agreement',
      type: 'nda' as ContractType,
      description: 'Standard NDA template with mutual confidentiality provisions',
      category: 'Legal Protection',
      estimatedTime: '15 minutes',
      riskLevel: 'low',
      icon: '🔒'
    },
    {
      id: 'service_template',
      name: 'Service Agreement',
      type: 'service_agreement' as ContractType,
      description: 'Comprehensive service agreement with SLA provisions',
      category: 'Commercial',
      estimatedTime: '45 minutes',
      riskLevel: 'medium',
      icon: '🤝'
    },
    {
      id: 'employment_template',
      name: 'Employment Contract',
      type: 'employment_contract' as ContractType,
      description: 'Standard employment agreement with benefits and termination clauses',
      category: 'HR & Employment',
      estimatedTime: '30 minutes',
      riskLevel: 'medium',
      icon: '👥'
    },
    {
      id: 'vendor_template',
      name: 'Vendor Agreement',
      type: 'vendor_contract' as ContractType,
      description: 'Vendor services contract with performance metrics',
      category: 'Procurement',
      estimatedTime: '60 minutes',
      riskLevel: 'high',
      icon: '📦'
    }
  ]

  // Mock contract data if store is empty
  const mockContracts: Contract[] = useMemo(() => [
    {
      id: 'contract_1',
      title: 'Software License Agreement - TechCorp',
      type: 'licensing_agreement',
      parties: [
        {
          id: 'party_1',
          name: 'Our Firm',
          role: 'licensee',
          entityType: 'law_firm',
          jurisdiction: 'NY',
          signatory: 'John Smith, Managing Partner'
        },
        {
          id: 'party_2',
          name: 'TechCorp Inc.',
          role: 'licensor',
          entityType: 'corporation',
          jurisdiction: 'CA',
          signatory: 'Jane Doe, CEO'
        }
      ],
      status: 'under_review',
      value: 250000,
      currency: 'USD',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2027-12-31'),
      keyTerms: [
        {
          id: 'term_1',
          category: 'Payment',
          description: 'Annual license fee with 3% escalation',
          value: '$250,000/year',
          importance: 'high',
          negotiable: true
        },
        {
          id: 'term_2',
          category: 'Termination',
          description: '60-day notice period for termination',
          value: '60 days',
          importance: 'medium',
          negotiable: false
        }
      ],
      clauses: [
        {
          id: 'clause_1',
          type: 'liability',
          content: 'Limitation of liability shall not exceed the annual fees paid under this agreement...',
          riskLevel: 'medium',
          isStandard: true,
          recommendations: ['Consider adding indemnification provisions', 'Review exclusions for willful misconduct']
        }
      ],
      aiAnalysis: {
        summary: 'Standard software licensing agreement with favorable terms for licensee. Risk level is moderate.',
        keyPoints: [
          'Favorable licensing terms with reasonable restrictions',
          'Standard liability limitations in place',
          'Clear termination provisions',
          'Competitive pricing structure'
        ],
        riskFactors: [
          {
            type: 'Legal',
            description: 'Broad intellectual property indemnification clause',
            severity: 'medium',
            mitigation: 'Negotiate mutual indemnification provisions'
          }
        ],
        recommendations: [
          'Review and negotiate data security provisions',
          'Add performance benchmarks for software availability',
          'Consider adding audit rights for compliance verification'
        ],
        confidence: 0.92,
        processingTime: 1.2,
        model: 'CounselFlow-Legal-v2.1',
        version: '2.1.0',
        lastUpdated: new Date('2024-12-01T10:30:00Z'),
        unusualClauses: [],
        marketComparison: {
          metric: 'Annual License Fee',
          firmValue: '$250,000',
          marketAverage: '$280,000',
          percentile: 25,
          recommendation: 'Below market rate - favorable terms'
        },
        negotiationPoints: [
          {
            clause: 'Payment Terms',
            currentTerm: 'Annual payment in advance',
            suggestedTerm: 'Quarterly payments',
            rationale: 'Improved cash flow management',
            priority: 'medium'
          }
        ],
        complianceIssues: []
      },
      riskScore: 6.2,
      complianceStatus: 'compliant',
      metadata: {
        department: 'Legal Technology',
        businessUnit: 'Operations',
        contractManager: 'Alice Johnson'
      },
      createdAt: new Date('2024-12-15'),
      updatedAt: new Date('2024-12-20')
    }
  ], [])

  const displayContracts = contracts.length > 0 ? contracts : mockContracts

  const getStatusColor = (status: ContractStatus) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      under_review: 'bg-yellow-100 text-yellow-800',
      pending_approval: 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800',
      executed: 'bg-indigo-100 text-indigo-800',
      active: 'bg-emerald-100 text-emerald-800',
      expired: 'bg-red-100 text-red-800',
      terminated: 'bg-red-100 text-red-800',
      breached: 'bg-red-200 text-red-900',
      cancelled: 'bg-gray-100 text-gray-800'
    }
    return colors[status]
  }

  const getRiskColor = (score: number) => {
    if (score >= 8) return 'text-red-600 bg-red-50'
    if (score >= 6) return 'text-orange-600 bg-orange-50'
    if (score >= 4) return 'text-yellow-600 bg-yellow-50'
    return 'text-green-600 bg-green-50'
  }

  const getRiskLevel = (score: number) => {
    if (score >= 8) return 'Critical'
    if (score >= 6) return 'High'
    if (score >= 4) return 'Medium'
    return 'Low'
  }

  const handleCreateContract = async (templateId: string) => {
    const template = contractTemplates.find(t => t.id === templateId)
    if (!template) return

    // In a real app, this would create a new contract from template
    setShowCreateForm(false)
    // Navigate to contract editor or show success message
  }

  if (loading) {
    return (
      <div className={`p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`p-6 ${className}`}>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-red-400">⚠️</span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Contract Management Error
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`p-6 space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contract Lifecycle Management</h1>
          <p className="mt-2 text-gray-600">
            End-to-end contract management with AI-powered automation
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            + New Contract
          </button>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {displayContracts.length} Active Contracts
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {[
            { id: 'overview', name: 'Overview', icon: '📊' },
            { id: 'templates', name: 'Templates', icon: '📋' },
            { id: 'analytics', name: 'Analytics', icon: '📈' },
            { id: 'negotiations', name: 'Negotiations', icon: '🤝' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'overview' | 'templates' | 'analytics' | 'negotiations')}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Contract Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">📄</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Total Contracts</h3>
                  <p className="text-3xl font-bold text-blue-600">{displayContracts.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">⏳</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Under Review</h3>
                  <p className="text-3xl font-bold text-yellow-600">
                    {displayContracts.filter(c => c.status === 'under_review').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">💰</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Total Value</h3>
                  <p className="text-3xl font-bold text-green-600">
                    ${displayContracts.reduce((sum, c) => sum + c.value, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">🤖</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">AI Processed</h3>
                  <p className="text-3xl font-bold text-purple-600">
                    {displayContracts.filter(c => c.aiAnalysis).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contracts List */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Active Contracts</h3>
            </div>
            
            <div className="divide-y divide-gray-200">
              {displayContracts.map((contract) => (
                <div
                  key={contract.id}
                  className="p-6 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setActiveContract(contract.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h4 className="text-lg font-semibold text-gray-900">{contract.title}</h4>
                        <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}>
                          {contract.status.replace('_', ' ')}
                        </span>
                      </div>
                      
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Type:</span> {contract.type.replace('_', ' ')}
                        </div>
                        <div>
                          <span className="font-medium">Value:</span> ${contract.value.toLocaleString()} {contract.currency}
                        </div>
                        <div>
                          <span className="font-medium">Term:</span> {contract.startDate.toLocaleDateString()} - {contract.endDate.toLocaleDateString()}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center space-x-4">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(contract.riskScore)}`}>
                          Risk: {getRiskLevel(contract.riskScore)} ({contract.riskScore.toFixed(1)})
                        </div>
                        
                        {contract.aiAnalysis && (
                          <div className="flex items-center text-xs text-gray-500">
                            <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                            AI Confidence: {Math.round(contract.aiAnalysis.confidence * 100)}%
                          </div>
                        )}
                        
                        <div className="text-xs text-gray-500">
                          Updated: {contract.updatedAt.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-6 flex-shrink-0">
                      <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Contract Templates</h3>
            <p className="text-sm text-gray-600">AI-powered templates with intelligent customization</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contractTemplates.map((template) => (
              <div key={template.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <span className="text-3xl mr-3">{template.icon}</span>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{template.name}</h4>
                      <p className="text-sm text-gray-600">{template.category}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    template.riskLevel === 'low' ? 'bg-green-100 text-green-800' :
                    template.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {template.riskLevel} risk
                  </span>
                </div>

                <p className="mt-3 text-sm text-gray-600">{template.description}</p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <span className="inline-flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      ~{template.estimatedTime}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCreateContract(template.id)}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                  >
                    Use Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Contract Analytics & Insights</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Contract Types Distribution</h4>
              <div className="space-y-3">
                {Object.entries(
                  displayContracts.reduce((acc, contract) => {
                    acc[contract.type] = (acc[contract.type] || 0) + 1
                    return acc
                  }, {} as Record<string, number>)
                ).map(([type, count]) => (
                  <div key={type} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{type.replace('_', ' ')}</span>
                    <span className="text-sm text-gray-600">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Risk Distribution</h4>
              <div className="space-y-3">
                {['Low (0-4)', 'Medium (4-6)', 'High (6-8)', 'Critical (8-10)'].map((range, index) => {
                  const minScore = index * 2
                  const maxScore = (index + 1) * 2
                  const count = displayContracts.filter(c => c.riskScore >= minScore && c.riskScore < maxScore).length
                  return (
                    <div key={range} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{range}</span>
                      <span className="text-sm text-gray-600">{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Negotiations Tab */}
      {activeTab === 'negotiations' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Active Negotiations</h3>
          
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 text-center text-gray-500">
              <span className="text-4xl mb-4 block">🤝</span>
              <p className="text-lg font-medium mb-2">Negotiation Management</p>
              <p>Track contract negotiations, approval workflows, and stakeholder communications.</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700">
                Start New Negotiation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Contract Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Create New Contract</h3>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-600">Select a template to start with:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contractTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleCreateContract(template.id)}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all text-left"
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{template.icon}</span>
                      <div>
                        <h4 className="font-medium text-gray-900">{template.name}</h4>
                        <p className="text-sm text-gray-600">{template.category}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
