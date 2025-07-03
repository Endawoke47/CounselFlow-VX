
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Scale, 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Users,
  FileText,
  CheckCircle
} from "lucide-react";

export function DisputesOverview() {
  const stats = {
    totalDisputes: 24,
    activeDisputes: 18,
    resolved: 6,
    totalExposure: 2750000,
    avgResolutionTime: 45,
    criticalDisputes: 3
  };

  const recentDisputes = [
    {
      id: "DIS-001",
      title: "Contract Breach - Supplier XYZ",
      status: "In Review",
      priority: "High",
      exposure: "$450,000",
      deadline: "2024-02-15"
    },
    {
      id: "DIS-002", 
      title: "Employment Dispute",
      status: "Negotiation",
      priority: "Medium",
      exposure: "$125,000",
      deadline: "2024-03-01"
    },
    {
      id: "DIS-003",
      title: "IP Infringement Claim",
      status: "Escalated",
      priority: "Critical",
      exposure: "$800,000",
      deadline: "2024-01-30"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Review": return "bg-yellow-100 text-yellow-800";
      case "Negotiation": return "bg-orange-100 text-orange-800";
      case "Escalated": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Disputes</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDisputes}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span className="text-green-600 mr-1">+2</span>
              from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Disputes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeDisputes}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span className="text-red-600 mr-1">{stats.criticalDisputes}</span>
              critical priority
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Exposure</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(stats.totalExposure / 1000000).toFixed(1)}M
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1" />
              15% from last quarter
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Resolution</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgResolutionTime}d</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span className="text-green-600 mr-1">-5d</span>
              improvement
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Dispute Status Distribution</CardTitle>
            <CardDescription>Current status of all active disputes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Open</span>
                <div className="flex items-center gap-2">
                  <Progress value={25} className="w-20 h-2" />
                  <span className="text-sm font-medium">6</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">In Review</span>
                <div className="flex items-center gap-2">
                  <Progress value={35} className="w-20 h-2" />
                  <span className="text-sm font-medium">8</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Negotiation</span>
                <div className="flex items-center gap-2">
                  <Progress value={20} className="w-20 h-2" />
                  <span className="text-sm font-medium">5</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Escalated</span>
                <div className="flex items-center gap-2">
                  <Progress value={15} className="w-20 h-2" />
                  <span className="text-sm font-medium">3</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Priority Breakdown</CardTitle>
            <CardDescription>Disputes by priority level</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">3</div>
                <div className="text-sm text-red-800">Critical</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">8</div>
                <div className="text-sm text-orange-800">High</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">10</div>
                <div className="text-sm text-yellow-800">Medium</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">3</div>
                <div className="text-sm text-green-800">Low</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Disputes */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Disputes</CardTitle>
              <CardDescription>Latest disputes requiring attention</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentDisputes.map((dispute) => (
              <div key={dispute.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium">{dispute.title}</h4>
                    <Badge className={getStatusColor(dispute.status)}>
                      {dispute.status}
                    </Badge>
                    <Badge className={getPriorityColor(dispute.priority)}>
                      {dispute.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{dispute.id}</span>
                    <span>Exposure: {dispute.exposure}</span>
                    <span>Deadline: {dispute.deadline}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
