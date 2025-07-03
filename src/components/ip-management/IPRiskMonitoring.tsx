import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  AlertTriangle, 
  Shield, 
  Eye, 
  Search,
  Clock,
  Scale,
  TrendingUp,
  FileX
} from "lucide-react";
import { AddDisputeModal } from "./AddDisputeModal";
import { useDisputes } from '@/hooks/useDisputes';
import type { Database } from '@/types/database';

export function IPRiskMonitoring() {
  const { disputes, loading, error } = useDisputes();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDispute, setShowAddDispute] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active Litigation": return "bg-red-100 text-red-800";
      case "Settlement Negotiation": return "bg-yellow-100 text-yellow-800";
      case "Cease & Desist Sent": return "bg-blue-100 text-blue-800";
      case "Resolved": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) return <div className="p-8 text-center">Loading IP risk data...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* TODO: Add risk metrics cards here */}
      </div>
      {/* Active Disputes */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              Active IP Disputes
            </CardTitle>
            <Button onClick={() => setShowAddDispute(true)}>
              <AlertTriangle className="h-4 w-4 mr-2" />
              Report Dispute
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dispute Details</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {disputes.map((dispute) => (
                <TableRow key={dispute.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{dispute.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {dispute.type} • {dispute.jurisdiction}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Filed: {dispute.filed_date}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(dispute.status)}>
                      {dispute.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{dispute.lastUpdated}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {/* Infringement Alerts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Infringement Monitoring Alerts
            </CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search alerts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline">
                <Shield className="h-4 w-4 mr-2" />
                Configure Watches
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* TODO: Add alerts content here */}
          </div>
        </CardContent>
      </Card>
      <AddDisputeModal open={showAddDispute} onOpenChange={setShowAddDispute} />
    </div>
  );
}
