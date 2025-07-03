
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, Plus, Edit, Trash2 } from "lucide-react";

const mockRoles = [
  {
    id: "1",
    name: "General Counsel",
    description: "Full access to all modules and administrative functions",
    userCount: 2,
    permissions: {
      contracts: { view: true, edit: true, approve: true, delete: true },
      disputes: { view: true, edit: true, approve: true, delete: true },
      compliance: { view: true, edit: true, approve: true, delete: true },
      ip: { view: true, edit: true, approve: true, delete: true },
      risk: { view: true, edit: true, approve: true, delete: true },
      admin: { view: true, edit: true, approve: true, delete: true }
    }
  },
  {
    id: "2",
    name: "Legal Officer",
    description: "Standard legal team access with editing rights",
    userCount: 8,
    permissions: {
      contracts: { view: true, edit: true, approve: false, delete: false },
      disputes: { view: true, edit: true, approve: false, delete: false },
      compliance: { view: true, edit: true, approve: false, delete: false },
      ip: { view: true, edit: true, approve: false, delete: false },
      risk: { view: true, edit: false, approve: false, delete: false },
      admin: { view: false, edit: false, approve: false, delete: false }
    }
  },
  {
    id: "3",
    name: "Compliance Manager",
    description: "Focus on licensing, policy, and risk management",
    userCount: 4,
    permissions: {
      contracts: { view: true, edit: false, approve: false, delete: false },
      disputes: { view: true, edit: false, approve: false, delete: false },
      compliance: { view: true, edit: true, approve: true, delete: false },
      ip: { view: true, edit: false, approve: false, delete: false },
      risk: { view: true, edit: true, approve: false, delete: false },
      admin: { view: false, edit: false, approve: false, delete: false }
    }
  },
  {
    id: "4",
    name: "External Counsel",
    description: "Limited access for external law firms and consultants",
    userCount: 12,
    permissions: {
      contracts: { view: true, edit: false, approve: false, delete: false },
      disputes: { view: true, edit: false, approve: false, delete: false },
      compliance: { view: false, edit: false, approve: false, delete: false },
      ip: { view: false, edit: false, approve: false, delete: false },
      risk: { view: false, edit: false, approve: false, delete: false },
      admin: { view: false, edit: false, approve: false, delete: false }
    }
  }
];

const modules = [
  { id: "contracts", name: "Contracts" },
  { id: "disputes", name: "Disputes" },
  { id: "compliance", name: "Compliance" },
  { id: "ip", name: "IP Management" },
  { id: "risk", name: "Risk Dashboard" },
  { id: "admin", name: "Administration" }
];

const permissions = [
  { id: "view", name: "View" },
  { id: "edit", name: "Edit" },
  { id: "approve", name: "Approve" },
  { id: "delete", name: "Delete" }
];

export function RolePermissionEditor() {
  const [selectedRole, setSelectedRole] = useState(mockRoles[0]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Roles
            </CardTitle>
            <CardDescription>
              Manage user roles and their associated permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockRoles.map((role) => (
                <div
                  key={role.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedRole.id === role.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedRole(role)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{role.name}</div>
                      <div className="text-sm text-muted-foreground">{role.userCount} users</div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Role
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Role Permissions: {selectedRole.name}</CardTitle>
            <CardDescription>
              {selectedRole.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Module</TableHead>
                  {permissions.map((permission) => (
                    <TableHead key={permission.id} className="text-center">
                      {permission.name}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {modules.map((module) => (
                  <TableRow key={module.id}>
                    <TableCell className="font-medium">{module.name}</TableCell>
                    {permissions.map((permission) => (
                      <TableCell key={permission.id} className="text-center">
                        <Checkbox
                          checked={selectedRole.permissions[module.id]?.[permission.id] || false}
                          disabled
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
