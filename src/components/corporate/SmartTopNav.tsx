import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/contexts/LanguageContext'
import { useSidebar } from '@/contexts/SidebarContext'
import { LanguageSelector } from '@/components/ui/LanguageSelector'
import SmartCommandPalette from './SmartCommandPalette'
import SmartProductivityWidget from './SmartProductivityWidget'
import SmartContextHelper from './SmartContextHelper'
import {
  Search,
  Bell,
  User,
  ChevronDown,
  Command,
  Plus,
  Zap,
  Clock,
  Filter,
  Star,
  Bookmark,
  Settings,
  Moon,
  Sun,
  Mic,
  Camera,
  Calendar,
  FileText,
  Users,
  Shield,
  Briefcase,
  Scale,
  Book,
  Target,
  TrendingUp,
  Activity,
  Globe,
  Cpu,
  Brain,
  ChevronRight,
  X,
  Menu
} from 'lucide-react'

interface SmartSearchResult {
  id: string
  title: string
  description: string
  type: 'matter' | 'contract' | 'document' | 'contact' | 'action'
  icon: React.ComponentType<{ className?: string }>
  href?: string
  action?: () => void
  priority: 'high' | 'medium' | 'low'
}

interface SmartNotification {
  id: string
  title: string
  message: string
  type: 'urgent' | 'important' | 'info' | 'success'
  category: 'deadline' | 'approval' | 'update' | 'task' | 'system'
  timestamp: Date
  read: boolean
  actions?: Array<{ label: string; action: () => void; type: 'primary' | 'secondary' }>
}

interface QuickAction {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  action: () => void
  shortcut?: string
  description: string
}

const smartSearchData: SmartSearchResult[] = [
  {
    id: '1',
    title: 'Acme Corp Contract Review',
    description: 'Due tomorrow - Pending legal review',
    type: 'contract',
    icon: FileText,
    href: '/contracts/acme-review',
    priority: 'high'
  },
  {
    id: '2',
    title: 'John Smith',
    description: 'Senior Legal Counsel - Available',
    type: 'contact',
    icon: Users,
    href: '/contacts/john-smith',
    priority: 'medium'
  },
  {
    id: '3',
    title: 'IP Dispute Case #2024-001',
    description: 'Patent infringement - Active litigation',
    type: 'matter',
    icon: Scale,
    href: '/matters/ip-dispute-001',
    priority: 'high'
  }
]

const smartNotifications: SmartNotification[] = [
  {
    id: '1',
    title: 'Contract Approval Required',
    message: 'Acme Corp NDA requires your approval before 5 PM today',
    type: 'urgent',
    category: 'approval',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    actions: [
      { label: 'Approve', action: () => {}, type: 'primary' },
      { label: 'Review', action: () => {}, type: 'secondary' }
    ]
  },
  {
    id: '2',
    title: 'New Matter Assignment',
    message: 'You have been assigned to TechStart acquisition matter',
    type: 'important',
    category: 'task',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: false
  },
  {
    id: '3',
    title: 'Compliance Update',
    message: 'GDPR policy updates have been published',
    type: 'info',
    category: 'update',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    read: true
  }
]

const quickActions: QuickAction[] = [
  {
    id: '1',
    label: 'New Matter',
    icon: Briefcase,
    action: () => {},
    shortcut: '⌘+N',
    description: 'Create a new legal matter'
  },
  {
    id: '2',
    label: 'Draft Contract',
    icon: FileText,
    action: () => {},
    shortcut: '⌘+D',
    description: 'Start a new contract draft'
  },
  {
    id: '3',
    label: 'Schedule Meeting',
    icon: Calendar,
    action: () => {},
    shortcut: '⌘+M',
    description: 'Schedule a client meeting'
  },
  {
    id: '4',
    label: 'Quick Note',
    icon: Book,
    action: () => {},
    shortcut: '⌘+K',
    description: 'Add a quick note or memo'
  }
]

export const SmartTopNav: React.FC = () => {
  const { t, currentLanguage } = useLanguage()
  const { isCollapsed } = useSidebar()
  const location = useLocation()
  const navigate = useNavigate()
  
  // Smart search state
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SmartSearchResult[]>([])
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isVoiceSearch, setIsVoiceSearch] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Notifications state
  const [notifications, setNotifications] = useState<SmartNotification[]>(smartNotifications)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [notificationFilter, setNotificationFilter] = useState<string>('all')

  // Quick actions state
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false)
  
  // Command palette state
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  
  // Profile state
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  
  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  // Smart context awareness
  const [currentContext, setCurrentContext] = useState<string>('')
  const [breadcrumbs, setBreadcrumbs] = useState<Array<{label: string, href?: string}>>([])

  // Real-time status
  const [onlineUsers, setOnlineUsers] = useState(23)
  const [systemStatus, setSystemStatus] = useState<'online' | 'warning' | 'error'>('online')

  // Smart search logic
  useEffect(() => {
    if (searchQuery.length > 2) {
      const filtered = smartSearchData.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  // Context awareness based on current route
  useEffect(() => {
    const path = location.pathname
    const pathSegments = path.split('/').filter(Boolean)
    
    // Set context and breadcrumbs based on current route
    if (path === '/') {
      setCurrentContext('Dashboard')
      setBreadcrumbs([{ label: 'Dashboard' }])
    } else if (path.includes('matters')) {
      setCurrentContext('Matter Management')
      setBreadcrumbs([
        { label: 'Dashboard', href: '/' },
        { label: 'Matter Management' }
      ])
    } else if (path.includes('contracts')) {
      setCurrentContext('Contract Management')
      setBreadcrumbs([
        { label: 'Dashboard', href: '/' },
        { label: 'Contract Management' }
      ])
    }
    // Add more context awareness as needed
  }, [location])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Command/Ctrl + K to open command palette
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setIsCommandPaletteOpen(true)
      }
      
      // Escape to close all dropdowns
      if (event.key === 'Escape') {
        setIsSearchFocused(false)
        setIsNotificationsOpen(false)
        setIsQuickActionsOpen(false)
        setIsProfileOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Voice search functionality
  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsVoiceSearch(true)
      // Voice search implementation would go here
      setTimeout(() => setIsVoiceSearch(false), 3000)
    }
  }

  // Mark notification as read
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  // Get unread notification count
  const unreadCount = notifications.filter(n => !n.read).length

  // Filter notifications
  const filteredNotifications = notifications.filter(notif => {
    if (notificationFilter === 'all') return true
    if (notificationFilter === 'unread') return !notif.read
    return notif.category === notificationFilter
  })

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return t('common.good_morning') || 'Good morning'
    if (hour < 18) return t('common.good_afternoon') || 'Good afternoon'
    return t('common.good_evening') || 'Good evening'
  }

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
      <div className={cn(
        'px-4 py-3 transition-all duration-300 ease-in-out',
        isCollapsed ? 'lg:ml-20' : 'lg:ml-72'
      )}>
        <div className="flex items-center justify-between gap-4 max-w-full">
          {/* Left Section - Context & Breadcrumbs */}
          <div className="flex items-center space-x-4 min-w-0 flex-shrink-0">
            <div className="flex flex-col min-w-0">
              <h2 className="text-lg lg:text-xl font-bold text-slate-900 flex items-center truncate">
                {currentContext}
                <span className="ml-2 px-2 py-1 text-xs bg-corporate-100 text-corporate-700 rounded-full flex-shrink-0">
                  {currentLanguage.toUpperCase()}
                </span>
              </h2>
              <nav className="hidden sm:flex items-center space-x-1 text-sm text-slate-500">
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={index}>
                    {crumb.href ? (
                      <button
                        onClick={() => navigate(crumb.href!)}
                        className="hover:text-slate-700 transition-colors truncate"
                      >
                        {crumb.label}
                      </button>
                    ) : (
                      crumb.label
                    )}
                    {index < breadcrumbs.length - 1 && (
                      <ChevronRight className="w-3 h-3 flex-shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </nav>
            </div>
            
            {/* Smart Context Info */}
            <div className="hidden 2xl:flex items-center space-x-4 text-sm text-slate-500">
              <span>•</span>
              <span>{getGreeting()}, John</span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <div className={cn(
                  'w-2 h-2 rounded-full',
                  systemStatus === 'online' ? 'bg-green-500' :
                  systemStatus === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                )} />
                <span>{onlineUsers} online</span>
              </div>
            </div>
          </div>

          {/* Center Section - Smart Search */}
          <div className="flex-1 max-w-md lg:max-w-lg xl:max-w-2xl mx-2 lg:mx-6" ref={searchRef}>
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onClick={() => setIsCommandPaletteOpen(true)}
                  placeholder={`${t('common.search')} matters, contracts...`}
                  className="w-full pl-10 pr-16 lg:pr-20 py-2 lg:py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white cursor-pointer"
                  readOnly
                />
                <div className="absolute right-2 lg:right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1 lg:space-x-2">
                  <button
                    onClick={handleVoiceSearch}
                    className={cn(
                      'p-1 rounded hover:bg-slate-100 transition-colors',
                      isVoiceSearch && 'text-red-500 animate-pulse'
                    )}
                    title="Voice search"
                  >
                    <Mic className="w-3 h-3 lg:w-4 lg:h-4" />
                  </button>
                  <kbd className="hidden lg:block px-2 py-1 text-xs bg-slate-200 rounded text-slate-600">⌘K</kbd>
                </div>
              </div>

              {/* Smart Search Results */}
              {isSearchFocused && (searchResults.length > 0 || searchQuery.length > 0) && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50">
                  {searchResults.length > 0 ? (
                    <div className="max-h-96 overflow-y-auto">
                      <div className="p-3 bg-slate-50 border-b border-slate-200">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-700">
                            Smart Results ({searchResults.length})
                          </span>
                          <Brain className="w-4 h-4 text-corporate-600" />
                        </div>
                      </div>
                      {searchResults.map((result) => (
                        <button
                          key={result.id}
                          onClick={() => {
                            if (result.href) navigate(result.href)
                            if (result.action) result.action()
                            setIsSearchFocused(false)
                            setSearchQuery('')
                          }}
                          className="w-full flex items-center space-x-3 p-4 hover:bg-slate-50 transition-colors text-left"
                        >
                          <div className={cn(
                            'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center',
                            result.priority === 'high' ? 'bg-red-100 text-red-600' :
                            result.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-slate-100 text-slate-600'
                          )}>
                            <result.icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-slate-900 truncate">
                                {result.title}
                              </span>
                              {result.priority === 'high' && (
                                <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">
                                  Urgent
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-slate-500 truncate">{result.description}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : searchQuery.length > 0 ? (
                    <div className="p-8 text-center">
                      <Search className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-500">No results found for "{searchQuery}"</p>
                      <p className="text-sm text-slate-400 mt-1">Try different keywords or browse by category</p>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Smart Actions */}
          <div className="flex items-center space-x-1 lg:space-x-3 flex-shrink-0">
            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
                title="Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-slate-600" />
                ) : (
                  <Menu className="w-5 h-5 text-slate-600" />
                )}
              </button>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-3">
              {/* Smart Productivity Widget */}
              <div className="hidden lg:block">
                <SmartProductivityWidget />
              </div>

              {/* Quick Actions */}
              <div className="relative">
                <button
                  onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200 relative"
                  title="Quick Actions"
                >
                  <Plus className="w-4 h-4 lg:w-5 lg:h-5 text-slate-600" />
                  <Zap className="w-2 h-2 lg:w-3 lg:h-3 text-corporate-600 absolute -top-1 -right-1" />
                </button>

              {isQuickActionsOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50">
                  <div className="p-3 bg-slate-50 border-b border-slate-200">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-corporate-600" />
                      <span className="font-medium text-slate-900">Quick Actions</span>
                    </div>
                  </div>
                  <div className="p-2">
                    {quickActions.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => {
                          action.action()
                          setIsQuickActionsOpen(false)
                        }}
                        className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors text-left"
                      >
                        <action.icon className="w-5 h-5 text-corporate-600" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-slate-900">{action.label}</span>
                            {action.shortcut && (
                              <kbd className="px-2 py-1 text-xs bg-slate-100 rounded text-slate-600">
                                {action.shortcut}
                              </kbd>
                            )}
                          </div>
                          <p className="text-sm text-slate-500">{action.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="hidden md:block">
              <LanguageSelector />
            </div>

            {/* Smart Context Helper */}
            <div className="hidden lg:block">
              <SmartContextHelper />
            </div>

            {/* Smart Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
                aria-label={t('common.notifications')}
              >
                <Bell className="w-4 h-4 lg:w-5 lg:h-5 text-slate-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 lg:w-5 lg:h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 top-full mt-2 w-96 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50">
                  <div className="p-4 bg-slate-50 border-b border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-slate-900">Notifications</h3>
                      <button
                        onClick={() => setIsNotificationsOpen(false)}
                        className="p-1 hover:bg-slate-200 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      {['all', 'unread', 'deadline', 'approval', 'task'].map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setNotificationFilter(filter)}
                          className={cn(
                            'px-3 py-1 text-xs rounded-full transition-colors',
                            notificationFilter === filter
                              ? 'bg-corporate-600 text-white'
                              : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                          )}
                        >
                          {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          'p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors',
                          !notification.read && 'bg-blue-50 border-l-4 border-l-blue-500'
                        )}
                        onClick={() => markNotificationAsRead(notification.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={cn(
                            'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
                            notification.type === 'urgent' ? 'bg-red-100 text-red-600' :
                            notification.type === 'important' ? 'bg-yellow-100 text-yellow-600' :
                            notification.type === 'success' ? 'bg-green-100 text-green-600' :
                            'bg-blue-100 text-blue-600'
                          )}>
                            <Bell className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-slate-900 truncate">
                                {notification.title}
                              </h4>
                              <span className="text-xs text-slate-500">
                                {new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
                                  Math.floor((notification.timestamp.getTime() - Date.now()) / (1000 * 60)),
                                  'minute'
                                )}
                              </span>
                            </div>
                            <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
                            {notification.actions && (
                              <div className="flex items-center space-x-2 mt-3">
                                {notification.actions.map((action, index) => (
                                  <button
                                    key={index}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      action.action()
                                    }}
                                    className={cn(
                                      'px-3 py-1 text-xs rounded transition-colors',
                                      action.type === 'primary'
                                        ? 'bg-corporate-600 text-white hover:bg-corporate-700'
                                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                                    )}
                                  >
                                    {action.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Smart Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 lg:space-x-3 p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
                aria-label={t('common.profile')}
              >
                <div className="relative">
                  <div className="w-6 h-6 lg:w-8 lg:h-8 bg-corporate-100 rounded-full flex items-center justify-center">
                    <User className="w-3 h-3 lg:w-4 lg:h-4 text-corporate-600" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 lg:w-3 lg:h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <span className="hidden xl:block text-sm font-medium text-slate-700">John Doe</span>
                <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4 text-slate-500" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50">
                  <div className="p-4 bg-gradient-to-r from-corporate-600 to-corporate-700 text-white">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-medium">John Doe</h3>
                        <p className="text-sm opacity-90">Senior Legal Counsel</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-xs opacity-75">Online</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors text-left">
                      <User className="w-4 h-4 text-slate-600" />
                      <span className="text-sm text-slate-700">Profile Settings</span>
                    </button>
                    <button 
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors text-left"
                    >
                      {isDarkMode ? <Sun className="w-4 h-4 text-slate-600" /> : <Moon className="w-4 h-4 text-slate-600" />}
                      <span className="text-sm text-slate-700">
                        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                      </span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors text-left">
                      <Settings className="w-4 h-4 text-slate-600" />
                      <span className="text-sm text-slate-700">Preferences</span>
                    </button>
                    <hr className="my-2" />
                    <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors text-left">
                      <Activity className="w-4 h-4" />
                      <span className="text-sm">Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            </div>

            {/* Mobile Actions - Only show on mobile */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
                  aria-label={t('common.notifications')}
                >
                  <Bell className="w-5 h-5 text-slate-600" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
                  aria-label={t('common.profile')}
                >
                  <div className="relative">
                    <div className="w-6 h-6 bg-corporate-100 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-corporate-600" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 shadow-lg">
            <div className="p-4 space-y-4">
              {/* Language Selector */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Language</span>
                <LanguageSelector />
              </div>
              
              {/* Quick Actions */}
              <div>
                <span className="text-sm font-medium text-slate-700">Quick Actions</span>
                <div className="mt-2 space-y-2">
                  {quickActions.slice(0, 3).map((action) => (
                    <button
                      key={action.id}
                      onClick={() => {
                        action.action()
                        setIsMobileMenuOpen(false)
                      }}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors text-left"
                    >
                      <action.icon className="w-5 h-5 text-corporate-600" />
                      <span className="font-medium text-slate-900">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Smart Command Palette */}
      <SmartCommandPalette 
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />
    </header>
  )
}

export default SmartTopNav
