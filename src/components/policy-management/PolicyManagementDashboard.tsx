
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PolicyLibraryDashboard } from "./PolicyLibraryDashboard";
import { SearchHub } from "./SearchHub";
import { ApprovalWorkflows } from "./ApprovalWorkflows";
import { PolicyAnalytics } from "./PolicyAnalytics";

export function PolicyManagementDashboard() {
  const [activeTab, setActiveTab] = useState("library");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Policy Management</h1>
          <p className="text-muted-foreground">
            Centralize policy management across all group entities with AI-powered search and workflows
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="library">Policy Library</TabsTrigger>
          <TabsTrigger value="search">AI Search Hub</TabsTrigger>
          <TabsTrigger value="workflows">Approval Workflows</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="space-y-6">
          <PolicyLibraryDashboard />
        </TabsContent>

        <TabsContent value="search" className="space-y-6">
          <SearchHub />
        </TabsContent>

        <TabsContent value="workflows" className="space-y-6">
          <ApprovalWorkflows />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <PolicyAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}
