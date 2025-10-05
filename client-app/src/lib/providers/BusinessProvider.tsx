'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import { authService, Business } from '@/lib/firebase/auth';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

interface BusinessContextType {
  currentBusiness: Business | null;
  businesses: Business[];
  loading: boolean;
  switchBusiness: (businessId: string) => Promise<void>;
  updateBusinessSettings: (settings: Partial<Business['settings']>) => Promise<void>;
  refreshBusiness: () => Promise<void>;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export function useBusiness() {
  const context = useContext(BusinessContext);
  if (context === undefined) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
}

export function BusinessProvider({ children }: { children: React.ReactNode }) {
  const { user, userProfile } = useAuth();
  const [currentBusiness, setCurrentBusiness] = useState<Business | null>(null);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  // Listen to current business changes
  useEffect(() => {
    if (!user || !userProfile?.businessIds.length) {
      setCurrentBusiness(null);
      setBusinesses([]);
      setLoading(false);
      return;
    }

    let unsubscribe: (() => void) | undefined;

    const loadBusinesses = async () => {
      try {
        setLoading(true);
        
        // Load all user's businesses
        const businessPromises = userProfile.businessIds.map(businessId => 
          authService.getBusiness(businessId)
        );
        
        const businessResults = await Promise.all(businessPromises);
        const validBusinesses = businessResults.filter(Boolean) as Business[];
        
        setBusinesses(validBusinesses);
        
        // Set current business (first one or from localStorage)
        const savedBusinessId = localStorage.getItem('currentBusinessId');
        const businessToSet = savedBusinessId 
          ? validBusinesses.find(b => b.businessId === savedBusinessId) || validBusinesses[0]
          : validBusinesses[0];
          
        if (businessToSet) {
          setCurrentBusiness(businessToSet);
          localStorage.setItem('currentBusinessId', businessToSet.businessId);
          
          // Listen to real-time updates for current business
          unsubscribe = onSnapshot(
            doc(db, 'businesses', businessToSet.businessId),
            (doc) => {
              if (doc.exists()) {
                const updatedBusiness = doc.data() as Business;
                setCurrentBusiness(updatedBusiness);
                
                // Update in businesses array
                setBusinesses(prev => 
                  prev.map(b => 
                    b.businessId === updatedBusiness.businessId ? updatedBusiness : b
                  )
                );
              }
            },
            (error) => {
              console.error('Business listener error:', error);
            }
          );
        }
      } catch (error) {
        console.error('Load businesses error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBusinesses();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, userProfile]);

  const switchBusiness = async (businessId: string) => {
    try {
      const business = businesses.find(b => b.businessId === businessId);
      if (business) {
        setCurrentBusiness(business);
        localStorage.setItem('currentBusinessId', businessId);
      } else {
        // If not in cache, fetch from Firestore
        const fetchedBusiness = await authService.getBusiness(businessId);
        if (fetchedBusiness) {
          setCurrentBusiness(fetchedBusiness);
          localStorage.setItem('currentBusinessId', businessId);
        }
      }
    } catch (error) {
      console.error('Switch business error:', error);
      throw error;
    }
  };

  const updateBusinessSettings = async (settings: Partial<Business['settings']>) => {
    if (!currentBusiness) {
      throw new Error('No current business selected');
    }

    try {
      await updateDoc(doc(db, 'businesses', currentBusiness.businessId), {
        settings: {
          ...currentBusiness.settings,
          ...settings,
        },
        'metadata.updatedAt': new Date().toISOString(),
        'metadata.lastActivityAt': new Date().toISOString(),
      });
    } catch (error) {
      console.error('Update business settings error:', error);
      throw error;
    }
  };

  const refreshBusiness = async () => {
    if (!currentBusiness) return;

    try {
      const refreshedBusiness = await authService.getBusiness(currentBusiness.businessId);
      if (refreshedBusiness) {
        setCurrentBusiness(refreshedBusiness);
      }
    } catch (error) {
      console.error('Refresh business error:', error);
      throw error;
    }
  };

  const value: BusinessContextType = {
    currentBusiness,
    businesses,
    loading,
    switchBusiness,
    updateBusinessSettings,
    refreshBusiness,
  };

  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  );
}
