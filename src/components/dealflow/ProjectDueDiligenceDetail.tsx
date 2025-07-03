
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, AlertTriangle, Clock, FileText, Brain, Users, ArrowLeft, MessageSquare } from "lucide-react";

interface Project {
  id: string;
  name: string;
  sector: string;
  dealSize: string;
  status: string;
  overallProgress: number;
  documentsReviewed: number;
  totalDocuments: number;
  aiRisks: number;
  highRisks: number;
  mediumRisks: number;
  lowRisks: number;
  teamMembers: number;
  lastActivity: string;
}

interface ProjectDueDiligenceDetailProps {
  project: Project;
  onBack: () => void;
}

const mockDiligenceItems = [
  {
    id: "1",
    category: "Legal & Compliance",
    document: "Corporate Structure & Governance",
    status: "Completed",
    aiRisks: 2,
    humanReviewed: true,
    assignee: "Sarah Johnson",
    priority: "High",
    dueDate: "2024-01-20"
  },
  {
    id: "2",
    category: "IP & Technology",
    document: "Patent Portfolio Analysis",
    status: "In Review",
    aiRisks: 5,
    humanReviewed: false,
    assignee: "Michael Chen",
    priority: "High",
    dueDate: "2024-01-22"
  },
  {
    id: "3",
    category: "Employment",
    document: "Employment Agreements & Benefits",
    status: "Pending",
    aiRisks: 1,
    humanReviewed: false,
    assignee: "Emily Rodriguez",
    priority: "Medium",
    dueDate: "2024-01-25"
  },
  {
    id: "4",
    category: "Financial",
    document: "Audited Financial Statements",
    status: "In Review",
    aiRisks: 3,
    humanReviewed: true,
    assignee: "David Kim",
    priority: "High",
    dueDate: "2024-01-21"
  }
];

const mockDocuments = [
  {
    id: "1",
    name: "Shareholders Agreement",
    category: "Legal & Compliance",
    uploadDate: "2024-01-15",
    size: "2.5 MB",
    status: "Reviewed",
    aiRisks: 3,
    reviewer: "Sarah Johnson"
  },
  {
    id: "2",
    name: "IP License Agreements",
    category: "IP & Technology", 
    uploadDate: "2024-01-16",
    size: "1.8 MB",
    status: "Under Review",
    aiRisks: 5,
    reviewer: "Michael Chen"
  },
  {
    id: "3",
    name: "Employment Contracts",
    category: "Employment",
    uploadDate: "2024-01-17",
    size: "4.2 MB", 
    status: "Pending",
    aiRisks: 1,
    reviewer: "Emily Rodriguez"
  }
];

const categories = [
  { name: "Legal & Compliance", completed: 3, total: 5, progress: 60 },
  { name: "Financial", completed: 2, total: 4, progress: 50 },
  { name: "IP & Technology", completed: 1, total: 3, progress: 33 },
  { name: "Employment", completed: 0, total: 2, progress: 0 },
  { name: "Commercial", completed: 2, total: 3, progress: 67 }
];

export function ProjectDueDiligenceDetail({ project, onBack }: ProjectDueDiligenceDetailProps) {
  const [activeTab, setActiveTab] = useState("workflow");

  const getStatusColor = (status: string) => {
    const colors = {
      "Completed": "bg-green-100 text-green-800",
      "Reviewed": "bg-green-100 text-green-800", 
      "In Review": "bg-yellow-100 text-yellow-800",
      "Under Review": "bg-yellow-100 text-yellow-800",
      "Pending": "bg-gray-100 text-gray-800"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
      case "Reviewed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "In Review":
      case "Under Review":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Overview
        </Button>
        <div>
          <h2 className="text-2xl font-bold">{project.name}</h2>
          <p className="text-muted-foreground">
            {project.sector} • {project.dealSize} • Due Diligence Workflow
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.overallProgress}%</div>
            <p className="text-xs text-muted-foreground">Overall completion</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.documentsReviewed}/{project.totalDocuments}</div>
            <p className="text-xs text-muted-foreground">Reviewed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Risks</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.aiRisks}</div>
            <p className="text-xs text-muted-foreground">Flagged for review</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.teamMembers}</div>
            <p className="text-xs text-muted-foreground">Active members</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="workflow">Due Diligence Workflow</TabsTrigger>
          <TabsTrigger value="documents">Document Repository</TabsTrigger>
        </TabsList>

        <TabsContent value="workflow" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Category Progress</CardTitle>
              <CardDescription>
                Due diligence progress by review category for {project.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{category.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {category.completed}/{category.total} complete
                      </span>
                    </div>
                    <Progress value={category.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Document Review Queue</CardTitle>
              <CardDescription>
                Active due diligence items for {project.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockDiligenceItems.map((item) => (
                  <div key={item.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(item.status)}
                          <h4 className="font-semibold">{item.document}</h4>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                          {item.priority === "High" && (
                            <Badge variant="destructive">High Priority</Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <span>Category: {item.category}</span>
                          <span>Assignee: {item.assignee}</span>
                          <span>Due: {item.dueDate}</span>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Brain className="h-4 w-4 text-blue-600" />
                            <span className="text-sm">
                              {item.aiRisks} AI-flagged risks
                            </span>
                          </div>
                          {item.humanReviewed && (
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-sm text-green-600">Human reviewed</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Document
                        </Button>
                        <Button variant="outline" size="sm">
                          Review Risks
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Repository</CardTitle>
              <CardDescription>
                All documents uploaded for {project.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockDocuments.map((doc) => (
                  <div key={doc.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <h4 className="font-semibold">{doc.name}</h4>
                          <Badge className={getStatusColor(doc.status)}>
                            {doc.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <span>Category: {doc.category}</span>
                          <span>Size: {doc.size}</span>
                          <span>Uploaded: {doc.uploadDate}</span>
                          <span>Reviewer: {doc.reviewer}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Brain className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">
                            {doc.aiRisks} AI-flagged risks identified
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Comment
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
