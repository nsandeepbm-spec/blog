import { createClient } from '@/lib/supabase/server'
import type { Article } from '@/lib/supabase/database.types'
import Link from 'next/link'
import { FileText, Plus, PenLine } from 'lucide-react'
import ArticleRowActions from './ArticleRowActions'

const statusBadge: Record<string, string> = {
  DRAFT: 'bg-gray-100 text-gray-600 border-gray-200',
  PENDING_REVIEW: 'bg-amber-50 text-amber-600 border-amber-200',
  PUBLISHED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
}

export default async function ArticlesPage() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('articles')
    .select('*, categories(name)')
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm font-medium">
        ⚠️ Error loading articles: {error.message}
      </div>
    )
  }

  const articles = (data ?? []) as Article[]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2.5 rounded-xl">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Articles</h1>
            <p className="text-sm text-gray-500">{articles.length} article{articles.length !== 1 ? 's' : ''} total</p>
          </div>
        </div>
        <Link
          href="/dashboard/articles/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-md shadow-blue-600/20 flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          New Article
        </Link>
      </div>

      {/* Table or Empty State */}
      {articles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white border border-dashed border-gray-200 rounded-2xl text-center">
          <div className="bg-gray-50 p-5 rounded-2xl mb-5 border border-gray-100">
            <PenLine className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No articles yet</h3>
          <p className="text-gray-500 text-sm max-w-xs mb-6">
            Start by creating your first article manually, or use the AI Writer to generate content automatically.
          </p>
          <div className="flex gap-3">
            <Link
              href="/dashboard/articles/new"
              className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md shadow-blue-600/20"
            >
              <Plus className="w-4 h-4" />
              Write Article
            </Link>
            <Link
              href="/dashboard/ai-writer"
              className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors border border-gray-200"
            >
              ✨ Try AI Writer
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold">Title</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Author</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 max-w-[220px] truncate">
                    {article.title}
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs">
                    {article.categories?.name ?? <span className="italic text-gray-300">Uncategorized</span>}
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-xs">{article.author_name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${statusBadge[article.status] ?? 'bg-gray-100 text-gray-500'}`}>
                      {article.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <ArticleRowActions articleId={article.id} currentStatus={article.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
