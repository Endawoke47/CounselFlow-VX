import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CorporateLayout } from '@/components/corporate/CorporateLayout'
import { CorporateCard, CorporateCardContent, CorporateCardHeader } from '@/components/corporate/CorporateCard'
import { CorporateButton } from '@/components/corporate/CorporateButton'
import { TemporalTabs, RealTimeMetricsCard } from '@/components/temporal/TemporalAnalytics'
import { useTemporalData } from '@/hooks/useTemporalData'
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
  BookOpen,
  Award,
  XCircle,
  ExternalLink,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Bell,
  RefreshCw,
  Building2,
  Scale,
  Globe,
  Briefcase,
  DollarSign,
  Timer,
  Calendar as CalendarIcon,
  Gauge
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Treemap,
  ComposedChart
} from 'recharts'
import { demoData, ComplianceItem, RegulatoryUpdate, ComplianceAudit } from '@/data/demoData'

const RegulatoryComplianceEnhanced: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'tracking' | 'audits' | 'updates' | 'reports'>('overview')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  // Use temporal data hook
  const { activePeriod, setActivePeriod, data: temporalData } = useTemporalData('30d')

  // Get demo data
  const complianceItems = demoData.compliance
  const regulatoryUpdates = demoData.regulatoryUpdates
  const complianceAudits = demoData.complianceAudits

  // Filter data based on current selections
  const filteredCompliance = useMemo(() => {
    return complianceItems.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = filterStatus === 'all' || item.status === filterStatus
      const matchesCategory = filterCategory === 'all' || item.category === filterCategory
      return matchesSearch && matchesStatus && matchesCategory
    })
  }, [complianceItems, searchQuery, filterStatus, filterCategory])

  // Calculate metrics
  const metrics = useMemo(() => {
    const total = complianceItems.length
    const compliant = complianceItems.filter(item => item.status === 'Compliant').length
    const nonCompliant = complianceItems.filter(item => item.status === 'Non-Compliant').length
    const overdue = complianceItems.filter(item => item.status === 'Overdue').length
    const avgScore = complianceItems.reduce((sum, item) => sum + item.complianceScore, 0) / total

    return {
      totalItems: total,
      compliantPercentage: Math.round((compliant / total) * 100),
      nonCompliantCount: nonCompliant,
      overdueCount: overdue,
      averageScore: Math.round(avgScore),
      criticalItems: complianceItems.filter(item => item.priority === 'Critical').length,
      upcomingAudits: complianceAudits.filter(audit => audit.status === 'Scheduled').length,
      newUpdates: regulatoryUpdates.filter(update => update.status === 'New').length
    }
  }, [complianceItems, complianceAudits, regulatoryUpdates])

  // Chart data preparation
  const complianceStatusData = [
    { name: 'Compliant', value: complianceItems.filter(item => item.status === 'Compliant').length, color: '#22c55e' },
    { name: 'In Progress', value: complianceItems.filter(item => item.status === 'In Progress').length, color: '#3b82f6' },
    { name: 'Pending Review', value: complianceItems.filter(item => item.status === 'Pending Review').length, color: '#f59e0b' },
    { name: 'Non-Compliant', value: complianceItems.filter(item => item.status === 'Non-Compliant').length, color: '#ef4444' },
    { name: 'Overdue', value: complianceItems.filter(item => item.status === 'Overdue').length, color: '#dc2626' }
  ]

  const categoryBreakdownData = [
    { category: 'Data Protection', items: complianceItems.filter(item => item.category === 'Data Protection').length },
    { category: 'Financial', items: complianceItems.filter(item => item.category === 'Financial').length },
    { category: 'Environmental', items: complianceItems.filter(item => item.category === 'Environmental').length },
    { category: 'Health & Safety', items: complianceItems.filter(item => item.category === 'Health & Safety').length },
    { category: 'Anti-Corruption', items: complianceItems.filter(item => item.category === 'Anti-Corruption').length },
    { category: 'Employment', items: complianceItems.filter(item => item.category === 'Employment').length }
  ]

  const complianceScoreTrendData = [
    { month: 'Jan', score: 89 },
    { month: 'Feb', score: 91 },
    { month: 'Mar', score: 88 },
    { month: 'Apr', score: 92 },
    { month: 'May', score: 90 },
    { month: 'Jun', score: 94 },
    { month: 'Jul', score: 93 }
  ]

  const riskMatrixData = [
    { area: 'Data Protection', impact: 5, likelihood: 4, current: 94 },
    { area: 'Financial', impact: 5, likelihood: 3, current: 87 },
    { area: 'Environmental', impact: 3, likelihood: 2, current: 78 },
    { area: 'Health & Safety', impact: 4, likelihood: 2, current: 96 },
    { area: 'Anti-Corruption', impact: 5, likelihood: 2, current: 91 }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Compliant': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'Non-Compliant': return <XCircle className="w-4 h-4 text-red-600" />
      case 'In Progress': return <Clock className="w-4 h-4 text-blue-600" />
      case 'Pending Review': return <AlertCircle className="w-4 h-4 text-yellow-600" />
      case 'Overdue': return <AlertTriangle className="w-4 h-4 text-red-600" />
      default: return <AlertCircle className="w-4 h-4 text-slate-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full'
    switch (status) {
      case 'Compliant':
        return `${baseClasses} bg-green-100 text-green-800`
      case 'Non-Compliant':
        return `${baseClasses} bg-red-100 text-red-800`
      case 'In Progress':
        return `${baseClasses} bg-blue-100 text-blue-800`
      case 'Pending Review':
        return `${baseClasses} bg-yellow-100 text-yellow-800`
      case 'Overdue':
        return `${baseClasses} bg-red-100 text-red-800`
      default:
        return `${baseClasses} bg-slate-100 text-slate-800`
    }
  }

  const getPriorityBadge = (priority: string) => {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full'
    switch (priority) {
      case 'Critical':
        return `${baseClasses} bg-red-100 text-red-800`
      case 'High':
        return `${baseClasses} bg-orange-100 text-orange-800`
      case 'Medium':
        return `${baseClasses} bg-yellow-100 text-yellow-800`
      case 'Low':
        return `${baseClasses} bg-green-100 text-green-800`
      default:
        return `${baseClasses} bg-slate-100 text-slate-800`
    }
  }

  const getImpactBadge = (impact: string) => {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full'
    switch (impact) {
      case 'Critical':
        return `${baseClasses} bg-red-100 text-red-800`
      case 'High':
        return `${baseClasses} bg-orange-100 text-orange-800`
      case 'Medium':
        return `${baseClasses} bg-yellow-100 text-yellow-800`
      case 'Low':
        return `${baseClasses} bg-green-100 text-green-800`
      default:
        return `${baseClasses} bg-slate-100 text-slate-800`
    }
  }

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Temporal Analytics Controls */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Analytics Period</h3>
          <TemporalTabs 
            activePeriod={activePeriod}
            onPeriodChange={setActivePeriod}
          />
        </div>
        
        {/* Real-time Metrics */}
        <RealTimeMetricsCard metrics={temporalData.metrics} />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CorporateCard className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CorporateCardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Compliance Score</p>
                  <p className="text-2xl font-bold text-green-900">{metrics.averageScore}%</p>
                  <p className="text-sm text-green-600 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +2.5% from last month
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CorporateCardContent>
          </CorporateCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <CorporateCard className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CorporateCardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Active Items</p>
                  <p className="text-2xl font-bold text-blue-900">{metrics.totalItems}</p>
                  <p className="text-sm text-blue-600 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    {metrics.compliantPercentage}% compliant
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CorporateCardContent>
          </CorporateCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <CorporateCard className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CorporateCardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-600">Critical Items</p>
                  <p className="text-2xl font-bold text-yellow-900">{metrics.criticalItems}</p>
                  <p className="text-sm text-yellow-600 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    Require immediate attention
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CorporateCardContent>
          </CorporateCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <CorporateCard className="bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200">
            <CorporateCardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Upcoming Audits</p>
                  <p className="text-2xl font-bold text-purple-900">{metrics.upcomingAudits}</p>
                  <p className="text-sm text-purple-600 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Next 30 days
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Search className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CorporateCardContent>
          </CorporateCard>
        </motion.div>
      </div>

      {/* Temporal Analytics Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <CorporateCard>
          <CorporateCardHeader>
            <h3 className="text-lg font-semibold flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Compliance Activity - {activePeriod.toUpperCase()}
            </h3>
          </CorporateCardHeader>
          <CorporateCardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {(() => {
                  const currentData = temporalData as any;
                  
                  if (activePeriod === '24h' && currentData.hourlyData) {
                    return (
                      <AreaChart data={currentData.hourlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" tickFormatter={(value) => `${value}:00`} />
                        <YAxis />
                        <Tooltip labelFormatter={(value) => `Hour: ${value}:00`} />
                        <Area 
                          type="monotone" 
                          dataKey="activity" 
                          stroke="#3b82f6" 
                          fill="#3b82f6" 
                          fillOpacity={0.3} 
                          name="Activity"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="alerts" 
                          stroke="#ef4444" 
                          fill="#ef4444" 
                          fillOpacity={0.3} 
                          name="Alerts"
                        />
                      </AreaChart>
                    );
                  }
                  
                  if (activePeriod === '7d' && currentData.dailyData) {
                    return (
                      <AreaChart data={currentData.dailyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                        <YAxis />
                        <Tooltip labelFormatter={(value) => new Date(value).toLocaleDateString()} />
                        <Area 
                          type="monotone" 
                          dataKey="activity" 
                          stroke="#3b82f6" 
                          fill="#3b82f6" 
                          fillOpacity={0.3} 
                          name="Activity"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="completed" 
                          stroke="#10b981" 
                          fill="#10b981" 
                          fillOpacity={0.3} 
                          name="Completed"
                        />
                      </AreaChart>
                    );
                  }
                  
                  if (activePeriod === '30d' && currentData.weeklyData) {
                    return (
                      <BarChart data={currentData.weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="items" fill="#8b5cf6" name="Items" />
                        <Bar dataKey="efficiency" fill="#10b981" name="Efficiency %" />
                      </BarChart>
                    );
                  }
                  
                  if (activePeriod === '90d' && currentData.monthlyData) {
                    return (
                      <AreaChart data={currentData.monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="items" 
                          stroke="#8b5cf6" 
                          fill="#8b5cf6" 
                          fillOpacity={0.3} 
                          name="Items"
                        />
                      </AreaChart>
                    );
                  }
                  
                  return <div className="flex items-center justify-center h-full text-gray-500">No data available</div>;
                })()}
              </ResponsiveContainer>
            </div>
            
            {/* Insights based on temporal data */}
            <div className="mt-4 p-4 bg-slate-50 rounded-lg">
              <h4 className="font-medium text-slate-900 mb-2">Period Insights</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                {(() => {
                  const currentData = temporalData as any;
                  const insights = [];
                  
                  // Basic insights
                  if (currentData.insights) {
                    currentData.insights.forEach((insight: string, index: number) => {
                      insights.push(
                        <div key={`insight-${index}`} className="flex items-center text-slate-600">
                          <Activity className="w-4 h-4 mr-2 text-blue-500" />
                          {insight}
                        </div>
                      );
                    });
                  }
                  
                  // Trends
                  if (currentData.trends) {
                    insights.push(
                      <div key="activity-trend" className="flex items-center text-slate-600">
                        <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                        Activity: {currentData.trends.activityTrend}
                      </div>,
                      <div key="completion-trend" className="flex items-center text-slate-600">
                        <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
                        Completion: {currentData.trends.completionTrend}
                      </div>,
                      <div key="risk-trend" className="flex items-center text-slate-600">
                        <Shield className="w-4 h-4 mr-2 text-purple-500" />
                        Risk: {currentData.trends.riskTrend}
                      </div>
                    );
                  }
                  
                  // Business Impact
                  if (currentData.businessImpact) {
                    insights.push(
                      <div key="total-value" className="flex items-center text-slate-600">
                        <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                        Total Value: ${currentData.businessImpact.totalValue?.toLocaleString()}
                      </div>,
                      <div key="cost-savings" className="flex items-center text-slate-600">
                        <Target className="w-4 h-4 mr-2 text-blue-500" />
                        Cost Savings: ${currentData.businessImpact.costSavings?.toLocaleString()}
                      </div>,
                      <div key="risk-reduction" className="flex items-center text-slate-600">
                        <Shield className="w-4 h-4 mr-2 text-purple-500" />
                        Risk Reduction: {currentData.businessImpact.riskReduction}%
                      </div>
                    );
                  }
                  
                  // Strategic Impact
                  if (currentData.strategicImpact) {
                    insights.push(
                      <div key="value-managed" className="flex items-center text-slate-600">
                        <Building2 className="w-4 h-4 mr-2 text-green-500" />
                        Value Managed: ${(currentData.strategicImpact.valueManaged / 1000000).toFixed(1)}M
                      </div>,
                      <div key="risk-mitigation" className="flex items-center text-slate-600">
                        <Shield className="w-4 h-4 mr-2 text-blue-500" />
                        Risk Mitigation: ${(currentData.strategicImpact.riskMitigation / 1000000).toFixed(1)}M
                      </div>,
                      <div key="compliance-savings" className="flex items-center text-slate-600">
                        <CheckCircle className="w-4 h-4 mr-2 text-purple-500" />
                        Compliance Savings: ${(currentData.strategicImpact.complianceSavings / 1000000).toFixed(1)}M
                      </div>
                    );
                  }
                  
                  return insights.length > 0 ? insights : (
                    <div className="flex items-center text-slate-600">
                      <Activity className="w-4 h-4 mr-2 text-blue-500" />
                      Analytics data for {activePeriod.toUpperCase()}
                    </div>
                  );
                })()}
              </div>
            </div>
          </CorporateCardContent>
        </CorporateCard>
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Status Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <CorporateCard>
            <CorporateCardHeader>
              <h3 className="text-lg font-semibold flex items-center">
                <PieChart className="w-5 h-5 mr-2" />
                Compliance Status Distribution
              </h3>
            </CorporateCardHeader>
            <CorporateCardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={complianceStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {complianceStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {complianceStatusData.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-slate-600">{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </CorporateCardContent>
          </CorporateCard>
        </motion.div>

        {/* Compliance Score Trend */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <CorporateCard>
            <CorporateCardHeader>
              <h3 className="text-lg font-semibold flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Compliance Score Trend
              </h3>
            </CorporateCardHeader>
            <CorporateCardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={complianceScoreTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[80, 100]} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CorporateCardContent>
          </CorporateCard>
        </motion.div>
      </div>

      {/* Category Breakdown and Risk Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <CorporateCard>
            <CorporateCardHeader>
              <h3 className="text-lg font-semibold flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Compliance Items by Category
              </h3>
            </CorporateCardHeader>
            <CorporateCardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryBreakdownData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="category" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="items" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CorporateCardContent>
          </CorporateCard>
        </motion.div>

        {/* Risk Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <CorporateCard>
            <CorporateCardHeader>
              <h3 className="text-lg font-semibold flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Compliance Risk Assessment
              </h3>
            </CorporateCardHeader>
            <CorporateCardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={riskMatrixData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="area" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="Current Score"
                      dataKey="current"
                      stroke="#22c55e"
                      fill="#22c55e"
                      fillOpacity={0.3}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CorporateCardContent>
          </CorporateCard>
        </motion.div>
      </div>

      {/* Recent Regulatory Updates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <CorporateCard>
          <CorporateCardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Recent Regulatory Updates
              </h3>
              <CorporateButton variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                View All
              </CorporateButton>
            </div>
          </CorporateCardHeader>
          <CorporateCardContent>
            <div className="space-y-4">
              {regulatoryUpdates.slice(0, 3).map((update, index) => (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                  className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg"
                >
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Scale className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-slate-900">{update.title}</h4>
                        <p className="text-sm text-slate-600 mt-1">{update.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs text-slate-500">
                            Effective: {update.effectiveDate.toLocaleDateString()}
                          </span>
                          <span className={getImpactBadge(update.impact)}>
                            {update.impact} Impact
                          </span>
                        </div>
                      </div>
                      <CorporateButton variant="ghost" size="sm">
                        <ArrowUpRight className="w-4 h-4" />
                      </CorporateButton>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CorporateCardContent>
        </CorporateCard>
      </motion.div>
    </div>
  )

  const renderTrackingTab = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search compliance items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="Compliant">Compliant</option>
          <option value="Non-Compliant">Non-Compliant</option>
          <option value="In Progress">In Progress</option>
          <option value="Pending Review">Pending Review</option>
          <option value="Overdue">Overdue</option>
        </select>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          <option value="Data Protection">Data Protection</option>
          <option value="Financial">Financial</option>
          <option value="Environmental">Environmental</option>
          <option value="Health & Safety">Health & Safety</option>
          <option value="Anti-Corruption">Anti-Corruption</option>
          <option value="Employment">Employment</option>
        </select>
        <CorporateButton>
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </CorporateButton>
      </div>

      {/* Compliance Items List */}
      <div className="space-y-4">
        {filteredCompliance.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <CorporateCard className="hover:shadow-md transition-shadow">
              <CorporateCardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getStatusIcon(item.status)}
                      <h3 className="font-semibold text-slate-900">{item.title}</h3>
                      <span className={getStatusBadge(item.status)}>{item.status}</span>
                      <span className={getPriorityBadge(item.priority)}>{item.priority}</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{item.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-slate-500">Category:</span>
                        <p className="font-medium">{item.category}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Due Date:</span>
                        <p className="font-medium">{item.dueDate.toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Assignee:</span>
                        <p className="font-medium">{item.assignee}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Score:</span>
                        <p className="font-medium">{item.complianceScore}%</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-slate-500">Compliance Score</span>
                        <span className="text-sm font-medium">{item.complianceScore}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            item.complianceScore >= 90 ? 'bg-green-500' :
                            item.complianceScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${item.complianceScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <CorporateButton variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </CorporateButton>
                    <CorporateButton variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </CorporateButton>
                  </div>
                </div>
              </CorporateCardContent>
            </CorporateCard>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderAuditsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Compliance Audits</h2>
        <CorporateButton>
          <Plus className="w-4 h-4 mr-2" />
          Schedule Audit
        </CorporateButton>
      </div>

      <div className="space-y-4">
        {complianceAudits.map((audit, index) => (
          <motion.div
            key={audit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <CorporateCard>
              <CorporateCardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{audit.title}</h3>
                    <p className="text-slate-600">{audit.auditor}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={getStatusBadge(audit.status)}>{audit.status}</span>
                    <span className="text-sm px-2 py-1 bg-slate-100 text-slate-700 rounded">{audit.type}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-slate-500">Start Date</span>
                    <p className="font-medium">{audit.startDate.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-sm text-slate-500">End Date</span>
                    <p className="font-medium">{audit.endDate.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-sm text-slate-500">Cost</span>
                    <p className="font-medium">${audit.cost.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-sm text-slate-500">Rating</span>
                    <p className="font-medium">{audit.overallRating}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-sm text-slate-500 block mb-2">Scope</span>
                  <div className="flex flex-wrap gap-2">
                    {audit.scope.map((item, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {audit.findings.length > 0 && (
                  <div>
                    <span className="text-sm text-slate-500 block mb-2">
                      Findings ({audit.findings.length})
                    </span>
                    <div className="space-y-2">
                      {audit.findings.map((finding, idx) => (
                        <div key={finding.id} className="p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">{finding.category}</span>
                            <span className={getPriorityBadge(finding.severity)}>{finding.severity}</span>
                          </div>
                          <p className="text-sm text-slate-600 mb-1">{finding.description}</p>
                          <p className="text-xs text-slate-500">
                            Assigned to: {finding.assignee} | Due: {finding.dueDate.toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CorporateCardContent>
            </CorporateCard>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderUpdatesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Regulatory Updates</h2>
        <CorporateButton>
          <RefreshCw className="w-4 h-4 mr-2" />
          Check for Updates
        </CorporateButton>
      </div>

      <div className="space-y-4">
        {regulatoryUpdates.map((update, index) => (
          <motion.div
            key={update.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <CorporateCard>
              <CorporateCardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{update.title}</h3>
                    <p className="text-slate-600 mb-3">{update.description}</p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <span className={getStatusBadge(update.status)}>{update.status}</span>
                    <span className={getImpactBadge(update.impact)}>{update.impact}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-slate-500">Effective Date</span>
                    <p className="font-medium">{update.effectiveDate.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-sm text-slate-500">Regulatory Body</span>
                    <p className="font-medium">{update.regulatoryBody}</p>
                  </div>
                  <div>
                    <span className="text-sm text-slate-500">Estimated Cost</span>
                    <p className="font-medium">${update.estimatedCost.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-sm text-slate-500">Assigned To</span>
                    <p className="font-medium">{update.assignedTo}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-sm text-slate-500 block mb-2">Affected Areas</span>
                  <div className="flex flex-wrap gap-2">
                    {update.affectedAreas.map((area, idx) => (
                      <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    Implementation Deadline: {update.implementationDeadline.toLocaleDateString()}
                  </span>
                  <div className="flex items-center space-x-2">
                    <CorporateButton variant="ghost" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </CorporateButton>
                    <CorporateButton variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </CorporateButton>
                  </div>
                </div>
              </CorporateCardContent>
            </CorporateCard>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderReportsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Compliance Reports</h2>
        <div className="flex items-center space-x-4">
          <TemporalTabs 
            activePeriod={activePeriod}
            onPeriodChange={setActivePeriod}
            className="flex-1"
          />
          <CorporateButton>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </CorporateButton>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CorporateCard>
          <CorporateCardContent className="p-6 text-center">
            <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-green-600">{metrics.compliantPercentage}%</h3>
            <p className="text-slate-600">Overall Compliance Rate</p>
          </CorporateCardContent>
        </CorporateCard>

        <CorporateCard>
          <CorporateCardContent className="p-6 text-center">
            <div className="p-3 bg-yellow-100 rounded-full w-fit mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-yellow-600">{metrics.criticalItems}</h3>
            <p className="text-slate-600">Critical Items</p>
          </CorporateCardContent>
        </CorporateCard>

        <CorporateCard>
          <CorporateCardContent className="p-6 text-center">
            <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-4">
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-blue-600">{metrics.averageScore}</h3>
            <p className="text-slate-600">Average Compliance Score</p>
          </CorporateCardContent>
        </CorporateCard>
      </div>

      {/* Detailed Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CorporateCard>
          <CorporateCardHeader>
            <h3 className="text-lg font-semibold">Compliance Trends</h3>
          </CorporateCardHeader>
          <CorporateCardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={complianceScoreTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CorporateCardContent>
        </CorporateCard>

        <CorporateCard>
          <CorporateCardHeader>
            <h3 className="text-lg font-semibold">Risk Assessment</h3>
          </CorporateCardHeader>
          <CorporateCardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={riskMatrixData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="area" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="current" fill="#22c55e" name="Current Score" />
                  <Line type="monotone" dataKey="impact" stroke="#ef4444" name="Risk Impact" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CorporateCardContent>
        </CorporateCard>
      </div>
    </div>
  )

  return (
    <CorporateLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Regulatory Compliance Management</h1>
          <p className="text-slate-600">Monitor, track, and manage regulatory compliance across your organization</p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-slate-200 mb-6">
          <nav className="flex space-x-8">
            {[
              { key: 'overview', label: 'Overview', icon: BarChart3 },
              { key: 'tracking', label: 'Compliance Tracking', icon: CheckCircle },
              { key: 'audits', label: 'Audits', icon: Search },
              { key: 'updates', label: 'Regulatory Updates', icon: Bell },
              { key: 'reports', label: 'Reports', icon: FileText }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key as 'overview' | 'tracking' | 'audits' | 'updates' | 'reports')}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  selectedTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {selectedTab === 'overview' && renderOverviewTab()}
            {selectedTab === 'tracking' && renderTrackingTab()}
            {selectedTab === 'audits' && renderAuditsTab()}
            {selectedTab === 'updates' && renderUpdatesTab()}
            {selectedTab === 'reports' && renderReportsTab()}
          </motion.div>
        </AnimatePresence>
      </div>
    </CorporateLayout>
  )
}

export default RegulatoryComplianceEnhanced
