import { createClient } from '@/lib/supabase/server'
import { Settings, User, Shield, Bell, Lock } from 'lucide-react'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
        <p className="text-gray-500">Manage your administrative preferences and profile.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900">Account Information</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email Address</label>
                  <div className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 text-sm">
                    {user?.email}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Account ID</label>
                  <div className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 text-sm truncate">
                    {user?.id}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900">Security</h3>
            </div>
            <div className="p-6">
              <button className="px-4 py-2 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors text-sm">
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar help */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl">
            <Lock className="w-8 h-8 text-blue-400 mb-4" />
            <h4 className="font-bold mb-2">Access Control</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your account has full Administrative privileges. Be careful when managing system-wide settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
