import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plus, FileText, Users, GraduationCap, CheckCircle, Search, Eye, Edit, Download } from "lucide-react";

export function PolicyGovernance() {
  const [policies, setPolicies] = useState<any[]>([]);
  const [trainingModules, setTrainingModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [activeTab, setActiveTab] = useState("policies");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      const { data: policiesData, error: policiesError } = await supabase.from("policies").select("*");
      const { data: trainingData, error: trainingError } = await supabase.from("training_modules").select("*");
      if (policiesError || trainingError) {
        setError("Failed to load policy or training data");
        setPolicies([]);
        setTrainingModules([]);
      } else {
        setPolicies(policiesData || []);
        setTrainingModules(trainingData || []);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge variant="default">Active</Badge>;
      case "Under Review":
        return <Badge variant="secondary">Under Review</Badge>;
      case "Draft":
        return <Badge variant="secondary">Draft</Badge>;
      case "Archived":
        return <Badge variant="outline">Archived</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getCompletionBadge = (rate: number) => {
    if (rate >= 90) {
      return <Badge variant="default">Excellent</Badge>;
    } else if (rate >= 75) {
      return <Badge variant="secondary">Good</Badge>;
    } else {
      return <Badge variant="destructive">Needs Attention</Badge>;
    }
  };

  if (loading) return <div className="p-8 text-center">Loading policy and training data...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Policy, Training & Governance</h2>
          <p className="text-muted-foreground">
            Manage privacy policies, training programs, and governance frameworks
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setActiveTab("policies")} 
                  className={activeTab === "policies" ? "bg-primary text-primary-foreground" : ""}>
            Policies
          </Button>
          <Button variant="outline" onClick={() => setActiveTab("training")}
                  className={activeTab === "training" ? "bg-primary text-primary-foreground" : ""}>
            Training
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Policies</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{policies.filter(policy => policy.status === "Active").length}</div>
            <p className="text-xs text-muted-foreground">
              Across all categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Acknowledgment Rate</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((policies.reduce((acc, policy) => acc + policy.acknowledgments, 0) / policies.reduce((acc, policy) => acc + policy.totalUsers, 0)) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              User acknowledgments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Completion</CardTitle>
            <GraduationCap className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((trainingModules.reduce((acc, module) => acc + module.completed, 0) / trainingModules.reduce((acc, module) => acc + module.assigned, 0)) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Overall completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reviews Due</CardTitle>
            <CheckCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {policies.filter(policy => new Date(policy.nextReview) <= new Date(new Date().setDate(new Date().getDate() + 90))).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Next 90 days
            </p>
          </CardContent>
        </Card>
      </div>

      {activeTab === "policies" && (
        <>
          {/* Policy Management Section */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Privacy Policies & Standards</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Policy
            </Button>
          </div>

          {/* Policy Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Search & Filter Policies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    placeholder="Search policies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Policy Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="privacy-notice">Privacy Notice</SelectItem>
                    <SelectItem value="internal-standard">Internal Standard</SelectItem>
                    <SelectItem value="procedure">Procedure</SelectItem>
                    <SelectItem value="guideline">Guideline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Policies Table */}
          <Card>
            <CardHeader>
              <CardTitle>Privacy Policies ({policies.length})</CardTitle>
              <CardDescription>Active policies and governance documents</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Policy ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Acknowledgments</TableHead>
                    <TableHead>Next Review</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {policies.filter(policy => {
                    if (selectedType !== "all" && policy.type !== selectedType) return false;
                    if (searchTerm && !policy.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
                    return true;
                  }).map((policy) => (
                    <TableRow key={policy.id}>
                      <TableCell className="font-medium">{policy.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{policy.title}</div>
                          <div className="text-sm text-muted-foreground">{policy.audience}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{policy.type}</Badge>
                      </TableCell>
                      <TableCell>v{policy.version}</TableCell>
                      <TableCell>{getStatusBadge(policy.status)}</TableCell>
                      <TableCell className="text-sm">{policy.owner}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{policy.acknowledgments}/{policy.totalUsers}</span>
                          <Progress value={(policy.acknowledgments / policy.totalUsers) * 100} className="h-1 w-16" />
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{policy.nextReview}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}

      {activeTab === "training" && (
        <>
          {/* Training Management Section */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Privacy Training Programs</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Training Module
            </Button>
          </div>

          {/* Training Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Training Completion Overview</CardTitle>
              <CardDescription>Progress across all privacy training modules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Mandatory Training</span>
                  <span className="text-sm font-medium">
                    {Math.round((trainingModules.filter(module => module.type === "Mandatory").reduce((acc, module) => acc + module.completed, 0) / trainingModules.filter(module => module.type === "Mandatory").reduce((acc, module) => acc + module.assigned, 0)) * 100)}% complete
                  </span>
                </div>
                <Progress value={93} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Role-Based Training</span>
                  <span className="text-sm font-medium">
                    {Math.round((trainingModules.filter(module => module.type === "Role-Based").reduce((acc, module) => acc + module.completed, 0) / trainingModules.filter(module => module.type === "Role-Based").reduce((acc, module) => acc + module.assigned, 0)) * 100)}% complete
                  </span>
                </div>
                <Progress value={87} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Specialist Training</span>
                  <span className="text-sm font-medium">
                    {Math.round((trainingModules.filter(module => module.type === "Specialist").reduce((acc, module) => acc + module.completed, 0) / trainingModules.filter(module => module.type === "Specialist").reduce((acc, module) => acc + module.assigned, 0)) * 100)}% complete
                  </span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Training Modules Table */}
          <Card>
            <CardHeader>
              <CardTitle>Training Modules ({trainingModules.length})</CardTitle>
              <CardDescription>Privacy training programs and completion tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Module ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Target Audience</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Completion Rate</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trainingModules.map((module) => (
                    <TableRow key={module.id}>
                      <TableCell className="font-medium">{module.id}</TableCell>
                      <TableCell className="font-medium">{module.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{module.type}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{module.target}</TableCell>
                      <TableCell className="text-sm">{module.duration}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{module.completed}/{module.assigned}</span>
                          <Progress value={module.completionRate} className="h-1 w-16" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{module.completionRate}%</span>
                          {getCompletionBadge(module.completionRate)}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{module.deadline}</TableCell>
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
        </>
      )}
    </div>
  );
}
