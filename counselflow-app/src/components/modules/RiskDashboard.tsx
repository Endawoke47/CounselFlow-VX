// Module 3: Risk Dashboard & Compliance
'use client'

import React, { useState, useMemo } from 'react'
import { ModuleProps, RiskLevel, ComplianceStatus } from '@/types'

type RiskDashboardProps = ModuleProps

export function RiskDashboard({
  className
}: RiskDashboardProps) {
  const [activeView, setActiveView] = useState<'dashboard' | 'rules' | 'assessments' | 'monitoring'>('dashboard')
  const [selectedTimeframe, setSelectedTimeframe] = useState<'24h' | '7d' | '30d' | '90d'>('7d')

  // Mock risk data
  const riskMetrics = useMemo(() => ({
    overall: {
      score: 6.3,
      trend: '+0.4',
      level: 'medium' as RiskLevel,
      change: 'increased'
    },
    categories: [
      {
        id: 'legal',
        name: 'Legal Risk',
        score: 7.1,
        trend: '+0.2',
        level: 'high' as RiskLevel,
        issues: 12,
        icon: '⚖️'
      },
      {
        id: 'compliance',
        name: 'Compliance Risk',
        score: 4.8,
        trend: '-0.1',
        level: 'medium' as RiskLevel,
        issues: 3,
        icon: '✅'
      },
      {
        id: 'operational',
        name: 'Operational Risk',
        score: 5.9,
        trend: '+0.3',
        level: 'medium' as RiskLevel,
        issues: 8,
        icon: '⚙️'
      },
      {
        id: 'financial',
        name: 'Financial Risk',
        score: 8.2,
        trend: '+0.7',
        level: 'high' as RiskLevel,
        issues: 15,
        icon: '💰'
      },
      {
        id: 'regulatory',
        name: 'Regulatory Risk',
        score: 3.4,
        trend: '-0.2',
        level: 'low' as RiskLevel,
        issues: 2,
        icon: '📋'
      },
      {
        id: 'cyber',
        name: 'Cyber Security',
        score: 6.7,
        trend: '+0.5',
        level: 'medium' as RiskLevel,
        issues: 9,
        icon: '🔒'
      }
    ]
  }), [])

  const complianceRules = useMemo(() => [
    {
      id: 'gdpr_compliance',
      name: 'GDPR Data Protection',
      category: 'Privacy',
      status: 'compliant' as ComplianceStatus,
      lastChecked: new Date(),
      nextReview: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      description: 'Ensure all client data handling complies with GDPR requirements',
      severity: 'critical',
      automatedChecks: true,
      violations: 0
    },
    {
      id: 'sox_compliance',
      name: 'Sarbanes-Oxley Compliance',
      category: 'Financial',
      status: 'non_compliant' as ComplianceStatus,
      lastChecked: new Date(),
      nextReview: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      description: 'Financial reporting and internal controls compliance',
      severity: 'high',
      automatedChecks: false,
      violations: 2
    },
    {
      id: 'hipaa_compliance',
      name: 'HIPAA Privacy Rule',
      category: 'Healthcare',
      status: 'pending_review' as ComplianceStatus,
      lastChecked: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      nextReview: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      description: 'Healthcare information privacy and security standards',
      severity: 'high',
      automatedChecks: true,
      violations: 1
    }
  ], [])

  const riskAssessments = useMemo(() => [
    {
      id: 'assessment_1',
      title: 'Contract Risk Assessment - TechCorp Deal',
      type: 'contract',
      entityId: 'contract_1',
      overallRisk: 7.2,
      riskLevel: 'high' as RiskLevel,
      status: 'completed',
      assessor: 'AI Risk Engine v2.1',
      createdAt: new Date(),
      factors: [
        {
          category: 'Legal',
          description: 'Broad liability limitation clauses',
          impact: 8.5,
          probability: 0.6,
          risk: 5.1,
          mitigation: 'Negotiate reciprocal liability caps'
        },
        {
          category: 'Financial',
          description: 'Significant upfront payment requirements',
          impact: 9.0,
          probability: 0.8,
          risk: 7.2,
          mitigation: 'Restructure payment terms with milestones'
        }
      ],
      recommendations: [
        'Implement additional due diligence procedures',
        'Require board approval for this risk level',
        'Consider insurance coverage for potential liabilities'
      ],
      aiInsights: {
        confidence: 0.89,
        processingTime: 3.2,
        model: 'RiskAnalyzer-v2.1',
        benchmarkComparison: 'Higher risk than 78% of similar contracts'
      }
    }
  ], [])

  const alertsAndIssues = useMemo(() => [
    {
      id: 'alert_1',
      type: 'compliance_violation',
      severity: 'high',
      title: 'GDPR Data Retention Violation',
      description: 'Client data retained beyond legal limit in 3 cases',
      created: new Date(),
      status: 'active',
      assignedTo: 'Compliance Team',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'alert_2',
      type: 'risk_threshold',
      severity: 'medium',
      title: 'Contract Risk Score Exceeded',
      description: 'TechCorp contract risk score (7.2) exceeds threshold (7.0)',
      created: new Date(),
      status: 'under_review',
      assignedTo: 'Senior Partner',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    }
  ], [])

  const getRiskColor = (level: RiskLevel) => {
    const colors = {
      low: 'text-green-600 bg-green-50 border-green-200',
      medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      high: 'text-red-600 bg-red-50 border-red-200',
      critical: 'text-red-800 bg-red-100 border-red-300'
    }
    return colors[level]
  }

  const getComplianceColor = (status: ComplianceStatus) => {
    const colors = {
      compliant: 'text-green-600 bg-green-50',
      non_compliant: 'text-red-600 bg-red-50',
      pending_review: 'text-yellow-600 bg-yellow-50',
      exempt: 'text-gray-600 bg-gray-50',
      partial: 'text-orange-600 bg-orange-50',
      under_review: 'text-blue-600 bg-blue-50',
      not_applicable: 'text-gray-400 bg-gray-50'
    }
    return colors[status] || colors.not_applicable
  }

  return (
    <div className={`p-6 space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Risk Dashboard & Compliance</h2>
          <p className="text-gray-600">Monitor risks, compliance status, and regulatory requirements</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value as '24h' | '7d' | '30d' | '90d')}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: '📊' },
            { id: 'rules', name: 'Compliance Rules', icon: '📋' },
            { id: 'assessments', name: 'Risk Assessments', icon: '🎯' },
            { id: 'monitoring', name: 'Real-time Monitoring', icon: '📡' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id as 'dashboard' | 'rules' | 'assessments' | 'monitoring')}
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
          {/* Overall Risk Score */}
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Overall Risk Score</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-4xl font-bold text-gray-900">{riskMetrics.overall.score}</div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(riskMetrics.overall.level)}`}>
                  {riskMetrics.overall.level.toUpperCase()}
                </div>
                <div className={`text-sm ${riskMetrics.overall.change === 'increased' ? 'text-red-600' : 'text-green-600'}`}>
                  {riskMetrics.overall.trend} from last week
                </div>
              </div>
              <div className="w-32 h-32">
                {/* Risk score visualization would go here */}
                <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {riskMetrics.categories.map((category) => (
              <div key={category.id} className="bg-white rounded-lg border shadow-sm p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{category.icon}</span>
                    <h4 className="font-medium text-gray-900">{category.name}</h4>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(category.level)}`}>
                    {category.level}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Risk Score</span>
                    <span className="font-medium">{category.score}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Active Issues</span>
                    <span className="font-medium">{category.issues}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Trend</span>
                    <span className={`font-medium ${category.trend.startsWith('+') ? 'text-red-600' : 'text-green-600'}`}>
                      {category.trend}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Alerts */}
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Recent Alerts & Issues</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {alertsAndIssues.map((alert) => (
                <div key={alert.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                          alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {alert.severity.toUpperCase()}
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          alert.status === 'active' ? 'bg-red-100 text-red-800' :
                          alert.status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {alert.status.replace('_', ' ').toUpperCase()}
                        </div>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-1">{alert.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                      <div className="text-xs text-gray-500">
                        Assigned to: {alert.assignedTo} • Due: {alert.dueDate.toLocaleDateString()}
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

      {/* Compliance Rules View */}
      {activeView === 'rules' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Compliance Rules & Regulations</h3>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                  Add New Rule
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {complianceRules.map((rule) => (
                <div key={rule.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-900">{rule.name}</h4>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${getComplianceColor(rule.status)}`}>
                          {rule.status.replace('_', ' ').toUpperCase()}
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          rule.severity === 'critical' ? 'bg-red-100 text-red-800' :
                          rule.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {rule.severity.toUpperCase()}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{rule.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500">
                        <div>
                          <span className="font-medium">Category:</span> {rule.category}
                        </div>
                        <div>
                          <span className="font-medium">Last Checked:</span> {rule.lastChecked.toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Next Review:</span> {rule.nextReview.toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Violations:</span> {rule.violations}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button className="px-3 py-1 border border-gray-300 text-gray-700 text-xs rounded hover:bg-gray-50">
                        Check Now
                      </button>
                      <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                        Configure
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Risk Assessments View */}
      {activeView === 'assessments' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Risk Assessments</h3>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                  New Assessment
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {riskAssessments.map((assessment) => (
                <div key={assessment.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">{assessment.title}</h4>
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(assessment.riskLevel)}`}>
                          Risk: {assessment.riskLevel.toUpperCase()}
                        </div>
                        <span className="text-sm text-gray-600">Score: {assessment.overallRisk}</span>
                        <span className="text-sm text-gray-600">by {assessment.assessor}</span>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                      View Details
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {assessment.factors.map((factor, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-sm">{factor.category}</h5>
                          <span className="text-sm font-medium text-red-600">{factor.risk}</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{factor.description}</p>
                        <p className="text-xs text-blue-600 font-medium">{factor.mitigation}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3">
                    <h5 className="font-medium text-sm mb-2">AI Insights</h5>
                    <p className="text-xs text-gray-600 mb-2">{assessment.aiInsights.benchmarkComparison}</p>
                    <div className="text-xs text-gray-500">
                      Confidence: {(assessment.aiInsights.confidence * 100).toFixed(1)}% • 
                      Processing Time: {assessment.aiInsights.processingTime}s • 
                      Model: {assessment.aiInsights.model}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Real-time Monitoring View */}
      {activeView === 'monitoring' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg border shadow-sm p-4">
              <h4 className="font-medium text-gray-900 mb-2">Active Monitors</h4>
              <div className="text-2xl font-bold text-blue-600">24</div>
              <p className="text-xs text-gray-600">Running compliance checks</p>
            </div>
            <div className="bg-white rounded-lg border shadow-sm p-4">
              <h4 className="font-medium text-gray-900 mb-2">Alerts Today</h4>
              <div className="text-2xl font-bold text-red-600">7</div>
              <p className="text-xs text-gray-600">Require attention</p>
            </div>
            <div className="bg-white rounded-lg border shadow-sm p-4">
              <h4 className="font-medium text-gray-900 mb-2">Auto-Resolved</h4>
              <div className="text-2xl font-bold text-green-600">15</div>
              <p className="text-xs text-gray-600">Issues fixed automatically</p>
            </div>
            <div className="bg-white rounded-lg border shadow-sm p-4">
              <h4 className="font-medium text-gray-900 mb-2">System Health</h4>
              <div className="text-2xl font-bold text-green-600">98.7%</div>
              <p className="text-xs text-gray-600">Uptime this month</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Live Monitoring Feed</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {/* Real-time feed would go here */}
                <div className="text-center text-gray-500 py-8">
                  <span className="text-4xl">📡</span>
                  <p className="mt-2">Real-time monitoring dashboard</p>
                  <p className="text-sm">Live updates and alerts would appear here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RiskDashboard
