
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

interface AddDisputeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddDisputeModal({ open, onOpenChange }: AddDisputeModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    disputeType: "",
    relatedAsset: "",
    defendant: "",
    priority: "",
    status: "",
    valueAtRisk: "",
    filedDate: undefined as Date | undefined,
    attorney: "",
    nextAction: "",
    actionDueDate: undefined as Date | undefined
  });

  const disputeTypes = [
    "Patent Infringement",
    "Trademark Opposition",
    "Copyright Violation",
    "Trade Secret Misappropriation",
    "License Dispute",
    "Ownership Challenge",
    "Other"
  ];

  const priorities = ["Low", "Medium", "High", "Critical"];
  const statuses = ["Investigation", "Active Litigation", "Settlement Negotiation", "Cease & Desist Sent"];
  const attorneys = ["Johnson & Associates", "IP Legal Partners", "Internal Legal", "Smith & Partners"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating new IP dispute:", formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Report IP Dispute</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="title">Dispute Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter dispute title"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="disputeType">Dispute Type *</Label>
              <Select value={formData.disputeType} onValueChange={(value) => setFormData({ ...formData, disputeType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select dispute type" />
                </SelectTrigger>
                <SelectContent>
                  {disputeTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="relatedAsset">Related IP Asset</Label>
              <Input
                id="relatedAsset"
                value={formData.relatedAsset}
                onChange={(e) => setFormData({ ...formData, relatedAsset: e.target.value })}
                placeholder="e.g., PAT-001, TM-045"
              />
            </div>
            
            <div>
              <Label htmlFor="defendant">Defendant/Opposing Party</Label>
              <Input
                id="defendant"
                value={formData.defendant}
                onChange={(e) => setFormData({ ...formData, defendant: e.target.value })}
                placeholder="Enter opposing party name"
              />
            </div>
            
            <div>
              <Label htmlFor="priority">Priority *</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map(priority => (
                    <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="status">Current Status</Label>
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
              <Label htmlFor="valueAtRisk">Value at Risk</Label>
              <Input
                id="valueAtRisk"
                value={formData.valueAtRisk}
                onChange={(e) => setFormData({ ...formData, valueAtRisk: e.target.value })}
                placeholder="Enter monetary value"
              />
            </div>
            
            <div>
              <Label>Filed Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.filedDate ? format(formData.filedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.filedDate}
                    onSelect={(date) => setFormData({ ...formData, filedDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Label htmlFor="attorney">Assigned Attorney</Label>
              <Select value={formData.attorney} onValueChange={(value) => setFormData({ ...formData, attorney: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select attorney" />
                </SelectTrigger>
                <SelectContent>
                  {attorneys.map(attorney => (
                    <SelectItem key={attorney} value={attorney}>{attorney}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="nextAction">Next Action</Label>
              <Input
                id="nextAction"
                value={formData.nextAction}
                onChange={(e) => setFormData({ ...formData, nextAction: e.target.value })}
                placeholder="Enter next required action"
              />
            </div>
            
            <div>
              <Label>Action Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.actionDueDate ? format(formData.actionDueDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.actionDueDate}
                    onSelect={(date) => setFormData({ ...formData, actionDueDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Provide detailed description of the dispute"
                rows={4}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Create Dispute
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
