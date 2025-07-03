
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, CheckCircle, Clock, AlertTriangle, User } from "lucide-react";

export function ComplianceActions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [functionFilter, setFunctionFilter] = useState("all");

  const stats = [
    {
      title: "Total Actions",
      value: "42",
      change: "+8 this week",
      icon: CheckCircle,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "In Progress",
      value: "18",
      change: "43% of total",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Overdue",
      value: "5",
      change: "Immediate attention",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "Completed",
      value: "19",
      change: "45% complete",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50"
    }
  ];

  const actions = [
    {
      id: 1,
      title: "Update data processing agreements",
      update: "EU AI Act Implementation Guidelines",
      function: "Data Processing",
      jurisdiction: "European Union",
      owner: "Sarah Johnson",
      dueDate: "2024-07-15",
      status: "In Progress",
      priority: "High"
    },
    {
      id: 2,
      title: "Conduct privacy impact assessment",
      update: "Data Protection Amendment Act 2024",
      function: "Compliance",
      jurisdiction: "United Kingdom",
      owner: "Michael Chen",
      dueDate: "2024-07-30",
      status: "Not Started",
      priority: "Medium"
    },
    {
      id: 3,
      title: "Review customer service protocols",
      update: "Thompson v. TechCorp Data Breach Ruling",
      function: "Customer Service",
      jurisdiction: "United States",
      owner: "Emma Wilson",
      dueDate: "2024-06-30",
      status: "Overdue",
      priority: "High"
    },
    {
      id: 4,
      title: "Update privacy policies",
      update: "EU AI Act Implementation Guidelines",
      function: "Legal",
      jurisdiction: "European Union",
      owner: "David Lee",
      dueDate: "2024-08-15",
      status: "Completed",
      priority: "Medium"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "In Progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "Not Started":
        return <Badge variant="outline">Not Started</Badge>;
      case "Overdue":
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case "Low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Compliance Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>Compliance Actions Tracker</CardTitle>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Action
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search compliance actions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="not-started">Not Started</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Select value={functionFilter} onValueChange={setFunctionFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by function" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Functions</SelectItem>
                <SelectItem value="legal">Legal</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="data-processing">Data Processing</SelectItem>
                <SelectItem value="customer-service">Customer Service</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Actions Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Related Update</TableHead>
                <TableHead>Function</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {actions.map((action) => (
                <TableRow key={action.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{action.title}</TableCell>
                  <TableCell className="text-sm">{action.update}</TableCell>
                  <TableCell>{action.function}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {action.owner}
                    </div>
                  </TableCell>
                  <TableCell>{action.dueDate}</TableCell>
                  <TableCell>{getPriorityBadge(action.priority)}</TableCell>
                  <TableCell>{getStatusBadge(action.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
