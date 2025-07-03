import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, Download, Eye, Edit, MoreHorizontal, Link, Upload } from "lucide-react";
import { DisputeDetailModal } from "./DisputeDetailModal";
import { RelationshipsPanel } from "@/components/ui/relationships-panel";
import { ExcelImportModal } from "@/components/shared/ExcelImportModal";
import { ExcelExportModal } from "@/components/shared/ExcelExportModal";
import { useDisputes } from "../../hooks/useDisputes";

export function DisputesList() {
  const { disputes, loading, error } = useDisputes();
  const [selectedDisputes, setSelectedDisputes] = useState<string[]>([]);
  const [showDisputeDetail, setShowDisputeDetail] = useState(false);
  const [selectedDisputeId, setSelectedDisputeId] = useState<string | null>(null);
  const [selectedDispute, setSelectedDispute] = useState<any>(null);
  const [showRelationships, setShowRelationships] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-blue-100 text-blue-800";
      case "In Review": return "bg-yellow-100 text-yellow-800";
      case "Negotiation": return "bg-orange-100 text-orange-800";
      case "Escalated": return "bg-red-100 text-red-800";
      case "Resolved": return "bg-green-100 text-green-800";
      case "Closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleSelectDispute = (disputeId: string, checked: boolean) => {
    if (checked) {
      setSelectedDisputes([...selectedDisputes, disputeId]);
    } else {
      setSelectedDisputes(selectedDisputes.filter(id => id !== disputeId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedDisputes(disputes.map((d: any) => d.id));
    } else {
      setSelectedDisputes([]);
    }
  };

  const handleViewDispute = (disputeId: string) => {
    setSelectedDisputeId(disputeId);
    setShowDisputeDetail(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Eye className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="glass tab-fade-in">
        <CardContent className="p-6 text-center text-red-600">
          Error loading disputes: {error}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="glass tab-fade-in">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Disputes</CardTitle>
              <CardDescription>Manage and track all disputes across entities</CardDescription>
            </div>
            <div className="flex gap-2">
              {selectedDisputes.length > 0 && (
                <Button variant="outline" size="sm">
                  Bulk Actions ({selectedDisputes.length})
                </Button>
              )}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowImportModal(true)}
              >
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowExportModal(true)}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox 
                    checked={selectedDisputes.length === disputes.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Dispute Title</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Counterparty</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Exposure</TableHead>
                <TableHead>Provisioned</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead className="w-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {disputes.map((dispute: any) => (
                <TableRow key={dispute.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Checkbox 
                      checked={selectedDisputes.includes(dispute.id)}
                      onCheckedChange={(checked) => handleSelectDispute(dispute.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{dispute.title}</TableCell>
                  <TableCell>{dispute.entity}</TableCell>
                  <TableCell>{dispute.counterparty}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(dispute.status)}>
                      {dispute.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(dispute.priority)}>
                      {dispute.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{dispute.owner}</TableCell>
                  <TableCell className="font-medium">{dispute.exposure}</TableCell>
                  <TableCell>
                    <Badge variant={dispute.provisioned ? "default" : "outline"}>
                      {dispute.provisioned ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{dispute.deadline}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewDispute(dispute.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDispute(dispute);
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
      {showRelationships && selectedDispute && (
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
            itemId={selectedDispute.id.toLowerCase().replace('dis-', 'dispute-')}
            itemType="disputes"
            itemTitle={selectedDispute.title}
            onItemClick={(item) => console.log('Related item clicked:', item)}
          />
        </div>
      )}

      <DisputeDetailModal 
        open={showDisputeDetail} 
        onOpenChange={setShowDisputeDetail}
        disputeId={selectedDisputeId}
      />

      {/* Import Modal */}
      <ExcelImportModal
        open={showImportModal}
        onOpenChange={setShowImportModal}
        title="Import Disputes from Excel"
        description="Upload an Excel file to bulk import dispute data"
        templateColumns={[]}
        onImport={() => {}}
        sampleData={[]}
      />

      {/* Export Modal */}
      <ExcelExportModal
        open={showExportModal}
        onOpenChange={setShowExportModal}
        title="Export Disputes to Excel"
        description="Export dispute data to Excel or CSV format"
        data={disputes}
        columns={[]}
        onExport={() => {}}
      />
    </div>
  );
}
