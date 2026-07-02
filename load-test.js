import http from 'k6/http';
import ws from 'k6/ws';
import { check, sleep } from 'k6';

// ─── CONFIGURATION ──────────────────────────────────────────────────────────
// Retrieve target host and Supabase access token from environment variables
// Example run command:
// k6 run -e K6_TARGET_HOST=smartcompiler.maadiotsolutions.co.in -e K6_TOKEN=YOUR_TOKEN load-test.js
const TARGET_HOST = __ENV.K6_TARGET_HOST || 'localhost:3001';
const IS_HTTPS = __ENV.K6_HTTPS === 'true' || TARGET_HOST !== 'localhost:3001';

const HTTP_URL = `${IS_HTTPS ? 'https' : 'http'}://${TARGET_HOST}`;
const WS_URL = `${IS_HTTPS ? 'wss' : 'ws'}://${TARGET_HOST}/ws/run`;
const SUPABASE_JWT_TOKEN = __ENV.K6_TOKEN || '';

// ─── LOAD PROFILE (Virtual Users) ───────────────────────────────────────────
// Ramps up to 200 users, holds, and ramps down.
export const options = {
  stages: [
    { duration: '30s', target: 50 },  // Ramp up to 50 users
    { duration: '1m',  target: 100 }, // Ramp up to 100 users
    { duration: '2m',  target: 200 }, // Ramp up to 200 users (peak load)
    { duration: '2m',  target: 200 }, // Stay at 200 users for 2 minutes
    { duration: '1m',  target: 0 },   // Ramp down to 0 users
  ],
  thresholds: {
    'http_req_duration': ['p(95)<1500'], // 95% of ticket requests must be under 1.5s
  },
};

// ─── SCENARIO FLOW ──────────────────────────────────────────────────────────
export default function () {
  if (!SUPABASE_JWT_TOKEN) {
    console.error('K6_TOKEN is required! Run with -e K6_TOKEN=your_token_value');
    sleep(2);
    return;
  }

  // 1. Get a single-use connection ticket from the API
  const ticketHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${SUPABASE_JWT_TOKEN}`,
  };

  const response = http.post(`${HTTP_URL}/api/ws-ticket`, null, { headers: ticketHeaders });
  
  const ticketOk = check(response, {
    'ticket request succeeded (200)': (res) => res.status === 200,
  });

  if (!ticketOk) {
    console.error(`Failed to retrieve ticket: Status ${response.status} - ${response.body}`);
    sleep(2);
    return;
  }

  const responseBody = JSON.parse(response.body);
  const ticketId = responseBody.ticket;

  // 2. Connect to the WebSocket endpoint using the single-use ticket
  const wsUrlWithTicket = `${WS_URL}?ticket=${ticketId}`;

  const res = ws.connect(wsUrlWithTicket, {}, function (socket) {
    socket.on('open', () => {
      // 3. Send compile & run payload
      socket.send(JSON.stringify({
        type: 'run',
        code: `#include <stdio.h>\nint main() {\n    printf("Running load test compilation\\n");\n    return 0;\n}`,
      }));
    });

    socket.on('message', (data) => {
      const msg = JSON.parse(data);
      
      // Stop and disconnect on completion or failure
      if (msg.type === 'exit') {
        check(msg, {
          'compilation & run completed successfully (exit code 0)': (m) => m.code === 0,
        });
        socket.close();
      } else if (msg.type === 'error' || msg.type === 'compile-error') {
        socket.close();
      }
    });

    socket.on('error', (err) => {
      console.error(`WebSocket connection error: ${err.error()}`);
    });
  });

  // Short pause before starting the next iteration
  sleep(1);
}
