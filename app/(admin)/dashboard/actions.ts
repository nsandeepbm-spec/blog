'use server'

import { createClient, createServiceClient } from '@/lib/supabase/server'
import type { UserProfile, Category, Article, ArticleStatus, UserRole } from '@/lib/supabase/database.types'
import { revalidatePath } from 'next/cache'

// ─── Users ────────────────────────────────────────────────────────────────────

export async function updateUserRole(userId: string, newRole: UserRole) {
  const supabase = createServiceClient()
  const { error } = await supabase
    .from('users')
    .update({ role: newRole } as any)
    .eq('id', userId)

  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/users')
}

// ─── Articles ─────────────────────────────────────────────────────────────────

export async function deleteArticle(articleId: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', articleId)

  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/articles')
  revalidatePath('/')
}

export async function updateArticleStatus(articleId: string, status: ArticleStatus) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('articles')
    .update({ status } as any)
    .eq('id', articleId)

  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/articles')
  revalidatePath('/')
}

export async function createArticle(data: Omit<Article, 'id' | 'published_at' | 'created_at' | 'updated_at' | 'categories'>) {
  const supabase = await createClient()
  const { data: userAuth } = await supabase.auth.getUser()
  if (!userAuth.user?.id) throw new Error('Not authenticated')

  const { data: userRows } = await supabase
    .from('users')
    .select('email')
    .eq('id', userAuth.user.id)
    .limit(1)

  const userProfile = (userRows as any[] | null)?.[0]

  const payload = {
    ...data,
    author_name: userProfile?.email || 'Blorix Admin',
    is_ai_generated: false,
  }

  const { error, data: rows } = await supabase
    .from('articles')
    .insert([payload as any])
    .select()

  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/articles')
  revalidatePath('/')
  return (rows as Article[])[0]
}

export async function updateArticle(id: string, data: Partial<Article>) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('articles')
    .update(data as any)
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/articles')
  revalidatePath('/')
}

// ─── Categories ───────────────────────────────────────────────────────────────

export async function createCategory(slug: string, name: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('categories')
    .insert([{ slug, name } as any])

  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/categories')
}

export async function updateCategory(id: string, slug: string, name: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('categories')
    .update({ slug, name } as any)
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/categories')
}

export async function deleteCategory(categoryId: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', categoryId)

  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/categories')
}
