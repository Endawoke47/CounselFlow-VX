import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DrillDownSlideOver } from "@/components/ui/slide-over";
import { useDrillDown } from "@/hooks/useDrillDown";
import { DollarSign, Users, AlertTriangle, TrendingUp, Clock, CheckCircle } from "lucide-react";

export function SpendOverviewDashboard() {
  const { drillDownData, isSlideOverOpen, openDrillDown, closeDrillDown } = useDrillDown();

  const overviewStats = [
    {
      title: "Total Spend (YTD)",
      value: "$2.4M",
      change: "+12% vs last year",
      icon: DollarSign,
      color: "text-blue-600",
      dataType: "matters",
      filters: { type: "spend" }
    },
    {
      title: "Active Vendors",
      value: "47",
      change: "3 new this quarter",
      icon: Users,
      color: "text-green-600",
      dataType: "matters",
      filters: { type: "vendor" }
    },
    {
      title: "Budget Utilization",
      value: "78%",
      change: "On track",
      icon: TrendingUp,
      color: "text-purple-600",
      dataType: "matters",
      filters: { type: "budget" }
    },
    {
      title: "Pending Invoices",
      value: "12",
      change: "$184K value",
      icon: Clock,
      color: "text-orange-600",
      dataType: "matters",
      filters: { status: "pending" }
    }
  ];

  const topVendors = [
    { name: "Davis Polk & Wardwell", spend: "$324K", matters: 8, rating: 4.8 },
    { name: "Clifford Chance", spend: "$298K", matters: 12, rating: 4.6 },
    { name: "Baker McKenzie", spend: "$267K", matters: 15, rating: 4.5 },
    { name: "Allen & Overy", spend: "$189K", matters: 6, rating: 4.7 },
    { name: "Freshfields", spend: "$156K", matters: 9, rating: 4.4 }
  ];

  const budgetBreakdown = [
    { category: "Litigation", budget: 850000, spent: 634000, percentage: 75 },
    { category: "M&A", budget: 520000, spent: 423000, percentage: 81 },
    { category: "Regulatory", budget: 380000, spent: 267000, percentage: 70 },
    { category: "IP", budget: 290000, spent: 198000, percentage: 68 },
    { category: "Employment", budget: 160000, spent: 124000, percentage: 78 }
  ];

  const alerts = [
    { type: "Budget", message: "M&A budget 81% utilized", severity: "warning" },
    { type: "Compliance", message: "3 vendors missing updated NDAs", severity: "error" },
    { type: "Performance", message: "Vendor review due: Norton Rose", severity: "info" },
    { type: "Invoice", message: "5 invoices overdue for approval", severity: "warning" }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat, index) => (
          <Card 
            key={index}
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
            onClick={() => openDrillDown(stat.dataType, stat.title, "Outsourced Matters & Spend", stat.filters)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top Vendors */}
      <Card>
        <CardHeader>
          <CardTitle>Top Vendors by Spend</CardTitle>
          <CardDescription>Leading external legal service providers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topVendors.map((vendor, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors"
                onClick={() => openDrillDown("matters", `${vendor.name} Matters`, "Vendor Management", { vendor: vendor.name })}
              >
                <div className="flex-1">
                  <div className="font-medium">{vendor.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {vendor.matters} matters • Rating: {vendor.rating}/5.0
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{vendor.spend}</div>
                  <div className="text-sm text-muted-foreground">YTD Spend</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Budget Breakdown and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Budget Utilization by Category</CardTitle>
            <CardDescription>Spend vs budget across practice areas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {budgetBreakdown.map((item, index) => (
              <div 
                key={index} 
                className="space-y-2 cursor-pointer hover:bg-accent p-2 rounded transition-colors"
                onClick={() => openDrillDown("matters", `${item.category} Matters`, "Spend Tracking", { category: item.category })}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.category}</span>
                  <span className="text-sm">{item.percentage}%</span>
                </div>
                <Progress value={item.percentage} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Spent: ${(item.spent / 1000).toFixed(0)}K</span>
                  <span>Budget: ${(item.budget / 1000).toFixed(0)}K</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alerts & Notifications</CardTitle>
            <CardDescription>Items requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => openDrillDown("matters", `${alert.type} Issues`, "Compliance & Performance", { type: alert.type.toLowerCase() })}
                >
                  <AlertTriangle className={`h-4 w-4 mt-0.5 ${
                    alert.severity === "error" ? "text-red-500" :
                    alert.severity === "warning" ? "text-yellow-500" :
                    "text-blue-500"
                  }`} />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{alert.type}</div>
                    <div className="text-sm text-muted-foreground">{alert.message}</div>
                  </div>
                  <Badge variant={
                    alert.severity === "error" ? "destructive" :
                    alert.severity === "warning" ? "secondary" :
                    "outline"
                  }>
                    {alert.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>Key performance indicators for external legal spend</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div 
              className="text-center cursor-pointer hover:bg-accent p-4 rounded transition-colors"
              onClick={() => openDrillDown("matters", "Cost Savings", "Performance Analytics", { metric: "savings" })}
            >
              <div className="text-2xl font-bold text-green-600">$340K</div>
              <div className="text-sm text-muted-foreground">Cost Savings YTD</div>
            </div>
            <div 
              className="text-center cursor-pointer hover:bg-accent p-4 rounded transition-colors"
              onClick={() => openDrillDown("matters", "Average Matter Cost", "Performance Analytics", { metric: "average_cost" })}
            >
              <div className="text-2xl font-bold text-blue-600">$28K</div>
              <div className="text-sm text-muted-foreground">Avg Matter Cost</div>
            </div>
            <div 
              className="text-center cursor-pointer hover:bg-accent p-4 rounded transition-colors"
              onClick={() => openDrillDown("matters", "Vendor Performance", "Performance Analytics", { metric: "performance" })}
            >
              <div className="text-2xl font-bold text-purple-600">4.6</div>
              <div className="text-sm text-muted-foreground">Avg Vendor Rating</div>
            </div>
            <div 
              className="text-center cursor-pointer hover:bg-accent p-4 rounded transition-colors"
              onClick={() => openDrillDown("matters", "Matter Resolution", "Performance Analytics", { metric: "resolution_time" })}
            >
              <div className="text-2xl font-bold text-orange-600">45 days</div>
              <div className="text-sm text-muted-foreground">Avg Resolution Time</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Drill Down Slide Over */}
      <DrillDownSlideOver
        isOpen={isSlideOverOpen}
        onClose={closeDrillDown}
        data={drillDownData}
      />
    </div>
  );
}
