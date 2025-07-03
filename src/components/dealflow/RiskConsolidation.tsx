
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Shield, TrendingDown, FileText, MessageSquare, ChevronRight } from "lucide-react";
import { ProjectRiskDetail } from "./ProjectRiskDetail";

const mockProjects = [
  {
    id: "1",
    name: "TechCorp Acquisition",
    sector: "Technology",
    dealSize: "$50M",
    status: "Due Diligence",
    totalRisks: 14,
    highRisks: 3,
    mediumRisks: 7,
    lowRisks: 4,
    resolvedRisks: 2,
    overallRiskScore: 6.2,
    riskTrend: "stable",
    lastRiskUpdate: "2 hours ago",
    mitigationProgress: 57
  },
  {
    id: "2",
    name: "Healthcare Holdings",
    sector: "Healthcare",
    dealSize: "$125M",
    status: "Due Diligence",
    totalRisks: 18,
    highRisks: 5,
    mediumRisks: 8,
    lowRisks: 3,
    resolvedRisks: 4,
    overallRiskScore: 7.8,
    riskTrend: "increasing",
    lastRiskUpdate: "1 day ago",
    mitigationProgress: 33
  },
  {
    id: "3",
    name: "Manufacturing Co",
    sector: "Manufacturing",
    dealSize: "$80M",
    status: "Due Diligence",
    totalRisks: 10,
    highRisks: 2,
    mediumRisks: 4,
    lowRisks: 2,
    resolvedRisks: 6,
    overallRiskScore: 4.1,
    riskTrend: "decreasing",
    lastRiskUpdate: "30 minutes ago",
    mitigationProgress: 80
  }
];

export function RiskConsolidation() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  if (selectedProject) {
    const project = mockProjects.find(p => p.id === selectedProject);
    if (project) {
      return (
        <ProjectRiskDetail 
          project={project} 
          onBack={() => setSelectedProject(null)} 
        />
      );
    }
  }

  const totalRisks = mockProjects.reduce((sum, project) => sum + project.totalRisks, 0);
  const totalHighRisks = mockProjects.reduce((sum, project) => sum + project.highRisks, 0);
  const totalMediumRisks = mockProjects.reduce((sum, project) => sum + project.mediumRisks, 0);
  const totalLowRisks = mockProjects.reduce((sum, project) => sum + project.lowRisks, 0);

  const getRiskScoreColor = (score: number) => {
    if (score >= 7) return "text-red-600";
    if (score >= 5) return "text-yellow-600";
    return "text-green-600";
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "increasing") return "↗️";
    if (trend === "decreasing") return "↘️";
    return "→";
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Risks</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRisks}</div>
            <p className="text-xs text-muted-foreground">Across all projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{totalHighRisks}</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medium Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{totalMediumRisks}</div>
            <p className="text-xs text-muted-foreground">Monitor closely</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalLowRisks}</div>
            <p className="text-xs text-muted-foreground">Standard monitoring</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Risk Analysis Overview</CardTitle>
          <CardDescription>
            Click on any project to view detailed risk analysis and mitigation strategies
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
                      <div className="flex items-center gap-1 text-sm">
                        <span>{getTrendIcon(project.riskTrend)}</span>
                        <span className="capitalize">{project.riskTrend}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Risk Score</div>
                        <div className={`text-2xl font-bold ${getRiskScoreColor(project.overallRiskScore)}`}>
                          {project.overallRiskScore}/10
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Risk Breakdown</div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-red-600">{project.highRisks} High</span>
                          <span className="text-yellow-600">{project.mediumRisks} Medium</span>
                          <span className="text-green-600">{project.lowRisks} Low</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Mitigation Progress</div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${project.mitigationProgress}%` }}
                            />
                          </div>
                          <span className="text-sm">{project.mitigationProgress}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <span>Total Risks: {project.totalRisks}</span>
                      <span>Resolved: {project.resolvedRisks}</span>
                      <span>Last Update: {project.lastRiskUpdate}</span>
                    </div>
                  </div>
                  
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Generate Portfolio Risk Report
        </Button>
        <Button variant="outline">
          Export Summary
        </Button>
      </div>
    </div>
  );
}
