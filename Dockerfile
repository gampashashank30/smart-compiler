# ─────────────────────────────────────────────────────────────────
# Stage 1: BUILDER — compile the React frontend (Pure JS, no C++ tools needed)
# ─────────────────────────────────────────────────────────────────
FROM node:20-bookworm-slim AS builder

WORKDIR /build

# Accept Supabase config as Docker build args
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY

# Copy package files & install frontend deps
COPY package*.json ./
RUN npm install

# Copy source and build React frontend → outputs to /build/dist/
COPY index.html app.html login.html vite.config.js eslint.config.js ./
COPY public/ ./public/
COPY src/ ./src/
RUN npm run build

# ─────────────────────────────────────────────────────────────────
# Stage 2: RUNTIME — lean production image with GCC baked in
# ─────────────────────────────────────────────────────────────────
FROM node:20-bookworm-slim AS runtime

ENV DEBIAN_FRONTEND=noninteractive

# Install GCC, G++, Make & Python3 so C code compiles locally
# and node-pty can build native addon during server npm install
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    g++ \
    make \
    python3 \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Create app user
RUN groupadd --gid 1001 appuser && \
    useradd --uid 1001 --gid appuser --shell /bin/bash --create-home appuser

WORKDIR /app

# Create compiler tmp dir (writable by appuser)
RUN mkdir -p /data/compiler-tmp && chown -R appuser:appuser /data/compiler-tmp

# Copy compiled frontend from builder
COPY --from=builder /build/dist ./dist

# Copy server package files and install server dependencies
COPY server/package*.json ./server/
RUN cd server && npm install

# Copy server source code
COPY server/ ./server/

EXPOSE 10000

USER appuser

HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD node -e "require('http').get('http://localhost:' + (process.env.PORT || 10000) + '/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

CMD ["node", "server/index.js"]
