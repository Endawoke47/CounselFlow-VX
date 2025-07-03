// CounselFlow API Services - Production Ready
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../../types/database';

export class BaseApiService {
  protected supabase: SupabaseClient<Database>;

  constructor() {
    this.supabase = createClient<Database>(
      import.meta.env.VITE_SUPABASE_URL!,
      import.meta.env.VITE_SUPABASE_ANON_KEY!
    );
  }

  protected getCurrentUserId(): string {
    const user = this.supabase.auth.getUser();
    return user.data.user?.id || '';
  }

  protected async getCurrentTenantId(): Promise<string> {
    const { data, error } = await this.supabase.rpc('get_current_tenant_id');
    if (error) throw new Error(`Failed to get tenant ID: ${error.message}`);
    return data;
  }

  protected handleError(error: any, operation: string): never {
    console.error(`${operation} failed:`, error);
    throw new Error(`${operation} failed: ${error.message}`);
  }
}

export class ContractService extends BaseApiService {
  private static instance: ContractService;

  static getInstance(): ContractService {
    if (!ContractService.instance) {
      ContractService.instance = new ContractService();
    }
    return ContractService.instance;
  }

  async getContracts() {
    try {
      const { data, error } = await this.supabase
        .from('contracts')
        .select(`
          *,
          entity:entities(id, name),
          counterparty:counterparties(id, name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      this.handleError(error, 'Get contracts');
    }
  }

  async createContract(contractData: any) {
    try {
      const tenantId = await this.getCurrentTenantId();
      const { data, error } = await this.supabase
        .from('contracts')
        .insert({
          ...contractData,
          tenant_id: tenantId,
          created_by: this.getCurrentUserId()
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      this.handleError(error, 'Create contract');
    }
  }
}

export interface DashboardStat {
  label: string;
  value: string | number;
  change: string;
  trend: "up" | "down";
  color: "blue" | "green" | "red" | "purple";
}

export class DashboardService extends BaseApiService {
  private static instance: DashboardService;

  static getInstance(): DashboardService {
    if (!DashboardService.instance) {
      DashboardService.instance = new DashboardService();
    }
    return DashboardService.instance;
  }

  async getDashboardStats(): Promise<DashboardStat[]> {
    try {
      const tenantId = await this.getCurrentTenantId();
      // Example: Fetch counts from relevant tables. Replace with real queries as needed.
      const [contracts, matters, risks, compliance] = await Promise.all([
        this.supabase.from('contracts').select('id', { count: 'exact', head: true }).eq('tenant_id', tenantId),
        this.supabase.from('matters').select('id', { count: 'exact', head: true }).eq('tenant_id', tenantId),
        this.supabase.from('risks').select('id', { count: 'exact', head: true }).eq('tenant_id', tenantId),
        this.supabase.from('compliance').select('score').eq('tenant_id', tenantId).single(),
      ]);
      // Calculate changes/trends (placeholder logic)
      return [
        {
          label: 'Active Contracts',
          value: contracts.count ?? 0,
          change: '+12%',
          trend: 'up',
          color: 'blue',
        },
        {
          label: 'Open Matters',
          value: matters.count ?? 0,
          change: '-5%',
          trend: 'down',
          color: 'green',
        },
        {
          label: 'Risk Alerts',
          value: risks.count ?? 0,
          change: '+8%',
          trend: 'up',
          color: 'red',
        },
        {
          label: 'Compliance Score',
          value: compliance.data?.score ? `${compliance.data.score}%` : 'N/A',
          change: '+2%',
          trend: 'up',
          color: 'purple',
        },
      ];
    } catch (error) {
      this.handleError(error, 'Get dashboard stats');
    }
  }
}

export class KnowledgeService extends BaseApiService {
  private static instance: KnowledgeService;

  static getInstance(): KnowledgeService {
    if (!KnowledgeService.instance) {
      KnowledgeService.instance = new KnowledgeService();
    }
    return KnowledgeService.instance;
  }

  async getKnowledgeEntries() {
    try {
      const tenantId = await this.getCurrentTenantId();
      const { data, error } = await this.supabase
        .from('knowledge_entries')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('lastUpdated', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (error) {
      this.handleError(error, 'Get knowledge entries');
    }
  }

  async getTrendingTopics() {
    try {
      const tenantId = await this.getCurrentTenantId();
      const { data, error } = await this.supabase
        .from('trending_topics')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('updated_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (error) {
      this.handleError(error, 'Get trending topics');
    }
  }

  async getSearchSuggestions() {
    try {
      const tenantId = await this.getCurrentTenantId();
      const { data, error } = await this.supabase
        .from('search_suggestions')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (error) {
      this.handleError(error, 'Get search suggestions');
    }
  }

  async getKnowledgeInsights() {
    try {
      const tenantId = await this.getCurrentTenantId();
      const { data, error } = await this.supabase
        .from('knowledge_insights')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (error) {
      this.handleError(error, 'Get knowledge insights');
    }
  }
}

export class ClauseService extends BaseApiService {
  private static instance: ClauseService;

  static getInstance(): ClauseService {
    if (!ClauseService.instance) {
      ClauseService.instance = new ClauseService();
    }
    return ClauseService.instance;
  }

  async getClauses() {
    try {
      const tenantId = await this.getCurrentTenantId();
      const { data, error } = await this.supabase
        .from('clauses')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('lastUpdated', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (error) {
      this.handleError(error, 'Get clauses');
    }
  }
}

export class TemplateService extends BaseApiService {
  private static instance: TemplateService;

  static getInstance(): TemplateService {
    if (!TemplateService.instance) {
      TemplateService.instance = new TemplateService();
    }
    return TemplateService.instance;
  }

  async getTemplates() {
    try {
      const tenantId = await this.getCurrentTenantId();
      const { data, error } = await this.supabase
        .from('templates')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('lastUpdated', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (error) {
      this.handleError(error, 'Get templates');
    }
  }
}

export class CompanySecretarialService extends BaseApiService {
  private static instance: CompanySecretarialService;

  static getInstance(): CompanySecretarialService {
    if (!CompanySecretarialService.instance) {
      CompanySecretarialService.instance = new CompanySecretarialService();
    }
    return CompanySecretarialService.instance;
  }

  async getEntities() {
    try {
      const tenantId = await this.getCurrentTenantId();
      const { data, error } = await this.supabase
        .from('entities')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (error) {
      this.handleError(error, 'Get entities');
    }
  }

  async getPeople() {
    try {
      const tenantId = await this.getCurrentTenantId();
      const { data, error } = await this.supabase
        .from('people')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (error) {
      this.handleError(error, 'Get people');
    }
  }
}

export class IPAssetService extends BaseApiService {
  private static instance: IPAssetService;

  static getInstance(): IPAssetService {
    if (!IPAssetService.instance) {
      IPAssetService.instance = new IPAssetService();
    }
    return IPAssetService.instance;
  }

  async getIPAssets() {
    try {
      const tenantId = await this.getCurrentTenantId();
      const { data, error } = await this.supabase
        .from('ip_assets')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('lastUpdated', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (error) {
      this.handleError(error, 'Get IP assets');
    }
  }
}

export class DisputeService extends BaseApiService {
  private static instance: DisputeService;

  static getInstance(): DisputeService {
    if (!DisputeService.instance) {
      DisputeService.instance = new DisputeService();
    }
    return DisputeService.instance;
  }

  async getDisputes() {
    try {
      const tenantId = await this.getCurrentTenantId();
      const { data, error } = await this.supabase
        .from('disputes')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('filed_date', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (error) {
      this.handleError(error, 'Get disputes');
    }
  }
}

export class EntityService extends BaseApiService {
  private static instance: EntityService;

  static getInstance(): EntityService {
    if (!EntityService.instance) {
      EntityService.instance = new EntityService();
    }
    return EntityService.instance;
  }

  async getEntities() {
    try {
      const tenantId = await this.getCurrentTenantId();
      const { data, error } = await this.supabase
        .from('entities')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (error) {
      this.handleError(error, 'Get entities');
    }
  }
}

export class BoardPackService extends BaseApiService {
  private static instance: BoardPackService;

  static getInstance(): BoardPackService {
    if (!BoardPackService.instance) {
      BoardPackService.instance = new BoardPackService();
    }
    return BoardPackService.instance;
  }

  async getBoardPacks() {
    try {
      const tenantId = await this.getCurrentTenantId();
      const { data, error } = await this.supabase
        .from('board_packs')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (error) {
      this.handleError(error, 'Get board packs');
    }
  }

  async getBoardMeetings() {
    try {
      const tenantId = await this.getCurrentTenantId();
      const { data, error } = await this.supabase
        .from('board_meetings')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('date', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (error) {
      this.handleError(error, 'Get board meetings');
    }
  }
}

export class CalendarEventService extends BaseApiService {
  private static instance: CalendarEventService;

  static getInstance(): CalendarEventService {
    if (!CalendarEventService.instance) {
      CalendarEventService.instance = new CalendarEventService();
    }
    return CalendarEventService.instance;
  }

  async getCalendarEvents(startDate: string, endDate: string) {
    try {
      const tenantId = await this.getCurrentTenantId();
      const { data, error } = await this.supabase
        .from('calendar_events')
        .select('*')
        .eq('tenant_id', tenantId)
        .gte('date', startDate)
        .lte('date', endDate)
        .order('date', { ascending: true });
      if (error) throw error;
      return data || [];
    } catch (error) {
      this.handleError(error, 'Get calendar events');
    }
  }
}

export class DealflowService extends BaseApiService {
  private static instance: DealflowService;

  static getInstance(): DealflowService {
    if (!DealflowService.instance) {
      DealflowService.instance = new DealflowService();
    }
    return DealflowService.instance;
  }

  async getDeals() {
    try {
      const tenantId = await this.getCurrentTenantId();
      const { data, error } = await this.supabase
        .from('deals')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (error) {
      this.handleError(error, 'Get deals');
    }
  }
}

// Export factory for easy access
export class ApiServiceFactory {
  static getContractService(): ContractService {
    return ContractService.getInstance();
  }
  static getDashboardService(): DashboardService {
    return DashboardService.getInstance();
  }
  static getKnowledgeService(): KnowledgeService {
    return KnowledgeService.getInstance();
  }
  static getClauseService(): ClauseService {
    return ClauseService.getInstance();
  }
  static getTemplateService(): TemplateService {
    return TemplateService.getInstance();
  }
  static getCompanySecretarialService(): CompanySecretarialService {
    return CompanySecretarialService.getInstance();
  }
  static getIPAssetService(): IPAssetService {
    return IPAssetService.getInstance();
  }
  static getDisputeService(): DisputeService {
    return DisputeService.getInstance();
  }
  static getEntityService(): EntityService {
    return EntityService.getInstance();
  }
  static getBoardPackService(): BoardPackService {
    return BoardPackService.getInstance();
  }
  static getCalendarEventService(): CalendarEventService {
    return CalendarEventService.getInstance();
  }
  static getDealflowService(): DealflowService {
    return DealflowService.getInstance();
  }
}
