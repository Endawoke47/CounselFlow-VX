
// IP Management Microservice Entry Point
export { IPManagementDashboard } from "@/components/ip-management/IPManagementDashboard";
export { IPDashboardOverview } from "@/components/ip-management/IPDashboardOverview";
export { IPAssetRegister } from "@/components/ip-management/IPAssetRegister";
export { LifecycleTracking } from "@/components/ip-management/LifecycleTracking";
export { IPRiskMonitoring } from "@/components/ip-management/IPRiskMonitoring";
export { CommercializationManagement } from "@/components/ip-management/CommercializationManagement";
export { IPTemplateLibrary } from "@/components/ip-management/IPTemplateLibrary";
export { AddIPAssetModal } from "@/components/ip-management/AddIPAssetModal";
export { IPAssetDetailModal } from "@/components/ip-management/IPAssetDetailModal";

// Service configuration
export const ipManagementConfig = {
  serviceName: "IP Management",
  version: "1.0.0",
  routes: [
    { path: "/", component: "IPManagementDashboard" },
    { path: "/overview", component: "IPDashboardOverview" },
    { path: "/register", component: "IPAssetRegister" },
    { path: "/lifecycle", component: "LifecycleTracking" },
    { path: "/risk", component: "IPRiskMonitoring" },
    { path: "/commercialization", component: "CommercializationManagement" },
    { path: "/templates", component: "IPTemplateLibrary" }
  ],
  permissions: ["ip:read", "ip:write", "ip:admin"],
  database: {
    schema: "ip_management",
    tables: ["ip_assets", "licenses", "patents", "trademarks", "renewals"]
  }
};
