import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, AlertTriangle, Clock, CheckCircle, User, Calendar, Link } from "lucide-react";
import { RelationshipsPanel } from "@/components/ui/relationships-panel";
import { RelatedItem } from "@/services/relationshipService";
import { CentralDataService } from "@/services/centralDataService";

interface TaskListViewProps {
  onRelatedItemClick?: (item: RelatedItem) => void;
}

export function TaskListView({ onRelatedItemClick }: TaskListViewProps = {}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [showRelationships, setShowRelationships] = useState(false);

  const centralTasks = CentralDataService.getTasks();
  
  // Transform central data to match component interface
  const tasks = centralTasks.map(task => ({
    id: task.id.toUpperCase(),
    title: task.title,
    module: task.type,
    assignee: CentralDataService.getPersonById(task.assigneeId)?.fullName || 'Unassigned',
    priority: task.priority,
    status: task.status,
    dueDate: task.dueDate.toLocaleDateString(),
    entity: CentralDataService.getEntityById(task.entityId)?.name || 'Unknown Entity',
    description: task.description,
    overdue: task.dueDate < new Date() && task.status !== 'Completed'
  }));

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "In Progress": return <Clock className="h-4 w-4 text-blue-500" />;
      case "Blocked": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      "Not Started": "bg-gray-100 text-gray-800",
      "In Progress": "bg-blue-100 text-blue-800",
      "Completed": "bg-green-100 text-green-800",
      "Blocked": "bg-red-100 text-red-800"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      "Critical": "bg-red-100 text-red-800",
      "High": "bg-orange-100 text-orange-800",
      "Medium": "bg-yellow-100 text-yellow-800",
      "Low": "bg-green-100 text-green-800"
    };
    return colors[priority as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getModuleBadge = (module: string) => {
    const colors = {
      "Contracts": "bg-purple-100 text-purple-800",
      "IP Management": "bg-indigo-100 text-indigo-800",
      "Compliance": "bg-cyan-100 text-cyan-800",
      "Company Secretarial": "bg-teal-100 text-teal-800",
      "Disputes": "bg-pink-100 text-pink-800"
    };
    return colors[module as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-bold">47</p>
              </div>
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold text-red-600">8</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">23</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-green-600">16</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              All Tasks
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id} className={task.overdue ? "bg-red-50" : ""}>
                  <TableCell>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {task.overdue && <AlertTriangle className="h-4 w-4 text-red-500" />}
                        {task.title}
                      </div>
                      <div className="text-sm text-muted-foreground">{task.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getModuleBadge(task.module)}>
                      {task.module}
                    </Badge>
                  </TableCell>
                  <TableCell>{task.assignee}</TableCell>
                  <TableCell>
                    <Badge className={getPriorityBadge(task.priority)}>
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(task.status)}
                      <Badge className={getStatusBadge(task.status)}>
                        {task.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {task.dueDate}
                    </div>
                  </TableCell>
                  <TableCell>{task.entity}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTask(task);
                          setShowRelationships(true);
                        }}
                        title="View Related Items"
                      >
                        <Link className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Relationships Panel */}
      {showRelationships && selectedTask && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Related Items</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowRelationships(false)}
            >
              Close
            </Button>
          </div>
          <RelationshipsPanel
            itemId={selectedTask.id.toLowerCase().replace('task-', 'task-')}
            itemType="tasks"
            itemTitle={selectedTask.title}
            onItemClick={onRelatedItemClick}
          />
        </div>
      )}
    </div>
  );
}
