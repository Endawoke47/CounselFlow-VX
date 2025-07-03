
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Users, 
  Clock, 
  Target, 
  TrendingUp,
  User,
  Calendar,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

export function AssignmentDashboard() {
  const teamMetrics = [
    {
      title: "Total Team Members",
      value: "8",
      change: "+1 this month",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Active Assignments",
      value: "47",
      change: "+8 this week",
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Overdue Tasks",
      value: "5",
      change: "2 critical",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "Completion Rate",
      value: "94%",
      change: "+3% this month",
      icon: CheckCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Senior Legal Counsel",
      activeMatters: 8,
      capacity: 85,
      completedThisMonth: 12,
      avgResolutionTime: "3.2 days",
      specialties: ["Contract Law", "Corporate"],
      availability: "Available"
    },
    {
      id: 2,
      name: "David Park",
      role: "Legal Counsel",
      activeMatters: 6,
      capacity: 72,
      completedThisMonth: 9,
      avgResolutionTime: "4.1 days",
      specialties: ["Employment Law", "IP"],
      availability: "Busy"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Legal Associate",
      activeMatters: 5,
      capacity: 68,
      completedThisMonth: 8,
      avgResolutionTime: "2.8 days",
      specialties: ["Compliance", "Regulatory"],
      availability: "Available"
    },
    {
      id: 4,
      name: "Michael Johnson",
      role: "Senior Legal Counsel",
      activeMatters: 7,
      capacity: 78,
      completedThisMonth: 11,
      avgResolutionTime: "3.5 days",
      specialties: ["Litigation", "Disputes"],
      availability: "On Leave"
    }
  ];

  const recentAssignments = [
    {
      id: "MAT-2024-015",
      title: "Vendor Agreement Review - TechCorp",
      assignee: "Sarah Chen",
      assignedDate: "2024-02-12",
      dueDate: "2024-02-20",
      priority: "High",
      status: "In Progress"
    },
    {
      id: "MAT-2024-016",
      title: "Employment Policy Update",
      assignee: "David Park",
      assignedDate: "2024-02-11",
      dueDate: "2024-02-25",
      priority: "Medium",
      status: "Not Started"
    },
    {
      id: "MAT-2024-017",
      title: "Compliance Audit Preparation",
      assignee: "Emily Rodriguez",
      assignedDate: "2024-02-10",
      dueDate: "2024-02-18",
      priority: "High",
      status: "In Progress"
    }
  ];

  const getCapacityColor = (capacity: number) => {
    if (capacity >= 90) return "text-red-600";
    if (capacity >= 75) return "text-orange-600";
    if (capacity >= 50) return "text-yellow-600";
    return "text-green-600";
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Available": return "bg-green-100 text-green-800";
      case "Busy": return "bg-yellow-100 text-yellow-800";
      case "On Leave": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Not Started": return "bg-gray-100 text-gray-800";
      case "Completed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Team Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {teamMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${metric.bgColor}`}>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{metric.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Team Workload */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Workload & Capacity
            </CardTitle>
            <Button variant="outline">
              <Target className="h-4 w-4 mr-2" />
              Rebalance Workload
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <Badge className={getAvailabilityColor(member.availability)}>
                    {member.availability}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Active Matters</div>
                    <div className="text-lg font-bold">{member.activeMatters}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Capacity</div>
                    <div className={`text-lg font-bold ${getCapacityColor(member.capacity)}`}>
                      {member.capacity}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Completed This Month</div>
                    <div className="text-lg font-bold">{member.completedThisMonth}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Avg Resolution Time</div>
                    <div className="text-lg font-bold">{member.avgResolutionTime}</div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Workload Capacity</span>
                    <span>{member.capacity}%</span>
                  </div>
                  <Progress value={member.capacity} className="h-2" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">Specialties</div>
                    <div className="flex gap-1 mt-1">
                      {member.specialties.map((specialty) => (
                        <Badge key={specialty} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Assign Matter
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Assignments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Assignments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Matter</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Assigned Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentAssignments.map((assignment) => (
                <TableRow key={assignment.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{assignment.title}</div>
                      <div className="text-sm text-muted-foreground">{assignment.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>{assignment.assignee}</TableCell>
                  <TableCell>{assignment.assignedDate}</TableCell>
                  <TableCell>{assignment.dueDate}</TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(assignment.priority)}>
                      {assignment.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(assignment.status)}>
                      {assignment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Reassign
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
