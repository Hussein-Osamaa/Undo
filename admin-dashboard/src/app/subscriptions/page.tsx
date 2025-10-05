/**
 * Subscriptions management page
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, AlertTriangle, CheckCircle, Clock, DollarSign, TrendingUp } from 'lucide-react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { SubscriptionTable } from '@/components/subscriptions/SubscriptionTable';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@madas/shared';

interface Subscription {
  id: string;
  clientId: string;
  businessName: string;
  ownerName: string;
  email: string;
  plan: 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'cancelled' | 'past_due' | 'trialing' | 'unpaid';
  billingCycle: 'monthly' | 'yearly';
  amount: number;
  currency: string;
  nextBillingDate: string;
  startDate: string;
  endDate?: string;
  paymentMethod: string;
  trialEndsAt?: string;
  cancelAtPeriodEnd: boolean;
  failureCount: number;
  lastPaymentDate?: string;
  lastPaymentAmount?: number;
}

export default function SubscriptionsPage() {
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscriptionSelect = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    // TODO: Open subscription detail modal
    console.log('View subscription:', subscription);
  };

  const handleSubscriptionEdit = (subscription: Subscription) => {
    // TODO: Implement subscription editing
    console.log('Edit subscription:', subscription);
  };

  const handleSubscriptionCancel = (subscription: Subscription) => {
    // TODO: Implement subscription cancellation
    console.log('Cancel subscription:', subscription);
  };

  // Mock statistics
  const stats = {
    total: 847,
    active: 792,
    trialing: 156,
    pastDue: 23,
    cancelled: 12,
    monthlyRevenue: 42850,
    yearlyRevenue: 514200,
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Subscriptions</h1>
            <p className="text-gray-600 mt-1">
              Manage subscription plans, billing, and payment issues
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Failed Payments
            </Button>
            <Button variant="outline">
              <Clock className="w-4 h-4 mr-2" />
              Upcoming Renewals
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-blue-100">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Subscriptions</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-green-100">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Subscriptions</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.active.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-blue-100">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Trial Subscriptions</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.trialing.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-red-100">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Past Due</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.pastDue.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Revenue Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Monthly Recurring Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.monthlyRevenue)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-600 font-medium">+15.2%</p>
                    <p className="text-xs text-gray-500">vs last month</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Annual Recurring Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.yearlyRevenue)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-blue-600 font-medium">+18.7%</p>
                    <p className="text-xs text-gray-500">vs last year</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subscription Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900">Active</span>
                  </div>
                  <span className="text-sm text-gray-600">{stats.active}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900">Trial</span>
                  </div>
                  <span className="text-sm text-gray-600">{stats.trialing}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900">Past Due</span>
                  </div>
                  <span className="text-sm text-gray-600">{stats.pastDue}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900">Cancelled</span>
                  </div>
                  <span className="text-sm text-gray-600">{stats.cancelled}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <span>Failed Payments</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Clock className="w-6 h-6 text-yellow-600" />
                <span>Upcoming Renewals</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span>Retry Payments</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <CreditCard className="w-6 h-6 text-blue-600" />
                <span>Bulk Actions</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <SubscriptionTable
            onSubscriptionSelect={handleSubscriptionSelect}
            onSubscriptionEdit={handleSubscriptionEdit}
            onSubscriptionCancel={handleSubscriptionCancel}
            loading={isLoading}
          />
        </motion.div>
      </div>
    </AdminLayout>
  );
}
