'use client'

import { useState } from 'react'
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
  BarChart3,
  Bot,
  Menu,
  ChevronLeft
} from 'lucide-react'

const navGroups = [
  {
    label: 'Overview',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    ]
  },
  {
    label: 'Content',
    items: [
      { name: 'Articles', href: '/dashboard/articles', icon: FileText },
      { name: 'Categories', href: '/dashboard/categories', icon: FolderTree },
      { name: 'Media', href: '/dashboard/media', icon: ImageIcon },
    ]
  },
  {
    label: 'AI Automation',
    items: [
      { name: 'AI Writer', href: '/dashboard/ai-writer', icon: Sparkles },
      { name: 'AI Review', href: '/dashboard/ai-review', icon: Bot },
    ]
  },
  {
    label: 'System',
    items: [
      { name: 'Users', href: '/dashboard/users', icon: Users },
      { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    ]
  }
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div 
      className={`hidden md:flex flex-col bg-slate-950 border-r border-slate-800/60 min-h-screen text-slate-300 shadow-2xl transition-all duration-300 ease-in-out font-sans ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand area */}
      <div className={`h-16 flex items-center border-b border-slate-800/60 shrink-0 transition-all ${isCollapsed ? 'justify-center px-0' : 'justify-between px-6'}`}>
        {!isCollapsed && (
          <span className="text-xl font-black uppercase tracking-widest text-white overflow-hidden whitespace-nowrap">
            Blorix
          </span>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all duration-200 shadow-sm"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <Menu className="w-6 h-6" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 scrollbar-hide">
        <div className="space-y-6">
          {navGroups.map((group, idx) => (
            <div key={idx} className="px-3">
              {!isCollapsed && (
                <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                  {group.label}
                </p>
              )}
              {isCollapsed && (
                <div className="h-px w-8 mx-auto bg-slate-800/60 mb-2" />
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      title={isCollapsed ? item.name : undefined}
                      className={`flex items-center gap-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        isCollapsed ? 'justify-center px-0' : 'px-3'
                      } ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/20'
                          : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-100'
                      }`}
                    >
                      <item.icon className={`shrink-0 ${isCollapsed ? 'w-5 h-5' : 'w-[18px] h-[18px]'} ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'}`} />
                      {!isCollapsed && <span className="truncate tracking-wide">{item.name}</span>}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Info area */}
      <div className="p-4 border-t border-slate-800/60 shrink-0">
        <div className={`bg-slate-900 rounded-xl p-3 border border-slate-800 transition-all ${isCollapsed ? 'flex justify-center items-center' : ''}`}>
          {!isCollapsed && <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1.5">System Status</p>}
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </div>
            {!isCollapsed && <span className="text-xs text-slate-300 font-semibold tracking-wide">Operational</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
