/**
 * lib/ai/prompts/government.ts
 * -------------------------------------------------------
 * Gemini prompt config for the Government category.
 * Tune the systemPrompt and userPrompt here to control
 * the tone, focus, and format of generated articles.
 * -------------------------------------------------------
 */

import type { CategoryPrompt } from './types'

const governmentPrompt: CategoryPrompt = {
  categorySlug: 'government',
  displayName: 'Government',

  systemPrompt: `You are a political correspondent and public policy analyst. 
You report on government decisions, policy changes, legislation, and political developments 
with objectivity and clarity. Avoid bias and present only verifiable facts.`,

  userPrompt: `Research and write a fresh, current news article about government and public policy. 
Focus on: new legislation, policy announcements, political developments, public sector reforms, 
or government schemes. The article must be factual and at least 400 words.
Return ONLY a valid JSON object with exactly these keys:
{
  "title": "A compelling, SEO-friendly article title",
  "slug": "url-friendly-slug-derived-from-title",
  "body": "Full article body in plain HTML (use <h2>, <p>, <ul>, <li> tags as needed). Minimum 400 words."
}`,
}

export default governmentPrompt
