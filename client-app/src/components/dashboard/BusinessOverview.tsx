'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useBusiness } from '@/lib/providers/BusinessProvider';
import { Calendar, MapPin, Phone, Mail, Globe, CreditCard } from 'lucide-react';

export function BusinessOverview() {
  const { currentBusiness } = useBusiness();

  if (!currentBusiness) {
    return null;
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'enterprise':
        return 'bg-purple-100 text-purple-800';
      case 'professional':
        return 'bg-blue-100 text-blue-800';
      case 'starter':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success-100 text-success-800';
      case 'trial':
        return 'bg-warning-100 text-warning-800';
      case 'past_due':
        return 'bg-danger-100 text-danger-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrialDaysLeft = () => {
    if (currentBusiness.subscription.status !== 'trial' || !currentBusiness.subscription.trialEndsAt) {
      return null;
    }
    
    const trialEnd = new Date(currentBusiness.subscription.trialEndsAt);
    const now = new Date();
    const daysLeft = Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    return daysLeft > 0 ? daysLeft : 0;
  };

  const trialDaysLeft = getTrialDaysLeft();

  return (
    <div className="bg-white rounded-lg shadow-soft p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Business Overview</h3>
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPlanColor(currentBusiness.subscription.plan)}`}>
            {currentBusiness.subscription.plan.charAt(0).toUpperCase() + currentBusiness.subscription.plan.slice(1)}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentBusiness.subscription.status)}`}>
            {currentBusiness.subscription.status.charAt(0).toUpperCase() + currentBusiness.subscription.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Business Info */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-gray-500" />
            Business Information
          </h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-500">Name:</span>
              <span className="ml-2 font-medium text-gray-900">{currentBusiness.businessName}</span>
            </div>
            <div>
              <span className="text-gray-500">Type:</span>
              <span className="ml-2 font-medium text-gray-900 capitalize">{currentBusiness.businessType}</span>
            </div>
            <div>
              <span className="text-gray-500">Store Type:</span>
              <span className="ml-2 font-medium text-gray-900 capitalize">{currentBusiness.storeType}</span>
            </div>
            {currentBusiness.settings.address && (
              <div>
                <span className="text-gray-500">Address:</span>
                <span className="ml-2 font-medium text-gray-900">{currentBusiness.settings.address}</span>
              </div>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 flex items-center">
            <Phone className="w-4 h-4 mr-2 text-gray-500" />
            Contact Information
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2 text-gray-400" />
              <span className="font-medium text-gray-900">{currentBusiness.settings.email}</span>
            </div>
            {currentBusiness.settings.phone && (
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-gray-400" />
                <span className="font-medium text-gray-900">{currentBusiness.settings.phone}</span>
              </div>
            )}
            {currentBusiness.settings.website && (
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2 text-gray-400" />
                <a
                  href={currentBusiness.settings.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary-600 hover:text-primary-700"
                >
                  {currentBusiness.settings.website}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Subscription Info */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 flex items-center">
            <CreditCard className="w-4 h-4 mr-2 text-gray-500" />
            Subscription
          </h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-500">Plan:</span>
              <span className="ml-2 font-medium text-gray-900 capitalize">{currentBusiness.subscription.plan}</span>
            </div>
            <div>
              <span className="text-gray-500">Started:</span>
              <span className="ml-2 font-medium text-gray-900">
                {new Date(currentBusiness.subscription.startDate).toLocaleDateString()}
              </span>
            </div>
            {currentBusiness.subscription.status === 'trial' && trialDaysLeft !== null && (
              <div className="mt-3 p-3 bg-warning-50 border border-warning-200 rounded-lg">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-warning-600 mr-2" />
                  <span className="text-warning-800 font-medium">
                    {trialDaysLeft > 0 
                      ? `${trialDaysLeft} days left in trial`
                      : 'Trial expired'
                    }
                  </span>
                </div>
                {trialDaysLeft > 0 && trialDaysLeft <= 7 && (
                  <p className="text-warning-700 text-xs mt-1">
                    Consider upgrading to continue using all features.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Usage Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-4">Usage Statistics</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900">{currentBusiness.usage.currentProducts}</div>
            <div className="text-sm text-gray-500">Products</div>
            <div className="text-xs text-gray-400 mt-1">
              of {currentBusiness.limits.maxProducts} limit
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900">{currentBusiness.usage.currentUsers}</div>
            <div className="text-sm text-gray-500">Staff Members</div>
            <div className="text-xs text-gray-400 mt-1">
              of {currentBusiness.limits.maxUsers} limit
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900">{currentBusiness.usage.currentMonthOrders}</div>
            <div className="text-sm text-gray-500">Orders This Month</div>
            <div className="text-xs text-gray-400 mt-1">
              {currentBusiness.limits.maxOrders === -1 ? 'Unlimited' : `of ${currentBusiness.limits.maxOrders} limit`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
