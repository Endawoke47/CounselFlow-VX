import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText, Search, BarChart3, GitCompare } from "lucide-react";
import { AddClauseModal } from "./AddClauseModal";
import { ClauseDetailModal } from "./ClauseDetailModal";
import { ClauseComparisonModal } from "./ClauseComparisonModal";
import { useClauses } from '@/hooks/useClauses';
import type { Database } from '@/types/database';

export function ClauseLibraryDashboard() {
  const { clauses, loading, error } = useClauses();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [comparisonModalOpen, setComparisonModalOpen] = useState(false);
  const [selectedClause, setSelectedClause] = useState<Database['public']['Tables']['clauses']['Row'] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [jurisdictionFilter, setJurisdictionFilter] = useState("all");

  const handleViewClause = (clause: Database['public']['Tables']['clauses']['Row']) => {
    setSelectedClause(clause);
    setDetailModalOpen(true);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "High": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) return <div className="p-6">Loading clauses...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clauses</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clauses.length}</div>
            <p className="text-xs text-muted-foreground">{clauses.length > 0 ? `+${clauses.length} loaded` : 'No clauses'}</p>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk</CardTitle>
            <BarChart3 className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clauses.filter(c => c.risk === 'High').length}</div>
            <p className="text-xs text-muted-foreground">High risk clauses</p>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jurisdictions</CardTitle>
            <GitCompare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{[...new Set(clauses.map(c => c.jurisdiction))].length}</div>
            <p className="text-xs text-muted-foreground">Unique jurisdictions</p>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Types</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{[...new Set(clauses.map(c => c.type))].length}</div>
            <p className="text-xs text-muted-foreground">Clause types</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Clause Library</CardTitle>
              <CardDescription>Manage and organize contract clauses for reuse</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setComparisonModalOpen(true)}>
                <GitCompare className="h-4 w-4 mr-2" />
                Compare Clauses
              </Button>
              <Button onClick={() => setAddModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Clause
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search clauses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Clause Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="liability">Liability</SelectItem>
                <SelectItem value="termination">Termination</SelectItem>
                <SelectItem value="data-protection">Data Protection</SelectItem>
                <SelectItem value="ip">Intellectual Property</SelectItem>
                <SelectItem value="payment">Payment Terms</SelectItem>
              </SelectContent>
            </Select>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Risk Profile" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
              </SelectContent>
            </Select>
            <Select value={jurisdictionFilter} onValueChange={setJurisdictionFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Jurisdiction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jurisdictions</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="eu">European Union</SelectItem>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="de">Germany</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Clauses Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Jurisdiction</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clauses.map((clause) => (
                <TableRow key={clause.id}>
                  <TableCell className="font-medium">{clause.title}</TableCell>
                  <TableCell>{clause.type}</TableCell>
                  <TableCell>{clause.jurisdiction}</TableCell>
                  <TableCell>{clause.lastUpdated}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewClause(clause)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddClauseModal open={addModalOpen} onOpenChange={setAddModalOpen} />
      <ClauseDetailModal 
        open={detailModalOpen} 
        onOpenChange={setDetailModalOpen}
        clause={selectedClause}
      />
      <ClauseComparisonModal 
        open={comparisonModalOpen} 
        onOpenChange={setComparisonModalOpen}
      />
    </div>
  );
}
