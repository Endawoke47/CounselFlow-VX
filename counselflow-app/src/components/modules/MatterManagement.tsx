// Module 4: Matter Management
'use client'

import React, { useState, useMemo } from 'react'
import { ModuleProps, Priority, MatterStatus } from '@/types'

type MatterManagementProps = ModuleProps

export function MatterManagement({
  className
}: MatterManagementProps) {
  const [activeView, setActiveView] = useState<'dashboard' | 'matters' | 'calendar' | 'billing'>('dashboard')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedMatter, setSelectedMatter] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<MatterStatus | 'all'>('all')
  const [filterPriority, setFilterPriority] = useState<Priority | 'all'>('all')

  // Mock matter data
  const matters = useMemo(() => [
    {
      id: 'matter_1',
      title: 'TechCorp Software Licensing Negotiation',
      description: 'Enterprise software licensing agreement negotiation and contract drafting',
      client: {
        id: 'client_1',
        name: 'TechCorp Inc.',
        type: 'corporation' as const,
        industry: 'Technology',
        jurisdiction: 'CA',
        encryptionKeyId: 'key_1',
        privilegeLevel: 'elevated' as const,
        conflictStatus: 'cleared' as const,
        matters: [],
        createdAt: new Date(),
        metadata: {}
      },
      status: 'active' as MatterStatus,
      priority: 'high' as Priority,
      practiceArea: 'Technology Law',
      jurisdiction: 'California',
      leadAttorney: 'Sarah Johnson, Esq.',
      team: [
        { id: 'atty_1', name: 'Sarah Johnson', role: 'Lead Attorney', hourlyRate: 650 },
        { id: 'atty_2', name: 'Michael Chen', role: 'Associate', hourlyRate: 450 },
        { id: 'para_1', name: 'Emma Wilson', role: 'Paralegal', hourlyRate: 180 }
      ],
      timeTracking: {
        totalHours: 127.5,
        billableHours: 115.0,
        targetHours: 200.0,
        deadlineDate: new Date('2025-03-15'),
        utilization: 82.3
      },
      budget: {
        estimated: 125000,
        actual: 89500,
        remaining: 35500,
        currency: 'USD',
        expenses: 12500
      },
      keyDates: [
        { type: 'deadline', date: new Date('2025-03-15'), description: 'Contract execution deadline' },
        { type: 'milestone', date: new Date('2025-02-01'), description: 'First draft completion' },
        { type: 'court_date', date: new Date('2025-02-20'), description: 'Client review meeting' }
      ],
      riskLevel: 'medium',
      confidentialityLevel: 'attorney_client_privileged',
      tags: ['Technology', 'Contract', 'Licensing', 'Enterprise'],
      createdAt: new Date('2024-12-01'),
      updatedAt: new Date(),
      metadata: {
        conflictCheck: 'cleared',
        ethicsReview: 'completed',
        retainerStatus: 'active'
      }
    },
    {
      id: 'matter_2',
      title: 'FinanceGroup Merger Due Diligence',
      description: 'Legal due diligence for acquisition of regional bank',
      client: {
        id: 'client_2',
        name: 'FinanceGroup LLC',
        type: 'corporation' as const,
        industry: 'Financial Services',
        jurisdiction: 'NY',
        encryptionKeyId: 'key_2',
        privilegeLevel: 'maximum' as const,
        conflictStatus: 'cleared' as const,
        matters: [],
        createdAt: new Date(),
        metadata: {}
      },
      status: 'active' as MatterStatus,
      priority: 'critical' as Priority,
      practiceArea: 'Mergers & Acquisitions',
      jurisdiction: 'New York',
      leadAttorney: 'David Rodriguez, Esq.',
      team: [
        { id: 'atty_3', name: 'David Rodriguez', role: 'Lead Attorney', hourlyRate: 750 },
        { id: 'atty_4', name: 'Jennifer Wu', role: 'Senior Associate', hourlyRate: 550 },
        { id: 'atty_5', name: 'Robert Kim', role: 'Associate', hourlyRate: 450 }
      ],
      timeTracking: {
        totalHours: 342.8,
        billableHours: 298.5,
        targetHours: 500.0,
        deadlineDate: new Date('2025-04-30'),
        utilization: 91.7
      },
      budget: {
        estimated: 350000,
        actual: 187500,
        remaining: 162500,
        currency: 'USD',
        expenses: 28500
      },
      keyDates: [
        { type: 'deadline', date: new Date('2025-04-30'), description: 'Transaction closing' },
        { type: 'milestone', date: new Date('2025-02-15'), description: 'Due diligence completion' },
        { type: 'court_date', date: new Date('2025-03-01'), description: 'Regulatory filing deadline' }
      ],
      riskLevel: 'high',
      confidentialityLevel: 'attorney_client_privileged',
      tags: ['M&A', 'Banking', 'Due Diligence', 'Regulatory'],
      createdAt: new Date('2024-11-15'),
      updatedAt: new Date(),
      metadata: {
        conflictCheck: 'cleared',
        ethicsReview: 'completed',
        retainerStatus: 'active'
      }
    }
  ], [])

  const filteredMatters = useMemo(() => {
    return matters.filter(matter => {
      const statusMatch = filterStatus === 'all' || matter.status === filterStatus
      const priorityMatch = filterPriority === 'all' || matter.priority === filterPriority
      return statusMatch && priorityMatch
    })
  }, [matters, filterStatus, filterPriority])

  const dashboardMetrics = useMemo(() => {
    const totalMatters = matters.length
    const activeMatters = matters.filter(m => m.status === 'active').length
    const totalHours = matters.reduce((sum, m) => sum + m.timeTracking.totalHours, 0)
    const totalRevenue = matters.reduce((sum, m) => sum + m.budget.actual, 0)
    const avgUtilization = matters.reduce((sum, m) => sum + m.timeTracking.utilization, 0) / matters.length

    return {
      totalMatters,
      activeMatters,
      totalHours: Math.round(totalHours * 10) / 10,
      totalRevenue: Math.round(totalRevenue),
      avgUtilization: Math.round(avgUtilization * 10) / 10
    }
  }, [matters])

  const getPriorityColor = (priority: Priority) => {
    const colors = {
      low: 'text-green-600 bg-green-50 border-green-200',
      medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      high: 'text-orange-600 bg-orange-50 border-orange-200',
      critical: 'text-red-600 bg-red-50 border-red-200'
    }
    return colors[priority] || colors.medium
  }

  const getStatusColor = (status: MatterStatus) => {
    const colors = {
      draft: 'text-gray-600 bg-gray-50',
      active: 'text-green-600 bg-green-50',
      pending: 'text-blue-600 bg-blue-50',
      on_hold: 'text-yellow-600 bg-yellow-50',
      completed: 'text-blue-600 bg-blue-50',
      cancelled: 'text-red-600 bg-red-50',
      archived: 'text-gray-400 bg-gray-50'
    }
    return colors[status] || colors.active
  }

  return (
    <div className={`p-6 space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Matter Management</h2>
          <p className="text-gray-600">Manage legal matters, track time, and monitor progress</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
            New Matter
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: '📊' },
            { id: 'matters', name: 'All Matters', icon: '📁' },
            { id: 'calendar', name: 'Calendar', icon: '📅' },
            { id: 'billing', name: 'Time & Billing', icon: '💰' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id as 'dashboard' | 'matters' | 'calendar' | 'billing')}
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
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white rounded-lg border shadow-sm p-4">
              <h4 className="font-medium text-gray-900 mb-2">Total Matters</h4>
              <div className="text-2xl font-bold text-blue-600">{dashboardMetrics.totalMatters}</div>
              <p className="text-xs text-gray-600">All time</p>
            </div>
            <div className="bg-white rounded-lg border shadow-sm p-4">
              <h4 className="font-medium text-gray-900 mb-2">Active Matters</h4>
              <div className="text-2xl font-bold text-green-600">{dashboardMetrics.activeMatters}</div>
              <p className="text-xs text-gray-600">Currently active</p>
            </div>
            <div className="bg-white rounded-lg border shadow-sm p-4">
              <h4 className="font-medium text-gray-900 mb-2">Total Hours</h4>
              <div className="text-2xl font-bold text-purple-600">{dashboardMetrics.totalHours}</div>
              <p className="text-xs text-gray-600">Logged this month</p>
            </div>
            <div className="bg-white rounded-lg border shadow-sm p-4">
              <h4 className="font-medium text-gray-900 mb-2">Revenue</h4>
              <div className="text-2xl font-bold text-emerald-600">${dashboardMetrics.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-gray-600">Year to date</p>
            </div>
            <div className="bg-white rounded-lg border shadow-sm p-4">
              <h4 className="font-medium text-gray-900 mb-2">Utilization</h4>
              <div className="text-2xl font-bold text-orange-600">{dashboardMetrics.avgUtilization}%</div>
              <p className="text-xs text-gray-600">Average</p>
            </div>
          </div>

          {/* Recent Matters */}
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Recent Matters</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {matters.slice(0, 3).map((matter) => (
                <div key={matter.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-900">{matter.title}</h4>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(matter.status)}`}>
                          {matter.status.replace('_', ' ').toUpperCase()}
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(matter.priority)}`}>
                          {matter.priority.toUpperCase()}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{matter.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500">
                        <div>
                          <span className="font-medium">Client:</span> {matter.client.name}
                        </div>
                        <div>
                          <span className="font-medium">Lead:</span> {matter.leadAttorney}
                        </div>
                        <div>
                          <span className="font-medium">Hours:</span> {matter.timeTracking.totalHours}
                        </div>
                        <div>
                          <span className="font-medium">Budget:</span> ${matter.budget.actual.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedMatter(matter.id)}
                      className="ml-4 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* All Matters View */}
      {activeView === 'matters' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-lg border shadow-sm p-4">
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as MatterStatus | 'all')}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">All Statuses</option>
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="on_hold">On Hold</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value as Priority | 'all')}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">All Priorities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <input
                  type="text"
                  placeholder="Search matters..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Matters List */}
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">All Matters ({filteredMatters.length})</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredMatters.map((matter) => (
                <div key={matter.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-900">{matter.title}</h4>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(matter.status)}`}>
                          {matter.status.replace('_', ' ').toUpperCase()}
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(matter.priority)}`}>
                          {matter.priority.toUpperCase()}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{matter.description}</p>
                      
                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{matter.timeTracking.utilization}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${matter.timeTracking.utilization}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-xs text-gray-500">
                        <div>
                          <span className="font-medium">Client:</span> {matter.client.name}
                        </div>
                        <div>
                          <span className="font-medium">Lead:</span> {matter.leadAttorney}
                        </div>
                        <div>
                          <span className="font-medium">Hours:</span> {matter.timeTracking.totalHours}/{matter.timeTracking.targetHours}
                        </div>
                        <div>
                          <span className="font-medium">Budget:</span> ${matter.budget.actual.toLocaleString()}/${matter.budget.estimated.toLocaleString()}
                        </div>
                        <div>
                          <span className="font-medium">Practice:</span> {matter.practiceArea}
                        </div>
                        <div>
                          <span className="font-medium">Updated:</span> {matter.updatedAt.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button className="px-3 py-1 border border-gray-300 text-gray-700 text-xs rounded hover:bg-gray-50">
                        Edit
                      </button>
                      <button 
                        onClick={() => setSelectedMatter(matter.id)}
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                      >
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

      {/* Calendar View */}
      {activeView === 'calendar' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Matter Calendar & Deadlines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {matters.flatMap(matter => 
                matter.keyDates.map(date => ({
                  ...date,
                  matterTitle: matter.title,
                  matterId: matter.id,
                  priority: matter.priority
                }))
              ).sort((a, b) => a.date.getTime() - b.date.getTime()).map((event, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      event.type === 'deadline' ? 'bg-red-100 text-red-800' :
                      event.type === 'milestone' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {event.type.replace('_', ' ').toUpperCase()}
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(event.priority)}`}>
                      {event.priority.toUpperCase()}
                    </div>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">{event.description}</h4>
                  <p className="text-sm text-gray-600 mb-2">{event.matterTitle}</p>
                  <p className="text-xs text-gray-500">{event.date.toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Time & Billing View */}
      {activeView === 'billing' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg border shadow-sm p-4">
              <h4 className="font-medium text-gray-900 mb-2">Billable Hours</h4>
              <div className="text-2xl font-bold text-green-600">
                {matters.reduce((sum, m) => sum + m.timeTracking.billableHours, 0)}
              </div>
              <p className="text-xs text-gray-600">This month</p>
            </div>
            <div className="bg-white rounded-lg border shadow-sm p-4">
              <h4 className="font-medium text-gray-900 mb-2">Revenue Generated</h4>
              <div className="text-2xl font-bold text-blue-600">
                ${matters.reduce((sum, m) => sum + m.budget.actual, 0).toLocaleString()}
              </div>
              <p className="text-xs text-gray-600">Year to date</p>
            </div>
            <div className="bg-white rounded-lg border shadow-sm p-4">
              <h4 className="font-medium text-gray-900 mb-2">Average Rate</h4>
              <div className="text-2xl font-bold text-purple-600">$487</div>
              <p className="text-xs text-gray-600">Blended hourly rate</p>
            </div>
            <div className="bg-white rounded-lg border shadow-sm p-4">
              <h4 className="font-medium text-gray-900 mb-2">Collection Rate</h4>
              <div className="text-2xl font-bold text-orange-600">94.2%</div>
              <p className="text-xs text-gray-600">Payment efficiency</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Time Tracking by Matter</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {matters.map((matter) => (
                <div key={matter.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900">{matter.title}</h4>
                      <p className="text-sm text-gray-600">{matter.client.name}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900">
                        {matter.timeTracking.totalHours} hrs
                      </div>
                      <div className="text-sm text-gray-600">
                        ${matter.budget.actual.toLocaleString()} revenue
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm font-medium text-gray-900 mb-1">Team Breakdown</div>
                      <div className="space-y-1">
                        {matter.team.map((member) => (
                          <div key={member.id} className="flex justify-between text-xs">
                            <span>{member.name}</span>
                            <span>${member.hourlyRate}/hr</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm font-medium text-gray-900 mb-1">Progress</div>
                      <div className="text-xs text-gray-600">
                        {matter.timeTracking.totalHours} / {matter.timeTracking.targetHours} hours
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(matter.timeTracking.totalHours / matter.timeTracking.targetHours) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm font-medium text-gray-900 mb-1">Budget Status</div>
                      <div className="text-xs text-gray-600">
                        ${matter.budget.actual.toLocaleString()} / ${matter.budget.estimated.toLocaleString()}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${(matter.budget.actual / matter.budget.estimated) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MatterManagement
