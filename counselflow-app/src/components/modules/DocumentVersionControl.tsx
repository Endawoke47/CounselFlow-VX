'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Textarea,
  Badge,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { useToast } from '../../hooks/use-toast';
import { useWebSocket } from '@/hooks/useWebSocket';
import {
  GitBranch,
  Clock,
  MessageCircle,
  Lock,
  FileText,
  GitCommit,
  Save,
  Plus,
  AlertCircle,
} from 'lucide-react';

interface DocumentVersion {
  id: string;
  document_id: string;
  version_number: number;
  title: string;
  content: string;
  content_hash: string;
  author_id: string;
  change_summary?: string;
  change_type: 'major' | 'minor' | 'patch';
  review_status: 'draft' | 'pending' | 'approved' | 'rejected';
  created_at: string;
  published_at?: string;
}

interface Comment {
  id: string;
  version_id: string;
  author_id: string;
  content: string;
  comment_type: 'general' | 'suggestion' | 'correction';
  status: 'active' | 'resolved' | 'dismissed';
  selection_start?: number;
  selection_end?: number;
  created_at: string;
  updated_at?: string;
}

interface DocumentLock {
  id: string;
  document_id: string;
  user_id: string;
  lock_type: 'exclusive' | 'shared' | 'section';
  acquired_at: string;
  expires_at: string;
  is_active: boolean;
}


interface DocumentVersionControlProps {
  documentId?: string;
  currentUser?: {
    id: string;
    name: string;
  };
}

export default function DocumentVersionControl({ documentId: propDocumentId, currentUser }: DocumentVersionControlProps) {
  const [selectedDocumentId, setSelectedDocumentId] = useState<string>('');
  const [availableDocuments, setAvailableDocuments] = useState<Array<{ id: string; title: string }>>([]);
  
  // Use the prop documentId if provided, otherwise use selected document
  const documentId = propDocumentId || selectedDocumentId;

  const [versions, setVersions] = useState<DocumentVersion[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [locks, setLocks] = useState<DocumentLock[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<DocumentVersion | null>(null);
  const [isCreatingVersion, setIsCreatingVersion] = useState(false);
  const [isCreatingComment, setIsCreatingComment] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [newVersionForm, setNewVersionForm] = useState({
    title: '',
    content: '',
    change_summary: '',
    change_type: 'minor' as 'major' | 'minor' | 'patch',
  });

  const [newCommentForm, setNewCommentForm] = useState({
    content: '',
    comment_type: 'general' as 'general' | 'suggestion' | 'correction',
    selection_start: undefined as number | undefined,
    selection_end: undefined as number | undefined,
  });

  const { toast } = useToast();

  // Fetch available documents if no documentId is provided
  const fetchDocuments = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/v1/documents', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch documents');
      }

      const data = await response.json();
      setAvailableDocuments(data);
      
      // Select first document if none selected
      if (data.length > 0 && !selectedDocumentId) {
        setSelectedDocumentId(data[0].id);
      }
    } catch (error: unknown) {
      console.error('Failed to fetch documents:', error);
      toast({
        title: 'Error',
        description: 'Failed to load documents',
        variant: 'destructive',
      });
    }
  }, [selectedDocumentId, toast]);

  // WebSocket connection - only if we have a documentId
  const { sendMessage } = useWebSocket(
    documentId ? `${process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000'}/ws/documents/${documentId}` : '',
    {
      onMessage: (message) => {
        switch (message.type) {
          case 'version_created':
            if (message.data.document_id === documentId) {
              fetchVersions();
            }
            break;
          case 'comment_added':
            if (message.data.document_id === documentId && selectedVersion) {
              fetchComments(selectedVersion.id);
            }
            break;
          case 'lock_acquired':
          case 'lock_released':
            if (message.data.document_id === documentId) {
              setLocks(prev => prev.map(lock => 
                lock.id === message.data.lock_id ? { ...lock, ...message.data } : lock
              ));
            }
            break;
        }
      },
      onConnect: () => {
        console.log('Connected to document collaboration WebSocket');
        // Send message to join document room
        sendMessage({
          type: 'join_document',
          data: { document_id: documentId }
        });
      },
      onDisconnect: () => {
        console.log('Disconnected from document collaboration WebSocket');
      }
    }
  );

  // API calls
  const fetchVersions = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/v1/documents/${documentId}/versions`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch versions');
      }

      const data = await response.json();
      setVersions(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
      toast({
        title: 'Error',
        description: 'Failed to fetch document versions',
        variant: 'destructive',
      });
    }
  }, [documentId, toast]);

  const fetchComments = useCallback(async (versionId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/v1/documents/${documentId}/versions/${versionId}/comments`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }

      const data = await response.json();
      setComments(data);
    } catch (error: unknown) {
      console.error('Failed to fetch comments:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch comments',
        variant: 'destructive',
      });
    }
  }, [documentId, toast]);

  const createVersion = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/v1/documents/${documentId}/versions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVersionForm),
      });

      if (!response.ok) {
        throw new Error('Failed to create version');
      }

      const newVersion = await response.json();
      setVersions(prev => [newVersion, ...prev]);
      setNewVersionForm({
        title: '',
        content: '',
        change_summary: '',
        change_type: 'minor',
      });
      setIsCreatingVersion(false);

      toast({
        title: 'Success',
        description: 'New version created successfully',
      });
    } catch (err: unknown) {
      console.error('Failed to create version:', err);
      toast({
        title: 'Error',
        description: 'Failed to create version',
        variant: 'destructive',
      });
    }
  };

  const createComment = async () => {
    if (!selectedVersion) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/v1/documents/${documentId}/versions/${selectedVersion.id}/comments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCommentForm),
      });

      if (!response.ok) {
        throw new Error('Failed to create comment');
      }

      const newComment = await response.json();
      setComments(prev => [newComment, ...prev]);
      setNewCommentForm({
        content: '',
        comment_type: 'general',
        selection_start: undefined,
        selection_end: undefined,
      });
      setIsCreatingComment(false);

      toast({
        title: 'Success',
        description: 'Comment added successfully',
      });
    } catch (err: unknown) {
      console.error('Failed to create comment:', err);
      toast({
        title: 'Error',
        description: 'Failed to create comment',
        variant: 'destructive',
      });
    }
  };

  const acquireLock = async (lockType: 'exclusive' | 'shared' | 'section') => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/v1/documents/${documentId}/locks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lock_type: lockType,
          duration_minutes: 30,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to acquire lock');
      }

      const newLock = await response.json();
      setLocks(prev => [newLock, ...prev]);

      toast({
        title: 'Success',
        description: `${lockType} lock acquired`,
      });
    } catch (err: unknown) {
      console.error('Failed to acquire lock:', err);
      toast({
        title: 'Error',
        description: 'Failed to acquire lock',
        variant: 'destructive',
      });
    }
  };

  // Initial data loading
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // If no documentId provided, fetch available documents
        if (!propDocumentId) {
          await fetchDocuments();
        } else {
          await fetchVersions();
        }
      } catch (error: unknown) {
        setError('Failed to load document data');
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchDocuments, fetchVersions, propDocumentId]);

  // Load versions when documentId changes
  useEffect(() => {
    if (documentId) {
      fetchVersions();
    }
  }, [documentId, fetchVersions]);

  // Load comments when version is selected
  useEffect(() => {
    if (selectedVersion) {
      fetchComments(selectedVersion.id);
    }
  }, [selectedVersion, fetchComments]);

  const getVersionBadgeColor = (reviewStatus: string) => {
    switch (reviewStatus) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getChangeTypeBadgeColor = (changeType: string) => {
    switch (changeType) {
      case 'major': return 'bg-red-100 text-red-800';
      case 'minor': return 'bg-blue-100 text-blue-800';
      case 'patch': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Loading document versions...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center text-red-600">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Document Selector - only show if no documentId provided as prop */}
      {!propDocumentId && (
        <Card>
          <CardHeader>
            <CardTitle>Select Document</CardTitle>
            <CardDescription>Choose a document to manage versions and collaborate</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedDocumentId} onValueChange={setSelectedDocumentId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a document..." />
              </SelectTrigger>
              <SelectContent>
                {availableDocuments.map((doc) => (
                  <SelectItem key={doc.id} value={doc.id}>
                    {doc.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}

      {/* Show message if no document selected */}
      {!documentId && (
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Select a document to begin version control and collaboration</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main version control interface - only show if document is selected */}
      {documentId && (
        <>
          {/* Header with actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <GitBranch className="h-5 w-5 mr-2" />
                Document Version Control
              </CardTitle>
              <CardDescription>
                Manage document versions, collaborate with team members, and track changes
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Dialog open={isCreatingVersion} onOpenChange={setIsCreatingVersion}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Version
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Version</DialogTitle>
                    <DialogDescription>
                      Create a new version of this document with your changes
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Title</label>
                      <Input
                        value={newVersionForm.title}
                        onChange={(e) => setNewVersionForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Version title..."
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Content</label>
                      <Textarea
                        value={newVersionForm.content}
                        onChange={(e) => setNewVersionForm(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Document content..."
                        rows={10}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Change Summary</label>
                      <Textarea
                        value={newVersionForm.change_summary}
                        onChange={(e) => setNewVersionForm(prev => ({ ...prev, change_summary: e.target.value }))}
                        placeholder="Describe the changes made in this version..."
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Change Type</label>
                      <Select
                        value={newVersionForm.change_type}                        onValueChange={(value: string) =>
                          setNewVersionForm(prev => ({ 
                            ...prev, 
                            change_type: value as 'major' | 'minor' | 'patch' 
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="major">Major</SelectItem>
                          <SelectItem value="minor">Minor</SelectItem>
                          <SelectItem value="patch">Patch</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsCreatingVersion(false)}>
                        Cancel
                      </Button>
                      <Button onClick={createVersion}>
                        <Save className="h-4 w-4 mr-2" />
                        Create Version
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="outline" onClick={() => acquireLock('exclusive')}>
                <Lock className="h-4 w-4 mr-2" />
                Lock Document
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Versions List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <GitCommit className="h-4 w-4 mr-2" />
              Versions ({versions.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {versions.map((version) => (
                <div
                  key={version.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedVersion?.id === version.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedVersion(version)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">v{version.version_number}</span>
                    <div className="flex space-x-1">
                      <Badge className={getVersionBadgeColor(version.review_status)}>
                        {version.review_status}
                      </Badge>
                      <Badge className={getChangeTypeBadgeColor(version.change_type)}>
                        {version.change_type}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{version.title}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {new Date(version.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Version Details and Content */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                {selectedVersion ? `Version ${selectedVersion.version_number}` : 'Select a Version'}
              </CardTitle>
              {selectedVersion && (
                <div className="flex space-x-2">
                  <Dialog open={isCreatingComment} onOpenChange={setIsCreatingComment}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Add Comment
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Comment</DialogTitle>
                        <DialogDescription>
                          Add a comment to this version
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Comment</label>
                          <Textarea
                            value={newCommentForm.content}
                            onChange={(e) => setNewCommentForm(prev => ({ ...prev, content: e.target.value }))}
                            placeholder="Enter your comment..."
                            rows={4}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Type</label>
                          <Select
                            value={newCommentForm.comment_type}
                            onValueChange={(value: string) =>
                              setNewCommentForm(prev => ({ 
                                ...prev, 
                                comment_type: value as 'general' | 'suggestion' | 'correction' 
                              }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">General</SelectItem>
                              <SelectItem value="suggestion">Suggestion</SelectItem>
                              <SelectItem value="correction">Correction</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsCreatingComment(false)}>
                            Cancel
                          </Button>
                          <Button onClick={createComment}>
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Add Comment
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {selectedVersion ? (
              <div className="space-y-4">
                {/* Version metadata */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Title:</strong> {selectedVersion.title}
                    </div>
                    <div>
                      <strong>Author:</strong> {selectedVersion.author_id}
                    </div>
                    <div>
                      <strong>Created:</strong> {new Date(selectedVersion.created_at).toLocaleString()}
                    </div>
                    <div>
                      <strong>Status:</strong>
                      <Badge className={`ml-2 ${getVersionBadgeColor(selectedVersion.review_status)}`}>
                        {selectedVersion.review_status}
                      </Badge>
                    </div>
                  </div>
                  {selectedVersion.change_summary && (
                    <div className="mt-2">
                      <strong>Changes:</strong> {selectedVersion.change_summary}
                    </div>
                  )}
                </div>

                {/* Document content */}
                <div className="border rounded-lg p-4 bg-white max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap font-mono text-sm">
                    {selectedVersion.content}
                  </pre>
                </div>

                {/* Comments */}
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Comments ({comments.length})
                  </h4>
                  {comments.map((comment) => (
                    <div key={comment.id} className="border rounded-lg p-3 bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">{comment.author_id}</span>
                          <Badge variant="outline" className="text-xs">
                            {comment.comment_type}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {comment.status}
                          </Badge>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.created_at).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                      {(comment.selection_start !== undefined && comment.selection_end !== undefined) && (
                        <p className="text-xs text-gray-500 mt-1">
                          Selection: characters {comment.selection_start}-{comment.selection_end}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Select a version to view details and content</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Active locks and collaboration status */}
      {locks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="h-4 w-4 mr-2" />
              Active Locks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {locks.filter(lock => lock.is_active).map((lock) => (
                <div key={lock.id} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{lock.lock_type}</Badge>
                    <span className="text-xs text-gray-500">
                      {currentUser?.id === lock.user_id ? 'You' : lock.user_id}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    <div>Acquired: {new Date(lock.acquired_at).toLocaleString()}</div>
                    <div>Expires: {new Date(lock.expires_at).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
        </>
      )}
    </div>
  );
}
