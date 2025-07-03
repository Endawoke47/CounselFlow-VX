// Temporal Data Generators for CounselFlow Analytics
// Provides data for 24h, 7d, 30d, and 90d time periods

export type TimePeriod = '24h' | '7d' | '30d' | '90d';

export interface TemporalMetrics {
  activeUsers: number;
  completionRate: number;
  urgentTasks: number;
  efficiency: number;
}

export interface HourlyActivity {
  hour: number;
  activity: number;
  alerts: number;
}

export interface DailyActivity {
  date: string;
  activity: number;
  completed: number;
  riskScore: number;
}

export interface WeeklyActivity {
  week: string;
  items: number;
  efficiency: number;
  cost: number;
  riskScore: number;
}

export interface MonthlyActivity {
  month: string;
  items: number;
  spend: number;
  efficiency: number;
  satisfaction: string;
}

// 24-hour data generator
export const generate24HourData = () => {
  const hourlyData: HourlyActivity[] = [];
  for (let i = 0; i < 24; i++) {
    hourlyData.push({
      hour: i,
      activity: Math.floor(Math.random() * 50) + (i >= 8 && i <= 17 ? 20 : 0),
      alerts: Math.floor(Math.random() * 10)
    });
  }
  
  return {
    period: '24h' as TimePeriod,
    hourlyData,
    metrics: {
      activeUsers: 47,
      completionRate: 89,
      urgentTasks: 8,
      efficiency: 92
    },
    insights: [
      'Peak activity between 9 AM and 5 PM',
      'Minimal overnight activities',
      '8 urgent tasks requiring attention'
    ]
  };
};

// 7-day data generator
export const generate7DayData = () => {
  const dailyData: DailyActivity[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dailyData.push({
      date: date.toISOString().split('T')[0],
      activity: Math.floor(Math.random() * 100) + 50,
      completed: Math.floor(Math.random() * 30) + 10,
      riskScore: Math.floor(Math.random() * 30) + 70
    });
  }
  
  return {
    period: '7d' as TimePeriod,
    dailyData: dailyData.reverse(),
    metrics: {
      activeUsers: 156,
      completionRate: 91,
      urgentTasks: 23,
      efficiency: 88
    },
    trends: {
      activityTrend: 'increasing',
      completionTrend: 'stable',
      riskTrend: 'decreasing'
    }
  };
};

// 30-day data generator
export const generate30DayData = () => {
  const weeklyData: WeeklyActivity[] = [];
  for (let i = 0; i < 4; i++) {
    weeklyData.push({
      week: `Week ${i + 1}`,
      items: Math.floor(Math.random() * 50) + 70,
      efficiency: Math.floor(Math.random() * 15) + 85,
      cost: Math.floor(Math.random() * 100000) + 500000,
      riskScore: Math.floor(Math.random() * 10) + 70
    });
  }
  
  return {
    period: '30d' as TimePeriod,
    weeklyData,
    metrics: {
      activeUsers: 284,
      completionRate: 87,
      urgentTasks: 45,
      efficiency: 89
    },
    businessImpact: {
      totalValue: 12400000,
      costSavings: 340000,
      riskReduction: 23
    }
  };
};

// 90-day data generator
export const generate90DayData = () => {
  const monthlyData: MonthlyActivity[] = [];
  const months = ['Month 1', 'Month 2', 'Month 3'];
  
  months.forEach((month) => {
    monthlyData.push({
      month,
      items: Math.floor(Math.random() * 100) + 300,
      spend: Math.floor(Math.random() * 500000) + 2000000,
      efficiency: Math.floor(Math.random() * 10) + 85,
      satisfaction: (Math.random() * 0.5 + 4.2).toFixed(1)
    });
  });
  
  return {
    period: '90d' as TimePeriod,
    monthlyData,
    metrics: {
      activeUsers: 847,
      completionRate: 85,
      urgentTasks: 89,
      efficiency: 91
    },
    strategicImpact: {
      valueManaged: 247500000,
      riskMitigation: 12400000,
      complianceSavings: 3670000
    }
  };
};

// Main data getter function
export const getTemporalData = (period: TimePeriod) => {
  switch (period) {
    case '24h':
      return generate24HourData();
    case '7d':
      return generate7DayData();
    case '30d':
      return generate30DayData();
    case '90d':
      return generate90DayData();
    default:
      return generate24HourData();
  }
};
