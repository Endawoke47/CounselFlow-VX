
// Dealflow Microservice Entry Point
export { DealflowDashboard } from "@/components/dealflow/DealflowDashboard";
export { DealPipelineTracker } from "@/components/dealflow/DealPipelineTracker";
export { DueDiligenceWorkflow } from "@/components/dealflow/DueDiligenceWorkflow";
export { DocumentViewer } from "@/components/dealflow/DocumentViewer";
export { RiskConsolidation } from "@/components/dealflow/RiskConsolidation";
export { DealAccessManagement } from "@/components/dealflow/DealAccessManagement";
export { DealflowReporting } from "@/components/dealflow/DealflowReporting";
export { AddDealModal } from "@/components/dealflow/AddDealModal";

// Service configuration
export const dealflowConfig = {
  serviceName: "Private Equity Dealflow",
  version: "1.0.0",
  routes: [
    { path: "/", component: "DealflowDashboard" },
    { path: "/pipeline", component: "DealPipelineTracker" },
    { path: "/due-diligence", component: "DueDiligenceWorkflow" },
    { path: "/documents", component: "DocumentViewer" },
    { path: "/risk", component: "RiskConsolidation" },
    { path: "/access", component: "DealAccessManagement" },
    { path: "/reporting", component: "DealflowReporting" }
  ],
  permissions: ["deal:read", "deal:write", "deal:admin", "due_diligence:access"],
  database: {
    schema: "dealflow",
    tables: ["deals", "due_diligence", "documents", "risk_assessments", "access_controls"]
  }
};
