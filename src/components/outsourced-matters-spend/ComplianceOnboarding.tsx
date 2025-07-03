
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, AlertTriangle, FileText, Shield, Users, Building } from "lucide-react";

export function ComplianceOnboarding() {
  const [activeTab, setActiveTab] = useState("onboarding");

  const onboardingTasks = [
    {
      vendor: "Regional Law Associates",
      status: "In Progress",
      progress: 75,
      completedSteps: 6,
      totalSteps: 8,
      startDate: "2024-03-01",
      expectedCompletion: "2024-03-25",
      assignedTo: "Sarah Johnson",
      riskLevel: "Medium"
    },
    {
      vendor: "International Legal Partners",
      status: "Pending Review",
      progress: 95,
      completedSteps: 19,
      totalSteps: 20,
      startDate: "2024-02-15",
      expectedCompletion: "2024-03-15",
      assignedTo: "Michael Brown",
      riskLevel: "Low"
    },
    {
      vendor: "Boutique Litigation Firm",
      status: "Completed",
      progress: 100,
      completedSteps: 12,
      totalSteps: 12,
      startDate: "2024-01-10",
      expectedCompletion: "2024-02-10",
      assignedTo: "Emma Davis",
      riskLevel: "Low"
    }
  ];

  const complianceRequirements = [
    {
      category: "Legal Documentation",
      requirements: [
        { name: "Engagement Letter", status: "Complete", dueDate: "2024-03-10" },
        { name: "Data Processing Agreement", status: "Pending", dueDate: "2024-03-15" },
        { name: "Master Services Agreement", status: "Complete", dueDate: "2024-03-05" },
        { name: "Liability Insurance Certificate", status: "In Review", dueDate: "2024-03-20" }
      ]
    },
    {
      category: "Security & Privacy",
      requirements: [
        { name: "Security Assessment", status: "Complete", dueDate: "2024-03-12" },
        { name: "Privacy Policy Review", status: "Pending", dueDate: "2024-03-18" },
        { name: "Data Breach Response Plan", status: "Complete", dueDate: "2024-03-08" },
        { name: "Access Control Setup", status: "In Progress", dueDate: "2024-03-22" }
      ]
    },
    {
      category: "Financial & Risk",
      requirements: [
        { name: "Financial Stability Check", status: "Complete", dueDate: "2024-03-01" },
        { name: "Conflicts of Interest Review", status: "Complete", dueDate: "2024-03-03" },
        { name: "Rate Schedule Agreement", status: "Pending", dueDate: "2024-03-25" },
        { name: "Budget Framework Setup", status: "In Progress", dueDate: "2024-03-30" }
      ]
    }
  ];

  const dueDiligenceChecklist = [
    {
      area: "Business Information",
      items: [
        "Company registration and licensing",
        "Professional certifications and memberships",
        "Key personnel background checks",
        "Business references verification"
      ],
      completionRate: 100
    },
    {
      area: "Financial Verification",
      items: [
        "Financial statements review",
        "Credit rating assessment",
        "Professional indemnity insurance",
        "Payment terms negotiation"
      ],
      completionRate: 85
    },
    {
      area: "Technical Capabilities",
      items: [
        "Practice area expertise verification",
        "Technology infrastructure assessment",
        "Case management system compatibility",
        "Reporting capabilities evaluation"
      ],
      completionRate: 90
    },
    {
      area: "Compliance & Risk",
      items: [
        "Regulatory compliance verification",
        "Data protection compliance",
        "Conflicts of interest screening",
        "Risk management procedures"
      ],
      completionRate: 75
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "complete":
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "in progress":
      case "in review":
        return <AlertTriangle className="h-4 w-4 text-blue-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "complete":
      case "completed":
        return "default";
      case "pending":
        return "secondary";
      case "in progress":
      case "in review":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Compliance & Onboarding</h2>
          <p className="text-muted-foreground">Manage vendor onboarding processes and compliance requirements</p>
        </div>
        <Button>
          <Building className="h-4 w-4 mr-2" />
          Start New Onboarding
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="onboarding">Onboarding Status</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="duediligence">Due Diligence</TabsTrigger>
        </TabsList>

        <TabsContent value="onboarding" className="space-y-6">
          {/* Onboarding Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Onboardings</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">2 completing this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Completion Time</CardTitle>
                <Clock className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28 days</div>
                <p className="text-xs text-muted-foreground">-5 days improvement</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed YTD</CardTitle>
                <CheckCircle className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+4 vs last year</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
                <Shield className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94%</div>
                <p className="text-xs text-muted-foreground">+2% this quarter</p>
              </CardContent>
            </Card>
          </div>

          {/* Active Onboarding */}
          <Card>
            <CardHeader>
              <CardTitle>Active Onboarding Projects</CardTitle>
              <CardDescription>Current vendor onboarding initiatives and their progress</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Expected Completion</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {onboardingTasks.map((task, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{task.vendor}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Progress value={task.progress} className="h-2" />
                          <div className="text-xs text-muted-foreground">
                            {task.completedSteps}/{task.totalSteps} steps
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{task.assignedTo}</TableCell>
                      <TableCell>{task.expectedCompletion}</TableCell>
                      <TableCell>
                        <Badge variant={task.riskLevel === "High" ? "destructive" : task.riskLevel === "Medium" ? "secondary" : "outline"}>
                          {task.riskLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button size="sm">
                            Update
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requirements" className="space-y-6">
          {/* Compliance Requirements */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {complianceRequirements.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                  <CardDescription>
                    {category.requirements.filter(r => r.status === "Complete").length} of {category.requirements.length} complete
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.requirements.map((req, reqIndex) => (
                      <div key={reqIndex} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(req.status)}
                          <span className="text-sm">{req.name}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {req.dueDate}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="duediligence" className="space-y-6">
          {/* Due Diligence Checklist */}
          <Card>
            <CardHeader>
              <CardTitle>Due Diligence Checklist</CardTitle>
              <CardDescription>Comprehensive vendor assessment framework</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {dueDiligenceChecklist.map((area, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{area.area}</h4>
                      <Badge variant={area.completionRate === 100 ? "default" : "secondary"}>
                        {area.completionRate}%
                      </Badge>
                    </div>
                    <Progress value={area.completionRate} className="h-2" />
                    <div className="space-y-2">
                      {area.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span>{item}</span>
                        </div>
                      ))}
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
