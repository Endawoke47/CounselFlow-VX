import React, { useState, useEffect } from 'react'
import { CorporateLayout } from '@/components/corporate/CorporateLayout'
import { CorporateCard } from '@/components/corporate/CorporateCard'
import { CorporateButton } from '@/components/corporate/CorporateButton'
import { 
  Users, 
  Shield, 
  UserPlus, 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Filter, 
  Plus, 
  BarChart3, 
  Settings,
  Key,
  ShieldCheck,
  Eye,
  Lock,
  Unlock,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Award,
  Target,
  Globe,
  Database,
  Network,
  Fingerprint,
  Scan,
  UserCheck
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Pie, Radar as RadarChart_Radar } from 'recharts'

interface User {
  id: string
  name: string
  email: string
  role: string
  department: string
  status: 'active' | 'inactive' | 'pending' | 'suspended'
  lastLogin: string
  permissions: string[]
  securityScore: number
  riskAssessment?: string
  biometricEnabled?: boolean
  encryptionEnabled?: boolean
  advancedAccess?: boolean
  accessAttempts?: number
  suspiciousActivity?: boolean
}

const userData: User[] = [
  {
    id: 'UA-2024-001',
    name: 'Dr. Elena Vasquez',
    email: 'elena.vasquez@counselflow.com',
    role: 'Senior Legal Director',
    department: 'Legal Operations & Compliance',
    status: 'active',
    lastLogin: '2 minutes ago',
    permissions: ['advanced_encryption', 'governance_oversight', 'risk_analysis', 'full_system_access'],
    securityScore: 98.7,
    riskAssessment: 'Ultra-Low Risk - Security Pattern Verified',
    biometricEnabled: true,
    encryptionEnabled: true,
    advancedAccess: true,
    accessAttempts: 1,
    suspiciousActivity: false
  },
  {
    id: 'UA-2024-002',
    name: 'Marcus Chen',
    email: 'marcus.chen@counselflow.com',
    role: 'Corporate Attorney',
    department: 'Digital Rights & Compliance',
    status: 'active',
    lastLogin: '15 minutes ago',
    permissions: ['governance_oversight', 'client_data_access', 'document_generation', 'compliance_monitoring'],
    securityScore: 94.2,
    riskAssessment: 'Low Risk - Normal Access Patterns',
    biometricEnabled: true,
    encryptionEnabled: true,
    advancedAccess: true,
    accessAttempts: 3,
    suspiciousActivity: false
  },
  {
    id: 'UA-2024-003',
    name: 'Sarah Kim',
    email: 'sarah.kim@counselflow.com',
    role: 'Regulatory Compliance Lead',
    department: 'Global Compliance Operations',
    status: 'active',
    lastLogin: '1 hour ago',
    permissions: ['compliance_monitoring', 'regulatory_database', 'risk_assessment', 'audit_trails'],
    securityScore: 96.1,
    riskAssessment: 'Low Risk - Consistent Access Patterns',
    biometricEnabled: true,
    encryptionEnabled: false,
    advancedAccess: true,
    accessAttempts: 2,
    suspiciousActivity: false
  },
  {
    id: 'UA-2024-004',
    name: 'Alex Thompson',
    email: 'alex.thompson@counselflow.com',
    role: 'Digital Asset Legal Specialist',
    department: 'Digital Asset Law',
    status: 'active',
    lastLogin: '3 hours ago',
    permissions: ['blockchain_analysis', 'smart_contract_review', 'crypto_compliance', 'governance_oversight'],
    securityScore: 92.8,
    riskAssessment: 'Medium Risk - Unusual Access Times Detected',
    biometricEnabled: true,
    encryptionEnabled: false,
    advancedAccess: false,
    accessAttempts: 7,
    suspiciousActivity: true
  },
  {
    id: 'UA-2024-005',
    name: 'Dr. Jennifer Walsh',
    email: 'jennifer.walsh@counselflow.com',
    role: 'Technology Law Advisor',
    department: 'Technology & Innovation',
    status: 'pending',
    lastLogin: 'Never',
    permissions: ['pending_security_clearance'],
    securityScore: 88.5,
    riskAssessment: 'Pending - Security Verification in Progress',
    biometricEnabled: false,
    encryptionEnabled: false,
    advancedAccess: false,
    accessAttempts: 0,
    suspiciousActivity: false
  },
  {
    id: 'UA-2024-006',
    name: 'Lisa Rodriguez',
    email: 'lisa.rodriguez@counselflow.com',
    role: 'Employment Law Specialist',
    department: 'Human Resources & Labor',
    status: 'suspended',
    lastLogin: '2 weeks ago',
    permissions: ['restricted_access'],
    securityScore: 76.3,
    riskAssessment: 'High Risk - Anomalous Behavior Detected',
    biometricEnabled: false,
    encryptionEnabled: false,
    advancedAccess: false,
    accessAttempts: 23,
    suspiciousActivity: true
  }
]

// Enhanced analytics data
const accessTrendData = [
  { month: 'Jan', successful: 12450, failed: 124, suspicious: 23, total: 12597 },
  { month: 'Feb', successful: 13200, failed: 89, suspicious: 18, total: 13307 },
  { month: 'Mar', successful: 14100, failed: 156, suspicious: 31, total: 14287 },
  { month: 'Apr', successful: 13800, failed: 234, suspicious: 45, total: 14079 },
  { month: 'May', successful: 15200, failed: 98, suspicious: 12, total: 15310 },
  { month: 'Jun', successful: 16100, failed: 67, suspicious: 8, total: 16175 }
]

const securityLevelData = [
  { name: 'Advanced Level', value: 35, color: '#8B5CF6' },
  { name: 'Enhanced Access', value: 28, color: '#06B6D4' },
  { name: 'Biometric Only', value: 22, color: '#10B981' },
  { name: 'Standard Auth', value: 15, color: '#F59E0B' }
]

const permissionMatrixData = [
  { subject: 'Governance', current: 95, target: 100, fullMark: 100 },
  { subject: 'Advanced Access', current: 67, target: 80, fullMark: 100 },
  { subject: 'Risk Analysis', current: 82, target: 90, fullMark: 100 },
  { subject: 'Compliance', current: 91, target: 95, fullMark: 100 },
  { subject: 'Data Access', current: 78, target: 85, fullMark: 100 },
  { subject: 'System Admin', current: 45, target: 60, fullMark: 100 }
]

const riskIndicators = [
  { indicator: 'Failed Logins', current: 2.3, target: 1.0, status: 'warning' },
  { indicator: 'Anomalous Access', current: 0.8, target: 0.5, status: 'good' },
  { indicator: 'Privilege Escalation', current: 0.1, target: 0.1, status: 'excellent' },
  { indicator: 'Suspicious Patterns', current: 1.2, target: 0.8, status: 'warning' }
]

const statusConfig = {
  active: { color: 'text-green-700 bg-green-100', icon: CheckCircle, status: 'Active Status' },
  inactive: { color: 'text-slate-700 bg-slate-100', icon: Clock, status: 'Inactive Status' },
  pending: { color: 'text-yellow-700 bg-yellow-100', icon: Clock, status: 'Pending Verification' },
  suspended: { color: 'text-red-700 bg-red-100', icon: AlertTriangle, status: 'Security Alert' }
}

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  const StatusIcon = statusConfig[user.status].icon

  return (
    <CorporateCard 
      variant="elevated" 
      padding="lg" 
      hover 
      interactive
      className={cn(
        'border-l-4 transition-all duration-300',
        user.status === 'suspended' ? 'border-l-red-500 shadow-red-100' :
        user.status === 'pending' ? 'border-l-yellow-500 shadow-yellow-100' :
        user.status === 'active' ? 'border-l-green-500 shadow-green-100' :
        'border-l-slate-300',
        user.suspiciousActivity && 'ring-2 ring-red-200'
      )}
    >
      <div className="space-y-6">
        {/* Enhanced Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <span>{user.name}</span>
                {user.advancedAccess && (
                  <ShieldCheck className="w-4 h-4 text-purple-600" />
                )}
                {user.encryptionEnabled && (
                  <Lock className="w-4 h-4 text-cyan-600" />
                )}
                {user.biometricEnabled && (
                  <Fingerprint className="w-4 h-4 text-green-600" />
                )}
              </h3>
              {user.suspiciousActivity && (
                <span className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded-full animate-pulse flex items-center space-x-1">
                  <AlertTriangle className="w-3 h-3" />
                  <span>Security Alert</span>
                </span>
              )}
            </div>
            <p className="text-sm text-slate-600 mb-2">{user.email}</p>
            <p className="text-sm text-slate-700 font-medium">{user.role}</p>
            <p className="text-xs text-slate-500">{user.department}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-xs text-slate-500">Security Score</div>
              <div className={cn(
                'text-2xl font-bold',
                user.securityScore > 95 ? 'text-green-600' :
                user.securityScore > 85 ? 'text-yellow-600' :
                'text-red-600'
              )}>{user.securityScore}</div>
            </div>
          </div>
        </div>

        {/* Enhanced Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className={cn(
            'px-3 py-1 text-xs font-medium rounded-full flex items-center space-x-1.5',
            statusConfig[user.status].color
          )}>
            <StatusIcon className="w-3 h-3" />
            <span>{statusConfig[user.status].status}</span>
          </span>
          <span className="px-3 py-1 text-xs bg-gradient-to-r from-purple-100 to-cyan-100 text-purple-700 rounded-full font-medium">
            {user.permissions.length} Permissions
          </span>
          {user.accessAttempts && user.accessAttempts > 5 && (
            <span className="px-3 py-1 text-xs bg-orange-100 text-orange-700 rounded-full font-medium">
              {user.accessAttempts} Access Attempts
            </span>
          )}
        </div>

        {/* Business Risk Assessment */}
        {user.riskAssessment && (
          <div className={cn(
            'rounded-lg p-3 border',
            user.securityScore > 95 ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' :
            user.securityScore > 85 ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200' :
            'bg-gradient-to-r from-red-50 to-pink-50 border-red-200'
          )}>
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Risk Assessment</span>
            </div>
            <p className="text-sm text-slate-700">{user.riskAssessment}</p>
          </div>
        )}

        {/* Security Features Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className={cn(
            'text-center p-3 rounded-lg border',
            user.biometricEnabled ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'
          )}>
            <Fingerprint className={cn(
              'w-6 h-6 mx-auto mb-1',
              user.biometricEnabled ? 'text-green-600' : 'text-slate-400'
            )} />
            <div className="text-xs font-medium">Biometric</div>
          </div>
          <div className={cn(
            'text-center p-3 rounded-lg border',
            user.encryptionEnabled ? 'bg-cyan-50 border-cyan-200' : 'bg-slate-50 border-slate-200'
          )}>
            <Lock className={cn(
              'w-6 h-6 mx-auto mb-1',
              user.encryptionEnabled ? 'text-cyan-600' : 'text-slate-400'
            )} />
            <div className="text-xs font-medium">Encryption</div>
          </div>
          <div className={cn(
            'text-center p-3 rounded-lg border',
            user.advancedAccess ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'
          )}>
            <ShieldCheck className={cn(
              'w-6 h-6 mx-auto mb-1',
              user.advancedAccess ? 'text-blue-600' : 'text-slate-400'
            )} />
            <div className="text-xs font-medium">Advanced</div>
          </div>
        </div>

        {/* Permissions */}
        <div className="bg-slate-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">Access Permissions</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {user.permissions.slice(0, 4).map((permission, index) => (
              <span key={index} className="px-2 py-1 text-xs bg-slate-200 text-slate-700 rounded">
                {permission.replace(/_/g, ' ').toUpperCase()}
              </span>
            ))}
            {user.permissions.length > 4 && (
              <span className="px-2 py-1 text-xs bg-slate-300 text-slate-600 rounded">
                +{user.permissions.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Last Activity */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Activity className="w-4 h-4" />
            <span>Last Login: {user.lastLogin}</span>
          </div>
          <div className="flex items-center space-x-2">
            <CorporateButton variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-1" />
              View
            </CorporateButton>
            <CorporateButton variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-1" />
              Manage
            </CorporateButton>
          </div>
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

const UserAccessManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [departmentFilter, setDepartmentFilter] = useState<string>('all')
  const [filteredUsers, setFilteredUsers] = useState<User[]>(userData)

  const userStats = {
    total: userData.length,
    active: userData.filter(u => u.status === 'active').length,
    suspended: userData.filter(u => u.status === 'suspended').length,
    avgScore: (userData.reduce((sum, u) => sum + u.securityScore, 0) / userData.length).toFixed(1)
  }

  // Apply filters
  useEffect(() => {
    let filtered = userData

    if (searchQuery) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter)
    }

    if (departmentFilter !== 'all') {
      filtered = filtered.filter(user => user.department.toLowerCase().includes(departmentFilter.toLowerCase()))
    }

    setFilteredUsers(filtered)
  }, [searchQuery, statusFilter, departmentFilter])

  return (
    <CorporateLayout>
      <div className="space-y-8">
        {/* Professional Header */}
        <div className="bg-gradient-to-r from-blue-600 via-slate-700 to-blue-800 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-8 h-8" />
                <h1 className="text-3xl font-bold">User Access Management</h1>
                <Shield className="w-6 h-6" />
              </div>
              <p className="text-xl opacity-90 mb-6">
                Advanced Identity Management & Security Protocols
              </p>
              <div className="grid grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">{userStats.total}</div>
                  <div className="text-sm opacity-80">Total Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{userStats.active}</div>
                  <div className="text-sm opacity-80">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{userStats.suspended}</div>
                  <div className="text-sm opacity-80">Security Alerts</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{userStats.avgScore}</div>
                  <div className="text-sm opacity-80">Avg Security Score</div>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm opacity-80">Security Level</div>
                <div className="text-4xl font-bold">99.2%</div>
              </div>
              <Shield className="w-16 h-16 opacity-80" />
            </div>
          </div>
        </div>

        {/* Advanced Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          <AnalyticsWidget title="Access Trends" icon={TrendingUp}>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={accessTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="successful" stackId="1" stroke="#10B981" fill="#10B981" />
                <Area type="monotone" dataKey="failed" stackId="1" stroke="#F59E0B" fill="#F59E0B" />
                <Area type="monotone" dataKey="suspicious" stackId="1" stroke="#EF4444" fill="#EF4444" />
              </AreaChart>
            </ResponsiveContainer>
          </AnalyticsWidget>

          <AnalyticsWidget title="Security Levels" icon={Shield}>
            <ResponsiveContainer width="100%" height={200}>
              <RechartsPieChart>
                <Tooltip />
                <Pie
                  data={securityLevelData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                >
                  {securityLevelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </RechartsPieChart>
            </ResponsiveContainer>
          </AnalyticsWidget>

          <AnalyticsWidget title="Permission Matrix" icon={Lock}>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={permissionMatrixData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <RadarChart_Radar name="Current" dataKey="current" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.2} />
                <RadarChart_Radar name="Target" dataKey="target" stroke="#10B981" fill="#10B981" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </AnalyticsWidget>

          <AnalyticsWidget title="Risk Indicators" icon={Target}>
            <div className="space-y-3">
              {riskIndicators.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">{item.indicator}</span>
                    <span className={cn(
                      'font-medium',
                      item.status === 'excellent' ? 'text-green-600' :
                      item.status === 'good' ? 'text-blue-600' :
                      'text-orange-600'
                    )}>{item.current}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className={cn(
                        'h-2 rounded-full',
                        item.status === 'excellent' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                        item.status === 'good' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                        'bg-gradient-to-r from-orange-500 to-red-500'
                      )}
                      style={{ width: `${(item.current / item.target) * 100}%` }}
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
                <UserPlus className="w-4 h-4 mr-2" />
                Add User
              </CorporateButton>
              <CorporateButton variant="outline" size="sm">
                <Shield className="w-4 h-4 mr-2" />
                Security Scan
              </CorporateButton>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search users..."
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
              
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent"
              >
                <option value="all">All Departments</option>
                <option value="legal">Legal Operations</option>
                <option value="compliance">Compliance</option>
                <option value="digital">Digital Rights</option>
                <option value="corporate">Corporate Law</option>
              </select>
            </div>
          </div>
        </CorporateCard>

        {/* Users Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <CorporateCard variant="outlined" padding="xl">
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No users found</h3>
              <p className="text-slate-600">Try adjusting your search criteria or filters.</p>
            </div>
          </CorporateCard>
        )}
      </div>
    </CorporateLayout>
  )
}

export default UserAccessManagement
