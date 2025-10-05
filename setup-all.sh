#!/bin/bash

# MADAS SaaS Platform - Complete Setup Script
# This script sets up all components of the MADAS platform

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored output
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

print_step() {
    echo -e "${CYAN}[STEP]${NC} $1"
}

echo "🚀 MADAS SaaS Platform - Complete Setup"
echo "======================================="
echo ""

# Check if we're in the right directory
if [ ! -d "marketing-website" ] || [ ! -d "admin-dashboard" ] || [ ! -d "client-app" ] || [ ! -d "shared" ]; then
    print_error "Please run this script from the sys directory"
    echo "   cd sys && ./setup-all.sh"
    exit 1
fi

# Check Node.js version
print_step "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required. Current version: $(node --version)"
    exit 1
fi

print_success "Node.js $(node --version) is installed"

# Check npm
print_step "Checking npm installation..."
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm"
    exit 1
fi

print_success "npm $(npm --version) is installed"

# Setup Shared Library
print_header "Setting up Shared Library..."
cd shared
print_status "Installing shared library dependencies..."
npm install
print_success "Shared library setup complete"
cd ..

# Setup Marketing Website
print_header "Setting up Marketing Website..."
cd marketing-website
print_status "Installing marketing website dependencies..."
npm install
print_status "Setting up environment file..."
if [ ! -f ".env.local" ]; then
    cp env.example .env.local
    print_success "Environment file created"
else
    print_warning ".env.local already exists, skipping creation"
fi
print_success "Marketing website setup complete"
cd ..

# Setup Admin Dashboard
print_header "Setting up Admin Dashboard..."
cd admin-dashboard
print_status "Installing admin dashboard dependencies..."
npm install
print_status "Setting up environment file..."
if [ ! -f ".env.local" ]; then
    cp env.example .env.local
    print_success "Environment file created"
else
    print_warning ".env.local already exists, skipping creation"
fi
print_success "Admin dashboard setup complete"
cd ..

# Setup Client App
print_header "Setting up Client App..."
cd client-app
print_status "Installing client app dependencies..."
npm install
print_status "Setting up environment file..."
if [ ! -f ".env.local" ]; then
    cp env.example .env.local
    print_success "Environment file created"
else
    print_warning ".env.local already exists, skipping creation"
fi
print_success "Client app setup complete"
cd ..

# Run type checks
print_header "Running type checks..."
print_step "Checking shared library..."
cd shared && npm run type-check && cd ..
print_step "Checking marketing website..."
cd marketing-website && npm run type-check && cd ..
print_step "Checking admin dashboard..."
cd admin-dashboard && npm run type-check && cd ..
print_step "Checking client app..."
cd client-app && npm run type-check && cd ..
print_success "All type checks passed"

# Run linting
print_header "Running linting..."
print_step "Linting marketing website..."
cd marketing-website && npm run lint && cd ..
print_step "Linting admin dashboard..."
cd admin-dashboard && npm run lint && cd ..
print_step "Linting client app..."
cd client-app && npm run lint && cd ..
print_success "All linting passed"

# Test builds
print_header "Testing builds..."
print_step "Building marketing website..."
cd marketing-website && npm run build && cd ..
print_step "Building admin dashboard..."
cd admin-dashboard && npm run build && cd ..
print_step "Building client app..."
cd client-app && npm run build && cd ..
print_success "All builds successful"

# Initialize Git repository
print_header "Setting up Git repository..."
if [ ! -d ".git" ]; then
    print_status "Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: MADAS SaaS Platform

- Marketing website with responsive design
- Admin dashboard with comprehensive management tools  
- Client app with product management system
- Shared component library
- Firebase integration
- Deployment configurations
- Sample data and testing tools"
    print_success "Git repository initialized"
else
    print_warning "Git repository already exists"
fi

# Display next steps
echo ""
echo "🎉 MADAS SaaS Platform setup completed successfully!"
echo ""
echo "📁 Project Structure:"
echo "├── marketing-website/     # Public marketing website (Port: 3000)"
echo "├── admin-dashboard/       # Admin panel (Port: 3001)"
echo "├── client-app/           # Client application (Port: 3002)"
echo "└── shared/               # Shared components and utilities"
echo ""
echo "🚀 Next Steps:"
echo ""
echo "1. Configure Environment Variables:"
echo "   - Edit .env.local files in each project"
echo "   - Set up Firebase project for client-app"
echo "   - Configure deployment settings"
echo ""
echo "2. Start Development Servers:"
echo "   # Marketing Website (Terminal 1)"
echo "   cd marketing-website && npm run dev"
echo ""
echo "   # Admin Dashboard (Terminal 2)"
echo "   cd admin-dashboard && npm run dev"
echo ""
echo "   # Client App (Terminal 3)"
echo "   cd client-app && npm run dev"
echo ""
echo "3. Access Applications:"
echo "   - Marketing Website: http://localhost:3000"
echo "   - Admin Dashboard: http://localhost:3001"
echo "   - Client App: http://localhost:3002"
echo ""
echo "4. Deploy to Production:"
echo "   - Marketing Website: cd marketing-website && npm run deploy"
echo "   - Admin Dashboard: cd admin-dashboard && npm run deploy"
echo "   - Client App: cd client-app && npm run deploy:firebase"
echo ""
echo "5. Push to GitHub:"
echo "   git remote add origin https://github.com/your-username/madas-saas-platform.git"
echo "   git push -u origin main"
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
echo "Your MADAS SaaS Platform is ready for development! 🚀"
