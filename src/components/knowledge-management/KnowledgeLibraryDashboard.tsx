import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText, Search, Filter, BookOpen, Users, Clock } from "lucide-react";
import { AddKnowledgeModal } from "./AddKnowledgeModal";
import { KnowledgeDetailModal } from "./KnowledgeDetailModal";
import { useKnowledgeEntries } from '@/hooks/useKnowledgeEntries';
import type { Database } from '@/types/database';

export function KnowledgeLibraryDashboard() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<Database['public']['Tables']['knowledge_entries']['Row'] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [jurisdictionFilter, setJurisdictionFilter] = useState("all");
  const { entries, loading, error } = useKnowledgeEntries();

  const handleViewEntry = (entry: Database['public']['Tables']['knowledge_entries']['Row']) => {
    setSelectedEntry(entry);
    setDetailModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published": return "bg-green-100 text-green-800";
      case "Draft": return "bg-yellow-100 text-yellow-800";
      case "Archived": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case "Private": return "bg-red-100 text-red-800";
      case "Team": return "bg-blue-100 text-blue-800";
      case "Org-wide": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) return <div className="p-6">Loading knowledge entries...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{entries.length}</div>
            <p className="text-xs text-muted-foreground">{entries.length > 0 ? `+${entries.length} loaded` : 'No entries'}</p>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{entries.filter(e => e.status === 'Published').length}</div>
            <p className="text-xs text-muted-foreground">{entries.length > 0 ? `${Math.round((entries.filter(e => e.status === 'Published').length / entries.length) * 100)}% of total` : '0%'}</p>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contributors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{[...new Set(entries.map(e => e.author))].length}</div>
            <p className="text-xs text-muted-foreground">Active authors</p>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{entries.filter(e => {
              const updated = new Date(e.lastUpdated);
              const weekAgo = new Date();
              weekAgo.setDate(weekAgo.getDate() - 7);
              return updated > weekAgo;
            }).length}</div>
            <p className="text-xs text-muted-foreground">Updates this week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Knowledge Library</CardTitle>
              <CardDescription>Centralized repository of legal knowledge and documentation</CardDescription>
            </div>
            <Button onClick={() => setAddModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Entry
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search knowledge entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Document Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="memo">Memo</SelectItem>
                <SelectItem value="faq">FAQ</SelectItem>
                <SelectItem value="playbook">Playbook</SelectItem>
                <SelectItem value="risk-note">Risk Note</SelectItem>
                <SelectItem value="template-contract">Template Contract</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
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
                <SelectItem value="multiple">Multiple</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Knowledge Entries Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Jurisdiction</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Access Level</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.title}</TableCell>
                  <TableCell>{entry.type}</TableCell>
                  <TableCell>{entry.author}</TableCell>
                  <TableCell>{entry.jurisdiction}</TableCell>
                  <TableCell>{entry.entity}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(entry.status)}>
                      {entry.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getAccessLevelColor(entry.accessLevel)}>
                      {entry.accessLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>{entry.views}</TableCell>
                  <TableCell>{entry.lastUpdated}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewEntry(entry)}
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

      <AddKnowledgeModal open={addModalOpen} onOpenChange={setAddModalOpen} />
      <KnowledgeDetailModal 
        open={detailModalOpen} 
        onOpenChange={setDetailModalOpen}
        entry={selectedEntry}
      />
    </div>
  );
}
