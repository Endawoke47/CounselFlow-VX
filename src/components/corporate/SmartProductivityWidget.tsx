import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { 
  Clock, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  Users,
  FileText,
  BarChart3,
  Zap
} from 'lucide-react'

interface ProductivityStats {
  tasksCompleted: number
  tasksRemaining: number
  hoursWorked: number
  meetingsToday: number
  contractsReviewed: number
  urgentItems: number
}

interface SmartProductivityWidgetProps {
  className?: string
}

export const SmartProductivityWidget: React.FC<SmartProductivityWidgetProps> = ({ className }) => {
  const [stats, setStats] = useState<ProductivityStats>({
    tasksCompleted: 8,
    tasksRemaining: 12,
    hoursWorked: 6.5,
    meetingsToday: 3,
    contractsReviewed: 5,
    urgentItems: 2
  })

  const [currentTime, setCurrentTime] = useState(new Date())
  const [isExpanded, setIsExpanded] = useState(false)

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  const getProductivityScore = () => {
    const completed = stats.tasksCompleted
    const total = stats.tasksCompleted + stats.tasksRemaining
    return total > 0 ? Math.round((completed / total) * 100) : 0
  }

  const getProductivityLevel = (score: number) => {
    if (score >= 80) return { level: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' }
    if (score >= 60) return { level: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' }
    if (score >= 40) return { level: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    return { level: 'Needs Focus', color: 'text-red-600', bg: 'bg-red-100' }
  }

  const productivity = getProductivityLevel(getProductivityScore())

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  }

  const getWorkingHoursProgress = () => {
    const targetHours = 8
    return Math.min((stats.hoursWorked / targetHours) * 100, 100)
  }

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-100 transition-all duration-200"
      >
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-corporate-600 to-corporate-700 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <div className="hidden lg:block">
            <div className="text-sm font-medium text-slate-900">
              {formatTime(currentTime)}
            </div>
            <div className="text-xs text-slate-500">
              {getProductivityScore()}% productivity
            </div>
          </div>
        </div>
        {stats.urgentItems > 0 && (
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        )}
      </button>

      {isExpanded && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsExpanded(false)}
          />
          
          {/* Expanded Widget */}
          <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-20">
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-corporate-600 to-corporate-700 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Daily Productivity</h3>
                  <p className="text-sm opacity-90">{formatTime(currentTime)} • {currentTime.toLocaleDateString()}</p>
                </div>
                <div className={cn(
                  'px-3 py-1 rounded-full text-xs font-medium',
                  'bg-white bg-opacity-20'
                )}>
                  {productivity.level}
                </div>
              </div>
              
              {/* Productivity Score */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm opacity-90">Overall Progress</span>
                  <span className="text-sm font-medium">{getProductivityScore()}%</span>
                </div>
                <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-500"
                    style={{ width: `${getProductivityScore()}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="p-4 space-y-4">
              {/* Tasks */}
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium text-slate-900">Tasks</div>
                    <div className="text-sm text-slate-500">
                      {stats.tasksCompleted} done, {stats.tasksRemaining} remaining
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-slate-900">
                    {stats.tasksCompleted + stats.tasksRemaining}
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-slate-900">Hours Worked</div>
                    <div className="text-sm text-slate-500">Target: 8 hours</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-slate-900">
                    {stats.hoursWorked}h
                  </div>
                  <div className="w-16 bg-slate-200 rounded-full h-1 mt-1">
                    <div 
                      className="bg-blue-600 h-1 rounded-full transition-all duration-500"
                      style={{ width: `${getWorkingHoursProgress()}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Today's Activities */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-slate-900">Meetings</span>
                  </div>
                  <div className="text-lg font-bold text-slate-900">{stats.meetingsToday}</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <FileText className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium text-slate-900">Reviews</span>
                  </div>
                  <div className="text-lg font-bold text-slate-900">{stats.contractsReviewed}</div>
                </div>
              </div>

              {/* Urgent Items */}
              {stats.urgentItems > 0 && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <div>
                      <div className="font-medium text-red-900">Urgent Items</div>
                      <div className="text-sm text-red-700">
                        {stats.urgentItems} items require immediate attention
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="pt-2 border-t border-slate-200">
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center space-x-2 p-2 text-sm bg-corporate-600 text-white rounded-lg hover:bg-corporate-700 transition-colors">
                    <Target className="w-4 h-4" />
                    <span>Focus Mode</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 p-2 text-sm border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                    <TrendingUp className="w-4 h-4" />
                    <span>Analytics</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default SmartProductivityWidget
