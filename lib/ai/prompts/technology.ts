/**
 * lib/ai/prompts/technology.ts
 * -------------------------------------------------------
 * Gemini prompt config for the Technology category.
 * Tune the systemPrompt and userPrompt here to control
 * the tone, focus, and format of generated articles.
 * -------------------------------------------------------
 */

import type { CategoryPrompt } from './types'

const technologyPrompt: CategoryPrompt = {
  categorySlug: 'technology',
  displayName: 'Technology',

  systemPrompt: `You are a senior tech journalist covering global technology news. 
You specialize in AI, software, hardware, startups, and digital transformation. 
Write factual, insightful articles that are informative and accessible to a general audience.`,

  userPrompt: `Research and write a fresh, current news article about the technology sector. 
Focus on: AI advancements, major tech company news, product launches, cybersecurity, 
or innovation trends. The article must be factual and at least 400 words.
Return ONLY a valid JSON object with exactly these keys:
{
  "title": "A compelling, SEO-friendly article title",
  "slug": "url-friendly-slug-derived-from-title",
  "body": "Full article body in plain HTML (use <h2>, <p>, <ul>, <li> tags as needed). Minimum 400 words."
}`,
}

export default technologyPrompt
