import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Building, Shield, AlertTriangle, CheckCircle, Search, Eye, Edit } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function VendorOversight() {
  const [vendors, setVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedRisk, setSelectedRisk] = useState("all");

  useEffect(() => {
    setLoading(true);
    setError(null);
    supabase
      .from("vendor_assessments")
      .select("*")
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setVendors(data || []);
        setLoading(false);
      });
  }, []);

  const getRiskBadge = (score: number | string) => {
    if (typeof score === "string") {
      if (score === "High") return <Badge variant="destructive">High Risk</Badge>;
      if (score === "Medium") return <Badge variant="secondary">Medium Risk</Badge>;
      if (score === "Low") return <Badge variant="default">Low Risk</Badge>;
      return <Badge variant="outline">{score}</Badge>;
    }
    if (score >= 75) return <Badge variant="destructive">High Risk</Badge>;
    if (score >= 50) return <Badge variant="secondary">Medium Risk</Badge>;
    return <Badge variant="default">Low Risk</Badge>;
  };

  const getComplianceBadge = (status: string) => {
    if (status === "Compliant") return <Badge variant="default">Compliant</Badge>;
    if (status === "Pending Review") return <Badge variant="secondary">Pending Review</Badge>;
    if (status === "Non-Compliant") return <Badge variant="destructive">Non-Compliant</Badge>;
    return <Badge variant="outline">{status}</Badge>;
  };

  const getContractBadge = (status: string) => {
    if (status === "Active DPA") return <Badge variant="default">Active DPA</Badge>;
    if (status === "DPA Signed") return <Badge variant="secondary">DPA Signed</Badge>;
    if (status === "Under Review") return <Badge variant="secondary">Under Review</Badge>;
    if (status === "Expired") return <Badge variant="destructive">Expired</Badge>;
    return <Badge variant="outline">{status}</Badge>;
  };

  if (loading) return <div className="p-8 text-center">Loading vendors...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Vendor & Processor Oversight</h2>
          <p className="text-muted-foreground">
            Manage third-party data processors and assess privacy risks
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Vendor
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
            <Building className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vendors.length}</div>
            <p className="text-xs text-muted-foreground">
              Active relationships
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vendors.filter(v => v.riskScore >= 75).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Require immediate review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">DPAs Active</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vendors.filter(v => v.contractStatus === "Active DPA").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((vendors.filter(v => v.contractStatus === "Active DPA").length / vendors.length) * 100)}% coverage
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reviews Due</CardTitle>
            <CheckCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vendors.filter(v => new Date(v.nextReview) <= new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Next 90 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Distribution & Safeguards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Vendor Risk Distribution</CardTitle>
            <CardDescription>Risk assessment across vendor portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div>
                    <div className="font-medium">High Risk</div>
                    <div className="text-sm text-muted-foreground">Score 75-100</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">
                    {vendors.filter(v => v.riskScore >= 75).length}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {Math.round((vendors.filter(v => v.riskScore >= 75).length / vendors.length) * 100)}%
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div>
                    <div className="font-medium">Medium Risk</div>
                    <div className="text-sm text-muted-foreground">Score 50-74</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">
                    {vendors.filter(v => v.riskScore < 75 && v.riskScore >= 50).length}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {Math.round((vendors.filter(v => v.riskScore < 75 && v.riskScore >= 50).length / vendors.length) * 100)}%
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <div className="font-medium">Low Risk</div>
                    <div className="text-sm text-muted-foreground">Score 0-49</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">
                    {vendors.filter(v => v.riskScore < 50).length}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {Math.round((vendors.filter(v => v.riskScore < 50).length / vendors.length) * 100)}%
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transfer Safeguards</CardTitle>
            <CardDescription>International data transfer protections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Standard Contractual Clauses</div>
                  <div className="text-sm text-muted-foreground">EU Commission approved</div>
                </div>
                <Badge variant="outline">
                  {vendors.filter(v => v.safeguards?.includes("Standard Contractual Clauses")).length} vendors
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Adequacy Decision</div>
                  <div className="text-sm text-muted-foreground">EU-approved countries</div>
                </div>
                <Badge variant="default">
                  {vendors.filter(v => v.safeguards?.includes("Adequacy Decision")).length} vendors
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Binding Corporate Rules</div>
                  <div className="text-sm text-muted-foreground">Multinational groups</div>
                </div>
                <Badge variant="secondary">
                  {vendors.filter(v => v.safeguards?.includes("Binding Corporate Rules")).length} vendors
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Certification Schemes</div>
                  <div className="text-sm text-muted-foreground">Privacy certifications</div>
                </div>
                <Badge variant="destructive">
                  {vendors.filter(v => v.safeguards?.includes("Certification Schemes")).length} vendors
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter Vendors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
              <Input
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="processor">Processor</SelectItem>
                <SelectItem value="controller">Controller</SelectItem>
                <SelectItem value="sub-processor">Sub-processor</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedRisk} onValueChange={setSelectedRisk}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Vendors Table */}
      <Card>
        <CardHeader>
          <CardTitle>Vendor Register ({vendors.length})</CardTitle>
          <CardDescription>Third-party data processors and controllers</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Jurisdiction</TableHead>
                <TableHead>Data Types</TableHead>
                <TableHead>Contract Status</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Compliance</TableHead>
                <TableHead>Next Review</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell className="font-medium">{vendor.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{vendor.name}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{vendor.role}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{vendor.jurisdiction}</TableCell>
                  <TableCell className="text-sm">{vendor.dataTypes}</TableCell>
                  <TableCell>{getContractBadge(vendor.contractStatus)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{vendor.riskScore}</span>
                      {getRiskBadge(vendor.riskScore)}
                    </div>
                  </TableCell>
                  <TableCell>{getComplianceBadge(vendor.complianceStatus)}</TableCell>
                  <TableCell className="text-sm">{vendor.nextReview}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
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
