import React, { useState } from 'react'
import { CorporateLayout } from '@/components/corporate/CorporateLayout'
import { CorporateCard, CorporateCardHeader, CorporateCardContent } from '@/components/corporate/CorporateCard'
import { CorporateButton } from '@/components/corporate/CorporateButton'
import { 
  Plus, Search, Filter, MoreHorizontal, Calendar, User, AlertTriangle, CheckCircle, Clock, FileText, DollarSign, Briefcase,
  Target, Activity, Shield, Eye, ChevronRight, Star, Award, Rocket, Timer,
  Users, Layers, Globe, Settings, Database, Network, TrendingUp, TrendingDown, BarChart3, Building
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Professional matter management metrics
const matterMetrics = [
  {
    title: "Matter Optimization",
    value: "96.8%",
    change: "+14.7%",
    trend: "up" as const,
    icon: Target,
    variant: "success" as const,
    description: "Professional matter management efficiency",
    prediction: "Approaching optimal performance",
  },
  {
    title: "Case Resolution Rate",
    value: "87.3%",
    change: "+9.4%",
    trend: "up" as const,
    icon: Activity,
    variant: "default" as const,
    description: "Advanced case resolution speed",
    prediction: "Improved processing efficiency",
  },
  {
    title: "High-Risk Matters",
    value: "18",
    change: "-22.3%",
    trend: "down" as const,
    icon: Shield,
    variant: "warning" as const,
    description: "High-risk matter tracking",
    prediction: "Risk reduction trajectory",
  },
  {
    title: "Billing Efficiency",
    value: "94.2%",
    change: "+18.6%",
    trend: "up" as const,
    icon: DollarSign,
    variant: "success" as const,
    description: "Professional cost optimization",
    prediction: "Peak efficiency achieved",
  },
];

// Professional matter management interface
interface Matter {
  id: string
  title: string
  client: string
  type: string
  status: 'active' | 'pending' | 'completed' | 'on-hold'
  priority: 'standard' | 'high' | 'urgent' | 'critical'
  assignedTo: string
  dueDate: string
  budget: number
  spent: number
  description: string
  complexity: number
  activity: number
  stage: string
  threatLevel: string
  riskScore: number
}

const matters: Matter[] = [
  {
    id: 'M001',
    title: 'Vendor Agreement - TechCorp Division',
    client: 'TechCorp Industries',
    type: 'Contract Law',
    status: 'active',
    priority: 'urgent',
    assignedTo: 'Sarah Johnson',
    dueDate: '2024-01-15',
    budget: 250000,
    spent: 160000,
    description: 'Comprehensive vendor agreement with compliance framework and security measures.',
    complexity: 94.7,
    activity: 87.3,
    stage: 'Phase 3',
    threatLevel: 'Medium',
    riskScore: 7.2,
  },
  {
    id: 'M002',
    title: 'Employment Dispute Resolution',
    client: 'Manufacturing Partners Ltd',
    type: 'Employment Law',
    status: 'pending',
    priority: 'high',
    assignedTo: 'Michael Chen',
    dueDate: '2024-01-10',
    budget: 375000,
    spent: 225000,
    description: 'Advanced mediation for employment dispute involving collaboration protocols and workplace policies.',
    complexity: 89.1,
    activity: 92.6,
    stage: 'Phase 4',
    threatLevel: 'High',
    riskScore: 8.7,
  },
  {
    id: 'M003',
    title: 'IP Portfolio Management',
    client: 'Innovation Labs Inc',
    type: 'Intellectual Property Law',
    status: 'active',
    priority: 'high',
    assignedTo: 'Dr. Emily Roberts',
    dueDate: '2024-02-01',
    budget: 500000,
    spent: 125000,
    description: 'Comprehensive IP review with portfolio optimization and patent analysis.',
    complexity: 96.8,
    activity: 91.4,
    stage: 'Phase 2',
    threatLevel: 'Critical',
    riskScore: 9.3,
  },
  {
    id: 'M004',
    title: 'M&A Due Diligence Review',
    client: 'TechNova Fusion Corp',
    type: 'M&A Law',
    status: 'completed',
    priority: 'critical',
    assignedTo: 'Director Kate Williams',
    dueDate: '2024-01-08',
    budget: 750000,
    spent: 720000,
    description: 'Advanced merger analysis with compliance verification and comprehensive risk assessment.',
    complexity: 98.2,
    activity: 88.9,
    stage: 'Phase 4',
    threatLevel: 'Low',
    riskScore: 4.1,
  },
  {
    id: 'M005',
    title: 'Data Privacy Compliance Framework',
    client: 'SecureTech Dynamics',
    type: 'Privacy Law',
    status: 'on-hold',
    priority: 'standard',
    assignedTo: 'Lisa Anderson',
    dueDate: '2024-01-30',
    budget: 180000,
    spent: 45000,
    description: 'Advanced data privacy framework with encryption standards and security protocols.',
    complexity: 91.5,
    activity: 76.8,
    stage: 'Phase 1',
    threatLevel: 'Medium',
    riskScore: 6.8,
  },
];

// Business insights for matter management
const businessInsights = [
  {
    title: "Case Pattern Analysis",
    description: "Analytics detected optimal case bundling strategy that could reduce resolution time by 31%.",
    confidence: 93.7,
    category: "Optimization",
    icon: Target,
  },
  {
    title: "Budget Prediction",
    description: "Advanced algorithms predict 89% budget accuracy improvement with new tracking methods.",
    confidence: 87.9,
    category: "Financial",
    icon: DollarSign,
  },
  {
    title: "Risk Alert",
    description: "Analytics identified 2 high-risk matters requiring immediate attention and review.",
    confidence: 95.2,
    category: "Risk",
    icon: AlertTriangle,
  },
];

const statusConfig = {
  'active': { color: 'text-blue-700 bg-blue-100', icon: Clock, label: 'Active' },
  'pending': { color: 'text-amber-700 bg-amber-100', icon: AlertTriangle, label: 'Pending' },
  'completed': { color: 'text-emerald-700 bg-emerald-100', icon: CheckCircle, label: 'Completed' },
  'on-hold': { color: 'text-slate-700 bg-slate-100', icon: Clock, label: 'On Hold' }
}

const priorityConfig = {
  standard: { color: 'text-slate-600 bg-slate-100' },
  high: { color: 'text-indigo-600 bg-indigo-100' },
  urgent: { color: 'text-purple-600 bg-purple-100' },
  critical: { color: 'text-red-600 bg-red-100' }
}

interface StatCardProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: React.ComponentType<{ className?: string }>
  variant: 'default' | 'success' | 'warning' | 'danger'
  description: string
  prediction: string
}

const StatCard = ({ title, value, change, trend, icon: Icon, variant, description, prediction }: StatCardProps) => {
  const variantStyles = {
    default: 'border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100',
    success: 'border-emerald-300 bg-gradient-to-br from-emerald-50 to-emerald-100',
    warning: 'border-amber-300 bg-gradient-to-br from-amber-50 to-amber-100',
    danger: 'border-red-300 bg-gradient-to-br from-red-50 to-red-100'
  };

  const iconStyles = {
    default: 'text-slate-600',
    success: 'text-emerald-600',
    warning: 'text-amber-600',
    danger: 'text-red-600'
  };

  return (
    <CorporateCard variant="elevated" padding="lg" className={`border-l-4 ${variantStyles[variant]} hover:shadow-xl transition-all duration-300`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-white/60 ${iconStyles[variant]}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">{title}</p>
              <p className="text-xs text-slate-500">{description}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-3xl font-bold text-slate-900">{value}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
              <span className={`text-sm font-medium ${trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                {change}
              </span>
            </div>
            <span className="text-xs text-slate-500">this period</span>
          </div>
          <div className="bg-white/40 rounded-lg p-2">
            <p className="text-xs text-slate-600 font-medium">Analytics Prediction:</p>
            <p className="text-xs text-slate-500">{prediction}</p>
          </div>
        </div>
      </div>
    </CorporateCard>
  );
};

const MatterCard: React.FC<{ matter: Matter }> = ({ matter }) => {
  const StatusIcon = statusConfig[matter.status].icon
  const budgetUtilization = (matter.spent / matter.budget) * 100

  const threatStyles = {
    'Low': 'text-green-600',
    'Medium': 'text-amber-600',
    'High': 'text-red-600',
    'Critical': 'text-red-700 font-bold'
  };

  return (
    <CorporateCard variant="elevated" padding="lg" hover interactive className="bg-gradient-to-br from-white to-slate-50">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 mb-1">{matter.title}</h3>
            <p className="text-sm text-slate-600">{matter.client}</p>
            <div className="flex items-center space-x-2 mt-2 text-xs text-slate-500">
              <Building className="w-3 h-3" />
              <span>Complexity: {matter.complexity}%</span>
              <span>•</span>
              <span>Activity: {matter.activity}%</span>
            </div>
          </div>
          <button className="p-1 rounded-lg hover:bg-slate-100 transition-colors">
            <MoreHorizontal className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {/* Badges */}
        <div className="flex items-center space-x-2 flex-wrap gap-1">
          <span className={cn(
            'px-2 py-1 text-xs font-medium rounded-full flex items-center space-x-1',
            statusConfig[matter.status].color
          )}>
            <StatusIcon className="w-3 h-3" />
            <span>{statusConfig[matter.status].label}</span>
          </span>
          <span className={cn(
            'px-2 py-1 text-xs font-medium rounded-full',
            priorityConfig[matter.priority].color
          )}>
            {matter.priority.toUpperCase()}
          </span>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700">
            {matter.stage}
          </span>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <User className="w-4 h-4" />
              <span>{matter.assignedTo}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Calendar className="w-4 h-4" />
              <span>{new Date(matter.dueDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Shield className="w-4 h-4" />
              <span className={`font-medium ${threatStyles[matter.threatLevel as keyof typeof threatStyles]}`}>
                {matter.threatLevel} Risk
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <DollarSign className="w-4 h-4" />
              <span>${matter.spent.toLocaleString()} / ${matter.budget.toLocaleString()}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  budgetUtilization > 90 ? 'bg-red-500' : 
                  budgetUtilization > 75 ? 'bg-amber-500' : 'bg-emerald-500'
                )}
                style={{ width: `${Math.min(budgetUtilization, 100)}%` }}
              />
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Target className="w-4 h-4" />
              <span>Risk Score: {matter.riskScore}/10</span>
            </div>
          </div>
        </div>

        {/* Activity Progress */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Matter Activity</span>
            <span>{matter.activity}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5">
            <div 
              className="h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
              style={{ width: `${matter.activity}%` }}
            />
          </div>
        </div>
      </div>
    </CorporateCard>
  )
}

const MatterManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const stats = {
    total: matters.length,
    active: matters.filter(m => m.status === 'active').length,
    pending: matters.filter(m => m.status === 'pending').length,
    urgent: matters.filter(m => m.priority === 'urgent').length
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-slate-900 via-corporate-700 to-blue-900 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                  <Briefcase className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold">Matter Management Center</h1>
                  <p className="text-slate-200 text-lg">Professional matter orchestration and comprehensive case management</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-slate-300">
                <div className="flex items-center space-x-1">
                  <Activity className="w-4 h-4" />
                  <span>Matter Activity: 91.7%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Settings className="w-4 h-4" />
                  <span>Processing: Active</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Network className="w-4 h-4" />
                  <span>Matter Sync: Online</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-32 h-32 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                <div className="text-center">
                  <FileText className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-xs font-medium">Matter Hub</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
            <CorporateButton variant="secondary" size="md" className="bg-white/10 border-white/20 hover:bg-white/20">
              <Plus className="w-4 h-4 mr-2" />
              Create New Matter
            </CorporateButton>
            <CorporateButton variant="ghost" size="md" className="text-white border-white/20 hover:bg-white/10">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics Dashboard
            </CorporateButton>
            <CorporateButton variant="ghost" size="md" className="text-white border-white/20 hover:bg-white/10">
              <Target className="w-4 h-4 mr-2" />
              Insights Portal
            </CorporateButton>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {matterMetrics.map((metric, index) => (
          <StatCard key={index} {...metric} />
        ))}
      </div>

      {/* Business Insights Panel */}
      <CorporateCard variant="elevated" padding="none" className="bg-gradient-to-br from-slate-50 to-white">
        <CorporateCardHeader 
          title="Business Intelligence Center" 
          subtitle="Advanced analytics and predictive insights for matter optimization"
          action={
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-corporate-600" />
              <span className="text-sm font-medium text-corporate-600">Analytics Active</span>
            </div>
          }
        />
        <CorporateCardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {businessInsights.map((insight, index) => (
              <div key={index} className="bg-white rounded-xl p-4 border border-slate-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-corporate-100 rounded-lg">
                    <insight.icon className="w-5 h-5 text-corporate-600" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-900">{insight.title}</h3>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                        {insight.confidence}% confidence
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{insight.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded-full">
                        {insight.category}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CorporateCardContent>
      </CorporateCard>

      {/* Enhanced Search */}
      <CorporateCard variant="elevated" padding="lg" className="bg-gradient-to-br from-white to-slate-50">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search across all matter dimensions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="flex items-center space-x-2 text-xs text-slate-500">
                <Database className="w-4 h-4" />
                <span>Smart Search</span>
              </div>
            </div>
          </div>
          <CorporateButton variant="outline" size="lg" className="border-slate-300">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filter
          </CorporateButton>
        </div>
      </CorporateCard>

      {/* Matters Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {matters.map((matter) => (
          <MatterCard key={matter.id} matter={matter} />
        ))}
      </div>

      {/* Analytics Footer */}
      <CorporateCard variant="elevated" padding="lg" className="bg-gradient-to-br from-slate-50 to-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-corporate-600">{stats.total}</p>
            <p className="text-xs text-slate-600">Total Matters</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-blue-600">{stats.active}</p>
            <p className="text-xs text-slate-600">Active Processing</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
            <p className="text-xs text-slate-600">Pending Review</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-purple-600">{stats.urgent}</p>
            <p className="text-xs text-slate-600">Urgent Priority</p>
          </div>
        </div>
      </CorporateCard>
    </div>
  )
}

export default MatterManagement
