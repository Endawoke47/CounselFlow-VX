
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, FileText } from "lucide-react";

interface ClauseComparisonModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockClauses = [
  { id: "1", title: "Data Protection Clause - Standard", risk: "Low" },
  { id: "2", title: "Data Protection Clause - Enhanced", risk: "Medium" },
  { id: "3", title: "Limitation of Liability - Basic", risk: "High" },
  { id: "4", title: "Limitation of Liability - Comprehensive", risk: "Low" }
];

export function ClauseComparisonModal({ open, onOpenChange }: ClauseComparisonModalProps) {
  const [clause1, setClause1] = useState("");
  const [clause2, setClause2] = useState("");

  const handleCompare = () => {
    console.log("Comparing clauses:", clause1, clause2);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Clause Comparison Tool</DialogTitle>
          <DialogDescription>
            Compare two clauses to highlight differences and risk profiles
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Clause Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Select First Clause</label>
              <Select value={clause1} onValueChange={setClause1}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose clause to compare" />
                </SelectTrigger>
                <SelectContent>
                  {mockClauses.map((clause) => (
                    <SelectItem key={clause.id} value={clause.id}>
                      {clause.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Select Second Clause</label>
              <Select value={clause2} onValueChange={setClause2}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose clause to compare" />
                </SelectTrigger>
                <SelectContent>
                  {mockClauses.map((clause) => (
                    <SelectItem key={clause.id} value={clause.id}>
                      {clause.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleCompare} disabled={!clause1 || !clause2}>
              Compare Clauses
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Comparison
            </Button>
          </div>

          {/* Comparison Results */}
          {clause1 && clause2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Clause A</CardTitle>
                    <CardDescription>Data Protection Clause - Standard</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <Badge variant="outline">Low Risk</Badge>
                      <Badge variant="outline">GDPR Compliant</Badge>
                    </div>
                    <div className="text-sm space-y-2">
                      <p className="bg-green-50 p-2 rounded">
                        The Company shall process personal data in accordance with applicable data protection laws
                        <span className="text-green-600 font-medium"> including GDPR</span> and maintain appropriate
                        technical and organizational measures.
                      </p>
                      <p>
                        Data subjects have the right to access, rectify, and erase their personal data.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Clause B</CardTitle>
                    <CardDescription>Data Protection Clause - Enhanced</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <Badge variant="outline">Medium Risk</Badge>
                      <Badge variant="outline">Enhanced Protection</Badge>
                    </div>
                    <div className="text-sm space-y-2">
                      <p className="bg-yellow-50 p-2 rounded">
                        The Company shall process personal data in accordance with applicable data protection laws
                        <span className="text-yellow-600 font-medium"> and industry best practices</span> and maintain
                        comprehensive security frameworks.
                      </p>
                      <p className="bg-green-50 p-2 rounded">
                        <span className="text-green-600 font-medium">Data subjects have enhanced rights including data portability and automated decision-making opt-out.</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Key Differences */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Key Differences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <strong>Added in Clause B:</strong> Enhanced data subject rights including data portability
                        and automated decision-making provisions.
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div>
                        <strong>Modified in Clause B:</strong> Changed "GDPR" to "industry best practices" for broader
                        compliance scope.
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <strong>Risk Assessment:</strong> Clause B provides more comprehensive protection but may
                        impose additional compliance obligations.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
