
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload, Search, Filter, ArrowLeft, Download, Eye, MessageSquare, Brain } from "lucide-react";

interface Project {
  id: string;
  name: string;
  sector: string;
  dealSize: string;
  totalDocuments: number;
  categorizedDocuments: Record<string, number>;
  lastUpload: string;
  totalSize: string;
}

interface ProjectDocumentViewerProps {
  project: Project;
  onBack: () => void;
}

const mockDocuments = [
  {
    id: "1",
    name: "Shareholders Agreement",
    category: "Legal & Compliance",
    type: "PDF",
    size: "2.5 MB",
    uploadDate: "2024-01-15",
    uploadedBy: "Sarah Johnson",
    status: "Reviewed",
    aiRisks: 3,
    lastModified: "2024-01-16",
    reviewer: "Sarah Johnson",
    version: "v2.1"
  },
  {
    id: "2",
    name: "IP License Agreements",
    category: "IP & Technology",
    type: "PDF", 
    size: "1.8 MB",
    uploadDate: "2024-01-16",
    uploadedBy: "Michael Chen",
    status: "Under Review",
    aiRisks: 5,
    lastModified: "2024-01-17",
    reviewer: "Michael Chen",
    version: "v1.0"
  },
  {
    id: "3",
    name: "Employment Contracts",
    category: "Employment",
    type: "DOCX",
    size: "4.2 MB",
    uploadDate: "2024-01-17", 
    uploadedBy: "Emily Rodriguez",
    status: "Pending Review",
    aiRisks: 1,
    lastModified: "2024-01-17",
    reviewer: "Emily Rodriguez",
    version: "v1.0"
  },
  {
    id: "4",
    name: "Financial Statements Q3",
    category: "Financial",
    type: "XLSX",
    size: "3.1 MB",
    uploadDate: "2024-01-18",
    uploadedBy: "David Kim", 
    status: "Reviewed",
    aiRisks: 2,
    lastModified: "2024-01-19",
    reviewer: "David Kim",
    version: "v1.2"
  },
  {
    id: "5",
    name: "Commercial Agreements",
    category: "Commercial",
    type: "PDF",
    size: "5.7 MB",
    uploadDate: "2024-01-19",
    uploadedBy: "Sarah Johnson",
    status: "Under Review", 
    aiRisks: 4,
    lastModified: "2024-01-20",
    reviewer: "Sarah Johnson",
    version: "v1.0"
  }
];

export function ProjectDocumentViewer({ project, onBack }: ProjectDocumentViewerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeView, setActiveView] = useState("list");

  const getStatusColor = (status: string) => {
    const colors = {
      "Reviewed": "bg-green-100 text-green-800",
      "Under Review": "bg-yellow-100 text-yellow-800", 
      "Pending Review": "bg-gray-100 text-gray-800"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getRiskColor = (riskCount: number) => {
    if (riskCount >= 4) return "text-red-600";
    if (riskCount >= 2) return "text-yellow-600";
    return "text-green-600";
  };

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || doc.category === filterCategory;
    const matchesStatus = filterStatus === "all" || doc.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = Object.keys(project.categorizedDocuments);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Button>
        <div>
          <h2 className="text-2xl font-bold">{project.name} - Documents</h2>
          <p className="text-muted-foreground">
            {project.sector} • {project.dealSize} • {project.totalDocuments} documents
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.totalDocuments}</div>
            <p className="text-xs text-muted-foreground">In repository</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.totalSize}</div>
            <p className="text-xs text-muted-foreground">Total size</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Risks</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockDocuments.reduce((sum, doc) => sum + doc.aiRisks, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Flagged issues</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Upload</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.lastUpload}</div>
            <p className="text-xs text-muted-foreground">Recent activity</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Document Repository
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Bulk Download
              </Button>
            </div>
          </CardTitle>
          <CardDescription>
            Manage all documents for {project.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Reviewed">Reviewed</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Pending Review">Pending Review</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Tabs value={activeView} onValueChange={setActiveView}>
              <TabsList>
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="category">By Category</TabsTrigger>
              </TabsList>

              <TabsContent value="list" className="space-y-4">
                {filteredDocuments.map((doc) => (
                  <div key={doc.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <h4 className="font-semibold">{doc.name}</h4>
                          <Badge variant="outline">{doc.type}</Badge>
                          <Badge className={getStatusColor(doc.status)}>
                            {doc.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                          <div className="space-y-1">
                            <div>Category: {doc.category}</div>
                            <div>Size: {doc.size}</div>
                            <div>Version: {doc.version}</div>
                          </div>
                          <div className="space-y-1">
                            <div>Uploaded: {doc.uploadDate}</div>
                            <div>Uploaded by: {doc.uploadedBy}</div>
                            <div>Reviewer: {doc.reviewer}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Brain className="h-4 w-4 text-blue-600" />
                          <span className={`text-sm ${getRiskColor(doc.aiRisks)}`}>
                            {doc.aiRisks} AI-flagged risks
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Comment
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="category" className="space-y-4">
                {categories.map(category => {
                  const categoryDocs = filteredDocuments.filter(doc => doc.category === category);
                  if (categoryDocs.length === 0) return null;
                  
                  return (
                    <Card key={category}>
                      <CardHeader>
                        <CardTitle className="text-lg">{category}</CardTitle>
                        <CardDescription>
                          {categoryDocs.length} documents in this category
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {categoryDocs.map((doc) => (
                            <div key={doc.id} className="flex items-center justify-between p-3 border rounded">
                              <div className="flex items-center gap-3">
                                <FileText className="h-4 w-4 text-blue-600" />
                                <div>
                                  <div className="font-medium">{doc.name}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {doc.size} • {doc.uploadDate} • {doc.uploadedBy}
                                  </div>
                                </div>
                                <Badge className={getStatusColor(doc.status)}>
                                  {doc.status}
                                </Badge>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
