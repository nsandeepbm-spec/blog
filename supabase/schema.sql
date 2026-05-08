-- ============================================================
-- Blorix Unified Database Schema
-- IMPORTANT: Run this entire file in Supabase SQL Editor
-- ============================================================

-- ========================
-- 1. ENUMS
-- ========================
DO $$ BEGIN
    CREATE TYPE article_status AS ENUM ('DRAFT', 'PENDING_REVIEW', 'PUBLISHED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;


-- ========================
-- 2. CORE TABLES
-- ========================

-- Table: users
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  role VARCHAR CHECK (role IN ('admin', 'user')) DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: categories
CREATE TABLE IF NOT EXISTS public.categories (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug        VARCHAR(100) UNIQUE NOT NULL,
    name        VARCHAR(255) NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: articles
CREATE TABLE IF NOT EXISTS public.articles (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id     UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
    status          article_status NOT NULL DEFAULT 'PENDING_REVIEW',
    is_ai_generated BOOLEAN NOT NULL DEFAULT true,
    author_name     VARCHAR(255) NOT NULL DEFAULT 'Blorix AI',
    title           TEXT NOT NULL,
    body            TEXT NOT NULL,
    slug            VARCHAR(512) UNIQUE NOT NULL,
    image_url       VARCHAR(1024),
    published_at    TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ========================
-- 3. HELPER FUNCTIONS
-- ========================

-- Safe admin check function (SECURITY DEFINER bypasses RLS to prevent infinite recursion)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;


-- ========================
-- 4. TRIGGERS & FUNCTIONS
-- ========================

-- Trigger: Sync new auth users to public.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, role)
  VALUES (new.id, new.email, 'user');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Trigger: Auto-update articles.updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_articles_updated ON public.articles;
CREATE TRIGGER on_articles_updated
    BEFORE UPDATE ON public.articles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Trigger: Auto-set articles.published_at when status → PUBLISHED
CREATE OR REPLACE FUNCTION public.handle_published_at()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'PUBLISHED' AND OLD.status != 'PUBLISHED' THEN
        NEW.published_at = now();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_article_published ON public.articles;
CREATE TRIGGER on_article_published
    BEFORE UPDATE ON public.articles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_published_at();


-- ========================
-- 5. ROW LEVEL SECURITY (RLS)
-- ========================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Users Policies
CREATE POLICY "Users view own data"       ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins view all users"     ON public.users FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins update user roles"  ON public.users FOR UPDATE USING (public.is_admin());

-- Categories Policies
CREATE POLICY "Public read categories"  ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admins manage categories" ON public.categories FOR ALL TO authenticated USING (public.is_admin());

-- Articles Policies
CREATE POLICY "Public view published articles" ON public.articles FOR SELECT USING (status = 'PUBLISHED');
CREATE POLICY "Admins manage articles"         ON public.articles FOR ALL TO authenticated USING (public.is_admin());
