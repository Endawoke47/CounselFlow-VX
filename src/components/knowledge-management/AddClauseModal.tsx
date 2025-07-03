
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddClauseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddClauseModal({ open, onOpenChange }: AddClauseModalProps) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [type, setType] = useState("");
  const [useCase, setUseCase] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [entity, setEntity] = useState("");
  const [riskProfile, setRiskProfile] = useState("");
  const [tags, setTags] = useState("");
  const [notes, setNotes] = useState("");
  const [accessLevel, setAccessLevel] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding clause:", { title, text, type, useCase, jurisdiction, entity, riskProfile, tags, notes, accessLevel });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Clause</DialogTitle>
          <DialogDescription>
            Create a new clause for the clause library
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter clause title"
              required
            />
          </div>

          <div>
            <Label htmlFor="text">Clause Text *</Label>
            <Textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter the clause text"
              rows={6}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Clause Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="liability">Liability</SelectItem>
                  <SelectItem value="termination">Termination</SelectItem>
                  <SelectItem value="data-protection">Data Protection</SelectItem>
                  <SelectItem value="ip">Intellectual Property</SelectItem>
                  <SelectItem value="payment">Payment Terms</SelectItem>
                  <SelectItem value="confidentiality">Confidentiality</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="use-case">Use Case</Label>
              <Select value={useCase} onValueChange={setUseCase}>
                <SelectTrigger>
                  <SelectValue placeholder="Select use case" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Contracts</SelectItem>
                  <SelectItem value="employment">Employment Contracts</SelectItem>
                  <SelectItem value="tech-services">Technology Services</SelectItem>
                  <SelectItem value="licensing">Licensing Agreements</SelectItem>
                  <SelectItem value="procurement">Procurement</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="jurisdiction">Jurisdiction</Label>
              <Select value={jurisdiction} onValueChange={setJurisdiction}>
                <SelectTrigger>
                  <SelectValue placeholder="Select jurisdiction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="eu">European Union</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="multiple">Multiple</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="entity">Entity</Label>
              <Select value={entity} onValueChange={setEntity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select entity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="techcorp-uk">TechCorp UK Ltd</SelectItem>
                  <SelectItem value="techcorp-de">TechCorp GmbH</SelectItem>
                  <SelectItem value="techcorp-us">TechCorp Inc</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="risk-profile">Risk Profile</Label>
              <Select value={riskProfile} onValueChange={setRiskProfile}>
                <SelectTrigger>
                  <SelectValue placeholder="Select risk level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="access-level">Access Level</Label>
              <Select value={accessLevel} onValueChange={setAccessLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select access level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="team">Team</SelectItem>
                  <SelectItem value="org-wide">Org-wide</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Enter tags separated by commas"
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes or commentary"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Clause</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
