import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Search } from "lucide-react";
import { AddPolicyModal } from "./AddPolicyModal";
import { PolicyDetailModal } from "./PolicyDetailModal";
import { usePolicies } from "../../hooks/usePolicies";

export function PolicyLibraryDashboard() {
  const { policies, loading, error } = usePolicies();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [entityFilter, setEntityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleViewPolicy = (policy: any) => {
    setSelectedPolicy(policy);
    setDetailModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Draft": return "bg-yellow-100 text-yellow-800";
      case "In Review": return "bg-blue-100 text-blue-800";
      case "Retired": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) return <div className="p-6">Loading policies...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <Card className="glass tab-fade-in">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Policy Library</CardTitle>
            <Button onClick={() => setAddModalOpen(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Add Policy
            </Button>
          </div>
          <CardDescription>Manage and track all policies across your organization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search policies..." className="pl-9" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <Select value={entityFilter} onValueChange={setEntityFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Entity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Entities</SelectItem>
                {/* Add dynamic entity options here */}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="In Review">In Review</SelectItem>
                <SelectItem value="Retired">Retired</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {policies.filter((policy: any) =>
                (entityFilter === "all" || policy.entity === entityFilter) &&
                (statusFilter === "all" || policy.status === statusFilter) &&
                (policy.title.toLowerCase().includes(searchTerm.toLowerCase()))
              ).map((policy: any) => (
                <TableRow key={policy.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{policy.title}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(policy.status)}>{policy.status}</Badge>
                  </TableCell>
                  <TableCell>{policy.owner}</TableCell>
                  <TableCell>{policy.updated_at ? new Date(policy.updated_at).toLocaleDateString() : ''}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleViewPolicy(policy)}>
                      <FileText className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <AddPolicyModal open={addModalOpen} onOpenChange={setAddModalOpen} />
      <PolicyDetailModal open={detailModalOpen} onOpenChange={setDetailModalOpen} policy={selectedPolicy} />
    </div>
  );
}
