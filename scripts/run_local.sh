#!/usr/bin/env bash
set -e
set -x

echo "🚀 Starting local run for PaintingsShowcase..."

# Step 0: Resolve project root and version
REPO_ROOT=$(cd "$(git rev-parse --show-toplevel)" && pwd)
VERSION_FILE="$REPO_ROOT/VERSION"
VERSION=$(cat "$VERSION_FILE")
echo "🔢 Using version: $VERSION"

# Step 1: Generate .env file for Docker Compose
echo "📄 Creating .env file..."
echo "VERSION=$VERSION" > "$REPO_ROOT/.env"
echo "✅ .env file created"

# Step 2: Sync version across components
echo "🔄 Updating version in frontend and creating git tag if necessary..."
"$REPO_ROOT/scripts/update_version.sh"

# Step 3: Build backend JAR
echo "🛠️ Building backend with Gradle..."
cd "$REPO_ROOT"
"$REPO_ROOT/gradlew" :backend:clean :backend:build

# Step 4: Clean up unused Docker images (optional)
echo "🧹 Cleaning unused Docker images..."
docker image prune -f

# Step 5: Build Docker images
echo "🐳 Building Docker images..."
cd "$REPO_ROOT"
docker-compose build --no-cache

# Step 6: Start all containers
echo "⬆️ Starting Docker containers..."
docker-compose up
