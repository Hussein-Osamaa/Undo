#!/bin/bash

# MADAS SaaS Platform - Migration Script
# This script helps migrate your existing project to the new SaaS structure

set -e

echo "🚀 Starting MADAS SaaS Platform Migration..."
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
if [ ! -d "sys" ]; then
    print_error "Please run this script from the dashboard directory containing the 'sys' folder"
    exit 1
fi

print_status "Setting up the new SaaS structure..."

# Create the three main application directories
print_status "Creating application directories..."

# Marketing Website Setup
print_status "Setting up marketing-website..."
mkdir -p marketing-website/{src/{components/{ui,sections,marketing},pages,hooks,utils},public,styles}
mkdir -p marketing-website/src/components/ui
mkdir -p marketing-website/src/components/sections
mkdir -p marketing-website/src/components/marketing

# Admin Dashboard Setup
print_status "Setting up admin-dashboard..."
mkdir -p admin-dashboard/{src/{components/{ui,admin,layout},pages/{admin,auth},hooks,services,utils},public}
mkdir -p admin-dashboard/src/components/admin
mkdir -p admin-dashboard/src/components/layout
mkdir -p admin-dashboard/src/pages/admin
mkdir -p admin-dashboard/src/pages/auth

# Client App Setup
print_status "Setting up client-app..."
mkdir -p client-app/{src/{components/{ui,layout,auth,onboarding,dashboard,products,orders,pos,customers,staff,finance,reports,website-builder,settings},pages,hooks,services,utils,types,store},public}
mkdir -p client-app/src/components/{ui,layout,auth,onboarding,dashboard,products,orders,pos,customers,staff,finance,reports,website-builder,settings}
mkdir -p client-app/src/pages/{auth,onboarding,dashboard,products,orders,pos,customers,staff,finance,reports,settings,website-builder}
mkdir -p client-app/src/{hooks,services,utils,types,store}

# Shared Components Setup
print_status "Setting up shared components..."
mkdir -p shared/{types,utils,components/{ui,forms,layout},hooks,services,config,styles,assets/{images,icons,fonts},docs}
mkdir -p shared/components/{ui,forms,layout}
mkdir -p shared/assets/{images,icons,fonts}
mkdir -p shared/docs

print_success "Directory structure created successfully!"

# Create package.json files for each application
print_status "Creating package.json files..."

# Marketing Website package.json
cat > marketing-website/package.json << 'EOF'
{
  "name": "madas-marketing-website",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "export": "next export"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "tailwindcss": "^3.3.0",
    "framer-motion": "^10.16.0",
    "react-hook-form": "^7.47.0",
    "zod": "^3.22.0",
    "@hookform/resolvers": "^3.3.0",
    "firebase": "^10.6.0",
    "lucide-react": "^0.292.0",
    "@madas/shared": "file:../shared"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "typescript": "^5.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0"
  }
}
EOF

# Admin Dashboard package.json
cat > admin-dashboard/package.json << 'EOF'
{
  "name": "madas-admin-dashboard",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start -p 3001",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "tailwindcss": "^3.3.0",
    "recharts": "^2.8.0",
    "react-hook-form": "^7.47.0",
    "zod": "^3.22.0",
    "@hookform/resolvers": "^3.3.0",
    "firebase": "^10.6.0",
    "lucide-react": "^0.292.0",
    "date-fns": "^2.30.0",
    "@madas/shared": "file:../shared"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "typescript": "^5.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0"
  }
}
EOF

# Client App package.json
cat > client-app/package.json << 'EOF'
{
  "name": "madas-client-app",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite --port 3002",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext ts,tsx",
    "test": "vitest"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.18.0",
    "zustand": "^4.4.0",
    "react-hook-form": "^7.47.0",
    "zod": "^3.22.0",
    "@hookform/resolvers": "^3.3.0",
    "firebase": "^10.6.0",
    "recharts": "^2.8.0",
    "tailwindcss": "^3.3.0",
    "lucide-react": "^0.292.0",
    "date-fns": "^2.30.0",
    "workbox-window": "^7.0.0",
    "@madas/shared": "file:../shared"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.1.0",
    "typescript": "^5.0.0",
    "vite": "^4.5.0",
    "vite-plugin-pwa": "^0.16.0",
    "vitest": "^0.34.0",
    "eslint": "^8.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0"
  }
}
EOF

# Shared package.json
cat > shared/package.json << 'EOF'
{
  "name": "@madas/shared",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "lint": "eslint src --ext .ts,.tsx",
    "test": "jest"
  },
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "firebase": "^10.6.0",
    "date-fns": "^2.30.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "typescript": "^5.0.0"
  },
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  }
}
EOF

print_success "Package.json files created!"

# Create basic configuration files
print_status "Creating configuration files..."

# Create TypeScript config for shared
cat > shared/tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": false,
    "declaration": true,
    "outDir": "dist",
    "jsx": "react-jsx"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF

# Create Tailwind config for marketing website
cat > marketing-website/tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
    },
  },
  plugins: [],
}
EOF

# Create Next.js config for marketing website
cat > marketing-website/next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

module.exports = nextConfig
EOF

# Create Vite config for client app
cat > client-app/vite.config.ts << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'MADAS Business Management',
        short_name: 'MADAS',
        description: 'Complete business management solution',
        theme_color: '#3b82f6',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@shared': '/../shared/src'
    }
  }
})
EOF

print_success "Configuration files created!"

# Create basic environment files
print_status "Creating environment files..."

# Create .env.example for each app
cat > marketing-website/.env.example << 'EOF'
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# App URLs
NEXT_PUBLIC_APP_URL=https://app.yoursaas.com
NEXT_PUBLIC_ADMIN_URL=https://admin.yoursaas.com

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key

# Analytics
NEXT_PUBLIC_GA_TRACKING_ID=your_ga_id
EOF

cat > admin-dashboard/.env.example << 'EOF'
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Admin Configuration
ADMIN_SECRET_KEY=your_admin_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
EOF

cat > client-app/.env.example << 'EOF'
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key

# App URLs
VITE_MARKETING_URL=https://www.yoursaas.com
EOF

print_success "Environment files created!"

# Create basic index files for shared
print_status "Creating shared module index files..."

# Create shared types index
cat > shared/types/index.ts << 'EOF'
export * from './auth';
export * from './business';
export * from './user';
export * from './subscription';
export * from './common';
EOF

# Create shared utils index
cat > shared/utils/index.ts << 'EOF'
export * from './formatters';
export * from './validators';
export * from './constants';
export * from './helpers';
export * from './date';
export * from './currency';
EOF

# Create shared components index
cat > shared/components/index.ts << 'EOF'
export * from './ui';
export * from './forms';
export * from './layout';
EOF

# Create shared hooks index
cat > shared/hooks/index.ts << 'EOF'
export * from './useAuth';
export * from './useLocalStorage';
export * from './useDebounce';
export * from './useApi';
export * from './usePagination';
EOF

# Create main shared index
cat > shared/src/index.ts << 'EOF'
export * from '../types';
export * from '../utils';
export * from '../components';
export * from '../hooks';
export * from '../services';
export * from '../config';
EOF

print_success "Shared module files created!"

# Create migration guide
print_status "Creating migration guide..."

cat > MIGRATION_GUIDE.md << 'EOF'
# 🚀 MADAS SaaS Platform Migration Guide

## Overview

This guide will help you migrate your existing MADAS project to the new SaaS architecture with three separate applications.

## New Structure

```
sys/
├── marketing-website/    # yoursaas.com - Customer acquisition
├── admin-dashboard/      # admin.yoursaas.com - Platform management
├── client-app/          # app.yoursaas.com - Business management
└── shared/              # Shared code across all apps
```

## Migration Steps

### 1. Install Dependencies

```bash
# Install dependencies for each app
cd marketing-website && npm install
cd ../admin-dashboard && npm install
cd ../client-app && npm install
cd ../shared && npm install
```

### 2. Move Existing Files

#### Marketing Website
Move these files from your existing project:
- `simple-website/index.html` → `marketing-website/src/pages/Home.tsx`
- `simple-website/plans.html` → `marketing-website/src/pages/Pricing.tsx`
- `simple-website/contact.html` → `marketing-website/src/pages/Contact.tsx`
- `simple-website/styles.css` → `marketing-website/styles/globals.css`

#### Admin Dashboard
Move these files:
- `System/Sys-dashboard.html` → `admin-dashboard/src/pages/admin/Overview.tsx`
- `System/Dashboard/Admin.html` → `admin-dashboard/src/pages/admin/Staff.tsx`
- Related admin JavaScript files → `admin-dashboard/src/services/`

#### Client App
Move these files:
- `System/Dashboard/index.html` → `client-app/src/pages/dashboard/Overview.tsx`
- `System/Dashboard/Inventory/products.html` → `client-app/src/pages/products/List.tsx`
- All dashboard components → `client-app/src/components/`
- Dashboard JavaScript files → `client-app/src/services/`

#### Shared Components
Move common files:
- Firebase configuration → `shared/config/firebase.ts`
- Common utilities → `shared/utils/`
- Shared types → `shared/types/`
- Common components → `shared/components/`

### 3. Update Imports

Update all import statements to use the new structure:

```typescript
// Old
import { formatCurrency } from '../utils/formatters';

// New
import { formatCurrency } from '@madas/shared/utils';
```

### 4. Environment Setup

1. Copy your Firebase configuration to each app's `.env.local` file
2. Update Firebase project settings for multi-app setup
3. Configure Stripe keys for each environment

### 5. Build and Test

```bash
# Build shared components first
cd shared && npm run build

# Then build each app
cd ../marketing-website && npm run build
cd ../admin-dashboard && npm run build
cd ../client-app && npm run build
```

## Key Changes

### Multi-Tenancy
- All data queries now include `businessId` for isolation
- User roles and permissions are enforced
- Business switching functionality added

### Real-time Updates
- Firestore listeners for live data
- Offline support for POS
- Optimistic updates

### Modern Tech Stack
- React 18 with TypeScript
- Tailwind CSS + shadcn/ui
- Firebase v9+ with modular SDK
- Vite for client app, Next.js for others

## Next Steps

1. **Phase 1**: Set up basic structure and move core files
2. **Phase 2**: Implement multi-tenancy and authentication
3. **Phase 3**: Add real-time features and offline support
4. **Phase 4**: Polish UI/UX and add advanced features
5. **Phase 5**: Deploy to production

## Support

If you encounter issues during migration:
1. Check the individual README files in each directory
2. Review the shared components documentation
3. Test each application independently
4. Ensure all environment variables are set correctly

## Deployment

Each application deploys independently:
- Marketing Website → Vercel/Netlify
- Admin Dashboard → Vercel/Netlify (separate project)
- Client App → Firebase Hosting
- Shared → NPM package or monorepo

Good luck with your migration! 🚀
EOF

print_success "Migration guide created!"

# Create a development script
cat > start-dev.sh << 'EOF'
#!/bin/bash

# Start all development servers
echo "🚀 Starting MADAS SaaS Platform Development Servers..."

# Function to start a server in background
start_server() {
    local name=$1
    local dir=$2
    local port=$3
    local command=$4
    
    echo "Starting $name on port $port..."
    cd "$dir" && $command &
    echo $! > "../.pid-$name"
}

# Build shared components first
echo "Building shared components..."
cd shared && npm run build && cd ..

# Start marketing website (port 3000)
start_server "marketing" "marketing-website" "3000" "npm run dev"

# Start admin dashboard (port 3001)
start_server "admin" "admin-dashboard" "3001" "npm run dev"

# Start client app (port 3002)
start_server "client" "client-app" "3002" "npm run dev"

echo ""
echo "✅ All servers started!"
echo ""
echo "🌐 Marketing Website: http://localhost:3000"
echo "🔧 Admin Dashboard: http://localhost:3001"
echo "📱 Client App: http://localhost:3002"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for user to stop
trap 'echo "Stopping servers..."; kill $(cat .pid-*) 2>/dev/null; rm -f .pid-*; exit' INT
wait
EOF

chmod +x start-dev.sh

print_success "Development script created!"

# Create a cleanup script
cat > cleanup-old-files.sh << 'EOF'
#!/bin/bash

# Clean up old files after successful migration
echo "🧹 Cleaning up old files..."

# List of old directories to remove (be careful!)
OLD_DIRS=(
    "System"
    "simple-website"
    "public"
    "src"
)

echo "The following directories will be removed:"
for dir in "${OLD_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo "  - $dir"
    fi
done

read -p "Are you sure you want to remove these directories? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    for dir in "${OLD_DIRS[@]}"; do
        if [ -d "$dir" ]; then
            echo "Removing $dir..."
            rm -rf "$dir"
        fi
    done
    echo "✅ Cleanup complete!"
else
    echo "❌ Cleanup cancelled"
fi
EOF

chmod +x cleanup-old-files.sh

print_success "Cleanup script created!"

# Final summary
echo ""
echo "🎉 Migration Setup Complete!"
echo "=========================="
echo ""
echo "📁 New Structure Created:"
echo "  ├── marketing-website/    # Customer acquisition site"
echo "  ├── admin-dashboard/      # Platform management"
echo "  ├── client-app/          # Business management app"
echo "  └── shared/              # Shared components"
echo ""
echo "📋 Next Steps:"
echo "  1. Review the MIGRATION_GUIDE.md"
echo "  2. Install dependencies: cd shared && npm install && npm run build"
echo "  3. Install app dependencies: cd ../marketing-website && npm install"
echo "  4. Start development: ./start-dev.sh"
echo ""
echo "🔧 Useful Commands:"
echo "  ./start-dev.sh          # Start all development servers"
echo "  ./cleanup-old-files.sh  # Clean up old files after migration"
echo ""
echo "📚 Documentation:"
echo "  - sys/README.md              # Main project overview"
echo "  - sys/marketing-website/README.md"
echo "  - sys/admin-dashboard/README.md"
echo "  - sys/client-app/README.md"
echo "  - sys/shared/README.md"
echo "  - MIGRATION_GUIDE.md"
echo ""
print_success "Ready to start your SaaS journey! 🚀"
