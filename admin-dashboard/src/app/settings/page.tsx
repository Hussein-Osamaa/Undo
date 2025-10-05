/**
 * Platform settings page
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Globe,
  CreditCard,
  Mail,
  Shield,
  Users,
  Database,
  Bell,
  Palette,
  Key,
  Server,
  Monitor,
  Smartphone,
  Zap,
} from 'lucide-react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@madas/shared';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'billing' | 'email' | 'security' | 'integrations' | 'maintenance'>('general');
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSaving(false);
    setHasChanges(false);
  };

  const handleChange = () => {
    setHasChanges(true);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Zap },
    { id: 'maintenance', label: 'Maintenance', icon: Server },
  ];

  const GeneralSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Platform Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Platform Name
            </label>
            <Input
              defaultValue="MADAS"
              onChange={handleChange}
              placeholder="Enter platform name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Platform URL
            </label>
            <Input
              defaultValue="https://madas.com"
              onChange={handleChange}
              placeholder="Enter platform URL"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Support Email
            </label>
            <Input
              defaultValue="support@madas.com"
              onChange={handleChange}
              placeholder="Enter support email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timezone
            </label>
            <select
              defaultValue="UTC"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="UTC">UTC</option>
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
              <option value="Europe/London">London</option>
              <option value="Europe/Paris">Paris</option>
              <option value="Asia/Tokyo">Tokyo</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Branding</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo URL
            </label>
            <Input
              defaultValue="https://madas.com/logo.png"
              onChange={handleChange}
              placeholder="Enter logo URL"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Favicon URL
            </label>
            <Input
              defaultValue="https://madas.com/favicon.ico"
              onChange={handleChange}
              placeholder="Enter favicon URL"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                defaultValue="#3B82F6"
                onChange={handleChange}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <Input
                defaultValue="#3B82F6"
                onChange={handleChange}
                placeholder="#3B82F6"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const BillingSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Stripe Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stripe Publishable Key
            </label>
            <Input
              type="password"
              defaultValue="pk_live_..."
              onChange={handleChange}
              placeholder="Enter Stripe publishable key"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stripe Secret Key
            </label>
            <Input
              type="password"
              defaultValue="sk_live_..."
              onChange={handleChange}
              placeholder="Enter Stripe secret key"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Webhook Secret
            </label>
            <Input
              type="password"
              defaultValue="whsec_..."
              onChange={handleChange}
              placeholder="Enter webhook secret"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pricing Plans</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Starter Plan</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Monthly Price</span>
                  <Input
                    defaultValue="$29"
                    onChange={handleChange}
                    className="w-20"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Yearly Price</span>
                  <Input
                    defaultValue="$290"
                    onChange={handleChange}
                    className="w-20"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Professional Plan</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Monthly Price</span>
                  <Input
                    defaultValue="$79"
                    onChange={handleChange}
                    className="w-20"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Yearly Price</span>
                  <Input
                    defaultValue="$790"
                    onChange={handleChange}
                    className="w-20"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Enterprise Plan</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Monthly Price</span>
                  <Input
                    defaultValue="$199"
                    onChange={handleChange}
                    className="w-20"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Yearly Price</span>
                  <Input
                    defaultValue="$1990"
                    onChange={handleChange}
                    className="w-20"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const EmailSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>SMTP Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SMTP Host
            </label>
            <Input
              defaultValue="smtp.gmail.com"
              onChange={handleChange}
              placeholder="Enter SMTP host"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SMTP Port
            </label>
            <Input
              defaultValue="587"
              onChange={handleChange}
              placeholder="Enter SMTP port"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SMTP Username
            </label>
            <Input
              defaultValue="noreply@madas.com"
              onChange={handleChange}
              placeholder="Enter SMTP username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SMTP Password
            </label>
            <Input
              type="password"
              defaultValue="••••••••"
              onChange={handleChange}
              placeholder="Enter SMTP password"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              'Welcome Email',
              'Password Reset',
              'Subscription Confirmation',
              'Payment Receipt',
              'Trial Ending',
              'Account Suspended',
            ].map((template, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <span className="text-sm font-medium text-gray-900">{template}</span>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const SecuritySettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Admin Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600">Require 2FA for all admin accounts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Session Timeout</h4>
              <p className="text-sm text-gray-600">Automatically log out inactive admins</p>
            </div>
            <select
              defaultValue="24"
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="1">1 hour</option>
              <option value="8">8 hours</option>
              <option value="24">24 hours</option>
              <option value="168">7 days</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">IP Whitelist</h4>
              <p className="text-sm text-gray-600">Restrict admin access to specific IPs</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Admin Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'John Doe', email: 'john@madas.com', role: 'Super Admin', lastLogin: '2 hours ago' },
              { name: 'Jane Smith', email: 'jane@madas.com', role: 'Admin', lastLogin: '1 day ago' },
              { name: 'Mike Johnson', email: 'mike@madas.com', role: 'Support', lastLogin: '3 days ago' },
            ].map((admin, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">
                      {admin.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{admin.name}</div>
                    <div className="text-sm text-gray-600">{admin.email}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {admin.role}
                  </span>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              <Users className="w-4 h-4 mr-2" />
              Add New Admin
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const IntegrationsSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Third-Party Integrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'Google Analytics', description: 'Track website analytics', status: 'connected', icon: Monitor },
              { name: 'Sentry', description: 'Error tracking and monitoring', status: 'connected', icon: AlertTriangle },
              { name: 'Slack', description: 'Team notifications', status: 'disconnected', icon: Bell },
              { name: 'Zapier', description: 'Automation workflows', status: 'connected', icon: Zap },
            ].map((integration, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <integration.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{integration.name}</div>
                    <div className="text-sm text-gray-600">{integration.description}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    integration.status === 'connected'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {integration.status}
                  </span>
                  <Button variant="outline" size="sm">
                    {integration.status === 'connected' ? 'Configure' : 'Connect'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const MaintenanceSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Maintenance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Maintenance Mode</h4>
              <p className="text-sm text-gray-600">Enable maintenance mode for system updates</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maintenance Message
            </label>
            <textarea
              defaultValue="We're currently performing scheduled maintenance. We'll be back shortly!"
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Database Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Last Backup</h4>
              <p className="text-sm text-gray-600">2 hours ago</p>
            </div>
            <Button variant="outline" size="sm">
              <Database className="w-4 h-4 mr-2" />
              Create Backup
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Database Size</h4>
              <p className="text-sm text-gray-600">2.3 GB</p>
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Optimize
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Platform Version</span>
                <span className="text-sm font-medium text-gray-900">v1.2.3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Node.js Version</span>
                <span className="text-sm font-medium text-gray-900">v18.17.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Database Version</span>
                <span className="text-sm font-medium text-gray-900">PostgreSQL 14.7</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Server Uptime</span>
                <span className="text-sm font-medium text-gray-900">99.97%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Memory Usage</span>
                <span className="text-sm font-medium text-gray-900">2.1 GB / 8 GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Disk Usage</span>
                <span className="text-sm font-medium text-gray-900">45 GB / 100 GB</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings />;
      case 'billing':
        return <BillingSettings />;
      case 'email':
        return <EmailSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'integrations':
        return <IntegrationsSettings />;
      case 'maintenance':
        return <MaintenanceSettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Platform Settings</h1>
            <p className="text-gray-600 mt-1">
              Configure your platform settings, integrations, and preferences
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            {hasChanges && (
              <div className="flex items-center space-x-2 text-orange-600">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">Unsaved changes</span>
              </div>
            )}
            <Button
              onClick={handleSave}
              isLoading={isSaving}
              disabled={!hasChanges || isSaving}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Settings Tabs */}
        <Card>
          <CardHeader>
            <div className="border-b border-gray-200">
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
          </CardHeader>
          <CardContent>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {renderTabContent()}
            </motion.div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'API Status', status: 'operational', icon: Server },
                { name: 'Database', status: 'operational', icon: Database },
                { name: 'Email Service', status: 'operational', icon: Mail },
                { name: 'Payment Gateway', status: 'operational', icon: CreditCard },
              ].map((service, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <service.icon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{service.name}</div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600 capitalize">{service.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
