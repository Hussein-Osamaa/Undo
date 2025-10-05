# 🚀 MADAS Client App - Deployment Guide

This guide will help you deploy the MADAS Client App to production using Vercel.

## 📋 Prerequisites

- GitHub account
- Vercel account (free tier available)
- Firebase project set up
- Domain name (optional)

## 🔧 Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `madas-client-app`
4. Enable Google Analytics (optional)
5. Create project

### 2. Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click **Get Started**
3. Go to **Sign-in method** tab
4. Enable **Email/Password**
5. Optionally enable **Google** sign-in

### 3. Create Firestore Database

1. Go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (we'll add security rules later)
4. Select a location close to your users

### 4. Enable Storage

1. Go to **Storage**
2. Click **Get started**
3. Start in test mode
4. Choose same location as Firestore

### 5. Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll down to **Your apps**
3. Click **Web app** icon
4. Register app with name: `MADAS Client App`
5. Copy the configuration object

## 🌐 Vercel Deployment

### 1. Connect GitHub Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **New Project**
3. Import your GitHub repository
4. Select the repository: `madas-client-app`

### 2. Configure Build Settings

Vercel will auto-detect Next.js, but verify these settings:

- **Framework Preset**: Next.js
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 3. Environment Variables

Add these environment variables in Vercel:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# App URLs
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXT_PUBLIC_MARKETING_URL=https://madas.com
NEXT_PUBLIC_ADMIN_URL=https://admin.madas.com

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 4. Deploy

1. Click **Deploy**
2. Wait for deployment to complete
3. Your app will be available at `https://your-app.vercel.app`

## 🔒 Security Configuration

### 1. Firestore Security Rules

Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function hasBusinessAccess(businessId) {
      return isAuthenticated() && 
             exists(/databases/$(database)/documents/businesses/$(businessId)/staff/$(request.auth.uid));
    }
    
    function isBusinessOwner(businessId) {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/businesses/$(businessId)).data.owner.userId == request.auth.uid;
    }
    
    match /users/{userId} {
      allow read, write: if isAuthenticated() && request.auth.uid == userId;
    }
    
    match /businesses/{businessId} {
      allow read: if hasBusinessAccess(businessId);
      allow write: if isBusinessOwner(businessId);
      
      match /products/{productId} {
        allow read, write: if hasBusinessAccess(businessId);
      }
      
      match /orders/{orderId} {
        allow read, write: if hasBusinessAccess(businessId);
      }
      
      match /customers/{customerId} {
        allow read, write: if hasBusinessAccess(businessId);
      }
      
      match /staff/{staffId} {
        allow read: if hasBusinessAccess(businessId);
        allow write: if isBusinessOwner(businessId);
      }
    }
  }
}
```

### 2. Storage Security Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{businessId}/{fileName} {
      allow read, write: if request.auth != null && 
        exists(/databases/(default)/documents/businesses/$(businessId)/staff/$(request.auth.uid));
    }
  }
}
```

## 🌍 Custom Domain (Optional)

### 1. Add Domain in Vercel

1. Go to your project in Vercel
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Follow DNS configuration instructions

### 2. Update Firebase Auth Domains

1. Go to Firebase Console → Authentication → Settings
2. Add your custom domain to **Authorized domains**
3. Add your Vercel domain as well

## 📊 Monitoring & Analytics

### 1. Google Analytics

1. Create Google Analytics account
2. Create property for your app
3. Get tracking ID
4. Add to environment variables

### 2. Vercel Analytics

1. Go to Vercel project settings
2. Enable **Vercel Analytics**
3. View analytics in Vercel dashboard

### 3. Error Monitoring

Consider adding Sentry for error tracking:

```bash
npm install @sentry/nextjs
```

## 🔄 CI/CD Pipeline

The repository includes GitHub Actions for automatic deployment:

- **Push to main**: Deploys to production
- **Pull Request**: Runs tests and type checking
- **Push to develop**: Deploys to preview

### Required Secrets

Add these to your GitHub repository secrets:

- `VERCEL_TOKEN`: Vercel API token
- `VERCEL_ORG_ID`: Vercel organization ID
- `VERCEL_PROJECT_ID`: Vercel project ID
- All Firebase environment variables

## 🧪 Testing Deployment

### 1. Smoke Tests

After deployment, test these features:

- [ ] User registration
- [ ] User login
- [ ] Business creation
- [ ] Product management
- [ ] Image uploads
- [ ] Real-time updates

### 2. Performance Tests

- [ ] Page load times < 3 seconds
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check environment variables
   - Verify Firebase configuration
   - Check build logs in Vercel

2. **Authentication Issues**
   - Verify Firebase Auth is enabled
   - Check authorized domains
   - Verify API keys

3. **Database Errors**
   - Check Firestore security rules
   - Verify database permissions
   - Check network connectivity

### Getting Help

- Check Vercel deployment logs
- Review Firebase Console for errors
- Check browser console for client-side errors
- Create GitHub issue with details

## 📈 Post-Deployment

### 1. Create Admin Account

1. Sign up with admin email
2. Create business account
3. Set up initial configuration

### 2. Add Sample Data

1. Use the sample data seeder in the app
2. Create test products and categories
3. Test all functionality

### 3. Configure Monitoring

1. Set up alerts for errors
2. Monitor performance metrics
3. Set up backup procedures

## 🔄 Updates & Maintenance

### Regular Tasks

- Monitor error logs
- Update dependencies
- Backup Firestore data
- Review security rules
- Update documentation

### Scaling Considerations

- Monitor Firebase usage limits
- Consider Firestore indexing
- Optimize queries for performance
- Plan for increased storage needs

---

**Your MADAS Client App is now live! 🎉**

For support, visit [GitHub Issues](https://github.com/your-username/madas-client-app/issues) or email support@madas.com
