
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Download, Link, Copy } from "lucide-react";

interface KnowledgeDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entry: any;
}

export function KnowledgeDetailModal({ open, onOpenChange, entry }: KnowledgeDetailModalProps) {
  if (!entry) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl">{entry.title}</DialogTitle>
              <DialogDescription className="mt-2">
                {entry.type} • {entry.jurisdiction} • Last updated {entry.lastUpdated}
              </DialogDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button variant="outline" size="sm">
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Metadata</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Author:</span> {entry.author}
                </div>
                <div>
                  <span className="font-medium">Access Level:</span>
                  <Badge className="ml-2" variant="outline">{entry.accessLevel}</Badge>
                </div>
                <div>
                  <span className="font-medium">Type:</span> {entry.type}
                </div>
                <div>
                  <span className="font-medium">Jurisdiction:</span> {entry.jurisdiction}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {entry.tags?.map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Content */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none text-sm">
                <p>
                  This is a sample content area where the actual document content would be displayed.
                  The content can include rich text formatting, tables, lists, and other elements
                  depending on the document type and format.
                </p>
                <p>
                  For {entry.type} documents in {entry.jurisdiction}, specific guidelines and
                  procedures would be outlined here with relevant legal considerations and
                  practical implementation steps.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Linked Records */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Linked Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Link className="h-4 w-4" />
                  <span className="text-sm">No linked records</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
