import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Scale,
  Gavel,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  User,
  Calendar,
  Eye,
  Edit,
  Plus,
  BarChart3,
  FileText,
  Target,
  Award,
  Activity,
  Shield,
  CheckCircle,
  XCircle,
  AlertCircle,
  Building
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
  Area,
  AreaChart,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { disputesData, type Dispute } from '../data/demoData';

// Additional analytics data
const disputeStatusData = [
  { name: 'Litigation', value: 25, count: 1, color: '#EF4444' },
  { name: 'Mediation', value: 25, count: 1, color: '#F59E0B' },
  { name: 'Investigation', value: 25, count: 1, color: '#3B82F6' },
  { name: 'Arbitration', value: 25, count: 1, color: '#8B5CF6' }
];

const disputeTypeData = [
  { name: 'IP', cases: 1, value: 2500000, avgCost: 375000 },
  { name: 'Employment', cases: 1, value: 450000, avgCost: 125000 },
  { name: 'Regulatory', cases: 1, value: 850000, avgCost: 89000 },
  { name: 'Contract', cases: 1, value: 320000, avgCost: 67000 }
];

const monthlyDisputeTrend = [
  { month: 'Jan', newCases: 2, resolved: 1, costs: 45000 },
  { month: 'Feb', newCases: 1, resolved: 0, costs: 67000 },
  { month: 'Mar', newCases: 1, resolved: 2, costs: 89000 },
  { month: 'Apr', newCases: 1, resolved: 1, costs: 125000 },
  { month: 'May', newCases: 0, resolved: 0, costs: 156000 },
  { month: 'Jun', newCases: 1, resolved: 1, costs: 178000 }
];

const resolutionProbabilityData = [
  { range: '0-25%', count: 0, avgCost: 0 },
  { range: '26-50%', count: 1, avgCost: 125000 },
  { range: '51-75%', count: 2, avgCost: 178000 },
  { range: '76-100%', count: 1, avgCost: 125000 }
];

const riskScoreDistribution = [
  { range: '0-25', count: 0, severity: 'Low' },
  { range: '26-50', count: 1, severity: 'Medium' },
  { range: '51-75', count: 2, severity: 'High' },
  { range: '76-100', count: 1, severity: 'Critical' }
];

const COLORS = ['#EF4444', '#F59E0B', '#3B82F6', '#8B5CF6', '#10B981', '#06B6D4'];

const DisputeResolutionEnhanced: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedView, setSelectedView] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'value' | 'date' | 'risk' | 'status'>('value');

  // Filter and sort disputes
  const filteredDisputes = useMemo(() => {
    const filtered = disputesData.filter(dispute => {
      const matchesSearch = dispute.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dispute.plaintiff.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dispute.defendant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dispute.assignedCounsel.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'All' || dispute.status === selectedStatus;
      const matchesType = selectedType === 'All' || dispute.type === selectedType;
      
      return matchesSearch && matchesStatus && matchesType;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return b.filingDate.getTime() - a.filingDate.getTime();
        case 'risk':
          return b.riskScore - a.riskScore;
        case 'status':
          return a.status.localeCompare(b.status);
        case 'value':
        default:
          return b.estimatedValue - a.estimatedValue;
      }
    });
  }, [searchTerm, selectedStatus, selectedType, sortBy]);

  const statuses = ['All', ...Array.from(new Set(disputesData.map(dispute => dispute.status)))];
  const types = ['All', ...Array.from(new Set(disputesData.map(dispute => dispute.type)))];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Investigation': return 'text-blue-600 bg-blue-100';
      case 'Mediation': return 'text-yellow-600 bg-yellow-100';
      case 'Arbitration': return 'text-purple-600 bg-purple-100';
      case 'Litigation': return 'text-red-600 bg-red-100';
      case 'Settled': return 'text-green-600 bg-green-100';
      case 'Closed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'text-red-800 bg-red-200 border-red-300';
      case 'High': return 'text-red-600 bg-red-100 border-red-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'Low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const DisputeCard: React.FC<{ dispute: Dispute }> = ({ dispute }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <Scale className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 line-clamp-1">{dispute.title}</h3>
            <p className="text-sm text-gray-500">{dispute.type} • {dispute.jurisdiction}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`text-xs px-2 py-1 rounded ${getStatusColor(dispute.status)}`}>
            {dispute.status}
          </span>
          <span className={`text-xs px-2 py-1 rounded border ${getPriorityColor(dispute.priority)}`}>
            {dispute.priority}
          </span>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{dispute.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500">Estimated Value</p>
          <p className="font-semibold text-blue-600">${dispute.estimatedValue.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Actual Cost</p>
          <p className="font-semibold text-red-600">${dispute.actualCost.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Risk Score</p>
          <p className={`font-semibold ${
            dispute.riskScore >= 75 ? 'text-red-600' :
            dispute.riskScore >= 50 ? 'text-yellow-600' : 'text-green-600'
          }`}>
            {dispute.riskScore}%
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Resolution Probability</p>
          <p className="font-semibold text-green-600">{dispute.resolutionProbability}%</p>
        </div>
      </div>

      {/* Risk Score Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-500">Risk Level</span>
          <span className="text-gray-700">{dispute.riskScore}/100</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              dispute.riskScore >= 75 ? 'bg-red-600' :
              dispute.riskScore >= 50 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${dispute.riskScore}%` }}
          />
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Plaintiff:</span>
          <span className="text-gray-900">{dispute.plaintiff}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Defendant:</span>
          <span className="text-gray-900">{dispute.defendant}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Assigned Counsel:</span>
          <span className="text-gray-900">{dispute.assignedCounsel}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span className="flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>Filed: {dispute.filingDate.toLocaleDateString()}</span>
        </span>
        {dispute.nextHearing && (
          <span className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>Next: {dispute.nextHearing.toLocaleDateString()}</span>
          </span>
        )}
      </div>

      <div className="border-t border-gray-100 pt-4">
        <p className="text-sm text-gray-600 mb-3">
          <strong>Predicted Outcome:</strong> {dispute.predictedOutcome}
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
              <Gavel className="w-4 h-4" />
              <span className="text-sm">Case Files</span>
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dispute Resolution</h1>
              <p className="mt-2 text-gray-600">Manage legal disputes, litigation, and alternative resolution processes</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>New Dispute</span>
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
                <p className="text-gray-500 text-sm">Active Disputes</p>
                <p className="text-3xl font-bold text-gray-900">{disputesData.length}</p>
                <p className="text-red-600 text-sm mt-1">
                  {disputesData.filter(d => d.status === 'Litigation').length} in litigation
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <Scale className="w-6 h-6 text-red-600" />
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
                <p className="text-gray-500 text-sm">Total Exposure</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${disputesData.reduce((sum, dispute) => sum + dispute.estimatedValue, 0).toLocaleString()}
                </p>
                <p className="text-blue-600 text-sm mt-1">Estimated liability</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
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
                <p className="text-gray-500 text-sm">Legal Costs</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${disputesData.reduce((sum, dispute) => sum + dispute.actualCost, 0).toLocaleString()}
                </p>
                <p className="text-green-600 text-sm mt-1">YTD spend</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
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
                <p className="text-gray-500 text-sm">Avg Resolution Rate</p>
                <p className="text-3xl font-bold text-gray-900">
                  {(disputesData.reduce((sum, dispute) => sum + dispute.resolutionProbability, 0) / disputesData.length).toFixed(0)}%
                </p>
                <p className="text-purple-600 text-sm mt-1">Success probability</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Target className="w-6 h-6 text-purple-600" />
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Disputes by Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChartComponent>
                <Pie
                  data={disputeStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {disputeStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Disputes by Type</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={disputeTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value, name) => 
                  name === 'cases' ? [value, 'Cases'] : [`$${Number(value).toLocaleString()}`, name]
                } />
                <Bar dataKey="cases" fill="#3B82F6" name="Cases" />
                <Bar dataKey="avgCost" fill="#10B981" name="Avg Cost" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Monthly Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Dispute Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={monthlyDisputeTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip formatter={(value, name) => 
                name === 'costs' ? [`$${Number(value).toLocaleString()}`, 'Legal Costs'] : [value, name]
              } />
              <Bar yAxisId="left" dataKey="newCases" fill="#EF4444" name="New Cases" />
              <Bar yAxisId="left" dataKey="resolved" fill="#10B981" name="Resolved" />
              <Line yAxisId="right" type="monotone" dataKey="costs" stroke="#8B5CF6" strokeWidth={3} name="Legal Costs" />
            </ComposedChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Risk Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Score Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={riskScoreDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search disputes, parties, counsel..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
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
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'value' | 'date' | 'risk' | 'status')}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="value">Value</option>
                <option value="date">Filing Date</option>
                <option value="risk">Risk Score</option>
                <option value="status">Status</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredDisputes.length} of {disputesData.length} disputes
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
          </div>
        </div>

        {/* Disputes Grid */}
        <div className={`grid gap-6 ${selectedView === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {filteredDisputes.map((dispute) => (
            <DisputeCard key={dispute.id} dispute={dispute} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisputeResolutionEnhanced;
