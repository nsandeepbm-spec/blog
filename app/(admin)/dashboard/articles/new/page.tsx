import { createClient } from '@/lib/supabase/server'
import ArticleForm from '../ArticleForm'
import { FileEdit } from 'lucide-react'

export default async function NewArticlePage() {
  const supabase = await createClient()
  const { data: categories } = await supabase.from('categories').select('id, name_en')

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FileEdit className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">Create New Article</h1>
      </div>
      
      <ArticleForm categories={categories || []} />
    </div>
  )
}
