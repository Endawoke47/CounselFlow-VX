
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Download, Copy, GitBranch, FileText, Users, Clock } from "lucide-react";

interface TemplateDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: any;
}

export function TemplateDetailModal({ open, onOpenChange, template }: TemplateDetailModalProps) {
  if (!template) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Draft": return "bg-yellow-100 text-yellow-800";
      case "Under Review": return "bg-blue-100 text-blue-800";
      case "Archived": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl">{template.title}</DialogTitle>
              <DialogDescription className="mt-2">
                {template.type} • {template.jurisdiction} • Version {template.version}
              </DialogDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button variant="outline" size="sm">
                <Copy className="h-4 w-4 mr-1" />
                Duplicate
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Template Content</TabsTrigger>
            <TabsTrigger value="versions">Version History</TabsTrigger>
            <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Template Metadata */}
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Template Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Type:</span>
                      <span>{template.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Version:</span>
                      <Badge variant="outline">{template.version}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Status:</span>
                      <Badge className={getStatusColor(template.status)}>
                        {template.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Jurisdiction:</span>
                      <span>{template.jurisdiction}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Entity:</span>
                      <span>{template.entity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Author:</span>
                      <span>{template.author}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Usage Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>Total Uses: {template.usageCount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>Access Level: {template.accessLevel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Last Updated: {template.lastUpdated}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GitBranch className="h-4 w-4" />
                      <span>Version: {template.version}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Template Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Template Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This {template.type} template is designed for use in {template.jurisdiction} 
                  and has been used {template.usageCount} times across various projects. 
                  The template includes standard clauses and provisions that comply with local 
                  regulations and organizational policies.
                </p>
              </CardContent>
            </Card>

            {/* Key Clauses */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Key Clauses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm">Liability Limitation</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Standard liability limitation clause with industry-standard caps
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm">Termination Rights</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Comprehensive termination provisions with notice periods
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm">Intellectual Property</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      IP assignment and licensing provisions
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Template Content</CardTitle>
                <CardDescription>
                  Full template content with placeholder fields and clauses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none text-sm p-4 bg-muted rounded-md max-h-96 overflow-y-auto">
                  <h3>[TEMPLATE TITLE]</h3>
                  <p>
                    This {template.type} ("Agreement") is entered into on [DATE] between 
                    [COMPANY NAME], a company incorporated in {template.jurisdiction} 
                    ("Company") and [COUNTERPARTY NAME] ("Counterparty").
                  </p>
                  
                  <h4>1. DEFINITIONS</h4>
                  <p>
                    In this Agreement, the following terms shall have the meanings set forth below:
                  </p>
                  <ul>
                    <li>[TERM 1]: [DEFINITION]</li>
                    <li>[TERM 2]: [DEFINITION]</li>
                    <li>[TERM 3]: [DEFINITION]</li>
                  </ul>

                  <h4>2. SCOPE OF SERVICES</h4>
                  <p>
                    The Company shall provide the following services: [DESCRIPTION OF SERVICES]
                  </p>

                  <h4>3. PAYMENT TERMS</h4>
                  <p>
                    Payment shall be made according to the following schedule: [PAYMENT TERMS]
                  </p>

                  <h4>4. LIMITATION OF LIABILITY</h4>
                  <p>
                    IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
                    SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES...
                  </p>

                  <p className="text-xs text-muted-foreground mt-4">
                    [Additional clauses and provisions would continue here...]
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="versions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Version History</CardTitle>
                <CardDescription>
                  Track changes and updates to this template over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 border rounded-lg">
                    <Badge className="bg-green-100 text-green-800">Current</Badge>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">v{template.version}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{template.lastUpdated}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Updated liability clauses and added new termination provisions
                      </p>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>

                  <div className="flex items-center space-x-4 p-3 border rounded-lg">
                    <Badge variant="outline">v2.0</Badge>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">v2.0</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">2024-01-01</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Major revision with updated compliance requirements
                      </p>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>

                  <div className="flex items-center space-x-4 p-3 border rounded-lg">
                    <Badge variant="outline">v1.5</Badge>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">v1.5</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">2023-12-15</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Minor updates to payment terms and definitions
                      </p>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usage" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Usage Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">This Month</span>
                      <Badge>12 uses</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Last Month</span>
                      <Badge variant="outline">18 uses</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total</span>
                      <Badge variant="outline">{template.usageCount} uses</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Recent Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Sarah Wilson</span>
                      <span className="text-muted-foreground">• 3 days ago</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Michael Chen</span>
                      <span className="text-muted-foreground">• 5 days ago</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Emily Davis</span>
                      <span className="text-muted-foreground">• 1 week ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Usage by Entity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted rounded">
                    <span className="text-sm">TechCorp UK Ltd</span>
                    <Badge>28 uses</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded">
                    <span className="text-sm">TechCorp GmbH</span>
                    <Badge>15 uses</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded">
                    <span className="text-sm">TechCorp Inc</span>
                    <Badge>5 uses</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
