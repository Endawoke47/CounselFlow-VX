
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface AddLicenseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddLicenseModal({ open, onOpenChange }: AddLicenseModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    entity: "",
    jurisdiction: "",
    regulator: "",
    type: "",
    expiryDate: "",
    owner: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding license:", formData);
    onOpenChange(false);
    setFormData({
      title: "",
      entity: "",
      jurisdiction: "",
      regulator: "",
      type: "",
      expiryDate: "",
      owner: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New License</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">License Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Financial Services License"
                required
              />
            </div>
            <div>
              <Label htmlFor="entity">Entity</Label>
              <Select value={formData.entity} onValueChange={(value) => setFormData({ ...formData, entity: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select entity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uk">TechCorp UK Ltd</SelectItem>
                  <SelectItem value="de">TechCorp GmbH</SelectItem>
                  <SelectItem value="us">TechCorp Inc</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="jurisdiction">Jurisdiction</Label>
              <Input
                id="jurisdiction"
                value={formData.jurisdiction}
                onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value })}
                placeholder="e.g., United Kingdom"
                required
              />
            </div>
            <div>
              <Label htmlFor="regulator">Regulator</Label>
              <Input
                id="regulator"
                value={formData.regulator}
                onChange={(e) => setFormData({ ...formData, regulator: e.target.value })}
                placeholder="e.g., FCA"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">License Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="financial">Financial Services</SelectItem>
                  <SelectItem value="data-protection">Data Protection</SelectItem>
                  <SelectItem value="broadcasting">Broadcasting</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="owner">License Owner</Label>
            <Input
              id="owner"
              value={formData.owner}
              onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
              placeholder="e.g., Sarah Johnson"
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Add License
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
