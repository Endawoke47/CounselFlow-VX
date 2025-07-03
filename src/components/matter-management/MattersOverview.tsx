import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, AlertTriangle, TrendingUp, Users, Target } from "lucide-react";

export function MattersOverview() {
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      setError(null);
      try {
        // Fetch stats from Supabase
        const [matters, advice, risks] = await Promise.all([
          supabase.from("matters").select("id, status, sla_breached, resolution_time"),
          supabase.from("advice_requests").select("id, created_at"),
          supabase.from("risks").select("id, priority, status")
        ]);
        setStats([
          {
            title: "Open Matters",
            value: matters.data?.filter((m: any) => m.status === "open").length || 0,
            change: "", // Optionally calculate change
            icon: FileText,
            color: "text-blue-600",
            bgColor: "bg-blue-50"
          },
          {
            title: "SLA Breaches",
            value: matters.data?.filter((m: any) => m.sla_breached).length || 0,
            change: "",
            icon: AlertTriangle,
            color: "text-red-600",
            bgColor: "bg-red-50"
          },
          {
            title: "Advice Requests",
            value: advice.data?.length || 0,
            change: "",
            icon: Clock,
            color: "text-orange-600",
            bgColor: "bg-orange-50"
          },
          {
            title: "Avg Resolution Time",
            value: matters.data && matters.data.length > 0 ? `${(
              matters.data.reduce((sum: number, m: any) => sum + (m.resolution_time || 0), 0) / matters.data.length
            ).toFixed(1)} days` : "-",
            change: "",
            icon: TrendingUp,
            color: "text-green-600",
            bgColor: "bg-green-50"
          },
          {
            title: "Active Risks",
            value: risks.data?.filter((r: any) => r.status === "active").length || 0,
            change: risks.data?.filter((r: any) => r.priority === "high").length + " high priority" || "",
            icon: Target,
            color: "text-purple-600",
            bgColor: "bg-purple-50"
          },
          {
            title: "Team Workload",
            value: "-",
            change: "Capacity utilization",
            icon: Users,
            color: "text-indigo-600",
            bgColor: "bg-indigo-50"
          }
        ]);
      } catch (e) {
        setError("Failed to load matter stats.");
      }
      setLoading(false);
    }
    fetchStats();
  }, []);

  if (loading) return <div className="p-6">Loading matter stats...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
