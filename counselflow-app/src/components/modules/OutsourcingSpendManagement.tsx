import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui'
import { Button } from '../ui'
import { Badge } from '../ui'
import { 
  Building2, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Star,
  BarChart3,
  Filter,
  Download,
  Plus,
  Search,
  Globe,
  Target
} from 'lucide-react'

// Types for Outsourcing & Spend Management
interface Vendor {
  id: string
  name: string
  type: VendorType
  specializations: string[]
  jurisdictions: string[]
  rating: number
  riskLevel: 'low' | 'medium' | 'high'
  status: 'active' | 'inactive' | 'pending' | 'suspended'
  contractValue: number
  engagementsCount: number
  avgResponseTime: string
  complianceScore: number
  lastEngagement: Date
  preferredRegions: string[]
  languages: string[]
  certifications: string[]
}

type VendorType = 'law_firm' | 'consultancy' | 'technology' | 'expert_witness' | 'paralegal_services' | 'translation' | 'litigation_support'

interface Engagement {
  id: string
  vendorId: string
  matterId: string
  title: string
  type: EngagementType
  status: EngagementStatus
  budget: number
  actualCost: number
  startDate: Date
  endDate?: Date
  description: string
  deliverables: Deliverable[]
  milestones: Milestone[]
  riskAssessment: RiskAssessment
  performance: PerformanceMetrics
}

type EngagementType = 'litigation' | 'due_diligence' | 'contract_review' | 'compliance' | 'research' | 'document_review' | 'translation'
type EngagementStatus = 'planning' | 'active' | 'paused' | 'completed' | 'cancelled' | 'overdue'

interface Deliverable {
  id: string
  name: string
  description: string
  dueDate: Date
  status: 'pending' | 'in_progress' | 'completed' | 'delayed'
  quality: number
}

interface Milestone {
  id: string
  name: string
  dueDate: Date
  status: 'upcoming' | 'in_progress' | 'completed' | 'overdue'
  payment: number
}

interface RiskAssessment {
  dataProtection: 'compliant' | 'minor_concerns' | 'major_concerns'
  conflictOfInterest: boolean
  jurisdictionalRisk: 'low' | 'medium' | 'high'
  financialStability: 'strong' | 'stable' | 'concerning'
  overallRisk: 'low' | 'medium' | 'high'
}

interface PerformanceMetrics {
  qualityScore: number
  timelinessScore: number
  communicationScore: number
  costEfficiency: number
  overallRating: number
}

interface SpendAnalytics {
  totalSpend: number
  budgetUtilization: number
  costSavings: number
  vendorCount: number
  activeEngagements: number
  avgEngagementValue: number
  topSpendingCategories: Array<{ category: string; amount: number; percentage: number }>
  monthlyTrend: Array<{ month: string; spend: number; budget: number }>
  riskDistribution: Array<{ level: string; count: number; spend: number }>
}

const OutsourcingSpendManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [engagements, setEngagements] = useState<Engagement[]>([])
  const [analytics, setAnalytics] = useState<SpendAnalytics | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedVendorType, setSelectedVendorType] = useState<VendorType | 'all'>('all')
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string>('all')

  // Mock data initialization
  useEffect(() => {
    const mockVendors: Vendor[] = [
      {
        id: '1',
        name: 'Global Legal Partners LLP',
        type: 'law_firm',
        specializations: ['Corporate Law', 'M&A', 'Securities'],
        jurisdictions: ['US', 'UK', 'Canada'],
        rating: 4.8,
        riskLevel: 'low',
        status: 'active',
        contractValue: 2500000,
        engagementsCount: 15,
        avgResponseTime: '2.3 hours',
        complianceScore: 98,
        lastEngagement: new Date('2024-01-15'),
        preferredRegions: ['North America', 'Europe'],
        languages: ['English', 'French'],
        certifications: ['ISO 27001', 'SOC 2']
      },
      {
        id: '2',
        name: 'TechLegal Consultancy',
        type: 'consultancy',
        specializations: ['IP Law', 'Technology', 'Data Privacy'],
        jurisdictions: ['US', 'EU', 'Singapore'],
        rating: 4.6,
        riskLevel: 'medium',
        status: 'active',
        contractValue: 850000,
        engagementsCount: 8,
        avgResponseTime: '4.1 hours',
        complianceScore: 94,
        lastEngagement: new Date('2024-01-10'),
        preferredRegions: ['Asia-Pacific', 'Europe'],
        languages: ['English', 'Mandarin'],
        certifications: ['ISO 27001']
      },
      {
        id: '3',
        name: 'Expert Witness Network',
        type: 'expert_witness',
        specializations: ['Financial Analysis', 'Technical Standards', 'Industry Analysis'],
        jurisdictions: ['US', 'Canada', 'Australia'],
        rating: 4.9,
        riskLevel: 'low',
        status: 'active',
        contractValue: 450000,
        engagementsCount: 12,
        avgResponseTime: '1.8 hours',
        complianceScore: 99,
        lastEngagement: new Date('2024-01-12'),
        preferredRegions: ['Global'],
        languages: ['English'],
        certifications: ['Professional Expert Certification']
      }
    ]

    const mockEngagements: Engagement[] = [
      {
        id: '1',
        vendorId: '1',
        matterId: 'MAT-001',
        title: 'Corporate Acquisition Due Diligence',
        type: 'due_diligence',
        status: 'active',
        budget: 500000,
        actualCost: 320000,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-02-28'),
        description: 'Comprehensive due diligence for technology company acquisition',
        deliverables: [
          { id: '1', name: 'Legal DD Report', description: 'Complete legal analysis', dueDate: new Date('2024-02-15'), status: 'completed', quality: 95 },
          { id: '2', name: 'Risk Assessment', description: 'Comprehensive risk evaluation', dueDate: new Date('2024-02-20'), status: 'in_progress', quality: 0 }
        ],
        milestones: [
          { id: '1', name: 'Initial Review', dueDate: new Date('2024-01-15'), status: 'completed', payment: 100000 },
          { id: '2', name: 'Detailed Analysis', dueDate: new Date('2024-02-01'), status: 'completed', payment: 200000 }
        ],
        riskAssessment: {
          dataProtection: 'compliant',
          conflictOfInterest: false,
          jurisdictionalRisk: 'low',
          financialStability: 'strong',
          overallRisk: 'low'
        },
        performance: {
          qualityScore: 95,
          timelinessScore: 92,
          communicationScore: 88,
          costEfficiency: 89,
          overallRating: 91
        }
      }
    ]

    const mockAnalytics: SpendAnalytics = {
      totalSpend: 3800000,
      budgetUtilization: 76,
      costSavings: 450000,
      vendorCount: 24,
      activeEngagements: 18,
      avgEngagementValue: 211111,
      topSpendingCategories: [
        { category: 'External Counsel', amount: 2200000, percentage: 58 },
        { category: 'Expert Witnesses', amount: 650000, percentage: 17 },
        { category: 'Document Review', amount: 480000, percentage: 13 },
        { category: 'Translation Services', amount: 290000, percentage: 8 },
        { category: 'Litigation Support', amount: 180000, percentage: 5 }
      ],
      monthlyTrend: [
        { month: 'Jan', spend: 320000, budget: 400000 },
        { month: 'Feb', spend: 385000, budget: 450000 },
        { month: 'Mar', spend: 295000, budget: 350000 },
        { month: 'Apr', spend: 420000, budget: 500000 }
      ],
      riskDistribution: [
        { level: 'Low', count: 15, spend: 2280000 },
        { level: 'Medium', count: 7, spend: 1140000 },
        { level: 'High', count: 2, spend: 380000 }
      ]
    }

    setVendors(mockVendors)
    setEngagements(mockEngagements)
    setAnalytics(mockAnalytics)
  }, [])

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.specializations.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = selectedVendorType === 'all' || vendor.type === selectedVendorType
    const matchesRisk = selectedRiskLevel === 'all' || vendor.riskLevel === selectedRiskLevel
    
    return matchesSearch && matchesType && matchesRisk
  })

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'high': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spend</p>
                <p className="text-2xl font-bold">${analytics?.totalSpend.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Budget Utilization</p>
                <p className="text-2xl font-bold">{analytics?.budgetUtilization}%</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Vendors</p>
                <p className="text-2xl font-bold">{analytics?.vendorCount}</p>
              </div>
              <Building2 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cost Savings</p>
                <p className="text-2xl font-bold">${analytics?.costSavings.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Spending Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Spending Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics?.topSpendingCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{category.category}</span>
                      <span className="text-sm text-gray-600">{category.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="ml-4 text-sm font-semibold">${category.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics?.riskDistribution.map((risk, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Badge className={getRiskBadgeColor(risk.level.toLowerCase())}>
                      {risk.level} Risk
                    </Badge>
                    <span className="text-sm">{risk.count} vendors</span>
                  </div>
                  <span className="font-semibold">${risk.spend.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Engagements */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Engagements</CardTitle>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Engagement
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {engagements.slice(0, 5).map((engagement) => (
              <div key={engagement.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{engagement.title}</h4>
                  <p className="text-sm text-gray-600">Vendor: {vendors.find(v => v.id === engagement.vendorId)?.name}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge className={getStatusBadgeColor(engagement.status)}>
                      {engagement.status}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      Budget: ${engagement.budget.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-600">
                      Spent: ${engagement.actualCost.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <p className="text-sm font-medium">{engagement.performance.overallRating}%</p>
                    <p className="text-xs text-gray-600">Performance</p>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const VendorManagementView = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-64">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search vendors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <select 
          value={selectedVendorType} 
          onChange={(e) => setSelectedVendorType(e.target.value as VendorType | 'all')}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Types</option>
          <option value="law_firm">Law Firms</option>
          <option value="consultancy">Consultancies</option>
          <option value="expert_witness">Expert Witnesses</option>
          <option value="technology">Technology</option>
          <option value="paralegal_services">Paralegal Services</option>
          <option value="translation">Translation</option>
          <option value="litigation_support">Litigation Support</option>
        </select>

        <select 
          value={selectedRiskLevel} 
          onChange={(e) => setSelectedRiskLevel(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Risk Levels</option>
          <option value="low">Low Risk</option>
          <option value="medium">Medium Risk</option>
          <option value="high">High Risk</option>
        </select>

        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Vendor
        </Button>
      </div>

      {/* Vendor Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredVendors.map((vendor) => (
          <Card key={vendor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">
                      {vendor.name.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{vendor.name}</h3>
                    <p className="text-sm text-gray-600 capitalize">{vendor.type.replace('_', ' ')}</p>
                  </div>
                </div>
                <Badge className={getStatusBadgeColor(vendor.status)}>
                  {vendor.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Rating and Risk */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{vendor.rating}</span>
                  </div>
                  <Badge className={getRiskBadgeColor(vendor.riskLevel)}>
                    {vendor.riskLevel} risk
                  </Badge>
                </div>

                {/* Specializations */}
                <div>
                  <p className="text-sm font-medium mb-2">Specializations</p>
                  <div className="flex flex-wrap gap-1">
                    {vendor.specializations.slice(0, 3).map((spec, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Contract Value</p>
                    <p className="font-semibold">${vendor.contractValue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Engagements</p>
                    <p className="font-semibold">{vendor.engagementsCount}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Response Time</p>
                    <p className="font-semibold">{vendor.avgResponseTime}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Compliance</p>
                    <p className="font-semibold">{vendor.complianceScore}%</p>
                  </div>
                </div>

                {/* Jurisdictions */}
                <div>
                  <p className="text-sm font-medium mb-1">Jurisdictions</p>
                  <div className="flex items-center space-x-1">
                    <Globe className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-600">
                      {vendor.jurisdictions.join(', ')}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button size="sm" className="flex-1">
                    New Engagement
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Outsourcing & Spend Management</h1>
          <p className="text-gray-600 mt-2">Manage external vendors, track spending, and optimize legal outsourcing</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['dashboard', 'vendors', 'engagements', 'analytics', 'budget'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'dashboard' && <DashboardView />}
      {activeTab === 'vendors' && <VendorManagementView />}
      {activeTab === 'engagements' && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Engagement Management</h3>
          <p className="text-gray-500">Track and manage all vendor engagements</p>
        </div>
      )}
      {activeTab === 'analytics' && (
        <div className="text-center py-12">
          <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Advanced Analytics</h3>
          <p className="text-gray-500">Deep insights into spending patterns and vendor performance</p>
        </div>
      )}
      {activeTab === 'budget' && (
        <div className="text-center py-12">
          <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Budget Management</h3>
          <p className="text-gray-500">Plan and track legal spending budgets</p>
        </div>
      )}
    </div>
  )
}

export default OutsourcingSpendManagement
