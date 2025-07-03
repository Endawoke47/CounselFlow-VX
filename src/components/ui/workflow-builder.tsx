import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Plus,
  Trash2,
  Edit,
  Play,
  Pause,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
  Settings,
  Users,
  FileText,
  AlertTriangle,
} from "lucide-react";

interface WorkflowStep {
  id: string;
  name: string;
  type: "approval" | "review" | "notification" | "condition";
  assignee?: string;
  role?: string;
  description?: string;
  conditions?: string[];
  timeLimit?: number;
  required: boolean;
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive" | "draft";
  steps: WorkflowStep[];
  triggers: string[];
  createdAt: string;
  updatedAt: string;
}

interface WorkflowBuilderProps {
  workflows: Workflow[];
  onSaveWorkflow: (workflow: Workflow) => void;
  onDeleteWorkflow: (workflowId: string) => void;
  onToggleWorkflow: (workflowId: string) => void;
  availableUsers: Array<{ id: string; name: string; role: string }>;
  availableRoles: string[];
}

export function WorkflowBuilder({
  workflows,
  onSaveWorkflow,
  onDeleteWorkflow,
  onToggleWorkflow,
  availableUsers,
  availableRoles,
}: WorkflowBuilderProps) {
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showStepDialog, setShowStepDialog] = useState(false);
  const [editingStep, setEditingStep] = useState<WorkflowStep | null>(null);

  const createNewWorkflow = (): Workflow => ({
    id: `workflow-${Date.now()}`,
    name: "New Workflow",
    description: "",
    status: "draft",
    steps: [],
    triggers: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const createNewStep = (): WorkflowStep => ({
    id: `step-${Date.now()}`,
    name: "New Step",
    type: "approval",
    required: true,
  });

  const handleSaveWorkflow = () => {
    if (selectedWorkflow) {
      onSaveWorkflow({
        ...selectedWorkflow,
        updatedAt: new Date().toISOString(),
      });
      setIsEditing(false);
    }
  };

  const handleAddStep = (step: WorkflowStep) => {
    if (selectedWorkflow) {
      setSelectedWorkflow({
        ...selectedWorkflow,
        steps: [...selectedWorkflow.steps, step],
      });
    }
  };

  const handleUpdateStep = (stepId: string, updatedStep: WorkflowStep) => {
    if (selectedWorkflow) {
      setSelectedWorkflow({
        ...selectedWorkflow,
        steps: selectedWorkflow.steps.map(step =>
          step.id === stepId ? updatedStep : step
        ),
      });
    }
  };

  const handleDeleteStep = (stepId: string) => {
    if (selectedWorkflow) {
      setSelectedWorkflow({
        ...selectedWorkflow,
        steps: selectedWorkflow.steps.filter(step => step.id !== stepId),
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-success-600" />;
      case "inactive":
        return <Pause className="h-4 w-4 text-muted-foreground" />;
      case "draft":
        return <Edit className="h-4 w-4 text-warning-600" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case "approval":
        return <CheckCircle className="h-4 w-4 text-primary" />;
      case "review":
        return <FileText className="h-4 w-4 text-info-600" />;
      case "notification":
        return <AlertTriangle className="h-4 w-4 text-warning-600" />;
      case "condition":
        return <Settings className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Workflow Management</h2>
          <p className="text-muted-foreground">
            Create and manage approval workflows for legal processes
          </p>
        </div>
        <Button
          onClick={() => {
            setSelectedWorkflow(createNewWorkflow());
            setIsEditing(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Workflow
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workflow List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Workflows</h3>
          <div className="space-y-2">
            {workflows.map((workflow) => (
              <Card
                key={workflow.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedWorkflow?.id === workflow.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedWorkflow(workflow)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">{workflow.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(workflow.status)}
                      <Badge variant="outline" className="text-xs">
                        {workflow.steps.length} steps
                      </Badge>
                    </div>
                  </div>
                  <CardDescription className="text-xs">
                    {workflow.description || "No description"}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Workflow Details */}
        <div className="lg:col-span-2">
          {selectedWorkflow ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {isEditing ? (
                        <Input
                          value={selectedWorkflow.name}
                          onChange={(e) =>
                            setSelectedWorkflow({
                              ...selectedWorkflow,
                              name: e.target.value,
                            })
                          }
                          className="text-lg font-semibold"
                        />
                      ) : (
                        selectedWorkflow.name
                      )}
                      {getStatusIcon(selectedWorkflow.status)}
                    </CardTitle>
                    {isEditing ? (
                      <Textarea
                        value={selectedWorkflow.description}
                        onChange={(e) =>
                          setSelectedWorkflow({
                            ...selectedWorkflow,
                            description: e.target.value,
                          })
                        }
                        placeholder="Workflow description..."
                        className="mt-2"
                      />
                    ) : (
                      <CardDescription>
                        {selectedWorkflow.description || "No description"}
                      </CardDescription>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSaveWorkflow}>Save</Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onToggleWorkflow(selectedWorkflow.id)}
                        >
                          {selectedWorkflow.status === "active" ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsEditing(true)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDeleteWorkflow(selectedWorkflow.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">Workflow Steps</h4>
                    {isEditing && (
                      <Dialog open={showStepDialog} onOpenChange={setShowStepDialog}>
                        <DialogTrigger asChild>
                          <Button size="sm" onClick={() => setEditingStep(null)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Step
                          </Button>
                        </DialogTrigger>
                        <StepDialog
                          step={editingStep}
                          availableUsers={availableUsers}
                          availableRoles={availableRoles}
                          onSave={(step) => {
                            if (editingStep) {
                              handleUpdateStep(editingStep.id, step);
                            } else {
                              handleAddStep(step);
                            }
                            setShowStepDialog(false);
                            setEditingStep(null);
                          }}
                          onCancel={() => {
                            setShowStepDialog(false);
                            setEditingStep(null);
                          }}
                        />
                      </Dialog>
                    )}
                  </div>

                  <div className="space-y-3">
                    {selectedWorkflow.steps.map((step, index) => (
                      <div key={step.id} className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                          <span className="text-xs font-semibold">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <Card className="p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {getStepIcon(step.type)}
                                <span className="font-medium">{step.name}</span>
                                <Badge variant="outline" className="text-xs">
                                  {step.type}
                                </Badge>
                                {step.required && (
                                  <Badge variant="destructive" className="text-xs">
                                    Required
                                  </Badge>
                                )}
                              </div>
                              {isEditing && (
                                <div className="flex items-center gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      setEditingStep(step);
                                      setShowStepDialog(true);
                                    }}
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeleteStep(step.id)}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              )}
                            </div>
                            {step.description && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {step.description}
                              </p>
                            )}
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              {step.assignee && (
                                <span className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {step.assignee}
                                </span>
                              )}
                              {step.role && (
                                <span className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {step.role}
                                </span>
                              )}
                              {step.timeLimit && (
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {step.timeLimit} days
                                </span>
                              )}
                            </div>
                          </Card>
                        </div>
                        {index < selectedWorkflow.steps.length - 1 && (
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    ))}
                  </div>

                  {selectedWorkflow.steps.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Settings className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No steps defined yet</p>
                      {isEditing && (
                        <p className="text-sm">Click "Add Step" to get started</p>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center text-muted-foreground">
                  <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a workflow to view details</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function StepDialog({
  step,
  availableUsers,
  availableRoles,
  onSave,
  onCancel,
}: {
  step: WorkflowStep | null;
  availableUsers: Array<{ id: string; name: string; role: string }>;
  availableRoles: string[];
  onSave: (step: WorkflowStep) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<WorkflowStep>(
    step || {
      id: `step-${Date.now()}`,
      name: "",
      type: "approval",
      required: true,
    }
  );

  const handleSave = () => {
    if (formData.name.trim()) {
      onSave(formData);
    }
  };

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>{step ? "Edit Step" : "Add Step"}</DialogTitle>
        <DialogDescription>
          Configure the workflow step details
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <div>
          <Label htmlFor="step-name">Step Name</Label>
          <Input
            id="step-name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter step name"
          />
        </div>

        <div>
          <Label htmlFor="step-type">Step Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value: any) => setFormData({ ...formData, type: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="approval">Approval</SelectItem>
              <SelectItem value="review">Review</SelectItem>
              <SelectItem value="notification">Notification</SelectItem>
              <SelectItem value="condition">Condition</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="step-description">Description</Label>
          <Textarea
            id="step-description"
            value={formData.description || ""}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Optional description"
          />
        </div>

        <div>
          <Label htmlFor="step-assignee">Assignee</Label>
          <Select
            value={formData.assignee || ""}
            onValueChange={(value) => setFormData({ ...formData, assignee: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select assignee" />
            </SelectTrigger>
            <SelectContent>
              {availableUsers.map((user) => (
                <SelectItem key={user.id} value={user.name}>
                  {user.name} ({user.role})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="step-time-limit">Time Limit (days)</Label>
          <Input
            id="step-time-limit"
            type="number"
            value={formData.timeLimit || ""}
            onChange={(e) =>
              setFormData({ ...formData, timeLimit: parseInt(e.target.value) || undefined })
            }
            placeholder="Optional time limit"
          />
        </div>

        <div className="flex items-center justify-between pt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!formData.name.trim()}>
            {step ? "Update" : "Add"} Step
          </Button>
        </div>
      </div>
    </DialogContent>
  );
} 