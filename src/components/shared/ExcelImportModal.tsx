import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Download, FileSpreadsheet, CheckCircle, AlertTriangle, X } from "lucide-react";

interface ExcelImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  templateColumns: string[];
  onImport: (data: any[]) => Promise<void>;
  sampleData?: any[];
}

interface ImportResult {
  success: boolean;
  message: string;
  rowIndex?: number;
  errors?: string[];
}

export function ExcelImportModal({ 
  open, 
  onOpenChange, 
  title, 
  description, 
  templateColumns, 
  onImport,
  sampleData = []
}: ExcelImportModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [validationResults, setValidationResults] = useState<ImportResult[]>([]);
  const [currentStep, setCurrentStep] = useState<'upload' | 'preview' | 'validate' | 'complete'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Simulate file parsing and preview generation
      simulateFilePreview(file);
    }
  };

  const simulateFilePreview = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setCurrentStep('preview');
          
          // Generate mock preview data based on template columns
          const mockData = generateMockPreviewData();
          setPreviewData(mockData);
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const generateMockPreviewData = () => {
    // Generate sample data based on the template columns
    if (templateColumns.includes('Contract Title')) {
      return [
        {
          'Contract Title': 'Software License Agreement - Microsoft',
          'Entity': 'Acme Corporation Ltd',
          'Counterparty': 'Microsoft Corporation',
          'Contract Value': '150000',
          'Currency': 'USD',
          'Start Date': '2024-01-01',
          'End Date': '2025-01-01',
          'Status': 'Active',
          'Type': 'Software License'
        },
        {
          'Contract Title': 'Office Lease - Downtown Building',
          'Entity': 'Global Tech Solutions Pte Ltd',
          'Counterparty': 'Real Estate Holdings LLC',
          'Contract Value': '500000',
          'Currency': 'SGD',
          'Start Date': '2024-02-01',
          'End Date': '2027-01-31',
          'Status': 'Active',
          'Type': 'Real Estate Lease'
        }
      ];
    } else if (templateColumns.includes('Dispute Title')) {
      return [
        {
          'Dispute Title': 'Contract Breach - Vendor ABC',
          'Entity': 'Acme Corporation Ltd',
          'Counterparty': 'ABC Supplies Inc',
          'Status': 'In Review',
          'Priority': 'High',
          'Exposure Amount': '250000',
          'Currency': 'USD',
          'Initiated Date': '2024-01-15',
          'Deadline': '2024-03-15',
          'Case Type': 'Contract Dispute'
        },
        {
          'Dispute Title': 'Employment Dispute - Wrongful Termination',
          'Entity': 'Global Tech Solutions Pte Ltd',
          'Counterparty': 'Former Employee',
          'Status': 'Negotiation',
          'Priority': 'Medium',
          'Exposure Amount': '75000',
          'Currency': 'SGD',
          'Initiated Date': '2024-02-01',
          'Deadline': '2024-04-01',
          'Case Type': 'Employment Dispute'
        }
      ];
    }
    return [];
  };

  const validateData = () => {
    setCurrentStep('validate');
    
    // Simulate validation process
    const results: ImportResult[] = previewData.map((row, index) => {
      const errors: string[] = [];
      
      // Basic validation rules
      if (templateColumns.includes('Contract Title') && !row['Contract Title']) {
        errors.push('Contract Title is required');
      }
      if (templateColumns.includes('Dispute Title') && !row['Dispute Title']) {
        errors.push('Dispute Title is required');
      }
      if (templateColumns.includes('Entity') && !row['Entity']) {
        errors.push('Entity is required');
      }
      if (templateColumns.includes('Contract Value') && row['Contract Value'] && isNaN(Number(row['Contract Value']))) {
        errors.push('Contract Value must be a number');
      }
      if (templateColumns.includes('Exposure Amount') && row['Exposure Amount'] && isNaN(Number(row['Exposure Amount']))) {
        errors.push('Exposure Amount must be a number');
      }

      return {
        success: errors.length === 0,
        message: errors.length === 0 ? 'Valid' : `${errors.length} error(s) found`,
        rowIndex: index + 1,
        errors
      };
    });

    setValidationResults(results);
  };

  const handleImport = async () => {
    try {
      await onImport(previewData);
      setCurrentStep('complete');
    } catch (error) {
      console.error('Import failed:', error);
    }
  };

  const downloadTemplate = () => {
    // Create CSV template
    const csvContent = templateColumns.join(',') + '\n';
    
    // Add sample row if available
    if (sampleData.length > 0) {
      const sampleRow = templateColumns.map(col => sampleData[0][col] || '').join(',');
      const finalContent = csvContent + sampleRow;
      
      const blob = new Blob([finalContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.toLowerCase().replace(/\s+/g, '_')}_template.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  };

  const resetModal = () => {
    setSelectedFile(null);
    setPreviewData([]);
    setValidationResults([]);
    setCurrentStep('upload');
    setUploadProgress(0);
    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClose = () => {
    resetModal();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Tabs value={currentStep} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upload" disabled={currentStep !== 'upload'}>
              1. Upload File
            </TabsTrigger>
            <TabsTrigger value="preview" disabled={currentStep === 'upload'}>
              2. Preview Data
            </TabsTrigger>
            <TabsTrigger value="validate" disabled={!['validate', 'complete'].includes(currentStep)}>
              3. Validate
            </TabsTrigger>
            <TabsTrigger value="complete" disabled={currentStep !== 'complete'}>
              4. Complete
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upload Excel File</CardTitle>
                <CardDescription>
                  Select an Excel file (.xlsx, .xls) or CSV file to import data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <div className="space-y-2">
                    <p className="text-lg font-medium">Drop your file here or click to browse</p>
                    <p className="text-sm text-muted-foreground">
                      Supports .xlsx, .xls, and .csv files up to 10MB
                    </p>
                  </div>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileSelect}
                    className="mt-4 max-w-xs mx-auto"
                  />
                </div>

                {selectedFile && (
                  <Alert>
                    <FileSpreadsheet className="h-4 w-4" />
                    <AlertDescription>
                      Selected file: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                    </AlertDescription>
                  </Alert>
                )}

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Processing file...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="w-full" />
                  </div>
                )}

                <div className="flex items-center justify-between pt-4">
                  <Button variant="outline" onClick={downloadTemplate}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Data Preview</CardTitle>
                <CardDescription>
                  Review the data that will be imported ({previewData.length} rows)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-auto max-h-96">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">#</TableHead>
                        {templateColumns.map(column => (
                          <TableHead key={column}>{column}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {previewData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          {templateColumns.map(column => (
                            <TableCell key={column}>{row[column] || '-'}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setCurrentStep('upload')}>
                    Back
                  </Button>
                  <Button onClick={validateData}>
                    Validate Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="validate" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Validation Results</CardTitle>
                <CardDescription>
                  Data validation completed - review any issues before importing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm">
                        {validationResults.filter(r => r.success).length} valid rows
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      <span className="text-sm">
                        {validationResults.filter(r => !r.success).length} rows with errors
                      </span>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-auto max-h-96">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Row</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Message</TableHead>
                          <TableHead>Errors</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {validationResults.map((result, index) => (
                          <TableRow key={index}>
                            <TableCell>{result.rowIndex}</TableCell>
                            <TableCell>
                              <Badge variant={result.success ? "default" : "destructive"}>
                                {result.success ? "Valid" : "Error"}
                              </Badge>
                            </TableCell>
                            <TableCell>{result.message}</TableCell>
                            <TableCell>
                              {result.errors && result.errors.length > 0 && (
                                <ul className="text-sm text-red-600">
                                  {result.errors.map((error, i) => (
                                    <li key={i}>• {error}</li>
                                  ))}
                                </ul>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setCurrentStep('preview')}>
                      Back to Preview
                    </Button>
                    <Button 
                      onClick={handleImport}
                      disabled={validationResults.some(r => !r.success)}
                    >
                      Import Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="complete" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Import Complete
                </CardTitle>
                <CardDescription>
                  Your data has been successfully imported
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Successfully imported {previewData.length} records. You can now view them in the main list.
                  </AlertDescription>
                </Alert>

                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={handleClose}>
                    Close
                  </Button>
                  <Button onClick={() => {
                    resetModal();
                    setCurrentStep('upload');
                  }}>
                    Import More Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
} 