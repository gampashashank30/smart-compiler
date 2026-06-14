# Use Node.js LTS base image
FROM node:20-bookworm-slim

# Install system dependencies (build-essential contains gcc, g++, make, etc. needed for node-pty and compilation)
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy root package files
COPY package*.json ./

# Install root dependencies
RUN npm install

# Copy frontend source files and build the React app
COPY index.html vite.config.js ./
COPY public/ ./public
COPY src/ ./src
RUN npm run build

# Copy server code
COPY server/ ./server

# Install server dependencies (this compiles node-pty for Linux)
RUN cd server && npm install

# Expose port (Render uses PORT env variable, defaulting to 10000)
EXPOSE 10000

# Start the application
CMD ["npm", "start"]
