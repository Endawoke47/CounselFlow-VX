/**
 * AI Chat Interface Component
 * Real-time chat with specialized legal AI agents
 */
import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2, FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import { getAIService, AnalyticsQueryRequest } from '../services/aiService';

interface Message {
  id: string;
  type: 'user' | 'agent' | 'system';
  content: string;
  timestamp: Date;
  agent_type?: string;
  task_id?: string;
  status?: 'sending' | 'processing' | 'completed' | 'failed';
  confidence_score?: number;
}

interface AIChatProps {
  matterId?: string;
  clientId?: string;
}

export const AIChat: React.FC<AIChatProps> = ({ matterId, clientId }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: 'Welcome to CounselFlow AI Assistant. I can help with legal research, contract analysis, compliance checking, and more. What can I assist you with today?',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<AnalyticsQueryRequest['agent_type']>('legal_research');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const aiService = getAIService();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Create AI query
      const queryRequest: AnalyticsQueryRequest = {
        agent_type: selectedAgent,
        query: inputMessage,
        priority: 'medium',
        matter_id: matterId,
        client_id: clientId,
      };

      // Submit query to AI service
      const queryResponse = await aiService.submitQuery(queryRequest);

      // Add processing message
      const processingMessage: Message = {
        id: queryResponse.task_id,
        type: 'agent',
        content: 'Processing your request...',
        timestamp: new Date(),
        agent_type: selectedAgent,
        task_id: queryResponse.task_id,
        status: 'processing',
      };

      setMessages(prev => [...prev, processingMessage]);

      // Poll for result
      const result = await aiService.pollQueryResult(queryResponse.task_id);

      // Update message with result
      setMessages(prev => prev.map(msg => 
        msg.id === queryResponse.task_id
          ? {
              ...msg,
              content: result.response || 'Analysis completed',
              status: result.status as Message['status'],
              confidence_score: result.confidence_score,
            }
          : msg
      ));

    } catch (error) {
      console.error('AI query failed:', error);
      
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'system',
        content: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        timestamp: new Date(),
        status: 'failed',
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getAgentIcon = (agentType: string) => {
    switch (agentType) {
      case 'legal_research': return <FileText className="h-4 w-4" />;
      case 'contract_analysis': return <FileText className="h-4 w-4" />;
      case 'risk_assessor': return <AlertTriangle className="h-4 w-4" />;
      default: return <Bot className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'processing': return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">AI Legal Assistant</h3>
        <select
          value={selectedAgent}
          onChange={(e) => setSelectedAgent(e.target.value as AnalyticsQueryRequest['agent_type'])}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="legal_research">Legal Research</option>
          <option value="contract_analysis">Contract Analysis</option>
          <option value="compliance_checker">Compliance Checker</option>
          <option value="litigation_strategy">Litigation Strategy</option>
          <option value="document_reviewer">Document Reviewer</option>
          <option value="risk_assessor">Risk Assessor</option>
          <option value="workflow_orchestrator">Workflow Orchestrator</option>
        </select>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Avatar */}
              <div className={`flex-shrink-0 ${message.type === 'user' ? 'ml-3' : 'mr-3'}`}>
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-white text-sm
                  ${message.type === 'user' ? 'bg-blue-500' : message.type === 'system' ? 'bg-gray-500' : 'bg-green-500'}
                `}>
                  {message.type === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : message.type === 'system' ? (
                    <Bot className="h-4 w-4" />
                  ) : (
                    getAgentIcon(message.agent_type || '')
                  )}
                </div>
              </div>

              {/* Message Content */}
              <div className={`
                px-4 py-3 rounded-lg
                ${message.type === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : message.type === 'system'
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-green-50 text-gray-800 border border-green-200'
                }
              `}>
                <div className="flex items-start justify-between">
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  {getStatusIcon(message.status)}
                </div>
                
                {message.confidence_score && (
                  <div className="mt-2 text-xs opacity-75">
                    Confidence: {Math.round(message.confidence_score * 100)}%
                  </div>
                )}
                
                <div className="mt-1 text-xs opacity-75">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Ask the ${selectedAgent.replace('_', ' ')} agent...`}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
