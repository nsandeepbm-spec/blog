import { ArticlesService } from '@/services/db/articles.service'
import { FileEdit, CheckCircle2, Clock } from 'lucide-react'

export default async function DashboardPage() {
  // Use the new clean Service Layer instead of raw DB calls in the UI!
  const { pendingCount, publishedCount } = await ArticlesService.getDashboardMetrics()
  const pendingArticles = await ArticlesService.getPendingArticles()

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black tracking-tight uppercase">Overview</h1>
        <p className="text-gray-500 mt-1 font-medium">Manage your autonomous newsroom and review AI drafts.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest">Pending Review</h3>
            <Clock className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-5xl font-black text-amber-500">{pendingCount}</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest">Published</h3>
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-5xl font-black text-blue-600">{publishedCount}</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-blue-600 shadow-sm flex flex-col justify-center bg-blue-50/50">
          <h3 className="text-xs font-black text-blue-800 uppercase tracking-widest mb-3 text-center">Quick Action</h3>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black tracking-widest uppercase text-xs py-3 px-4 rounded-md transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
            <FileEdit className="w-4 h-4" />
            Write Manual Article
          </button>
        </div>
      </div>
      
      {/* Pending Articles List */}
      <div className="mt-12 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center">
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-900">Recent AI Drafts</h2>
        </div>
        
        {pendingArticles.length === 0 ? (
          <div className="p-12 text-center text-gray-500 flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-gray-400" />
            </div>
            <p className="font-bold text-gray-600">No pending drafts found</p>
            <p className="text-sm mt-1">The AI hasn't generated any new articles yet. Wait for the next scheduled run.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {pendingArticles.map((article) => (
              <div key={article.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1 block">
                    {article.categories?.name_en || 'Uncategorized'}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">{article.title_en}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-1">{article.body_en.substring(0, 100)}...</p>
                </div>
                <button className="bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-bold text-xs uppercase tracking-widest px-4 py-2 rounded shadow-sm">
                  Review
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
