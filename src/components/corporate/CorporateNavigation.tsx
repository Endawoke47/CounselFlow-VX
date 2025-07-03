import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/contexts/LanguageContext'
import { useSidebar } from '@/contexts/SidebarContext'
import { LanguageSelector } from '@/components/ui/LanguageSelector'
import { 
  Home, 
  FileText, 
  Users, 
  Shield, 
  Briefcase, 
  Scale, 
  Book, 
  Settings,
  ChevronDown,
  ChevronUp,
  Search,
  Bell,
  User,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Building,
  CheckSquare,
  Archive,
  Tag,
  AlertTriangle,
  Activity,
  DollarSign,
  BarChart,
  RefreshCw
} from 'lucide-react'

interface NavigationItem {
  id: string
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children?: NavigationItem[]
}

const navigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/',
    icon: Home
  },
  {
    id: 'contracts',
    label: 'Contract Management',
    href: '/contracts-enhanced',
    icon: FileText,
    children: [
      { id: 'active-contracts', label: 'Active Contracts', href: '/contracts/active', icon: FileText },
      { id: 'contract-templates', label: 'Templates', href: '/contracts/templates', icon: FileText },
      { id: 'contract-renewals', label: 'Renewals', href: '/contracts/renewals', icon: FileText }
    ]
  },
  {
    id: 'entity',
    label: 'Entity Management',
    href: '/entity-management-enhanced',
    icon: Building,
    children: [
      { id: 'entities', label: 'Corporate Entities', href: '/entity-management/entities', icon: Building },
      { id: 'subsidiaries', label: 'Subsidiaries', href: '/entity-management/subsidiaries', icon: Building },
      { id: 'governance', label: 'Governance', href: '/entity-management/governance', icon: Users }
    ]
  },
  {
    id: 'tasks',
    label: 'Task Management',
    href: '/task-management-enhanced',
    icon: CheckSquare,
    children: [
      { id: 'my-tasks', label: 'My Tasks', href: '/task-management/my-tasks', icon: CheckSquare },
      { id: 'team-tasks', label: 'Team Tasks', href: '/task-management/team', icon: Users },
      { id: 'task-templates', label: 'Templates', href: '/task-management/templates', icon: FileText }
    ]
  },
  {
    id: 'knowledge',
    label: 'Knowledge Management',
    href: '/knowledge-management-enhanced',
    icon: Book,
    children: [
      { id: 'documents', label: 'Document Library', href: '/knowledge-management/documents', icon: FileText },
      { id: 'legal-research', label: 'Legal Research', href: '/knowledge-management/research', icon: Search },
      { id: 'precedents', label: 'Precedents', href: '/knowledge-management/precedents', icon: Book }
    ]
  },
  {
    id: 'matters',
    label: 'Matter Management',
    href: '/matter-management-enhanced',
    icon: Briefcase,
    children: [
      { id: 'active-matters', label: 'Active Matters', href: '/matters/active', icon: Briefcase },
      { id: 'archived-matters', label: 'Archived Matters', href: '/matters/archived', icon: Archive },
      { id: 'matter-types', label: 'Matter Types', href: '/matters/types', icon: Tag }
    ]
  },
  {
    id: 'risk',
    label: 'Risk Management',
    href: '/risk-management',
    icon: Shield,
    children: [
      { id: 'risk-dashboard', label: 'Risk Dashboard', href: '/risk-management', icon: Shield },
      { id: 'risk-assessment', label: 'Risk Assessment', href: '/risk-management/assessment', icon: AlertTriangle },
      { id: 'risk-monitoring', label: 'Risk Monitoring', href: '/risk-management/monitoring', icon: Activity }
    ]
  },
  {
    id: 'disputes',
    label: 'Dispute Resolution Management',
    href: '/dispute-resolution-enhanced',
    icon: Scale,
    children: [
      { id: 'active-disputes', label: 'Active Disputes', href: '/dispute-resolution/active', icon: Scale },
      { id: 'arbitration', label: 'Arbitration', href: '/dispute-resolution/arbitration', icon: Users },
      { id: 'litigation', label: 'Litigation', href: '/dispute-resolution/litigation', icon: Scale }
    ]
  },
  {
    id: 'outsourcing',
    label: 'Outsourcing and Spend Management',
    href: '/outsourced-matters-spend-enhanced',
    icon: DollarSign,
    children: [
      { id: 'vendor-management', label: 'Vendor Management', href: '/outsourcing/vendors', icon: Users },
      { id: 'spend-analytics', label: 'Spend Analytics', href: '/outsourcing/analytics', icon: BarChart },
      { id: 'budget-tracking', label: 'Budget Tracking', href: '/outsourcing/budget', icon: DollarSign }
    ]
  },
  {
    id: 'compliance',
    label: 'Regulatory Compliance',
    href: '/regulatory-compliance-enhanced',
    icon: Shield,
    children: [
      { id: 'compliance-dashboard', label: 'Compliance Dashboard', href: '/regulatory-compliance-enhanced', icon: Shield },
      { id: 'regulatory-tracking', label: 'Regulatory Tracking', href: '/compliance/regulatory', icon: FileText },
      { id: 'audit-management', label: 'Audit Management', href: '/compliance/audits', icon: Search }
    ]
  },
  {
    id: 'policies',
    label: 'Policy Management',
    href: '/policy-management-enhanced',
    icon: Book,
    children: [
      { id: 'policy-library', label: 'Policy Library', href: '/policy-management/library', icon: Book },
      { id: 'policy-updates', label: 'Policy Updates', href: '/policy-management/updates', icon: RefreshCw },
      { id: 'policy-training', label: 'Training', href: '/policy-management/training', icon: Users }
    ]
  }
]

export const CorporateNavigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const location = useLocation()
  const { isCollapsed, toggleSidebar } = useSidebar()

  // Auto-collapse expanded items when minimizing
  useEffect(() => {
    if (isCollapsed) {
      setExpandedItems(new Set())
    }
  }, [isCollapsed])

  // Handle scroll events for visual feedback
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget
    setIsScrolled(scrollTop > 10)
    setShowScrollToTop(scrollTop > 150)
  }

  // Scroll to top function
  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
      const scrollContainer = e.currentTarget
      const scrollAmount = 48
      
      if (e.key === 'ArrowUp') {
        scrollContainer.scrollBy({ top: -scrollAmount, behavior: 'smooth' })
      } else {
        scrollContainer.scrollBy({ top: scrollAmount, behavior: 'smooth' })
      }
    }
  }

  const toggleExpanded = (itemId: string) => {
    if (isCollapsed) return
    
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId)
    } else {
      newExpanded.add(itemId)
    }
    setExpandedItems(newExpanded)
  }

  const isActiveRoute = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/')
  }

  const NavItem: React.FC<{ item: NavigationItem; level?: number }> = ({ item, level = 0 }) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.has(item.id)
    const isActive = isActiveRoute(item.href)
    const isHovered = hoveredItem === item.id

    return (
      <li className="w-full">
        <div 
          className="flex items-center w-full group"
          onMouseEnter={() => setHoveredItem(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <Link
            to={item.href}
            className={cn(
              'flex items-center flex-1 rounded-lg transition-all duration-200 relative',
              isCollapsed ? 'px-2.5 py-2.5 justify-center' : 'px-3 py-2.5',
              level > 0 && !isCollapsed && 'ml-4 pl-6 border-l border-slate-200',
              isActive
                ? 'bg-corporate-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            )}
            title={isCollapsed ? item.label : undefined}
          >
            <item.icon className={cn(
              'flex-shrink-0 transition-colors duration-200',
              isCollapsed ? 'w-5 h-5' : 'w-4 h-4 mr-3',
              isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-700'
            )} />
            
            {/* Active indicator for collapsed mode */}
            {isCollapsed && isActive && (
              <div className="absolute -right-0.5 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-corporate-600 rounded-l-full"></div>
            )}
            
            {/* Text with better typography */}
            <span className={cn(
              'flex-1 font-medium transition-all duration-200 overflow-hidden',
              'text-sm leading-tight',
              isCollapsed ? 'w-0 opacity-0' : 'opacity-100'
            )}>
              {item.label}
            </span>

            {/* Expand indicator */}
            {hasChildren && !isCollapsed && (
              <ChevronDown className={cn(
                'w-3.5 h-3.5 ml-auto transition-transform duration-200',
                isExpanded && 'rotate-180',
                isActive ? 'text-white' : 'text-slate-400'
              )} />
            )}
            
            {/* Tooltip for collapsed mode */}
            {isCollapsed && isHovered && (
              <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 z-50">
                <div className="bg-slate-900 text-white px-3 py-2 rounded-lg shadow-xl whitespace-nowrap text-sm font-medium">
                  {item.label}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                </div>
              </div>
            )}
          </Link>
          
          {/* Expand button for collapsed mode with children */}
          {hasChildren && isCollapsed && (
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-corporate-300 rounded-full"></div>
          )}
          
          {/* Click area for expansion in expanded mode */}
          {hasChildren && !isCollapsed && (
            <button
              onClick={(e) => {
                e.preventDefault()
                toggleExpanded(item.id)
              }}
              className="absolute inset-0 z-10"
              aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${item.label}`}
            />
          )}
        </div>
        
        {/* Children with smooth animation */}
        {hasChildren && isExpanded && !isCollapsed && (
          <div className="overflow-hidden">
            <ul className="mt-1 space-y-1 animate-in slide-in-from-top-2 duration-200">
              {item.children!.map((child) => (
                <NavItem key={child.id} item={child} level={level + 1} />
              ))}
            </ul>
          </div>
        )}
      </li>
    )
  }

  return (
    <>
      {/* Mobile menu button - smaller and more elegant */}
      <div className="lg:hidden fixed top-3 left-3 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-white/95 backdrop-blur shadow-sm border border-slate-200/60 text-slate-700 hover:bg-slate-50 transition-all duration-200"
        >
          {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav className={cn(
        'fixed top-0 left-0 h-full bg-white border-r border-slate-200/60 shadow-sm z-50 transition-all duration-300 ease-in-out flex flex-col',
        isCollapsed ? 'w-16' : 'w-64',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        {/* Header */}
        <div className={cn(
          'flex items-center border-b border-slate-200/60 transition-all duration-300',
          isCollapsed ? 'justify-center p-3' : 'justify-between px-4 py-4'
        )}>
          <div className={cn(
            'flex items-center transition-all duration-300',
            isCollapsed ? 'space-x-0' : 'space-x-2'
          )}>
            <div className="w-8 h-8 bg-gradient-to-br from-corporate-600 to-corporate-700 rounded-md flex items-center justify-center flex-shrink-0">
              <Scale className="w-4 h-4 text-white" />
            </div>
            <div className={cn(
              'transition-all duration-300 overflow-hidden',
              isCollapsed ? 'w-0 opacity-0' : 'opacity-100'
            )}>
              <h1 className="text-lg font-semibold text-slate-900 whitespace-nowrap">CounselFlow</h1>
              <p className="text-xs text-slate-500 whitespace-nowrap -mt-0.5">Legal Support</p>
            </div>
          </div>
          
          {/* Collapse Toggle Button */}
          <button
            onClick={toggleSidebar}
            className={cn(
              'p-1.5 rounded-md transition-all duration-300 group',
              'hover:bg-slate-100/70 hover:shadow-sm',
              isCollapsed ? 'absolute -right-3 top-4 bg-white border border-slate-200/60 shadow-sm' : ''
            )}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-corporate-600 transition-colors" />
            ) : (
              <ChevronLeft className="w-3.5 h-3.5 text-slate-600 group-hover:text-corporate-600 transition-colors" />
            )}
          </button>
        </div>

        {/* Search */}
        <div className={cn(
          'border-b border-slate-200/60 transition-all duration-300',
          isCollapsed ? 'p-2' : 'px-3 py-3'
        )}>
          <div className="relative">
            <Search className={cn(
              'absolute top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-slate-400 transition-all duration-300',
              isCollapsed ? 'left-1/2 -translate-x-1/2' : 'left-2.5'
            )} />
            <input
              type="text"
              placeholder={isCollapsed ? '' : 'Search...'}
              className={cn(
                'w-full border border-slate-300/60 rounded-md text-sm transition-all duration-300 bg-slate-50/50',
                'focus:outline-none focus:ring-1 focus:ring-corporate-500/50 focus:border-corporate-300 focus:bg-white',
                isCollapsed 
                  ? 'pl-2 pr-2 py-2 text-center placeholder:opacity-0' 
                  : 'pl-8 pr-3 py-1.5'
              )}
              title={isCollapsed ? 'Search' : undefined}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className={cn(
          'flex-1 overflow-hidden flex flex-col transition-all duration-300',
          isCollapsed ? 'px-1 py-2' : 'px-2 py-3'
        )}>
          {/* Scrollable navigation area with enhanced scrollability */}
          <div 
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-thin hover:scrollbar-thumb-slate-300 scrollbar-track-transparent scrollbar-thumb-slate-200 sidebar-scroll-area"
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="navigation"
            aria-label="Main navigation"
            style={{ 
              scrollbarGutter: 'stable',
              WebkitOverflowScrolling: 'touch',
              overscrollBehavior: 'contain',
              scrollbarWidth: 'thin'
            }}
          >
            {/* Top fade indicator */}
            <div className={cn(
              'sticky top-0 h-2 scroll-fade-top pointer-events-none z-10 transition-opacity duration-300',
              isScrolled ? 'opacity-100' : 'opacity-0'
            )}></div>
            
            {/* Navigation Items */}
            <ul className="space-y-1 px-1 pb-4 pt-2">
              {navigationItems.map((item) => (
                <NavItem key={item.id} item={item} />
              ))}
            </ul>
            
            {/* Bottom fade indicator */}
            <div className="sticky bottom-0 h-2 scroll-fade-bottom pointer-events-none"></div>
            
            {/* Scroll to top button */}
            {showScrollToTop && !isCollapsed && (
              <div className="absolute bottom-3 right-2 z-30">
                <button
                  onClick={scrollToTop}
                  className="p-2 bg-white/95 backdrop-blur border border-slate-200/60 rounded-lg shadow-sm hover:shadow-md hover:bg-white transition-all duration-200"
                  title="Scroll to top"
                  aria-label="Scroll to top of navigation"
                >
                  <ChevronUp className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            )}
          </div>
          
          {/* Scroll indicators */}
          <div className={cn(
            'flex justify-center pt-2 transition-opacity duration-300',
            isCollapsed ? 'opacity-0' : 'opacity-100'
          )}>
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-slate-300 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-1 bg-slate-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>

        {/* Footer - User section */}
        <div className={cn(
          'border-t border-slate-200/60 transition-all duration-300',
          isCollapsed ? 'p-2' : 'p-3'
        )}>
          <div className={cn(
            'flex items-center transition-all duration-300',
            isCollapsed ? 'justify-center' : 'space-x-2'
          )}>
            <div className="w-7 h-7 bg-gradient-to-br from-slate-400 to-slate-500 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-3.5 h-3.5 text-white" />
            </div>
            <div className={cn(
              'flex-1 transition-all duration-300 overflow-hidden',
              isCollapsed ? 'w-0 opacity-0' : 'opacity-100'
            )}>
              <p className="text-xs font-medium text-slate-700 truncate">John Doe</p>
              <p className="text-xs text-slate-500 truncate">Legal Admin</p>
            </div>
            {!isCollapsed && (
              <button className="p-1 rounded-md hover:bg-slate-100 transition-colors duration-200">
                <MoreHorizontal className="w-3.5 h-3.5 text-slate-500" />
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}

// Top Navigation Bar
export const CorporateTopNav: React.FC = () => {
  const { t } = useLanguage()
  const { isCollapsed } = useSidebar()
  
  return (
    <header className="bg-white border-b border-slate-200/60 shadow-sm">
      <div className={cn(
        'transition-all duration-300 px-4 py-3',
        isCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-slate-900">{t('nav.dashboard')}</h2>
            <div className="hidden md:flex items-center space-x-2 text-sm text-slate-500">
              <span>{t('common.welcome')}, John</span>
              <span>•</span>
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Language Selector */}
            <LanguageSelector />
            
            {/* Search */}
            <div className="hidden md:block relative">
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder={t('common.search')}
                className="pl-8 pr-3 py-1.5 w-64 border border-slate-300/60 rounded-md text-sm bg-slate-50/50 focus:outline-none focus:ring-1 focus:ring-corporate-500/50 focus:border-corporate-300 focus:bg-white transition-all duration-200"
              />
            </div>
            
            {/* Notifications */}
            <button 
              className="relative p-1.5 rounded-md hover:bg-slate-100/70 transition-colors duration-200"
              aria-label={t('common.notifications')}
            >
              <Bell className="w-4 h-4 text-slate-600" />
              <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            </button>
            
            {/* Profile */}
            <button 
              className="flex items-center space-x-2 p-1.5 rounded-md hover:bg-slate-100/70 transition-colors duration-200"
              aria-label={t('common.profile')}
            >
              <div className="w-6 h-6 bg-corporate-100 rounded-full flex items-center justify-center">
                <User className="w-3 h-3 text-corporate-600" />
              </div>
              <span className="hidden md:block text-sm font-medium text-slate-700">John Doe</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
