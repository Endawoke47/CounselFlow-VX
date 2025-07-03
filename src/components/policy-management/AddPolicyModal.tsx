
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Upload, FileText } from "lucide-react";

interface AddPolicyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddPolicyModal({ open, onOpenChange }: AddPolicyModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    entity: "",
    jurisdiction: "",
    businessFunction: "",
    policyType: "",
    status: "draft",
    effectiveDate: "",
    expiryDate: "",
    owner: "",
    tags: "",
    summary: "",
    requiresApproval: false,
    restrictedAccess: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding policy:", formData);
    onOpenChange(false);
    setFormData({
      title: "",
      entity: "",
      jurisdiction: "",
      businessFunction: "",
      policyType: "",
      status: "draft",
      effectiveDate: "",
      expiryDate: "",
      owner: "",
      tags: "",
      summary: "",
      requiresApproval: false,
      restrictedAccess: false
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Policy</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Policy Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Data Protection Policy"
                  required
                />
              </div>
              <div>
                <Label htmlFor="policyType">Policy Type</Label>
                <Select value={formData.policyType} onValueChange={(value) => setFormData({ ...formData, policyType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select policy type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="data-privacy">Data Privacy</SelectItem>
                    <SelectItem value="ethics-compliance">Ethics & Compliance</SelectItem>
                    <SelectItem value="financial-compliance">Financial Compliance</SelectItem>
                    <SelectItem value="hr-policies">HR Policies</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessFunction">Business Function</Label>
                <Input
                  id="businessFunction"
                  value={formData.businessFunction}
                  onChange={(e) => setFormData({ ...formData, businessFunction: e.target.value })}
                  placeholder="e.g., IT, HR, Finance"
                />
              </div>
              <div>
                <Label htmlFor="owner">Policy Owner</Label>
                <Input
                  id="owner"
                  value={formData.owner}
                  onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                  placeholder="e.g., Sarah Johnson"
                  required
                />
              </div>
            </div>
          </div>

          {/* File Upload / Content */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Policy Content</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <Button type="button" variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload File
                  </Button>
                  <p className="mt-2 text-sm text-gray-500">
                    Or drag and drop your policy document here
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center text-gray-500">OR</div>
            <div>
              <Label htmlFor="content">Draft in Rich Text Editor</Label>
              <Textarea
                id="content"
                placeholder="Start writing your policy content here..."
                className="min-h-[200px]"
              />
            </div>
          </div>

          {/* Dates and Status */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dates & Status</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="effectiveDate">Effective Date</Label>
                <Input
                  id="effectiveDate"
                  type="date"
                  value={formData.effectiveDate}
                  onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Metadata & Tags</h3>
            <div>
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="Enter tags separated by commas"
              />
            </div>
            <div>
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                placeholder="Brief summary of the policy (can be AI-generated)"
                rows={3}
              />
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="requiresApproval"
                  checked={formData.requiresApproval}
                  onCheckedChange={(checked) => setFormData({ ...formData, requiresApproval: checked as boolean })}
                />
                <Label htmlFor="requiresApproval">Requires approval before publishing</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="restrictedAccess"
                  checked={formData.restrictedAccess}
                  onCheckedChange={(checked) => setFormData({ ...formData, restrictedAccess: checked as boolean })}
                />
                <Label htmlFor="restrictedAccess">Restricted access (not public)</Label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Save Policy
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
