import { createClient } from '@/lib/supabase/server'
import { FolderTree } from 'lucide-react'
import CategoryClient from './CategoryClient'
import type { Category } from '@/lib/supabase/database.types'

export default async function CategoriesPage() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    return <div className="p-4 text-red-500">Error loading categories: {error.message}</div>
  }

  const categories = (data ?? []) as Category[]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FolderTree className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">Categories Management</h1>
      </div>
      
      <p className="text-gray-500">
        Manage the categories for your articles. There are currently {categories.length} categories.
      </p>

      <CategoryClient initialCategories={categories} />
    </div>
  )
}
