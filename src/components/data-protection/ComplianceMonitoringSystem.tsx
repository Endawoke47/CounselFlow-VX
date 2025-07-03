import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Bell,
  Settings,
  FileText,
  Globe,
  Calendar,
  Target,
  Activity,
  BarChart3,
  RefreshCw,
  Download,
  Filter,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ComplianceFramework {
  id: string;
  name: string;
  description: string;
  status: "compliant" | "partial" | "non-compliant" | "pending";
  score: number;
  lastAssessment: string;
  nextReview: string;
  requirements: ComplianceRequirement[];
  jurisdiction: string;
  category: string;
}

interface ComplianceRequirement {
  id: string;
  title: string;
  description: string;
  status: "met" | "partial" | "not-met" | "pending";
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  assignee?: string;
  evidence: string[];
  lastUpdated: string;
}

interface ComplianceAlert {
  id: string;
  type: "deadline" | "regulatory_change" | "non_compliance" | "review_required";
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  framework: string;
  dueDate?: string;
  createdAt: string;
  acknowledged: boolean;
}

interface RegulatoryUpdate {
  id: string;
  title: string;
  description: string;
  regulation: string;
  jurisdiction: string;
  effectiveDate: string;
  impact: "low" | "medium" | "high";
  category: string;
  actionRequired: boolean;
  source: string;
}

export function ComplianceMonitoringSystem() {
  const [frameworks, setFrameworks] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFramework, setSelectedFramework] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("30d");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      const [fwRes, alertRes] = await Promise.all([
        supabase.from("compliance_frameworks").select("*"),
        supabase.from("compliance_alerts").select("*")
      ]);
      if (fwRes.error) setError("Failed to load compliance frameworks.");
      if (alertRes.error) setError("Failed to load compliance alerts.");
      setFrameworks(fwRes.data || []);
      setAlerts(alertRes.data || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
      case "met":
        return <CheckCircle className="h-4 w-4 text-success-600" />;
      case "partial":
        return <AlertTriangle className="h-4 w-4 text-warning-600" />;
      case "non-compliant":
      case "not-met":
        return <XCircle className="h-4 w-4 text-destructive" />;
      case "pending":
        return <Clock className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "compliant":
      case "met":
        return "default";
      case "partial":
        return "secondary";
      case "non-compliant":
      case "not-met":
        return "destructive";
      case "pending":
        return "outline";
      default:
        return "outline";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-destructive";
      case "high":
        return "text-destructive";
      case "medium":
        return "text-warning-600";
      case "low":
        return "text-muted-foreground";
      default:
        return "text-muted-foreground";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "deadline":
        return <Clock className="h-4 w-4 text-warning-600" />;
      case "regulatory_change":
        return <Globe className="h-4 w-4 text-info-600" />;
      case "non_compliance":
        return <XCircle className="h-4 w-4 text-destructive" />;
      case "review_required":
        return <FileText className="h-4 w-4 text-primary" />;
      default:
        return <Bell className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const overallComplianceScore = Math.round(
    frameworks.reduce((sum, f) => sum + f.score, 0) / frameworks.length
  );

  const criticalAlerts = alerts.filter(a => a.severity === "critical" || a.severity === "high").length;
  const pendingRequirements = frameworks.reduce((sum, f) => 
    sum + f.requirements.filter(r => r.status === "pending" || r.status === "not-met").length, 0
  );

  if (loading) return <div className="p-6">Loading compliance data...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Compliance Monitoring System
          </h2>
          <p className="text-muted-foreground">
            Real-time compliance tracking and regulatory change monitoring
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 days</SelectItem>
              <SelectItem value="30d">30 days</SelectItem>
              <SelectItem value="90d">90 days</SelectItem>
              <SelectItem value="1y">1 year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Overall Compliance Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallComplianceScore}%</div>
            <Progress value={overallComplianceScore} className="mt-2" />
            <div className="flex items-center gap-1 text-sm text-success-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              <span>+3% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Critical Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{criticalAlerts}</div>
            <p className="text-sm text-muted-foreground mt-1">
              Require immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning-600">{pendingRequirements}</div>
            <p className="text-sm text-muted-foreground mt-1">
              Awaiting completion
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Frameworks Monitored
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{frameworks.length}</div>
            <p className="text-sm text-muted-foreground mt-1">
              Active compliance frameworks
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="updates">Regulatory Updates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Critical Alerts */}
          {alerts.filter(a => !a.acknowledged && (a.severity === "critical" || a.severity === "high")).length > 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                You have {alerts.filter(a => !a.acknowledged && (a.severity === "critical" || a.severity === "high")).length} critical compliance alerts requiring immediate attention.
              </AlertDescription>
            </Alert>
          )}

          {/* Framework Status Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {frameworks.map((framework) => (
              <Card key={framework.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {getStatusIcon(framework.status)}
                        {framework.name}
                      </CardTitle>
                      <CardDescription>{framework.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{framework.score}%</div>
                      <Badge variant={getStatusBadgeVariant(framework.status)} className="text-xs">
                        {framework.status.replace("-", " ").toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Progress value={framework.score} />
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Last Assessment</p>
                      <p className="font-medium">{new Date(framework.lastAssessment).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Next Review</p>
                      <p className="font-medium">{new Date(framework.nextReview).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{framework.requirements.length} requirements</span>
                      <span>{framework.jurisdiction}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="frameworks" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Select value={selectedFramework} onValueChange={setSelectedFramework}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select framework" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Frameworks</SelectItem>
                  {frameworks.map((framework) => (
                    <SelectItem key={framework.id} value={framework.id}>
                      {framework.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            <Button>
              <Target className="h-4 w-4 mr-2" />
              Add Framework
            </Button>
          </div>

          <div className="space-y-6">
            {frameworks
              .filter(f => selectedFramework === "all" || f.id === selectedFramework)
              .map((framework) => (
                <Card key={framework.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                          {getStatusIcon(framework.status)}
                          {framework.name}
                        </CardTitle>
                        <CardDescription>{framework.description}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{framework.jurisdiction}</Badge>
                        <Badge variant="outline">{framework.category}</Badge>
                        <Badge variant={getStatusBadgeVariant(framework.status)}>
                          {framework.status.replace("-", " ").toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium">Compliance Score</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={framework.score} className="flex-1" />
                          <span className="text-sm font-bold">{framework.score}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Last Assessment</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(framework.lastAssessment).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Next Review</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(framework.nextReview).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Requirements</h4>
                      <div className="space-y-3">
                        {framework.requirements.map((req) => (
                          <div key={req.id} className="border rounded-lg p-3">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(req.status)}
                                  <h5 className="font-medium">{req.title}</h5>
                                  <Badge variant={getStatusBadgeVariant(req.priority)} className="text-xs">
                                    {req.priority}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {req.description}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  {req.assignee && (
                                    <span>Assigned to: {req.assignee}</span>
                                  )}
                                  {req.dueDate && (
                                    <span>Due: {new Date(req.dueDate).toLocaleDateString()}</span>
                                  )}
                                  <span>Updated: {new Date(req.lastUpdated).toLocaleDateString()}</span>
                                </div>
                              </div>
                              <Badge variant={getStatusBadgeVariant(req.status)} className="text-xs">
                                {req.status.replace("-", " ").toUpperCase()}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {alerts.filter(a => !a.acknowledged).length} unacknowledged alerts
            </p>
            <Button variant="outline" size="sm">
              Mark All as Read
            </Button>
          </div>

          <div className="space-y-3">
            {alerts.map((alert) => (
              <Card key={alert.id} className={`${!alert.acknowledged ? "border-l-4 border-l-primary" : ""}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getAlertIcon(alert.type)}
                      <div>
                        <CardTitle className="text-base">{alert.title}</CardTitle>
                        <CardDescription>{alert.description}</CardDescription>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {alert.framework}
                          </Badge>
                          <Badge variant={alert.severity === "critical" || alert.severity === "high" ? "destructive" : "secondary"} className="text-xs">
                            {alert.severity.toUpperCase()}
                          </Badge>
                          {alert.dueDate && (
                            <Badge variant="outline" className="text-xs">
                              Due: {new Date(alert.dueDate).toLocaleDateString()}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!alert.acknowledged && (
                        <Button variant="outline" size="sm">
                          Acknowledge
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="updates" className="space-y-4">
          <div className="space-y-4">
            {regulatoryUpdates.map((update) => (
              <Card key={update.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{update.title}</CardTitle>
                      <CardDescription>{update.description}</CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{update.regulation}</Badge>
                        <Badge variant="outline">{update.jurisdiction}</Badge>
                        <Badge variant="outline">{update.category}</Badge>
                        <Badge variant={update.impact === "high" ? "destructive" : update.impact === "medium" ? "secondary" : "default"}>
                          {update.impact.toUpperCase()} IMPACT
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Effective Date</p>
                      <p className="font-medium">{new Date(update.effectiveDate).toLocaleDateString()}</p>
                      {update.actionRequired && (
                        <Badge variant="destructive" className="text-xs mt-1">
                          Action Required
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Source: {update.source}
                    </p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        View Full Update
                      </Button>
                      {update.actionRequired && (
                        <Button size="sm">
                          Create Action Plan
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Compliance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Overall Compliance</span>
                    <div className="flex items-center gap-2">
                      <Progress value={overallComplianceScore} className="w-24" />
                      <span className="text-sm font-medium">{overallComplianceScore}%</span>
                    </div>
                  </div>
                  {frameworks.map((framework) => (
                    <div key={framework.id} className="flex items-center justify-between">
                      <span className="text-sm">{framework.name}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={framework.score} className="w-24" />
                        <span className="text-sm font-medium">{framework.score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Alert Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-destructive">{alerts.filter(a => a.severity === "critical" || a.severity === "high").length}</div>
                      <p className="text-sm text-muted-foreground">High Priority</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-warning-600">{alerts.filter(a => a.severity === "medium").length}</div>
                      <p className="text-sm text-muted-foreground">Medium Priority</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-muted-foreground">{alerts.filter(a => a.severity === "low").length}</div>
                    <p className="text-sm text-muted-foreground">Low Priority</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}