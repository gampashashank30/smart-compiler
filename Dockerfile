# Use Node.js LTS base image (Debian-based for apt-get)
FROM node:20-bookworm-slim

# Install GCC + build tools (needed for C compilation AND node-pty native addon)
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy root package files first (for better Docker layer caching)
COPY package*.json ./

# Install root dependencies (includes Vite, React, etc.)
RUN npm install

# Copy all frontend source files and build the React app
COPY index.html app.html login.html vite.config.js eslint.config.js ./
COPY public/ ./public/
COPY src/ ./src/

# Accept Supabase config as Docker build args (must be set in Render → Docker Build Arguments)
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY

RUN npm run build

# Copy server code
COPY server/ ./server/

# Install server dependencies (this compiles node-pty natively for Linux)
RUN cd server && npm install

# Expose port — Render sets PORT env variable automatically
EXPOSE 10000

# Start the Express server (serves API + WebSocket + built React frontend)
CMD ["npm", "start"]
