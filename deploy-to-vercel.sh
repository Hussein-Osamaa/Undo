#!/bin/bash

# MADAS SaaS Platform - Deploy to Vercel
# This script helps you deploy your applications to Vercel

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

echo "🚀 MADAS SaaS Platform - Deploy to Vercel"
echo "========================================"
echo ""

print_header "Deployment Options"

echo ""
echo "Choose how you want to deploy:"
echo ""
echo "1. 🌐 Deploy via Vercel Web Interface (Easiest)"
echo "2. 🔧 Deploy via Vercel CLI (Advanced)"
echo "3. 📋 Get deployment URLs"
echo ""

read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        print_header "Deploy via Vercel Web Interface"
        echo ""
        echo "📝 Steps to deploy via web interface:"
        echo ""
        echo "1. 🌐 Go to: https://vercel.com/dashboard"
        echo "2. ➕ Click 'New Project'"
        echo "3. 🔗 Import from GitHub: Hussein-Osamaa/Undo"
        echo "4. 📁 Select one of these directories:"
        echo "   - client-app (for Client App)"
        echo "   - admin-dashboard (for Admin Dashboard)"
        echo "   - marketing-website (for Marketing Website)"
        echo "5. ⚙️ Configure settings:"
        echo "   - Framework Preset: Next.js"
        echo "   - Root Directory: ./[selected-directory]"
        echo "   - Build Command: npm run build"
        echo "   - Output Directory: .next"
        echo "6. 🔑 Add environment variables (Firebase config)"
        echo "7. 🚀 Deploy!"
        echo ""
        echo "📋 Environment Variables to add:"
        echo "NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCgzJ9oNFsPsXx7-FAhzUkxcHMVJIBZbtQ"
        echo "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=undo-12.firebaseapp.com"
        echo "NEXT_PUBLIC_FIREBASE_PROJECT_ID=undo-12"
        echo "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=undo-12.firebasestorage.app"
        echo "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=737737728235"
        echo "NEXT_PUBLIC_FIREBASE_APP_ID=1:737737728235:web:35c21e15097bc0bfe2deae"
        echo "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-MCMB03LKW2"
        ;;
    2)
        print_header "Deploy via Vercel CLI"
        echo ""
        echo "📝 Steps to deploy via CLI:"
        echo ""
        echo "1. 🔐 Login to Vercel:"
        echo "   vercel login"
        echo ""
        echo "2. 🚀 Deploy Client App:"
        echo "   cd client-app && vercel"
        echo ""
        echo "3. 🚀 Deploy Admin Dashboard:"
        echo "   cd admin-dashboard && vercel"
        echo ""
        echo "4. 🚀 Deploy Marketing Website:"
        echo "   cd marketing-website && vercel"
        echo ""
        echo "5. 🔑 Add environment variables in Vercel dashboard"
        echo ""
        print_warning "Note: You need to complete vercel login first!"
        ;;
    3)
        print_header "Deployment URLs"
        echo ""
        echo "🎯 Your applications will be available at:"
        echo ""
        echo "📱 Client App: https://your-client-app.vercel.app"
        echo "🔧 Admin Dashboard: https://your-admin-dashboard.vercel.app"
        echo "🌐 Marketing Website: https://your-marketing-website.vercel.app"
        echo ""
        echo "📊 Check Vercel Dashboard: https://vercel.com/dashboard"
        echo ""
        print_warning "URLs will be available after successful deployment"
        ;;
    *)
        print_error "Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
print_header "Next Steps After Deployment"

echo ""
echo "1. ✅ Test your deployed applications"
echo "2. 🔧 Configure environment variables"
echo "3. 🔗 Set up custom domains (optional)"
echo "4. 📊 Monitor performance"
echo "5. 🚀 Set up GitHub Actions for automatic deployment"
echo ""

print_success "Deployment guide complete!"

echo ""
echo "📚 For more help, see:"
echo "   - client-app/DEPLOYMENT.md"
echo "   - admin-dashboard/DEPLOYMENT.md"
echo "   - marketing-website/DEPLOYMENT.md"
echo ""
echo "🎉 Your MADAS SaaS Platform will be live on Vercel!"
