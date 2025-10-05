#!/bin/bash

# MADAS Client App Setup Script
# This script sets up the development environment for the MADAS Client App

set -e

echo "🚀 Setting up MADAS Client App..."

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

# Check if Node.js is installed
check_node() {
    print_status "Checking Node.js installation..."
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
}

# Check if npm is installed
check_npm() {
    print_status "Checking npm installation..."
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm"
        exit 1
    fi
    
    print_success "npm $(npm --version) is installed"
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    npm install
    print_success "Dependencies installed successfully"
}

# Setup environment file
setup_env() {
    print_status "Setting up environment file..."
    
    if [ ! -f .env.local ]; then
        cp env.example .env.local
        print_success "Environment file created from template"
        print_warning "Please edit .env.local and add your Firebase configuration"
    else
        print_warning ".env.local already exists, skipping creation"
    fi
}

# Setup Git hooks
setup_git_hooks() {
    print_status "Setting up Git hooks..."
    
    # Create pre-commit hook
    cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
echo "Running pre-commit checks..."

# Run type check
npm run type-check
if [ $? -ne 0 ]; then
    echo "Type check failed. Please fix TypeScript errors."
    exit 1
fi

# Run linter
npm run lint
if [ $? -ne 0 ]; then
    echo "Linting failed. Please fix linting errors."
    exit 1
fi

echo "Pre-commit checks passed!"
EOF

    chmod +x .git/hooks/pre-commit
    print_success "Git hooks configured"
}

# Run initial build
build_project() {
    print_status "Building project..."
    npm run build
    print_success "Project built successfully"
}

# Display next steps
show_next_steps() {
    echo ""
    echo "🎉 Setup completed successfully!"
    echo ""
    echo "Next steps:"
    echo "1. Edit .env.local with your Firebase configuration"
    echo "2. Start the development server: npm run dev"
    echo "3. Open http://localhost:3002 in your browser"
    echo ""
    echo "Available commands:"
    echo "  npm run dev          - Start development server"
    echo "  npm run build        - Build for production"
    echo "  npm run start        - Start production server"
    echo "  npm run lint         - Run ESLint"
    echo "  npm run type-check   - Run TypeScript type checking"
    echo "  npm test             - Run tests"
    echo ""
    echo "For more information, see README.md"
}

# Main execution
main() {
    echo "MADAS Client App Setup"
    echo "======================"
    echo ""
    
    check_node
    check_npm
    install_dependencies
    setup_env
    setup_git_hooks
    build_project
    show_next_steps
}

# Run main function
main "$@"
