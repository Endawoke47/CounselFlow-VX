
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface AddKnowledgeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddKnowledgeModal({ open, onOpenChange }: AddKnowledgeModalProps) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [author, setAuthor] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [entity, setEntity] = useState("");
  const [tags, setTags] = useState("");
  const [summary, setSummary] = useState("");
  const [accessLevel, setAccessLevel] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding knowledge entry:", { title, type, author, jurisdiction, entity, tags, summary, accessLevel, content });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Knowledge Entry</DialogTitle>
          <DialogDescription>
            Create a new knowledge entry to share with your team
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                required
              />
            </div>
            <div>
              <Label htmlFor="type">Document Type *</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="memo">Memo</SelectItem>
                  <SelectItem value="faq">FAQ</SelectItem>
                  <SelectItem value="playbook">Playbook</SelectItem>
                  <SelectItem value="risk-note">Risk Note</SelectItem>
                  <SelectItem value="template-contract">Template Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author name"
              />
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
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief summary of the content"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter the main content or upload a file"
              rows={6}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Entry</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
