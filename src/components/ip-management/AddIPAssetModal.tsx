
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface AddIPAssetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddIPAssetModal({ open, onOpenChange }: AddIPAssetModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    inventor: "",
    assignee: "",
    jurisdiction: "",
    filingDate: undefined as Date | undefined,
    status: "",
    estimatedValue: "",
    applicationNumber: "",
    priorityDate: undefined as Date | undefined,
    tags: ""
  });

  const assetTypes = ["Patent", "Trademark", "Copyright", "Trade Secret", "Design"];
  const statuses = ["Active", "Pending", "Abandoned", "Expired"];
  const jurisdictions = ["US", "EU", "UK", "Global", "US, EU", "US, EU, UK"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating new IP asset:", formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New IP Asset</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="title">Asset Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter asset title"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="type">Asset Type *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select asset type" />
                </SelectTrigger>
                <SelectContent>
                  {assetTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="inventor">Inventor/Creator</Label>
              <Input
                id="inventor"
                value={formData.inventor}
                onChange={(e) => setFormData({ ...formData, inventor: e.target.value })}
                placeholder="Enter inventor name"
              />
            </div>
            
            <div>
              <Label htmlFor="assignee">Assignee</Label>
              <Input
                id="assignee"
                value={formData.assignee}
                onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                placeholder="Enter assignee name"
              />
            </div>
            
            <div>
              <Label htmlFor="jurisdiction">Jurisdiction</Label>
              <Select value={formData.jurisdiction} onValueChange={(value) => setFormData({ ...formData, jurisdiction: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select jurisdiction" />
                </SelectTrigger>
                <SelectContent>
                  {jurisdictions.map(jurisdiction => (
                    <SelectItem key={jurisdiction} value={jurisdiction}>{jurisdiction}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="applicationNumber">Application Number</Label>
              <Input
                id="applicationNumber"
                value={formData.applicationNumber}
                onChange={(e) => setFormData({ ...formData, applicationNumber: e.target.value })}
                placeholder="Enter application number"
              />
            </div>
            
            <div>
              <Label>Filing Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.filingDate ? format(formData.filingDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.filingDate}
                    onSelect={(date) => setFormData({ ...formData, filingDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Label>Priority Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.priorityDate ? format(formData.priorityDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.priorityDate}
                    onSelect={(date) => setFormData({ ...formData, priorityDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Label htmlFor="estimatedValue">Estimated Value</Label>
              <Input
                id="estimatedValue"
                value={formData.estimatedValue}
                onChange={(e) => setFormData({ ...formData, estimatedValue: e.target.value })}
                placeholder="Enter estimated value"
              />
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Provide detailed description of the IP asset"
                rows={4}
              />
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="Enter tags separated by commas"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Create Asset
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
