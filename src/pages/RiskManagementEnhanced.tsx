import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  AlertTriangle,
  Shield,
  TrendingUp,
  TrendingDown,
  Filter,
  Calendar,
  User,
  Eye,
  Edit,
  Plus,
  BarChart3,
  FileText,
  Target,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as PieChartComponent,
  Pie,
  Cell,
  ComposedChart,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  AreaChart,
  Area
} from 'recharts';
import { risksData, type Risk } from '../data/demoData';

// Additional analytics data
const riskCategoryData = [
  { name: 'Contractual', value: 30, count: 6, severity: 'High' },
  { name: 'Regulatory', value: 25, count: 5, severity: 'Medium' },
  { name: 'Litigation', value: 20, count: 4, severity: 'Low' },
  { name: 'IP', value: 15, count: 3, severity: 'Medium' },
  { name: 'Operational', value: 10, count: 2, severity: 'High' }
];

const riskMatrixData = [
  { impact: 'Low', probability: 'Low', count: 2, risks: ['Minor compliance gap'] },
  { impact: 'Medium', probability: 'Low', count: 3, risks: ['Patent portfolio gaps'] },
  { impact: 'High', probability: 'Low', count: 2, risks: ['Class action exposure'] },
  { impact: 'Low', probability: 'Medium', count: 1, risks: ['Minor regulatory change'] },
  { impact: 'Medium', probability: 'Medium', count: 4, risks: ['GDPR compliance', 'Contract disputes'] },
  { impact: 'High', probability: 'Medium', count: 3, risks: ['Regulatory change impact'] },
  { impact: 'Low', probability: 'High', count: 1, risks: ['Minor vendor issue'] },
  { impact: 'Medium', probability: 'High', count: 2, risks: ['Staff turnover'] },
  { impact: 'High', probability: 'High', count: 2, risks: ['Major vendor dependency'] }
];

const monthlyRiskTrendData = [
  { month: 'Jan', identified: 12, mitigated: 8, closed: 5, open: 15 },
  { month: 'Feb', identified: 15, mitigated: 10, closed: 7, open: 18 },
  { month: 'Mar', identified: 18, mitigated: 12, closed: 9, open: 20 },
  { month: 'Apr', identified: 16, mitigated: 14, closed: 11, open: 18 },
  { month: 'May', identified: 20, mitigated: 16, closed: 13, open: 20 },
  { month: 'Jun', identified: 22, mitigated: 18, closed: 15, open: 20 }
];

const riskSeverityDistribution = [
  { name: 'Critical', value: 15, count: 3, color: '#DC2626' },
  { name: 'High', value: 35, count: 7, color: '#EF4444' },
  { name: 'Medium', value: 40, count: 8, color: '#F59E0B' },
  { name: 'Low', value: 10, count: 2, color: '#10B981' }
];

const radarData = [
  { subject: 'Contractual', A: 120, B: 110, fullMark: 150 },
  { subject: 'Regulatory', A: 98, B: 130, fullMark: 150 },
  { subject: 'Litigation', A: 86, B: 130, fullMark: 150 },
  { subject: 'IP', A: 99, B: 100, fullMark: 150 },
  { subject: 'Operational', A: 85, B: 90, fullMark: 150 },
  { subject: 'Financial', A: 65, B: 85, fullMark: 150 }
];

const COLORS = ['#DC2626', '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6'];

const RiskManagementEnhanced: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedView, setSelectedView] = useState<'grid' | 'list' | 'matrix'>('grid');
  const [sortBy, setSortBy] = useState<'risk' | 'date' | 'impact' | 'probability'>('risk');

  // Filter and sort risks
  const filteredRisks = useMemo(() => {
    const filtered = risksData.filter(risk => {
      const matchesSearch = risk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          risk.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          risk.owner.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || risk.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || risk.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'impact':
          return b.impactScore - a.impactScore;
        case 'probability':
          return b.probabilityScore - a.probabilityScore;
        case 'date':
          return b.reviewDate.getTime() - a.reviewDate.getTime();
        case 'risk':
        default:
          return b.residualRisk - a.residualRisk;
      }
    });
  }, [searchTerm, selectedCategory, selectedStatus, sortBy]);

  const categories = ['All', ...Array.from(new Set(risksData.map(risk => risk.category)))];
  const statuses = ['All', ...Array.from(new Set(risksData.map(risk => risk.status)))];

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'text-red-800 bg-red-200 border-red-300';
      case 'High': return 'text-red-600 bg-red-100 border-red-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'Low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'text-red-600 bg-red-100';
      case 'Mitigated': return 'text-yellow-600 bg-yellow-100';
      case 'Closed': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const RiskCard: React.FC<{ risk: Risk }> = ({ risk }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${getRiskLevelColor(risk.overallLevel).replace('text-', 'text-').replace('bg-', 'bg-')}`}>
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 line-clamp-1">{risk.title}</h3>
            <p className="text-sm text-gray-500">{risk.category}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`text-xs px-2 py-1 rounded border ${getRiskLevelColor(risk.overallLevel)}`}>
            {risk.overallLevel}
          </span>
          <span className={`text-xs px-2 py-1 rounded ${getStatusColor(risk.status)}`}>
            {risk.status}
          </span>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{risk.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500">Probability</p>
          <div className="flex items-center space-x-2">
            <p className="font-semibold text-blue-600">{risk.probability}</p>
            <span className="text-xs text-gray-500">({risk.probabilityScore}/10)</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-500">Impact</p>
          <div className="flex items-center space-x-2">
            <p className="font-semibold text-red-600">{risk.impact}</p>
            <span className="text-xs text-gray-500">({risk.impactScore}/10)</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-500">Residual Risk</p>
          <p className="font-semibold text-purple-600">{risk.residualRisk}%</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Review Date</p>
          <p className="font-semibold text-gray-900">{risk.reviewDate.toLocaleDateString()}</p>
        </div>
      </div>

      {/* Risk Score Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-500">Risk Score</span>
          <span className="text-gray-700">{risk.residualRisk}/100</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              risk.residualRisk >= 75 ? 'bg-red-600' :
              risk.residualRisk >= 50 ? 'bg-yellow-500' :
              risk.residualRisk >= 25 ? 'bg-blue-500' : 'bg-green-500'
            }`}
            style={{ width: `${risk.residualRisk}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span className="flex items-center space-x-1">
          <User className="w-4 h-4" />
          <span>{risk.owner}</span>
        </span>
        <span className="flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>Due {risk.reviewDate.toLocaleDateString()}</span>
        </span>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <p className="text-sm text-gray-600 mb-3">
          <strong>Mitigation:</strong> {risk.mitigation}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
            >
              <Eye className="w-4 h-4" />
              <span className="text-sm">View</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-1 text-green-600 hover:text-green-700"
            >
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Mitigate</span>
            </motion.button>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-1 text-gray-600 hover:text-gray-700"
          >
            <Edit className="w-4 h-4" />
            <span className="text-sm">Edit</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  const RiskMatrix: React.FC = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Risk Assessment Matrix</h3>
      <div className="grid grid-cols-4 gap-2">
        {/* Headers */}
        <div className="text-center font-medium text-gray-700"></div>
        <div className="text-center font-medium text-gray-700">Low Impact</div>
        <div className="text-center font-medium text-gray-700">Medium Impact</div>
        <div className="text-center font-medium text-gray-700">High Impact</div>
        
        {/* High Probability */}
        <div className="text-right font-medium text-gray-700 py-4">High<br/>Probability</div>
        <div className="bg-yellow-100 border-2 border-yellow-300 p-4 rounded-lg text-center">
          <span className="font-bold text-yellow-800">3</span>
          <div className="text-xs text-yellow-700 mt-1">Low-Medium</div>
        </div>
        <div className="bg-red-100 border-2 border-red-300 p-4 rounded-lg text-center">
          <span className="font-bold text-red-800">6</span>
          <div className="text-xs text-red-700 mt-1">Medium-High</div>
        </div>
        <div className="bg-red-200 border-2 border-red-400 p-4 rounded-lg text-center">
          <span className="font-bold text-red-900">9</span>
          <div className="text-xs text-red-800 mt-1">High-Critical</div>
        </div>
        
        {/* Medium Probability */}
        <div className="text-right font-medium text-gray-700 py-4">Medium<br/>Probability</div>
        <div className="bg-green-100 border-2 border-green-300 p-4 rounded-lg text-center">
          <span className="font-bold text-green-800">2</span>
          <div className="text-xs text-green-700 mt-1">Low</div>
        </div>
        <div className="bg-yellow-100 border-2 border-yellow-300 p-4 rounded-lg text-center">
          <span className="font-bold text-yellow-800">4</span>
          <div className="text-xs text-yellow-700 mt-1">Medium</div>
        </div>
        <div className="bg-red-100 border-2 border-red-300 p-4 rounded-lg text-center">
          <span className="font-bold text-red-800">6</span>
          <div className="text-xs text-red-700 mt-1">Medium-High</div>
        </div>
        
        {/* Low Probability */}
        <div className="text-right font-medium text-gray-700 py-4">Low<br/>Probability</div>
        <div className="bg-green-100 border-2 border-green-300 p-4 rounded-lg text-center">
          <span className="font-bold text-green-800">1</span>
          <div className="text-xs text-green-700 mt-1">Low</div>
        </div>
        <div className="bg-green-100 border-2 border-green-300 p-4 rounded-lg text-center">
          <span className="font-bold text-green-800">2</span>
          <div className="text-xs text-green-700 mt-1">Low</div>
        </div>
        <div className="bg-yellow-100 border-2 border-yellow-300 p-4 rounded-lg text-center">
          <span className="font-bold text-yellow-800">3</span>
          <div className="text-xs text-yellow-700 mt-1">Low-Medium</div>
        </div>
      </div>
      
      <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-200 border border-green-300 rounded"></div>
          <span>Low Risk</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-200 border border-yellow-300 rounded"></div>
          <span>Medium Risk</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-200 border border-red-300 rounded"></div>
          <span>High Risk</span>
        </div>
      </div>
    </div>
  );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Risk Management</h1>
              <p className="mt-2 text-gray-600">Identify, assess, and mitigate organizational risks</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Risk</span>
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Risks</p>
                <p className="text-3xl font-bold text-gray-900">{risksData.length}</p>
                <p className="text-red-600 text-sm mt-1">
                  {risksData.filter(r => r.status === 'Open').length} open
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Critical Risks</p>
                <p className="text-3xl font-bold text-gray-900">
                  {risksData.filter(r => r.overallLevel === 'Critical').length}
                </p>
                <p className="text-red-600 text-sm mt-1">Immediate attention</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Mitigated Risks</p>
                <p className="text-3xl font-bold text-gray-900">
                  {risksData.filter(r => r.status === 'Mitigated').length}
                </p>
                <p className="text-green-600 text-sm mt-1">
                  {((risksData.filter(r => r.status === 'Mitigated').length / risksData.length) * 100).toFixed(0)}% of total
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Avg Risk Score</p>
                <p className="text-3xl font-bold text-gray-900">
                  {(risksData.reduce((sum, risk) => sum + risk.residualRisk, 0) / risksData.length).toFixed(0)}
                </p>
                <p className="text-yellow-600 text-sm mt-1">Medium level</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Target className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChartComponent>
                <Pie
                  data={riskCategoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {riskCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChartComponent>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Severity Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskSeverityDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

        {/* Risk Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Management Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyRiskTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="identified" stackId="1" stroke="#3B82F6" fill="#3B82F6" />
              <Area type="monotone" dataKey="mitigated" stackId="1" stroke="#10B981" fill="#10B981" />
              <Area type="monotone" dataKey="closed" stackId="1" stroke="#6B7280" fill="#6B7280" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Risk Assessment Matrix - Show when matrix view is selected */}
        {selectedView === 'matrix' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-8"
          >
            <RiskMatrix />
          </motion.div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search risks, descriptions, owners..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'risk' | 'date' | 'impact' | 'probability')}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="risk">Risk Score</option>
                <option value="date">Review Date</option>
                <option value="impact">Impact</option>
                <option value="probability">Probability</option>
              </select>
            </div>
          </div>
        </div>

        {/* View Toggle and Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredRisks.length} of {risksData.length} risks
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelectedView('grid')}
              className={`p-2 rounded-lg ${selectedView === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
            >
              <BarChart3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSelectedView('list')}
              className={`p-2 rounded-lg ${selectedView === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
            >
              <FileText className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSelectedView('matrix')}
              className={`p-2 rounded-lg ${selectedView === 'matrix' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
            >
              <Target className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Risks Grid - Hide when matrix view is selected */}
        {/* Risk List or Matrix */}
        {selectedView !== 'matrix' && (
          <div className={`grid gap-6 ${selectedView === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredRisks.map((risk) => (
              <RiskCard key={risk.id} risk={risk} />
            ))}
          </div>
        )}
        
        {/* Risk Assessment Matrix - Show when matrix view is selected */}
        {selectedView === 'matrix' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-8"
          >
            <RiskMatrix />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RiskManagementEnhanced;
