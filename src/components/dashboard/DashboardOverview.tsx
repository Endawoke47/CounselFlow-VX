import { StatCard } from "./StatCard";
import { EnhancedDashboard } from "./EnhancedDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Scale, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Clock,
  Building2,
  Shield,
  BookOpen,
  DollarSign,
  CheckSquare,
  Target,
  ArrowUpRight,
  MoreHorizontal,
  Calendar,
  Filter,
  Download
} from "lucide-react";
import { useDashboardStats } from "@/hooks/useDashboardStats";

export function DashboardOverview() {
  const { stats, loading, error } = useDashboardStats();

  const isEmpty = !loading && !error && (!stats || stats.length === 0);

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
        {loading && Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="animate-pulse glass bg-gradient-to-br from-gray-800/80 to-gray-700/80 border border-gray-400/40 rounded-xl p-6 h-32" />
        ))}
        {error && (
          <div className="col-span-4 text-red-500 text-center font-semibold bg-white/80 rounded-xl p-6 shadow-lg">
            {error}
          </div>
        )}
        {isEmpty && (
          <div className="col-span-4 text-blue-700 text-center font-semibold bg-white/80 rounded-xl p-6 shadow-lg">
            No dashboard data found. Please check your database or API connection.
          </div>
        )}
        {stats && stats.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} index={index} />
        ))}
      </div>
      <EnhancedDashboard />
    </div>
  );
}

export function LegacyDashboardOverview() {
  const stats = [
    {
      title: "Active Matters",
      value: "47",
      change: "+8% from last month",
      changeType: "positive",
      icon: FileText,
      color: "text-info-600",
      bgColor: "bg-info-50 dark:bg-info-950"
    },
    {
      title: "Open Disputes",
      value: "12",
      change: "+2 new this week",
      changeType: "neutral",
      icon: Scale,
      color: "text-warning-600",
      bgColor: "bg-warning-50 dark:bg-warning-950"
    },
    {
      title: "Contract Reviews",
      value: "23",
      change: "5 due this week",
      changeType: "urgent",
      icon: AlertTriangle,
      color: "text-warning-600",
      bgColor: "bg-warning-50 dark:bg-warning-950"
    },
    {
      title: "Legal Spend",
      value: "$284K",
      change: "-12% from last quarter",
      changeType: "positive",
      icon: DollarSign,
      color: "text-success-600",
      bgColor: "bg-success-50 dark:bg-success-950"
    }
  ];

  const recentMatters = [
    {
      id: "MAT-2024-001",
      title: "Vendor Agreement Review - TechCorp",
      type: "Contract Review",
      priority: "High",
      assignee: "Sarah Chen",
      dueDate: "2024-02-15",
      status: "In Progress",
      progress: 65
    },
    {
      id: "MAT-2024-002",
      title: "Employment Law Consultation",
      type: "Legal Advice",
      priority: "Medium",
      assignee: "David Park",
      dueDate: "2024-02-18",
      status: "Under Review",
      progress: 30
    },
    {
      id: "MAT-2024-003",
      title: "IP License Agreement",
      type: "Contract Review",
      priority: "High",
      assignee: "Emily Rodriguez",
      dueDate: "2024-02-20",
      status: "Draft Review",
      progress: 80
    },
    {
      id: "MAT-2024-004",
      title: "Compliance Policy Update",
      type: "Policy Review",
      priority: "Medium",
      assignee: "Legal Team",
      dueDate: "2024-02-22",
      status: "Planning",
      progress: 15
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: "Board Meeting Preparation",
      dueDate: "Tomorrow",
      assignee: "Legal Team",
      priority: "Critical",
      estimatedHours: 4
    },
    {
      id: 2,
      title: "Compliance Audit Review",
      dueDate: "Feb 16",
      assignee: "Sarah Chen",
      priority: "High",
      estimatedHours: 6
    },
    {
      id: 3,
      title: "Contract Template Update",
      dueDate: "Feb 18",
      assignee: "David Park",
      priority: "Medium",
      estimatedHours: 3
    },
    {
      id: 4,
      title: "Risk Assessment Report",
      dueDate: "Feb 20",
      assignee: "Emily Rodriguez",
      priority: "High",
      estimatedHours: 8
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-destructive/10 text-destructive border-destructive/20";
      case "High": return "bg-warning-100 text-warning-700 border-warning-200 dark:bg-warning-950 dark:text-warning-300 dark:border-warning-800";
      case "Medium": return "bg-info-100 text-info-700 border-info-200 dark:bg-info-950 dark:text-info-300 dark:border-info-800";
      case "Low": return "bg-success-100 text-success-700 border-success-200 dark:bg-success-950 dark:text-success-300 dark:border-success-800";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress": return "bg-info-100 text-info-700 border-info-200 dark:bg-info-950 dark:text-info-300 dark:border-info-800";
      case "Under Review": return "bg-warning-100 text-warning-700 border-warning-200 dark:bg-warning-950 dark:text-warning-300 dark:border-warning-800";
      case "Draft Review": return "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800";
      case "Completed": return "bg-success-100 text-success-700 border-success-200 dark:bg-success-950 dark:text-success-300 dark:border-success-800";
      case "Planning": return "bg-muted text-muted-foreground border-border";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case "positive": return "text-success-600";
      case "negative": return "text-destructive";
      case "urgent": return "text-warning-600";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground">Legal Operations Dashboard</h1>
          <p className="text-muted-foreground mt-2 text-base">
            Welcome back! Here's what's happening with your legal operations today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="h-4 w-4" />
            Last 30 days
          </Button>
        </div>
      </div>

      {/* Key Metrics - Desktop Grid */}
      <div className="desktop-grid desktop-grid-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="card-shadow hover:card-shadow-hover hover-lift transition-all duration-300 cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {stat.title}
              </CardTitle>
              <div className={`p-3 rounded-lg ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center gap-1">
                <p className={`text-sm font-medium ${getChangeColor(stat.changeType)}`}>
                  {stat.change}
                </p>
                <ArrowUpRight className={`h-3 w-3 ${getChangeColor(stat.changeType)}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Matters - Spans 2 columns on wide screens */}
        <Card className="xl:col-span-2 card-shadow">
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold">Recent Matters</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Track progress on active legal matters</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">View All</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {recentMatters.map((matter) => (
                <div key={matter.id} className="p-6 hover:bg-muted/30 transition-colors cursor-pointer group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors truncate">
                          {matter.title}
                        </h4>
                        <Badge variant="outline" className={getPriorityColor(matter.priority)}>
                          {matter.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span className="font-mono">{matter.id}</span>
                        <span>{matter.type}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Due: {matter.dueDate}
                        </span>
                        <span>Assigned: {matter.assignee}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className={getStatusColor(matter.status)}>
                      {matter.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{matter.progress}%</span>
                    </div>
                    <Progress value={matter.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="card-shadow">
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold">Upcoming Tasks</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Your priority tasks</p>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="p-4 hover:bg-muted/30 transition-colors cursor-pointer group">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors flex-1 min-w-0 pr-2">
                      {task.title}
                    </h4>
                    <Badge variant="outline" className={`${getPriorityColor(task.priority)} text-xs`}>
                      {task.priority}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span>Due: {task.dueDate}</span>
                      <span>{task.estimatedHours}h</span>
                    </div>
                    <div>Assigned: {task.assignee}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Overview - Desktop Grid */}
      <div className="desktop-grid desktop-grid-3 gap-6">
        <Card className="card-shadow hover:card-shadow-hover hover-lift transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-lg font-semibold">Team Workload</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Current capacity utilization</p>
            </div>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Sarah Chen", workload: 85, color: "bg-warning-500" },
                { name: "David Park", workload: 72, color: "bg-info-500" },
                { name: "Emily Rodriguez", workload: 68, color: "bg-success-500" },
                { name: "Legal Team", workload: 45, color: "bg-muted" }
              ].map((member) => (
                <div key={member.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{member.name}</span>
                    <span className="text-muted-foreground">{member.workload}%</span>
                  </div>
                  <Progress value={member.workload} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-shadow hover:card-shadow-hover hover-lift transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-lg font-semibold">SLA Performance</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Service level compliance</p>
            </div>
            <Target className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success-600 mb-2">94%</div>
            <p className="text-sm text-muted-foreground mb-4">
              On-time completion rate this month
            </p>
            <div className="space-y-2">
              <Progress value={94} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Target: 90%</span>
                <span>Excellent</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-shadow hover:card-shadow-hover hover-lift transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-lg font-semibold">Risk Alerts</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Items requiring attention</p>
            </div>
            <AlertTriangle className="h-5 w-5 text-warning-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning-600 mb-2">5</div>
            <p className="text-sm text-muted-foreground mb-4">
              Active risk items across all matters
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Review Risks
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
