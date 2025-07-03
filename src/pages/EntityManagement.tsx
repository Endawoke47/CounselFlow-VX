import React, { useState } from 'react'
import { CorporateLayout } from '@/components/corporate/CorporateLayout'
import { CorporateCard, CorporateCardContent, CorporateCardHeader } from '@/components/corporate/CorporateCard'
import { CorporateButton } from '@/components/corporate/CorporateButton'
import { 
  Building, 
  Users, 
  FileText, 
  Calendar, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Eye, 
  Edit, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  MapPin,
  Phone,
  Mail,
  Globe,
  DollarSign,
  TrendingUp,
  Archive,
  Settings,
  Shield,
  BarChart3,
  PieChart,
  Activity,
  Brain,
  Zap,
  Target,
  Cpu,
  Network,
  Radar,
  Bot,
  Lightbulb,
  ArrowUp,
  ArrowDown,
  Circle,
  Star,
  Flame,
  Sparkles,
  Database,
  TreePine,
  GitBranch,
  Layers,
  Workflow,
  Gauge
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface BusinessEntity {
  id: string
  name: string
  type: 'Corporation' | 'LLC' | 'Partnership' | 'Subsidiary' | 'Branch Office' | 'Joint Venture'
  jurisdiction: string[]
  status: 'Active' | 'Managed' | 'Processing' | 'Dormant' | 'Dissolving' | 'Virtual'
  incorporationDate: string
  lastFiling: string
  nextDeadline: string
  directorCount: number
  aiDirectors: number
  shareholderCount: number
  revenue: string
  marketCap: string
  compliance: 'Perfect' | 'Analytics-Optimized' | 'Enhanced-Security' | 'At-Risk' | 'Non-Compliant'
  riskScore: number
  businessInsights: string[]
  predictedGrowth: number
  esgScore: number
  digitalAssets: string
  blockchainIntegration: boolean
  quantumSecurity: boolean
  aiGovernance: number
  metaversePresence: boolean
  carbonNeutral: boolean
  tags: string[]
}

interface FuturisticMetric {
  title: string
  value: string
  unit?: string
  change: { value: number; trend: 'up' | 'down' | 'stable'; period: string }
  icon: React.ComponentType<{ className?: string }>
  variant: 'neural' | 'quantum' | 'plasma' | 'cyber'
  prediction?: string
  aiConfidence: number
}

interface ComplianceAutomation {
  id: string
  entityId: string
  entityName: string
  requirement: string
  dueDate: string
  status: 'AI-Completed' | 'Auto-Processing' | 'Quantum-Verified' | 'Human-Review' | 'AI-Predicted'
  priority: 'Critical' | 'High' | 'Medium' | 'Low' | 'Automated'
  assignee: string
  aiProbability: number
  automationLevel: 'Fully-Automated' | 'AI-Assisted' | 'Manual-Override' | 'Quantum-Enhanced'
}

const businessEntities: BusinessEntity[] = [
  {
    id: 'QNT-001',
    name: 'CounselFlow Quantum Technologies Corp.',
    type: 'Quantum Corp',
    jurisdiction: ['Delaware', 'Singapore', 'Estonia Digital', 'Metaverse Zone-1'],
    status: 'Hyper-Active',
    incorporationDate: '2024-03-15',
    lastFiling: '2024-12-01',
    nextDeadline: '2025-03-15',
    directorCount: 7,
    aiDirectors: 3,
    shareholderCount: 1247,
    revenue: '$847M',
    marketCap: '$12.4B',
    compliance: 'Enhanced-Security',
    riskScore: 12,
    businessInsights: [
      'Technology division showing 347% YoY growth',
      'ESG compliance exceeds industry standards by 89%',
      'Analytics governance model reduces regulatory risk by 67%',
      'Digital integration enables real-time compliance monitoring'
    ],
    predictedGrowth: 234,
    esgScore: 94,
    digitalAssets: '$2.3B',
    blockchainIntegration: true,
    quantumSecurity: true,
    aiGovernance: 87,
    metaversePresence: true,
    carbonNeutral: true,
    tags: ['quantum', 'AI-driven', 'ESG-leader', 'carbon-neutral', 'metaverse']
  },
  {
    id: 'NEU-002',
    name: 'Neural Dynamics AI Subsidiary',
    type: 'AI Subsidiary',
    jurisdiction: ['California', 'EU Digital Single Market', 'UK Sandbox', 'Singapore FinTech'],
    status: 'AI-Managed',
    incorporationDate: '2024-06-20',
    lastFiling: '2024-11-15',
    nextDeadline: '2025-06-20',
    directorCount: 5,
    aiDirectors: 4,
    shareholderCount: 892,
    revenue: '€456M',
    marketCap: '€8.9B',
    compliance: 'AI-Optimized',
    riskScore: 8,
    aiInsights: [
      'Neural network governance outperforms human-only boards by 156%',
      'Automated compliance reduces legal costs by 78%',
      'Predictive risk modeling prevents 94% of potential violations',
      'Cross-jurisdictional AI ensures global regulatory alignment'
    ],
    predictedGrowth: 189,
    esgScore: 91,
    digitalAssets: '€1.8B',
    blockchainIntegration: true,
    quantumSecurity: true,
    aiGovernance: 96,
    metaversePresence: true,
    carbonNeutral: true,
    tags: ['neural-AI', 'automated-governance', 'predictive-compliance', 'multi-jurisdiction']
  },
  {
    id: 'CYB-003',
    name: 'Cybersecurity Nexus Partnership',
    type: 'Cyber Partnership',
    jurisdiction: ['Switzerland', 'Luxembourg', 'Cayman Islands Digital', 'Dubai International'],
    status: 'Quantum-Processing',
    incorporationDate: '2024-01-10',
    lastFiling: '2024-10-01',
    nextDeadline: '2025-01-10',
    directorCount: 6,
    aiDirectors: 2,
    shareholderCount: 234,
    revenue: 'CHF 234M',
    marketCap: 'CHF 4.1B',
    compliance: 'Perfect',
    riskScore: 3,
    aiInsights: [
      'Zero-trust architecture ensures 100% data sovereignty',
      'Quantum encryption exceeds all current security standards',
      'AI-driven threat detection prevents 99.7% of cyber risks',
      'Real-time compliance monitoring across all jurisdictions'
    ],
    predictedGrowth: 145,
    esgScore: 88,
    digitalAssets: 'CHF 890M',
    blockchainIntegration: true,
    quantumSecurity: true,
    aiGovernance: 82,
    metaversePresence: false,
    carbonNeutral: true,
    tags: ['cybersecurity', 'quantum-secure', 'zero-trust', 'threat-intelligence']
  },
  {
    id: 'DIG-004',
    name: 'Metaverse Legal Services LLC',
    type: 'Metaverse Entity',
    jurisdiction: ['Virtual Worlds Consortium', 'Blockchain Governance DAO', 'Decentralized Autonomous Zone'],
    status: 'Virtual',
    incorporationDate: '2024-09-01',
    lastFiling: '2024-11-01',
    nextDeadline: '2025-09-01',
    directorCount: 12,
    aiDirectors: 8,
    shareholderCount: 5689,
    revenue: '∞ 1.2M tokens',
    marketCap: '∞ 45M tokens',
    compliance: 'AI-Optimized',
    riskScore: 15,
    aiInsights: [
      'Native blockchain governance eliminates traditional corporate overhead',
      'Smart contract automation handles 89% of legal processes',
      'Virtual reality board meetings reduce costs by 94%',
      'DAO structure enables global stakeholder participation'
    ],
    predictedGrowth: 567,
    esgScore: 76,
    digitalAssets: '∞ 23M tokens',
    blockchainIntegration: true,
    quantumSecurity: false,
    aiGovernance: 94,
    metaversePresence: true,
    carbonNeutral: true,
    tags: ['metaverse', 'DAO', 'smart-contracts', 'virtual-reality', 'tokenized']
  },
  {
    id: 'BIO-005',
    name: 'BioTech Innovation Quantum Corp',
    type: 'Quantum Corp',
    jurisdiction: ['FDA Sandbox', 'EMA Digital', 'Health Canada AI', 'Singapore MedTech'],
    status: 'Hyper-Active',
    incorporationDate: '2024-05-15',
    lastFiling: '2024-11-30',
    nextDeadline: '2025-05-15',
    directorCount: 9,
    aiDirectors: 4,
    shareholderCount: 2341,
    revenue: '$678M',
    marketCap: '$15.7B',
    compliance: 'Quantum-Secured',
    riskScore: 9,
    aiInsights: [
      'Quantum drug discovery accelerates R&D by 450%',
      'AI-powered clinical trials reduce development time by 67%',
      'Regulatory AI ensures 98% approval probability',
      'Bioethics AI prevents ethical violations before they occur'
    ],
    predictedGrowth: 289,
    esgScore: 97,
    digitalAssets: '$4.2B',
    blockchainIntegration: true,
    quantumSecurity: true,
    aiGovernance: 91,
    metaversePresence: false,
    carbonNeutral: true,
    tags: ['biotech', 'quantum-discovery', 'AI-trials', 'regulatory-AI', 'bioethics']
  },
  {
    id: '2',
    name: 'EcoGreen Dynamics AG',
    type: 'Subsidiary',
    jurisdiction: 'Switzerland',
    shareholderCount: 892,
    revenue: '€456M',
    marketCap: '€8.9B',
    compliance: 'Analytics-Optimized',
    riskScore: 8,
    businessInsights: [
      'Advanced governance outperforms traditional boards by 156%',
      'Automated compliance reduces legal costs by 78%',
      'Predictive risk modeling prevents 94% of potential violations',
      'Cross-jurisdictional systems ensure global regulatory alignment'
    ],
    predictedGrowth: 178,
    esgScore: 87,
    quantumSecurityLevel: 'Alpha-7',
    neuralComplexity: 0.89,
    sustainabilityRating: 'Platinum-Plus'
  },
  {
    id: '3',
    name: 'DataVault Solutions LLC',
    type: 'Joint Venture',
    jurisdiction: 'Delaware, USA',
    shareholderCount: 234,
    revenue: '$1.2B',
    marketCap: '$18.7B',
    compliance: 'Perfect',
    riskScore: 3,
    businessInsights: [
      'Zero-trust architecture reduces data breaches by 99.97%',
      'Multi-dimensional encryption exceeds government standards',
      'Real-time threat detection prevents advanced persistent threats',
      'Compliance automation ensures perfect regulatory adherence'
    ],
    predictedGrowth: 312,
    esgScore: 96,
    quantumSecurityLevel: 'Omega-9',
    neuralComplexity: 0.94,
    sustainabilityRating: 'Quantum-Green'
  },
  {
    id: '4',
    name: 'NeuroCorp Holdings Inc.',
    type: 'Holding Company',
    jurisdiction: 'Singapore',
    shareholderCount: 1456,
    revenue: 'S$2.8B',
    marketCap: 'S$45.2B',
    compliance: 'Analytics-Optimized',
    riskScore: 15,
    businessInsights: [
      'Advanced cognitive systems process 50TB of legal data daily',
      'Predictive compliance prevents regulatory violations before they occur',
      'Multi-jurisdictional expertise reduces cross-border legal costs by 89%',
      'Real-time legal precedent analysis improves case outcomes by 234%'
    ],
    predictedGrowth: 423,
    esgScore: 91,
    quantumSecurityLevel: 'Beta-6',
    neuralComplexity: 0.97,
    sustainabilityRating: 'Diamond-Standard'
  },
  {
    id: '5',
    name: 'QuantumLogistics Networks',
    type: 'Partnership',
    jurisdiction: 'Hong Kong SAR',
    shareholderCount: 678,
    revenue: 'HK$890M',
    marketCap: 'HK$12.3B',
    compliance: 'Enhanced-Security',
    riskScore: 22,
    businessInsights: [
      'Advanced security protocols ensure 99.99% uptime',
      'Multi-modal transport optimization reduces costs by 67%',
      'Predictive maintenance prevents 98% of equipment failures',
      'Real-time supply chain visibility improves delivery accuracy by 156%'
    ],
    predictedGrowth: 189,
    esgScore: 83,
    quantumSecurityLevel: 'Gamma-4',
    neuralComplexity: 0.76,
    sustainabilityRating: 'Gold-Premium'
  }
]

const futuristicMetrics: FuturisticMetric[] = [
  {
    title: 'Neural Entity Intelligence',
    value: '847',
    unit: 'entities monitored',
    change: { value: 156, trend: 'up', period: 'real-time growth' },
    icon: Brain,
    variant: 'neural',
    prediction: '+234% with quantum processing',
    aiConfidence: 94
  },
  {
    title: 'Quantum Compliance Score',
    value: '99.7%',
    unit: 'perfect accuracy',
    change: { value: 23, trend: 'up', period: 'vs traditional methods' },
    icon: Shield,
    variant: 'quantum',
    prediction: '99.9% with next AI update',
    aiConfidence: 97
  },
  {
    title: 'AI Governance Efficiency',
    value: '$23.4M',
    unit: 'cost reduction',
    change: { value: 67, trend: 'up', period: 'automated processes' },
    icon: Zap,
    variant: 'plasma',
    prediction: '$45M potential savings',
    aiConfidence: 89
  },
  {
    title: 'Cyber Risk Mitigation',
    value: '100%',
    unit: 'threat prevention',
    change: { value: 0, trend: 'stable', period: 'maintained 365 days' },
    icon: Radar,
    variant: 'cyber',
    prediction: 'Expanding to quantum threats',
    aiConfidence: 99
  }
]

const complianceAutomation: ComplianceAutomation[] = [
  {
    id: 'QAI-001',
    entityId: 'QNT-001',
    entityName: 'CounselFlow Quantum Technologies Corp.',
    requirement: 'Quantum Annual Report (AI-Generated)',
    dueDate: '2025-03-15',
    status: 'Auto-Processing',
    priority: 'Automated',
    assignee: 'Neural AI System Alpha',
    aiProbability: 97,
    automationLevel: 'Fully-Automated'
  },
  {
    id: 'QAI-002',
    entityId: 'NEU-002',
    entityName: 'Neural Dynamics AI Subsidiary',
    requirement: 'AI Ethics Compliance Review',
    dueDate: '2025-06-20',
    status: 'Quantum-Verified',
    priority: 'Critical',
    assignee: 'Quantum Compliance Engine',
    aiProbability: 99,
    automationLevel: 'Quantum-Enhanced'
  },
  {
    id: 'QAI-003',
    entityId: 'CYB-003',
    entityName: 'Cybersecurity Nexus Partnership',
    requirement: 'Zero-Trust Security Audit',
    dueDate: '2025-01-10',
    status: 'AI-Completed',
    priority: 'High',
    assignee: 'Cyber Intelligence AI',
    aiProbability: 100,
    automationLevel: 'Fully-Automated'
  },
  {
    id: 'QAI-004',
    entityId: 'DIG-004',
    entityName: 'Metaverse Legal Services LLC',
    requirement: 'DAO Governance Token Audit',
    dueDate: '2025-09-01',
    status: 'Human-Review',
    priority: 'Medium',
    assignee: 'Dr. Sarah Chen + AI Assistant',
    aiProbability: 78,
    automationLevel: 'AI-Assisted'
  },
  {
    id: 'QAI-005',
    entityId: 'BIO-005',
    entityName: 'BioTech Innovation Quantum Corp',
    requirement: 'Quantum Drug Approval Filing',
    dueDate: '2025-05-15',
    status: 'AI-Predicted',
    priority: 'Critical',
    assignee: 'BioAI Regulatory System',
    aiProbability: 94,
    automationLevel: 'Quantum-Enhanced'
  }
]

const FuturisticMetricCard: React.FC<FuturisticMetric> = ({ 
  title, 
  value, 
  unit, 
  change, 
  icon: Icon, 
  variant,
  prediction,
  aiConfidence 
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const variantStyles = {
    neural: 'bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 border-blue-400/30',
    quantum: 'bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-indigo-500/10 border-purple-400/30',
    plasma: 'bg-gradient-to-br from-orange-500/10 via-red-500/10 to-pink-500/10 border-orange-400/30',
    cyber: 'bg-gradient-to-br from-green-500/10 via-teal-500/10 to-cyan-500/10 border-green-400/30'
  }

  const iconColors = {
    neural: 'text-blue-400',
    quantum: 'text-purple-400',
    plasma: 'text-orange-400',
    cyber: 'text-green-400'
  }

  return (
    <CorporateCard 
      variant="elevated"
      className={cn(
        'border transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer',
        variantStyles[variant]
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className={cn('p-3 rounded-lg', iconColors[variant].replace('text-', 'bg-').replace('-400', '-100'))}>
            <Icon className={cn('w-6 h-6', iconColors[variant])} />
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1 text-xs text-slate-500">
              <Brain className="w-3 h-3" />
              <span>{aiConfidence}%</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-slate-700 mb-1">{title}</h3>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-bold text-slate-900">{value}</span>
            {unit && <span className="text-sm text-slate-500">{unit}</span>}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {change.trend === 'up' ? (
              <ArrowUp className="w-4 h-4 text-green-500" />
            ) : change.trend === 'down' ? (
              <ArrowDown className="w-4 h-4 text-red-500" />
            ) : (
              <Circle className="w-4 h-4 text-slate-400" />
            )}
            <span className={cn(
              'text-sm font-medium',
              change.trend === 'up' ? 'text-green-600' :
              change.trend === 'down' ? 'text-red-600' : 'text-slate-600'
            )}>
              {change.value}%
            </span>
            <span className="text-xs text-slate-400">{change.period}</span>
          </div>
          
          {prediction && isHovered && (
            <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
              <div className="flex items-center space-x-1 mb-1">
                <Lightbulb className="w-3 h-3 text-yellow-500" />
                <span className="text-xs font-medium text-yellow-600">AI Prediction</span>
              </div>
              <p className="text-xs text-slate-600">{prediction}</p>
            </div>
          )}
        </div>
      </div>
    </CorporateCard>
  )
}

const EnhancedEntityCard: React.FC<{ entity: BusinessEntity }> = ({ entity }) => {
  const [isHovered, setIsHovered] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hyper-Active': return 'text-green-600 bg-green-100'
      case 'AI-Managed': return 'text-blue-600 bg-blue-100'
      case 'Quantum-Processing': return 'text-purple-600 bg-purple-100'
      case 'Virtual': return 'text-cyan-600 bg-cyan-100'
      case 'Dormant': return 'text-yellow-600 bg-yellow-100'
      case 'Dissolving': return 'text-red-600 bg-red-100'
      default: return 'text-slate-600 bg-slate-100'
    }
  }

  const getComplianceColor = (compliance: string) => {
    switch (compliance) {
      case 'Perfect': return 'text-emerald-600 bg-emerald-100'
      case 'Quantum-Secured': return 'text-purple-600 bg-purple-100'
      case 'AI-Optimized': return 'text-blue-600 bg-blue-100'
      case 'At-Risk': return 'text-orange-600 bg-orange-100'
      case 'Non-Compliant': return 'text-red-600 bg-red-100'
      default: return 'text-slate-600 bg-slate-100'
    }
  }

  return (
    <CorporateCard 
      variant="elevated" 
      padding="lg" 
      hover 
      interactive
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden"
    >
      {/* AI Score Indicator */}
      <div className="absolute top-3 right-3">
        <div className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white text-xs">
          <Brain className="w-3 h-3" />
          <span>{entity.aiGovernance}%</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Header */}
        <div className="pr-16">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-slate-900 leading-tight">{entity.name}</h3>
            {entity.carbonNeutral && (
              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                🌱 Carbon Neutral
              </span>
            )}
          </div>
          <p className="text-sm text-slate-600 flex items-center">
            <Building className="w-4 h-4 mr-1" />
            {entity.type}
          </p>
        </div>

        {/* Status and Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className={cn('px-2 py-1 text-xs font-medium rounded-full', getStatusColor(entity.status))}>
            {entity.status}
          </span>
          <span className={cn('px-2 py-1 text-xs font-medium rounded-full', getComplianceColor(entity.compliance))}>
            {entity.compliance}
          </span>
          <span className={cn(
            'px-2 py-1 text-xs font-medium rounded-full',
            entity.riskScore <= 10 ? 'text-green-600 bg-green-100' :
            entity.riskScore <= 25 ? 'text-yellow-600 bg-yellow-100' : 'text-red-600 bg-red-100'
          )}>
            Risk: {entity.riskScore}%
          </span>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-200">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <DollarSign className="w-4 h-4" />
              <span>{entity.revenue}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <TrendingUp className="w-4 h-4" />
              <span>{entity.marketCap} cap</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Users className="w-4 h-4" />
              <span>{entity.directorCount} dirs ({entity.aiDirectors} AI)</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-slate-600">
              <span>ESG: {entity.esgScore}%</span>
            </div>
            <div className="text-sm text-slate-600">
              <span>Growth: +{entity.predictedGrowth}%</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-slate-600">
              <Database className="w-4 h-4" />
              <span>{entity.digitalAssets}</span>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-slate-50 p-3 rounded-lg space-y-2">
          <h4 className="text-xs font-medium text-slate-700 flex items-center">
            <Cpu className="w-3 h-3 mr-1" />
            Technology Stack
          </h4>
          <div className="flex flex-wrap gap-1">
            {entity.blockchainIntegration && (
              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">Blockchain</span>
            )}
            {entity.quantumSecurity && (
              <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">Quantum</span>
            )}
            {entity.metaversePresence && (
              <span className="px-2 py-1 text-xs bg-cyan-100 text-cyan-700 rounded-full">Metaverse</span>
            )}
            {entity.aiDirectors > 0 && (
              <span className="px-2 py-1 text-xs bg-pink-100 text-pink-700 rounded-full">AI Governance</span>
            )}
          </div>
        </div>

        {/* AI Insights */}
        {isHovered && entity.aiInsights.length > 0 && (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-lg border border-purple-200 animate-fade-in">
            <div className="flex items-center space-x-2 mb-2">
              <Lightbulb className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">AI Insights</span>
            </div>
            <ul className="space-y-1">
              {entity.aiInsights.slice(0, 2).map((insight, index) => (
                <li key={index} className="text-xs text-purple-700 flex items-start">
                  <Circle className="w-1.5 h-1.5 mt-1.5 mr-2 flex-shrink-0" />
                  {insight}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Jurisdictions */}
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-slate-700 flex items-center">
            <Globe className="w-3 h-3 mr-1" />
            Jurisdictions
          </h4>
          <div className="flex flex-wrap gap-1">
            {entity.jurisdiction.slice(0, 2).map((jurisdiction, index) => (
              <span key={index} className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded-full">
                {jurisdiction}
              </span>
            ))}
            {entity.jurisdiction.length > 2 && (
              <span className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded-full">
                +{entity.jurisdiction.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Tags */}
        {entity.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {entity.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                #{tag}
              </span>
            ))}
            {entity.tags.length > 3 && (
              <span className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded-full">
                +{entity.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200">
          <div className="flex space-x-2">
            <button className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              <Eye className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              <Edit className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center space-x-1 text-xs text-slate-500">
            <Activity className="w-3 h-3" />
            <span>ID: {entity.id}</span>
          </div>
        </div>
      </div>
    </CorporateCard>
  )
}

const EntityManagement = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'entities' | 'compliance' | 'governance' | 'reports'>('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const filteredEntities = futuristicEntities.filter(entity => {
    const matchesSearch = entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entity.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesJurisdiction = selectedJurisdiction === 'all' || 
                               entity.jurisdiction.some(j => j.toLowerCase().includes(selectedJurisdiction.toLowerCase()))
    const matchesStatus = selectedStatus === 'all' || entity.status === selectedStatus
    return matchesSearch && matchesJurisdiction && matchesStatus
  })

  const stats = {
    totalEntities: futuristicEntities.length,
    activeEntities: futuristicEntities.filter(e => e.status === 'Hyper-Active' || e.status === 'AI-Managed').length,
    perfectCompliance: futuristicEntities.filter(e => e.compliance === 'Perfect' || e.compliance === 'Enhanced-Security').length,
    aiGovernance: Math.round(futuristicEntities.reduce((sum, e) => sum + e.aiGovernance, 0) / futuristicEntities.length)
  }

  return (
    <CorporateLayout
      title="Quantum Entity Intelligence Hub"
      subtitle="AI-powered entity management with predictive governance and quantum-secured compliance"
      actions={
        <div className="flex space-x-3">
          <CorporateButton variant="secondary" leftIcon={<Brain className="w-4 h-4" />}>
            AI Governance
          </CorporateButton>
          <CorporateButton variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
            New Entity
          </CorporateButton>
        </div>
      }
    >
      {/* Enhanced Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {futuristicMetrics.map((metric, index) => (
          <FuturisticMetricCard key={index} {...metric} />
        ))}
      </div>

      {/* AI Insights Panel */}
      <CorporateCard variant="elevated" className="mb-8">
        <CorporateCardHeader>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Neural Entity Intelligence</h3>
              <p className="text-sm text-slate-600">Real-time AI analysis and predictive governance insights</p>
            </div>
          </div>
        </CorporateCardHeader>
        <CorporateCardContent>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Entity Network */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
              <div className="flex items-center space-x-3 mb-3">
                <Network className="w-5 h-5 text-blue-500" />
                <h4 className="font-medium text-blue-900">Entity Network</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-blue-700">Active Entities</span>
                  <span className="text-sm font-medium text-blue-900">{stats.activeEntities}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-700">AI Governance</span>
                  <span className="text-sm font-medium text-blue-900">{stats.aiGovernance}%</span>
                </div>
              </div>
            </div>

            {/* Compliance Engine */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-4 rounded-xl border border-green-200">
              <div className="flex items-center space-x-3 mb-3">
                <Shield className="w-5 h-5 text-green-500" />
                <h4 className="font-medium text-green-900">Compliance Engine</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-green-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '97%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-green-900">97%</span>
                </div>
                <p className="text-xs text-green-700">Quantum-secured compliance across all entities</p>
              </div>
            </div>

            {/* Risk Intelligence */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-200">
              <div className="flex items-center space-x-3 mb-3">
                <Radar className="w-5 h-5 text-purple-500" />
                <h4 className="font-medium text-purple-900">Risk Intelligence</h4>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-purple-700">
                  <div className="flex justify-between">
                    <span>Avg Risk Score</span>
                    <span className="font-medium">9.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantum Secured</span>
                    <span className="font-medium">80%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Growth Predictions */}
            <div className="bg-gradient-to-br from-orange-50 to-pink-50 p-4 rounded-xl border border-orange-200">
              <div className="flex items-center space-x-3 mb-3">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                <h4 className="font-medium text-orange-900">Growth AI</h4>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-orange-700">
                  <div className="flex justify-between">
                    <span>Avg Growth</span>
                    <span className="font-medium">+245%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ESG Score</span>
                    <span className="font-medium">89.2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CorporateCardContent>
      </CorporateCard>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-6 bg-slate-100 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'entities', label: 'Entities', icon: Building },
          { id: 'compliance', label: 'Compliance', icon: Shield },
          { id: 'governance', label: 'Governance', icon: Users },
          { id: 'reports', label: 'Reports', icon: FileText }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              'flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors',
              activeTab === tab.id
                ? 'bg-white text-corporate-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            )}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Entity Controls */}
      {activeTab === 'entities' && (
        <CorporateCard className="mb-6">
          <CorporateCardContent>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search entities with AI..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent"
                />
              </div>

              {/* Filters */}
              <div className="flex items-center space-x-3">
                <select
                  value={selectedJurisdiction}
                  onChange={(e) => setSelectedJurisdiction(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent"
                >
                  <option value="all">All Jurisdictions</option>
                  <option value="delaware">Delaware</option>
                  <option value="singapore">Singapore</option>
                  <option value="metaverse">Metaverse</option>
                  <option value="quantum">Quantum Zones</option>
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="Hyper-Active">Hyper-Active</option>
                  <option value="AI-Managed">AI-Managed</option>
                  <option value="Quantum-Processing">Quantum-Processing</option>
                  <option value="Virtual">Virtual</option>
                </select>
                <CorporateButton variant="secondary" size="sm" leftIcon={<Filter className="w-4 h-4" />}>
                  Advanced
                </CorporateButton>
              </div>
            </div>
          </CorporateCardContent>
        </CorporateCard>
      )}

      {/* Smart Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Entities</p>
              <p className="text-2xl font-bold">{stats.totalEntities}</p>
            </div>
            <Building className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-teal-600 p-4 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Active</p>
              <p className="text-2xl font-bold">{stats.activeEntities}</p>
            </div>
            <Activity className="w-8 h-8 text-green-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-4 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Perfect Compliance</p>
              <p className="text-2xl font-bold">{stats.perfectCompliance}</p>
            </div>
            <Shield className="w-8 h-8 text-purple-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-red-600 p-4 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">AI Governance</p>
              <p className="text-2xl font-bold">{stats.aiGovernance}%</p>
            </div>
            <Brain className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {futuristicEntities.slice(0, 6).map((entity) => (
            <EnhancedEntityCard key={entity.id} entity={entity} />
          ))}
        </div>
      )}

      {activeTab === 'entities' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredEntities.map((entity) => (
            <EnhancedEntityCard key={entity.id} entity={entity} />
          ))}
        </div>
      )}

      {activeTab === 'compliance' && (
        <CorporateCard>
          <CorporateCardHeader>
            <h3 className="text-lg font-semibold text-slate-900">AI-Powered Compliance Automation</h3>
            <p className="text-sm text-slate-600">Quantum-enhanced compliance monitoring and predictive filings</p>
          </CorporateCardHeader>
          <CorporateCardContent>
            <div className="space-y-4">
              {complianceAutomation.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900">{item.requirement}</h4>
                    <p className="text-sm text-slate-600">{item.entityName}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={cn(
                        'px-2 py-1 text-xs rounded-full',
                        item.status === 'AI-Completed' ? 'bg-green-100 text-green-700' :
                        item.status === 'Auto-Processing' ? 'bg-blue-100 text-blue-700' :
                        item.status === 'Quantum-Verified' ? 'bg-purple-100 text-purple-700' :
                        'bg-yellow-100 text-yellow-700'
                      )}>
                        {item.status}
                      </span>
                      <span className="text-xs text-slate-500">AI Confidence: {item.aiProbability}%</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-900">{item.dueDate}</p>
                    <p className="text-xs text-slate-600">{item.assignee}</p>
                  </div>
                </div>
              ))}
            </div>
          </CorporateCardContent>
        </CorporateCard>
      )}

      {activeTab === 'governance' && (
        <CorporateCard>
          <CorporateCardHeader>
            <h3 className="text-lg font-semibold text-slate-900">Neural Governance Dashboard</h3>
            <p className="text-sm text-slate-600">AI-powered board management and decision intelligence</p>
          </CorporateCardHeader>
          <CorporateCardContent>
            <div className="text-center py-12">
              <Brain className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">AI Governance Intelligence</h3>
              <p className="text-slate-600 mb-4">Coming soon: Neural networks for board decision optimization</p>
              <CorporateButton variant="primary">Learn More</CorporateButton>
            </div>
          </CorporateCardContent>
        </CorporateCard>
      )}

      {activeTab === 'reports' && (
        <CorporateCard>
          <CorporateCardHeader>
            <h3 className="text-lg font-semibold text-slate-900">Quantum Analytics Reports</h3>
            <p className="text-sm text-slate-600">AI-generated insights and predictive entity intelligence</p>
          </CorporateCardHeader>
          <CorporateCardContent>
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Quantum Report Engine</h3>
              <p className="text-slate-600 mb-4">Advanced analytics and predictive modeling for entity performance</p>
              <CorporateButton variant="primary">Generate Report</CorporateButton>
            </div>
          </CorporateCardContent>
        </CorporateCard>
      )}
    </CorporateLayout>
  )
}

export default EntityManagement
