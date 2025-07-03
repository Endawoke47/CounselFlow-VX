/**
 * Analytics Service for CounselFlow
 * Real integration with backend analytics agents
 */

export interface AnalyticsQueryRequest {
  agent_type: 'legal_research' | 'contract_analysis' | 'compliance_checker' | 'litigation_strategy' | 'document_reviewer' | 'risk_assessor' | 'workflow_orchestrator';
  query: string;
  context?: Record<string, unknown>;
  priority?: 'low' | 'medium' | 'high';
  matter_id?: string;
  client_id?: string;
}

export interface AnalyticsQueryResponse {
  task_id: string;
  agent_type: string;
  status: 'processing' | 'completed' | 'failed';
  response?: string;
  confidence_score?: number;
  sources?: Array<{ title: string; url: string; relevance: number }>;
  created_at: string;
  completed_at?: string;
}

export interface AnalyticsAgent {
  agent_type: string;
  status: 'active' | 'busy' | 'offline';
  active_tasks: number;
  total_queries: number;
  avg_response_time: number;
}

class AIService {
  private baseUrl: string;
  private getAuthToken: () => string | null;

  constructor(baseUrl: string, getAuthToken: () => string | null) {
    this.baseUrl = baseUrl;
    this.getAuthToken = getAuthToken;
  }

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getAuthToken();
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(errorData.detail || `HTTP ${response.status}`);
    }

    return response.json();
  }

  async getAvailableAgents(): Promise<AnalyticsAgent[]> {
    return this.makeRequest<AnalyticsAgent[]>('/api/v1/analytics-agents/');
  }

  async submitQuery(request: AnalyticsQueryRequest): Promise<AnalyticsQueryResponse> {
    return this.makeRequest<AnalyticsQueryResponse>('/api/v1/analytics-agents/query', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async getQueryResult(taskId: string): Promise<AnalyticsQueryResponse> {
    return this.makeRequest<AnalyticsQueryResponse>(`/api/v1/analytics-agents/query/${taskId}`);
  }

  async legalResearch(query: string, jurisdiction?: string, caseTypes?: string[]): Promise<AnalyticsQueryResponse> {
    return this.makeRequest<AnalyticsQueryResponse>('/api/v1/analytics-agents/legal-research', {
      method: 'POST',
      body: JSON.stringify({
        query,
        jurisdiction,
        case_types: caseTypes,
      }),
    });
  }

  async analyzeContract(contractText: string, analysisType = 'comprehensive', riskAssessment = true): Promise<AnalyticsQueryResponse> {
    return this.makeRequest<AnalyticsQueryResponse>('/api/v1/analytics-agents/contract-analysis', {
      method: 'POST',
      body: JSON.stringify({
        contract_text: contractText,
        analysis_type: analysisType,
        risk_assessment: riskAssessment,
      }),
    });
  }

  async uploadAndAnalyzeDocument(file: File, matterId?: string): Promise<{ taskId: string; message: string }> {
    const token = this.getAuthToken();
    if (!token) {
      throw new Error('Authentication required');
    }

    // Extract text from document (simplified - in real implementation, this would be done server-side)
    const formData = new FormData();
    formData.append('file', file);
    if (matterId) {
      formData.append('matter_id', matterId);
    }

    // For now, we'll submit the filename as a query to the document reviewer agent
    const queryRequest: AnalyticsQueryRequest = {
      agent_type: 'document_reviewer',
      query: `Analyze uploaded document: ${file.name}`,
      context: {
        filename: file.name,
        fileSize: file.size,
        mimeType: file.type,
        matterId
      },
      priority: 'high'
    };

    const result = await this.submitQuery(queryRequest);
    return {
      taskId: result.task_id,
      message: 'Document uploaded and queued for AI analysis'
    };
  }

  async getAnalytics(): Promise<{
    total_queries: number;
    active_tasks: number;
    completed_tasks: number;
    agent_usage: Record<string, number>;
    average_response_time: number;
    user_queries_today: number;
  }> {
    return this.makeRequest('/api/v1/ai-agents/analytics');
  }

  // Real-time query monitoring
  async pollQueryResult(taskId: string, maxAttempts = 30, intervalMs = 2000): Promise<AnalyticsQueryResponse> {
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      const result = await this.getQueryResult(taskId);
      
      if (result.status === 'completed' || result.status === 'failed') {
        return result;
      }
      
      await new Promise(resolve => setTimeout(resolve, intervalMs));
      attempts++;
    }
    
    throw new Error('Query timeout - analysis taking longer than expected');
  }
}

// Create singleton instance
let aiServiceInstance: AIService | null = null;

export const createAIService = (baseUrl: string, getAuthToken: () => string | null): AIService => {
  if (!aiServiceInstance) {
    aiServiceInstance = new AIService(baseUrl, getAuthToken);
  }
  return aiServiceInstance;
};

export const getAIService = (): AIService => {
  if (!aiServiceInstance) {
    throw new Error('AI Service not initialized. Call createAIService first.');
  }
  return aiServiceInstance;
};

export default AIService;
