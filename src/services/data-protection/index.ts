
// Data Protection Microservice Entry Point
export { DataProtectionDashboard } from "@/components/data-protection/DataProtectionDashboard";
export { DataProtectionOverview } from "@/components/data-protection/DataProtectionOverview";
export { ROPADashboard } from "@/components/data-protection/ROPADashboard";
export { RiskAssessmentDashboard } from "@/components/data-protection/RiskAssessmentDashboard";
export { ComplianceTracker } from "@/components/data-protection/ComplianceTracker";
export { BreachManagement } from "@/components/data-protection/BreachManagement";
export { DSRWorkflow } from "@/components/data-protection/DSRWorkflow";
export { VendorOversight } from "@/components/data-protection/VendorOversight";
export { PolicyGovernance } from "@/components/data-protection/PolicyGovernance";

// Service configuration
export const dataProtectionConfig = {
  serviceName: "Data Protection",
  version: "1.0.0",
  routes: [
    { path: "/", component: "DataProtectionDashboard" },
    { path: "/overview", component: "DataProtectionOverview" },
    { path: "/ropa", component: "ROPADashboard" },
    { path: "/assessments", component: "RiskAssessmentDashboard" },
    { path: "/compliance", component: "ComplianceTracker" },
    { path: "/breaches", component: "BreachManagement" },
    { path: "/dsr", component: "DSRWorkflow" },
    { path: "/vendors", component: "VendorOversight" },
    { path: "/governance", component: "PolicyGovernance" }
  ],
  permissions: ["data:read", "data:write", "data:admin", "gdpr:manage"],
  database: {
    schema: "data_protection",
    tables: ["ropa_entries", "risk_assessments", "breaches", "dsr_requests", "vendor_assessments"]
  }
};
