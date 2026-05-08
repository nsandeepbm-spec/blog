import { createClient } from '@/lib/supabase/server'
import { FileText, Users, FolderTree, TrendingUp, Clock, Eye } from 'lucide-react'

export default async function DashboardOverview() {
  const supabase = await createClient()

  // Fetch counts in parallel
  const [articlesCount, usersCount, categoriesCount] = await Promise.all([
    supabase.from('articles').select('*', { count: 'exact', head: true }),
    supabase.from('users').select('*', { count: 'exact', head: true }),
    supabase.from('categories').select('*', { count: 'exact', head: true }),
  ])

  const stats = [
    { name: 'Total Articles', value: articlesCount.count || 0, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Active Users', value: usersCount.count || 0, icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
    { name: 'Categories', value: categoriesCount.count || 0, icon: FolderTree, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Page Views', value: '0', icon: Eye, color: 'text-amber-600', bg: 'bg-amber-100' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back to the Blorix administration panel.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+0% this month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              System Status
            </h3>
          </div>
          <div className="p-8 text-center text-gray-400">
            <p>Database connected and healthy.</p>
            <p className="text-xs mt-2">v1.0.0 Stable</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <a href="/dashboard/articles/new" className="block w-full text-center py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
              New Article
            </a>
            <a href="/dashboard/categories" className="block w-full text-center py-2.5 bg-gray-50 text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition-colors border border-gray-200">
              Manage Categories
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
