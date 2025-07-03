[?25l
    Select a project:                                                                                                         
                                                                                                                              
  >  1. ehkheazglsjqdroyildl [name: Naeem H - CounselFlow Vibe Code (Supabase), org: zddbifwvdycejchhxewo, region: eu-north-1]
    2. aiuipddhwnprlwgpmmfe [name: CounselFlow Experiment 1, org: xyhlyauotqlyjbkbsjao, region: eu-west-2]                    
    3. ktftnfrayrhcvelfcsut [name: Lovable Experiment 1, org: xyhlyauotqlyjbkbsjao, region: eu-west-2]                        
                                                                                                                              
                                                                                                                              
                                                                                                                              
                                                                                                                              
                                                                                                                              
                                                                                                                              
    ↑/k up • ↓/j down • / filter • q quit • ? more                                                                            
                                                                                                                              [0D[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[0D[2K [0D[2K[?25h[?1002l[?1003l[?1006lexport type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agenda_items: {
        Row: {
          description: string | null
          estimated_duration_mins: number | null
          id: string
          meeting_id: string
          order_num: number
          presenter_id: string | null
          title: string
        }
        Insert: {
          description?: string | null
          estimated_duration_mins?: number | null
          id?: string
          meeting_id: string
          order_num: number
          presenter_id?: string | null
          title: string
        }
        Update: {
          description?: string | null
          estimated_duration_mins?: number | null
          id?: string
          meeting_id?: string
          order_num?: number
          presenter_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "agenda_items_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "board_meetings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agenda_items_presenter_id_fkey"
            columns: ["presenter_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
        ]
      }
      board_meetings: {
        Row: {
          created_at: string
          entity_id: string
          id: string
          location: string | null
          minutes: string | null
          scheduled_date: string
          status: string
          title: string
          type: Database["public"]["Enums"]["meeting_type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          entity_id: string
          id?: string
          location?: string | null
          minutes?: string | null
          scheduled_date: string
          status?: string
          title: string
          type: Database["public"]["Enums"]["meeting_type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          entity_id?: string
          id?: string
          location?: string | null
          minutes?: string | null
          scheduled_date?: string
          status?: string
          title?: string
          type?: Database["public"]["Enums"]["meeting_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "board_meetings_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
        ]
      }
      constitutional_documents: {
        Row: {
          created_at: string
          entity_id: string
          file_url: string | null
          id: string
          status: string | null
          title: string
          type: string
          upload_date: string | null
          version: string | null
        }
        Insert: {
          created_at?: string
          entity_id: string
          file_url?: string | null
          id?: string
          status?: string | null
          title: string
          type: string
          upload_date?: string | null
          version?: string | null
        }
        Update: {
          created_at?: string
          entity_id?: string
          file_url?: string | null
          id?: string
          status?: string | null
          title?: string
          type?: string
          upload_date?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "constitutional_documents_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_disputes: {
        Row: {
          contract_id: string
          dispute_id: string
        }
        Insert: {
          contract_id: string
          dispute_id: string
        }
        Update: {
          contract_id?: string
          dispute_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contract_disputes_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_disputes_dispute_id_fkey"
            columns: ["dispute_id"]
            isOneToOne: false
            referencedRelation: "disputes"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_matters: {
        Row: {
          contract_id: string
          matter_id: string
        }
        Insert: {
          contract_id: string
          matter_id: string
        }
        Update: {
          contract_id?: string
          matter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contract_matters_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_matters_matter_id_fkey"
            columns: ["matter_id"]
            isOneToOne: false
            referencedRelation: "matters"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_risks: {
        Row: {
          contract_id: string
          risk_id: string
        }
        Insert: {
          contract_id: string
          risk_id: string
        }
        Update: {
          contract_id?: string
          risk_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contract_risks_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_risks_risk_id_fkey"
            columns: ["risk_id"]
            isOneToOne: false
            referencedRelation: "risks"
            referencedColumns: ["id"]
          },
        ]
      }
      contracts: {
        Row: {
          contract_value: number | null
          counterparty_id: string
          created_at: string
          currency: string | null
          effective_date: string | null
          entity_id: string
          expiration_date: string | null
          id: string
          is_auto_renewal: boolean | null
          renewal_notice_days: number | null
          responsible_person_id: string | null
          status: Database["public"]["Enums"]["contract_status"]
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          contract_value?: number | null
          counterparty_id: string
          created_at?: string
          currency?: string | null
          effective_date?: string | null
          entity_id: string
          expiration_date?: string | null
          id?: string
          is_auto_renewal?: boolean | null
          renewal_notice_days?: number | null
          responsible_person_id?: string | null
          status?: Database["public"]["Enums"]["contract_status"]
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          contract_value?: number | null
          counterparty_id?: string
          created_at?: string
          currency?: string | null
          effective_date?: string | null
          entity_id?: string
          expiration_date?: string | null
          id?: string
          is_auto_renewal?: boolean | null
          renewal_notice_days?: number | null
          responsible_person_id?: string | null
          status?: Database["public"]["Enums"]["contract_status"]
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contracts_counterparty_id_fkey"
            columns: ["counterparty_id"]
            isOneToOne: false
            referencedRelation: "counterparties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_responsible_person_id_fkey"
            columns: ["responsible_person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
        ]
      }
      counterparties: {
        Row: {
          created_at: string
          id: string
          jurisdiction: string | null
          name: string
          risk_rating: Database["public"]["Enums"]["risk_level"] | null
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          jurisdiction?: string | null
          name: string
          risk_rating?: Database["public"]["Enums"]["risk_level"] | null
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          jurisdiction?: string | null
          name?: string
          risk_rating?: Database["public"]["Enums"]["risk_level"] | null
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      disputes: {
        Row: {
          counterparty_id: string | null
          created_at: string
          currency: string | null
          dispute_id: string
          entity_id: string
          exposure_amount: number | null
          id: string
          initiated_date: string
          priority: Database["public"]["Enums"]["priority_level"]
          status: Database["public"]["Enums"]["dispute_status"]
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          counterparty_id?: string | null
          created_at?: string
          currency?: string | null
          dispute_id: string
          entity_id: string
          exposure_amount?: number | null
          id?: string
          initiated_date?: string
          priority?: Database["public"]["Enums"]["priority_level"]
          status?: Database["public"]["Enums"]["dispute_status"]
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          counterparty_id?: string | null
          created_at?: string
          currency?: string | null
          dispute_id?: string
          entity_id?: string
          exposure_amount?: number | null
          id?: string
          initiated_date?: string
          priority?: Database["public"]["Enums"]["priority_level"]
          status?: Database["public"]["Enums"]["dispute_status"]
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "disputes_counterparty_id_fkey"
            columns: ["counterparty_id"]
            isOneToOne: false
            referencedRelation: "counterparties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "disputes_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
        ]
      }
      entities: {
        Row: {
          company_number: string | null
          created_at: string
          id: string
          incorporation_date: string | null
          industry: string | null
          jurisdiction: string
          name: string
          parent_entity_id: string | null
          registered_address: string | null
          status: string
          type: Database["public"]["Enums"]["entity_type"]
          updated_at: string
        }
        Insert: {
          company_number?: string | null
          created_at?: string
          id?: string
          incorporation_date?: string | null
          industry?: string | null
          jurisdiction: string
          name: string
          parent_entity_id?: string | null
          registered_address?: string | null
          status?: string
          type: Database["public"]["Enums"]["entity_type"]
          updated_at?: string
        }
        Update: {
          company_number?: string | null
          created_at?: string
          id?: string
          incorporation_date?: string | null
          industry?: string | null
          jurisdiction?: string
          name?: string
          parent_entity_id?: string | null
          registered_address?: string | null
          status?: string
          type?: Database["public"]["Enums"]["entity_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "entities_parent_entity_id_fkey"
            columns: ["parent_entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
        ]
      }
      ip_assets: {
        Row: {
          created_at: string
          entity_id: string
          expiration_date: string | null
          id: string
          jurisdiction: string | null
          registration_date: string | null
          registration_number: string | null
          status: Database["public"]["Enums"]["ip_asset_status"]
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          entity_id: string
          expiration_date?: string | null
          id?: string
          jurisdiction?: string | null
          registration_date?: string | null
          registration_number?: string | null
          status: Database["public"]["Enums"]["ip_asset_status"]
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          entity_id?: string
          expiration_date?: string | null
          id?: string
          jurisdiction?: string | null
          registration_date?: string | null
          registration_number?: string | null
          status?: Database["public"]["Enums"]["ip_asset_status"]
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ip_assets_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
        ]
      }
      matter_disputes: {
        Row: {
          dispute_id: string
          matter_id: string
        }
        Insert: {
          dispute_id: string
          matter_id: string
        }
        Update: {
          dispute_id?: string
          matter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "matter_disputes_dispute_id_fkey"
            columns: ["dispute_id"]
            isOneToOne: false
            referencedRelation: "disputes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matter_disputes_matter_id_fkey"
            columns: ["matter_id"]
            isOneToOne: false
            referencedRelation: "matters"
            referencedColumns: ["id"]
          },
        ]
      }
      matter_risks: {
        Row: {
          matter_id: string
          risk_id: string
        }
        Insert: {
          matter_id: string
          risk_id: string
        }
        Update: {
          matter_id?: string
          risk_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "matter_risks_matter_id_fkey"
            columns: ["matter_id"]
            isOneToOne: false
            referencedRelation: "matters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matter_risks_risk_id_fkey"
            columns: ["risk_id"]
            isOneToOne: false
            referencedRelation: "risks"
            referencedColumns: ["id"]
          },
        ]
      }
      matters: {
        Row: {
          budgeted_costs: number | null
          created_at: string
          description: string | null
          entity_id: string
          id: string
          matter_number: string
          open_date: string
          priority: Database["public"]["Enums"]["priority_level"]
          responsible_lawyer_id: string | null
          status: Database["public"]["Enums"]["matter_status"]
          target_close_date: string | null
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          budgeted_costs?: number | null
          created_at?: string
          description?: string | null
          entity_id: string
          id?: string
          matter_number: string
          open_date?: string
          priority?: Database["public"]["Enums"]["priority_level"]
          responsible_lawyer_id?: string | null
          status?: Database["public"]["Enums"]["matter_status"]
          target_close_date?: string | null
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          budgeted_costs?: number | null
          created_at?: string
          description?: string | null
          entity_id?: string
          id?: string
          matter_number?: string
          open_date?: string
          priority?: Database["public"]["Enums"]["priority_level"]
          responsible_lawyer_id?: string | null
          status?: Database["public"]["Enums"]["matter_status"]
          target_close_date?: string | null
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "matters_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matters_responsible_lawyer_id_fkey"
            columns: ["responsible_lawyer_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
        ]
      }
      meeting_attendees: {
        Row: {
          id: string
          meeting_id: string
          name: string
          person_id: string | null
          response_status: Database["public"]["Enums"]["attendee_status"] | null
          role: Database["public"]["Enums"]["attendee_role"]
        }
        Insert: {
          id?: string
          meeting_id: string
          name: string
          person_id?: string | null
          response_status?:
            | Database["public"]["Enums"]["attendee_status"]
            | null
          role: Database["public"]["Enums"]["attendee_role"]
        }
        Update: {
          id?: string
          meeting_id?: string
          name?: string
          person_id?: string | null
          response_status?:
            | Database["public"]["Enums"]["attendee_status"]
            | null
          role?: Database["public"]["Enums"]["attendee_role"]
        }
        Relationships: [
          {
            foreignKeyName: "meeting_attendees_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "board_meetings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meeting_attendees_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
        ]
      }
      members: {
        Row: {
          role: string
          tenant_id: string
          user_id: string
        }
        Insert: {
          role: string
          tenant_id: string
          user_id: string
        }
        Update: {
          role?: string
          tenant_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "members_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      people: {
        Row: {
          auth_user_id: string | null
          created_at: string
          department: string | null
          email: string
          entity_id: string | null
          first_name: string
          id: string
          is_active: boolean | null
          last_name: string
          roles: string[] | null
          title: string | null
          updated_at: string
        }
        Insert: {
          auth_user_id?: string | null
          created_at?: string
          department?: string | null
          email: string
          entity_id?: string | null
          first_name: string
          id?: string
          is_active?: boolean | null
          last_name: string
          roles?: string[] | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          auth_user_id?: string | null
          created_at?: string
          department?: string | null
          email?: string
          entity_id?: string | null
          first_name?: string
          id?: string
          is_active?: boolean | null
          last_name?: string
          roles?: string[] | null
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "people_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
        ]
      }
      policies: {
        Row: {
          category: string
          content: string | null
          created_at: string
          effective_date: string | null
          entity_id: string | null
          id: string
          next_review_date: string | null
          owner_id: string | null
          status: Database["public"]["Enums"]["policy_status"]
          title: string
          updated_at: string
          version: string
        }
        Insert: {
          category: string
          content?: string | null
          created_at?: string
          effective_date?: string | null
          entity_id?: string | null
          id?: string
          next_review_date?: string | null
          owner_id?: string | null
          status?: Database["public"]["Enums"]["policy_status"]
          title: string
          updated_at?: string
          version?: string
        }
        Update: {
          category?: string
          content?: string | null
          created_at?: string
          effective_date?: string | null
          entity_id?: string | null
          id?: string
          next_review_date?: string | null
          owner_id?: string | null
          status?: Database["public"]["Enums"]["policy_status"]
          title?: string
          updated_at?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "policies_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "policies_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
        ]
      }
      risks: {
        Row: {
          category: string
          created_at: string
          id: string
          identified_date: string
          mitigation_plan: string | null
          owner_id: string | null
          probability: string
          review_date: string | null
          risk_id: string
          risk_score: number
          severity: Database["public"]["Enums"]["risk_level"]
          status: Database["public"]["Enums"]["risk_status"]
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          identified_date?: string
          mitigation_plan?: string | null
          owner_id?: string | null
          probability: string
          review_date?: string | null
          risk_id: string
          risk_score: number
          severity: Database["public"]["Enums"]["risk_level"]
          status?: Database["public"]["Enums"]["risk_status"]
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          identified_date?: string
          mitigation_plan?: string | null
          owner_id?: string | null
          probability?: string
          review_date?: string | null
          risk_id?: string
          risk_score?: number
          severity?: Database["public"]["Enums"]["risk_level"]
          status?: Database["public"]["Enums"]["risk_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "risks_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      attendee_role: "director" | "secretary" | "observer" | "advisor"
      attendee_status: "pending" | "accepted" | "declined" | "tentative"
      contract_status:
        | "draft"
        | "under_review"
        | "approved"
        | "executed"
        | "active"
        | "expiring"
        | "expired"
        | "terminated"
        | "renewed"
      dispute_status:
        | "open"
        | "in_review"
        | "negotiation"
        | "mediation"
        | "arbitration"
        | "litigation"
        | "escalated"
        | "resolved"
        | "closed"
      entity_type:
        | "subsidiary"
        | "parent"
        | "holding_company"
        | "joint_venture"
        | "branch"
        | "partnership"
      ip_asset_status:
        | "pending"
        | "registered"
        | "rejected"
        | "expired"
        | "abandoned"
      matter_status:
        | "open"
        | "in_progress"
        | "pending_review"
        | "on_hold"
        | "completed"
        | "cancelled"
      meeting_type:
        | "board"
        | "agm"
        | "egm"
        | "committee"
        | "audit"
        | "remuneration"
      policy_status:
        | "draft"
        | "under_review"
        | "approved"
        | "active"
        | "archived"
      priority_level: "low" | "medium" | "high" | "critical"
      risk_level: "low" | "medium" | "high" | "critical"
      risk_status: "active" | "monitoring" | "mitigated" | "closed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      attendee_role: ["director", "secretary", "observer", "advisor"],
      attendee_status: ["pending", "accepted", "declined", "tentative"],
      contract_status: [
        "draft",
        "under_review",
        "approved",
        "executed",
        "active",
        "expiring",
        "expired",
        "terminated",
        "renewed",
      ],
      dispute_status: [
        "open",
        "in_review",
        "negotiation",
        "mediation",
        "arbitration",
        "litigation",
        "escalated",
        "resolved",
        "closed",
      ],
      entity_type: [
        "subsidiary",
        "parent",
        "holding_company",
        "joint_venture",
        "branch",
        "partnership",
      ],
      ip_asset_status: [
        "pending",
        "registered",
        "rejected",
        "expired",
        "abandoned",
      ],
      matter_status: [
        "open",
        "in_progress",
        "pending_review",
        "on_hold",
        "completed",
        "cancelled",
      ],
      meeting_type: [
        "board",
        "agm",
        "egm",
        "committee",
        "audit",
        "remuneration",
      ],
      policy_status: [
        "draft",
        "under_review",
        "approved",
        "active",
        "archived",
      ],
      priority_level: ["low", "medium", "high", "critical"],
      risk_level: ["low", "medium", "high", "critical"],
      risk_status: ["active", "monitoring", "mitigated", "closed"],
    },
  },
} as const
