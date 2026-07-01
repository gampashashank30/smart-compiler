# ─────────────────────────────────────────────────────────────────
# Stage 1: BUILDER — compile the React frontend
# Nothing from this stage leaks into the production image.
# ─────────────────────────────────────────────────────────────────
FROM node:20-bookworm-slim AS builder

# Install build tools needed for native addons
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /build

# Accept Supabase config as Docker build args (set in Render → Docker Build Arguments)
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY

# Copy root package files first (better layer caching)
COPY package*.json ./

# Install ALL deps including devDependencies — Vite + plugins are devDeps
# and are needed to run `npm run build`
RUN npm install

# Copy everything Vite needs to build the frontend
COPY index.html app.html login.html vite.config.js eslint.config.js ./
COPY public/ ./public/
COPY src/ ./src/

# Build the React app → outputs to /build/dist/
RUN npm run build

# ─────────────────────────────────────────────────────────────────
# Stage 2: RUNTIME — lean production image
# Contains ONLY: built dist/ + server/ + server node_modules.
# Source code, dev configs, test files, .git — NONE of it.
# ─────────────────────────────────────────────────────────────────
FROM node:20-bookworm-slim AS runtime

# Install GCC + build tools needed for C compilation AND node-pty native addon
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy only the compiled frontend from the builder stage (not source!)
COPY --from=builder /build/dist ./dist

# Copy server package files and install server dependencies
COPY server/package*.json ./server/
RUN cd server && npm install

# Copy server source code
COPY server/ ./server/

# Expose port — Render sets PORT env variable automatically
EXPOSE 10000

# Start the Express server (serves API + WebSocket + built React frontend)
CMD ["node", "server/index.js"]
