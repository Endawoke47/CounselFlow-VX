
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SpendOverviewDashboard } from "./SpendOverviewDashboard";
import { OutsourcedMatters } from "./OutsourcedMatters";
import { VendorManagement } from "./VendorManagement";
import { SpendTracking } from "./SpendTracking";
import { PerformanceEvaluation } from "./PerformanceEvaluation";
import { ComplianceOnboarding } from "./ComplianceOnboarding";
import { SpendAnalytics } from "./SpendAnalytics";

export function OutsourcedMattersSpendDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Outsourced Matters & Spend</h1>
          <p className="text-muted-foreground">
            Manage external legal vendors, track spend, and monitor performance
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="matters">Matters</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="spend">Spend & Budget</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <SpendOverviewDashboard />
        </TabsContent>

        <TabsContent value="matters" className="space-y-6">
          <OutsourcedMatters />
        </TabsContent>

        <TabsContent value="vendors" className="space-y-6">
          <VendorManagement />
        </TabsContent>

        <TabsContent value="spend" className="space-y-6">
          <SpendTracking />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <PerformanceEvaluation />
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <ComplianceOnboarding />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <SpendAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}
