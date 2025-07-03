import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CorporateLayout } from '@/components/corporate/CorporateLayout'
import { CorporateCard, CorporateCardContent, CorporateCardHeader } from '@/components/corporate/CorporateCard'
import { CorporateButton } from '@/components/corporate/CorporateButton'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts'
import {
  FileText,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
  Filter,
  Search,
  Plus,
  Download,
  Eye,
  Edit,
  MoreHorizontal,
  Activity,
  Target,
  Shield,
  BarChart3
} from 'lucide-react'
import { contractsData, Contract } from '@/data/demoData'
import { cn } from '@/lib/utils'

const ContractManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [riskFilter, setRiskFilter] = useState('all')

  // Analytics calculations
  const analytics = useMemo(() => {
    const totalValue = contractsData.reduce((sum, contract) => sum + contract.value, 0)
    const activeContracts = contractsData.filter(c => c.status === 'Active').length
    const expiringContracts = contractsData.filter(c => {
      const daysToExpiry = Math.ceil((c.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
      return daysToExpiry <= 90 && daysToExpiry > 0
    }).length
    const highRiskContracts = contractsData.filter(c => c.riskLevel === 'High' || c.riskLevel === 'Critical').length

    // Contract value by type
    const valueByType = contractsData.reduce((acc, contract) => {
      acc[contract.type] = (acc[contract.type] || 0) + contract.value
      return acc
    }, {} as Record<string, number>)

    // Status distribution
    const statusDistribution = contractsData.reduce((acc, contract) => {
      acc[contract.status] = (acc[contract.status] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Risk distribution
    const riskDistribution = contractsData.reduce((acc, contract) => {
      acc[contract.riskLevel] = (acc[contract.riskLevel] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return {
      totalValue,
      activeContracts,
      expiringContracts,
      highRiskContracts,
      valueByType: Object.entries(valueByType).map(([type, value]) => ({ type, value })),
      statusDistribution: Object.entries(statusDistribution).map(([status, count]) => ({ status, count })),
      riskDistribution: Object.entries(riskDistribution).map(([level, count]) => ({ level, count }))
    }
  }, [])

  // Filtered contracts
  const filteredContracts = useMemo(() => {
    return contractsData.filter(contract => {
      const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           contract.counterparty.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || contract.status === statusFilter
      const matchesRisk = riskFilter === 'all' || contract.riskLevel === riskFilter
      return matchesSearch && matchesStatus && matchesRisk
    })
  }, [searchTerm, statusFilter, riskFilter])

  const statusColors = {
    'Active': 'bg-green-500',
    'Pending': 'bg-yellow-500',
    'Expired': 'bg-red-500',
    'Terminated': 'bg-gray-500'
  }

  const riskColors = {
    'Low': '#10B981',
    'Medium': '#F59E0B',
    'High': '#EF4444',
    'Critical': '#7C2D12'
  }

  const pieColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'contracts', label: 'All Contracts', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'expiring', label: 'Expiring Soon', icon: AlertTriangle }
  ]

  return (
    <CorporateLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Contract Management</h1>
            <p className="text-slate-600">Manage and track all your legal contracts</p>
          </div>
          <CorporateButton className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Contract
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
                    <p className="text-sm font-medium text-slate-600">Total Value</p>
                    <p className="text-2xl font-bold text-slate-900">
                      ${(analytics.totalValue / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-600" />
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
                    <p className="text-sm font-medium text-slate-600">Active Contracts</p>
                    <p className="text-2xl font-bold text-slate-900">{analytics.activeContracts}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-blue-600" />
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
                    <p className="text-sm font-medium text-slate-600">Expiring Soon</p>
                    <p className="text-2xl font-bold text-slate-900">{analytics.expiringContracts}</p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-600" />
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
                    <p className="text-sm font-medium text-slate-600">High Risk</p>
                    <p className="text-2xl font-bold text-slate-900">{analytics.highRiskContracts}</p>
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
              {/* Contract Value by Type */}
              <CorporateCard>
                <CorporateCardHeader>
                  <h3 className="text-lg font-medium">Contract Value by Type</h3>
                </CorporateCardHeader>
                <CorporateCardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analytics.valueByType}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="type" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                      <Tooltip 
                        formatter={(value: number) => [`$${(value / 1000000).toFixed(2)}M`, 'Value']}
                      />
                      <Bar dataKey="value" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CorporateCardContent>
              </CorporateCard>

              {/* Status Distribution */}
              <CorporateCard>
                <CorporateCardHeader>
                  <h3 className="text-lg font-medium">Contract Status Distribution</h3>
                </CorporateCardHeader>
                <CorporateCardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={analytics.statusDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ status, count }) => `${status}: ${count}`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {analytics.statusDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CorporateCardContent>
              </CorporateCard>

              {/* Risk Distribution */}
              <CorporateCard>
                <CorporateCardHeader>
                  <h3 className="text-lg font-medium">Risk Level Distribution</h3>
                </CorporateCardHeader>
                <CorporateCardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analytics.riskDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="level" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#EF4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </CorporateCardContent>
              </CorporateCard>

              {/* Recent Activity */}
              <CorporateCard>
                <CorporateCardHeader>
                  <h3 className="text-lg font-medium">Recent Activity</h3>
                </CorporateCardHeader>
                <CorporateCardContent>
                  <div className="space-y-4">
                    {contractsData.slice(0, 5).map((contract) => (
                      <div key={contract.id} className="flex items-center space-x-3">
                        <div className={cn("w-2 h-2 rounded-full", statusColors[contract.status])} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">{contract.title}</p>
                          <p className="text-xs text-slate-600">{contract.counterparty}</p>
                        </div>
                        <span className="text-xs text-slate-500">
                          {contract.startDate.toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </CorporateCardContent>
              </CorporateCard>
            </motion.div>
          )}

          {activeTab === 'contracts' && (
            <motion.div
              key="contracts"
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
                          placeholder="Search contracts..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 w-full border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Status</option>
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Expired">Expired</option>
                      <option value="Terminated">Terminated</option>
                    </select>
                    <select
                      value={riskFilter}
                      onChange={(e) => setRiskFilter(e.target.value)}
                      className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Risk Levels</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                </CorporateCardContent>
              </CorporateCard>

              {/* Contracts Table */}
              <CorporateCard>
                <CorporateCardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Contract
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Counterparty
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Value
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Risk
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            End Date
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-200">
                        {filteredContracts.map((contract) => (
                          <tr key={contract.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-slate-900">{contract.title}</div>
                                <div className="text-sm text-slate-500">{contract.id}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                              {contract.counterparty}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                              {contract.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                              ${contract.value.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={cn(
                                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                contract.status === 'Active' && "bg-green-100 text-green-800",
                                contract.status === 'Pending' && "bg-yellow-100 text-yellow-800",
                                contract.status === 'Expired' && "bg-red-100 text-red-800",
                                contract.status === 'Terminated' && "bg-gray-100 text-gray-800"
                              )}>
                                {contract.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={cn(
                                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                contract.riskLevel === 'Low' && "bg-green-100 text-green-800",
                                contract.riskLevel === 'Medium' && "bg-yellow-100 text-yellow-800",
                                contract.riskLevel === 'High' && "bg-red-100 text-red-800",
                                contract.riskLevel === 'Critical' && "bg-red-200 text-red-900"
                              )}>
                                {contract.riskLevel}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                              {contract.endDate.toLocaleDateString()}
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
                                  <MoreHorizontal className="w-4 h-4" />
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

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Monthly Contract Activity */}
              <CorporateCard className="lg:col-span-2">
                <CorporateCardHeader>
                  <h3 className="text-lg font-medium">Contract Activity Trends</h3>
                </CorporateCardHeader>
                <CorporateCardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={[
                      { month: 'Jan', newContracts: 12, renewals: 8, terminated: 2 },
                      { month: 'Feb', newContracts: 15, renewals: 10, terminated: 3 },
                      { month: 'Mar', newContracts: 18, renewals: 12, terminated: 1 },
                      { month: 'Apr', newContracts: 22, renewals: 15, terminated: 4 },
                      { month: 'May', newContracts: 20, renewals: 18, terminated: 2 },
                      { month: 'Jun', newContracts: 25, renewals: 20, terminated: 5 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="newContracts" stackId="1" stroke="#3B82F6" fill="#3B82F6" />
                      <Area type="monotone" dataKey="renewals" stackId="1" stroke="#10B981" fill="#10B981" />
                      <Area type="monotone" dataKey="terminated" stackId="1" stroke="#EF4444" fill="#EF4444" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CorporateCardContent>
              </CorporateCard>
            </motion.div>
          )}

          {activeTab === 'expiring' && (
            <motion.div
              key="expiring"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <CorporateCard>
                <CorporateCardHeader>
                  <h3 className="text-lg font-medium">Contracts Expiring Soon</h3>
                  <p className="text-sm text-slate-600">Contracts expiring within 90 days</p>
                </CorporateCardHeader>
                <CorporateCardContent>
                  <div className="space-y-4">
                    {contractsData
                      .filter(contract => {
                        const daysToExpiry = Math.ceil((contract.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                        return daysToExpiry <= 90 && daysToExpiry > 0
                      })
                      .sort((a, b) => a.endDate.getTime() - b.endDate.getTime())
                      .map((contract) => {
                        const daysToExpiry = Math.ceil((contract.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                        return (
                          <div key={contract.id} className="p-4 border border-slate-200 rounded-lg">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="font-medium text-slate-900">{contract.title}</h4>
                                <p className="text-sm text-slate-600">{contract.counterparty}</p>
                                <div className="flex items-center space-x-4 mt-2">
                                  <span className="text-sm text-slate-500">
                                    Value: ${contract.value.toLocaleString()}
                                  </span>
                                  <span className="text-sm text-slate-500">
                                    Type: {contract.type}
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className={cn(
                                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                  daysToExpiry <= 30 ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                                )}>
                                  {daysToExpiry} days left
                                </div>
                                <p className="text-sm text-slate-600 mt-1">
                                  Expires: {contract.endDate.toLocaleDateString()}
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

export default ContractManagement
