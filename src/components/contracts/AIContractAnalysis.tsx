import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import {
  Brain,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  FileText,
  Zap,
  Shield,
  Clock,
  DollarSign,
  Scale,
  Eye,
  Download,
  RefreshCw,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";

interface ContractAnalysis {
  id: string;
  contractName: string;
  analysisDate: string;
  overallScore: number;
  riskLevel: "low" | "medium" | "high";
  insights: ContractInsight[];
  clauses: ClauseAnalysis[];
  recommendations: Recommendation[];
  complianceCheck: ComplianceResult[];
}

interface ContractInsight {
  type: "risk" | "opportunity" | "compliance" | "financial";
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  confidence: number;
}

interface ClauseAnalysis {
  id: string;
  title: string;
  content: string;
  type: string;
  riskScore: number;
  issues: string[];
  suggestions: string[];
  standardCompliance: boolean;
}

interface Recommendation {
  id: string;
  type: "add" | "modify" | "remove" | "review";
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  impact: string;
}

interface ComplianceResult {
  regulation: string;
  status: "compliant" | "non-compliant" | "partial";
  details: string;
  requirements: string[];
}

export function AIContractAnalysis() {
  const [selectedContract, setSelectedContract] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ContractAnalysis | null>(null);
  const [contractText, setContractText] = useState("");

  // Mock data for demonstration
  const mockAnalysis: ContractAnalysis = {
    id: "analysis-1",
    contractName: "Software License Agreement - Microsoft",
    analysisDate: new Date().toISOString(),
    overallScore: 78,
    riskLevel: "medium",
    insights: [
      {
        type: "risk",
        title: "Liability Cap Concerns",
        description: "The liability limitation clause may not adequately protect against potential damages exceeding $50,000.",
        severity: "high",
        confidence: 92,
      },
      {
        type: "financial",
        title: "Auto-Renewal Terms",
        description: "Contract includes automatic renewal with 90-day notice period, which may impact budget planning.",
        severity: "medium",
        confidence: 88,
      },
      {
        type: "compliance",
        title: "Data Protection Compliance",
        description: "GDPR compliance clauses are present but may need strengthening for international operations.",
        severity: "medium",
        confidence: 85,
      },
      {
        type: "opportunity",
        title: "Volume Discount Available",
        description: "Contract terms suggest potential for volume discounts that haven't been negotiated.",
        severity: "low",
        confidence: 76,
      },
    ],
    clauses: [
      {
        id: "clause-1",
        title: "Limitation of Liability",
        content: "In no event shall the total liability of either party exceed the amount paid under this agreement in the twelve months preceding the claim.",
        type: "Liability",
        riskScore: 75,
        issues: [
          "Cap may be insufficient for high-value operations",
          "No carve-outs for willful misconduct",
        ],
        suggestions: [
          "Consider increasing liability cap to $500,000",
          "Add carve-outs for data breaches and IP infringement",
        ],
        standardCompliance: false,
      },
      {
        id: "clause-2",
        title: "Termination Rights",
        content: "Either party may terminate this agreement with 30 days written notice for any reason.",
        type: "Termination",
        riskScore: 45,
        issues: [
          "Short notice period may disrupt operations",
        ],
        suggestions: [
          "Extend notice period to 90 days",
          "Add specific termination triggers",
        ],
        standardCompliance: true,
      },
    ],
    recommendations: [
      {
        id: "rec-1",
        type: "modify",
        title: "Strengthen Liability Protection",
        description: "Increase liability cap and add specific carve-outs for critical risks.",
        priority: "high",
        impact: "Reduces potential financial exposure by up to $450,000",
      },
      {
        id: "rec-2",
        type: "add",
        title: "Add Force Majeure Clause",
        description: "Include comprehensive force majeure provisions to protect against unforeseen circumstances.",
        priority: "medium",
        impact: "Provides protection against pandemic-related disruptions",
      },
      {
        id: "rec-3",
        type: "review",
        title: "Review Payment Terms",
        description: "Current payment terms may be improved to optimize cash flow.",
        priority: "low",
        impact: "Potential 15-day improvement in payment cycles",
      },
    ],
    complianceCheck: [
      {
        regulation: "GDPR",
        status: "partial",
        details: "Data processing clauses present but lack specific controller/processor definitions",
        requirements: [
          "Define data controller and processor roles",
          "Add data subject rights provisions",
          "Include data breach notification procedures",
        ],
      },
      {
        regulation: "SOX Compliance",
        status: "compliant",
        details: "Financial reporting and audit trail requirements are adequately addressed",
        requirements: [],
      },
    ],
  };

  const handleAnalyzeContract = async () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high":
        return "text-destructive";
      case "medium":
        return "text-warning-600";
      case "low":
        return "text-success-600";
      default:
        return "text-muted-foreground";
    }
  };

  const getRiskBadgeVariant = (level: string) => {
    switch (level) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "default";
      default:
        return "outline";
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "risk":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "opportunity":
        return <TrendingUp className="h-4 w-4 text-success-600" />;
      case "compliance":
        return <Shield className="h-4 w-4 text-info-600" />;
      case "financial":
        return <DollarSign className="h-4 w-4 text-warning-600" />;
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            AI Contract Analysis
          </h2>
          <p className="text-muted-foreground">
            Intelligent contract review with risk assessment and recommendations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button onClick={handleAnalyzeContract} disabled={isAnalyzing}>
            {isAnalyzing ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Zap className="h-4 w-4 mr-2" />
            )}
            {isAnalyzing ? "Analyzing..." : "Analyze Contract"}
          </Button>
        </div>
      </div>

      {!analysis && !isAnalyzing && (
        <Card>
          <CardHeader>
            <CardTitle>Upload Contract for Analysis</CardTitle>
            <CardDescription>
              Upload a contract document or paste contract text for AI-powered analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Textarea
                placeholder="Paste contract text here for analysis..."
                value={contractText}
                onChange={(e) => setContractText(e.target.value)}
                className="min-h-[200px]"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
              <span className="text-sm text-muted-foreground">
                Supports PDF, DOCX, and TXT files
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {isAnalyzing && (
        <Card>
          <CardContent className="py-12">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <Brain className="h-12 w-12 text-primary animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Analyzing Contract</h3>
                <p className="text-muted-foreground">
                  AI is reviewing clauses, assessing risks, and generating insights...
                </p>
              </div>
              <Progress value={65} className="w-64 mx-auto" />
              <p className="text-sm text-muted-foreground">
                Processing contract terms and compliance requirements
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {analysis && (
        <div className="space-y-6">
          {/* Analysis Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Overall Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analysis.overallScore}/100</div>
                <Progress value={analysis.overallScore} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Risk Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant={getRiskBadgeVariant(analysis.riskLevel)} className="text-sm">
                  {analysis.riskLevel.toUpperCase()}
                </Badge>
                <p className="text-sm text-muted-foreground mt-1">
                  Based on clause analysis
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Issues Found
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">
                  {analysis.insights.filter(i => i.type === "risk").length}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Require attention
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {analysis.recommendations.length}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Improvement suggestions
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="insights" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="insights">Key Insights</TabsTrigger>
              <TabsTrigger value="clauses">Clause Analysis</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
            </TabsList>

            <TabsContent value="insights" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {analysis.insights.map((insight, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getInsightIcon(insight.type)}
                          <CardTitle className="text-base">{insight.title}</CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getRiskBadgeVariant(insight.severity)} className="text-xs">
                            {insight.severity}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {insight.confidence}% confidence
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {insight.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="clauses" className="space-y-4">
              {analysis.clauses.map((clause) => (
                <Card key={clause.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{clause.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {clause.type}
                          </Badge>
                          <Badge variant={getRiskBadgeVariant(clause.riskScore > 70 ? "high" : clause.riskScore > 40 ? "medium" : "low")} className="text-xs">
                            Risk: {clause.riskScore}/100
                          </Badge>
                          {clause.standardCompliance ? (
                            <Badge variant="default" className="text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Standard Compliant
                            </Badge>
                          ) : (
                            <Badge variant="destructive" className="text-xs">
                              <XCircle className="h-3 w-3 mr-1" />
                              Non-Standard
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Full Text
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm bg-muted p-3 rounded-md italic">
                        "{clause.content}"
                      </p>
                    </div>

                    {clause.issues.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-sm mb-2 text-destructive">
                          Issues Identified:
                        </h4>
                        <ul className="space-y-1">
                          {clause.issues.map((issue, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                              <AlertTriangle className="h-3 w-3 text-destructive mt-0.5 flex-shrink-0" />
                              {issue}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {clause.suggestions.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-sm mb-2 text-primary">
                          Suggestions:
                        </h4>
                        <ul className="space-y-1">
                          {clause.suggestions.map((suggestion, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                              <CheckCircle className="h-3 w-3 text-success-600 mt-0.5 flex-shrink-0" />
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-4">
              {analysis.recommendations.map((rec) => (
                <Card key={rec.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {rec.type === "add" && <Plus className="h-4 w-4 text-success-600" />}
                          {rec.type === "modify" && <Edit className="h-4 w-4 text-warning-600" />}
                          {rec.type === "remove" && <Trash2 className="h-4 w-4 text-destructive" />}
                          {rec.type === "review" && <Eye className="h-4 w-4 text-info-600" />}
                          {rec.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={getRiskBadgeVariant(rec.priority)} className="text-xs">
                            {rec.priority} priority
                          </Badge>
                          <Badge variant="outline" className="text-xs capitalize">
                            {rec.type}
                          </Badge>
                        </div>
                      </div>
                      <Button size="sm">
                        Apply Suggestion
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      {rec.description}
                    </p>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-sm font-medium">Expected Impact:</p>
                      <p className="text-sm text-muted-foreground">{rec.impact}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="compliance" className="space-y-4">
              {analysis.complianceCheck.map((compliance, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{compliance.regulation}</CardTitle>
                      <Badge
                        variant={
                          compliance.status === "compliant"
                            ? "default"
                            : compliance.status === "partial"
                            ? "secondary"
                            : "destructive"
                        }
                        className="text-sm"
                      >
                        {compliance.status === "compliant" && <CheckCircle className="h-3 w-3 mr-1" />}
                        {compliance.status === "non-compliant" && <XCircle className="h-3 w-3 mr-1" />}
                        {compliance.status === "partial" && <AlertTriangle className="h-3 w-3 mr-1" />}
                        {compliance.status.replace("-", " ").toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      {compliance.details}
                    </p>
                    {compliance.requirements.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-sm mb-2">
                          Required Actions:
                        </h4>
                        <ul className="space-y-1">
                          {compliance.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                              <Scale className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
} 