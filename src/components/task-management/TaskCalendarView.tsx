
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, AlertTriangle } from "lucide-react";

export function TaskCalendarView() {
  const upcomingTasks = [
    {
      date: "2024-01-20",
      tasks: [
        {
          id: "TASK-002",
          title: "File patent opposition response",
          module: "IP Management",
          assignee: "David Park",
          priority: "Critical",
          overdue: true,
          time: "EOD"
        }
      ]
    },
    {
      date: "2024-01-22",
      tasks: [
        {
          id: "TASK-006",
          title: "Submit regulatory filing",
          module: "Compliance",
          assignee: "Emily Rodriguez",
          priority: "High",
          overdue: false,
          time: "5:00 PM"
        }
      ]
    },
    {
      date: "2024-01-25",
      tasks: [
        {
          id: "TASK-001",
          title: "Review supplier contract renewal",
          module: "Contracts",
          assignee: "Sarah Chen",
          priority: "High",
          overdue: false,
          time: "EOD"
        },
        {
          id: "TASK-007",
          title: "Conduct IP portfolio review",
          module: "IP Management",
          assignee: "David Park",
          priority: "Medium",
          overdue: false,
          time: "2:00 PM"
        }
      ]
    },
    {
      date: "2024-01-28",
      tasks: [
        {
          id: "TASK-005",
          title: "Review litigation settlement proposal",
          module: "Disputes",
          assignee: "Lisa Wang",
          priority: "High",
          overdue: false,
          time: "11:00 AM"
        }
      ]
    },
    {
      date: "2024-01-30",
      tasks: [
        {
          id: "TASK-004",
          title: "Prepare board resolution for AGM",
          module: "Company Secretarial",
          assignee: "Michael Kim",
          priority: "High",
          overdue: false,
          time: "EOD"
        }
      ]
    }
  ];

  const getPriorityColor = (priority: string) => {
    const colors = {
      "Critical": "border-l-red-500 bg-red-50",
      "High": "border-l-orange-500 bg-orange-50",
      "Medium": "border-l-yellow-500 bg-yellow-50",
      "Low": "border-l-green-500 bg-green-50"
    };
    return colors[priority as keyof typeof colors] || "border-l-gray-500 bg-gray-50";
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const isToday = (dateString: string) => {
    const today = new Date().toDateString();
    const taskDate = new Date(dateString).toDateString();
    return today === taskDate;
  };

  const isPast = (dateString: string) => {
    const today = new Date();
    const taskDate = new Date(dateString);
    return taskDate < today;
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Tasks by Due Date
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Task Groups by Date */}
      <div className="space-y-4">
        {upcomingTasks.map((group) => (
          <Card key={group.date} className={isPast(group.date) ? "border-red-200" : ""}>
            <CardHeader className={`pb-3 ${isToday(group.date) ? 'bg-blue-50' : isPast(group.date) ? 'bg-red-50' : ''}`}>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(group.date)}
                  {isToday(group.date) && (
                    <Badge variant="default" className="ml-2">Today</Badge>
                  )}
                  {isPast(group.date) && (
                    <Badge variant="destructive" className="ml-2">Overdue</Badge>
                  )}
                </h3>
                <Badge variant="outline">
                  {group.tasks.length} task{group.tasks.length !== 1 ? 's' : ''}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {group.tasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`p-4 rounded-lg border-l-4 ${getPriorityColor(task.priority)} ${task.overdue || isPast(group.date) ? 'bg-red-50' : ''}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {(task.overdue || isPast(group.date)) && (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                        <h4 className="font-medium">{task.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{task.id}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {task.time}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={getModuleColor(task.module)} variant="secondary">
                        {task.module}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Assigned to: {task.assignee}
                      </span>
                    </div>
                    <Badge 
                      variant={task.priority === "Critical" ? "destructive" : "outline"}
                      className="text-xs"
                    >
                      {task.priority} Priority
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
