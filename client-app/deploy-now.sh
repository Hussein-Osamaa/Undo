#!/bin/bash

# Quick deployment script for MADAS Client App
echo "🚀 Deploying MADAS Client App to Vercel..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the client-app directory"
    echo "   cd sys/client-app && ./deploy-now.sh"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run checks
echo "🔍 Running type check..."
npm run type-check

echo "🔍 Running linter..."
npm run lint

# Test build
echo "🏗️  Testing build..."
npm run build

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📥 Installing Vercel CLI..."
    npm install -g vercel
fi

# Deploy
echo "🚀 Deploying to Vercel..."
vercel --prod

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Configure Firebase in Vercel dashboard"
echo "2. Add environment variables"
echo "3. Test your deployed app"
echo ""
echo "See DEPLOY_NOW.md for detailed instructions"
