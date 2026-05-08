'use client'

import { useTransition } from 'react'
import { updateUserRole } from '../actions'
import type { UserRole } from '@/lib/supabase/database.types'

export default function RoleSelect({ userId, initialRole }: { userId: string, initialRole: UserRole }) {
  const [isPending, startTransition] = useTransition()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as UserRole
    startTransition(async () => {
      try {
        await updateUserRole(userId, newRole)
      } catch (err: any) {
        alert('Failed to update role: ' + err.message)
      }
    })
  }

  return (
    <select
      value={initialRole}
      onChange={handleChange}
      disabled={isPending}
      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:opacity-50"
    >
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </select>
  )
}
