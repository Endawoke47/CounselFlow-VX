import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Bell, Search, User, ChevronRight, ChevronDown, Command, HelpCircle, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showShortcuts, setShowShortcuts] = useState(false);
  const location = useLocation();

  // Generate breadcrumbs from current path
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Dashboard', path: '/' }];
    
    const pathMap: Record<string, string> = {
      'company-secretarial': 'Company Secretarial',
      'contracts': 'Contract Lifecycle',
      'dispute-resolution': 'Dispute Resolution',
      'matters': 'Matter Management',
      'licensing-regulatory': 'Licensing & Regulatory',
      'policy-management': 'Policy Management',
      'knowledge-management': 'Knowledge Management',
      'ip-management': 'IP Management',
      'data-protection': 'Data Protection',
      'outsourced-matters-spend': 'Outsourcing & Spend',
      'risk-dashboard': 'Risk Dashboard',
      'task-management': 'Task Management',
      'user-access-management': 'User & Access Management',
      'dealflow': 'Dealflow'
    };

    pathSegments.forEach((segment, index) => {
      const path = '/' + pathSegments.slice(0, index + 1).join('/');
      const label = pathMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbs.push({ label, path });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Keyboard shortcuts handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Show shortcuts with ?
      if (event.key === '?' && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        setShowShortcuts(!showShortcuts);
      }
      // Focus search with Ctrl/Cmd + K
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        const searchInput = document.getElementById('global-search');
        searchInput?.focus();
      }
      // Escape to close shortcuts or clear search
      if (event.key === 'Escape') {
        if (showShortcuts) {
          setShowShortcuts(false);
        } else if (document.activeElement?.id === 'global-search') {
          setSearchQuery("");
          (document.activeElement as HTMLElement)?.blur();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showShortcuts]);

  return (
    <header className="glass sticky top-0 z-30 w-full bg-background/80 backdrop-blur-xl border-b border-border/60 tab-transition shadow-lg">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <SidebarTrigger
            className="lg:hidden p-2 rounded-lg hover:bg-primary/10 tab-transition group"
            aria-label="Open sidebar"
          />
          <nav className="hidden md:flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Dashboard</span>
            <ChevronRight size={16} className="text-muted-foreground/70" />
            <span className="text-sm font-medium text-foreground">{breadcrumbs[breadcrumbs.length-1]?.label}</span>
          </nav>
        </div>
        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary tab-transition" />
            <input
              type="text"
              placeholder="Search contracts, matters, documents..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background/70 border border-border/40 rounded-xl focus:ring-2 focus:ring-primary/40 focus:border-transparent focus:bg-background tab-transition text-sm text-foreground shadow-sm"
            />
          </div>
        </div>
        {/* Right Section */}
        <div className="flex items-center gap-2">
          <button
            className="relative p-2 rounded-lg hover:bg-primary/10 tab-transition group"
            aria-label="Notifications"
          >
            <Bell size={20} className="text-muted-foreground group-hover:text-primary tab-transition" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full">
              <span className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></span>
            </span>
          </button>
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary/10 tab-transition group cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-900/80 flex items-center justify-center shadow-md">
              <User size={16} className="text-primary-foreground" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-foreground">Legal Admin</p>
              <p className="text-xs text-muted-foreground">admin@company.com</p>
            </div>
            <ChevronDown size={16} className="text-muted-foreground tab-transition" />
          </div>
        </div>
      </div>
      {/* Keyboard Shortcuts Modal */}
      {showShortcuts && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-xl z-50 flex items-center justify-center">
          <div className="glass border border-border rounded-lg shadow-xl p-6 max-w-md w-full mx-4 tab-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Keyboard Shortcuts</h3>
              <button onClick={() => setShowShortcuts(false)} className="text-muted-foreground hover:text-foreground tab-transition">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Search</span>
                <kbd className="px-2 py-1 bg-muted rounded text-xs">⌘ K</kbd>
              </div>
              <div className="flex justify-between">
                <span>Toggle theme</span>
                <kbd className="px-2 py-1 bg-muted rounded text-xs">⌘ ⇧ D</kbd>
              </div>
              <div className="flex justify-between">
                <span>Show shortcuts</span>
                <kbd className="px-2 py-1 bg-muted rounded text-xs">?</kbd>
              </div>
              <div className="flex justify-between">
                <span>Close/Escape</span>
                <kbd className="px-2 py-1 bg-muted rounded text-xs">Esc</kbd>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
