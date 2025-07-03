import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ROPADashboard } from "./ROPADashboard";
import { RiskAssessmentDashboard } from "./RiskAssessmentDashboard";
import { ComplianceTracker } from "./ComplianceTracker";
import { BreachManagement } from "./BreachManagement";
import { DSRWorkflow } from "./DSRWorkflow";
import { VendorOversight } from "./VendorOversight";
import { PolicyGovernance } from "./PolicyGovernance";
import { DataProtectionOverview } from "./DataProtectionOverview";

export function DataProtectionDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6 glass tab-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Data Protection</h1>
          <p className="text-muted-foreground">
            Manage global data protection obligations and privacy compliance
          </p>
        </div>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-8 glass">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ropa">ROPA</TabsTrigger>
          <TabsTrigger value="assessments">Risk Assessments</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="breaches">Breaches</TabsTrigger>
          <TabsTrigger value="dsr">DSR</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="governance">Governance</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6 tab-fade-in">
          <DataProtectionOverview />
        </TabsContent>
        <TabsContent value="ropa" className="space-y-6 tab-fade-in">
          <ROPADashboard />
        </TabsContent>
        <TabsContent value="assessments" className="space-y-6 tab-fade-in">
          <RiskAssessmentDashboard />
        </TabsContent>
        <TabsContent value="compliance" className="space-y-6 tab-fade-in">
          <ComplianceTracker />
        </TabsContent>
        <TabsContent value="breaches" className="space-y-6 tab-fade-in">
          <BreachManagement />
        </TabsContent>
        <TabsContent value="dsr" className="space-y-6 tab-fade-in">
          <DSRWorkflow />
        </TabsContent>
        <TabsContent value="vendors" className="space-y-6 tab-fade-in">
          <VendorOversight />
        </TabsContent>
        <TabsContent value="governance" className="space-y-6 tab-fade-in">
          <PolicyGovernance />
        </TabsContent>
      </Tabs>
    </div>
  );
}
