
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Star, MapPin, Phone, Mail, Globe, Building, Calendar, DollarSign, FileText, TrendingUp } from "lucide-react";

interface VendorDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vendor: {
    id: string;
    name: string;
    type: string;
    status: string;
    rating: number;
    location: string;
    specialties: string[];
    activeMatters: number;
    totalSpend: number;
    lastEngagement: string;
    contact: string;
    riskLevel: string;
  } | null;
}

export function VendorDetailModal({ open, onOpenChange, vendor }: VendorDetailModalProps) {
  if (!vendor) return null;

  const performanceMetrics = [
    { metric: "Quality", score: 4.8, benchmark: 4.5 },
    { metric: "Responsiveness", score: 4.6, benchmark: 4.3 },
    { metric: "Cost Effectiveness", score: 4.2, benchmark: 4.1 },
    { metric: "Communication", score: 4.9, benchmark: 4.4 }
  ];

  const recentMatters = [
    {
      id: "MAT-2024-001",
      title: "M&A Transaction - TechCorp",
      status: "Active",
      startDate: "2024-03-01",
      budget: 50000,
      spent: 35000
    },
    {
      id: "MAT-2024-002",
      title: "Employment Dispute",
      status: "Completed",
      startDate: "2024-02-15",
      budget: 25000,
      spent: 23500
    },
    {
      id: "MAT-2024-003",
      title: "Regulatory Compliance Review",
      status: "Active",
      startDate: "2024-02-01",
      budget: 40000,
      spent: 28000
    }
  ];

  const spendHistory = [
    { period: "Q1 2024", amount: 124000 },
    { period: "Q4 2023", amount: 98000 },
    { period: "Q3 2023", amount: 156000 },
    { period: "Q2 2023", amount: 89000 }
  ];

  const contractDetails = [
    { document: "Master Services Agreement", status: "Active", expires: "2024-12-31" },
    { document: "Data Processing Agreement", status: "Active", expires: "2024-12-31" },
    { document: "Rate Schedule", status: "Under Review", expires: "2024-06-30" }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Building className="h-6 w-6" />
            {vendor.name}
          </DialogTitle>
          <DialogDescription>
            Comprehensive vendor profile and performance overview
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="matters">Matters</TabsTrigger>
            <TabsTrigger value="spend">Spend</TabsTrigger>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Vendor Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Type:</span>
                    <span>{vendor.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Location:</span>
                    <span>{vendor.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Contact:</span>
                    <span>{vendor.contact}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Last Engagement:</span>
                    <span>{vendor.lastEngagement}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Status:</span>
                    <Badge variant={vendor.status === "Active" ? "default" : "secondary"}>
                      {vendor.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Risk Level:</span>
                    <Badge variant={vendor.riskLevel === "Low" ? "default" : vendor.riskLevel === "Medium" ? "secondary" : "destructive"}>
                      {vendor.riskLevel}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Overall Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{vendor.rating}/5</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Active Matters</span>
                    <span className="font-medium">{vendor.activeMatters}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>YTD Spend</span>
                    <span className="font-medium">${vendor.totalSpend.toLocaleString()}</span>
                  </div>
                  <div className="space-y-2">
                    <span className="font-medium">Specialties</span>
                    <div className="flex flex-wrap gap-1">
                      {vendor.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                View Contracts
              </Button>
              <Button variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Send Message
              </Button>
              <Button variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Schedule Call
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Current performance vs. benchmark scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceMetrics.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{metric.metric}</span>
                        <span className="text-sm">{metric.score}/5 (vs {metric.benchmark})</span>
                      </div>
                      <Progress value={(metric.score / 5) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="matters" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Matters</CardTitle>
                <CardDescription>Current and recently completed matters</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Matter ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Spent</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentMatters.map((matter) => (
                      <TableRow key={matter.id}>
                        <TableCell className="font-medium">{matter.id}</TableCell>
                        <TableCell>{matter.title}</TableCell>
                        <TableCell>
                          <Badge variant={matter.status === "Active" ? "default" : "secondary"}>
                            {matter.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{matter.startDate}</TableCell>
                        <TableCell>${matter.budget.toLocaleString()}</TableCell>
                        <TableCell>${matter.spent.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="spend" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Spend History</CardTitle>
                <CardDescription>Quarterly spend analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {spendHistory.map((period, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded">
                      <span className="font-medium">{period.period}</span>
                      <span className="text-lg font-semibold">${period.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contracts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contract Details</CardTitle>
                <CardDescription>Active contracts and agreements</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Expires</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contractDetails.map((contract, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{contract.document}</TableCell>
                        <TableCell>
                          <Badge variant={contract.status === "Active" ? "default" : "secondary"}>
                            {contract.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{contract.expires}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <FileText className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
