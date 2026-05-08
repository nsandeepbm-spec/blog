import { createClient } from '@/lib/supabase/server'
import type { Category } from '@/lib/supabase/database.types'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import ArticleForm from '../ArticleForm'

export default async function NewArticlePage() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('categories')
    .select('id, name')
    .order('name', { ascending: true })

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm">
        ⚠️ Could not load categories: {error.message}
      </div>
    )
  }

  const categories = (data ?? []) as Pick<Category, 'id' | 'name'>[]

  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 bg-white border border-dashed border-gray-200 rounded-2xl text-center max-w-lg mx-auto">
        <div className="text-4xl mb-4">📂</div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">No Categories Found</h3>
        <p className="text-gray-500 text-sm max-w-xs mb-6">
          You need at least one category before creating an article. Add a category first, then come back here.
        </p>
        <Link
          href="/dashboard/categories"
          className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors"
        >
          Go to Categories →
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 p-2.5 rounded-xl">
          <Plus className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Article</h1>
          <p className="text-sm text-gray-500">Write and publish a new article to Blorix.</p>
        </div>
      </div>

      <ArticleForm categories={categories} />
    </div>
  )
}
