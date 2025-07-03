
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, UserPlus, UserMinus, Settings, Shield, Clock } from "lucide-react";
import { format } from "date-fns";

interface UserManagementActionsProps {
  userId: string;
  userEmail: string;
  onAction: (action: string, data?: any) => void;
}

export function UserManagementActions({ userId, userEmail, onAction }: UserManagementActionsProps) {
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [showAccessDialog, setShowAccessDialog] = useState(false);
  const [showTempAccessDialog, setShowTempAccessDialog] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [accessLevel, setAccessLevel] = useState("");
  const [expiryDate, setExpiryDate] = useState<Date>();
  const [reason, setReason] = useState("");

  const handleRoleChange = () => {
    onAction("changeRole", { userId, role: selectedRole });
    setShowRoleDialog(false);
    setSelectedRole("");
  };

  const handleAccessChange = () => {
    onAction("changeAccess", { userId, accessLevel, reason });
    setShowAccessDialog(false);
    setAccessLevel("");
    setReason("");
  };

  const handleTempAccess = () => {
    onAction("grantTempAccess", { userId, expiryDate, reason });
    setShowTempAccessDialog(false);
    setExpiryDate(undefined);
    setReason("");
  };

  return (
    <>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => setShowRoleDialog(true)}>
          <Shield className="h-4 w-4 mr-1" />
          Change Role
        </Button>
        <Button variant="outline" size="sm" onClick={() => setShowAccessDialog(true)}>
          <Settings className="h-4 w-4 mr-1" />
          Modify Access
        </Button>
        <Button variant="outline" size="sm" onClick={() => setShowTempAccessDialog(true)}>
          <Clock className="h-4 w-4 mr-1" />
          Temp Access
        </Button>
        <Button variant="outline" size="sm" onClick={() => onAction("deactivate", { userId })}>
          <UserMinus className="h-4 w-4 mr-1" />
          Deactivate
        </Button>
      </div>

      {/* Role Change Dialog */}
      <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change User Role</DialogTitle>
            <DialogDescription>
              Update the role for {userEmail}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">New Role</Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select new role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general-counsel">General Counsel</SelectItem>
                  <SelectItem value="legal-officer">Legal Officer</SelectItem>
                  <SelectItem value="compliance-manager">Compliance Manager</SelectItem>
                  <SelectItem value="external-counsel">External Counsel</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRoleDialog(false)}>Cancel</Button>
            <Button onClick={handleRoleChange} disabled={!selectedRole}>Update Role</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Access Change Dialog */}
      <Dialog open={showAccessDialog} onOpenChange={setShowAccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modify Access Level</DialogTitle>
            <DialogDescription>
              Change access permissions for {userEmail}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="access">Access Level</Label>
              <Select value={accessLevel} onValueChange={setAccessLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select access level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full Access</SelectItem>
                  <SelectItem value="limited">Limited Access</SelectItem>
                  <SelectItem value="read-only">Read Only</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason</Label>
              <Textarea
                id="reason"
                placeholder="Provide reason for access change..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAccessDialog(false)}>Cancel</Button>
            <Button onClick={handleAccessChange} disabled={!accessLevel}>Update Access</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Temporary Access Dialog */}
      <Dialog open={showTempAccessDialog} onOpenChange={setShowTempAccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Grant Temporary Access</DialogTitle>
            <DialogDescription>
              Provide temporary access for {userEmail}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Expiry Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {expiryDate ? format(expiryDate, "PPP") : "Select expiry date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={expiryDate}
                    onSelect={setExpiryDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tempReason">Reason</Label>
              <Textarea
                id="tempReason"
                placeholder="Reason for temporary access..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTempAccessDialog(false)}>Cancel</Button>
            <Button onClick={handleTempAccess} disabled={!expiryDate}>Grant Access</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
