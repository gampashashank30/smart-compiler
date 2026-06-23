import { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabaseClient.js';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    // If there is an OAuth hash fragment in the URL, Supabase will parse it and fire SIGNED_IN.
    // We shouldn't set loading to false on getSession() if it returns null, otherwise
    // the page will redirect to login before the hash is fully parsed.
    const hasAuthHash = window.location.hash.includes('access_token=') || 
                        window.location.hash.includes('id_token=') || 
                        window.location.hash.includes('error=');

    let timeoutId;
    if (hasAuthHash) {
      // Safety timeout: If Supabase fails to parse the hash or doesn't fire an auth event
      // within 4 seconds, set loading to false so the app doesn't hang.
      timeoutId = setTimeout(() => {
        setLoading(false);
      }, 4000);
    }

    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        setLoading(false);
      } else if (!hasAuthHash) {
        setUser(null);
        setLoading(false);
      }
    }).catch(() => {
      if (!hasAuthHash) {
        setLoading(false);
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    });

    return () => {
      subscription?.unsubscribe();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    if (!supabase) {
      alert('Supabase is not configured. Redirecting to app in guest mode.');
      return;
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/app.html'
      }
    });
    if (error) {
      throw error;
    }
  }, []);

  const signInWithEmail = useCallback(async (email, password) => {
    if (!supabase) {
      throw new Error('Supabase is not configured.');
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) {
      throw error;
    }
    return data;
  }, []);

  const signUpWithEmail = useCallback(async (email, password) => {
    if (!supabase) {
      throw new Error('Supabase is not configured.');
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });
    if (error) {
      throw error;
    }
    return data;
  }, []);

  const signOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  }, []);

  return {
    user,
    loading,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut
  };
}
