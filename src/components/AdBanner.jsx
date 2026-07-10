import React, { useEffect } from 'react';
import styles from './AdBanner.module.css';

/**
 * Reusable Google AdSense component for React.
 * Supports configurable client ID, slot, format, and responsiveness.
 * Renders a premium, brand-aligned mockup placeholder in development mode.
 */
export default function AdBanner({
  client = import.meta.env.VITE_ADSENSE_CLIENT_ID || 'ca-pub-1234567890123456',
  slot = '1234567890',
  format = 'auto',
  responsive = 'true',
  style = {},
  className = ''
}) {
  const isDev = import.meta.env.DEV;

  useEffect(() => {
    // AdSense adsbygoogle array push is only run in production
    if (!isDev) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('[AdSense] Error pushing ad unit:', err);
      }
    }
  }, [isDev]);

  if (isDev) {
    return (
      <div className={`${styles.devPlaceholder} ${className}`} style={style}>
        <div className={styles.pulseGlow}></div>
        <div className={styles.devHeader}>
          <span className={styles.devBadge}>AD SPONSOR</span>
          <span className={styles.devSlot}>Slot: {slot}</span>
        </div>
        <div className={styles.devContent}>
          <span className={styles.devTitle}>Learn C Programming Instantly</span>
          <span className={styles.devDesc}>Get interactive visual animations, AI hints, and quizzes.</span>
        </div>
      </div>
    );
  }

  // Check if client is default placeholder
  const isPlaceholder = client === 'ca-pub-1234567890123456' || client === 'your_adsense_client_id_here' || !client;

  if (isPlaceholder) {
    // Return a blank space or empty container to avoid breaking production layout
    // until the publisher updates their env file
    return null;
  }

  return (
    <div className={`${styles.adContainer} ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '90px', ...style }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}
