#!/bin/bash

# MADAS SaaS Platform - Deploy All Applications to Vercel
# This script helps you deploy each application as a separate Vercel project

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

echo "🚀 MADAS SaaS Platform - Deploy All to Vercel"
echo "============================================="
echo ""

print_header "Deployment Strategy"

echo ""
echo "Each application needs to be deployed as a separate Vercel project:"
echo ""
echo "1. 🌐 Marketing Website (./marketing-website/)"
echo "2. 🔧 Admin Dashboard (./admin-dashboard/)"
echo "3. 📱 Client App (./client-app/)"
echo "4. 🎯 Launch Center (./)"
echo ""

print_header "Deployment Methods"

echo ""
echo "Choose your preferred deployment method:"
echo ""
echo "1. 🌐 Vercel Web Interface (Recommended for beginners)"
echo "2. 🔧 Vercel CLI (For advanced users)"
echo "3. 📋 Get step-by-step instructions"
echo ""

read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        print_header "Deploy via Vercel Web Interface"
        echo ""
        echo "📝 Step-by-step instructions:"
        echo ""
        echo "For EACH application, follow these steps:"
        echo ""
        echo "1. 🌐 Go to: https://vercel.com/dashboard"
        echo "2. ➕ Click 'New Project'"
        echo "3. 🔗 Import from GitHub: Hussein-Osamaa/Undo"
        echo "4. ⚙️ Configure each project:"
        echo ""
        echo "   📱 Marketing Website:"
        echo "   - Framework: Next.js"
        echo "   - Root Directory: ./marketing-website"
        echo "   - Build Command: npm run build"
        echo "   - Output Directory: .next"
        echo ""
        echo "   🔧 Admin Dashboard:"
        echo "   - Framework: Next.js"
        echo "   - Root Directory: ./admin-dashboard"
        echo "   - Build Command: npm run build"
        echo "   - Output Directory: .next"
        echo ""
        echo "   📱 Client App:"
        echo "   - Framework: Next.js"
        echo "   - Root Directory: ./client-app"
        echo "   - Build Command: npm run build"
        echo "   - Output Directory: .next"
        echo "   - Environment Variables:"
        echo "     NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCgzJ9oNFsPsXx7-FAhzUkxcHMVJIBZbtQ"
        echo "     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=undo-12.firebaseapp.com"
        echo "     NEXT_PUBLIC_FIREBASE_PROJECT_ID=undo-12"
        echo "     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=undo-12.firebasestorage.app"
        echo "     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=737737728235"
        echo "     NEXT_PUBLIC_FIREBASE_APP_ID=1:737737728235:web:35c21e15097bc0bfe2deae"
        echo "     NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-MCMB03LKW2"
        echo ""
        echo "   🎯 Launch Center:"
        echo "   - Framework: Other"
        echo "   - Root Directory: ./"
        echo "   - Build Command: echo 'Static site'"
        echo "   - Output Directory: ./"
        echo ""
        echo "5. 🚀 Deploy each project"
        echo ""
        ;;
    2)
        print_header "Deploy via Vercel CLI"
        echo ""
        echo "📝 CLI Commands:"
        echo ""
        echo "1. 🔐 Login to Vercel:"
        echo "   npm install -g vercel"
        echo "   vercel login"
        echo ""
        echo "2. 🚀 Deploy each application:"
        echo ""
        echo "   # Marketing Website"
        echo "   cd marketing-website"
        echo "   vercel"
        echo ""
        echo "   # Admin Dashboard"
        echo "   cd ../admin-dashboard"
        echo "   vercel"
        echo ""
        echo "   # Client App"
        echo "   cd ../client-app"
        echo "   vercel"
        echo ""
        echo "   # Launch Center"
        echo "   cd .."
        echo "   vercel"
        echo ""
        print_warning "Note: You need to complete vercel login first!"
        ;;
    3)
        print_header "Detailed Instructions"
        echo ""
        echo "📚 For detailed step-by-step instructions, see:"
        echo "   VERCEL_DEPLOYMENT_GUIDE.md"
        echo ""
        echo "📋 Quick checklist:"
        echo "   ✅ Create 4 separate Vercel projects"
        echo "   ✅ Configure correct root directories"
        echo "   ✅ Add environment variables for Client App"
        echo "   ✅ Deploy each project individually"
        echo "   ✅ Update launch center with actual URLs"
        echo ""
        ;;
    *)
        print_error "Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
print_header "After Deployment"

echo ""
echo "🎯 Your applications will be available at:"
echo ""
echo "📱 Marketing Website: https://your-marketing-site.vercel.app"
echo "🔧 Admin Dashboard: https://your-admin-dashboard.vercel.app"
echo "📱 Client App: https://your-client-app.vercel.app"
echo "🎯 Launch Center: https://your-launch-center.vercel.app"
echo ""
echo "📊 Check Vercel Dashboard: https://vercel.com/dashboard"
echo ""

print_header "Important Notes"

echo ""
echo "⚠️  Remember:"
echo "   - Each app needs its own Vercel project"
echo "   - Set correct root directory for each project"
echo "   - Add Firebase environment variables for Client App"
echo "   - Update launch center links with actual URLs"
echo ""

print_success "Deployment guide complete!"

echo ""
echo "🎉 Your MADAS SaaS Platform will be live on Vercel!"
echo ""
echo "📚 For more help, see:"
echo "   - VERCEL_DEPLOYMENT_GUIDE.md"
echo "   - Individual app deployment guides"
echo ""
