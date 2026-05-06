# Project Blorix

Project Blorix is a scalable, AI-native automotive news platform. Acting as both an automated newsroom and a traditional CMS, it replaces repetitive content creation with an autonomous AI pipeline while preserving editorial control through a secure "Human-in-the-Loop" dashboard.

## Tech Stack
- **Framework**: Next.js 15 (App Router, React 19)
- **Database, Auth & Storage**: Supabase (PostgreSQL)
- **AI Integration**: Gemini 2.5 Flash
- **Deployment**: Google Cloud Run
- **Automation**: Google Cloud Scheduler

## Features
- **Bilingual Delivery**: Instant toggling between English and Hindi content without page reloads.
- **AI Automation**: Scheduled content generation and translation pipelines.
- **Admin Dashboard**: Full CMS for editing AI drafts and publishing manual content.
- **Performance**: High-speed delivery via Next.js Incremental Static Regeneration (ISR).

## Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env.local` file and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.
