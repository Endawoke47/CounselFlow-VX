import { 
  Building2, 
  FileText, 
  Scale, 
  FolderOpen, 
  Shield, 
  BookOpen, 
  Lightbulb, 
  CreditCard, 
  BarChart3,
  Home,
  Settings,
  CheckSquare,
  Users,
  TrendingUp,
  Database,
  Search,
  ChevronDown,
  User,
  LogOut,
  Bell
} from "lucide-react";
import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const modules = [
  {
    title: "Overview",
    url: "/",
    icon: Home,
    category: "main"
  },
  {
    title: "Company Secretarial",
    url: "/company-secretarial",
    icon: Building2,
    category: "corporate"
  },
  {
    title: "Contract Lifecycle",
    url: "/contracts",
    icon: FileText,
    category: "contracts"
  },
  {
    title: "Dispute Resolution",
    url: "/dispute-resolution",
    icon: Scale,
    category: "legal"
  },
  {
    title: "Matter Management",
    url: "/matters",
    icon: FolderOpen,
    category: "legal"
  },
  {
    title: "Licensing & Regulatory",
    url: "/licensing-regulatory",
    icon: Shield,
    category: "compliance"
  },
  {
    title: "Policy Management",
    url: "/policy-management",
    icon: BookOpen,
    category: "compliance"
  },
  {
    title: "Knowledge Management",
    url: "/knowledge-management",
    icon: Lightbulb,
    category: "knowledge"
  },
  {
    title: "IP Management",
    url: "/ip-management",
    icon: Shield,
    category: "ip"
  },
  {
    title: "Data Protection",
    url: "/data-protection",
    icon: Database,
    category: "compliance"
  },
  {
    title: "Outsourcing & Spend",
    url: "/outsourced-matters-spend",
    icon: CreditCard,
    category: "finance"
  },
  {
    title: "Risk Dashboard",
    url: "/risk-dashboard",
    icon: BarChart3,
    category: "analytics"
  },
  {
    title: "Task Management",
    url: "/task-management",
    icon: CheckSquare,
    category: "productivity"
  },
  {
    title: "User & Access Management",
    url: "/user-access-management",
    icon: Users,
    category: "admin"
  },
  {
    title: "Dealflow",
    url: "/dealflow",
    icon: TrendingUp,
    category: "business"
  },
];

const moduleCategories = {
  main: "Dashboard",
  corporate: "Corporate",
  contracts: "Contracts",
  legal: "Legal Operations",
  compliance: "Compliance",
  knowledge: "Knowledge",
  ip: "Intellectual Property",
  finance: "Financial",
  analytics: "Analytics",
  productivity: "Productivity",
  admin: "Administration",
  business: "Business Development"
};

export function Sidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());
  const location = useLocation();

  const filteredModules = modules.filter(module =>
    module.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedModules = filteredModules.reduce((acc, module) => {
    if (!acc[module.category]) acc[module.category] = [];
    acc[module.category].push(module);
    return acc;
  }, {} as Record<string, typeof modules>);

  const toggleCategory = (category: string) => {
    const newCollapsed = new Set(collapsedCategories);
    if (newCollapsed.has(category)) {
      newCollapsed.delete(category);
    } else {
      newCollapsed.add(category);
    }
    setCollapsedCategories(newCollapsed);
  };

  const isActiveRoute = (url: string) => {
    if (url === "/") return location.pathname === "/";
    return location.pathname.startsWith(url);
  };

  return (
    <aside className="glass fixed lg:relative inset-y-0 left-0 z-50 w-72 bg-transparent border-r border-sidebar-border/60 tab-transition flex flex-col shadow-xl backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-sidebar-border/60 bg-sidebar-background/80 glass">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-900/80 flex items-center justify-center shadow-md">
            <Scale size={20} className="text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-sidebar-foreground">CounselFlow</h1>
            <p className="text-xs text-sidebar-foreground/70">Legal Suite</p>
          </div>
        </div>
      </div>
      {/* Search */}
      <div className="p-4 border-b border-sidebar-border/40 bg-sidebar-background/80 glass">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-sidebar-foreground/60" />
          <input
            type="text"
            placeholder="Search modules..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="input pl-10 bg-sidebar-background/60 text-sidebar-foreground rounded-lg border border-sidebar-border/30 focus:ring-2 focus:ring-primary/40 tab-transition"
          />
        </div>
      </div>
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="space-y-1">
          {Object.entries(groupedModules).map(([category, categoryModules]) => (
            <div key={category} className="px-4">
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between py-2 px-2 text-sm font-medium text-sidebar-foreground/80 hover:text-primary tab-transition group bg-transparent"
              >
                <span>{moduleCategories[category]}</span>
                {collapsedCategories.has(category) ? (
                  <ChevronDown size={16} className="tab-transition group-hover:scale-110" />
                ) : (
                  <ChevronDown size={16} className="rotate-180 tab-transition group-hover:scale-110" />
                )}
              </button>
              <div className={`overflow-hidden tab-transition ${collapsedCategories.has(category) ? 'max-h-0' : 'max-h-96'}`}>
                <div className="space-y-1 ml-2">
                  {categoryModules.map((module) => {
                    const Icon = module.icon;
                    const isActive = isActiveRoute(module.url);
                    return (
                      <a
                        key={module.url}
                        href={module.url}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium tab-transition group relative overflow-hidden glass ${isActive ? 'bg-primary/20 text-primary border-l-4 border-primary' : 'text-sidebar-foreground/80 hover:bg-primary/10 hover:text-primary'}`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <Icon size={20} className={`tab-transition relative z-10 ${isActive ? 'text-primary' : 'text-sidebar-foreground/60 group-hover:text-primary'}`} />
                        <span className="relative z-10 truncate">{module.title}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] tab-transition" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </nav>
      {/* User Profile */}
      <div className="p-4 border-t border-sidebar-border/60 bg-sidebar-background/80 glass">
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 tab-transition cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-900/80 flex items-center justify-center shadow-md">
            <User size={16} className="text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">Legal Admin</p>
            <p className="text-xs text-sidebar-foreground/70 truncate">admin@company.com</p>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1 rounded hover:bg-primary/10 tab-transition">
              <Bell size={16} className="text-sidebar-foreground/60" />
            </button>
            <button className="p-1 rounded hover:bg-primary/10 tab-transition">
              <Settings size={16} className="text-sidebar-foreground/60" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
