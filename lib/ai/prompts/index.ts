/**
 * lib/ai/prompts/index.ts
 * -------------------------------------------------------
 * Central registry for all category prompt configs.
 * 
 * HOW TO ADD A NEW CATEGORY:
 *   1. Create a new file: lib/ai/prompts/<your-category>.ts
 *   2. Export a default CategoryPrompt object from it.
 *   3. Import it here and add it to CATEGORY_PROMPTS.
 *   4. Make sure `categorySlug` matches the slug in your DB.
 * -------------------------------------------------------
 */

export type { CategoryPrompt } from './types'

import automobilePrompt    from './automobile'
import technologyPrompt   from './technology'
import sportsPrompt       from './sports'
import governmentPrompt   from './government'
import healthPrompt       from './health'
import stockMarketPrompt  from './stock-market'

export const CATEGORY_PROMPTS = [
  automobilePrompt,
  technologyPrompt,
  sportsPrompt,
  governmentPrompt,
  healthPrompt,
  stockMarketPrompt,
]
