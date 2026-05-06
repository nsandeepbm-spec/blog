# Project Blorix: System Architecture & Product Requirements Document (PRD)

## 1. Executive Summary & Vision
**Project Blorix** is a scalable, AI-native automotive news platform. Acting as both an automated newsroom and a traditional CMS, it replaces repetitive content creation with an autonomous AI pipeline while preserving editorial control through a secure "Human-in-the-Loop" dashboard. 

As a complete, production-ready system, it supports fully autonomous AI article generation (English & Hindi) as well as **manual content authoring** by human editors.

## 2. User Roles & Flows

To ensure a full-featured platform, we define three distinct operational flows:

### 2.1 The Public User Flow (Frontend)
- **Discovery**: User lands on the Home page or a specific Category page (e.g., `/ev`, `/luxury`).
- **Delivery**: Pages are served instantly via Next.js Incremental Static Regeneration (ISR). No loading spinners.
- **Consumption**: User reads the article.
- **Bilingual Toggle**: User clicks the "Hindi / English" toggle. The page language switches instantly without a page reload (via client-side state mapping).

### 2.2 The Admin Editor Flow (Manual & Review)
- **Authentication**: Admin logs into `/admin` via Supabase Auth.
- **Dashboard Overview**: Admin sees metrics (Articles Pending Review, Published Today, AI vs. Manual).
- **Workflow A: AI Review**: 
  - Admin opens an AI-generated article (`status: PENDING_REVIEW`).
  - Edits the English or Hindi text if necessary.
  - Uploads a hero image (auto-converted to WebP).
  - Clicks "Publish" -> Status changes to `PUBLISHED`.
- **Workflow B: Manual Authoring**:
  - Admin clicks "Create New Article".
  - Uses a WYSIWYG editor to write custom, human-authored content.
  - Uploads media, sets category, and publishes directly.

### 2.3 The Autonomous AI Flow (Background)
- **Trigger**: Google Cloud Scheduler triggers `/api/generate` at scheduled intervals.
- **Execution**: Gemini 2.5 Flash researches automotive topics.
- **Synthesis**: 
  1. Generates English content (white-labeled).
  2. Translates to Hindi (preserving technical jargon).
- **Storage**: Saves to the database with `status: PENDING_REVIEW` and `is_ai_generated: true`.

---

## 3. Database Schema Design (Supabase)
For a robust, scalable system, we need normalized tables. A single table is insufficient for a full-featured app.

> [!IMPORTANT]
> Supabase Free Tier allows up to 500MB database space. Text and UUIDs are lightweight, but we must rely exclusively on Supabase Storage buckets for all media to prevent DB bloat.

### Table 1: `profiles` (Admin Users)
| Column | Type | Details |
| :--- | :--- | :--- |
| `id` | `UUID` | Matches `auth.users.id` |
| `role` | `Enum` | `ADMIN`, `EDITOR` |
| `display_name` | `VARCHAR` | e.g., "John Doe" |

### Table 2: `categories`
| Column | Type | Details |
| :--- | :--- | :--- |
| `id` | `UUID` | Primary Key |
| `slug` | `VARCHAR` | e.g., `electric-vehicles` |
| `name_en` | `VARCHAR` | e.g., "Electric Vehicles" |
| `name_hi` | `VARCHAR` | e.g., "इलेक्ट्रिक वाहन" |

### Table 3: `articles` (Core Content)
| Column | Type | Details |
| :--- | :--- | :--- |
| `id` | `UUID` | Primary Key |
| `category_id` | `UUID` | Foreign Key -> `categories.id` |
| `status` | `Enum` | `DRAFT`, `PENDING_REVIEW`, `PUBLISHED` |
| `is_ai_generated`| `BOOLEAN` | `true` if AI wrote it, `false` if manual |
| `author_name` | `VARCHAR` | "Blorix AI" or Admin's Name |
| `title_en`, `body_en`, `slug_en` | `TEXT` | English payload |
| `title_hi`, `body_hi`, `slug_hi` | `TEXT` | Hindi payload |
| `image_url` | `VARCHAR` | Supabase Storage pointer |
| `published_at` | `TIMESTAMPTZ` | Timestamp when status changed to PUBLISHED |

---

## 4. Frontend Integration & Data Injection Strategy
How the data meets the user interface seamlessly.

### 4.1 Next.js App Router Structure
- `/app/page.tsx`: Fetches the latest 10 published articles across all categories.
- `/app/[category]/page.tsx`: Fetches published articles filtered by `category_id`.
- `/app/[category]/[slug]/page.tsx`: Fetches a single article based on the `slug`.

### 4.2 Incremental Static Regeneration (ISR) Data Injection
We will not use `useEffect` to fetch data on the client side for public pages. This hurts SEO and speed.
Instead, we inject data on the server using Next.js 15 native `fetch` caching:

```typescript
// Example injection in /app/page.tsx
async function getArticles() {
  const { data } = await supabase
    .from('articles')
    .select('*, categories(*)')
    .eq('status', 'PUBLISHED')
    .order('published_at', { ascending: false });
  return data;
}
// Next.js automatically caches this page. We can set a revalidate time (e.g., 3600 seconds)
```

### 4.3 The Bilingual Strategy (Zero Layout Shift)
To handle Hindi and English without page reloads:
1. **Global State**: We use a lightweight Zustand store or React Context (`LanguageProvider`) to track the active locale (`'en'` or `'hi'`).
2. **Component Rendering**: The page receives the FULL payload (both EN and HI text) from the server.
3. **Dynamic Display**:
   ```tsx
   const { locale } = useLanguageStore(); // 'en' or 'hi'
   
   return (
     <article>
       <h1>{locale === 'en' ? article.title_en : article.title_hi}</h1>
       <div dangerouslySetInnerHTML={{ 
         __html: locale === 'en' ? article.body_en : article.body_hi 
       }} />
     </article>
   )
   ```
This guarantees SEO (crawlers see both/all text in the DOM or based on specific routes if we choose to split them later) and provides instant UI updates.

---

## 5. Strategic Tech Stack & Infrastructure
- **Frontend / API**: Next.js 15 (React 19).
- **Backend / Auth / DB**: Supabase.
- **AI Brain**: `@google/genai` (Gemini 2.5 Flash via Vertex AI).
- **Hosting**: Google Cloud Run (for the Next.js container, offering high performance and scaling down to zero to stay within the ~$0.56/mo target).
- **Automation**: Google Cloud Scheduler (Cron job targeting `/api/generate`).

---

## 6. Execution Roadmap

### Phase 1: Database & Data Access Layer
- Create `users`, `categories`, and `articles` tables in Supabase.
- Establish strict Row Level Security (RLS) so only Admins can write, but public can read `status = 'PUBLISHED'`.
- Setup Supabase Client within Next.js (`@supabase/ssr`).

### Phase 2: The Admin CMS & Manual Flow
- Build Next.js Auth flow (Login screen).
- Build the Admin Dashboard.
- Create the "WYSIWYG Article Editor" allowing Admins to manually write EN/HI articles, upload images, and select categories.
- Build the "Pending Review" queue interface.

### Phase 3: AI Autonomy & Cloud Scheduler
- Build `/api/generate` endpoint.
- Implement Gemini system prompts for:
  1. Discovery & English Drafting.
  2. Technical Hindi Translation.
- Wire API to save to database as `PENDING_REVIEW` with `is_ai_generated = true`.

### Phase 4: Frontend Delivery & Optimization
- Wire the existing frontend UI components to the Supabase data fetching logic.
- Implement ISR caching.
- Build the Language Toggle client components.
- Deploy to Google Cloud Run.
