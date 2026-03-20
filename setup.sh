#!/bin/bash
set -e

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_DIR"

echo "🚀 Setting up Mermaid Studio..."

# Detect OS
OS="$(uname -s)"
case "$OS" in
  Linux*)     INSTALL_CMD="curl -fsSL https://ollama.ai/install.sh | sh" ;;
  Darwin*)    INSTALL_CMD="brew install ollama" ;;
  *)          echo "❌ Unsupported OS: $OS"; exit 1 ;;
esac

# Check if Ollama is installed
if ! command -v ollama &> /dev/null; then
  echo "📦 Installing Ollama..."
  eval "$INSTALL_CMD"
else
  echo "✅ Ollama already installed"
fi

# Start Ollama service
echo "🔧 Starting Ollama service..."
if [[ "$OS" == "Linux" ]]; then
  if pgrep -x "ollama" > /dev/null; then
    echo "✅ Ollama already running"
  else
    ollama serve &
    sleep 2
  fi
elif [[ "$OS" == "Darwin" ]]; then
  if pgrep -x "ollama" > /dev/null; then
    echo "✅ Ollama already running"
  else
    brew services start ollama 2>/dev/null || ollama serve &
    sleep 2
  fi
fi

# Pull model if not present
echo "📥 Ensuring minimax-m2.7:cloud model is available..."
ollama pull minimax-m2.7:cloud 2>/dev/null || echo "⚠️  Model pull skipped (may already exist or remote unavailable)"

# Install project dependencies
echo "📚 Installing project dependencies..."
if command -v pnpm &> /dev/null; then
  pnpm install
elif command -v npm &> /dev/null; then
  npm install
else
  echo "❌ npm or pnpm required"
  exit 1
fi

# Build project
echo "🔨 Building project..."
npm run build > /dev/null 2>&1

# Start dev server
echo "🌟 Starting development server..."
echo "   App will be available at http://localhost:3000"
echo "   Press Ctrl+C to stop"
echo ""
npm run dev
