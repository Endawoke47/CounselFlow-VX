import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Shield,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  User,
  Calendar,
  Eye,
  Edit,
  Plus,
  BarChart3,
  Download,
  Share2,
  BookOpen,
  Award,
  Target,
  Activity,
  Users,
  Settings,
  Bell
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
  RadialBarChart,
  RadialBar
} from 'recharts';
import { policiesData, type Policy } from '../data/demoData';

// Additional analytics data
const policyStatusData = [
  { name: 'Published', value: 67, count: 4, color: '#10B981' },
  { name: 'Review', value: 17, count: 1, color: '#F59E0B' },
  { name: 'Draft', value: 0, count: 0, color: '#6B7280' },
  { name: 'Approved', value: 0, count: 0, color: '#3B82F6' },
  { name: 'Archived', value: 16, count: 1, color: '#EF4444' }
];

const policyCategoryData = [
  { name: 'Legal', count: 2, coverage: 95 },
  { name: 'Compliance', count: 2, coverage: 90 },
  { name: 'Security', count: 1, coverage: 85 },
  { name: 'HR', count: 1, coverage: 80 }
];

const complianceFrameworkData = [
  { name: 'GDPR', policies: 2, compliance: 95 },
  { name: 'SOX', policies: 1, compliance: 90 },
  { name: 'ISO 27001', policies: 1, compliance: 88 },
  { name: 'CCPA', policies: 2, compliance: 92 },
  { name: 'FCPA', policies: 1, compliance: 85 }
];

const monthlyPolicyActivity = [
  { month: 'Jan', created: 2, updated: 3, reviewed: 4 },
  { month: 'Feb', created: 1, updated: 2, reviewed: 3 },
  { month: 'Mar', created: 1, updated: 4, reviewed: 2 },
  { month: 'Apr', created: 0, updated: 2, reviewed: 5 },
  { month: 'May', created: 1, updated: 3, reviewed: 3 },
  { month: 'Jun', created: 1, updated: 2, reviewed: 4 }
];

const riskLevelData = [
  { name: 'Critical', value: 33, count: 2, color: '#DC2626' },
  { name: 'High', value: 33, count: 2, color: '#EF4444' },
  { name: 'Medium', value: 17, count: 1, color: '#F59E0B' },
  { name: 'Low', value: 17, count: 1, color: '#10B981' }
];

const trainingCompletionData = [
  { name: 'Data Privacy Policy', completion: 95, required: 120, completed: 114 },
  { name: 'Security Policy', completion: 88, required: 100, completed: 88 },
  { name: 'Ethics Code', completion: 92, required: 150, completed: 138 },
  { name: 'Anti-Corruption', completion: 85, required: 80, completed: 68 }
];

const COLORS = ['#10B981', '#F59E0B', '#6B7280', '#3B82F6', '#EF4444', '#8B5CF6'];

const PolicyManagementEnhanced: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedView, setSelectedView] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'category' | 'risk' | 'name'>('date');

  // Filter and sort policies
  const filteredPolicies = useMemo(() => {
    const filtered = policiesData.filter(policy => {
      const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          policy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          policy.owner.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || policy.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || policy.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'category':
          return a.category.localeCompare(b.category);
        case 'risk': {
          const riskOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
          return riskOrder[b.riskLevel] - riskOrder[a.riskLevel];
        }
        case 'name':
          return a.title.localeCompare(b.title);
        case 'date':
        default:
          return b.lastUpdated.getTime() - a.lastUpdated.getTime();
      }
    });
  }, [searchTerm, selectedCategory, selectedStatus, sortBy]);

  const categories = ['All', ...Array.from(new Set(policiesData.map(policy => policy.category)))];
  const statuses = ['All', ...Array.from(new Set(policiesData.map(policy => policy.status)))];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'text-green-600 bg-green-100';
      case 'Approved': return 'text-blue-600 bg-blue-100';
      case 'Review': return 'text-yellow-600 bg-yellow-100';
      case 'Draft': return 'text-gray-600 bg-gray-100';
      case 'Archived': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'text-red-800 bg-red-200 border-red-300';
      case 'High': return 'text-red-600 bg-red-100 border-red-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'Low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const PolicyCard: React.FC<{ policy: Policy }> = ({ policy }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Shield className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 line-clamp-1">{policy.title}</h3>
            <p className="text-sm text-gray-500">{policy.category} • v{policy.version}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`text-xs px-2 py-1 rounded ${getStatusColor(policy.status)}`}>
            {policy.status}
          </span>
          <span className={`text-xs px-2 py-1 rounded border ${getRiskLevelColor(policy.riskLevel)}`}>
            {policy.riskLevel}
          </span>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{policy.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500">Effective Date</p>
          <p className="font-semibold text-blue-600">{policy.effectiveDate.toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Review Date</p>
          <p className="font-semibold text-yellow-600">{policy.reviewDate.toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Owner</p>
          <p className="font-semibold text-gray-900">{policy.owner}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Approver</p>
          <p className="font-semibold text-gray-900">{policy.approver}</p>
        </div>
      </div>

      {/* Applicability */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">Applicability</p>
        <div className="flex flex-wrap gap-1">
          {policy.applicability.slice(0, 2).map((app, index) => (
            <span key={index} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
              {app}
            </span>
          ))}
          {policy.applicability.length > 2 && (
            <span className="text-xs text-gray-500">+{policy.applicability.length - 2} more</span>
          )}
        </div>
      </div>

      {/* Compliance Frameworks */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">Compliance Frameworks</p>
        <div className="flex flex-wrap gap-1">
          {policy.complianceFramework.slice(0, 2).map((framework, index) => (
            <span key={index} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
              {framework}
            </span>
          ))}
          {policy.complianceFramework.length > 2 && (
            <span className="text-xs text-gray-500">+{policy.complianceFramework.length - 2} more</span>
          )}
        </div>
      </div>

      {/* Training & Acknowledgment Status */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-4">
          {policy.trainingRequired && (
            <span className="flex items-center space-x-1 text-blue-600">
              <BookOpen className="w-4 h-4" />
              <span>Training Required</span>
            </span>
          )}
          {policy.acknowledgmentRequired && (
            <span className="flex items-center space-x-1 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span>Acknowledgment Required</span>
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span className="flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>Updated: {policy.lastUpdated.toLocaleDateString()}</span>
        </span>
        <span className="flex items-center space-x-1">
          <FileText className="w-4 h-4" />
          <span>{policy.attachments} attachments</span>
        </span>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
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
            <Download className="w-4 h-4" />
            <span className="text-sm">Download</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-1 text-purple-600 hover:text-purple-700"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-sm">Share</span>
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
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Policy Management</h1>
              <p className="mt-2 text-gray-600">Manage organizational policies, compliance frameworks, and governance</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>New Policy</span>
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
                <p className="text-gray-500 text-sm">Total Policies</p>
                <p className="text-3xl font-bold text-gray-900">{policiesData.length}</p>
                <p className="text-green-600 text-sm mt-1">
                  {policiesData.filter(p => p.status === 'Published').length} published
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600" />
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
                <p className="text-gray-500 text-sm">Due for Review</p>
                <p className="text-3xl font-bold text-gray-900">
                  {policiesData.filter(p => p.reviewDate < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).length}
                </p>
                <p className="text-yellow-600 text-sm mt-1">Next 30 days</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
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
                <p className="text-gray-500 text-sm">Critical/High Risk</p>
                <p className="text-3xl font-bold text-gray-900">
                  {policiesData.filter(p => p.riskLevel === 'Critical' || p.riskLevel === 'High').length}
                </p>
                <p className="text-red-600 text-sm mt-1">Require attention</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
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
                <p className="text-gray-500 text-sm">Compliance Coverage</p>
                <p className="text-3xl font-bold text-gray-900">94%</p>
                <p className="text-green-600 text-sm mt-1">Excellent coverage</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Target className="w-6 h-6 text-green-600" />
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Policy Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChartComponent>
                <Pie
                  data={policyStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {policyStatusData.map((entry, index) => (
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Policies by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={policyCategoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" name="Count" />
                <Bar dataKey="coverage" fill="#10B981" name="Coverage %" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Compliance Framework Coverage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Framework Coverage</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={complianceFrameworkData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="policies" fill="#8B5CF6" name="Policies" />
              <Line yAxisId="right" type="monotone" dataKey="compliance" stroke="#10B981" strokeWidth={3} name="Compliance %" />
            </ComposedChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Training Completion Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Training Completion Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trainingCompletionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value, name) => 
                name === 'completion' ? [`${value}%`, 'Completion Rate'] : [value, name]
              } />
              <Bar dataKey="required" fill="#E5E7EB" name="Required" />
              <Bar dataKey="completed" fill="#10B981" name="Completed" />
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
                  placeholder="Search policies, descriptions, owners..."
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
                onChange={(e) => setSortBy(e.target.value as 'date' | 'category' | 'risk' | 'name')}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="date">Last Updated</option>
                <option value="category">Category</option>
                <option value="risk">Risk Level</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredPolicies.length} of {policiesData.length} policies
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

        {/* Policies Grid */}
        <div className={`grid gap-6 ${selectedView === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {filteredPolicies.map((policy) => (
            <PolicyCard key={policy.id} policy={policy} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PolicyManagementEnhanced;
