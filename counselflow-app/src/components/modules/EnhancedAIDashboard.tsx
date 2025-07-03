/**
 * Enhanced Dashboard Module for Phase 2 Integration
 * Integrates AI Chat and Document Upload with existing dashboard
 */
import React, { useState, useEffect } from 'react';
import { DocumentUpload } from '../DocumentUpload';
import { AIChat } from '../AIChat';
import { createAIService, getAIService } from '../../services/aiService';
import { Bot, Upload, MessageSquare, TrendingUp } from 'lucide-react';

interface EnhancedDashboardProps {
  user?: {
    name: string;
    role: string;
    firm: string;
  };
}

export const EnhancedDashboard: React.FC<EnhancedDashboardProps> = () => {
  const [activeTab, setActiveTab] = useState<'ai-chat' | 'documents' | 'analytics'>('ai-chat');
  const [aiStats, setAiStats] = useState({
    totalQueries: 0,
    activeTasks: 0,
    completedTasks: 0,
    avgResponseTime: 0
  });

  useEffect(() => {
    // Initialize AI Service
    const getAuthToken = () => {
      return localStorage.getItem('access_token');
    };
    
    try {
      createAIService('http://localhost:8000', getAuthToken);
      loadAIStats();
    } catch (error) {
      console.error('Failed to initialize AI service:', error);
    }
  }, []);

  const loadAIStats = async () => {
    try {
      const aiService = getAIService();
      const analytics = await aiService.getAnalytics();
      setAiStats({
        totalQueries: analytics.total_queries,
        activeTasks: analytics.active_tasks,
        completedTasks: analytics.completed_tasks,
        avgResponseTime: analytics.average_response_time
      });
    } catch (error) {
      console.error('Failed to load AI stats:', error);
    }
  };

  const handleDocumentUpload = async (file: File) => {
    try {
      const aiService = getAIService();
      const result = await aiService.uploadAndAnalyzeDocument(file);
      console.log('Document uploaded and analyzed:', result);
      // Refresh stats after upload
      await loadAIStats();
    } catch (error) {
      console.error('Document upload failed:', error);
      throw error;
    }
  };

  const TabButton: React.FC<{
    id: string;
    label: string;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
  }> = ({ label, icon, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-500 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
  }> = ({ title, value, icon, color }) => (
    <div className="bg-white rounded-lg shadow-md p-4 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="text-gray-400">
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          AI-Enhanced Legal Operations
        </h2>
        <p className="text-gray-600">
          Streamline your legal work with AI-powered tools and real-time assistance.
        </p>
      </div>

      {/* AI Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total AI Queries"
          value={aiStats.totalQueries}
          icon={<Bot className="h-6 w-6" />}
          color="#3B82F6"
        />
        <StatCard
          title="Active Tasks"
          value={aiStats.activeTasks}
          icon={<TrendingUp className="h-6 w-6" />}
          color="#10B981"
        />
        <StatCard
          title="Completed Tasks"
          value={aiStats.completedTasks}
          icon={<TrendingUp className="h-6 w-6" />}
          color="#8B5CF6"
        />
        <StatCard
          title="Avg Response Time"
          value={`${aiStats.avgResponseTime}s`}
          icon={<TrendingUp className="h-6 w-6" />}
          color="#F59E0B"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4">
        <TabButton
          id="ai-chat"
          label="AI Assistant"
          icon={<MessageSquare className="h-4 w-4" />}
          isActive={activeTab === 'ai-chat'}
          onClick={() => setActiveTab('ai-chat')}
        />
        <TabButton
          id="documents"
          label="Document Analysis"
          icon={<Upload className="h-4 w-4" />}
          isActive={activeTab === 'documents'}
          onClick={() => setActiveTab('documents')}
        />
        <TabButton
          id="analytics"
          label="AI Analytics"
          icon={<TrendingUp className="h-4 w-4" />}
          isActive={activeTab === 'analytics'}
          onClick={() => setActiveTab('analytics')}
        />
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-md">
        {activeTab === 'ai-chat' && (
          <div className="h-96">
            <AIChat />
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Document Upload & AI Analysis
            </h3>
            <DocumentUpload onUpload={handleDocumentUpload} />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              AI Performance Analytics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Query Success Rate</h4>
                <div className="text-2xl font-bold text-green-600">94.2%</div>
                <p className="text-sm text-gray-600">AI queries completed successfully</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Time Saved</h4>
                <div className="text-2xl font-bold text-blue-600">127 hrs</div>
                <p className="text-sm text-gray-600">Automated work this month</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Most Used Agent</h4>
                <div className="text-lg font-bold text-purple-600">Legal Research</div>
                <p className="text-sm text-gray-600">43% of all queries</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Accuracy Score</h4>
                <div className="text-2xl font-bold text-indigo-600">96.8%</div>
                <p className="text-sm text-gray-600">AI analysis accuracy</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
