
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Star, TrendingUp, Clock, DollarSign, Award, AlertTriangle } from "lucide-react";

export function PerformanceEvaluation() {
  const [selectedVendor, setSelectedVendor] = useState("davis-polk");
  const [timeRange, setTimeRange] = useState("ytd");

  const vendors = [
    { id: "davis-polk", name: "Davis Polk & Wardwell" },
    { id: "clifford-chance", name: "Clifford Chance" },
    { id: "baker-mckenzie", name: "Baker McKenzie" },
    { id: "allen-overy", name: "Allen & Overy" },
    { id: "freshfields", name: "Freshfields" }
  ];

  const performanceMetrics = [
    {
      metric: "Overall Rating",
      score: 4.8,
      benchmark: 4.5,
      trend: "+0.2",
      status: "excellent"
    },
    {
      metric: "Quality of Work",
      score: 4.9,
      benchmark: 4.4,
      trend: "+0.1",
      status: "excellent"
    },
    {
      metric: "Responsiveness",
      score: 4.7,
      benchmark: 4.3,
      trend: "+0.3",
      status: "good"
    },
    {
      metric: "Cost Effectiveness",
      score: 4.2,
      benchmark: 4.1,
      trend: "-0.1",
      status: "average"
    },
    {
      metric: "Matter Management",
      score: 4.6,
      benchmark: 4.2,
      trend: "+0.2",
      status: "good"
    },
    {
      metric: "Communication",
      score: 4.8,
      benchmark: 4.3,
      trend: "+0.4",
      status: "excellent"
    }
  ];

  const monthlyPerformance = [
    { month: "Jan", rating: 4.5, matters: 12 },
    { month: "Feb", rating: 4.6, matters: 8 },
    { month: "Mar", rating: 4.8, matters: 15 },
    { month: "Apr", rating: 4.7, matters: 10 },
    { month: "May", rating: 4.9, matters: 18 },
    { month: "Jun", rating: 4.8, matters: 14 }
  ];

  const radarData = [
    { metric: "Quality", score: 4.9, benchmark: 4.4 },
    { metric: "Speed", score: 4.7, benchmark: 4.3 },
    { metric: "Cost", score: 4.2, benchmark: 4.1 },
    { metric: "Communication", score: 4.8, benchmark: 4.3 },
    { metric: "Innovation", score: 4.5, benchmark: 4.0 },
    { metric: "Relationship", score: 4.8, benchmark: 4.2 }
  ];

  const recentFeedback = [
    {
      matter: "M&A - TechCorp Acquisition",
      rating: 5,
      feedback: "Exceptional work on due diligence and deal structure. Team was responsive and delivered ahead of schedule.",
      reviewer: "John Smith, Head of M&A",
      date: "2024-03-15"
    },
    {
      matter: "Securities Regulatory Filing",
      rating: 4,
      feedback: "Good technical expertise, but could improve on cost transparency and billing detail.",
      reviewer: "Sarah Johnson, Securities Counsel",
      date: "2024-03-10"
    },
    {
      matter: "Employment Dispute Resolution",
      rating: 5,
      feedback: "Outstanding litigation strategy and client service. Achieved favorable settlement.",
      reviewer: "Michael Brown, Employment Law",
      date: "2024-03-08"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-green-600";
      case "good": return "text-blue-600";
      case "average": return "text-yellow-600";
      case "poor": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "excellent": return "default";
      case "good": return "secondary";
      case "average": return "outline";
      case "poor": return "destructive";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Performance Evaluation</h2>
          <p className="text-muted-foreground">Track and evaluate vendor performance across key metrics</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedVendor} onValueChange={setSelectedVendor}>
            <SelectTrigger className="w-60">
              <SelectValue placeholder="Select Vendor" />
            </SelectTrigger>
            <SelectContent>
              {vendors.map((vendor) => (
                <SelectItem key={vendor.id} value={vendor.id}>
                  {vendor.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ytd">YTD</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-muted-foreground">+0.2 vs last quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Matters Completed</CardTitle>
            <Award className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">8 this quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4h</div>
            <p className="text-xs text-muted-foreground">-30min improvement</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Efficiency</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2/5</div>
            <p className="text-xs text-muted-foreground">Within budget 85%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Current performance vs. benchmark scores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{metric.metric}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusBadge(metric.status)}>
                        {metric.score}/5
                      </Badge>
                      <span className={`text-sm ${getStatusColor(metric.status)}`}>
                        {metric.trend}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Progress value={(metric.score / 5) * 100} className="h-2" />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      vs {metric.benchmark}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Radar */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Radar</CardTitle>
            <CardDescription>Multi-dimensional performance view</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis angle={90} domain={[0, 5]} />
                <Radar 
                  name="Score" 
                  dataKey="score" 
                  stroke="#8884d8" 
                  fill="#8884d8" 
                  fillOpacity={0.3} 
                />
                <Radar 
                  name="Benchmark" 
                  dataKey="benchmark" 
                  stroke="#82ca9d" 
                  fill="#82ca9d" 
                  fillOpacity={0.1} 
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trend</CardTitle>
          <CardDescription>Monthly performance tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="rating" fill="#8884d8" name="Rating" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
          <CardDescription>Latest performance reviews and client feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentFeedback.map((feedback, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{feedback.matter}</h4>
                    <p className="text-sm text-muted-foreground">{feedback.reviewer}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < feedback.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="ml-1 text-sm font-medium">{feedback.rating}/5</span>
                  </div>
                </div>
                <p className="text-sm">{feedback.feedback}</p>
                <div className="text-xs text-muted-foreground mt-2">{feedback.date}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
