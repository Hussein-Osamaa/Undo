# MADAS Admin Dashboard - Deployment Guide

This guide will help you deploy the MADAS Admin Dashboard to production.

## 🚀 Quick Deploy to Vercel (Recommended)

### 1. Prepare Your Repository

```bash
# Make sure all changes are committed
git add .
git commit -m "Admin dashboard ready for deployment"
git push origin main
```

### 2. Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)** and sign in
2. **Click "New Project"**
3. **Import your Git repository**
4. **Configure the project:**
   - **Framework Preset**: Next.js
   - **Root Directory**: `sys/admin-dashboard`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### 3. Set Environment Variables

In your Vercel dashboard, go to **Settings > Environment Variables** and add:

```env
# App URLs
NEXT_PUBLIC_APP_URL=https://app.madas.com
NEXT_PUBLIC_MARKETING_URL=https://madas.com

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Stripe Configuration
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Admin Security
ADMIN_SECRET_KEY=your_super_secret_admin_key
ADMIN_2FA_SECRET=your_2fa_secret

# Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 4. Deploy

Click **Deploy** and wait for the deployment to complete. Your admin dashboard will be available at `https://your-project.vercel.app`.

## 🌐 Custom Domain Setup

### 1. Add Domain in Vercel

1. Go to **Settings > Domains**
2. Add your custom domain (e.g., `admin.madas.com`)
3. Follow the DNS configuration instructions

### 2. Configure DNS

Add these DNS records to your domain provider:

```
Type: A
Name: admin
Value: 76.76.19.61

Type: CNAME
Name: admin.www
Value: cname.vercel-dns.com
```

### 3. SSL Certificate

Vercel automatically provides SSL certificates. Wait 24-48 hours for full propagation.

## 🔒 Security Configuration

### 1. Admin Authentication

Set up secure admin credentials:

```bash
# Generate strong admin password
openssl rand -base64 32

# Generate 2FA secret
openssl rand -base64 32
```

### 2. Environment Security

- **Never commit** `.env.local` files
- **Use strong passwords** for admin accounts
- **Enable 2FA** for all admin users
- **Rotate secrets** regularly

### 3. Access Control

Configure IP whitelisting (optional):

```javascript
// In your middleware
const allowedIPs = [
  '192.168.1.0/24',  // Office network
  '203.0.113.0/24',  // VPN network
];

export function middleware(request) {
  const clientIP = request.ip;
  // Check if IP is allowed
}
```

## 📊 Monitoring Setup

### 1. Error Tracking

Set up Sentry for error monitoring:

```bash
npm install @sentry/nextjs
```

```javascript
// sentry.client.config.js
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### 2. Performance Monitoring

Monitor Core Web Vitals:

```javascript
// pages/_app.js
export function reportWebVitals(metric) {
  // Send to analytics
  gtag('event', metric.name, {
    value: Math.round(metric.value),
    event_category: metric.label,
  });
}
```

### 3. Uptime Monitoring

Set up uptime monitoring with:
- **UptimeRobot** - Free tier available
- **Pingdom** - Comprehensive monitoring
- **StatusCake** - Simple setup

## 🔧 Performance Optimization

### 1. Image Optimization

```bash
# Optimize images before deployment
npm install -g imagemin-cli imagemin-mozjpeg imagemin-pngquant

# Optimize images
imagemin public/images/*.jpg --out-dir=public/images --plugin=mozjpeg
imagemin public/images/*.png --out-dir=public/images --plugin=pngquant
```

### 2. Bundle Analysis

```bash
# Analyze bundle size
npm install --save-dev @next/bundle-analyzer
npm run analyze
```

### 3. Caching Strategy

Configure caching headers:

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=300',
          },
        ],
      },
    ];
  },
};
```

## 🚀 Alternative Deployment Options

### Docker Deployment

1. **Create Dockerfile**:
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

2. **Build and Run**:
```bash
docker build -t madas-admin-dashboard .
docker run -p 3001:3001 madas-admin-dashboard
```

### AWS Deployment

1. **Build Static Export**:
```bash
npm run build
npm run export
```

2. **Deploy to S3**:
```bash
aws s3 sync out/ s3://your-admin-dashboard-bucket
```

3. **Setup CloudFront**:
- Create CloudFront distribution
- Point to S3 bucket
- Configure custom domain

## 🔍 SEO & Security

### 1. Security Headers

Verify these headers are present:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `Content-Security-Policy: default-src 'self'`

### 2. Robot.txt

Create `public/robots.txt`:
```
User-agent: *
Disallow: /
```

### 3. Admin Protection

Add admin-only middleware:
```javascript
// middleware.js
export function middleware(request) {
  // Check admin authentication
  // Redirect to login if not authenticated
}
```

## 📈 Analytics Setup

### 1. Google Analytics

```javascript
// pages/_app.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as gtag from '../lib/gtag';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}
```

### 2. Custom Analytics

Track admin actions:
```javascript
// lib/analytics.js
export const trackAdminAction = (action, data) => {
  // Send to your analytics service
  fetch('/api/analytics', {
    method: 'POST',
    body: JSON.stringify({ action, data }),
  });
};
```

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Admin Dashboard

on:
  push:
    branches: [main]
    paths: ['sys/admin-dashboard/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: sys/admin-dashboard/package-lock.json
      
      - name: Install dependencies
        run: |
          cd sys/admin-dashboard
          npm ci
      
      - name: Run tests
        run: |
          cd sys/admin-dashboard
          npm run test
      
      - name: Build
        run: |
          cd sys/admin-dashboard
          npm run build
        env:
          NEXT_PUBLIC_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
          # Add other environment variables
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: sys/admin-dashboard
```

## 🛠️ Maintenance

### 1. Regular Updates

- **Dependencies**: Update monthly
- **Security patches**: Apply immediately
- **Node.js**: Update quarterly
- **Next.js**: Update with major releases

### 2. Backup Strategy

- **Database backups**: Daily automated backups
- **Code backups**: Git repository with multiple remotes
- **Configuration backups**: Store in secure vault

### 3. Health Checks

Set up health check endpoints:

```javascript
// pages/api/health.js
export default function handler(req, res) {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
  });
}
```

## 📞 Support

For deployment issues:

- **Documentation**: Check the main README.md
- **Issues**: Open a GitHub issue
- **Contact**: admin@madas.com
- **Emergency**: Call support hotline

## 🎯 Post-Deployment Checklist

### Security
- [ ] Admin authentication working
- [ ] 2FA enabled and tested
- [ ] Security headers configured
- [ ] Access controls tested
- [ ] Environment variables secured

### Performance
- [ ] Page load times < 2 seconds
- [ ] Core Web Vitals optimized
- [ ] Images optimized
- [ ] Caching configured
- [ ] CDN setup (if applicable)

### Monitoring
- [ ] Error tracking configured
- [ ] Performance monitoring active
- [ ] Uptime monitoring setup
- [ ] Analytics tracking working
- [ ] Health checks responding

### Functionality
- [ ] All pages loading correctly
- [ ] Authentication flow working
- [ ] Data tables functioning
- [ ] Charts rendering properly
- [ ] Search and filters working

---

**Your MADAS Admin Dashboard is now ready for production! 🚀**

Remember to:
- Monitor performance regularly
- Keep dependencies updated
- Review access logs
- Test backup procedures
- Document any custom configurations
