// Temporal Analytics Component for CounselFlow
// Provides reusable time period selection tabs and data integration

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, TrendingUp, Activity } from 'lucide-react';
import { TimePeriod, TemporalMetrics } from '@/data/temporalData';

export interface TemporalTabsProps {
  activePeriod: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
  className?: string;
}

// Temporal Period Selection Tabs Component
export const TemporalTabs: React.FC<TemporalTabsProps> = ({ 
  activePeriod, 
  onPeriodChange, 
  className = '' 
}) => {
  const periods: { key: TimePeriod; label: string; icon: React.ReactNode }[] = [
    { key: '24h', label: '24 Hours', icon: <Clock className="w-4 h-4" /> },
    { key: '7d', label: '7 Days', icon: <Calendar className="w-4 h-4" /> },
    { key: '30d', label: '30 Days', icon: <TrendingUp className="w-4 h-4" /> },
    { key: '90d', label: '90 Days', icon: <Activity className="w-4 h-4" /> }
  ];

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {periods.map((period) => (
        <Button
          key={period.key}
          variant={activePeriod === period.key ? 'default' : 'outline'}
          size="sm"
          onClick={() => onPeriodChange(period.key)}
          className="flex items-center gap-2"
        >
          {period.icon}
          {period.label}
        </Button>
      ))}
    </div>
  );
};

// Real-time Metrics Card Component
export const RealTimeMetricsCard: React.FC<{ metrics: TemporalMetrics }> = ({ metrics }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-500" />
          Real-Time Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{metrics.activeUsers}</div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{metrics.completionRate}%</div>
            <div className="text-sm text-gray-600">Completion Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{metrics.urgentTasks}</div>
            <div className="text-sm text-gray-600">Urgent Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{metrics.efficiency}%</div>
            <div className="text-sm text-gray-600">Efficiency</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
