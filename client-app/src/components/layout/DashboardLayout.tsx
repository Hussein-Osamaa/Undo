'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/providers/AuthProvider';
import { useBusiness } from '@/lib/providers/BusinessProvider';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { LoginPage } from '@/components/auth/LoginPage';
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, loading: authLoading } = useAuth();
  const { currentBusiness, loading: businessLoading } = useBusiness();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Check if user needs onboarding
  const needsOnboarding = user && !currentBusiness;

  // Show loading spinner while checking authentication
  if (authLoading || businessLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-dots mb-4">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!user) {
    return <LoginPage />;
  }

  // Show onboarding if user doesn't have a business
  if (needsOnboarding) {
    return <OnboardingWizard />;
  }

  // Show main dashboard layout
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
