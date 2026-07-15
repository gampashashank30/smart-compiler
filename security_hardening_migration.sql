-- ══════════════════════════════════════════════════════════════
-- smart-compiler: Database Security Hardening for Pentesting
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ══════════════════════════════════════════════════════════════

-- 1. Enable Row Level Security (RLS) on both stats tables
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_analytics ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies to prevent conflicts
DROP POLICY IF EXISTS "Users can view their own stats" ON public.user_stats;
DROP POLICY IF EXISTS "Users can view their own analytics" ON public.user_analytics;
DROP POLICY IF EXISTS "Users can insert their own stats" ON public.user_stats;
DROP POLICY IF EXISTS "Users can insert their own analytics" ON public.user_analytics;
DROP POLICY IF EXISTS "Users can update their own stats" ON public.user_stats;
DROP POLICY IF EXISTS "Users can update their own analytics" ON public.user_analytics;

DROP POLICY IF EXISTS "Enable read access for all users" ON public.user_stats;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.user_stats;
DROP POLICY IF EXISTS "Enable update for users based on email" ON public.user_stats;

-- 3. Create fresh, secure RLS policies (SELECT and INSERT only)
-- No public UPDATE/DELETE policies are created, preventing direct client-side tampering of stats or limits.

-- user_stats: view and initialize
CREATE POLICY "Users can view their own stats" 
  ON public.user_stats FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own stats" 
  ON public.user_stats FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- user_analytics: view and initialize
CREATE POLICY "Users can view their own analytics" 
  ON public.user_analytics FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own analytics" 
  ON public.user_analytics FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- 4. Create record_user_run RPC function
-- Calculates streak and increments run count atomically on the server side
CREATE OR REPLACE FUNCTION public.record_user_run(p_user_id UUID, p_user_email TEXT, p_local_date TEXT)
RETURNS VOID AS $$
DECLARE
  v_current_streak INT := 0;
  v_last_activity DATE;
  v_new_streak INT := 1;
BEGIN
  -- Ensure user_analytics row exists
  INSERT INTO public.user_analytics (id, email, last_activity_date)
  VALUES (p_user_id, p_user_email, NULL)
  ON CONFLICT (id) DO UPDATE SET email = p_user_email;

  -- Ensure user_stats row exists
  INSERT INTO public.user_stats (id, total_runs, current_streak)
  VALUES (p_user_id, 0, 0)
  ON CONFLICT (id) DO NOTHING;

  -- Get current values
  SELECT last_activity_date INTO v_last_activity FROM public.user_analytics WHERE id = p_user_id;
  SELECT current_streak INTO v_current_streak FROM public.user_stats WHERE id = p_user_id;

  -- Calculate streak
  IF v_last_activity IS NULL THEN
    v_new_streak := 1;
  ELSIF v_last_activity = p_local_date::DATE THEN
    v_new_streak := COALESCE(v_current_streak, 0);
  ELSIF v_last_activity = (p_local_date::DATE - INTERVAL '1 day')::DATE THEN
    v_new_streak := COALESCE(v_current_streak, 0) + 1;
  ELSE
    v_new_streak := 1;
  END IF;

  -- Update last activity date
  UPDATE public.user_analytics
  SET last_activity_date = p_local_date::DATE
  WHERE id = p_user_id;

  -- Update total runs and streak count
  UPDATE public.user_stats
  SET 
    total_runs = COALESCE(total_runs, 0) + 1,
    current_streak = v_new_streak
  WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Create update_user_time_spent RPC function
-- Safely updates user time_spent without exposing other sensitive stats columns to updates
CREATE OR REPLACE FUNCTION public.update_user_time_spent(p_time_spent INT)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.user_stats (id, time_spent)
  VALUES (auth.uid(), p_time_spent)
  ON CONFLICT (id) DO UPDATE
  SET time_spent = p_time_spent;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Create database triggers to automatically manage error stats via bug_events
-- Whenever the client inserts/deletes error details into bug_events, the DB handles stats updates.

-- Trigger function for inserting bug event
CREATE OR REPLACE FUNCTION public.update_user_stats_on_bug_insert()
RETURNS TRIGGER AS $$
BEGIN
  -- Only update stats for error events (non-success)
  IF NEW.subtype <> 'Successful Run' THEN
    INSERT INTO public.user_stats (id, error_counts, error_breakdown)
    VALUES (
      NEW.user_id, 
      1, 
      jsonb_build_object(NEW.subtype, 1)
    )
    ON CONFLICT (id) DO UPDATE
    SET 
      error_counts = COALESCE(public.user_stats.error_counts, 0) + 1,
      error_breakdown = jsonb_set(
        COALESCE(public.user_stats.error_breakdown, '{}'::jsonb),
        ARRAY[NEW.subtype],
        to_jsonb(COALESCE((public.user_stats.error_breakdown->>NEW.subtype)::int, 0) + 1)
      );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger function for deleting bug events
CREATE OR REPLACE FUNCTION public.reset_user_stats_on_bug_delete()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.user_stats
  SET error_counts = 0, error_breakdown = '{}'::jsonb
  WHERE id = OLD.user_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the triggers on bug_events
DROP TRIGGER IF EXISTS trg_update_user_stats_on_bug_insert ON public.bug_events;
CREATE TRIGGER trg_update_user_stats_on_bug_insert
AFTER INSERT ON public.bug_events
FOR EACH ROW
EXECUTE FUNCTION public.update_user_stats_on_bug_insert();

DROP TRIGGER IF EXISTS trg_reset_user_stats_on_bug_delete ON public.bug_events;
CREATE TRIGGER trg_reset_user_stats_on_bug_delete
AFTER DELETE ON public.bug_events
FOR EACH ROW
EXECUTE FUNCTION public.reset_user_stats_on_bug_delete();
