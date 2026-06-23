import { createClient } from '@supabase/supabase-js';

// These are PUBLIC (publishable) keys — safe to include in frontend code.
// Supabase Row Level Security (RLS) policies protect the data, not this key.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ibztlqnbjvqpsfgigqop.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_C98fRiosjZ7xX3_nFFvc7Q_wTVXBfzW';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
