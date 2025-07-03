import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Grid3X3, TrendingUp } from "lucide-react";

interface RiskMatrixData {
  entity: string;
  riskType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  count: number;
  riskScore: number;
}

interface RiskMatrixChartProps {
  data: RiskMatrixData[];
  onCellClick?: (entity: string, riskType: string, severity: string) => void;
}

export function RiskMatrixChart({ data, onCellClick }: RiskMatrixChartProps) {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  const [tooltipData, setTooltipData] = useState<any>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Get unique entities and risk types
  const entities = [...new Set(data.map(d => d.entity))].sort();
  const riskTypes = [...new Set(data.map(d => d.riskType))].sort();

  // Create a lookup for quick data access
  const dataLookup = new Map();
  data.forEach(item => {
    const key = `${item.entity}-${item.riskType}`;
    dataLookup.set(key, item);
  });

  // Color mapping for severity levels
  const getSeverityColor = (severity: string, count: number) => {
    if (count === 0) return '#f8fafc'; // Very light gray for no risks
    
    switch (severity) {
      case 'critical':
        return '#dc2626'; // Red-600
      case 'high':
        return '#ea580c'; // Orange-600
      case 'medium':
        return '#ca8a04'; // Yellow-600
      case 'low':
        return '#16a34a'; // Green-600
      default:
        return '#e5e7eb'; // Gray-200
    }
  };

  const getSeverityIntensity = (count: number, maxCount: number) => {
    if (count === 0) return 0.1;
    return 0.3 + (count / maxCount) * 0.7; // Scale from 0.3 to 1.0
  };

  // Calculate max count for intensity scaling
  const maxCount = Math.max(...data.map(d => d.count));

  const getCellData = (entity: string, riskType: string) => {
    const key = `${entity}-${riskType}`;
    return dataLookup.get(key) || { severity: 'low', count: 0, riskScore: 0 };
  };

  const handleCellHover = (entity: string, riskType: string, e: React.MouseEvent) => {
    const cellData = getCellData(entity, riskType);
    const cellId = `${entity}-${riskType}`;
    
    setHoveredCell(cellId);
    setTooltipData({
      entity,
      riskType,
      severity: cellData.severity,
      count: cellData.count,
      riskScore: cellData.riskScore
    });
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleCellLeave = () => {
    setHoveredCell(null);
    setTooltipData(null);
  };

  const handleCellClick = (entity: string, riskType: string) => {
    const cellData = getCellData(entity, riskType);
    if (onCellClick && cellData.count > 0) {
      onCellClick(entity, riskType, cellData.severity);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Grid3X3 className="h-5 w-5 text-purple-600" />
          Risk Matrix Overview
        </CardTitle>
        <CardDescription>
          Risk severity distribution across entities and risk types. Darker colors indicate higher risk counts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header Row */}
            <div className="grid grid-cols-[200px_repeat(8,1fr)] gap-1 mb-2">
              <div className="p-3 font-medium text-sm text-muted-foreground">
                Entity / Risk Type
              </div>
              {riskTypes.map(riskType => (
                <div key={riskType} className="p-3 text-center font-medium text-sm bg-muted rounded">
                  {riskType}
                </div>
              ))}
            </div>

            {/* Data Rows */}
            {entities.map(entity => (
              <div key={entity} className="grid grid-cols-[200px_repeat(8,1fr)] gap-1 mb-1">
                {/* Entity Label */}
                <div className="p-3 font-medium text-sm bg-muted rounded flex items-center">
                  {entity}
                </div>
                
                {/* Risk Type Cells */}
                {riskTypes.map(riskType => {
                  const cellData = getCellData(entity, riskType);
                  const cellId = `${entity}-${riskType}`;
                  const isHovered = hoveredCell === cellId;
                  const hasData = cellData.count > 0;
                  
                  return (
                    <div
                      key={riskType}
                      className={`
                        p-3 rounded border text-center text-sm font-medium transition-all duration-200
                        ${hasData ? 'cursor-pointer hover:scale-105 hover:shadow-md' : 'cursor-default'}
                        ${isHovered ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
                      `}
                      style={{
                        backgroundColor: getSeverityColor(cellData.severity, cellData.count),
                        opacity: getSeverityIntensity(cellData.count, maxCount),
                        color: cellData.count > 0 ? '#ffffff' : '#6b7280'
                      }}
                      onMouseEnter={(e) => handleCellHover(entity, riskType, e)}
                      onMouseLeave={handleCellLeave}
                      onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
                      onClick={() => handleCellClick(entity, riskType)}
                    >
                      {cellData.count > 0 ? (
                        <div>
                          <div className="font-bold">{cellData.count}</div>
                          <div className="text-xs opacity-90">
                            {cellData.severity.charAt(0).toUpperCase() + cellData.severity.slice(1)}
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs">-</div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Severity Levels:</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#16a34a' }}></div>
            <span className="text-xs">Low</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#ca8a04' }}></div>
            <span className="text-xs">Medium</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#ea580c' }}></div>
            <span className="text-xs">High</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#dc2626' }}></div>
            <span className="text-xs">Critical</span>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <span className="text-sm text-muted-foreground">
              Intensity indicates risk count
            </span>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-muted rounded">
            <div className="text-lg font-bold">{entities.length}</div>
            <div className="text-xs text-muted-foreground">Entities</div>
          </div>
          <div className="text-center p-3 bg-muted rounded">
            <div className="text-lg font-bold">{riskTypes.length}</div>
            <div className="text-xs text-muted-foreground">Risk Types</div>
          </div>
          <div className="text-center p-3 bg-muted rounded">
            <div className="text-lg font-bold">{data.reduce((sum, d) => sum + d.count, 0)}</div>
            <div className="text-xs text-muted-foreground">Total Risks</div>
          </div>
          <div className="text-center p-3 bg-muted rounded">
            <div className="text-lg font-bold">
              {data.filter(d => d.severity === 'critical' || d.severity === 'high').reduce((sum, d) => sum + d.count, 0)}
            </div>
            <div className="text-xs text-muted-foreground">High/Critical</div>
          </div>
        </div>

        {/* Tooltip */}
        {tooltipData && (
          <div
            className="fixed z-50 bg-white p-3 border rounded-lg shadow-lg pointer-events-none"
            style={{
              left: mousePosition.x + 10,
              top: mousePosition.y - 10,
              transform: 'translate(0, -100%)'
            }}
          >
            <div className="font-medium">{tooltipData.entity}</div>
            <div className="text-sm text-muted-foreground">{tooltipData.riskType}</div>
            <div className="text-sm mt-1">
              <span className="font-medium">Count: </span>{tooltipData.count}
            </div>
            <div className="text-sm">
              <span className="font-medium">Severity: </span>
              <Badge 
                variant={
                  tooltipData.severity === 'critical' ? 'destructive' :
                  tooltipData.severity === 'high' ? 'destructive' :
                  tooltipData.severity === 'medium' ? 'secondary' : 'outline'
                }
                className="text-xs"
              >
                {tooltipData.severity.charAt(0).toUpperCase() + tooltipData.severity.slice(1)}
              </Badge>
            </div>
            {tooltipData.riskScore > 0 && (
              <div className="text-sm">
                <span className="font-medium">Risk Score: </span>{tooltipData.riskScore.toFixed(1)}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 