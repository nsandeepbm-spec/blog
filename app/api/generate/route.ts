/**
 * app/api/generate/route.ts
 * -------------------------------------------------------
 * Automated AI content generation endpoint.
 * 
 * Trigger: POST /api/generate
 * Auth:    Bearer token from CRON_SECRET env var
 *          (set this as the Authorization header from 
 *           Google Cloud Scheduler or any cron service)
 * 
 * Behaviour:
 *   1. Reads all categories from the DB.
 *   2. Matches each DB category slug to a prompt in CATEGORY_PROMPTS.
 *   3. Calls the Gemini API with the category-specific prompt.
 *   4. Parses the structured JSON output.
 *   5. Inserts the article into the DB as PENDING_REVIEW.
 * 
 * Optional query param: ?category=automobile
 *   → Only generates for that one category (useful for testing).
 * -------------------------------------------------------
 */

import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { CATEGORY_PROMPTS } from '@/lib/ai/prompts'

// ── Helpers ──────────────────────────────────────────────────

function makeServiceClient() {
  return createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

function toSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

function parseGeminiJson(raw: string): { title: string; slug: string; body: string } | null {
  try {
    // Strip markdown code fences if present
    const cleaned = raw
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim()
    const parsed = JSON.parse(cleaned)
    if (!parsed.title || !parsed.body) return null
    return {
      title: String(parsed.title).trim(),
      slug: parsed.slug ? toSlug(String(parsed.slug)) : toSlug(String(parsed.title)),
      body: String(parsed.body).trim(),
    }
  } catch {
    return null
  }
}

// ── Route Handler ─────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // ── 1. Auth guard ──────────────────────────────────────────
  // In production: require Bearer token matching CRON_SECRET.
  // In development OR when called from the Admin UI (x-admin-call header): allow freely.
  const isAdminUiCall = req.headers.get('x-admin-call') === '1'
  const isDev = process.env.NODE_ENV !== 'production'
  const cronSecret = process.env.CRON_SECRET
  const authHeader = req.headers.get('authorization') ?? ''

  if (!isDev && !isAdminUiCall && cronSecret && cronSecret !== 'your-cron-secret-here') {
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }


  // ── 2. Optional single-category filter ────────────────────
  const { searchParams } = new URL(req.url)
  const filterSlug = searchParams.get('category') ?? null

  // ── 3. Init clients ────────────────────────────────────────
  const supabase = makeServiceClient()
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

  // ── 4. Fetch categories from DB ────────────────────────────
  const { data: dbCategories, error: catError } = await supabase
    .from('categories')
    .select('id, slug, name')

  if (catError || !dbCategories?.length) {
    return NextResponse.json(
      { error: 'Failed to fetch categories', detail: catError?.message },
      { status: 500 }
    )
  }

  // ── 5. Match DB categories to prompt configs ───────────────
  const targets = dbCategories.filter((cat) => {
    const hasPrompt = CATEGORY_PROMPTS.some((p) => p.categorySlug === cat.slug)
    if (filterSlug) return hasPrompt && cat.slug === filterSlug
    return hasPrompt
  })

  if (!targets.length) {
    return NextResponse.json(
      { error: 'No matching categories found for generation', filterSlug },
      { status: 404 }
    )
  }

  // ── 6. Generate & insert per category ─────────────────────
  const results: Array<{ category: string; status: string; title?: string; error?: string }> = []

  for (const cat of targets) {
    const promptConfig = CATEGORY_PROMPTS.find((p) => p.categorySlug === cat.slug)!

    try {
      // Call Gemini
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: promptConfig.userPrompt,
        config: {
          systemInstruction: promptConfig.systemPrompt,
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
      })

      const rawText = response.text ?? ''
      const article = parseGeminiJson(rawText)

      if (!article) {
        results.push({
          category: cat.slug,
          status: 'error',
          error: 'Failed to parse Gemini JSON output',
        })
        continue
      }

      // Ensure slug uniqueness by appending timestamp if needed
      const uniqueSlug = `${article.slug}-${Date.now()}`

      // Insert into DB
      const { error: insertError } = await supabase.from('articles').insert({
        category_id: cat.id,
        title: article.title,
        body: article.body,
        slug: uniqueSlug,
        status: 'PENDING_REVIEW',
        is_ai_generated: true,
        author_name: 'Blorix AI',
      })

      if (insertError) {
        results.push({ category: cat.slug, status: 'error', error: insertError.message })
      } else {
        results.push({ category: cat.slug, status: 'success', title: article.title })
      }
    } catch (err: any) {
      results.push({ category: cat.slug, status: 'error', error: err?.message ?? 'Unknown error' })
    }
  }

  const successCount = results.filter((r) => r.status === 'success').length
  return NextResponse.json({
    message: `Generated ${successCount}/${targets.length} articles`,
    results,
  })
}

// ── GET for easy browser testing ─────────────────────────────
export async function GET(req: NextRequest) {
  // In dev: skip auth so you can hit this from the browser
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Use POST method' }, { status: 405 })
  }
  return POST(req)
}
