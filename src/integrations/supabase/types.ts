export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      ai_signals: {
        Row: {
          confidence: number
          created_at: string
          id: string
          score: number | null
          signal_type: string
          symbol: string
          trigger_note: string | null
        }
        Insert: {
          confidence: number
          created_at?: string
          id?: string
          score?: number | null
          signal_type: string
          symbol: string
          trigger_note?: string | null
        }
        Update: {
          confidence?: number
          created_at?: string
          id?: string
          score?: number | null
          signal_type?: string
          symbol?: string
          trigger_note?: string | null
        }
        Relationships: []
      }
      crypto_assets: {
        Row: {
          change_percent: number
          id: string
          market_cap: number | null
          name: string
          price: number
          spark: Json | null
          symbol: string
          updated_at: string
          volume: number | null
        }
        Insert: {
          change_percent?: number
          id?: string
          market_cap?: number | null
          name: string
          price: number
          spark?: Json | null
          symbol: string
          updated_at?: string
          volume?: number | null
        }
        Update: {
          change_percent?: number
          id?: string
          market_cap?: number | null
          name?: string
          price?: number
          spark?: Json | null
          symbol?: string
          updated_at?: string
          volume?: number | null
        }
        Relationships: []
      }
      economic_events: {
        Row: {
          actual: string | null
          ai_note: string | null
          country: string
          created_at: string
          event_name: string
          event_time: string
          flag: string | null
          forecast: string | null
          id: string
          impact: number | null
          previous: string | null
        }
        Insert: {
          actual?: string | null
          ai_note?: string | null
          country: string
          created_at?: string
          event_name: string
          event_time: string
          flag?: string | null
          forecast?: string | null
          id?: string
          impact?: number | null
          previous?: string | null
        }
        Update: {
          actual?: string | null
          ai_note?: string | null
          country?: string
          created_at?: string
          event_name?: string
          event_time?: string
          flag?: string | null
          forecast?: string | null
          id?: string
          impact?: number | null
          previous?: string | null
        }
        Relationships: []
      }
      forex_pairs: {
        Row: {
          change_percent: number
          id: string
          pair: string
          price: number
          spark: Json | null
          updated_at: string
        }
        Insert: {
          change_percent?: number
          id?: string
          pair: string
          price: number
          spark?: Json | null
          updated_at?: string
        }
        Update: {
          change_percent?: number
          id?: string
          pair?: string
          price?: number
          spark?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      futures_markets: {
        Row: {
          change_percent: number
          id: string
          name: string
          price: number
          spark: Json | null
          symbol: string
          updated_at: string
        }
        Insert: {
          change_percent?: number
          id?: string
          name: string
          price: number
          spark?: Json | null
          symbol: string
          updated_at?: string
        }
        Update: {
          change_percent?: number
          id?: string
          name?: string
          price?: number
          spark?: Json | null
          symbol?: string
          updated_at?: string
        }
        Relationships: []
      }
      insider_trades: {
        Row: {
          created_at: string
          id: string
          insider_name: string
          price: number | null
          role: string | null
          shares: number
          symbol: string
          transaction_date: string
          transaction_type: string
          value: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          insider_name: string
          price?: number | null
          role?: string | null
          shares: number
          symbol: string
          transaction_date: string
          transaction_type: string
          value?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          insider_name?: string
          price?: number | null
          role?: string | null
          shares?: number
          symbol?: string
          transaction_date?: string
          transaction_type?: string
          value?: number | null
        }
        Relationships: []
      }
      market_breadth: {
        Row: {
          above_sma50: number
          advancing: number
          below_sma50: number
          declining: number
          fear_greed_index: number
          id: string
          new_highs: number
          new_lows: number
          updated_at: string
          vix: number | null
        }
        Insert: {
          above_sma50?: number
          advancing?: number
          below_sma50?: number
          declining?: number
          fear_greed_index?: number
          id?: string
          new_highs?: number
          new_lows?: number
          updated_at?: string
          vix?: number | null
        }
        Update: {
          above_sma50?: number
          advancing?: number
          below_sma50?: number
          declining?: number
          fear_greed_index?: number
          id?: string
          new_highs?: number
          new_lows?: number
          updated_at?: string
          vix?: number | null
        }
        Relationships: []
      }
      market_indices: {
        Row: {
          change: number
          change_percent: number
          created_at: string
          id: string
          name: string
          price: number
          spark: Json | null
          symbol: string
          updated_at: string
          volume: number
        }
        Insert: {
          change?: number
          change_percent?: number
          created_at?: string
          id?: string
          name: string
          price: number
          spark?: Json | null
          symbol: string
          updated_at?: string
          volume?: number
        }
        Update: {
          change?: number
          change_percent?: number
          created_at?: string
          id?: string
          name?: string
          price?: number
          spark?: Json | null
          symbol?: string
          updated_at?: string
          volume?: number
        }
        Relationships: []
      }
      market_news: {
        Row: {
          category: string | null
          created_at: string
          id: string
          impact: string | null
          published_at: string
          sentiment: string | null
          source: string
          summary: string | null
          title: string
          url: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: string
          impact?: string | null
          published_at?: string
          sentiment?: string | null
          source: string
          summary?: string | null
          title: string
          url?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: string
          impact?: string | null
          published_at?: string
          sentiment?: string | null
          source?: string
          summary?: string | null
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      stocks: {
        Row: {
          avg_volume: number | null
          change_percent: number
          company_name: string
          country: string | null
          created_at: string
          id: string
          industry: string | null
          market_cap: number | null
          price: number
          sector: string | null
          sentiment: number | null
          symbol: string
          updated_at: string
          volume: number
        }
        Insert: {
          avg_volume?: number | null
          change_percent?: number
          company_name: string
          country?: string | null
          created_at?: string
          id?: string
          industry?: string | null
          market_cap?: number | null
          price: number
          sector?: string | null
          sentiment?: number | null
          symbol: string
          updated_at?: string
          volume?: number
        }
        Update: {
          avg_volume?: number | null
          change_percent?: number
          company_name?: string
          country?: string | null
          created_at?: string
          id?: string
          industry?: string | null
          market_cap?: number | null
          price?: number
          sector?: string | null
          sentiment?: number | null
          symbol?: string
          updated_at?: string
          volume?: number
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
