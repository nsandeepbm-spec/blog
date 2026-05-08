'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  Users, 
  FolderTree, 
  Sparkles, 
  Image as ImageIcon,
  BarChart3
} from 'lucide-react'

const navItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Articles', href: '/dashboard/articles', icon: FileText },
  { name: 'Categories', href: '/dashboard/categories', icon: FolderTree },
  { name: 'AI Writer', href: '/dashboard/ai-writer', icon: Sparkles },
  { name: 'Media', href: '/dashboard/media', icon: ImageIcon },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Users', href: '/dashboard/users', icon: Users },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 min-h-screen text-slate-300 shadow-xl">
      {/* Brand area */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800 shrink-0">
        <span className="text-xl font-black uppercase tracking-tight text-white flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-sm shadow-lg shadow-blue-500/20">
            Bx
          </div>
          Blorix
        </span>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {item.name}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Footer / Info area */}
      <div className="p-6 border-t border-slate-800 shrink-0">
        <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-lg shadow-green-500/50 animate-pulse" />
            <span className="text-xs text-white font-medium">System Online</span>
          </div>
        </div>
      </div>
    </div>
  )
}
