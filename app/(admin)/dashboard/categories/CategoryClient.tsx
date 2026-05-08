'use client'

import { useState, useTransition } from 'react'
import { createCategory, updateCategory, deleteCategory } from '../actions'

type Category = {
  id: string
  slug: string
  name: string
}

export default function CategoryClient({ initialCategories }: { initialCategories: Category[] }) {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [isPending, startTransition] = useTransition()
  
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ slug: '', name: '' })

  const handleEdit = (cat: Category) => {
    setEditingId(cat.id)
    setFormData({ slug: cat.slug, name: cat.name })
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({ slug: '', name: '' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      try {
        if (editingId) {
          await updateCategory(editingId, formData.slug, formData.name)
          setCategories(categories.map(c => c.id === editingId ? { ...c, ...formData } : c))
        } else {
          await createCategory(formData.slug, formData.name)
          window.location.reload()
        }
        handleCancel()
      } catch (err: any) {
        alert('Error: ' + err.message)
      }
    })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return
    startTransition(async () => {
      try {
        await deleteCategory(id)
        setCategories(categories.filter(c => c.id !== id))
      } catch (err: any) {
        alert('Error deleting: ' + err.message)
      }
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4">Category Name</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{cat.slug}</td>
                <td className="px-6 py-4">{cat.name}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => handleEdit(cat)} className="text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(cat.id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr><td colSpan={3} className="px-6 py-4 text-center">No categories found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit">
        <h3 className="text-lg font-bold text-gray-900 mb-4">{editingId ? 'Edit Category' : 'Add Category'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
            <input 
              required
              type="text" 
              value={formData.slug} 
              onChange={e => setFormData({...formData, slug: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. electric-vehicles"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input 
              required
              type="text" 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Electric Vehicles"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button 
              type="submit" 
              disabled={isPending}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {isPending ? 'Saving...' : (editingId ? 'Update' : 'Add')}
            </button>
            {editingId && (
              <button 
                type="button" 
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
