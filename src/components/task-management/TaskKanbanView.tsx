
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, AlertTriangle, Clock, CheckCircle, Circle } from "lucide-react";

export function TaskKanbanView() {
  const columns = [
    {
      id: "not-started",
      title: "Not Started",
      icon: Circle,
      color: "text-gray-500",
      bgColor: "bg-gray-50",
      tasks: [
        {
          id: "TASK-002",
          title: "File patent opposition response",
          module: "IP Management",
          assignee: "David Park",
          priority: "Critical",
          dueDate: "2024-01-20",
          overdue: true
        }
      ]
    },
    {
      id: "in-progress",
      title: "In Progress",
      icon: Clock,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      tasks: [
        {
          id: "TASK-001",
          title: "Review supplier contract renewal",
          module: "Contracts",
          assignee: "Sarah Chen",
          priority: "High",
          dueDate: "2024-01-25",
          overdue: false
        },
        {
          id: "TASK-004",
          title: "Prepare board resolution for AGM",
          module: "Company Secretarial",
          assignee: "Michael Kim",
          priority: "High",
          dueDate: "2024-01-30",
          overdue: false
        }
      ]
    },
    {
      id: "blocked",
      title: "Blocked",
      icon: AlertTriangle,
      color: "text-red-500",
      bgColor: "bg-red-50",
      tasks: [
        {
          id: "TASK-005",
          title: "Review litigation settlement proposal",
          module: "Disputes",
          assignee: "Lisa Wang",
          priority: "High",
          dueDate: "2024-01-28",
          overdue: false
        }
      ]
    },
    {
      id: "completed",
      title: "Completed",
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-50",
      tasks: [
        {
          id: "TASK-003",
          title: "Complete GDPR compliance audit",
          module: "Compliance",
          assignee: "Emily Rodriguez",
          priority: "Medium",
          dueDate: "2024-01-15",
          overdue: false
        }
      ]
    }
  ];

  const getPriorityColor = (priority: string) => {
    const colors = {
      "Critical": "border-l-red-500",
      "High": "border-l-orange-500",
      "Medium": "border-l-yellow-500",
      "Low": "border-l-green-500"
    };
    return colors[priority as keyof typeof colors] || "border-l-gray-500";
  };

  const getModuleColor = (module: string) => {
    const colors = {
      "Contracts": "bg-purple-100 text-purple-800",
      "IP Management": "bg-indigo-100 text-indigo-800",
      "Compliance": "bg-cyan-100 text-cyan-800",
      "Company Secretarial": "bg-teal-100 text-teal-800",
      "Disputes": "bg-pink-100 text-pink-800"
    };
    return colors[module as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {columns.map((column) => (
        <div key={column.id} className="space-y-4">
          <div className={`p-4 rounded-lg ${column.bgColor}`}>
            <div className="flex items-center gap-2 mb-2">
              <column.icon className={`h-5 w-5 ${column.color}`} />
              <h3 className="font-semibold">{column.title}</h3>
              <Badge variant="outline" className="ml-auto">
                {column.tasks.length}
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            {column.tasks.map((task) => (
              <Card 
                key={task.id} 
                className={`cursor-pointer hover:shadow-md transition-shadow border-l-4 ${getPriorityColor(task.priority)} ${task.overdue ? 'bg-red-50' : ''}`}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-sm leading-tight">
                        {task.title}
                      </h4>
                      {task.overdue && (
                        <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0 ml-2" />
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge className={getModuleColor(task.module)} variant="secondary">
                        {task.module}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {task.priority}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {getInitials(task.assignee)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">
                          {task.assignee}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {task.dueDate}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
