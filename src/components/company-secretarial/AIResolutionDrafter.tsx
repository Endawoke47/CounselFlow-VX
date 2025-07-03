import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  FileText, 
  Wand2, 
  Download, 
  Send, 
  Eye, 
  Edit,
  Loader2,
  CheckCircle,
  PenTool,
  Users,
  Stamp
} from "lucide-react";
import { AIResolutionTemplate, Resolution, ExecutionBlock, TemplateVariable } from "@/types/company-secretarial";
import { companySecretarialAIService } from "@/services/companySecretarialAIService";

export function AIResolutionDrafter() {
  const [templates, setTemplates] = useState<AIResolutionTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<AIResolutionTemplate | null>(null);
  const [generatedResolution, setGeneratedResolution] = useState<Resolution | null>(null);
  const [templateVariables, setTemplateVariables] = useState<Record<string, any>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [selectedEntity, setSelectedEntity] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = () => {
    const availableTemplates = companySecretarialAIService.getResolutionTemplates();
    setTemplates(availableTemplates);
  };

  const handleTemplateSelect = (template: AIResolutionTemplate) => {
    setSelectedTemplate(template);
    setGeneratedResolution(null);
    
    // Initialize template variables with default values
    const initialVariables: Record<string, any> = {};
    template.variables.forEach(variable => {
      initialVariables[variable.name] = variable.defaultValue || '';
    });
    setTemplateVariables(initialVariables);
  };

  const handleVariableChange = (variableName: string, value: any) => {
    setTemplateVariables(prev => ({
      ...prev,
      [variableName]: value
    }));
  };

  const handleGenerateResolution = async () => {
    if (!selectedTemplate || !selectedEntity) return;

    setIsGenerating(true);
    setGenerationProgress(0);

    try {
      // Simulate generation progress
      const progressInterval = setInterval(() => {
        setGenerationProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 20;
        });
      }, 400);

      const resolution = await companySecretarialAIService.generateResolution(
        selectedTemplate,
        templateVariables,
        selectedEntity
      );

      setGenerationProgress(100);
      setGeneratedResolution(resolution);

    } catch (error) {
      console.error("Resolution generation failed:", error);
    } finally {
      setIsGenerating(false);
      setTimeout(() => setGenerationProgress(0), 2000);
    }
  };

  const renderVariableInput = (variable: TemplateVariable) => {
    const value = templateVariables[variable.name] || '';

    switch (variable.type) {
      case 'text':
        return (
          <Input
            value={value}
            onChange={(e) => handleVariableChange(variable.name, e.target.value)}
            placeholder={`Enter ${variable.label.toLowerCase()}`}
            required={variable.required}
          />
        );
      case 'date':
        return (
          <Input
            type="date"
            value={value}
            onChange={(e) => handleVariableChange(variable.name, e.target.value)}
            required={variable.required}
          />
        );
      case 'number':
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) => handleVariableChange(variable.name, e.target.value)}
            placeholder={`Enter ${variable.label.toLowerCase()}`}
            required={variable.required}
          />
        );
      case 'select':
        return (
          <Select value={value} onValueChange={(val) => handleVariableChange(variable.name, val)}>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${variable.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {variable.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      default:
        return (
          <Input
            value={value}
            onChange={(e) => handleVariableChange(variable.name, e.target.value)}
            placeholder={`Enter ${variable.label.toLowerCase()}`}
            required={variable.required}
          />
        );
    }
  };

  const getExecutionBlockIcon = (type: string) => {
    switch (type) {
      case 'director_signature':
        return <PenTool className="h-4 w-4" />;
      case 'secretary_signature':
        return <Users className="h-4 w-4" />;
      case 'witness_signature':
        return <Eye className="h-4 w-4" />;
      case 'company_seal':
        return <Stamp className="h-4 w-4" />;
      default:
        return <PenTool className="h-4 w-4" />;
    }
  };

  const getExecutionBlockLabel = (type: string) => {
    const labels: Record<string, string> = {
      'director_signature': 'Director Signature',
      'secretary_signature': 'Company Secretary Signature',
      'witness_signature': 'Witness Signature',
      'company_seal': 'Company Seal'
    };
    return labels[type] || type;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">AI Resolution Drafter</h2>
          <p className="text-muted-foreground">
            Generate professional resolutions using AI-powered templates with automatic execution blocks
          </p>
        </div>
        {generatedResolution && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
              <Eye className="h-4 w-4 mr-2" />
              {previewMode ? 'Edit Mode' : 'Preview'}
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Template Selection */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resolution Templates</CardTitle>
              <CardDescription>Choose from AI-powered resolution templates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {templates.map((template) => (
                <Card 
                  key={template.id} 
                  className={`cursor-pointer transition-colors ${
                    selectedTemplate?.id === template.id ? 'ring-2 ring-primary' : 'hover:bg-accent'
                  }`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{template.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {template.category.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {template.variables.length} variables • {template.jurisdiction}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Template Configuration */}
        <div className="space-y-4">
          {selectedTemplate ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Wand2 className="h-5 w-5" />
                  Configure Resolution
                </CardTitle>
                <CardDescription>{selectedTemplate.title}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="entity">Entity</Label>
                  <Select value={selectedEntity} onValueChange={setSelectedEntity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select entity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entity-1">Acme Corporation Ltd</SelectItem>
                      <SelectItem value="entity-2">Global Tech Solutions Pte Ltd</SelectItem>
                      <SelectItem value="entity-3">Innovation Holdings Inc</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedTemplate.variables.map((variable) => (
                  <div key={variable.name} className="space-y-2">
                    <Label htmlFor={variable.name}>
                      {variable.label}
                      {variable.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    {renderVariableInput(variable)}
                  </div>
                ))}

                {isGenerating && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 animate-pulse text-primary" />
                      <span className="text-sm">AI is drafting your resolution...</span>
                    </div>
                    <Progress value={generationProgress} className="w-full" />
                  </div>
                )}

                <Button 
                  onClick={handleGenerateResolution}
                  disabled={!selectedEntity || isGenerating}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Generate Resolution
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Select a template to get started</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Generated Resolution */}
        <div className="space-y-4">
          {generatedResolution ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Generated Resolution
                </CardTitle>
                <CardDescription>
                  {generatedResolution.title} • {generatedResolution.type} resolution
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {previewMode ? (
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 bg-muted/50">
                      <h3 className="font-semibold mb-2">{generatedResolution.title}</h3>
                      <div className="whitespace-pre-wrap text-sm">
                        {generatedResolution.resolutionText}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium">Execution Blocks</h4>
                      {generatedResolution.executionBlocks.map((block) => (
                        <div key={block.id} className="border rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            {getExecutionBlockIcon(block.type)}
                            <span className="font-medium text-sm">
                              {getExecutionBlockLabel(block.type)}
                            </span>
                            <Badge variant={block.signatureStatus === 'signed' ? 'default' : 'secondary'}>
                              {block.signatureStatus}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <p>{block.signatoryName}</p>
                            <p>{block.signatoryTitle}</p>
                            {block.signatureDate && (
                              <p>Signed: {block.signatureDate.toLocaleDateString()}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Tabs defaultValue="resolution" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="resolution">Resolution Text</TabsTrigger>
                      <TabsTrigger value="execution">Execution Blocks</TabsTrigger>
                    </TabsList>

                    <TabsContent value="resolution" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Resolution Title</Label>
                        <Input
                          id="title"
                          value={generatedResolution.title}
                          onChange={(e) => setGeneratedResolution({
                            ...generatedResolution,
                            title: e.target.value
                          })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="text">Resolution Text</Label>
                        <Textarea
                          id="text"
                          value={generatedResolution.resolutionText}
                          onChange={(e) => setGeneratedResolution({
                            ...generatedResolution,
                            resolutionText: e.target.value
                          })}
                          rows={12}
                          className="font-mono text-sm"
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="execution" className="space-y-4">
                      <div className="space-y-3">
                        {generatedResolution.executionBlocks.map((block, index) => (
                          <Card key={block.id}>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm flex items-center gap-2">
                                {getExecutionBlockIcon(block.type)}
                                {getExecutionBlockLabel(block.type)}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <Label className="text-xs">Name</Label>
                                  <Input
                                    value={block.signatoryName}
                                    onChange={(e) => {
                                      const updatedBlocks = [...generatedResolution.executionBlocks];
                                      updatedBlocks[index] = {
                                        ...block,
                                        signatoryName: e.target.value
                                      };
                                      setGeneratedResolution({
                                        ...generatedResolution,
                                        executionBlocks: updatedBlocks
                                      });
                                    }}
                                    className="text-xs"
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs">Title</Label>
                                  <Input
                                    value={block.signatoryTitle}
                                    onChange={(e) => {
                                      const updatedBlocks = [...generatedResolution.executionBlocks];
                                      updatedBlocks[index] = {
                                        ...block,
                                        signatoryTitle: e.target.value
                                      };
                                      setGeneratedResolution({
                                        ...generatedResolution,
                                        executionBlocks: updatedBlocks
                                      });
                                    }}
                                    className="text-xs"
                                  />
                                </div>
                              </div>
                              {block.signatoryEmail && (
                                <div>
                                  <Label className="text-xs">Email</Label>
                                  <Input
                                    value={block.signatoryEmail}
                                    onChange={(e) => {
                                      const updatedBlocks = [...generatedResolution.executionBlocks];
                                      updatedBlocks[index] = {
                                        ...block,
                                        signatoryEmail: e.target.value
                                      };
                                      setGeneratedResolution({
                                        ...generatedResolution,
                                        executionBlocks: updatedBlocks
                                      });
                                    }}
                                    className="text-xs"
                                  />
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                )}

                <div className="flex gap-2 pt-4">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button size="sm">
                    <Send className="h-4 w-4 mr-2" />
                    Send for Signature
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Brain className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Configure a template and generate your resolution
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 