/**
 * Admin sidebar navigation component
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  BarChart3,
  MessageSquare,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  Bell,
  Shield,
  Database,
  Globe,
  Mail,
  FileText,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@madas/shared';

interface AdminSidebarProps {
  className?: string;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'clients',
    label: 'Clients',
    href: '/clients',
    icon: Users,
    badge: 847,
    children: [
      {
        id: 'all-clients',
        label: 'All Clients',
        href: '/clients',
        icon: Users,
      },
      {
        id: 'new-clients',
        label: 'New This Month',
        href: '/clients/new',
        icon: Users,
        badge: 23,
      },
      {
        id: 'trial-clients',
        label: 'Trial Users',
        href: '/clients/trial',
        icon: Users,
        badge: 156,
      },
    ],
  },
  {
    id: 'subscriptions',
    label: 'Subscriptions',
    href: '/subscriptions',
    icon: CreditCard,
    badge: 12,
    children: [
      {
        id: 'all-subscriptions',
        label: 'All Subscriptions',
        href: '/subscriptions',
        icon: CreditCard,
      },
      {
        id: 'active-subscriptions',
        label: 'Active',
        href: '/subscriptions/active',
        icon: CreditCard,
      },
      {
        id: 'failed-payments',
        label: 'Failed Payments',
        href: '/subscriptions/failed',
        icon: AlertTriangle,
        badge: 8,
      },
      {
        id: 'cancelled',
        label: 'Cancelled',
        href: '/subscriptions/cancelled',
        icon: CreditCard,
      },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
    children: [
      {
        id: 'revenue',
        label: 'Revenue',
        href: '/analytics/revenue',
        icon: BarChart3,
      },
      {
        id: 'usage',
        label: 'Usage Analytics',
        href: '/analytics/usage',
        icon: Database,
      },
      {
        id: 'growth',
        label: 'Growth Metrics',
        href: '/analytics/growth',
        icon: BarChart3,
      },
    ],
  },
  {
    id: 'support',
    label: 'Support',
    href: '/support',
    icon: MessageSquare,
    badge: 18,
    children: [
      {
        id: 'tickets',
        label: 'Support Tickets',
        href: '/support/tickets',
        icon: MessageSquare,
        badge: 18,
      },
      {
        id: 'live-chat',
        label: 'Live Chat',
        href: '/support/chat',
        icon: MessageSquare,
      },
      {
        id: 'knowledge-base',
        label: 'Knowledge Base',
        href: '/support/knowledge',
        icon: FileText,
      },
    ],
  },
  {
    id: 'platform',
    label: 'Platform',
    href: '/platform',
    icon: Globe,
    children: [
      {
        id: 'settings',
        label: 'Platform Settings',
        href: '/settings',
        icon: Settings,
      },
      {
        id: 'security',
        label: 'Security',
        href: '/security',
        icon: Shield,
      },
      {
        id: 'integrations',
        label: 'Integrations',
        href: '/integrations',
        icon: Globe,
      },
      {
        id: 'email-templates',
        label: 'Email Templates',
        href: '/email-templates',
        icon: Mail,
      },
    ],
  },
];

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ className }) => {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>(['clients', 'analytics']);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  const isParentActive = (item: NavItem) => {
    if (item.children) {
      return item.children.some(child => isActive(child.href));
    }
    return isActive(item.href);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    window.location.href = '/login';
  };

  return (
    <div className={`admin-sidebar ${className}`}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/dashboard" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">MADAS</h1>
            <p className="text-xs text-gray-500">Admin Dashboard</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigationItems.map((item) => (
          <div key={item.id}>
            {/* Parent Item */}
            <div>
              {item.children ? (
                <button
                  onClick={() => toggleExpanded(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isParentActive(item)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {expandedItems.includes(item.id) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              )}
            </div>

            {/* Children Items */}
            <AnimatePresence>
              {item.children && expandedItems.includes(item.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="ml-6 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.id}
                        href={child.href}
                        className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                          isActive(child.href)
                            ? 'bg-primary/10 text-primary'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <child.icon className="w-4 h-4" />
                          <span>{child.label}</span>
                          {child.badge && (
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                              {child.badge}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        {/* Notifications */}
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => window.open('/notifications', '_blank')}
        >
          <Bell className="w-5 h-5 mr-3" />
          <span>Notifications</span>
          <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            3
          </span>
        </Button>

        {/* Logout */}
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};
