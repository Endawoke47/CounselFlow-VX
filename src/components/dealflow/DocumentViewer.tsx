
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Upload, Search, Filter, ChevronRight, FolderOpen } from "lucide-react";
import { ProjectDocumentViewer } from "./ProjectDocumentViewer";

const mockProjects = [
  {
    id: "1",
    name: "TechCorp Acquisition",
    sector: "Technology",
    dealSize: "$50M",
    totalDocuments: 18,
    categorizedDocuments: {
      "Legal & Compliance": 6,
      "Financial": 4,
      "IP & Technology": 3,
      "Employment": 2,
      "Commercial": 3
    },
    lastUpload: "2 hours ago",
    totalSize: "45.2 MB"
  },
  {
    id: "2",
    name: "Healthcare Holdings",
    sector: "Healthcare",
    dealSize: "$125M", 
    totalDocuments: 22,
    categorizedDocuments: {
      "Legal & Compliance": 8,
      "Financial": 5,
      "IP & Technology": 4,
      "Employment": 3,
      "Commercial": 2
    },
    lastUpload: "1 day ago",
    totalSize: "67.8 MB"
  },
  {
    id: "3",
    name: "Manufacturing Co",
    sector: "Manufacturing",
    dealSize: "$80M",
    totalDocuments: 24,
    categorizedDocuments: {
      "Legal & Compliance": 7,
      "Financial": 6,
      "IP & Technology": 5,
      "Employment": 3,
      "Commercial": 3
    },
    lastUpload: "30 minutes ago", 
    totalSize: "52.1 MB"
  }
];

export function DocumentViewer() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSector, setFilterSector] = useState("all");

  if (selectedProject) {
    const project = mockProjects.find(p => p.id === selectedProject);
    if (project) {
      return (
        <ProjectDocumentViewer 
          project={project} 
          onBack={() => setSelectedProject(null)} 
        />
      );
    }
  }

  const totalDocuments = mockProjects.reduce((sum, project) => sum + project.totalDocuments, 0);
  const totalSize = mockProjects.reduce((sum, project) => {
    const sizeNumber = parseFloat(project.totalSize.split(' ')[0]);
    return sum + sizeNumber;
  }, 0);

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = filterSector === "all" || project.sector.toLowerCase() === filterSector.toLowerCase();
    return matchesSearch && matchesSector;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Document Management</h2>
          <p className="text-muted-foreground">
            Manage documents across all due diligence projects
          </p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Documents
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDocuments}</div>
            <p className="text-xs text-muted-foreground">Across all projects</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockProjects.length}</div>
            <p className="text-xs text-muted-foreground">With documents</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSize.toFixed(1)} MB</div>
            <p className="text-xs text-muted-foreground">Total storage</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Document Search & Filters</CardTitle>
          <CardDescription>
            Search across all project documents or filter by project criteria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterSector} onValueChange={setFilterSector}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sectors</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Document Repositories</CardTitle>
          <CardDescription>
            Click on any project to view and manage its document repository
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                onClick={() => setSelectedProject(project.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <FolderOpen className="h-5 w-5 text-blue-600" />
                      <h4 className="font-semibold">{project.name}</h4>
                      <Badge variant="outline">{project.sector}</Badge>
                      <Badge variant="secondary">{project.dealSize}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium mb-2">Document Categories</div>
                        <div className="space-y-1">
                          {Object.entries(project.categorizedDocuments).map(([category, count]) => (
                            <div key={category} className="flex justify-between text-sm">
                              <span className="text-muted-foreground">{category}</span>
                              <span>{count} docs</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Total Documents:</span>
                          <span className="font-medium">{project.totalDocuments}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Storage Used:</span>
                          <span className="font-medium">{project.totalSize}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Last Upload:</span>
                          <span className="text-muted-foreground">{project.lastUpload}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
