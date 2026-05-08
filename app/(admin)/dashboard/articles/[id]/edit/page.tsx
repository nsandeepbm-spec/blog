import { createClient } from '@/lib/supabase/server'
import type { Article, Category } from '@/lib/supabase/database.types'
import ArticleForm from '../../ArticleForm'
import { FileEdit } from 'lucide-react'
import { notFound } from 'next/navigation'

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const [categoriesRes, articleRes] = await Promise.all([
    supabase.from('categories').select('id, name'),
    supabase.from('articles').select('*').eq('id', id).single(),
  ])

  if (articleRes.error || !articleRes.data) notFound()

  const categories = (categoriesRes.data ?? []) as Pick<Category, 'id' | 'name'>[]
  const article = articleRes.data as Article

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FileEdit className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">Edit Article</h1>
      </div>

      <ArticleForm categories={categories} initialData={article} />
    </div>
  )
}
