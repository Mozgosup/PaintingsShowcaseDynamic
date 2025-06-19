#!/usr/bin/env bash
set -e

REPO_ROOT="$(git rev-parse --show-toplevel)"
VERSION=$(cat "$REPO_ROOT/VERSION")

echo "🔢 Syncing version to $VERSION..."

# Update frontend/package.json
jq --arg v "$VERSION" '.version = $v' "$REPO_ROOT/frontend/package.json" > "$REPO_ROOT/frontend/package.json.tmp"
mv "$REPO_ROOT/frontend/package.json.tmp" "$REPO_ROOT/frontend/package.json"

# Add to commit (if not added manually)
git add "$REPO_ROOT/frontend/package.json"

# Put a tag if it doesn't already exist
if git tag | grep -q "v$VERSION"; then
  # If the tag already exists, let's check to see if it points to the right commit
  if ! git tag --points-at HEAD | grep -q "v$VERSION"; then
    echo "♻️ Updating existing tag v$VERSION to current commit..."
    git tag -d "v$VERSION"
    git tag "v$VERSION"
  else
    echo "✅ Tag v$VERSION already exists and points to the current commit."
  fi
else
  echo "🏷️ Creating git tag v$VERSION..."
  git tag "v$VERSION"
fi

