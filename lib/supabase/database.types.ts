/**
 * lib/supabase/database.types.ts
 * -------------------------------------------------------
 * Professional types for Blorix (English only).
 * -------------------------------------------------------
 */

export type ArticleStatus = 'DRAFT' | 'PENDING_REVIEW' | 'PUBLISHED'
export type UserRole = 'admin' | 'user'

export interface UserProfile {
  id: string
  email: string
  role: UserRole
  created_at: string
}

export interface Category {
  id: string
  slug: string
  name: string
  created_at: string
}

export interface Article {
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
  categories?: Pick<Category, 'name'>
}
