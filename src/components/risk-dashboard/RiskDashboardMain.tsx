
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RiskOverviewDashboard } from "./RiskOverviewDashboard";
import { RiskRegistry } from "./RiskRegistry";
import { RiskVisualization } from "./RiskVisualization";
import { MitigationTracking } from "./MitigationTracking";
import { RiskReporting } from "./RiskReporting";

export function RiskDashboardMain() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Risk Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor, assess, and mitigate legal and regulatory risks across the organization
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="registry">Risk Registry</TabsTrigger>
          <TabsTrigger value="visualization">Risk Analysis</TabsTrigger>
          <TabsTrigger value="mitigation">Mitigation</TabsTrigger>
          <TabsTrigger value="reporting">Reporting</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <RiskOverviewDashboard />
        </TabsContent>

        <TabsContent value="registry" className="space-y-6">
          <RiskRegistry />
        </TabsContent>

        <TabsContent value="visualization" className="space-y-6">
          <RiskVisualization />
        </TabsContent>

        <TabsContent value="mitigation" className="space-y-6">
          <MitigationTracking />
        </TabsContent>

        <TabsContent value="reporting" className="space-y-6">
          <RiskReporting />
        </TabsContent>
      </Tabs>
    </div>
  );
}
