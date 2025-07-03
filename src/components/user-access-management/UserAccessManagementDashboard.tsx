
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Users, Shield, Globe, CheckSquare, Activity, Eye, Settings, UserCheck } from "lucide-react";
import { UserDirectory } from "./UserDirectory";
import { RolePermissionEditor } from "./RolePermissionEditor";
import { AccessRequestWorkflow } from "./AccessRequestWorkflow";
import { EntityAssignment } from "./EntityAssignment";
import { ExternalUserPanel } from "./ExternalUserPanel";
import { AuditLogViewer } from "./AuditLogViewer";
import { AddUserModal } from "./AddUserModal";
import { PermissionMatrix } from "./PermissionMatrix";
import { AccessRequestApproval } from "./AccessRequestApproval";
import { BulkUserActions } from "./BulkUserActions";

export function UserAccessManagementDashboard() {
  const [activeTab, setActiveTab] = useState("users");
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User & Access Management</h1>
          <p className="text-muted-foreground">
            Manage user access, roles, and permissions across all legal modules
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button onClick={() => setShowAddUserModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Roles
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Permissions
          </TabsTrigger>
          <TabsTrigger value="access-requests" className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4" />
            Requests
          </TabsTrigger>
          <TabsTrigger value="approval" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            Approval
          </TabsTrigger>
          <TabsTrigger value="entities" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Entities
          </TabsTrigger>
          <TabsTrigger value="external" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            External
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Audit
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <UserDirectory />
          <BulkUserActions />
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <RolePermissionEditor />
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          <PermissionMatrix />
        </TabsContent>

        <TabsContent value="access-requests" className="space-y-6">
          <AccessRequestWorkflow />
        </TabsContent>

        <TabsContent value="approval" className="space-y-6">
          <AccessRequestApproval />
        </TabsContent>

        <TabsContent value="entities" className="space-y-6">
          <EntityAssignment />
        </TabsContent>

        <TabsContent value="external" className="space-y-6">
          <ExternalUserPanel />
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <AuditLogViewer />
        </TabsContent>
      </Tabs>

      <AddUserModal 
        open={showAddUserModal} 
        onOpenChange={setShowAddUserModal} 
      />
    </div>
  );
}
