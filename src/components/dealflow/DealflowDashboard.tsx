
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Filter, TrendingUp, FileText, Shield, Users, Activity } from "lucide-react";
import { DealPipelineTracker } from "./DealPipelineTracker";
import { DueDiligenceWorkflow } from "./DueDiligenceWorkflow";
import { RiskConsolidation } from "./RiskConsolidation";
import { DealAccessManagement } from "./DealAccessManagement";
import { DocumentViewer } from "./DocumentViewer";
import { DealflowReporting } from "./DealflowReporting";
import { AddDealModal } from "./AddDealModal";

export function DealflowDashboard() {
  const [activeTab, setActiveTab] = useState("pipeline");
  const [showAddDealModal, setShowAddDealModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Private Equity Dealflow</h1>
          <p className="text-muted-foreground">
            Manage investment opportunities from sourcing through due diligence and completion
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button onClick={() => setShowAddDealModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Deal
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="pipeline" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Pipeline
          </TabsTrigger>
          <TabsTrigger value="due-diligence" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Due Diligence
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="risk" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Risk Analysis
          </TabsTrigger>
          <TabsTrigger value="access" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Access Control
          </TabsTrigger>
          <TabsTrigger value="reporting" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Reporting
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="space-y-6">
          <DealPipelineTracker />
        </TabsContent>

        <TabsContent value="due-diligence" className="space-y-6">
          <DueDiligenceWorkflow />
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <DocumentViewer />
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <RiskConsolidation />
        </TabsContent>

        <TabsContent value="access" className="space-y-6">
          <DealAccessManagement />
        </TabsContent>

        <TabsContent value="reporting" className="space-y-6">
          <DealflowReporting />
        </TabsContent>
      </Tabs>

      <AddDealModal 
        open={showAddDealModal} 
        onOpenChange={setShowAddDealModal} 
      />
    </div>
  );
}
