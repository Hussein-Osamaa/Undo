#!/bin/bash

# 🧪 MADAS Admin Dashboard - Build Test Script
# This script tests if your admin dashboard builds successfully

set -e

echo "🧪 MADAS Admin Dashboard - Build Test"
echo "===================================="

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the admin-dashboard directory."
    exit 1
fi

print_success "Found admin dashboard project"

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

print_success "Node.js version: $(node -v)"

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
    print_warning "ESLint found some issues, but continuing..."
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

print_success "Build completed successfully!"

# Check build output
if [ -d ".next" ]; then
    print_success "Build output found in .next directory"
else
    print_error "Build output not found"
    exit 1
fi

echo ""
print_success "🎉 All tests passed! Your admin dashboard is ready for deployment!"
echo ""
echo "Next steps:"
echo "1. Run: ./deploy-now.sh (to deploy to Vercel)"
echo "2. Or run: npm run start (to test locally)"
echo "3. Access at: http://localhost:3001"
echo ""
echo "Demo credentials:"
echo "- Email: admin@madas.com"
echo "- Password: admin123"
echo "- 2FA: 123456"
