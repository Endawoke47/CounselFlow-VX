// Module 7: Dispute Resolution
'use client'

import React, { useState, useMemo } from 'react'
import { ModuleProps, Priority, RiskLevel } from '@/types'

type DisputeResolutionProps = ModuleProps

interface Dispute {
  id: string
  title: string
  type: 'litigation' | 'arbitration' | 'mediation' | 'settlement' | 'internal'
  status: 'active' | 'pending' | 'resolved' | 'dismissed' | 'settled'
  priority: Priority
  riskLevel: RiskLevel
  claimAmount: number
  currency: string
  counterparty: string
  description: string
  filingDate: Date
  nextHearing?: Date
  attorney: string
  jurisdiction: string
  practiceArea: string
  timeline: Array<{
    date: Date
    event: string
    description: string
    type: 'filing' | 'hearing' | 'discovery' | 'motion' | 'settlement' | 'judgment'
  }>
  documents: Array<{
    id: string
    name: string
    type: 'pleading' | 'evidence' | 'motion' | 'order' | 'correspondence'
    uploadDate: Date
    size: string
  }>
  budget: {
    estimated: number
    actual: number
    remaining: number
  }
  outcome?: {
    result: 'won' | 'lost' | 'settled' | 'dismissed'
    amount?: number
    settlementTerms?: string
    appealable: boolean
  }
}

interface DisputeMetrics {
  totalDisputes: number
  activeDisputes: number
  totalClaimValue: number
  successRate: number
  averageResolutionTime: number
  totalLegalCosts: number
}

export function DisputeResolution({
  className
}: DisputeResolutionProps) {
  const [activeView, setActiveView] = useState<'dashboard' | 'litigation' | 'adr' | 'settlement' | 'analytics'>('dashboard')
  const [selectedType, setSelectedType] = useState<'all' | 'litigation' | 'arbitration' | 'mediation' | 'settlement' | 'internal'>('all')
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'pending' | 'resolved' | 'dismissed' | 'settled'>('all')

  // Mock dispute data
  const disputes = useMemo<Dispute[]>(() => [
    {
      id: 'dispute_1',
      title: 'TechCorp vs. CounselFlow - Patent Infringement Defense',
      type: 'litigation',
      status: 'active',
      priority: 'critical',
      riskLevel: 'high',
      claimAmount: 2500000,
      currency: 'USD',
      counterparty: 'TechCorp Industries',
      description: 'Defense against patent infringement claims regarding AI document processing technology',
      filingDate: new Date('2024-09-15'),
      nextHearing: new Date('2025-02-14'),
      attorney: 'Wilson & Associates IP Litigation',
      jurisdiction: 'Federal Court - ND CA',
      practiceArea: 'Intellectual Property',
      timeline: [
        {
          date: new Date('2024-09-15'),
          event: 'Complaint Filed',
          description: 'Plaintiff filed patent infringement complaint',
          type: 'filing'
        },
        {
          date: new Date('2024-10-15'),
          event: 'Answer Filed',
          description: 'Defendant filed answer and counterclaims',
          type: 'filing'
        },
        {
          date: new Date('2024-11-20'),
          event: 'Discovery Conference',
          description: 'Court conference on discovery schedule',
          type: 'hearing'
        },
        {
          date: new Date('2024-12-10'),
          event: 'Expert Discovery Deadline',
          description: 'Deadline for expert witness disclosures',
          type: 'discovery'
        }
      ],
      documents: [
        { id: 'doc_1', name: 'Patent Infringement Complaint', type: 'pleading', uploadDate: new Date('2024-09-15'), size: '2.4 MB' },
        { id: 'doc_2', name: 'Answer and Counterclaims', type: 'pleading', uploadDate: new Date('2024-10-15'), size: '1.8 MB' },
        { id: 'doc_3', name: 'Prior Art Analysis', type: 'evidence', uploadDate: new Date('2024-11-05'), size: '12.1 MB' }
      ],
      budget: {
        estimated: 750000,
        actual: 425000,
        remaining: 325000
      }
    },
    {
      id: 'dispute_2',
      title: 'Employment Discrimination Claim - Johnson v. CounselFlow',
      type: 'litigation',
      status: 'active',
      priority: 'high',
      riskLevel: 'medium',
      claimAmount: 350000,
      currency: 'USD',
      counterparty: 'Sarah Johnson (Former Employee)',
      description: 'Employment discrimination and wrongful termination claims',
      filingDate: new Date('2024-11-20'),
      nextHearing: new Date('2025-01-25'),
      attorney: 'Carter Employment Law Group',
      jurisdiction: 'Superior Court - NY County',
      practiceArea: 'Employment Law',
      timeline: [
        {
          date: new Date('2024-11-20'),
          event: 'Complaint Filed',
          description: 'Plaintiff filed discrimination and wrongful termination complaint',
          type: 'filing'
        },
        {
          date: new Date('2024-12-18'),
          event: 'Motion to Dismiss Filed',
          description: 'Defendant filed motion to dismiss for failure to state a claim',
          type: 'motion'
        }
      ],
      documents: [
        { id: 'doc_4', name: 'Employment Discrimination Complaint', type: 'pleading', uploadDate: new Date('2024-11-20'), size: '1.6 MB' },
        { id: 'doc_5', name: 'Motion to Dismiss', type: 'motion', uploadDate: new Date('2024-12-18'), size: '0.9 MB' }
      ],
      budget: {
        estimated: 200000,
        actual: 85000,
        remaining: 115000
      }
    },
    {
      id: 'dispute_3',
      title: 'Software License Dispute - Arbitration',
      type: 'arbitration',
      status: 'resolved',
      priority: 'medium',
      riskLevel: 'low',
      claimAmount: 125000,
      currency: 'USD',
      counterparty: 'GlobalSoft Solutions',
      description: 'Arbitration regarding software license breach and payment disputes',
      filingDate: new Date('2024-06-10'),
      attorney: 'Peterson Commercial Law',
      jurisdiction: 'AAA Commercial Arbitration',
      practiceArea: 'Commercial Law',
      timeline: [
        {
          date: new Date('2024-06-10'),
          event: 'Arbitration Initiated',
          description: 'Demand for arbitration filed with AAA',
          type: 'filing'
        },
        {
          date: new Date('2024-08-15'),
          event: 'Arbitration Hearing',
          description: 'Full day arbitration hearing conducted',
          type: 'hearing'
        },
        {
          date: new Date('2024-10-22'),
          event: 'Award Issued',
          description: 'Arbitrator issued final award',
          type: 'judgment'
        }
      ],
      documents: [
        { id: 'doc_6', name: 'Demand for Arbitration', type: 'pleading', uploadDate: new Date('2024-06-10'), size: '1.2 MB' },
        { id: 'doc_7', name: 'Arbitration Award', type: 'order', uploadDate: new Date('2024-10-22'), size: '0.7 MB' }
      ],
      budget: {
        estimated: 75000,
        actual: 68000,
        remaining: 7000
      },
      outcome: {
        result: 'won',
        amount: 95000,
        appealable: false
      }
    },
    {
      id: 'dispute_4',
      title: 'Contract Breach Settlement - MegaCorp',
      type: 'settlement',
      status: 'settled',
      priority: 'medium',
      riskLevel: 'low',
      claimAmount: 450000,
      currency: 'USD',
      counterparty: 'MegaCorp International',
      description: 'Settlement negotiations for breach of software implementation contract',
      filingDate: new Date('2024-08-05'),
      attorney: 'In-house Legal Team',
      jurisdiction: 'Pre-litigation Settlement',
      practiceArea: 'Contract Law',
      timeline: [
        {
          date: new Date('2024-08-05'),
          event: 'Demand Letter Sent',
          description: 'Formal demand for contract performance',
          type: 'filing'
        },
        {
          date: new Date('2024-09-12'),
          event: 'Settlement Negotiations',
          description: 'Initial settlement discussions began',
          type: 'settlement'
        },
        {
          date: new Date('2024-11-30'),
          event: 'Settlement Agreement',
          description: 'Final settlement agreement executed',
          type: 'settlement'
        }
      ],
      documents: [
        { id: 'doc_8', name: 'Demand Letter', type: 'correspondence', uploadDate: new Date('2024-08-05'), size: '0.3 MB' },
        { id: 'doc_9', name: 'Settlement Agreement', type: 'pleading', uploadDate: new Date('2024-11-30'), size: '1.1 MB' }
      ],
      budget: {
        estimated: 50000,
        actual: 32000,
        remaining: 18000
      },
      outcome: {
        result: 'settled',
        amount: 275000,
        settlementTerms: 'Confidential settlement with ongoing business relationship',
        appealable: false
      }
    }
  ], [])

  const disputeMetrics = useMemo<DisputeMetrics>(() => {
    const totalDisputes = disputes.length
    const activeDisputes = disputes.filter(d => d.status === 'active').length
    const totalClaimValue = disputes.reduce((sum, d) => sum + d.claimAmount, 0)
    const resolvedDisputes = disputes.filter(d => d.outcome)
    const wonDisputes = resolvedDisputes.filter(d => d.outcome?.result === 'won' || d.outcome?.result === 'settled')
    const successRate = resolvedDisputes.length > 0 ? (wonDisputes.length / resolvedDisputes.length) * 100 : 0
    const totalLegalCosts = disputes.reduce((sum, d) => sum + d.budget.actual, 0)
    
    // Calculate average resolution time for resolved disputes
    const averageResolutionTime = resolvedDisputes.length > 0 
      ? resolvedDisputes.reduce((sum, d) => {
          const lastEvent = d.timeline[d.timeline.length - 1]
          const diffTime = lastEvent.date.getTime() - d.filingDate.getTime()
          return sum + (diffTime / (1000 * 60 * 60 * 24)) // Convert to days
        }, 0) / resolvedDisputes.length
      : 0

    return {
      totalDisputes,
      activeDisputes,
      totalClaimValue,
      successRate,
      averageResolutionTime,
      totalLegalCosts
    }
  }, [disputes])

  const filteredDisputes = useMemo(() => {
    return disputes.filter(dispute => {
      const typeMatch = selectedType === 'all' || dispute.type === selectedType
      const statusMatch = selectedStatus === 'all' || dispute.status === selectedStatus
      return typeMatch && statusMatch
    })
  }, [disputes, selectedType, selectedStatus])

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'text-red-600 bg-red-50 border-red-200',
      pending: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      resolved: 'text-green-600 bg-green-50 border-green-200',
      dismissed: 'text-gray-600 bg-gray-50 border-gray-200',
      settled: 'text-blue-600 bg-blue-50 border-blue-200'
    }
    return colors[status as keyof typeof colors] || colors.pending
  }

  const getPriorityColor = (priority: Priority) => {
    const colors = {
      low: 'text-green-600 bg-green-50',
      medium: 'text-yellow-600 bg-yellow-50',
      high: 'text-orange-600 bg-orange-50',
      critical: 'text-red-600 bg-red-50'
    }
    return colors[priority] || colors.medium
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
          <h2 className="text-2xl font-bold text-gray-900">Dispute Resolution</h2>
          <p className="text-gray-600">Manage litigation, arbitration, mediation, and settlement processes</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
            New Dispute
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: '📊' },
            { id: 'litigation', name: 'Litigation', icon: '⚖️' },
            { id: 'adr', name: 'ADR', icon: '🤝' },
            { id: 'settlement', name: 'Settlements', icon: '✅' },
            { id: 'analytics', name: 'Analytics', icon: '📈' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id as 'dashboard' | 'litigation' | 'adr' | 'settlement' | 'analytics')}
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
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="bg-white rounded-lg border shadow-sm p-4">
              <h4 className="font-medium text-gray-900 mb-2">Total Disputes</h4>
              <div className="text-2xl font-bold text-blue-600">{disputeMetrics.totalDisputes}</div>
              <p className="text-xs text-gray-600">All time</p>
            </div>
            <div className="bg-white rounded-lg border shadow-sm p-4">
              <h4 className="font-medium text-gray-900 mb-2">Active Cases</h4>
              <div className="text-2xl font-bold text-red-600">{disputeMetrics.activeDisputes}</div>
              <p className="text-xs text-gray-600">Ongoing</p>
            </div>
            <div className="bg-white rounded-lg border shadow-sm p-4">
              <h4 className="font-medium text-gray-900 mb-2">Total Claims</h4>
              <div className="text-2xl font-bold text-purple-600">${(disputeMetrics.totalClaimValue / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-gray-600">At stake</p>
            </div>
            <div className="bg-white rounded-lg border shadow-sm p-4">
              <h4 className="font-medium text-gray-900 mb-2">Success Rate</h4>
              <div className="text-2xl font-bold text-green-600">{disputeMetrics.successRate.toFixed(1)}%</div>
              <p className="text-xs text-gray-600">Won/settled</p>
            </div>
            <div className="bg-white rounded-lg border shadow-sm p-4">
              <h4 className="font-medium text-gray-900 mb-2">Avg. Resolution</h4>
              <div className="text-2xl font-bold text-orange-600">{Math.round(disputeMetrics.averageResolutionTime)}</div>
              <p className="text-xs text-gray-600">Days</p>
            </div>
            <div className="bg-white rounded-lg border shadow-sm p-4">
              <h4 className="font-medium text-gray-900 mb-2">Legal Costs</h4>
              <div className="text-2xl font-bold text-yellow-600">${(disputeMetrics.totalLegalCosts / 1000).toFixed(0)}K</div>
              <p className="text-xs text-gray-600">Total spent</p>
            </div>
          </div>

          {/* Active Disputes */}
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Active Disputes</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {disputes.filter(d => d.status === 'active').map((dispute) => (
                <div key={dispute.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-900">{dispute.title}</h4>
                        <div className={`px-2 py-1 rounded text-xs font-medium uppercase ${dispute.type === 'litigation' ? 'bg-red-100 text-red-800' : dispute.type === 'arbitration' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                          {dispute.type}
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(dispute.status)}`}>
                          {dispute.status.toUpperCase()}
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(dispute.priority)}`}>
                          {dispute.priority.toUpperCase()}
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(dispute.riskLevel)}`}>
                          {dispute.riskLevel.toUpperCase()} RISK
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{dispute.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-xs text-gray-500">
                        <div>
                          <span className="font-medium">Counterparty:</span> {dispute.counterparty}
                        </div>
                        <div>
                          <span className="font-medium">Claim Amount:</span> ${dispute.claimAmount.toLocaleString()}
                        </div>
                        <div>
                          <span className="font-medium">Attorney:</span> {dispute.attorney}
                        </div>
                        <div>
                          <span className="font-medium">Filed:</span> {dispute.filingDate.toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Next Hearing:</span> {dispute.nextHearing?.toLocaleDateString() || 'TBD'}
                        </div>
                      </div>
                      
                      {/* Budget Progress */}
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Budget Used</span>
                          <span>${dispute.budget.actual.toLocaleString()} / ${dispute.budget.estimated.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(dispute.budget.actual / dispute.budget.estimated) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <button className="ml-4 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                      Manage
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Timeline Events */}
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Recent Activity</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {disputes.flatMap(dispute => 
                  dispute.timeline.map(event => ({
                    ...event,
                    disputeTitle: dispute.title,
                    disputeId: dispute.id
                  }))
                ).sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5).map((event, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      event.type === 'filing' ? 'bg-blue-500' :
                      event.type === 'hearing' ? 'bg-green-500' :
                      event.type === 'settlement' ? 'bg-purple-500' :
                      event.type === 'judgment' ? 'bg-red-500' :
                      'bg-gray-500'
                    }`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium text-gray-900">{event.event}</h5>
                        <span className="text-xs text-gray-500">{event.date.toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-gray-600">{event.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{event.disputeTitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Litigation View */}
      {activeView === 'litigation' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Litigation Cases</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {disputes.filter(d => d.type === 'litigation').map((dispute) => (
                <div key={dispute.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-900">{dispute.title}</h4>
                        <div className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(dispute.status)}`}>
                          {dispute.status.toUpperCase()}
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(dispute.priority)}`}>
                          {dispute.priority.toUpperCase()}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{dispute.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500 mb-4">
                        <div>
                          <span className="font-medium">Jurisdiction:</span> {dispute.jurisdiction}
                        </div>
                        <div>
                          <span className="font-medium">Attorney:</span> {dispute.attorney}
                        </div>
                        <div>
                          <span className="font-medium">Practice Area:</span> {dispute.practiceArea}
                        </div>
                        <div>
                          <span className="font-medium">Next Hearing:</span> {dispute.nextHearing?.toLocaleDateString() || 'TBD'}
                        </div>
                      </div>
                    </div>
                    <button className="ml-4 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                      View Case
                    </button>
                  </div>
                  
                  {/* Case Timeline */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-3">Recent Timeline</h5>
                    <div className="space-y-2">
                      {dispute.timeline.slice(-3).map((event, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <div>
                            <span className="font-medium">{event.event}</span>
                            <span className="text-gray-600 ml-2">{event.description}</span>
                          </div>
                          <span className="text-gray-500 text-xs">{event.date.toLocaleDateString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Documents */}
                  <div className="mt-4">
                    <h5 className="font-medium text-gray-900 mb-2">Key Documents ({dispute.documents.length})</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {dispute.documents.slice(0, 3).map((doc) => (
                        <div key={doc.id} className="bg-gray-50 rounded p-2">
                          <div className="text-xs font-medium text-gray-900">{doc.name}</div>
                          <div className="text-xs text-gray-600">{doc.type} • {doc.size}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ADR View */}
      {activeView === 'adr' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Alternative Dispute Resolution</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-3">Arbitration Cases</h4>
                  <div className="space-y-3">
                    {disputes.filter(d => d.type === 'arbitration').map((dispute) => (
                      <div key={dispute.id} className="bg-white rounded p-3 shadow-sm">
                        <div className="font-medium text-sm text-gray-900">{dispute.title}</div>
                        <div className="text-xs text-gray-600">{dispute.counterparty}</div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>{dispute.status}</span>
                          <span>${dispute.claimAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h4 className="font-medium text-green-900 mb-3">Mediation Cases</h4>
                  <div className="space-y-3">
                    {disputes.filter(d => d.type === 'mediation').map((dispute) => (
                      <div key={dispute.id} className="bg-white rounded p-3 shadow-sm">
                        <div className="font-medium text-sm text-gray-900">{dispute.title}</div>
                        <div className="text-xs text-gray-600">{dispute.counterparty}</div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>{dispute.status}</span>
                          <span>${dispute.claimAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                    {disputes.filter(d => d.type === 'mediation').length === 0 && (
                      <div className="text-sm text-gray-600">No active mediation cases</div>
                    )}
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <h4 className="font-medium text-purple-900 mb-3">Internal Disputes</h4>
                  <div className="space-y-3">
                    {disputes.filter(d => d.type === 'internal').map((dispute) => (
                      <div key={dispute.id} className="bg-white rounded p-3 shadow-sm">
                        <div className="font-medium text-sm text-gray-900">{dispute.title}</div>
                        <div className="text-xs text-gray-600">{dispute.counterparty}</div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>{dispute.status}</span>
                          <span>${dispute.claimAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                    {disputes.filter(d => d.type === 'internal').length === 0 && (
                      <div className="text-sm text-gray-600">No internal disputes</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">ADR Success Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Arbitration Success Rate</span>
                  <span className="text-sm font-medium text-green-600">85%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Average Arbitration Time</span>
                  <span className="text-sm font-medium">180 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Mediation Settlement Rate</span>
                  <span className="text-sm font-medium text-green-600">92%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Average Mediation Time</span>
                  <span className="text-sm font-medium">45 days</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Cost Comparison</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg. Litigation Cost</span>
                  <span className="text-sm font-medium">$425,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg. Arbitration Cost</span>
                  <span className="text-sm font-medium text-green-600">$68,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg. Mediation Cost</span>
                  <span className="text-sm font-medium text-green-600">$15,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Cost Savings (ADR)</span>
                  <span className="text-sm font-medium text-green-600">84%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settlement View */}
      {activeView === 'settlement' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Settlement Management</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {disputes.filter(d => d.type === 'settlement' || d.outcome?.result === 'settled').map((dispute) => (
                <div key={dispute.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-900">{dispute.title}</h4>
                        <div className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(dispute.status)}`}>
                          {dispute.status.toUpperCase()}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{dispute.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500 mb-3">
                        <div>
                          <span className="font-medium">Counterparty:</span> {dispute.counterparty}
                        </div>
                        <div>
                          <span className="font-medium">Claim Amount:</span> ${dispute.claimAmount.toLocaleString()}
                        </div>
                        <div>
                          <span className="font-medium">Settlement Amount:</span> ${dispute.outcome?.amount?.toLocaleString() || 'TBD'}
                        </div>
                        <div>
                          <span className="font-medium">Legal Costs:</span> ${dispute.budget.actual.toLocaleString()}
                        </div>
                      </div>
                      {dispute.outcome?.settlementTerms && (
                        <div className="bg-green-50 rounded-lg p-3">
                          <div className="text-xs font-medium text-green-900 mb-1">Settlement Terms</div>
                          <div className="text-xs text-green-700">{dispute.outcome.settlementTerms}</div>
                        </div>
                      )}
                    </div>
                    <button className="ml-4 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                      View Settlement
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Settlement Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Settlements</span>
                  <span className="text-sm font-medium">{disputes.filter(d => d.outcome?.result === 'settled').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Settlement Rate</span>
                  <span className="text-sm font-medium text-green-600">67%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg. Settlement Time</span>
                  <span className="text-sm font-medium">95 days</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Financial Impact</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Recovered</span>
                  <span className="text-sm font-medium text-green-600">$370,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Settlement Ratio</span>
                  <span className="text-sm font-medium">61%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Cost Avoided</span>
                  <span className="text-sm font-medium text-green-600">$850,000</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Settlement Trends</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Pre-litigation</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">During Discovery</span>
                  <span className="text-sm font-medium">30%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Pre-trial</span>
                  <span className="text-sm font-medium">25%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics View */}
      {activeView === 'analytics' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-lg border shadow-sm p-4">
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dispute Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as 'all' | 'litigation' | 'arbitration' | 'mediation' | 'settlement' | 'internal')}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="litigation">Litigation</option>
                  <option value="arbitration">Arbitration</option>
                  <option value="mediation">Mediation</option>
                  <option value="settlement">Settlement</option>
                  <option value="internal">Internal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as 'all' | 'active' | 'pending' | 'resolved' | 'dismissed' | 'settled')}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                  <option value="dismissed">Dismissed</option>
                  <option value="settled">Settled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Analytics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Dispute Resolution Performance</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Cases Won</span>
                    <span>60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Cases Settled</span>
                    <span>30%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Cases Lost</span>
                    <span>10%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Cost Analysis</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Average Case Cost</span>
                  <span className="text-sm font-medium">$152,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Cost per Hour</span>
                  <span className="text-sm font-medium">$485</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Budget Variance</span>
                  <span className="text-sm font-medium text-green-600">-8.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">ROI on Settlements</span>
                  <span className="text-sm font-medium text-green-600">245%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Time Analysis</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg. Litigation Time</span>
                  <span className="text-sm font-medium">485 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg. Arbitration Time</span>
                  <span className="text-sm font-medium">134 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg. Settlement Time</span>
                  <span className="text-sm font-medium">95 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Time Savings (ADR)</span>
                  <span className="text-sm font-medium text-green-600">72%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Analytics */}
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">All Disputes ({filteredDisputes.length})</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredDisputes.map((dispute) => (
                <div key={dispute.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-900">{dispute.title}</h4>
                        <div className={`px-2 py-1 rounded text-xs font-medium uppercase ${dispute.type === 'litigation' ? 'bg-red-100 text-red-800' : dispute.type === 'arbitration' ? 'bg-blue-100 text-blue-800' : dispute.type === 'mediation' ? 'bg-green-100 text-green-800' : dispute.type === 'settlement' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                          {dispute.type}
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(dispute.status)}`}>
                          {dispute.status.toUpperCase()}
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(dispute.riskLevel)}`}>
                          {dispute.riskLevel.toUpperCase()} RISK
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-xs text-gray-500">
                        <div>
                          <span className="font-medium">Counterparty:</span> {dispute.counterparty}
                        </div>
                        <div>
                          <span className="font-medium">Claim:</span> ${dispute.claimAmount.toLocaleString()}
                        </div>
                        <div>
                          <span className="font-medium">Filed:</span> {dispute.filingDate.toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Attorney:</span> {dispute.attorney}
                        </div>
                        <div>
                          <span className="font-medium">Costs:</span> ${dispute.budget.actual.toLocaleString()}
                        </div>
                        <div>
                          <span className="font-medium">Outcome:</span> {dispute.outcome?.result || 'Ongoing'}
                        </div>
                      </div>
                    </div>
                    <button className="ml-4 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DisputeResolution
