
// User Access Management Microservice Entry Point
export { UserAccessManagementDashboard } from "@/components/user-access-management/UserAccessManagementDashboard";
export { UserDirectory } from "@/components/user-access-management/UserDirectory";
export { RolePermissionEditor } from "@/components/user-access-management/RolePermissionEditor";
export { PermissionMatrix } from "@/components/user-access-management/PermissionMatrix";
export { AccessRequestWorkflow } from "@/components/user-access-management/AccessRequestWorkflow";
export { AccessRequestApproval } from "@/components/user-access-management/AccessRequestApproval";
export { EntityAssignment } from "@/components/user-access-management/EntityAssignment";
export { ExternalUserPanel } from "@/components/user-access-management/ExternalUserPanel";
export { AuditLogViewer } from "@/components/user-access-management/AuditLogViewer";
export { BulkUserActions } from "@/components/user-access-management/BulkUserActions";

// Service configuration
export const userAccessConfig = {
  serviceName: "User & Access Management",
  version: "1.0.0",
  routes: [
    { path: "/", component: "UserAccessManagementDashboard" },
    { path: "/users", component: "UserDirectory" },
    { path: "/roles", component: "RolePermissionEditor" },
    { path: "/permissions", component: "PermissionMatrix" },
    { path: "/access-requests", component: "AccessRequestWorkflow" },
    { path: "/approval", component: "AccessRequestApproval" },
    { path: "/entities", component: "EntityAssignment" },
    { path: "/external", component: "ExternalUserPanel" },
    { path: "/audit", component: "AuditLogViewer" }
  ],
  permissions: ["user:read", "user:write", "role:manage", "permission:admin", "audit:view"],
  database: {
    schema: "user_access",
    tables: ["users", "roles", "permissions", "user_roles", "access_requests", "audit_logs"]
  }
};
