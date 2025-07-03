
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KnowledgeLibraryDashboard } from "./KnowledgeLibraryDashboard";
import { KnowledgeSearchHub } from "./KnowledgeSearchHub";
import { ClauseLibraryDashboard } from "./ClauseLibraryDashboard";
import { TemplateManagementDashboard } from "./TemplateManagementDashboard";

export function KnowledgeManagementDashboard() {
  const [activeTab, setActiveTab] = useState("library");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Knowledge Management</h1>
          <p className="text-muted-foreground">
            Centralize legal knowledge with AI-powered search, clause libraries, and template management
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="library">Knowledge Library</TabsTrigger>
          <TabsTrigger value="search">AI Search Hub</TabsTrigger>
          <TabsTrigger value="clauses">Clause Library</TabsTrigger>
          <TabsTrigger value="templates">Template Management</TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="space-y-6">
          <KnowledgeLibraryDashboard />
        </TabsContent>

        <TabsContent value="search" className="space-y-6">
          <KnowledgeSearchHub />
        </TabsContent>

        <TabsContent value="clauses" className="space-y-6">
          <ClauseLibraryDashboard />
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <TemplateManagementDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
