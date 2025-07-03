import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DrillDownSlideOver } from "@/components/ui/slide-over";
import { useDrillDown } from "@/hooks/useDrillDown";
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Download,
  Calendar,
  Clock,
  Target,
  Users,
  DollarSign,
  FileText
} from "lucide-react";

export function ReportingDashboard() {
  const { drillDownData, isSlideOverOpen, openDrillDown, closeDrillDown } = useDrillDown();

  const reportMetrics = [
    {
      title: "Matters Completed",
      value: "78",
      change: "+12% vs last month",
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-50",
      dataType: "matters",
      filters: { status: "completed" }
    },
    {
      title: "Avg Resolution Time",
      value: "12.5 days",
      change: "-8% improvement",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      dataType: "matters",
      filters: { metric: "resolution_time" }
    },
    {
      title: "Team Utilization",
      value: "84%",
      change: "+5% vs last month",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      dataType: "tasks",
      filters: { metric: "utilization" }
    },
    {
      title: "Budget Efficiency",
      value: "92%",
      change: "Within budget targets",
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      dataType: "matters",
      filters: { metric: "budget_efficiency" }
    }
  ];

  const mattersByType = [
    { type: "Contract Review", count: 23, percentage: 32 },
    { type: "Legal Advice", count: 18, percentage: 25 },
    { type: "Compliance", count: 15, percentage: 21 },
    { type: "Employment Law", count: 10, percentage: 14 },
    { type: "Other", count: 6, percentage: 8 }
  ];

  const mattersByPriority = [
    { priority: "Critical", count: 5, percentage: 7 },
    { priority: "High", count: 18, percentage: 25 },
    { priority: "Medium", count: 32, percentage: 44 },
    { priority: "Low", count: 17, percentage: 24 }
  ];

  const teamPerformance = [
    { member: "Sarah Johnson", matters: 12, avgTime: "8.5 days", efficiency: 95 },
    { member: "Mike Chen", matters: 15, avgTime: "10.2 days", efficiency: 88 },
    { member: "Emily Davis", matters: 9, avgTime: "7.8 days", efficiency: 92 },
    { member: "David Wilson", matters: 11, avgTime: "11.5 days", efficiency: 85 },
    { member: "Lisa Brown", matters: 8, avgTime: "9.1 days", efficiency: 90 }
  ];

  const monthlyTrends = [
    { month: "Jan", completed: 45, budget: 85000, efficiency: 88 },
    { month: "Feb", completed: 52, budget: 92000, efficiency: 91 },
    { month: "Mar", completed: 48, budget: 88000, efficiency: 89 },
    { month: "Apr", completed: 61, budget: 95000, efficiency: 93 },
    { month: "May", completed: 58, budget: 91000, efficiency: 90 },
    { month: "Jun", completed: 67, budget: 98000, efficiency: 94 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Matter Management Reporting</h2>
          <p className="text-muted-foreground">
            Performance analytics and insights for legal matter management
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="last-30-days">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 days</SelectItem>
              <SelectItem value="last-30-days">Last 30 days</SelectItem>
              <SelectItem value="last-90-days">Last 90 days</SelectItem>
              <SelectItem value="last-year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportMetrics.map((metric, index) => (
          <Card 
            key={index}
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
            onClick={() => openDrillDown(metric.dataType, metric.title, "Matter Management", metric.filters)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Matters by Type */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-blue-600" />
              Matters by Type
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mattersByType.map((item, index) => (
              <div 
                key={index} 
                className="space-y-2 cursor-pointer hover:bg-accent p-2 rounded transition-colors"
                onClick={() => openDrillDown("matters", `${item.type} Matters`, "Matter Management", { type: item.type })}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.type}</span>
                  <span className="text-sm">{item.count} matters</span>
                </div>
                <Progress value={item.percentage} className="h-2" />
                <div className="text-xs text-muted-foreground text-right">
                  {item.percentage}% of total
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Matters by Priority */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-orange-600" />
              Matters by Priority
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mattersByPriority.map((item, index) => (
              <div 
                key={index} 
                className="space-y-2 cursor-pointer hover:bg-accent p-2 rounded transition-colors"
                onClick={() => openDrillDown("matters", `${item.priority} Priority Matters`, "Matter Management", { priority: item.priority.toLowerCase() })}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.priority}</span>
                  <span className="text-sm">{item.count} matters</span>
                </div>
                <Progress 
                  value={item.percentage} 
                  className={`h-2 ${
                    item.priority === "Critical" ? "bg-red-100" :
                    item.priority === "High" ? "bg-orange-100" :
                    item.priority === "Medium" ? "bg-yellow-100" :
                    "bg-green-100"
                  }`}
                />
                <div className="text-xs text-muted-foreground text-right">
                  {item.percentage}% of total
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Team Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" />
            Team Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamPerformance.map((member, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors"
                onClick={() => openDrillDown("matters", `${member.member} Matters`, "Team Performance", { assignee: member.member })}
              >
                <div className="flex-1">
                  <div className="font-medium">{member.member}</div>
                  <div className="text-sm text-muted-foreground">
                    {member.matters} matters • Avg: {member.avgTime}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{member.efficiency}%</div>
                  <div className="text-sm text-muted-foreground">Efficiency</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Monthly Performance Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyTrends.map((month, index) => (
              <div 
                key={index} 
                className="grid grid-cols-4 gap-4 p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors"
                onClick={() => openDrillDown("matters", `${month.month} Performance`, "Monthly Analytics", { month: month.month })}
              >
                <div className="text-center">
                  <div className="font-bold text-lg">{month.month}</div>
                  <div className="text-xs text-muted-foreground">Month</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg text-blue-600">{month.completed}</div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg text-green-600">${(month.budget / 1000).toFixed(0)}K</div>
                  <div className="text-xs text-muted-foreground">Budget Used</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg text-purple-600">{month.efficiency}%</div>
                  <div className="text-xs text-muted-foreground">Efficiency</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Report Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="gap-2 h-auto p-4 flex-col"
              onClick={() => openDrillDown("matters", "Overdue Matters", "Matter Management", { status: "overdue" })}
            >
              <Clock className="h-6 w-6 text-red-600" />
              <div className="text-center">
                <div className="font-medium">Overdue Matters</div>
                <div className="text-xs text-muted-foreground">View all overdue</div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="gap-2 h-auto p-4 flex-col"
              onClick={() => openDrillDown("matters", "High Value Matters", "Matter Management", { value: "high" })}
            >
              <DollarSign className="h-6 w-6 text-green-600" />
              <div className="text-center">
                <div className="font-medium">High Value</div>
                <div className="text-xs text-muted-foreground">$50K+ matters</div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="gap-2 h-auto p-4 flex-col"
              onClick={() => openDrillDown("tasks", "Pending Reviews", "Matter Management", { status: "pending_review" })}
            >
              <FileText className="h-6 w-6 text-blue-600" />
              <div className="text-center">
                <div className="font-medium">Pending Reviews</div>
                <div className="text-xs text-muted-foreground">Awaiting approval</div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="gap-2 h-auto p-4 flex-col"
              onClick={() => openDrillDown("matters", "Team Workload", "Matter Management", { metric: "workload" })}
            >
              <Users className="h-6 w-6 text-purple-600" />
              <div className="text-center">
                <div className="font-medium">Team Workload</div>
                <div className="text-xs text-muted-foreground">Current assignments</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Drill Down Slide Over */}
      <DrillDownSlideOver
        isOpen={isSlideOverOpen}
        onClose={closeDrillDown}
        data={drillDownData}
      />
    </div>
  );
}
