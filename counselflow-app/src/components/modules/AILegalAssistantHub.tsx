// Module 1: Legal Analytics Assistant Hub
'use client'

import React, { useState } from 'react'
import { BusinessInsight, ModuleProps, Priority, AnalyticsAgentType } from '@/types'
import { useAnalyticsStore } from '@/store'

export interface LegalAnalyticsAssistantHubProps extends ModuleProps {
  onInsightGenerated?: (insight: BusinessInsight) => void
  onAgentInteraction?: (agentId: string, query: string, response: string) => void
}

export function LegalAnalyticsAssistantHub({
  className,
  onInsightGenerated,
  onAgentInteraction
}: LegalAnalyticsAssistantHubProps) {
  const { insights, isProcessing: storeProcessing, error } = useAnalyticsStore()
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  // Main AI Agents
  const coreAgents = [
    {
      id: 'legal_researcher',
      name: 'Legal Research AI',
      description: 'Real-time case law analysis, statute interpretation, precedent finding',
      icon: '🔍',
      capabilities: ['case_law_search', 'statute_analysis', 'precedent_matching', 'legal_citation'],
      confidence: 0.95
    },
    {
      id: 'contract_analyzer',
      name: 'Contract Intelligence',
      description: 'Automated clause analysis, risk scoring, negotiation suggestions',
      icon: '📄',
      capabilities: ['clause_extraction', 'risk_assessment', 'term_analysis', 'compliance_check'],
      confidence: 0.92
    },
    {
      id: 'risk_assessor',
      name: 'Risk Assessment AI',
      description: 'Predictive risk modeling, scenario analysis, mitigation strategies',
      icon: '⚠️',
      capabilities: ['risk_prediction', 'scenario_modeling', 'mitigation_planning', 'compliance_monitoring'],
      confidence: 0.89
    },
    {
      id: 'document_generator',
      name: 'Document Generation AI',
      description: 'Intelligent drafting of pleadings, contracts, briefs, and memos',
      icon: '✍️',
      capabilities: ['legal_drafting', 'template_customization', 'citation_formatting', 'style_adaptation'],
      confidence: 0.87
    },
    {
      id: 'compliance_monitor',
      name: 'Compliance Monitoring',
      description: 'Real-time regulatory monitoring, compliance gap analysis',
      icon: '🛡️',
      capabilities: ['regulatory_tracking', 'compliance_assessment', 'deadline_monitoring', 'violation_detection'],
      confidence: 0.91
    },
    {
      id: 'litigation_strategist',
      name: 'Litigation Strategy AI',
      description: 'Case strategy development, outcome prediction, tactical recommendations',
      icon: '⚖️',
      capabilities: ['case_analysis', 'outcome_prediction', 'strategy_development', 'timeline_optimization'],
      confidence: 0.88
    }
  ]

  const handleAgentQuery = async (agentId: string, userQuery: string) => {
    if (!userQuery.trim()) return

    setIsProcessing(true)
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const agent = coreAgents.find(a => a.id === agentId)
      const mockResponse = generateMockResponse(agentId, userQuery)
      
      // Generate insight based on the query
      const insight: BusinessInsight = {
        id: `insight_${Date.now()}`,
        type: getInsightType(agentId),
        title: `Analytics Analysis: ${userQuery.substring(0, 50)}...`,
        description: mockResponse,
        confidence: agent?.confidence || 0.85,
        severity: 'medium',
        recommendations: generateRecommendations(agentId),
        source: agentId as AnalyticsAgentType,
        createdAt: new Date()
      }

      onInsightGenerated?.(insight)
      onAgentInteraction?.(agentId, userQuery, mockResponse)
      
      setQuery('')
    } catch (error) {
      console.error('Error processing AI query:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const generateMockResponse = (agentId: string, query: string): string => {
    const responses = {
      legal_researcher: `Based on current case law analysis, I found 23 relevant precedents related to "${query}". Key findings include recent decisions in similar jurisdictions that may impact your case strategy. The most relevant case is Johnson v. State (2024) which established new standards for...`,
      contract_analyzer: `Contract analysis complete. I've identified 5 high-risk clauses and 3 optimization opportunities in the provided terms. Risk score: 7.2/10. Primary concerns include liability limitations and termination provisions. Recommended negotiations focus on...`,
      risk_assessor: `Risk assessment indicates elevated exposure in regulatory compliance (85% probability of audit within 12 months). Mitigation strategy should prioritize documentation reviews and policy updates. Estimated impact: $2.3M potential exposure...`,
      document_generator: `Document draft generated based on your requirements. I've incorporated standard clauses from your firm's template library and customized terms for this specific matter. The generated brief includes 15 citations and follows local court formatting rules...`,
      compliance_monitor: `Compliance scan complete. Identified 3 regulatory updates affecting your practice area this week. New GDPR enforcement guidelines require policy updates by Q3 2025. Automated monitoring shows 99.2% compliance rate across tracked requirements...`,
      litigation_strategist: `Strategic analysis suggests 73% likelihood of favorable outcome with current approach. Alternative strategies include early settlement (62% success rate) or motion for summary judgment (45% success rate). Recommended timeline: 8-12 months to resolution...`
    }
    
    return responses[agentId as keyof typeof responses] || 'AI analysis completed. Please review the generated insights and recommendations.'
  }

  const getInsightType = (agentId: string): BusinessInsight['type'] => {
    const types = {
      legal_researcher: 'legal_precedent',
      contract_analyzer: 'contract_anomaly',
      risk_assessor: 'risk_alert',
      document_generator: 'process_improvement',
      compliance_monitor: 'compliance_issue',
      litigation_strategist: 'legal_precedent'
    }
    return (types[agentId as keyof typeof types] || 'legal_precedent') as BusinessInsight['type']
  }

  const generateRecommendations = (agentId: string): string[] => {
    const recommendations = {
      legal_researcher: [
        'Review highlighted precedents for applicability',
        'Analyze jurisdiction-specific variations',
        'Consider recent regulatory changes',
        'Update case strategy based on findings'
      ],
      contract_analyzer: [
        'Negotiate liability cap provisions',
        'Clarify termination procedures',
        'Add force majeure protections',
        'Review intellectual property clauses'
      ],
      risk_assessor: [
        'Implement enhanced monitoring protocols',
        'Update compliance documentation',
        'Schedule quarterly risk reviews',
        'Establish contingency procedures'
      ],
      document_generator: [
        'Review generated content for accuracy',
        'Customize for specific jurisdiction',
        'Verify citation formatting',
        'Add client-specific modifications'
      ],
      compliance_monitor: [
        'Update policy documentation',
        'Schedule compliance training',
        'Implement automated monitoring',
        'Establish reporting procedures'
      ],
      litigation_strategist: [
        'Develop contingency strategies',
        'Prepare discovery timeline',
        'Consider settlement alternatives',
        'Optimize resource allocation'
      ]
    }
    return recommendations[agentId as keyof typeof recommendations] || []
  }

  const getAgentStatusColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-600 bg-green-50'
    if (confidence >= 0.8) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const getPriorityColor = (priority: Priority) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800'
    }
    return colors[priority]
  }

  if (storeProcessing || isProcessing) {
    return (
      <div className={`p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
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
                AI Assistant Error
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
          <h1 className="text-3xl font-bold text-gray-900">AI Legal Assistant Hub</h1>
          <p className="mt-2 text-gray-600">
            Your intelligent legal command center with specialized AI agents
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {coreAgents.length} Active Agents
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            AI-Powered
          </span>
        </div>
      </div>

      {/* AI Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coreAgents.map((agent) => (
          <div
            key={agent.id}
            className={`bg-white rounded-lg border-2 transition-all duration-200 hover:shadow-lg ${
              selectedAgent === agent.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
            }`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{agent.icon}</span>
                    <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{agent.description}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getAgentStatusColor(agent.confidence)}`}>
                  {Math.round(agent.confidence * 100)}%
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Capabilities:</h4>
                <div className="flex flex-wrap gap-1">
                  {agent.capabilities.slice(0, 3).map((capability) => (
                    <span
                      key={capability}
                      className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {capability.replace('_', ' ')}
                    </span>
                  ))}
                  {agent.capabilities.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                      +{agent.capabilities.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => setSelectedAgent(agent.id)}
                className="w-full mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                Consult Agent
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* AI Query Interface */}
      {selectedAgent && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                AI Consultation: {coreAgents.find(a => a.id === selectedAgent)?.name}
              </h3>
              <button
                onClick={() => setSelectedAgent(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="ai-query" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Legal Question or Task:
                </label>
                <textarea
                  id="ai-query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Describe your legal question, upload documents, or specify the task you need help with..."
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <span className="inline-flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    AI Agent Ready
                  </span>
                </div>
                <button
                  onClick={() => handleAgentQuery(selectedAgent, query)}
                  disabled={!query.trim() || isProcessing}
                  className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isProcessing ? (
                    <span className="flex items-center">
                      <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                      Processing...
                    </span>
                  ) : (
                    'Get AI Analysis'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent AI Insights */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent AI Insights</h3>
          
          {insights.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <span className="text-4xl mb-4 block">🤖</span>
              <p>No AI insights yet. Start consulting with an AI agent to generate intelligent legal analysis.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {insights.slice(0, 5).map((insight) => (
                <div key={insight.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h4 className="text-sm font-semibold text-gray-900">{insight.title}</h4>
                        <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getPriorityColor(insight.severity as Priority)}`}>
                          {insight.severity}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{insight.description}</p>
                      
                      {insight.recommendations.length > 0 && (
                        <div className="mt-3">
                          <h5 className="text-xs font-medium text-gray-900 mb-1">Recommendations:</h5>
                          <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                            {insight.recommendations.slice(0, 2).map((rec, index) => (
                              <li key={index}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-4 flex-shrink-0">
                      <div className="text-xs text-gray-500">
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mr-1"></span>
                          {Math.round(insight.confidence * 100)}% confidence
                        </div>
                        <div className="mt-1">
                          {insight.createdAt.toLocaleDateString()}
                        </div>
                      </div>
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
