/**
 * app/(admin)/dashboard/ai-review/page.tsx
 * -------------------------------------------------------
 * AI-Generated Content Review Queue.
 * Groups all PENDING_REVIEW + is_ai_generated articles by
 * category so editors can analyze, preview, and approve them.
 * -------------------------------------------------------
 */

import { createClient } from '@/lib/supabase/server'
import { Sparkles, Bot, CheckCircle2 } from 'lucide-react'
import AIReviewCategoryGroup from '@/app/(admin)/dashboard/ai-review/AIReviewCategoryGroup'
import GenerateTriggerButton from '@/app/(admin)/dashboard/ai-review/GenerateTriggerButton'

export const revalidate = 0 // Always fresh — review queue must be real-time

type ArticleRow = {
  id: string
  title: string
  body: string
  slug: string
  author_name: string
  created_at: string
  categories: { id: string; name: string; slug: string } | null
}

type CategoryGroup = {
  id: string
  name: string
  slug: string
  articles: ArticleRow[]
}

export default async function AIReviewPage() {
  const supabase = await createClient()

  // ── Fetch all AI-generated PENDING_REVIEW articles ────────
  const { data, error } = await supabase
    .from('articles')
    .select('id, title, body, slug, author_name, created_at, categories(id, name, slug)')
    .eq('status', 'PENDING_REVIEW')
    .eq('is_ai_generated', true)
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm font-medium">
        ⚠️ Error loading AI queue: {error.message}
      </div>
    )
  }

  const articles = (data ?? []) as unknown as ArticleRow[]

  // ── Group by category ────────────────────────────────────
  const grouped: Record<string, CategoryGroup> = {}
  for (const article of articles) {
    const cat = article.categories
    const key = cat?.id ?? 'uncategorized'
    if (!grouped[key]) {
      grouped[key] = {
        id: key,
        name: cat?.name ?? 'Uncategorized',
        slug: cat?.slug ?? '',
        articles: [],
      }
    }
    grouped[key].articles.push(article)
  }

  const groups = Object.values(grouped)

  return (
    <div className="space-y-8">
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="bg-violet-100 p-3 rounded-2xl">
            <Bot className="w-7 h-7 text-violet-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              AI Review Queue
              {articles.length > 0 && (
                <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-200">
                  {articles.length} pending
                </span>
              )}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              AI-generated articles awaiting editorial review. Preview, then approve to publish.
            </p>
          </div>
        </div>

        <GenerateTriggerButton />
      </div>

      {/* ── Stats row ────────────────────────────────────────── */}
      {groups.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {groups.map((g) => (
            <div
              key={g.id}
              className="bg-white border border-gray-100 rounded-2xl p-4 text-center shadow-sm"
            >
              <p className="text-2xl font-black text-violet-600">{g.articles.length}</p>
              <p className="text-[11px] font-semibold text-gray-500 mt-1 truncate">{g.name}</p>
            </div>
          ))}
        </div>
      )}

      {/* ── Empty State ──────────────────────────────────────── */}
      {groups.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 bg-white border border-dashed border-gray-200 rounded-2xl text-center">
          <div className="bg-violet-50 p-5 rounded-2xl mb-5 border border-violet-100">
            <Sparkles className="w-10 h-10 text-violet-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Queue is empty</h3>
          <p className="text-gray-400 text-sm max-w-xs mb-6">
            No AI-generated articles are waiting for review. Click{' '}
            <strong>Generate Now</strong> to create fresh content for all categories.
          </p>
          <CheckCircle2 className="w-8 h-8 text-green-400" />
        </div>
      )}

      {/* ── Category Groups ──────────────────────────────────── */}
      {groups.map((group) => (
        <AIReviewCategoryGroup key={group.id} group={group} />
      ))}
    </div>
  )
}
