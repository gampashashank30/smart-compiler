-- ══════════════════════════════════════════════════════════════
-- smart-compiler: Add bug events table and error breakdown
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ══════════════════════════════════════════════════════════════

-- 1. Create bug_events table to store session-scoped bug details permanently
CREATE TABLE IF NOT EXISTS public.bug_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_id NUMERIC NOT NULL,
  type TEXT NOT NULL,
  subtype TEXT NOT NULL,
  timestamp BIGINT NOT NULL,
  time_ms INTEGER,
  exit_code INTEGER,
  line_hint INTEGER,
  stderr TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Add description comment for the table
COMMENT ON TABLE public.bug_events IS 'Stores historical compiler and runtime error events for students';

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.bug_events ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policies
CREATE POLICY "Users can insert their own bug events" ON public.bug_events
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own bug events" ON public.bug_events
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bug events" ON public.bug_events
  FOR DELETE USING (auth.uid() = user_id);

-- 5. Ensure the error_breakdown JSONB column exists on user_stats table
ALTER TABLE public.user_stats
  ADD COLUMN IF NOT EXISTS error_breakdown JSONB DEFAULT '{}'::jsonb;

COMMENT ON COLUMN public.user_stats.error_breakdown IS 'JSON mapping of error types to frequency counts for this user';
