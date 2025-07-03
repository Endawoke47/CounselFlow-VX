
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface AddDealModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddDealModal({ open, onOpenChange }: AddDealModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Deal</DialogTitle>
          <DialogDescription>
            Create a new investment opportunity in the pipeline
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dealName">Deal Name</Label>
            <Input id="dealName" placeholder="Enter deal name" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sector">Sector</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="finance">Financial Services</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dealSize">Deal Size</Label>
            <Input id="dealSize" placeholder="e.g., $50M" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="geography">Geography</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select geography" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="north-america">North America</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
                <SelectItem value="asia-pacific">Asia Pacific</SelectItem>
                <SelectItem value="latin-america">Latin America</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Initial Status</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sourced">Sourced</SelectItem>
                <SelectItem value="under-consideration">Under Consideration</SelectItem>
                <SelectItem value="due-diligence">Due Diligence</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="owner">Deal Owner</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select owner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                <SelectItem value="michael-chen">Michael Chen</SelectItem>
                <SelectItem value="emily-rodriguez">Emily Rodriguez</SelectItem>
                <SelectItem value="david-kim">David Kim</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="timeline">Expected Timeline</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select timeline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="q1-2024">Q1 2024</SelectItem>
                <SelectItem value="q2-2024">Q2 2024</SelectItem>
                <SelectItem value="q3-2024">Q3 2024</SelectItem>
                <SelectItem value="q4-2024">Q4 2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            placeholder="Brief description of the investment opportunity"
            rows={3}
          />
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            Create Deal
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
