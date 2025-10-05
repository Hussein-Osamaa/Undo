'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  UserCheck,
  BarChart3,
  Settings,
  Menu,
  X,
  Store,
  Receipt,
  TrendingUp,
  Bell,
  HelpCircle,
} from 'lucide-react';
import { useBusiness } from '@/lib/providers/BusinessProvider';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Overview and analytics',
  },
  {
    name: 'Products',
    href: '/products',
    icon: Package,
    description: 'Manage inventory',
  },
  {
    name: 'POS',
    href: '/pos',
    icon: ShoppingCart,
    description: 'Point of sale',
  },
  {
    name: 'Orders',
    href: '/orders',
    icon: Receipt,
    description: 'Order management',
  },
  {
    name: 'Customers',
    href: '/customers',
    icon: Users,
    description: 'Customer database',
  },
  {
    name: 'Staff',
    href: '/staff',
    icon: UserCheck,
    description: 'Team management',
  },
  {
    name: 'Reports',
    href: '/reports',
    icon: BarChart3,
    description: 'Analytics & insights',
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'Business settings',
  },
];

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const { currentBusiness, businesses, switchBusiness } = useBusiness();
  const [showBusinessSwitcher, setShowBusinessSwitcher] = useState(false);

  const handleBusinessSwitch = async (businessId: string) => {
    await switchBusiness(businessId);
    setShowBusinessSwitcher(false);
  };

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 64 : 256 }}
      className="bg-white border-r border-gray-200 flex flex-col h-full"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">MADAS</h1>
                {currentBusiness && (
                  <p className="text-xs text-gray-500 truncate">
                    {currentBusiness.businessName}
                  </p>
                )}
              </div>
            </div>
          )}
          
          <button
            onClick={onToggle}
            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? (
              <Menu className="w-5 h-5 text-gray-600" />
            ) : (
              <X className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Business Switcher */}
        {!isCollapsed && businesses.length > 1 && (
          <div className="mt-3 relative">
            <button
              onClick={() => setShowBusinessSwitcher(!showBusinessSwitcher)}
              className="w-full text-left p-2 rounded-md hover:bg-gray-50 border border-gray-200 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 truncate">
                  {currentBusiness?.businessName || 'Select Business'}
                </span>
                <TrendingUp className="w-4 h-4 text-gray-400" />
              </div>
            </button>

            <AnimatePresence>
              {showBusinessSwitcher && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                >
                  {businesses.map((business) => (
                    <button
                      key={business.businessId}
                      onClick={() => handleBusinessSwitch(business.businessId)}
                      className={`w-full text-left p-3 hover:bg-gray-50 transition-colors ${
                        currentBusiness?.businessId === business.businessId
                          ? 'bg-primary-50 border-l-2 border-primary-600'
                          : ''
                      }`}
                    >
                      <div className="font-medium text-sm text-gray-900">
                        {business.businessName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {business.businessType} • {business.subscription.plan}
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto custom-scrollbar">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          
          return (
            <Link key={item.name} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  flex items-center p-3 rounded-lg transition-all duration-200 group
                  ${isActive 
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <item.icon 
                  className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : 'mr-3'} ${
                    isActive ? 'text-primary-600' : 'text-gray-500 group-hover:text-gray-700'
                  }`} 
                />
                
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex-1 min-w-0"
                    >
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-xs text-gray-500 truncate">
                        {item.description}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-gray-200">
        <Link href="/help">
          <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group">
            <HelpCircle className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
            {!isCollapsed && (
              <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900">
                Help & Support
              </span>
            )}
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
