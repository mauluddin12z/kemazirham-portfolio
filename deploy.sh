#!/bin/bash
# ========================================================
# Script Auto Deploy & Zero-Downtime Reload via PM2
# ========================================================
set -e

echo "🚀 [1/4] Pulling latest changes from main branch..."
git pull origin main

echo "📦 [2/4] Installing dependencies..."
npm install --prefer-offline --no-audit

echo "🏗️ [3/4] Building Next.js application..."
npm run build

echo "♻️ [4/4] Reloading PM2 with zero-downtime..."
pm2 reload ecosystem.config.js --env production || pm2 start ecosystem.config.js --env production
pm2 save

echo "✅ Deployment completed successfully!"
