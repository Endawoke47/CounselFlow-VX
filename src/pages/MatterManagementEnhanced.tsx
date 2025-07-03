import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Scale,
  Users,
  DollarSign,
  Clock,
  AlertTriangle,
  Filter,
  Calendar,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  Plus,
  BarChart3,
  FileText,
  Target,
  Award,
  Activity,
  PieChart,
  User
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
  RadialBar,
  Legend
} from 'recharts';
import { mattersData, type Matter } from '../data/demoData';

// Additional analytics data
const matterStatusData = [
  { name: 'Active', value: 65, count: 13 },
  { name: 'On Hold', value: 15, count: 3 },
  { name: 'Closed', value: 20, count: 4 }
];

const matterTypeData = [
  { name: 'IP', value: 35, budget: 450000, actual: 127500 },
  { name: 'M&A', value: 25, budget: 275000, actual: 89200 },
  { name: 'Employment', value: 20, budget: 125000, actual: 34750 },
  { name: 'Regulatory', value: 15, budget: 180000, actual: 67300 },
  { name: 'Litigation', value: 5, budget: 95000, actual: 23100 }
];

const monthlySpendData = [
  { month: 'Jan', budget: 120000, actual: 95000, matters: 15 },
  { month: 'Feb', budget: 135000, actual: 128000, matters: 17 },
  { month: 'Mar', budget: 150000, actual: 142000, matters: 18 },
  { month: 'Apr', budget: 145000, actual: 138000, matters: 19 },
  { month: 'May', budget: 160000, actual: 155000, matters: 20 },
  { month: 'Jun', budget: 175000, actual: 168000, matters: 20 }
];

const riskDistributionData = [
  { range: '0-25', count: 3, color: '#10B981' },
  { range: '26-50', count: 6, color: '#F59E0B' },
  { range: '51-75', count: 8, color: '#EF4444' },
  { range: '76-100', count: 3, color: '#7C2D12' }
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

const MatterManagementEnhanced: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedView, setSelectedView] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'budget' | 'risk' | 'status'>('date');

  // Filter and sort matters
  const filteredMatters = useMemo(() => {
    const filtered = mattersData.filter(matter => {
      const matchesSearch = matter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          matter.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          matter.leadAttorney.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'All' || matter.status === selectedStatus;
      const matchesType = selectedType === 'All' || matter.matterType === selectedType;
      
      return matchesSearch && matchesStatus && matchesType;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'budget':
          return b.budget - a.budget;
        case 'risk':
          return b.riskLevel - a.riskLevel;
        case 'status':
          return a.status.localeCompare(b.status);
        case 'date':
        default:
          return b.startDate.getTime() - a.startDate.getTime();
      }
    });
  }, [searchTerm, selectedStatus, selectedType, sortBy]);

  const statuses = ['All', ...Array.from(new Set(mattersData.map(matter => matter.status)))];
  const types = ['All', ...Array.from(new Set(mattersData.map(matter => matter.matterType)))];

  const getRiskColor = (riskLevel: number) => {
    if (riskLevel <= 25) return 'text-green-600 bg-green-100';
    if (riskLevel <= 50) return 'text-yellow-600 bg-yellow-100';
    if (riskLevel <= 75) return 'text-red-600 bg-red-100';
    return 'text-red-800 bg-red-200';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-100';
      case 'On Hold': return 'text-yellow-600 bg-yellow-100';
      case 'Closed': return 'text-gray-600 bg-gray-100';
      case 'Pending': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const MatterCard: React.FC<{ matter: Matter }> = ({ matter }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Scale className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 line-clamp-1">{matter.title}</h3>
            <p className="text-sm text-gray-500">{matter.matterType} • {matter.client}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`text-xs px-2 py-1 rounded ${getStatusColor(matter.status)}`}>
            {matter.status}
          </span>
          <span className={`text-xs px-2 py-1 rounded ${getRiskColor(matter.riskLevel)}`}>
            {matter.riskLevel}% risk
          </span>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{matter.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500">Budget</p>
          <p className="font-semibold text-green-600">${matter.budget.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Actual Spend</p>
          <p className="font-semibold text-blue-600">${matter.actualSpend.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Utilization</p>
          <p className="font-semibold text-purple-600">
            {((matter.actualSpend / matter.budget) * 100).toFixed(1)}%
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Billable Hours</p>
          <p className="font-semibold text-gray-900">{matter.billableHours}</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1">
            <User className="w-4 h-4" />
            <span>{matter.leadAttorney}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{matter.team.length} members</span>
          </span>
        </div>
        <span className="flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>{matter.startDate.toLocaleDateString()}</span>
        </span>
      </div>

      {/* Progress bar for milestones */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-500">Milestones Progress</span>
          <span className="text-gray-700">
            {matter.milestones.filter(m => m.status === 'Completed').length}/{matter.milestones.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{
              width: `${(matter.milestones.filter(m => m.status === 'Completed').length / matter.milestones.length) * 100}%`
            }}
          />
        </div>
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
            <DollarSign className="w-4 h-4" />
            <span className="text-sm">Billing</span>
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
              <h1 className="text-3xl font-bold text-gray-900">Matter Management</h1>
              <p className="mt-2 text-gray-600">Track and manage legal matters, budgets, and outcomes</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>New Matter</span>
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
                <p className="text-gray-500 text-sm">Active Matters</p>
                <p className="text-3xl font-bold text-gray-900">
                  {mattersData.filter(m => m.status === 'Active').length}
                </p>
                <p className="text-green-600 text-sm mt-1">↗ 15% from last month</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Scale className="w-6 h-6 text-blue-600" />
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
                <p className="text-gray-500 text-sm">Total Budget</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${mattersData.reduce((sum, matter) => sum + matter.budget, 0).toLocaleString()}
                </p>
                <p className="text-green-600 text-sm mt-1">↗ 8% allocated</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
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
                <p className="text-gray-500 text-sm">Total Spend</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${mattersData.reduce((sum, matter) => sum + matter.actualSpend, 0).toLocaleString()}
                </p>
                <p className="text-red-600 text-sm mt-1">
                  {((mattersData.reduce((sum, matter) => sum + matter.actualSpend, 0) / 
                     mattersData.reduce((sum, matter) => sum + matter.budget, 0)) * 100).toFixed(1)}% of budget
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
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
                <p className="text-gray-500 text-sm">Avg Risk Level</p>
                <p className="text-3xl font-bold text-gray-900">
                  {(mattersData.reduce((sum, matter) => sum + matter.riskLevel, 0) / mattersData.length).toFixed(0)}%
                </p>
                <p className="text-yellow-600 text-sm mt-1">Medium risk</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Matter Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChartComponent>
                <Pie
                  data={matterStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {matterStatusData.map((entry, index) => (
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget vs Actual Spend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={matterTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, '']} />
                <Bar dataKey="budget" fill="#3B82F6" name="Budget" />
                <Bar dataKey="actual" fill="#10B981" name="Actual" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Monthly Spend Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Spend Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={monthlySpendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip formatter={(value, name) => 
                name === 'matters' ? [value, 'Active Matters'] : [`$${Number(value).toLocaleString()}`, name]
              } />
              <Bar yAxisId="left" dataKey="budget" fill="#E5E7EB" name="Budget" />
              <Bar yAxisId="left" dataKey="actual" fill="#3B82F6" name="Actual Spend" />
              <Line yAxisId="right" type="monotone" dataKey="matters" stroke="#10B981" strokeWidth={3} name="Active Matters" />
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={riskDistributionData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="range" type="category" />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
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
                  placeholder="Search matters, clients, attorneys..."
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
                onChange={(e) => setSortBy(e.target.value as 'date' | 'budget' | 'risk' | 'status')}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="date">Date</option>
                <option value="budget">Budget</option>
                <option value="risk">Risk Level</option>
                <option value="status">Status</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredMatters.length} of {mattersData.length} matters
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

        {/* Matters Grid */}
        <div className={`grid gap-6 ${selectedView === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {filteredMatters.map((matter) => (
            <MatterCard key={matter.id} matter={matter} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatterManagementEnhanced;
