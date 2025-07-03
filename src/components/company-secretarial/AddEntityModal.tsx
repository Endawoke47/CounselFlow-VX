
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Building2 } from "lucide-react";

interface AddEntityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (entity: any) => void;
}

export function AddEntityModal({ isOpen, onClose, onSave }: AddEntityModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    jurisdiction: "",
    entityType: "",
    companyNumber: "",
    incorporationDate: "",
    registeredAddress: "",
    status: "Active"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      name: "",
      jurisdiction: "",
      entityType: "",
      companyNumber: "",
      incorporationDate: "",
      registeredAddress: "",
      status: "Active"
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Add New Entity
          </DialogTitle>
          <DialogDescription>
            Add a new entity to your corporate structure
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Entity Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Acme Corporation Ltd"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="entityType">Entity Type</Label>
              <Select value={formData.entityType} onValueChange={(value) => setFormData({ ...formData, entityType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select entity type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private-limited">Private Limited Company</SelectItem>
                  <SelectItem value="public-limited">Public Limited Company</SelectItem>
                  <SelectItem value="llc">Limited Liability Company</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="corporation">Corporation</SelectItem>
                  <SelectItem value="subsidiary">Subsidiary</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jurisdiction">Jurisdiction</Label>
              <Select value={formData.jurisdiction} onValueChange={(value) => setFormData({ ...formData, jurisdiction: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select jurisdiction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="united-kingdom">United Kingdom</SelectItem>
                  <SelectItem value="singapore">Singapore</SelectItem>
                  <SelectItem value="delaware-usa">Delaware, USA</SelectItem>
                  <SelectItem value="hong-kong">Hong Kong</SelectItem>
                  <SelectItem value="australia">Australia</SelectItem>
                  <SelectItem value="canada">Canada</SelectItem>
                  <SelectItem value="netherlands">Netherlands</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyNumber">Company/Registration Number</Label>
              <Input
                id="companyNumber"
                value={formData.companyNumber}
                onChange={(e) => setFormData({ ...formData, companyNumber: e.target.value })}
                placeholder="e.g., 12345678"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="incorporationDate">Incorporation Date</Label>
              <Input
                id="incorporationDate"
                type="date"
                value={formData.incorporationDate}
                onChange={(e) => setFormData({ ...formData, incorporationDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Dormant">Dormant</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="registeredAddress">Registered Address</Label>
            <Textarea
              id="registeredAddress"
              value={formData.registeredAddress}
              onChange={(e) => setFormData({ ...formData, registeredAddress: e.target.value })}
              placeholder="Enter full registered address"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Add Entity
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
