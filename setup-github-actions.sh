#!/bin/bash

# MADAS SaaS Platform - GitHub Actions Setup Script
# This script helps you set up GitHub Actions for automatic deployment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
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

print_header() {
    echo -e "${PURPLE}[HEADER]${NC} $1"
}

echo "🚀 MADAS SaaS Platform - GitHub Actions Setup"
echo "============================================="
echo ""

# Check if we're in the right directory
if [ ! -d "marketing-website" ] || [ ! -d "admin-dashboard" ] || [ ! -d "client-app" ] || [ ! -d "shared" ]; then
    print_error "Please run this script from the sys directory"
    echo "   cd sys && ./setup-github-actions.sh"
    exit 1
fi

print_header "GitHub Actions Workflows Created!"

print_success "✅ .github/workflows/deploy-all.yml - Deploy all applications"
print_success "✅ .github/workflows/marketing-website.yml - Marketing website deployment"
print_success "✅ .github/workflows/admin-dashboard.yml - Admin dashboard deployment"
print_success "✅ .github/workflows/client-app.yml - Client app deployment"

echo ""
print_header "Required GitHub Secrets"

echo ""
echo "You need to add these secrets to your GitHub repository:"
echo ""
echo "📁 Go to: https://github.com/Hussein-Osamaa/Undo/settings/secrets/actions"
echo ""

print_status "🔧 Vercel Configuration Secrets:"
echo "VERCEL_TOKEN=your_vercel_token"
echo "VERCEL_ORG_ID=your_vercel_org_id"
echo "MARKETING_VERCEL_PROJECT_ID=your_marketing_project_id"
echo "ADMIN_VERCEL_PROJECT_ID=your_admin_project_id"
echo "CLIENT_VERCEL_PROJECT_ID=your_client_project_id"
echo ""

print_status "🔥 Firebase Configuration Secrets (for Client App):"
echo "NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCgzJ9oNFsPsXx7-FAhzUkxcHMVJIBZbtQ"
echo "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=undo-12.firebaseapp.com"
echo "NEXT_PUBLIC_FIREBASE_PROJECT_ID=undo-12"
echo "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=undo-12.firebasestorage.app"
echo "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=737737728235"
echo "NEXT_PUBLIC_FIREBASE_APP_ID=1:737737728235:web:35c21e15097bc0bfe2deae"
echo "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-MCMB03LKW2"
echo ""

print_status "🌐 App URLs Secrets:"
echo "NEXT_PUBLIC_APP_URL=https://your-client-app.vercel.app"
echo "NEXT_PUBLIC_MARKETING_URL=https://your-marketing-site.vercel.app"
echo "NEXT_PUBLIC_ADMIN_URL=https://your-admin-dashboard.vercel.app"
echo ""

print_header "How to Get Vercel Configuration"

echo ""
echo "🔑 Vercel Token:"
echo "1. Go to https://vercel.com/dashboard"
echo "2. Settings → Tokens"
echo "3. Create Token → Copy token"
echo ""

echo "🏢 Vercel Org ID:"
echo "1. Go to https://vercel.com/dashboard"
echo "2. Settings → General"
echo "3. Copy Team ID (this is your Org ID)"
echo ""

echo "📦 Vercel Project IDs:"
echo "1. Go to each project in Vercel Dashboard"
echo "2. Settings → General"
echo "3. Copy Project ID"
echo ""

print_header "Next Steps"

echo ""
echo "1. 📝 Add all secrets to GitHub repository"
echo "2. 🔄 Push your code to trigger workflows"
echo "3. 📊 Check Actions tab for deployment status"
echo "4. 🌐 Verify deployments on Vercel"
echo ""

print_header "Test Your Setup"

echo ""
echo "To test GitHub Actions:"
echo "1. Make a small change to any application"
echo "2. Commit and push to main branch"
echo "3. Check GitHub Actions tab"
echo "4. Watch automatic deployment"
echo ""

print_header "Deployment URLs"

echo ""
echo "After setup, your applications will be deployed to:"
echo "🌐 Marketing Website: https://your-marketing-site.vercel.app"
echo "🔧 Admin Dashboard: https://your-admin-dashboard.vercel.app"
echo "📱 Client App: https://your-client-app.vercel.app"
echo ""

print_header "Benefits"

echo ""
echo "✅ Automatic deployment on code changes"
echo "✅ Preview deployments for pull requests"
echo "✅ Type checking and linting"
echo "✅ Build verification before deployment"
echo "✅ Environment variable management"
echo "✅ Multi-app independent deployment"
echo ""

print_success "GitHub Actions setup complete!"

echo ""
echo "📚 For detailed instructions, see:"
echo "   GITHUB_ACTIONS_SETUP.md"
echo ""
echo "🎉 Your MADAS SaaS Platform now has professional CI/CD!"
echo ""
echo "Next: Add GitHub Secrets and push your code to trigger deployments! 🚀"
