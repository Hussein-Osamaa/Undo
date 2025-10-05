# 🔥 Firebase Production Setup

Complete guide to set up Firebase for your MADAS Client App production deployment.

## 📋 Prerequisites

- Google account
- Vercel account (for deployment)
- Domain name (optional)

## 🚀 Step 1: Create Firebase Project

### 1.1 Access Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**

### 1.2 Project Configuration
- **Project name**: `madas-client-app`
- **Project ID**: `madas-client-app-[random]` (or custom)
- **Google Analytics**: Enable (recommended)
- **Analytics account**: Create new or use existing

### 1.3 Complete Setup
- Click **"Create project"**
- Wait for project creation (1-2 minutes)
- Click **"Continue"** when ready

## 🔐 Step 2: Enable Authentication

### 2.1 Access Authentication
1. In Firebase Console, click **"Authentication"**
2. Click **"Get started"**

### 2.2 Configure Sign-in Methods
1. Go to **"Sign-in method"** tab
2. Enable **"Email/Password"**:
   - Click on **"Email/Password"**
   - Toggle **"Enable"**
   - Click **"Save"**

### 2.3 Optional: Enable Google Sign-in
1. Click on **"Google"**
2. Toggle **"Enable"**
3. Select **"Support email"** (your email)
4. Click **"Save"**

### 2.4 Configure Authorized Domains
1. Go to **"Settings"** tab
2. Scroll to **"Authorized domains"**
3. Add your Vercel domain: `your-app-name.vercel.app`
4. Add localhost for development: `localhost`
5. Add custom domain if you have one

## 🗄️ Step 3: Set Up Firestore Database

### 3.1 Create Database
1. Click **"Firestore Database"**
2. Click **"Create database"**

### 3.2 Security Rules
1. Select **"Start in test mode"** (we'll secure later)
2. Click **"Next"**

### 3.3 Location Selection
1. Choose location closest to your users
2. Click **"Done"**

### 3.4 Configure Security Rules
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

## 📁 Step 4: Set Up Storage

### 4.1 Create Storage Bucket
1. Click **"Storage"**
2. Click **"Get started"**

### 4.2 Security Rules
1. Select **"Start in test mode"**
2. Click **"Next"**

### 4.3 Location Selection
1. Choose same location as Firestore
2. Click **"Done"**

### 4.4 Configure Storage Rules
Replace default rules with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{businessId}/{fileName} {
      allow read, write: if request.auth != null && 
        exists(/databases/(default)/documents/businesses/$(businessId)/staff/$(request.auth.uid));
    }
    
    match /businesses/{businessId}/logos/{fileName} {
      allow read, write: if request.auth != null && 
        exists(/databases/(default)/documents/businesses/$(businessId)/staff/$(request.auth.uid));
    }
  }
}
```

## 🔑 Step 5: Get Configuration

### 5.1 Access Project Settings
1. Click the **gear icon** (Settings)
2. Scroll down to **"Your apps"** section

### 5.2 Create Web App
1. Click **"Web app"** icon (`</>`)
2. **App nickname**: `MADAS Client App`
3. **Firebase Hosting**: Don't set up (we're using Vercel)
4. Click **"Register app"**

### 5.3 Copy Configuration
Copy the Firebase configuration object:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};
```

## 🌐 Step 6: Configure Vercel

### 6.1 Add Environment Variables
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

### 6.2 Redeploy
1. Go to **"Deployments"** tab
2. Click **"Redeploy"** on latest deployment
3. Select **"Use existing Build Cache"** = No

## 🧪 Step 7: Test Configuration

### 7.1 Test Authentication
1. Go to your deployed app
2. Try to register a new account
3. Verify email verification works
4. Test login/logout

### 7.2 Test Database
1. Create a business account
2. Add a product
3. Verify data appears in Firestore Console

### 7.3 Test Storage
1. Upload a product image
2. Verify file appears in Storage Console

## 🔒 Step 8: Security Checklist

- [ ] Firestore security rules configured
- [ ] Storage security rules configured
- [ ] Authorized domains set up
- [ ] Environment variables secured
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] API keys not exposed in client code

## 📊 Step 9: Monitoring Setup

### 9.1 Enable Analytics
- Analytics automatically enabled with Firebase
- View data in Firebase Console → Analytics

### 9.2 Set Up Alerts
1. Go to Firebase Console → Project Settings
2. Add team members for notifications
3. Configure usage alerts

### 9.3 Monitor Usage
- Monitor Firestore reads/writes
- Monitor Storage usage
- Monitor Authentication usage

## 🆘 Troubleshooting

### Common Issues

**Authentication not working:**
- Check authorized domains
- Verify API keys are correct
- Check browser console for errors

**Database access denied:**
- Verify Firestore security rules
- Check user authentication status
- Verify business access permissions

**Storage upload fails:**
- Check Storage security rules
- Verify file size limits
- Check file type restrictions

### Getting Help

- Firebase Console → Support
- Vercel Dashboard → Help
- Check browser console for client errors
- Review server logs in Vercel

## ✅ Success Checklist

- [ ] Firebase project created
- [ ] Authentication enabled
- [ ] Firestore database created
- [ ] Storage bucket created
- [ ] Security rules configured
- [ ] Configuration copied
- [ ] Vercel environment variables set
- [ ] App redeployed
- [ ] Authentication tested
- [ ] Database operations tested
- [ ] File uploads tested

## 🎉 You're Ready!

Your Firebase backend is now configured and ready for production use with your MADAS Client App!

### What's Next

1. **Test thoroughly** - Use sample data seeder
2. **Add real users** - Create your first business
3. **Monitor usage** - Keep an eye on Firebase usage
4. **Scale as needed** - Upgrade Firebase plan if needed
5. **Iterate** - Build more features based on user feedback

**Your MADAS Client App backend is production-ready! 🚀**
