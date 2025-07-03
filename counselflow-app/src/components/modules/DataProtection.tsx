// Module 5: Data Protection & Privacy
'use client'

import React, { useState, useMemo } from 'react'
import { ModuleProps, ComplianceStatus, RiskLevel } from '@/types'

type DataProtectionProps = ModuleProps

export function DataProtection({
  className
}: DataProtectionProps) {
  const [activeView, setActiveView] = useState<'dashboard' | 'gdpr' | 'privacy' | 'data_mapping' | 'incidents'>('dashboard')
  const [selectedRegulation, setSelectedRegulation] = useState<'gdpr' | 'ccpa' | 'hipaa' | 'all'>('all')

  // Mock data protection metrics
  const dataProtectionMetrics = useMemo(() => ({
    overall: {
      complianceScore: 87.5,
      riskLevel: 'medium' as RiskLevel,
      lastAssessment: new Date('2024-12-15'),
      nextReview: new Date('2025-01-15')
    },
    regulations: [
      {
        id: 'gdpr',
        name: 'GDPR',
        fullName: 'General Data Protection Regulation',
        status: 'compliant' as ComplianceStatus,
        score: 92.3,
        lastReview: new Date('2024-12-10'),
        violations: 0,
        riskLevel: 'low' as RiskLevel,
        jurisdiction: 'EU',
        applicableData: ['personal_data', 'special_categories']
      },
      {
        id: 'ccpa',
        name: 'CCPA',
        fullName: 'California Consumer Privacy Act',
        status: 'partial' as ComplianceStatus,
        score: 78.9,
        lastReview: new Date('2024-12-05'),
        violations: 2,
        riskLevel: 'medium' as RiskLevel,
        jurisdiction: 'California',
        applicableData: ['personal_information']
      },
      {
        id: 'hipaa',
        name: 'HIPAA',
        fullName: 'Health Insurance Portability and Accountability Act',
        status: 'compliant' as ComplianceStatus,
        score: 91.7,
        lastReview: new Date('2024-12-12'),
        violations: 0,
        riskLevel: 'low' as RiskLevel,
        jurisdiction: 'US',
        applicableData: ['phi', 'ePHI']
      }
    ],
    dataInventory: {
      totalDataSets: 247,
      highRiskData: 23,
      unclassifiedData: 12,
      retentionCompliance: 94.2,
      encryptionRate: 98.7
    }
  }), [])

  const privacyIncidents = useMemo(() => [
    {
      id: 'incident_1',
      title: 'Unauthorized Email Access Attempt',
      severity: 'medium' as RiskLevel,
      status: 'resolved',
      dateReported: new Date('2024-12-20'),
      affectedRecords: 0,
      dataTypes: ['email_metadata'],
      rootCause: 'Failed phishing attempt blocked by security systems',
      actions: [
        'Enhanced email security filters deployed',
        'Staff security training updated',
        'Monitoring protocols reinforced'
      ],
      regulatoryNotification: 'not_required',
      investigationComplete: true
    },
    {
      id: 'incident_2',
      title: 'Client Data Export Error',
      severity: 'low' as RiskLevel,
      status: 'investigating',
      dateReported: new Date('2024-12-18'),
      affectedRecords: 5,
      dataTypes: ['client_contact_info'],
      rootCause: 'System bug in data export function',
      actions: [
        'Export function temporarily disabled',
        'Data integrity review in progress',
        'Affected clients notified'
      ],
      regulatoryNotification: 'pending_review',
      investigationComplete: false
    }
  ], [])

  const dataFlows = useMemo(() => [
    {
      id: 'flow_1',
      name: 'Client Onboarding Data',
      source: 'CRM System',
      destination: 'Document Management',
      dataTypes: ['personal_data', 'financial_info'],
      encryption: 'AES-256',
      retention: '7 years',
      lawfulBasis: 'contract',
      riskLevel: 'medium' as RiskLevel,
      lastReviewed: new Date('2024-11-15')
    },
    {
      id: 'flow_2',
      name: 'Email Communications',
      source: 'Email Server',
      destination: 'Archive System',
      dataTypes: ['correspondence', 'metadata'],
      encryption: 'TLS 1.3',
      retention: '10 years',
      lawfulBasis: 'legal_obligation',
      riskLevel: 'low' as RiskLevel,
      lastReviewed: new Date('2024-12-01')
    }
  ], [])

  const privacyRights = useMemo(() => [
    {
      id: 'request_1',
      type: 'data_access',
      requester: 'John Smith',
      dateReceived: new Date('2024-12-22'),
      status: 'pending',
      deadline: new Date('2025-01-21'),
      dataSubject: 'former_client',
      requestedData: 'All personal data held',
      assignedTo: 'Privacy Officer'
    },
    {
      id: 'request_2',
      type: 'data_deletion',
      requester: 'Jane Doe',
      dateReceived: new Date('2024-12-20'),
      status: 'completed',
      deadline: new Date('2025-01-19'),
      dataSubject: 'current_client',
      requestedData: 'Marketing preferences',
      assignedTo: 'Privacy Officer'
    }
  ], [])

  const getComplianceColor = (status: ComplianceStatus) => {
    const colors = {
      compliant: 'text-green-600 bg-green-50 border-green-200',
      non_compliant: 'text-red-600 bg-red-50 border-red-200',
      partial: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      under_review: 'text-blue-600 bg-blue-50 border-blue-200',
      not_applicable: 'text-gray-400 bg-gray-50 border-gray-200',
      pending_review: 'text-purple-600 bg-purple-50 border-purple-200',
      exempt: 'text-gray-600 bg-gray-50 border-gray-200'
    }
    return colors[status] || colors.under_review
  }

  const getRiskColor = (level: RiskLevel) => {
    const colors = {
      low: 'text-green-600 bg-green-50',
      medium: 'text-yellow-600 bg-yellow-50',
      high: 'text-red-600 bg-red-50',
      critical: 'text-red-800 bg-red-100'
    }
    return colors[level] || colors.medium
  }

  return (
    <div className={`p-6 space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Data Protection & Privacy</h2>
          <p className="text-gray-600">Manage privacy compliance, data governance, and regulatory requirements</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedRegulation}
            onChange={(e) => setSelectedRegulation(e.target.value as 'gdpr' | 'ccpa' | 'hipaa' | 'all')}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="all">All Regulations</option>
            <option value="gdpr">GDPR</option>
            <option value="ccpa">CCPA</option>
            <option value="hipaa">HIPAA</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
            Privacy Assessment
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: '🛡️' },
            { id: 'gdpr', name: 'GDPR Compliance', icon: '🇪🇺' },
            { id: 'privacy', name: 'Privacy Rights', icon: '👤' },
            { id: 'data_mapping', name: 'Data Mapping', icon: '🗺️' },
            { id: 'incidents', name: 'Privacy Incidents', icon: '🚨' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id as 'dashboard' | 'gdpr' | 'privacy' | 'data_mapping' | 'incidents')}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                activeView === tab.id
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

      {/* Dashboard View */}
      {activeView === 'dashboard' && (
        <div className="space-y-6">
          {/* Overall Compliance Score */}
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Overall Privacy Compliance</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">{dataProtectionMetrics.overall.complianceScore}%</div>
                  <div className="text-sm text-gray-600">Compliance Score</div>
                </div>
                <div className={`px-4 py-2 rounded-lg font-medium ${getRiskColor(dataProtectionMetrics.overall.riskLevel)}`}>
                  {dataProtectionMetrics.overall.riskLevel.toUpperCase()} RISK
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Last Assessment</div>
                <div className="font-medium">{dataProtectionMetrics.overall.lastAssessment.toLocaleDateString()}</div>
                <div className="text-sm text-gray-600 mt-1">Next Review</div>
                <div className="font-medium">{dataProtectionMetrics.overall.nextReview.toLocaleDateString()}</div>
              </div>
            </div>
          </div>

          {/* Regulation Compliance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dataProtectionMetrics.regulations.map((regulation) => (
              <div key={regulation.id} className="bg-white rounded-lg border shadow-sm p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{regulation.name}</h4>
                  <div className={`px-2 py-1 rounded text-xs font-medium border ${getComplianceColor(regulation.status)}`}>
                    {regulation.status.replace('_', ' ').toUpperCase()}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{regulation.fullName}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Compliance Score</span>
                    <span className="font-medium">{regulation.score}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Violations</span>
                    <span className={`font-medium ${regulation.violations > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {regulation.violations}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Risk Level</span>
                    <span className={`font-medium ${regulation.riskLevel === 'low' ? 'text-green-600' : regulation.riskLevel === 'medium' ? 'text-yellow-600' : 'text-red-600'}`}>
                      {regulation.riskLevel.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Last Review</span>
                    <span className="font-medium">{regulation.lastReview.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Data Inventory Summary */}
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Data Inventory Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{dataProtectionMetrics.dataInventory.totalDataSets}</div>
                <div className="text-sm text-gray-600">Total Data Sets</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{dataProtectionMetrics.dataInventory.highRiskData}</div>
                <div className="text-sm text-gray-600">High Risk Data</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{dataProtectionMetrics.dataInventory.unclassifiedData}</div>
                <div className="text-sm text-gray-600">Unclassified</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{dataProtectionMetrics.dataInventory.retentionCompliance}%</div>
                <div className="text-sm text-gray-600">Retention Compliance</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{dataProtectionMetrics.dataInventory.encryptionRate}%</div>
                <div className="text-sm text-gray-600">Encryption Rate</div>
              </div>
            </div>
          </div>

          {/* Recent Privacy Rights Requests */}
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Recent Privacy Rights Requests</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {privacyRights.slice(0, 3).map((request) => (
                <div key={request.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-900">{request.type.replace('_', ' ').toUpperCase()}</h4>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          request.status === 'completed' ? 'bg-green-100 text-green-800' :
                          request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {request.status.toUpperCase()}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Requester: {request.requester}</p>
                      <p className="text-sm text-gray-600 mb-2">Data: {request.requestedData}</p>
                      <div className="text-xs text-gray-500">
                        Received: {request.dateReceived.toLocaleDateString()} • 
                        Deadline: {request.deadline.toLocaleDateString()} • 
                        Assigned to: {request.assignedTo}
                      </div>
                    </div>
                    <button className="ml-4 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* GDPR Compliance View */}
      {activeView === 'gdpr' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">GDPR Compliance Dashboard</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">Article 30 Records</h4>
                <div className="text-2xl font-bold text-green-600">✓</div>
                <p className="text-xs text-green-700">Records of Processing Activities maintained</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">Data Protection Impact Assessments</h4>
                <div className="text-2xl font-bold text-green-600">12</div>
                <p className="text-xs text-green-700">Completed DPIAs</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <h4 className="font-medium text-yellow-900 mb-2">Breach Notification</h4>
                <div className="text-2xl font-bold text-yellow-600">72h</div>
                <p className="text-xs text-yellow-700">Average notification time</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">Consent Management</h4>
                <div className="text-2xl font-bold text-green-600">94%</div>
                <p className="text-xs text-green-700">Valid consent rate</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">GDPR Article Compliance</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { article: 'Article 6', title: 'Lawfulness of Processing', status: 'compliant', score: 95 },
                  { article: 'Article 7', title: 'Conditions for Consent', status: 'compliant', score: 92 },
                  { article: 'Article 13-14', title: 'Information to Data Subjects', status: 'partial', score: 78 },
                  { article: 'Article 15-22', title: 'Data Subject Rights', status: 'compliant', score: 89 },
                  { article: 'Article 25', title: 'Data Protection by Design', status: 'compliant', score: 87 },
                  { article: 'Article 30', title: 'Records of Processing', status: 'compliant', score: 94 },
                  { article: 'Article 32', title: 'Security of Processing', status: 'compliant', score: 91 },
                  { article: 'Article 33-34', title: 'Breach Notification', status: 'compliant', score: 96 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{item.article}: {item.title}</h4>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-sm font-medium">{item.score}%</div>
                      <div className={`px-3 py-1 rounded text-xs font-medium ${getComplianceColor(item.status as ComplianceStatus)}`}>
                        {item.status.replace('_', ' ').toUpperCase()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Rights View */}
      {activeView === 'privacy' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Data Subject Rights Requests</h3>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                  New Request
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {privacyRights.map((request) => (
                <div key={request.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-900">{request.type.replace('_', ' ').toUpperCase()}</h4>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          request.status === 'completed' ? 'bg-green-100 text-green-800' :
                          request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {request.status.toUpperCase()}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-gray-600"><span className="font-medium">Requester:</span> {request.requester}</p>
                          <p className="text-sm text-gray-600"><span className="font-medium">Data Subject:</span> {request.dataSubject.replace('_', ' ')}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600"><span className="font-medium">Received:</span> {request.dateReceived.toLocaleDateString()}</p>
                          <p className="text-sm text-gray-600"><span className="font-medium">Deadline:</span> {request.deadline.toLocaleDateString()}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2"><span className="font-medium">Requested Data:</span> {request.requestedData}</p>
                      <p className="text-xs text-gray-500">Assigned to: {request.assignedTo}</p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button className="px-3 py-1 border border-gray-300 text-gray-700 text-xs rounded hover:bg-gray-50">
                        View
                      </button>
                      <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                        Process
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Request Types (Last 30 Days)</h3>
              <div className="space-y-3">
                {[
                  { type: 'Data Access', count: 12, percentage: 45 },
                  { type: 'Data Deletion', count: 8, percentage: 30 },
                  { type: 'Data Portability', count: 4, percentage: 15 },
                  { type: 'Data Rectification', count: 3, percentage: 10 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{item.type}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{item.count}</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Response Time Performance</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Average Response Time</span>
                  <span className="text-sm font-medium">18 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">On-Time Completion Rate</span>
                  <span className="text-sm font-medium text-green-600">94%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Overdue Requests</span>
                  <span className="text-sm font-medium text-red-600">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Auto-Processed</span>
                  <span className="text-sm font-medium text-blue-600">67%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Data Mapping View */}
      {activeView === 'data_mapping' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Data Flow Mapping</h3>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                  Map New Flow
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {dataFlows.map((flow) => (
                <div key={flow.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-2">{flow.name}</h4>
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="text-sm">
                          <span className="text-gray-600">From:</span> <span className="font-medium">{flow.source}</span>
                        </div>
                        <div className="text-gray-400">→</div>
                        <div className="text-sm">
                          <span className="text-gray-600">To:</span> <span className="font-medium">{flow.destination}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded text-xs font-medium ${getRiskColor(flow.riskLevel)}`}>
                      {flow.riskLevel.toUpperCase()} RISK
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs font-medium text-gray-900 mb-1">Data Types</div>
                      <div className="text-xs text-gray-600">
                        {flow.dataTypes.map(type => type.replace('_', ' ')).join(', ')}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs font-medium text-gray-900 mb-1">Encryption</div>
                      <div className="text-xs text-gray-600">{flow.encryption}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs font-medium text-gray-900 mb-1">Retention</div>
                      <div className="text-xs text-gray-600">{flow.retention}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs font-medium text-gray-900 mb-1">Lawful Basis</div>
                      <div className="text-xs text-gray-600">{flow.lawfulBasis.replace('_', ' ')}</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      Last reviewed: {flow.lastReviewed.toLocaleDateString()}
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 border border-gray-300 text-gray-700 text-xs rounded hover:bg-gray-50">
                        Review
                      </button>
                      <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Privacy Incidents View */}
      {activeView === 'incidents' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Privacy Incidents & Breaches</h3>
                <button className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700">
                  Report Incident
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {privacyIncidents.map((incident) => (
                <div key={incident.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-900">{incident.title}</h4>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(incident.severity)}`}>
                          {incident.severity.toUpperCase()}
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          incident.status === 'resolved' ? 'bg-green-100 text-green-800' :
                          incident.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {incident.status.toUpperCase()}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{incident.rootCause}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div>
                          <span className="text-xs font-medium text-gray-900">Affected Records:</span>
                          <span className="text-xs text-gray-600 ml-1">{incident.affectedRecords}</span>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-gray-900">Data Types:</span>
                          <span className="text-xs text-gray-600 ml-1">{incident.dataTypes.join(', ')}</span>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-gray-900">Reported:</span>
                          <span className="text-xs text-gray-600 ml-1">{incident.dateReported.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <button className="ml-4 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                      View Details
                    </button>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs font-medium text-gray-900 mb-2">Actions Taken:</div>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {incident.actions.map((action, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Incident Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Incidents (YTD)</span>
                  <span className="text-sm font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Resolved</span>
                  <span className="text-sm font-medium text-green-600">10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Under Investigation</span>
                  <span className="text-sm font-medium text-yellow-600">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Average Resolution Time</span>
                  <span className="text-sm font-medium">3.2 days</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Regulatory Notifications</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Required Notifications</span>
                  <span className="text-sm font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Submitted On Time</span>
                  <span className="text-sm font-medium text-green-600">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Average Notification Time</span>
                  <span className="text-sm font-medium">48 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">GDPR 72h Compliance</span>
                  <span className="text-sm font-medium text-green-600">100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DataProtection
