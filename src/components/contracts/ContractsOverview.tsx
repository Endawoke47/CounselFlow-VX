import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DrillDownSlideOver } from "@/components/ui/slide-over";
import { useDrillDown } from "@/hooks/useDrillDown";
import { 
  FileText, 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  Building2, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Users,
  Shield,
  Target,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

export function ContractsOverview() {
  const { drillDownData, isSlideOverOpen, openDrillDown, closeDrillDown } = useDrillDown();
  
  // 🔄 DUMMY DATA FLAG: Replace with API call to fetch contract summary statistics
  // API endpoint: GET /api/contracts/summary
  const summaryStats = [
    {
      title: "Active Contracts",
      value: "247",
      description: "Currently active across all entities",
      icon: FileText,
      trend: "+12 this month",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Total Contract Value",
      value: "$24.8M",
      description: "Combined value of active contracts",
      icon: DollarSign,
      trend: "+8.5% vs last quarter",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Expiring Soon",
      value: "18",
      description: "Require attention in next 30 days",
      icon: AlertTriangle,
      trend: "8 critical",
      variant: "destructive" as const,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "Avg Contract Value",
      value: "$100K",
      description: "Average value per contract",
      icon: TrendingUp,
      trend: "+12% vs last year",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Pending Review",
      value: "34",
      description: "Awaiting team review",
      icon: Clock,
      trend: "5 overdue",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Compliance Score",
      value: "94%",
      description: "Overall compliance rating",
      icon: Shield,
      trend: "+2% this month",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    }
  ];

  // 🔄 DUMMY DATA FLAG: Replace with API call to fetch contract value trends
  // API endpoint: GET /api/contracts/trends/value?period=6months
  // Contract value trend data
  const contractValueTrend = [
    { month: "Jan", value: 22.1, count: 235 },
    { month: "Feb", value: 23.4, count: 241 },
    { month: "Mar", value: 22.8, count: 238 },
    { month: "Apr", value: 24.2, count: 245 },
    { month: "May", value: 23.9, count: 243 },
    { month: "Jun", value: 24.8, count: 247 }
  ];

  // 🔄 DUMMY DATA FLAG: Replace with API call to fetch contract type distribution
  // API endpoint: GET /api/contracts/types/distribution
  // Contract type distribution
  const contractTypeData = [
    { name: "Software/SaaS", value: 89, color: "#3b82f6" },
    { name: "Professional Services", value: 67, color: "#10b981" },
    { name: "Real Estate", value: 34, color: "#f59e0b" },
    { name: "Vendor/Supply", value: 28, color: "#ef4444" },
    { name: "Employment", value: 19, color: "#8b5cf6" },
    { name: "Other", value: 10, color: "#6b7280" }
  ];

  // 🔄 DUMMY DATA FLAG: Replace with API call to fetch risk distribution
  // API endpoint: GET /api/contracts/risks/distribution
  // Risk distribution data
  const riskDistribution = [
    { name: "Low Risk", value: 156, color: "#10b981" },
    { name: "Medium Risk", value: 67, color: "#f59e0b" },
    { name: "High Risk", value: 24, color: "#ef4444" }
  ];

  // 🔄 DUMMY DATA FLAG: Replace with API call to fetch renewal timeline
  // API endpoint: GET /api/contracts/renewals/timeline
  // Renewal timeline data
  const renewalTimeline = [
    { period: "Next 30 Days", count: 18, value: "$2.1M", urgent: true },
    { period: "31-60 Days", count: 25, value: "$3.4M", urgent: false },
    { period: "61-90 Days", count: 31, value: "$4.2M", urgent: false },
    { period: "91+ Days", count: 173, value: "$15.1M", urgent: false }
  ];

  // 🔄 DUMMY DATA FLAG: Replace with API call to fetch top vendors
  // API endpoint: GET /api/contracts/vendors/top?limit=5
  // Top vendors by contract value
  const topVendors = [
    { name: "Microsoft Corporation", contracts: 12, value: "$2.8M", performance: 4.8 },
    { name: "Salesforce Inc", contracts: 8, value: "$2.1M", performance: 4.6 },
    { name: "Amazon Web Services", contracts: 15, value: "$1.9M", performance: 4.7 },
    { name: "Oracle Corporation", contracts: 6, value: "$1.5M", performance: 4.3 },
    { name: "Adobe Systems", contracts: 9, value: "$1.2M", performance: 4.5 }
  ];

  // 🔄 DUMMY DATA FLAG: Replace with API call to fetch compliance metrics
  // API endpoint: GET /api/contracts/compliance/metrics
  // Compliance metrics
  const complianceMetrics = [
    { category: "Data Privacy", score: 96, trend: "+2%" },
    { category: "Financial Terms", score: 94, trend: "+1%" },
    { category: "Liability Clauses", score: 92, trend: "0%" },
    { category: "Termination Rights", score: 89, trend: "+3%" },
    { category: "IP Protection", score: 91, trend: "+1%" }
  ];

  // 🔄 DUMMY DATA FLAG: Replace with API call to fetch recent activity
  // API endpoint: GET /api/contracts/activity/recent?limit=3
  const recentActivity = [
    {
      id: 1,
      action: "Contract Renewed",
      contract: "Software License Agreement",
      entity: "Acme Corp Ltd",
      user: "Sarah Johnson",
      time: "2 hours ago",
      status: "completed"
    },
    {
      id: 2,
      action: "Review Task Assigned",
      contract: "Master Service Agreement",
      entity: "Global Holdings Inc",
      user: "Mike Chen",
      time: "4 hours ago",
      status: "pending"
    },
    {
      id: 3,
      action: "Alert Triggered",
      contract: "Property Lease",
      entity: "Regional Office LLC",
      user: "System",
      time: "1 day ago",
      status: "alert"
    }
  ];

  const quickActions = [
    { label: "Add New Contract", action: "add", icon: FileText },
    { label: "Bulk Upload", action: "upload", icon: Activity },
    { label: "Generate Report", action: "report", icon: BarChart3 },
    { label: "Configure Alerts", action: "alerts", icon: AlertTriangle }
  ];

  return (
    <div className="space-y-6">
      {/* Entity Switcher */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <select className="flex-1 bg-transparent border-none text-sm focus:outline-none">
              <option>All Entities</option>
              <option>Acme Corp Ltd</option>
              <option>Global Holdings Inc</option>
              <option>Regional Office LLC</option>
              <option>Tech Subsidiary Co</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {summaryStats.map((stat, index) => (
          <Card 
            key={index} 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
            onClick={() => {
              const statusFilter = stat.title === "Active Contracts" ? { status: "active" } :
                                 stat.title === "Expiring Soon" ? { status: "expiring" } :
                                 stat.title === "Pending Review" ? { status: "under_review" } :
                                 stat.title === "Total Contract Value" ? { type: "value_analysis" } :
                                 stat.title === "Compliance Score" ? { type: "compliance" } :
                                 { status: "completed" };
              openDrillDown("contracts", stat.title, "Contract Management", statusFilter);
            }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <Badge 
                variant={stat.variant || "secondary"} 
                className="mt-2 text-xs"
              >
                {stat.trend}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contract Value Trend */}
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => openDrillDown("contracts", "Contract Value Trends", "Analytics", { type: "value_trends" })}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Contract Value Trends
            </CardTitle>
            <CardDescription>Monthly contract value and count over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={contractValueTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'value' ? `$${value}M` : value,
                    name === 'value' ? 'Contract Value' : 'Contract Count'
                  ]}
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="count"
                  stroke="#10b981"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Contract Type Distribution */}
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => openDrillDown("contracts", "Contract Type Distribution", "Analytics", { type: "contract_types" })}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-green-600" />
              Contract Type Distribution
            </CardTitle>
            <CardDescription>Breakdown by contract category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={contractTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {contractTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Distribution */}
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => openDrillDown("contracts", "Risk Analysis", "Risk Management", { type: "risk_distribution" })}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-orange-600" />
              Risk Distribution
            </CardTitle>
            <CardDescription>Contract risk assessment breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskDistribution} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8">
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Renewal Timeline */}
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => openDrillDown("contracts", "Renewal Timeline", "Contract Management", { type: "renewals" })}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              Renewal Timeline
            </CardTitle>
            <CardDescription>Upcoming contract renewals by period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {renewalTimeline.map((period, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${period.urgent ? 'bg-red-500' : 'bg-blue-500'}`} />
                    <div>
                      <p className="font-medium">{period.period}</p>
                      <p className="text-sm text-muted-foreground">{period.count} contracts</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{period.value}</p>
                    <Badge variant={period.urgent ? "destructive" : "secondary"} className="text-xs">
                      {period.urgent ? "Urgent" : "Scheduled"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Vendors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-indigo-600" />
              Top Vendors by Value
            </CardTitle>
            <CardDescription>Highest value contract relationships</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topVendors.map((vendor, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent cursor-pointer transition-colors"
                  onClick={() => openDrillDown("contracts", `${vendor.name} Contracts`, "Vendor Analysis", { vendor: vendor.name })}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{vendor.name}</p>
                      <p className="text-sm text-muted-foreground">{vendor.contracts} contracts</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{vendor.value}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-muted-foreground">★</span>
                      <span className="text-sm">{vendor.performance}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Compliance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-emerald-600" />
              Compliance Metrics
            </CardTitle>
            <CardDescription>Contract compliance scores by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complianceMetrics.map((metric, index) => (
                <div 
                  key={index}
                  className="space-y-2 cursor-pointer hover:bg-accent p-3 rounded-lg transition-colors"
                  onClick={() => openDrillDown("contracts", `${metric.category} Compliance`, "Compliance Analysis", { category: metric.category })}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{metric.category}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{metric.score}%</span>
                      <Badge variant="secondary" className="text-xs">
                        {metric.trend}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={metric.score} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity and Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest contract updates and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'completed' ? 'bg-green-500' :
                    activity.status === 'pending' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`} />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.contract}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{activity.entity}</span>
                      <span>•</span>
                      <span>{activity.user}</span>
                      <span>•</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common contract management tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <Button key={index} variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-accent">
                  <action.icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{action.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Drill Down Slide Over */}
      <DrillDownSlideOver
        isOpen={isSlideOverOpen}
        onClose={closeDrillDown}
        data={drillDownData}
      />
    </div>
  );
}
