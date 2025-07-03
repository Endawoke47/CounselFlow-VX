import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  FileText,
  BookOpen,
  Tag,
  Clock,
  Star,
  Filter,
  Eye,
  Download,
  Share2,
  Edit,
  MessageSquare,
  User,
  Calendar,
  TrendingUp,
  Archive,
  AlertCircle,
  Users,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as PieChartComponent,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
  ComposedChart
} from 'recharts';

// Knowledge Document Interface
interface KnowledgeDocument {
  id: string;
  title: string;
  type: 'Legal Memo' | 'Template' | 'Precedent' | 'Policy' | 'Research' | 'Best Practice';
  category: string;
  tags: string[];
  author: string;
  lastModified: Date;
  content: string;
  summary: string;
  relevanceScore: number;
  views: number;
  downloads: number;
  rating: number;
  reviews: number;
  practiceArea: string;
  jurisdiction?: string;
  keywords: string[];
  attachments: number;
  isBookmarked: boolean;
  accessLevel: 'Public' | 'Internal' | 'Restricted';
  relatedDocs: string[];
}

// Demo data for knowledge documents
const knowledgeData: KnowledgeDocument[] = [
  {
    id: 'KD-2024-001',
    title: 'Software License Agreement Terms Analysis',
    type: 'Legal Memo',
    category: 'Contract Analysis',
    tags: ['software', 'licensing', 'SaaS', 'enterprise'],
    author: 'Sarah Johnson',
    lastModified: new Date('2024-06-15'),
    content: 'Comprehensive analysis of software licensing terms...',
    summary: 'Key considerations for enterprise software license negotiations including liability caps, data protection, and termination clauses.',
    relevanceScore: 98,
    views: 234,
    downloads: 45,
    rating: 4.8,
    reviews: 12,
    practiceArea: 'Technology Law',
    jurisdiction: 'US',
    keywords: ['software', 'licensing', 'liability', 'data protection'],
    attachments: 3,
    isBookmarked: true,
    accessLevel: 'Internal',
    relatedDocs: ['KD-2024-002', 'KD-2024-015']
  },
  {
    id: 'KD-2024-002',
    title: 'GDPR Compliance Checklist Template',
    type: 'Template',
    category: 'Data Protection',
    tags: ['GDPR', 'privacy', 'compliance', 'EU'],
    author: 'Michael Chen',
    lastModified: new Date('2024-06-12'),
    content: 'Comprehensive GDPR compliance checklist...',
    summary: 'Step-by-step checklist for ensuring GDPR compliance in data processing activities.',
    relevanceScore: 95,
    views: 456,
    downloads: 123,
    rating: 4.9,
    reviews: 28,
    practiceArea: 'Privacy Law',
    jurisdiction: 'EU',
    keywords: ['GDPR', 'privacy', 'data processing', 'compliance'],
    attachments: 5,
    isBookmarked: false,
    accessLevel: 'Public',
    relatedDocs: ['KD-2024-008', 'KD-2024-019']
  },
  {
    id: 'KD-2024-003',
    title: 'M&A Due Diligence Best Practices',
    type: 'Best Practice',
    category: 'Mergers & Acquisitions',
    tags: ['M&A', 'due diligence', 'checklist', 'corporate'],
    author: 'Lisa Park',
    lastModified: new Date('2024-06-10'),
    content: 'Best practices for conducting legal due diligence...',
    summary: 'Comprehensive guide to legal due diligence in M&A transactions including key areas of focus and red flags.',
    relevanceScore: 92,
    views: 189,
    downloads: 67,
    rating: 4.7,
    reviews: 15,
    practiceArea: 'Corporate Law',
    keywords: ['M&A', 'due diligence', 'corporate', 'transactions'],
    attachments: 8,
    isBookmarked: true,
    accessLevel: 'Internal',
    relatedDocs: ['KD-2024-004', 'KD-2024-011']
  },
  {
    id: 'KD-2024-004',
    title: 'Employment Contract Template - Executive Level',
    type: 'Template',
    category: 'Employment Law',
    tags: ['employment', 'executive', 'contract', 'compensation'],
    author: 'Robert Kim',
    lastModified: new Date('2024-06-08'),
    content: 'Executive employment contract template...',
    summary: 'Comprehensive template for executive employment agreements including equity compensation and non-compete clauses.',
    relevanceScore: 89,
    views: 312,
    downloads: 89,
    rating: 4.6,
    reviews: 22,
    practiceArea: 'Employment Law',
    keywords: ['employment', 'executive', 'equity', 'non-compete'],
    attachments: 2,
    isBookmarked: false,
    accessLevel: 'Internal',
    relatedDocs: ['KD-2024-012', 'KD-2024-018']
  },
  {
    id: 'KD-2024-005',
    title: 'Patent Application Process Guide',
    type: 'Research',
    category: 'Intellectual Property',
    tags: ['patent', 'IP', 'application', 'USPTO'],
    author: 'Sarah Johnson',
    lastModified: new Date('2024-06-05'),
    content: 'Step-by-step guide to patent applications...',
    summary: 'Detailed process guide for filing patent applications with the USPTO including timelines and requirements.',
    relevanceScore: 87,
    views: 178,
    downloads: 34,
    rating: 4.5,
    reviews: 9,
    practiceArea: 'Intellectual Property',
    jurisdiction: 'US',
    keywords: ['patent', 'USPTO', 'application', 'IP'],
    attachments: 4,
    isBookmarked: true,
    accessLevel: 'Public',
    relatedDocs: ['KD-2024-013', 'KD-2024-016']
  },
  {
    id: 'KD-2024-006',
    title: 'Corporate Governance Policy Framework',
    type: 'Policy',
    category: 'Corporate Governance',
    tags: ['governance', 'board', 'policy', 'compliance'],
    author: 'Michael Chen',
    lastModified: new Date('2024-06-03'),
    content: 'Framework for corporate governance policies...',
    summary: 'Comprehensive framework for establishing corporate governance policies and board oversight procedures.',
    relevanceScore: 85,
    views: 145,
    downloads: 28,
    rating: 4.4,
    reviews: 7,
    practiceArea: 'Corporate Law',
    keywords: ['governance', 'board', 'oversight', 'compliance'],
    attachments: 6,
    isBookmarked: false,
    accessLevel: 'Internal',
    relatedDocs: ['KD-2024-007', 'KD-2024-014']
  }
];

// Analytics data
const categoryData = [
  { name: 'Contract Analysis', value: 25, count: 15 },
  { name: 'Employment Law', value: 20, count: 12 },
  { name: 'Data Protection', value: 18, count: 11 },
  { name: 'IP Law', value: 15, count: 9 },
  { name: 'Corporate Law', value: 12, count: 7 },
  { name: 'Regulatory', value: 10, count: 6 }
];

const usageData = [
  { month: 'Jan', views: 1200, downloads: 340, documents: 58 },
  { month: 'Feb', views: 1450, downloads: 420, documents: 62 },
  { month: 'Mar', views: 1680, downloads: 510, documents: 67 },
  { month: 'Apr', views: 1890, downloads: 630, documents: 71 },
  { month: 'May', views: 2100, downloads: 750, documents: 74 },
  { month: 'Jun', views: 2340, downloads: 890, documents: 78 }
];

const authorData = [
  { name: 'Sarah Johnson', documents: 23, views: 5670, rating: 4.8 },
  { name: 'Michael Chen', documents: 19, views: 4320, rating: 4.7 },
  { name: 'Lisa Park', documents: 15, views: 3890, rating: 4.6 },
  { name: 'Robert Kim', documents: 12, views: 2940, rating: 4.5 }
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

const KnowledgeManagementEnhanced: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedView, setSelectedView] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'relevance' | 'date' | 'views' | 'rating'>('relevance');

  // Filter and sort documents
  const filteredDocuments = useMemo(() => {
    const filtered = knowledgeData.filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
      const matchesType = selectedType === 'All' || doc.type === selectedType;
      
      return matchesSearch && matchesCategory && matchesType;
    });

    // Sort documents
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return b.lastModified.getTime() - a.lastModified.getTime();
        case 'views':
          return b.views - a.views;
        case 'rating':
          return b.rating - a.rating;
        case 'relevance':
        default:
          return b.relevanceScore - a.relevanceScore;
      }
    });
  }, [searchTerm, selectedCategory, selectedType, sortBy]);

  const categories = ['All', ...Array.from(new Set(knowledgeData.map(doc => doc.category)))];
  const types = ['All', ...Array.from(new Set(knowledgeData.map(doc => doc.type)))];

  const DocumentCard: React.FC<{ document: KnowledgeDocument }> = ({ document }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 line-clamp-1">{document.title}</h3>
            <p className="text-sm text-gray-500">{document.type} • {document.category}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {document.isBookmarked && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">{document.accessLevel}</span>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{document.summary}</p>

      <div className="flex flex-wrap gap-1 mb-4">
        {document.tags.slice(0, 3).map((tag, index) => (
          <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
            {tag}
          </span>
        ))}
        {document.tags.length > 3 && (
          <span className="text-xs text-gray-500">+{document.tags.length - 3} more</span>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1">
            <User className="w-4 h-4" />
            <span>{document.author}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{document.lastModified.toLocaleDateString()}</span>
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-500" />
          <span>{document.rating.toFixed(1)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>{document.views}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Download className="w-4 h-4" />
            <span>{document.downloads}</span>
          </span>
        </div>
        <span className="text-xs text-blue-600 font-medium">
          {document.relevanceScore}% relevant
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
              <h1 className="text-3xl font-bold text-gray-900">Knowledge Management</h1>
              <p className="mt-2 text-gray-600">Centralized legal knowledge and document repository</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <FileText className="w-5 h-5" />
              <span>Add Document</span>
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Documents</p>
                <p className="text-3xl font-bold text-gray-900">{knowledgeData.length}</p>
                <p className="text-green-600 text-sm mt-1">↗ 12% this month</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
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
                <p className="text-gray-500 text-sm">Total Views</p>
                <p className="text-3xl font-bold text-gray-900">
                  {knowledgeData.reduce((sum, doc) => sum + doc.views, 0).toLocaleString()}
                </p>
                <p className="text-green-600 text-sm mt-1">↗ 24% this month</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Eye className="w-6 h-6 text-green-600" />
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
                <p className="text-gray-500 text-sm">Downloads</p>
                <p className="text-3xl font-bold text-gray-900">
                  {knowledgeData.reduce((sum, doc) => sum + doc.downloads, 0).toLocaleString()}
                </p>
                <p className="text-green-600 text-sm mt-1">↗ 18% this month</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Download className="w-6 h-6 text-purple-600" />
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
                <p className="text-gray-500 text-sm">Avg Rating</p>
                <p className="text-3xl font-bold text-gray-900">
                  {(knowledgeData.reduce((sum, doc) => sum + doc.rating, 0) / knowledgeData.length).toFixed(1)}
                </p>
                <p className="text-green-600 text-sm mt-1">↗ 0.3 this month</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600" />
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChartComponent>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {categoryData.map((entry, index) => (
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="views" fill="#3B82F6" name="Views" />
                <Line yAxisId="right" type="monotone" dataKey="downloads" stroke="#10B981" strokeWidth={3} name="Downloads" />
              </ComposedChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Top Authors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Contributing Authors</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={authorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="documents" fill="#8B5CF6" name="Documents" />
              <Bar dataKey="views" fill="#06B6D4" name="Views" />
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
                  placeholder="Search documents, content, tags..."
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
                onChange={(e) => setSortBy(e.target.value as 'relevance' | 'date' | 'views' | 'rating')}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="relevance">Relevance</option>
                <option value="date">Date</option>
                <option value="views">Views</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredDocuments.length} of {knowledgeData.length} documents
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

        {/* Documents Grid */}
        <div className={`grid gap-6 ${selectedView === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {filteredDocuments.map((document) => (
            <DocumentCard key={document.id} document={document} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeManagementEnhanced;
