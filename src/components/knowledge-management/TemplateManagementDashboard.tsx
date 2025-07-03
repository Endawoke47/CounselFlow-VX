import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText, GitBranch, Download, Eye, Edit, Link } from "lucide-react";
import { AddTemplateModal } from "./AddTemplateModal";
import { TemplateDetailModal } from "./TemplateDetailModal";
import { RelationshipsPanel } from "@/components/ui/relationships-panel";
import { RelatedItem } from "@/services/relationshipService";
import { supabase } from "@/integrations/supabase/client";
import { useTemplates } from '@/hooks/useTemplates';
import type { Database } from '@/types/database';

export function TemplateManagementDashboard() {
  const { templates, loading, error } = useTemplates();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Database['public']['Tables']['templates']['Row'] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [jurisdictionFilter, setJurisdictionFilter] = useState("all");
  const [showRelationships, setShowRelationships] = useState(false);

  const handleViewTemplate = (template: Database['public']['Tables']['templates']['Row']) => {
    setSelectedTemplate(template);
    setDetailModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Draft": return "bg-yellow-100 text-yellow-800";
      case "Under Review": return "bg-blue-100 text-blue-800";
      case "Archived": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case "Private": return "bg-red-100 text-red-800";
      case "Team": return "bg-blue-100 text-blue-800";
      case "Legal Team": return "bg-purple-100 text-purple-800";
      case "Org-wide": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) return <div className="p-6">Loading templates...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{templates.length}</div>
            <p className="text-xs text-muted-foreground">{templates.length > 0 ? `+${templates.length} loaded` : 'No templates'}</p>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <GitBranch className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{templates.filter(t => t.status === 'Active').length}</div>
            <p className="text-xs text-muted-foreground">Active templates</p>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jurisdictions</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{[...new Set(templates.map(t => t.jurisdiction))].length}</div>
            <p className="text-xs text-muted-foreground">Unique jurisdictions</p>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Types</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{[...new Set(templates.map(t => t.type))].length}</div>
            <p className="text-xs text-muted-foreground">Template types</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Template Management</CardTitle>
              <CardDescription>Manage contract templates with version control and collaboration</CardDescription>
            </div>
            <Button onClick={() => setAddModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Template
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Template Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="employment">Employment Contract</SelectItem>
                <SelectItem value="license">License Agreement</SelectItem>
                <SelectItem value="nda">Non-Disclosure Agreement</SelectItem>
                <SelectItem value="service">Service Agreement</SelectItem>
                <SelectItem value="purchase">Purchase Agreement</SelectItem>
                <SelectItem value="consultancy">Consultancy Agreement</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
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

          {/* Templates Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Jurisdiction</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Access Level</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell className="font-medium">{template.title}</TableCell>
                  <TableCell>{template.type}</TableCell>
                  <TableCell>{template.jurisdiction}</TableCell>
                  <TableCell>{template.entity}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(template.status)}>
                      {template.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getAccessLevelColor(template.accessLevel)}>
                      {template.accessLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>{template.author}</TableCell>
                  <TableCell>{template.lastUpdated}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewTemplate(template)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTemplate(template);
                          setShowRelationships(true);
                        }}
                        title="View Related Items"
                      >
                        <Link className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Relationships Panel */}
      {showRelationships && selectedTemplate && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Related Items</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowRelationships(false)}
            >
              Close
            </Button>
          </div>
          <RelationshipsPanel
            itemId={`template-${selectedTemplate.id.padStart(3, '0')}`}
            itemType="templates"
            itemTitle={selectedTemplate.title}
            onItemClick={(item) => console.log('Related item clicked:', item)}
          />
        </div>
      )}

      <AddTemplateModal open={addModalOpen} onOpenChange={setAddModalOpen} />
      <TemplateDetailModal 
        open={detailModalOpen} 
        onOpenChange={setDetailModalOpen}
        template={selectedTemplate}
      />
    </div>
  );
}
