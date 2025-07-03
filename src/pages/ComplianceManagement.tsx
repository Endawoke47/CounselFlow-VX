import React, { useState } from 'react'
import { CorporateLayout } from '@/components/corporate/CorporateLayout'
import { CorporateCard, CorporateCardContent, CorporateCardHeader } from '@/components/corporate/CorporateCard'
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
  BookOpen,
  Award,
  XCircle
} from 'lucide-react'

interface ComplianceMetric {
  id: string
  title: string
  value: string
  change: string
  trend: 'up' | 'down' | 'stable'
  status: 'good' | 'warning' | 'critical'
}

interface ComplianceItem {
  id: string
  title: string
  category: string
  status: 'compliant' | 'non-compliant' | 'pending' | 'overdue'
  dueDate: string
  assignee: string
  priority: 'high' | 'medium' | 'low'
  progress: number
}

interface RegulatoryUpdate {
  id: string
  title: string
  description: string
  effectiveDate: string
  impact: 'high' | 'medium' | 'low'
  status: 'new' | 'under-review' | 'implemented'
  category: string
}

const ComplianceManagement: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'tracking' | 'audits' | 'reports'>('overview')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const complianceMetrics: ComplianceMetric[] = [
    {
      id: '1',
      title: 'Overall Compliance Score',
      value: '94.2%',
      change: '+2.3%',
      trend: 'up',
      status: 'good'
    },
    {
      id: '2',
      title: 'Active Regulations',
      value: '127',
      change: '+5',
      trend: 'up',
      status: 'good'
    },
    {
      id: '3',
      title: 'Pending Reviews',
      value: '12',
      change: '-3',
      trend: 'down',
      status: 'warning'
    },
    {
      id: '4',
      title: 'Overdue Items',
      value: '3',
      change: '+1',
      trend: 'up',
      status: 'critical'
    }
  ]

  const complianceItems: ComplianceItem[] = [
    {
      id: '1',
      title: 'GDPR Data Processing Audit',
      category: 'Data Protection',
      status: 'compliant',
      dueDate: '2025-08-15',
      assignee: 'Sarah Johnson',
      priority: 'high',
      progress: 100
    },
    {
      id: '2',
      title: 'SOX Financial Controls Review',
      category: 'Financial Compliance',
      status: 'pending',
      dueDate: '2025-07-20',
      assignee: 'Michael Chen',
      priority: 'high',
      progress: 75
    },
    {
      id: '3',
      title: 'Anti-Money Laundering Training',
      category: 'Training & Awareness',
      status: 'overdue',
      dueDate: '2025-06-30',
      assignee: 'Emily Davis',
      priority: 'medium',
      progress: 45
    },
    {
      id: '4',
      title: 'ISO 27001 Security Assessment',
      category: 'Information Security',
      status: 'non-compliant',
      dueDate: '2025-09-01',
      assignee: 'David Wilson',
      priority: 'high',
      progress: 30
    }
  ]

  const regulatoryUpdates: RegulatoryUpdate[] = [
    {
      id: '1',
      title: 'EU AI Act Implementation',
      description: 'New regulations on artificial intelligence systems requiring compliance assessment',
      effectiveDate: '2025-08-02',
      impact: 'high',
      status: 'new',
      category: 'Technology Regulation'
    },
    {
      id: '2',
      title: 'Updated CCPA Privacy Rights',
      description: 'California Consumer Privacy Act amendments affecting data collection practices',
      effectiveDate: '2025-09-15',
      impact: 'medium',
      status: 'under-review',
      category: 'Privacy Law'
    },
    {
      id: '3',
      title: 'ESG Reporting Standards',
      description: 'New environmental, social, and governance disclosure requirements',
      effectiveDate: '2025-12-01',
      impact: 'high',
      status: 'implemented',
      category: 'Corporate Governance'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'non-compliant': return <XCircle className="w-4 h-4 text-red-600" />
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />
      case 'overdue': return <AlertTriangle className="w-4 h-4 text-red-600" />
      default: return <AlertCircle className="w-4 h-4 text-slate-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full'
    switch (status) {
      case 'compliant':
        return `${baseClasses} bg-green-100 text-green-800`
      case 'non-compliant':
        return `${baseClasses} bg-red-100 text-red-800`
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`
      case 'overdue':
        return `${baseClasses} bg-red-100 text-red-800`
      default:
        return `${baseClasses} bg-slate-100 text-slate-800`
    }
  }

  const getPriorityBadge = (priority: string) => {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full'
    switch (priority) {
      case 'high':
        return `${baseClasses} bg-red-100 text-red-800`
      case 'medium':
        return `${baseClasses} bg-yellow-100 text-yellow-800`
      case 'low':
        return `${baseClasses} bg-green-100 text-green-800`
      default:
        return `${baseClasses} bg-slate-100 text-slate-800`
    }
  }

  const getProgressColor = (progress: number, status: string) => {
    if (status === 'overdue') return 'bg-red-500'
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 50) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <CorporateLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Compliance Management</h1>
            <p className="text-slate-600 mt-2">Monitor regulatory compliance and manage audit processes</p>
          </div>
          <div className="flex items-center space-x-3">
            <CorporateButton variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </CorporateButton>
            <CorporateButton size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Compliance Item
            </CorporateButton>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {complianceMetrics.map((metric) => (
            <CorporateCard key={metric.id}>
              <CorporateCardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      metric.status === 'good' ? 'bg-green-100' :
                      metric.status === 'warning' ? 'bg-yellow-100' : 'bg-red-100'
                    }`}>
                      <Shield className={`w-5 h-5 ${
                        metric.status === 'good' ? 'text-green-600' :
                        metric.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                      }`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
                      <p className="text-sm text-slate-600">{metric.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {metric.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : metric.trend === 'down' ? (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    ) : (
                      <Activity className="w-4 h-4 text-slate-400" />
                    )}
                    <span className={`text-sm font-medium ${
                      metric.trend === 'up' ? 'text-green-600' :
                      metric.trend === 'down' ? 'text-red-600' : 'text-slate-400'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
              </CorporateCardContent>
            </CorporateCard>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-slate-200">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'tracking', label: 'Compliance Tracking', icon: Target },
              { id: 'audits', label: 'Audit Management', icon: Award },
              { id: 'reports', label: 'Reports & Analytics', icon: PieChart }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  selectedTab === tab.id
                    ? 'border-corporate-500 text-corporate-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content Based on Selected Tab */}
        {selectedTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Compliance Status Chart */}
            <CorporateCard>
              <CorporateCardHeader>
                <h3 className="text-lg font-semibold">Compliance Status Distribution</h3>
              </CorporateCardHeader>
              <CorporateCardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-slate-600">Compliant</span>
                    </div>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-slate-600">Pending Review</span>
                    </div>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-slate-600">Non-Compliant</span>
                    </div>
                    <span className="text-sm font-medium">7%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '7%' }}></div>
                  </div>
                </div>
              </CorporateCardContent>
            </CorporateCard>

            {/* Recent Regulatory Updates */}
            <CorporateCard>
              <CorporateCardHeader>
                <h3 className="text-lg font-semibold">Recent Regulatory Updates</h3>
              </CorporateCardHeader>
              <CorporateCardContent>
                <div className="space-y-4">
                  {regulatoryUpdates.slice(0, 3).map((update) => (
                    <div key={update.id} className="border-l-4 border-corporate-500 pl-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-slate-900">{update.title}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          update.impact === 'high' ? 'bg-red-100 text-red-800' :
                          update.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {update.impact.toUpperCase()} IMPACT
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{update.description}</p>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>Effective: {update.effectiveDate}</span>
                        <span>{update.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CorporateCardContent>
            </CorporateCard>
          </div>
        )}

        {selectedTab === 'tracking' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search compliance items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-corporate-500"
                >
                  <option value="all">All Status</option>
                  <option value="compliant">Compliant</option>
                  <option value="pending">Pending</option>
                  <option value="non-compliant">Non-Compliant</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
            </div>

            {/* Compliance Items Table */}
            <CorporateCard>
              <CorporateCardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="text-left py-3 px-6 text-sm font-medium text-slate-900">Item</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-slate-900">Category</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-slate-900">Status</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-slate-900">Progress</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-slate-900">Due Date</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-slate-900">Assignee</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-slate-900">Priority</th>
                        <th className="text-right py-3 px-6 text-sm font-medium text-slate-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {complianceItems.map((item) => (
                        <tr key={item.id} className="border-b border-slate-200 hover:bg-slate-50">
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-3">
                              {getStatusIcon(item.status)}
                              <span className="font-medium text-slate-900">{item.title}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-sm text-slate-600">{item.category}</td>
                          <td className="py-4 px-6">
                            <span className={getStatusBadge(item.status)}>
                              {item.status.replace('-', ' ').toUpperCase()}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-2">
                              <div className="w-full bg-slate-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${getProgressColor(item.progress, item.status)}`}
                                  style={{ width: `${item.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-slate-600 min-w-[3rem]">{item.progress}%</span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-sm text-slate-600">{item.dueDate}</td>
                          <td className="py-4 px-6 text-sm text-slate-600">{item.assignee}</td>
                          <td className="py-4 px-6">
                            <span className={getPriorityBadge(item.priority)}>
                              {item.priority.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center justify-end space-x-2">
                              <button className="p-1 hover:bg-slate-100 rounded">
                                <Eye className="w-4 h-4 text-slate-600" />
                              </button>
                              <button className="p-1 hover:bg-slate-100 rounded">
                                <Edit className="w-4 h-4 text-slate-600" />
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
          </div>
        )}

        {selectedTab === 'audits' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CorporateCard>
                <CorporateCardHeader>
                  <h3 className="text-lg font-semibold">Upcoming Audits</h3>
                </CorporateCardHeader>
                <CorporateCardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'SOX Compliance Audit', date: '2025-07-15', auditor: 'PwC', type: 'External' },
                      { name: 'Data Security Review', date: '2025-07-28', auditor: 'Internal Team', type: 'Internal' },
                      { name: 'GDPR Compliance Check', date: '2025-08-10', auditor: 'Deloitte', type: 'External' }
                    ].map((audit, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-slate-900">{audit.name}</h4>
                          <p className="text-sm text-slate-600">Auditor: {audit.auditor}</p>
                          <p className="text-sm text-slate-500">Date: {audit.date}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          audit.type === 'External' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {audit.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </CorporateCardContent>
              </CorporateCard>
            </div>

            <div>
              <CorporateCard>
                <CorporateCardHeader>
                  <h3 className="text-lg font-semibold">Audit Statistics</h3>
                </CorporateCardHeader>
                <CorporateCardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">15</div>
                      <div className="text-sm text-slate-600">Audits This Year</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">92%</div>
                      <div className="text-sm text-slate-600">Pass Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">8</div>
                      <div className="text-sm text-slate-600">Findings Resolved</div>
                    </div>
                  </div>
                </CorporateCardContent>
              </CorporateCard>
            </div>
          </div>
        )}

        {selectedTab === 'reports' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CorporateCard>
              <CorporateCardHeader>
                <h3 className="text-lg font-semibold">Compliance Trends</h3>
              </CorporateCardHeader>
              <CorporateCardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-300 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-600">Compliance trend chart would be displayed here</p>
                  </div>
                </div>
              </CorporateCardContent>
            </CorporateCard>

            <CorporateCard>
              <CorporateCardHeader>
                <h3 className="text-lg font-semibold">Risk Heat Map</h3>
              </CorporateCardHeader>
              <CorporateCardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-300 rounded-lg">
                  <div className="text-center">
                    <Target className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-600">Risk heat map visualization would be displayed here</p>
                  </div>
                </div>
              </CorporateCardContent>
            </CorporateCard>
          </div>
        )}
      </div>
    </CorporateLayout>
  )
}

export default ComplianceManagement
