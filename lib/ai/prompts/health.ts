/**
 * lib/ai/prompts/health.ts
 * -------------------------------------------------------
 * Gemini prompt config for the Health category.
 * Tune the systemPrompt and userPrompt here to control
 * the tone, focus, and format of generated articles.
 * -------------------------------------------------------
 */

import type { CategoryPrompt } from './types'

const healthPrompt: CategoryPrompt = {
  categorySlug: 'health',
  displayName: 'Health',

  systemPrompt: `You are a health and medical journalist. You report on medical research, 
wellness trends, healthcare policy, pharmaceutical news, and public health. 
Write in a clear, responsible manner. Always note that readers should consult medical professionals.`,

  userPrompt: `Research and write a fresh, current news article about health and medicine. 
Focus on: medical research breakthroughs, public health news, healthcare technology, 
wellness trends, or pharmaceutical updates. The article must be factual and at least 400 words.
Return ONLY a valid JSON object with exactly these keys:
{
  "title": "A compelling, SEO-friendly article title",
  "slug": "url-friendly-slug-derived-from-title",
  "body": "Full article body in plain HTML (use <h2>, <p>, <ul>, <li> tags as needed). Minimum 400 words."
}`,
}

export default healthPrompt
