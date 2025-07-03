import React, { useState, useEffect } from 'react'
import { CorporateLayout } from '@/components/corporate/CorporateLayout'
import { CorporateCard } from '@/components/corporate/CorporateCard'
import { CorporateButton } from '@/components/corporate/CorporateButton'
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  FileText,
  Users,
  Calendar,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  AlertCircle,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Settings,
  BookOpen,
  Award,
  XCircle,
  Gauge,
  Sparkles,
  Radar,
  Globe,
  Database,
  Network
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Pie, Radar as RadarChart_Radar } from 'recharts'

interface Risk {
  id: string
  title: string
  category: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  probability: number
  impact: number
  status: 'identified' | 'assessing' | 'mitigating' | 'monitoring' | 'resolved'
  owner: string
  dateIdentified: string
  lastReviewed: string
  description: string
  mitigationPlan?: string
  riskScore?: number
  predictedTrend?: string
  complexity?: number
  insights?: string[]
}

const riskData: Risk[] = [
  {
    id: 'QR-2024-001',
    title: 'Quantum Computing Threat to Current Encryption',
    category: 'Cybersecurity & Data Protection',
    severity: 'critical',
    probability: 0.75,
    impact: 9.5,
    status: 'mitigating',
    owner: 'Dr. Sarah Chen, Quantum Security Lead',
    dateIdentified: '2024-01-10',
    lastReviewed: '2024-06-28',
    description: 'Emergence of fault-tolerant quantum computers poses existential threat to RSA and ECC encryption across all legal data systems.',
    mitigationPlan: 'Migration to quantum-resistant cryptography protocols and implementation of post-quantum security architecture.',
    riskScore: 9.2,
    predictedTrend: 'Escalating - Quantum supremacy timeline accelerating',
    complexity: 9.8,
    insights: [
      'Timeline compressed by 3 years due to recent breakthroughs',
      'Legal industry exposure: 87% of current security inadequate',
      'Migration window: 18-24 months for critical systems'
    ]
  },
  {
    id: 'QR-2024-002',
    title: 'AI Hallucination in Legal Document Generation',
    category: 'AI Ethics & Liability',
    severity: 'high',
    probability: 0.68,
    impact: 8.3,
    status: 'assessing',
    owner: 'Marcus Rodriguez, AI Governance Director',
    dateIdentified: '2024-02-15',
    lastReviewed: '2024-07-01',
    description: 'AI systems generating factually incorrect legal content leading to malpractice liability and client harm.',
    mitigationPlan: 'Implementation of multi-layer AI verification systems and human oversight protocols.',
    riskScore: 8.1,
    predictedTrend: 'Stabilizing - New verification protocols reducing incidents',
    complexity: 7.4,
    insights: [
      'False positive rate decreased 34% with new verification',
      'Human oversight requirements increase cost by 23%',
      'Client confidence metric improved to 89.3%'
    ]
  },
  {
    id: 'QR-2024-003',
    title: 'Neural Network Training Data Bias',
    category: 'Algorithmic Fairness',
    severity: 'high',
    probability: 0.82,
    impact: 7.8,
    status: 'mitigating',
    owner: 'Dr. Elena Vasquez, Fairness AI Lead',
    dateIdentified: '2024-01-22',
    lastReviewed: '2024-06-30',
    description: 'Systematic biases in AI training data leading to discriminatory outcomes in legal recommendations and client profiling.',
    mitigationPlan: 'Diverse dataset curation, bias detection algorithms, and regular fairness audits.',
    riskScore: 7.9,
    predictedTrend: 'Improving - Bias metrics showing positive trends',
    complexity: 6.7,
    insights: [
      'Bias scores reduced by 42% across protected categories',
      'Fairness audit coverage expanded to 95% of AI systems',
      'Regulatory compliance confidence: 91.2%'
    ]
  },
  {
    id: 'QR-2024-004',
    title: 'Blockchain Smart Contract Vulnerabilities',
    category: 'Digital Asset Security',
    severity: 'medium',
    probability: 0.55,
    impact: 6.9,
    status: 'monitoring',
    owner: 'Alex Thompson, Blockchain Security',
    dateIdentified: '2024-03-08',
    lastReviewed: '2024-06-25',
    description: 'Code vulnerabilities in smart contracts managing legal escrows and automated compliance systems.',
    mitigationPlan: 'Formal verification protocols and regular security audits of smart contract code.',
    riskScore: 6.4,
    predictedTrend: 'Stable - Security measures keeping pace with threats',
    complexity: 5.8,
    insights: [
      'Vulnerability detection rate improved 67%',
      'Formal verification coverage: 100% of critical contracts',
      'Economic impact contained to <0.1% of total value'
    ]
  },
  {
    id: 'QR-2024-005',
    title: 'Cross-Jurisdictional AI Regulation Compliance',
    category: 'Regulatory Compliance',
    severity: 'high',
    probability: 0.91,
    impact: 8.7,
    status: 'identified',
    owner: 'Jennifer Walsh, Global Compliance',
    dateIdentified: '2024-04-12',
    lastReviewed: '2024-06-29',
    description: 'Conflicting AI regulations across 15+ jurisdictions creating compliance complexity and potential violations.',
    mitigationPlan: 'Dynamic compliance matrix and AI governance framework adaptable to multiple regulatory regimes.',
    riskScore: 8.6,
    predictedTrend: 'Escalating - New regulations emerging monthly',
    complexity: 8.9,
    insights: [
      'Regulatory complexity index: 9.2/10 and rising',
      'Compliance cost impact: +67% operational overhead',
      'Risk of violation without adaptive systems: 78%'
    ]
  },
  {
    id: 'QR-2024-006',
    title: 'Quantum Key Distribution Network Failure',
    category: 'Communication Security',
    severity: 'medium',
    probability: 0.34,
    impact: 7.2,
    status: 'monitoring',
    owner: 'Dr. Lisa Kim, Quantum Communications',
    dateIdentified: '2024-02-28',
    lastReviewed: '2024-06-27',
    description: 'Single points of failure in quantum key distribution network could compromise secure client communications.',
    mitigationPlan: 'Redundant quantum communication channels and classical backup encryption systems.',
    riskScore: 5.8,
    predictedTrend: 'Stable - Infrastructure redundancy implemented',
    complexity: 8.1,
    insights: [
      'Network uptime: 99.97% with redundancy',
      'Quantum channel availability: 3.2x improvement',
      'Classical backup utilization: <2% of communications'
    ]
  }
]

// Enhanced analytics data
const riskTrendData = [
  { month: 'Jan', critical: 3, high: 8, medium: 12, low: 5, total: 28 },
  { month: 'Feb', critical: 4, high: 11, medium: 15, low: 7, total: 37 },
  { month: 'Mar', critical: 2, high: 13, medium: 18, low: 9, total: 42 },
  { month: 'Apr', critical: 3, high: 10, medium: 16, low: 11, total: 40 },
  { month: 'May', critical: 1, high: 8, medium: 14, low: 13, total: 36 },
  { month: 'Jun', critical: 2, high: 6, medium: 12, low: 15, total: 35 }
]

const riskCategoryData = [
  { name: 'Cybersecurity', value: 35, color: '#EF4444' },
  { name: 'AI Ethics', value: 28, color: '#F59E0B' },
  { name: 'Regulatory', value: 22, color: '#8B5CF6' },
  { name: 'Operational', value: 15, color: '#06B6D4' }
]

const riskMatrixData = [
  { subject: 'Cyber Threats', current: 85, target: 40, fullMark: 100 },
  { subject: 'AI Risks', current: 72, target: 50, fullMark: 100 },
  { subject: 'Regulatory', current: 88, target: 60, fullMark: 100 },
  { subject: 'Operational', current: 45, target: 35, fullMark: 100 },
  { subject: 'Financial', current: 38, target: 25, fullMark: 100 },
  { subject: 'Reputational', current: 52, target: 30, fullMark: 100 }
]

const mitigationEffectiveness = [
  { strategy: 'AI Verification', effectiveness: 89, cost: 'High', timeframe: 'Immediate' },
  { strategy: 'Quantum Security', effectiveness: 94, cost: 'Very High', timeframe: '6-12 months' },
  { strategy: 'Bias Mitigation', effectiveness: 76, cost: 'Medium', timeframe: '3-6 months' },
  { strategy: 'Regulatory Framework', effectiveness: 82, cost: 'Medium', timeframe: 'Ongoing' }
]

const severityConfig = {
  low: { color: 'text-green-700 bg-green-100', icon: CheckCircle },
  medium: { color: 'text-yellow-700 bg-yellow-100', icon: Clock },
  high: { color: 'text-orange-700 bg-orange-100', icon: AlertTriangle },
  critical: { color: 'text-red-700 bg-red-100', icon: AlertCircle }
}

const statusConfig = {
  identified: { color: 'text-blue-700 bg-blue-100', neural: 'Neural Detection Active' },
  assessing: { color: 'text-purple-700 bg-purple-100', neural: 'AI Analysis Running' },
  mitigating: { color: 'text-orange-700 bg-orange-100', neural: 'Quantum Mitigation' },
  monitoring: { color: 'text-cyan-700 bg-cyan-100', neural: 'Continuous Monitoring' },
  resolved: { color: 'text-green-700 bg-green-100', neural: 'Risk Neutralized' }
}

const QuantumRiskCard: React.FC<{ risk: Risk }> = ({ risk }) => {
  const SeverityIcon = severityConfig[risk.severity].icon
  const riskScore = (risk.probability * risk.impact).toFixed(1)

  return (
    <CorporateCard 
      variant="elevated" 
      padding="lg" 
      hover 
      interactive
      className={cn(
        'border-l-4 transition-all duration-300',
        risk.severity === 'critical' ? 'border-l-red-500 shadow-red-100' :
        risk.severity === 'high' ? 'border-l-orange-500 shadow-orange-100' :
        risk.severity === 'medium' ? 'border-l-yellow-500 shadow-yellow-100' :
        'border-l-green-500 shadow-green-100'
      )}
    >
      <div className="space-y-6">
        {/* Enhanced Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <span>{risk.title}</span>
                {risk.riskScore && risk.riskScore > 8 && (
                  <Activity className="w-4 h-4 text-purple-600" />
                )}
              </h3>
            </div>
            <p className="text-sm text-slate-600 mb-3 font-medium">{risk.category}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-xs text-slate-500">Risk Score</div>
              <div className={cn(
                'text-2xl font-bold',
                parseFloat(riskScore) > 7 ? 'text-red-600' :
                parseFloat(riskScore) > 5 ? 'text-orange-600' :
                'text-green-600'
              )}>{riskScore}</div>
            </div>
            {risk.riskScore && (
              <div className="text-right">
                <div className="text-xs text-slate-500">Risk Score</div>
                <div className={cn(
                  'text-lg font-bold',
                  risk.riskScore > 8 ? 'text-red-600' :
                  risk.riskScore > 6 ? 'text-orange-600' :
                  'text-green-600'
                )}>{risk.riskScore}/10</div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className={cn(
            'px-3 py-1 text-xs font-medium rounded-full flex items-center space-x-1.5',
            severityConfig[risk.severity].color
          )}>
            <SeverityIcon className="w-3 h-3" />
            <span>{risk.severity.toUpperCase()}</span>
          </span>
          <span className={cn(
            'px-3 py-1 text-xs font-medium rounded-full',
            statusConfig[risk.status].color
          )}>
            {statusConfig[risk.status].neural}
          </span>
          <span className="px-3 py-1 text-xs bg-gradient-to-r from-purple-100 to-cyan-100 text-purple-700 rounded-full font-medium">
            Impact: {risk.impact}/10
          </span>
          <span className="px-3 py-1 text-xs bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 rounded-full font-medium">
            Probability: {Math.round(risk.probability * 100)}%
          </span>
        </div>

        {/* AI Insights */}
        {risk.insights && (
          <div className="bg-gradient-to-r from-purple-50 to-cyan-50 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center space-x-2 mb-3">
              <Activity className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Neural Risk Analysis</span>
            </div>
            <div className="space-y-2">
              {risk.insights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <Sparkles className="w-3 h-3 text-purple-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-700">{insight}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Predicted Trend */}
        {risk.predictedTrend && (
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-3 border border-cyan-200">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-cyan-600" />
              <span className="text-sm font-medium text-cyan-700">Trend Prediction</span>
            </div>
            <p className="text-sm text-slate-700">{risk.predictedTrend}</p>
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed">{risk.description}</p>

        {/* Mitigation Plan */}
        {risk.mitigationPlan && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">Mitigation Strategy</span>
            </div>
            <p className="text-sm text-slate-700">{risk.mitigationPlan}</p>
          </div>
        )}

        {/* Enhanced Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-200">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <Users className="w-3 h-3" />
              <span>Risk Owner</span>
            </div>
            <div className="text-sm font-medium text-slate-700">{risk.owner}</div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <Calendar className="w-3 h-3" />
              <span>Identified</span>
            </div>
            <div className="text-sm font-medium text-slate-700">
              {new Date(risk.dateIdentified).toLocaleDateString()}
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <Eye className="w-3 h-3" />
              <span>Last Review</span>
            </div>
            <div className="text-sm font-medium text-slate-700">
              {new Date(risk.lastReviewed).toLocaleDateString()}
            </div>
          </div>
          {risk.complexity && (
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs text-slate-500">
                <Gauge className="w-3 h-3" />
                <span>Complexity</span>
              </div>
              <div className="text-sm font-bold text-slate-900">
                {risk.quantumComplexity}/10
              </div>
            </div>
          )}
        </div>
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

export const RiskManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [severityFilter, setSeverityFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [filteredRisks, setFilteredRisks] = useState<Risk[]>(riskData)

  const stats = {
    total: riskData.length,
    critical: riskData.filter(r => r.severity === 'critical').length,
    active: riskData.filter(r => !['resolved'].includes(r.status)).length,
    avgScore: (riskData.reduce((sum, r) => sum + (r.riskScore || 0), 0) / riskData.length).toFixed(1)
  }

  // Apply filters
  useEffect(() => {
    let filtered = riskData

    if (searchQuery) {
      filtered = filtered.filter(risk => 
        risk.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        risk.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        risk.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (severityFilter !== 'all') {
      filtered = filtered.filter(risk => risk.severity === severityFilter)
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(risk => risk.status === statusFilter)
    }

    setFilteredRisks(filtered)
  }, [searchQuery, severityFilter, statusFilter])

  return (
    <CorporateLayout>
      <div className="space-y-8">
        {/* Neural Header */}
        <div className="bg-gradient-to-r from-red-600 via-orange-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-8 h-8" />
                <h1 className="text-3xl font-bold">Quantum Risk Command Center</h1>
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <p className="text-xl opacity-90 mb-6">
                AI-Powered Risk Detection & Neural Threat Analysis
              </p>
              <div className="grid grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">{stats.total}</div>
                  <div className="text-sm opacity-80">Total Risks</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{stats.critical}</div>
                  <div className="text-sm opacity-80">Critical Risks</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{stats.active}</div>
                  <div className="text-sm opacity-80">Active Risks</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{stats.avgScore}</div>
                  <div className="text-sm opacity-80">Avg AI Score</div>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm opacity-80">Risk Mitigation</div>
                <div className="text-4xl font-bold">92.4%</div>
              </div>
              <Brain className="w-16 h-16 opacity-80" />
            </div>
          </div>
        </div>

        {/* Advanced Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          <AnalyticsWidget title="Risk Trends" icon={TrendingUp}>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={riskTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="critical" stackId="1" stroke="#EF4444" fill="#EF4444" />
                <Area type="monotone" dataKey="high" stackId="1" stroke="#F59E0B" fill="#F59E0B" />
                <Area type="monotone" dataKey="medium" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" />
              </AreaChart>
            </ResponsiveContainer>
          </AnalyticsWidget>

          <AnalyticsWidget title="Risk Categories" icon={PieChart}>
            <ResponsiveContainer width="100%" height={200}>
              <RechartsPieChart>
                <Tooltip />
                <Pie
                  data={riskCategoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                >
                  {riskCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </RechartsPieChart>
            </ResponsiveContainer>
          </AnalyticsWidget>

          <AnalyticsWidget title="Risk Matrix Analysis" icon={Radar}>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={riskMatrixData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <RadarChart_Radar name="Current" dataKey="current" stroke="#EF4444" fill="#EF4444" fillOpacity={0.2} />
                <RadarChart_Radar name="Target" dataKey="target" stroke="#10B981" fill="#10B981" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </AnalyticsWidget>

          <AnalyticsWidget title="Mitigation Effectiveness" icon={Target}>
            <div className="space-y-3">
              {mitigationEffectiveness.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">{item.strategy}</span>
                    <span className="font-medium">{item.effectiveness}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                      style={{ width: `${item.effectiveness}%` }}
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
                Add Risk
              </CorporateButton>
              <CorporateButton variant="outline" size="sm">
                <Brain className="w-4 h-4 mr-2" />
                AI Risk Assessment
              </CorporateButton>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search risks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent"
              >
                <option value="all">All Severities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="identified">Identified</option>
                <option value="assessing">Assessing</option>
                <option value="mitigating">Mitigating</option>
                <option value="monitoring">Monitoring</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </CorporateCard>

        {/* Risks Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredRisks.map((risk) => (
            <QuantumRiskCard key={risk.id} risk={risk} />
          ))}
        </div>

        {filteredRisks.length === 0 && (
          <CorporateCard variant="outlined" padding="xl">
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No risks found</h3>
              <p className="text-slate-600">Try adjusting your search criteria or filters.</p>
            </div>
          </CorporateCard>
        )}
      </div>
    </CorporateLayout>
  )
}

export default RiskManagement
