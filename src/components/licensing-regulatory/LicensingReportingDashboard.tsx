import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { DrillDownSlideOver } from "@/components/ui/slide-over";
import { useDrillDown } from "@/hooks/useDrillDown";
import { Download, Calendar, FileText, AlertTriangle, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

export function LicensingReportingDashboard() {
  const { drillDownData, isSlideOverOpen, openDrillDown, closeDrillDown } = useDrillDown();

  const kpis = [
    { 
      title: "Active Licenses", 
      value: 124, 
      change: "+8", 
      trend: "up",
      dataType: "compliance",
      filters: { type: "licenses", status: "active" }
    },
    { 
      title: "Expiring Soon", 
      value: 12, 
      change: "Next 90 days", 
      trend: "warning",
      dataType: "tasks",
      filters: { type: "renewals", status: "expiring" }
    },
    { 
      title: "SLA Breaches", 
      value: 3, 
      change: "-2 from last month", 
      trend: "down",
      dataType: "risks",
      filters: { type: "sla_breach" }
    },
    { 
      title: "Updates Reviewed", 
      value: 89, 
      change: "91% completion", 
      trend: "up",
      dataType: "tasks",
      filters: { type: "updates", status: "reviewed" }
    }
  ];

  const licenseStatusData = [
    { name: "Active", value: 109, color: "#22c55e" },
    { name: "Expiring", value: 12, color: "#f59e0b" },
    { name: "Overdue", value: 3, color: "#ef4444" }
  ];

  const updatesByRegionData = [
    { region: "EU", regulations: 15, caselaw: 8, proposed: 12 },
    { region: "UK", regulations: 12, caselaw: 5, proposed: 8 },
    { region: "US", regulations: 18, caselaw: 12, proposed: 15 },
    { region: "APAC", regulations: 9, caselaw: 4, proposed: 6 }
  ];

  const volumeData = [
    { month: "Jan", updates: 25 },
    { month: "Feb", updates: 32 },
    { month: "Mar", updates: 28 },
    { month: "Apr", updates: 45 },
    { month: "May", updates: 38 },
    { month: "Jun", updates: 42 }
  ];

  const complianceMetrics = [
    { framework: "GDPR", score: 94, status: "compliant" },
    { framework: "CCPA", score: 87, status: "compliant" },
    { framework: "SOX", score: 92, status: "compliant" },
    { framework: "HIPAA", score: 78, status: "needs_review" },
    { framework: "PCI-DSS", score: 85, status: "in_progress" }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return "↗️";
      case "down": return "↘️";
      case "warning": return "⚠️";
      default: return "➡️";
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up": return "text-green-600";
      case "down": return "text-red-600";
      case "warning": return "text-orange-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Licensing & Regulatory Reporting</h2>
          <p className="text-muted-foreground">
            Monitor compliance status and regulatory updates across all jurisdictions
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

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <Card 
            key={index}
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
            onClick={() => openDrillDown(kpi.dataType, kpi.title, "Licensing & Regulatory", kpi.filters)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <span className={`text-lg ${getTrendColor(kpi.trend)}`}>
                {getTrendIcon(kpi.trend)}
              </span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className={`text-xs ${getTrendColor(kpi.trend)}`}>{kpi.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* License Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>License Status Distribution</CardTitle>
            <CardDescription>Current status of all licenses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={licenseStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                  onClick={(data) => {
                    if (data && data.name) {
                      openDrillDown("compliance", `${data.name} Licenses`, "Licensing & Regulatory", { status: data.name.toLowerCase() });
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {licenseStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Regulatory Updates by Region */}
        <Card>
          <CardHeader>
            <CardTitle>Regulatory Updates by Region</CardTitle>
            <CardDescription>Updates tracked across jurisdictions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart 
                data={updatesByRegionData}
                onClick={(data) => {
                  if (data && data.activePayload) {
                    const region = data.activePayload[0]?.payload?.region;
                    openDrillDown("tasks", `${region} Regulatory Updates`, "Licensing & Regulatory", { region });
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="regulations" fill="#3b82f6" name="Regulations" style={{ cursor: "pointer" }} />
                <Bar dataKey="caselaw" fill="#10b981" name="Case Law" style={{ cursor: "pointer" }} />
                <Bar dataKey="proposed" fill="#f59e0b" name="Proposed" style={{ cursor: "pointer" }} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Update Volume Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Update Volume</CardTitle>
          <CardDescription>Regulatory update volume over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart 
              data={volumeData}
              onClick={(data) => {
                if (data && data.activePayload) {
                  const month = data.activePayload[0]?.payload?.month;
                  openDrillDown("tasks", `${month} Updates`, "Licensing & Regulatory", { month });
                }
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="updates" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 6 }}
                style={{ cursor: "pointer" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Compliance Framework Status */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Framework Status</CardTitle>
          <CardDescription>Current compliance scores across frameworks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {complianceMetrics.map((framework, index) => (
            <div 
              key={index} 
              className="space-y-2 cursor-pointer hover:bg-accent p-3 rounded transition-colors"
              onClick={() => openDrillDown("compliance", `${framework.framework} Compliance`, "Licensing & Regulatory", { framework: framework.framework })}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{framework.framework}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{framework.score}%</span>
                  <Badge 
                    variant={
                      framework.status === "compliant" ? "default" :
                      framework.status === "needs_review" ? "destructive" :
                      "secondary"
                    }
                  >
                    {framework.status.replace("_", " ")}
                  </Badge>
                </div>
              </div>
              <Progress value={framework.score} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common licensing and regulatory tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="gap-2 h-auto p-4 flex-col"
              onClick={() => openDrillDown("tasks", "Expiring Licenses", "Licensing & Regulatory", { status: "expiring" })}
            >
              <Calendar className="h-6 w-6 text-orange-600" />
              <div className="text-center">
                <div className="font-medium">Expiring Licenses</div>
                <div className="text-xs text-muted-foreground">Review renewals</div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="gap-2 h-auto p-4 flex-col"
              onClick={() => openDrillDown("tasks", "Pending Updates", "Licensing & Regulatory", { status: "pending" })}
            >
              <FileText className="h-6 w-6 text-blue-600" />
              <div className="text-center">
                <div className="font-medium">Pending Updates</div>
                <div className="text-xs text-muted-foreground">Awaiting review</div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="gap-2 h-auto p-4 flex-col"
              onClick={() => openDrillDown("risks", "Compliance Risks", "Licensing & Regulatory", { type: "compliance" })}
            >
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <div className="text-center">
                <div className="font-medium">Compliance Risks</div>
                <div className="text-xs text-muted-foreground">High priority items</div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="gap-2 h-auto p-4 flex-col"
              onClick={() => openDrillDown("tasks", "Performance Metrics", "Licensing & Regulatory", { type: "metrics" })}
            >
              <TrendingUp className="h-6 w-6 text-green-600" />
              <div className="text-center">
                <div className="font-medium">Performance</div>
                <div className="text-xs text-muted-foreground">View analytics</div>
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
