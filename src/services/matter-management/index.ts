
// Matter Management Microservice Entry Point
export { MatterManagementDashboard } from "@/components/matter-management/MatterManagementDashboard";
export { MattersOverview } from "@/components/matter-management/MattersOverview";
export { MattersList } from "@/components/matter-management/MattersList";
export { NewMatterModal } from "@/components/matter-management/NewMatterModal";
export { MatterDetailModal } from "@/components/matter-management/MatterDetailModal";
export { AssignmentDashboard } from "@/components/matter-management/AssignmentDashboard";
export { AdviceLibrary } from "@/components/matter-management/AdviceLibrary";
export { ReportingDashboard } from "@/components/matter-management/ReportingDashboard";

// Service configuration
export const matterManagementConfig = {
  serviceName: "Matter Management",
  version: "1.0.0",
  routes: [
    { path: "/", component: "MatterManagementDashboard" },
    { path: "/overview", component: "MattersOverview" },
    { path: "/matters", component: "MattersList" },
    { path: "/assignments", component: "AssignmentDashboard" },
    { path: "/advice", component: "AdviceLibrary" },
    { path: "/reporting", component: "ReportingDashboard" }
  ],
  permissions: ["matter:read", "matter:write", "matter:admin"],
  database: {
    schema: "matter_management",
    tables: ["matters", "assignments", "advice", "time_tracking"]
  }
};
