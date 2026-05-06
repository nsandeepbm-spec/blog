-- ============================================================
-- Project Blorix — Supabase Database Schema
-- ============================================================
-- HOW TO RUN:
-- 1. Go to your Supabase project dashboard
-- 2. Navigate to: SQL Editor → New Query
-- 3. Paste this entire file and click "Run"
-- ============================================================


-- ========================
-- SECTION 1: ENUMS
-- ========================

CREATE TYPE article_status AS ENUM ('DRAFT', 'PENDING_REVIEW', 'PUBLISHED');
CREATE TYPE user_role AS ENUM ('ADMIN', 'EDITOR');


-- ========================
-- SECTION 2: TABLES
-- ========================

-- Table: profiles
-- Purpose: Extends Supabase auth.users with app-specific roles.
-- Automatically populated when a new user signs up via a trigger.
CREATE TABLE IF NOT EXISTS public.profiles (
    id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role        user_role NOT NULL DEFAULT 'EDITOR',
    full_name   VARCHAR(255),
    avatar_url  VARCHAR(1024),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: categories
-- Purpose: Defines content verticals for the platform (e.g., EV, Luxury).
-- Supports bilingual names natively.
CREATE TABLE IF NOT EXISTS public.categories (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug        VARCHAR(100) UNIQUE NOT NULL,
    name_en     VARCHAR(255) NOT NULL,
    name_hi     VARCHAR(255) NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: articles
-- Purpose: The core content entity. Supports dual-language (EN/HI),
-- tracks editorial state, and distinguishes AI vs human-authored content.
CREATE TABLE IF NOT EXISTS public.articles (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id     UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
    status          article_status NOT NULL DEFAULT 'PENDING_REVIEW',
    is_ai_generated BOOLEAN NOT NULL DEFAULT true,
    author_name     VARCHAR(255) NOT NULL DEFAULT 'Blorix AI',
    -- English content
    title_en        TEXT NOT NULL,
    body_en         TEXT NOT NULL,
    slug_en         VARCHAR(512) UNIQUE NOT NULL,
    -- Hindi content
    title_hi        TEXT NOT NULL DEFAULT '',
    body_hi         TEXT NOT NULL DEFAULT '',
    slug_hi         VARCHAR(512) UNIQUE,
    -- Media
    image_url       VARCHAR(1024),
    -- Timestamps
    published_at    TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ========================
-- SECTION 3: TRIGGERS
-- ========================

-- Trigger: Automatically update the `updated_at` field on any update
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_articles_updated
    BEFORE UPDATE ON public.articles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Trigger: Automatically set `published_at` when status changes to PUBLISHED
CREATE OR REPLACE FUNCTION public.handle_published_at()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'PUBLISHED' AND OLD.status != 'PUBLISHED' THEN
        NEW.published_at = now();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_article_published
    BEFORE UPDATE ON public.articles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_published_at();

-- Trigger: Automatically create a profile row when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();


-- ========================
-- SECTION 4: ROW LEVEL SECURITY (RLS)
-- ========================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Policies: profiles
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Authenticated users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Policies: categories
-- Public can read all categories
CREATE POLICY "Public read categories"
    ON public.categories FOR SELECT
    TO anon, authenticated
    USING (true);

-- Only authenticated users (admins) can manage categories
CREATE POLICY "Authenticated can manage categories"
    ON public.categories FOR ALL
    TO authenticated
    USING (true);

-- Policies: articles
-- Public can only see PUBLISHED articles
CREATE POLICY "Public can view published articles"
    ON public.articles FOR SELECT
    TO anon
    USING (status = 'PUBLISHED');

-- Authenticated (admins) can see and manage ALL articles
CREATE POLICY "Authenticated can manage all articles"
    ON public.articles FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);


-- ========================
-- SECTION 5: STORAGE BUCKET
-- ========================

-- Create the articles-images storage bucket (public read)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'articles-images',
    'articles-images',
    true,
    5242880,  -- 5MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
ON CONFLICT (id) DO NOTHING;

-- Storage: Public can read
CREATE POLICY "Public can view images"
    ON storage.objects FOR SELECT
    TO anon, authenticated
    USING (bucket_id = 'articles-images');

-- Storage: Authenticated can upload
CREATE POLICY "Authenticated can upload images"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'articles-images');

-- Storage: Authenticated can update/delete
CREATE POLICY "Authenticated can manage images"
    ON storage.objects FOR UPDATE, DELETE
    TO authenticated
    USING (bucket_id = 'articles-images');


-- ========================
-- SECTION 6: SEED DATA
-- ========================

-- Insert default categories
INSERT INTO public.categories (slug, name_en, name_hi) VALUES
    ('electric-vehicles', 'Electric Vehicles', 'इलेक्ट्रिक वाहन'),
    ('luxury', 'Luxury', 'लक्जरी'),
    ('two-wheelers', 'Two Wheelers', 'दोपहिया'),
    ('off-road', 'Off-Road', 'ऑफ-रोड'),
    ('tech', 'Technology', 'टेक'),
    ('industry', 'Industry News', 'उद्योग समाचार')
ON CONFLICT (slug) DO NOTHING;
