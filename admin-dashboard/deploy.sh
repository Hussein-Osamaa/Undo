#!/bin/bash

# MADAS Admin Dashboard - Deployment Script
# This script helps deploy the admin dashboard to production

set -e  # Exit on any error

echo "🚀 MADAS Admin Dashboard - Deployment Script"
echo "=============================================="

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
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the admin-dashboard directory."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

print_success "Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_success "npm version: $(npm -v)"

# Install dependencies
print_status "Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    print_error "Failed to install dependencies"
    exit 1
fi

print_success "Dependencies installed successfully"

# Type check
print_status "Running TypeScript type check..."
npm run type-check

if [ $? -ne 0 ]; then
    print_error "TypeScript type check failed"
    exit 1
fi

print_success "TypeScript type check passed"

# Lint check
print_status "Running ESLint..."
npm run lint

if [ $? -ne 0 ]; then
    print_warning "ESLint found some issues, but continuing with deployment"
else
    print_success "ESLint check passed"
fi

# Build the application
print_status "Building the application..."
npm run build

if [ $? -ne 0 ]; then
    print_error "Build failed"
    exit 1
fi

print_success "Build completed successfully"

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    print_warning ".env.local not found. Creating from example..."
    if [ -f "env.example" ]; then
        cp env.example .env.local
        print_warning "Please update .env.local with your actual values before deploying"
    else
        print_error "env.example not found. Please create .env.local manually"
        exit 1
    fi
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    print_status "Vercel CLI not found. Installing..."
    npm install -g vercel
fi

print_success "Vercel CLI version: $(vercel --version)"

# Deployment options
echo ""
echo "Select deployment method:"
echo "1) Deploy to Vercel (Production)"
echo "2) Deploy to Vercel (Preview)"
echo "3) Build for local testing"
echo "4) Exit"
echo ""

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        print_status "Deploying to Vercel (Production)..."
        vercel --prod
        ;;
    2)
        print_status "Deploying to Vercel (Preview)..."
        vercel
        ;;
    3)
        print_status "Starting local production build..."
        npm run start
        ;;
    4)
        print_status "Exiting..."
        exit 0
        ;;
    *)
        print_error "Invalid choice. Exiting..."
        exit 1
        ;;
esac

if [ $? -eq 0 ]; then
    print_success "Deployment completed successfully! 🎉"
    echo ""
    echo "Next steps:"
    echo "1. Set up your environment variables in the deployment platform"
    echo "2. Configure your domain (if using custom domain)"
    echo "3. Set up monitoring and error tracking"
    echo "4. Test all functionality in production"
    echo ""
    echo "For more information, see DEPLOYMENT.md"
else
    print_error "Deployment failed"
    exit 1
fi
