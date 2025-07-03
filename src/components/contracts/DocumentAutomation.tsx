import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  Wand2,
  Download,
  Eye,
  Edit,
  Copy,
  Share,
  Settings,
  Plus,
  Trash2,
  Clock,
  CheckCircle,
  AlertTriangle,
  Brain,
  Zap,
  Template,
  BookOpen,
  Users,
  Calendar,
} from "lucide-react";

interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  type: "contract" | "agreement" | "policy" | "letter" | "form";
  complexity: "simple" | "medium" | "complex";
  fields: TemplateField[];
  clauses: TemplateClause[];
  tags: string[];
  usage: number;
  lastUpdated: string;
  createdBy: string;
}

interface TemplateField {
  id: string;
  name: string;
  label: string;
  type: "text" | "number" | "date" | "select" | "textarea" | "checkbox";
  required: boolean;
  placeholder?: string;
  options?: string[];
  validation?: string;
  defaultValue?: any;
}

interface TemplateClause {
  id: string;
  title: string;
  content: string;
  category: string;
  required: boolean;
  alternatives?: string[];
  riskLevel: "low" | "medium" | "high";
}

interface GeneratedDocument {
  id: string;
  name: string;
  templateId: string;
  templateName: string;
  status: "draft" | "review" | "approved" | "executed";
  createdAt: string;
  createdBy: string;
  lastModified: string;
  fieldValues: Record<string, any>;
  selectedClauses: string[];
  reviewers?: string[];
  comments?: DocumentComment[];
}

interface DocumentComment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  resolved: boolean;
}

export function DocumentAutomation() {
  const [activeTab, setActiveTab] = useState("templates");
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [showGenerateDialog, setShowGenerateDialog] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  // Mock data for demonstration
  const templates: DocumentTemplate[] = [
    {
      id: "template-1",
      name: "Software License Agreement",
      description: "Comprehensive software licensing agreement with customizable terms",
      category: "Technology",
      type: "contract",
      complexity: "complex",
      usage: 45,
      lastUpdated: "2024-06-15",
      createdBy: "Legal Team",
      tags: ["software", "licensing", "IP", "SaaS"],
      fields: [
        {
          id: "licensor_name",
          name: "licensorName",
          label: "Licensor Name",
          type: "text",
          required: true,
          placeholder: "Enter licensor company name",
        },
        {
          id: "licensee_name",
          name: "licenseeName",
          label: "Licensee Name",
          type: "text",
          required: true,
          placeholder: "Enter licensee company name",
        },
        {
          id: "license_type",
          name: "licenseType",
          label: "License Type",
          type: "select",
          required: true,
          options: ["Perpetual", "Subscription", "Trial", "Enterprise"],
        },
        {
          id: "license_fee",
          name: "licenseFee",
          label: "License Fee",
          type: "number",
          required: true,
          placeholder: "Enter license fee amount",
        },
        {
          id: "term_length",
          name: "termLength",
          label: "Term Length (months)",
          type: "number",
          required: true,
          defaultValue: 12,
        },
      ],
      clauses: [
        {
          id: "clause-1",
          title: "Grant of License",
          content: "Subject to the terms and conditions of this Agreement, Licensor hereby grants to Licensee a non-exclusive, non-transferable license to use the Software.",
          category: "Core Terms",
          required: true,
          riskLevel: "low",
        },
        {
          id: "clause-2",
          title: "Limitation of Liability",
          content: "In no event shall Licensor's total liability exceed the amount paid by Licensee under this Agreement.",
          category: "Risk Management",
          required: false,
          riskLevel: "high",
          alternatives: [
            "Licensor's liability shall be limited to direct damages only.",
            "No limitation of liability shall apply to gross negligence or willful misconduct.",
          ],
        },
      ],
    },
    {
      id: "template-2",
      name: "Employment Agreement",
      description: "Standard employment agreement with customizable benefits and terms",
      category: "HR",
      type: "agreement",
      complexity: "medium",
      usage: 78,
      lastUpdated: "2024-06-10",
      createdBy: "HR Team",
      tags: ["employment", "HR", "benefits", "compensation"],
      fields: [
        {
          id: "employee_name",
          name: "employeeName",
          label: "Employee Name",
          type: "text",
          required: true,
        },
        {
          id: "position",
          name: "position",
          label: "Position/Title",
          type: "text",
          required: true,
        },
        {
          id: "salary",
          name: "salary",
          label: "Annual Salary",
          type: "number",
          required: true,
        },
        {
          id: "start_date",
          name: "startDate",
          label: "Start Date",
          type: "date",
          required: true,
        },
      ],
      clauses: [
        {
          id: "clause-3",
          title: "Employment Terms",
          content: "Employee agrees to perform duties as assigned and maintain confidentiality.",
          category: "Core Terms",
          required: true,
          riskLevel: "low",
        },
      ],
    },
    {
      id: "template-3",
      name: "Non-Disclosure Agreement",
      description: "Mutual or one-way NDA with customizable confidentiality terms",
      category: "Legal",
      type: "agreement",
      complexity: "simple",
      usage: 156,
      lastUpdated: "2024-06-20",
      createdBy: "Legal Team",
      tags: ["NDA", "confidentiality", "trade secrets"],
      fields: [
        {
          id: "disclosing_party",
          name: "disclosingParty",
          label: "Disclosing Party",
          type: "text",
          required: true,
        },
        {
          id: "receiving_party",
          name: "receivingParty",
          label: "Receiving Party",
          type: "text",
          required: true,
        },
        {
          id: "nda_type",
          name: "ndaType",
          label: "NDA Type",
          type: "select",
          required: true,
          options: ["Mutual", "One-way"],
        },
      ],
      clauses: [
        {
          id: "clause-4",
          title: "Confidentiality Obligations",
          content: "Receiving Party agrees to maintain confidentiality of all disclosed information.",
          category: "Core Terms",
          required: true,
          riskLevel: "medium",
        },
      ],
    },
  ];

  const generatedDocuments: GeneratedDocument[] = [
    {
      id: "doc-1",
      name: "Microsoft Software License - Q2 2024",
      templateId: "template-1",
      templateName: "Software License Agreement",
      status: "approved",
      createdAt: "2024-06-01",
      createdBy: "John Doe",
      lastModified: "2024-06-15",
      fieldValues: {
        licensorName: "Microsoft Corporation",
        licenseeName: "Acme Corp Ltd",
        licenseType: "Enterprise",
        licenseFee: 50000,
        termLength: 36,
      },
      selectedClauses: ["clause-1", "clause-2"],
    },
    {
      id: "doc-2",
      name: "Sarah Johnson Employment Agreement",
      templateId: "template-2",
      templateName: "Employment Agreement",
      status: "review",
      createdAt: "2024-06-10",
      createdBy: "HR Team",
      lastModified: "2024-06-12",
      fieldValues: {
        employeeName: "Sarah Johnson",
        position: "Senior Legal Counsel",
        salary: 120000,
        startDate: "2024-07-01",
      },
      selectedClauses: ["clause-3"],
      reviewers: ["Legal Team", "HR Director"],
    },
  ];

  const handleGenerateDocument = async (template: DocumentTemplate, fieldValues: Record<string, any>) => {
    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulate document generation process
    const steps = [
      "Validating template fields...",
      "Processing clauses...",
      "Applying AI enhancements...",
      "Generating document...",
      "Finalizing formatting...",
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setGenerationProgress((i + 1) * 20);
    }

    setIsGenerating(false);
    setShowGenerateDialog(false);
    setGenerationProgress(0);
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "simple":
        return "text-success-600";
      case "medium":
        return "text-warning-600";
      case "complex":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-success-600" />;
      case "review":
        return <Clock className="h-4 w-4 text-warning-600" />;
      case "draft":
        return <Edit className="h-4 w-4 text-muted-foreground" />;
      case "executed":
        return <CheckCircle className="h-4 w-4 text-primary" />;
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "approved":
      case "executed":
        return "default";
      case "review":
        return "secondary";
      case "draft":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Wand2 className="h-6 w-6 text-primary" />
            Document Automation
          </h2>
          <p className="text-muted-foreground">
            AI-powered document generation with smart templates and clause libraries
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Template className="h-4 w-4 mr-2" />
            Template Library
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="generate">Generate Document</TabsTrigger>
          <TabsTrigger value="documents">My Documents</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {template.description}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {template.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs capitalize">
                      {template.type}
                    </Badge>
                    <Badge variant="outline" className={`text-xs ${getComplexityColor(template.complexity)}`}>
                      {template.complexity}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Fields</p>
                      <p className="font-medium">{template.fields.length}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Clauses</p>
                      <p className="font-medium">{template.clauses.length}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{template.usage} uses</span>
                    </div>
                    <span className="text-muted-foreground">
                      Updated {new Date(template.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 flex-wrap">
                    {template.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {template.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{template.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={() => {
                      setSelectedTemplate(template);
                      setShowGenerateDialog(true);
                    }}
                  >
                    <Wand2 className="h-4 w-4 mr-2" />
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="generate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                AI Document Generator
              </CardTitle>
              <CardDescription>
                Describe the document you need and let AI create a custom template
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="document-description">Document Description</Label>
                <Textarea
                  id="document-description"
                  placeholder="Describe the type of document you need (e.g., 'I need a consulting agreement for a 6-month project with milestone payments and IP ownership clauses')"
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="document-type">Document Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="agreement">Agreement</SelectItem>
                      <SelectItem value="policy">Policy</SelectItem>
                      <SelectItem value="letter">Letter</SelectItem>
                      <SelectItem value="form">Form</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="jurisdiction">Jurisdiction</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select jurisdiction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us-federal">US Federal</SelectItem>
                      <SelectItem value="california">California</SelectItem>
                      <SelectItem value="new-york">New York</SelectItem>
                      <SelectItem value="delaware">Delaware</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="complexity">Complexity</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select complexity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simple">Simple</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="complex">Complex</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="ai-review" />
                <Label htmlFor="ai-review" className="text-sm">
                  Include AI legal review and risk assessment
                </Label>
              </div>

              <Button className="w-full">
                <Zap className="h-4 w-4 mr-2" />
                Generate Custom Document
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {generatedDocuments.length} documents generated
            </p>
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="review">In Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="executed">Executed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {generatedDocuments.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(doc.status)}
                        <CardTitle className="text-lg">{doc.name}</CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {doc.templateName}
                        </Badge>
                        <Badge variant={getStatusBadgeVariant(doc.status)} className="text-xs">
                          {doc.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Created</p>
                      <p className="font-medium">{new Date(doc.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Created By</p>
                      <p className="font-medium">{doc.createdBy}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Modified</p>
                      <p className="font-medium">{new Date(doc.lastModified).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Reviewers</p>
                      <p className="font-medium">{doc.reviewers?.length || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{templates.length}</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Available templates
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Documents Generated
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{generatedDocuments.length}</div>
                <p className="text-sm text-success-600 mt-1">
                  +12% this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Time Saved
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156h</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Estimated time savings
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Approval Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94%</div>
                <p className="text-sm text-success-600 mt-1">
                  First-time approval rate
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Most Used Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {templates
                  .sort((a, b) => b.usage - a.usage)
                  .slice(0, 5)
                  .map((template) => (
                    <div key={template.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{template.name}</p>
                        <p className="text-sm text-muted-foreground">{template.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{template.usage} uses</p>
                        <Progress value={(template.usage / 200) * 100} className="w-24 mt-1" />
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Generate Document Dialog */}
      <Dialog open={showGenerateDialog} onOpenChange={setShowGenerateDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Generate Document: {selectedTemplate?.name}</DialogTitle>
            <DialogDescription>
              Fill in the required fields to generate your document
            </DialogDescription>
          </DialogHeader>
          
          {selectedTemplate && (
            <DocumentGenerationForm
              template={selectedTemplate}
              onGenerate={handleGenerateDocument}
              isGenerating={isGenerating}
              progress={generationProgress}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DocumentGenerationForm({
  template,
  onGenerate,
  isGenerating,
  progress,
}: {
  template: DocumentTemplate;
  onGenerate: (template: DocumentTemplate, fieldValues: Record<string, any>) => void;
  isGenerating: boolean;
  progress: number;
}) {
  const [fieldValues, setFieldValues] = useState<Record<string, any>>({});
  const [selectedClauses, setSelectedClauses] = useState<string[]>(
    template.clauses.filter(c => c.required).map(c => c.id)
  );

  const handleFieldChange = (fieldId: string, value: any) => {
    setFieldValues(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleClauseToggle = (clauseId: string, checked: boolean) => {
    if (checked) {
      setSelectedClauses(prev => [...prev, clauseId]);
    } else {
      setSelectedClauses(prev => prev.filter(id => id !== clauseId));
    }
  };

  const handleGenerate = () => {
    onGenerate(template, fieldValues);
  };

  if (isGenerating) {
    return (
      <div className="space-y-4 py-8">
        <div className="text-center">
          <Wand2 className="h-12 w-12 mx-auto text-primary animate-pulse mb-4" />
          <h3 className="text-lg font-semibold">Generating Document</h3>
          <p className="text-muted-foreground">
            AI is creating your document with smart formatting and legal review
          </p>
        </div>
        <Progress value={progress} className="w-full" />
        <p className="text-sm text-center text-muted-foreground">
          {progress < 20 && "Validating template fields..."}
          {progress >= 20 && progress < 40 && "Processing clauses..."}
          {progress >= 40 && progress < 60 && "Applying AI enhancements..."}
          {progress >= 60 && progress < 80 && "Generating document..."}
          {progress >= 80 && "Finalizing formatting..."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="fields" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="fields">Document Fields</TabsTrigger>
          <TabsTrigger value="clauses">Clauses</TabsTrigger>
        </TabsList>

        <TabsContent value="fields" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {template.fields.map((field) => (
              <div key={field.id}>
                <Label htmlFor={field.id}>
                  {field.label}
                  {field.required && <span className="text-destructive ml-1">*</span>}
                </Label>
                {field.type === "text" && (
                  <Input
                    id={field.id}
                    placeholder={field.placeholder}
                    value={fieldValues[field.name] || ""}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  />
                )}
                {field.type === "number" && (
                  <Input
                    id={field.id}
                    type="number"
                    placeholder={field.placeholder}
                    value={fieldValues[field.name] || ""}
                    onChange={(e) => handleFieldChange(field.name, parseFloat(e.target.value) || 0)}
                  />
                )}
                {field.type === "date" && (
                  <Input
                    id={field.id}
                    type="date"
                    value={fieldValues[field.name] || ""}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  />
                )}
                {field.type === "select" && (
                  <Select
                    value={fieldValues[field.name] || ""}
                    onValueChange={(value) => handleFieldChange(field.name, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {field.type === "textarea" && (
                  <Textarea
                    id={field.id}
                    placeholder={field.placeholder}
                    value={fieldValues[field.name] || ""}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  />
                )}
                {field.type === "checkbox" && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={field.id}
                      checked={fieldValues[field.name] || false}
                      onCheckedChange={(checked) => handleFieldChange(field.name, checked)}
                    />
                    <Label htmlFor={field.id}>{field.placeholder}</Label>
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="clauses" className="space-y-4">
          <div className="space-y-4">
            {template.clauses.map((clause) => (
              <div key={clause.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={clause.id}
                      checked={selectedClauses.includes(clause.id)}
                      onCheckedChange={(checked) => handleClauseToggle(clause.id, checked as boolean)}
                      disabled={clause.required}
                    />
                    <Label htmlFor={clause.id} className="font-medium">
                      {clause.title}
                      {clause.required && <span className="text-destructive ml-1">*</span>}
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {clause.category}
                    </Badge>
                    <Badge 
                      variant={clause.riskLevel === "high" ? "destructive" : clause.riskLevel === "medium" ? "secondary" : "default"}
                      className="text-xs"
                    >
                      {clause.riskLevel} risk
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {clause.content}
                </p>
                {clause.alternatives && clause.alternatives.length > 0 && (
                  <div>
                    <p className="text-xs font-medium mb-1">Alternative versions:</p>
                    <div className="space-y-1">
                      {clause.alternatives.map((alt, index) => (
                        <p key={index} className="text-xs text-muted-foreground pl-4 border-l-2 border-muted">
                          {alt}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-between pt-4">
        <Button variant="outline" onClick={() => {}}>
          Preview Document
        </Button>
        <Button onClick={handleGenerate}>
          <Wand2 className="h-4 w-4 mr-2" />
          Generate Document
        </Button>
      </div>
    </div>
  );
} 