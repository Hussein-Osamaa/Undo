/**
 * Admin header component with search, notifications, and user menu
 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Sun,
  Moon,
  Monitor,
  Globe,
  Shield,
} from 'lucide-react';
import { Button, Input, Card } from '@madas/shared';

interface AdminHeaderProps {
  className?: string;
  onMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Client Signup',
    message: 'TechStore Pro just signed up for Professional plan',
    type: 'info',
    time: '2 minutes ago',
    read: false,
  },
  {
    id: '2',
    title: 'Payment Failed',
    message: 'Bella\'s Boutique payment failed - needs attention',
    type: 'warning',
    time: '15 minutes ago',
    read: false,
  },
  {
    id: '3',
    title: 'High Priority Support Ticket',
    message: 'Customer reporting critical bug in POS system',
    type: 'error',
    time: '1 hour ago',
    read: true,
  },
  {
    id: '4',
    title: 'Monthly Revenue Milestone',
    message: 'Congratulations! You\'ve reached $50k MRR',
    type: 'success',
    time: '2 hours ago',
    read: true,
  },
];

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  className,
  onMenuToggle,
  isMobileMenuOpen,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [unreadCount] = useState(mockNotifications.filter(n => !n.read).length);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const markNotificationAsRead = (id: string) => {
    // Implement mark as read
    console.log('Marking notification as read:', id);
  };

  const markAllAsRead = () => {
    // Implement mark all as read
    console.log('Marking all notifications as read');
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    window.location.href = '/login';
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-4 h-4" />;
      case 'dark':
        return <Moon className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'error':
        return '❌';
      default:
        return 'ℹ️';
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  return (
    <header className={`admin-header ${className}`}>
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuToggle}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>

          {/* Search */}
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search clients, tickets, or analytics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-80 lg:w-96"
              />
            </div>
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const themes = ['light', 'dark', 'system'];
              const currentIndex = themes.indexOf(theme);
              const nextTheme = themes[(currentIndex + 1) % themes.length] as typeof theme;
              setTheme(nextTheme);
            }}
            title={`Current theme: ${theme}`}
          >
            {getThemeIcon()}
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-12 w-80 z-50"
                >
                  <Card className="shadow-large border">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                        {unreadCount > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={markAllAsRead}
                            className="text-xs"
                          >
                            Mark all read
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="max-h-96 overflow-y-auto">
                      {mockNotifications.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                          No notifications
                        </div>
                      ) : (
                        mockNotifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                              !notification.read ? 'bg-blue-50' : ''
                            }`}
                            onClick={() => markNotificationAsRead(notification.id)}
                          >
                            <div className="flex items-start space-x-3">
                              <span className="text-lg">
                                {getNotificationIcon(notification.type)}
                              </span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-sm font-medium text-gray-900 truncate">
                                    {notification.title}
                                  </h4>
                                  {!notification.read && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-400 mt-2">
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    
                    <div className="p-3 border-t border-gray-200">
                      <Button variant="ghost" className="w-full text-sm">
                        View all notifications
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              className="flex items-center space-x-2 px-3"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">A</span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </Button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-12 w-48 z-50"
                >
                  <Card className="shadow-large border">
                    <div className="p-2">
                      <div className="px-3 py-2 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">Admin User</p>
                        <p className="text-xs text-gray-500">admin@madas.com</p>
                      </div>
                      
                      <div className="py-1">
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => window.open('/profile', '_blank')}
                        >
                          <User className="w-4 h-4 mr-3" />
                          Profile
                        </Button>
                        
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => window.open('/settings', '_blank')}
                        >
                          <Settings className="w-4 h-4 mr-3" />
                          Settings
                        </Button>
                        
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => window.open('/security', '_blank')}
                        >
                          <Shield className="w-4 h-4 mr-3" />
                          Security
                        </Button>
                        
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => window.open('https://madas.com', '_blank')}
                        >
                          <Globe className="w-4 h-4 mr-3" />
                          Marketing Site
                        </Button>
                        
                        <hr className="my-1" />
                        
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={handleLogout}
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          Logout
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};
