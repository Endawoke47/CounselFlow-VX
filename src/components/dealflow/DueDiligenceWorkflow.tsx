
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, Clock, FileText, Brain, Users, ChevronRight } from "lucide-react";
import { ProjectDueDiligenceDetail } from "./ProjectDueDiligenceDetail";

const mockProjects = [
  {
    id: "1",
    name: "TechCorp Acquisition",
    sector: "Technology",
    dealSize: "$50M",
    status: "Due Diligence",
    overallProgress: 65,
    documentsReviewed: 12,
    totalDocuments: 18,
    aiRisks: 8,
    highRisks: 3,
    mediumRisks: 4,
    lowRisks: 1,
    teamMembers: 4,
    lastActivity: "2 hours ago"
  },
  {
    id: "2",
    name: "Healthcare Holdings",
    sector: "Healthcare", 
    dealSize: "$125M",
    status: "Due Diligence",
    overallProgress: 35,
    documentsReviewed: 6,
    totalDocuments: 22,
    aiRisks: 12,
    highRisks: 2,
    mediumRisks: 7,
    lowRisks: 3,
    teamMembers: 6,
    lastActivity: "1 day ago"
  },
  {
    id: "3",
    name: "Manufacturing Co",
    sector: "Manufacturing",
    dealSize: "$80M", 
    status: "Due Diligence",
    overallProgress: 85,
    documentsReviewed: 20,
    totalDocuments: 24,
    aiRisks: 5,
    highRisks: 1,
    mediumRisks: 2,
    lowRisks: 2,
    teamMembers: 5,
    lastActivity: "30 minutes ago"
  }
];

export function DueDiligenceWorkflow() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  if (selectedProject) {
    const project = mockProjects.find(p => p.id === selectedProject);
    if (project) {
      return (
        <ProjectDueDiligenceDetail 
          project={project} 
          onBack={() => setSelectedProject(null)} 
        />
      );
    }
  }

  const totalDocuments = mockProjects.reduce((sum, project) => sum + project.totalDocuments, 0);
  const totalReviewed = mockProjects.reduce((sum, project) => sum + project.documentsReviewed, 0);
  const totalAIRisks = mockProjects.reduce((sum, project) => sum + project.aiRisks, 0);
  const totalTeamMembers = mockProjects.reduce((sum, project) => sum + project.teamMembers, 0);

  const getRiskColor = (highRisks: number) => {
    if (highRisks >= 3) return "text-red-600";
    if (highRisks >= 1) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockProjects.length}</div>
            <p className="text-xs text-muted-foreground">In due diligence</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents Reviewed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReviewed}/{totalDocuments}</div>
            <p className="text-xs text-muted-foreground">{Math.round((totalReviewed/totalDocuments)*100)}% complete</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI-Flagged Risks</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAIRisks}</div>
            <p className="text-xs text-muted-foreground">Across all projects</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTeamMembers}</div>
            <p className="text-xs text-muted-foreground">Active reviewers</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Due Diligence Overview</CardTitle>
          <CardDescription>
            Click on any project to view detailed due diligence workflow and documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockProjects.map((project) => (
              <div 
                key={project.id} 
                className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                onClick={() => setSelectedProject(project.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold">{project.name}</h4>
                      <Badge variant="outline">{project.sector}</Badge>
                      <Badge variant="secondary">{project.dealSize}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Overall Progress</span>
                          <span>{project.overallProgress}%</span>
                        </div>
                        <Progress value={project.overallProgress} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Documents</span>
                          <span>{project.documentsReviewed}/{project.totalDocuments}</span>
                        </div>
                        <Progress value={(project.documentsReviewed/project.totalDocuments)*100} className="h-2" />
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Brain className="h-4 w-4 text-blue-600" />
                          <span>{project.aiRisks} AI risks</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <AlertTriangle className={`h-4 w-4 ${getRiskColor(project.highRisks)}`} />
                          <span className={getRiskColor(project.highRisks)}>
                            {project.highRisks} high risks
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <span>{project.teamMembers} team members</span>
                      <span>Last activity: {project.lastActivity}</span>
                    </div>
                  </div>
                  
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
