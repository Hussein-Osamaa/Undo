#!/bin/bash

# MADAS Client App Deployment Script with Your Firebase Configuration
# Firebase Project: undo-12

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

echo "🚀 MADAS Client App Deployment"
echo "Firebase Project: undo-12"
echo "=============================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Please run this script from the client-app directory"
    echo "   cd sys/client-app && ./deploy-with-your-firebase.sh"
    exit 1
fi

# Install dependencies
print_status "Installing dependencies..."
npm install

# Run type checking
print_status "Running TypeScript type check..."
npm run type-check

# Run linting
print_status "Running ESLint..."
npm run lint

# Test build
print_status "Testing production build..."
npm run build

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    print_warning "Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Deploy to Vercel
print_status "Deploying to Vercel..."
vercel --prod

print_success "Deployment completed!"

echo ""
echo "🎉 Your MADAS Client App is now live!"
echo ""
echo "Next steps:"
echo "1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables"
echo "2. Add these Firebase environment variables:"
echo ""
echo "   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCgzJ9oNFsPsXx7-FAhzUkxcHMVJIBZbtQ"
echo "   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=undo-12.firebaseapp.com"
echo "   NEXT_PUBLIC_FIREBASE_PROJECT_ID=undo-12"
echo "   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=undo-12.firebasestorage.app"
echo "   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=737737728235"
echo "   NEXT_PUBLIC_FIREBASE_APP_ID=1:737737728235:web:35c21e15097bc0bfe2deae"
echo "   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-MCMB03LKW2"
echo ""
echo "3. Redeploy after adding environment variables"
echo "4. Test your app with demo credentials: demo@madas.com / demo123"
echo ""
echo "See DEPLOY_WITH_FIREBASE.md for complete instructions"
