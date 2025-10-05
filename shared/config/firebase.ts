/**
 * Firebase configuration for the MADAS SaaS platform
 */

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, Firestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, FirebaseStorage, connectStorageEmulator } from 'firebase/storage';
import { getFunctions, Functions, connectFunctionsEmulator } from 'firebase/functions';
import { getAnalytics, Analytics } from 'firebase/analytics';

/**
 * Firebase configuration interface
 */
export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

/**
 * Environment-based Firebase configuration
 */
const getFirebaseConfig = (): FirebaseConfig => {
  // Production configuration
  const prodConfig: FirebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.VITE_FIREBASE_API_KEY || '',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || process.env.VITE_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || process.env.VITE_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || process.env.VITE_FIREBASE_APP_ID || '',
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || process.env.VITE_FIREBASE_MEASUREMENT_ID || '',
  };

  // Development configuration (if using Firebase emulators)
  const devConfig: FirebaseConfig = {
    ...prodConfig,
    // Override with development settings if needed
  };

  return process.env.NODE_ENV === 'development' ? devConfig : prodConfig;
};

/**
 * Firebase app instance
 */
let firebaseApp: FirebaseApp | null = null;

/**
 * Initialize Firebase app
 */
export const initializeFirebaseApp = (): FirebaseApp => {
  if (firebaseApp) {
    return firebaseApp;
  }

  const apps = getApps();
  if (apps.length > 0) {
    firebaseApp = apps[0];
    return firebaseApp;
  }

  const config = getFirebaseConfig();
  
  // Validate required configuration
  if (!config.apiKey || !config.projectId) {
    throw new Error('Firebase configuration is incomplete. Please check your environment variables.');
  }

  firebaseApp = initializeApp(config);
  return firebaseApp;
};

/**
 * Firebase Auth instance
 */
let auth: Auth | null = null;

/**
 * Get Firebase Auth instance
 */
export const getFirebaseAuth = (): Auth => {
  if (auth) {
    return auth;
  }

  const app = initializeFirebaseApp();
  auth = getAuth(app);

  // Connect to emulator in development
  if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true') {
    try {
      connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
    } catch (error) {
      // Emulator already connected or not available
      console.warn('Firebase Auth emulator connection failed:', error);
    }
  }

  return auth;
};

/**
 * Firebase Firestore instance
 */
let firestore: Firestore | null = null;

/**
 * Get Firebase Firestore instance
 */
export const getFirebaseFirestore = (): Firestore => {
  if (firestore) {
    return firestore;
  }

  const app = initializeFirebaseApp();
  firestore = getFirestore(app);

  // Connect to emulator in development
  if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true') {
    try {
      connectFirestoreEmulator(firestore, 'localhost', 8080);
    } catch (error) {
      // Emulator already connected or not available
      console.warn('Firebase Firestore emulator connection failed:', error);
    }
  }

  return firestore;
};

/**
 * Firebase Storage instance
 */
let storage: FirebaseStorage | null = null;

/**
 * Get Firebase Storage instance
 */
export const getFirebaseStorage = (): FirebaseStorage => {
  if (storage) {
    return storage;
  }

  const app = initializeFirebaseApp();
  storage = getStorage(app);

  // Connect to emulator in development
  if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true') {
    try {
      connectStorageEmulator(storage, 'localhost', 9199);
    } catch (error) {
      // Emulator already connected or not available
      console.warn('Firebase Storage emulator connection failed:', error);
    }
  }

  return storage;
};

/**
 * Firebase Functions instance
 */
let functions: Functions | null = null;

/**
 * Get Firebase Functions instance
 */
export const getFirebaseFunctions = (): Functions => {
  if (functions) {
    return functions;
  }

  const app = initializeFirebaseApp();
  functions = getFunctions(app);

  // Connect to emulator in development
  if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true') {
    try {
      connectFunctionsEmulator(functions, 'localhost', 5001);
    } catch (error) {
      // Emulator already connected or not available
      console.warn('Firebase Functions emulator connection failed:', error);
    }
  }

  return functions;
};

/**
 * Firebase Analytics instance
 */
let analytics: Analytics | null = null;

/**
 * Get Firebase Analytics instance
 */
export const getFirebaseAnalytics = (): Analytics | null => {
  if (analytics) {
    return analytics;
  }

  // Only initialize analytics in browser environment
  if (typeof window === 'undefined') {
    return null;
  }

  const app = initializeFirebaseApp();
  
  try {
    analytics = getAnalytics(app);
    return analytics;
  } catch (error) {
    console.warn('Firebase Analytics initialization failed:', error);
    return null;
  }
};

/**
 * Firebase service instances for easy access
 */
export const firebaseServices = {
  app: () => initializeFirebaseApp(),
  auth: () => getFirebaseAuth(),
  firestore: () => getFirebaseFirestore(),
  storage: () => getFirebaseStorage(),
  functions: () => getFirebaseFunctions(),
  analytics: () => getFirebaseAnalytics(),
};

/**
 * Firebase configuration validator
 */
export const validateFirebaseConfig = (): { isValid: boolean; errors: string[] } => {
  const config = getFirebaseConfig();
  const errors: string[] = [];

  if (!config.apiKey) errors.push('Firebase API key is missing');
  if (!config.authDomain) errors.push('Firebase auth domain is missing');
  if (!config.projectId) errors.push('Firebase project ID is missing');
  if (!config.storageBucket) errors.push('Firebase storage bucket is missing');
  if (!config.messagingSenderId) errors.push('Firebase messaging sender ID is missing');
  if (!config.appId) errors.push('Firebase app ID is missing');

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Firebase environment information
 */
export const getFirebaseEnvironment = () => {
  const config = getFirebaseConfig();
  
  return {
    projectId: config.projectId,
    environment: process.env.NODE_ENV,
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    useEmulators: process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true',
    hasAnalytics: !!config.measurementId,
  };
};

/**
 * Initialize all Firebase services
 */
export const initializeFirebaseServices = () => {
  try {
    const validation = validateFirebaseConfig();
    
    if (!validation.isValid) {
      throw new Error(`Firebase configuration is invalid: ${validation.errors.join(', ')}`);
    }

    // Initialize all services
    const app = firebaseServices.app();
    const auth = firebaseServices.auth();
    const firestore = firebaseServices.firestore();
    const storage = firebaseServices.storage();
    const functions = firebaseServices.functions();
    const analytics = firebaseServices.analytics();

    console.log('🔥 Firebase services initialized successfully');
    console.log('📊 Environment:', getFirebaseEnvironment());

    return {
      app,
      auth,
      firestore,
      storage,
      functions,
      analytics,
    };
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error);
    throw error;
  }
};

/**
 * Firebase error handler
 */
export const handleFirebaseError = (error: any): { code: string; message: string } => {
  const firebaseErrors: Record<string, string> = {
    'auth/user-not-found': 'No user found with this email address',
    'auth/wrong-password': 'Incorrect password',
    'auth/email-already-in-use': 'An account with this email already exists',
    'auth/weak-password': 'Password is too weak',
    'auth/invalid-email': 'Invalid email address',
    'auth/user-disabled': 'This account has been disabled',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later',
    'auth/operation-not-allowed': 'This operation is not allowed',
    'auth/requires-recent-login': 'Please log in again to complete this action',
    'auth/invalid-credential': 'Invalid credentials provided',
    'auth/account-exists-with-different-credential': 'An account already exists with this email',
    'firestore/permission-denied': 'You do not have permission to access this data',
    'firestore/unavailable': 'Firestore service is currently unavailable',
    'storage/unauthorized': 'You do not have permission to access this file',
    'storage/canceled': 'Upload was canceled',
    'storage/unknown': 'An unknown error occurred',
    'functions/unavailable': 'Cloud Functions service is currently unavailable',
  };

  const errorCode = error?.code || 'unknown';
  const errorMessage = firebaseErrors[errorCode] || error?.message || 'An unexpected error occurred';

  return {
    code: errorCode,
    message: errorMessage,
  };
};

/**
 * Firebase connection status
 */
export const getFirebaseConnectionStatus = async (): Promise<{
  connected: boolean;
  services: Record<string, boolean>;
}> => {
  const services: Record<string, boolean> = {
    auth: false,
    firestore: false,
    storage: false,
    functions: false,
    analytics: false,
  };

  try {
    // Test Auth
    try {
      await firebaseServices.auth().authStateReady();
      services.auth = true;
    } catch {
      services.auth = false;
    }

    // Test Firestore
    try {
      const firestore = firebaseServices.firestore();
      await firestore.enableNetwork();
      services.firestore = true;
    } catch {
      services.firestore = false;
    }

    // Test Storage
    try {
      const storage = firebaseServices.storage();
      // Storage doesn't have a direct connection test, assume connected if no error
      services.storage = true;
    } catch {
      services.storage = false;
    }

    // Test Functions
    try {
      const functions = firebaseServices.functions();
      // Functions doesn't have a direct connection test, assume connected if no error
      services.functions = true;
    } catch {
      services.functions = false;
    }

    // Test Analytics
    try {
      const analytics = firebaseServices.analytics();
      services.analytics = analytics !== null;
    } catch {
      services.analytics = false;
    }

    const connected = Object.values(services).every(status => status);

    return {
      connected,
      services,
    };
  } catch (error) {
    console.error('Error checking Firebase connection status:', error);
    return {
      connected: false,
      services,
    };
  }
};

// Export default configuration
export default {
  initializeFirebaseServices,
  firebaseServices,
  validateFirebaseConfig,
  getFirebaseEnvironment,
  handleFirebaseError,
  getFirebaseConnectionStatus,
};
