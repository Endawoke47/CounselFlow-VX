
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, Calendar, Flag } from "lucide-react";

export function TaskManagement() {
  const tasks = [
    {
      id: 1,
      task: "Review contract renewal terms",
      contract: "Software License Agreement",
      assignee: "Sarah Johnson",
      dueDate: "2024-07-15",
      status: "In Progress",
      priority: "High"
    },
    {
      id: 2,
      task: "Negotiate pricing for next term",
      contract: "Master Service Agreement",
      assignee: "Mike Chen",
      dueDate: "2024-07-10",
      status: "Pending",
      priority: "Medium"
    },
    {
      id: 3,
      task: "Legal review of amendments",
      contract: "Property Lease",
      assignee: "Legal Team",
      dueDate: "2024-07-20",
      status: "Completed",
      priority: "Low"
    },
    {
      id: 4,
      task: "Update vendor information",
      contract: "Vendor Agreement",
      assignee: "David Kim",
      dueDate: "2024-07-08",
      status: "Overdue",
      priority: "High"
    },
    {
      id: 5,
      task: "Schedule renewal meeting",
      contract: "Employment Contract",
      assignee: "HR Team",
      dueDate: "2024-07-25",
      status: "Pending",
      priority: "Medium"
    }
  ];

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Completed":
        return "default";
      case "In Progress":
        return "secondary";
      case "Overdue":
        return "destructive";
      case "Pending":
        return "outline";
      default:
        return "outline";
    }
  };

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case "High":
        return "destructive";
      case "Medium":
        return "secondary";
      case "Low":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Task Management</h2>
          <p className="text-muted-foreground">Track and manage contract-related tasks</p>
        </div>
        <Button>
          Add New Task
        </Button>
      </div>

      {/* Task Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground">Total Tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Overdue</p>
          </CardContent>
        </Card>
      </div>

      {/* Task Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">All Tasks</Button>
            <Button variant="outline" size="sm">My Tasks</Button>
            <Button variant="outline" size="sm">Team Tasks</Button>
            <Button variant="outline" size="sm">Overdue</Button>
            <Button variant="outline" size="sm">High Priority</Button>
          </div>
        </CardContent>
      </Card>

      {/* Tasks Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Tasks</CardTitle>
          <CardDescription>
            Contract-related tasks and assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Contract</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.task}</TableCell>
                  <TableCell>{task.contract}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {task.assignee}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {task.dueDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(task.status)}>
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPriorityBadgeVariant(task.priority)}>
                      <Flag className="h-3 w-3 mr-1" />
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Update
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
