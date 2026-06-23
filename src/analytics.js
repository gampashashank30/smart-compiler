import { supabase } from './supabaseClient.js';

let currentUserId = null;
let localStats = {
  total_runs: 0,
  ai_tokens_used: 0,
  time_spent: 0,
  error_counts: 0,
  email: ''
};

let listeners = [];
let timeBuffer = 0; // Accumulate time locally before saving

export const analyticsStore = {
  // Initialize and load user data from Supabase
  async init(user) {
    if (!user) {
      currentUserId = null;
      localStats = {
        total_runs: 0,
        ai_tokens_used: 0,
        time_spent: 0,
        error_counts: 0,
        email: ''
      };
      this.notify();
      return;
    }
    
    currentUserId = user.id;
    localStats.email = user.email;

    if (!supabase) {
      this.notify();
      return;
    }

    try {
      // Check if user has an analytics row
      let { data, error } = await supabase
        .from('user_analytics')
        .select('*')
        .eq('id', currentUserId)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        // If row doesn't exist (e.g. trigger failed or delay), create it manually
        const newRow = {
          id: currentUserId,
          email: user.email,
          total_runs: 0,
          ai_tokens_used: 0,
          time_spent: 0,
          error_counts: 0
        };
        
        const { data: inserted, error: insertError } = await supabase
          .from('user_analytics')
          .insert(newRow)
          .select()
          .single();

        if (insertError) throw insertError;
        data = inserted;
      }

      // Sync local state with database record
      localStats = {
        total_runs: data.total_runs ?? 0,
        ai_tokens_used: data.ai_tokens_used ?? 0,
        time_spent: data.time_spent ?? 0,
        error_counts: data.error_counts ?? 0,
        email: data.email ?? user.email
      };
      
      this.notify();
    } catch (err) {
      console.error('[Analytics] Failed to initialize:', err.message);
    }
  },

  getStats() {
    return { ...localStats };
  },

  isLimitReached() {
    // Only enforce limit if Supabase is active
    if (!supabase) return false;
    return localStats.ai_tokens_used >= 15000;
  },

  // Record token usage
  async recordTokens(count) {
    localStats.ai_tokens_used += count;
    this.notify();

    if (!supabase || !currentUserId) return;
    try {
      await supabase
        .from('user_analytics')
        .update({ ai_tokens_used: localStats.ai_tokens_used })
        .eq('id', currentUserId);
    } catch (err) {
      console.error('[Analytics] Failed to save tokens:', err.message);
    }
  },

  // Record code run execution
  async recordRun() {
    localStats.total_runs += 1;
    this.notify();

    if (!supabase || !currentUserId) return;
    try {
      await supabase
        .from('user_analytics')
        .update({ total_runs: localStats.total_runs })
        .eq('id', currentUserId);
    } catch (err) {
      console.error('[Analytics] Failed to save run count:', err.message);
    }
  },

  // Record error counts from bug tracker
  async recordErrors(count) {
    if (localStats.error_counts === count) return;
    localStats.error_counts = count;
    this.notify();

    if (!supabase || !currentUserId) return;
    try {
      await supabase
        .from('user_analytics')
        .update({ error_counts: count })
        .eq('id', currentUserId);
    } catch (err) {
      console.error('[Analytics] Failed to save error count:', err.message);
    }
  },

  // Buffer and periodically save time spent
  addTimeSpent(seconds) {
    localStats.time_spent += seconds;
    timeBuffer += seconds;
    this.notify();

    // Sync to DB when local buffer reaches 20 seconds
    if (timeBuffer >= 20) {
      this.syncTimeSpent();
    }
  },

  async syncTimeSpent() {
    if (!supabase || !currentUserId || timeBuffer === 0) return;
    const toSync = timeBuffer;
    timeBuffer = 0; // Clear buffer first to prevent double-counting in async race

    try {
      await supabase
        .from('user_analytics')
        .update({ time_spent: localStats.time_spent })
        .eq('id', currentUserId);
    } catch (err) {
      timeBuffer += toSync; // restore buffer on failure
      console.error('[Analytics] Failed to sync time spent:', err.message);
    }
  },

  subscribe(fn) {
    listeners.push(fn);
    // Trigger callback with initial stats immediately
    fn(this.getStats());
    return () => {
      listeners = listeners.filter(l => l !== fn);
    };
  },

  notify() {
    const stats = this.getStats();
    for (const fn of listeners) {
      try {
        fn(stats);
      } catch (err) {
        console.error('[Analytics] Listener notification error:', err);
      }
    }
  }
};
