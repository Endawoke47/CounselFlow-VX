
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Save, RotateCcw } from "lucide-react";

const modules = [
  { id: "contracts", name: "Contract Management", color: "blue" },
  { id: "disputes", name: "Dispute Resolution", color: "red" },
  { id: "compliance", name: "Compliance & Licensing", color: "green" },
  { id: "ip", name: "IP Management", color: "purple" },
  { id: "risk", name: "Risk Dashboard", color: "orange" },
  { id: "matters", name: "Matter Management", color: "cyan" },
  { id: "knowledge", name: "Knowledge Management", color: "indigo" },
  { id: "admin", name: "User Administration", color: "gray" }
];

const permissions = [
  { id: "view", name: "View", description: "Read access to module data" },
  { id: "create", name: "Create", description: "Create new records" },
  { id: "edit", name: "Edit", description: "Modify existing records" },
  { id: "delete", name: "Delete", description: "Remove records" },
  { id: "approve", name: "Approve", description: "Approve workflows and requests" },
  { id: "export", name: "Export", description: "Export data and reports" }
];

const roleTemplates = {
  "general-counsel": {
    name: "General Counsel",
    permissions: modules.reduce((acc, module) => {
      acc[module.id] = permissions.reduce((perms, perm) => {
        perms[perm.id] = true;
        return perms;
      }, {} as Record<string, boolean>);
      return acc;
    }, {} as Record<string, Record<string, boolean>>)
  },
  "legal-officer": {
    name: "Legal Officer",
    permissions: modules.reduce((acc, module) => {
      acc[module.id] = {
        view: true,
        create: module.id !== "admin",
        edit: module.id !== "admin",
        delete: false,
        approve: false,
        export: module.id !== "admin"
      };
      return acc;
    }, {} as Record<string, Record<string, boolean>>)
  },
  "compliance-manager": {
    name: "Compliance Manager",
    permissions: modules.reduce((acc, module) => {
      const isComplianceModule = ["compliance", "risk", "matters"].includes(module.id);
      acc[module.id] = {
        view: true,
        create: isComplianceModule,
        edit: isComplianceModule,
        delete: false,
        approve: isComplianceModule,
        export: isComplianceModule
      };
      return acc;
    }, {} as Record<string, Record<string, boolean>>)
  },
  "external-counsel": {
    name: "External Counsel",
    permissions: modules.reduce((acc, module) => {
      const allowedModules = ["contracts", "disputes", "matters"];
      acc[module.id] = {
        view: allowedModules.includes(module.id),
        create: false,
        edit: false,
        delete: false,
        approve: false,
        export: false
      };
      return acc;
    }, {} as Record<string, Record<string, boolean>>)
  }
};

export function PermissionMatrix() {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [currentPermissions, setCurrentPermissions] = useState<Record<string, Record<string, boolean>>>({});
  const [hasChanges, setHasChanges] = useState(false);

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    setCurrentPermissions(roleTemplates[roleId as keyof typeof roleTemplates]?.permissions || {});
    setHasChanges(false);
  };

  const handlePermissionChange = (moduleId: string, permissionId: string, checked: boolean) => {
    setCurrentPermissions(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [permissionId]: checked
      }
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log("Saving permissions for role:", selectedRole, currentPermissions);
    setHasChanges(false);
  };

  const handleReset = () => {
    if (selectedRole) {
      setCurrentPermissions(roleTemplates[selectedRole as keyof typeof roleTemplates]?.permissions || {});
      setHasChanges(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Permission Matrix
            </CardTitle>
            <CardDescription>
              Configure detailed permissions for each role across all modules
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Select value={selectedRole} onValueChange={handleRoleSelect}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select role to configure" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(roleTemplates).map(([id, template]) => (
                  <SelectItem key={id} value={id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {selectedRole ? (
          <>
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {roleTemplates[selectedRole as keyof typeof roleTemplates]?.name}
                </Badge>
                {hasChanges && (
                  <Badge variant="secondary">
                    Unsaved Changes
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleReset} disabled={!hasChanges}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button onClick={handleSave} disabled={!hasChanges}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-64">Module</TableHead>
                    {permissions.map((permission) => (
                      <TableHead key={permission.id} className="text-center">
                        <div className="flex flex-col items-center">
                          <span className="font-medium">{permission.name}</span>
                          <span className="text-xs text-muted-foreground">{permission.description}</span>
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {modules.map((module) => (
                    <TableRow key={module.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={`border-${module.color}-200 text-${module.color}-700`}>
                            {module.name}
                          </Badge>
                        </div>
                      </TableCell>
                      {permissions.map((permission) => (
                        <TableCell key={permission.id} className="text-center">
                          <Checkbox
                            checked={currentPermissions[module.id]?.[permission.id] || false}
                            onCheckedChange={(checked) => 
                              handlePermissionChange(module.id, permission.id, checked as boolean)
                            }
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2">Permission Guidelines:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <strong>View:</strong> Basic read access to module data and interfaces</li>
                <li>• <strong>Create:</strong> Ability to add new records and initiate workflows</li>
                <li>• <strong>Edit:</strong> Modify existing records and update information</li>
                <li>• <strong>Delete:</strong> Remove records (use with caution)</li>
                <li>• <strong>Approve:</strong> Approve workflows, requests, and critical actions</li>
                <li>• <strong>Export:</strong> Download data, generate reports, and export documents</li>
              </ul>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Select a Role</h3>
            <p className="text-muted-foreground">
              Choose a role from the dropdown above to configure its permissions
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
