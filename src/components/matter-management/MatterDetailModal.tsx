
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Clock, 
  Calendar, 
  DollarSign, 
  FileText, 
  MessageSquare,
  CheckSquare,
  AlertTriangle,
  TrendingUp
} from "lucide-react";

interface MatterDetailModalProps {
  matter: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MatterDetailModal({ matter, open, onOpenChange }: MatterDetailModalProps) {
  if (!matter) return null;

  const activities = [
    {
      id: 1,
      type: "status_change",
      description: "Matter status changed to In Progress",
      user: "Sarah Chen",
      timestamp: "2024-02-12 10:30 AM"
    },
    {
      id: 2,
      type: "comment",
      description: "Added initial review comments",
      user: "David Park",
      timestamp: "2024-02-11 3:45 PM"
    },
    {
      id: 3,
      type: "assignment",
      description: "Matter assigned to Legal Team",
      user: "System",
      timestamp: "2024-02-10 9:15 AM"
    }
  ];

  const tasks = [
    {
      id: 1,
      title: "Review contract terms",
      status: "Completed",
      assignee: "Sarah Chen",
      dueDate: "2024-02-15"
    },
    {
      id: 2,
      title: "Legal risk assessment",
      status: "In Progress",
      assignee: "David Park",
      dueDate: "2024-02-18"
    },
    {
      id: 3,
      title: "Stakeholder review",
      status: "Pending",
      assignee: "Emily Rodriguez",
      dueDate: "2024-02-20"
    }
  ];

  const documents = [
    {
      id: 1,
      name: "Vendor Agreement Draft v1.0.pdf",
      size: "2.3 MB",
      uploadedBy: "Sarah Chen",
      uploadedAt: "2024-02-12 10:30 AM"
    },
    {
      id: 2,
      name: "Legal Review Checklist.docx",
      size: "156 KB",
      uploadedBy: "David Park",
      uploadedAt: "2024-02-11 3:45 PM"
    }
  ];

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
      case "Completed": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "On Hold": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl">{matter.title}</DialogTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getPriorityColor(matter.priority)}>
                  {matter.priority} Priority
                </Badge>
                <Badge className={getStatusColor(matter.status)}>
                  {matter.status}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {matter.id}
                </span>
              </div>
            </div>
            <Button variant="outline">
              Edit Matter
            </Button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Matter Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Assigned to</div>
                      <div className="font-medium">{matter.owner}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Due Date</div>
                      <div className="font-medium">{matter.dueDate}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Created</div>
                      <div className="font-medium">{matter.createdDate}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Type</div>
                      <div className="font-medium">{matter.type}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Progress Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Overall Progress</span>
                      <span>65%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Completed Tasks</span>
                      <span className="text-sm font-medium">3 of 5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Days Remaining</span>
                      <span className="text-sm font-medium">8 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Budget Used</span>
                      <span className="text-sm font-medium">$12,500</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Comprehensive review of vendor agreement with TechCorp including terms analysis, 
                  risk assessment, and compliance verification. The matter involves multiple 
                  stakeholders and requires coordination with procurement and finance teams.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Matter Tasks</h3>
              <Button size="sm">
                <CheckSquare className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
            
            <div className="space-y-3">
              {tasks.map((task) => (
                <Card key={task.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{task.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span>Assigned: {task.assignee}</span>
                          <span>Due: {task.dueDate}</span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Matter Documents</h3>
              <Button size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </div>
            
            <div className="space-y-3">
              {documents.map((doc) => (
                <Card key={doc.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-blue-600" />
                        <div>
                          <h4 className="font-medium">{doc.name}</h4>
                          <div className="text-sm text-muted-foreground">
                            {doc.size} • Uploaded by {doc.uploadedBy} on {doc.uploadedAt}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <h3 className="text-lg font-medium">Activity Timeline</h3>
            
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.description}</p>
                    <div className="text-xs text-muted-foreground mt-1">
                      {activity.user} • {activity.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">28.5h</div>
                  <p className="text-xs text-muted-foreground">
                    65% of estimated time
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Budget Used</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$12,500</div>
                  <p className="text-xs text-muted-foreground">
                    62% of allocated budget
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">Medium</div>
                  <p className="text-xs text-muted-foreground">
                    2 risk factors identified
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
