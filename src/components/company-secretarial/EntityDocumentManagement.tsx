import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Upload, 
  FileText, 
  Search, 
  Brain, 
  CheckCircle, 
  Clock,
  Download,
  Eye,
  Trash2
} from "lucide-react";
import { ConstitutionalDocument, ExtractedClause, DocumentQuery } from "@/types/company-secretarial";
import { CompanySecretarialAIService } from "@/services/companySecretarialAIService";

interface EntityDocumentManagementProps {
  entityId: string;
  entityName: string;
}

export function EntityDocumentManagement({ entityId, entityName }: EntityDocumentManagementProps) {
  const [documents, setDocuments] = useState<ConstitutionalDocument[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<ConstitutionalDocument | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [query, setQuery] = useState("");
  const [queryResult, setQueryResult] = useState<DocumentQuery | null>(null);
  const [isQuerying, setIsQuerying] = useState(false);
  const [queryHistory, setQueryHistory] = useState<DocumentQuery[]>([]);

  const aiService = CompanySecretarialAIService.getInstance();

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    const newDocument: ConstitutionalDocument = {
      id: `doc-${Date.now()}`,
      entityId,
      type: 'articles_of_association',
      title: file.name,
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
      uploadDate: new Date(),
      lastModified: new Date(),
      version: '1.0',
      status: 'active',
      extractedClauses: [],
      aiAnalysisComplete: false
    };

    setTimeout(async () => {
      setIsUploading(false);
      setUploadProgress(0);
      setDocuments(prev => [...prev, newDocument]);
      await handleAnalyzeDocument(newDocument);
    }, 2000);
  }, [entityId]);

  const handleAnalyzeDocument = async (document: ConstitutionalDocument) => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setSelectedDocument(document);

    const analysisInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(analysisInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    try {
      const extractedClauses = await aiService.analyzeDocument(document);
      
      setDocuments(prev => prev.map(doc => 
        doc.id === document.id 
          ? { ...doc, extractedClauses, aiAnalysisComplete: true }
          : doc
      ));

      setSelectedDocument(prev => prev ? { ...prev, extractedClauses, aiAnalysisComplete: true } : null);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
      setAnalysisProgress(0);
    }
  };

  const handleQuery = async () => {
    if (!query.trim() || !selectedDocument) return;

    setIsQuerying(true);
    try {
      const result = await aiService.queryDocument(selectedDocument.id, query);
      setQueryResult(result);
      setQueryHistory(prev => [result, ...prev.slice(0, 4)]);
      setQuery("");
    } catch (error) {
      console.error('Query failed:', error);
    } finally {
      setIsQuerying(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Constitutional Documents</h3>
          <p className="text-sm text-muted-foreground">
            Manage constitutional documents for {entityName}
          </p>
        </div>
        <div className="flex gap-2">
          <Label htmlFor="document-upload" className="cursor-pointer">
            <Button asChild disabled={isUploading}>
              <span>
                <Upload className="h-4 w-4 mr-2" />
                {isUploading ? 'Uploading...' : 'Upload Document'}
              </span>
            </Button>
          </Label>
          <Input
            id="document-upload"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>

      {isUploading && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Uploading document...</span>
                <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Documents ({documents.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {documents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No documents uploaded yet</p>
                <p className="text-sm">Upload constitutional documents to get started</p>
              </div>
            ) : (
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className={`p-3 border rounded cursor-pointer transition-colors ${
                      selectedDocument?.id === doc.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedDocument(doc)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{doc.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          Uploaded {doc.uploadDate.toLocaleDateString()}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {doc.type.replace('_', ' ').toUpperCase()}
                          </Badge>
                          {doc.aiAnalysisComplete ? (
                            <Badge variant="secondary" className="text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Analyzed
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              Pending
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Analysis & Query
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!selectedDocument ? (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a document to view details</p>
              </div>
            ) : (
              <Tabs defaultValue="analysis" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="analysis">Analysis</TabsTrigger>
                  <TabsTrigger value="query">AI Query</TabsTrigger>
                </TabsList>

                <TabsContent value="analysis" className="space-y-4">
                  {isAnalyzing && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Analyzing document...</span>
                        <span className="text-sm text-muted-foreground">{analysisProgress}%</span>
                      </div>
                      <Progress value={analysisProgress} />
                    </div>
                  )}

                  {selectedDocument.aiAnalysisComplete ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">Analysis Complete</span>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-medium">Extracted Clauses ({selectedDocument.extractedClauses.length})</h4>
                        {selectedDocument.extractedClauses.map((clause) => (
                          <div key={clause.id} className="p-3 border rounded">
                            <div className="flex items-start justify-between mb-2">
                              <h5 className="font-medium text-sm">{clause.title}</h5>
                              <Badge variant="outline" className="text-xs">
                                {Math.round(clause.confidence * 100)}% confidence
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{clause.content}</p>
                            {clause.pageNumber && (
                              <p className="text-xs text-muted-foreground">Page {clause.pageNumber}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <Button 
                        onClick={() => handleAnalyzeDocument(selectedDocument)}
                        disabled={isAnalyzing}
                      >
                        <Brain className="h-4 w-4 mr-2" />
                        Start AI Analysis
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="query" className="space-y-4">
                  <div className="space-y-3">
                    <Label htmlFor="query-input">Ask about this document</Label>
                    <div className="flex gap-2">
                      <Textarea
                        id="query-input"
                        placeholder="e.g., What is the notice period for board meetings?"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="min-h-[80px]"
                      />
                    </div>
                    <Button 
                      onClick={handleQuery} 
                      disabled={!query.trim() || isQuerying}
                      className="w-full"
                    >
                      <Search className="h-4 w-4 mr-2" />
                      {isQuerying ? 'Searching...' : 'Query Document'}
                    </Button>
                  </div>

                  {queryResult && (
                    <div className="p-4 border rounded bg-muted/50">
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-medium text-sm">AI Response</h5>
                        <Badge variant="outline" className="text-xs">
                          {Math.round(queryResult.confidence * 100)}% confidence
                        </Badge>
                      </div>
                      <p className="text-sm">{queryResult.response}</p>
                    </div>
                  )}

                  {queryHistory.length > 0 && (
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Recent Queries</h5>
                      {queryHistory.map((historyItem) => (
                        <div key={historyItem.id} className="p-2 border rounded text-xs">
                          <p className="font-medium">{historyItem.query}</p>
                          <p className="text-muted-foreground mt-1">{historyItem.response}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
