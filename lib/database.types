export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      cards: {
        Row: {
          id: string
          deck_id: string
          front_content: string
          back_content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          deck_id: string
          front_content: string
          back_content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          deck_id?: string
          front_content?: string
          back_content?: string
          created_at?: string
          updated_at?: string
        }
      }
      decks: {
        Row: {
          id: string
          title: string
          description: string | null
          created_by: string | null
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          created_by?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          created_by?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          card_id: string
          familiarity_level: number
          last_reviewed: string
          next_review: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          card_id: string
          familiarity_level?: number
          last_reviewed?: string
          next_review?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          card_id?: string
          familiarity_level?: number
          last_reviewed?: string
          next_review?: string
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          display_name: string | null
          avatar_url: string | null
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          display_name?: string | null
          avatar_url?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          display_name?: string | null
          avatar_url?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
