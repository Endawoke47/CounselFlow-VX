import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { FileText, Calendar, DollarSign, User, Building2, Clock, AlertTriangle, CheckCircle, Edit, Download, Bell } from "lucide-react";
import { DocumentManagement } from "./DocumentManagement";

interface Contract {
  id: number;
  title: string;
  entity: string;
  status: string;
  renewalDate: string;
  owner: string;
  value: string;
  type: string;
  counterparty?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  documents?: any[];
}

interface ContractDetailModalProps {
  contract: Contract | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ContractDetailModal({ contract, isOpen, onClose }: ContractDetailModalProps) {
  if (!contract) return null;

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "default";
      case "Expiring":
        return "destructive";
      case "Under Review":
        return "secondary";
      case "Draft":
        return "outline";
      default:
        return "outline";
    }
  };

  const contractActivities = [
    {
      date: "2024-06-10",
      action: "Contract Created",
      user: contract.owner,
      description: "Initial contract setup completed"
    },
    {
      date: "2024-06-12",
      action: "Legal Review",
      user: "Legal Team",
      description: "Contract terms reviewed and approved"
    },
    {
      date: "2024-06-15",
      action: "Contract Signed",
      user: contract.owner,
      description: "Contract executed by all parties"
    }
  ];

  const upcomingTasks = [
    {
      task: "Renewal review",
      dueDate: "2024-07-15",
      assignee: contract.owner,
      priority: "High"
    },
    {
      task: "Performance evaluation",
      dueDate: "2024-08-01",
      assignee: "Legal Team",
      priority: "Medium"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {contract.title}
          </DialogTitle>
          <DialogDescription>
            Contract details and lifecycle management
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Entity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">{contract.entity}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Contract Value
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">{contract.value}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Renewal Date
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">{contract.renewalDate}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Contract Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Status</Label>
                    <div className="mt-1">
                      <Badge variant={getStatusBadgeVariant(contract.status)}>
                        {contract.status}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Type</Label>
                    <p className="mt-1">{contract.type}</p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Contract Owner</Label>
                    <p className="mt-1 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {contract.owner}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Counterparty</Label>
                    <p className="mt-1">{contract.counterparty || "Not specified"}</p>
                  </div>
                </div>

                {contract.description && (
                  <>
                    <Separator />
                    <div>
                      <Label className="text-sm font-medium">Description</Label>
                      <p className="mt-1 text-muted-foreground">{contract.description}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Edit Contract
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Set Alert
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <DocumentManagement
              contractId={contract.id}
              documents={contract.documents || []}
              readonly={true}
            />
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contract Activity Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contractActivities.map((activity, index) => (
                    <div key={index} className="flex gap-4 pb-4 border-b last:border-b-0">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{activity.action}</p>
                          <Badge variant="outline" className="text-xs">
                            {activity.date}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">by {activity.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingTasks.map((task, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{task.task}</p>
                          <p className="text-sm text-muted-foreground">
                            Due: {task.dueDate} • Assigned to: {task.assignee}
                          </p>
                        </div>
                      </div>
                      <Badge variant={task.priority === "High" ? "destructive" : "secondary"}>
                        {task.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}
