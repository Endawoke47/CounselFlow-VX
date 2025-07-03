/**
 * Document Upload Component
 * Secure file upload with drag-and-drop and AI processing
 */
import React, { useState, useCallback } from 'react';
import { Upload, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface DocumentUploadProps {
  onUpload: (file: File) => Promise<void>;
  allowedTypes?: string[];
  maxSize?: number; // in MB
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  onUpload,
  allowedTypes = ['pdf', 'doc', 'docx', 'txt'],
  maxSize = 10
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadMessage, setUploadMessage] = useState('');

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileUpload = useCallback(async (file: File) => {
    // Validate file type
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (fileExtension && !allowedTypes.includes(fileExtension)) {
      setUploadStatus('error');
      setUploadMessage(`File type .${fileExtension} not allowed. Allowed types: ${allowedTypes.join(', ')}`);
      return;
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setUploadStatus('error');
      setUploadMessage(`File size exceeds ${maxSize}MB limit`);
      return;
    }

    try {
      setUploadStatus('uploading');
      setUploadMessage('Processing document...');
      
      await onUpload(file);
      
      setUploadStatus('success');
      setUploadMessage('Document uploaded and analyzed successfully');
    } catch (error: unknown) {
      console.error('Document upload failed:', error);
      setUploadStatus('error');
      setUploadMessage('Upload failed. Please try again.');
    }
  }, [onUpload, allowedTypes, maxSize]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${uploadStatus === 'uploading' ? 'pointer-events-none opacity-50' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          onChange={handleFileSelect}
          accept={allowedTypes.map(type => `.${type}`).join(',')}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploadStatus === 'uploading'}
        />
        
        <div className="space-y-4">
          {uploadStatus === 'idle' && (
            <>
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div>
                <p className="text-lg font-medium text-gray-900">
                  Drop your document here, or click to browse
                </p>
                <p className="text-sm text-gray-600">
                  Supports: {allowedTypes.join(', ')} (max {maxSize}MB)
                </p>
              </div>
            </>
          )}
          
          {uploadStatus === 'uploading' && (
            <>
              <Loader2 className="mx-auto h-12 w-12 text-blue-500 animate-spin" />
              <p className="text-lg font-medium text-blue-600">{uploadMessage}</p>
            </>
          )}
          
          {uploadStatus === 'success' && (
            <>
              <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
              <p className="text-lg font-medium text-green-600">{uploadMessage}</p>
            </>
          )}
          
          {uploadStatus === 'error' && (
            <>
              <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
              <p className="text-lg font-medium text-red-600">{uploadMessage}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
