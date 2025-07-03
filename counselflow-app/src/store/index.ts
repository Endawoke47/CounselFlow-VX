/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { User, Client, Matter, BusinessInsight, RiskAssessment, Contract } from '@/types'

// Auth Store
interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updateUser: (user: Partial<User>) => void
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,

        login: async (email: string, _password: string) => {
          set({ loading: true, error: null })
          try {
            // In production, this would call the actual API
            const mockUser: User = {
              id: '1',
              email,
              name: 'John Smith, Esq.',
              role: 'senior_partner',
              firm: 'Smith & Associates',
              jurisdiction: 'NY',
              barAdmissions: ['NY', 'NJ'],
              preferredLanguage: 'en',
              securityClearance: 'elevated',
              lastLogin: new Date(),
              permissions: []
            }
            
            set({ user: mockUser, isAuthenticated: true, loading: false })
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Login failed', 
              loading: false 
            })
          }
        },

        logout: () => {
          set({ user: null, isAuthenticated: false, error: null })
        },

        updateUser: (userData: Partial<User>) => {
          const { user } = get()
          if (user) {
            set({ user: { ...user, ...userData } })
          }
        },

        clearError: () => set({ error: null })
      }),
      {
        name: 'counselflow-auth',
        partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated })
      }
    ),
    { name: 'auth-store' }
  )
)

// Client Store
interface ClientState {
  clients: Client[]
  selectedClient: Client | null
  loading: boolean
  error: string | null
  fetchClients: () => Promise<void>
  selectClient: (clientId: string) => void
  addClient: (client: Omit<Client, 'id' | 'createdAt'>) => Promise<void>
  updateClient: (id: string, updates: Partial<Client>) => Promise<void>
  deleteClient: (id: string) => Promise<void>
}

export const useClientStore = create<ClientState>()(
  devtools(
    (set, get) => ({
      clients: [],
      selectedClient: null,
      loading: false,
      error: null,

      fetchClients: async () => {
        set({ loading: true, error: null })
        try {
          // Mock data - in production, fetch from API
          const mockClients: Client[] = [
            {
              id: '1',
              name: 'Acme Corporation',
              type: 'corporation',
              industry: 'Technology',
              jurisdiction: 'DE',
              encryptionKeyId: 'key-1',
              privilegeLevel: 'elevated',
              conflictStatus: 'cleared',
              matters: [],
              createdAt: new Date(),
              metadata: {}
            }
          ]
          set({ clients: mockClients, loading: false })
        } catch (error) {
          set({ error: 'Failed to fetch clients', loading: false })
        }
      },

      selectClient: (clientId: string) => {
        const { clients } = get()
        const client = clients.find(c => c.id === clientId)
        set({ selectedClient: client || null })
      },

      addClient: async (clientData) => {
        set({ loading: true, error: null })
        try {
          const newClient: Client = {
            ...clientData,
            id: crypto.randomUUID(),
            createdAt: new Date()
          }
          set(state => ({ 
            clients: [...state.clients, newClient], 
            loading: false 
          }))
        } catch (error) {
          set({ error: 'Failed to add client', loading: false })
        }
      },

      updateClient: async (id: string, updates: Partial<Client>) => {
        set({ loading: true, error: null })
        try {
          set(state => ({
            clients: state.clients.map(client =>
              client.id === id ? { ...client, ...updates } : client
            ),
            selectedClient: state.selectedClient?.id === id 
              ? { ...state.selectedClient, ...updates } 
              : state.selectedClient,
            loading: false
          }))
        } catch (error) {
          set({ error: 'Failed to update client', loading: false })
        }
      },

      deleteClient: async (id: string) => {
        set({ loading: true, error: null })
        try {
          set(state => ({
            clients: state.clients.filter(client => client.id !== id),
            selectedClient: state.selectedClient?.id === id ? null : state.selectedClient,
            loading: false
          }))
        } catch (error) {
          set({ error: 'Failed to delete client', loading: false })
        }
      }
    }),
    { name: 'client-store' }
  )
)

// Matter Store
interface MatterState {
  matters: Matter[]
  selectedMatter: Matter | null
  loading: boolean
  error: string | null
  fetchMatters: (clientId?: string) => Promise<void>
  selectMatter: (matterId: string) => void
  addMatter: (matter: Omit<Matter, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateMatter: (id: string, updates: Partial<Matter>) => Promise<void>
  deleteMatter: (id: string) => Promise<void>
}

export const useMatterStore = create<MatterState>()(
  devtools(
    (set, get) => ({
      matters: [],
      selectedMatter: null,
      loading: false,
      error: null,

      fetchMatters: async (clientId?: string) => {
        set({ loading: true, error: null })
        try {
          // Mock data - filter by clientId if provided
          const mockMatters: Matter[] = [
            {
              id: '1',
              title: 'Contract Negotiation - Software License',
              description: 'Negotiating enterprise software licensing agreement',
              type: 'contract_negotiation',
              status: 'active',
              priority: 'high',
              clientId: '1',
              assignedLawyers: [],
              documents: [],
              businessInsights: [],
              riskScore: 6.5,
              budget: 50000,
              actualCost: 32000,
              deadlines: [],
              createdAt: new Date(),
              updatedAt: new Date()
            }
          ]
          
          const filteredMatters = clientId 
            ? mockMatters.filter(m => m.clientId === clientId)
            : mockMatters
            
          set({ matters: filteredMatters, loading: false })
        } catch (error) {
          set({ error: 'Failed to fetch matters', loading: false })
        }
      },

      selectMatter: (matterId: string) => {
        const { matters } = get()
        const matter = matters.find(m => m.id === matterId)
        set({ selectedMatter: matter || null })
      },

      addMatter: async (matterData) => {
        set({ loading: true, error: null })
        try {
          const newMatter: Matter = {
            ...matterData,
            id: crypto.randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date()
          }
          set(state => ({ 
            matters: [...state.matters, newMatter], 
            loading: false 
          }))
        } catch (error) {
          set({ error: 'Failed to add matter', loading: false })
        }
      },

      updateMatter: async (id: string, updates: Partial<Matter>) => {
        set({ loading: true, error: null })
        try {
          set(state => ({
            matters: state.matters.map(matter =>
              matter.id === id ? { ...matter, ...updates, updatedAt: new Date() } : matter
            ),
            selectedMatter: state.selectedMatter?.id === id 
              ? { ...state.selectedMatter, ...updates, updatedAt: new Date() } 
              : state.selectedMatter,
            loading: false
          }))
        } catch (error) {
          set({ error: 'Failed to update matter', loading: false })
        }
      },

      deleteMatter: async (id: string) => {
        set({ loading: true, error: null })
        try {
          set(state => ({
            matters: state.matters.filter(matter => matter.id !== id),
            selectedMatter: state.selectedMatter?.id === id ? null : state.selectedMatter,
            loading: false
          }))
        } catch (error) {
          set({ error: 'Failed to delete matter', loading: false })
        }
      }
    }),
    { name: 'matter-store' }
  )
)

// Analytics Store
interface AnalyticsState {
  insights: BusinessInsight[]
  chatHistory: ChatMessage[]
  isProcessing: boolean
  error: string | null
  fetchInsights: () => Promise<void>
  sendMessage: (message: string) => Promise<void>
  clearChat: () => void
  dismissInsight: (insightId: string) => void
}

interface ChatMessage {
  id: string
  content: string
  sender: 'user' | 'system'
  timestamp: Date
  confidence?: number
}

export const useAnalyticsStore = create<AnalyticsState>()(
  devtools(
    (set, get) => ({
      insights: [],
      chatHistory: [],
      isProcessing: false,
      error: null,

      fetchInsights: async () => {
        try {
          // Mock analytics insights
          const mockInsights: BusinessInsight[] = [
            {
              id: '1',
              type: 'risk_alert',
              title: 'Unusual contract clause detected',
              description: 'The liability cap clause is significantly below market standards',
              confidence: 0.92,
              severity: 'medium',
              recommendations: [
                'Review liability clause with client',
                'Compare with industry benchmarks',
                'Consider negotiating higher cap'
              ],
              source: 'contract_analyzer',
              createdAt: new Date()
            }
          ]
          set({ insights: mockInsights })
        } catch (error) {
          set({ error: 'Failed to fetch analytics insights' })
        }
      },

      sendMessage: async (message: string) => {
        set({ isProcessing: true, error: null })
        try {
          const userMessage: ChatMessage = {
            id: crypto.randomUUID(),
            content: message,
            sender: 'user',
            timestamp: new Date()
          }

          // Simulate system response
          const systemResponse: ChatMessage = {
            id: crypto.randomUUID(),
            content: `Based on your question about "${message}", I can help you with legal research and analysis. Here are some key points...`,
            sender: 'system',
            timestamp: new Date(),
            confidence: 0.85
          }

          set(state => ({
            chatHistory: [...state.chatHistory, userMessage, systemResponse],
            isProcessing: false
          }))
        } catch (error) {
          set({ error: 'Failed to send message', isProcessing: false })
        }
      },

      clearChat: () => {
        set({ chatHistory: [] })
      },

      dismissInsight: (insightId: string) => {
        set(state => ({
          insights: state.insights.filter(insight => insight.id !== insightId)
        }))
      }
    }),
    { name: 'analytics-store' }
  )
)

// Risk Store
interface RiskState {
  assessments: RiskAssessment[]
  loading: boolean
  error: string | null
  fetchRiskAssessments: (entityId?: string) => Promise<void>
  addRiskAssessment: (assessment: Omit<RiskAssessment, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateRiskAssessment: (id: string, updates: Partial<RiskAssessment>) => Promise<void>
  deleteRiskAssessment: (id: string) => Promise<void>
}

export const useRiskStore = create<RiskState>()(
  devtools(
    (set) => ({
      assessments: [],
      loading: false,
      error: null,

      fetchRiskAssessments: async (entityId?: string) => {
        set({ loading: true, error: null })
        try {
          // Mock risk assessments
          const mockAssessments: RiskAssessment[] = [
            {
              id: '1',
              entityId: '1',
              entityType: 'matter',
              riskType: 'legal',
              severity: 'medium',
              probability: 0.6,
              impact: 0.7,
              compositeScore: 4.2,
              analyticsGenerated: true,
              humanValidated: false,
              mitigationStrategy: {
                description: 'Implement additional contract review process',
                actions: [],
                timeline: '30 days',
                responsible: [],
                cost: 5000,
                effectiveness: 0.8
              },
              status: 'open',
              createdAt: new Date(),
              updatedAt: new Date()
            }
          ]

          const filteredAssessments = entityId
            ? mockAssessments.filter(a => a.entityId === entityId)
            : mockAssessments

          set({ assessments: filteredAssessments, loading: false })
        } catch (error) {
          set({ error: 'Failed to fetch risk assessments', loading: false })
        }
      },

      addRiskAssessment: async (assessmentData) => {
        set({ loading: true, error: null })
        try {
          const newAssessment: RiskAssessment = {
            ...assessmentData,
            id: crypto.randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date()
          }
          set(state => ({
            assessments: [...state.assessments, newAssessment],
            loading: false
          }))
        } catch (error) {
          set({ error: 'Failed to add risk assessment', loading: false })
        }
      },

      updateRiskAssessment: async (id: string, updates: Partial<RiskAssessment>) => {
        set({ loading: true, error: null })
        try {
          set(state => ({
            assessments: state.assessments.map(assessment =>
              assessment.id === id 
                ? { ...assessment, ...updates, updatedAt: new Date() } 
                : assessment
            ),
            loading: false
          }))
        } catch (error) {
          set({ error: 'Failed to update risk assessment', loading: false })
        }
      },

      deleteRiskAssessment: async (id: string) => {
        set({ loading: true, error: null })
        try {
          set(state => ({
            assessments: state.assessments.filter(assessment => assessment.id !== id),
            loading: false
          }))
        } catch (error) {
          set({ error: 'Failed to delete risk assessment', loading: false })
        }
      }
    }),
    { name: 'risk-store' }
  )
)

// Contract Store
interface ContractState {
  contracts: Contract[]
  selectedContract: Contract | null
  loading: boolean
  error: string | null
  fetchContracts: (clientId?: string) => Promise<void>
  selectContract: (contractId: string) => void
  addContract: (contract: Omit<Contract, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateContract: (id: string, updates: Partial<Contract>) => Promise<void>
  deleteContract: (id: string) => Promise<void>
}

export const useContractStore = create<ContractState>()(
  devtools(
    (set, get) => ({
      contracts: [],
      selectedContract: null,
      loading: false,
      error: null,

      fetchContracts: async (clientId?: string) => {
        set({ loading: true, error: null })
        try {
          // Mock contracts
          const mockContracts: Contract[] = [
            {
              id: '1',
              title: 'Software License Agreement',
              type: 'licensing_agreement',
              parties: [],
              status: 'draft',
              value: 150000,
              currency: 'USD',
              startDate: new Date(),
              endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
              keyTerms: [],
              clauses: [],
              aiAnalysis: {
                summary: 'Standard software licensing agreement with moderate risk factors',
                keyPoints: [],
                riskFactors: [],
                recommendations: [],
                confidence: 0.88,
                processingTime: 2.5,
                model: 'contract-analyzer-v2',
                version: '2.1.0',
                lastUpdated: new Date(),
                unusualClauses: [],
                marketComparison: {
                  metric: 'Total Contract Value',
                  firmValue: 150000,
                  marketAverage: 125000,
                  percentile: 65,
                  recommendation: 'Value is above market average'
                },
                negotiationPoints: [],
                complianceIssues: []
              },
              riskScore: 5.2,
              complianceStatus: 'compliant',
              metadata: {},
              createdAt: new Date(),
              updatedAt: new Date()
            }
          ]

          const filteredContracts = clientId
            ? mockContracts.filter(c => c.parties.some(p => p.id === clientId))
            : mockContracts

          set({ contracts: filteredContracts, loading: false })
        } catch (error) {
          set({ error: 'Failed to fetch contracts', loading: false })
        }
      },

      selectContract: (contractId: string) => {
        const { contracts } = get()
        const contract = contracts.find(c => c.id === contractId)
        set({ selectedContract: contract || null })
      },

      addContract: async (contractData) => {
        set({ loading: true, error: null })
        try {
          const newContract: Contract = {
            ...contractData,
            id: crypto.randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date()
          }
          set(state => ({
            contracts: [...state.contracts, newContract],
            loading: false
          }))
        } catch (error) {
          set({ error: 'Failed to add contract', loading: false })
        }
      },

      updateContract: async (id: string, updates: Partial<Contract>) => {
        set({ loading: true, error: null })
        try {
          set(state => ({
            contracts: state.contracts.map(contract =>
              contract.id === id
                ? { ...contract, ...updates, updatedAt: new Date() }
                : contract
            ),
            selectedContract: state.selectedContract?.id === id
              ? { ...state.selectedContract, ...updates, updatedAt: new Date() }
              : state.selectedContract,
            loading: false
          }))
        } catch (error) {
          set({ error: 'Failed to update contract', loading: false })
        }
      },

      deleteContract: async (id: string) => {
        set({ loading: true, error: null })
        try {
          set(state => ({
            contracts: state.contracts.filter(contract => contract.id !== id),
            selectedContract: state.selectedContract?.id === id ? null : state.selectedContract,
            loading: false
          }))
        } catch (error) {
          set({ error: 'Failed to delete contract', loading: false })
        }
      }
    }),
    { name: 'contract-store' }
  )
)
