import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export function SlideOver({ 
  isOpen, 
  onClose, 
  title, 
  subtitle, 
  children, 
  size = "lg" 
}: SlideOverProps) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg", 
    lg: "max-w-2xl",
    xl: "max-w-4xl"
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Slide Over Panel */}
      <div className={`fixed right-0 top-0 h-full ${sizeClasses[size]} w-full bg-background border-l shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-xl font-semibold">{title}</h2>
              {subtitle && (
                <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-auto p-6">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

interface DrillDownData {
  id: string;
  title: string;
  module: string;
  filters?: Record<string, any>;
  data: any[];
  columns: Array<{
    key: string;
    label: string;
    type?: "text" | "number" | "date" | "badge" | "currency";
    render?: (value: any, row: any) => React.ReactNode;
  }>;
}

interface DrillDownSlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  data: DrillDownData | null;
}

export function DrillDownSlideOver({ isOpen, onClose, data }: DrillDownSlideOverProps) {
  if (!data) return null;

  const renderCellValue = (value: any, type: string = "text", row?: any, column?: any) => {
    if (column?.render) {
      return column.render(value, row);
    }

    switch (type) {
      case "currency":
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(value);
      
      case "date":
        return new Date(value).toLocaleDateString();
      
      case "number":
        return typeof value === 'number' ? value.toLocaleString() : value;
      
      case "badge":
        return <Badge variant="outline" className="text-xs">{value}</Badge>;
      
      default:
        return value;
    }
  };

  return (
    <SlideOver
      isOpen={isOpen}
      onClose={onClose}
      title={data.title}
      subtitle={`${data.module} • ${data.data.length} records`}
      size="xl"
    >
      <div className="space-y-4">
        {/* Filters Display */}
        {data.filters && Object.keys(data.filters).length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium">Filters:</span>
            {Object.entries(data.filters).map(([key, value]) => (
              <Badge key={key} variant="secondary" className="text-xs">
                {key}: {String(value)}
              </Badge>
            ))}
          </div>
        )}

        {/* Data Table */}
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  {data.columns.map((column) => (
                    <th
                      key={column.key}
                      className="px-4 py-3 text-left text-sm font-medium text-muted-foreground"
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {data.data.map((row, index) => (
                  <tr key={row.id || index} className="hover:bg-muted/30">
                    {data.columns.map((column) => (
                      <td key={column.key} className="px-4 py-3 text-sm">
                        {renderCellValue(row[column.key], column.type, row, column)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold">{data.data.length}</div>
            <div className="text-sm text-muted-foreground">Total Records</div>
          </div>
          {data.columns.find(c => c.type === "currency") && (
            <div className="text-center">
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(
                  data.data.reduce((sum, row) => {
                    const currencyColumn = data.columns.find(c => c.type === "currency");
                    return sum + (Number(row[currencyColumn?.key || '']) || 0);
                  }, 0)
                )}
              </div>
              <div className="text-sm text-muted-foreground">Total Value</div>
            </div>
          )}
          {data.columns.find(c => c.type === "date") && (
            <div className="text-center">
              <div className="text-2xl font-bold">
                {data.data.filter(row => {
                  const dateColumn = data.columns.find(c => c.type === "date");
                  const date = new Date(row[dateColumn?.key || '']);
                  const now = new Date();
                  const diffTime = date.getTime() - now.getTime();
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  return diffDays <= 30 && diffDays >= 0;
                }).length}
              </div>
              <div className="text-sm text-muted-foreground">Due Soon</div>
            </div>
          )}
          <div className="text-center">
            <div className="text-2xl font-bold">
              {Math.round((data.data.filter(row => 
                row.status === "completed" || row.status === "active" || row.status === "approved"
              ).length / data.data.length) * 100)}%
            </div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
        </div>
      </div>
    </SlideOver>
  );
} 