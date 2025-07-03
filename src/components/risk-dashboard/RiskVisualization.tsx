
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, BarChart, Bar, PieChart, Pie, Legend, LineChart, Line } from "recharts";

// Mock data for risk heatmap
const riskHeatmapData = [
  { probability: 10, impact: 2, name: "Minor Process Risk", category: "Operational", riskScore: 2.0 },
  { probability: 20, impact: 3, name: "Documentation Gap", category: "Regulatory", riskScore: 3.0 },
  { probability: 30, impact: 4, name: "Vendor Dependency", category: "Operational", riskScore: 4.5 },
  { probability: 40, impact: 3, name: "Market Volatility", category: "Financial", riskScore: 4.8 },
  { probability: 50, impact: 4, name: "Skill Gap", category: "Operational", riskScore: 6.0 },
  { probability: 60, impact: 4, name: "System Vulnerability", category: "Cyber Security", riskScore: 7.2 },
  { probability: 70, impact: 3, name: "Vendor Risk", category: "Operational", riskScore: 7.0 },
  { probability: 80, impact: 4, name: "Compliance Gap", category: "Regulatory", riskScore: 8.0 },
  { probability: 85, impact: 5, name: "GDPR Violation", category: "Regulatory", riskScore: 8.5 },
  { probability: 60, impact: 5, name: "Cyber Attack", category: "Cyber Security", riskScore: 9.0 }
];

// Risk distribution by category
const categoryDistribution = [
  { category: "Regulatory", count: 35, percentage: 35 },
  { category: "Operational", count: 28, percentage: 28 },
  { category: "Financial", count: 20, percentage: 20 },
  { category: "Cyber Security", count: 12, percentage: 12 },
  { category: "Reputational", count: 5, percentage: 5 }
];

// Risk trend over time
const riskTrendData = [
  { month: "Jan", identified: 12, resolved: 8, open: 35 },
  { month: "Feb", identified: 15, resolved: 10, open: 40 },
  { month: "Mar", identified: 18, resolved: 12, open: 46 },
  { month: "Apr", identified: 14, resolved: 16, open: 44 },
  { month: "May", identified: 16, resolved: 14, open: 46 },
  { month: "Jun", identified: 13, resolved: 15, open: 44 }
];

// Risk severity distribution
const severityData = [
  { severity: "Critical", count: 8, color: "#ef4444" },
  { severity: "High", count: 15, color: "#f97316" },
  { severity: "Medium", count: 32, color: "#eab308" },
  { severity: "Low", count: 18, color: "#22c55e" }
];

export function RiskVisualization() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("6months");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const getRiskColor = (riskScore: number) => {
    if (riskScore >= 8) return "#ef4444"; // Red for critical
    if (riskScore >= 6) return "#f97316"; // Orange for high
    if (riskScore >= 4) return "#eab308"; // Yellow for medium
    return "#22c55e"; // Green for low
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-muted-foreground">Category: {data.category}</p>
          <p className="text-sm">Probability: {data.probability}%</p>
          <p className="text-sm">Impact: {data.impact}/5</p>
          <p className="text-sm font-medium">Risk Score: {data.riskScore}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Risk Analysis & Visualization</h2>
          <p className="text-muted-foreground">Visual analysis of risk patterns, trends, and distributions</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Charts
          </Button>
        </div>
      </div>

      {/* Risk Heat Map */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Heat Map</CardTitle>
          <CardDescription>
            Risk positioning based on probability and impact assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              data={riskHeatmapData}
            >
              <CartesianGrid />
              <XAxis 
                type="number" 
                dataKey="probability" 
                name="Probability (%)"
                domain={[0, 100]}
                label={{ value: 'Probability (%)', position: 'bottom' }}
              />
              <YAxis 
                type="number" 
                dataKey="impact" 
                name="Impact"
                domain={[0, 5]}
                label={{ value: 'Impact Level', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Scatter dataKey="riskScore" fill="#8884d8">
                {riskHeatmapData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getRiskColor(entry.riskScore)} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div className="mt-4 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Low Risk (0-4)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span>Medium Risk (4-6)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span>High Risk (6-8)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>Critical Risk (8+)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Distribution by Category</CardTitle>
            <CardDescription>Breakdown of risks across different categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                  label={({ category, percentage }) => `${category}: ${percentage}%`}
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`hsl(${index * 72}, 70%, 50%)`} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Severity Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Severity Distribution</CardTitle>
            <CardDescription>Number of risks by severity level</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={severityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="severity" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8">
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Risk Trend Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Trend Analysis</CardTitle>
          <CardDescription>Risk identification and resolution trends over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={riskTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="identified" 
                stroke="#ef4444" 
                strokeWidth={2} 
                name="Risks Identified" 
              />
              <Line 
                type="monotone" 
                dataKey="resolved" 
                stroke="#22c55e" 
                strokeWidth={2} 
                name="Risks Resolved" 
              />
              <Line 
                type="monotone" 
                dataKey="open" 
                stroke="#3b82f6" 
                strokeWidth={2} 
                name="Open Risks" 
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Risk Analysis Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Analysis Insights</CardTitle>
          <CardDescription>Key insights from risk visualization analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-red-600">High-Risk Areas</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Regulatory and Cyber Security categories show the highest concentration of critical risks
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-orange-600">Risk Concentration</h4>
              <p className="text-sm text-muted-foreground mt-1">
                65% of risks fall into the High-Medium probability and High-Medium impact quadrant
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-blue-600">Trend Analysis</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Risk identification rate is increasing, but resolution rate needs improvement
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-green-600">Mitigation Success</h4>
              <p className="text-sm text-muted-foreground mt-1">
                68% average mitigation completion rate across all risk categories
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-purple-600">Priority Focus</h4>
              <p className="text-sm text-muted-foreground mt-1">
                23 risks require immediate attention based on current risk scores
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-yellow-600">Resource Allocation</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Regulatory compliance requires 40% of current risk management resources
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
