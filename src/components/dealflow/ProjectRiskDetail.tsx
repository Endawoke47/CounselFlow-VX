
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Shield, TrendingDown, FileText, MessageSquare, ArrowLeft, CheckCircle, Clock } from "lucide-react";

interface Project {
  id: string;
  name: string;
  sector: string;
  dealSize: string;
  status: string;
  totalRisks: number;
  highRisks: number;
  mediumRisks: number;
  lowRisks: number;
  resolvedRisks: number;
  overallRiskScore: number;
  riskTrend: string;
  lastRiskUpdate: string;
  mitigationProgress: number;
}

interface ProjectRiskDetailProps {
  project: Project;
  onBack: () => void;
}

const mockRisks = [
  {
    id: "1",
    category: "IP & Technology",
    title: "Patent Expiration Risk",
    description: "Key patent expires in 18 months with no renewal strategy",
    severity: "High",
    probability: "Medium",
    impact: "Revenue loss of $5-10M annually",
    mitigation: "Negotiate extended licensing agreement",
    status: "Under Review",
    assignee: "Sarah Johnson",
    comments: 3,
    dateIdentified: "2024-01-15",
    targetResolution: "2024-02-15"
  },
  {
    id: "2",
    category: "Legal & Compliance",
    title: "Regulatory Compliance Gap",
    description: "Missing GDPR compliance documentation for EU operations",
    severity: "Medium",
    probability: "High",
    impact: "Potential fines up to €2M",
    mitigation: "Implement compliance program pre-closing",
    status: "In Progress",
    assignee: "Michael Chen",
    comments: 1,
    dateIdentified: "2024-01-16",
    targetResolution: "2024-01-30"
  },
  {
    id: "3",
    category: "Employment",
    title: "Key Person Dependency",
    description: "75% of revenue tied to relationships of departing CEO",
    severity: "High",
    probability: "Medium",
    impact: "Customer retention risk",
    mitigation: "Negotiate retention package and transition plan",
    status: "Resolved",
    assignee: "Emily Rodriguez",
    comments: 5,
    dateIdentified: "2024-01-10",
    targetResolution: "2024-01-25"
  },
  {
    id: "4",
    category: "Financial",
    title: "Working Capital Variance",
    description: "Significant seasonal working capital requirements",
    severity: "Low",
    probability: "High",
    impact: "Additional $3M financing needs",
    mitigation: "Adjust purchase price for working capital",
    status: "Under Review",
    assignee: "David Kim",
    comments: 2,
    dateIdentified: "2024-01-18",
    targetResolution: "2024-02-01"
  }
];

const riskCategories = [
  { name: "Legal & Compliance", high: 1, medium: 2, low: 1, resolved: 1 },
  { name: "IP & Technology", high: 2, medium: 1, low: 0, resolved: 0 },
  { name: "Financial", high: 0, medium: 2, low: 2, resolved: 1 },
  { name: "Employment", high: 0, medium: 1, low: 0, resolved: 1 },
  { name: "Commercial", high: 0, medium: 1, low: 1, resolved: 0 }
];

const mitigationActions = [
  {
    id: "1",
    title: "GDPR Compliance Implementation",
    description: "Deploy comprehensive GDPR compliance framework",
    status: "In Progress",
    progress: 65,
    assignee: "Michael Chen",
    dueDate: "2024-01-30"
  },
  {
    id: "2", 
    title: "Patent Licensing Negotiation",
    description: "Negotiate extended licensing agreement for core patents",
    status: "Pending",
    progress: 20,
    assignee: "Sarah Johnson",
    dueDate: "2024-02-15"
  },
  {
    id: "3",
    title: "CEO Retention Package",
    description: "Structure retention and transition plan for departing CEO",
    status: "Completed",
    progress: 100,
    assignee: "Emily Rodriguez",
    dueDate: "2024-01-25"
  }
];

export function ProjectRiskDetail({ project, onBack }: ProjectRiskDetailProps) {
  const [activeTab, setActiveTab] = useState("risks");

  const getSeverityColor = (severity: string) => {
    const colors = {
      "High": "bg-red-100 text-red-800",
      "Medium": "bg-yellow-100 text-yellow-800",
      "Low": "bg-green-100 text-green-800"
    };
    return colors[severity as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status: string) => {
    const colors = {
      "Under Review": "bg-blue-100 text-blue-800",
      "In Progress": "bg-yellow-100 text-yellow-800",
      "Resolved": "bg-green-100 text-green-800",
      "Completed": "bg-green-100 text-green-800",
      "Pending": "bg-gray-100 text-gray-800"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Resolved":
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "In Progress":
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
            {project.sector} • {project.dealSize} • Risk Analysis
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.overallRiskScore}/10</div>
            <p className="text-xs text-muted-foreground">Overall assessment</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Risks</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.totalRisks}</div>
            <p className="text-xs text-muted-foreground">Identified issues</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{project.highRisks}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mitigation</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.mitigationProgress}%</div>
            <p className="text-xs text-muted-foreground">Actions complete</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="risks">Risk Register</TabsTrigger>
          <TabsTrigger value="categories">Category Analysis</TabsTrigger>
          <TabsTrigger value="mitigation">Mitigation Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="risks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Risk Register</CardTitle>
              <CardDescription>
                Detailed view of all identified risks for {project.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRisks.map((risk) => (
                  <div key={risk.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(risk.status)}
                          <h4 className="font-semibold">{risk.title}</h4>
                          <Badge className={getSeverityColor(risk.severity)}>
                            {risk.severity} Risk
                          </Badge>
                          <Badge className={getStatusColor(risk.status)}>
                            {risk.status}
                          </Badge>
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Category:</span> {risk.category}
                        </div>
                        
                        <div className="text-sm">
                          {risk.description}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Impact:</span> {risk.impact}
                          </div>
                          <div>
                            <span className="font-medium">Probability:</span> {risk.probability}
                          </div>
                        </div>
                        
                        <div className="text-sm">
                          <span className="font-medium">Mitigation:</span> {risk.mitigation}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Assignee: {risk.assignee}</span>
                          <span>Identified: {risk.dateIdentified}</span>
                          <span>Target: {risk.targetResolution}</span>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            {risk.comments} comments
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Comment
                        </Button>
                        <Button variant="outline" size="sm">
                          Update Status
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Risk by Category</CardTitle>
              <CardDescription>
                Risk distribution across different due diligence categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskCategories.map((category) => (
                  <div key={category.name} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold">{category.name}</h4>
                      <div className="text-sm text-muted-foreground">
                        Total: {category.high + category.medium + category.low + category.resolved}
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-lg font-bold text-red-600">{category.high}</div>
                        <div className="text-muted-foreground">High</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-yellow-600">{category.medium}</div>
                        <div className="text-muted-foreground">Medium</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{category.low}</div>
                        <div className="text-muted-foreground">Low</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-600">{category.resolved}</div>
                        <div className="text-muted-foreground">Resolved</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mitigation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mitigation Actions</CardTitle>
              <CardDescription>
                Status of risk mitigation strategies and action plans
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mitigationActions.map((action) => (
                  <div key={action.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(action.status)}
                          <h4 className="font-semibold">{action.title}</h4>
                          <Badge className={getStatusColor(action.status)}>
                            {action.status}
                          </Badge>
                        </div>
                        
                        <div className="text-sm">
                          {action.description}
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{action.progress}%</span>
                          </div>
                          <Progress value={action.progress} className="h-2" />
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Assignee: {action.assignee}</span>
                          <span>Due: {action.dueDate}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Update Progress
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

      <div className="flex gap-4">
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Generate Risk Report
        </Button>
        <Button variant="outline">
          Export to PDF
        </Button>
      </div>
    </div>
  );
}
