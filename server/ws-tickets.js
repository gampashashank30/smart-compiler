'use strict';
/**
 * ws-tickets.js — Shared in-memory store for short-lived WebSocket auth tickets.
 *
 * This module avoids the circular dependency between index.js and ws-executor.js.
 * Both modules require this file to access the same Map instance.
 *
 * Ticket lifecycle:
 *   1. Client POSTs /api/ws-ticket with their Supabase JWT
 *   2. Server validates JWT, creates a UUID ticket valid for 30s, stores it here
 *   3. Client connects to ws://host/ws/run?ticket=<uuid>
 *   4. ws-executor validates and DELETES the ticket on first use (single-use)
 *   5. Expired tickets are swept every 60s
 */

const WS_TICKETS = new Map(); // ticketId → { userId, userEmail, expiresAt }

// Clean up expired tickets every 60 seconds
setInterval(() => {
  const now = Date.now();
  for (const [id, t] of WS_TICKETS) {
    if (t.expiresAt < now) WS_TICKETS.delete(id);
  }
}, 60_000).unref(); // .unref() so this doesn't prevent process exit

module.exports = { WS_TICKETS };
