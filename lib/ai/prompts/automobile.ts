/**
 * lib/ai/prompts/automobile.ts
 * -------------------------------------------------------
 * Gemini prompt config for the Automobile category.
 * Tune the systemPrompt and userPrompt here to control
 * the tone, focus, and format of generated articles.
 * -------------------------------------------------------
 */

import type { CategoryPrompt } from './types'

const automobilePrompt: CategoryPrompt = {
  categorySlug: 'automobile',
  displayName: 'Automobile',

  systemPrompt: `You are a professional automotive journalist with deep expertise in cars, 
motorcycles, and the global auto industry. You write factual, engaging, and original news 
articles. Do not mention competitor AI models or your own nature. 
Write in a clean, journalistic tone suitable for a news platform.`,

  userPrompt: `Research and write a fresh, current news article about the automobile industry. 
Focus on: new car launches, technology advancements, EV transitions, manufacturing updates, 
or major industry announcements. The article must be factual, engaging, and at least 400 words. 
Return ONLY a valid JSON object with exactly these keys:
{
  "title": "A compelling, SEO-friendly article title",
  "slug": "url-friendly-slug-derived-from-title",
  "body": "Full article body in plain HTML (use <h2>, <p>, <ul>, <li> tags as needed). Minimum 400 words."
}`,
}

export default automobilePrompt
