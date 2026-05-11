'use client'

import { useState } from 'react'
import { RefreshCw, Loader2, ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function GenerateTriggerButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)

  const categories = [
    { label: 'All Categories', slug: null },
    { label: 'Automobile', slug: 'automobile' },
    { label: 'Technology', slug: 'technology' },
    { label: 'Sports', slug: 'sports' },
    { label: 'Government', slug: 'government' },
    { label: 'Health', slug: 'health' },
    { label: 'Stock Market', slug: 'stock-market' },
  ]

  const handleGenerate = async (categorySlug: string | null) => {
    setShowDropdown(false)
    setLoading(true)
    setResult(null)
    setError(null)

    try {
      const url = categorySlug
        ? `/api/generate?category=${categorySlug}`
        : '/api/generate'

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-call': '1',
        },
      })
      const json = await res.json()

      if (!res.ok) {
        setError(json.error ?? 'Generation failed')
      } else {
        setResult(json.message ?? 'Done!')
        // Refresh the page to show newly queued articles
        router.refresh()
      }
    } catch (err: any) {
      setError(err.message ?? 'Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="relative flex items-stretch">
        {/* Main button */}
        <button
          onClick={() => handleGenerate(null)}
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white text-sm font-semibold rounded-l-xl transition-all shadow-lg shadow-violet-600/20"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          {loading ? 'Generating…' : 'Generate Now'}
        </button>

        {/* Dropdown toggle */}
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          disabled={loading}
          className="px-2.5 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white rounded-r-xl border-l border-violet-500 transition-all"
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown menu */}
        {showDropdown && (
          <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-200 rounded-2xl shadow-xl shadow-gray-200/50 py-2 z-50">
            <p className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Generate for
            </p>
            {categories.map((cat) => (
              <button
                key={cat.slug ?? 'all'}
                onClick={() => handleGenerate(cat.slug)}
                className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition-colors"
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Inline status */}
      {result && (
        <span className="text-xs font-semibold text-green-600 bg-green-50 border border-green-200 px-3 py-1 rounded-lg">
          ✅ {result}
        </span>
      )}
      {error && (
        <span className="text-xs font-semibold text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-lg">
          ⚠️ {error}
        </span>
      )}
    </div>
  )
}
