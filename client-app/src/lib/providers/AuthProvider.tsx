'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, authService, UserProfile, Business } from '@/lib/firebase/auth';
import { toast } from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  currentBusiness: Business | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string, businessName?: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  switchBusiness: (businessId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentBusiness, setCurrentBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          setUser(user);
          
          // Load user profile
          const profile = await authService.getUserProfile(user.uid);
          setUserProfile(profile);
          
          // Load first business if available
          if (profile?.businessIds.length > 0) {
            const business = await authService.getBusiness(profile.businessIds[0]);
            setCurrentBusiness(business);
          }
        } else {
          setUser(null);
          setUserProfile(null);
          setCurrentBusiness(null);
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        toast.error('Failed to load user data');
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      await authService.signIn(email, password);
      toast.success('Welcome back!');
    } catch (error: any) {
      console.error('Sign in error:', error);
      
      // Handle specific error messages
      switch (error.code) {
        case 'auth/user-not-found':
          toast.error('No account found with this email address');
          break;
        case 'auth/wrong-password':
          toast.error('Incorrect password');
          break;
        case 'auth/invalid-email':
          toast.error('Invalid email address');
          break;
        case 'auth/too-many-requests':
          toast.error('Too many failed attempts. Please try again later');
          break;
        default:
          toast.error('Failed to sign in. Please try again');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, displayName: string, businessName?: string) => {
    try {
      setLoading(true);
      const result = await authService.signUp(email, password, displayName, businessName);
      
      if (result.business) {
        toast.success(`Welcome to MADAS! Your business "${businessName}" has been created.`);
      } else {
        toast.success('Account created successfully!');
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      
      // Handle specific error messages
      switch (error.code) {
        case 'auth/email-already-in-use':
          toast.error('An account with this email already exists');
          break;
        case 'auth/invalid-email':
          toast.error('Invalid email address');
          break;
        case 'auth/weak-password':
          toast.error('Password should be at least 6 characters');
          break;
        default:
          toast.error('Failed to create account. Please try again');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await authService.signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await authService.resetPassword(email);
      toast.success('Password reset email sent!');
    } catch (error: any) {
      console.error('Reset password error:', error);
      
      switch (error.code) {
        case 'auth/user-not-found':
          toast.error('No account found with this email address');
          break;
        case 'auth/invalid-email':
          toast.error('Invalid email address');
          break;
        default:
          toast.error('Failed to send reset email. Please try again');
      }
      throw error;
    }
  };

  const switchBusiness = async (businessId: string) => {
    try {
      const business = await authService.getBusiness(businessId);
      if (business) {
        setCurrentBusiness(business);
        toast.success(`Switched to ${business.businessName}`);
      } else {
        toast.error('Business not found');
      }
    } catch (error) {
      console.error('Switch business error:', error);
      toast.error('Failed to switch business');
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    userProfile,
    currentBusiness,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    switchBusiness,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
