# 🚀 Quick Deployment Guide

## **Deploy Your MADAS Admin Dashboard in 5 Minutes**

### **Option 1: Deploy to Vercel (Recommended)**

#### **Step 1: Install Vercel CLI**
```bash
npm install -g vercel
```

#### **Step 2: Login to Vercel**
```bash
vercel login
```

#### **Step 3: Deploy**
```bash
cd sys/admin-dashboard
vercel --prod
```

#### **Step 4: Configure Environment Variables**
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add the variables from `env.example`

### **Option 2: Use the Deployment Script**

#### **Step 1: Make Script Executable**
```bash
chmod +x deploy.sh
```

#### **Step 2: Run Deployment Script**
```bash
./deploy.sh
```

#### **Step 3: Follow the Interactive Prompts**
The script will guide you through the deployment process.

### **Option 3: Manual Deployment**

#### **Step 1: Build the Application**
```bash
cd sys/admin-dashboard
npm install
npm run build
```

#### **Step 2: Test Locally**
```bash
npm run start
```

#### **Step 3: Deploy to Your Platform**
- **Vercel**: `vercel --prod`
- **Netlify**: Connect your Git repository
- **AWS**: Use AWS Amplify or S3 + CloudFront
- **DigitalOcean**: Use App Platform

## **🔧 Environment Setup**

### **Required Environment Variables**
Copy `env.example` to `.env.local` and fill in:

```env
# Essential Variables
NEXT_PUBLIC_APP_URL=https://app.madas.com
NEXT_PUBLIC_MARKETING_URL=https://madas.com
NEXT_PUBLIC_ADMIN_URL=https://admin.madas.com

# Firebase (Required)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id

# Stripe (Required for payments)
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Admin Security
ADMIN_SECRET_KEY=your_secret_key
```

### **Demo Credentials**
- **Email**: `admin@madas.com`
- **Password**: `admin123`
- **2FA Code**: `123456`

## **🌐 Custom Domain Setup**

### **Vercel Domain Configuration**
1. Go to Vercel Dashboard > Project Settings > Domains
2. Add your custom domain (e.g., `admin.madas.com`)
3. Configure DNS records as instructed
4. SSL certificate will be automatically provisioned

### **DNS Configuration**
```
Type: A
Name: admin
Value: 76.76.19.61

Type: CNAME
Name: admin.www
Value: cname.vercel-dns.com
```

## **📊 Post-Deployment Checklist**

### **✅ Security**
- [ ] Update default admin credentials
- [ ] Enable 2FA for all admin accounts
- [ ] Configure IP whitelist (optional)
- [ ] Set up monitoring and alerts

### **✅ Functionality**
- [ ] Test login with 2FA
- [ ] Verify all pages load correctly
- [ ] Test data tables and filtering
- [ ] Check responsive design on mobile

### **✅ Performance**
- [ ] Verify page load times < 2 seconds
- [ ] Check Core Web Vitals
- [ ] Test on different devices/browsers
- [ ] Monitor error rates

### **✅ Monitoring**
- [ ] Set up error tracking (Sentry)
- [ ] Configure analytics (Google Analytics)
- [ ] Set up uptime monitoring
- [ ] Create performance alerts

## **🔍 Troubleshooting**

### **Common Issues**

#### **Build Fails**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### **Environment Variables Not Working**
- Check variable names (must start with `NEXT_PUBLIC_` for client-side)
- Restart the application after adding variables
- Verify in deployment platform settings

#### **Authentication Issues**
- Verify Firebase configuration
- Check admin credentials in environment variables
- Ensure 2FA secrets are properly set

#### **Styling Issues**
- Clear browser cache
- Check Tailwind CSS build process
- Verify CSS imports in `globals.css`

### **Getting Help**
1. Check the full `DEPLOYMENT.md` guide
2. Review error logs in your deployment platform
3. Test locally first: `npm run dev`
4. Check the `README.md` for setup instructions

## **🎉 Success!**

Your MADAS Admin Dashboard is now live! 

**Next Steps:**
1. **Update Admin Credentials** - Change default login details
2. **Configure Integrations** - Set up Firebase, Stripe, etc.
3. **Set Up Monitoring** - Add error tracking and analytics
4. **Team Onboarding** - Train your team on the new dashboard

**Demo Access:**
- URL: `https://your-domain.vercel.app`
- Email: `admin@madas.com`
- Password: `admin123`
- 2FA: `123456`

---

**Need help?** Check the full documentation in `DEPLOYMENT.md` or `README.md`
