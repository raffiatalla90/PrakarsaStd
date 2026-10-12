#!/bin/bash
# Auto-deploy script for Prakarsa Studio (Laravel + React) on Rumahweb shared hosting.
# Pulled from GitHub by cron. Server has no Node, so React assets are built by GitHub Actions.
#
# Usage: bash ~/prakarsa/deploy.sh

set -uo pipefail

APP_DIR="/home/prae6698/prakarsa"
PHP="/usr/local/bin/php"
COMPOSER="$HOME/bin/composer"
LOG="$HOME/deploy.log"
LOCK="$HOME/deploy.lock"

cd "$APP_DIR" || exit 1

# --- single instance lock ---
if [ -f "$LOCK" ]; then
  PID=$(cat "$LOCK" 2>/dev/null)
  if [ -n "$PID" ] && kill -0 "$PID" 2>/dev/null; then
    exit 0   # previous run still going
  fi
fi
echo $$ > "$LOCK"
trap 'rm -f "$LOCK"' EXIT

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >> "$LOG"; }

log "=== deploy start ==="

# --- fetch remote without touching working tree ---
git fetch origin main --quiet 2>>"$LOG"
LOCAL=$(git rev-parse HEAD 2>/dev/null)
REMOTE=$(git rev-parse origin/main 2>/dev/null)

if [ "$LOCAL" = "$REMOTE" ]; then
  log "up to date ($LOCAL) — nothing to do"
  exit 0
fi

log "updating $LOCAL -> $REMOTE"

# --- preserve local-only files ---
cp -f .env /tmp/prakarsa.env.bak 2>/dev/null
cp -f database/database.sqlite /tmp/prakarsa.sqlite.bak 2>/dev/null

# --- pull ---
if ! git pull origin main --ff-only >>"$LOG" 2>&1; then
  log "ERROR: git pull failed (non fast-forward). Manual attention needed."
  exit 1
fi

# --- restore local-only files (in case they were touched) ---
[ -f /tmp/prakarsa.env.bak ] && cp -f /tmp/prakarsa.env.bak .env
[ -f /tmp/prakarsa.sqlite.bak ] && cp -f /tmp/prakarsa.sqlite.bak database/database.sqlite

# --- composer install only when composer.lock changed ---
if [ -f "$COMPOSER" ]; then
  if [ ! -f vendor/autoload.php ] || [ composer.lock -nt vendor/autoload.php ]; then
    log "composer install..."
    $PHP "$COMPOSER" install --no-dev --no-scripts --optimize-autoloader \
      --no-interaction >>"$LOG" 2>&1
  fi
fi

# --- ensure sqlite db exists ---
[ -f database/database.sqlite ] || touch database/database.sqlite

# --- migrate (safe, non-interactive) ---
$PHP artisan migrate --force >>"$LOG" 2>&1

# --- permissions ---
chmod -R 775 storage bootstrap/cache 2>/dev/null

# --- rebuild caches ---
$PHP artisan config:cache >>"$LOG" 2>&1
$PHP artisan route:cache  >>"$LOG" 2>&1
$PHP artisan view:cache   >>"$LOG" 2>&1
$PHP artisan event:cache  >>"$LOG" 2>&1

log "=== deploy done ($REMOTE) ==="
