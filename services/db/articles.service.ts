import { createClient } from '@/lib/supabase/server'
import { Database } from '@/lib/supabase/database.types'

type Article = Database['public']['Tables']['articles']['Row']
type ArticleInsert = Database['public']['Tables']['articles']['Insert']
type ArticleUpdate = Database['public']['Tables']['articles']['Update']

export class ArticlesService {
  /**
   * Fetches the latest published articles for the public frontend.
   */
  static async getPublishedArticles(limit: number = 10) {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('articles')
      .select('*, categories(*)')
      .eq('status', 'PUBLISHED')
      .order('published_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching published articles:', error)
      return []
    }
    return data
  }

  /**
   * Fetches articles pending review for the admin dashboard.
   */
  static async getPendingArticles() {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('articles')
      .select('*, categories(*)')
      .eq('status', 'PENDING_REVIEW')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching pending articles:', error)
      return []
    }
    return data
  }

  /**
   * Gets counts for dashboard metrics.
   */
  static async getDashboardMetrics() {
    const supabase = await createClient()
    
    const [pending, published] = await Promise.all([
      supabase.from('articles').select('*', { count: 'exact', head: true }).eq('status', 'PENDING_REVIEW'),
      supabase.from('articles').select('*', { count: 'exact', head: true }).eq('status', 'PUBLISHED')
    ])

    return {
      pendingCount: pending.count || 0,
      publishedCount: published.count || 0
    }
  }

  /**
   * Approves an AI generated article and publishes it.
   */
  static async approveArticle(id: string) {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('articles')
      .update({ status: 'PUBLISHED' })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to approve article: ${error.message}`)
    }
    return data
  }

  /**
   * Used by the AI pipeline to insert a new pending draft.
   */
  static async insertDraft(draft: ArticleInsert) {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('articles')
      .insert(draft)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to insert draft: ${error.message}`)
    }
    return data
  }
}
