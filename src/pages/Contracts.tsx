import React, { useState, useEffect } from 'react'
import { CorporateLayout } from '@/components/corporate/CorporateLayout'
import { CorporateCard, CorporateCardContent, CorporateCardHeader } from '@/components/corporate/CorporateCard'
import { CorporateButton } from '@/components/corporate/CorporateButton'
import { 
  Plus, 
  Search, 
  FileText, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Building,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  TrendingUp,
  Users,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Shield,
  Globe,
  Settings,
  Database,
  Network,
  Radar,
  Gauge,
  Lightbulb,
  Timer,
  ArrowUp,
  ArrowDown,
  Circle,
  Star,
  Flame,
  Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface EnhancedContract {
  id: string
  title: string
  counterparty: string
  type: string
  status: 'draft' | 'review' | 'legal-review' | 'active' | 'expired' | 'terminated' | 'auto-renewed'
  value: number
  startDate: string
  endDate: string
  renewalDate?: string
  department: string
  owner: string
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical'
  riskScore: number
  insights: string[]
  predictedOutcome?: string
  automationLevel: 'Manual' | 'Semi-Automated' | 'Fully-Automated' | 'System-Driven'
  complexity: number
  jurisdiction: string[]
  tags: string[]
  metrics: {
    riskAssessment: number
    complianceScore: number
    negotiationPower: number
    renewalProbability: number
  }
}

interface BusinessMetric {
  title: string
  value: string
  unit?: string
  change: { value: number; trend: 'up' | 'down' | 'stable'; period: string }
  icon: React.ComponentType<{ className?: string }>
  variant: 'primary' | 'success' | 'warning' | 'info'
  prediction?: string
  confidence: number
}

const professionalContracts: EnhancedContract[] = [
  {
    id: 'CON-001',
    title: 'Tesla Gigafactory 5 Manufacturing Partnership',
    counterparty: 'Tesla Motors Inc.',
    type: 'Strategic Partnership',
    status: 'review',
    value: 847000000,
    startDate: '2024-07-15',
    endDate: '2029-07-14',
    renewalDate: '2029-04-15',
    department: 'Strategic Partnerships',
    owner: 'Dr. Sarah Chen',
    riskLevel: 'Medium',
    riskScore: 94,
    insights: [
      'High-value strategic partnership with 94% success probability',
      'Supply chain risks mitigated through diversification clauses',
      'ESG compliance framework exceeds industry standards',
      'Intellectual property protection enhanced with security measures'
    ],
    predictedOutcome: '96% probability of successful completion, $847M value realization',
    automationLevel: 'System-Driven',
    complexity: 89,
    jurisdiction: ['California', 'Nevada', 'Texas', 'International'],
    tags: ['high-value', 'strategic', 'manufacturing', 'EV', 'sustainability'],
    metrics: {
      riskAssessment: 76,
      complianceScore: 97,
      negotiationPower: 84,
      renewalProbability: 91
    }
  },
  {
    id: 'CON-002',
    title: 'Google Cloud Computing Services',
    counterparty: 'Google LLC (Alphabet)',
    type: 'Technology License',
    status: 'active',
    value: 156000000,
    startDate: '2024-01-01',
    endDate: '2027-12-31',
    renewalDate: '2027-10-01',
    department: 'Technology Research',
    owner: 'Prof. Michael Zhang',
    riskLevel: 'Low',
    riskScore: 98,
    insights: [
      'Advanced computing capabilities achieved in legal document processing',
      'Security protocols meet enterprise-grade standards',
      'Cost optimization through hybrid architecture',
      'Patent landscape analysis shows strong IP position'
    ],
    predictedOutcome: '98% renewal probability, potential 234% value increase',
    automationLevel: 'Fully-Automated',
    complexity: 95,
    jurisdiction: ['Global', 'Multi-National'],
    tags: ['technology', 'research', 'breakthrough', 'strategic'],
    metrics: {
      riskAssessment: 23,
      complianceScore: 99,
      negotiationPower: 92,
      renewalProbability: 98
    }
  },
  {
    id: 'CON-003',
    title: 'Enterprise Intelligence Platform',
    counterparty: 'Palantir Technologies',
    type: 'SaaS Subscription',
    status: 'auto-renewed',
    value: 89000000,
    startDate: '2023-06-01',
    endDate: '2026-05-31',
    department: 'Technology Security',
    owner: 'Alex Rodriguez',
    riskLevel: 'High',
    riskScore: 87,
    insights: [
      'Advanced threat detection capabilities exceed baseline requirements',
      'Data sovereignty concerns addressed through secure architecture',
      'Real-time compliance monitoring integrated with legal workflows',
      'Predictive modeling reduces legal exposure by 67%'
    ],
    predictedOutcome: 'Contract extension likely, security ROI: 347%',
    automationLevel: 'System-Driven',
    complexity: 78,
    jurisdiction: ['US', 'EU', 'APAC'],
    tags: ['security', 'technology', 'real-time', 'compliance', 'intelligence'],
    metrics: {
      riskAssessment: 67,
      complianceScore: 93,
      negotiationPower: 78,
      renewalProbability: 89
    }
  },
  {
    id: 'CON-004',
    title: 'Technology Licensing Agreement',
    counterparty: 'Moderna Inc.',
    type: 'IP License',
    status: 'legal-review',
    value: 234000000,
    startDate: '2024-08-01',
    endDate: '2034-07-31',
    department: 'Biotech Licensing',
    owner: 'Dr. Lisa Wang',
    riskLevel: 'Critical',
    riskScore: 91,
    insights: [
      'Breakthrough delivery system with 89% efficacy improvement',
      'Regulatory pathway optimized through strategic clinical trial design',
      'Patent portfolio strength validated by comprehensive analysis',
      'Market exclusivity period maximized through strategic filing sequence'
    ],
    predictedOutcome: 'Regulatory approval: 87% probability, market value: $2.3B+',
    automationLevel: 'Semi-Automated',
    complexity: 97,
    jurisdiction: ['FDA', 'EMA', 'Global Regulatory'],
    tags: ['biotech', 'technology', 'regulatory', 'breakthrough', 'licensing'],
    metrics: {
      riskAssessment: 89,
      complianceScore: 94,
      negotiationPower: 85,
      renewalProbability: 76
    }
  },
  {
    id: 'CON-005',
    title: 'Satellite Communication Licensing',
    counterparty: 'Space Exploration Technologies Corp.',
    type: 'Satellite License',
    status: 'active',
    value: 456000000,
    startDate: '2024-03-01',
    endDate: '2029-02-28',
    renewalDate: '2028-12-01',
    department: 'Space Communications',
    owner: 'Sarah Mitchell',
    riskLevel: 'Medium',
    riskScore: 92,
    insights: [
      'Advanced mission communication protocols approved by regulatory bodies',
      'Secure satellite network provides unprecedented security',
      'Global coverage enables 24/7 legal consultation capabilities',
      'International jurisdiction framework established for future expansion'
    ],
    predictedOutcome: 'Global communication ready, expansion to 100k satellites',
    automationLevel: 'System-Driven',
    complexity: 88,
    jurisdiction: ['International Space Law', 'FCC', 'ITU', 'Global'],
    tags: ['space', 'satellite', 'global-comms', 'secure', 'advanced'],
    metrics: {
      riskAssessment: 54,
      complianceScore: 96,
      negotiationPower: 87,
      renewalProbability: 94
    }
  }
]

const businessMetrics: BusinessMetric[] = [
  {
    title: 'Contract Processing Velocity',
    value: '847',
    unit: 'processed/day',
    change: { value: 156, trend: 'up', period: 'vs last quarter' },
    icon: Activity,
    variant: 'primary',
    prediction: '+234% with advanced processing',
    confidence: 94
  },
  {
    title: 'Risk Assessment Accuracy',
    value: '99.7%',
    unit: 'accuracy',
    change: { value: 23, trend: 'up', period: 'vs baseline' },
    icon: Shield,
    variant: 'success',
    prediction: '99.9% with next model update',
    confidence: 97
  },
  {
    title: 'Process Optimization',
    value: '$23.4M',
    unit: 'saved annually',
    change: { value: 67, trend: 'up', period: 'vs traditional methods' },
    icon: Target,
    variant: 'warning',
    prediction: '$45M potential with full deployment',
    confidence: 89
  },
  {
    title: 'Compliance Coverage',
    value: '100%',
    unit: 'coverage',
    change: { value: 0, trend: 'stable', period: 'maintained 90 days' },
    icon: Database,
    variant: 'info',
    prediction: 'Expanding to 15 new frameworks',
    confidence: 99
  }
]

const BusinessMetricCard: React.FC<BusinessMetric> = ({
  title,
  value,
  unit,
  change,
  icon: Icon,
  variant,
  prediction,
  confidence
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
              <Activity className="w-3 h-3" />
              <span>{confidence}%</span>
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
            <div className="mt-3 p-2 bg-slate-900/10 rounded border border-slate-200">
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

const statusConfig = {
  draft: { color: 'text-slate-700 bg-slate-100', icon: FileText },
  'review': { color: 'text-purple-700 bg-purple-100', icon: Activity },
  'legal-review': { color: 'text-amber-700 bg-amber-100', icon: Clock },
  active: { color: 'text-emerald-700 bg-emerald-100', icon: CheckCircle },
  expired: { color: 'text-red-700 bg-red-100', icon: AlertTriangle },
  terminated: { color: 'text-slate-700 bg-slate-100', icon: AlertTriangle },
  'auto-renewed': { color: 'text-blue-700 bg-blue-100', icon: RefreshCw }
}

const EnhancedContractCard: React.FC<{ contract: EnhancedContract }> = ({ contract }) => {
  const [isHovered, setIsHovered] = useState(false)
  const StatusIcon = statusConfig[contract.status].icon
  
  const isExpiringSoon = contract.renewalDate && 
    new Date(contract.renewalDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Critical': return 'text-red-600 bg-red-100'
      case 'High': return 'text-orange-600 bg-orange-100'
      case 'Medium': return 'text-yellow-600 bg-yellow-100'
      case 'Low': return 'text-green-600 bg-green-100'
      default: return 'text-slate-600 bg-slate-100'
    }
  }

  const getAutomationColor = (level: string) => {
    switch (level) {
      case 'AI-Driven': return 'text-purple-600 bg-purple-100'
      case 'Fully-Automated': return 'text-blue-600 bg-blue-100'
      case 'Semi-Automated': return 'text-teal-600 bg-teal-100'
      case 'Manual': return 'text-slate-600 bg-slate-100'
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
          <Activity className="w-3 h-3" />
          <span>{contract.riskScore}%</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Header */}
        <div className="pr-16">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-slate-900 leading-tight">{contract.title}</h3>
            {isExpiringSoon && (
              <span className="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full animate-pulse">
                Renewal Due
              </span>
            )}
          </div>
          <p className="text-sm text-slate-600 flex items-center">
            <Building className="w-4 h-4 mr-1" />
            {contract.counterparty}
          </p>
        </div>

        {/* Status and Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className={cn(
            'px-2 py-1 text-xs font-medium rounded-full flex items-center space-x-1',
            statusConfig[contract.status].color
          )}>
            <StatusIcon className="w-3 h-3" />
            <span>{contract.status.replace('-', ' ')}</span>
          </span>
          <span className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded-full">
            {contract.type}
          </span>
          <span className={cn('px-2 py-1 text-xs rounded-full', getRiskColor(contract.riskLevel))}>
            {contract.riskLevel} Risk
          </span>
          <span className={cn('px-2 py-1 text-xs rounded-full', getAutomationColor(contract.automationLevel))}>
            {contract.automationLevel}
          </span>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-200">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <DollarSign className="w-4 h-4" />
              <span>${(contract.value / 1000000).toFixed(1)}M</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Calendar className="w-4 h-4" />
              <span>{new Date(contract.startDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Target className="w-4 h-4" />
              <span>{contract.complexity}% complex</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-slate-600">
              <span>End: {new Date(contract.endDate).toLocaleDateString()}</span>
            </div>
            {contract.renewalDate && (
              <div className="text-sm text-slate-600">
                <span>Renewal: {new Date(contract.renewalDate).toLocaleDateString()}</span>
              </div>
            )}
            <div className="flex items-center space-x-1 text-sm text-slate-600">
              <Users className="w-4 h-4" />
              <span>{contract.owner}</span>
            </div>
          </div>
        </div>

        {/* ML Metrics */}
        <div className="bg-slate-50 p-3 rounded-lg space-y-2">
          <h4 className="text-xs font-medium text-slate-700 flex items-center">
            <Settings className="w-3 h-3 mr-1" />
            AI Analytics
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-600">Risk Score</span>
              <span className="font-medium">{contract.metrics.riskAssessment}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Compliance</span>
              <span className="font-medium">{contract.metrics.complianceScore}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Renewal Prob.</span>
              <span className="font-medium">{contract.metrics.renewalProbability}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Negotiation</span>
              <span className="font-medium">{contract.metrics.negotiationPower}%</span>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        {isHovered && contract.insights.length > 0 && (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-lg border border-purple-200 animate-fade-in">
            <div className="flex items-center space-x-2 mb-2">
              <Lightbulb className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">AI Insights</span>
            </div>
            <ul className="space-y-1">
              {contract.insights.slice(0, 2).map((insight, index) => (
                <li key={index} className="text-xs text-purple-700 flex items-start">
                  <Circle className="w-1.5 h-1.5 mt-1.5 mr-2 flex-shrink-0" />
                  {insight}
                </li>
              ))}
            </ul>
            {contract.predictedOutcome && (
              <div className="mt-2 pt-2 border-t border-purple-200">
                <div className="flex items-center space-x-1">
                  <Target className="w-3 h-3 text-purple-600" />
                  <span className="text-xs font-medium text-purple-800">Prediction:</span>
                </div>
                <p className="text-xs text-purple-700 mt-1">{contract.predictedOutcome}</p>
              </div>
            )}
          </div>
        )}

        {/* Tags */}
        {contract.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {contract.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                #{tag}
              </span>
            ))}
            {contract.tags.length > 3 && (
              <span className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded-full">
                +{contract.tags.length - 3} more
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
            <span>{contract.department}</span>
          </div>
        </div>
      </div>
    </CorporateCard>
  )
}

const Contracts = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [contracts] = useState(professionalContracts)

  const stats = {
    total: contracts.length,
    active: contracts.filter(c => c.status === 'active').length,
    review: contracts.filter(c => c.status === 'review' || c.status === 'legal-review').length,
    totalValue: contracts.reduce((sum, c) => sum + c.value, 0)
  }

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.counterparty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || contract.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <CorporateLayout
      title="Contract Intelligence Hub"
      subtitle="AI-powered contract lifecycle management with quantum-enhanced analytics"
      actions={
        <div className="flex space-x-3">
          <CorporateButton variant="secondary" leftIcon={<Activity className="w-4 h-4" />}>
            AI Assistant
          </CorporateButton>
          <CorporateButton variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
            New Contract
          </CorporateButton>
        </div>
      }
    >
      {/* Enhanced Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {businessMetrics.map((metric, index) => (
          <BusinessMetricCard key={index} {...metric} />
        ))}
      </div>

      {/* AI Insights Panel */}
      <CorporateCard variant="elevated" className="mb-8">
        <CorporateCardHeader>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Neural Contract Intelligence</h3>
              <p className="text-sm text-slate-600">Real-time AI analysis and predictive insights</p>
            </div>
          </div>
        </CorporateCardHeader>
        <CorporateCardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Risk Assessment */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-4 rounded-xl border border-red-200">
              <div className="flex items-center space-x-3 mb-3">
                <Shield className="w-5 h-5 text-red-500" />
                <h4 className="font-medium text-red-900">Risk Matrix</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-red-700">High Risk</span>
                  <span className="text-sm font-medium text-red-900">12%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-red-700">Medium Risk</span>
                  <span className="text-sm font-medium text-red-900">34%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-red-700">Low Risk</span>
                  <span className="text-sm font-medium text-red-900">54%</span>
                </div>
              </div>
            </div>

            {/* Compliance Score */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-4 rounded-xl border border-green-200">
              <div className="flex items-center space-x-3 mb-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <h4 className="font-medium text-green-900">Compliance Score</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-green-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-green-900">94%</span>
                </div>
                <p className="text-xs text-green-700">All contracts meet regulatory requirements</p>
              </div>
            </div>

            {/* AI Predictions */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-200">
              <div className="flex items-center space-x-3 mb-3">
                <Settings className="w-5 h-5 text-purple-500" />
                <h4 className="font-medium text-purple-900">AI Predictions</h4>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-purple-700">
                  <div className="flex justify-between">
                    <span>Renewal Success</span>
                    <span className="font-medium">91%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost Optimization</span>
                    <span className="font-medium">$2.3M</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CorporateCardContent>
      </CorporateCard>

      {/* Contract Controls */}
      <CorporateCard className="mb-6">
        <CorporateCardContent>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search contracts with AI..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="review">Review</option>
                <option value="legal-review">Legal Review</option>
                <option value="draft">Draft</option>
                <option value="expired">Expired</option>
              </select>
              <CorporateButton variant="secondary" size="sm" leftIcon={<Filter className="w-4 h-4" />}>
                Advanced
              </CorporateButton>
            </div>
          </div>
        </CorporateCardContent>
      </CorporateCard>

      {/* Smart Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Contracts</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-teal-600 p-4 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Active</p>
              <p className="text-2xl font-bold">{stats.active}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-4 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 text-sm">In Review</p>
              <p className="text-2xl font-bold">{stats.review}</p>
            </div>
            <Clock className="w-8 h-8 text-amber-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-4 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total Value</p>
              <p className="text-2xl font-bold">${(stats.totalValue / 1000000).toFixed(1)}B</p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Enhanced Contract Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredContracts.map((contract) => (
          <EnhancedContractCard key={contract.id} contract={contract} />
        ))}
      </div>
    </CorporateLayout>
  )
}

export default Contracts
