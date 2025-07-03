
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, FileText, Calendar, DollarSign, AlertCircle, CheckCircle, Clock, Users } from "lucide-react";

export function OutsourcedMatters() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const matters = [
    {
      id: "MTR-2024-001",
      title: "TechCorp Acquisition - Due Diligence",
      vendor: "Davis Polk & Wardwell",
      partner: "John Smith",
      type: "M&A",
      status: "Active",
      priority: "High",
      startDate: "2024-02-15",
      targetDate: "2024-04-30",
      budget: 450000,
      spent: 267000,
      remaining: 183000,
      utilization: 59,
      lastUpdate: "2024-03-15",
      description: "Legal due diligence for the acquisition of TechCorp including corporate, IP, and regulatory review"
    },
    {
      id: "MTR-2024-002", 
      title: "Banking Regulatory Compliance Review",
      vendor: "Clifford Chance",
      partner: "Sarah Johnson",
      type: "Regulatory",
      status: "Active",
      priority: "Medium",
      startDate: "2024-01-20",
      targetDate: "2024-05-15",
      budget: 180000,
      spent: 124000,
      remaining: 56000,
      utilization: 69,
      lastUpdate: "2024-03-12",
      description: "Comprehensive regulatory compliance review for new banking products"
    },
    {
      id: "MTR-2024-003",
      title: "Employment Dispute Resolution",
      vendor: "Baker McKenzie", 
      partner: "Michael Brown",
      type: "Employment",
      status: "On Hold",
      priority: "Medium",
      startDate: "2024-01-10",
      targetDate: "2024-03-30",
      budget: 85000,
      spent: 62000,
      remaining: 23000,
      utilization: 73,
      lastUpdate: "2024-02-28",
      description: "Multi-jurisdictional employment dispute involving senior executives"
    },
    {
      id: "MTR-2024-004",
      title: "IP Portfolio Management",
      vendor: "Local Boutique Firm",
      partner: "Lisa Chen",
      type: "IP",
      status: "Completed",
      priority: "Low",
      startDate: "2023-11-01",
      targetDate: "2024-02-15",
      budget: 65000,
      spent: 58000,
      remaining: 7000,
      utilization: 89,
      lastUpdate: "2024-02-15",
      description: "Trademark and patent filing for new product lines in multiple jurisdictions"
    },
    {
      id: "MTR-2024-005",
      title: "Corporate Restructuring Advisory",
      vendor: "Regional Counsel Ltd",
      partner: "David Wilson",
      type: "Corporate",
      status: "At Risk",
      priority: "High",
      startDate: "2024-01-05",
      targetDate: "2024-04-01",
      budget: 220000,
      spent: 198000,
      remaining: 22000,
      utilization: 90,
      lastUpdate: "2024-03-10",
      description: "Complex corporate restructuring involving multiple subsidiaries and tax implications"
    }
  ];

  const filteredMatters = matters.filter(matter => {
    const matchesSearch = matter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         matter.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         matter.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         matter.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || matter.status.toLowerCase().replace(' ', '') === statusFilter;
    const matchesPriority = priorityFilter === "all" || matter.priority.toLowerCase() === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "on hold":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "at risk":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "default";
      case "on hold": return "secondary";
      case "at risk": return "destructive";
      case "completed": return "outline";
      default: return "outline";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high": return "text-red-600";
      case "medium": return "text-yellow-600";
      case "low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return "text-red-600";
    if (utilization >= 75) return "text-yellow-600";
    return "text-green-600";
  };

  // Calculate summary statistics
  const totalMatters = matters.length;
  const activeMatters = matters.filter(m => m.status === "Active").length;
  const totalBudget = matters.reduce((sum, m) => sum + m.budget, 0);
  const totalSpent = matters.reduce((sum, m) => sum + m.spent, 0);
  const atRiskMatters = matters.filter(m => m.status === "At Risk").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Outsourced Matters</h2>
          <p className="text-muted-foreground">Manage and track all external legal matters and engagements</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Matter
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Total Matters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMatters}</div>
            <p className="text-xs text-muted-foreground">{activeMatters} currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Total Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalBudget / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">${(totalSpent / 1000).toFixed(0)}K spent</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Active Vendors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(matters.filter(m => m.status === "Active").map(m => m.vendor)).size}
            </div>
            <p className="text-xs text-muted-foreground">Across all matters</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              At Risk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{atRiskMatters}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Matters Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Matters Directory
          </CardTitle>
          <CardDescription>Comprehensive view of all outsourced legal matters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search matters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="onhold">On Hold</SelectItem>
                <SelectItem value="atrisk">At Risk</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
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
                  <TableHead>Matter</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Spent</TableHead>
                  <TableHead>Utilization</TableHead>
                  <TableHead>Target Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMatters.map((matter) => (
                  <TableRow key={matter.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{matter.title}</div>
                        <div className="text-sm text-muted-foreground">{matter.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{matter.vendor}</div>
                        <div className="text-sm text-muted-foreground">{matter.partner}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{matter.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(matter.status)}
                        <Badge variant={getStatusColor(matter.status)}>
                          {matter.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`font-medium ${getPriorityColor(matter.priority)}`}>
                        {matter.priority}
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold">
                      ${(matter.budget / 1000).toFixed(0)}K
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">${(matter.spent / 1000).toFixed(0)}K</div>
                        <div className="text-sm text-muted-foreground">
                          ${(matter.remaining / 1000).toFixed(0)}K remaining
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`font-medium ${getUtilizationColor(matter.utilization)}`}>
                        {matter.utilization}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span className="text-sm">{matter.targetDate}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </TableCell>
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
