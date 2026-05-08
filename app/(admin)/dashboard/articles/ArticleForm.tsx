'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createArticle, updateArticle } from '../actions'
import { FileText, Tag, Image, ChevronDown, Save, X } from 'lucide-react'

type Category = { id: string; name: string }

export default function ArticleForm({
  initialData,
  categories,
}: {
  initialData?: any
  categories: Category[]
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    body: initialData?.body || '',
    slug: initialData?.slug || '',
    category_id: initialData?.category_id || categories[0]?.id || '',
    status: initialData?.status || 'DRAFT',
    image_url: initialData?.image_url || '',
  })

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    setFormData({ ...formData, title, slug })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      try {
        if (initialData?.id) {
          await updateArticle(initialData.id, formData)
        } else {
          await createArticle({
            ...formData,
            is_ai_generated: false,
            author_name: 'Admin',
          })
        }
        router.push('/dashboard/articles')
      } catch (err: any) {
        alert('Error saving article: ' + err.message)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">

      {/* Main Content — takes 2/3 width */}
      <div className="xl:col-span-2 space-y-5">

        {/* Title */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
              Article Title
            </label>
            <input
              required
              type="text"
              value={formData.title}
              onChange={handleTitleChange}
              className="w-full text-2xl font-bold border-0 outline-none text-gray-900 placeholder-gray-200 focus:ring-0 p-0"
              placeholder="Enter a compelling article title..."
            />
          </div>
          <div className="pt-4 border-t border-gray-100">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
              URL Slug
            </label>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
              <span className="text-gray-400 text-xs font-medium select-none">blorix.com/articles/</span>
              <input
                required
                type="text"
                value={formData.slug}
                onChange={e => setFormData({ ...formData, slug: e.target.value })}
                className="flex-1 bg-transparent text-sm text-blue-600 font-medium outline-none"
                placeholder="your-article-slug"
              />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Article Body</span>
          </div>
          <textarea
            required
            rows={18}
            value={formData.body}
            onChange={e => setFormData({ ...formData, body: e.target.value })}
            className="w-full p-6 text-gray-700 leading-relaxed text-sm outline-none resize-none font-sans focus:ring-0"
            placeholder="Start writing your article here..."
          />
        </div>
      </div>

      {/* Sidebar — takes 1/3 width */}
      <div className="space-y-5 sticky top-4">

        {/* Publish Controls */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Publish</h3>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Status</label>
            <div className="relative">
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
                className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-900 pr-9 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500"
              >
                <option value="DRAFT">Draft</option>
                <option value="PENDING_REVIEW">Pending Review</option>
                <option value="PUBLISHED">Published</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex gap-2 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={() => router.push('/dashboard/articles')}
              className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-1.5"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              {isPending ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>

        {/* Category */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-gray-400" />
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Category</h3>
          </div>
          <div className="relative">
            <select
              value={formData.category_id}
              onChange={e => setFormData({ ...formData, category_id: e.target.value })}
              className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-900 pr-9 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500"
            >
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Featured Image */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Image className="w-4 h-4 text-gray-400" />
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Featured Image</h3>
          </div>
          <input
            type="text"
            value={formData.image_url}
            onChange={e => setFormData({ ...formData, image_url: e.target.value })}
            placeholder="https://images.unsplash.com/..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500"
          />
          {formData.image_url && (
            <img
              src={formData.image_url}
              alt="Preview"
              className="w-full h-32 object-cover rounded-xl border border-gray-100"
              onError={e => (e.currentTarget.style.display = 'none')}
            />
          )}
        </div>
      </div>
    </form>
  )
}
