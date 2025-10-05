#!/bin/bash

# MADAS Client App Deployment Script
# This script deploys the MADAS Client App to Vercel

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

# Check if we're in the right directory
check_directory() {
    if [ ! -f "package.json" ] || [ ! -f "next.config.js" ]; then
        print_error "Please run this script from the client-app directory"
        exit 1
    fi
    print_success "Running from correct directory"
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    npm install
    print_success "Dependencies installed"
}

# Run type checking
type_check() {
    print_status "Running TypeScript type check..."
    npm run type-check
    print_success "Type check passed"
}

# Run linting
lint_check() {
    print_status "Running ESLint..."
    npm run lint
    print_success "Linting passed"
}

# Test build
test_build() {
    print_status "Testing production build..."
    npm run build
    print_success "Build test passed"
}

# Check if Vercel CLI is installed
check_vercel_cli() {
    print_status "Checking Vercel CLI..."
    if ! command -v vercel &> /dev/null; then
        print_warning "Vercel CLI not found. Installing..."
        npm install -g vercel
        print_success "Vercel CLI installed"
    else
        print_success "Vercel CLI is installed"
    fi
}

# Login to Vercel
login_vercel() {
    print_status "Logging into Vercel..."
    if ! vercel whoami &> /dev/null; then
        print_warning "Not logged into Vercel. Please login:"
        vercel login
    else
        print_success "Already logged into Vercel"
    fi
}

# Deploy to Vercel
deploy_vercel() {
    print_status "Deploying to Vercel..."
    
    # Check if project is already linked
    if [ -f ".vercel/project.json" ]; then
        print_status "Project already linked. Deploying..."
        vercel --prod
    else
        print_status "First time deployment. Setting up project..."
        vercel --prod
    fi
    
    print_success "Deployment completed!"
}

# Display deployment info
show_deployment_info() {
    echo ""
    echo "🎉 Deployment completed successfully!"
    echo ""
    echo "Your MADAS Client App is now live at:"
    echo "https://your-project-name.vercel.app"
    echo ""
    echo "Next steps:"
    echo "1. Configure environment variables in Vercel dashboard"
    echo "2. Set up Firebase for production"
    echo "3. Test your deployed application"
    echo "4. Set up custom domain (optional)"
    echo ""
    echo "Environment variables to configure:"
    echo "- NEXT_PUBLIC_FIREBASE_API_KEY"
    echo "- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"
    echo "- NEXT_PUBLIC_FIREBASE_PROJECT_ID"
    echo "- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"
    echo "- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"
    echo "- NEXT_PUBLIC_FIREBASE_APP_ID"
    echo "- NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID"
    echo ""
}

# Main execution
main() {
    echo "MADAS Client App Deployment"
    echo "=========================="
    echo ""
    
    check_directory
    install_dependencies
    type_check
    lint_check
    test_build
    check_vercel_cli
    login_vercel
    deploy_vercel
    show_deployment_info
}

# Run main function
main "$@"
