
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Link, Clock, Users } from "lucide-react";

interface PolicyDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  policy: any;
}

export function PolicyDetailModal({ open, onOpenChange, policy }: PolicyDetailModalProps) {
  if (!policy) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Draft": return "bg-yellow-100 text-yellow-800";
      case "In Review": return "bg-blue-100 text-blue-800";
      case "Retired": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const mockVersions = [
    { version: "2.1", status: "Active", createdBy: "Sarah Johnson", date: "2024-01-10", summary: "Updated data retention periods" },
    { version: "2.0", status: "Archived", createdBy: "Sarah Johnson", date: "2023-11-15", summary: "Major revision for GDPR compliance" },
    { version: "1.5", status: "Archived", createdBy: "John Smith", date: "2023-06-20", summary: "Minor clarifications" }
  ];

  const mockLinkedRecords = [
    { type: "Contract", name: "Customer Data Processing Agreement", id: "CTR-001" },
    { type: "License", name: "Data Protection Registration", id: "LIC-005" },
    { type: "Matter", name: "GDPR Compliance Review", id: "MAT-012" }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl">{policy.title}</DialogTitle>
              <div className="flex items-center space-x-4 mt-2">
                <Badge className={getStatusColor(policy.status)}>
                  {policy.status}
                </Badge>
                <span className="text-sm text-muted-foreground">Version {policy.version}</span>
                <span className="text-sm text-muted-foreground">Last updated: {policy.lastUpdated}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">Edit</Button>
              <Button variant="outline">New Version</Button>
              <Button>Download</Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="versions">Version History</TabsTrigger>
            <TabsTrigger value="links">Linked Records</TabsTrigger>
            <TabsTrigger value="approval">Approval Workflow</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Policy Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Entity</label>
                    <p>{policy.entity}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Jurisdiction</label>
                    <p>{policy.jurisdiction}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Policy Type</label>
                    <p>{policy.type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Effective Date</label>
                    <p>{policy.effectiveDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Owner</label>
                    <p>{policy.owner}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Policy Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    This policy outlines the organization's approach to data protection and privacy compliance, 
                    ensuring adherence to GDPR and other applicable data protection regulations. It covers data 
                    collection, processing, storage, and deletion procedures.
                  </p>
                  <div className="mt-4">
                    <label className="text-sm font-medium text-muted-foreground">Tags</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <Badge variant="outline">GDPR</Badge>
                      <Badge variant="outline">Data Protection</Badge>
                      <Badge variant="outline">Privacy</Badge>
                      <Badge variant="outline">Compliance</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Policy Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Policy document content would be displayed here. This could be rendered HTML content,
                    PDF viewer, or formatted text depending on the document type.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="versions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Version History
                </CardTitle>
                <CardDescription>Track all versions and changes to this policy</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Version</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Summary</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockVersions.map((version) => (
                      <TableRow key={version.version}>
                        <TableCell className="font-medium">{version.version}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(version.status)}>
                            {version.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{version.createdBy}</TableCell>
                        <TableCell>{version.date}</TableCell>
                        <TableCell>{version.summary}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">View</Button>
                            <Button variant="outline" size="sm">Compare</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="links" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Link className="h-5 w-5 mr-2" />
                  Linked Records
                </CardTitle>
                <CardDescription>Other system records connected to this policy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockLinkedRecords.map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{record.name}</p>
                        <p className="text-sm text-muted-foreground">{record.type} • {record.id}</p>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Link className="h-4 w-4 mr-2" />
                  Add Link
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approval" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Approval Workflow
                </CardTitle>
                <CardDescription>Manage approval process for this policy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Legal Review</p>
                      <p className="text-sm text-muted-foreground">Sarah Johnson • Approved on Jan 8, 2024</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Approved</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Compliance Review</p>
                      <p className="text-sm text-muted-foreground">Michael Schmidt • Approved on Jan 9, 2024</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Approved</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Final Approval</p>
                      <p className="text-sm text-muted-foreground">Jennifer Chen • Approved on Jan 10, 2024</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Approved</Badge>
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
