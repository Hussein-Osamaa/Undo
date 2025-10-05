#!/bin/bash

# 🚀 MADAS Admin Dashboard - Quick Deploy Script
# This script deploys your admin dashboard to Vercel in one command

set -e

echo "🚀 MADAS Admin Dashboard - Quick Deploy"
echo "======================================"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the admin-dashboard directory"
    echo "   cd sys/admin-dashboard && ./deploy-now.sh"
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    print_status "Installing Vercel CLI..."
    npm install -g vercel
fi

print_success "Vercel CLI ready: $(vercel --version)"

# Check if user is logged in
if ! vercel whoami &> /dev/null; then
    print_status "Please login to Vercel..."
    vercel login
fi

print_success "Logged in as: $(vercel whoami)"

# Install dependencies
print_status "Installing dependencies..."
npm install

# Build the application
print_status "Building application..."
npm run build

print_success "Build completed successfully!"

# Deploy to production
print_status "Deploying to production..."
vercel --prod

print_success "🎉 Deployment completed!"
echo ""
echo "Next steps:"
echo "1. Go to your Vercel dashboard: https://vercel.com/dashboard"
echo "2. Select your project"
echo "3. Go to Settings > Environment Variables"
echo "4. Add the variables from env.example"
echo "5. Redeploy your project"
echo ""
echo "Demo access:"
echo "- Email: admin@madas.com"
echo "- Password: admin123"
echo "- 2FA: 123456"
echo ""
echo "⚠️  IMPORTANT: Change these credentials immediately!"
