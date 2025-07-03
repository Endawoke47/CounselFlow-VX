import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DrillDownSlideOver } from "@/components/ui/slide-over";
import { useDrillDown } from "@/hooks/useDrillDown";
import { Shield, AlertTriangle, FileText, Users, Clock, CheckCircle, Plus, TrendingUp } from "lucide-react";

export function DataProtectionOverview() {
  const [overview, setOverview] = useState<any>(null);
  const [recent, setRecent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { drillDownData, isSlideOverOpen, openDrillDown, closeDrillDown } = useDrillDown();

  useEffect(() => {
    async function fetchOverview() {
      setLoading(true);
      setError(null);
      try {
        // Aggregate stats from multiple tables
        const [ropa, dpias, dsrs, vendors, training] = await Promise.all([
          supabase.from("ropa_entries").select("id"),
          supabase.from("risks").select("id, status, severity"),
          supabase.from("dsr_requests").select("id, status"),
          supabase.from("vendor_assessments").select("id"),
          supabase.from("training_modules").select("id, completion_rate")
        ]);
        setOverview({
          ropaRecords: ropa.data?.length || 0,
          activeDPIAs: dpias.data?.filter((d: any) => d.status === "active").length || 0,
          openDSRs: dsrs.data?.filter((d: any) => d.status === "open").length || 0,
          complianceScore: 87, // Placeholder, replace with real calculation if available
          activeBreach: false, // Placeholder, replace with real breach status if available
          vendorsTracked: vendors.data?.length || 0,
          trainingCompletion: training.data?.[0]?.completion_rate || 0
        });
        // Recent activity: combine latest from each table
        setRecent([
          ...(dpias.data?.slice(0, 1).map((d: any) => ({ id: d.id, type: "DPIA", description: "New DPIA created", status: d.status, date: d.created_at })) || []),
          ...(dsrs.data?.slice(0, 1).map((d: any) => ({ id: d.id, type: "DSR", description: "New DSR request", status: d.status, date: d.created_at })) || []),
        ]);
      } catch (e) {
        setError("Failed to load data protection overview.");
      }
      setLoading(false);
    }
    fetchOverview();
  }, []);

  if (loading) return <div className="p-6">Loading data protection overview...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!overview) return null;

  const overviewStats = [
    {
      title: "ROPA Records",
      value: overview.ropaRecords,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      dataType: "compliance",
      filters: { type: "ropa" }
    },
    {
      title: "Active DPIAs",
      value: overview.activeDPIAs,
      icon: Shield,
      color: "text-green-600",
      bgColor: "bg-green-50",
      dataType: "compliance",
      filters: { type: "dpia", status: "active" }
    },
    {
      title: "Open DSRs",
      value: overview.openDSRs,
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      dataType: "tasks",
      filters: { type: "dsr", status: "open" }
    },
    {
      title: "Compliance Score",
      value: `${overview.complianceScore}%`,
      icon: CheckCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      dataType: "compliance",
      filters: { type: "score" }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Data Protection Overview</h2>
          <p className="text-muted-foreground">
            Monitor privacy compliance and data protection activities
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Assessment
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat, index) => (
          <Card 
            key={index}
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
            onClick={() => openDrillDown(stat.dataType, stat.title, "Data Protection", stat.filters)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Click to view details
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Compliance Status
            </CardTitle>
            <CardDescription>Current compliance across frameworks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div 
              className="space-y-2 cursor-pointer hover:bg-accent p-2 rounded transition-colors"
              onClick={() => openDrillDown("compliance", "GDPR Compliance", "Data Protection", { framework: "GDPR" })}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">GDPR</span>
                <span className="text-sm">94%</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
            
            <div 
              className="space-y-2 cursor-pointer hover:bg-accent p-2 rounded transition-colors"
              onClick={() => openDrillDown("compliance", "CCPA Compliance", "Data Protection", { framework: "CCPA" })}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">CCPA</span>
                <span className="text-sm">87%</span>
              </div>
              <Progress value={87} className="h-2" />
            </div>
            
            <div 
              className="space-y-2 cursor-pointer hover:bg-accent p-2 rounded transition-colors"
              onClick={() => openDrillDown("compliance", "PIPEDA Compliance", "Data Protection", { framework: "PIPEDA" })}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">PIPEDA</span>
                <span className="text-sm">91%</span>
              </div>
              <Progress value={91} className="h-2" />
            </div>
            
            <div 
              className="space-y-2 cursor-pointer hover:bg-accent p-2 rounded transition-colors"
              onClick={() => openDrillDown("compliance", "LGPD Compliance", "Data Protection", { framework: "LGPD" })}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">LGPD</span>
                <span className="text-sm">83%</span>
              </div>
              <Progress value={83} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest data protection activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recent.map((activity) => (
                <div 
                  key={activity.id} 
                  className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => openDrillDown("tasks", `${activity.type} Activities`, "Data Protection", { type: activity.type.toLowerCase() })}
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    {activity.type === "DPIA" && <Shield className="h-4 w-4 text-primary" />}
                    {activity.type === "DSR" && <Users className="h-4 w-4 text-primary" />}
                    {activity.type === "Compliance" && <CheckCircle className="h-4 w-4 text-primary" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{activity.description}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {activity.type}
                      </Badge>
                      <Badge 
                        variant={
                          activity.status === "Complete" ? "default" :
                          activity.status === "In Review" ? "secondary" :
                          "outline"
                        }
                        className="text-xs"
                      >
                        {activity.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{activity.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              Vendor Oversight
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="text-center cursor-pointer hover:bg-accent p-4 rounded transition-colors"
              onClick={() => openDrillDown("compliance", "Vendor Data Processing", "Data Protection", { type: "vendor" })}
            >
              <div className="text-2xl font-bold">{overview.vendorsTracked}</div>
              <div className="text-sm text-muted-foreground">Vendors Tracked</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Training Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="space-y-2 cursor-pointer hover:bg-accent p-2 rounded transition-colors"
              onClick={() => openDrillDown("tasks", "Privacy Training", "Data Protection", { type: "training" })}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Completion Rate</span>
                <span className="text-sm">{overview.trainingCompletion}%</span>
              </div>
              <Progress value={overview.trainingCompletion} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Breach Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="text-center cursor-pointer hover:bg-accent p-4 rounded transition-colors"
              onClick={() => openDrillDown("risks", "Data Breaches", "Data Protection", { type: "breach" })}
            >
              <div className="text-2xl font-bold text-green-600">0</div>
              <div className="text-sm text-muted-foreground">Active Breaches</div>
              <Badge variant="outline" className="mt-2">
                All Clear
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Drill Down Slide Over */}
      <DrillDownSlideOver
        isOpen={isSlideOverOpen}
        onClose={closeDrillDown}
        data={drillDownData}
      />
    </div>
  );
}
