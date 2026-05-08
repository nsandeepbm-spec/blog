'use client'

import { useTransition } from 'react'
import Link from 'next/link'
import { deleteArticle, updateArticleStatus } from '../actions'
import { Edit3, Trash2, CheckCircle, Clock, FileEdit } from 'lucide-react'

const statusStyles = {
  DRAFT: 'bg-gray-100 text-gray-600 border-gray-200',
  PENDING_REVIEW: 'bg-amber-50 text-amber-600 border-amber-200',
  PUBLISHED: 'bg-emerald-50 text-emerald-600 border-emerald-200'
}

export default function ArticleRowActions({ articleId, currentStatus }: { articleId: string, currentStatus: string }) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (!confirm('Are you sure you want to delete this article?')) return
    startTransition(async () => {
      try {
        await deleteArticle(articleId)
      } catch (err: any) {
        alert('Failed to delete: ' + err.message)
      }
    })
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as 'DRAFT' | 'PENDING_REVIEW' | 'PUBLISHED'
    startTransition(async () => {
      try {
        await updateArticleStatus(articleId, newStatus)
      } catch (err: any) {
        alert('Failed to update status: ' + err.message)
      }
    })
  }

  return (
    <div className="flex items-center gap-3 justify-end">
      <div className="relative group">
        <select
          value={currentStatus}
          onChange={handleStatusChange}
          disabled={isPending}
          className={`appearance-none pl-3 pr-8 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer outline-none focus:ring-4 focus:ring-blue-500/10 ${statusStyles[currentStatus as keyof typeof statusStyles] || 'bg-gray-100 text-gray-600'}`}
        >
          <option value="DRAFT">DRAFT</option>
          <option value="PENDING_REVIEW">REVIEW</option>
          <option value="PUBLISHED">PUBLISHED</option>
        </select>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
          <Clock className="w-3 h-3" />
        </div>
      </div>

      <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-100">
        <Link 
          href={`/dashboard/articles/${articleId}/edit`} 
          className="p-1.5 text-blue-600 hover:bg-white hover:shadow-sm rounded-md transition-all"
          title="Edit Article"
        >
          <FileEdit className="w-4 h-4" />
        </Link>
        <button 
          onClick={handleDelete} 
          disabled={isPending}
          className="p-1.5 text-red-500 hover:bg-white hover:shadow-sm rounded-md transition-all disabled:opacity-50"
          title="Delete Article"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
