'use client'

import React, { useState } from 'react'
import { User } from '@/types'
import RealTimeNotifications from './RealTimeNotifications'

// Import all modules
import { ContractLifecycleManagement } from './modules/ContractLifecycleManagement'
import MatterManagement from './modules/MatterManagement'
import RiskDashboard from './modules/RiskDashboard'
import DataProtection from './modules/DataProtection'
import IPManagement from './modules/IPManagement'
import DisputeResolution from './modules/DisputeResolution'
import OutsourcingSpendManagement from './modules/OutsourcingSpendManagement'
import RegulatoryCompliance from './modules/RegulatoryCompliance'
import PolicyManagement from './modules/PolicyManagement'
import { LegalAnalyticsAssistantHub } from './modules/AILegalAssistantHub'
import { EnhancedDashboard } from './modules/EnhancedAIDashboard'
import DocumentVersionControl from './modules/DocumentVersionControl'
import MobileOptimization from './modules/MobileOptimization'
import ExternalLegalDatabases from './modules/ExternalLegalDatabases'
import WorkflowAutomation from './modules/WorkflowAutomation'
import AdvancedAnalyticsDashboard from './modules/AdvancedAnalyticsDashboard'

interface DashboardProps {
  user?: User
}

interface ModuleInfo {
  id: string
  name: string
  description: string
  icon: string
  color: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>
  category: 'core' | 'compliance' | 'operations' | 'ai'
  permissions: string[]
}

const modules: ModuleInfo[] = [
  {
    id: 'contract-management',
    name: 'Contract Lifecycle Management',
    description: 'Manage contracts from creation to renewal with AI-powered analysis',
    icon: '📄',
    color: 'bg-blue-500',
    component: ContractLifecycleManagement,
    category: 'core',
    permissions: ['contract.read', 'contract.write']
  },
  {
    id: 'document-version-control',
    name: 'Document Version Control',
    description: 'Track document versions, collaborate in real-time, and manage revisions',
    icon: '📝',
    color: 'bg-emerald-500',
    component: DocumentVersionControl,
    category: 'core',
    permissions: ['document.read', 'document.write', 'document.version']
  },
  {
    id: 'matter-management',
    name: 'Matter Management',
    description: 'Track and manage legal matters, cases, and client relationships',
    icon: '⚖️',
    color: 'bg-purple-500',
    component: MatterManagement,
    category: 'core',
    permissions: ['matter.read', 'matter.write']
  },
  {
    id: 'risk-dashboard',
    name: 'Risk Management',
    description: 'Monitor and assess legal, financial, and operational risks',
    icon: '⚠️',
    color: 'bg-red-500',
    component: RiskDashboard,
    category: 'compliance',
    permissions: ['risk.read', 'risk.assess']
  },
  {
    id: 'data-protection',
    name: 'Data Protection & Privacy',
    description: 'Ensure GDPR, CCPA, and other privacy regulation compliance',
    icon: '🔒',
    color: 'bg-green-500',
    component: DataProtection,
    category: 'compliance',
    permissions: ['privacy.read', 'privacy.manage']
  },
  {
    id: 'ip-management',
    name: 'IP Management',
    description: 'Manage patents, trademarks, copyrights, and IP portfolios',
    icon: '💡',
    color: 'bg-yellow-500',
    component: IPManagement,
    category: 'core',
    permissions: ['ip.read', 'ip.write']
  },
  {
    id: 'dispute-resolution',
    name: 'Dispute Resolution',
    description: 'Handle litigation, arbitration, and alternative dispute resolution',
    icon: '🤝',
    color: 'bg-indigo-500',
    component: DisputeResolution,
    category: 'operations',
    permissions: ['dispute.read', 'dispute.manage']
  },
  {
    id: 'outsourcing-spend',
    name: 'Outsourcing & Spend Management',
    description: 'Manage external counsel, vendors, and legal spend optimization',
    icon: '💰',
    color: 'bg-pink-500',
    component: OutsourcingSpendManagement,
    category: 'operations',
    permissions: ['spend.read', 'vendor.manage']
  },
  {
    id: 'regulatory-compliance',
    name: 'Regulatory Compliance',
    description: 'Monitor regulatory requirements and compliance across jurisdictions',
    icon: '📋',
    color: 'bg-teal-500',
    component: RegulatoryCompliance,
    category: 'compliance',
    permissions: ['compliance.read', 'compliance.manage']
  },
  {
    id: 'policy-management',
    name: 'Policy Management',
    description: 'Create, manage, and track organizational policies and procedures',
    icon: '📚',
    color: 'bg-orange-500',
    component: PolicyManagement,
    category: 'compliance',
    permissions: ['policy.read', 'policy.write']
  },
  {
    id: 'ai-assistant',
    name: 'AI Legal Assistant Hub',
    description: 'Access AI-powered legal research, document analysis, and insights',
    icon: '🤖',
    color: 'bg-cyan-500',
    component: LegalAnalyticsAssistantHub,
    category: 'ai',
    permissions: ['ai.access', 'ai.query']
  },
  {
    id: 'enhanced-ai',
    name: 'Enhanced AI Operations',
    description: 'Real-time AI chat, document analysis, and performance analytics',
    icon: '🚀',
    color: 'bg-violet-500',
    component: EnhancedDashboard,
    category: 'ai',
    permissions: ['ai.access', 'ai.advanced']
  },
  {
    id: 'mobile-optimization',
    name: 'Mobile Optimization',
    description: 'Optimize performance and experience for mobile devices',
    icon: '📱',
    color: 'bg-indigo-500',
    component: MobileOptimization,
    category: 'operations',
    permissions: ['system.access', 'system.optimize']
  },
  {
    id: 'external-legal-databases',
    name: 'Legal Database Integration',
    description: 'Search across Westlaw, LexisNexis, and other legal databases',
    icon: '🗄️',
    color: 'bg-purple-500',
    component: ExternalLegalDatabases,
    category: 'core',
    permissions: ['research.access', 'database.search']
  },
  {
    id: 'workflow-automation',
    name: 'Workflow Automation',
    description: 'Automate routine tasks and workflows with no-code automation',
    icon: '⚙️',
    color: 'bg-red-500',
    component: WorkflowAutomation,
    category: 'operations',
    permissions: ['workflow.create', 'workflow.manage']
  },
  {
    id: 'advanced-analytics',
    name: 'Advanced Analytics Dashboard',
    description: 'Real-time legal analytics, predictive insights, and performance metrics',
    icon: '📊',
    color: 'bg-indigo-500',
    component: AdvancedAnalyticsDashboard,
    category: 'ai',
    permissions: ['analytics.read', 'analytics.insights']
  }
]

const categoryColors = {
  core: 'border-blue-200 bg-blue-50',
  compliance: 'border-green-200 bg-green-50',
  operations: 'border-purple-200 bg-purple-50',
  ai: 'border-cyan-200 bg-cyan-50'
}

const categoryNames = {
  core: 'Core Legal Operations',
  compliance: 'Compliance & Risk',
  operations: 'Business Operations',
  ai: 'AI & Automation'
}

// Mock user for demo
const mockUser: User = {
  id: '1',
  email: 'demo@counselflow.com',
  name: 'Demo User',
  role: 'partner',
  firm: 'CounselFlow Demo Firm',
  jurisdiction: 'New York',
  barAdmissions: ['NY', 'CA'],
  preferredLanguage: 'en',
  securityClearance: 'standard',
  lastLogin: new Date(),
  permissions: [
    { id: '1', name: 'All Access', resource: '*', action: 'read', conditions: {} }
  ]
}

export default function Dashboard({ user = mockUser }: DashboardProps) {
  const [activeModule, setActiveModule] = useState<string | null>(null)
  const [showAIAssistant, setShowAIAssistant] = useState(false)

  // Group modules by category
  const modulesByCategory = modules.reduce((acc, module) => {
    if (!acc[module.category]) {
      acc[module.category] = []
    }
    acc[module.category].push(module)
    return acc
  }, {} as Record<string, ModuleInfo[]>)

  // Handle module selection
  const handleModuleClick = (moduleId: string) => {
    setActiveModule(moduleId)
  }

  // Handle back to dashboard
  const handleBackToDashboard = () => {
    setActiveModule(null)
  }

  // Handle AI assistant toggle (keyboard shortcut: Ctrl+Shift+A)
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault()
        setShowAIAssistant(!showAIAssistant)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [showAIAssistant])

  // Render active module
  if (activeModule) {
    const selectedModule = modules.find(m => m.id === activeModule)
    if (!selectedModule) return null

    const ModuleComponent = selectedModule.component

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleBackToDashboard}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Back to Dashboard</span>
                </button>
                <div className="h-6 w-px bg-gray-300" />
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{selectedModule.icon}</span>
                  <h1 className="text-lg font-medium text-gray-900">{selectedModule.name}</h1>
                </div>
              </div>
              
              {/* AI Assistant Toggle */}
              <button
                onClick={() => setShowAIAssistant(!showAIAssistant)}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                title="AI Assistant (Ctrl+Shift+A)"
              >
                🤖 AI Assistant
              </button>
            </div>
          </div>
        </div>

        {/* Module Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <ModuleComponent 
            userId={user.id} 
            permissions={user.permissions} 
            language={user.preferredLanguage}
          />
        </div>

        {/* AI Assistant Overlay */}
        {showAIAssistant && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-3/4 m-4">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-medium">AI Legal Assistant</h2>
                <button
                  onClick={() => setShowAIAssistant(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4 h-full overflow-auto">
                <LegalAnalyticsAssistantHub userId={user.id} permissions={user.permissions} language={user.preferredLanguage} />
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Render dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-blue-600">⚖️ CounselFlow</div>
              <div className="hidden md:block text-sm text-gray-500">
                Modular Legal Support
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Real-time Notifications */}
              <RealTimeNotifications />
              
              <div className="text-sm text-gray-600">
                Welcome, {user.name}
              </div>
              <div className="text-xs text-gray-500">
                {user.firm} • {user.role}
              </div>
              <button
                onClick={() => setShowAIAssistant(!showAIAssistant)}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                title="AI Assistant (Ctrl+Shift+A)"
              >
                🤖 AI Assistant
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Overview */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard - My Office</h1>
          <p className="text-gray-600">
            Access all legal modules and workflows from your centralized command center
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Matters</p>
                <p className="text-2xl font-bold text-gray-900">23</p>
              </div>
              <div className="text-2xl">⚖️</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Contracts Pending</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <div className="text-2xl">📄</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Compliance Issues</p>
                <p className="text-2xl font-bold text-orange-600">3</p>
              </div>
              <div className="text-2xl">⚠️</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">AI Insights</p>
                <p className="text-2xl font-bold text-cyan-600">47</p>
              </div>
              <div className="text-2xl">🤖</div>
            </div>
          </div>
        </div>

        {/* Module Categories */}
        {Object.entries(modulesByCategory).map(([category, categoryModules]) => (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {categoryNames[category as keyof typeof categoryNames]}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryModules.map((module) => (
                <div
                  key={module.id}
                  onClick={() => handleModuleClick(module.id)}
                  className={`
                    ${categoryColors[module.category]}
                    border-2 rounded-lg p-6 cursor-pointer
                    hover:shadow-md transition-all duration-200
                    hover:scale-105 hover:border-opacity-50
                  `}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{module.icon}</div>
                    <div className={`${module.color} text-white px-2 py-1 rounded text-xs font-medium`}>
                      {module.category.toUpperCase()}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {module.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    {module.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {module.permissions.length} permissions required
                    </span>
                    <div className="text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Keyboard Shortcuts Help */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Keyboard Shortcuts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">AI Assistant</span>
              <kbd className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">Ctrl + Shift + A</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Back to Dashboard</span>
              <kbd className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">Esc</kbd>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant Overlay */}
      {showAIAssistant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-3/4 m-4">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-medium">AI Legal Assistant</h2>
              <button
                onClick={() => setShowAIAssistant(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 h-full overflow-auto">
              <LegalAnalyticsAssistantHub userId={user.id} permissions={user.permissions} language={user.preferredLanguage} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
