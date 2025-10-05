/**
 * Subscription table component with filtering and management actions
 */

'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  Edit,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Calendar,
  User,
} from 'lucide-react';
import { Button, Input, Card, CardContent, CardHeader, CardTitle } from '@madas/shared';

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

interface SubscriptionTableProps {
  subscriptions: Subscription[];
  onSubscriptionSelect?: (subscription: Subscription) => void;
  onSubscriptionEdit?: (subscription: Subscription) => void;
  onSubscriptionCancel?: (subscription: Subscription) => void;
  loading?: boolean;
}

const mockSubscriptions: Subscription[] = [
  {
    id: 'sub_1',
    clientId: '1',
    businessName: "Bella's Boutique",
    ownerName: 'Sarah Johnson',
    email: 'sarah@bellasboutique.com',
    plan: 'professional',
    status: 'active',
    billingCycle: 'monthly',
    amount: 79,
    currency: 'USD',
    nextBillingDate: '2024-02-15',
    startDate: '2024-01-15',
    paymentMethod: '•••• 4242',
    lastPaymentDate: '2024-01-15',
    lastPaymentAmount: 79,
    failureCount: 0,
    cancelAtPeriodEnd: false,
  },
  {
    id: 'sub_2',
    clientId: '2',
    businessName: 'TechStore Pro',
    ownerName: 'Michael Chen',
    email: 'michael@techstorepro.com',
    plan: 'enterprise',
    status: 'active',
    billingCycle: 'yearly',
    amount: 1990,
    currency: 'USD',
    nextBillingDate: '2025-01-10',
    startDate: '2024-01-10',
    paymentMethod: '•••• 5555',
    lastPaymentDate: '2024-01-10',
    lastPaymentAmount: 1990,
    failureCount: 0,
    cancelAtPeriodEnd: false,
  },
  {
    id: 'sub_3',
    clientId: '3',
    businessName: 'Green Earth Café',
    ownerName: 'Emily Rodriguez',
    email: 'emily@greenearthcafe.com',
    plan: 'starter',
    status: 'trialing',
    billingCycle: 'monthly',
    amount: 29,
    currency: 'USD',
    nextBillingDate: '2024-02-01',
    startDate: '2024-01-18',
    trialEndsAt: '2024-02-01',
    paymentMethod: '•••• 1234',
    failureCount: 0,
    cancelAtPeriodEnd: false,
  },
  {
    id: 'sub_4',
    clientId: '4',
    businessName: 'Fashion Forward',
    ownerName: 'David Thompson',
    email: 'david@fashionforward.com',
    plan: 'professional',
    status: 'past_due',
    billingCycle: 'monthly',
    amount: 79,
    currency: 'USD',
    nextBillingDate: '2024-01-05',
    startDate: '2024-01-05',
    paymentMethod: '•••• 7890',
    lastPaymentDate: '2023-12-05',
    lastPaymentAmount: 79,
    failureCount: 2,
    cancelAtPeriodEnd: false,
  },
  {
    id: 'sub_5',
    clientId: '5',
    businessName: 'Urban Fashion Co.',
    ownerName: 'Lisa Park',
    email: 'lisa@urbanfashion.com',
    plan: 'enterprise',
    status: 'cancelled',
    billingCycle: 'monthly',
    amount: 199,
    currency: 'USD',
    nextBillingDate: '2024-01-12',
    startDate: '2024-01-12',
    endDate: '2024-01-12',
    paymentMethod: '•••• 2468',
    lastPaymentDate: '2024-01-12',
    lastPaymentAmount: 199,
    failureCount: 0,
    cancelAtPeriodEnd: true,
  },
];

export const SubscriptionTable: React.FC<SubscriptionTableProps> = ({
  subscriptions = mockSubscriptions,
  onSubscriptionSelect,
  onSubscriptionEdit,
  onSubscriptionCancel,
  loading = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [planFilter, setPlanFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof Subscription>('nextBillingDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<string[]>([]);

  const filteredAndSortedSubscriptions = useMemo(() => {
    let filtered = subscriptions.filter(subscription => {
      const matchesSearch = 
        subscription.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subscription.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subscription.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || subscription.status === statusFilter;
      const matchesPlan = planFilter === 'all' || subscription.plan === planFilter;
      
      return matchesSearch && matchesStatus && matchesPlan;
    });

    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });

    return filtered;
  }, [subscriptions, searchQuery, statusFilter, planFilter, sortField, sortDirection]);

  const handleSort = (field: keyof Subscription) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectSubscription = (subscriptionId: string) => {
    setSelectedSubscriptions(prev =>
      prev.includes(subscriptionId)
        ? prev.filter(id => id !== subscriptionId)
        : [...prev, subscriptionId]
    );
  };

  const handleSelectAll = () => {
    setSelectedSubscriptions(
      selectedSubscriptions.length === filteredAndSortedSubscriptions.length
        ? []
        : filteredAndSortedSubscriptions.map(subscription => subscription.id)
    );
  };

  const getStatusBadge = (status: Subscription['status']) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Active', icon: CheckCircle },
      trialing: { color: 'bg-blue-100 text-blue-800', label: 'Trial', icon: Clock },
      past_due: { color: 'bg-red-100 text-red-800', label: 'Past Due', icon: AlertTriangle },
      cancelled: { color: 'bg-gray-100 text-gray-800', label: 'Cancelled', icon: CheckCircle },
      unpaid: { color: 'bg-orange-100 text-orange-800', label: 'Unpaid', icon: AlertTriangle },
    };

    const config = statusConfig[status];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    );
  };

  const getPlanBadge = (plan: Subscription['plan']) => {
    const planConfig = {
      starter: { color: 'bg-gray-100 text-gray-800', label: 'Starter' },
      professional: { color: 'bg-blue-100 text-blue-800', label: 'Professional' },
      enterprise: { color: 'bg-purple-100 text-purple-800', label: 'Enterprise' },
    };

    const config = planConfig[plan];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getDaysUntilBilling = (dateString: string) => {
    const today = new Date();
    const billingDate = new Date(dateString);
    const diffTime = billingDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse flex items-center space-x-4">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Subscriptions ({filteredAndSortedSubscriptions.length})</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Filters */}
        <div className="filter-bar mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search subscriptions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="trialing">Trial</option>
              <option value="past_due">Past Due</option>
              <option value="cancelled">Cancelled</option>
              <option value="unpaid">Unpaid</option>
            </select>

            {/* Plan Filter */}
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Plans</option>
              <option value="starter">Starter</option>
              <option value="professional">Professional</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedSubscriptions.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">
                {selectedSubscriptions.length} subscription(s) selected
              </span>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Retry Payments
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedSubscriptions.length === filteredAndSortedSubscriptions.length && filteredAndSortedSubscriptions.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </th>
                <th>
                  <button
                    onClick={() => handleSort('businessName')}
                    className="flex items-center space-x-1 font-medium hover:text-primary"
                  >
                    <span>Business</span>
                    {sortField === 'businessName' && (
                      <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th>
                <th>Plan</th>
                <th>
                  <button
                    onClick={() => handleSort('status')}
                    className="flex items-center space-x-1 font-medium hover:text-primary"
                  >
                    <span>Status</span>
                    {sortField === 'status' && (
                      <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => handleSort('amount')}
                    className="flex items-center space-x-1 font-medium hover:text-primary"
                  >
                    <span>Amount</span>
                    {sortField === 'amount' && (
                      <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => handleSort('nextBillingDate')}
                    className="flex items-center space-x-1 font-medium hover:text-primary"
                  >
                    <span>Next Billing</span>
                    {sortField === 'nextBillingDate' && (
                      <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th>
                <th>Payment Method</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedSubscriptions.map((subscription) => {
                const daysUntilBilling = getDaysUntilBilling(subscription.nextBillingDate);
                
                return (
                  <motion.tr
                    key={subscription.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => onSubscriptionSelect?.(subscription)}
                  >
                    <td onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedSubscriptions.includes(subscription.id)}
                        onChange={() => handleSelectSubscription(subscription.id)}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </td>
                    <td>
                      <div>
                        <div className="font-medium text-gray-900">{subscription.businessName}</div>
                        <div className="text-sm text-gray-500">{subscription.ownerName}</div>
                        <div className="text-xs text-gray-400">{subscription.email}</div>
                      </div>
                    </td>
                    <td>
                      <div>
                        {getPlanBadge(subscription.plan)}
                        <div className="text-xs text-gray-500 mt-1 capitalize">
                          {subscription.billingCycle}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        {getStatusBadge(subscription.status)}
                        {subscription.failureCount > 0 && (
                          <div className="text-xs text-red-600 mt-1">
                            {subscription.failureCount} failed attempt(s)
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(subscription.amount, subscription.currency)}
                      </div>
                      {subscription.lastPaymentAmount && (
                        <div className="text-xs text-gray-500">
                          Last: {formatCurrency(subscription.lastPaymentAmount, subscription.currency)}
                        </div>
                      )}
                    </td>
                    <td>
                      <div className="text-sm text-gray-900">
                        {formatDate(subscription.nextBillingDate)}
                      </div>
                      <div className={`text-xs ${
                        daysUntilBilling < 0 ? 'text-red-600' :
                        daysUntilBilling <= 3 ? 'text-yellow-600' :
                        'text-gray-500'
                      }`}>
                        {daysUntilBilling < 0 ? `${Math.abs(daysUntilBilling)} days overdue` :
                         daysUntilBilling === 0 ? 'Today' :
                         daysUntilBilling === 1 ? 'Tomorrow' :
                         `${daysUntilBilling} days`}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{subscription.paymentMethod}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSubscriptionSelect?.(subscription);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSubscriptionEdit?.(subscription);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSubscriptionCancel?.(subscription);
                          }}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredAndSortedSubscriptions.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No subscriptions found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery || statusFilter !== 'all' || planFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'No subscriptions have been created yet'}
            </p>
            {(searchQuery || statusFilter !== 'all' || planFilter !== 'all') && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                  setPlanFilter('all');
                }}
              >
                Clear filters
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
