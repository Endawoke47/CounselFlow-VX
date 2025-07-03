import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Shield, UserX, Download, Upload, AlertTriangle } from "lucide-react";

export function BulkUserActions() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showBulkDialog, setShowBulkDialog] = useState(false);
  const [bulkAction, setBulkAction] = useState("");
  const [bulkValue, setBulkValue] = useState("");
  const [bulkReason, setBulkReason] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      setError(null);
      // @ts-expect-error: Supabase client is not typed with DB schema
      const { data, error } = await (supabase as any).from("users").select("*");
      if (error) {
        setError("Failed to load users");
        setUsers([]);
      } else {
        setUsers(data || []);
      }
      setLoading(false);
    }
    fetchUsers();
  }, []);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(users.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers(prev => [...prev, userId]);
    } else {
      setSelectedUsers(prev => prev.filter(id => id !== userId));
    }
  };

  const handleBulkAction = (action: string) => {
    setBulkAction(action);
    setShowBulkDialog(true);
  };

  const executeBulkAction = () => {
    // TODO: Implement real bulk user actions (API call)
    setShowBulkDialog(false);
    setBulkAction("");
    setBulkValue("");
    setBulkReason("");
    setSelectedUsers([]);
  };

  const getBulkActionConfig = () => {
    switch (bulkAction) {
      case "changeRole":
        return {
          title: "Change Role for Selected Users",
          description: "Update the role for all selected users",
          valueLabel: "New Role",
          valueOptions: [
            { value: "general-counsel", label: "General Counsel" },
            { value: "legal-officer", label: "Legal Officer" },
            { value: "compliance-manager", label: "Compliance Manager" },
            { value: "external-counsel", label: "External Counsel" },
            { value: "viewer", label: "Viewer" }
          ]
        };
      case "changeStatus":
        return {
          title: "Change Status for Selected Users",
          description: "Update the status for all selected users",
          valueLabel: "New Status",
          valueOptions: [
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
            { value: "suspended", label: "Suspended" },
            { value: "temporary", label: "Temporary" }
          ]
        };
      case "deactivate":
        return {
          title: "Deactivate Selected Users",
          description: "Deactivate access for all selected users",
          valueLabel: null,
          valueOptions: null
        };
      default:
        return null;
    }
  };

  const config = getBulkActionConfig();

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Bulk User Management
          </CardTitle>
          <CardDescription>
            Select multiple users and apply actions in bulk for efficient management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedUsers.length === users.length && users.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                  <span className="text-sm font-medium">
                    Select All ({selectedUsers.length} of {users.length} selected)
                  </span>
                </div>
                {selectedUsers.length > 0 && (
                  <Badge variant="secondary">
                    {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
                  </Badge>
                )}
              </div>
              
              {selectedUsers.length > 0 && (
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleBulkAction("changeRole")}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Change Role
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleBulkAction("changeStatus")}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Change Status
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleBulkAction("deactivate")}
                  >
                    <UserX className="h-4 w-4 mr-2" />
                    Deactivate
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              )}
            </div>

            {loading ? (
              <div className="text-center py-8">Loading users...</div>
            ) : error ? (
              <div className="text-center text-destructive py-8">{error}</div>
            ) : (
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedUsers.length === users.length && users.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedUsers.includes(user.id)}
                            onCheckedChange={(checked) => handleSelectUser(user.id, checked as boolean)}
                          />
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            user.status === "Active" ? "default" :
                            user.status === "Temporary" ? "secondary" : "destructive"
                          }>
                            {user.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            <div className="flex gap-2 pt-4 border-t">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Import Users
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export All Users
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Action Dialog */}
      <Dialog open={showBulkDialog} onOpenChange={setShowBulkDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              {config?.title}
            </DialogTitle>
            <DialogDescription>
              {config?.description} - This action will affect {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {config?.valueOptions && (
              <div className="space-y-2">
                <Label>{config.valueLabel}</Label>
                <Select value={bulkValue} onValueChange={setBulkValue}>
                  <SelectTrigger>
                    <SelectValue placeholder={`Select ${config.valueLabel?.toLowerCase()}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {config.valueOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="bulkReason">Reason for Change</Label>
              <Textarea
                id="bulkReason"
                placeholder="Provide reason for this bulk action..."
                value={bulkReason}
                onChange={(e) => setBulkReason(e.target.value)}
                rows={3}
              />
            </div>

            <div className="bg-muted/50 p-3 rounded-lg">
              <h4 className="font-medium mb-2">Selected Users ({selectedUsers.length}):</h4>
              <div className="flex flex-wrap gap-1">
                {selectedUsers.map((userId) => {
                  const user = users.find(u => u.id === userId);
                  return user ? (
                    <Badge key={userId} variant="secondary" className="text-xs">
                      {user.name}
                    </Badge>
                  ) : null;
                })}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBulkDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={executeBulkAction}
              disabled={config?.valueOptions && !bulkValue}
            >
              Execute Action
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
