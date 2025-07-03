
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Download, FileText, Calendar, DollarSign } from "lucide-react";

const dealStageData = [
  { stage: "Sourced", count: 8, value: 120 },
  { stage: "Under Consideration", count: 5, value: 85 },
  { stage: "Due Diligence", count: 3, value: 165 },
  { stage: "Negotiation", count: 2, value: 130 },
  { stage: "Completed", count: 1, value: 50 }
];

const riskDistribution = [
  { name: "Low Risk", value: 40, color: "#10B981" },
  { name: "Medium Risk", value: 35, color: "#F59E0B" },
  { name: "High Risk", value: 25, color: "#EF4444" }
];

const monthlyMetrics = [
  { metric: "New Deals Sourced", current: 12, previous: 8, change: "+50%" },
  { metric: "Deals Completed", current: 3, previous: 2, change: "+50%" },
  { metric: "Average Deal Size", current: "$45M", previous: "$38M", change: "+18%" },
  { metric: "Time to Close", current: "4.2 months", previous: "5.1 months", change: "-18%" }
];

const upcomingMilestones = [
  {
    deal: "TechCorp Acquisition",
    milestone: "Due Diligence Complete",
    date: "2024-01-25",
    owner: "Sarah Johnson",
    status: "On Track"
  },
  {
    deal: "Healthcare Holdings",
    milestone: "Management Presentation",
    date: "2024-01-30",
    owner: "Michael Chen",
    status: "At Risk"
  },
  {
    deal: "Manufacturing Co",
    milestone: "Final Offer Submission",
    date: "2024-02-05",
    owner: "Emily Rodriguez",
    status: "On Track"
  }
];

export function DealflowReporting() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {monthlyMetrics.map((metric) => (
          <Card key={metric.metric}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.current}</div>
              <p className="text-xs text-muted-foreground">
                {metric.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Deal Pipeline by Stage</CardTitle>
            <CardDescription>
              Number of deals and total value by pipeline stage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dealStageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Distribution</CardTitle>
            <CardDescription>
              Overall risk assessment across active deals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Milestones</CardTitle>
          <CardDescription>
            Key dates and deliverables across active deals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingMilestones.map((milestone, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium">{milestone.deal}</h4>
                    <Badge variant={milestone.status === "On Track" ? "default" : "destructive"}>
                      {milestone.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {milestone.milestone}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {milestone.date}
                    </div>
                    <span>Owner: {milestone.owner}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Report Generation</CardTitle>
          <CardDescription>
            Generate comprehensive reports for stakeholders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Pipeline Summary</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Overview of all deals by stage and status
              </p>
              <Button size="sm" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Risk Assessment</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Detailed risk analysis and mitigation plans
              </p>
              <Button size="sm" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Due Diligence Summary</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Progress and findings from diligence activities
              </p>
              <Button size="sm" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export All Data
        </Button>
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Reports
        </Button>
        <Button variant="outline">
          <DollarSign className="h-4 w-4 mr-2" />
          Financial Summary
        </Button>
      </div>
    </div>
  );
}
