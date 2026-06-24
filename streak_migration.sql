-- ══════════════════════════════════════════════════════════════
-- smart-compiler: Add streak tracking to user_analytics
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ══════════════════════════════════════════════════════════════

-- 1. Add current_streak column (integer, default 0)
ALTER TABLE public.user_analytics
  ADD COLUMN IF NOT EXISTS current_streak integer NOT NULL DEFAULT 0;

-- 2. Add last_activity_date column (date, nullable)
--    Stores the last calendar date the user ran code (YYYY-MM-DD in their local tz)
ALTER TABLE public.user_analytics
  ADD COLUMN IF NOT EXISTS last_activity_date date;

-- 3. (Optional) Add a comment for documentation
COMMENT ON COLUMN public.user_analytics.current_streak IS
  'Number of consecutive calendar days the user has run at least one program';
COMMENT ON COLUMN public.user_analytics.last_activity_date IS
  'The last date (local timezone) the user ran code — used to compute streak continuity';

-- 4. (Optional) Create an index if you ever query by streak
-- CREATE INDEX IF NOT EXISTS idx_user_analytics_streak
--   ON public.user_analytics (current_streak DESC);

-- ══════════════════════════════════════════════════════════════
-- After running, verify:
--   SELECT id, email, current_streak, last_activity_date
--   FROM public.user_analytics LIMIT 10;
-- ══════════════════════════════════════════════════════════════
