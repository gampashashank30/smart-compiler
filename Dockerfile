# ─────────────────────────────────────────────────────────────────
# Stage 1: GCC SANDBOX IMAGE — built into the main image
# This is the gcc-runner:latest image, but baked directly into the
# production image so it is ALWAYS available and never needs to be
# built separately on the host. This eliminates the
# "Unable to find image 'gcc-runner:latest' locally" error forever.
# ─────────────────────────────────────────────────────────────────
FROM alpine:3.19 AS gcc-sandbox

# Install GCC toolchain (same as server/Dockerfile.gcc)
RUN apk add --no-cache gcc g++ musl-dev binutils

# Create non-root runner user
RUN adduser -D -H -s /sbin/nologin runner

WORKDIR /sandbox
USER runner
CMD ["/bin/sh"]

# ─────────────────────────────────────────────────────────────────
# Stage 2: BUILDER — compile the React frontend
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
# Stage 3: RUNTIME — lean production image
# Contains ONLY: built dist/ + server/ + server node_modules.
# Source code, dev configs, test files, .git — NONE of it.
#
# KEY FIX: We install GCC directly into this image so we can
# compile and run C code WITHOUT needing docker-in-docker.
# Docker-in-docker on Render/Coolify causes the 24-hour restart
# problem because the gcc-runner image is lost on every restart.
# ─────────────────────────────────────────────────────────────────
FROM node:20-bookworm-slim AS runtime

# Install GCC + build tools so we can compile C code directly
# inside this container (no docker-in-docker needed)
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    g++ \
    python3 \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Create app user
RUN groupadd --gid 1001 appuser && \
    useradd --uid 1001 --gid appuser --shell /bin/bash --create-home appuser

WORKDIR /app

# Create compiler tmp dir (writable by appuser)
RUN mkdir -p /data/compiler-tmp && chown -R appuser:appuser /data/compiler-tmp

# Copy only the compiled frontend from the builder stage (not source!)
COPY --from=builder /build/dist ./dist

# Copy server package files and install server dependencies
COPY server/package*.json ./server/
RUN cd server && npm install

# Copy server source code
COPY server/ ./server/

# Expose port — Render sets PORT env variable automatically
EXPOSE 10000

# Switch to non-root user before starting the server
USER appuser

# Health check — verifies the server is responsive every 30s
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD node -e "require('http').get('http://localhost:' + (process.env.PORT || 10000) + '/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

# Start the Express server (serves API + WebSocket + built React frontend)
CMD ["node", "server/index.js"]
