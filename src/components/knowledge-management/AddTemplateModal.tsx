
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddTemplateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddTemplateModal({ open, onOpenChange }: AddTemplateModalProps) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [entity, setEntity] = useState("");
  const [tags, setTags] = useState("");
  const [summary, setSummary] = useState("");
  const [versionNotes, setVersionNotes] = useState("");
  const [accessLevel, setAccessLevel] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding template:", { title, type, jurisdiction, entity, tags, summary, versionNotes, accessLevel, content });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Template</DialogTitle>
          <DialogDescription>
            Create a new contract template
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter template title"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Template Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employment">Employment Contract</SelectItem>
                  <SelectItem value="license">License Agreement</SelectItem>
                  <SelectItem value="nda">Non-Disclosure Agreement</SelectItem>
                  <SelectItem value="service">Service Agreement</SelectItem>
                  <SelectItem value="purchase">Purchase Agreement</SelectItem>
                  <SelectItem value="consultancy">Consultancy Agreement</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
          </div>

          <div className="grid grid-cols-2 gap-4">
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
            <div>
              <Label htmlFor="access-level">Access Level</Label>
              <Select value={accessLevel} onValueChange={setAccessLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select access level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="legal-team">Legal Team</SelectItem>
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
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief description of the template"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="version-notes">Version Notes</Label>
            <Textarea
              id="version-notes"
              value={versionNotes}
              onChange={(e) => setVersionNotes(e.target.value)}
              placeholder="Notes about this version"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="content">Template Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter the template content or upload a file"
              rows={8}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Template</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
