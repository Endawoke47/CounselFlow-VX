import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DrillDownSlideOver } from "@/components/ui/slide-over";
import { useDrillDown } from "@/hooks/useDrillDown";
import { AnalyticsDashboard, legalAnalyticsPresets } from "@/components/ui/analytics-dashboard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import {
  FileText,
  Users,
  AlertTriangle,
  Shield,
  DollarSign,
  TrendingUp,
  Calendar,
  CheckCircle,
} from "lucide-react";

export function DrillDownDemo() {
  const { drillDownData, isSlideOverOpen, openDrillDown, closeDrillDown } = useDrillDown();

  // Sample data for charts
  const contractStatusData = [
    { name: "Active", value: 247, color: "#10b981" },
    { name: "Expiring", value: 23, color: "#f59e0b" },
    { name: "Expired", value: 12, color: "#ef4444" },
    { name: "Draft", value: 8, color: "#6b7280" },
  ];

  const matterTrendData = [
    { month: "Jan", matters: 45, spend: 120000 },
    { month: "Feb", matters: 52, spend: 135000 },
    { month: "Mar", matters: 48, spend: 128000 },
    { month: "Apr", matters: 61, spend: 145000 },
    { month: "May", matters: 58, spend: 142000 },
    { month: "Jun", matters: 67, spend: 158000 },
  ];

  const riskCategoryData = [
    { category: "Compliance", count: 23, severity: "high" },
    { category: "Financial", count: 18, severity: "medium" },
    { category: "Operational", count: 31, severity: "low" },
    { category: "Strategic", count: 15, severity: "critical" },
    { category: "Legal", count: 27, severity: "medium" },
  ];

  const complianceScores = [
    { framework: "GDPR", score: 94, status: "compliant" },
    { framework: "CCPA", score: 87, status: "compliant" },
    { framework: "SOX", score: 92, status: "compliant" },
    { framework: "HIPAA", score: 78, status: "needs_review" },
    { framework: "PCI-DSS", score: 85, status: "in_progress" },
  ];

  // Key metrics with drill-down
  const keyMetrics = [
    {
      title: "Active Contracts",
      value: "247",
      icon: FileText,
      color: "text-blue-600",
      change: "+12 this month",
      dataType: "contracts",
      filters: { status: "active" },
    },
    {
      title: "Active Matters",
      value: "89",
      icon: Users,
      color: "text-green-600",
      change: "+7 this month",
      dataType: "matters",
      filters: { status: "active" },
    },
    {
      title: "High Risks",
      value: "23",
      icon: AlertTriangle,
      color: "text-red-600",
      change: "-2 this week",
      dataType: "risks",
      filters: { severity: "high" },
    },
    {
      title: "Compliance Score",
      value: "94%",
      icon: Shield,
      color: "text-purple-600",
      change: "+3% this quarter",
      dataType: "compliance",
      filters: { status: "compliant" },
    },
    {
      title: "Legal Spend",
      value: "$2.4M",
      icon: DollarSign,
      color: "text-yellow-600",
      change: "+8% this quarter",
      dataType: "matters",
      filters: { type: "spend" },
    },
    {
      title: "Tasks Completed",
      value: "156",
      icon: CheckCircle,
      color: "text-teal-600",
      change: "+23% vs last quarter",
      dataType: "tasks",
      filters: { status: "completed" },
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Drill-Down Functionality Demo</h1>
        <p className="text-muted-foreground">
          Click on any metric card, chart element, or icon to view detailed data in a slide-over panel
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Interactive Metric Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {keyMetrics.map((metric, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
              onClick={() =>
                openDrillDown(
                  metric.dataType,
                  metric.title,
                  "Legal Operations",
                  metric.filters
                )
              }
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <div className="p-2 rounded-lg bg-primary/10">
                  <metric.icon className={`h-4 w-4 ${metric.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{metric.change}</p>
                <Badge variant="outline" className="mt-2 text-xs">
                  Click to drill down
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Interactive Charts */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Interactive Charts</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contract Status Pie Chart */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Contract Status Distribution
              </CardTitle>
              <CardDescription>Click on any segment to view contracts</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={contractStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    onClick={(data) => {
                      if (data && data.name) {
                        openDrillDown(
                          "contracts",
                          `${data.name} Contracts`,
                          "Contract Management",
                          { status: data.name.toLowerCase() }
                        );
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {contractStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Matter Trend Line Chart */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Matter Trends
              </CardTitle>
              <CardDescription>Click on any point to view matters for that month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={matterTrendData}
                  onClick={(data) => {
                    if (data && data.activePayload) {
                      const month = data.activePayload[0]?.payload?.month;
                      openDrillDown(
                        "matters",
                        `Matters for ${month}`,
                        "Matter Management",
                        { month }
                      );
                    }
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="matters"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 6, cursor: "pointer" }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Risk Category Bar Chart */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Risk Categories
              </CardTitle>
              <CardDescription>Click on any bar to view risks in that category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={riskCategoryData}
                  onClick={(data) => {
                    if (data && data.activePayload) {
                      const category = data.activePayload[0]?.payload?.category;
                      openDrillDown(
                        "risks",
                        `${category} Risks`,
                        "Risk Management",
                        { category: category?.toLowerCase() }
                      );
                    }
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="category" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Bar
                    dataKey="count"
                    fill="#ef4444"
                    radius={[4, 4, 0, 0]}
                    style={{ cursor: "pointer" }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Compliance Scores */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-600" />
                Compliance Scores
              </CardTitle>
              <CardDescription>Click on any framework to view compliance details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceScores.map((item) => (
                  <div
                    key={item.framework}
                    className="flex items-center justify-between cursor-pointer hover:bg-muted/50 p-3 rounded-md transition-colors"
                    onClick={() =>
                      openDrillDown(
                        "compliance",
                        `${item.framework} Compliance`,
                        "Data Protection",
                        { framework: item.framework }
                      )
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{item.framework}</Badge>
                      <span className="text-sm font-medium">{item.score}%</span>
                    </div>
                    <Badge
                      variant={
                        item.status === "compliant"
                          ? "default"
                          : item.status === "needs_review"
                          ? "destructive"
                          : "secondary"
                      }
                      className="text-xs"
                    >
                      {item.status.replace("_", " ")}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Analytics Dashboard Examples */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Pre-built Analytics Dashboards</h2>
        <div className="space-y-8">
          <AnalyticsDashboard {...legalAnalyticsPresets.contracts} />
          <AnalyticsDashboard {...legalAnalyticsPresets.matters} />
          <AnalyticsDashboard {...legalAnalyticsPresets.risks} />
        </div>
      </div>

      {/* Instructions */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            How to Use Drill-Down Functionality
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Interactive Elements:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Click metric cards to view underlying data</li>
                <li>• Click chart segments (pie charts) for filtered data</li>
                <li>• Click chart bars or points for time-based data</li>
                <li>• Click progress bars for compliance details</li>
                <li>• Click icons for category-specific data</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Slide-Over Features:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Detailed data table with sorting/filtering</li>
                <li>• Applied filters display</li>
                <li>• Summary statistics</li>
                <li>• Export capabilities</li>
                <li>• Responsive design</li>
              </ul>
            </div>
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