import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';

interface AnalyticsData {
  totalMatters: number;
  activeContracts: number;
  pendingReviews: number;
  riskScore: number;
  complianceRate: number;
  revenueGrowth: number;
}

interface RiskData {
  name: string;
  value: number;
  color: string;
}

interface TrendData {
  name: string;
  matters: number;
  contracts: number;
  reviews: number;
}

interface PerformanceData {
  name: string;
  efficiency: number;
  satisfaction: number;
  growth: number;
}

const AdvancedAnalyticsDashboard: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalMatters: 0,
    activeContracts: 0,
    pendingReviews: 0,
    riskScore: 0,
    complianceRate: 0,
    revenueGrowth: 0
  });
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [loading, setLoading] = useState(true);

  // Mock data for charts
  const matterTrendData: TrendData[] = [
    { name: 'Jan', matters: 45, contracts: 23, reviews: 12 },
    { name: 'Feb', matters: 52, contracts: 28, reviews: 15 },
    { name: 'Mar', matters: 48, contracts: 25, reviews: 18 },
    { name: 'Apr', matters: 61, contracts: 32, reviews: 20 },
    { name: 'May', matters: 55, contracts: 29, reviews: 16 },
    { name: 'Jun', matters: 67, contracts: 35, reviews: 22 }
  ];

  const riskDistributionData: RiskData[] = [
    { name: 'Low Risk', value: 45, color: '#22c55e' },
    { name: 'Medium Risk', value: 35, color: '#f59e0b' },
    { name: 'High Risk', value: 15, color: '#ef4444' },
    { name: 'Critical Risk', value: 5, color: '#dc2626' }
  ];

  const performanceData: PerformanceData[] = [
    { name: 'Q1', efficiency: 78, satisfaction: 85, growth: 12 },
    { name: 'Q2', efficiency: 82, satisfaction: 88, growth: 15 },
    { name: 'Q3', efficiency: 85, satisfaction: 90, growth: 18 },
    { name: 'Q4', efficiency: 88, satisfaction: 92, growth: 22 }
  ];

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
          setAnalyticsData({
            totalMatters: 324,
            activeContracts: 187,
            pendingReviews: 42,
            riskScore: 7.8,
            complianceRate: 94.5,
            revenueGrowth: 18.2
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Failed to fetch analytics data:', error);
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [timeframe]);

  const StatCard: React.FC<{ title: string; value: string | number; trend?: string; icon: string }> = 
    ({ title, value, trend, icon }) => (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className={`text-sm ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
              {trend}
            </p>
          )}
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Advanced Analytics Dashboard</h2>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value as '7d' | '30d' | '90d' | '1y')}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="1y">Last year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Matters"
          value={analyticsData.totalMatters}
          trend="+12%"
          icon="⚖️"
        />
        <StatCard
          title="Active Contracts"
          value={analyticsData.activeContracts}
          trend="+8%"
          icon="📋"
        />
        <StatCard
          title="Pending Reviews"
          value={analyticsData.pendingReviews}
          trend="-5%"
          icon="⏳"
        />
        <StatCard
          title="Risk Score"
          value={`${analyticsData.riskScore}/10`}
          trend="+0.3"
          icon="⚠️"
        />
        <StatCard
          title="Compliance Rate"
          value={`${analyticsData.complianceRate}%`}
          trend="+1.2%"
          icon="✅"
        />
        <StatCard
          title="Revenue Growth"
          value={`${analyticsData.revenueGrowth}%`}
          trend="+4.1%"
          icon="📈"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Matter Trends */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Matter Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={matterTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="matters" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="contracts" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="reviews" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Distribution */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskDistributionData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {riskDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="efficiency" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
              <Area type="monotone" dataKey="satisfaction" stackId="1" stroke="#10b981" fill="#10b981" />
              <Area type="monotone" dataKey="growth" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Analysis */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={matterTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="matters" fill="#3b82f6" />
              <Bar dataKey="contracts" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Real-time Insights */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Powered Insights</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <span className="text-green-500 text-xl">💡</span>
            <p className="text-gray-700">
              Contract review efficiency has improved by 23% this quarter due to AI-assisted clause analysis.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-yellow-500 text-xl">⚠️</span>
            <p className="text-gray-700">
              High-risk matters have increased by 12% - consider implementing additional compliance checks.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-blue-500 text-xl">📊</span>
            <p className="text-gray-700">
              Client satisfaction scores are at an all-time high of 92%, with fastest turnaround times in litigation matters.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalyticsDashboard;
