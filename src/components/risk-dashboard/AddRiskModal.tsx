import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

interface AddRiskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddRiskModal({ open, onOpenChange }: AddRiskModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    riskLevel: "",
    probability: "",
    impact: "",
    owner: "",
    identifiedDate: new Date(),
    reviewDate: undefined as Date | undefined
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 🔄 DUMMY DATA FLAG: This form submission needs to be connected to your backend API
    // Replace this with actual API call to save risk data
    try {
      // await saveRiskData(formData);
      // Show success message
    } catch (error) {
      // Handle error appropriately
      console.error("Failed to save risk data:", error);
    }
    
    // Reset form and close modal
    setFormData({
      title: "",
      description: "",
      category: "",
      riskLevel: "",
      probability: "",
      impact: "",
      owner: "",
      identifiedDate: new Date(),
      reviewDate: undefined
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Risk</DialogTitle>
          <DialogDescription>
            Register a new risk in the risk registry with detailed information.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Risk Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Brief description of the risk"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="regulatory">Regulatory</SelectItem>
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="cybersecurity">Cyber Security</SelectItem>
                  <SelectItem value="reputational">Reputational</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                  <SelectItem value="strategic">Strategic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Risk Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed description of the risk, its potential causes, and consequences"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="riskLevel">Risk Level *</Label>
              <Select value={formData.riskLevel} onValueChange={(value) => setFormData({ ...formData, riskLevel: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="probability">Probability (%) *</Label>
              <Input
                id="probability"
                type="number"
                min="0"
                max="100"
                value={formData.probability}
                onChange={(e) => setFormData({ ...formData, probability: e.target.value })}
                placeholder="0-100"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="impact">Impact Level *</Label>
              <Select value={formData.impact} onValueChange={(value) => setFormData({ ...formData, impact: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select impact" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="owner">Risk Owner *</Label>
              <Select value={formData.owner} onValueChange={(value) => setFormData({ ...formData, owner: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Assign owner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jane.smith">Jane Smith</SelectItem>
                  <SelectItem value="mike.johnson">Mike Johnson</SelectItem>
                  <SelectItem value="sarah.davis">Sarah Davis</SelectItem>
                  <SelectItem value="david.wilson">David Wilson</SelectItem>
                  <SelectItem value="lisa.chen">Lisa Chen</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Review Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.reviewDate ? format(formData.reviewDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.reviewDate}
                    onSelect={(date) => setFormData({ ...formData, reviewDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Risk</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
