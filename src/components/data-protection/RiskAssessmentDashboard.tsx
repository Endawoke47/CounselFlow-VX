import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plus, Shield, AlertTriangle, Eye, Edit, Search, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function RiskAssessmentDashboard() {
  const [assessments, setAssessments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  useEffect(() => {
    async function fetchAssessments() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase.from("risks").select("*");
      if (error) {
        setError("Failed to load risk assessments.");
        setAssessments([]);
      } else {
        setAssessments(data || []);
      }
      setLoading(false);
    }
    fetchAssessments();
  }, []);

  const getRiskBadge = (score: number) => {
    if (score >= 75) {
      return <Badge className="bg-red-100 text-red-800">High Risk</Badge>;
    } else if (score >= 50) {
      return <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>;
    } else {
      return <Badge className="bg-green-100 text-green-800">Low Risk</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Complete":
        return <Badge className="bg-green-100 text-green-800">Complete</Badge>;
      case "In Progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "Under Review":
        return <Badge className="bg-purple-100 text-purple-800">Under Review</Badge>;
      case "Overdue":
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Filtering logic (type/status)
  const filtered = assessments.filter((a) => {
    const matchesSearch = a.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || a.severity?.toLowerCase() === selectedType;
    const matchesStatus = selectedStatus === "all" || a.status?.toLowerCase().replace(/ /g, "-") === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  // In summary cards and risk distribution, use assessments data for counts
  const totalAssessments = assessments.length;
  const highRiskCount = assessments.filter(a => a.riskScore >= 75).length;
  const overdueCount = assessments.filter(a => a.status === "Overdue").length;
  const completionRate = totalAssessments > 0 ? ((assessments.filter(a => a.status === "Complete").length) / totalAssessments * 100).toFixed(0) : 0;

  const riskScoreDistribution = [
    { range: "High Risk (75-100)", count: assessments.filter(a => a.riskScore >= 75).length, value: (highRiskCount / totalAssessments) * 100 },
    { range: "Medium Risk (50-74)", count: assessments.filter(a => a.riskScore < 75 && a.riskScore >= 50).length, value: ((assessments.filter(a => a.riskScore < 75 && a.riskScore >= 50).length) / totalAssessments) * 100 },
    { range: "Low Risk (0-49)", count: assessments.filter(a => a.riskScore < 50).length, value: ((assessments.filter(a => a.riskScore < 50).length) / totalAssessments) * 100 },
  ];

  if (loading) return <div className="p-6">Loading risk assessments...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Risk & Impact Assessments</h2>
          <p className="text-muted-foreground">
            Manage DPIAs, LIAs, and TIAs with smart templates and risk scoring
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            New DPIA
          </Button>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            New LIA
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New TIA
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAssessments}</div>
            <p className="text-xs text-muted-foreground">
              Across all entities
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highRiskCount}</div>
            <p className="text-xs text-muted-foreground">
              Require immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overdueCount}</div>
            <p className="text-xs text-muted-foreground">
              Past due date
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionRate}%</div>
            <p className="text-xs text-muted-foreground">
              On-time completion
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Score Distribution</CardTitle>
          <CardDescription>Assessment risk levels across all entities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {riskScoreDistribution.map((risk, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">{risk.range}</span>
                <span className="text-sm font-medium">{risk.count} assessments</span>
              </div>
              <Progress value={risk.value} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter Assessments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
              <Input
                placeholder="Search assessments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="dpia">DPIA</SelectItem>
                <SelectItem value="lia">LIA</SelectItem>
                <SelectItem value="tia">TIA</SelectItem>
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
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Assessments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Assessments ({filtered.length})</CardTitle>
          <CardDescription>Data Protection and Transfer Impact Assessments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assessment ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((assessment) => (
                <TableRow key={assessment.id}>
                  <TableCell className="font-medium">{assessment.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{assessment.title}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{assessment.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{assessment.riskScore}</span>
                      {getRiskBadge(assessment.riskScore)}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(assessment.status)}</TableCell>
                  <TableCell>{assessment.assignee}</TableCell>
                  <TableCell className="text-sm">{assessment.dueDate}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{assessment.entity}</div>
                      <div className="text-sm text-muted-foreground">{assessment.jurisdiction}</div>
                    </div>
                  </TableCell>
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
        </CardContent>
      </Card>
    </div>
  );
}
