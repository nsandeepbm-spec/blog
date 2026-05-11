/**
 * app/api/generate/save/route.ts
 * -------------------------------------------------------
 * Saves an AI Writer-generated article to the database
 * as PENDING_REVIEW so it appears in the AI Review queue.
 *
 * POST body:
 *   article    — { title, slug, body }
 *   categoryId — UUID of the selected category
 * -------------------------------------------------------
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'

function makeServiceClient() {
  return createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(req: NextRequest) {
  // Allow admin UI calls freely
  const isAdminUiCall = req.headers.get('x-admin-call') === '1'
  const isDev = process.env.NODE_ENV !== 'production'
  if (!isDev && !isAdminUiCall) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  if (!body?.article || !body?.categoryId) {
    return NextResponse.json({ error: 'Missing article or categoryId' }, { status: 400 })
  }

  const { article, categoryId } = body
  const uniqueSlug = `${article.slug}-${Date.now()}`

  const supabase = makeServiceClient()

  const { error } = await supabase.from('articles').insert({
    category_id: categoryId,
    title: article.title,
    body: article.body,
    slug: uniqueSlug,
    status: 'PENDING_REVIEW',
    is_ai_generated: true,
    author_name: 'Blorix AI',
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, slug: uniqueSlug })
}
