import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../useAuth.js';
import { supabase } from '../supabaseClient.js';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const { user, loading: sessionLoading, signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef(null);

  // If user is already authenticated, redirect to the app immediately
  useEffect(() => {
    if (user) {
      window.location.href = '/app.html';
    }
  }, [user]);

  // Track mouse coordinates to update CSS variables for radial lighting effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      containerRef.current.style.setProperty('--mouse-x', `${x}px`);
      containerRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      if (isSignUp) {
        await signUpWithEmail(email, password);
        // Try to automatically sign in right after signup
        try {
          await signInWithEmail(email, password);
          window.location.href = '/app.html';
        } catch (signInErr) {
          // If auto-signin fails (e.g. email confirmation required), notify them
          setMessage('Registration successful! Please check your email to confirm your account, then sign in.');
          setIsSignUp(false);
          setPassword('');
        }
      } else {
        await signInWithEmail(email, password);
        window.location.href = '/app.html';
      }
    } catch (err) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setMessage(null);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err.message || 'Failed to authenticate with Google.');
    }
  };

  // Graceful guest mode bypass if Supabase credentials are not set
  const handleGuestBypass = () => {
    window.location.href = '/app.html';
  };

  if (sessionLoading) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.spinner}></div>
        <div className={styles.loadingText}>Initializing SmartCompiler...</div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer} ref={containerRef}>
      {/* Background grids and glowing mesh */}
      <div className={styles.gridOverlay}></div>
      <div className={styles.glowOverlay}></div>

      <div className={styles.authCard}>
        {/* Logo and Branding */}
        <div className={styles.logoSection}>
          <div className={styles.logoBox}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="11" fill="url(#login-grad)" />
              <polygon points="24,8 13,23 20,23 16,33 27,18 20,18" fill="white" fillRule="evenodd" />
              <defs>
                <linearGradient id="login-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className={styles.brandTitle}>
            <span className={styles.titleSmart}>Smart</span>
            <span className={styles.titleCompiler}>Compiler</span>
          </h1>
          <p className={styles.brandSubtitle}>Write · Analyze · Learn</p>
        </div>

        {/* Tab Selector */}
        <div className={styles.tabSelector}>
          <button 
            type="button"
            className={`${styles.tabBtn} ${!isSignUp ? styles.activeTab : ''}`}
            onClick={() => { setIsSignUp(false); setError(null); setMessage(null); }}
          >
            Sign In
          </button>
          <button 
            type="button"
            className={`${styles.tabBtn} ${isSignUp ? styles.activeTab : ''}`}
            onClick={() => { setIsSignUp(true); setError(null); setMessage(null); }}
          >
            Register
          </button>
        </div>

        {/* Success/Error Alerts */}
        {error && <div className={styles.errorAlert}>{error}</div>}
        {message && <div className={styles.successAlert}>{message}</div>}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className={styles.input}
            />
          </div>

          <button 
            type="submit" 
            className={styles.submitBtn} 
            disabled={loading}
          >
            {loading ? (
              <div className={styles.btnSpinner}></div>
            ) : isSignUp ? (
              'Create Account'
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className={styles.divider}>
          <span className={styles.dividerLine}></span>
          <span className={styles.dividerText}>or continue with</span>
          <span className={styles.dividerLine}></span>
        </div>

        {/* Social Authentication */}
        <button 
          onClick={handleGoogleSignIn} 
          className={styles.googleBtn}
          title="Sign in with Google"
        >
          <span className={styles.googleIcon}>
            <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
          </span>
          Google
        </button>

        {/* Demo Bypass / Fallback Mode Details */}
        {(!supabase || supabase.isDummy) && (
          <div className={styles.demoNotice}>
            <p>Supabase parameters are not configured in `.env` yet.</p>
            <button onClick={handleGuestBypass} className={styles.guestLink}>
              Proceed in Guest / Demo Mode
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
