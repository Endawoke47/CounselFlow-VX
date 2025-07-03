import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, AlertTriangle, Clock, Shield, Search, Eye, Edit } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function BreachManagement() {
  const [breaches, setBreaches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  useEffect(() => {
    async function fetchBreaches() {
      setLoading(true);
      setError(null);
      // @ts-expect-error: Supabase client is not typed with DB schema
      const { data, error } = await (supabase as any).from("breaches").select("*");
      if (error) {
        setError("Failed to load breaches");
        setBreaches([]);
      } else {
        setBreaches(data || []);
      }
      setLoading(false);
    }
    fetchBreaches();
  }, []);

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "High":
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case "Low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Investigation":
        return <Badge className="bg-red-100 text-red-800">Investigation</Badge>;
      case "Remediation":
        return <Badge className="bg-yellow-100 text-yellow-800">Remediation</Badge>;
      case "Closed":
        return <Badge className="bg-green-100 text-green-800">Closed</Badge>;
      case "Reported":
        return <Badge className="bg-blue-100 text-blue-800">Reported</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getContainmentBadge = (status: string) => {
    switch (status) {
      case "Contained":
        return <Badge className="bg-green-100 text-green-800">Contained</Badge>;
      case "In Progress":
        return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>;
      case "Resolved":
        return <Badge className="bg-blue-100 text-blue-800">Resolved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Filter logic
  const filteredBreaches = breaches.filter((breach) => {
    const matchesSearch =
      breach.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      breach.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      breach.dataTypes?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = selectedSeverity === "all" || breach.severity?.toLowerCase() === selectedSeverity;
    const matchesStatus = selectedStatus === "all" || breach.status?.toLowerCase().replace(/ /g, "-") === selectedStatus;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Breach & Incident Management</h2>
          <p className="text-muted-foreground">
            Track and manage data security incidents and breach notifications
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Report Breach
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              Under investigation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Regulator Notifications</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Within 72 hours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Subjects Affected</CardTitle>
            <Shield className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">
              This year
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18h</div>
            <p className="text-xs text-muted-foreground">
              From discovery
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Breach Response Workflow */}
      <Card>
        <CardHeader>
          <CardTitle>Breach Response Workflow</CardTitle>
          <CardDescription>Standard incident response process and timelines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between space-x-4">
            <div className="flex-1 text-center">
              <div className="w-8 h-8 bg-red-100 text-red-800 rounded-full flex items-center justify-center mx-auto mb-2">1</div>
              <div className="text-sm font-medium">Discovery</div>
              <div className="text-xs text-muted-foreground">Log incident</div>
            </div>
            <div className="h-px bg-border flex-1"></div>
            <div className="flex-1 text-center">
              <div className="w-8 h-8 bg-yellow-100 text-yellow-800 rounded-full flex items-center justify-center mx-auto mb-2">2</div>
              <div className="text-sm font-medium">Assessment</div>
              <div className="text-xs text-muted-foreground">Risk evaluation</div>
            </div>
            <div className="h-px bg-border flex-1"></div>
            <div className="flex-1 text-center">
              <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mx-auto mb-2">3</div>
              <div className="text-sm font-medium">Containment</div>
              <div className="text-xs text-muted-foreground">Stop further breach</div>
            </div>
            <div className="h-px bg-border flex-1"></div>
            <div className="flex-1 text-center">
              <div className="w-8 h-8 bg-purple-100 text-purple-800 rounded-full flex items-center justify-center mx-auto mb-2">4</div>
              <div className="text-sm font-medium">Notification</div>
              <div className="text-xs text-muted-foreground">Regulators & subjects</div>
            </div>
            <div className="h-px bg-border flex-1"></div>
            <div className="flex-1 text-center">
              <div className="w-8 h-8 bg-green-100 text-green-800 rounded-full flex items-center justify-center mx-auto mb-2">5</div>
              <div className="text-sm font-medium">Resolution</div>
              <div className="text-xs text-muted-foreground">Lessons learned</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter Incidents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
              <Input
                placeholder="Search incidents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="investigation">Investigation</SelectItem>
                <SelectItem value="remediation">Remediation</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Incidents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Security Incidents ({breaches.length})</CardTitle>
          <CardDescription>Active and historical data breach incidents</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading breaches...</div>
          ) : error ? (
            <div className="text-center text-destructive py-8">{error}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Incident ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Discovery Date</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Affected Count</TableHead>
                  <TableHead>Regulator Notified</TableHead>
                  <TableHead>Containment</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBreaches.map((breach) => (
                  <TableRow key={breach.id}>
                    <TableCell className="font-medium">{breach.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{breach.title}</div>
                        <div className="text-sm text-muted-foreground">{breach.dataTypes}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{breach.discoveryDate}</TableCell>
                    <TableCell>{getSeverityBadge(breach.severity)}</TableCell>
                    <TableCell>{getStatusBadge(breach.status)}</TableCell>
                    <TableCell className="font-medium">{breach.affectedCount}</TableCell>
                    <TableCell>
                      <Badge variant={breach.regulatorNotified === "Yes" ? "default" : "secondary"}>
                        {breach.regulatorNotified}
                      </Badge>
                    </TableCell>
                    <TableCell>{getContainmentBadge(breach.containmentStatus)}</TableCell>
                    <TableCell className="text-sm">{breach.assignee}</TableCell>
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
