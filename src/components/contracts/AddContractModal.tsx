import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, FileText } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DocumentManagement } from "./DocumentManagement";

interface AddContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (contract: any) => void;
}

export function AddContractModal({ isOpen, onClose, onSave }: AddContractModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    entity: "",
    counterparty: "",
    type: "",
    value: "",
    owner: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    description: "",
    status: "Draft"
  });

  const [documents, setDocuments] = useState([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newContract = {
      ...formData,
      id: Math.floor(Math.random() * 1000),
      renewalDate: formData.endDate ? format(formData.endDate, "yyyy-MM-dd") : "",
      createdAt: new Date().toISOString(),
      documents: documents
    };
    onSave(newContract);
    setFormData({
      title: "",
      entity: "",
      counterparty: "",
      type: "",
      value: "",
      owner: "",
      startDate: undefined,
      endDate: undefined,
      description: "",
      status: "Draft"
    });
    setDocuments([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Add New Contract
          </DialogTitle>
          <DialogDescription>
            Create a new contract and add it to your lifecycle management system
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Contract Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Software License Agreement"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="entity">Entity *</Label>
                <Select value={formData.entity} onValueChange={(value) => setFormData({ ...formData, entity: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select entity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="acme-corp">Acme Corp Ltd</SelectItem>
                    <SelectItem value="global-holdings">Global Holdings Inc</SelectItem>
                    <SelectItem value="regional-office">Regional Office LLC</SelectItem>
                    <SelectItem value="tech-subsidiary">Tech Subsidiary Co</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="counterparty">Counterparty</Label>
                <Input
                  id="counterparty"
                  value={formData.counterparty}
                  onChange={(e) => setFormData({ ...formData, counterparty: e.target.value })}
                  placeholder="e.g., Microsoft Corporation"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Contract Type *</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Software">Software License</SelectItem>
                    <SelectItem value="Service">Service Agreement</SelectItem>
                    <SelectItem value="Employment">Employment Contract</SelectItem>
                    <SelectItem value="Vendor">Vendor Agreement</SelectItem>
                    <SelectItem value="Real Estate">Real Estate Lease</SelectItem>
                    <SelectItem value="NDA">Non-Disclosure Agreement</SelectItem>
                    <SelectItem value="Partnership">Partnership Agreement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">Contract Value</Label>
                <Input
                  id="value"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder="e.g., $50,000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="owner">Contract Owner *</Label>
              <Select value={formData.owner} onValueChange={(value) => setFormData({ ...formData, owner: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select owner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                  <SelectItem value="Mike Chen">Mike Chen</SelectItem>
                  <SelectItem value="Lisa Wong">Lisa Wong</SelectItem>
                  <SelectItem value="David Kim">David Kim</SelectItem>
                  <SelectItem value="Legal Team">Legal Team</SelectItem>
                  <SelectItem value="HR Team">HR Team</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.startDate ? format(formData.startDate, "PPP") : "Select start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.startDate}
                      onSelect={(date) => setFormData({ ...formData, startDate: date })}
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.endDate ? format(formData.endDate, "PPP") : "Select end date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.endDate}
                      onSelect={(date) => setFormData({ ...formData, endDate: date })}
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the contract..."
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Create Contract
              </Button>
            </div>
          </form>

          {/* Document Management Section */}
          <DocumentManagement
            contractId={0}
            documents={documents}
            onDocumentsUpdate={setDocuments}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
