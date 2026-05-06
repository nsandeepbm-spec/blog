import { createClient } from '@/lib/supabase/server'

export class AuthService {
  /**
   * Fetches the currently authenticated user for Server Components.
   * Also fetches extended profile data if it exists.
   */
  static async getCurrentUser() {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()
    
    if (error || !data?.user) {
      return null
    }
    
    // Optional: fetch extended profile data if needed
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single()

    return {
      ...data.user,
      profile
    }
  }
}
