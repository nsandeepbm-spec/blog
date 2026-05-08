import { createServiceClient } from '@/lib/supabase/server'
import type { UserProfile } from '@/lib/supabase/database.types'
import { Users, Shield, User, Clock, Mail } from 'lucide-react'
import RoleSelect from './RoleSelect'

export default async function UsersPage() {
  const supabase = createServiceClient()

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm flex items-center gap-3">
        <span className="text-xl">⚠️</span>
        <div>
          <p className="font-bold">Error loading users</p>
          <p className="text-red-500">{error.message}</p>
        </div>
      </div>
    )
  }

  const users = (data ?? []) as (UserProfile & { display_name?: string })[]
  const adminCount = users.filter(u => u.role === 'admin').length
  const userCount = users.filter(u => u.role === 'user').length

  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
            <p className="text-sm text-gray-500">{users.length} registered member{users.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <p className="text-2xl font-black text-gray-900">{users.length}</p>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Total Users</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="text-2xl font-black text-gray-900">{adminCount}</p>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Admins</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
            <User className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-black text-gray-900">{userCount}</p>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Members</p>
          </div>
        </div>
      </div>

      {/* ── Users Table ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-700">All Users</h2>
          <span className="text-[11px] text-gray-400 font-medium">Ordered by newest first</span>
        </div>

        <table className="w-full text-sm text-left">
          <thead className="text-[10px] text-gray-500 uppercase tracking-widest bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3 font-bold">User</th>
              <th className="px-6 py-3 font-bold">Email</th>
              <th className="px-6 py-3 font-bold">Joined</th>
              <th className="px-6 py-3 font-bold w-40">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((user) => {
              const initials = user.display_name
                ? user.display_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
                : user.email.charAt(0).toUpperCase()
              const displayName = user.display_name || user.email.split('@')[0]
              const colors = ['bg-blue-500', 'bg-purple-500', 'bg-emerald-500', 'bg-orange-500', 'bg-pink-500']
              const color = colors[user.email.charCodeAt(0) % colors.length]

              return (
                <tr key={user.id} className="hover:bg-gray-50/70 transition-colors">
                  {/* User avatar + name */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${color} text-white flex items-center justify-center font-black text-[12px] shrink-0`}>
                        {initials}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-[14px]">{displayName}</p>
                        <p className="text-[11px] text-gray-400 font-mono">{user.id.slice(0, 16)}…</p>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="text-[13px]">{user.email}</span>
                    </div>
                  </td>

                  {/* Joined date */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="text-[13px]">
                        {new Date(user.created_at).toLocaleDateString('en-IN', {
                          day: '2-digit', month: 'short', year: 'numeric',
                        })}
                      </span>
                    </div>
                  </td>

                  {/* Role selector */}
                  <td className="px-6 py-4">
                    <RoleSelect userId={user.id} initialRole={user.role} />
                  </td>
                </tr>
              )
            })}

            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-16 text-center">
                  <Users className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-400 font-medium text-sm">No users found in the database.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
