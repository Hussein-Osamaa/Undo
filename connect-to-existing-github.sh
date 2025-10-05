#!/bin/bash

# MADAS SaaS Platform - Connect to Existing GitHub Repository
# Repository: https://github.com/Hussein-Osamaa/Undo.git

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

echo "🐙 MADAS SaaS Platform - Connect to Existing GitHub Repository"
echo "Repository: https://github.com/Hussein-Osamaa/Undo.git"
echo "=================================================================="
echo ""

# Check if we're in the right directory
if [ ! -d "marketing-website" ] || [ ! -d "admin-dashboard" ] || [ ! -d "client-app" ] || [ ! -d "shared" ]; then
    print_error "Please run this script from the sys directory"
    echo "   cd sys && ./connect-to-existing-github.sh"
    exit 1
fi

print_header "Step 1: Initialize Git Repository"

# Initialize Git repository
if [ ! -d ".git" ]; then
    print_status "Initializing Git repository..."
    git init
    print_success "Git repository initialized"
else
    print_warning "Git repository already exists"
fi

print_header "Step 2: Add Files to Git"

# Add all files
print_status "Adding files to Git..."
git add .

print_header "Step 3: Create Initial Commit"

# Commit changes
print_status "Creating initial commit..."
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

print_success "Initial commit created"

print_header "Step 4: Connect to Existing GitHub Repository"

# Add remote origin
print_status "Adding remote origin..."
git remote add origin https://github.com/Hussein-Osamaa/Undo.git

print_success "Remote origin added: https://github.com/Hussein-Osamaa/Undo.git"

print_header "Step 5: Push to GitHub"

print_status "Pushing to GitHub repository..."
git push -u origin main

print_success "Successfully pushed to GitHub!"

echo ""
echo "🎉 MADAS SaaS Platform is now connected to GitHub!"
echo ""
echo "📁 Repository: https://github.com/Hussein-Osamaa/Undo.git"
echo ""
echo "📊 What you've uploaded:"
echo "├── marketing-website/     # Public marketing website"
echo "├── admin-dashboard/       # Admin panel for platform management"
echo "├── client-app/           # Client business management application"
echo "├── shared/               # Shared components and utilities"
echo "├── README.md             # Complete project documentation"
echo "├── CONTRIBUTING.md       # Contribution guidelines"
echo "├── LICENSE               # MIT License"
echo "└── .gitignore            # Git ignore rules"
echo ""
echo "🚀 Next Steps:"
echo "1. Visit your repository: https://github.com/Hussein-Osamaa/Undo.git"
echo "2. Deploy to production using the deployment commands"
echo "3. Set up GitHub Actions for CI/CD"
echo "4. Share with your team"
echo ""
echo "🎯 Demo Credentials:"
echo "Admin Dashboard: admin@madas.com / admin123"
echo "Client App: demo@madas.com / demo123"
echo ""
echo "Your MADAS SaaS Platform is now live on GitHub! 🚀"
