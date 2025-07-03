import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from "recharts";
import { TrendingUp, TrendingDown, Clock, CheckCircle, AlertTriangle, Users, Calendar, Target, Download, Filter } from "lucide-react";
import { useState } from "react";

export function TaskMetrics() {
  const [timeRange, setTimeRange] = useState("30");
  const [selectedEntity, setSelectedEntity] = useState("all");

  // Sample metrics data
  const overviewMetrics = [
    {
      title: "Total Tasks",
      value: 247,
      change: "+12%",
      trend: "up",
      icon: Clock,
      color: "text-blue-600"
    },
    {
      title: "Completed",
      value: 189,
      change: "+8%",
      trend: "up",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Overdue",
      value: 23,
      change: "-15%",
      trend: "down",
      icon: AlertTriangle,
      color: "text-red-600"
    },
    {
      title: "Avg. Completion Time",
      value: "4.2 days",
      change: "-0.8 days",
      trend: "down",
      icon: Target,
      color: "text-purple-600"
    }
  ];

  const modulePerformance = [
    { name: "Contracts", completed: 45, pending: 12, overdue: 3, total: 60 },
    { name: "IP Management", completed: 38, pending: 15, overdue: 7, total: 60 },
    { name: "Compliance", completed: 42, pending: 8, overdue: 2, total: 52 },
    { name: "Disputes", completed: 28, pending: 18, overdue: 6, total: 52 },
    { name: "Company Secretarial", completed: 36, pending: 10, overdue: 5, total: 51 }
  ];

  const assigneePerformance = [
    { name: "Sarah Chen", completed: 28, pending: 5, overdue: 2, efficiency: 89 },
    { name: "David Park", completed: 25, pending: 8, overdue: 4, efficiency: 82 },
    { name: "Emily Rodriguez", completed: 22, pending: 6, overdue: 1, efficiency: 91 },
    { name: "Michael Kim", completed: 20, pending: 7, overdue: 3, efficiency: 85 },
    { name: "Lisa Wang", completed: 18, pending: 9, overdue: 2, efficiency: 87 }
  ];

  const taskTrends = [
    { month: "Sep", created: 42, completed: 38, overdue: 8 },
    { month: "Oct", created: 48, completed: 45, overdue: 6 },
    { month: "Nov", created: 52, completed: 49, overdue: 4 },
    { month: "Dec", created: 38, completed: 41, overdue: 3 },
    { month: "Jan", created: 45, completed: 43, overdue: 5 }
  ];

  const priorityDistribution = [
    { name: "Critical", value: 18, color: "#dc2626" },
    { name: "High", value: 45, color: "#ea580c" },
    { name: "Medium", value: 132, color: "#ca8a04" },
    { name: "Low", value: 52, color: "#16a34a" }
  ];

  const completionRates = [
    { entity: "Global Holdings", rate: 92 },
    { entity: "EU Operations", rate: 88 },
    { entity: "APAC Operations", rate: 85 },
    { entity: "Technology Division", rate: 90 },
    { entity: "Corporate", rate: 94 }
  ];

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? <TrendingUp className="h-4 w-4 text-green-500" /> : <TrendingDown className="h-4 w-4 text-red-500" />;
  };

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-green-600" : "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Task Analytics & Metrics</h2>
          <p className="text-muted-foreground">Performance insights and task management analytics</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedEntity} onValueChange={setSelectedEntity}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Entities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Entities</SelectItem>
              <SelectItem value="global">Global Holdings</SelectItem>
              <SelectItem value="eu">EU Operations</SelectItem>
              <SelectItem value="apac">APAC Operations</SelectItem>
              <SelectItem value="tech">Technology Division</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 days</SelectItem>
              <SelectItem value="30">30 days</SelectItem>
              <SelectItem value="90">90 days</SelectItem>
              <SelectItem value="365">1 year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <div className={`flex items-center gap-1 text-sm ${getTrendColor(metric.trend)}`}>
                    {getTrendIcon(metric.trend)}
                    {metric.change}
                  </div>
                </div>
                <metric.icon className={`h-8 w-8 ${metric.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="workload">Workload</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Module Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Performance by Module</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={modulePerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" fill="#22c55e" name="Completed" />
                    <Bar dataKey="pending" fill="#eab308" name="Pending" />
                    <Bar dataKey="overdue" fill="#ef4444" name="Overdue" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Priority Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Task Priority Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={priorityDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {priorityDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Completion Rates by Entity */}
          <Card>
            <CardHeader>
              <CardTitle>Completion Rates by Entity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completionRates.map((entity, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{entity.entity}</span>
                      <span className="text-sm text-muted-foreground">{entity.rate}%</span>
                    </div>
                    <Progress value={entity.rate} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Task Creation vs Completion Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={taskTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="created" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="completed" stackId="2" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
                  <Line type="monotone" dataKey="overdue" stroke="#ef4444" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Workload Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assigneePerformance.map((assignee, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="h-4 w-4" />
                        </div>
                        <span className="font-medium">{assignee.name}</span>
                      </div>
                      <Badge variant="outline">
                        {assignee.efficiency}% efficiency
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Completed</p>
                        <p className="font-semibold text-green-600">{assignee.completed}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Pending</p>
                        <p className="font-semibold text-yellow-600">{assignee.pending}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Overdue</p>
                        <p className="font-semibold text-red-600">{assignee.overdue}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Average Resolution Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Critical Priority</span>
                    <span className="font-semibold">1.2 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>High Priority</span>
                    <span className="font-semibold">2.8 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Medium Priority</span>
                    <span className="font-semibold">5.1 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Low Priority</span>
                    <span className="font-semibold">8.3 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Task Backlog</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Current Week</span>
                    <Badge variant="outline">28 tasks</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Next Week</span>
                    <Badge variant="outline">35 tasks</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>This Month</span>
                    <Badge variant="outline">142 tasks</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Future</span>
                    <Badge variant="outline">67 tasks</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
