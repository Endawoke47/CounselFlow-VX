
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface AddVendorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddVendorModal({ open, onOpenChange }: AddVendorModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    location: "",
    contactEmail: "",
    contactPhone: "",
    website: "",
    specialties: [] as string[],
    description: "",
    riskLevel: ""
  });

  const [newSpecialty, setNewSpecialty] = useState("");

  const vendorTypes = [
    "Global Law Firm",
    "International Firm", 
    "Regional Firm",
    "Boutique Firm",
    "Solo Practitioner",
    "Legal Consultancy"
  ];

  const specialtyOptions = [
    "M&A", "Securities", "Finance", "Banking", "Regulatory", "Disputes",
    "IP", "Employment", "Tax", "Real Estate", "Corporate", "Litigation",
    "Competition", "Data Protection", "Immigration", "Insurance"
  ];

  const handleAddSpecialty = (specialty: string) => {
    if (specialty && !formData.specialties.includes(specialty)) {
      setFormData(prev => ({
        ...prev,
        specialties: [...prev.specialties, specialty]
      }));
    }
    setNewSpecialty("");
  };

  const removeSpecialty = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.filter(s => s !== specialty)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Vendor data:", formData);
    onOpenChange(false);
    // Reset form
    setFormData({
      name: "",
      type: "",
      location: "",
      contactEmail: "",
      contactPhone: "",
      website: "",
      specialties: [],
      description: "",
      riskLevel: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Vendor</DialogTitle>
          <DialogDescription>
            Add a new external legal service provider to your vendor registry
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Vendor Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Davis Polk & Wardwell"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Vendor Type *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vendor type" />
                </SelectTrigger>
                <SelectContent>
                  {vendorTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., New York, US"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="riskLevel">Risk Level</Label>
              <Select value={formData.riskLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, riskLevel: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select risk level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email *</Label>
              <Input
                id="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                placeholder="contact@lawfirm.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input
                id="contactPhone"
                value={formData.contactPhone}
                onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
              placeholder="https://www.lawfirm.com"
            />
          </div>

          <div className="space-y-2">
            <Label>Specialties</Label>
            <div className="flex gap-2">
              <Select value={newSpecialty} onValueChange={setNewSpecialty}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Add specialty area" />
                </SelectTrigger>
                <SelectContent>
                  {specialtyOptions
                    .filter(specialty => !formData.specialties.includes(specialty))
                    .map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button 
                type="button" 
                onClick={() => handleAddSpecialty(newSpecialty)}
                disabled={!newSpecialty || formData.specialties.includes(newSpecialty)}
              >
                Add
              </Button>
            </div>
            {formData.specialties.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.specialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary" className="flex items-center gap-1">
                    {specialty}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeSpecialty(specialty)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of the vendor's capabilities and experience..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Add Vendor
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
