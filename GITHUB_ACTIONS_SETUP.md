# 🚀 GitHub Actions Setup for MADAS SaaS Platform

Complete guide to set up GitHub Actions for automatic deployment and CI/CD of your MADAS SaaS Platform.

## 📋 What's Included

Your repository now includes comprehensive GitHub Actions workflows:

### **🔄 Workflow Files Created**
✅ **`.github/workflows/deploy-all.yml`** - Deploy all applications  
✅ **`.github/workflows/marketing-website.yml`** - Marketing website deployment  
✅ **`.github/workflows/admin-dashboard.yml`** - Admin dashboard deployment  
✅ **`.github/workflows/client-app.yml`** - Client app deployment  

### **🚀 Features**
✅ **Automatic Deployment** - Deploy on push to main branch  
✅ **Preview Deployments** - Deploy previews on pull requests  
✅ **Path-based Triggers** - Only deploy when relevant files change  
✅ **Type Checking** - Run TypeScript type checks  
✅ **Linting** - Run ESLint on all code  
✅ **Build Verification** - Test builds before deployment  
✅ **Environment Variables** - Secure configuration management  
✅ **Multi-app Support** - Deploy all 4 applications independently  

---

## 🔧 Setup Instructions

### **Step 1: Required GitHub Secrets**

Add these secrets to your GitHub repository:

1. **Go to your repository**: https://github.com/Hussein-Osamaa/Undo
2. **Click Settings** → **Secrets and variables** → **Actions**
3. **Click "New repository secret"** and add each secret:

#### **Vercel Configuration**
```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_vercel_org_id
MARKETING_VERCEL_PROJECT_ID=your_marketing_project_id
ADMIN_VERCEL_PROJECT_ID=your_admin_project_id
CLIENT_VERCEL_PROJECT_ID=your_client_project_id
```

#### **Firebase Configuration (for Client App)**
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCgzJ9oNFsPsXx7-FAhzUkxcHMVJIBZbtQ
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=undo-12.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=undo-12
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=undo-12.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=737737728235
NEXT_PUBLIC_FIREBASE_APP_ID=1:737737728235:web:35c21e15097bc0bfe2deae
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-MCMB03LKW2
```

#### **App URLs**
```
NEXT_PUBLIC_APP_URL=https://your-client-app.vercel.app
NEXT_PUBLIC_MARKETING_URL=https://your-marketing-site.vercel.app
NEXT_PUBLIC_ADMIN_URL=https://your-admin-dashboard.vercel.app
```

### **Step 2: Get Vercel Configuration**

#### **Get Vercel Token**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Go to **Settings** → **Tokens**
3. Click **"Create Token"**
4. Name: `GitHub Actions`
5. Copy the token

#### **Get Vercel Project IDs**
1. Go to each project in Vercel Dashboard
2. Go to **Settings** → **General**
3. Copy the **Project ID**

#### **Get Vercel Org ID**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Go to **Settings** → **General**
3. Copy the **Team ID** (this is your Org ID)

### **Step 3: Enable GitHub Actions**

1. **Go to your repository**: https://github.com/Hussein-Osamaa/Undo
2. **Click Actions tab**
3. **Enable workflows** if prompted
4. **All workflows are now active**

---

## 🚀 How It Works

### **Deployment Triggers**

#### **Automatic Deployment**
- **Push to main branch** → Deploy to production
- **Push to develop branch** → Deploy to preview
- **Pull request** → Deploy to preview

#### **Path-based Triggers**
- **Marketing Website**: Only deploys when `marketing-website/**` files change
- **Admin Dashboard**: Only deploys when `admin-dashboard/**` files change
- **Client App**: Only deploys when `client-app/**` files change

### **Deployment Process**

For each application:
1. **Checkout code**
2. **Setup Node.js 18**
3. **Install dependencies**
4. **Run type checking**
5. **Run linting**
6. **Build application**
7. **Deploy to Vercel**

### **Environment Handling**
- **Production**: Deploy to production URLs
- **Preview**: Deploy to preview URLs
- **Environment Variables**: Securely managed via GitHub Secrets

---

## 📊 Workflow Details

### **Deploy All Workflow**
- **Trigger**: Push to main/develop or pull request
- **Jobs**: 
  - Deploy Marketing Website
  - Deploy Admin Dashboard
  - Deploy Client App
  - Build Shared Library
  - Notify deployment status

### **Individual Workflows**
Each application has its own workflow that:
- **Triggers**: Only when relevant files change
- **Deploys**: Automatically to Vercel
- **Tests**: Type checking and linting
- **Builds**: Production-ready builds

---

## 🧪 Testing Your Setup

### **Test Automatic Deployment**
1. **Make a small change** to any application
2. **Commit and push** to main branch
3. **Check GitHub Actions** tab
4. **Watch deployment** in real-time
5. **Verify deployment** on Vercel

### **Test Preview Deployment**
1. **Create a pull request**
2. **Check GitHub Actions** tab
3. **Verify preview deployment**
4. **Test preview URL**

---

## 🎯 Deployment URLs

After setup, your applications will be deployed to:

- **Marketing Website**: `https://your-marketing-site.vercel.app`
- **Admin Dashboard**: `https://your-admin-dashboard.vercel.app`
- **Client App**: `https://your-client-app.vercel.app`

---

## 🆘 Troubleshooting

### **Common Issues**

**Workflow not triggering:**
- Check if GitHub Actions is enabled
- Verify branch names match workflow triggers
- Check if files changed are in the correct paths

**Deployment fails:**
- Verify all secrets are set correctly
- Check Vercel project IDs are correct
- Ensure Vercel token has proper permissions

**Build fails:**
- Check for TypeScript errors
- Verify all dependencies are installed
- Check for linting errors

### **Debug Steps**
1. **Check GitHub Actions logs**
2. **Verify secrets are set**
3. **Test builds locally**
4. **Check Vercel deployment logs**

---

## 🎉 Benefits

### **Automation**
✅ **No Manual Deployment** - Everything happens automatically  
✅ **Consistent Deployments** - Same process every time  
✅ **Fast Feedback** - Know immediately if something breaks  
✅ **Preview Testing** - Test changes before merging  

### **Quality Assurance**
✅ **Type Checking** - Catch TypeScript errors early  
✅ **Linting** - Maintain code quality  
✅ **Build Testing** - Verify builds work before deployment  
✅ **Environment Validation** - Ensure proper configuration  

### **Team Collaboration**
✅ **Branch Protection** - Require successful builds  
✅ **Pull Request Reviews** - Preview deployments for review  
✅ **Deployment History** - Track all deployments  
✅ **Rollback Capability** - Easy to revert changes  

---

## 🎯 Next Steps

After setting up GitHub Actions:

1. **Add GitHub Secrets** - Configure all required secrets
2. **Test Deployment** - Make a small change and push
3. **Set up Branch Protection** - Require successful builds
4. **Configure Notifications** - Get notified of deployments
5. **Monitor Performance** - Track deployment times and success rates

---

**Your MADAS SaaS Platform now has professional CI/CD! 🚀**

With GitHub Actions set up, your entire platform will deploy automatically whenever you push changes. This ensures your applications are always up-to-date and properly tested.

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel GitHub Integration](https://vercel.com/docs/concepts/git/vercel-for-github)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)

**Your MADAS SaaS Platform is now production-ready with automated deployments! 🌟**
