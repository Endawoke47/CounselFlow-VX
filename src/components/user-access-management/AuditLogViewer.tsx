
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, Activity, Eye, Edit, Trash2, Lock } from "lucide-react";

const mockAuditLogs = [
  {
    id: "1",
    timestamp: "2024-01-15 14:30:22",
    user: "Sarah Johnson",
    action: "Contract Viewed",
    resource: "Service Agreement #2024-001",
    module: "Contracts",
    ipAddress: "192.168.1.100",
    userAgent: "Chrome/120.0.0.0",
    result: "Success"
  },
  {
    id: "2",
    timestamp: "2024-01-15 14:25:15",
    user: "Michael Chen",
    action: "User Role Updated",
    resource: "John Smith - Role changed to Legal Officer",
    module: "User Management",
    ipAddress: "192.168.1.105",
    userAgent: "Firefox/121.0.0.0",
    result: "Success"
  },
  {
    id: "3",
    timestamp: "2024-01-15 14:20:08",
    user: "David Kim",
    action: "Document Download",
    resource: "Dispute #2024-001 - Legal Brief",
    module: "Disputes",
    ipAddress: "203.45.67.89",
    userAgent: "Chrome/120.0.0.0",
    result: "Success"
  },
  {
    id: "4",
    timestamp: "2024-01-15 14:15:33",
    user: "Emily Rodriguez",
    action: "Access Denied",
    resource: "IP Portfolio - Confidential",
    module: "IP Management",
    ipAddress: "192.168.1.102",
    userAgent: "Safari/17.2.1",
    result: "Failed"
  }
];

const actionIcons = {
  "Contract Viewed": Eye,
  "User Role Updated": Edit,
  "Document Download": Download,
  "Access Denied": Lock
};

export function AuditLogViewer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [moduleFilter, setModuleFilter] = useState("all");
  const [actionFilter, setActionFilter] = useState("all");

  const filteredLogs = mockAuditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = moduleFilter === "all" || log.module === moduleFilter;
    const matchesAction = actionFilter === "all" || log.action.includes(actionFilter);
    
    return matchesSearch && matchesModule && matchesAction;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Audit Log Viewer
          </CardTitle>
          <CardDescription>
            Track all user activities and system events for compliance and security monitoring
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by user or resource..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={moduleFilter} onValueChange={setModuleFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by module" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modules</SelectItem>
                <SelectItem value="Contracts">Contracts</SelectItem>
                <SelectItem value="Disputes">Disputes</SelectItem>
                <SelectItem value="IP Management">IP Management</SelectItem>
                <SelectItem value="User Management">User Management</SelectItem>
              </SelectContent>
            </Select>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="Viewed">Viewed</SelectItem>
                <SelectItem value="Updated">Updated</SelectItem>
                <SelectItem value="Download">Download</SelectItem>
                <SelectItem value="Access">Access</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => {
                const ActionIcon = actionIcons[log.action] || Activity;
                return (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                    <TableCell className="font-medium">{log.user}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <ActionIcon className="h-4 w-4 text-muted-foreground" />
                        {log.action}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate" title={log.resource}>
                        {log.resource}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{log.module}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
                    <TableCell>
                      <Badge variant={log.result === "Success" ? "default" : "destructive"}>
                        {log.result}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
