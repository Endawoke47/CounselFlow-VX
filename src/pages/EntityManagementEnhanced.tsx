import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CorporateLayout } from '@/components/corporate/CorporateLayout'
import { CorporateCard, CorporateCardContent, CorporateCardHeader } from '@/components/corporate/CorporateCard'
import { CorporateButton } from '@/components/corporate/CorporateButton'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  Treemap
} from 'recharts'
import { 
  Building,
  Users,
  FileText,
  Calendar,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Phone,
  Mail,
  Globe,
  TrendingUp,
  DollarSign,
  Shield,
  AlertTriangle,
  CheckCircle,
  Network,
  BarChart3,
  Activity,
  Map
} from 'lucide-react'
import { entitiesData, Entity } from '@/data/demoData'
import { cn } from '@/lib/utils'

const EntityManagementEnhanced: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  // Analytics calculations
  const analytics = useMemo(() => {
    const totalEntities = entitiesData.length
    const activeEntities = entitiesData.filter(e => e.status === 'Active').length
    const totalSubsidiaries = entitiesData.reduce((sum, e) => sum + e.subsidiaries.length, 0)
    const complianceIssues = entitiesData.filter(e => e.annualReportDue && new Date(e.annualReportDue) < new Date()).length

    // Entity distribution by type
    const typeDistribution = entitiesData.reduce((acc, entity) => {
      acc[entity.type] = (acc[entity.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Entity distribution by jurisdiction (take first jurisdiction)
    const jurisdictionDistribution = entitiesData.reduce((acc, entity) => {
      const jurisdiction = entity.jurisdiction[0] || 'Unknown'
      acc[jurisdiction] = (acc[jurisdiction] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Status distribution
    const statusDistribution = entitiesData.reduce((acc, entity) => {
      acc[entity.status] = (acc[entity.status] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return {
      totalEntities,
      activeEntities,
      totalSubsidiaries,
      complianceIssues,
      typeDistribution: Object.entries(typeDistribution).map(([type, count]) => ({ type, count })),
      jurisdictionDistribution: Object.entries(jurisdictionDistribution).map(([jurisdiction, count]) => ({ jurisdiction, count })),
      statusDistribution: Object.entries(statusDistribution).map(([status, count]) => ({ status, count }))
    }
  }, [])

  const filteredEntities = useMemo(() => {
    return entitiesData.filter(entity => {
      const matchesSearch = entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           entity.jurisdiction[0]?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = filterType === 'all' || entity.type === filterType
      const matchesStatus = filterStatus === 'all' || entity.status === filterStatus
      return matchesSearch && matchesType && matchesStatus
    })
  }, [searchTerm, filterType, filterStatus])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-100'
      case 'Inactive': return 'text-yellow-600 bg-yellow-100'
      case 'Dissolved': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const pieColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899']

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'entities', label: 'All Entities', icon: Building },
    { id: 'hierarchy', label: 'Entity Hierarchy', icon: Network },
    { id: 'compliance', label: 'Compliance', icon: Shield }
  ]

  return (
    <CorporateLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Entity Management</h1>
            <p className="text-slate-600">Manage your corporate entities and subsidiaries</p>
          </div>
          <CorporateButton className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Entity
          </CorporateButton>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <CorporateCard>
              <CorporateCardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Entities</p>
                    <p className="text-2xl font-bold text-slate-900">{analytics.totalEntities}</p>
                  </div>
                  <Building className="w-8 h-8 text-blue-600" />
                </div>
              </CorporateCardContent>
            </CorporateCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <CorporateCard>
              <CorporateCardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Active Entities</p>
                    <p className="text-2xl font-bold text-slate-900">{analytics.activeEntities}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CorporateCardContent>
            </CorporateCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <CorporateCard>
              <CorporateCardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Subsidiaries</p>
                    <p className="text-2xl font-bold text-slate-900">{analytics.totalSubsidiaries}</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
              </CorporateCardContent>
            </CorporateCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <CorporateCard>
              <CorporateCardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Compliance Issues</p>
                    <p className="text-2xl font-bold text-slate-900">{analytics.complianceIssues}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
              </CorporateCardContent>
            </CorporateCard>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-slate-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center py-2 px-1 border-b-2 font-medium text-sm",
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                )}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Entity Type Distribution */}
              <CorporateCard>
                <CorporateCardHeader>
                  <h3 className="text-lg font-medium">Entity Type Distribution</h3>
                </CorporateCardHeader>
                <CorporateCardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={analytics.typeDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ type, count }) => `${type}: ${count}`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {analytics.typeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CorporateCardContent>
              </CorporateCard>

              {/* Jurisdiction Distribution */}
              <CorporateCard>
                <CorporateCardHeader>
                  <h3 className="text-lg font-medium">Jurisdiction Distribution</h3>
                </CorporateCardHeader>
                <CorporateCardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analytics.jurisdictionDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="jurisdiction" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CorporateCardContent>
              </CorporateCard>

              {/* Status Overview */}
              <CorporateCard>
                <CorporateCardHeader>
                  <h3 className="text-lg font-medium">Status Overview</h3>
                </CorporateCardHeader>
                <CorporateCardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analytics.statusDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="status" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CorporateCardContent>
              </CorporateCard>

              {/* Recent Activity */}
              <CorporateCard>
                <CorporateCardHeader>
                  <h3 className="text-lg font-medium">Recent Entity Activity</h3>
                </CorporateCardHeader>
                <CorporateCardContent>
                  <div className="space-y-4">
                    {entitiesData.slice(0, 5).map((entity) => (
                      <div key={entity.id} className="flex items-center space-x-3">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          entity.status === 'Active' ? 'bg-green-500' :
                          entity.status === 'Inactive' ? 'bg-gray-500' : 'bg-red-500'
                        )} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">{entity.name}</p>
                          <p className="text-xs text-slate-600">{entity.type} • {entity.jurisdiction[0]}</p>
                        </div>
                        <span className="text-xs text-slate-500">
                          {new Date(entity.formationDate).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </CorporateCardContent>
              </CorporateCard>
            </motion.div>
          )}

          {activeTab === 'entities' && (
            <motion.div
              key="entities"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Filters */}
              <CorporateCard>
                <CorporateCardContent className="p-4">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-64">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Search entities..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 w-full border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Types</option>
                      <option value="Corporation">Corporation</option>
                      <option value="LLC">LLC</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Subsidiary">Subsidiary</option>
                      <option value="Joint Venture">Joint Venture</option>
                    </select>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Dissolved">Dissolved</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                </CorporateCardContent>
              </CorporateCard>

              {/* Entities Table */}
              <CorporateCard>
                <CorporateCardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Entity
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Jurisdiction
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Incorporation Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Documents
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-200">
                        {filteredEntities.map((entity) => (
                          <tr key={entity.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-slate-900">{entity.name}</div>
                                <div className="text-sm text-slate-500">{entity.id}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                              {entity.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                              {entity.jurisdiction[0]}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(entity.status)}`}>
                                {entity.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                              {new Date(entity.formationDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                              {entity.filingRequirements.length}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex items-center justify-end space-x-2">
                                <button className="text-blue-600 hover:text-blue-900">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button className="text-slate-600 hover:text-slate-900">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button className="text-slate-600 hover:text-slate-900">
                                  <MoreVertical className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CorporateCardContent>
              </CorporateCard>
            </motion.div>
          )}

          {activeTab === 'hierarchy' && (
            <motion.div
              key="hierarchy"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <CorporateCard>
                <CorporateCardHeader>
                  <h3 className="text-lg font-medium">Entity Hierarchy Tree</h3>
                  <p className="text-sm text-slate-600">Visualize the corporate structure and relationships</p>
                </CorporateCardHeader>
                <CorporateCardContent>
                  <ResponsiveContainer width="100%" height={500}>
                    <Treemap
                      data={entitiesData.map(entity => ({
                        name: entity.name,
                        size: entity.subsidiaries.length + 1,
                        type: entity.type
                      }))}
                      dataKey="size"
                      stroke="#fff"
                      fill="#3B82F6"
                    />
                  </ResponsiveContainer>
                </CorporateCardContent>
              </CorporateCard>
            </motion.div>
          )}

          {activeTab === 'compliance' && (
            <motion.div
              key="compliance"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Compliance Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CorporateCard>
                  <CorporateCardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Compliant Entities</p>
                        <p className="text-2xl font-bold text-green-600">
                          {entitiesData.filter(e => e.annualReportDue && new Date(e.annualReportDue) > new Date()).length}
                        </p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                  </CorporateCardContent>
                </CorporateCard>

                <CorporateCard>
                  <CorporateCardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Overdue Reports</p>
                        <p className="text-2xl font-bold text-red-600">{analytics.complianceIssues}</p>
                      </div>
                      <AlertTriangle className="w-8 h-8 text-red-600" />
                    </div>
                  </CorporateCardContent>
                </CorporateCard>

                <CorporateCard>
                  <CorporateCardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Due This Month</p>
                        <p className="text-2xl font-bold text-yellow-600">
                          {entitiesData.filter(e => {
                            if (!e.annualReportDue) return false
                            const dueDate = new Date(e.annualReportDue)
                            const now = new Date()
                            return dueDate.getMonth() === now.getMonth() && dueDate.getFullYear() === now.getFullYear()
                          }).length}
                        </p>
                      </div>
                      <Calendar className="w-8 h-8 text-yellow-600" />
                    </div>
                  </CorporateCardContent>
                </CorporateCard>
              </div>

              {/* Compliance Details */}
              <CorporateCard>
                <CorporateCardHeader>
                  <h3 className="text-lg font-medium">Compliance Status</h3>
                </CorporateCardHeader>
                <CorporateCardContent>
                  <div className="space-y-4">
                    {entitiesData.map((entity) => {
                      if (!entity.annualReportDue) return null
                      const dueDate = new Date(entity.annualReportDue)
                      const now = new Date()
                      const isOverdue = dueDate < now
                      const isDueSoon = dueDate > now && dueDate <= new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
                      
                      return (
                        <div key={entity.id} className="p-4 border border-slate-200 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-medium text-slate-900">{entity.name}</h4>
                              <p className="text-sm text-slate-600">{entity.type} • {entity.jurisdiction[0]}</p>
                              <div className="flex items-center space-x-4 mt-2">
                                <span className="text-sm text-slate-500">
                                  EIN: {entity.ein || 'N/A'}
                                </span>
                                <span className="text-sm text-slate-500">
                                  Score: {entity.complianceScore}%
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={cn(
                                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                isOverdue ? "bg-red-100 text-red-800" :
                                isDueSoon ? "bg-yellow-100 text-yellow-800" :
                                "bg-green-100 text-green-800"
                              )}>
                                {isOverdue ? 'Overdue' : isDueSoon ? 'Due Soon' : 'Current'}
                              </div>
                              <p className="text-sm text-slate-600 mt-1">
                                Due: {dueDate.toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CorporateCardContent>
              </CorporateCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </CorporateLayout>
  )
}

export default EntityManagementEnhanced
