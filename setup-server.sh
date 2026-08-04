#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# setup-server.sh — One-time Hetzner server setup script
#
# Run this ONCE after buying your Hetzner server:
#   ssh root@<your-server-ip>
#   curl -fsSL https://raw.githubusercontent.com/YOUR_USERNAME/smart-compiler/main/setup-server.sh | bash
#
# What this script does:
#   1. Installs Coolify (includes Docker, Caddy, SSL)
#   2. Builds the gcc-runner Docker image (used for sandboxed code execution)
#   3. Prints next steps
# ─────────────────────────────────────────────────────────────────────────────

set -e  # Exit immediately if any command fails

echo "========================================"
echo "  Smart Compiler — Hetzner Server Setup"
echo "========================================"
echo ""

# ── Step 1: Install Coolify ──────────────────────────────────────────────────
echo "📦 Step 1/2: Installing Coolify (Docker + SSL + reverse proxy included)..."
echo "This takes about 5-10 minutes..."
echo ""
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
echo ""
echo "✅ Coolify installed!"
echo ""

# ── Step 2: Build gcc-runner image ───────────────────────────────────────────
echo "🐳 Step 2/2: Building gcc-runner sandbox image..."
echo "This is the Docker image used to safely run user code..."
echo ""

# Clone the repo to get the Dockerfile.gcc
TMPDIR=$(mktemp -d)
git clone --depth=1 https://github.com/gampashashank30/smart-compiler.git "$TMPDIR/smart-compiler"
cd "$TMPDIR/smart-compiler/server"

docker build -f Dockerfile.gcc -t gcc-runner:latest .

# Verify the image was built
if docker images gcc-runner | grep -q "gcc-runner"; then
  echo ""
  echo "✅ gcc-runner image built successfully!"
  docker images gcc-runner
else
  echo "❌ Failed to build gcc-runner image"
  exit 1
fi

# Cleanup
rm -rf "$TMPDIR"
cd /

# ── Done ─────────────────────────────────────────────────────────────────────
echo ""
echo "========================================"
echo "  ✅ Server setup complete!"
echo "========================================"
echo ""
echo "📋 Next steps:"
echo ""
echo "1. Open Coolify in your browser:"
echo "   http://$(curl -s ifconfig.me):8000"
echo ""
echo "2. Create your admin account"
echo ""
echo "3. Connect your GitHub repo:"
echo "   Sources → Add GitHub App → Authorize"
echo ""
echo "4. Create your app in Coolify:"
echo "   New Project → New Service → Application → GitHub"
echo "   - Branch: main"
echo "   - Build Pack: Dockerfile"
echo "   - Port: 10000"
echo "   - Domain: smartcompiler.maadiotsolutions.co.in"
echo ""
echo "5. Add environment variables in Coolify:"
echo "   VITE_SUPABASE_URL"
echo "   VITE_SUPABASE_ANON_KEY"
echo "   SUPABASE_SERVICE_KEY"
echo "   ADMIN_EMAILS"
echo "   PORT=10000"
echo "   NODE_ENV=production"
echo ""
echo "6. In Advanced → Volumes, add:"
echo "   /var/run/docker.sock:/var/run/docker.sock"
echo ""
echo "7. Click Deploy!"
echo ""
