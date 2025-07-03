import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Calendar, DollarSign, MapPin, Building, AlertTriangle } from "lucide-react";
import { useDealflow } from "@/hooks/useDealflow";

export function DealPipelineTracker() {
  const { deals, loading, error } = useDealflow();

  const statusOrder = ["Sourced", "Under Consideration", "Due Diligence", "Negotiation", "Completed", "Dropped"];

  const getStatusColor = (status: string) => {
    const colors = {
      "Sourced": "bg-gray-100 text-gray-800",
      "Under Consideration": "bg-blue-100 text-blue-800",
      "Due Diligence": "bg-yellow-100 text-yellow-800",
      "Negotiation": "bg-orange-100 text-orange-800",
      "Completed": "bg-green-100 text-green-800",
      "Dropped": "bg-red-100 text-red-800"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      "High": "bg-red-100 text-red-800",
      "Medium": "bg-yellow-100 text-yellow-800",
      "Low": "bg-green-100 text-green-800"
    };
    return colors[priority as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getRiskColor = (risk: string) => {
    const colors = {
      "High": "text-red-600",
      "Medium": "text-yellow-600",
      "Low": "text-green-600"
    };
    return colors[risk as keyof typeof colors] || "text-gray-600";
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stats-grid">
        <Card className="stat-card fade-in-up stagger-1 glassmorphic-card">
          <div className="stat-icon bg-gradient-to-br from-blue-500 to-blue-400 shadow-blue-200">📈</div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="stat-number text-2xl font-bold">{deals.filter(d => d.status !== 'Completed' && d.status !== 'Dropped').length}</div>
            <div className="stat-label text-xs text-muted-foreground">Live in pipeline</div>
          </CardContent>
        </Card>
        <Card className="stat-card fade-in-up stagger-2 glassmorphic-card">
          <div className="stat-icon bg-gradient-to-br from-green-500 to-green-400 shadow-green-200">💰</div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deal Value</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="stat-number text-2xl font-bold">
              ${deals.filter(d => d.status !== 'Completed' && d.status !== 'Dropped').reduce((sum, d) => sum + (d.dealSize || 0), 0).toLocaleString()}M
            </div>
            <div className="stat-label text-xs text-muted-foreground">Across active pipeline</div>
          </CardContent>
        </Card>
        <Card className="stat-card fade-in-up stagger-3 glassmorphic-card">
          <div className="stat-icon bg-gradient-to-br from-purple-500 to-purple-400 shadow-purple-200">🎯</div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Close Probability</CardTitle>
            <Calendar className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="stat-number text-2xl font-bold">
              {deals.length > 0 ? `${Math.round(deals.reduce((sum, d) => sum + (d.probability || 0), 0) / deals.length)}%` : 'N/A'}
            </div>
            <div className="stat-label text-xs text-muted-foreground">Based on current status</div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Deal Pipeline</CardTitle>
          <CardDescription>
            Track all investment opportunities through their lifecycle
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading deals...</div>
          ) : error ? (
            <div className="text-center text-destructive py-8">{error}</div>
          ) : (
            <div className="space-y-4">
              {deals.map((deal) => (
                <div key={deal.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold">{deal.name}</h4>
                        <Badge className={getStatusColor(deal.status)}>
                          {deal.status}
                        </Badge>
                        <Badge className={getPriorityColor(deal.priority)}>
                          {deal.priority} Priority
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          {deal.sector}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {deal.dealSize}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {deal.geography}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {deal.timeline}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Close Probability</span>
                            <span>{deal.probability}%</span>
                          </div>
                          <Progress value={deal.probability} className="h-2" />
                        </div>
                        <div className="flex items-center gap-1">
                          <AlertTriangle className={`h-4 w-4 ${getRiskColor(deal.riskLevel)}`} />
                          <span className={`text-sm ${getRiskColor(deal.riskLevel)}`}>
                            {deal.riskLevel} Risk
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        Owner: {deal.owner}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Update Status
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
