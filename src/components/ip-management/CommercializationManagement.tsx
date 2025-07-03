
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  DollarSign, 
  TrendingUp, 
  FileText, 
  Users,
  Calendar,
  Target,
  Briefcase,
  BarChart3
} from "lucide-react";

export function CommercializationManagement() {
  const revenueMetrics = [
    {
      title: "Total IP Revenue",
      value: "$2.3M",
      change: "+18% YoY",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Active Licenses",
      value: "12",
      change: "+3 this quarter",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Licensees",
      value: "8",
      change: "2 new partners",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "ROI",
      value: "324%",
      change: "+45% improvement",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const licenses = [
    {
      id: "LIC-001",
      licensee: "TechGiant Corp",
      asset: "ML Data Processing Algorithm",
      assetId: "PAT-001",
      type: "Exclusive License",
      territory: "North America",
      startDate: "2023-01-15",
      endDate: "2028-01-15",
      revenue: "$450,000",
      royaltyRate: "5%",
      status: "Active",
      nextPayment: "2024-03-15"
    },
    {
      id: "LIC-002",
      licensee: "Innovation Labs",
      asset: "Contract Analysis System",
      assetId: "PAT-023",
      type: "Non-Exclusive License",
      territory: "Europe",
      startDate: "2023-06-01",
      endDate: "2026-06-01",
      revenue: "$125,000",
      royaltyRate: "3%",
      status: "Active",
      nextPayment: "2024-02-28"
    },
    {
      id: "LIC-003",
      licensee: "StartupFlow Inc",
      asset: "CounselFlow Trademark",
      assetId: "TM-045",
      type: "Trademark License",
      territory: "Asia-Pacific",
      startDate: "2023-09-10",
      endDate: "2025-09-10",
      revenue: "$85,000",
      royaltyRate: "2%",
      status: "Under Review",
      nextPayment: "2024-02-20"
    }
  ];

  const commercializationOpportunities = [
    {
      id: "OPP-001",
      asset: "Risk Assessment Framework",
      assetId: "TS-156",
      opportunity: "SaaS Platform Integration",
      estimatedValue: "$680,000",
      marketSize: "Large",
      effort: "High",
      timeline: "12-18 months",
      stage: "Market Research"
    },
    {
      id: "OPP-002",
      asset: "Legal Documentation Templates",
      assetId: "CR-089",
      opportunity: "White-label Licensing",
      estimatedValue: "$320,000",
      marketSize: "Medium",
      effort: "Medium",
      timeline: "6-9 months",
      stage: "Partner Identification"
    },
    {
      id: "OPP-003",
      asset: "Automated Compliance Checker",
      assetId: "PAT-045",
      opportunity: "Joint Venture",
      estimatedValue: "$1,200,000",
      marketSize: "Large",
      effort: "High",
      timeline: "18-24 months",
      stage: "Concept Development"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Under Review": return "bg-yellow-100 text-yellow-800";
      case "Expired": return "bg-red-100 text-red-800";
      case "Pending": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Exclusive License": return "bg-purple-100 text-purple-800";
      case "Non-Exclusive License": return "bg-blue-100 text-blue-800";
      case "Trademark License": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getMarketSizeColor = (size: string) => {
    switch (size) {
      case "Large": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Small": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Revenue Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {revenueMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${metric.bgColor}`}>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{metric.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Licenses */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Active License Agreements
            </CardTitle>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              New License
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>License Details</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Territory</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Next Payment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {licenses.map((license) => (
                <TableRow key={license.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{license.licensee}</div>
                      <div className="text-sm text-muted-foreground">
                        {license.asset} ({license.assetId})
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {license.startDate} - {license.endDate}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(license.type)}>
                      {license.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{license.territory}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{license.revenue}</div>
                      <div className="text-sm text-muted-foreground">
                        {license.royaltyRate} royalty
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(license.status)}>
                      {license.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {license.nextPayment}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Commercialization Opportunities */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Commercialization Opportunities
            </CardTitle>
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Market Analysis
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {commercializationOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="border rounded-lg p-4 hover:bg-muted/50">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{opportunity.opportunity}</h4>
                    <div className="text-sm text-muted-foreground">
                      {opportunity.asset} ({opportunity.assetId})
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">{opportunity.estimatedValue}</div>
                    <div className="text-sm text-muted-foreground">Est. Value</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Market Size</div>
                    <Badge className={getMarketSizeColor(opportunity.marketSize)}>
                      {opportunity.marketSize}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Effort Required</div>
                    <Badge className={getEffortColor(opportunity.effort)}>
                      {opportunity.effort}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Timeline</div>
                    <div className="font-medium">{opportunity.timeline}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Current Stage</div>
                    <div className="font-medium">{opportunity.stage}</div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-3">
                  <Button variant="outline" size="sm">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Develop Business Case
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Revenue Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Asset Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Patents</span>
                  <span className="text-sm font-bold">$1.2M (52%)</span>
                </div>
                <Progress value={52} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Trademarks</span>
                  <span className="text-sm font-bold">$680K (30%)</span>
                </div>
                <Progress value={30} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Trade Secrets</span>
                  <span className="text-sm font-bold">$420K (18%)</span>
                </div>
                <Progress value={18} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-sm text-muted-foreground">License Renewal Rate</div>
                <div className="text-2xl font-bold text-green-600">94%</div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-sm text-muted-foreground">Avg. License Duration</div>
                <div className="text-2xl font-bold text-blue-600">3.2 years</div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="text-sm text-muted-foreground">Revenue per Asset</div>
                <div className="text-2xl font-bold text-purple-600">$15K</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
