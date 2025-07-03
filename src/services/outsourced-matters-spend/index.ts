
// Outsourced Matters & Spend Microservice Entry Point
export { OutsourcedMattersSpendDashboard } from "@/components/outsourced-matters-spend/OutsourcedMattersSpendDashboard";
export { SpendOverviewDashboard } from "@/components/outsourced-matters-spend/SpendOverviewDashboard";
export { OutsourcedMatters } from "@/components/outsourced-matters-spend/OutsourcedMatters";
export { VendorManagement } from "@/components/outsourced-matters-spend/VendorManagement";
export { SpendTracking } from "@/components/outsourced-matters-spend/SpendTracking";
export { PerformanceEvaluation } from "@/components/outsourced-matters-spend/PerformanceEvaluation";
export { ComplianceOnboarding } from "@/components/outsourced-matters-spend/ComplianceOnboarding";
export { SpendAnalytics } from "@/components/outsourced-matters-spend/SpendAnalytics";

// Service configuration
export const outsourcedMattersConfig = {
  serviceName: "Outsourced Matters & Spend",
  version: "1.0.0",
  routes: [
    { path: "/", component: "OutsourcedMattersSpendDashboard" },
    { path: "/overview", component: "SpendOverviewDashboard" },
    { path: "/matters", component: "OutsourcedMatters" },
    { path: "/vendors", component: "VendorManagement" },
    { path: "/spend", component: "SpendTracking" },
    { path: "/performance", component: "PerformanceEvaluation" },
    { path: "/compliance", component: "ComplianceOnboarding" },
    { path: "/analytics", component: "SpendAnalytics" }
  ],
  permissions: ["spend:read", "spend:write", "vendor:manage", "budget:admin"],
  database: {
    schema: "outsourced_spend",
    tables: ["vendors", "matters", "invoices", "budgets", "performance_metrics"]
  }
};
