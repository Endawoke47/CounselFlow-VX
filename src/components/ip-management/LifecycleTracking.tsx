
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  FileText,
  DollarSign,
  ArrowRight
} from "lucide-react";

export function LifecycleTracking() {
  const lifecycleStages = [
    {
      stage: "Conception",
      description: "Idea generation and initial documentation",
      color: "bg-blue-500",
      completed: true
    },
    {
      stage: "Prior Art Search",
      description: "Research existing patents and publications",
      color: "bg-blue-500",
      completed: true
    },
    {
      stage: "Application Filing",
      description: "Submit patent application to USPTO",
      color: "bg-blue-500",
      completed: true
    },
    {
      stage: "Examination",
      description: "Patent office review and examination",
      color: "bg-yellow-500",
      completed: false,
      current: true
    },
    {
      stage: "Grant/Registration",
      description: "Patent granted and published",
      color: "bg-gray-300",
      completed: false
    },
    {
      stage: "Maintenance",
      description: "Ongoing renewals and maintenance fees",
      color: "bg-gray-300",
      completed: false
    }
  ];

  const activeAssets = [
    {
      id: "PAT-001",
      title: "ML Data Processing Algorithm",
      currentStage: "Maintenance",
      nextMilestone: "Renewal Payment",
      dueDate: "2024-03-15",
      daysRemaining: 45,
      estimatedCost: "$12,500",
      riskLevel: "Low"
    },
    {
      id: "PAT-023",
      title: "Contract Analysis System",
      currentStage: "Examination",
      nextMilestone: "Office Action Response",
      dueDate: "2024-02-28",
      daysRemaining: 12,
      estimatedCost: "$8,500",
      riskLevel: "Medium"
    },
    {
      id: "TM-045",
      title: "CounselFlow Brand",
      currentStage: "Maintenance",
      nextMilestone: "Renewal Filing",
      dueDate: "2024-03-22",
      daysRemaining: 52,
      estimatedCost: "$3,200",
      riskLevel: "Low"
    },
    {
      id: "PAT-067",
      title: "Risk Assessment Framework",
      currentStage: "Prior Art Search",
      nextMilestone: "Application Filing",
      dueDate: "2024-02-20",
      daysRemaining: 4,
      estimatedCost: "$15,000",
      riskLevel: "High"
    }
  ];

  const upcomingMilestones = [
    {
      date: "2024-02-16",
      type: "Deadline",
      description: "Office Action Response - PAT-023",
      priority: "High"
    },
    {
      date: "2024-02-20",
      type: "Filing",
      description: "Patent Application - PAT-067",
      priority: "Critical"
    },
    {
      date: "2024-02-25",
      type: "Review",
      description: "Trademark Search Results - TM-078",
      priority: "Medium"
    },
    {
      date: "2024-03-01",
      type: "Payment",
      description: "Maintenance Fee - PAT-012",
      priority: "High"
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getDaysRemainingColor = (days: number) => {
    if (days <= 7) return "text-red-600";
    if (days <= 30) return "text-orange-600";
    return "text-green-600";
  };

  return (
    <div className="space-y-6">
      {/* Lifecycle Overview */}
      <Card>
        <CardHeader>
          <CardTitle>IP Lifecycle Process</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            {lifecycleStages.map((stage, index) => (
              <div key={stage.stage} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-4 h-4 rounded-full ${stage.color} ${stage.current ? 'ring-4 ring-blue-200' : ''}`}
                  />
                  <div className="text-center mt-2 max-w-24">
                    <div className="text-xs font-medium">{stage.stage}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {stage.description}
                    </div>
                  </div>
                </div>
                {index < lifecycleStages.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-muted-foreground mx-4" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Assets Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>Active Assets Lifecycle</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeAssets.map((asset) => (
              <div key={asset.id} className="border rounded-lg p-4 hover:bg-muted/50">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{asset.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{asset.id}</span>
                      <span>•</span>
                      <span>Current: {asset.currentStage}</span>
                    </div>
                  </div>
                  <Badge className={getRiskColor(asset.riskLevel)}>
                    {asset.riskLevel} Risk
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Next Milestone</div>
                    <div className="font-medium">{asset.nextMilestone}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Due Date</div>
                    <div className="font-medium">{asset.dueDate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Days Remaining</div>
                    <div className={`font-medium ${getDaysRemainingColor(asset.daysRemaining)}`}>
                      {asset.daysRemaining} days
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Est. Cost</div>
                    <div className="font-medium">{asset.estimatedCost}</div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-3">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Milestones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingMilestones.map((milestone, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={getPriorityColor(milestone.priority)}>
                        {milestone.priority}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {milestone.type}
                      </span>
                    </div>
                    <div className="font-medium text-sm">{milestone.description}</div>
                    <div className="text-xs text-muted-foreground">{milestone.date}</div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Clock className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cost Tracking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Cost Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground">Q1 2024 Budget</div>
                <div className="text-2xl font-bold">$125,000</div>
                <div className="text-sm text-green-600">15% under budget</div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Filing Fees</span>
                  <span className="text-sm font-medium">$45,000</span>
                </div>
                <Progress value={36} className="h-2" />
                
                <div className="flex justify-between">
                  <span className="text-sm">Maintenance Fees</span>
                  <span className="text-sm font-medium">$28,500</span>
                </div>
                <Progress value={23} className="h-2" />
                
                <div className="flex justify-between">
                  <span className="text-sm">Attorney Fees</span>
                  <span className="text-sm font-medium">$32,000</span>
                </div>
                <Progress value={26} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
