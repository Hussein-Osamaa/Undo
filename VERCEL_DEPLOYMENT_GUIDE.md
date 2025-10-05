# 🚀 Vercel Deployment Guide for MADAS SaaS Platform

## 🔍 **The Issue**
Vercel is looking for index pages in the root directories, but your applications are separate Next.js projects that need to be deployed individually.

## ✅ **Solution: Deploy Each Application Separately**

### **Step 1: Deploy Marketing Website**

1. **Go to**: https://vercel.com/dashboard
2. **Click**: "New Project"
3. **Import**: `Hussein-Osamaa/Undo` repository
4. **Configure**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./marketing-website`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. **Deploy**

### **Step 2: Deploy Admin Dashboard**

1. **Go to**: https://vercel.com/dashboard
2. **Click**: "New Project"
3. **Import**: `Hussein-Osamaa/Undo` repository
4. **Configure**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./admin-dashboard`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. **Deploy**

### **Step 3: Deploy Client App**

1. **Go to**: https://vercel.com/dashboard
2. **Click**: "New Project"
3. **Import**: `Hussein-Osamaa/Undo` repository
4. **Configure**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./client-app`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. **Add Environment Variables**:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCgzJ9oNFsPsXx7-FAhzUkxcHMVJIBZbtQ
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=undo-12.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=undo-12
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=undo-12.firebasestorage.app
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=737737728235
   NEXT_PUBLIC_FIREBASE_APP_ID=1:737737728235:web:35c21e15097bc0bfe2deae
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-MCMB03LKW2
   ```
6. **Deploy**

### **Step 4: Deploy Launch Center**

1. **Go to**: https://vercel.com/dashboard
2. **Click**: "New Project"
3. **Import**: `Hussein-Osamaa/Undo` repository
4. **Configure**:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (root)
   - **Build Command**: `echo "Static site"`
   - **Output Directory**: `./`
5. **Deploy**

## 🎯 **Expected URLs After Deployment**

- **Launch Center**: `https://your-launch-center.vercel.app`
- **Marketing Website**: `https://your-marketing-site.vercel.app`
- **Admin Dashboard**: `https://your-admin-dashboard.vercel.app`
- **Client App**: `https://your-client-app.vercel.app`

## 🔧 **Alternative: Use Vercel CLI**

If you prefer using the CLI:

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy Marketing Website
cd marketing-website
vercel

# Deploy Admin Dashboard
cd ../admin-dashboard
vercel

# Deploy Client App
cd ../client-app
vercel

# Deploy Launch Center
cd ..
vercel
```

## 📋 **Important Notes**

1. **Separate Projects**: Each application needs its own Vercel project
2. **Root Directory**: Specify the correct root directory for each app
3. **Environment Variables**: Add Firebase config for Client App
4. **Build Commands**: Use `npm run build` for Next.js apps
5. **Output Directory**: Use `.next` for Next.js apps

## 🎉 **After Deployment**

Update your launch center with the actual Vercel URLs:

1. **Get URLs**: From each Vercel project dashboard
2. **Update Links**: In your `index.html` file
3. **Test**: All applications should work correctly

## 🆘 **Troubleshooting**

**Build Errors**: Check that all dependencies are in `package.json`
**Environment Variables**: Ensure Firebase config is correct
**Routing Issues**: Verify Next.js configuration files
**Deployment Failures**: Check Vercel build logs

---

**Your MADAS SaaS Platform will be live on Vercel with this approach! 🚀**
