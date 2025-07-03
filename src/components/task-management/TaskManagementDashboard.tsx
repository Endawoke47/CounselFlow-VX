
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Calendar, KanbanSquare, List, TrendingUp } from "lucide-react";
import { TaskListView } from "./TaskListView";
import { TaskCalendarView } from "./TaskCalendarView";
import { TaskKanbanView } from "./TaskKanbanView";
import { TaskMetrics } from "./TaskMetrics";
import { AddTaskModal } from "./AddTaskModal";

export function TaskManagementDashboard() {
  const [activeTab, setActiveTab] = useState("list");
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Task Management</h1>
          <p className="text-muted-foreground">
            Centralized task tracking and assignment across all legal modules
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button onClick={() => setShowAddTaskModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="list" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            List View
          </TabsTrigger>
          <TabsTrigger value="kanban" className="flex items-center gap-2">
            <KanbanSquare className="h-4 w-4" />
            Kanban Board
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Calendar
          </TabsTrigger>
          <TabsTrigger value="metrics" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Metrics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-6">
          <TaskListView />
        </TabsContent>

        <TabsContent value="kanban" className="space-y-6">
          <TaskKanbanView />
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <TaskCalendarView />
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <TaskMetrics />
        </TabsContent>
      </Tabs>

      <AddTaskModal 
        open={showAddTaskModal} 
        onOpenChange={setShowAddTaskModal} 
      />
    </div>
  );
}
