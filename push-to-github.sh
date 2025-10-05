#!/bin/bash

# MADAS SaaS Platform - Push to GitHub Script
# This script pushes the complete MADAS platform to GitHub

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

echo "🐙 MADAS SaaS Platform - Push to GitHub"
echo "======================================="
echo ""

# Check if we're in the right directory
if [ ! -d "marketing-website" ] || [ ! -d "admin-dashboard" ] || [ ! -d "client-app" ] || [ ! -d "shared" ]; then
    print_error "Please run this script from the sys directory"
    echo "   cd sys && ./push-to-github.sh"
    exit 1
fi

# Check if git is installed
if ! command -v git &> /dev/null; then
    print_error "Git is not installed. Please install Git first."
    exit 1
fi

# Initialize Git repository if not exists
if [ ! -d ".git" ]; then
    print_status "Initializing Git repository..."
    git init
    print_success "Git repository initialized"
fi

# Add all files
print_status "Adding files to Git..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    print_warning "No changes to commit"
    echo "All files are already committed"
else
    # Commit changes
    print_status "Committing changes..."
    git commit -m "feat: Complete MADAS SaaS Platform

🏗️ Architecture:
- Marketing Website: Public-facing website for lead generation
- Admin Dashboard: Platform administration and management  
- Client App: Business management application for clients
- Shared Library: Common components, types, and utilities

✅ Features Completed:
- Marketing website with responsive design
- Admin dashboard with comprehensive management tools
- Client app with product management system
- Shared component library with reusable UI components
- Firebase integration with authentication and database
- Deployment configurations for all projects
- Sample data and testing tools
- Complete documentation and setup guides

🚀 Tech Stack:
- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Firebase for backend services
- Vercel for deployment
- Multi-tenant SaaS architecture

📦 Projects:
- marketing-website/ (Port: 3000)
- admin-dashboard/ (Port: 3001)  
- client-app/ (Port: 3002)
- shared/ (Library)

Ready for production deployment and development!"
    
    print_success "Changes committed successfully"
fi

# Check if remote exists
if git remote | grep -q "origin"; then
    print_status "Remote origin already exists"
else
    print_warning "No remote origin found"
    echo ""
    echo "To push to GitHub, you need to:"
    echo "1. Create a new repository on GitHub"
    echo "2. Add the remote origin:"
    echo "   git remote add origin https://github.com/your-username/madas-saas-platform.git"
    echo "3. Run this script again"
    echo ""
    echo "Or run:"
    echo "   git remote add origin https://github.com/your-username/madas-saas-platform.git"
    echo "   git push -u origin main"
    echo ""
    exit 0
fi

# Push to GitHub
print_status "Pushing to GitHub..."
git push origin main

print_success "Successfully pushed to GitHub!"

echo ""
echo "🎉 MADAS SaaS Platform is now on GitHub!"
echo ""
echo "📁 Repository Structure:"
echo "├── marketing-website/     # Public marketing website"
echo "├── admin-dashboard/       # Admin panel for platform management"
echo "├── client-app/           # Client business management application"
echo "├── shared/               # Shared components and utilities"
echo "├── README.md             # Complete project documentation"
echo "├── IMPLEMENTATION_ROADMAP.md"
echo "└── setup-all.sh          # Complete setup script"
echo ""
echo "🚀 Next Steps:"
echo ""
echo "1. Set up GitHub Actions for CI/CD:"
echo "   - Each project has deployment workflows"
echo "   - Automatic deployment on push to main"
echo ""
echo "2. Deploy to Production:"
echo "   - Marketing Website: cd marketing-website && npm run deploy"
echo "   - Admin Dashboard: cd admin-dashboard && npm run deploy"
echo "   - Client App: cd client-app && npm run deploy:firebase"
echo ""
echo "3. Set up Firebase:"
echo "   - Create Firebase project"
echo "   - Configure Authentication, Firestore, Storage"
echo "   - Add environment variables to Vercel"
echo ""
echo "4. Configure Domains:"
echo "   - Marketing Website: https://madas.com"
echo "   - Admin Dashboard: https://admin.madas.com"
echo "   - Client App: https://app.madas.com"
echo ""
echo "📚 Documentation:"
echo "   - README.md: Complete project overview"
echo "   - Individual project READMEs for specific setup"
echo "   - DEPLOYMENT.md files for deployment guides"
echo ""
echo "🎯 Demo Credentials:"
echo "   Admin Dashboard: admin@madas.com / admin123"
echo "   Client App: demo@madas.com / demo123"
echo ""
echo "Your MADAS SaaS Platform is now ready for collaboration and deployment! 🚀"
