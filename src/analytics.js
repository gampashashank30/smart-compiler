import { supabase } from './supabaseClient.js';

let currentUserId = null;
let localStats = {
  total_runs: 0,
  ai_tokens_used: 0,
  time_spent: 0,
  error_counts: 0,
  email: '',
  token_limit: 15000,
  current_streak: 0,
  last_activity_date: null
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
        email: '',
        token_limit: 15000,
        current_streak: 0,
        last_activity_date: null
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
          error_counts: 0,
          current_streak: 0,
          last_activity_date: null
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
        email: data.email ?? user.email,
        token_limit: data.token_limit ?? 15000,
        current_streak: data.current_streak ?? 0,
        last_activity_date: data.last_activity_date ?? null
      };
      
      // On login, refresh streak if the day has rolled over
      const { newStreak, newDate, changed } = this._computeStreak(
        localStats.current_streak,
        localStats.last_activity_date
      );
      if (changed) {
        localStats.current_streak = newStreak;
        localStats.last_activity_date = newDate;
        // Persist the updated streak to DB (fire-and-forget)
        supabase
          .from('user_analytics')
          .update({ current_streak: newStreak, last_activity_date: newDate })
          .eq('id', currentUserId)
          .then(() => {})
          .catch(err => console.error('[Analytics] Failed to persist login streak:', err.message));
      }
      this.notify();
    } catch (err) {
      console.error('[Analytics] Failed to initialize:', err.message);
    }
  },

  // Returns today's date as 'YYYY-MM-DD' in the user's LOCAL timezone
  _localDateStr(date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  },

  // Compute new streak value based on last_activity_date vs today.
  // Returns { newStreak, newDate, changed } — changed=true if DB write is needed.
  _computeStreak(currentStreak, lastActivityDate) {
    const today = this._localDateStr();
    if (lastActivityDate === today) {
      // Already recorded today — no change
      return { newStreak: currentStreak, newDate: today, changed: false };
    }
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = this._localDateStr(yesterday);
    if (lastActivityDate === yesterdayStr) {
      // Consecutive day — extend streak
      return { newStreak: (currentStreak || 0) + 1, newDate: today, changed: true };
    }
    // Gap in activity (or first run ever) — reset streak to 1
    return { newStreak: 1, newDate: today, changed: true };
  },

  getStats() {
    return { ...localStats };
  },

  isLimitReached() {
    // Only enforce limit if Supabase is active
    if (!supabase) return false;
    return localStats.ai_tokens_used >= (localStats.token_limit ?? 15000);
  },

  // Record token usage — LOCAL STATE ONLY.
  // The server (/api/ai) is the single source of truth for ai_tokens_used in Supabase.
  // Writing here too caused every AI call to double-count tokens.
  recordTokens(count) {
    localStats.ai_tokens_used += count;
    this.notify();
    // DO NOT write to Supabase here — server already wrote the correct value.
  },

  // Record code run execution — also updates streak
  async recordRun() {
    localStats.total_runs += 1;

    // Update streak based on today's date
    const { newStreak, newDate } = this._computeStreak(
      localStats.current_streak,
      localStats.last_activity_date
    );
    localStats.current_streak = newStreak;
    localStats.last_activity_date = newDate;

    this.notify();

    if (!supabase || !currentUserId) return;
    try {
      await supabase
        .from('user_analytics')
        .update({
          total_runs: localStats.total_runs,
          current_streak: newStreak,
          last_activity_date: newDate,
        })
        .eq('id', currentUserId);
    } catch (err) {
      console.error('[Analytics] Failed to save run count and streak:', err.message);
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
