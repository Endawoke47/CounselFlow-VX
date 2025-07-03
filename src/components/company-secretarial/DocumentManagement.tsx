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
  Upload, 
  FileText, 
  Brain, 
  Search, 
  Download, 
  Eye, 
  MessageSquare,
  Loader2,
  CheckCircle,
  AlertCircle,
  Clock
} from "lucide-react";
import { ConstitutionalDocument, ExtractedClause, DocumentQuery } from "@/types/company-secretarial";
import { companySecretarialService } from "@/services/companySecretarialService";
import { companySecretarialAIService } from "@/services/companySecretarialAIService";

export function DocumentManagement() {
  const [documents, setDocuments] = useState<ConstitutionalDocument[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<ConstitutionalDocument | null>(null);
  const [extractedClauses, setExtractedClauses] = useState<ExtractedClause[]>([]);
  const [documentQueries, setDocumentQueries] = useState<DocumentQuery[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isQuerying, setIsQuerying] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [queryText, setQueryText] = useState("");
  const [uploadForm, setUploadForm] = useState({
    entityId: "",
    documentType: "",
    file: null as File | null
  });

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const docs = await companySecretarialService.getConstitutionalDocuments();
      setDocuments(docs);
    } catch (error) {
      console.error("Failed to load documents:", error);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadForm({ ...uploadForm, file });
  };

  const handleUploadSubmit = async () => {
    if (!uploadForm.file || !uploadForm.entityId || !uploadForm.documentType) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const document = await companySecretarialService.uploadDocument(
        uploadForm.file,
        uploadForm.entityId,
        uploadForm.documentType
      );

      setUploadProgress(100);
      setDocuments(prev => [...prev, document]);
      setUploadForm({ entityId: "", documentType: "", file: null });
      
      // Auto-trigger AI analysis
      setTimeout(() => {
        handleAIAnalysis(document);
      }, 1000);

    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 2000);
    }
  };

  const handleAIAnalysis = async (document: ConstitutionalDocument) => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setSelectedDocument(document);

    try {
      // Simulate analysis progress
      const progressInterval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 15;
        });
      }, 300);

      const clauses = await companySecretarialAIService.analyzeDocument(document);
      
      setAnalysisProgress(100);
      setExtractedClauses(clauses);
      
      // Update document status
      setDocuments(prev => 
        prev.map(doc => 
          doc.id === document.id 
            ? { ...doc, aiAnalysisComplete: true, extractedClauses: clauses }
            : doc
        )
      );

    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
      setTimeout(() => setAnalysisProgress(0), 2000);
    }
  };

  const handleDocumentQuery = async () => {
    if (!selectedDocument || !queryText.trim()) return;

    setIsQuerying(true);

    try {
      const queryResult = await companySecretarialAIService.queryDocument(
        selectedDocument.id,
        queryText
      );

      setDocumentQueries(prev => [queryResult, ...prev]);
      setQueryText("");

    } catch (error) {
      console.error("Query failed:", error);
    } finally {
      setIsQuerying(false);
    }
  };

  const getDocumentTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'articles_of_association': 'Articles of Association',
      'memorandum': 'Memorandum of Association',
      'shareholders_agreement': 'Shareholders Agreement',
      'bylaws': 'Bylaws',
      'charter': 'Charter',
      'other': 'Other'
    };
    return labels[type] || type;
  };

  const getClauseTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'notice_period_board': 'Board Meeting Notice',
      'notice_period_shareholder': 'Shareholder Meeting Notice',
      'quorum_board': 'Board Quorum',
      'quorum_shareholder': 'Shareholder Quorum',
      'voting_threshold': 'Voting Threshold',
      'director_appointment': 'Director Appointment',
      'share_transfer': 'Share Transfer',
      'dividend_policy': 'Dividend Policy',
      'other': 'Other'
    };
    return labels[type] || type;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Constitutional Documents</h2>
          <p className="text-muted-foreground">
            Manage constitutional documents with AI-powered clause extraction and querying
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Constitutional Document</DialogTitle>
              <DialogDescription>
                Upload a constitutional document for AI analysis and clause extraction
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="entity">Entity</Label>
                <Select value={uploadForm.entityId} onValueChange={(value) => setUploadForm({ ...uploadForm, entityId: value })}>
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
              <div className="space-y-2">
                <Label htmlFor="type">Document Type</Label>
                <Select value={uploadForm.documentType} onValueChange={(value) => setUploadForm({ ...uploadForm, documentType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="articles_of_association">Articles of Association</SelectItem>
                    <SelectItem value="memorandum">Memorandum of Association</SelectItem>
                    <SelectItem value="shareholders_agreement">Shareholders Agreement</SelectItem>
                    <SelectItem value="bylaws">Bylaws</SelectItem>
                    <SelectItem value="charter">Charter</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="file">Document File</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                />
              </div>
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Uploading document...</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}
              <Button 
                onClick={handleUploadSubmit} 
                disabled={!uploadForm.file || !uploadForm.entityId || !uploadForm.documentType || isUploading}
                className="w-full"
              >
                {isUploading ? "Uploading..." : "Upload & Analyze"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((document) => (
          <Card key={document.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-sm">{document.title}</CardTitle>
                    <CardDescription className="text-xs">
                      {getDocumentTypeLabel(document.type)}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {document.aiAnalysisComplete ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Clock className="h-4 w-4 text-orange-600" />
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Version {document.version}</span>
                  <Badge variant={document.status === 'active' ? 'default' : 'secondary'}>
                    {document.status}
                  </Badge>
                </div>
                
                {document.aiAnalysisComplete && (
                  <div className="text-xs text-muted-foreground">
                    <span className="text-green-600">✓</span> {document.extractedClauses.length} clauses extracted
                  </div>
                )}

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setSelectedDocument(document)}
                    className="flex-1"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  {!document.aiAnalysisComplete && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleAIAnalysis(document)}
                      disabled={isAnalyzing}
                    >
                      <Brain className="h-3 w-3 mr-1" />
                      Analyze
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Document Detail Modal */}
      {selectedDocument && (
        <Dialog open={!!selectedDocument} onOpenChange={() => setSelectedDocument(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {selectedDocument.title}
              </DialogTitle>
              <DialogDescription>
                {getDocumentTypeLabel(selectedDocument.type)} • Version {selectedDocument.version}
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="clauses" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="clauses">Extracted Clauses</TabsTrigger>
                <TabsTrigger value="query">AI Query</TabsTrigger>
                <TabsTrigger value="details">Document Details</TabsTrigger>
              </TabsList>

              <TabsContent value="clauses" className="space-y-4">
                {isAnalyzing && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 animate-pulse text-primary" />
                      <span className="text-sm">AI is analyzing the document...</span>
                    </div>
                    <Progress value={analysisProgress} className="w-full" />
                  </div>
                )}

                {extractedClauses.length > 0 ? (
                  <div className="space-y-4">
                    {extractedClauses.map((clause) => (
                      <Card key={clause.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-sm">{clause.title}</CardTitle>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{getClauseTypeLabel(clause.type)}</Badge>
                              <Badge variant="secondary">
                                {Math.round(clause.confidence * 100)}% confidence
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-2">{clause.content}</p>
                          {clause.pageNumber && (
                            <p className="text-xs text-muted-foreground">Page {clause.pageNumber}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : selectedDocument.aiAnalysisComplete ? (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">No clauses extracted from this document</p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Brain className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4">This document hasn't been analyzed yet</p>
                    <Button onClick={() => handleAIAnalysis(selectedDocument)}>
                      <Brain className="h-4 w-4 mr-2" />
                      Start AI Analysis
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="query" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Ask a question about this document (e.g., 'What is the notice period for board meetings?')"
                      value={queryText}
                      onChange={(e) => setQueryText(e.target.value)}
                      className="flex-1"
                      rows={2}
                    />
                    <Button 
                      onClick={handleDocumentQuery}
                      disabled={!queryText.trim() || isQuerying}
                    >
                      {isQuerying ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <MessageSquare className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  {documentQueries.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="font-medium">Query History</h4>
                      {documentQueries.map((query) => (
                        <Card key={query.id}>
                          <CardContent className="pt-4">
                            <div className="space-y-2">
                              <div className="flex items-start gap-2">
                                <MessageSquare className="h-4 w-4 mt-1 text-primary" />
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{query.query}</p>
                                  <p className="text-sm text-muted-foreground mt-1">{query.response}</p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Badge variant="outline">
                                      {Math.round(query.confidence * 100)}% confidence
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">
                                      {query.timestamp.toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">File Name</Label>
                    <p className="text-sm text-muted-foreground">{selectedDocument.fileName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Document Type</Label>
                    <p className="text-sm text-muted-foreground">{getDocumentTypeLabel(selectedDocument.type)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Upload Date</Label>
                    <p className="text-sm text-muted-foreground">{selectedDocument.uploadDate.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Version</Label>
                    <p className="text-sm text-muted-foreground">{selectedDocument.version}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Status</Label>
                    <Badge variant={selectedDocument.status === 'active' ? 'default' : 'secondary'}>
                      {selectedDocument.status}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">AI Analysis</Label>
                    <div className="flex items-center gap-2">
                      {selectedDocument.aiAnalysisComplete ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-600">Complete</span>
                        </>
                      ) : (
                        <>
                          <Clock className="h-4 w-4 text-orange-600" />
                          <span className="text-sm text-orange-600">Pending</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
} 