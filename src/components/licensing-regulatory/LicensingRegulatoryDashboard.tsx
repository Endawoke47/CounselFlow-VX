
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LicenseRegistryDashboard } from "./LicenseRegistryDashboard";
import { RegulatoryWatchlist } from "./RegulatoryWatchlist";
import { ComplianceActions } from "./ComplianceActions";
import { LicensingReportingDashboard } from "./LicensingReportingDashboard";

export function LicensingRegulatoryDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Licensing & Regulatory</h1>
          <p className="text-muted-foreground">
            Manage licenses, monitor regulatory changes, and track compliance actions
          </p>
        </div>
      </div>

      <Tabs defaultValue="licenses" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="licenses">License Registry</TabsTrigger>
          <TabsTrigger value="watchlist">Regulatory Watchlist</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Actions</TabsTrigger>
          <TabsTrigger value="reporting">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="licenses">
          <LicenseRegistryDashboard />
        </TabsContent>

        <TabsContent value="watchlist">
          <RegulatoryWatchlist />
        </TabsContent>

        <TabsContent value="compliance">
          <ComplianceActions />
        </TabsContent>

        <TabsContent value="reporting">
          <LicensingReportingDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
