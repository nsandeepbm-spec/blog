/**
 * lib/ai/prompts/stock-market.ts
 * -------------------------------------------------------
 * Gemini prompt config for the Stock Market category.
 * Tune the systemPrompt and userPrompt here to control
 * the tone, focus, and format of generated articles.
 * -------------------------------------------------------
 */

import type { CategoryPrompt } from './types'

const stockMarketPrompt: CategoryPrompt = {
  categorySlug: 'stock-market',
  displayName: 'Stock Market',

  systemPrompt: `You are a financial journalist covering global stock markets, equities, 
commodities, and investment trends. You write with accuracy and authority. 
Include relevant data points and market context. Never give investment advice.`,

  userPrompt: `Research and write a fresh, current news article about stock markets or finance. 
Focus on: market movements, earnings reports, IPO news, economic indicators, 
or major investment trends. The article must be factual and at least 400 words.
Return ONLY a valid JSON object with exactly these keys:
{
  "title": "A compelling, SEO-friendly article title",
  "slug": "url-friendly-slug-derived-from-title",
  "body": "Full article body in plain HTML (use <h2>, <p>, <ul>, <li> tags as needed). Minimum 400 words."
}`,
}

export default stockMarketPrompt
