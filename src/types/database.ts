// Enhanced database types - Auto-generated for CounselFlow
export interface Database {
  public: {
    Tables: {
      tenants: {
        Row: {
          id: string;
          name: string;
          slug: string;
          type: 'demo' | 'individual' | 'organization' | 'enterprise';
          domain: string | null;
          settings: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          type?: 'demo' | 'individual' | 'organization' | 'enterprise';
          domain?: string | null;
          settings?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          slug?: string;
          type?: 'demo' | 'individual' | 'organization' | 'enterprise';
          domain?: string | null;
          settings?: Json;
          updated_at?: string;
        };
      };
      tenant_members: {
        Row: {
          id: string;
          tenant_id: string;
          user_id: string;
          role: 'owner' | 'admin' | 'member' | 'viewer';
          permissions: string[];
          status: 'pending' | 'active' | 'suspended';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          tenant_id: string;
          user_id: string;
          role?: 'owner' | 'admin' | 'member' | 'viewer';
          permissions?: string[];
          status?: 'pending' | 'active' | 'suspended';
        };
        Update: {
          role?: 'owner' | 'admin' | 'member' | 'viewer';
          permissions?: string[];
          status?: 'pending' | 'active' | 'suspended';
        };
      };
      knowledge_entries: {
        Row: {
          id: string;
          title: string;
          type: string;
          author: string;
          jurisdiction: string;
          entity: string;
          status: string;
          accessLevel: string;
          views: number;
          lastUpdated: string;
          // Add other fields as needed
        };
        Insert: {
          title: string;
          type: string;
          author: string;
          jurisdiction: string;
          entity: string;
          status: string;
          accessLevel: string;
          views?: number;
          lastUpdated?: string;
        };
        Update: {
          title?: string;
          type?: string;
          author?: string;
          jurisdiction?: string;
          entity?: string;
          status?: string;
          accessLevel?: string;
          views?: number;
          lastUpdated?: string;
        };
      };
      clauses: {
        Row: {
          id: string;
          title: string;
          type: string;
          risk: string;
          jurisdiction: string;
          entity: string;
          status: string;
          accessLevel: string;
          lastUpdated: string;
          author: string;
          content: string;
          // Add other fields as needed
        };
        Insert: {
          title: string;
          type: string;
          risk: string;
          jurisdiction: string;
          entity: string;
          status: string;
          accessLevel: string;
          lastUpdated?: string;
          author: string;
          content: string;
        };
        Update: {
          title?: string;
          type?: string;
          risk?: string;
          jurisdiction?: string;
          entity?: string;
          status?: string;
          accessLevel?: string;
          lastUpdated?: string;
          author?: string;
          content?: string;
        };
      };
      templates: {
        Row: {
          id: string;
          title: string;
          type: string;
          jurisdiction: string;
          entity: string;
          status: string;
          accessLevel: string;
          lastUpdated: string;
          author: string;
          content: string;
          // Add other fields as needed
        };
        Insert: {
          title: string;
          type: string;
          jurisdiction: string;
          entity: string;
          status: string;
          accessLevel: string;
          lastUpdated?: string;
          author: string;
          content: string;
        };
        Update: {
          title?: string;
          type?: string;
          jurisdiction?: string;
          entity?: string;
          status?: string;
          accessLevel?: string;
          lastUpdated?: string;
          author?: string;
          content?: string;
        };
      };
      entities: {
        Row: {
          id: string;
          name: string;
          type: string;
          jurisdiction: string;
          registrationNumber: string;
          status: string;
          created_at: string;
          updated_at: string;
          // Add other fields as needed
        };
        Insert: {
          name: string;
          type: string;
          jurisdiction: string;
          registrationNumber: string;
          status: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          type?: string;
          jurisdiction?: string;
          registrationNumber?: string;
          status?: string;
          updated_at?: string;
        };
      };
      people: {
        Row: {
          id: string;
          name: string;
          role: string;
          entityId: string;
          email: string;
          status: string;
          created_at: string;
          updated_at: string;
          // Add other fields as needed
        };
        Insert: {
          name: string;
          role: string;
          entityId: string;
          email: string;
          status: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          role?: string;
          entityId?: string;
          email?: string;
          status?: string;
          updated_at?: string;
        };
      };
      ip_assets: {
        Row: {
          id: string;
          title: string;
          type: string;
          jurisdiction: string;
          entity: string;
          status: string;
          registrationNumber: string;
          expiryDate: string;
          owner: string;
          lastUpdated: string;
          // Add other fields as needed
        };
        Insert: {
          title: string;
          type: string;
          jurisdiction: string;
          entity: string;
          status: string;
          registrationNumber: string;
          expiryDate: string;
          owner: string;
          lastUpdated?: string;
        };
        Update: {
          title?: string;
          type?: string;
          jurisdiction?: string;
          entity?: string;
          status?: string;
          registrationNumber?: string;
          expiryDate?: string;
          owner?: string;
          lastUpdated?: string;
        };
      };
      disputes: {
        Row: {
          id: string;
          title: string;
          type: string;
          status: string;
          filed_date: string;
          jurisdiction: string;
          entity: string;
          description: string;
          lastUpdated: string;
          // Add other fields as needed
        };
        Insert: {
          title: string;
          type: string;
          status: string;
          filed_date: string;
          jurisdiction: string;
          entity: string;
          description: string;
          lastUpdated?: string;
        };
        Update: {
          title?: string;
          type?: string;
          status?: string;
          filed_date?: string;
          jurisdiction?: string;
          entity?: string;
          description?: string;
          lastUpdated?: string;
        };
      };
      board_packs: {
        Row: {
          id: string;
          meetingId: string;
          title: string;
          files: string[];
          created_at: string;
          updated_at: string;
          status: string;
          // Add other fields as needed
        };
        Insert: {
          meetingId: string;
          title: string;
          files: string[];
          status: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          meetingId?: string;
          title?: string;
          files?: string[];
          status?: string;
          updated_at?: string;
        };
      };
      board_meetings: {
        Row: {
          id: string;
          title: string;
          type: string;
          date: string;
          time: string;
          location: string;
          agenda: string;
          attendees: string;
          created_at: string;
          updated_at: string;
          // Add other fields as needed
        };
        Insert: {
          title: string;
          type: string;
          date: string;
          time: string;
          location: string;
          agenda: string;
          attendees: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          type?: string;
          date?: string;
          time?: string;
          location?: string;
          agenda?: string;
          attendees?: string;
          updated_at?: string;
        };
      };
      calendar_events: {
        Row: {
          id: string;
          meetingId: string;
          title: string;
          entityName: string;
          date: string;
          time: string;
          type: 'board' | 'agm' | 'egm' | 'committee';
          status: 'tentative' | 'confirmed' | 'completed' | 'cancelled';
          location: string;
          isVirtual: boolean;
          attendeeCount: number;
          hasNoticeRequirement: boolean;
          noticeDeadline?: string;
          noticeSent: boolean;
        };
        Insert: {
          meetingId: string;
          title: string;
          entityName: string;
          date: string;
          time: string;
          type: 'board' | 'agm' | 'egm' | 'committee';
          status: 'tentative' | 'confirmed' | 'completed' | 'cancelled';
          location: string;
          isVirtual: boolean;
          attendeeCount: number;
          hasNoticeRequirement: boolean;
          noticeDeadline?: string;
          noticeSent: boolean;
        };
        Update: {
          meetingId?: string;
          title?: string;
          entityName?: string;
          date?: string;
          time?: string;
          type?: 'board' | 'agm' | 'egm' | 'committee';
          status?: 'tentative' | 'confirmed' | 'completed' | 'cancelled';
          location?: string;
          isVirtual?: boolean;
          attendeeCount?: number;
          hasNoticeRequirement?: boolean;
          noticeDeadline?: string;
          noticeSent?: boolean;
        };
      };
      deals: {
        Row: {
          id: string;
          tenant_id: string;
          name: string;
          status: string;
          priority: string;
          sector: string;
          dealSize: number;
          geography: string;
          timeline: string;
          probability: number;
          riskLevel: string;
          owner: string;
          created_at: string;
          updated_at: string;
          // Add other fields as needed
        };
        Insert: {
          tenant_id: string;
          name: string;
          status: string;
          priority: string;
          sector: string;
          dealSize: number;
          geography: string;
          timeline: string;
          probability: number;
          riskLevel: string;
          owner: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          status?: string;
          priority?: string;
          sector?: string;
          dealSize?: number;
          geography?: string;
          timeline?: string;
          probability?: number;
          riskLevel?: string;
          owner?: string;
          updated_at?: string;
        };
      };
      // Add other table types as needed...
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_current_tenant_id: {
        Args: {};
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

// Convenience types
export type Tenant = Database['public']['Tables']['tenants']['Row'];
export type TenantInsert = Database['public']['Tables']['tenants']['Insert'];
export type TenantUpdate = Database['public']['Tables']['tenants']['Update'];

// Add other convenience types...
