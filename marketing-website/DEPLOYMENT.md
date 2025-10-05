# MADAS Marketing Website - Deployment Guide

This guide will help you deploy the MADAS marketing website to production.

## 🚀 Quick Deploy to Vercel (Recommended)

### 1. Prepare Your Repository

```bash
# Make sure all changes are committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)** and sign in
2. **Click "New Project"**
3. **Import your Git repository**
4. **Configure the project:**
   - **Framework Preset**: Next.js
   - **Root Directory**: `sys/marketing-website`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### 3. Set Environment Variables

In your Vercel dashboard, go to **Settings > Environment Variables** and add:

```env
# App URLs
NEXT_PUBLIC_APP_URL=https://app.madas.com
NEXT_PUBLIC_ADMIN_URL=https://admin.madas.com

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_HOTJAR_ID=1234567

# Firebase (for contact forms)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef

# Email Service (for contact forms)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Stripe (for pricing page)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
```

### 4. Deploy

Click **Deploy** and wait for the deployment to complete. Your site will be available at `https://your-project.vercel.app`.

## 🌐 Custom Domain Setup

### 1. Add Domain in Vercel

1. Go to **Settings > Domains**
2. Add your custom domain (e.g., `madas.com`)
3. Follow the DNS configuration instructions

### 2. Configure DNS

Add these DNS records to your domain provider:

```
Type: A
Name: @
Value: 76.76.19.61

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3. SSL Certificate

Vercel automatically provides SSL certificates. Wait 24-48 hours for full propagation.

## 📊 Analytics Setup

### Google Analytics 4

1. **Create GA4 Property**:
   - Go to [analytics.google.com](https://analytics.google.com)
   - Create a new property for your website
   - Get your Measurement ID (G-XXXXXXXXXX)

2. **Add to Environment Variables**:
   ```env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

3. **Verify Installation**:
   - Visit your website
   - Check GA4 Real-time reports

### Hotjar (Optional)

1. **Create Hotjar Account**:
   - Go to [hotjar.com](https://hotjar.com)
   - Create a new site
   - Get your Site ID

2. **Add to Environment Variables**:
   ```env
   NEXT_PUBLIC_HOTJAR_ID=1234567
   ```

## 🔧 Performance Optimization

### 1. Image Optimization

```bash
# Optimize images before deployment
npm install -g imagemin-cli imagemin-mozjpeg imagemin-pngquant

# Optimize images in public folder
imagemin public/images/*.jpg --out-dir=public/images --plugin=mozjpeg
imagemin public/images/*.png --out-dir=public/images --plugin=pngquant
```

### 2. Bundle Analysis

```bash
# Analyze bundle size
npm install --save-dev @next/bundle-analyzer
npm run analyze
```

### 3. Lighthouse Audit

After deployment, run a Lighthouse audit:
1. Open Chrome DevTools
2. Go to **Lighthouse** tab
3. Run audit for **Performance**, **Accessibility**, **Best Practices**, **SEO**

## 🚀 Alternative Deployment Options

### Netlify

1. **Connect Repository**:
   - Go to [netlify.com](https://netlify.com)
   - Import your Git repository

2. **Build Settings**:
   ```
   Build Command: npm run build
   Publish Directory: .next
   ```

3. **Environment Variables**: Add the same variables as Vercel

### AWS S3 + CloudFront

1. **Build Static Export**:
   ```bash
   npm run build
   npm run export
   ```

2. **Upload to S3**:
   ```bash
   aws s3 sync out/ s3://your-bucket-name
   ```

3. **Setup CloudFront**: Create distribution pointing to S3 bucket

### Docker

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
   EXPOSE 3000
   ENV PORT 3000
   CMD ["node", "server.js"]
   ```

2. **Build and Run**:
   ```bash
   docker build -t madas-marketing .
   docker run -p 3000:3000 madas-marketing
   ```

## 🔍 SEO Checklist

### Before Launch

- [ ] **Meta Tags**: All pages have proper title, description, and Open Graph tags
- [ ] **Structured Data**: JSON-LD markup for business information
- [ ] **Sitemap**: Generate and submit to Google Search Console
- [ ] **Robots.txt**: Properly configured
- [ ] **Canonical URLs**: Set for all pages
- [ ] **Image Alt Tags**: All images have descriptive alt text
- [ ] **Page Speed**: Core Web Vitals optimized
- [ ] **Mobile Friendly**: Responsive design tested
- [ ] **SSL Certificate**: HTTPS enabled
- [ ] **Google Search Console**: Property verified

### After Launch

- [ ] **Submit Sitemap**: Submit to Google Search Console
- [ ] **Monitor Performance**: Set up alerts for Core Web Vitals
- [ ] **Track Conversions**: Set up goals in Google Analytics
- [ ] **Monitor Uptime**: Set up uptime monitoring
- [ ] **Security Headers**: Verify security headers are present

## 🛡️ Security Checklist

### Security Headers

Verify these headers are present:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`

### Environment Variables

- [ ] **No Secrets in Code**: All sensitive data in environment variables
- [ ] **Production Keys**: Use production API keys, not development ones
- [ ] **Secure Storage**: Environment variables stored securely
- [ ] **Access Control**: Limit access to production environment

## 📈 Monitoring Setup

### 1. Error Tracking

Set up error monitoring with Sentry:

```bash
npm install @sentry/nextjs
```

### 2. Performance Monitoring

Monitor Core Web Vitals with:
- Google Search Console
- PageSpeed Insights
- Real User Monitoring (RUM)

### 3. Uptime Monitoring

Set up uptime monitoring with:
- UptimeRobot
- Pingdom
- StatusCake

## 🔄 Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      # Add deployment steps here
```

## 📞 Support

If you need help with deployment:

- **Documentation**: Check the main README.md
- **Issues**: Open a GitHub issue
- **Contact**: support@madas.com

---

**Happy Deploying! 🚀**
