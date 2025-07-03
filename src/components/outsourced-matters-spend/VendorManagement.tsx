
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, Star, MapPin, Phone, Mail, FileText, AlertCircle } from "lucide-react";

export function VendorManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const vendors = [
    {
      id: "VEN-001",
      name: "Davis Polk & Wardwell",
      type: "Global Law Firm",
      status: "Active",
      rating: 4.8,
      location: "New York, US",
      specialties: ["M&A", "Securities", "Finance"],
      activeMatters: 8,
      totalSpend: 324000,
      lastEngagement: "2024-03-15",
      contact: "partner@davispolk.com",
      riskLevel: "Low"
    },
    {
      id: "VEN-002",
      name: "Clifford Chance",
      type: "International Firm",
      status: "Active",
      rating: 4.6,
      location: "London, UK",
      specialties: ["Banking", "Regulatory", "Disputes"],
      activeMatters: 12,
      totalSpend: 298000,
      lastEngagement: "2024-03-12",
      contact: "legal@cliffordchance.com",
      riskLevel: "Low"
    },
    {
      id: "VEN-003",
      name: "Baker McKenzie",
      type: "Global Network",
      status: "Active",
      rating: 4.5,
      location: "Multiple Locations",
      specialties: ["IP", "Employment", "Tax"],
      activeMatters: 15,
      totalSpend: 267000,
      lastEngagement: "2024-03-10",
      contact: "team@bakermckenzie.com",
      riskLevel: "Medium"
    },
    {
      id: "VEN-004",
      name: "Local Boutique Firm",
      type: "Boutique",
      status: "Pending Review",
      rating: 4.2,
      location: "Chicago, US",
      specialties: ["Litigation", "Employment"],
      activeMatters: 3,
      totalSpend: 45000,
      lastEngagement: "2024-02-28",
      contact: "info@boutiquefirm.com",
      riskLevel: "High"
    },
    {
      id: "VEN-005",
      name: "Regional Counsel Ltd",
      type: "Regional Firm",
      status: "Inactive",
      rating: 3.8,
      location: "Toronto, CA",
      specialties: ["Real Estate", "Corporate"],
      activeMatters: 0,
      totalSpend: 89000,
      lastEngagement: "2023-12-15",
      contact: "contact@regionalcounsel.ca",
      riskLevel: "Medium"
    }
  ];

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || vendor.status.toLowerCase().replace(' ', '') === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "default";
      case "pending review": return "secondary";
      case "inactive": return "outline";
      default: return "outline";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low": return "text-green-600";
      case "medium": return "text-yellow-600";
      case "high": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Vendor Management</h2>
          <p className="text-muted-foreground">Manage external legal service providers and their relationships</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Vendor
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">3 new this quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">68% of total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.5</div>
            <p className="text-xs text-muted-foreground">+0.2 from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">High Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Vendor Directory */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Vendor Directory
          </CardTitle>
          <CardDescription>Comprehensive list of external legal service providers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pendingreview">Pending Review</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Specialties</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Active Matters</TableHead>
                <TableHead>YTD Spend</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{vendor.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {vendor.location}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{vendor.type}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {vendor.specialties.slice(0, 2).map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                      {vendor.specialties.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{vendor.specialties.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{vendor.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{vendor.activeMatters}</TableCell>
                  <TableCell className="font-semibold">
                    ${vendor.totalSpend.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${getRiskColor(vendor.riskLevel)}`}>
                      {vendor.riskLevel}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(vendor.status)}>
                      {vendor.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="h-3 w-3" />
                      </Button>
                      {vendor.riskLevel === "High" && (
                        <Button variant="outline" size="sm">
                          <AlertCircle className="h-3 w-3 text-red-600" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
