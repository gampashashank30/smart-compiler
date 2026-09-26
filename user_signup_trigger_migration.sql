-- ══════════════════════════════════════════════════════════════
-- smart-compiler: Auto-register users on sign-in (Google + Email)
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ══════════════════════════════════════════════════════════════

-- 1. Add a `provider` column to user_analytics so we know HOW they signed in
ALTER TABLE public.user_analytics
  ADD COLUMN IF NOT EXISTS provider TEXT NOT NULL DEFAULT 'email';

-- 2. Add a `google_id` column — stores the Google sub/UID for OAuth users
ALTER TABLE public.user_analytics
  ADD COLUMN IF NOT EXISTS google_id TEXT;

-- 3. Create (or replace) the function that fires on every new auth.users INSERT
--    This runs the moment a user signs in for the FIRST time (Google OAuth or email)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_provider  TEXT;
  v_google_id TEXT;
BEGIN
  -- Determine the sign-in provider from Supabase's raw_app_meta_data
  v_provider  := COALESCE(NEW.raw_app_meta_data->>'provider', 'email');
  -- For Google users, Supabase stores the Google sub in identities
  v_google_id := NULL;
  IF v_provider = 'google' THEN
    SELECT identity_data->>'sub'
    INTO   v_google_id
    FROM   auth.identities
    WHERE  user_id = NEW.id
      AND  provider = 'google'
    LIMIT 1;
  END IF;

  -- Insert into user_analytics (skip if already exists — idempotent)
  INSERT INTO public.user_analytics (id, email, provider, google_id, last_activity_date)
  VALUES (
    NEW.id,
    NEW.email,
    v_provider,
    v_google_id,
    NULL
  )
  ON CONFLICT (id) DO UPDATE
    SET email     = EXCLUDED.email,
        provider  = EXCLUDED.provider,
        google_id = COALESCE(EXCLUDED.google_id, public.user_analytics.google_id);

  -- Insert into user_stats with defaults (skip if already exists)
  INSERT INTO public.user_stats (id, total_runs, ai_tokens_used, time_spent, error_counts, token_limit, current_streak)
  VALUES (NEW.id, 0, 0, 0, 0, 15000, 0)
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Drop and recreate the trigger so it fires after every new sign-up/first-login
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 5. (Optional) Back-fill existing users who are already in auth.users
--    but don't have a row in user_analytics yet.
--    Safe to run — uses ON CONFLICT to avoid overwriting existing data.
INSERT INTO public.user_analytics (id, email, provider, google_id, last_activity_date)
SELECT
  u.id,
  u.email,
  COALESCE(u.raw_app_meta_data->>'provider', 'email') AS provider,
  (
    SELECT identity_data->>'sub'
    FROM   auth.identities i
    WHERE  i.user_id = u.id AND i.provider = 'google'
    LIMIT 1
  ) AS google_id,
  NULL AS last_activity_date
FROM auth.users u
ON CONFLICT (id) DO UPDATE
  SET email     = EXCLUDED.email,
      provider  = EXCLUDED.provider,
      google_id = COALESCE(EXCLUDED.google_id, public.user_analytics.google_id);

INSERT INTO public.user_stats (id, total_runs, ai_tokens_used, time_spent, error_counts, token_limit, current_streak)
SELECT id, 0, 0, 0, 0, 15000, 0
FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- ══════════════════════════════════════════════════════════════
-- Verify:
--   SELECT id, email, provider, google_id FROM public.user_analytics LIMIT 20;
-- ══════════════════════════════════════════════════════════════
