import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DrillDownSlideOver } from "@/components/ui/slide-over";
import { useDrillDown } from "@/hooks/useDrillDown";
import { ApiServiceFactory } from '@/services/api/index';
import { 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign,
  Calendar,
  FileText,
  Clock,
  Target
} from "lucide-react";

export function IPDashboardOverview() {
  const { drillDownData, isSlideOverOpen, openDrillDown, closeDrillDown } = useDrillDown();
  const [stats, setStats] = useState<any[]>([]);
  const [upcomingRenewals, setUpcomingRenewals] = useState<any[]>([]);
  const [portfolioBreakdown, setPortfolioBreakdown] = useState<any[]>([]);
  const [jurisdictionData, setJurisdictionData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        // Fetch all IP assets using the API service
        const assets = await ApiServiceFactory.getIPAssetService().getIPAssets();
        if (!assets) throw new Error('No IP assets found');
        // Stats
        const totalAssets = assets.length;
        const activePatents = assets.filter(a => a.type === "Patent" && a.status === "registered").length;
        const renewalsDue = assets.filter(a => a.expiration_date && new Date(a.expiration_date) < new Date(Date.now() + 30*24*60*60*1000)).length;
        // Revenue: TODO - replace with real revenue data if available
        const ipRevenue = assets.reduce((sum, a) => sum + (a.estimated_value || 0), 0);
        setStats([
          {
            title: "Total IP Assets",
            value: totalAssets,
            change: "",
            icon: Shield,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            dataType: "compliance",
            filters: { type: "ip_assets" }
          },
          {
            title: "Active Patents",
            value: activePatents,
            change: "",
            icon: FileText,
            color: "text-green-600",
            bgColor: "bg-green-50",
            dataType: "compliance",
            filters: { type: "patents", status: "active" }
          },
          {
            title: "Renewals Due",
            value: renewalsDue,
            change: "Next 30 days",
            icon: Calendar,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
            dataType: "tasks",
            filters: { type: "renewals", status: "due" }
          },
          {
            title: "IP Revenue",
            value: `$${ipRevenue.toLocaleString()}`,
            change: "",
            icon: DollarSign,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
            dataType: "matters",
            filters: { type: "ip_revenue" }
          }
        ]);
        // Upcoming Renewals
        setUpcomingRenewals(
          assets.filter(a => a.expiration_date && new Date(a.expiration_date) < new Date(Date.now() + 60*24*60*60*1000))
            .map(a => ({
              id: a.id,
              title: a.title,
              type: a.type,
              renewalDate: a.expiration_date,
              jurisdiction: a.jurisdiction,
              cost: a.maintenance_fees ? `$${a.maintenance_fees.toLocaleString()}` : "N/A"
            }))
        );
        // Portfolio Breakdown
        const typeCounts: Record<string, number> = {};
        assets.forEach(a => { typeCounts[a.type] = (typeCounts[a.type] || 0) + 1; });
        const total = assets.length;
        setPortfolioBreakdown(
          Object.entries(typeCounts).map(([type, count]) => ({
            type,
            count,
            percentage: Math.round((count / total) * 100)
          }))
        );
        // Jurisdiction Data
        const jurisdictionCounts: Record<string, { assets: number, renewals: number }> = {};
        assets.forEach(a => {
          const j = a.jurisdiction || "Unknown";
          if (!jurisdictionCounts[j]) jurisdictionCounts[j] = { assets: 0, renewals: 0 };
          jurisdictionCounts[j].assets++;
          if (a.expiration_date && new Date(a.expiration_date) < new Date(Date.now() + 60*24*60*60*1000)) {
            jurisdictionCounts[j].renewals++;
          }
        });
        setJurisdictionData(
          Object.entries(jurisdictionCounts).map(([jurisdiction, data]) => ({
            jurisdiction,
            ...data
          }))
        );
      } catch (err) {
        setError((err as Error).message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading IP dashboard...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">IP Portfolio Overview</h2>
          <p className="text-muted-foreground">
            Monitor and manage intellectual property assets across all jurisdictions
          </p>
        </div>
        <Button className="gap-2">
          <Target className="h-4 w-4" />
          New Application
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card 
            key={index}
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 glass"
            onClick={() => openDrillDown(stat.dataType, stat.title, "IP Management", stat.filters)}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.change}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Renewals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              Upcoming Renewals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingRenewals.map((renewal) => (
                <div 
                  key={renewal.id} 
                  className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => openDrillDown("tasks", `${renewal.type} Renewals`, "IP Management", { type: renewal.type.toLowerCase() })}
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    {renewal.type === "Patent" ? 
                      <Shield className="h-4 w-4 text-primary" /> : 
                      <FileText className="h-4 w-4 text-primary" />
                    }
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{renewal.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {renewal.id} • {renewal.jurisdiction}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {renewal.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Due: {renewal.renewalDate}
                      </span>
                      <span className="text-xs font-medium text-green-600">
                        {renewal.cost}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              Portfolio Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {portfolioBreakdown.map((item, index) => (
              <div 
                key={index} 
                className="space-y-2 cursor-pointer hover:bg-accent p-2 rounded transition-colors"
                onClick={() => openDrillDown("compliance", `${item.type} Portfolio`, "IP Management", { type: item.type.toLowerCase() })}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.type}</span>
                  <span className="text-sm">{item.count} assets</span>
                </div>
                <Progress value={item.percentage} className="h-2" />
                <div className="text-xs text-muted-foreground text-right">
                  {item.percentage}% of portfolio
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Jurisdiction Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Assets by Jurisdiction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jurisdictionData.map((jurisdiction, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors"
                onClick={() => openDrillDown("compliance", `${jurisdiction.jurisdiction} IP Assets`, "IP Management", { jurisdiction: jurisdiction.jurisdiction })}
              >
                <div className="flex-1">
                  <div className="font-medium">{jurisdiction.jurisdiction}</div>
                  <div className="text-sm text-muted-foreground">
                    {jurisdiction.assets} total assets
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{jurisdiction.assets}</div>
                  <div className="text-sm text-muted-foreground">
                    {jurisdiction.renewals} renewals due
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Revenue Generated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="text-center cursor-pointer hover:bg-accent p-4 rounded transition-colors"
              onClick={() => openDrillDown("matters", "IP Revenue Streams", "IP Management", { type: "revenue" })}
            >
              <div className="text-2xl font-bold text-green-600">$2.3M</div>
              <div className="text-sm text-muted-foreground">This Year</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Protection Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="space-y-2 cursor-pointer hover:bg-accent p-2 rounded transition-colors"
              onClick={() => openDrillDown("compliance", "IP Protection Status", "IP Management", { metric: "protection_rate" })}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Protected</span>
                <span className="text-sm">94%</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              At Risk Assets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="text-center cursor-pointer hover:bg-accent p-4 rounded transition-colors"
              onClick={() => openDrillDown("risks", "At Risk IP Assets", "IP Management", { status: "at_risk" })}
            >
              <div className="text-2xl font-bold text-orange-600">12</div>
              <div className="text-sm text-muted-foreground">Require Action</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              Avg Processing Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="text-center cursor-pointer hover:bg-accent p-4 rounded transition-colors"
              onClick={() => openDrillDown("tasks", "Application Processing", "IP Management", { metric: "processing_time" })}
            >
              <div className="text-2xl font-bold text-purple-600">18 mo</div>
              <div className="text-sm text-muted-foreground">Patent Applications</div>
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
