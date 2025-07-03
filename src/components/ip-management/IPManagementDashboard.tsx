
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IPAssetRegister } from "./IPAssetRegister";
import { LifecycleTracking } from "./LifecycleTracking";
import { IPRiskMonitoring } from "./IPRiskMonitoring";
import { CommercializationManagement } from "./CommercializationManagement";
import { IPTemplateLibrary } from "./IPTemplateLibrary";
import { IPDashboardOverview } from "./IPDashboardOverview";

export function IPManagementDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">IP Management</h1>
          <p className="text-muted-foreground">
            Strategically manage, protect, and commercialize intellectual property assets
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="register">Asset Register</TabsTrigger>
          <TabsTrigger value="lifecycle">Lifecycle</TabsTrigger>
          <TabsTrigger value="risk">Risk & Disputes</TabsTrigger>
          <TabsTrigger value="commercialization">Commercialization</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <IPDashboardOverview />
        </TabsContent>

        <TabsContent value="register" className="space-y-6">
          <IPAssetRegister />
        </TabsContent>

        <TabsContent value="lifecycle" className="space-y-6">
          <LifecycleTracking />
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <IPRiskMonitoring />
        </TabsContent>

        <TabsContent value="commercialization" className="space-y-6">
          <CommercializationManagement />
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <IPTemplateLibrary />
        </TabsContent>
      </Tabs>
    </div>
  );
}
