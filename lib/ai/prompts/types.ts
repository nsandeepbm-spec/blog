/**
 * lib/ai/prompts/types.ts
 * -------------------------------------------------------
 * Shared type definition for all category prompt configs.
 * Import this in each individual category prompt file.
 * -------------------------------------------------------
 */

export type CategoryPrompt = {
  /** Matches the `slug` column in the `categories` table */
  categorySlug: string
  /** Human-readable display name, used for logging and UI */
  displayName: string
  /** System instruction sent to Gemini (sets AI persona/role) */
  systemPrompt: string
  /** The actual task/question Gemini will answer (generates the article) */
  userPrompt: string
}
