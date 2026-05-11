/**
 * app/(admin)/dashboard/ai-writer/page.tsx
 * Server component — fetches categories from DB, passes to client form.
 */

import { createClient } from '@/lib/supabase/server'
import { Sparkles } from 'lucide-react'
import AIWriterForm from '@/app/(admin)/dashboard/ai-writer/AIWriterForm'

export default async function AIWriterPage() {
  const supabase = await createClient()

  const { data } = await supabase
    .from('categories')
    .select('id, name, slug')
    .order('name', { ascending: true })

  const categories = (data ?? []) as { id: string; name: string; slug: string }[]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Sparkles className="w-7 h-7 text-blue-600" />
          AI Content Writer
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          Write a custom prompt, select a category, and generate a full article using Gemini AI.
          Generated content is saved to the review queue as a draft.
        </p>
      </div>

      <AIWriterForm categories={categories} />
    </div>
  )
}
