import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { LogOut, Bell, Search, User } from 'lucide-react'

export default function AdminNavbar({ userEmail }: { userEmail: string | undefined }) {
  const handleLogout = async () => {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-sm">
      {/* Left side: Search / Breadcrumbs placeholder */}
      <div className="flex-1 flex items-center">
        <div className="relative w-full max-w-md hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
            placeholder="Search articles, categories..."
          />
        </div>
      </div>

      {/* Right side: Actions & Profile */}
      <div className="ml-4 flex items-center gap-4">
        <button type="button" className="p-2 text-gray-400 hover:text-gray-500 relative transition-colors rounded-full hover:bg-gray-100">
          <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          <Bell className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="h-8 w-px bg-gray-200 mx-2" /> {/* Divider */}

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-bold text-gray-900 leading-tight">Admin User</span>
            <span className="text-xs text-gray-500 leading-tight">{userEmail}</span>
          </div>
          <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200">
            <User className="h-5 w-5 text-blue-600" />
          </div>
        </div>

        <div className="h-8 w-px bg-gray-200 mx-2" /> {/* Divider */}

        <form action={handleLogout}>
          <button 
            type="submit" 
            className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:block">Logout</span>
          </button>
        </form>
      </div>
    </header>
  )
}
