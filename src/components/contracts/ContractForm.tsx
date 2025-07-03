import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Save, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DocumentManagement } from "./DocumentManagement";

interface ContractFormProps {
  onSave: (contract: any) => void;
  onCancel: () => void;
  initialData?: any;
}

export function ContractForm({ onSave, onCancel, initialData }: ContractFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    entity: initialData?.entity || "",
    counterparty: initialData?.counterparty || "",
    type: initialData?.type || "",
    value: initialData?.value || "",
    owner: initialData?.owner || "",
    startDate: initialData?.startDate ? new Date(initialData.startDate) : undefined,
    endDate: initialData?.endDate ? new Date(initialData.endDate) : undefined,
    description: initialData?.description || "",
    status: initialData?.status || "Draft"
  });

  const [documents, setDocuments] = useState(initialData?.documents || []);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Contract title is required";
    }
    if (!formData.entity) {
      newErrors.entity = "Entity selection is required";
    }
    if (!formData.type) {
      newErrors.type = "Contract type is required";
    }
    if (!formData.owner) {
      newErrors.owner = "Contract owner is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const contractData = {
      ...formData,
      id: initialData?.id || Math.floor(Math.random() * 1000),
      renewalDate: formData.endDate ? format(formData.endDate, "yyyy-MM-dd") : "",
      startDate: formData.startDate ? format(formData.startDate, "yyyy-MM-dd") : "",
      endDate: formData.endDate ? format(formData.endDate, "yyyy-MM-dd") : "",
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      documents: documents
    };

    onSave(contractData);
  };

  return (
    <div className="space-y-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>{initialData ? "Edit Contract" : "Create New Contract"}</CardTitle>
          <CardDescription>
            {initialData ? "Update contract information" : "Enter contract details to add to your lifecycle management system"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Contract Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Software License Agreement"
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="entity">Entity *</Label>
                <Select 
                  value={formData.entity} 
                  onValueChange={(value) => setFormData({ ...formData, entity: value })}
                >
                  <SelectTrigger className={errors.entity ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select entity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Acme Corp Ltd">Acme Corp Ltd</SelectItem>
                    <SelectItem value="Global Holdings Inc">Global Holdings Inc</SelectItem>
                    <SelectItem value="Regional Office LLC">Regional Office LLC</SelectItem>
                    <SelectItem value="Tech Subsidiary Co">Tech Subsidiary Co</SelectItem>
                  </SelectContent>
                </Select>
                {errors.entity && <p className="text-sm text-red-500">{errors.entity}</p>}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Contract Type *</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger className={errors.type ? "border-red-500" : ""}>
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
                {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
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
              <Select 
                value={formData.owner} 
                onValueChange={(value) => setFormData({ ...formData, owner: value })}
              >
                <SelectTrigger className={errors.owner ? "border-red-500" : ""}>
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
              {errors.owner && <p className="text-sm text-red-500">{errors.owner}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Expiring">Expiring</SelectItem>
                  <SelectItem value="Expired">Expired</SelectItem>
                  <SelectItem value="Terminated">Terminated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                {initialData ? "Update Contract" : "Create Contract"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Document Management Section */}
      <DocumentManagement
        contractId={initialData?.id || 0}
        documents={documents}
        onDocumentsUpdate={setDocuments}
      />
    </div>
  );
}
