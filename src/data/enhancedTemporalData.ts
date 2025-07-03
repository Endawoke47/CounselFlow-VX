// Enhanced Temporal Data & Predictive Analytics for CounselFlow
// Comprehensive 24h, 7d, 30d, 90d data structures with AI-powered predictions

export type TimePeriod = '24h' | '7d' | '30d' | '90d';

export interface TemporalDataPoint {
  timestamp: string;
  period: TimePeriod;
  entityType: string;
  entityId: string;
  metrics: Record<string, any>;
  predictions?: PredictionData;
}

export interface PredictionData {
  confidence: number; // 0-100
  algorithm: string;
  nextPeriodForecast: any;
  riskFactors: string[];
  recommendations: string[];
}

export interface RealTimeMetrics {
  activeUsers: number;
  pendingApprovals: number;
  urgentDeadlines: number;
  systemLoad: number;
  apiResponseTime: string;
}

export interface HourlyActivity {
  hour: number;
  newContracts: number;
  reviews: number;
  signatures: number;
  alerts: number;
}

export interface DailyAlert {
  time: string;
  type: 'expiration' | 'signature_required' | 'renewal_notice' | 'risk_threshold';
  contract?: string;
  daysUntil?: number;
  urgency?: 'low' | 'medium' | 'high';
  action?: string;
  riskScore?: number;
}

export interface TeamPerformance {
  attorney: string;
  completed: number;
  efficiency: number;
  quality: number;
}

export interface WeeklyTrend {
  date: string;
  newContracts: number;
  completed: number;
  value: number;
  riskScore: number;
}

export interface VendorPerformance {
  vendor: string;
  spend: number;
  efficiency: number;
  satisfaction: number;
  trend: 'improving' | 'stable' | 'declining';
}

export interface StrategicInitiative {
  initiative: string;
  progress: number;
  impact: string;
  status: 'on-track' | 'ahead' | 'behind';
}

// 24-HOUR PROGRESSION DATA
export const generate24HourData = (module: string) => {
  const baseHourlyData: HourlyActivity[] = [
    { hour: 0, newContracts: 0, reviews: 0, signatures: 0, alerts: 2 },
    { hour: 1, newContracts: 0, reviews: 0, signatures: 0, alerts: 1 },
    { hour: 2, newContracts: 0, reviews: 0, signatures: 0, alerts: 0 },
    { hour: 3, newContracts: 0, reviews: 0, signatures: 0, alerts: 1 },
    { hour: 4, newContracts: 0, reviews: 0, signatures: 0, alerts: 0 },
    { hour: 5, newContracts: 0, reviews: 0, signatures: 0, alerts: 0 },
    { hour: 6, newContracts: 1, reviews: 2, signatures: 1, alerts: 1 },
    { hour: 7, newContracts: 1, reviews: 3, signatures: 2, alerts: 2 },
    { hour: 8, newContracts: 2, reviews: 5, signatures: 3, alerts: 4 },
    { hour: 9, newContracts: 4, reviews: 12, signatures: 8, alerts: 6 },
    { hour: 10, newContracts: 3, reviews: 15, signatures: 12, alerts: 3 },
    { hour: 11, newContracts: 5, reviews: 18, signatures: 14, alerts: 8 },
    { hour: 12, newContracts: 2, reviews: 8, signatures: 6, alerts: 2 },
    { hour: 13, newContracts: 3, reviews: 14, signatures: 11, alerts: 5 },
    { hour: 14, newContracts: 6, reviews: 22, signatures: 18, alerts: 7 },
    { hour: 15, newContracts: 4, reviews: 19, signatures: 15, alerts: 4 },
    { hour: 16, newContracts: 7, reviews: 25, signatures: 21, alerts: 9 },
    { hour: 17, newContracts: 3, reviews: 12, signatures: 9, alerts: 3 },
    { hour: 18, newContracts: 1, reviews: 4, signatures: 2, alerts: 1 },
    { hour: 19, newContracts: 0, reviews: 2, signatures: 1, alerts: 1 },
    { hour: 20, newContracts: 0, reviews: 1, signatures: 0, alerts: 0 },
    { hour: 21, newContracts: 0, reviews: 0, signatures: 0, alerts: 1 },
    { hour: 22, newContracts: 0, reviews: 0, signatures: 0, alerts: 0 },
    { hour: 23, newContracts: 0, reviews: 0, signatures: 0, alerts: 1 }
  ];

  const realTimeMetrics: RealTimeMetrics = {
    activeUsers: 47,
    pendingApprovals: 23,
    urgentDeadlines: 8,
    systemLoad: 67,
    apiResponseTime: '245ms'
  };

  const hourlyAlerts: DailyAlert[] = [
    { time: '09:15', type: 'expiration', contract: 'MSA-2024-001', daysUntil: 90 },
    { time: '10:30', type: 'signature_required', contract: 'NDA-2024-087', urgency: 'high' },
    { time: '14:45', type: 'renewal_notice', contract: 'RE-2023-012', action: 'send_notice' },
    { time: '16:20', type: 'risk_threshold', contract: 'EMP-2024-034', riskScore: 85 }
  ];

  const teamPerformance: TeamPerformance[] = [
    { attorney: 'Sarah Johnson', completed: 8, efficiency: 92, quality: 4.8 },
    { attorney: 'Michael Chen', completed: 12, efficiency: 88, quality: 4.6 },
    { attorney: 'Lisa Park', completed: 6, efficiency: 95, quality: 4.9 },
    { attorney: 'Robert Kim', completed: 9, efficiency: 85, quality: 4.4 }
  ];

  return {
    timestamp: new Date().toISOString(),
    period: '24h' as TimePeriod,
    module,
    dailyActivity: baseHourlyData,
    realTimeMetrics,
    hourlyAlerts,
    teamPerformance,
    dailyMetrics: {
      newItems: 42,
      completed: 35,
      inProgress: 67,
      overdue: 8,
      efficiency: 89.5,
      satisfaction: 4.6
    }
  };
};

// 7-DAY PROGRESSION DATA
export const generate7DayData = (module: string) => {
  const weeklyTrends: WeeklyTrend[] = [
    { date: '2024-06-26', newContracts: 8, completed: 12, value: 1240000, riskScore: 72 },
    { date: '2024-06-27', newContracts: 12, completed: 9, value: 2180000, riskScore: 68 },
    { date: '2024-06-28', newContracts: 15, completed: 14, value: 3450000, riskScore: 75 },
    { date: '2024-06-29', newContracts: 6, completed: 8, value: 890000, riskScore: 64 },
    { date: '2024-06-30', newContracts: 9, completed: 11, value: 1560000, riskScore: 70 },
    { date: '2024-07-01', newContracts: 11, completed: 13, value: 2340000, riskScore: 73 },
    { date: '2024-07-02', newContracts: 14, completed: 10, value: 2890000, riskScore: 69 }
  ];

  const weeklyInsights = {
    mostActiveDay: 'Monday',
    averageProcessingTime: '3.2 days',
    topRiskCategory: 'Intellectual Property',
    renewalRate: 89,
    clientSatisfaction: 4.7
  };

  const predictions: PredictionData = {
    confidence: 87,
    algorithm: 'ARIMA + ML',
    nextPeriodForecast: {
      nextWeekVolume: 85,
      riskTrend: 'decreasing'
    },
    riskFactors: ['Market volatility', 'Regulatory changes'],
    recommendations: [
      'Increase IP contract review capacity',
      'Implement automated risk scoring',
      'Schedule renewal discussions early'
    ]
  };

  return {
    timestamp: new Date().toISOString(),
    period: '7d' as TimePeriod,
    module,
    weeklyTrends,
    weeklyInsights,
    predictions,
    riskEvolution: generateRiskEvolution(),
    performanceMetrics: {
      efficiency: 91,
      qualityScore: 4.7,
      velocityIncrease: 15.2,
      costReduction: 8.7
    }
  };
};

// 30-DAY PROGRESSION DATA
export const generate30DayData = (module: string) => {
  const monthlyMetrics = {
    totalItems: 347,
    completed: 284,
    averageResolutionTime: 45.7,
    clientSatisfaction: 4.6,
    costEfficiency: 23.4,
    riskReduction: 34.7
  };

  const weeklyBreakdown = [
    { week: 1, items: 87, efficiency: 87, cost: 634200, riskScore: 76 },
    { week: 2, items: 94, efficiency: 91, cost: 789450, riskScore: 73 },
    { week: 3, items: 89, efficiency: 89, cost: 712380, riskScore: 71 },
    { week: 4, items: 77, efficiency: 93, cost: 711620, riskScore: 69 }
  ];

  const vendorPerformance: VendorPerformance[] = [
    { vendor: 'Patterson & Associates', spend: 334670, efficiency: 94, satisfaction: 4.8, trend: 'improving' },
    { vendor: 'Global Corporate Services', spend: 89450, efficiency: 91, satisfaction: 4.3, trend: 'stable' },
    { vendor: 'Innovation IP Counsel', spend: 167890, efficiency: 88, satisfaction: 4.6, trend: 'improving' }
  ];

  const complianceMetrics = {
    overallScore: 94.2,
    trendDirection: 'improving' as const,
    criticalIssues: 2,
    resolvedIssues: 18,
    newRequirements: 7
  };

  return {
    timestamp: new Date().toISOString(),
    period: '30d' as TimePeriod,
    module,
    monthlyMetrics,
    weeklyBreakdown,
    vendorPerformance,
    complianceMetrics,
    upcomingDeadlines: [
      { date: '2024-07-15', requirement: 'GDPR assessment', criticality: 'high' },
      { date: '2024-08-01', requirement: 'SEC 10-Q filing', criticality: 'critical' },
      { date: '2024-08-15', requirement: 'Employment training', criticality: 'medium' }
    ],
    predictions: {
      nextMonthProjection: 410,
      confidence: 82,
      budgetRisk: 'medium' as const,
      recommendations: [
        'Review vendor rates for Q4 renewals',
        'Implement cost optimization strategies',
        'Consider alternative fee arrangements'
      ]
    }
  };
};

// 90-DAY PROGRESSION DATA
export const generate90DayData = (module: string) => {
  const quarterlyMetrics = {
    totalItems: 1247,
    resolutionRate: 78,
    averageResolutionTime: 45.7,
    clientSatisfaction: 4.6,
    costEfficiency: 23.4,
    riskReduction: 34.7
  };

  const monthlyTrends = [
    { month: 'April 2024', items: 382, spend: 2645300, efficiency: 85, riskScore: 76, satisfaction: 4.4 },
    { month: 'May 2024', items: 435, spend: 2789150, efficiency: 89, riskScore: 73, satisfaction: 4.5 },
    { month: 'June 2024', items: 430, spend: 2847650, efficiency: 91, riskScore: 69, satisfaction: 4.7 }
  ];

  const businessImpact = {
    valueManaged: 247500000,
    riskMitigationValue: 12400000,
    complianceSavings: 3670000,
    efficiencyGains: '34% faster resolution',
    accuracyImprovement: '91% first-time-right'
  };

  const strategicInitiatives: StrategicInitiative[] = [
    { initiative: 'AI Contract Analysis', progress: 87, impact: '45% faster contract review', status: 'on-track' },
    { initiative: 'Predictive Risk Modeling', progress: 72, impact: '67% better risk prediction', status: 'on-track' },
    { initiative: 'Automated Compliance Monitoring', progress: 94, impact: '23% reduction in violations', status: 'ahead' }
  ];

  return {
    timestamp: new Date().toISOString(),
    period: '90d' as TimePeriod,
    module,
    quarterlyMetrics,
    monthlyTrends,
    businessImpact,
    strategicInitiatives,
    forecastModels: generateForecastModels(),
    marketIntelligence: {
      marketTrends: [
        'Increased M&A activity in Q4',
        'Rising cybersecurity regulations',
        'ESG compliance requirements expanding'
      ],
      competitiveAnalysis: {
        positionRanking: 2,
        efficiencyScore: 94,
        innovationIndex: 87
      },
      resourceOptimization: {
        recommendedHires: 3,
        skillGaps: ['AI/ML expertise', 'International law', 'Cybersecurity law'],
        trainingNeeds: ['Technology law updates', 'Advanced negotiation', 'Risk management']
      }
    }
  };
};

// Helper function for risk evolution data
const generateRiskEvolution = () => {
  return [
    { date: '2024-06-26', newRisks: 4, resolvedRisks: 2, criticalRisks: 15, highRisks: 23, mediumRisks: 31, lowRisks: 18, overallScore: 72 },
    { date: '2024-06-27', newRisks: 6, resolvedRisks: 3, criticalRisks: 16, highRisks: 25, mediumRisks: 29, lowRisks: 19, overallScore: 68 },
    { date: '2024-06-28', newRisks: 3, resolvedRisks: 5, criticalRisks: 14, highRisks: 22, mediumRisks: 32, lowRisks: 21, overallScore: 75 },
    { date: '2024-06-29', newRisks: 2, resolvedRisks: 4, criticalRisks: 12, highRisks: 20, mediumRisks: 34, lowRisks: 23, overallScore: 78 },
    { date: '2024-06-30', newRisks: 5, resolvedRisks: 2, criticalRisks: 13, highRisks: 22, mediumRisks: 33, lowRisks: 22, overallScore: 76 },
    { date: '2024-07-01', newRisks: 4, resolvedRisks: 6, criticalRisks: 11, highRisks: 19, mediumRisks: 35, lowRisks: 25, overallScore: 81 },
    { date: '2024-07-02', newRisks: 3, resolvedRisks: 4, criticalRisks: 10, highRisks: 18, mediumRisks: 36, lowRisks: 26, overallScore: 83 }
  ];
};

// Helper function for forecast models
const generateForecastModels = () => {
  return {
    contractVolume: {
      algorithm: 'ARIMA + ML',
      confidence: 89,
      nextQuarter: {
        newContracts: 342,
        renewals: 89,
        amendments: 156,
        terminations: 23
      },
      seasonalFactors: ['Q4 budget cycles', 'Holiday slowdowns', 'Fiscal year planning']
    },
    riskEvolution: {
      algorithm: 'Gradient Boosting',
      confidence: 91,
      nextQuarter: {
        overallRiskScore: 65,
        emergingRisks: ['Regulatory changes', 'Cyber threats', 'Supply chain disruption'],
        riskReduction: 18.5
      }
    },
    complianceForecasting: {
      algorithm: 'Time Series + Regulatory Intelligence',
      confidence: 85,
      upcomingChallenges: [
        { regulation: 'EU AI Act', effectiveDate: '2024-12-01', impact: 'High', preparationTime: '150 days' },
        { regulation: 'Updated CCPA', effectiveDate: '2024-10-15', impact: 'Medium', preparationTime: '105 days' }
      ]
    }
  };
};

// Real-time live metrics
export const generateLiveMetrics = () => {
  return {
    timestamp: new Date().toISOString(),
    systemHealth: {
      status: 'Optimal',
      uptime: '99.97%',
      responseTime: '187ms',
      activeUsers: 67,
      dataProcessing: 'Real-time'
    },
    businessMetrics: {
      contractsUnderReview: 23,
      urgentTasks: 8,
      budgetUtilization: 73.2,
      riskAlerts: 4,
      complianceScore: 94.2
    },
    aiInsights: {
      documentsAnalyzed: 347,
      riskAssessments: 89,
      predictiveAccuracy: 87.3,
      automationSavings: '34.7 hours'
    }
  };
};

// Unified data getter for any module and period
export const getTemporalData = (module: string, period: TimePeriod) => {
  switch (period) {
    case '24h':
      return generate24HourData(module);
    case '7d':
      return generate7DayData(module);
    case '30d':
      return generate30DayData(module);
    case '90d':
      return generate90DayData(module);
    default:
      return generate24HourData(module);
  }
};

// Module-specific data enhancers
export const getModuleSpecificData = (module: string, period: TimePeriod) => {
  const baseData = getTemporalData(module, period);
  
  switch (module) {
    case 'contracts':
      return {
        ...baseData,
        contractTypes: ['MSA', 'NDA', 'Employment', 'Vendor', 'IP License'],
        riskCategories: ['Financial', 'Legal', 'Operational', 'Regulatory'],
        geographicDistribution: ['North America', 'Europe', 'Asia Pacific']
      };
    
    case 'matters':
      return {
        ...baseData,
        matterTypes: ['M&A', 'Litigation', 'Employment', 'IP', 'Regulatory'],
        practiceAreas: ['Corporate', 'Employment', 'IP', 'Litigation', 'Compliance'],
        jurisdictions: ['Delaware', 'New York', 'California', 'Federal']
      };
    
    case 'compliance':
      return {
        ...baseData,
        regulatoryAreas: ['SEC', 'GDPR/CCPA', 'Employment Law', 'Environmental'],
        complianceFrameworks: ['SOX', 'ISO 27001', 'COSO', 'NIST'],
        auditTypes: ['Internal', 'External', 'Regulatory', 'Financial']
      };
    
    case 'risks':
      return {
        ...baseData,
        riskTypes: ['Operational', 'Financial', 'Legal', 'Strategic', 'Compliance'],
        severityLevels: ['Critical', 'High', 'Medium', 'Low'],
        mitigationStrategies: ['Avoid', 'Mitigate', 'Transfer', 'Accept']
      };
    
    default:
      return baseData;
  }
};

// Chart-ready data formatters
export const formatChartData = (data: any, chartType: 'line' | 'bar' | 'pie' | 'area') => {
  switch (chartType) {
    case 'line':
      return data.map((item: any, index: number) => ({
        x: item.date || item.hour || index,
        y: item.value || item.count || item.score || 0,
        label: item.label || item.name || `Point ${index + 1}`
      }));
    
    case 'bar':
      return data.map((item: any) => ({
        category: item.category || item.name || item.type,
        value: item.value || item.count || item.amount || 0,
        color: item.color || '#3b82f6'
      }));
    
    case 'pie':
      return data.map((item: any) => ({
        name: item.name || item.label || item.category,
        value: item.value || item.percentage || item.count || 0,
        fill: item.color || item.fill || '#3b82f6'
      }));
    
    case 'area':
      return data.map((item: any, index: number) => ({
        x: item.date || item.timestamp || index,
        y: item.value || item.amount || 0,
        y0: 0,
        category: item.category || 'default'
      }));
    
    default:
      return data;
  }
};

// Export all data functions
export {
  generate24HourData,
  generate7DayData,
  generate30DayData,
  generate90DayData,
  generateLiveMetrics
};
