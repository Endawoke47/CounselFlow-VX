import React, { useState, useEffect } from 'react'
import { CorporateLayout } from '@/components/corporate/CorporateLayout'
import { CorporateCard } from '@/components/corporate/CorporateCard'
import { CorporateButton } from '@/components/corporate/CorporateButton'
import { 
  Plus, 
  Search, 
  Scale, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  User,
  Gavel,
  Brain,
  Zap,
  Shield,
  Target,
  TrendingUp,
  Eye,
  Filter,
  Activity,
  BarChart3,
  PieChart,
  Radar,
  Sparkles,
  FileText,
  Users,
  Settings
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend, Pie, Radar as RadarChart_Radar } from 'recharts'

interface Dispute {
  id: string
  title: string
  plaintiff: string
  defendant: string
  type: string
  status: 'investigation' | 'mediation' | 'arbitration' | 'litigation' | 'settled' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'critical'
  assignedCounsel: string
  filingDate: string
  nextHearing?: string
  estimatedValue: number
  description: string
  aiRiskScore?: number
  resolutionProbability?: number
  predictedOutcome?: string
  complexity?: number
  stakeholders?: number
}

const quantumDisputeData: Dispute[] = [
  {
    id: 'QD-2024-001',
    title: 'Multi-Jurisdictional IP Quantum Encryption Dispute',
    plaintiff: 'QuantumTech Innovations Ltd.',
    defendant: 'Neural Dynamics Corporation',
    type: 'Quantum IP Litigation',
    status: 'arbitration',
    priority: 'critical',
    assignedCounsel: 'Dr. Elena Vasquez, Quantum Law Specialist',
    filingDate: '2024-01-15',
    nextHearing: '2024-08-20',
    estimatedValue: 50000000,
    description: 'Complex quantum encryption algorithm patent infringement case involving multiple AI-generated inventions across 12 jurisdictions.',
    aiRiskScore: 8.7,
    resolutionProbability: 0.72,
    predictedOutcome: 'Favorable Settlement with Cross-Licensing',
    complexity: 9.4,
    stakeholders: 23
  },
  {
    id: 'QD-2024-002',
    title: 'Neural Network Training Data Class Action',
    plaintiff: 'Global Content Creators Alliance (Class)',
    defendant: 'CounselFlow AI Systems',
    type: 'AI Ethics & Data Rights',
    status: 'mediation',
    priority: 'high',
    assignedCounsel: 'Marcus Chen, AI Rights Attorney',
    filingDate: '2024-02-03',
    nextHearing: '2024-07-15',
    estimatedValue: 125000000,
    description: 'Landmark case regarding unauthorized use of creative content for AI training datasets affecting 2.3M creators worldwide.',
    aiRiskScore: 7.2,
    resolutionProbability: 0.68,
    predictedOutcome: 'Structured Settlement with Licensing Framework',
    complexity: 8.9,
    stakeholders: 2300000
  },
  {
    id: 'QD-2024-003',
    title: 'Autonomous Legal Decision Challenge',
    plaintiff: 'Traditional Law Firms Coalition',
    defendant: 'LegalMind AI Corporation',
    type: 'Professional Regulation',
    status: 'litigation',
    priority: 'high',
    assignedCounsel: 'Sarah Kim, Regulatory Compliance',
    filingDate: '2024-03-10',
    nextHearing: '2024-09-05',
    estimatedValue: 75000000,
    description: 'Constitutional challenge to AI systems making binding legal decisions without human oversight in 15 practice areas.',
    aiRiskScore: 6.8,
    resolutionProbability: 0.81,
    predictedOutcome: 'Regulatory Framework Development',
    complexity: 7.6,
    stakeholders: 87
  },
  {
    id: 'QD-2024-004',
    title: 'Blockchain Smart Contract Governance Dispute',
    plaintiff: 'Decentralized Legal DAO',
    defendant: 'Corporate Legal Entities Union',
    type: 'Digital Governance',
    status: 'investigation',
    priority: 'medium',
    assignedCounsel: 'Alex Thompson, Blockchain Law',
    filingDate: '2024-04-22',
    estimatedValue: 35000000,
    description: 'Dispute over autonomous smart contract execution authority and human intervention requirements in legal processes.',
    aiRiskScore: 5.9,
    resolutionProbability: 0.75,
    predictedOutcome: 'Hybrid Governance Model',
    complexity: 6.8,
    stakeholders: 156
  },
  {
    id: 'QD-2024-005',
    title: 'Quantum Computing Trade Secrets',
    plaintiff: 'Future Systems Inc.',
    defendant: 'NextGen Quantum Labs',
    type: 'Trade Secrets',
    status: 'settled',
    priority: 'high',
    assignedCounsel: 'Dr. Jennifer Walsh, Quantum Technology Law',
    filingDate: '2024-01-08',
    estimatedValue: 90000000,
    description: 'Misappropriation of quantum algorithm optimizations and quantum-resistant encryption methodologies.',
    aiRiskScore: 4.2,
    resolutionProbability: 1.0,
    predictedOutcome: 'Confidential Settlement with Technology Transfer',
    complexity: 8.1,
    stakeholders: 12
  },
  {
    id: 'QD-2024-006',
    title: 'AI-Human Collaboration Rights Case',
    plaintiff: 'Human-AI Partnership Union',
    defendant: 'Pure AI Solutions Corp',
    type: 'Employment Rights',
    status: 'mediation',
    priority: 'medium',
    assignedCounsel: 'Lisa Rodriguez, Future Work Law',
    filingDate: '2024-03-15',
    nextHearing: '2024-08-10',
    estimatedValue: 42000000,
    description: 'Rights and compensation framework for human-AI collaborative work products and intellectual contributions.',
    aiRiskScore: 6.1,
    resolutionProbability: 0.79,
    predictedOutcome: 'New Industry Standards',
    complexity: 7.3,
    stakeholders: 45000
  }
]

// Enhanced analytics data
const resolutionTrendData = [
  { month: 'Jan', traditional: 12, aiAssisted: 18, quantum: 3, settled: 8, total: 41 },
  { month: 'Feb', traditional: 15, aiAssisted: 24, quantum: 5, settled: 12, total: 56 },
  { month: 'Mar', traditional: 18, aiAssisted: 32, quantum: 8, settled: 15, total: 73 },
  { month: 'Apr', traditional: 14, aiAssisted: 28, quantum: 6, settled: 18, total: 66 },
  { month: 'May', traditional: 16, aiAssisted: 35, quantum: 9, settled: 22, total: 82 },
  { month: 'Jun', traditional: 20, aiAssisted: 42, quantum: 12, settled: 28, total: 102 }
]

const caseTypeDistribution = [
  { name: 'Quantum IP', value: 35, color: '#8B5CF6' },
  { name: 'AI Ethics', value: 28, color: '#06B6D4' },
  { name: 'Digital Governance', value: 22, color: '#10B981' },
  { name: 'Future Tech', value: 15, color: '#F59E0B' }
]

const riskAnalysisData = [
  { subject: 'Legal Precedent', A: 85, B: 70, fullMark: 100 },
  { subject: 'Technical Complexity', A: 92, B: 85, fullMark: 100 },
  { subject: 'Regulatory Impact', A: 78, B: 65, fullMark: 100 },
  { subject: 'Financial Exposure', A: 88, B: 75, fullMark: 100 },
  { subject: 'Timeline Risk', A: 72, B: 80, fullMark: 100 },
  { subject: 'Stakeholder Impact', A: 95, B: 68, fullMark: 100 }
]

const outcomePredictor = [
  { outcome: 'Favorable Settlement', probability: 45, cases: 23 },
  { outcome: 'Regulatory Framework', probability: 25, cases: 12 },
  { outcome: 'Precedent Setting', probability: 18, cases: 9 },
  { outcome: 'Technology Transfer', probability: 12, cases: 6 }
]

const statusConfig = {
  investigation: { color: 'text-cyan-700 bg-cyan-100', icon: Search, neural: 'Neural Investigation Protocol' },
  mediation: { color: 'text-amber-700 bg-amber-100', icon: Clock, neural: 'Quantum Mediation Matrix' },
  arbitration: { color: 'text-purple-700 bg-purple-100', icon: Scale, neural: 'AI Arbitration Engine' },
  litigation: { color: 'text-red-700 bg-red-100', icon: Gavel, neural: 'Predictive Litigation AI' },
  settled: { color: 'text-emerald-700 bg-emerald-100', icon: CheckCircle, neural: 'Resolution Achieved' },
  closed: { color: 'text-slate-700 bg-slate-100', icon: CheckCircle, neural: 'Case Archived' }
}

const priorityConfig = {
  low: { color: 'text-slate-600 bg-slate-100', glow: '' },
  medium: { color: 'text-amber-600 bg-amber-100', glow: 'shadow-amber-200' },
  high: { color: 'text-orange-600 bg-orange-100', glow: 'shadow-orange-300' },
  critical: { color: 'text-red-600 bg-red-100', glow: 'shadow-red-400 animate-pulse' }
}

const QuantumDisputeCard: React.FC<{ dispute: Dispute }> = ({ dispute }) => {
  const StatusIcon = statusConfig[dispute.status].icon
  const hasUpcomingHearing = dispute.nextHearing && 
    new Date(dispute.nextHearing) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  return (
    <CorporateCard 
      variant="elevated" 
      padding="lg" 
      hover 
      interactive
      className={cn(
        'border-l-4 transition-all duration-300',
        dispute.priority === 'critical' ? 'border-l-red-500 shadow-red-100' :
        dispute.priority === 'high' ? 'border-l-orange-500 shadow-orange-100' :
        dispute.priority === 'medium' ? 'border-l-amber-500 shadow-amber-100' :
        'border-l-slate-300',
        priorityConfig[dispute.priority].glow
      )}
    >
      <div className="space-y-6">
        {/* Enhanced Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <span>{dispute.title}</span>
                {dispute.aiRiskScore && dispute.aiRiskScore > 8 && (
                  <Brain className="w-4 h-4 text-purple-600" />
                )}
              </h3>
              {hasUpcomingHearing && (
                <span className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded-full animate-pulse flex items-center space-x-1">
                  <AlertTriangle className="w-3 h-3" />
                  <span>Hearing Soon</span>
                </span>
              )}
            </div>
            <p className="text-sm text-slate-600 mb-3">
              <span className="font-medium">{dispute.plaintiff}</span> vs <span className="font-medium">{dispute.defendant}</span>
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {dispute.aiRiskScore && (
              <div className="text-right">
                <div className="text-xs text-slate-500">AI Risk Score</div>
                <div className={cn(
                  'text-sm font-bold',
                  dispute.aiRiskScore > 8 ? 'text-red-600' :
                  dispute.aiRiskScore > 6 ? 'text-orange-600' :
                  'text-green-600'
                )}>{dispute.aiRiskScore}/10</div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className={cn(
            'px-3 py-1 text-xs font-medium rounded-full flex items-center space-x-1.5',
            statusConfig[dispute.status].color
          )}>
            <StatusIcon className="w-3 h-3" />
            <span>{statusConfig[dispute.status].neural}</span>
          </span>
          <span className={cn(
            'px-3 py-1 text-xs font-bold rounded-full',
            priorityConfig[dispute.priority].color
          )}>
            {dispute.priority.toUpperCase()}
          </span>
          <span className="px-3 py-1 text-xs bg-gradient-to-r from-purple-100 to-cyan-100 text-purple-700 rounded-full font-medium">
            {dispute.type}
          </span>
          {dispute.resolutionProbability && (
            <span className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full font-medium">
              {Math.round(dispute.resolutionProbability * 100)}% Success Rate
            </span>
          )}
        </div>

        {/* AI Insights */}
        {dispute.predictedOutcome && (
          <div className="bg-gradient-to-r from-cyan-50 to-purple-50 rounded-lg p-3 border border-cyan-200">
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">AI Prediction</span>
            </div>
            <p className="text-sm text-slate-700">{dispute.predictedOutcome}</p>
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed">{dispute.description}</p>

        {/* Enhanced Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-200">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <User className="w-3 h-3" />
              <span>Lead Counsel</span>
            </div>
            <div className="text-sm font-medium text-slate-700">{dispute.assignedCounsel}</div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <Calendar className="w-3 h-3" />
              <span>Filed</span>
            </div>
            <div className="text-sm font-medium text-slate-700">
              {new Date(dispute.filingDate).toLocaleDateString()}
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <DollarSign className="w-3 h-3" />
              <span>Est. Value</span>
            </div>
            <div className="text-sm font-bold text-slate-900">
              ${(dispute.estimatedValue / 1000000).toFixed(1)}M
            </div>
          </div>
          {dispute.stakeholders && (
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs text-slate-500">
                <Target className="w-3 h-3" />
                <span>Stakeholders</span>
              </div>
              <div className="text-sm font-medium text-slate-700">
                {dispute.stakeholders.toLocaleString()}
              </div>
            </div>
          )}
        </div>

        {/* Next Hearing */}
        {dispute.nextHearing && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-800">Next Hearing</span>
              </div>
              <span className="text-sm font-bold text-amber-900">
                {new Date(dispute.nextHearing).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </CorporateCard>
  )
}

const AnalyticsWidget: React.FC<{ title: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode; className?: string }> = ({ title, icon: Icon, children, className }) => (
  <CorporateCard variant="elevated" padding="lg" className={cn('h-full', className)}>
    <div className="flex items-center space-x-2 mb-4">
      <Icon className="w-5 h-5 text-corporate-600" />
      <h3 className="font-semibold text-slate-900">{title}</h3>
    </div>
    {children}
  </CorporateCard>
)

export const DisputeResolution: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [filteredDisputes, setFilteredDisputes] = useState<Dispute[]>(quantumDisputeData)

  const stats = {
    total: quantumDisputeData.length,
    active: quantumDisputeData.filter(d => !['settled', 'closed'].includes(d.status)).length,
    critical: quantumDisputeData.filter(d => d.priority === 'critical').length,
    totalValue: quantumDisputeData.reduce((sum, d) => sum + d.estimatedValue, 0)
  }

  // Apply filters
  useEffect(() => {
    let filtered = quantumDisputeData

    if (searchQuery) {
      filtered = filtered.filter(dispute => 
        dispute.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dispute.plaintiff.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dispute.defendant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dispute.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(dispute => dispute.status === statusFilter)
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(dispute => dispute.priority === priorityFilter)
    }

    setFilteredDisputes(filtered)
  }, [searchQuery, statusFilter, priorityFilter])

  return (
    <CorporateLayout>
      <div className="space-y-8">
        {/* Neural Header */}
        <div className="bg-gradient-to-r from-purple-600 via-cyan-600 to-blue-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Scale className="w-8 h-8" />
                <h1 className="text-3xl font-bold">Quantum Dispute Resolution Center</h1>
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <p className="text-xl opacity-90 mb-6">
                AI-Powered Legal Conflict Resolution & Predictive Analytics
              </p>
              <div className="grid grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">{stats.total}</div>
                  <div className="text-sm opacity-80">Total Disputes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{stats.active}</div>
                  <div className="text-sm opacity-80">Active Cases</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{stats.critical}</div>
                  <div className="text-sm opacity-80">Critical Priority</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">${(stats.totalValue / 1000000).toFixed(0)}M</div>
                  <div className="text-sm opacity-80">Total Value</div>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm opacity-80">AI Resolution Rate</div>
                <div className="text-4xl font-bold">87.3%</div>
              </div>
              <Brain className="w-16 h-16 opacity-80" />
            </div>
          </div>
        </div>

        {/* Advanced Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          <AnalyticsWidget title="Resolution Trends" icon={TrendingUp}>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={resolutionTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="quantum" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" />
                <Area type="monotone" dataKey="aiAssisted" stackId="1" stroke="#06B6D4" fill="#06B6D4" />
                <Area type="monotone" dataKey="settled" stackId="1" stroke="#10B981" fill="#10B981" />
              </AreaChart>
            </ResponsiveContainer>
          </AnalyticsWidget>

          <AnalyticsWidget title="Case Type Distribution" icon={PieChart}>
            <ResponsiveContainer width="100%" height={200}>
              <RechartsPieChart>
                <Tooltip />
                <Pie
                  data={caseTypeDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                >
                  {caseTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </RechartsPieChart>
            </ResponsiveContainer>
          </AnalyticsWidget>

          <AnalyticsWidget title="Risk Analysis Matrix" icon={Radar}>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={riskAnalysisData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <RadarChart_Radar name="Current" dataKey="A" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.2} />
                <RadarChart_Radar name="Target" dataKey="B" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </AnalyticsWidget>

          <AnalyticsWidget title="Outcome Predictions" icon={Brain}>
            <div className="space-y-3">
              {outcomePredictor.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">{item.outcome}</span>
                    <span className="font-medium">{item.probability}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full"
                      style={{ width: `${item.probability}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </AnalyticsWidget>
        </div>

        {/* Search and Filter Controls */}
        <CorporateCard variant="outlined" padding="lg">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <CorporateButton variant="primary" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Dispute Case
              </CorporateButton>
              <CorporateButton variant="outline" size="sm">
                <Brain className="w-4 h-4 mr-2" />
                AI Case Analysis
              </CorporateButton>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search disputes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="investigation">Investigation</option>
                <option value="mediation">Mediation</option>
                <option value="arbitration">Arbitration</option>
                <option value="litigation">Litigation</option>
                <option value="settled">Settled</option>
                <option value="closed">Closed</option>
              </select>
              
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent"
              >
                <option value="all">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>
        </CorporateCard>

        {/* Disputes Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredDisputes.map((dispute) => (
            <QuantumDisputeCard key={dispute.id} dispute={dispute} />
          ))}
        </div>

        {filteredDisputes.length === 0 && (
          <CorporateCard variant="outlined" padding="xl">
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No disputes found</h3>
              <p className="text-slate-600">Try adjusting your search criteria or filters.</p>
            </div>
          </CorporateCard>
        )}
      </div>
    </CorporateLayout>
  )
}

export default DisputeResolution
