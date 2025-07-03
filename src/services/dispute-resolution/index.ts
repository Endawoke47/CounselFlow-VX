
// Dispute Resolution Microservice Entry Point
export { DisputeResolutionDashboard } from "@/components/dispute-resolution/DisputeResolutionDashboard";
export { DisputesOverview } from "@/components/dispute-resolution/DisputesOverview";
export { DisputesList } from "@/components/dispute-resolution/DisputesList";
export { AddDisputeModal } from "@/components/dispute-resolution/AddDisputeModal";
export { ImportExcelModal } from "@/components/dispute-resolution/ImportExcelModal";
export { ReportingDashboard } from "@/components/dispute-resolution/ReportingDashboard";

// Service configuration
export const disputeResolutionConfig = {
  serviceName: "Dispute Resolution",
  version: "1.0.0",
  routes: [
    { path: "/", component: "DisputeResolutionDashboard" },
    { path: "/overview", component: "DisputesOverview" },
    { path: "/disputes", component: "DisputesList" },
    { path: "/reports", component: "ReportingDashboard" }
  ],
  permissions: ["dispute:read", "dispute:write", "dispute:admin"],
  database: {
    schema: "dispute_resolution",
    tables: ["disputes", "case_files", "settlements", "legal_teams"]
  }
};
