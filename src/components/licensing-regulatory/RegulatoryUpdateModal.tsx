
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, User, AlertTriangle, FileText, Plus } from "lucide-react";

interface RegulatoryUpdateModalProps {
  update: any;
  onOpenChange: (update: any) => void;
}

export function RegulatoryUpdateModal({ update, onOpenChange }: RegulatoryUpdateModalProps) {
  if (!update) return null;

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Regulation":
        return <Badge className="bg-blue-100 text-blue-800">Regulation</Badge>;
      case "Proposed Regulation":
        return <Badge className="bg-orange-100 text-orange-800">Proposed</Badge>;
      case "Case Law":
        return <Badge className="bg-purple-100 text-purple-800">Case Law</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "High":
        return <Badge className="bg-red-100 text-red-800">High Risk</Badge>;
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>;
      case "Low":
        return <Badge className="bg-green-100 text-green-800">Low Risk</Badge>;
      default:
        return <Badge variant="outline">{risk}</Badge>;
    }
  };

  return (
    <Dialog open={!!update} onOpenChange={() => onOpenChange(null)}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">{update.title}</DialogTitle>
            <div className="flex gap-2">
              {getTypeBadge(update.type)}
              {getRiskBadge(update.riskLevel)}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Update Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Jurisdiction</p>
                <p className="font-medium">{update.jurisdiction}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Effective Date</p>
                <p className="font-medium">{update.effectiveDate}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Assigned Reviewer</p>
                <p className="font-medium">{update.assignedReviewer}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Source</p>
                <p className="font-medium">{update.source}</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="summary" className="space-y-4">
            <TabsList>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="impact">Impact Assessment</TabsTrigger>
              <TabsTrigger value="actions">Actions</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="summary">
              <Card>
                <CardHeader>
                  <CardTitle>Regulatory Update Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Description</label>
                    <p className="mt-1">{update.summary}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Status</label>
                      <p className="mt-1">{update.status}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Risk Level</label>
                      <p className="mt-1">{update.riskLevel}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="impact">
              <Card>
                <CardHeader>
                  <CardTitle>Impact Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                        <span className="font-medium">Business Functions Affected</span>
                      </div>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        <li>Legal Department - Policy updates required</li>
                        <li>Compliance - Process review needed</li>
                        <li>Data Processing - New documentation standards</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Timeline</span>
                      </div>
                      <p className="text-sm">Implementation deadline: {update.effectiveDate}</p>
                      <p className="text-sm text-muted-foreground">90 days to complete all required actions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="actions">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Required Actions</CardTitle>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Action
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">Update data processing agreements</p>
                        <p className="text-sm text-muted-foreground">Due: 2024-07-15 • Assigned to: Sarah Johnson</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">Conduct compliance training</p>
                        <p className="text-sm text-muted-foreground">Due: 2024-07-30 • Assigned to: Michael Chen</p>
                      </div>
                      <Badge variant="outline">Not Started</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Related Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4" />
                        <div>
                          <p className="font-medium">Official Regulation Text</p>
                          <p className="text-sm text-muted-foreground">EU-AI-Act-2024.pdf</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Download</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4" />
                        <div>
                          <p className="font-medium">Implementation Guidelines</p>
                          <p className="text-sm text-muted-foreground">AI-Act-Guidelines.pdf</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Download</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
