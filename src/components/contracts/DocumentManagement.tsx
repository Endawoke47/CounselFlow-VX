import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Upload, Link, FileText, Download, Trash2, Plus } from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: "upload" | "link";
  url?: string;
  file?: File;
  uploadedAt: string;
  size?: string;
}

interface DocumentManagementProps {
  contractId: number;
  documents?: Document[];
  onDocumentsUpdate?: (documents: Document[]) => void;
  readonly?: boolean;
}

export function DocumentManagement({ contractId, documents = [], onDocumentsUpdate, readonly = false }: DocumentManagementProps) {
  const [localDocuments, setLocalDocuments] = useState<Document[]>(documents);
  const [showAddModal, setShowAddModal] = useState(false);
  const [documentType, setDocumentType] = useState<"upload" | "link">("upload");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkName, setLinkName] = useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newDocuments: Document[] = [];
    Array.from(files).forEach(file => {
      const document: Document = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: "upload",
        file: file,
        uploadedAt: new Date().toISOString(),
        size: formatFileSize(file.size)
      };
      newDocuments.push(document);
    });

    const updatedDocuments = [...localDocuments, ...newDocuments];
    setLocalDocuments(updatedDocuments);
    onDocumentsUpdate?.(updatedDocuments);
  };

  const handleAddLink = () => {
    if (!linkUrl || !linkName) return;

    const document: Document = {
      id: Math.random().toString(36).substr(2, 9),
      name: linkName,
      type: "link",
      url: linkUrl,
      uploadedAt: new Date().toISOString()
    };

    const updatedDocuments = [...localDocuments, document];
    setLocalDocuments(updatedDocuments);
    onDocumentsUpdate?.(updatedDocuments);
    
    setLinkUrl("");
    setLinkName("");
    setShowAddModal(false);
  };

  const handleRemoveDocument = (documentId: string) => {
    const updatedDocuments = localDocuments.filter(doc => doc.id !== documentId);
    setLocalDocuments(updatedDocuments);
    onDocumentsUpdate?.(updatedDocuments);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDownload = (document: Document) => {
    if (document.type === "link" && document.url) {
      window.open(document.url, '_blank');
    } else if (document.type === "upload" && document.file) {
      const url = URL.createObjectURL(document.file);
      const a = window.document.createElement('a');
      a.href = url;
      a.download = document.name;
      window.document.body.appendChild(a);
      a.click();
      window.document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Contract Documents ({localDocuments.length})
        </CardTitle>
        {!readonly && (
          <div className="flex gap-2">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id={`file-upload-${contractId}`}
              accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
            />
            <label htmlFor={`file-upload-${contractId}`}>
              <Button variant="outline" size="sm" asChild>
                <span className="cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Files
                </span>
              </Button>
            </label>
            <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Link className="h-4 w-4 mr-2" />
                  Add Link
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Document Link</DialogTitle>
                  <DialogDescription>
                    Add a link to an external document or file storage location
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="link-name">Document Name</Label>
                    <Input
                      id="link-name"
                      value={linkName}
                      onChange={(e) => setLinkName(e.target.value)}
                      placeholder="e.g., Original Contract v2.1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="link-url">Document URL</Label>
                    <Input
                      id="link-url"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      placeholder="https://..."
                      type="url"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowAddModal(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddLink} disabled={!linkUrl || !linkName}>
                      Add Link
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {localDocuments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No documents uploaded yet</p>
            {!readonly && (
              <p className="text-sm">Upload files or add links to get started</p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {localDocuments.map((document) => (
              <div key={document.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  {document.type === "upload" ? (
                    <FileText className="h-5 w-5 text-blue-500" />
                  ) : (
                    <Link className="h-5 w-5 text-green-500" />
                  )}
                  <div>
                    <p className="font-medium">{document.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        {document.type === "upload" ? "File" : "Link"}
                      </Badge>
                      {document.size && <span>{document.size}</span>}
                      <span>Added {new Date(document.uploadedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDownload(document)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  {!readonly && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoveDocument(document.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
