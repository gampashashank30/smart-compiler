import { createClient } from '@supabase/supabase-js';

// These values are injected at BUILD TIME by Vite from environment variables.
// Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Render → Docker Build Arguments.
// Never hardcode fallback values here — they get baked into the public JS bundle.
const supabaseUrl     = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '[supabaseClient] VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set. ' +
    'Add them as Docker Build Arguments in Render → Environment.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
