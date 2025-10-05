# 🚀 Deploy MADAS Client App - Quick Start

Deploy your MADAS Client App to Vercel in minutes!

## ⚡ Quick Deployment (5 minutes)

### Option 1: Automated Script (Recommended)

```bash
# Navigate to client-app directory
cd sys/client-app

# Make script executable and run
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

### Option 2: Manual Steps

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel --prod
```

## 🔧 Firebase Setup (Required)

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**
3. Name: `madas-client-app`
4. Enable Google Analytics (optional)
5. Create project

### 2. Enable Services

**Authentication:**
- Go to **Authentication** → **Sign-in method**
- Enable **Email/Password**
- Optionally enable **Google**

**Firestore Database:**
- Go to **Firestore Database**
- Click **Create database**
- Start in **test mode**

**Storage:**
- Go to **Storage**
- Click **Get started**
- Start in **test mode**

### 3. Get Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll to **Your apps**
3. Click **Web app** icon
4. Register app: `MADAS Client App`
5. Copy configuration object

## 🌐 Configure Vercel

### 1. Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 2. Redeploy

After adding environment variables:
1. Go to **Deployments** tab
2. Click **"Redeploy"** on latest deployment
3. Select **"Use existing Build Cache"** = No

## 🧪 Test Your Deployment

### 1. Access Your App

Your app will be available at:
`https://your-project-name.vercel.app`

### 2. Test Features

- [ ] User registration
- [ ] User login
- [ ] Business creation
- [ ] Product management
- [ ] Sample data seeding

### 3. Demo Credentials

Use these credentials for testing:
- **Email**: `demo@madas.com`
- **Password**: `demo123`

## 🔒 Security Setup

### 1. Firestore Rules

Replace default rules in Firebase Console → Firestore → Rules:

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

### 2. Storage Rules

Replace default rules in Firebase Console → Storage → Rules:

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

### 2. Update Firebase Auth

1. Go to Firebase Console → Authentication → Settings
2. Add your custom domain to **Authorized domains**

## 📊 Monitoring

### 1. Vercel Analytics

- Automatically enabled
- View in Vercel Dashboard → Analytics

### 2. Firebase Analytics

- View in Firebase Console → Analytics
- Track user behavior and app performance

## 🆘 Troubleshooting

### Common Issues

**Build Failures:**
- Check environment variables
- Verify Firebase configuration
- Check build logs in Vercel

**Authentication Issues:**
- Verify Firebase Auth is enabled
- Check authorized domains
- Verify API keys

**Database Errors:**
- Check Firestore security rules
- Verify database permissions

### Getting Help

- Check Vercel deployment logs
- Review Firebase Console for errors
- Check browser console for client-side errors

## 🎉 Success!

Your MADAS Client App is now live and ready to use!

### What You've Accomplished

✅ **Deployed to Production** - Live on Vercel  
✅ **Firebase Integration** - Authentication and database  
✅ **Security Configured** - Proper access controls  
✅ **Monitoring Setup** - Analytics and error tracking  
✅ **Sample Data Ready** - Test with realistic data  

### Next Steps

1. **Test thoroughly** - Use sample data seeder
2. **Add real users** - Create your first business
3. **Customize** - Add your branding and content
4. **Scale** - Monitor usage and performance
5. **Iterate** - Build more features based on feedback

**Your MADAS Client App is ready for the world! 🚀**
