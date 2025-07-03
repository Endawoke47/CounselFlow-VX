
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Filter, FileText, Clock, AlertTriangle, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MattersOverview } from "./MattersOverview";
import { MattersList } from "./MattersList";
import { NewMatterModal } from "./NewMatterModal";
import { MatterDetailModal } from "./MatterDetailModal";
import { AssignmentDashboard } from "./AssignmentDashboard";
import { ReportingDashboard } from "./ReportingDashboard";
import { AdviceLibrary } from "./AdviceLibrary";

export function MatterManagementDashboard() {
  const [showNewMatterModal, setShowNewMatterModal] = useState(false);
  const [selectedMatter, setSelectedMatter] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Matter Management</h1>
          <p className="text-muted-foreground">Track and manage legal matters, advice, and team performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button onClick={() => setShowNewMatterModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create New Matter
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Matters Overview
          </TabsTrigger>
          <TabsTrigger value="assignments" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Assignments
          </TabsTrigger>
          <TabsTrigger value="advice" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Advice Library
          </TabsTrigger>
          <TabsTrigger value="reporting" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Reporting
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <MattersOverview />
          <MattersList onMatterSelect={setSelectedMatter} />
        </TabsContent>

        <TabsContent value="assignments" className="space-y-6">
          <AssignmentDashboard />
        </TabsContent>

        <TabsContent value="advice" className="space-y-6">
          <AdviceLibrary />
        </TabsContent>

        <TabsContent value="reporting" className="space-y-6">
          <ReportingDashboard />
        </TabsContent>
      </Tabs>

      <NewMatterModal 
        open={showNewMatterModal} 
        onOpenChange={setShowNewMatterModal} 
      />

      <MatterDetailModal 
        matter={selectedMatter}
        open={!!selectedMatter}
        onOpenChange={() => setSelectedMatter(null)}
      />
    </div>
  );
}
