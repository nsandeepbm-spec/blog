'use client'

import { useState, useTransition, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createArticle, updateArticle } from '../actions'
import {
  FileText, Tag, Image as ImageIcon, ChevronDown, Save, X,
  Bold, Italic, Underline, List, ListOrdered, Quote,
  Heading1, Heading2, Heading3, Link as LinkIcon, Minus,
  AlignLeft, AlignCenter, Undo, Redo, Eye, Edit3
} from 'lucide-react'

type Category = { id: string; name: string }

function toSlug(text: string) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
}

// ─── Toolbar Button ───────────────────────────────────────────
function ToolBtn({
  onClick, title, active, children
}: {
  onClick: () => void; title: string; active?: boolean; children: React.ReactNode
}) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={e => { e.preventDefault(); onClick() }}
      className={`p-1.5 rounded-lg transition-colors ${active
        ? 'bg-blue-100 text-blue-700'
        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
        }`}
    >
      {children}
    </button>
  )
}

// ─── Rich Text Editor ─────────────────────────────────────────
function RichEditor({
  value, onChange
}: {
  value: string; onChange: (html: string) => void
}) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [previewMode, setPreviewMode] = useState(false)

  const exec = useCallback((cmd: string, val?: string) => {
    document.execCommand(cmd, false, val)
    editorRef.current?.focus()
    if (editorRef.current) onChange(editorRef.current.innerHTML)
  }, [onChange])

  const insertBlock = useCallback((tag: string) => {
    const sel = window.getSelection()
    if (!sel || !editorRef.current) return
    exec('formatBlock', tag)
    onChange(editorRef.current.innerHTML)
  }, [exec, onChange])

  const handleInput = () => {
    if (editorRef.current) onChange(editorRef.current.innerHTML)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Tab = 2 spaces
    if (e.key === 'Tab') {
      e.preventDefault()
      exec('insertHTML', '&nbsp;&nbsp;&nbsp;&nbsp;')
    }
    // Ctrl+B, Ctrl+I, Ctrl+U shortcuts
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 'b') { e.preventDefault(); exec('bold') }
      if (e.key === 'i') { e.preventDefault(); exec('italic') }
      if (e.key === 'u') { e.preventDefault(); exec('underline') }
      if (e.key === 'z') { e.preventDefault(); exec('undo') }
      if (e.key === 'y') { e.preventDefault(); exec('redo') }
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-gray-400" />
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Article Body</span>
        </div>
        <button
          type="button"
          onClick={() => setPreviewMode(!previewMode)}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${previewMode ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          {previewMode ? <><Edit3 className="w-3 h-3" /> Edit</> : <><Eye className="w-3 h-3" /> Preview</>}
        </button>
      </div>

      {previewMode ? (
        /* Preview Mode */
        <div
          className="prose prose-slate max-w-none p-6 min-h-[420px] text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: value || '<p class="text-gray-300">Nothing to preview yet.</p>' }}
        />
      ) : (
        <>
          {/* Formatting Toolbar */}
          <div className="flex flex-wrap items-center gap-0.5 px-4 py-2 border-b border-gray-100 bg-white">
            {/* History */}
            <ToolBtn onClick={() => exec('undo')} title="Undo (Ctrl+Z)"><Undo className="w-4 h-4" /></ToolBtn>
            <ToolBtn onClick={() => exec('redo')} title="Redo (Ctrl+Y)"><Redo className="w-4 h-4" /></ToolBtn>
            <div className="w-px h-5 bg-gray-200 mx-1" />

            {/* Headings */}
            <ToolBtn onClick={() => insertBlock('h1')} title="Heading 1"><Heading1 className="w-4 h-4" /></ToolBtn>
            <ToolBtn onClick={() => insertBlock('h2')} title="Heading 2"><Heading2 className="w-4 h-4" /></ToolBtn>
            <ToolBtn onClick={() => insertBlock('h3')} title="Heading 3"><Heading3 className="w-4 h-4" /></ToolBtn>
            <ToolBtn onClick={() => insertBlock('p')} title="Paragraph"><AlignLeft className="w-4 h-4" /></ToolBtn>
            <div className="w-px h-5 bg-gray-200 mx-1" />

            {/* Inline Formatting */}
            <ToolBtn onClick={() => exec('bold')} title="Bold (Ctrl+B)"><Bold className="w-4 h-4" /></ToolBtn>
            <ToolBtn onClick={() => exec('italic')} title="Italic (Ctrl+I)"><Italic className="w-4 h-4" /></ToolBtn>
            <ToolBtn onClick={() => exec('underline')} title="Underline (Ctrl+U)"><Underline className="w-4 h-4" /></ToolBtn>
            <div className="w-px h-5 bg-gray-200 mx-1" />

            {/* Lists */}
            <ToolBtn onClick={() => exec('insertUnorderedList')} title="Bullet List"><List className="w-4 h-4" /></ToolBtn>
            <ToolBtn onClick={() => exec('insertOrderedList')} title="Numbered List"><ListOrdered className="w-4 h-4" /></ToolBtn>
            <ToolBtn onClick={() => insertBlock('blockquote')} title="Block Quote"><Quote className="w-4 h-4" /></ToolBtn>
            <div className="w-px h-5 bg-gray-200 mx-1" />

            {/* Align */}
            <ToolBtn onClick={() => exec('justifyLeft')} title="Align Left"><AlignLeft className="w-4 h-4" /></ToolBtn>
            <ToolBtn onClick={() => exec('justifyCenter')} title="Align Center"><AlignCenter className="w-4 h-4" /></ToolBtn>
            <div className="w-px h-5 bg-gray-200 mx-1" />

            {/* Extras */}
            <ToolBtn
              onClick={() => {
                const url = prompt('Enter URL:')
                if (url) exec('createLink', url)
              }}
              title="Insert Link"
            >
              <LinkIcon className="w-4 h-4" />
            </ToolBtn>
            <ToolBtn onClick={() => exec('insertHorizontalRule')} title="Horizontal Rule"><Minus className="w-4 h-4" /></ToolBtn>
          </div>

          {/* Editable Content Area */}
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            dangerouslySetInnerHTML={{ __html: value }}
            className="min-h-[420px] p-6 text-gray-800 text-[15px] leading-relaxed outline-none
              empty:before:content-[attr(data-placeholder)] empty:before:text-gray-300 empty:before:pointer-events-none
              [&_h1]:text-3xl [&_h1]:font-black [&_h1]:text-gray-900 [&_h1]:mt-6 [&_h1]:mb-3
              [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-5 [&_h2]:mb-2
              [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-gray-800 [&_h3]:mt-4 [&_h3]:mb-2
              [&_p]:mb-3 [&_p]:text-gray-700
              [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:my-4
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3 [&_ul]:text-gray-700
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-3 [&_ol]:text-gray-700
              [&_li]:mb-1
              [&_a]:text-blue-600 [&_a]:underline
              [&_hr]:border-gray-200 [&_hr]:my-6
              [&_strong]:font-bold [&_em]:italic"
            data-placeholder="Start writing your article here... (use toolbar or Ctrl+B, Ctrl+I, Ctrl+U)"
          />
        </>
      )}
    </div>
  )
}

// ─── Main Article Form ────────────────────────────────────────
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
    // Only auto-generate slug if it's a new article (no initialData)
    if (!initialData?.id) {
      setFormData({ ...formData, title, slug: toSlug(title) })
    } else {
      setFormData({ ...formData, title })
    }
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

  const wordCount = formData.body.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">

      {/* ── Main Content (2/3) ── */}
      <div className="xl:col-span-2 space-y-5">

        {/* Title + Slug Card */}
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
              URL Slug <span className="text-gray-300 font-normal normal-case tracking-normal">(auto-generated from title)</span>
            </label>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
              <span className="text-gray-400 text-xs font-medium select-none">blorix.com/article/</span>
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

        {/* Rich Body Editor */}
        <RichEditor
          value={formData.body}
          onChange={body => setFormData({ ...formData, body })}
        />

        {/* Word count hint */}
        <p className="text-xs text-gray-400 text-right px-1">
          {wordCount} {wordCount === 1 ? 'word' : 'words'}
        </p>
      </div>

      {/* ── Sidebar (1/3) ── */}
      <div className="space-y-5 xl:sticky xl:top-6">

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
                <option value="DRAFT">📝 Draft</option>
                <option value="PENDING_REVIEW">⏳ Pending Review</option>
                <option value="PUBLISHED">✅ Published</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Status hint */}
          <p className="text-[11px] text-gray-400 leading-relaxed">
            {formData.status === 'DRAFT' && '🔒 Saved privately. Not visible on the public site.'}
            {formData.status === 'PENDING_REVIEW' && '⏳ Queued for editorial review.'}
            {formData.status === 'PUBLISHED' && '🌐 Live on the public site immediately.'}
          </p>

          <div className="flex gap-2 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={() => router.push('/dashboard/articles')}
              className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-1.5"
            >
              <X className="w-4 h-4" /> Cancel
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
            <ImageIcon className="w-4 h-4 text-gray-400" />
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Featured Image</h3>
          </div>
          <input
            type="text"
            value={formData.image_url}
            onChange={e => setFormData({ ...formData, image_url: e.target.value })}
            placeholder="https://images.pexels.com/..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500"
          />
          {formData.image_url && (
            <div className="relative">
              <img
                src={formData.image_url}
                alt="Preview"
                className="w-full h-36 object-cover rounded-xl border border-gray-100"
                onError={e => (e.currentTarget.style.display = 'none')}
              />
              <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded font-medium">Preview</span>
            </div>
          )}
          <p className="text-[11px] text-gray-400">Paste a URL from Pexels, Unsplash, or any CDN.</p>
        </div>

        {/* Writing tips */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 space-y-2">
          <h4 className="text-xs font-bold text-blue-700 uppercase tracking-widest">✍️ Editor Tips</h4>
          <ul className="text-[11px] text-blue-600/80 space-y-1 leading-relaxed">
            <li>• <strong>Ctrl+B</strong> — Bold</li>
            <li>• <strong>Ctrl+I</strong> — Italic</li>
            <li>• <strong>Ctrl+U</strong> — Underline</li>
            <li>• <strong>Ctrl+Z</strong> — Undo</li>
            <li>• Click <strong>H1 / H2 / H3</strong> for headings</li>
            <li>• Click <strong>Preview</strong> to see the final look</li>
          </ul>
        </div>

      </div>
    </form>
  )
}
