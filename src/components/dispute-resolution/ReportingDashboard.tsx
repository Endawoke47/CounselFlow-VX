
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  Download, 
  FileText, 
  TrendingUp, 
  Clock, 
  DollarSign,
  Calendar,
  Filter
} from "lucide-react";

export function ReportingDashboard() {
  const [timeRange, setTimeRange] = useState("last-quarter");
  const [entityFilter, setEntityFilter] = useState("all");

  const monthlyData = [
    { month: "Jan", disputes: 8, resolved: 3, exposure: 1200000 },
    { month: "Feb", disputes: 12, resolved: 5, exposure: 1800000 },
    { month: "Mar", disputes: 6, resolved: 8, exposure: 950000 },
    { month: "Apr", disputes: 15, resolved: 4, exposure: 2100000 },
    { month: "May", disputes: 9, resolved: 11, exposure: 1300000 },
    { month: "Jun", disputes: 11, resolved: 7, exposure: 1650000 }
  ];

  const exposureByEntity = [
    { name: "Tech Corp Ltd", value: 1200000, color: "#8884d8" },
    { name: "Tech Corp UK", value: 800000, color: "#82ca9d" },
    { name: "Innovation Labs", value: 950000, color: "#ffc658" },
    { name: "Real Estate Holdings", value: 500000, color: "#ff7300" }
  ];

  const resolutionTimes = [
    { caseType: "Contract", avgDays: 42, cases: 8 },
    { caseType: "Employment", avgDays: 28, cases: 5 },
    { caseType: "IP", avgDays: 67, cases: 3 },
    { caseType: "Commercial", avgDays: 51, cases: 6 },
    { caseType: "Regulatory", avgDays: 35, cases: 4 }
  ];

  const topDisputes = [
    {
      id: "DIS-003",
      title: "IP Infringement Claim",
      entity: "Innovation Labs",
      exposure: "$800,000",
      status: "Escalated",
      daysOpen: 45,
      counsel: "Wilson & Associates"
    },
    {
      id: "DIS-001",
      title: "Contract Breach - Supplier XYZ",
      entity: "Tech Corp Ltd",
      exposure: "$450,000",
      status: "In Review",
      daysOpen: 32,
      counsel: "Internal Legal"
    },
    {
      id: "DIS-005",
      title: "Lease Dispute - Office Space",
      entity: "Real Estate Holdings",
      exposure: "$350,000",
      status: "Negotiation",
      daysOpen: 28,
      counsel: "Property Law Firm"
    }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Dispute Resolution Reports</h2>
          <p className="text-muted-foreground">Executive reporting and analytics</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="last-quarter">Last Quarter</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Select value={entityFilter} onValueChange={setEntityFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Entities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Entities</SelectItem>
              <SelectItem value="tech-corp">Tech Corp Ltd</SelectItem>
              <SelectItem value="tech-uk">Tech Corp UK</SelectItem>
              <SelectItem value="innovation">Innovation Labs</SelectItem>
              <SelectItem value="real-estate">Real Estate Holdings</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="exposure">Financial Exposure</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Dispute Activity</CardTitle>
                <CardDescription>New disputes vs. resolved disputes</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="disputes" fill="#8884d8" name="New Disputes" />
                    <Bar dataKey="resolved" fill="#82ca9d" name="Resolved" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Exposure by Entity</CardTitle>
                <CardDescription>Distribution of dispute exposure</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={exposureByEntity}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {exposureByEntity.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>High-Value Disputes</CardTitle>
              <CardDescription>Top disputes by financial exposure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topDisputes.map((dispute) => (
                  <div key={dispute.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium">{dispute.title}</h4>
                        <Badge variant="outline">{dispute.status}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{dispute.entity}</span>
                        <span>Counsel: {dispute.counsel}</span>
                        <span>{dispute.daysOpen} days open</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">{dispute.exposure}</div>
                      <div className="text-sm text-muted-foreground">{dispute.id}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dispute Volume Trends</CardTitle>
              <CardDescription>Historical dispute activity over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="disputes" stroke="#8884d8" name="New Disputes" />
                  <Line type="monotone" dataKey="resolved" stroke="#82ca9d" name="Resolved" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exposure" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Exposure Trends</CardTitle>
              <CardDescription>Monthly exposure amounts</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => formatCurrency(value)} />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Bar dataKey="exposure" fill="#8884d8" name="Financial Exposure" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resolution Time by Case Type</CardTitle>
              <CardDescription>Average days to resolution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={resolutionTimes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="caseType" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="avgDays" fill="#8884d8" name="Avg Days to Resolution" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
