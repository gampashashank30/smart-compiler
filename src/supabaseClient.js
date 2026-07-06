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

// Check if we are running locally with dummy variables
const isDummy = supabaseUrl.includes('dummy');

const mockSupabase = {
  isDummy: true,
  auth: {
    getSession: async () => {
      const sessionStr = localStorage.getItem('supabase-mock-session');
      const session = sessionStr ? JSON.parse(sessionStr) : null;
      return { data: { session }, error: null };
    },
    onAuthStateChange: (callback) => {
      const sessionStr = localStorage.getItem('supabase-mock-session');
      const session = sessionStr ? JSON.parse(sessionStr) : null;
      // Fire key events asynchronously to match real Supabase behavior
      const timeoutId = setTimeout(() => {
        callback('SIGNED_IN', session);
      }, 0);
      return {
        data: {
          subscription: {
            unsubscribe: () => {
              clearTimeout(timeoutId);
            }
          }
        }
      };
    },
    signInWithOAuth: async ({ provider }) => {
      const mockUser = { id: 'dummy-user-id', email: 'guest@example.com' };
      const mockSession = { user: mockUser, access_token: 'dummy-access-token' };
      localStorage.setItem('supabase-mock-session', JSON.stringify(mockSession));
      window.location.href = '/app.html';
      return { data: { user: mockUser, session: mockSession }, error: null };
    },
    signInWithEmail: async (email, password) => {
      const mockUser = { id: 'dummy-user-id', email: email || 'guest@example.com' };
      const mockSession = { user: mockUser, access_token: 'dummy-access-token' };
      localStorage.setItem('supabase-mock-session', JSON.stringify(mockSession));
      return { data: { user: mockUser, session: mockSession }, error: null };
    },
    signInWithPassword: async ({ email, password }) => {
      const mockUser = { id: 'dummy-user-id', email: email || 'guest@example.com' };
      const mockSession = { user: mockUser, access_token: 'dummy-access-token' };
      localStorage.setItem('supabase-mock-session', JSON.stringify(mockSession));
      return { data: { user: mockUser, session: mockSession }, error: null };
    },
    signUp: async ({ email, password }) => {
      const mockUser = { id: 'dummy-user-id', email: email || 'guest@example.com' };
      const mockSession = { user: mockUser, access_token: 'dummy-access-token' };
      localStorage.setItem('supabase-mock-session', JSON.stringify(mockSession));
      return { data: { user: mockUser, session: mockSession }, error: null };
    },
    signOut: async () => {
      localStorage.removeItem('supabase-mock-session');
      window.location.href = '/login.html';
      return { error: null };
    }
  }
};

export const supabase = isDummy ? mockSupabase : createClient(supabaseUrl, supabaseAnonKey);

