
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, DollarSign, Users, Calendar } from "lucide-react";
import { useState } from "react";

export function SpendAnalytics() {
  const [timeRange, setTimeRange] = useState("ytd");

  const spendByCategory = [
    { category: "Litigation", amount: 634000, percentage: 26 },
    { category: "M&A", amount: 423000, percentage: 17 },
    { category: "Regulatory", amount: 267000, percentage: 11 },
    { category: "IP", amount: 198000, percentage: 8 },
    { category: "Employment", amount: 124000, percentage: 5 },
    { category: "Real Estate", amount: 89000, percentage: 4 },
    { category: "Tax", amount: 67000, percentage: 3 },
    { category: "Other", amount: 178000, percentage: 7 }
  ];

  const monthlySpend = [
    { month: "Jan", amount: 185000 },
    { month: "Feb", amount: 210000 },
    { month: "Mar", amount: 245000 },
    { month: "Apr", amount: 198000 },
    { month: "May", amount: 276000 },
    { month: "Jun", amount: 189000 },
    { month: "Jul", amount: 234000 },
    { month: "Aug", amount: 267000 },
    { month: "Sep", amount: 198000 },
    { month: "Oct", amount: 289000 },
    { month: "Nov", amount: 234000 },
    { month: "Dec", amount: 276000 }
  ];

  const topVendorsBySpend = [
    { vendor: "Davis Polk & Wardwell", spend: 324000, matters: 8, avgRate: 750 },
    { vendor: "Clifford Chance", spend: 298000, matters: 12, avgRate: 680 },
    { vendor: "Baker McKenzie", spend: 267000, matters: 15, avgRate: 520 },
    { vendor: "Allen & Overy", spend: 189000, matters: 6, avgRate: 720 },
    { vendor: "Freshfields", spend: 156000, matters: 9, avgRate: 650 }
  ];

  const regionSpend = [
    { region: "North America", amount: 980000, color: "#8884d8" },
    { region: "Europe", amount: 670000, color: "#82ca9d" },
    { region: "Asia Pacific", amount: 340000, color: "#ffc658" },
    { region: "Other", amount: 180000, color: "#ff7300" }
  ];

  const insights = [
    {
      type: "cost_saving",
      title: "Potential Cost Optimization",
      description: "Consider consolidating smaller matters with Baker McKenzie to negotiate better rates",
      impact: "$45K potential savings"
    },
    {
      type: "performance",
      title: "High Performing Vendor",
      description: "Davis Polk consistently delivers above-average performance across all metrics",
      impact: "4.8/5 rating"
    },
    {
      type: "trend",
      title: "Spend Trend Alert",
      description: "M&A spend increased 35% this quarter compared to last quarter",
      impact: "+$156K increase"
    },
    {
      type: "efficiency",
      title: "Vendor Efficiency",
      description: "Allen & Overy has the highest cost per matter ratio in IP category",
      impact: "Review recommended"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Spend Analytics & Insights</h2>
          <p className="text-muted-foreground">Analyze spending patterns and optimize vendor relationships</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ytd">Year to Date</SelectItem>
            <SelectItem value="quarterly">This Quarter</SelectItem>
            <SelectItem value="monthly">This Month</SelectItem>
            <SelectItem value="annual">Annual</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total External Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.4M</div>
            <p className="text-xs text-muted-foreground">+12% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">3 new this quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Cost per Matter</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$18.5K</div>
            <p className="text-xs text-muted-foreground">-5% vs last quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Matters Completed</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">+8% from last quarter</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Spend Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Spend Trend</CardTitle>
            <CardDescription>External legal spend over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlySpend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, 'Spend']} />
                <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Spend by Region */}
        <Card>
          <CardHeader>
            <CardTitle>Spend by Region</CardTitle>
            <CardDescription>Geographic distribution of legal spend</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={regionSpend}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                  label={({ region, amount }) => `${region}: $${(amount / 1000).toFixed(0)}K`}
                >
                  {regionSpend.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, 'Spend']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Spend by Category */}
      <Card>
        <CardHeader>
          <CardTitle>Spend by Legal Category</CardTitle>
          <CardDescription>Breakdown of external spend by practice area</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={spendByCategory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, 'Spend']} />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Vendors */}
      <Card>
        <CardHeader>
          <CardTitle>Top Vendors by Spend</CardTitle>
          <CardDescription>Highest spending external legal providers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topVendorsBySpend.map((vendor, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-lg font-bold text-muted-foreground">#{index + 1}</div>
                  <div>
                    <div className="font-medium">{vendor.vendor}</div>
                    <div className="text-sm text-muted-foreground">
                      {vendor.matters} matters • Avg rate: ${vendor.avgRate}/hr
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${vendor.spend.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">
                    {((vendor.spend / 2400000) * 100).toFixed(1)}% of total
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Insights</CardTitle>
          <CardDescription>Recommendations for optimizing external legal spend</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div key={index} className="flex items-start justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge 
                      variant={
                        insight.type === "cost_saving" ? "default" :
                        insight.type === "performance" ? "secondary" :
                        insight.type === "trend" ? "outline" : "destructive"
                      }
                    >
                      {insight.type.replace('_', ' ').toUpperCase()}
                    </Badge>
                    <span className="font-medium">{insight.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm">{insight.impact}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
