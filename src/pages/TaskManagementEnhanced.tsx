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
  AreaChart,
  Area
} from 'recharts'
import { 
  CheckSquare,
  Clock,
  User,
  Calendar,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Play,
  Pause,
  CheckCircle,
  AlertTriangle,
  Target,
  TrendingUp,
  Users,
  BarChart3,
  Activity,
  Timer,
  Flag,
  ArrowRight
} from 'lucide-react'
import { tasksData, Task } from '@/data/demoData'
import { cn } from '@/lib/utils'

const TaskManagementEnhanced: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterPriority, setFilterPriority] = useState<string>('all')

  // Analytics calculations
  const analytics = useMemo(() => {
    const totalTasks = tasksData.length
    const completedTasks = tasksData.filter(t => t.status === 'Completed').length
    const inProgressTasks = tasksData.filter(t => t.status === 'In Progress').length
    const overdueTasks = tasksData.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'Completed').length

    // Priority distribution
    const priorityDistribution = tasksData.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Status distribution
    const statusDistribution = tasksData.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Assignee workload
    const assigneeWorkload = tasksData.reduce((acc, task) => {
      acc[task.assignee] = (acc[task.assignee] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Completion rate over time (mock data for demo)
    const completionTrend = [
      { month: 'Jan', completed: 24, total: 30 },
      { month: 'Feb', completed: 28, total: 35 },
      { month: 'Mar', completed: 32, total: 40 },
      { month: 'Apr', completed: 29, total: 38 },
      { month: 'May', completed: 35, total: 42 },
      { month: 'Jun', completed: 31, total: 36 }
    ]

    return {
      totalTasks,
      completedTasks,
      inProgressTasks,
      overdueTasks,
      completionRate: Math.round((completedTasks / totalTasks) * 100),
      priorityDistribution: Object.entries(priorityDistribution).map(([priority, count]) => ({ priority, count })),
      statusDistribution: Object.entries(statusDistribution).map(([status, count]) => ({ status, count })),
      assigneeWorkload: Object.entries(assigneeWorkload).map(([assignee, count]) => ({ assignee, count })),
      completionTrend
    }
  }, [])

  const filteredTasks = useMemo(() => {
    return tasksData.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.assignee.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === 'all' || task.status === filterStatus
      const matchesPriority = filterPriority === 'all' || task.priority === filterPriority
      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [searchTerm, filterStatus, filterPriority])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'text-red-700 bg-red-100 border-red-200'
      case 'High': return 'text-red-600 bg-red-50 border-red-200'
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'Low': return 'text-green-600 bg-green-50 border-green-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-100'
      case 'In Progress': return 'text-blue-600 bg-blue-100'
      case 'Review': return 'text-purple-600 bg-purple-100'
      case 'Not Started': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const pieColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'kanban', label: 'Kanban Board', icon: CheckSquare },
    { id: 'tasks', label: 'All Tasks', icon: Target },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp }
  ]

  return (
    <CorporateLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Task Management</h1>
            <p className="text-slate-600">Track and manage tasks across your legal team</p>
          </div>
          <CorporateButton className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </CorporateButton>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <CorporateCard>
              <CorporateCardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Tasks</p>
                    <p className="text-2xl font-bold text-slate-900">{analytics.totalTasks}</p>
                  </div>
                  <Target className="w-8 h-8 text-blue-600" />
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
                    <p className="text-sm font-medium text-slate-600">Completed</p>
                    <p className="text-2xl font-bold text-slate-900">{analytics.completedTasks}</p>
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
                    <p className="text-sm font-medium text-slate-600">In Progress</p>
                    <p className="text-2xl font-bold text-slate-900">{analytics.inProgressTasks}</p>
                  </div>
                  <Activity className="w-8 h-8 text-blue-600" />
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
                    <p className="text-sm font-medium text-slate-600">Overdue</p>
                    <p className="text-2xl font-bold text-slate-900">{analytics.overdueTasks}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
              </CorporateCardContent>
            </CorporateCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <CorporateCard>
              <CorporateCardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Completion Rate</p>
                    <p className="text-2xl font-bold text-slate-900">{analytics.completionRate}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
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
              {/* Priority Distribution */}
              <CorporateCard>
                <CorporateCardHeader>
                  <h3 className="text-lg font-medium">Task Priority Distribution</h3>
                </CorporateCardHeader>
                <CorporateCardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={analytics.priorityDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ priority, count }) => `${priority}: ${count}`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {analytics.priorityDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CorporateCardContent>
              </CorporateCard>

              {/* Status Distribution */}
              <CorporateCard>
                <CorporateCardHeader>
                  <h3 className="text-lg font-medium">Task Status Distribution</h3>
                </CorporateCardHeader>
                <CorporateCardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analytics.statusDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="status" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CorporateCardContent>
              </CorporateCard>

              {/* Team Workload */}
              <CorporateCard>
                <CorporateCardHeader>
                  <h3 className="text-lg font-medium">Team Workload</h3>
                </CorporateCardHeader>
                <CorporateCardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analytics.assigneeWorkload}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="assignee" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CorporateCardContent>
              </CorporateCard>

              {/* Completion Trend */}
              <CorporateCard>
                <CorporateCardHeader>
                  <h3 className="text-lg font-medium">Completion Trend</h3>
                </CorporateCardHeader>
                <CorporateCardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={analytics.completionTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="completed" stackId="1" stroke="#3B82F6" fill="#3B82F6" />
                      <Area type="monotone" dataKey="total" stackId="2" stroke="#E5E7EB" fill="#E5E7EB" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CorporateCardContent>
              </CorporateCard>
            </motion.div>
          )}

          {activeTab === 'kanban' && (
            <motion.div
              key="kanban"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {['Not Started', 'In Progress', 'Review', 'Completed'].map((status) => (
                  <CorporateCard key={status}>
                    <CorporateCardHeader>
                      <h3 className="text-md font-medium flex items-center justify-between">
                        {status}
                        <span className="text-sm bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                          {tasksData.filter(t => t.status === status).length}
                        </span>
                      </h3>
                    </CorporateCardHeader>
                    <CorporateCardContent>
                      <div className="space-y-3">
                        {tasksData
                          .filter(task => task.status === status)
                          .map((task) => (
                            <div key={task.id} className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="text-sm font-medium text-slate-900">{task.title}</h4>
                                <span className={cn(
                                  "inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium border",
                                  getPriorityColor(task.priority)
                                )}>
                                  {task.priority}
                                </span>
                              </div>
                              <p className="text-xs text-slate-600 mb-2 line-clamp-2">{task.description}</p>
                              <div className="flex items-center justify-between text-xs text-slate-500">
                                <span>{task.assignee}</span>
                                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                              </div>
                              {task.estimatedHours && (
                                <div className="mt-2 text-xs text-slate-500">
                                  Est: {task.estimatedHours}h
                                  {task.actualHours && ` | Actual: ${task.actualHours}h`}
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    </CorporateCardContent>
                  </CorporateCard>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'tasks' && (
            <motion.div
              key="tasks"
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
                          placeholder="Search tasks..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 w-full border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Status</option>
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Review">Review</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <select
                      value={filterPriority}
                      onChange={(e) => setFilterPriority(e.target.value)}
                      className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Priorities</option>
                      <option value="Critical">Critical</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </CorporateCardContent>
              </CorporateCard>

              {/* Tasks Table */}
              <CorporateCard>
                <CorporateCardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Task
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Assignee
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Priority
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Due Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Hours
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-200">
                        {filteredTasks.map((task) => {
                          const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'Completed'
                          return (
                            <tr key={task.id} className={cn("hover:bg-slate-50", isOverdue && "bg-red-50")}>
                              <td className="px-6 py-4">
                                <div>
                                  <div className="text-sm font-medium text-slate-900">{task.title}</div>
                                  <div className="text-sm text-slate-500 line-clamp-1">{task.description}</div>
                                  <div className="text-xs text-slate-400 mt-1">{task.id}</div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center mr-3">
                                    <User className="w-4 h-4 text-slate-600" />
                                  </div>
                                  <span className="text-sm text-slate-900">{task.assignee}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={cn(
                                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                                  getPriorityColor(task.priority)
                                )}>
                                  {task.priority}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={cn(
                                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                  getStatusColor(task.status)
                                )}>
                                  {task.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                <div className={cn(isOverdue && "text-red-600 font-medium")}>
                                  {new Date(task.dueDate).toLocaleDateString()}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                <div>
                                  <div>Est: {task.estimatedHours}h</div>
                                  {task.actualHours && <div className="text-xs text-slate-500">Act: {task.actualHours}h</div>}
                                </div>
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
                          )
                        })}
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
              className="grid grid-cols-1 gap-6"
            >
              {/* Performance Analytics */}
              <CorporateCard>
                <CorporateCardHeader>
                  <h3 className="text-lg font-medium">Task Performance Analytics</h3>
                </CorporateCardHeader>
                <CorporateCardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={analytics.completionTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={2} />
                      <Line type="monotone" dataKey="total" stroke="#3B82F6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CorporateCardContent>
              </CorporateCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </CorporateLayout>
  )
}

export default TaskManagementEnhanced
