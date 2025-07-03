
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, 
  Calendar, 
  DollarSign, 
  User,
  FileText,
  Clock,
  AlertTriangle,
  TrendingUp,
  MapPin
} from "lucide-react";

interface IPAssetDetailModalProps {
  asset: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function IPAssetDetailModal({ asset, open, onOpenChange }: IPAssetDetailModalProps) {
  if (!asset) return null;

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Patent": return "bg-blue-100 text-blue-800";
      case "Trademark": return "bg-green-100 text-green-800";
      case "Copyright": return "bg-purple-100 text-purple-800";
      case "Trade Secret": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Expired": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl">{asset.title}</DialogTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getTypeColor(asset.type)}>
                  {asset.type}
                </Badge>
                <Badge className={getStatusColor(asset.status)}>
                  {asset.status}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {asset.id}
                </span>
              </div>
            </div>
            <Button variant="outline">
              Edit Asset
            </Button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="legal">Legal Details</TabsTrigger>
            <TabsTrigger value="commercial">Commercial</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Asset Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Inventor</div>
                      <div className="font-medium">{asset.inventor}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Assignee</div>
                      <div className="font-medium">{asset.assignee}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Jurisdiction</div>
                      <div className="font-medium">{asset.jurisdiction}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Filing Date</div>
                      <div className="font-medium">{asset.filingDate}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Financial Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Estimated Value</div>
                      <div className="font-medium text-green-600">{asset.value}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Annual Maintenance</div>
                      <div className="font-medium">{asset.maintenanceCost}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Revenue Generated</div>
                      <div className="font-medium">$125,000</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Next Renewal</div>
                      <div className="font-medium">{asset.renewalDue}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Asset Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This innovative machine learning algorithm provides advanced data processing capabilities 
                  for large-scale enterprise applications. The patent covers novel methods for optimizing 
                  computational efficiency while maintaining data integrity and security protocols.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="legal" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Legal Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Application Number</span>
                    <span className="text-sm font-medium">US16/789,123</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Grant Number</span>
                    <span className="text-sm font-medium">US11,234,567</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Priority Date</span>
                    <span className="text-sm font-medium">2023-02-10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Publication Date</span>
                    <span className="text-sm font-medium">2023-08-15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Grant Date</span>
                    <span className="text-sm font-medium">2024-01-20</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Expiry & Renewals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Expiry Date</span>
                    <span className="text-sm font-medium">{asset.expiryDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Years Remaining</span>
                    <span className="text-sm font-medium">19 years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Next Renewal</span>
                    <span className="text-sm font-medium text-orange-600">{asset.renewalDue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Renewal Fee</span>
                    <span className="text-sm font-medium">{asset.maintenanceCost}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Claims Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium">Independent Claims: </span>
                    <span className="text-sm">3</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Dependent Claims: </span>
                    <span className="text-sm">17</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Total Claims: </span>
                    <span className="text-sm">20</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="commercial" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$125,000</div>
                  <p className="text-xs text-muted-foreground">
                    Since commercialization
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Licenses</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">
                    Current licensing agreements
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">ROI</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">245%</div>
                  <p className="text-xs text-muted-foreground">
                    Return on investment
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Licensing Agreements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">TechGiant Corp</h4>
                        <p className="text-sm text-muted-foreground">Exclusive License - North America</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Revenue:</span> $75,000
                      </div>
                      <div>
                        <span className="text-muted-foreground">Term:</span> 5 years
                      </div>
                      <div>
                        <span className="text-muted-foreground">Royalty:</span> 5%
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">Innovation Labs</h4>
                        <p className="text-sm text-muted-foreground">Non-Exclusive License - Europe</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Revenue:</span> $50,000
                      </div>
                      <div>
                        <span className="text-muted-foreground">Term:</span> 3 years
                      </div>
                      <div>
                        <span className="text-muted-foreground">Royalty:</span> 3%
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Asset Documents</h3>
              <Button size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </div>
            
            <div className="space-y-3">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <div>
                        <h4 className="font-medium">Patent Application.pdf</h4>
                        <div className="text-sm text-muted-foreground">
                          3.2 MB • Uploaded on 2023-03-15
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-green-600" />
                      <div>
                        <h4 className="font-medium">Grant Certificate.pdf</h4>
                        <div className="text-sm text-muted-foreground">
                          1.8 MB • Uploaded on 2024-01-20
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-purple-600" />
                      <div>
                        <h4 className="font-medium">License Agreement - TechGiant.docx</h4>
                        <div className="text-sm text-muted-foreground">
                          456 KB • Uploaded on 2023-06-10
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
