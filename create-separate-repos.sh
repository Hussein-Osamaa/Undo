#!/bin/bash

# MADAS SaaS Platform - Create Separate Repositories
# This script creates individual GitHub repositories for each application

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

echo "🚀 MADAS SaaS Platform - Create Separate Repositories"
echo "===================================================="
echo ""

print_header "Creating Individual Repositories"

echo ""
echo "This will create separate GitHub repositories for:"
echo "1. 🌐 Marketing Website"
echo "2. 🔧 Admin Dashboard" 
echo "3. 📱 Client App"
echo ""

read -p "Do you want to proceed? (y/n): " proceed

if [ "$proceed" != "y" ] && [ "$proceed" != "Y" ]; then
    echo "Operation cancelled."
    exit 0
fi

print_header "Step 1: Marketing Website Repository"

echo ""
echo "📝 Creating Marketing Website repository..."

# Create marketing-website repository
cd marketing-website

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    git init
    print_status "Initialized git repository"
fi

# Add all files
git add .
git commit -m "🎉 Initial commit: MADAS Marketing Website

✅ Complete Marketing Website Features:
- Beautiful landing page with modern design
- Hero section with compelling messaging
- Features showcase with icons and descriptions
- Pricing plans with clear value propositions
- Customer testimonials and social proof
- FAQ section for common questions
- Call-to-action sections for conversions
- Responsive design for all devices
- SEO optimized with meta tags
- Professional footer with links

🚀 Built with Next.js, Tailwind CSS, and modern web standards
📱 Fully responsive and mobile-optimized
🎨 Professional design with smooth animations
🔍 SEO optimized for better search rankings

Ready for production deployment!"

print_success "Marketing Website committed locally"

# Create GitHub repository (requires GitHub CLI or manual creation)
echo ""
echo "📋 Next steps for Marketing Website:"
echo "1. Go to: https://github.com/new"
echo "2. Repository name: madas-marketing-website"
echo "3. Description: MADAS Marketing Website - Professional landing page"
echo "4. Make it Public"
echo "5. Click 'Create repository'"
echo "6. Run these commands:"
echo "   git remote add origin https://github.com/Hussein-Osamaa/madas-marketing-website.git"
echo "   git push -u origin main"
echo ""

cd ..

print_header "Step 2: Admin Dashboard Repository"

echo ""
echo "📝 Creating Admin Dashboard repository..."

# Create admin-dashboard repository
cd admin-dashboard

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    git init
    print_status "Initialized git repository"
fi

# Add all files
git add .
git commit -m "🎉 Initial commit: MADAS Admin Dashboard

✅ Complete Admin Dashboard Features:
- Secure admin authentication with 2FA
- Comprehensive dashboard with key metrics
- Client management with detailed profiles
- Subscription tracking and billing
- Analytics and reporting with charts
- Support ticket management system
- Settings and configuration panel
- Role-based access control
- Real-time notifications
- Professional admin interface

🚀 Built with Next.js, TypeScript, and Tailwind CSS
🔒 Secure authentication and session management
📊 Advanced analytics with Recharts
🎨 Modern admin interface design
📱 Responsive design for all devices

Ready for production deployment!"

print_success "Admin Dashboard committed locally"

# Create GitHub repository
echo ""
echo "📋 Next steps for Admin Dashboard:"
echo "1. Go to: https://github.com/new"
echo "2. Repository name: madas-admin-dashboard"
echo "3. Description: MADAS Admin Dashboard - Complete admin panel"
echo "4. Make it Public"
echo "5. Click 'Create repository'"
echo "6. Run these commands:"
echo "   git remote add origin https://github.com/Hussein-Osamaa/madas-admin-dashboard.git"
echo "   git push -u origin main"
echo ""

cd ..

print_header "Step 3: Client App Repository"

echo ""
echo "📝 Creating Client App repository..."

# Create client-app repository
cd client-app

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    git init
    print_status "Initialized git repository"
fi

# Add all files
git add .
git commit -m "🎉 Initial commit: MADAS Client App

✅ Complete Client App Features:
- Firebase authentication with Google OAuth
- Multi-tenant business management system
- Product management with inventory tracking
- Order management and sales tracking
- Customer relationship management (CRM)
- Staff management and permissions
- Financial reports and analytics
- Point of Sale (POS) interface
- Bulk import/export functionality
- Real-time data synchronization

🚀 Built with Next.js, Firebase, and TypeScript
🔥 Firebase integration for real-time data
📱 Progressive Web App (PWA) capabilities
🎨 Modern business interface design
📊 Advanced reporting and analytics
🔐 Secure multi-tenant architecture

Ready for production deployment!"

print_success "Client App committed locally"

# Create GitHub repository
echo ""
echo "📋 Next steps for Client App:"
echo "1. Go to: https://github.com/new"
echo "2. Repository name: madas-client-app"
echo "3. Description: MADAS Client App - Business management system"
echo "4. Make it Public"
echo "5. Click 'Create repository'"
echo "6. Run these commands:"
echo "   git remote add origin https://github.com/Hussein-Osamaa/madas-client-app.git"
echo "   git push -u origin main"
echo ""

cd ..

print_header "Repository URLs"

echo ""
echo "🎯 Your new repositories will be:"
echo ""
echo "🌐 Marketing Website: https://github.com/Hussein-Osamaa/madas-marketing-website"
echo "🔧 Admin Dashboard: https://github.com/Hussein-Osamaa/madas-admin-dashboard"
echo "📱 Client App: https://github.com/Hussein-Osamaa/madas-client-app"
echo ""

print_header "Deployment Benefits"

echo ""
echo "✅ Benefits of separate repositories:"
echo "   - Independent version control"
echo "   - Separate deployment pipelines"
echo "   - Independent team access"
echo "   - Better organization"
echo "   - Individual CI/CD workflows"
echo "   - Easier maintenance"
echo ""

print_success "All repositories prepared locally!"

echo ""
echo "📋 Next steps:"
echo "1. Create the GitHub repositories (links above)"
echo "2. Add remote origins and push code"
echo "3. Deploy each application independently"
echo "4. Set up individual CI/CD workflows"
echo ""
echo "🎉 Your MADAS SaaS Platform will be perfectly organized!"
