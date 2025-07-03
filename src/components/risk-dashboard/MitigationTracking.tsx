
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, CheckCircle, Clock, AlertTriangle, User, Calendar, Target } from "lucide-react";

const mockMitigationActions = [
  {
    id: "MIT-001",
    riskId: "RSK-2024-001",
    riskTitle: "GDPR Compliance Gap",
    action: "Implement cross-border data transfer procedures",
    owner: "Jane Smith",
    status: "In Progress",
    priority: "Critical",
    dueDate: "2024-02-15",
    progress: 75,
    startDate: "2024-01-15",
    estimatedEffort: "40 hours",
    actualEffort: "32 hours",
    cost: "$15,000",
    effectiveness: "High"
  },
  {
    id: "MIT-002",
    riskId: "RSK-2024-001",
    riskTitle: "GDPR Compliance Gap",
    action: "Staff training on data protection regulations",
    owner: "Mike Johnson",
    status: "Completed",
    priority: "High",
    dueDate: "2024-01-30",
    progress: 100,
    startDate: "2024-01-05",
    estimatedEffort: "16 hours",
    actualEffort: "18 hours",
    cost: "$5,000",
    effectiveness: "Medium"
  },
  {
    id: "MIT-003",
    riskId: "RSK-2024-002",
    riskTitle: "Vendor Dependency Risk",
    action: "Identify and qualify alternative vendors",
    owner: "Sarah Davis",
    status: "In Progress",
    priority: "High",
    dueDate: "2024-03-15",
    progress: 40,
    startDate: "2024-02-01",
    estimatedEffort: "60 hours",
    actualEffort: "24 hours",
    cost: "$25,000",
    effectiveness: "High"
  },
  {
    id: "MIT-004",
    riskId: "RSK-2024-003",
    riskTitle: "Cyber Security Vulnerability",
    action: "Deploy security patches across all systems",
    owner: "David Wilson",
    status: "Completed",
    priority: "Critical",
    dueDate: "2024-01-25",
    progress: 100,
    startDate: "2024-01-20",
    estimatedEffort: "24 hours",
    actualEffort: "20 hours",
    cost: "$8,000",
    effectiveness: "High"
  },
  {
    id: "MIT-005",
    riskId: "RSK-2024-004",
    riskTitle: "Market Volatility Impact",
    action: "Develop financial hedging strategy",
    owner: "Lisa Chen",
    status: "Not Started",
    priority: "Medium",
    dueDate: "2024-04-01",
    progress: 0,
    startDate: "2024-03-01",
    estimatedEffort: "80 hours",
    actualEffort: "0 hours",
    cost: "$35,000",
    effectiveness: "Unknown"
  }
];

export function MitigationTracking() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");

  const filteredActions = mockMitigationActions.filter(action => {
    const matchesSearch = action.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         action.riskTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         action.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || action.status.toLowerCase().replace(' ', '') === selectedStatus;
    const matchesPriority = selectedPriority === "all" || action.priority.toLowerCase() === selectedPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "In Progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "Not Started":
        return <Badge className="bg-gray-100 text-gray-800">Not Started</Badge>;
      case "Overdue":
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Critical":
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
      case "High":
        return <Badge className="bg-orange-100 text-orange-800">High</Badge>;
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case "Low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getEffectivenessBadge = (effectiveness: string) => {
    switch (effectiveness) {
      case "High":
        return <Badge className="bg-green-100 text-green-800">High</Badge>;
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case "Low":
        return <Badge className="bg-red-100 text-red-800">Low</Badge>;
      case "Unknown":
        return <Badge className="bg-gray-100 text-gray-800">TBD</Badge>;
      default:
        return <Badge variant="outline">{effectiveness}</Badge>;
    }
  };

  // Calculate summary statistics
  const totalActions = mockMitigationActions.length;
  const completedActions = mockMitigationActions.filter(a => a.status === "Completed").length;
  const inProgressActions = mockMitigationActions.filter(a => a.status === "In Progress").length;
  const totalCost = mockMitigationActions.reduce((sum, a) => sum + parseInt(a.cost.replace(/[$,]/g, '')), 0);
  const avgProgress = Math.round(mockMitigationActions.reduce((sum, a) => sum + a.progress, 0) / mockMitigationActions.length);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Mitigation Tracking</h2>
          <p className="text-muted-foreground">Track progress of risk mitigation actions and their effectiveness</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Mitigation Action
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4" />
              Total Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalActions}</div>
            <p className="text-xs text-muted-foreground">{inProgressActions} in progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedActions}</div>
            <p className="text-xs text-muted-foreground">{Math.round((completedActions/totalActions)*100)}% completion rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Avg. Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgProgress}%</div>
            <p className="text-xs text-muted-foreground">Across all actions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <User className="h-4 w-4" />
              Active Owners
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(mockMitigationActions.filter(a => a.status !== "Completed").map(a => a.owner)).size}
            </div>
            <p className="text-xs text-muted-foreground">Working on mitigations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Total Investment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalCost/1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">Mitigation costs</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Mitigation Progress Overview</CardTitle>
          <CardDescription>Overall progress of mitigation actions by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Critical Priority Actions</span>
                <span className="text-sm">87%</span>
              </div>
              <Progress value={87} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">High Priority Actions</span>
                <span className="text-sm">72%</span>
              </div>
              <Progress value={72} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Medium Priority Actions</span>
                <span className="text-sm">45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Low Priority Actions</span>
                <span className="text-sm">30%</span>
              </div>
              <Progress value={30} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mitigation Actions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Mitigation Actions
          </CardTitle>
          <CardDescription>Track all risk mitigation actions and their progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search mitigation actions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="notstarted">Not Started</SelectItem>
                <SelectItem value="inprogress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action ID</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead>Mitigation Action</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Effectiveness</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActions.map((action) => (
                  <TableRow key={action.id}>
                    <TableCell className="font-medium">{action.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{action.riskTitle}</div>
                        <div className="text-sm text-muted-foreground">{action.riskId}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <div className="font-medium line-clamp-2">{action.action}</div>
                      </div>
                    </TableCell>
                    <TableCell>{action.owner}</TableCell>
                    <TableCell>{getPriorityBadge(action.priority)}</TableCell>
                    <TableCell>{getStatusBadge(action.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={action.progress} className="h-2 w-16" />
                        <span className="text-sm">{action.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{action.dueDate}</TableCell>
                    <TableCell className="font-medium">{action.cost}</TableCell>
                    <TableCell>{getEffectivenessBadge(action.effectiveness)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
