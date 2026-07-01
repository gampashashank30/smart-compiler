# ─────────────────────────────────────────────────────────────────
# Stage 1: BUILDER — compile the React frontend
# Nothing from this stage leaks into the production image.
# ─────────────────────────────────────────────────────────────────
FROM node:20-bookworm-slim AS builder

# Install build tools needed for native addons (node-pty)
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /build

# Accept Supabase config as Docker build args
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY

# Copy root package files first (better layer caching)
COPY package*.json ./

# Install root deps (Vite, React, etc.)
RUN npm ci --omit=dev || npm install

# Copy only what Vite needs to build — no server code, no scratch files
COPY index.html app.html login.html vite.config.js ./
COPY public/ ./public/
COPY src/ ./src/

# Build the React app → outputs to /build/dist/
RUN npm run build

# ─────────────────────────────────────────────────────────────────
# Stage 2: RUNTIME — lean production image
# Contains ONLY: built dist/, server/, and server node_modules.
# Source code, configs, test files, .git, scratch — NONE of it.
# ─────────────────────────────────────────────────────────────────
FROM node:20-bookworm-slim AS runtime

# Install GCC + build tools needed for C compilation AND node-pty native addon
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy only the compiled frontend from the builder stage
COPY --from=builder /build/dist ./dist

# Copy only the server source (no root configs, no src/, no scratch/)
COPY server/package*.json ./server/
RUN cd server && npm ci --omit=dev || npm install

COPY server/ ./server/

# Expose port — Render sets PORT env variable automatically
EXPOSE 10000

# Start the Express server (serves API + WebSocket + built React frontend)
CMD ["node", "server/index.js"]
