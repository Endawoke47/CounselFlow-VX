import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  BookOpen,
  Scale,
  FileText,
  TrendingUp,
  Clock,
  Star,
  Bookmark,
  Share,
  Download,
  Filter,
  Brain,
  Gavel,
  Globe,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

interface LegalDocument {
  id: string;
  title: string;
  type: "case_law" | "statute" | "regulation" | "article" | "precedent";
  jurisdiction: string;
  date: string;
  court?: string;
  citation: string;
  summary: string;
  relevanceScore: number;
  keyPoints: string[];
  tags: string[];
  url?: string;
}

interface ResearchQuery {
  query: string;
  jurisdiction: string[];
  documentTypes: string[];
  dateRange: {
    from?: string;
    to?: string;
  };
  practiceAreas: string[];
}

interface AIInsight {
  type: "trend" | "precedent" | "risk" | "opportunity";
  title: string;
  description: string;
  confidence: number;
  sources: string[];
}

export function LegalResearchHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<LegalDocument[]>([]);
  const [savedSearches, setSavedSearches] = useState<string[]>([]);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [activeTab, setActiveTab] = useState("search");

  // Mock data for demonstration
  const mockResults: LegalDocument[] = [
    {
      id: "1",
      title: "Smith v. Technology Corp - Data Privacy Breach Liability",
      type: "case_law",
      jurisdiction: "Federal",
      date: "2024-03-15",
      court: "9th Circuit Court of Appeals",
      citation: "2024 WL 1234567",
      summary: "Court held that companies have heightened duty of care in protecting customer data, establishing new precedent for breach notification requirements.",
      relevanceScore: 95,
      keyPoints: [
        "Expanded definition of 'reasonable security measures'",
        "New 24-hour notification requirement for breaches",
        "Increased liability for third-party vendor breaches",
      ],
      tags: ["data privacy", "breach notification", "corporate liability"],
      url: "https://example.com/case/smith-v-tech",
    },
    {
      id: "2",
      title: "GDPR Compliance Guidelines for US Companies",
      type: "regulation",
      jurisdiction: "EU/US",
      date: "2024-02-28",
      citation: "EU Reg. 2024/456",
      summary: "Updated guidance on GDPR compliance requirements for US companies processing EU citizen data.",
      relevanceScore: 88,
      keyPoints: [
        "Clarified data controller vs processor responsibilities",
        "New safe harbor provisions for US companies",
        "Updated consent requirements for marketing",
      ],
      tags: ["GDPR", "international compliance", "data processing"],
    },
    {
      id: "3",
      title: "Johnson v. MegaCorp - Employment Contract Enforceability",
      type: "case_law",
      jurisdiction: "California",
      date: "2024-01-20",
      court: "California Supreme Court",
      citation: "Cal. 2024 SC 789",
      summary: "Supreme Court ruling on enforceability of non-compete clauses in employment contracts post-SB 699.",
      relevanceScore: 82,
      keyPoints: [
        "Non-compete clauses largely unenforceable in California",
        "Trade secret protection remains valid",
        "Severability provisions may save partial agreements",
      ],
      tags: ["employment law", "non-compete", "California law"],
    },
  ];

  const mockInsights: AIInsight[] = [
    {
      type: "trend",
      title: "Increasing Data Privacy Litigation",
      description: "Courts are showing increased willingness to hold companies liable for data breaches, with average settlements up 45% year-over-year.",
      confidence: 92,
      sources: ["Smith v. Technology Corp", "Data Privacy Trends 2024", "Federal Trade Commission Report"],
    },
    {
      type: "precedent",
      title: "New Standard for Corporate Due Diligence",
      description: "Recent cases establish higher bar for M&A due diligence, particularly regarding cybersecurity and data governance.",
      confidence: 87,
      sources: ["Delaware Chancery Court Decisions", "M&A Due Diligence Standards"],
    },
    {
      type: "risk",
      title: "Regulatory Changes in Financial Services",
      description: "Proposed SEC regulations may significantly impact fintech compliance requirements by Q4 2024.",
      confidence: 78,
      sources: ["SEC Proposed Rule 2024-03", "Financial Services Regulatory Outlook"],
    },
  ];

  const jurisdictions = [
    "Federal",
    "California",
    "New York",
    "Delaware",
    "Texas",
    "EU",
    "UK",
    "International",
  ];

  const documentTypes = [
    "Case Law",
    "Statutes",
    "Regulations",
    "Legal Articles",
    "Precedents",
    "Treaties",
  ];

  const practiceAreas = [
    "Corporate Law",
    "Employment Law",
    "Data Privacy",
    "Intellectual Property",
    "Securities",
    "M&A",
    "Litigation",
    "Regulatory Compliance",
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // Simulate AI-powered search
    setTimeout(() => {
      setSearchResults(mockResults);
      setAiInsights(mockInsights);
      setIsSearching(false);
    }, 2000);
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "case_law":
        return <Gavel className="h-4 w-4 text-primary" />;
      case "statute":
        return <Scale className="h-4 w-4 text-info-600" />;
      case "regulation":
        return <FileText className="h-4 w-4 text-warning-600" />;
      case "article":
        return <BookOpen className="h-4 w-4 text-success-600" />;
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "trend":
        return <TrendingUp className="h-4 w-4 text-success-600" />;
      case "precedent":
        return <Gavel className="h-4 w-4 text-primary" />;
      case "risk":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case "opportunity":
        return <CheckCircle className="h-4 w-4 text-success-600" />;
      default:
        return <Brain className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            Legal Research Hub
          </h2>
          <p className="text-muted-foreground">
            AI-powered legal research with case law analysis and regulatory insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Bookmark className="h-4 w-4 mr-2" />
            Saved Searches
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Results
          </Button>
        </div>
      </div>

      {/* Search Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Legal Research Query
          </CardTitle>
          <CardDescription>
            Enter your legal question or search terms for AI-powered research
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Textarea
                placeholder="Enter your legal research question (e.g., 'What are the latest developments in data privacy breach notification requirements?')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Jurisdiction</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select jurisdiction" />
                </SelectTrigger>
                <SelectContent>
                  {jurisdictions.map((jurisdiction) => (
                    <SelectItem key={jurisdiction} value={jurisdiction}>
                      {jurisdiction}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Document Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Practice Area</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All areas" />
                </SelectTrigger>
                <SelectContent>
                  {practiceAreas.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox id="recent" />
              <label htmlFor="recent" className="text-sm">
                Recent developments only (last 12 months)
              </label>
            </div>
            <Button onClick={handleSearch} disabled={isSearching || !searchQuery.trim()}>
              {isSearching ? (
                <>
                  <Brain className="h-4 w-4 mr-2 animate-pulse" />
                  Researching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Research
                </>
              )}
            </Button>
          </div>

          {isSearching && (
            <div className="space-y-2">
              <Progress value={65} />
              <p className="text-sm text-muted-foreground text-center">
                Analyzing legal databases and generating insights...
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {searchResults.length > 0 && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="search">Search Results</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="analysis">Legal Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Found {searchResults.length} relevant documents
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="jurisdiction">Jurisdiction</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              {searchResults.map((doc) => (
                <Card key={doc.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {getDocumentIcon(doc.type)}
                          <CardTitle className="text-lg">{doc.title}</CardTitle>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{doc.jurisdiction}</span>
                          <span>•</span>
                          <span>{doc.date}</span>
                          {doc.court && (
                            <>
                              <span>•</span>
                              <span>{doc.court}</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {doc.citation}
                          </Badge>
                          <Badge variant="default" className="text-xs">
                            {doc.relevanceScore}% relevant
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share className="h-4 w-4" />
                        </Button>
                        {doc.url && (
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {doc.summary}
                    </p>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Key Points:</h4>
                      <ul className="space-y-1">
                        {doc.keyPoints.map((point, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                            <ArrowRight className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-1 flex-wrap">
                      {doc.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {aiInsights.map((insight, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getInsightIcon(insight.type)}
                        <CardTitle className="text-base">{insight.title}</CardTitle>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {insight.confidence}% confidence
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {insight.description}
                    </p>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Sources:</h4>
                      <ul className="space-y-1">
                        {insight.sources.map((source, sourceIndex) => (
                          <li key={sourceIndex} className="text-xs text-muted-foreground flex items-center gap-2">
                            <BookOpen className="h-3 w-3 text-primary flex-shrink-0" />
                            {source}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI Legal Analysis
                </CardTitle>
                <CardDescription>
                  Comprehensive analysis based on your research query
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Executive Summary</h3>
                  <p className="text-sm text-muted-foreground">
                    Based on the current legal landscape, data privacy breach notification requirements 
                    are becoming increasingly stringent. Recent court decisions, particularly Smith v. 
                    Technology Corp, have established new precedents that expand corporate liability 
                    and reduce notification timeframes.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Key Legal Developments</h3>
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4">
                      <h4 className="font-medium text-sm">Expanded Liability Standards</h4>
                      <p className="text-sm text-muted-foreground">
                        Courts are applying stricter standards for what constitutes "reasonable security measures"
                      </p>
                    </div>
                    <div className="border-l-4 border-warning-600 pl-4">
                      <h4 className="font-medium text-sm">Accelerated Notification Requirements</h4>
                      <p className="text-sm text-muted-foreground">
                        New 24-hour notification requirement for certain types of breaches
                      </p>
                    </div>
                    <div className="border-l-4 border-info-600 pl-4">
                      <h4 className="font-medium text-sm">Third-Party Vendor Accountability</h4>
                      <p className="text-sm text-muted-foreground">
                        Increased liability for breaches involving third-party vendors and service providers
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Recommendations</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Review and update incident response procedures to meet new 24-hour notification requirements</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Conduct comprehensive security audit to ensure compliance with expanded "reasonable security" standards</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Review third-party vendor agreements and implement additional security requirements</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
} 