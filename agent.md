# Agent Context: Project Blorix

## Project Overview
Project Blorix is an AI-native automotive news platform. It features an automated AI-research and translation pipeline using Gemini 2.5 Flash, alongside a Human-in-the-Loop Admin Dashboard for editorial oversight.

## Technology Stack
- **Framework**: Next.js 15 (App Router, Server Actions, React 19)
- **Styling**: Tailwind CSS
- **Database & Auth**: Supabase (PostgreSQL)
- **State Management**: Zustand (for lightweight client state like language toggling)

## Key Architecture Principles
1. **Route Groups**: Ensure clear separation between `(public)` routes (e.g., public articles) and `(admin)` routes (Admin Dashboard).
2. **Service Layer**: Keep data fetching, database interactions, and business logic organized in the `services/` directory, avoiding direct DB queries inside UI components where possible.
3. **Data Fetching & ISR**: Use Next.js native `fetch` caching with Incremental Static Regeneration (ISR). We avoid client-side fetching (`useEffect`) for public pages to ensure high performance and zero loading spinners.
4. **Bilingual Delivery**: Articles contain both English and Hindi payloads (`title_en`, `title_hi`, `body_en`, `body_hi`). The frontend switches the displayed language instantly via client-side state mapping—without triggering a layout shift or page reload.
5. **Database Security**: We use normalized PostgreSQL tables in Supabase combined with strict Row Level Security (RLS) policies.

## Working Guidelines
- Always refer to `requirement.md` for full product context and DB schema definitions.
- Write clean, modular, and responsive UI components using modern Tailwind CSS.
- For new features, prioritize server-side data preparation and minimize client bundle size.
