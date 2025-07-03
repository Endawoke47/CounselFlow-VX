import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  Lightbulb, 
  HelpCircle,
  BookOpen,
  Zap,
  TrendingUp,
  Users,
  FileText,
  Calendar,
  Shield,
  Scale,
  Briefcase,
  Target,
  ChevronRight,
  X,
  ExternalLink
} from 'lucide-react'

interface ContextualSuggestion {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  action: () => void
  type: 'tip' | 'shortcut' | 'resource' | 'action'
  priority: 'high' | 'medium' | 'low'
}

interface SmartContextHelperProps {
  className?: string
}

export const SmartContextHelper: React.FC<SmartContextHelperProps> = ({ className }) => {
  const { t } = useLanguage()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<ContextualSuggestion[]>([])
  const [currentContext, setCurrentContext] = useState<string>('')

  // Context-aware suggestions based on current route
  useEffect(() => {
    const path = location.pathname
    let contextSuggestions: ContextualSuggestion[] = []
    let context = ''

    if (path === '/' || path.includes('dashboard')) {
      context = 'Dashboard'
      contextSuggestions = [
        {
          id: 'dashboard-overview',
          title: 'Quick Overview',
          description: 'Press Cmd+1 to quickly navigate to dashboard sections',
          icon: Target,
          action: () => {},
          type: 'shortcut',
          priority: 'medium'
        },
        {
          id: 'dashboard-filter',
          title: 'Smart Filtering',
          description: 'Use the filter bar to quickly find matters by status or urgency',
          icon: TrendingUp,
          action: () => {},
          type: 'tip',
          priority: 'high'
        },
        {
          id: 'dashboard-reports',
          title: 'Generate Reports',
          description: 'Create custom reports from your dashboard data',
          icon: FileText,
          action: () => {},
          type: 'action',
          priority: 'low'
        }
      ]
    } else if (path.includes('matters')) {
      context = 'Matter Management'
      contextSuggestions = [
        {
          id: 'matter-templates',
          title: 'Use Matter Templates',
          description: 'Save time by using pre-configured matter templates',
          icon: Briefcase,
          action: () => {},
          type: 'tip',
          priority: 'high'
        },
        {
          id: 'matter-bulk',
          title: 'Bulk Actions',
          description: 'Select multiple matters to update status or assign team members',
          icon: Users,
          action: () => {},
          type: 'shortcut',
          priority: 'medium'
        },
        {
          id: 'matter-automation',
          title: 'Set Up Automation',
          description: 'Automate routine tasks like status updates and reminders',
          icon: Zap,
          action: () => {},
          type: 'action',
          priority: 'high'
        }
      ]
    } else if (path.includes('contracts')) {
      context = 'Contract Management'
      contextSuggestions = [
        {
          id: 'contract-ai',
          title: 'AI Contract Review',
          description: 'Use AI-powered analysis to identify risks and inconsistencies',
          icon: Shield,
          action: () => {},
          type: 'action',
          priority: 'high'
        },
        {
          id: 'contract-templates',
          title: 'Template Library',
          description: 'Access pre-approved contract templates for faster drafting',
          icon: BookOpen,
          action: () => {},
          type: 'resource',
          priority: 'medium'
        },
        {
          id: 'contract-collaboration',
          title: 'Real-time Collaboration',
          description: 'Invite stakeholders to review and comment on contracts',
          icon: Users,
          action: () => {},
          type: 'tip',
          priority: 'medium'
        }
      ]
    } else if (path.includes('dispute')) {
      context = 'Dispute Resolution'
      contextSuggestions = [
        {
          id: 'dispute-timeline',
          title: 'Case Timeline',
          description: 'Track important dates and deadlines automatically',
          icon: Calendar,
          action: () => {},
          type: 'tip',
          priority: 'high'
        },
        {
          id: 'dispute-precedents',
          title: 'Similar Cases',
          description: 'Find precedents and similar cases to strengthen your argument',
          icon: Scale,
          action: () => {},
          type: 'resource',
          priority: 'high'
        },
        {
          id: 'dispute-evidence',
          title: 'Evidence Management',
          description: 'Organize and tag evidence for easy retrieval during hearings',
          icon: FileText,
          action: () => {},
          type: 'action',
          priority: 'medium'
        }
      ]
    }

    setSuggestions(contextSuggestions)
    setCurrentContext(context)
  }, [location.pathname])

  const getSuggestionTypeIcon = (type: string) => {
    switch (type) {
      case 'tip': return Lightbulb
      case 'shortcut': return Zap
      case 'resource': return BookOpen
      case 'action': return Target
      default: return HelpCircle
    }
  }

  const getSuggestionTypeColor = (type: string) => {
    switch (type) {
      case 'tip': return 'text-yellow-600 bg-yellow-100'
      case 'shortcut': return 'text-purple-600 bg-purple-100'
      case 'resource': return 'text-blue-600 bg-blue-100'
      case 'action': return 'text-green-600 bg-green-100'
      default: return 'text-slate-600 bg-slate-100'
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'low': return 'bg-slate-100 text-slate-600 border-slate-200'
      default: return 'bg-slate-100 text-slate-600 border-slate-200'
    }
  }

  if (suggestions.length === 0) return null

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200 relative"
        title="Smart suggestions for this page"
      >
        <Lightbulb className="w-5 h-5 text-slate-600" />
        {suggestions.some(s => s.priority === 'high') && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
        )}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Helper Panel */}
          <div className="absolute right-0 top-full mt-2 w-96 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-20">
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5" />
                  <h3 className="font-medium">Smart Suggestions</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm opacity-90 mt-1">
                Contextual tips for {currentContext}
              </p>
            </div>

            {/* Suggestions */}
            <div className="max-h-96 overflow-y-auto">
              {suggestions.map((suggestion, index) => {
                const TypeIcon = getSuggestionTypeIcon(suggestion.type)
                return (
                  <div
                    key={suggestion.id}
                    className={cn(
                      'p-4 transition-colors hover:bg-slate-50',
                      index < suggestions.length - 1 && 'border-b border-slate-100'
                    )}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={cn(
                        'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center',
                        getSuggestionTypeColor(suggestion.type)
                      )}>
                        <TypeIcon className="w-4 h-4" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-slate-900 text-sm">
                            {suggestion.title}
                          </h4>
                          <div className="flex items-center space-x-2">
                            {suggestion.priority === 'high' && (
                              <span className={cn(
                                'px-2 py-1 text-xs rounded-full border',
                                getPriorityBadge(suggestion.priority)
                              )}>
                                New
                              </span>
                            )}
                            <span className={cn(
                              'px-2 py-1 text-xs rounded-full',
                              getSuggestionTypeColor(suggestion.type)
                            )}>
                              {suggestion.type}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-slate-600 mb-3">
                          {suggestion.description}
                        </p>
                        
                        <button
                          onClick={() => {
                            suggestion.action()
                            setIsOpen(false)
                          }}
                          className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          <span>Learn more</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  {suggestions.length} suggestion{suggestions.length !== 1 ? 's' : ''} available
                </div>
                <button className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-700 transition-colors">
                  <BookOpen className="w-3 h-3" />
                  <span>Help Center</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default SmartContextHelper
