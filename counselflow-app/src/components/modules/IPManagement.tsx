// Module 6: Intellectual Property Management
'use client'

import React, { useState, useMemo } from 'react'
import { ModuleProps, Priority, RiskLevel } from '@/types'

type IPManagementProps = ModuleProps

interface IPAsset {
  id: string
  title: string
  type: 'patent' | 'trademark' | 'copyright' | 'trade_secret' | 'domain'
  status: 'pending' | 'active' | 'expired' | 'abandoned' | 'rejected'
  registrationNumber?: string
  applicationDate: Date
  registrationDate?: Date
  expiryDate?: Date
  jurisdiction: string
  owner: string
  inventors?: string[]
  priority: Priority
  description: string
  commercialValue: number
  renewalRequired: boolean
  nextRenewalDate?: Date
  attachments: number
  riskLevel: RiskLevel
}

interface IPPortfolio {
  totalAssets: number
  activeAssets: number
  pendingApplications: number
  renewalsRequired: number
  totalValue: number
  riskScore: number
}

export function IPManagement({
  className
}: IPManagementProps) {
  const [activeView, setActiveView] = useState<'dashboard' | 'portfolio' | 'prosecution' | 'licensing' | 'enforcement'>('dashboard')
  const [selectedIPType, setSelectedIPType] = useState<'all' | 'patent' | 'trademark' | 'copyright' | 'trade_secret' | 'domain'>('all')
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'active' | 'expired' | 'abandoned' | 'rejected'>('all')

  // Mock IP asset data
  const ipAssets = useMemo<IPAsset[]>(() => [
    {
      id: 'ip_1',
      title: 'AI-Powered Legal Document Analysis System',
      type: 'patent',
      status: 'active',
      registrationNumber: 'US11234567',
      applicationDate: new Date('2023-03-15'),
      registrationDate: new Date('2024-09-20'),
      expiryDate: new Date('2044-09-20'),
      jurisdiction: 'United States',
      owner: 'CounselFlow Technologies Inc.',
      inventors: ['Dr. Sarah Chen', 'Michael Rodriguez', 'Alice Johnson'],
      priority: 'high',
      description: 'Machine learning system for automated legal document analysis and risk assessment',
      commercialValue: 2500000,
      renewalRequired: false,
      nextRenewalDate: new Date('2028-09-20'),
      attachments: 12,
      riskLevel: 'low'
    },
    {
      id: 'ip_2',
      title: 'COUNSELFLOW',
      type: 'trademark',
      status: 'active',
      registrationNumber: 'TM7891234',
      applicationDate: new Date('2023-06-10'),
      registrationDate: new Date('2024-02-15'),
      expiryDate: new Date('2034-02-15'),
      jurisdiction: 'United States',
      owner: 'CounselFlow Technologies Inc.',
      priority: 'critical',
      description: 'Trademark for legal technology software and services',
      commercialValue: 750000,
      renewalRequired: true,
      nextRenewalDate: new Date('2029-02-15'),
      attachments: 8,
      riskLevel: 'medium'
    },
    {
      id: 'ip_3',
      title: 'Client Management Platform UI/UX Design',
      type: 'copyright',
      status: 'active',
      applicationDate: new Date('2024-01-20'),
      registrationDate: new Date('2024-01-20'),
      jurisdiction: 'United States',
      owner: 'CounselFlow Technologies Inc.',
      priority: 'medium',
      description: 'Original software interface design and user experience elements',
      commercialValue: 150000,
      renewalRequired: false,
      attachments: 25,
      riskLevel: 'low'
    },
    {
      id: 'ip_4',
      title: 'Multi-Jurisdictional Contract Templates',
      type: 'trade_secret',
      status: 'active',
      applicationDate: new Date('2023-12-01'),
      jurisdiction: 'Confidential',
      owner: 'CounselFlow Technologies Inc.',
      priority: 'high',
      description: 'Proprietary legal template library with jurisdiction-specific clauses',
      commercialValue: 500000,
      renewalRequired: false,
      attachments: 156,
      riskLevel: 'high'
    },
    {
      id: 'ip_5',
      title: 'Block-Chain Contract Verification',
      type: 'patent',
      status: 'pending',
      registrationNumber: 'US17456789',
      applicationDate: new Date('2024-08-15'),
      jurisdiction: 'United States',
      owner: 'CounselFlow Technologies Inc.',
      inventors: ['David Kim', 'Jennifer Wu'],
      priority: 'high',
      description: 'Blockchain-based system for contract authenticity and tamper detection',
      commercialValue: 1800000,
      renewalRequired: false,
      attachments: 18,
      riskLevel: 'medium'
    }
  ], [])

  const ipPortfolio = useMemo<IPPortfolio>(() => {
    const totalAssets = ipAssets.length
    const activeAssets = ipAssets.filter(asset => asset.status === 'active').length
    const pendingApplications = ipAssets.filter(asset => asset.status === 'pending').length
    const renewalsRequired = ipAssets.filter(asset => asset.renewalRequired).length
    const totalValue = ipAssets.reduce((sum, asset) => sum + asset.commercialValue, 0)
    const riskScore = ipAssets.reduce((sum, asset) => {
      const risk = asset.riskLevel === 'critical' ? 4 : asset.riskLevel === 'high' ? 3 : asset.riskLevel === 'medium' ? 2 : 1
      return sum + risk
    }, 0) / totalAssets

    return {
      totalAssets,
      activeAssets,
      pendingApplications,
      renewalsRequired,
      totalValue,
      riskScore
    }
  }, [ipAssets])

  const filteredAssets = useMemo(() => {
    return ipAssets.filter(asset => {
      const typeMatch = selectedIPType === 'all' || asset.type === selectedIPType
      const statusMatch = selectedStatus === 'all' || asset.status === selectedStatus
      return typeMatch && statusMatch
    })
  }, [ipAssets, selectedIPType, selectedStatus])

  const licensingDeals = useMemo(() => [
    {
      id: 'license_1',
      ipAsset: 'AI-Powered Legal Document Analysis System',
      licensee: 'Global Law Firm Partners',
      type: 'exclusive',
      territory: 'Europe',
      startDate: new Date('2024-10-01'),
      endDate: new Date('2029-09-30'),
      royaltyRate: 8.5,
      minimumGuarantee: 500000,
      status: 'active',
      revenue: 125000
    },
    {
      id: 'license_2',
      ipAsset: 'COUNSELFLOW',
      licensee: 'LegalTech Solutions Ltd.',
      type: 'non-exclusive',
      territory: 'Asia-Pacific',
      startDate: new Date('2024-06-15'),
      endDate: new Date('2027-06-14'),
      royaltyRate: 5.0,
      minimumGuarantee: 200000,
      status: 'active',
      revenue: 67500
    }
  ], [])

  const enforcementCases = useMemo(() => [
    {
      id: 'case_1',
      ipAsset: 'COUNSELFLOW',
      defendant: 'CopyTech Industries',
      type: 'trademark_infringement',
      jurisdiction: 'Federal Court - SDNY',
      status: 'active',
      filingDate: new Date('2024-11-20'),
      attorney: 'Wilson & Associates IP Law',
      estimatedCosts: 150000,
      potentialDamages: 500000,
      description: 'Trademark infringement case involving similar mark "CounselFlo"'
    },
    {
      id: 'case_2',
      ipAsset: 'AI-Powered Legal Document Analysis System',
      defendant: 'TechCorp Analytics',
      type: 'patent_infringement',
      jurisdiction: 'Federal Court - ND CA',
      status: 'settled',
      filingDate: new Date('2024-05-10'),
      settlementDate: new Date('2024-12-01'),
      attorney: 'Peterson Patent Partners',
      estimatedCosts: 275000,
      settlementAmount: 850000,
      description: 'Patent infringement settlement regarding AI document processing technology'
    }
  ], [])

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      active: 'text-green-600 bg-green-50 border-green-200',
      expired: 'text-red-600 bg-red-50 border-red-200',
      abandoned: 'text-gray-600 bg-gray-50 border-gray-200',
      rejected: 'text-red-600 bg-red-50 border-red-200',
      settled: 'text-blue-600 bg-blue-50 border-blue-200'
    }
    return colors[status as keyof typeof colors] || colors.pending
  }

  const getPriorityColor = (priority: Priority) => {
    const colors = {
      low: 'text-green-600 bg-green-50',
      medium: 'text-yellow-600 bg-yellow-50',
      high: 'text-orange-600 bg-orange-50',
      critical: 'text-red-600 bg-red-50'
    }
    return colors[priority] || colors.medium
  }

  const getRiskColor = (level: RiskLevel) => {
    const colors = {
      low: 'text-green-600 bg-green-50',
      medium: 'text-yellow-600 bg-yellow-50',
      high: 'text-red-600 bg-red-50',
      critical: 'text-red-800 bg-red-100'
    }
    return colors[level] || colors.medium
  }

  return (
    <div className={`p-6 space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Intellectual Property Management</h2>
          <p className="text-gray-600">Manage patents, trademarks, copyrights, and IP portfolio strategy</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
            New IP Application
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: '🏢' },
            { id: 'portfolio', name: 'IP Portfolio', icon: '📁' },
            { id: 'prosecution', name: 'Prosecution', icon: '⚖️' },
            { id: 'licensing', name: 'Licensing', icon: '🤝' },
            { id: 'enforcement', name: 'Enforcement', icon: '🛡️' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id as 'dashboard' | 'portfolio' | 'prosecution' | 'licensing' | 'enforcement')}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                activeView === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Dashboard View */}
      {activeView === 'dashboard' && (
        <div className="space-y-6">
          {/* Portfolio Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="bg-white rounded-lg border shadow-sm p-4">
              <h4 className="font-medium text-gray-900 mb-2">Total Assets</h4>
              <div className="text-2xl font-bold text-blue-600">{ipPortfolio.totalAssets}</div>
              <p className="text-xs text-gray-600">IP assets managed</p>
            </div>
            <div className="bg-white rounded-lg border shadow-sm p-4">
              <h4 className="font-medium text-gray-900 mb-2">Active</h4>
              <div className="text-2xl font-bold text-green-600">{ipPortfolio.activeAssets}</div>
              <p className="text-xs text-gray-600">Granted & registered</p>
            </div>
            <div className="bg-white rounded-lg border shadow-sm p-4">
              <h4 className="font-medium text-gray-900 mb-2">Pending</h4>
              <div className="text-2xl font-bold text-yellow-600">{ipPortfolio.pendingApplications}</div>
              <p className="text-xs text-gray-600">Applications filed</p>
            </div>
            <div className="bg-white rounded-lg border shadow-sm p-4">
              <h4 className="font-medium text-gray-900 mb-2">Renewals</h4>
              <div className="text-2xl font-bold text-orange-600">{ipPortfolio.renewalsRequired}</div>
              <p className="text-xs text-gray-600">Require attention</p>
            </div>
            <div className="bg-white rounded-lg border shadow-sm p-4">
              <h4 className="font-medium text-gray-900 mb-2">Portfolio Value</h4>
              <div className="text-2xl font-bold text-purple-600">${(ipPortfolio.totalValue / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-gray-600">Commercial value</p>
            </div>
            <div className="bg-white rounded-lg border shadow-sm p-4">
              <h4 className="font-medium text-gray-900 mb-2">Risk Score</h4>
              <div className="text-2xl font-bold text-red-600">{ipPortfolio.riskScore.toFixed(1)}</div>
              <p className="text-xs text-gray-600">Portfolio risk</p>
            </div>
          </div>

          {/* IP Asset Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Asset Distribution by Type</h3>
              <div className="space-y-3">
                {[
                  { type: 'Patents', count: ipAssets.filter(a => a.type === 'patent').length, color: 'bg-blue-500' },
                  { type: 'Trademarks', count: ipAssets.filter(a => a.type === 'trademark').length, color: 'bg-green-500' },
                  { type: 'Copyrights', count: ipAssets.filter(a => a.type === 'copyright').length, color: 'bg-purple-500' },
                  { type: 'Trade Secrets', count: ipAssets.filter(a => a.type === 'trade_secret').length, color: 'bg-yellow-500' },
                  { type: 'Domains', count: ipAssets.filter(a => a.type === 'domain').length, color: 'bg-red-500' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="text-sm text-gray-600">{item.type}</span>
                    </div>
                    <span className="text-sm font-medium">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Upcoming Deadlines</h3>
              <div className="space-y-3">
                {ipAssets
                  .filter(asset => asset.nextRenewalDate || asset.expiryDate)
                  .sort((a, b) => {
                    const dateA = a.nextRenewalDate || a.expiryDate || new Date()
                    const dateB = b.nextRenewalDate || b.expiryDate || new Date()
                    return dateA.getTime() - dateB.getTime()
                  })
                  .slice(0, 5)
                  .map((asset) => {
                    const deadline = asset.nextRenewalDate || asset.expiryDate
                    const daysUntil = deadline ? Math.ceil((deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0
                    return (
                      <div key={asset.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-sm text-gray-900">{asset.title}</div>
                          <div className="text-xs text-gray-600">{asset.renewalRequired ? 'Renewal' : 'Expiry'}</div>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-medium ${daysUntil <= 30 ? 'text-red-600' : daysUntil <= 90 ? 'text-yellow-600' : 'text-green-600'}`}>
                            {daysUntil} days
                          </div>
                          <div className="text-xs text-gray-500">{deadline?.toLocaleDateString()}</div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Recent IP Activity</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {[
                { type: 'Patent Granted', asset: 'AI-Powered Legal Document Analysis System', date: new Date('2024-12-15'), status: 'success' },
                { type: 'Trademark Filed', asset: 'COUNSELFLOW Pro', date: new Date('2024-12-10'), status: 'pending' },
                { type: 'License Agreement', asset: 'Document Templates', date: new Date('2024-12-08'), status: 'success' },
                { type: 'Enforcement Action', asset: 'COUNSELFLOW', date: new Date('2024-12-05'), status: 'active' }
              ].map((activity, index) => (
                <div key={index} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{activity.type}</h4>
                      <p className="text-sm text-gray-600">{activity.asset}</p>
                    </div>
                    <div className="text-right">
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        activity.status === 'success' ? 'bg-green-100 text-green-800' :
                        activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {activity.status.toUpperCase()}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{activity.date.toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* IP Portfolio View */}
      {activeView === 'portfolio' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-lg border shadow-sm p-4">
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">IP Type</label>
                <select
                  value={selectedIPType}
                  onChange={(e) => setSelectedIPType(e.target.value as 'all' | 'patent' | 'trademark' | 'copyright' | 'trade_secret' | 'domain')}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="patent">Patents</option>
                  <option value="trademark">Trademarks</option>
                  <option value="copyright">Copyrights</option>
                  <option value="trade_secret">Trade Secrets</option>
                  <option value="domain">Domains</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as 'all' | 'pending' | 'active' | 'expired' | 'abandoned' | 'rejected')}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                  <option value="abandoned">Abandoned</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <input
                  type="text"
                  placeholder="Search IP assets..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>

          {/* IP Assets List */}
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">IP Portfolio ({filteredAssets.length} assets)</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredAssets.map((asset) => (
                <div key={asset.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-900">{asset.title}</h4>
                        <div className={`px-2 py-1 rounded text-xs font-medium uppercase ${asset.type === 'patent' ? 'bg-blue-100 text-blue-800' : asset.type === 'trademark' ? 'bg-green-100 text-green-800' : asset.type === 'copyright' ? 'bg-purple-100 text-purple-800' : asset.type === 'trade_secret' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                          {asset.type.replace('_', ' ')}
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(asset.status)}`}>
                          {asset.status.toUpperCase()}
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(asset.priority)}`}>
                          {asset.priority.toUpperCase()}
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(asset.riskLevel)}`}>
                          {asset.riskLevel.toUpperCase()} RISK
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{asset.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-xs text-gray-500">
                        <div>
                          <span className="font-medium">Registration:</span> {asset.registrationNumber || 'N/A'}
                        </div>
                        <div>
                          <span className="font-medium">Filed:</span> {asset.applicationDate.toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Jurisdiction:</span> {asset.jurisdiction}
                        </div>
                        <div>
                          <span className="font-medium">Value:</span> ${asset.commercialValue.toLocaleString()}
                        </div>
                        <div>
                          <span className="font-medium">Owner:</span> {asset.owner}
                        </div>
                        <div>
                          <span className="font-medium">Attachments:</span> {asset.attachments}
                        </div>
                      </div>
                      {asset.inventors && (
                        <div className="mt-2 text-xs text-gray-500">
                          <span className="font-medium">Inventors:</span> {asset.inventors.join(', ')}
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button className="px-3 py-1 border border-gray-300 text-gray-700 text-xs rounded hover:bg-gray-50">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Prosecution View */}
      {activeView === 'prosecution' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Prosecution Pipeline</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <h4 className="font-medium text-yellow-900 mb-3">Pending Applications</h4>
                  <div className="space-y-2">
                    {ipAssets.filter(asset => asset.status === 'pending').map((asset) => (
                      <div key={asset.id} className="bg-white rounded p-3 shadow-sm">
                        <div className="font-medium text-sm text-gray-900">{asset.title}</div>
                        <div className="text-xs text-gray-600">{asset.type.replace('_', ' ')} • {asset.jurisdiction}</div>
                        <div className="text-xs text-gray-500 mt-1">Filed: {asset.applicationDate.toLocaleDateString()}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-3">Under Examination</h4>
                  <div className="space-y-2">
                    <div className="bg-white rounded p-3 shadow-sm">
                      <div className="font-medium text-sm text-gray-900">Smart Contract Auditing</div>
                      <div className="text-xs text-gray-600">Patent • USPTO</div>
                      <div className="text-xs text-gray-500 mt-1">Office Action Due: Jan 15, 2025</div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h4 className="font-medium text-green-900 mb-3">Allowed/Granted</h4>
                  <div className="space-y-2">
                    {ipAssets.filter(asset => asset.status === 'active').map((asset) => (
                      <div key={asset.id} className="bg-white rounded p-3 shadow-sm">
                        <div className="font-medium text-sm text-gray-900">{asset.title}</div>
                        <div className="text-xs text-gray-600">{asset.type.replace('_', ' ')} • {asset.registrationNumber}</div>
                        <div className="text-xs text-gray-500 mt-1">Granted: {asset.registrationDate?.toLocaleDateString()}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Prosecution Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Applications Filed (YTD)</span>
                  <span className="text-sm font-medium">18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Patents Granted</span>
                  <span className="text-sm font-medium text-green-600">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Trademarks Registered</span>
                  <span className="text-sm font-medium text-green-600">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Success Rate</span>
                  <span className="text-sm font-medium text-green-600">89%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Upcoming Deadlines</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Patent Response Due</div>
                    <div className="text-xs text-gray-600">Block-Chain Contract Verification</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-red-600">5 days</div>
                    <div className="text-xs text-gray-500">Jan 8, 2025</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Trademark Renewal</div>
                    <div className="text-xs text-gray-600">COUNSELFLOW</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-yellow-600">45 days</div>
                    <div className="text-xs text-gray-500">Feb 15, 2025</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Licensing View */}
      {activeView === 'licensing' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Licensing Agreements</h3>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                  New License Deal
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {licensingDeals.map((deal) => (
                <div key={deal.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-900">{deal.ipAsset}</h4>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${deal.type === 'exclusive' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                          {deal.type.toUpperCase()}
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(deal.status)}`}>
                          {deal.status.toUpperCase()}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Licensee: {deal.licensee}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500">
                        <div>
                          <span className="font-medium">Territory:</span> {deal.territory}
                        </div>
                        <div>
                          <span className="font-medium">Royalty Rate:</span> {deal.royaltyRate}%
                        </div>
                        <div>
                          <span className="font-medium">Minimum Guarantee:</span> ${deal.minimumGuarantee.toLocaleString()}
                        </div>
                        <div>
                          <span className="font-medium">Revenue (YTD):</span> ${deal.revenue.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        Term: {deal.startDate.toLocaleDateString()} - {deal.endDate.toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button className="px-3 py-1 border border-gray-300 text-gray-700 text-xs rounded hover:bg-gray-50">
                        Manage
                      </button>
                      <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Licensing Revenue</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Revenue (YTD)</span>
                  <span className="text-sm font-medium">${licensingDeals.reduce((sum, deal) => sum + deal.revenue, 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Active Licenses</span>
                  <span className="text-sm font-medium">{licensingDeals.filter(d => d.status === 'active').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Average Royalty Rate</span>
                  <span className="text-sm font-medium">{(licensingDeals.reduce((sum, deal) => sum + deal.royaltyRate, 0) / licensingDeals.length).toFixed(1)}%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Geographic Distribution</h3>
              <div className="space-y-2">
                {Array.from(new Set(licensingDeals.map(d => d.territory))).map((territory, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-sm text-gray-600">{territory}</span>
                    <span className="text-sm font-medium">{licensingDeals.filter(d => d.territory === territory).length} licenses</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enforcement View */}
      {activeView === 'enforcement' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">IP Enforcement Cases</h3>
                <button className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700">
                  Report Infringement
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {enforcementCases.map((case_) => (
                <div key={case_.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-900">{case_.ipAsset}</h4>
                        <div className={`px-2 py-1 rounded text-xs font-medium uppercase ${case_.type === 'patent_infringement' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                          {case_.type.replace('_', ' ')}
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(case_.status)}`}>
                          {case_.status.toUpperCase()}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{case_.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500">
                        <div>
                          <span className="font-medium">Defendant:</span> {case_.defendant}
                        </div>
                        <div>
                          <span className="font-medium">Jurisdiction:</span> {case_.jurisdiction}
                        </div>
                        <div>
                          <span className="font-medium">Attorney:</span> {case_.attorney}
                        </div>
                        <div>
                          <span className="font-medium">Filed:</span> {case_.filingDate.toLocaleDateString()}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs text-gray-500 mt-2">
                        <div>
                          <span className="font-medium">Estimated Costs:</span> ${case_.estimatedCosts.toLocaleString()}
                        </div>
                        {case_.potentialDamages && (
                          <div>
                            <span className="font-medium">Potential Damages:</span> ${case_.potentialDamages.toLocaleString()}
                          </div>
                        )}
                        {case_.settlementAmount && (
                          <div>
                            <span className="font-medium">Settlement:</span> ${case_.settlementAmount.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button className="px-3 py-1 border border-gray-300 text-gray-700 text-xs rounded hover:bg-gray-50">
                        Manage
                      </button>
                      <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Enforcement Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Cases (All Time)</span>
                  <span className="text-sm font-medium">15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Active Cases</span>
                  <span className="text-sm font-medium text-red-600">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Cases Won</span>
                  <span className="text-sm font-medium text-green-600">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Settlements</span>
                  <span className="text-sm font-medium text-blue-600">4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Success Rate</span>
                  <span className="text-sm font-medium text-green-600">80%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Financial Impact</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Legal Costs</span>
                  <span className="text-sm font-medium">$425,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Damages Recovered</span>
                  <span className="text-sm font-medium text-green-600">$850,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Net Recovery</span>
                  <span className="text-sm font-medium text-green-600">$425,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">ROI</span>
                  <span className="text-sm font-medium text-green-600">200%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default IPManagement
