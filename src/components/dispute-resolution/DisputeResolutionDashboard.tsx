
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DisputesOverview } from "./DisputesOverview";
import { DisputesList } from "./DisputesList";
import { ReportingDashboard } from "./ReportingDashboard";
import { AddDisputeModal } from "./AddDisputeModal";
import { ExcelImportModal } from "@/components/shared/ExcelImportModal";
import { Plus, Upload } from "lucide-react";

export function DisputeResolutionDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddDispute, setShowAddDispute] = useState(false);
  const [showImportExcel, setShowImportExcel] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dispute Resolution Management</h1>
          <p className="text-muted-foreground">
            Track disputes, manage legal teams, and generate executive reports
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => setShowImportExcel(true)}
          >
            <Upload className="h-4 w-4 mr-2" />
            Import from Excel
          </Button>
          <Button onClick={() => setShowAddDispute(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Dispute
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Dashboard</TabsTrigger>
          <TabsTrigger value="disputes">Disputes</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <DisputesOverview />
        </TabsContent>

        <TabsContent value="disputes" className="space-y-4">
          <DisputesList />
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <ReportingDashboard />
        </TabsContent>
      </Tabs>

      <AddDisputeModal 
        open={showAddDispute} 
        onOpenChange={setShowAddDispute} 
      />
      <ExcelImportModal 
        open={showImportExcel} 
        onOpenChange={setShowImportExcel}
        title="Import Disputes from Excel"
        description="Upload an Excel file to bulk import dispute data"
        templateColumns={[
          'Dispute Title', 'Entity', 'Counterparty', 'Status', 'Priority',
          'Exposure Amount', 'Currency', 'Initiated Date', 'Deadline', 'Owner', 'Case Type'
        ]}
        onImport={async (data) => {
          console.log('Importing disputes:', data);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }}
        sampleData={[{
          'Dispute Title': 'Contract Breach - Vendor ABC',
          'Entity': 'Acme Corporation Ltd',
          'Counterparty': 'ABC Supplies Inc',
          'Status': 'In Review',
          'Priority': 'High',
          'Exposure Amount': '250000',
          'Currency': 'USD',
          'Initiated Date': '2024-01-15',
          'Deadline': '2024-03-15',
          'Owner': 'Sarah Johnson',
          'Case Type': 'Contract Dispute'
        }]}
      />
    </div>
  );
}
