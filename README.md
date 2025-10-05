# 🚀 MADAS - Multi-Tenant SaaS Platform

A comprehensive business management SaaS platform built with Next.js, TypeScript, Firebase, and Tailwind CSS.

## 📁 Project Structure

```
sys/
├── marketing-website/     # Public marketing website
├── admin-dashboard/       # Admin panel for platform management
├── client-app/           # Client business management application
├── shared/               # Shared components, types, and utilities
├── README.md            # This file
├── IMPLEMENTATION_ROADMAP.md
└── migrate-to-saas-structure.sh
```

## 🏗️ Architecture

### **Marketing Website** (`marketing-website/`)
- **Purpose**: Public-facing website for lead generation
- **Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Features**: Landing page, pricing, testimonials, contact forms
- **Port**: 3000

### **Admin Dashboard** (`admin-dashboard/`)
- **Purpose**: Platform administration and management
- **Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, Recharts
- **Features**: User management, analytics, subscription management, support
- **Port**: 3001

### **Client App** (`client-app/`)
- **Purpose**: Business management application for clients
- **Tech Stack**: Next.js 14, TypeScript, Firebase, Tailwind CSS
- **Features**: Product management, inventory, sales, reporting
- **Port**: 3002

### **Shared Library** (`shared/`)
- **Purpose**: Common components, types, and utilities
- **Tech Stack**: TypeScript, React components, utility functions
- **Features**: Reusable UI components, type definitions, helpers

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase project
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/madas-saas-platform.git
   cd madas-saas-platform
   ```

2. **Install dependencies for all projects**
   ```bash
   # Marketing Website
   cd marketing-website && npm install && cd ..
   
   # Admin Dashboard
   cd admin-dashboard && npm install && cd ..
   
   # Client App
   cd client-app && npm install && cd ..
   
   # Shared Library
   cd shared && npm install && cd ..
   ```

3. **Set up environment variables**
   ```bash
   # Copy environment templates
   cp marketing-website/env.example marketing-website/.env.local
   cp admin-dashboard/env.example admin-dashboard/.env.local
   cp client-app/env.example client-app/.env.local
   ```

4. **Start development servers**
   ```bash
   # Terminal 1 - Marketing Website
   cd marketing-website && npm run dev
   
   # Terminal 2 - Admin Dashboard
   cd admin-dashboard && npm run dev
   
   # Terminal 3 - Client App
   cd client-app && npm run dev
   ```

## 🔧 Development

### Available Scripts

Each project has its own set of scripts:

#### Marketing Website
```bash
cd marketing-website
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

#### Admin Dashboard
```bash
cd admin-dashboard
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run deploy       # Deploy to Vercel
```

#### Client App
```bash
cd client-app
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run deploy:firebase # Deploy with Firebase config
```

### Development Workflow

1. **Start with Marketing Website** - Design and content
2. **Build Admin Dashboard** - Platform management
3. **Develop Client App** - Core business features
4. **Use Shared Library** - Common components and utilities

## 🚀 Deployment

### Marketing Website
- **Platform**: Vercel
- **Command**: `cd marketing-website && npm run deploy`
- **URL**: https://madas.com

### Admin Dashboard
- **Platform**: Vercel
- **Command**: `cd admin-dashboard && npm run deploy`
- **URL**: https://admin.madas.com

### Client App
- **Platform**: Vercel
- **Backend**: Firebase
- **Command**: `cd client-app && npm run deploy:firebase`
- **URL**: https://app.madas.com

## 🔥 Firebase Setup

### Required Services
- **Authentication**: Email/Password, Google OAuth
- **Firestore**: Database for all application data
- **Storage**: File uploads and product images
- **Analytics**: User behavior tracking

### Security Rules
Each application has specific Firestore and Storage security rules configured for multi-tenant architecture.

## 📊 Features

### Marketing Website
- ✅ Responsive landing page
- ✅ Pricing plans and features
- ✅ Contact forms and lead capture
- ✅ SEO optimized
- ✅ Fast loading and performance

### Admin Dashboard
- ✅ User and business management
- ✅ Subscription and billing overview
- ✅ Analytics and reporting
- ✅ Support ticket management
- ✅ Platform settings and configuration

### Client App
- ✅ Business onboarding wizard
- ✅ Product catalog management
- ✅ Inventory tracking
- ✅ Order management
- ✅ Customer management
- ✅ Sales reporting
- ✅ Staff management
- ✅ Multi-location support

### Shared Library
- ✅ Reusable UI components
- ✅ TypeScript type definitions
- ✅ Utility functions
- ✅ Firebase configuration
- ✅ Form validation helpers

## 🧪 Testing

### Demo Credentials

#### Admin Dashboard
- **Email**: `admin@madas.com`
- **Password**: `admin123`

#### Client App
- **Email**: `demo@madas.com`
- **Password**: `demo123`

### Sample Data
The Client App includes a sample data seeder with 10+ realistic products across multiple categories.

## 📚 Documentation

- **[Marketing Website README](marketing-website/README.md)**
- **[Admin Dashboard README](admin-dashboard/README.md)**
- **[Client App README](client-app/README.md)**
- **[Shared Library README](shared/README.md)**
- **[Implementation Roadmap](IMPLEMENTATION_ROADMAP.md)**

## 🔒 Security

- **Authentication**: Firebase Auth with role-based access
- **Database**: Firestore with security rules
- **Storage**: Firebase Storage with access controls
- **HTTPS**: Enforced on all deployments
- **Environment Variables**: Secure configuration management

## 🌍 Multi-Tenant Architecture

- **Business Isolation**: Each business has isolated data
- **Staff Management**: Role-based permissions
- **Scalable**: Designed to handle thousands of businesses
- **Secure**: Proper data segregation and access controls

## 🚀 Performance

- **Next.js 14**: Latest framework with optimizations
- **Server Components**: Improved performance and SEO
- **Image Optimization**: Automatic image optimization
- **CDN**: Global content delivery
- **Caching**: Efficient caching strategies

## 📈 Monitoring

- **Firebase Analytics**: User behavior tracking
- **Vercel Analytics**: Performance monitoring
- **Error Tracking**: Comprehensive error monitoring
- **Uptime Monitoring**: Service availability tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

See individual project READMEs for specific contribution guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check individual project READMEs
- **Issues**: Create GitHub issues for bugs or feature requests
- **Email**: support@madas.com

## 🎯 Roadmap

See [IMPLEMENTATION_ROADMAP.md](IMPLEMENTATION_ROADMAP.md) for detailed development roadmap and upcoming features.

## 🌟 Key Features

### ✅ Completed
- Marketing website with responsive design
- Admin dashboard with comprehensive management tools
- Client app with product management system
- Shared component library
- Firebase integration
- Deployment configurations
- Sample data and testing tools

### 🚧 In Progress
- Point of Sale (POS) system
- Advanced analytics and reporting
- Mobile app development
- API integrations

### 📋 Planned
- Multi-language support
- Advanced automation features
- Third-party integrations
- Enterprise features

---

**MADAS - Empowering businesses with powerful, scalable management tools** 🚀