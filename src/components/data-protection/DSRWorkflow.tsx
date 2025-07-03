import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plus, Users, Clock, CheckCircle, AlertCircle, Search, Eye, Edit } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function DSRWorkflow() {
  const [dsrs, setDSRs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  useEffect(() => {
    async function fetchDSRs() {
      setLoading(true);
      setError(null);
      // @ts-expect-error: Supabase client is not typed with DB schema
      const { data, error } = await (supabase as any).from("dsr_requests").select("*");
      if (error) {
        setError("Failed to load DSRs");
        setDSRs([]);
      } else {
        setDSRs(data || []);
      }
      setLoading(false);
    }
    fetchDSRs();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Complete":
        return <Badge className="bg-green-100 text-green-800">Complete</Badge>;
      case "In Progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "Pending Review":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending Review</Badge>;
      case "Overdue":
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case "Normal":
        return <Badge className="bg-blue-100 text-blue-800">Normal</Badge>;
      case "Low":
        return <Badge className="bg-gray-100 text-gray-800">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  // Filter logic
  const filteredDSRs = dsrs.filter((dsr) => {
    const matchesSearch =
      dsr.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dsr.requester?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dsr.subject?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || dsr.type?.toLowerCase() === selectedType;
    const matchesStatus = selectedStatus === "all" || dsr.status?.toLowerCase().replace(/ /g, "-") === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Data Subject Request (DSR) Workflow</h2>
          <p className="text-muted-foreground">
            Manage data subject rights requests with automated workflows and SLA tracking
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New DSR
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Requests</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              Across all types
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Past SLA deadline
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 days</div>
            <p className="text-xs text-muted-foreground">
              Within SLA target
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">
              On-time completion
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Request Types & SLAs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Request Types & Volume</CardTitle>
            <CardDescription>DSR distribution by type</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Access Requests</span>
                <span className="text-sm font-medium">45% (12)</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Deletion Requests</span>
                <span className="text-sm font-medium">25% (7)</span>
              </div>
              <Progress value={25} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Rectification</span>
                <span className="text-sm font-medium">20% (5)</span>
              </div>
              <Progress value={20} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Portability</span>
                <span className="text-sm font-medium">10% (3)</span>
              </div>
              <Progress value={10} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SLA Targets by Request Type</CardTitle>
            <CardDescription>Response time requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* {Object.entries(mockSLATargets).map(([type, days]) => (
                <div key={type} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{type} Request</div>
                    <div className="text-sm text-muted-foreground">
                      Response within {days} days
                    </div>
                  </div>
                  <Badge variant="outline">{days} days</Badge>
                </div>
              ))} */}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter DSRs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
              <Input
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Request Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="access">Access</SelectItem>
                <SelectItem value="deletion">Deletion</SelectItem>
                <SelectItem value="rectification">Rectification</SelectItem>
                <SelectItem value="portability">Portability</SelectItem>
                <SelectItem value="objection">Objection</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="complete">Complete</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="pending">Pending Review</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* DSR Table */}
      <Card>
        <CardHeader>
          <CardTitle>Data Subject Requests ({dsrs.length})</CardTitle>
          <CardDescription>Active and completed DSRs with SLA tracking</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading DSRs...</div>
          ) : error ? (
            <div className="text-center text-destructive py-8">{error}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Requester</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Data Source</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDSRs.map((dsr) => (
                  <TableRow key={dsr.id}>
                    <TableCell className="font-medium">{dsr.id}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{dsr.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{dsr.requester}</div>
                        <div className="text-sm text-muted-foreground">{dsr.jurisdiction}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{dsr.requestDate}</TableCell>
                    <TableCell className="text-sm">{dsr.dueDate}</TableCell>
                    <TableCell>{getStatusBadge(dsr.status)}</TableCell>
                    <TableCell>{getPriorityBadge(dsr.priority)}</TableCell>
                    <TableCell className="text-sm">{dsr.assignee}</TableCell>
                    <TableCell className="text-sm">{dsr.dataSource}</TableCell>
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
