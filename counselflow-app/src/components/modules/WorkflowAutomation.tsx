/**
 * Workflow Automation Module for CounselFlow
 * Provides visual workflow builder, task management, and automation capabilities
 */
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Play, 
  Pause, 
  Plus, 
  Edit, 
  Clock, 
  CheckCircle,
  Workflow as WorkflowIcon,
  GitBranch,
  Calendar,
  BarChart3,
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WorkflowStep {
  id: string;
  name: string;
  description?: string;
  step_type: 'start' | 'task' | 'decision' | 'end';
  position: { x: number; y: number };
  configuration?: Record<string, unknown>;
  connections: string[];
}

interface Workflow {
  id: number;
  name: string;
  description?: string;
  status: 'draft' | 'active' | 'paused' | 'completed' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  created_at: string;
  updated_at?: string;
  definition: {
    steps: WorkflowStep[];
    variables: Record<string, unknown>;
    settings: Record<string, unknown>;
  };
}

interface WorkflowTask {
  id: number;
  name: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigned_to?: number;
  due_date?: string;
  created_at: string;
  workflow_id: number;
}

interface WorkflowTemplate {
  id: number;
  name: string;
  description?: string;
  category: string;
  usage_count: number;
  is_public: boolean;
}

interface WorkflowMetrics {
  total_instances: number;
  completed_instances: number;
  completion_rate: number;
  avg_completion_time_hours: number;
  total_tasks: number;
  completed_tasks: number;
  task_completion_rate: number;
}

export default function WorkflowAutomation() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [tasks, setTasks] = useState<WorkflowTask[]>([]);
  const [templates, setTemplates] = useState<WorkflowTemplate[]>([]);
  const [metrics, setMetrics] = useState<WorkflowMetrics | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Mock data for demonstration
  useEffect(() => {
    const mockWorkflows: Workflow[] = [
      {
        id: 1,
        name: "Contract Review Process",
        description: "Automated contract review and approval workflow",
        status: "active",
        priority: "high",
        created_at: "2025-01-01T10:00:00Z",
        definition: {
          steps: [
            {
              id: "start",
              name: "Start Review",
              step_type: "start",
              position: { x: 100, y: 100 },
              connections: ["legal-review"]
            },
            {
              id: "legal-review",
              name: "Legal Review",
              step_type: "task",
              position: { x: 300, y: 100 },
              connections: ["approval"]
            },
            {
              id: "approval",
              name: "Final Approval",
              step_type: "task",
              position: { x: 500, y: 100 },
              connections: ["end"]
            },
            {
              id: "end",
              name: "Complete",
              step_type: "end",
              position: { x: 700, y: 100 },
              connections: []
            }
          ],
          variables: {},
          settings: {}
        }
      },
      {
        id: 2,
        name: "Litigation Case Management",
        description: "End-to-end litigation case workflow",
        status: "draft",
        priority: "medium",
        created_at: "2025-01-01T11:00:00Z",
        definition: {
          steps: [],
          variables: {},
          settings: {}
        }
      }
    ];

    const mockTasks: WorkflowTask[] = [
      {
        id: 1,
        name: "Review NDA Agreement",
        description: "Review and approve NDA for client XYZ",
        status: "pending",
        priority: "high",
        due_date: "2025-01-02T17:00:00Z",
        created_at: "2025-01-01T10:00:00Z",
        workflow_id: 1
      },
      {
        id: 2,
        name: "Client Consultation Follow-up",
        description: "Schedule follow-up meeting with client",
        status: "in_progress",
        priority: "medium",
        due_date: "2025-01-03T12:00:00Z",
        created_at: "2025-01-01T11:00:00Z",
        workflow_id: 1
      }
    ];

    const mockTemplates: WorkflowTemplate[] = [
      {
        id: 1,
        name: "Contract Review Template",
        description: "Standard contract review process",
        category: "contracts",
        usage_count: 15,
        is_public: true
      },
      {
        id: 2,
        name: "Litigation Case Template",
        description: "Complete litigation workflow",
        category: "litigation",
        usage_count: 8,
        is_public: true
      }
    ];

    const mockMetrics: WorkflowMetrics = {
      total_instances: 45,
      completed_instances: 38,
      completion_rate: 84.4,
      avg_completion_time_hours: 72.5,
      total_tasks: 156,
      completed_tasks: 142,
      task_completion_rate: 91.0
    };

    setWorkflows(mockWorkflows);
    setTasks(mockTasks);
    setTemplates(mockTemplates);
    setMetrics(mockMetrics);
    setLoading(false);
  }, []);

  const createWorkflow = useCallback(async (workflowData: Partial<Workflow>) => {
    try {
      setIsCreating(true);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newWorkflow: Workflow = {
        id: workflows.length + 1,
        name: workflowData.name || "New Workflow",
        description: workflowData.description,
        status: "draft",
        priority: workflowData.priority || "medium",
        created_at: new Date().toISOString(),
        definition: {
          steps: [],
          variables: {},
          settings: {}
        }
      };
      
      setWorkflows(prev => [...prev, newWorkflow]);
      
      toast({
        title: "Success",
        description: "Workflow created successfully",
      });
      
    } catch {
      toast({
        title: "Error",
        description: "Failed to create workflow",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  }, [workflows, toast]);

  const startWorkflow = useCallback(async (workflowId: number) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setWorkflows(prev => prev.map(w => 
        w.id === workflowId 
          ? { ...w, status: 'active' as const }
          : w
      ));
      
      toast({
        title: "Success",
        description: "Workflow started successfully",
      });
      
    } catch {
      toast({
        title: "Error",
        description: "Failed to start workflow",
        variant: "destructive",
      });
    }
  }, [toast]);

  const completeTask = useCallback(async (taskId: number) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTasks(prev => prev.map(t => 
        t.id === taskId 
          ? { ...t, status: 'completed' as const }
          : t
      ));
      
      toast({
        title: "Success",
        description: "Task completed successfully",
      });
      
    } catch {
      toast({
        title: "Error",
        description: "Failed to complete task",
        variant: "destructive",
      });
    }
  }, [toast]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'paused': return 'bg-yellow-500';
      case 'draft': return 'bg-gray-500';
      case 'pending': return 'bg-orange-500';
      case 'in_progress': return 'bg-blue-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <WorkflowIcon className="h-8 w-8 text-blue-600" />
            Workflow Automation
          </h2>
          <p className="text-gray-600 mt-2">
            Design, automate, and manage legal workflows with visual process builder
          </p>
        </div>
        <Button 
          onClick={() => createWorkflow({ name: "New Workflow" })}
          disabled={isCreating}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Workflow
        </Button>
      </div>

      {/* Metrics Overview */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Workflows</p>
                  <p className="text-2xl font-bold">{metrics.total_instances}</p>
                </div>
                <WorkflowIcon className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completion Rate</p>
                  <p className="text-2xl font-bold">{metrics.completion_rate.toFixed(1)}%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg. Completion Time</p>
                  <p className="text-2xl font-bold">{metrics.avg_completion_time_hours.toFixed(1)}h</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Task Success Rate</p>
                  <p className="text-2xl font-bold">{metrics.task_completion_rate.toFixed(1)}%</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="workflows" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="tasks">My Tasks</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Workflows Tab */}
        <TabsContent value="workflows" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {workflows.map((workflow) => (
              <Card key={workflow.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{workflow.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={`text-white ${getStatusColor(workflow.status)}`}>
                        {workflow.status}
                      </Badge>
                      <Badge className={`text-white ${getPriorityColor(workflow.priority)}`}>
                        {workflow.priority}
                      </Badge>
                    </div>
                  </div>
                  {workflow.description && (
                    <CardDescription>{workflow.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-600">
                      Created: {new Date(workflow.created_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <GitBranch className="h-4 w-4" />
                      <span className="text-sm">{workflow.definition.steps.length} steps</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {workflow.status === 'draft' && (
                      <Button 
                        size="sm" 
                        onClick={() => startWorkflow(workflow.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Start
                      </Button>
                    )}
                    {workflow.status === 'active' && (
                      <Button size="sm" variant="outline">
                        <Pause className="h-4 w-4 mr-1" />
                        Pause
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="h-4 w-4 mr-1" />
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="space-y-4">
          <div className="space-y-4">
            {tasks.map((task) => (
              <Card key={task.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold">{task.name}</h3>
                      {task.description && (
                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      )}
                      <div className="flex items-center gap-4 mt-2">
                        <Badge className={`text-white ${getStatusColor(task.status)}`}>
                          {task.status}
                        </Badge>
                        <Badge className={`text-white ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </Badge>
                        {task.due_date && (
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            Due: {new Date(task.due_date).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {task.status === 'pending' && (
                        <Button 
                          size="sm"
                          onClick={() => completeTask(task.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Complete
                        </Button>
                      )}
                      {task.status === 'in_progress' && (
                        <Button size="sm" variant="outline">
                          <Clock className="h-4 w-4 mr-1" />
                          In Progress
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  {template.description && (
                    <CardDescription>{template.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline">{template.category}</Badge>
                    <div className="text-sm text-gray-600">
                      Used {template.usage_count} times
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => createWorkflow({ 
                      name: `${template.name} - Copy`,
                      description: template.description 
                    })}
                  >
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          {metrics && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Workflow Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Completion Rate</span>
                      <span>{metrics.completion_rate.toFixed(1)}%</span>
                    </div>
                    <Progress value={metrics.completion_rate} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Task Success Rate</span>
                      <span>{metrics.task_completion_rate.toFixed(1)}%</span>
                    </div>
                    <Progress value={metrics.task_completion_rate} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{metrics.completed_instances}</p>
                      <p className="text-sm text-gray-600">Completed</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{metrics.total_instances - metrics.completed_instances}</p>
                      <p className="text-sm text-gray-600">In Progress</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Time Analytics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">
                      {metrics.avg_completion_time_hours.toFixed(1)}h
                    </p>
                    <p className="text-sm text-gray-600">Average Completion Time</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{metrics.total_tasks}</p>
                      <p className="text-sm text-gray-600">Total Tasks</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{metrics.completed_tasks}</p>
                      <p className="text-sm text-gray-600">Completed Tasks</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
