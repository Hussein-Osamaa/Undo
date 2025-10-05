# 🚀 DEPLOY YOUR MADAS ADMIN DASHBOARD - COMMAND GUIDE

## **🎯 Ready to Deploy? Here are your options:**

---

## **Option 1: Super Quick Deploy (Recommended)**

### **One-Command Deployment**
```bash
# Navigate to admin dashboard
cd sys/admin-dashboard

# Make script executable and run
chmod +x deploy-now.sh
./deploy-now.sh
```

**That's it!** The script will:
- Install Vercel CLI if needed
- Login to Vercel
- Install dependencies
- Build the application
- Deploy to production

---

## **Option 2: Manual Vercel Deploy**

### **Step-by-Step Commands**
```bash
# 1. Navigate to admin dashboard
cd sys/admin-dashboard

# 2. Install Vercel CLI
npm install -g vercel

# 3. Login to Vercel
vercel login

# 4. Deploy to production
vercel --prod
```

---

## **Option 3: Test Locally First**

### **Build and Test Locally**
```bash
# 1. Navigate to admin dashboard
cd sys/admin-dashboard

# 2. Test build process
chmod +x test-build.sh
./test-build.sh

# 3. Start local production server
npm run start

# 4. Access at: http://localhost:3001
```

---

## **🔧 Environment Setup Commands**

### **Create Environment File**
```bash
# Copy environment template
cp env.example .env.local

# Edit with your values
nano .env.local
```

### **Essential Environment Variables**
```env
# Add these to .env.local or Vercel dashboard
NEXT_PUBLIC_APP_URL=https://app.madas.com
NEXT_PUBLIC_MARKETING_URL=https://madas.com
NEXT_PUBLIC_ADMIN_URL=https://your-project.vercel.app

# Firebase (Required)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id

# Admin Security (Required)
ADMIN_SECRET_KEY=your_super_secret_admin_key
ADMIN_2FA_SECRET=your_2fa_secret
```

---

## **🌐 Post-Deployment Commands**

### **Set Up Custom Domain**
```bash
# After deployment, add custom domain in Vercel dashboard
# Then configure DNS:
# Type: A, Name: admin, Value: 76.76.19.61
```

### **Redeploy After Environment Changes**
```bash
# Redeploy to apply environment variable changes
vercel --prod
```

---

## **🧪 Testing Commands**

### **Run All Tests**
```bash
# Test build process
chmod +x test-build.sh
./test-build.sh

# Test locally
npm run dev
# Access: http://localhost:3001

# Test production build
npm run build
npm run start
# Access: http://localhost:3001
```

### **Development Commands**
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Type check
npm run type-check
```

---

## **🔐 Demo Access**

After deployment, access your dashboard with:

- **URL**: `https://your-project.vercel.app`
- **Email**: `admin@madas.com`
- **Password**: `admin123`
- **2FA Code**: `123456`

**⚠️ IMPORTANT: Change these credentials immediately after deployment!**

---

## **📊 Verification Commands**

### **Check Deployment Status**
```bash
# Check Vercel deployment status
vercel ls

# Check specific project
vercel inspect your-project-name

# View deployment logs
vercel logs your-deployment-url
```

### **Test All Pages**
After deployment, verify these pages work:
- `/` - Login page
- `/dashboard` - Main dashboard
- `/clients` - Client management
- `/subscriptions` - Subscription management
- `/analytics` - Analytics and reports
- `/support` - Support tickets
- `/settings` - Platform settings

---

## **🚨 Troubleshooting Commands**

### **Common Issues**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Fix permission issues
chmod +x *.sh

# Check Node.js version
node --version
# Should be 18+

# Check npm version
npm --version

# Verify Vercel CLI
vercel --version

# Check login status
vercel whoami
```

### **Build Issues**
```bash
# Clean build
npm run build -- --no-cache

# Check TypeScript errors
npm run type-check

# Check linting errors
npm run lint

# Check for missing dependencies
npm audit
```

---

## **🎯 Quick Start Summary**

**For immediate deployment:**

```bash
cd sys/admin-dashboard
chmod +x deploy-now.sh
./deploy-now.sh
```

**Then:**
1. Go to Vercel dashboard
2. Add environment variables
3. Redeploy
4. Access your live dashboard!

---

## **📞 Need Help?**

- **Full Guide**: `DEPLOYMENT.md`
- **Quick Guide**: `QUICK_DEPLOY.md`
- **Deploy Now**: `DEPLOY_NOW.md`
- **Project Summary**: `PROJECT_SUMMARY.md`

---

**Your MADAS Admin Dashboard is ready to deploy! 🚀**

**Just run the commands above and you'll be live in minutes!**
