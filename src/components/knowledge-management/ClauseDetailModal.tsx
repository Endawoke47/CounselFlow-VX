
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Copy, BarChart3, FileText } from "lucide-react";

interface ClauseDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clause: any;
}

export function ClauseDetailModal({ open, onOpenChange, clause }: ClauseDetailModalProps) {
  if (!clause) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl">{clause.title}</DialogTitle>
              <DialogDescription className="mt-2">
                {clause.type} • {clause.useCase} • {clause.jurisdiction}
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
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Clause Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Type:</span> {clause.type}
                  </div>
                  <div>
                    <span className="font-medium">Use Case:</span> {clause.useCase}
                  </div>
                  <div>
                    <span className="font-medium">Jurisdiction:</span> {clause.jurisdiction}
                  </div>
                  <div>
                    <span className="font-medium">Risk Profile:</span>
                    <Badge className="ml-2" variant="outline">{clause.riskProfile}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Usage Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    <span>Usage Count: {clause.usageCount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Linked Templates: {clause.linkedTemplates}</span>
                  </div>
                  <div>
                    <span className="font-medium">Last Updated:</span> {clause.lastUpdated}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Clause Text */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Clause Text</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none text-sm p-4 bg-muted rounded-md">
                <p>
                  This is a sample clause text that would contain the actual legal language
                  for the {clause.title}. The text would include specific terms, conditions,
                  and legal provisions relevant to {clause.type} in {clause.jurisdiction}.
                </p>
                <p>
                  The clause is designed for use in {clause.useCase} and has been assessed
                  as {clause.riskProfile.toLowerCase()} risk based on legal review and
                  industry standards.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Risk Assessment */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Risk Assessment & Commentary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Risk Level:</span>
                  <Badge className="ml-2" variant="outline">{clause.riskProfile}</Badge>
                </div>
                <div>
                  <span className="font-medium">Commentary:</span>
                  <p className="mt-1 text-muted-foreground">
                    This clause has been reviewed and assessed for legal and commercial risks.
                    Standard provisions apply with minimal deviation from industry norms.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Linked Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Linked Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  This clause is used in {clause.linkedTemplates} templates
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 border rounded text-sm">Software License Agreement</div>
                  <div className="p-2 border rounded text-sm">Service Agreement</div>
                  <div className="p-2 border rounded text-sm">Employment Contract</div>
                  <div className="p-2 border rounded text-sm">NDA Template</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
