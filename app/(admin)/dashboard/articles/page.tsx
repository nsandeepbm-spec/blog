import { createClient } from '@/lib/supabase/server'
import type { Article } from '@/lib/supabase/database.types'
import Link from 'next/link'
import { FileText, Plus } from 'lucide-react'
import ArticleRowActions from './ArticleRowActions'

export default async function ArticlesPage() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('articles')
    .select('*, categories(name)')
    .order('created_at', { ascending: false })

  if (error) {
    return <div className="p-4 text-red-500 bg-red-50 rounded-lg">Error loading articles: {error.message}</div>
  }

  const articles = (data ?? []) as Article[]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Articles</h1>
            <p className="text-sm text-gray-500">{articles.length} total article{articles.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <Link
          href="/dashboard/articles/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create New Article
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Author</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900 max-w-[240px] truncate">
                  {article.title || 'Untitled'}
                </td>
                <td className="px-6 py-4">
                  {article.categories?.name || <span className="text-gray-400 italic">None</span>}
                </td>
                <td className="px-6 py-4">{article.author_name}</td>
                <td className="px-6 py-4">
                  {article.is_ai_generated ? (
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded border border-purple-200">
                      AI Gen
                    </span>
                  ) : (
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded border border-blue-200">
                      Manual
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <ArticleRowActions articleId={article.id} currentStatus={article.status} />
                </td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-gray-400">
                  No articles found. Click "Create New Article" to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
