import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Workflow,
  Play,
  Pause,
  Settings,
  Plus,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Users,
  FileText,
  Brain,
  Zap,
  Target,
  Activity,
  BarChart3,
  Calendar,
  Bell,
  RefreshCw,
  Download,
  Eye,
  Filter,
} from "lucide-react";

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: "contract" | "matter" | "compliance" | "document" | "approval";
  trigger: WorkflowTrigger;
  steps: WorkflowStep[];
  conditions: WorkflowCondition[];
  status: "active" | "inactive" | "draft";
  usage: number;
  successRate: number;
  avgCompletionTime: number;
  createdAt: string;
  lastModified: string;
}

interface WorkflowTrigger {
  type: "manual" | "automatic" | "scheduled" | "event";
  event?: string;
  schedule?: string;
  conditions?: string[];
}

interface WorkflowStep {
  id: string;
  name: string;
  type: "approval" | "review" | "notification" | "task" | "condition" | "integration";
  assignee?: string;
  role?: string;
  timeLimit?: number;
  required: boolean;
  parallel?: boolean;
  conditions?: string[];
  actions?: WorkflowAction[];
}

interface WorkflowCondition {
  id: string;
  field: string;
  operator: "equals" | "contains" | "greater_than" | "less_than" | "exists";
  value: any;
  action: "continue" | "skip" | "stop" | "branch";
}

interface WorkflowAction {
  type: "email" | "slack" | "webhook" | "create_task" | "update_field" | "generate_document";
  config: Record<string, any>;
}

interface WorkflowInstance {
  id: string;
  templateId: string;
  templateName: string;
  status: "running" | "completed" | "failed" | "paused";
  currentStep: number;
  startedAt: string;
  completedAt?: string;
  initiatedBy: string;
  data: Record<string, any>;
  steps: WorkflowInstanceStep[];
}

interface WorkflowInstanceStep {
  stepId: string;
  name: string;
  status: "pending" | "in_progress" | "completed" | "failed" | "skipped";
  assignee?: string;
  startedAt?: string;
  completedAt?: string;
  comments?: string;
  duration?: number;
}

export function LegalWorkflowAutomation() {
  const [activeTab, setActiveTab] = useState("templates");
  const [selectedTemplate, setSelectedTemplate] = useState<WorkflowTemplate | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // Mock data for demonstration
  const templates: WorkflowTemplate[] = [
    {
      id: "wf-1",
      name: "Contract Review & Approval",
      description: "Automated contract review workflow with legal team approval and stakeholder sign-off",
      category: "contract",
      trigger: {
        type: "automatic",
        event: "contract_uploaded",
        conditions: ["contract_value > 10000"],
      },
      steps: [
        {
          id: "step-1",
          name: "Initial Review",
          type: "review",
          assignee: "Legal Team",
          timeLimit: 48,
          required: true,
          actions: [
            {
              type: "email",
              config: { template: "contract_review_notification" },
            },
          ],
        },
        {
          id: "step-2",
          name: "Risk Assessment",
          type: "task",
          assignee: "Risk Manager",
          timeLimit: 24,
          required: true,
          conditions: ["contract_value > 50000"],
        },
        {
          id: "step-3",
          name: "Legal Approval",
          type: "approval",
          role: "Legal Director",
          timeLimit: 72,
          required: true,
        },
        {
          id: "step-4",
          name: "Final Sign-off",
          type: "approval",
          role: "CFO",
          timeLimit: 48,
          required: true,
          conditions: ["contract_value > 100000"],
        },
      ],
      conditions: [
        {
          id: "cond-1",
          field: "contract_value",
          operator: "greater_than",
          value: 100000,
          action: "continue",
        },
      ],
      status: "active",
      usage: 156,
      successRate: 94,
      avgCompletionTime: 4.2,
      createdAt: "2024-01-15",
      lastModified: "2024-06-10",
    },
    {
      id: "wf-2",
      name: "Matter Assignment & Tracking",
      description: "Automated matter assignment based on expertise and workload",
      category: "matter",
      trigger: {
        type: "automatic",
        event: "matter_created",
      },
      steps: [
        {
          id: "step-1",
          name: "Matter Classification",
          type: "task",
          assignee: "AI System",
          timeLimit: 1,
          required: true,
        },
        {
          id: "step-2",
          name: "Attorney Assignment",
          type: "task",
          assignee: "Legal Operations",
          timeLimit: 24,
          required: true,
        },
        {
          id: "step-3",
          name: "Client Notification",
          type: "notification",
          timeLimit: 2,
          required: true,
        },
      ],
      conditions: [],
      status: "active",
      usage: 89,
      successRate: 98,
      avgCompletionTime: 1.8,
      createdAt: "2024-02-01",
      lastModified: "2024-05-20",
    },
    {
      id: "wf-3",
      name: "Compliance Monitoring",
      description: "Automated compliance monitoring and alert system",
      category: "compliance",
      trigger: {
        type: "scheduled",
        schedule: "daily",
      },
      steps: [
        {
          id: "step-1",
          name: "Compliance Check",
          type: "task",
          assignee: "AI System",
          timeLimit: 1,
          required: true,
        },
        {
          id: "step-2",
          name: "Generate Report",
          type: "task",
          assignee: "System",
          timeLimit: 1,
          required: true,
        },
        {
          id: "step-3",
          name: "Alert if Issues",
          type: "notification",
          assignee: "Compliance Team",
          timeLimit: 1,
          required: false,
          conditions: ["issues_found = true"],
        },
      ],
      conditions: [],
      status: "active",
      usage: 365,
      successRate: 99,
      avgCompletionTime: 0.5,
      createdAt: "2024-01-01",
      lastModified: "2024-06-01",
    },
  ];

  const instances: WorkflowInstance[] = [
    {
      id: "inst-1",
      templateId: "wf-1",
      templateName: "Contract Review & Approval",
      status: "running",
      currentStep: 2,
      startedAt: "2024-06-30T09:00:00Z",
      initiatedBy: "Sarah Johnson",
      data: {
        contract_name: "Microsoft Software License",
        contract_value: 150000,
        counterparty: "Microsoft Corporation",
      },
      steps: [
        {
          stepId: "step-1",
          name: "Initial Review",
          status: "completed",
          assignee: "Legal Team",
          startedAt: "2024-06-30T09:00:00Z",
          completedAt: "2024-06-30T15:30:00Z",
          duration: 6.5,
        },
        {
          stepId: "step-2",
          name: "Risk Assessment",
          status: "in_progress",
          assignee: "Risk Manager",
          startedAt: "2024-06-30T15:30:00Z",
        },
        {
          stepId: "step-3",
          name: "Legal Approval",
          status: "pending",
        },
        {
          stepId: "step-4",
          name: "Final Sign-off",
          status: "pending",
        },
      ],
    },
    {
      id: "inst-2",
      templateId: "wf-2",
      templateName: "Matter Assignment & Tracking",
      status: "completed",
      currentStep: 3,
      startedAt: "2024-06-29T14:20:00Z",
      completedAt: "2024-06-30T10:15:00Z",
      initiatedBy: "System",
      data: {
        matter_type: "Employment Dispute",
        client: "Acme Corp",
        priority: "High",
      },
      steps: [
        {
          stepId: "step-1",
          name: "Matter Classification",
          status: "completed",
          assignee: "AI System",
          startedAt: "2024-06-29T14:20:00Z",
          completedAt: "2024-06-29T14:21:00Z",
          duration: 0.02,
        },
        {
          stepId: "step-2",
          name: "Attorney Assignment",
          status: "completed",
          assignee: "Legal Operations",
          startedAt: "2024-06-29T14:21:00Z",
          completedAt: "2024-06-30T09:30:00Z",
          duration: 19.15,
        },
        {
          stepId: "step-3",
          name: "Client Notification",
          status: "completed",
          assignee: "System",
          startedAt: "2024-06-30T09:30:00Z",
          completedAt: "2024-06-30T10:15:00Z",
          duration: 0.75,
        },
      ],
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-success-600" />;
      case "inactive":
        return <Pause className="h-4 w-4 text-muted-foreground" />;
      case "draft":
        return <Edit className="h-4 w-4 text-warning-600" />;
      case "running":
        return <Activity className="h-4 w-4 text-info-600 animate-pulse" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-success-600" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-destructive" />;
      case "paused":
        return <Pause className="h-4 w-4 text-warning-600" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
      case "completed":
        return "default";
      case "running":
        return "secondary";
      case "failed":
        return "destructive";
      case "inactive":
      case "paused":
        return "outline";
      default:
        return "outline";
    }
  };

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-success-600" />;
      case "in_progress":
        return <Activity className="h-4 w-4 text-info-600 animate-pulse" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-destructive" />;
      case "skipped":
        return <ArrowRight className="h-4 w-4 text-muted-foreground" />;
      case "pending":
        return <Clock className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "contract":
        return <FileText className="h-4 w-4 text-primary" />;
      case "matter":
        return <Users className="h-4 w-4 text-info-600" />;
      case "compliance":
        return <CheckCircle className="h-4 w-4 text-success-600" />;
      case "document":
        return <FileText className="h-4 w-4 text-warning-600" />;
      case "approval":
        return <CheckCircle className="h-4 w-4 text-purple-600" />;
      default:
        return <Workflow className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Workflow className="h-6 w-6 text-primary" />
            Legal Workflow Automation
          </h2>
          <p className="text-muted-foreground">
            Intelligent automation for legal processes with AI-powered routing and approvals
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Workflow
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Workflow</DialogTitle>
                <DialogDescription>
                  Design a new automated workflow for your legal processes
                </DialogDescription>
              </DialogHeader>
              <WorkflowBuilder onSave={() => setShowCreateDialog(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Workflows
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{templates.filter(t => t.status === "active").length}</div>
            <p className="text-sm text-muted-foreground mt-1">
              Automated processes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Running Instances
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{instances.filter(i => i.status === "running").length}</div>
            <p className="text-sm text-muted-foreground mt-1">
              Currently processing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96%</div>
            <p className="text-sm text-success-600 mt-1">
              +2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Time Saved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342h</div>
            <p className="text-sm text-muted-foreground mt-1">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="instances">Running Instances</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="matter">Matter</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                  <SelectItem value="document">Document</SelectItem>
                  <SelectItem value="approval">Approval</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(template.category)}
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                      </div>
                      <CardDescription>{template.description}</CardDescription>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs capitalize">
                          {template.category}
                        </Badge>
                        <Badge variant={getStatusBadgeVariant(template.status)} className="text-xs">
                          {template.status.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {template.steps.length} steps
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Usage</p>
                      <p className="font-medium">{template.usage}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Success Rate</p>
                      <p className="font-medium">{template.successRate}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Avg Time</p>
                      <p className="font-medium">{template.avgCompletionTime}d</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Trigger</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs capitalize">
                        {template.trigger.type}
                      </Badge>
                      {template.trigger.event && (
                        <Badge variant="outline" className="text-xs">
                          {template.trigger.event}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      Modified {new Date(template.lastModified).toLocaleDateString()}
                    </p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4 mr-2" />
                        Run
                      </Button>
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4 mr-2" />
                        Clone
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="instances" className="space-y-6">
          <div className="space-y-4">
            {instances.map((instance) => (
              <Card key={instance.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(instance.status)}
                        <CardTitle className="text-lg">{instance.templateName}</CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusBadgeVariant(instance.status)} className="text-xs">
                          {instance.status.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Step {instance.currentStep} of {instance.steps.length}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Started by {instance.initiatedBy} on {new Date(instance.startedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-muted-foreground">
                        {Math.round((instance.steps.filter(s => s.status === "completed").length / instance.steps.length) * 100)}%
                      </span>
                    </div>
                    <Progress 
                      value={(instance.steps.filter(s => s.status === "completed").length / instance.steps.length) * 100} 
                    />
                  </div>

                  {/* Workflow Steps */}
                  <div>
                    <p className="text-sm font-medium mb-3">Workflow Steps</p>
                    <div className="space-y-2">
                      {instance.steps.map((step, index) => (
                        <div key={step.stepId} className="flex items-center gap-3 p-2 rounded-lg border">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-medium">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              {getStepStatusIcon(step.status)}
                              <span className="font-medium text-sm">{step.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {step.status.replace("_", " ").toUpperCase()}
                              </Badge>
                            </div>
                            {step.assignee && (
                              <p className="text-xs text-muted-foreground mt-1">
                                Assigned to: {step.assignee}
                              </p>
                            )}
                            {step.duration && (
                              <p className="text-xs text-muted-foreground">
                                Duration: {step.duration}h
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Instance Data */}
                  <div>
                    <p className="text-sm font-medium mb-2">Instance Data</p>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {Object.entries(instance.data).map(([key, value]) => (
                          <div key={key}>
                            <span className="text-muted-foreground">{key.replace("_", " ")}:</span>
                            <span className="ml-2 font-medium">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Workflow Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {templates.map((template) => (
                    <div key={template.id} className="flex items-center justify-between">
                      <span className="text-sm">{template.name}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={template.successRate} className="w-24" />
                        <span className="text-sm font-medium w-10">{template.successRate}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Average Completion Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {templates.map((template) => (
                    <div key={template.id} className="flex items-center justify-between">
                      <span className="text-sm">{template.name}</span>
                      <span className="text-sm font-medium">{template.avgCompletionTime} days</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Settings</CardTitle>
              <CardDescription>
                Configure global workflow automation settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-assignment">Automatic Assignment</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically assign tasks based on workload and expertise
                  </p>
                </div>
                <Checkbox id="auto-assignment" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="ai-routing">AI-Powered Routing</Label>
                  <p className="text-sm text-muted-foreground">
                    Use AI to intelligently route workflows based on content analysis
                  </p>
                </div>
                <Checkbox id="ai-routing" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="escalation">Automatic Escalation</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically escalate overdue tasks to supervisors
                  </p>
                </div>
                <Checkbox id="escalation" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Send email notifications for workflow events
                  </p>
                </div>
                <Checkbox id="notifications" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function WorkflowBuilder({ onSave }: { onSave: () => void }) {
  const [workflowName, setWorkflowName] = useState("");
  const [workflowDescription, setWorkflowDescription] = useState("");
  const [category, setCategory] = useState("contract");

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="workflow-name">Workflow Name</Label>
        <Input
          id="workflow-name"
          value={workflowName}
          onChange={(e) => setWorkflowName(e.target.value)}
          placeholder="Enter workflow name"
        />
      </div>

      <div>
        <Label htmlFor="workflow-description">Description</Label>
        <Textarea
          id="workflow-description"
          value={workflowDescription}
          onChange={(e) => setWorkflowDescription(e.target.value)}
          placeholder="Describe the workflow purpose and process"
        />
      </div>

      <div>
        <Label htmlFor="workflow-category">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="contract">Contract</SelectItem>
            <SelectItem value="matter">Matter</SelectItem>
            <SelectItem value="compliance">Compliance</SelectItem>
            <SelectItem value="document">Document</SelectItem>
            <SelectItem value="approval">Approval</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between pt-4">
        <Button variant="outline">
          Cancel
        </Button>
        <Button onClick={onSave} disabled={!workflowName.trim()}>
          <Zap className="h-4 w-4 mr-2" />
          Create Workflow
        </Button>
      </div>
    </div>
  );
} 