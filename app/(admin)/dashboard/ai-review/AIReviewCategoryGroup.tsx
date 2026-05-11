'use client'

import { useState, useTransition } from 'react'
import { ChevronDown, ChevronUp, CheckCircle, Trash2, Eye, EyeOff, Bot } from 'lucide-react'
import { updateArticleStatus, deleteArticle } from '../actions'
import { useRouter } from 'next/navigation'

type Article = {
  id: string
  title: string
  body: string
  slug: string
  author_name: string
  created_at: string
  categories: { id: string; name: string; slug: string } | null
}

type Group = {
  id: string
  name: string
  slug: string
  articles: Article[]
}

export default function AIReviewCategoryGroup({ group }: { group: Group }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [processingId, setProcessingId] = useState<string | null>(null)

  const handleApprove = (id: string) => {
    setProcessingId(id)
    startTransition(async () => {
      try {
        await updateArticleStatus(id, 'PUBLISHED')
        router.refresh()
      } catch (err: any) {
        alert('Failed to publish: ' + err.message)
      } finally {
        setProcessingId(null)
      }
    })
  }

  const handleDelete = (id: string) => {
    if (!confirm('Delete this AI-generated draft? This cannot be undone.')) return
    setProcessingId(id)
    startTransition(async () => {
      try {
        await deleteArticle(id)
        router.refresh()
      } catch (err: any) {
        alert('Failed to delete: ' + err.message)
      } finally {
        setProcessingId(null)
      }
    })
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* ── Category Header ───────────────────────────────── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="bg-violet-100 p-2 rounded-xl">
            <Bot className="w-5 h-5 text-violet-600" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">{group.name}</h2>
            <p className="text-xs text-gray-400">
              {group.articles.length} article{group.articles.length !== 1 ? 's' : ''} pending review
            </p>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {/* ── Articles List ─────────────────────────────────── */}
      {isOpen && (
        <div className="border-t border-gray-100 divide-y divide-gray-50">
          {group.articles.map((article) => {
            const isExpanded = expandedId === article.id
            const isProcessing = processingId === article.id

            return (
              <div key={article.id} className="px-6 py-4 space-y-3">
                {/* ── Row Header ──────────────────────────── */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm leading-snug">
                      {article.title}
                    </p>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-[11px] text-gray-400 font-medium">
                        {new Date(article.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric',
                          hour: '2-digit', minute: '2-digit',
                        })}
                      </span>
                      <span className="text-[11px] text-gray-300">•</span>
                      <span className="text-[11px] text-violet-500 font-semibold bg-violet-50 px-2 py-0.5 rounded-md border border-violet-100">
                        AI Generated
                      </span>
                      <span className="text-[11px] font-mono text-gray-300 truncate max-w-[200px]">
                        /{article.slug}
                      </span>
                    </div>
                  </div>

                  {/* ── Actions ─────────────────────────── */}
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Preview toggle */}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : article.id)}
                      title={isExpanded ? 'Hide preview' : 'Preview article'}
                      className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                    >
                      {isExpanded ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(article.id)}
                      disabled={isProcessing || isPending}
                      title="Delete draft"
                      className="p-2 rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors disabled:opacity-40"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Approve */}
                    <button
                      onClick={() => handleApprove(article.id)}
                      disabled={isProcessing || isPending}
                      className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-600/20"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      {isProcessing ? 'Publishing…' : 'Approve'}
                    </button>
                  </div>
                </div>

                {/* ── Expandable Preview ─────────────────── */}
                {isExpanded && (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mt-2 space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                      <Eye className="w-4 h-4 text-gray-400" />
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                        Article Preview
                      </span>
                    </div>
                    <div
                      className="prose prose-sm prose-slate max-w-none text-sm leading-relaxed
                        [&_h1]:text-2xl [&_h1]:font-black [&_h1]:text-gray-900 [&_h1]:mt-4 [&_h1]:mb-2
                        [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-gray-800 [&_h2]:mt-3 [&_h2]:mb-2
                        [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-700
                        [&_p]:text-gray-700 [&_p]:mb-3 [&_p]:leading-7
                        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3 [&_ul]:text-gray-700
                        [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-3
                        [&_li]:mb-1 [&_li]:text-gray-600
                        [&_strong]:font-bold [&_em]:italic"
                      dangerouslySetInnerHTML={{ __html: article.body }}
                    />
                    <div className="flex gap-2 pt-3 border-t border-gray-200">
                      <button
                        onClick={() => handleApprove(article.id)}
                        disabled={isProcessing || isPending}
                        className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-emerald-600/20"
                      >
                        <CheckCircle className="w-4 h-4" />
                        {isProcessing ? 'Publishing…' : 'Approve & Publish'}
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        disabled={isProcessing || isPending}
                        className="flex items-center gap-2 px-5 py-2.5 bg-red-50 hover:bg-red-100 disabled:opacity-60 text-red-600 text-sm font-bold rounded-xl border border-red-200 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Reject & Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
