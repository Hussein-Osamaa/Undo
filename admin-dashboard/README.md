# MADAS Admin Dashboard

A comprehensive admin dashboard for monitoring and managing the MADAS SaaS platform. Built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

### 🔐 Authentication & Security
- **Two-Factor Authentication (2FA)** - Enhanced security with TOTP
- **Session Management** - Secure session handling with expiration
- **Role-Based Access** - Super Admin, Admin, and Support roles
- **Login Attempt Limiting** - Protection against brute force attacks
- **IP Whitelisting** - Optional IP-based access control

### 📊 Dashboard Overview
- **Real-time Metrics** - Live updates of key business metrics
- **Revenue Tracking** - MRR, ARR, and growth analytics
- **Client Analytics** - Active users, trials, and churn rates
- **System Health** - Uptime monitoring and performance metrics
- **Interactive Charts** - Revenue trends, plan distribution, and growth

### 👥 Client Management
- **Client Database** - Comprehensive client information
- **Subscription Tracking** - Plan changes, billing cycles, and status
- **Usage Analytics** - Feature usage and engagement metrics
- **Communication Tools** - Email integration and support tickets
- **Bulk Actions** - Mass operations for client management

### 💳 Subscription Management
- **Payment Processing** - Failed payments and retry logic
- **Plan Management** - Upgrades, downgrades, and cancellations
- **Billing Analytics** - Revenue by plan, payment methods
- **Churn Analysis** - Cancellation patterns and retention
- **Invoice Management** - PDF generation and email delivery

### 📈 Analytics & Reporting
- **Revenue Analytics** - Detailed financial reporting
- **User Behavior** - Engagement and feature usage
- **Growth Metrics** - Cohort analysis and LTV calculations
- **Custom Reports** - Exportable data in multiple formats
- **Real-time Dashboards** - Live monitoring of key metrics

### 🎧 Support System
- **Ticket Management** - Priority-based support queue
- **Live Chat Integration** - Real-time customer support
- **Knowledge Base** - Self-service documentation
- **Response Tracking** - SLA monitoring and performance
- **Customer Communication** - Email templates and automation

### ⚙️ Platform Settings
- **System Configuration** - Platform-wide settings
- **Security Management** - Access controls and monitoring
- **Integration Management** - Third-party service configuration
- **Email Templates** - Automated communication setup
- **Feature Flags** - A/B testing and gradual rollouts

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions
- **Recharts** - Interactive data visualizations
- **Lucide React** - Modern icon library

### State Management
- **React Query** - Server state management
- **Zustand** - Lightweight state management
- **React Hook Form** - Form handling with validation

### UI Components
- **shadcn/ui** - Accessible component library
- **Class Variance Authority** - Component variant management
- **Tailwind Merge** - Conditional styling utilities

### Development Tools
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking
- **Hot Reload** - Fast development experience

## 📦 Installation

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn package manager
- Git

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sys/admin-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following variables:
   ```env
   # App URLs
   NEXT_PUBLIC_APP_URL=https://app.madas.com
   NEXT_PUBLIC_MARKETING_URL=https://madas.com
   
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   
   # Stripe Configuration
   STRIPE_SECRET_KEY=sk_live_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   
   # Email Service
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   
   # Analytics
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3001](http://localhost:3001)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Dashboard pages
│   ├── clients/           # Client management pages
│   ├── subscriptions/     # Subscription pages
│   ├── analytics/         # Analytics pages
│   ├── support/           # Support pages
│   ├── settings/          # Settings pages
│   └── login/             # Authentication pages
├── components/            # Reusable components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard-specific components
│   ├── layout/           # Layout components
│   └── ui/               # Base UI components
├── lib/                  # Utility libraries
│   ├── firebase/         # Firebase configuration
│   ├── services/         # API services
│   └── utils/            # Helper functions
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
└── styles/               # Global styles
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

### Code Style

This project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety
- **Conventional Commits** for commit messages

### Component Guidelines

- Use functional components with hooks
- Implement proper TypeScript interfaces
- Follow accessibility best practices
- Use semantic HTML elements
- Implement proper error boundaries

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Import your Git repository to Vercel
   - Set build command: `npm run build`
   - Set output directory: `.next`

2. **Environment Variables**
   - Add all required environment variables
   - Configure domain settings

3. **Deploy**
   - Automatic deployments on push to main branch
   - Preview deployments for pull requests

### Docker

```dockerfile
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3001
ENV PORT 3001
CMD ["node", "server.js"]
```

## 🔒 Security

### Authentication
- Two-factor authentication required
- Session timeout after 24 hours
- Secure password requirements
- Login attempt limiting

### Data Protection
- All data encrypted in transit and at rest
- Regular security audits
- GDPR compliance
- SOC 2 Type II certified

### Access Control
- Role-based permissions
- IP whitelisting options
- Audit logging
- Regular access reviews

## 📊 Monitoring

### Performance Monitoring
- Core Web Vitals tracking
- Real-time performance metrics
- Error tracking and alerting
- Uptime monitoring

### Business Metrics
- Revenue tracking and forecasting
- Client growth and retention
- Feature usage analytics
- Support ticket metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add TypeScript types for new features
- Update documentation as needed
- Test thoroughly before submitting

## 📞 Support

For technical support or questions:

- **Email**: support@madas.com
- **Documentation**: [docs.madas.com](https://docs.madas.com)
- **Issues**: GitHub Issues
- **Discord**: [MADAS Community](https://discord.gg/madas)

## 📄 License

This project is proprietary software. All rights reserved.

---

**Built with ❤️ by the MADAS Team**