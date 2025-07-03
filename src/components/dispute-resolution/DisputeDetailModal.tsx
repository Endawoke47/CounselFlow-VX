import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Edit, 
  Clock, 
  Users, 
  FileText, 
  MessageCircle, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  DollarSign,
  Plus
} from "lucide-react";

interface DisputeDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  disputeId: string | null;
}

export function DisputeDetailModal({ open, onOpenChange, disputeId }: DisputeDetailModalProps) {
  // Mock dispute data - in real app this would come from API
  const dispute = {
    id: "DIS-001",
    title: "Contract Breach - Supplier XYZ",
    entity: "Tech Corp Ltd",
    counterparty: "XYZ Supplies Inc",
    status: "In Review",
    priority: "High",
    owner: "Sarah Johnson",
    externalCounsel: "Wilson & Associates",
    jurisdiction: "United States",
    caseType: "Contract Dispute",
    exposure: "$450,000",
    provisioned: true,
    initiated: "2024-01-15",
    deadline: "2024-02-15",
    currentStage: 2,
    description: "Dispute arising from alleged breach of supply contract terms and delivery delays."
  };

  const stages = [
    { name: "Logged", completed: true },
    { name: "In Review", completed: true },
    { name: "Negotiation", completed: false },
    { name: "Resolved", completed: false },
    { name: "Closed", completed: false }
  ];

  const milestones = [
    {
      date: "2024-01-15",
      event: "Dispute logged",
      description: "Initial dispute record created",
      type: "created"
    },
    {
      date: "2024-01-16",
      event: "Legal review initiated",
      description: "Assigned to Sarah Johnson for initial assessment",
      type: "assignment"
    },
    {
      date: "2024-01-18",
      event: "External counsel engaged",
      description: "Wilson & Associates retained for representation",
      type: "counsel"
    }
  ];

  const tasks = [
    {
      id: 1,
      title: "Review contract terms",
      assignee: "Sarah Johnson",
      dueDate: "2024-01-25",
      status: "completed",
      priority: "High"
    },
    {
      id: 2,
      title: "Prepare initial response",
      assignee: "Wilson & Associates",
      dueDate: "2024-01-30",
      status: "in-progress",
      priority: "High"
    },
    {
      id: 3,
      title: "Gather supporting documents",
      assignee: "Mike Chen",
      dueDate: "2024-02-01",
      status: "pending",
      priority: "Medium"
    }
  ];

  const collaborators = [
    { name: "Sarah Johnson", role: "Internal Owner", type: "internal" },
    { name: "Wilson & Associates", role: "External Counsel", type: "external" },
    { name: "Mike Chen", role: "Document Manager", type: "internal" }
  ];

  const documents = [
    { name: "Original Supply Contract.pdf", type: "Contract", uploadedBy: "Sarah Johnson", date: "2024-01-15" },
    { name: "Delivery Records.xlsx", type: "Evidence", uploadedBy: "Mike Chen", date: "2024-01-16" },
    { name: "Legal Memo - Initial Assessment.docx", type: "Memo", uploadedBy: "Wilson & Associates", date: "2024-01-18" }
  ];

  if (!open || !disputeId) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl">{dispute.title}</DialogTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge>{dispute.status}</Badge>
                <Badge variant="outline">{dispute.priority}</Badge>
                <Badge variant="secondary">{dispute.entity}</Badge>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="collaborators">Team</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Dispute Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <Label className="font-medium">Counterparty</Label>
                      <p>{dispute.counterparty}</p>
                    </div>
                    <div>
                      <Label className="font-medium">Jurisdiction</Label>
                      <p>{dispute.jurisdiction}</p>
                    </div>
                    <div>
                      <Label className="font-medium">Case Type</Label>
                      <p>{dispute.caseType}</p>
                    </div>
                    <div>
                      <Label className="font-medium">Internal Owner</Label>
                      <p>{dispute.owner}</p>
                    </div>
                    <div>
                      <Label className="font-medium">External Counsel</Label>
                      <p>{dispute.externalCounsel}</p>
                    </div>
                    <div>
                      <Label className="font-medium">Initiated</Label>
                      <p>{dispute.initiated}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="font-medium">Description</Label>
                    <p className="text-sm text-muted-foreground mt-1">{dispute.description}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Financial Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <Label className="font-medium">Financial Exposure</Label>
                      <p className="text-lg font-semibold">{dispute.exposure}</p>
                    </div>
                    <div>
                      <Label className="font-medium">Provision Status</Label>
                      <Badge variant={dispute.provisioned ? "default" : "outline"}>
                        {dispute.provisioned ? "Provisioned" : "Not Provisioned"}
                      </Badge>
                    </div>
                    <div>
                      <Label className="font-medium">Legal Spend</Label>
                      <p>$25,000</p>
                    </div>
                    <div>
                      <Label className="font-medium">Settlement Range</Label>
                      <p>$200,000 - $400,000</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Progress Tracker
                </CardTitle>
                <CardDescription>Current stage and milestone history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Stage Progress</span>
                      <span className="text-sm text-muted-foreground">2 of 5 stages completed</span>
                    </div>
                    <Progress value={40} className="h-2" />
                    <div className="flex justify-between mt-2">
                      {stages.map((stage, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full ${stage.completed ? 'bg-primary' : 'bg-muted'}`} />
                          <span className="text-xs mt-1">{stage.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Milestone History</h4>
                    <div className="space-y-3">
                      {milestones.map((milestone, index) => (
                        <div key={index} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h5 className="font-medium">{milestone.event}</h5>
                              <span className="text-xs text-muted-foreground">{milestone.date}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{milestone.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Task Management</CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {task.status === 'completed' ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : task.status === 'in-progress' ? (
                          <Clock className="h-4 w-4 text-orange-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-gray-400" />
                        )}
                        <div>
                          <h4 className="font-medium">{task.title}</h4>
                          <p className="text-sm text-muted-foreground">Assigned to {task.assignee}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-1">{task.priority}</Badge>
                        <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="collaborators" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Team & Collaborators
                  </CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Member
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {collaborators.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{member.name}</h4>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <Badge variant={member.type === 'internal' ? 'default' : 'secondary'}>
                        {member.type === 'internal' ? 'Internal' : 'External'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Document Library
                  </CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">{doc.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Uploaded by {doc.uploadedBy} on {doc.date}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">{doc.type}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Activity Feed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <Label htmlFor="comment">Add Comment</Label>
                    <Textarea id="comment" placeholder="Enter your comment..." />
                    <div className="flex justify-between items-center">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" />
                        Internal only
                      </label>
                      <Button size="sm">Post Comment</Button>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">Recent Activity</h4>
                    <div className="space-y-3">
                      <div className="flex gap-3 p-3 bg-muted rounded-lg">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Sarah Johnson</span>
                            <span className="text-xs text-muted-foreground">2 hours ago</span>
                          </div>
                          <p className="text-sm">Updated the financial exposure amount based on latest assessment.</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 p-3 bg-muted rounded-lg">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>WA</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Wilson & Associates</span>
                            <span className="text-xs text-muted-foreground">1 day ago</span>
                          </div>
                          <p className="text-sm">Uploaded initial legal memo with case assessment.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
