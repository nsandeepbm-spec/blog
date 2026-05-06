/**
 * lib/supabase/database.types.ts
 * -------------------------------------------------------
 * TypeScript type definitions for the Supabase database.
 * These types are manually maintained and match the schema
 * defined in /supabase/schema.sql.
 *
 * TIP: You can auto-generate these with the Supabase CLI:
 *   npx supabase gen types typescript --project-id <your-project-id>
 * -------------------------------------------------------
 */

export type ArticleStatus = "DRAFT" | "PENDING_REVIEW" | "PUBLISHED";
export type UserRole = "ADMIN" | "EDITOR";

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Category {
  id: string;
  slug: string;
  name_en: string;
  name_hi: string;
  created_at: string;
}

export interface Article {
  id: string;
  category_id: string;
  status: ArticleStatus;
  is_ai_generated: boolean;
  author_name: string;
  // English content
  title_en: string;
  body_en: string;
  slug_en: string;
  // Hindi content
  title_hi: string;
  body_hi: string;
  slug_hi: string | null;
  // Media
  image_url: string | null;
  // Timestamps
  published_at: string | null;
  created_at: string;
  updated_at: string;
  // Relations (joined queries)
  categories?: Category;
}

// -------------------------------------------------------
// Supabase Database type wrapper (for createClient<Database>)
// -------------------------------------------------------
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "created_at">;
        Update: Partial<Omit<Profile, "id" | "created_at">>;
      };
      categories: {
        Row: Category;
        Insert: Omit<Category, "id" | "created_at">;
        Update: Partial<Omit<Category, "id" | "created_at">>;
      };
      articles: {
        Row: Article;
        Insert: Omit<Article, "id" | "published_at" | "created_at" | "updated_at" | "categories">;
        Update: Partial<Omit<Article, "id" | "created_at" | "categories">>;
      };
    };
  };
};
