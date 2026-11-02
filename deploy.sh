#!/bin/bash
# ========================================================
# Script Auto Deploy & Zero-Downtime Reload via PM2
# Frontend (Next.js) + Backend (Strapi CMS)
# ========================================================
set -e

echo "🚀 [1/5] Pulling latest changes from main branch..."
git pull origin main

echo "📦 [2/5] Installing Frontend dependencies..."
npm install --prefer-offline --no-audit

echo "📦 [3/5] Installing & Building Strapi CMS..."
cd cms
npm install --prefer-offline --no-audit
npm run build
cd ..

echo "🏗️ [4/5] Building Next.js application..."
npm run build

echo "♻️ [5/5] Reloading PM2 (Frontend + CMS) with zero-downtime..."
pm2 reload ecosystem.config.js --env production || pm2 start ecosystem.config.js --env production
pm2 save

echo "🎉 Deployment completed successfully!"
