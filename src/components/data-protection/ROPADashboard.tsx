import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText, Download, Eye, Edit, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function ROPADashboard() {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEntity, setSelectedEntity] = useState("all");
  const [selectedRisk, setSelectedRisk] = useState("all");

  useEffect(() => {
    async function fetchRecords() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase.from("ropa_entries").select("*");
      if (error) {
        setError("Failed to load ROPA records");
        setRecords([]);
      } else {
        setRecords(data || []);
      }
      setLoading(false);
    }
    fetchRecords();
  }, []);

  const getRiskBadge = (risk: string) => {
    if (risk === "High") return <Badge variant="destructive">High Risk</Badge>;
    if (risk === "Medium") return <Badge variant="secondary">Medium Risk</Badge>;
    if (risk === "Low") return <Badge variant="default">Low Risk</Badge>;
    return <Badge variant="outline">{risk}</Badge>;
  };

  return (
    <div className="space-y-6">
      {loading && <div className="text-center py-8">Loading ROPA records...</div>}
      {error && <div className="text-center text-red-600 py-4">{error}</div>}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Records of Processing Activities (ROPA)</h2>
          <p className="text-muted-foreground">
            Maintain comprehensive records of personal data processing across all entities
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export ROPA
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New ROPA Entry
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{records.length}</div>
            <p className="text-xs text-muted-foreground">
              Across 12 entities
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk</CardTitle>
            <FileText className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {records.filter(record => record.riskLevel === "High").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Require immediate review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">International Transfers</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {records.filter(record => record.transfers !== "None").length}
            </div>
            <p className="text-xs text-muted-foreground">
              With appropriate safeguards
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Updates Required</CardTitle>
            <FileText className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {records.filter(record => new Date(record.lastUpdated) < new Date(Date.now() - 365*24*60*60*1000)).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Overdue for annual review
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter ROPA Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
              <Input
                placeholder="Search by purpose, data type, or legal basis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedEntity} onValueChange={setSelectedEntity}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Entity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Entities</SelectItem>
                <SelectItem value="hq">HQ Entity</SelectItem>
                <SelectItem value="sales">Sales Entity</SelectItem>
                <SelectItem value="marketing">Marketing Entity</SelectItem>
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

      {/* ROPA Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>ROPA Records ({records.length})</CardTitle>
          <CardDescription>Complete records of processing activities</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ROPA ID</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Data Subjects</TableHead>
                <TableHead>Legal Basis</TableHead>
                <TableHead>Retention</TableHead>
                <TableHead>Transfers</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{record.purpose}</div>
                      <div className="text-sm text-muted-foreground">{record.dataTypes}</div>
                    </div>
                  </TableCell>
                  <TableCell>{record.dataSubjects}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{record.legalBasis}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{record.retention}</TableCell>
                  <TableCell className="text-sm">{record.transfers}</TableCell>
                  <TableCell>{getRiskBadge(record.riskLevel)}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{record.entity}</div>
                      <div className="text-sm text-muted-foreground">{record.jurisdiction}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{record.lastUpdated}</TableCell>
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
