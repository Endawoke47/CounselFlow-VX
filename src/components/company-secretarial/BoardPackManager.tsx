import { useEffect, useState } from "react";
import { useBoardPacks } from '@/hooks/useBoardPacks';
import { useBoardMeetings } from '@/hooks/useBoardMeetings';
import type { Database } from '@/types/database';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  Send, 
  Download, 
  Eye, 
  Edit,
  Loader2,
  CheckCircle,
  Clock,
  AlertCircle,
  PenTool,
  Package,
  Users,
  Mail
} from "lucide-react";

export function BoardPackManager() {
  const { boardPacks, loading: packsLoading, error: packsError } = useBoardPacks();
  const { boardMeetings, loading: meetingsLoading, error: meetingsError } = useBoardMeetings();
  const [selectedPack, setSelectedPack] = useState<Database['public']['Tables']['board_packs']['Row'] | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [createPackForm, setCreatePackForm] = useState<Database['public']['Tables']['board_packs']['Insert']>({
    meetingId: '',
    title: '',
    files: [],
    status: 'draft',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // No need to fetch, hooks handle the data
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []).map(file => file.name);
    setCreatePackForm(prev => ({
      ...prev,
      files: [...prev.files, ...files]
    }));
  };

  const removeFile = (index: number) => {
    setCreatePackForm(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const handleCreateBoardPack = async () => {
    if (!createPackForm.meetingId || createPackForm.files.length === 0) return;

    setIsCreating(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 15;
        });
      }, 300);

      // Mock board pack creation
      const boardPack = {
        id: Math.random().toString(36).substr(2, 9),
        meetingId: createPackForm.meetingId,
        title: createPackForm.title,
        files: createPackForm.files,
        status: 'draft',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setUploadProgress(100);
      setCreatePackForm({ meetingId: "", title: "", files: [], status: 'draft' });

    } catch (error) {
      console.error("Board pack creation failed:", error);
    } finally {
      setIsCreating(false);
      setTimeout(() => setUploadProgress(0), 2000);
    }
  };

  const handleSendForSignature = async (packId: string) => {
    setIsSending(true);

    try {
      // Mock sending for signature
      const result = {
        workflowId: Math.random().toString(36).substr(2, 9),
      };

    } catch (error) {
      console.error("Failed to send board pack:", error);
    } finally {
      setIsSending(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'secondary';
      case 'sent':
        return 'default';
      case 'completed':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getMeetingTitle = (meetingId: string) => {
    const meeting = boardMeetings.find(m => m.id === meetingId);
    return meeting ? meeting.title : 'Unknown Meeting';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Board Pack Manager</h2>
          <p className="text-muted-foreground">
            Create and manage board packs with e-signature workflows
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Package className="h-4 w-4 mr-2" />
              Create Board Pack
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Board Pack</DialogTitle>
              <DialogDescription>
                Upload documents and create a board pack for meeting distribution
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meeting">Meeting</Label>
                <select
                  id="meeting"
                  value={createPackForm.meetingId}
                  onChange={(e) => setCreatePackForm({ ...createPackForm, meetingId: e.target.value })}
                  className="w-full p-2 border border-input rounded-md"
                >
                  <option value="">Select a meeting</option>
                  {boardMeetings.map(meeting => (
                    <option key={meeting.id} value={meeting.id}>
                      {meeting.title} - {new Date(meeting.date).toLocaleDateString()}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">Board Pack Title</Label>
                <Input
                  id="title"
                  value={createPackForm.title}
                  onChange={(e) => setCreatePackForm({ ...createPackForm, title: e.target.value })}
                  placeholder="e.g., Q4 2024 Board Meeting Pack"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="files">Documents</Label>
                <Input
                  id="files"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                  onChange={handleFileUpload}
                />
                {createPackForm.files.length > 0 && (
                  <div className="space-y-2 mt-2">
                    <Label className="text-sm">Selected Files:</Label>
                    {createPackForm.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span className="text-sm">{file}</span>
                          <Badge variant="outline" className="text-xs">
                            {/* {(file.size / 1024 / 1024).toFixed(1)} MB */}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {isCreating && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Creating board pack...</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}

              <Button 
                onClick={handleCreateBoardPack}
                disabled={!createPackForm.meetingId || createPackForm.files.length === 0 || isCreating}
                className="w-full"
              >
                {isCreating ? "Creating..." : "Create Board Pack"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Board Packs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packsLoading ? (
          <div className="p-6">Loading board packs...</div>
        ) : packsError ? (
          <div className="p-6 text-red-600">{packsError}</div>
        ) : (
          boardPacks.map((pack) => (
            <Card key={pack.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{pack.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {getMeetingTitle(pack.meetingId)}
                    </CardDescription>
                  </div>
                  <Badge variant={getStatusColor(pack.status)}>
                    {pack.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span>Documents:</span>
                      <span>{pack.files.length}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => setSelectedPack(pack)}
                      className="flex-1"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    {pack.status === 'draft' && (
                      <Button 
                        size="sm" 
                        onClick={() => handleSendForSignature(pack.id)}
                        disabled={isSending}
                      >
                        <Send className="h-3 w-3 mr-1" />
                        Send
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Board Pack Detail Modal */}
      {selectedPack && (
        <Dialog open={!!selectedPack} onOpenChange={() => setSelectedPack(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                {selectedPack.title}
              </DialogTitle>
              <DialogDescription>
                {getMeetingTitle(selectedPack.meetingId)} • {selectedPack.files.length} documents
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="documents" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="signatures">Signatures</TabsTrigger>
                <TabsTrigger value="workflow">Workflow</TabsTrigger>
              </TabsList>

              <TabsContent value="documents" className="space-y-4">
                <div className="space-y-3">
                  {selectedPack.files.map((file, idx) => (
                    <div key={idx} className="truncate text-xs">{file}</div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="signatures" className="space-y-4">
                <div className="space-y-4">
                </div>
              </TabsContent>

              <TabsContent value="workflow" className="space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Status</Label>
                      <Badge variant={getStatusColor(selectedPack.status)} className="mt-1">
                        {selectedPack.status}
                      </Badge>
                    </div>
                  </div>

                  {selectedPack.status === 'sent' && (
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">E-Signature Workflow</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">Board pack sent to directors</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-orange-600" />
                            <span className="text-sm">Awaiting signatures</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">2 of 3 directors have accessed the pack</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Pack
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
              {selectedPack.status === 'draft' && (
                <Button size="sm" onClick={() => handleSendForSignature(selectedPack.id)}>
                  <Send className="h-4 w-4 mr-2" />
                  Send for Signature
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}