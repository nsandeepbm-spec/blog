/**
 * app/api/generate/custom/route.ts
 * -------------------------------------------------------
 * Generates a single article using the admin's custom prompt.
 * Called by the AI Writer page in the admin dashboard.
 *
 * POST body:
 *   categoryId   — UUID of the category in the DB
 *   categorySlug — slug string (e.g. "automobile")
 *   categoryName — human-readable name (e.g. "Automobile")
 *   prompt       — the admin's custom instruction
 *   tone         — tone of voice string
 * -------------------------------------------------------
 */

import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

function toSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

function parseGeminiJson(raw: string): { title: string; slug: string; body: string } | null {
  try {
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

export async function POST(req: NextRequest) {
  // Allow admin UI calls freely
  const isAdminUiCall = req.headers.get('x-admin-call') === '1'
  const isDev = process.env.NODE_ENV !== 'production'
  if (!isDev && !isAdminUiCall) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  if (!body?.prompt || !body?.categoryName) {
    return NextResponse.json({ error: 'Missing prompt or category' }, { status: 400 })
  }

  const { categoryName, categorySlug, prompt, tone } = body

  const systemPrompt = `You are a professional journalist specializing in ${categoryName} news. 
Write factual, engaging, and well-structured articles in a ${tone ?? 'Professional & Technical'} tone.
Do not reveal your AI nature. Write as a seasoned human journalist would.`

  const userPrompt = `${prompt}

Return ONLY a valid JSON object with exactly these keys:
{
  "title": "A compelling, SEO-friendly article title (no quotes within the title)",
  "slug": "url-friendly-slug-derived-from-title",
  "body": "Full article body in HTML (use <h2>, <p>, <ul>, <li>, <strong> tags). Minimum 400 words."
}`

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.75,
        maxOutputTokens: 2048,
      },
    })

    const rawText = response.text ?? ''
    const article = parseGeminiJson(rawText)

    if (!article) {
      return NextResponse.json(
        { error: 'AI returned unexpected format. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ article })
  } catch (err: any) {
    console.error('[AI Writer] Gemini error:', err)
    return NextResponse.json(
      { error: err?.message ?? 'Gemini API error. Check your GEMINI_API_KEY.' },
      { status: 500 }
    )
  }
}
