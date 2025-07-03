import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DrillDownSlideOver } from "@/components/ui/slide-over";
import { useDrillDown } from "@/hooks/useDrillDown";
import { AlertTriangle, Shield, TrendingUp, Clock, BarChart3, Users, Target, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import { RiskMatrixChart } from "./RiskMatrixChart";

// 🔄 DUMMY DATA FLAG: Replace with API call to fetch risk trend data
// API endpoint: GET /api/risks/trends?period=6months
const riskTrendData = [
  { month: "Jan", high: 12, medium: 28, low: 15 },
  { month: "Feb", high: 15, medium: 25, low: 18 },
  { month: "Mar", high: 18, medium: 30, low: 20 },
  { month: "Apr", high: 14, medium: 35, low: 22 },
  { month: "May", high: 16, medium: 32, low: 25 },
  { month: "Jun", high: 13, medium: 29, low: 28 }
];

// 🔄 DUMMY DATA FLAG: Replace with API call to fetch risk category distribution
// API endpoint: GET /api/risks/categories/distribution
const riskCategoryData = [
  { name: "Regulatory", value: 35, color: "#ef4444" },
  { name: "Operational", value: 28, color: "#f59e0b" },
  { name: "Financial", value: 20, color: "#eab308" },
  { name: "Cyber Security", value: 12, color: "#3b82f6" },
  { name: "Reputational", value: 5, color: "#8b5cf6" }
];

// 🔄 DUMMY DATA FLAG: Replace with API call to fetch mitigation progress data
// API endpoint: GET /api/risks/mitigation/progress
const mitigationProgressData = [
  { category: "Critical Risks", completed: 75, total: 100 },
  { category: "High Risks", completed: 60, total: 100 },
  { category: "Medium Risks", completed: 45, total: 100 },
  { category: "Low Risks", completed: 80, total: 100 }
];

// 🔄 DUMMY DATA FLAG: Replace with API call to fetch risk matrix data
// API endpoint: GET /api/risks/matrix?entities=all&riskTypes=all
// Risk matrix data showing severity across entities and risk types
const riskMatrixData = [
  // Acme Corp Ltd
  { entity: "Acme Corp Ltd", riskType: "Contract", severity: "medium" as const, count: 12, riskScore: 6.2 },
  { entity: "Acme Corp Ltd", riskType: "IP", severity: "low" as const, count: 8, riskScore: 3.1 },
  { entity: "Acme Corp Ltd", riskType: "Employment", severity: "medium" as const, count: 15, riskScore: 5.8 },
  { entity: "Acme Corp Ltd", riskType: "Compliance", severity: "high" as const, count: 9, riskScore: 7.4 },
  { entity: "Acme Corp Ltd", riskType: "Litigation", severity: "critical" as const, count: 6, riskScore: 8.9 },
  { entity: "Acme Corp Ltd", riskType: "Regulatory", severity: "high" as const, count: 11, riskScore: 7.1 },
  { entity: "Acme Corp Ltd", riskType: "Financial", severity: "medium" as const, count: 7, riskScore: 5.3 },
  { entity: "Acme Corp Ltd", riskType: "Operational", severity: "low" as const, count: 14, riskScore: 4.2 },

  // Global Holdings Inc
  { entity: "Global Holdings Inc", riskType: "Contract", severity: "low" as const, count: 18, riskScore: 3.8 },
  { entity: "Global Holdings Inc", riskType: "IP", severity: "high" as const, count: 22, riskScore: 7.6 },
  { entity: "Global Holdings Inc", riskType: "Employment", severity: "low" as const, count: 10, riskScore: 2.9 },
  { entity: "Global Holdings Inc", riskType: "Compliance", severity: "critical" as const, count: 16, riskScore: 8.7 },
  { entity: "Global Holdings Inc", riskType: "Litigation", severity: "high" as const, count: 13, riskScore: 7.8 },
  { entity: "Global Holdings Inc", riskType: "Regulatory", severity: "critical" as const, count: 19, riskScore: 9.1 },
  { entity: "Global Holdings Inc", riskType: "Financial", severity: "medium" as const, count: 14, riskScore: 6.0 },
  { entity: "Global Holdings Inc", riskType: "Operational", severity: "medium" as const, count: 12, riskScore: 5.5 },

  // Regional Office LLC
  { entity: "Regional Office LLC", riskType: "Contract", severity: "low" as const, count: 6, riskScore: 2.8 },
  { entity: "Regional Office LLC", riskType: "IP", severity: "low" as const, count: 3, riskScore: 2.1 },
  { entity: "Regional Office LLC", riskType: "Employment", severity: "medium" as const, count: 11, riskScore: 5.2 },
  { entity: "Regional Office LLC", riskType: "Compliance", severity: "medium" as const, count: 8, riskScore: 5.9 },
  { entity: "Regional Office LLC", riskType: "Litigation", severity: "high" as const, count: 4, riskScore: 7.3 },
  { entity: "Regional Office LLC", riskType: "Regulatory", severity: "medium" as const, count: 7, riskScore: 5.4 },
  { entity: "Regional Office LLC", riskType: "Financial", severity: "low" as const, count: 5, riskScore: 3.2 },
  { entity: "Regional Office LLC", riskType: "Operational", severity: "low" as const, count: 9, riskScore: 3.7 },

  // Tech Subsidiary Co
  { entity: "Tech Subsidiary Co", riskType: "Contract", severity: "medium" as const, count: 9, riskScore: 6.1 },
  { entity: "Tech Subsidiary Co", riskType: "IP", severity: "critical" as const, count: 25, riskScore: 9.3 },
  { entity: "Tech Subsidiary Co", riskType: "Employment", severity: "low" as const, count: 7, riskScore: 3.4 },
  { entity: "Tech Subsidiary Co", riskType: "Compliance", severity: "high" as const, count: 13, riskScore: 7.7 },
  { entity: "Tech Subsidiary Co", riskType: "Litigation", severity: "medium" as const, count: 8, riskScore: 6.3 },
  { entity: "Tech Subsidiary Co", riskType: "Regulatory", severity: "high" as const, count: 10, riskScore: 7.2 },
  { entity: "Tech Subsidiary Co", riskType: "Financial", severity: "medium" as const, count: 6, riskScore: 5.7 },
  { entity: "Tech Subsidiary Co", riskType: "Operational", severity: "medium" as const, count: 11, riskScore: 5.8 }
];

export function RiskOverviewDashboard() {
  const { drillDownData, isSlideOverOpen, openDrillDown, closeDrillDown } = useDrillDown();

  const handleMatrixCellClick = (entity: string, riskType: string, severity: string) => {
    openDrillDown("risks", `${entity} - ${riskType} Risks`, "Risk Management", { 
      entity, 
      riskType, 
      severity 
    });
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card 
          className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
          onClick={() => openDrillDown("risks", "All Risks", "Risk Management")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Risks</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {/* 🔄 DUMMY DATA FLAG: Replace with real risk count from API */}
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">
              +12 from last month
            </p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
          onClick={() => openDrillDown("risks", "Critical & High Risks", "Risk Management", { severity: "critical,high" })}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical & High</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            {/* 🔄 DUMMY DATA FLAG: Replace with real critical/high risk count from API */}
            <div className="text-2xl font-bold text-red-600">42</div>
            <p className="text-xs text-muted-foreground">
              Require immediate attention
            </p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
          onClick={() => openDrillDown("risks", "Risk Mitigation Progress", "Risk Management", { status: "mitigating" })}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mitigation Rate</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            {/* 🔄 DUMMY DATA FLAG: Replace with real mitigation rate from API */}
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">
              Actions completed
            </p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
          onClick={() => openDrillDown("risks", "High Risk Score Items", "Risk Management", { severity: "high" })}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
            <Activity className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            {/* 🔄 DUMMY DATA FLAG: Replace with real portfolio risk score from API */}
            <div className="text-2xl font-bold">7.2</div>
            <p className="text-xs text-muted-foreground">
              Portfolio risk rating
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Matrix Chart */}
      <RiskMatrixChart 
        data={riskMatrixData} 
        onCellClick={handleMatrixCellClick}
      />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Risk Trend Analysis</CardTitle>
            <CardDescription>Risk levels over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart 
                data={riskTrendData}
                onClick={(data) => {
                  if (data && data.activePayload) {
                    const month = data.activePayload[0]?.payload?.month;
                    openDrillDown("risks", `Risks for ${month}`, "Risk Management", { month });
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="high" stroke="#ef4444" strokeWidth={2} name="High Risk" style={{ cursor: "pointer" }} />
                <Line type="monotone" dataKey="medium" stroke="#f59e0b" strokeWidth={2} name="Medium Risk" style={{ cursor: "pointer" }} />
                <Line type="monotone" dataKey="low" stroke="#22c55e" strokeWidth={2} name="Low Risk" style={{ cursor: "pointer" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk by Category</CardTitle>
            <CardDescription>Distribution of risks across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskCategoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  onClick={(data) => {
                    if (data && data.name) {
                      openDrillDown("risks", `${data.name} Risks`, "Risk Management", { category: data.name });
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {riskCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Top Risks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mitigation Progress</CardTitle>
            <CardDescription>Progress on risk mitigation actions by category</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mitigationProgressData.map((item, index) => (
              <div 
                key={index} 
                className="space-y-2 cursor-pointer hover:bg-accent p-2 rounded transition-colors"
                onClick={() => openDrillDown("risks", `${item.category} Details`, "Risk Management", { category: item.category.toLowerCase().replace(' risks', '') })}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.category}</span>
                  <span className="text-sm">{item.completed}%</span>
                </div>
                <Progress value={item.completed} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Critical Risks</CardTitle>
            <CardDescription>Highest priority risks requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            {/* 🔄 DUMMY DATA FLAG: Replace with API call to fetch top critical risks */}
            {/* API endpoint: GET /api/risks/critical?limit=3 */}
            <div className="space-y-4">
              <div 
                className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent transition-colors"
                onClick={() => openDrillDown("risks", "Regulatory Compliance Risks", "Risk Management", { category: "Regulatory" })}
              >
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <div className="flex-1">
                  <div className="font-medium">Regulatory Compliance Gap</div>
                  <div className="text-sm text-muted-foreground">
                    New GDPR requirements not fully implemented
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-red-100 text-red-800">Critical</Badge>
                    <span className="text-xs text-muted-foreground">Due in 15 days</span>
                  </div>
                </div>
              </div>

              <div 
                className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent transition-colors"
                onClick={() => openDrillDown("risks", "Cyber Security Risks", "Risk Management", { category: "Cyber Security" })}
              >
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <div className="flex-1">
                  <div className="font-medium">Cyber Security Vulnerability</div>
                  <div className="text-sm text-muted-foreground">
                    Critical security patches pending deployment
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-red-100 text-red-800">Critical</Badge>
                    <span className="text-xs text-muted-foreground">Due in 7 days</span>
                  </div>
                </div>
              </div>

              <div 
                className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent transition-colors"
                onClick={() => openDrillDown("risks", "Operational Risks", "Risk Management", { category: "Operational" })}
              >
                <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                <div className="flex-1">
                  <div className="font-medium">Vendor Risk Assessment</div>
                  <div className="text-sm text-muted-foreground">
                    Key vendor contracts up for renewal
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-orange-100 text-orange-800">High</Badge>
                    <span className="text-xs text-muted-foreground">Due in 30 days</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common risk management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div 
              className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent cursor-pointer"
              onClick={() => openDrillDown("risks", "New Risks", "Risk Management", { status: "open" })}
            >
              <Target className="h-5 w-5 text-blue-600" />
              <div>
                <div className="font-medium">Add New Risk</div>
                <div className="text-sm text-muted-foreground">Register new risk</div>
              </div>
            </div>
            
            <div 
              className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent cursor-pointer"
              onClick={() => openDrillDown("risks", "Mitigation Actions", "Risk Management", { status: "mitigating" })}
            >
              <Shield className="h-5 w-5 text-green-600" />
              <div>
                <div className="font-medium">Update Mitigation</div>
                <div className="text-sm text-muted-foreground">Track progress</div>
              </div>
            </div>
            
            <div 
              className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent cursor-pointer"
              onClick={() => openDrillDown("risks", "Risk Analytics", "Risk Management")}
            >
              <BarChart3 className="h-5 w-5 text-purple-600" />
              <div>
                <div className="font-medium">Generate Report</div>
                <div className="text-sm text-muted-foreground">Risk analytics</div>
              </div>
            </div>
            
            <div 
              className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent cursor-pointer"
              onClick={() => openDrillDown("risks", "Unassigned Risks", "Risk Management", { owner: "unassigned" })}
            >
              <Users className="h-5 w-5 text-orange-600" />
              <div>
                <div className="font-medium">Assign Owner</div>
                <div className="text-sm text-muted-foreground">Delegate risks</div>
              </div>
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
