import { ImageIcon, Upload, Search, Filter } from 'lucide-react'

export default function MediaPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <ImageIcon className="w-8 h-8 text-blue-600" />
            Media Library
          </h1>
          <p className="text-gray-500 font-medium">Manage images and assets for your articles.</p>
        </div>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
          <Upload className="w-5 h-5" />
          Upload Files
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search assets..." 
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/10 outline-none"
            />
          </div>
          <button className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>

        <div className="p-12 text-center">
          <div className="bg-gray-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-gray-100">
            <ImageIcon className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Your library is empty</h3>
          <p className="text-gray-500 max-w-xs mx-auto text-sm">
            Upload your first image to start building your professional article catalog.
          </p>
        </div>
      </div>
    </div>
  )
}
