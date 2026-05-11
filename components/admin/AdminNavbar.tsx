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
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200/80 sticky top-0 z-20 flex items-center justify-between px-4 sm:px-8 font-sans shadow-sm">
      {/* Left side: Search / Breadcrumbs placeholder */}
      <div className="flex-1 flex items-center">
        <div className="relative w-full max-w-md hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl leading-5 bg-gray-50/50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm font-medium text-gray-800 transition-all shadow-sm"
            placeholder="Search articles, categories..."
          />
        </div>
      </div>

      {/* Right side: Actions & Profile */}
      <div className="ml-4 flex items-center gap-3 sm:gap-5">
        <button type="button" className="p-2 text-gray-400 hover:text-indigo-600 relative transition-colors rounded-xl hover:bg-indigo-50">
          <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white shadow-sm" />
          <Bell className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="h-6 w-px bg-gray-200/80 hidden sm:block" /> {/* Divider */}

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end justify-center">
            <span className="text-[13px] font-bold text-gray-900 leading-tight">Admin User</span>
            <span className="text-[11px] font-medium text-gray-500 leading-tight tracking-wide">{userEmail}</span>
          </div>
          <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100 shadow-sm">
            <User className="h-5 w-5 text-indigo-600" />
          </div>
        </div>

        <div className="h-6 w-px bg-gray-200/80 hidden sm:block" /> {/* Divider */}

        <form action={handleLogout}>
          <button 
            type="submit" 
            className="flex items-center gap-2 px-3 py-2 text-[13px] font-bold text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:block tracking-wide">Logout</span>
          </button>
        </form>
      </div>
    </header>
  )
}
