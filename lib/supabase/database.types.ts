/**
 * lib/supabase/database.types.ts
 * -------------------------------------------------------
 * Professional types for Blorix.
 * -------------------------------------------------------
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type ArticleStatus = 'DRAFT' | 'PENDING_REVIEW' | 'PUBLISHED'
export type UserRole = 'admin' | 'user'

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: UserRole
          created_at: string
        }
        Insert: {
          id: string
          email: string
          role?: UserRole
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: UserRole
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          slug: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          created_at?: string
        }
      }
      articles: {
        Row: {
          id: string
          category_id: string
          status: ArticleStatus
          is_ai_generated: boolean
          author_name: string
          title: string
          body: string
          slug: string
          image_url: string | null
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id: string
          status?: ArticleStatus
          is_ai_generated?: boolean
          author_name?: string
          title: string
          body: string
          slug: string
          image_url?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category_id?: string
          status?: ArticleStatus
          is_ai_generated?: boolean
          author_name?: string
          title?: string
          body?: string
          slug?: string
          image_url?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      article_status: ArticleStatus
    }
  }
}

// Helper types for easy access
export type Article = Database['public']['Tables']['articles']['Row'] & {
  categories?: { name: string }
}
export type Category = Database['public']['Tables']['categories']['Row']
export type UserProfile = Database['public']['Tables']['users']['Row']

