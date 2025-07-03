
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AddDisputeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddDisputeModal({ open, onOpenChange }: AddDisputeModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    entity: "",
    counterparty: "",
    status: "Open",
    priority: "Medium",
    initiated: "",
    deadline: "",
    owner: "",
    externalCounsel: "",
    jurisdiction: "",
    caseType: "",
    linkedContracts: "",
    exposure: "",
    provisioned: false,
    glCode: "",
    legalExpenses: "",
    settlementRange: "",
    notes: ""
  });

  const handleSubmit = () => {
    console.log("Adding dispute:", formData);
    onOpenChange(false);
    // Reset form
    setFormData({
      title: "",
      description: "",
      entity: "",
      counterparty: "",
      status: "Open",
      priority: "Medium",
      initiated: "",
      deadline: "",
      owner: "",
      externalCounsel: "",
      jurisdiction: "",
      caseType: "",
      linkedContracts: "",
      exposure: "",
      provisioned: false,
      glCode: "",
      legalExpenses: "",
      settlementRange: "",
      notes: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Dispute</DialogTitle>
          <DialogDescription>
            Create a new dispute record with all relevant details
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="legal">Legal Details</TabsTrigger>
            <TabsTrigger value="financial">Financial Info</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Core Information</CardTitle>
                <CardDescription>Basic dispute details and timeline</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Dispute Title *</Label>
                    <Input 
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Brief descriptive title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="entity">Entity *</Label>
                    <Select value={formData.entity} onValueChange={(value) => setFormData({...formData, entity: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select entity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech-corp">Tech Corp Ltd</SelectItem>
                        <SelectItem value="tech-uk">Tech Corp UK</SelectItem>
                        <SelectItem value="innovation">Innovation Labs</SelectItem>
                        <SelectItem value="real-estate">Real Estate Holdings</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Detailed description of the dispute"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="counterparty">Counterparty *</Label>
                    <Input 
                      id="counterparty"
                      value={formData.counterparty}
                      onChange={(e) => setFormData({...formData, counterparty: e.target.value})}
                      placeholder="Other party in dispute"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="owner">Internal Owner *</Label>
                    <Select value={formData.owner} onValueChange={(value) => setFormData({...formData, owner: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Assign owner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                        <SelectItem value="mike-chen">Mike Chen</SelectItem>
                        <SelectItem value="lisa-wang">Lisa Wang</SelectItem>
                        <SelectItem value="tom-rodriguez">Tom Rodriguez</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="In Review">In Review</SelectItem>
                        <SelectItem value="Negotiation">Negotiation</SelectItem>
                        <SelectItem value="Escalated">Escalated</SelectItem>
                        <SelectItem value="Resolved">Resolved</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Critical">Critical</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jurisdiction">Jurisdiction</Label>
                    <Select value={formData.jurisdiction} onValueChange={(value) => setFormData({...formData, jurisdiction: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select jurisdiction" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="eu">European Union</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="initiated">Date Initiated</Label>
                    <Input 
                      id="initiated"
                      type="date"
                      value={formData.initiated}
                      onChange={(e) => setFormData({...formData, initiated: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Deadline</Label>
                    <Input 
                      id="deadline"
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="legal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Legal Metadata</CardTitle>
                <CardDescription>Legal team assignments and case details</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="externalCounsel">External Counsel</Label>
                    <Input 
                      id="externalCounsel"
                      value={formData.externalCounsel}
                      onChange={(e) => setFormData({...formData, externalCounsel: e.target.value})}
                      placeholder="Law firm or attorney name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="caseType">Case Type</Label>
                    <Select value={formData.caseType} onValueChange={(value) => setFormData({...formData, caseType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select case type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="contract">Contract Dispute</SelectItem>
                        <SelectItem value="employment">Employment</SelectItem>
                        <SelectItem value="ip">Intellectual Property</SelectItem>
                        <SelectItem value="commercial">Commercial Litigation</SelectItem>
                        <SelectItem value="regulatory">Regulatory</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedContracts">Linked Contracts</Label>
                  <Input 
                    id="linkedContracts"
                    value={formData.linkedContracts}
                    onChange={(e) => setFormData({...formData, linkedContracts: e.target.value})}
                    placeholder="Contract IDs or names (comma separated)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea 
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="Any additional information or context"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Financial Information</CardTitle>
                <CardDescription>Exposure, provisions, and cost tracking</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="exposure">Financial Exposure ($)</Label>
                    <Input 
                      id="exposure"
                      type="number"
                      value={formData.exposure}
                      onChange={(e) => setFormData({...formData, exposure: e.target.value})}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="glCode">GL Code</Label>
                    <Input 
                      id="glCode"
                      value={formData.glCode}
                      onChange={(e) => setFormData({...formData, glCode: e.target.value})}
                      placeholder="General ledger code"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch 
                    id="provisioned" 
                    checked={formData.provisioned}
                    onCheckedChange={(checked) => setFormData({...formData, provisioned: checked})}
                  />
                  <Label htmlFor="provisioned">Provision Created</Label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="legalExpenses">Legal Expenses ($)</Label>
                    <Input 
                      id="legalExpenses"
                      type="number"
                      value={formData.legalExpenses}
                      onChange={(e) => setFormData({...formData, legalExpenses: e.target.value})}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="settlementRange">Settlement Range ($)</Label>
                    <Input 
                      id="settlementRange"
                      value={formData.settlementRange}
                      onChange={(e) => setFormData({...formData, settlementRange: e.target.value})}
                      placeholder="e.g., 100,000 - 500,000"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Create Dispute
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
