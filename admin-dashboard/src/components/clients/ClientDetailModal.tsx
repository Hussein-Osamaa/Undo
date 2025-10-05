/**
 * Client detail modal with comprehensive information
 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Mail,
  Phone,
  Globe,
  MapPin,
  Calendar,
  DollarSign,
  Package,
  Users,
  CreditCard,
  Activity,
  AlertTriangle,
  CheckCircle,
  Edit,
  MessageSquare,
  ExternalLink,
} from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle, Modal } from '@madas/shared';

interface Client {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  plan: 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'trial' | 'cancelled' | 'past_due';
  signupDate: string;
  lastActivity: string;
  revenue: number;
  orders: number;
  products: number;
  users: number;
  location: string;
  website?: string;
}

interface ClientDetailModalProps {
  client: Client | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (client: Client) => void;
}

export const ClientDetailModal: React.FC<ClientDetailModalProps> = ({
  client,
  isOpen,
  onClose,
  onEdit,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'subscription' | 'usage' | 'activity'>('overview');

  if (!client) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: Client['status']) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'trial':
        return 'text-blue-600 bg-blue-100';
      case 'cancelled':
        return 'text-gray-600 bg-gray-100';
      case 'past_due':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPlanColor = (plan: Client['plan']) => {
    switch (plan) {
      case 'starter':
        return 'text-gray-600 bg-gray-100';
      case 'professional':
        return 'text-blue-600 bg-blue-100';
      case 'enterprise':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'usage', label: 'Usage', icon: Package },
    { id: 'activity', label: 'Activity', icon: Calendar },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{client.businessName}</h2>
          <p className="text-gray-600">{client.ownerName}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit?.(client)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Status and Plan Badges */}
      <div className="flex items-center space-x-4 mb-6">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(client.status)}`}>
          {client.status === 'active' && <CheckCircle className="w-4 h-4 mr-1" />}
          {client.status === 'trial' && <Activity className="w-4 h-4 mr-1" />}
          {client.status === 'past_due' && <AlertTriangle className="w-4 h-4 mr-1" />}
          {client.status.charAt(0).toUpperCase() + client.status.slice(1).replace('_', ' ')}
        </span>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPlanColor(client.plan)}`}>
          {client.plan.charAt(0).toUpperCase() + client.plan.slice(1)}
        </span>
        {client.website && (
          <a
            href={`https://${client.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            Website
          </a>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Business Information */}
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {client.businessName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{client.businessName}</h3>
                    <p className="text-sm text-gray-600">Business Account</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Email</p>
                      <p className="text-sm text-gray-600">{client.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Phone</p>
                      <p className="text-sm text-gray-600">{client.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Location</p>
                      <p className="text-sm text-gray-600">{client.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Signup Date</p>
                      <p className="text-sm text-gray-600">{formatDate(client.signupDate)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <DollarSign className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">
                      {formatCurrency(client.revenue)}
                    </div>
                    <div className="text-sm text-gray-600">Total Revenue</div>
                  </div>

                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Package className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">
                      {client.orders.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Total Orders</div>
                  </div>

                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Package className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">
                      {client.products}
                    </div>
                    <div className="text-sm text-gray-600">Products</div>
                  </div>

                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <Users className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">
                      {client.users}
                    </div>
                    <div className="text-sm text-gray-600">Team Members</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'subscription' && (
          <Card>
            <CardHeader>
              <CardTitle>Subscription Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Current Plan</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plan</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPlanColor(client.plan)}`}>
                        {client.plan.charAt(0).toUpperCase() + client.plan.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                        {client.status.charAt(0).toUpperCase() + client.status.slice(1).replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Billing Cycle</span>
                      <span className="text-gray-900">Monthly</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Next Billing</span>
                      <span className="text-gray-900">Feb 15, 2024</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Payment Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Method</span>
                      <span className="text-gray-900">•••• •••• •••• 4242</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Payment</span>
                      <span className="text-gray-900">Jan 15, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount</span>
                      <span className="text-gray-900">$79.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Status</span>
                      <span className="text-green-600">✓ Successful</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Plan Limits</h4>
                  <Button variant="outline" size="sm">
                    Upgrade Plan
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Products</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {client.products} / {client.plan === 'starter' ? '100' : client.plan === 'professional' ? '1,000' : 'Unlimited'}
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Team Members</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {client.users} / {client.plan === 'starter' ? '1' : client.plan === 'professional' ? '5' : 'Unlimited'}
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Orders/Month</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {client.orders > 500 ? '500+' : client.orders} / {client.plan === 'starter' ? '500' : 'Unlimited'}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'usage' && (
          <Card>
            <CardHeader>
              <CardTitle>Usage Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">This Month</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Orders Processed</span>
                        <span className="text-gray-900">247</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '82%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">API Calls</span>
                        <span className="text-gray-900">12,456</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Storage Used</span>
                        <span className="text-gray-900">2.3 GB</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '23%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Top Features</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Point of Sale</span>
                      <span className="text-sm font-medium text-gray-900">89% usage</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Inventory Management</span>
                      <span className="text-sm font-medium text-gray-900">76% usage</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Analytics Dashboard</span>
                      <span className="text-sm font-medium text-gray-900">64% usage</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Customer Management</span>
                      <span className="text-sm font-medium text-gray-900">52% usage</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Staff Management</span>
                      <span className="text-sm font-medium text-gray-900">38% usage</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'activity' && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: 'Logged in to dashboard',
                    time: '2 hours ago',
                    type: 'login',
                  },
                  {
                    action: 'Updated product inventory',
                    time: '4 hours ago',
                    type: 'update',
                  },
                  {
                    action: 'Processed 5 new orders',
                    time: '6 hours ago',
                    type: 'order',
                  },
                  {
                    action: 'Added new team member',
                    time: '1 day ago',
                    type: 'user',
                  },
                  {
                    action: 'Exported sales report',
                    time: '2 days ago',
                    type: 'export',
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-6 border-t">
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <MessageSquare className="w-4 h-4 mr-2" />
            Contact Support
          </Button>
          <Button variant="outline">
            <Mail className="w-4 h-4 mr-2" />
            Send Email
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => onEdit?.(client)}>
            Edit Client
          </Button>
        </div>
      </div>
    </Modal>
  );
};
