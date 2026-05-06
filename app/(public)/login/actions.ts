'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function loginWithEmail(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    if (error.message.includes('Email not confirmed')) {
      redirect('/login?error=Your email is not confirmed. Check your inbox or contact support.')
    }
    if (error.message.includes('Invalid login credentials')) {
      redirect('/login?error=Incorrect email or password. If you don\'t have an account, please sign up.')
    }
    redirect('/login?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signupWithEmail(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (password.length < 6) {
    redirect('/signup?error=Password must be at least 6 characters.')
  }

  const { data, error } = await supabase.auth.signUp({ email, password })

  if (error) {
    redirect('/signup?error=' + encodeURIComponent(error.message))
  }

  // Detect if user already exists (Supabase returns empty identities)
  if (data.user && data.user.identities?.length === 0) {
    redirect('/signup?error=An account with this email already exists. Please sign in.')
  }

  // Email confirmation is still enabled in Supabase dashboard
  if (data.session === null) {
    redirect('/login?info=Account created! Please check your email to confirm before signing in.')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}
