
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Calendar, MapPin, User, FileText, AlertTriangle, Clock, Plus, Edit, Download } from "lucide-react";

interface LicenseDetailModalProps {
  license: any;
  onOpenChange: (license: any) => void;
}

export function LicenseDetailModal({ license, onOpenChange }: LicenseDetailModalProps) {
  if (!license) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Active</Badge>;
      case "Expiring":
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Expiring</Badge>;
      case "Overdue":
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRenewalProgress = () => {
    switch (license.renewalStatus) {
      case "Not Started": return 0;
      case "In Progress": return 40;
      case "Submitted": return 80;
      case "Completed": return 100;
      default: return 0;
    }
  };

  return (
    <Dialog open={!!license} onOpenChange={() => onOpenChange(null)}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">{license.title}</DialogTitle>
            <div className="flex gap-2">
              {getStatusBadge(license.status)}
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* License Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Jurisdiction</p>
                <p className="font-medium">{license.jurisdiction}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Expiry Date</p>
                <p className="font-medium">{license.expiryDate}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Owner</p>
                <p className="font-medium">{license.owner}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Regulator</p>
                <p className="font-medium">{license.regulator}</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="details" className="space-y-4">
            <TabsList>
              <TabsTrigger value="details">License Details</TabsTrigger>
              <TabsTrigger value="renewal">Renewal Process</TabsTrigger>
              <TabsTrigger value="compliance">Compliance History</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>License Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Entity</label>
                      <p className="mt-1">{license.entity}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">License Type</label>
                      <p className="mt-1">{license.type}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">License Number</label>
                      <p className="mt-1">FS-{license.id}-2024</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Issue Date</label>
                      <p className="mt-1">2021-12-15</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Key Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Annual regulatory returns
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Quarterly financial statements
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        Staff certification updates
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        Client money rules compliance
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="renewal">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Renewal Process</CardTitle>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Task
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Renewal Progress</span>
                      <span className="text-sm text-muted-foreground">{getRenewalProgress()}%</span>
                    </div>
                    <Progress value={getRenewalProgress()} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="font-medium">Submit application form</p>
                          <p className="text-sm text-muted-foreground">Completed on 2024-05-15</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Completed</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <div>
                          <p className="font-medium">Regulatory review</p>
                          <p className="text-sm text-muted-foreground">Expected completion: 2024-07-30</p>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        <div>
                          <p className="font-medium">Pay renewal fees</p>
                          <p className="text-sm text-muted-foreground">Due: 2024-08-15</p>
                        </div>
                      </div>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compliance">
              <Card>
                <CardHeader>
                  <CardTitle>Compliance History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="font-medium">Annual Return Filed</p>
                          <p className="text-sm text-muted-foreground">Filed on time - March 2024</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <div>
                          <p className="font-medium">Staff Certification Update</p>
                          <p className="text-sm text-muted-foreground">Minor delay - December 2023</p>
                        </div>
                      </div>
                      <Badge className="bg-orange-100 text-orange-800">Warning</Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <div>
                          <p className="font-medium">Quarterly Report</p>
                          <p className="text-sm text-muted-foreground">Late submission - September 2023</p>
                        </div>
                      </div>
                      <Badge className="bg-red-100 text-red-800">Breach</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>License Documents</CardTitle>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4" />
                        <div>
                          <p className="font-medium">Original License Certificate</p>
                          <p className="text-sm text-muted-foreground">license-certificate.pdf • 2.1 MB</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4" />
                        <div>
                          <p className="font-medium">Application Form 2024</p>
                          <p className="text-sm text-muted-foreground">renewal-application.pdf • 1.5 MB</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4" />
                        <div>
                          <p className="font-medium">Supporting Documents</p>
                          <p className="text-sm text-muted-foreground">supporting-docs.zip • 5.2 MB</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
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
