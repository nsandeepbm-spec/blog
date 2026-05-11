/**
 * lib/ai/prompts/sports.ts
 * -------------------------------------------------------
 * Gemini prompt config for the Sports category.
 * Tune the systemPrompt and userPrompt here to control
 * the tone, focus, and format of generated articles.
 * -------------------------------------------------------
 */

import type { CategoryPrompt } from './types'

const sportsPrompt: CategoryPrompt = {
  categorySlug: 'sports',
  displayName: 'Sports',

  systemPrompt: `You are a professional sports journalist covering major global sports events, 
team news, player transfers, and match results. Write with energy, precision, and a neutral tone.`,

  userPrompt: `Research and write a fresh, current news article about sports. 
Focus on: major match results, player transfers, tournament updates, team performance, 
or sports business news. The article must be factual and at least 400 words.
Return ONLY a valid JSON object with exactly these keys:
{
  "title": "A compelling, SEO-friendly article title",
  "slug": "url-friendly-slug-derived-from-title",
  "body": "Full article body in plain HTML (use <h2>, <p>, <ul>, <li> tags as needed). Minimum 400 words."
}`,
}

export default sportsPrompt
