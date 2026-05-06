'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FileText, Settings, Users } from 'lucide-react'

const navItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Articles', href: '/dashboard/articles', icon: FileText },
  { name: 'Categories', href: '/dashboard/categories', icon: Users },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 min-h-screen text-slate-300">
      {/* Brand area */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800 shrink-0">
        <span className="text-xl font-black uppercase tracking-tight text-white flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-sm">
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
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600/10 text-blue-400'
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                {item.name}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Footer / Info area */}
      <div className="p-4 border-t border-slate-800 shrink-0 text-xs text-slate-500 font-medium">
        Blorix Platform v1.0
      </div>
    </div>
  )
}
