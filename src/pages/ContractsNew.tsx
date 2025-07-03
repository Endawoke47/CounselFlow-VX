import React, { useState } from 'react'
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
  Activity
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Contract {
  id: string
  title: string
  counterparty: string
  type: string
  status: 'draft' | 'review' | 'active' | 'expired' | 'terminated'
  value: number
  startDate: string
  endDate: string
  renewalDate?: string
  department: string
  owner: string
  riskLevel: 'Low' | 'Medium' | 'High'
}

const mockContracts: Contract[] = [
  {
    id: 'C001',
    title: 'Software License Agreement',
    counterparty: 'Microsoft Corporation',
    type: 'License',
    status: 'active',
    value: 500000,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    renewalDate: '2024-11-01',
    department: 'IT',
    owner: 'John Smith',
    riskLevel: 'Low'
  },
  {
    id: 'C002',
    title: 'Vendor Services Agreement',
    counterparty: 'TechCorp Industries',
    type: 'Service',
    status: 'review',
    value: 250000,
    startDate: '2024-02-01',
    endDate: '2025-01-31',
    department: 'Operations',
    owner: 'Sarah Johnson',
    riskLevel: 'Medium'
  },
  {
    id: 'C003',
    title: 'Office Lease Agreement',
    counterparty: 'Prime Real Estate',
    type: 'Lease',
    status: 'active',
    value: 1200000,
    startDate: '2023-01-01',
    endDate: '2028-12-31',
    department: 'Facilities',
    owner: 'Mike Davis',
    riskLevel: 'Low'
  },
  {
    id: 'C004',
    title: 'Marketing Services Contract',
    counterparty: 'Creative Solutions Ltd',
    type: 'Service',
    status: 'draft',
    value: 75000,
    startDate: '2024-03-01',
    endDate: '2024-08-31',
    department: 'Marketing',
    owner: 'Emily Chen',
    riskLevel: 'Medium'
  },
  {
    id: 'C005',
    title: 'Equipment Purchase Agreement',
    counterparty: 'Industrial Equipment Co',
    type: 'Purchase',
    status: 'expired',
    value: 350000,
    startDate: '2023-06-01',
    endDate: '2024-01-15',
    department: 'Manufacturing',
    owner: 'Robert Wilson',
    riskLevel: 'High'
  },
  {
    id: 'C006',
    title: 'Cloud Services Agreement',
    counterparty: 'Amazon Web Services',
    type: 'Service',
    status: 'active',
    value: 180000,
    startDate: '2024-01-15',
    endDate: '2025-01-14',
    renewalDate: '2024-12-15',
    department: 'IT',
    owner: 'David Kim',
    riskLevel: 'Low'
  }
]

const statusConfig = {
  draft: { color: 'text-slate-700 bg-slate-100', icon: FileText },
  review: { color: 'text-amber-700 bg-amber-100', icon: Clock },
  active: { color: 'text-emerald-700 bg-emerald-100', icon: CheckCircle },
  expired: { color: 'text-red-700 bg-red-100', icon: AlertTriangle },
  terminated: { color: 'text-slate-700 bg-slate-100', icon: AlertTriangle }
}

const riskConfig = {
  Low: 'text-emerald-700 bg-emerald-100',
  Medium: 'text-amber-700 bg-amber-100',
  High: 'text-red-700 bg-red-100'
}

const ContractCard: React.FC<{ contract: Contract }> = ({ contract }) => {
  const StatusIcon = statusConfig[contract.status].icon
  const isExpiringSoon = contract.renewalDate && 
    new Date(contract.renewalDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

  return (
    <CorporateCard variant="elevated" padding="lg" hover interactive>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-semibold text-slate-900">{contract.title}</h3>
              {isExpiringSoon && (
                <span className="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full">
                  Renewal Due
                </span>
              )}
            </div>
            <p className="text-slate-600 text-sm">{contract.counterparty}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={cn(
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
              statusConfig[contract.status].color
            )}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
            </span>
          </div>
        </div>

        {/* Contract Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-500">Type:</span>
            <span className="ml-2 font-medium">{contract.type}</span>
          </div>
          <div>
            <span className="text-slate-500">Value:</span>
            <span className="ml-2 font-medium">${contract.value.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-slate-500">Owner:</span>
            <span className="ml-2 font-medium">{contract.owner}</span>
          </div>
          <div>
            <span className="text-slate-500">Department:</span>
            <span className="ml-2 font-medium">{contract.department}</span>
          </div>
          <div>
            <span className="text-slate-500">End Date:</span>
            <span className="ml-2 font-medium">{new Date(contract.endDate).toLocaleDateString()}</span>
          </div>
          <div>
            <span className="text-slate-500">Risk Level:</span>
            <span className={cn(
              'ml-2 px-2 py-1 rounded-full text-xs font-medium',
              riskConfig[contract.riskLevel]
            )}>
              {contract.riskLevel}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <div className="flex space-x-2">
            <CorporateButton variant="ghost" size="sm">
              <Eye className="w-4 h-4 mr-1" />
              View
            </CorporateButton>
            <CorporateButton variant="ghost" size="sm">
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </CorporateButton>
          </div>
          {contract.renewalDate && (
            <span className="text-xs text-slate-500">
              Renewal: {new Date(contract.renewalDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </CorporateCard>
  )
}

const Contracts = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredContracts = mockContracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.counterparty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || contract.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Calculate metrics
  const totalValue = mockContracts.reduce((sum, contract) => sum + contract.value, 0)
  const activeContracts = mockContracts.filter(c => c.status === 'active').length
  const expiringContracts = mockContracts.filter(c => 
    c.renewalDate && new Date(c.renewalDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  ).length

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'contracts', label: 'All Contracts', icon: FileText },
    { id: 'renewals', label: 'Renewals', icon: RefreshCw },
    { id: 'analytics', label: 'Analytics', icon: PieChart }
  ]

  return (
    <CorporateLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Contract Management</h1>
            <p className="text-slate-600 mt-2">Manage all contracts, renewals, and vendor relationships</p>
          </div>
          <div className="flex space-x-3">
            <CorporateButton variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </CorporateButton>
            <CorporateButton>
              <Plus className="w-4 h-4 mr-2" />
              New Contract
            </CorporateButton>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <CorporateCard variant="elevated" padding="lg">
            <CorporateCardContent>
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">Total Contracts</p>
                  <p className="text-2xl font-bold text-slate-900">{mockContracts.length}</p>
                </div>
              </div>
            </CorporateCardContent>
          </CorporateCard>

          <CorporateCard variant="elevated" padding="lg">
            <CorporateCardContent>
              <div className="flex items-center">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">Active Contracts</p>
                  <p className="text-2xl font-bold text-slate-900">{activeContracts}</p>
                </div>
              </div>
            </CorporateCardContent>
          </CorporateCard>

          <CorporateCard variant="elevated" padding="lg">
            <CorporateCardContent>
              <div className="flex items-center">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">Expiring Soon</p>
                  <p className="text-2xl font-bold text-slate-900">{expiringContracts}</p>
                </div>
              </div>
            </CorporateCardContent>
          </CorporateCard>

          <CorporateCard variant="elevated" padding="lg">
            <CorporateCardContent>
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">Total Value</p>
                  <p className="text-2xl font-bold text-slate-900">${(totalValue / 1000000).toFixed(1)}M</p>
                </div>
              </div>
            </CorporateCardContent>
          </CorporateCard>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  )}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Recent Activity */}
            <CorporateCard variant="elevated" padding="lg">
              <CorporateCardHeader>
                <h3 className="text-lg font-semibold">Recent Activity</h3>
              </CorporateCardHeader>
              <CorporateCardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm">Software License Agreement renewed with Microsoft Corporation</span>
                    <span className="text-xs text-slate-500">2 hours ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm">Marketing Services Contract submitted for review</span>
                    <span className="text-xs text-slate-500">1 day ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Cloud Services Agreement signed and activated</span>
                    <span className="text-xs text-slate-500">3 days ago</span>
                  </div>
                </div>
              </CorporateCardContent>
            </CorporateCard>

            {/* Contract Status Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CorporateCard variant="elevated" padding="lg">
                <CorporateCardHeader>
                  <h3 className="text-lg font-semibold">Contract Status Distribution</h3>
                </CorporateCardHeader>
                <CorporateCardContent>
                  <div className="space-y-3">
                    {Object.entries(statusConfig).map(([status, config]) => {
                      const count = mockContracts.filter(c => c.status === status).length
                      const percentage = (count / mockContracts.length) * 100
                      return (
                        <div key={status} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <config.icon className="w-4 h-4" />
                            <span className="text-sm capitalize">{status}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-slate-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium w-8">{count}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CorporateCardContent>
              </CorporateCard>

              <CorporateCard variant="elevated" padding="lg">
                <CorporateCardHeader>
                  <h3 className="text-lg font-semibold">Upcoming Renewals</h3>
                </CorporateCardHeader>
                <CorporateCardContent>
                  <div className="space-y-3">
                    {mockContracts
                      .filter(c => c.renewalDate)
                      .sort((a, b) => new Date(a.renewalDate!).getTime() - new Date(b.renewalDate!).getTime())
                      .slice(0, 4)
                      .map(contract => (
                        <div key={contract.id} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">{contract.title}</p>
                            <p className="text-xs text-slate-500">{contract.counterparty}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">
                              {new Date(contract.renewalDate!).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-slate-500">
                              {Math.ceil((new Date(contract.renewalDate!).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CorporateCardContent>
              </CorporateCard>
            </div>
          </div>
        )}

        {activeTab === 'contracts' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search contracts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="review">Under Review</option>
                <option value="expired">Expired</option>
              </select>
              <CorporateButton variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </CorporateButton>
            </div>

            {/* Contracts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredContracts.map(contract => (
                <ContractCard key={contract.id} contract={contract} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'renewals' && (
          <div className="space-y-6">
            <CorporateCard variant="elevated" padding="lg">
              <CorporateCardHeader>
                <h3 className="text-lg font-semibold">Contract Renewals</h3>
                <p className="text-slate-600">Manage upcoming contract renewals and negotiations</p>
              </CorporateCardHeader>
              <CorporateCardContent>
                <div className="space-y-4">
                  {mockContracts
                    .filter(c => c.renewalDate)
                    .map(contract => (
                      <div key={contract.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{contract.title}</h4>
                          <p className="text-sm text-slate-600">{contract.counterparty}</p>
                          <p className="text-xs text-slate-500">Renewal Date: {new Date(contract.renewalDate!).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">${contract.value.toLocaleString()}</span>
                          <CorporateButton size="sm">
                            Start Renewal
                          </CorporateButton>
                        </div>
                      </div>
                    ))}
                </div>
              </CorporateCardContent>
            </CorporateCard>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CorporateCard variant="elevated" padding="lg">
                <CorporateCardHeader>
                  <h3 className="text-lg font-semibold">Contract Value by Department</h3>
                </CorporateCardHeader>
                <CorporateCardContent>
                  <div className="space-y-3">
                    {Array.from(new Set(mockContracts.map(c => c.department))).map(dept => {
                      const deptContracts = mockContracts.filter(c => c.department === dept)
                      const deptValue = deptContracts.reduce((sum, c) => sum + c.value, 0)
                      const percentage = (deptValue / totalValue) * 100
                      return (
                        <div key={dept} className="flex items-center justify-between">
                          <span className="text-sm">{dept}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-32 bg-slate-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">${(deptValue / 1000).toFixed(0)}K</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CorporateCardContent>
              </CorporateCard>

              <CorporateCard variant="elevated" padding="lg">
                <CorporateCardHeader>
                  <h3 className="text-lg font-semibold">Risk Assessment</h3>
                </CorporateCardHeader>
                <CorporateCardContent>
                  <div className="space-y-3">
                    {(['High', 'Medium', 'Low'] as const).map(risk => {
                      const count = mockContracts.filter(c => c.riskLevel === risk).length
                      const percentage = (count / mockContracts.length) * 100
                      return (
                        <div key={risk} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={cn('w-3 h-3 rounded-full', 
                              risk === 'High' ? 'bg-red-500' : 
                              risk === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                            )}></div>
                            <span className="text-sm">{risk} Risk</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-slate-200 rounded-full h-2">
                              <div
                                className={cn('h-2 rounded-full', 
                                  risk === 'High' ? 'bg-red-500' : 
                                  risk === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                                )}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium w-8">{count}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CorporateCardContent>
              </CorporateCard>
            </div>
          </div>
        )}
      </div>
    </CorporateLayout>
  )
}

export default Contracts
