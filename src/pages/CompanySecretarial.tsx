import React, { useState } from 'react'
import { CorporateLayout } from '@/components/corporate/CorporateLayout'
import { CorporateCard, CorporateCardHeader, CorporateCardContent } from '@/components/corporate/CorporateCard'
import { CorporateButton } from '@/components/corporate/CorporateButton'
import { 
  Plus, Search, Building, Calendar, AlertTriangle, CheckCircle, Clock, FileText, Users, Briefcase,
  Activity, Eye, ChevronRight, Star, Timer, Database, BarChart3, Layers, Globe, Settings, 
  Monitor, TrendingUp, TrendingDown, PieChart, LineChart, Target, Shield, FileCheck
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Entity {
  id: string
  name: string
  type: string
  jurisdiction: string
  status: 'active' | 'pending' | 'dissolved' | 'inactive'
  incorporationDate: string
  nextFilingDate: string
  directors: number
  shareholders: number
  confidence: string
  complianceScore: string
  riskLevel: string
  insights: string
}

const entities: Entity[] = [
  {
    id: 'E001',
    name: 'CounselFlow Technologies Inc.',
    type: 'Corporation',
    jurisdiction: 'Delaware',
    status: 'active',
    incorporationDate: '2024-01-15',
    nextFilingDate: '2025-03-15',
    directors: 7,
    shareholders: 24,
    confidence: '99.2%',
    complianceScore: 'A+',
    riskLevel: 'Low',
    insights: 'Optimal corporate structure with excellent governance'
  },
  {
    id: 'E002',
    name: 'CF Holdings LLC',
    type: 'Limited Liability Company',
    jurisdiction: 'Nevada',
    status: 'active',
    incorporationDate: '2024-06-01',
    nextFilingDate: '2025-02-28',
    directors: 5,
    shareholders: 16,
    confidence: '96.7%',
    complianceScore: 'A',
    riskLevel: 'Low',
    insights: 'Advanced holdings structure with strong performance'
  },
  {
    id: 'E003',
    name: 'Legal Services Subsidiary',
    type: 'Subsidiary Corporation',
    jurisdiction: 'California',
    status: 'pending',
    incorporationDate: '2024-12-01',
    nextFilingDate: '2025-01-31',
    directors: 4,
    shareholders: 3,
    confidence: '87.4%',
    complianceScore: 'B+',
    riskLevel: 'Medium',
    insights: 'Emerging subsidiary with good growth potential'
  },
  {
    id: 'E004',
    name: 'Innovation Partners',
    type: 'Partnership',
    jurisdiction: 'Texas',
    status: 'active',
    incorporationDate: '2024-03-20',
    nextFilingDate: '2025-04-15',
    directors: 6,
    shareholders: 12,
    confidence: '94.8%',
    complianceScore: 'A',
    riskLevel: 'Low',
    insights: 'Strategic partnership with strong fundamentals'
  },
  {
    id: 'E005',
    name: 'Biotech Ventures',
    type: 'Investment Entity',
    jurisdiction: 'New York',
    status: 'active',
    incorporationDate: '2024-07-10',
    nextFilingDate: '2025-05-20',
    directors: 8,
    shareholders: 31,
    confidence: '98.1%',
    complianceScore: 'A+',
    riskLevel: 'Low',
    insights: 'High-performance biotech venture with excellent analytics'
  },
  {
    id: 'E006',
    name: 'Compliance Solutions',
    type: 'Service Corporation',
    jurisdiction: 'Florida',
    status: 'inactive',
    incorporationDate: '2023-11-05',
    nextFilingDate: '2025-01-10',
    directors: 3,
    shareholders: 7,
    confidence: '78.3%',
    complianceScore: 'C+',
    riskLevel: 'High',
    insights: 'Dormant entity requiring reactivation procedures'
  }
]

const entityMetrics = [
  {
    title: "Entity Performance",
    value: "97.6%",
    change: "+14.2%",
    trend: "up" as const,
    icon: Building,
    variant: "success" as const,
    description: "Overall entity health and optimization",
    prediction: "Entity performance approaching 99.1%",
  },
  {
    title: "Compliance Rate",
    value: "94.8%",
    change: "+18.7%",
    trend: "up" as const,
    icon: Shield,
    variant: "default" as const,
    description: "Advanced compliance tracking",
    prediction: "Compliance optimization confirmed",
  },
  {
    title: "Filing Efficiency",
    value: "89.3%",
    change: "+22.4%",
    trend: "up" as const,
    icon: FileCheck,
    variant: "success" as const,
    description: "Real-time filing acceleration",
    prediction: "Filing efficiency improvements detected",
  },
  {
    title: "Risk Score",
    value: "92.7",
    change: "+11.6%",
    trend: "up" as const,
    icon: Timer,
    variant: "success" as const,
    description: "Multi-dimensional risk optimization",
    prediction: "Risk mitigation strategies optimized",
  },
]

const statusConfig = {
  'active': { color: 'text-emerald-700 bg-gradient-to-r from-emerald-100 to-emerald-200 border-emerald-300', icon: CheckCircle, label: 'Active' },
  'pending': { color: 'text-amber-700 bg-gradient-to-r from-amber-100 to-amber-200 border-amber-300', icon: Clock, label: 'Pending' },
  'dissolved': { color: 'text-red-700 bg-gradient-to-r from-red-100 to-red-200 border-red-300', icon: AlertTriangle, label: 'Dissolved' },
  'inactive': { color: 'text-slate-700 bg-gradient-to-r from-slate-100 to-slate-200 border-slate-300', icon: Timer, label: 'Inactive' }
}

// Enhanced StatCard component with advanced analytics
const EntityStatCard = ({ title, value, change, trend, icon: Icon, variant, description, prediction }: {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ComponentType<{ className?: string }>;
  variant: 'default' | 'success' | 'warning' | 'danger';
  description: string;
  prediction: string;
}) => {
  const variantStyles = {
    default: 'border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100',
    success: 'border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100',
    warning: 'border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100',
    danger: 'border-red-200 bg-gradient-to-br from-red-50 to-red-100'
  };

  const iconStyles = {
    default: 'text-slate-600',
    success: 'text-emerald-600',
    warning: 'text-amber-600',
    danger: 'text-red-600'
  };

  const glowStyles = {
    default: 'shadow-slate-200/50',
    success: 'shadow-emerald-200/50',
    warning: 'shadow-amber-200/50',
    danger: 'shadow-red-200/50'
  };

  return (
    <CorporateCard variant="elevated" padding="lg" className={`border-l-4 ${variantStyles[variant]} shadow-lg ${glowStyles[variant]} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-white/60 ${iconStyles[variant]}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700">{title}</p>
              <p className="text-xs text-slate-500">{description}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-baseline space-x-2">
            <p className="text-3xl font-bold text-slate-900">{value}</p>
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
          </div>
          
          <div className="p-2 bg-white/40 rounded-lg border border-slate-200/50">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-3 h-3 text-slate-400" />
              <p className="text-xs text-slate-600 font-medium">Analytics:</p>
            </div>
            <p className="text-xs text-slate-500 mt-1">{prediction}</p>
          </div>
        </div>
      </div>
    </CorporateCard>
  );
};

const EntityCard: React.FC<{ entity: Entity }> = ({ entity }) => {
  const StatusIcon = statusConfig[entity.status].icon
  const isFilingDue = new Date(entity.nextFilingDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

  return (
    <CorporateCard variant="elevated" padding="lg" hover interactive className="border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="space-y-4">
        {/* Enhanced Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <div className="p-2 bg-gradient-to-br from-corporate-100 to-corporate-200 rounded-lg">
                <Building className="w-4 h-4 text-corporate-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{entity.name}</h3>
              {isFilingDue && (
                <span className="px-2 py-1 text-xs bg-gradient-to-r from-red-100 to-red-200 text-red-800 rounded-full border border-red-300 font-semibold">
                  Filing Due
                </span>
              )}
            </div>
            <p className="text-sm text-slate-600 flex items-center mb-2">
              <Globe className="w-4 h-4 mr-2 text-slate-400" />
              {entity.type} • {entity.jurisdiction}
            </p>
            <p className="text-xs text-slate-500 italic">{entity.insights}</p>
          </div>
        </div>

        {/* Enhanced Status */}
        <div className="flex items-center space-x-2">
          <span className={cn(
            'px-3 py-1 text-xs font-semibold rounded-full flex items-center space-x-2 border',
            statusConfig[entity.status].color
          )}>
            <StatusIcon className="w-3 h-3" />
            <span>{statusConfig[entity.status].label}</span>
          </span>
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 border border-slate-300">
            {entity.complianceScore}
          </span>
        </div>

        {/* AI Confidence & Risk */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 font-medium">Confidence Score:</span>
            <div className="flex items-center space-x-2">
              <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
                  style={{ width: entity.confidence }}
                ></div>
              </div>
              <span className="font-semibold text-slate-700">{entity.confidence}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 font-medium">Risk Level:</span>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
              entity.riskLevel.includes('Ultra') || entity.riskLevel === 'Minimal' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
              entity.riskLevel.includes('Low') ? 'bg-green-100 text-green-800 border border-green-200' :
              entity.riskLevel.includes('Medium') ? 'bg-amber-100 text-amber-800 border border-amber-200' :
              'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {entity.riskLevel}
            </span>
          </div>
        </div>

        {/* Enhanced Entity Details */}
        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-200">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Inc: {new Date(entity.incorporationDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <FileText className="w-4 h-4 text-slate-400" />
              <span>Filing: {new Date(entity.nextFilingDate).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Users className="w-4 h-4 text-slate-400" />
              <span>{entity.directors} Directors</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Briefcase className="w-4 h-4 text-slate-400" />
              <span>{entity.shareholders} Shareholders</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200">
          <CorporateButton variant="ghost" size="sm" className="text-corporate-600 hover:bg-corporate-50">
            <Eye className="w-4 h-4 mr-1" />
            View Details
          </CorporateButton>
          <CorporateButton variant="ghost" size="sm" className="text-slate-600 hover:bg-slate-50">
            <ChevronRight className="w-4 h-4" />
          </CorporateButton>
        </div>
      </div>
    </CorporateCard>
  )
}

const CompanySecretarial: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const stats = {
    total: entities.length,
    active: entities.filter(e => e.status === 'active').length,
    pending: entities.filter(e => e.status === 'pending').length,
    filingsDue: entities.filter(e => 
      new Date(e.nextFilingDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    ).length
  }

  return (
    <CorporateLayout>
      <div className="space-y-8">
        {/* Professional Header */}
        <div className="relative bg-gradient-to-r from-corporate-600 via-corporate-700 to-corporate-800 rounded-2xl p-8 text-white overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-4 left-4 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 right-4 w-48 h-48 bg-cyan-400/10 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                    Company Secretarial
                  </h1>
                  <p className="text-corporate-100 text-lg flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-cyan-300" />
                    <span>Advanced corporate governance & entity management</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-green-400" />
                  <span className="text-green-200">System Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileCheck className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-200">Compliance Monitoring</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-200">Advanced Analytics</span>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <Building className="w-16 h-16 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                  <Activity className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 mt-8 flex flex-wrap gap-4">
            <CorporateButton variant="secondary" size="md" className="bg-white/10 border-white/20 hover:bg-white/20 backdrop-blur-sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Entity
            </CorporateButton>
            <CorporateButton variant="ghost" size="md" className="text-white border-white/20 hover:bg-white/10 backdrop-blur-sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics Dashboard
            </CorporateButton>
            <CorporateButton variant="ghost" size="md" className="text-white border-white/20 hover:bg-white/10 backdrop-blur-sm">
              <Shield className="w-4 h-4 mr-2" />
              Governance Reports
            </CorporateButton>
          </div>
        </div>

        {/* Entity Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {entityMetrics.map((metric, index) => (
            <EntityStatCard key={index} {...metric} />
          ))}
        </div>

        {/* Enhanced Search */}
        <CorporateCard variant="elevated" padding="lg" className="shadow-lg border border-slate-200">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search professional entities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent bg-white shadow-sm"
              />
            </div>
            <div className="flex items-center space-x-2">
              <CorporateButton variant="ghost" size="sm" className="border-slate-200">
                <Activity className="w-4 h-4 mr-2" />
                Smart Sort
              </CorporateButton>
              <CorporateButton variant="ghost" size="sm" className="border-slate-200">
                <Database className="w-4 h-4 mr-2" />
                Advanced View
              </CorporateButton>
            </div>
          </div>
        </CorporateCard>

        {/* Enhanced Entities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {entities.map((entity) => (
            <EntityCard key={entity.id} entity={entity} />
          ))}
        </div>

        {/* Business Analytics Footer */}
        <CorporateCard variant="elevated" padding="lg" className="shadow-lg border border-slate-200">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-corporate-600" />
                <span className="text-slate-700">Processing complete</span>
              </div>
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4 text-yellow-600" />
                <span className="text-slate-700">Data sync active</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-purple-600" />
                <span className="text-slate-700">Analytics enabled</span>
              </div>
            </div>
            <div className="text-slate-600">
              Last updated: <span className="font-medium">Just now</span>
            </div>
          </div>
        </CorporateCard>
      </div>
    </CorporateLayout>
  )
}

export default CompanySecretarial
