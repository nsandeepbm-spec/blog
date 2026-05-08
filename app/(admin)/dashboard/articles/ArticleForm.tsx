'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createArticle, updateArticle } from '../actions'

type Category = {
  id: string
  name: string
}

export default function ArticleForm({ 
  initialData, 
  categories 
}: { 
  initialData?: any,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      try {
        if (initialData?.id) {
          await updateArticle(initialData.id, formData)
        } else {
          await createArticle(formData)
        }
        router.push('/dashboard/articles')
      } catch (err: any) {
        alert('Error saving article: ' + err.message)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6 max-w-2xl">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input 
            required
            type="text" 
            value={formData.title} 
            onChange={e => setFormData({...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Article title..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
          <input 
            required
            type="text" 
            value={formData.slug} 
            onChange={e => setFormData({...formData, slug: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Body Content</label>
          <textarea 
            required
            rows={12}
            value={formData.body} 
            onChange={e => setFormData({...formData, body: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 font-sans text-sm"
            placeholder="Write your article content here..."
          />
        </div>
      </div>

      <div className="border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={formData.category_id}
            onChange={e => setFormData({...formData, category_id: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={formData.status}
            onChange={e => setFormData({...formData, status: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="DRAFT">Draft</option>
            <option value="PENDING_REVIEW">Pending Review</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image URL</label>
          <input 
            type="text" 
            value={formData.image_url} 
            onChange={e => setFormData({...formData, image_url: e.target.value})}
            placeholder="https://images.unsplash.com/..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t gap-3">
        <button 
          type="button" 
          onClick={() => router.push('/dashboard/articles')}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={isPending}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? 'Saving...' : 'Save Article'}
        </button>
      </div>
    </form>
  )
}
