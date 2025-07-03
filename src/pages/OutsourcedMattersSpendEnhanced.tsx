import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  DollarSign,
  Building,
  TrendingUp,
  TrendingDown,
  Star,
  Filter,
  Calendar,
  User,
  Eye,
  Edit,
  Plus,
  BarChart3,
  FileText,
  CreditCard,
  Clock,
  Award,
  Users,
  Target,
  Activity,
  AlertCircle,
  CheckCircle
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
  RadialBarChart,
  RadialBar
} from 'recharts';
import { vendorsData, type Vendor } from '../data/demoData';

// Additional analytics data
const spendByPracticeArea = [
  { name: 'IP Litigation', spend: 289450, budget: 350000, vendors: 3 },
  { name: 'Corporate', spend: 156800, budget: 200000, vendors: 2 },
  { name: 'Regulatory', spend: 94500, budget: 120000, vendors: 1 },
  { name: 'Employment', spend: 67200, budget: 90000, vendors: 1 },
  { name: 'M&A', spend: 45600, budget: 80000, vendors: 2 }
];

const monthlySpendTrend = [
  { month: 'Jan', budget: 95000, actual: 87000, vendors: 4 },
  { month: 'Feb', budget: 98000, actual: 92000, vendors: 4 },
  { month: 'Mar', budget: 105000, actual: 98000, vendors: 5 },
  { month: 'Apr', budget: 110000, actual: 105000, vendors: 5 },
  { month: 'May', budget: 115000, actual: 108000, vendors: 6 },
  { month: 'Jun', budget: 120000, actual: 112000, vendors: 6 }
];

const vendorPerformanceData = [
  { name: 'Patterson & Associates', performance: 4.8, spend: 289450, value: 96 },
  { name: 'Global Corporate Services', performance: 4.2, spend: 67200, value: 84 },
  { name: 'Innovation IP Counsel', performance: 4.5, spend: 156800, value: 90 },
  { name: 'Regulatory Compliance Advisors', performance: 4.7, spend: 94500, value: 94 }
];

const relationshipDistribution = [
  { name: 'Preferred', value: 50, count: 2, color: '#10B981' },
  { name: 'Panel', value: 25, count: 1, color: '#3B82F6' },
  { name: 'Specialty', value: 25, count: 1, color: '#8B5CF6' }
];

const budgetUtilization = [
  { name: 'IP Litigation', utilization: 82.7 },
  { name: 'Corporate', utilization: 78.4 },
  { name: 'Regulatory', utilization: 78.8 },
  { name: 'Employment', utilization: 74.7 },
  { name: 'M&A', utilization: 57.0 }
];

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4'];

const OutsourcedMattersSpendEnhanced: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRelationship, setSelectedRelationship] = useState('All');
  const [selectedPracticeArea, setSelectedPracticeArea] = useState('All');
  const [selectedView, setSelectedView] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'spend' | 'performance' | 'budget' | 'name'>('spend');

  // Filter and sort vendors
  const filteredVendors = useMemo(() => {
    const filtered = vendorsData.filter(vendor => {
      const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vendor.practiceAreas.some(area => area.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesRelationship = selectedRelationship === 'All' || vendor.relationship === selectedRelationship;
      const matchesPracticeArea = selectedPracticeArea === 'All' || 
                                  vendor.practiceAreas.some(area => area.includes(selectedPracticeArea));
      
      return matchesSearch && matchesRelationship && matchesPracticeArea;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'performance':
          return b.performanceRating - a.performanceRating;
        case 'budget':
          return b.annualBudget - a.annualBudget;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'spend':
        default:
          return b.totalSpend - a.totalSpend;
      }
    });
  }, [searchTerm, selectedRelationship, selectedPracticeArea, sortBy]);

  const relationships = ['All', ...Array.from(new Set(vendorsData.map(vendor => vendor.relationship)))];
  const practiceAreas = ['All', ...Array.from(new Set(vendorsData.flatMap(vendor => vendor.practiceAreas)))];

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case 'Preferred': return 'text-green-600 bg-green-100';
      case 'Panel': return 'text-blue-600 bg-blue-100';
      case 'Specialty': return 'text-purple-600 bg-purple-100';
      case 'Occasional': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPerformanceColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const VendorCard: React.FC<{ vendor: Vendor }> = ({ vendor }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Building className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 line-clamp-1">{vendor.name}</h3>
            <p className="text-sm text-gray-500">{vendor.practiceAreas.join(', ')}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`text-xs px-2 py-1 rounded ${getRelationshipColor(vendor.relationship)}`}>
            {vendor.relationship}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className={`text-sm font-medium ${getPerformanceColor(vendor.performanceRating)}`}>
              {vendor.performanceRating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500">Annual Budget</p>
          <p className="font-semibold text-blue-600">${vendor.annualBudget.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">YTD Spend</p>
          <p className="font-semibold text-green-600">${vendor.ytdSpend.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Budget Utilization</p>
          <p className="font-semibold text-purple-600">
            {((vendor.ytdSpend / vendor.annualBudget) * 100).toFixed(1)}%
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Payment Terms</p>
          <p className="font-semibold text-gray-900">{vendor.paymentTerms} days</p>
        </div>
      </div>

      {/* Budget utilization bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-500">Budget Utilization</span>
          <span className="text-gray-700">
            ${vendor.ytdSpend.toLocaleString()} / ${vendor.annualBudget.toLocaleString()}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              (vendor.ytdSpend / vendor.annualBudget) > 0.9 ? 'bg-red-500' :
              (vendor.ytdSpend / vendor.annualBudget) > 0.8 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${Math.min((vendor.ytdSpend / vendor.annualBudget) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Hourly Rates */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm font-medium text-gray-700 mb-2">Hourly Rates</p>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div>
            <p className="text-gray-500">Partners</p>
            <p className="font-semibold">${vendor.hourlyRates.partners || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-500">Associates</p>
            <p className="font-semibold">${vendor.hourlyRates.associates || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-500">Paralegals</p>
            <p className="font-semibold">${vendor.hourlyRates.paralegals || 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span className="flex items-center space-x-1">
          <FileText className="w-4 h-4" />
          <span>{vendor.contractTerms}</span>
        </span>
        {vendor.monthlyRetainer && (
          <span className="flex items-center space-x-1">
            <CreditCard className="w-4 h-4" />
            <span>${vendor.monthlyRetainer.toLocaleString()}/mo</span>
          </span>
        )}
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
              <h1 className="text-3xl font-bold text-gray-900">Outsourcing & Spend Management</h1>
              <p className="mt-2 text-gray-600">Track external counsel spend, performance, and relationships</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Vendor</span>
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
                <p className="text-gray-500 text-sm">Total Annual Budget</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${vendorsData.reduce((sum, vendor) => sum + vendor.annualBudget, 0).toLocaleString()}
                </p>
                <p className="text-blue-600 text-sm mt-1">Across {vendorsData.length} vendors</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
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
                <p className="text-gray-500 text-sm">YTD Spend</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${vendorsData.reduce((sum, vendor) => sum + vendor.ytdSpend, 0).toLocaleString()}
                </p>
                <p className="text-green-600 text-sm mt-1">
                  {((vendorsData.reduce((sum, vendor) => sum + vendor.ytdSpend, 0) / 
                     vendorsData.reduce((sum, vendor) => sum + vendor.annualBudget, 0)) * 100).toFixed(1)}% of budget
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
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
                <p className="text-gray-500 text-sm">Avg Performance</p>
                <p className="text-3xl font-bold text-gray-900">
                  {(vendorsData.reduce((sum, vendor) => sum + vendor.performanceRating, 0) / vendorsData.length).toFixed(1)}
                </p>
                <p className="text-yellow-600 text-sm mt-1">⭐ Excellent rating</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600" />
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
                <p className="text-gray-500 text-sm">Active Vendors</p>
                <p className="text-3xl font-bold text-gray-900">{vendorsData.length}</p>
                <p className="text-purple-600 text-sm mt-1">
                  {vendorsData.filter(v => v.relationship === 'Preferred').length} preferred
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Building className="w-6 h-6 text-purple-600" />
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Spend by Practice Area</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={spendByPracticeArea}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, '']} />
                <Bar dataKey="budget" fill="#E5E7EB" name="Budget" />
                <Bar dataKey="spend" fill="#3B82F6" name="Actual Spend" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Vendor Relationship Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChartComponent>
                <Pie
                  data={relationshipDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {relationshipDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChartComponent>
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
            <ComposedChart data={monthlySpendTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip formatter={(value, name) => 
                name === 'vendors' ? [value, 'Active Vendors'] : [`$${Number(value).toLocaleString()}`, name]
              } />
              <Bar yAxisId="left" dataKey="budget" fill="#E5E7EB" name="Budget" />
              <Bar yAxisId="left" dataKey="actual" fill="#3B82F6" name="Actual Spend" />
              <Line yAxisId="right" type="monotone" dataKey="vendors" stroke="#10B981" strokeWidth={3} name="Active Vendors" />
            </ComposedChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Vendor Performance vs Spend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vendor Performance vs Spend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart data={vendorPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" dataKey="spend" name="Spend" unit="$" />
              <YAxis type="number" dataKey="performance" name="Performance" domain={[3.5, 5.0]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} 
                       formatter={(value, name) => name === 'spend' ? [`$${Number(value).toLocaleString()}`, 'Spend'] : [value, 'Performance']} />
              <Scatter dataKey="performance" fill="#8B5CF6" />
            </ScatterChart>
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
                  placeholder="Search vendors, practice areas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={selectedRelationship}
                onChange={(e) => setSelectedRelationship(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {relationships.map(relationship => (
                  <option key={relationship} value={relationship}>{relationship}</option>
                ))}
              </select>

              <select
                value={selectedPracticeArea}
                onChange={(e) => setSelectedPracticeArea(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {practiceAreas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'spend' | 'performance' | 'budget' | 'name')}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="spend">Total Spend</option>
                <option value="performance">Performance</option>
                <option value="budget">Budget</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredVendors.length} of {vendorsData.length} vendors
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

        {/* Vendors Grid */}
        <div className={`grid gap-6 ${selectedView === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {filteredVendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OutsourcedMattersSpendEnhanced;
