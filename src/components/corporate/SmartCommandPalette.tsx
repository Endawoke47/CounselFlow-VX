import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  Search, 
  Command,
  ArrowRight,
  Clock,
  Star,
  Zap,
  FileText,
  Users,
  Calendar,
  Settings,
  Calculator,
  Globe,
  Shield,
  Briefcase,
  Scale,
  Book,
  Target,
  TrendingUp,
  Activity,
  ChevronRight,
  Keyboard
} from 'lucide-react'

interface CommandItem {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  action: () => void
  category: 'navigation' | 'actions' | 'search' | 'tools' | 'recent'
  keywords: string[]
  shortcut?: string
}

interface SmartCommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

export const SmartCommandPalette: React.FC<SmartCommandPaletteProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [filteredCommands, setFilteredCommands] = useState<CommandItem[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [recentCommands, setRecentCommands] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-dashboard',
      title: 'Go to Dashboard',
      description: 'Navigate to main dashboard',
      icon: Target,
      action: () => navigate('/'),
      category: 'navigation',
      keywords: ['dashboard', 'home', 'main'],
      shortcut: '⌘1'
    },
    {
      id: 'nav-matters',
      title: 'Matter Management',
      description: 'Manage legal matters and cases',
      icon: Briefcase,
      action: () => navigate('/matters'),
      category: 'navigation',
      keywords: ['matters', 'cases', 'legal'],
      shortcut: '⌘2'
    },
    {
      id: 'nav-contracts',
      title: 'Contract Management',
      description: 'Manage contracts and agreements',
      icon: FileText,
      action: () => navigate('/contracts'),
      category: 'navigation',
      keywords: ['contracts', 'agreements', 'legal'],
      shortcut: '⌘3'
    },
    {
      id: 'nav-disputes',
      title: 'Dispute Resolution',
      description: 'Handle disputes and litigation',
      icon: Scale,
      action: () => navigate('/dispute-resolution'),
      category: 'navigation',
      keywords: ['disputes', 'litigation', 'resolution'],
      shortcut: '⌘4'
    },

    // Quick Actions
    {
      id: 'action-new-matter',
      title: 'Create New Matter',
      description: 'Start a new legal matter',
      icon: Briefcase,
      action: () => {
        // Action implementation
      },
      category: 'actions',
      keywords: ['create', 'new', 'matter', 'case'],
      shortcut: '⌘N'
    },
    {
      id: 'action-draft-contract',
      title: 'Draft New Contract',
      description: 'Create a new contract from template',
      icon: FileText,
      action: () => {
        // Action implementation
      },
      category: 'actions',
      keywords: ['draft', 'create', 'contract', 'new'],
      shortcut: '⌘D'
    },
    {
      id: 'action-schedule-meeting',
      title: 'Schedule Meeting',
      description: 'Book a meeting with clients or team',
      icon: Calendar,
      action: () => {
        // Action implementation
      },
      category: 'actions',
      keywords: ['schedule', 'meeting', 'calendar', 'book'],
      shortcut: '⌘M'
    },

    // Tools
    {
      id: 'tool-calculator',
      title: 'Legal Calculator',
      description: 'Calculate legal fees and damages',
      icon: Calculator,
      action: () => {
        // Tool implementation
      },
      category: 'tools',
      keywords: ['calculator', 'fees', 'damages', 'calculate']
    },
    {
      id: 'tool-timer',
      title: 'Time Tracker',
      description: 'Track billable hours',
      icon: Clock,
      action: () => {
        // Tool implementation
      },
      category: 'tools',
      keywords: ['time', 'track', 'billable', 'hours']
    },

    // Settings
    {
      id: 'settings-profile',
      title: 'Profile Settings',
      description: 'Manage your profile and preferences',
      icon: Settings,
      action: () => {
        // Settings implementation
      },
      category: 'navigation',
      keywords: ['profile', 'settings', 'preferences'],
      shortcut: '⌘,'
    }
  ]

  useEffect(() => {
    if (query.trim()) {
      const filtered = commands.filter(command => {
        const searchTerm = query.toLowerCase()
        return (
          command.title.toLowerCase().includes(searchTerm) ||
          command.description.toLowerCase().includes(searchTerm) ||
          command.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
        )
      })
      setFilteredCommands(filtered)
    } else {
      // Show recent commands and popular actions when no query
      const recent = commands.filter(cmd => recentCommands.includes(cmd.id))
      const popular = commands.filter(cmd => cmd.category === 'actions').slice(0, 6)
      setFilteredCommands([...recent, ...popular])
    }
    setSelectedIndex(0)
  }, [query, recentCommands])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length)
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length)
        break
      case 'Enter':
        e.preventDefault()
        if (filteredCommands[selectedIndex]) {
          executeCommand(filteredCommands[selectedIndex])
        }
        break
      case 'Escape':
        e.preventDefault()
        onClose()
        break
    }
  }

  const executeCommand = (command: CommandItem) => {
    command.action()
    
    // Add to recent commands
    setRecentCommands(prev => {
      const updated = [command.id, ...prev.filter(id => id !== command.id)]
      return updated.slice(0, 5) // Keep only 5 recent commands
    })
    
    onClose()
    setQuery('')
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'navigation': return ArrowRight
      case 'actions': return Zap
      case 'search': return Search
      case 'tools': return Settings
      case 'recent': return Clock
      default: return Command
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'navigation': return 'text-blue-600 bg-blue-100'
      case 'actions': return 'text-green-600 bg-green-100'
      case 'search': return 'text-purple-600 bg-purple-100'
      case 'tools': return 'text-orange-600 bg-orange-100'
      case 'recent': return 'text-slate-600 bg-slate-100'
      default: return 'text-corporate-600 bg-corporate-100'
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Command Palette */}
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center px-4 py-3 border-b border-slate-200">
          <Command className="w-5 h-5 text-slate-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent text-lg outline-none placeholder-slate-500"
          />
          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <kbd className="px-2 py-1 bg-slate-100 rounded text-xs">↑↓</kbd>
            <span>navigate</span>
            <kbd className="px-2 py-1 bg-slate-100 rounded text-xs">↵</kbd>
            <span>select</span>
            <kbd className="px-2 py-1 bg-slate-100 rounded text-xs">esc</kbd>
            <span>close</span>
          </div>
        </div>

        {/* Commands List */}
        <div className="max-h-96 overflow-y-auto">
          {filteredCommands.length > 0 ? (
            <div className="py-2">
              {!query && recentCommands.length > 0 && (
                <div className="px-4 py-2">
                  <div className="flex items-center space-x-2 text-sm font-medium text-slate-700 mb-2">
                    <Clock className="w-4 h-4" />
                    <span>Recent</span>
                  </div>
                </div>
              )}
              
              {filteredCommands.map((command, index) => {
                const CategoryIcon = getCategoryIcon(command.category)
                return (
                  <button
                    key={command.id}
                    onClick={() => executeCommand(command)}
                    className={cn(
                      'w-full flex items-center space-x-4 px-4 py-3 text-left transition-colors',
                      index === selectedIndex 
                        ? 'bg-corporate-50 border-r-4 border-r-corporate-600' 
                        : 'hover:bg-slate-50'
                    )}
                  >
                    <div className={cn(
                      'flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center',
                      getCategoryColor(command.category)
                    )}>
                      <command.icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-slate-900 truncate">
                          {command.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {command.shortcut && (
                            <kbd className="px-2 py-1 text-xs bg-slate-200 rounded text-slate-600">
                              {command.shortcut}
                            </kbd>
                          )}
                          <CategoryIcon className="w-4 h-4 text-slate-400" />
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 truncate">
                        {command.description}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="px-4 py-8 text-center">
              <Search className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-500">No commands found</p>
              <p className="text-sm text-slate-400 mt-1">
                Try searching for "matter", "contract", or "settings"
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 px-4 py-3 bg-slate-50">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Keyboard className="w-3 h-3" />
                <span>Keyboard shortcuts available</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <span>Press</span>
              <kbd className="px-1 py-0.5 bg-slate-200 rounded">⌘K</kbd>
              <span>anytime to open</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SmartCommandPalette
