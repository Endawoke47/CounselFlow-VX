import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DrillDownSlideOver } from "@/components/ui/slide-over";
import { useDrillDown } from "@/hooks/useDrillDown";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  Filter,
  RefreshCw,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    type: "increase" | "decrease" | "neutral";
  };
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

interface AnalyticsDashboardProps {
  title: string;
  description?: string;
  metrics: MetricCardProps[];
  charts: {
    id: string;
    title: string;
    type: "bar" | "line" | "pie" | "area";
    data: ChartData[];
    dataKey?: string;
    xAxisKey?: string;
    colors?: string[];
    drillDownType?: string;
    module?: string;
  }[];
  timeRanges?: string[];
  onTimeRangeChange?: (range: string) => void;
  onRefresh?: () => void;
  onExport?: () => void;
}

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7300",
  "#00ff00",
  "#ff00ff",
];

export function AnalyticsDashboard({
  title,
  description,
  metrics,
  charts,
  timeRanges = ["7 days", "30 days", "90 days", "1 year"],
  onTimeRangeChange,
  onRefresh,
  onExport,
}: AnalyticsDashboardProps) {
  const [selectedTimeRange, setSelectedTimeRange] = React.useState(timeRanges[1]);
  const { drillDownData, isSlideOverOpen, openDrillDown, closeDrillDown } = useDrillDown();

  const handleTimeRangeChange = (range: string) => {
    setSelectedTimeRange(range);
    onTimeRangeChange?.(range);
  };

  const renderChart = (chart: AnalyticsDashboardProps["charts"][0]) => {
    const chartColors = chart.colors || COLORS;

    switch (chart.type) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart 
              data={chart.data}
              onClick={(data) => {
                if (data && data.activePayload && chart.drillDownType) {
                  const payload = data.activePayload[0]?.payload;
                  const name = payload?.[chart.xAxisKey || "name"];
                  openDrillDown(
                    chart.drillDownType, 
                    `${name} Details`, 
                    chart.module || chart.title,
                    { [chart.xAxisKey || "name"]: name }
                  );
                }
              }}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey={chart.xAxisKey || "name"} 
                className="text-xs"
                tick={{ fontSize: 12 }}
              />
              <YAxis className="text-xs" tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
              />
              <Bar 
                dataKey={chart.dataKey || "value"} 
                fill={chartColors[0]}
                radius={[4, 4, 0, 0]}
                style={{ cursor: chart.drillDownType ? "pointer" : "default" }}
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey={chart.xAxisKey || "name"} 
                className="text-xs"
                tick={{ fontSize: 12 }}
              />
              <YAxis className="text-xs" tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
              />
              <Line 
                type="monotone" 
                dataKey={chart.dataKey || "value"} 
                stroke={chartColors[0]}
                strokeWidth={2}
                dot={{ fill: chartColors[0], strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case "area":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey={chart.xAxisKey || "name"} 
                className="text-xs"
                tick={{ fontSize: 12 }}
              />
              <YAxis className="text-xs" tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
              />
              <Area 
                type="monotone" 
                dataKey={chart.dataKey || "value"} 
                stroke={chartColors[0]}
                fill={chartColors[0]}
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chart.data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey={chart.dataKey || "value"}
                onClick={(data) => {
                  if (data && data.name && chart.drillDownType) {
                    openDrillDown(
                      chart.drillDownType,
                      `${data.name} Details`,
                      chart.module || chart.title,
                      { category: data.name }
                    );
                  }
                }}
                style={{ cursor: chart.drillDownType ? "pointer" : "default" }}
              >
                {chart.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <select
              value={selectedTimeRange}
              onChange={(e) => handleTimeRangeChange(e.target.value)}
              className="text-sm border border-input rounded-md px-3 py-1 bg-background"
            >
              {timeRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>
          {onRefresh && (
            <Button variant="outline" size="sm" onClick={onRefresh}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          )}
          {onExport && (
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          )}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {charts.map((chart) => (
          <Card key={chart.id} className="card-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{chart.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {renderChart(chart)}
            </CardContent>
          </Card>
        ))}
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

function MetricCard({ title, value, change, description, icon: Icon }: MetricCardProps) {
  const getChangeIcon = () => {
    switch (change?.type) {
      case "increase":
        return <ArrowUpRight className="h-4 w-4 text-success-600" />;
      case "decrease":
        return <ArrowDownRight className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getChangeColor = () => {
    switch (change?.type) {
      case "increase":
        return "text-success-600";
      case "decrease":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className="card-shadow hover:card-shadow-hover hover-lift transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && (
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className={`flex items-center gap-1 text-sm ${getChangeColor()}`}>
            {getChangeIcon()}
            <span>{change.value}</span>
          </div>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

// Preset configurations for common legal analytics
export const legalAnalyticsPresets = {
  contracts: {
    title: "Contract Analytics",
    description: "Key metrics and trends for contract management",
    metrics: [
      {
        title: "Active Contracts",
        value: "247",
        change: { value: "+12% from last month", type: "increase" as const },
      },
      {
        title: "Expiring Soon",
        value: "23",
        change: { value: "+5 from last week", type: "increase" as const },
      },
      {
        title: "Total Value",
        value: "$2.4M",
        change: { value: "+8% from last quarter", type: "increase" as const },
      },
      {
        title: "Renewal Rate",
        value: "94%",
        change: { value: "+2% from last year", type: "increase" as const },
      },
    ],
    charts: [
      {
        id: "contract-status",
        title: "Contract Status Distribution",
        type: "pie" as const,
        drillDownType: "contracts",
        module: "Contract Management",
        data: [
          { name: "Active", value: 247 },
          { name: "Expiring", value: 23 },
          { name: "Expired", value: 12 },
          { name: "Draft", value: 8 },
        ],
      },
      {
        id: "monthly-contracts",
        title: "Monthly Contract Creation",
        type: "bar" as const,
        drillDownType: "contracts",
        module: "Contract Management",
        data: [
          { name: "Jan", value: 12 },
          { name: "Feb", value: 19 },
          { name: "Mar", value: 15 },
          { name: "Apr", value: 22 },
          { name: "May", value: 18 },
          { name: "Jun", value: 25 },
        ],
      },
    ],
  },
  matters: {
    title: "Matter Analytics",
    description: "Legal matter performance and workload analysis",
    metrics: [
      {
        title: "Active Matters",
        value: "89",
        change: { value: "+7% from last month", type: "increase" as const },
      },
      {
        title: "Avg Resolution Time",
        value: "45 days",
        change: { value: "-3 days from last quarter", type: "decrease" as const },
      },
      {
        title: "Success Rate",
        value: "87%",
        change: { value: "+2% from last year", type: "increase" as const },
      },
      {
        title: "Total Spend",
        value: "$890K",
        change: { value: "+12% from last quarter", type: "increase" as const },
      },
    ],
    charts: [
      {
        id: "matter-types",
        title: "Matter Types",
        type: "pie" as const,
        drillDownType: "matters",
        module: "Matter Management",
        data: [
          { name: "Commercial", value: 35 },
          { name: "Employment", value: 22 },
          { name: "IP", value: 18 },
          { name: "Regulatory", value: 14 },
        ],
      },
      {
        id: "resolution-trend",
        title: "Resolution Time Trend",
        type: "line" as const,
        drillDownType: "matters",
        module: "Matter Management",
        data: [
          { name: "Q1", value: 52 },
          { name: "Q2", value: 48 },
          { name: "Q3", value: 45 },
          { name: "Q4", value: 42 },
        ],
      },
    ],
  },
  risks: {
    title: "Risk Analytics",
    description: "Risk assessment and mitigation tracking",
    metrics: [
      {
        title: "Total Risks",
        value: "156",
        change: { value: "+8 from last month", type: "increase" as const },
      },
      {
        title: "High Priority",
        value: "23",
        change: { value: "-2 from last week", type: "decrease" as const },
      },
      {
        title: "Mitigation Rate",
        value: "78%",
        change: { value: "+5% from last quarter", type: "increase" as const },
      },
      {
        title: "Avg Risk Score",
        value: "6.2",
        change: { value: "-0.3 from last month", type: "decrease" as const },
      },
    ],
    charts: [
      {
        id: "risk-severity",
        title: "Risk Severity Distribution",
        type: "pie" as const,
        drillDownType: "risks",
        module: "Risk Management",
        data: [
          { name: "Low", value: 89 },
          { name: "Medium", value: 44 },
          { name: "High", value: 23 },
        ],
      },
      {
        id: "risk-trend",
        title: "Risk Trend Over Time",
        type: "area" as const,
        drillDownType: "risks",
        module: "Risk Management",
        data: [
          { name: "Jan", value: 142 },
          { name: "Feb", value: 148 },
          { name: "Mar", value: 151 },
          { name: "Apr", value: 156 },
        ],
      },
    ],
  },
}; 