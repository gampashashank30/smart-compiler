// useAuth.js — Supabase auth is disabled.
// Returns stub values so any component using this hook doesn't crash.
// To re-enable auth, restore the real implementation from git history.

export function useAuth() {
  return {
    user: null,
    loading: false,
    signInWithGoogle: () => alert('Auth is currently disabled.'),
    signOut: () => {},
  };
}
