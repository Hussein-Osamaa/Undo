import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  UserCredential,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './config';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  businessIds: string[];
  role: 'owner' | 'manager' | 'staff';
  createdAt: string;
  updatedAt: string;
}

export interface Business {
  businessId: string;
  businessName: string;
  businessType: 'retail' | 'restaurant' | 'service' | 'ecommerce';
  storeType: 'physical' | 'online' | 'both';
  owner: {
    userId: string;
    email: string;
    name: string;
  };
  subscription: {
    plan: 'starter' | 'professional' | 'enterprise';
    status: 'active' | 'cancelled' | 'expired' | 'trial' | 'past_due';
    startDate: string;
    endDate: string;
    trialEndsAt: string | null;
  };
  settings: {
    currency: string;
    timezone: string;
    taxRate: number;
    logo: string | null;
    address: string;
    phone: string;
    email: string;
    website: string;
  };
  limits: {
    maxProducts: number;
    maxUsers: number;
    maxOrders: number;
  };
  usage: {
    currentProducts: number;
    currentUsers: number;
    currentMonthOrders: number;
  };
  metadata: {
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    lastActivityAt: string;
  };
}

// Authentication functions
export const authService = {
  // Sign in with email and password
  async signIn(email: string, password: string): Promise<UserCredential> {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Update last login time
      await this.updateUserLastLogin(result.user.uid);
      
      return result;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  },

  // Create new user account
  async signUp(
    email: string,
    password: string,
    displayName: string,
    businessName?: string
  ): Promise<{ user: User; business?: Business }> {
    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile
      await updateProfile(userCredential.user, {
        displayName,
      });

      // Create user profile in Firestore
      const userProfile: UserProfile = {
        uid: userCredential.user.uid,
        email: userCredential.user.email!,
        displayName,
        businessIds: [],
        role: 'owner',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await setDoc(doc(db, 'users', userCredential.user.uid), userProfile);

      let business: Business | undefined;

      // Create business if provided
      if (businessName) {
        business = await this.createBusiness(userCredential.user.uid, businessName, displayName, email);
        userProfile.businessIds = [business.businessId];
        await updateDoc(doc(db, 'users', userCredential.user.uid), {
          businessIds: [business.businessId],
          updatedAt: new Date().toISOString(),
        });
      }

      return { user: userCredential.user, business };
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  },

  // Sign out
  async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  },

  // Reset password
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  },

  // Create business
  async createBusiness(
    ownerId: string,
    businessName: string,
    ownerName: string,
    ownerEmail: string
  ): Promise<Business> {
    const businessId = `biz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const business: Business = {
      businessId,
      businessName,
      businessType: 'retail',
      storeType: 'physical',
      owner: {
        userId: ownerId,
        email: ownerEmail,
        name: ownerName,
      },
      subscription: {
        plan: 'starter',
        status: 'trial',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days trial
        trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      },
      settings: {
        currency: 'USD',
        timezone: 'America/New_York',
        taxRate: 0.08,
        logo: null,
        address: '',
        phone: '',
        email: ownerEmail,
        website: '',
      },
      limits: {
        maxProducts: 100,
        maxUsers: 1,
        maxOrders: 500,
      },
      usage: {
        currentProducts: 0,
        currentUsers: 1,
        currentMonthOrders: 0,
      },
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
        lastActivityAt: new Date().toISOString(),
      },
    };

    // Save business to Firestore
    await setDoc(doc(db, 'businesses', businessId), business);

    // Add owner as staff member
    await setDoc(doc(db, 'businesses', businessId, 'staff', ownerId), {
      userId: ownerId,
      email: ownerEmail,
      name: ownerName,
      role: 'owner',
      permissions: {
        canManageProducts: true,
        canManageOrders: true,
        canManageStaff: true,
        canViewReports: true,
        canManageFinance: true,
        canAccessPOS: true,
      },
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return business;
  },

  // Get user profile
  async getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return userDoc.data() as UserProfile;
      }
      return null;
    } catch (error) {
      console.error('Get user profile error:', error);
      throw error;
    }
  },

  // Get business details
  async getBusiness(businessId: string): Promise<Business | null> {
    try {
      const businessDoc = await getDoc(doc(db, 'businesses', businessId));
      if (businessDoc.exists()) {
        return businessDoc.data() as Business;
      }
      return null;
    } catch (error) {
      console.error('Get business error:', error);
      throw error;
    }
  },

  // Update user last login
  async updateUserLastLogin(uid: string): Promise<void> {
    try {
      await updateDoc(doc(db, 'users', uid), {
        lastLoginAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Update last login error:', error);
      // Don't throw error for this non-critical operation
    }
  },

  // Check if user has access to business
  async hasBusinessAccess(uid: string, businessId: string): Promise<boolean> {
    try {
      const userProfile = await this.getUserProfile(uid);
      if (!userProfile) return false;
      
      return userProfile.businessIds.includes(businessId);
    } catch (error) {
      console.error('Check business access error:', error);
      return false;
    }
  },
};
