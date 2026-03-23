#!/usr/bin/env bash
# publish.sh — stage new/modified posts and push to trigger GitHub Pages deploy
set -e

cd "$(git rev-parse --show-toplevel)"

git add content/

if git diff --cached --quiet; then
  echo "Nothing new in content/ to publish."
  exit 0
fi

TITLES=$(git diff --cached --name-only \
  | grep "content/posts/" \
  | sed 's|content/posts/||;s|\.md$||' \
  | head -3 \
  | paste -sd ", " -)

MSG="publish: ${TITLES:-posts}"
git commit -m "$MSG"
git push origin main

echo ""
echo "Pushed: $MSG"
echo "GitHub Actions will deploy in ~1 minute."
echo "Live at: https://sulagnasasmal.github.io/blog/"
