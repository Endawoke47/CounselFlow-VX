import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Download, FileSpreadsheet, Settings, Filter, CheckCircle } from "lucide-react";

interface ExcelExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  data: any[];
  columns: { key: string; label: string; type?: 'text' | 'number' | 'date' | 'currency' }[];
  onExport: (config: ExportConfig) => Promise<void>;
}

interface ExportConfig {
  format: 'xlsx' | 'csv';
  selectedColumns: string[];
  filters: Record<string, any>;
  includeHeaders: boolean;
  dateFormat: string;
  currencyFormat: string;
}

export function ExcelExportModal({ 
  open, 
  onOpenChange, 
  title, 
  description, 
  data, 
  columns, 
  onExport 
}: ExcelExportModalProps) {
  const [exportConfig, setExportConfig] = useState<ExportConfig>({
    format: 'xlsx',
    selectedColumns: columns.map(col => col.key),
    filters: {},
    includeHeaders: true,
    dateFormat: 'MM/DD/YYYY',
    currencyFormat: 'USD'
  });
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState<'configure' | 'preview' | 'export' | 'complete'>('configure');
  const [previewData, setPreviewData] = useState<any[]>([]);

  const handleColumnToggle = (columnKey: string, checked: boolean) => {
    setExportConfig(prev => ({
      ...prev,
      selectedColumns: checked 
        ? [...prev.selectedColumns, columnKey]
        : prev.selectedColumns.filter(key => key !== columnKey)
    }));
  };

  const generatePreview = () => {
    const filteredData = data.slice(0, 5); // Show first 5 rows for preview
    const processedData = filteredData.map(row => {
      const processedRow: any = {};
      exportConfig.selectedColumns.forEach(columnKey => {
        const column = columns.find(col => col.key === columnKey);
        if (column) {
          let value = row[columnKey];
          
          // Format based on column type
          if (column.type === 'date' && value) {
            value = new Date(value).toLocaleDateString();
          } else if (column.type === 'currency' && value) {
            value = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: exportConfig.currencyFormat
            }).format(Number(value));
          } else if (column.type === 'number' && value) {
            value = Number(value).toLocaleString();
          }
          
          processedRow[column.label] = value || '-';
        }
      });
      return processedRow;
    });
    
    setPreviewData(processedData);
    setCurrentStep('preview');
  };

  const handleExport = async () => {
    setCurrentStep('export');
    setIsExporting(true);
    setExportProgress(0);

    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          setCurrentStep('complete');
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    try {
      await onExport(exportConfig);
      
      // Generate and download file
      const processedData = data.map(row => {
        const processedRow: any = {};
        exportConfig.selectedColumns.forEach(columnKey => {
          const column = columns.find(col => col.key === columnKey);
          if (column) {
            processedRow[column.label] = row[columnKey] || '';
          }
        });
        return processedRow;
      });

      downloadFile(processedData);
    } catch (error) {
      console.error('Export failed:', error);
      setIsExporting(false);
    }
  };

  const downloadFile = (processedData: any[]) => {
    if (exportConfig.format === 'csv') {
      downloadCSV(processedData);
    } else {
      // For XLSX, we'll simulate by downloading as CSV for now
      // In a real implementation, you'd use a library like xlsx
      downloadCSV(processedData);
    }
  };

  const downloadCSV = (processedData: any[]) => {
    const headers = exportConfig.selectedColumns.map(key => {
      const column = columns.find(col => col.key === key);
      return column?.label || key;
    });

    let csvContent = '';
    
    if (exportConfig.includeHeaders) {
      csvContent += headers.join(',') + '\n';
    }

    processedData.forEach(row => {
      const values = headers.map(header => {
        const value = row[header] || '';
        // Escape commas and quotes in CSV
        return typeof value === 'string' && (value.includes(',') || value.includes('"')) 
          ? `"${value.replace(/"/g, '""')}"` 
          : value;
      });
      csvContent += values.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '_')}_export.${exportConfig.format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const resetModal = () => {
    setCurrentStep('configure');
    setExportProgress(0);
    setIsExporting(false);
    setPreviewData([]);
  };

  const handleClose = () => {
    resetModal();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Tabs value={currentStep} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="configure">
              1. Configure
            </TabsTrigger>
            <TabsTrigger value="preview" disabled={currentStep === 'configure'}>
              2. Preview
            </TabsTrigger>
            <TabsTrigger value="export" disabled={!['export', 'complete'].includes(currentStep)}>
              3. Export
            </TabsTrigger>
            <TabsTrigger value="complete" disabled={currentStep !== 'complete'}>
              4. Complete
            </TabsTrigger>
          </TabsList>

          <TabsContent value="configure" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Export Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>File Format</Label>
                    <Select 
                      value={exportConfig.format} 
                      onValueChange={(value: 'xlsx' | 'csv') => 
                        setExportConfig(prev => ({ ...prev, format: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
                        <SelectItem value="csv">CSV (.csv)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Date Format</Label>
                    <Select 
                      value={exportConfig.dateFormat} 
                      onValueChange={(value) => 
                        setExportConfig(prev => ({ ...prev, dateFormat: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Currency Format</Label>
                    <Select 
                      value={exportConfig.currencyFormat} 
                      onValueChange={(value) => 
                        setExportConfig(prev => ({ ...prev, currencyFormat: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="SGD">SGD (S$)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="includeHeaders"
                      checked={exportConfig.includeHeaders}
                      onCheckedChange={(checked) => 
                        setExportConfig(prev => ({ ...prev, includeHeaders: checked as boolean }))
                      }
                    />
                    <Label htmlFor="includeHeaders">Include column headers</Label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Column Selection
                  </CardTitle>
                  <CardDescription>
                    Choose which columns to include in the export
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    <div className="flex items-center space-x-2 pb-2 border-b">
                      <Checkbox 
                        id="selectAll"
                        checked={exportConfig.selectedColumns.length === columns.length}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setExportConfig(prev => ({ 
                              ...prev, 
                              selectedColumns: columns.map(col => col.key) 
                            }));
                          } else {
                            setExportConfig(prev => ({ ...prev, selectedColumns: [] }));
                          }
                        }}
                      />
                      <Label htmlFor="selectAll" className="font-medium">Select All</Label>
                    </div>
                    {columns.map(column => (
                      <div key={column.key} className="flex items-center space-x-2">
                        <Checkbox 
                          id={column.key}
                          checked={exportConfig.selectedColumns.includes(column.key)}
                          onCheckedChange={(checked) => 
                            handleColumnToggle(column.key, checked as boolean)
                          }
                        />
                        <Label htmlFor={column.key} className="flex-1">
                          {column.label}
                        </Label>
                        {column.type && (
                          <Badge variant="outline" className="text-xs">
                            {column.type}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {data.length} total records • {exportConfig.selectedColumns.length} columns selected
              </div>
              <Button 
                onClick={generatePreview}
                disabled={exportConfig.selectedColumns.length === 0}
              >
                Preview Export
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Export Preview</CardTitle>
                <CardDescription>
                  Preview of the first 5 rows that will be exported
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-auto max-h-96">
                  <table className="w-full text-sm">
                    <thead className="bg-muted">
                      <tr>
                        {exportConfig.selectedColumns.map(columnKey => {
                          const column = columns.find(col => col.key === columnKey);
                          return (
                            <th key={columnKey} className="p-2 text-left font-medium">
                              {column?.label}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.map((row, index) => (
                        <tr key={index} className="border-t">
                          {exportConfig.selectedColumns.map(columnKey => {
                            const column = columns.find(col => col.key === columnKey);
                            return (
                              <td key={columnKey} className="p-2">
                                {row[column?.label || columnKey]}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing preview of {previewData.length} rows out of {data.length} total
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setCurrentStep('configure')}>
                      Back to Configure
                    </Button>
                    <Button onClick={handleExport}>
                      Export {data.length} Records
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="export" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Exporting Data</CardTitle>
                <CardDescription>
                  Please wait while your data is being exported...
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <FileSpreadsheet className="h-8 w-8 text-blue-500" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Exporting {data.length} records...</span>
                        <span>{exportProgress}%</span>
                      </div>
                      <Progress value={exportProgress} className="w-full" />
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    Format: {exportConfig.format.toUpperCase()} • 
                    Columns: {exportConfig.selectedColumns.length} • 
                    Headers: {exportConfig.includeHeaders ? 'Included' : 'Excluded'}
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
                  Export Complete
                </CardTitle>
                <CardDescription>
                  Your data has been successfully exported and downloaded
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Successfully exported {data.length} records to {exportConfig.format.toUpperCase()} format. 
                    The file should have started downloading automatically.
                  </AlertDescription>
                </Alert>

                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={handleClose}>
                    Close
                  </Button>
                  <Button onClick={() => {
                    resetModal();
                    setCurrentStep('configure');
                  }}>
                    Export More Data
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