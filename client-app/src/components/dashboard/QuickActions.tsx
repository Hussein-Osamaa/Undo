'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, ShoppingCart, Package, Users, BarChart3 } from 'lucide-react';

interface QuickActionProps {
  href: string;
  icon: React.ElementType;
  label: string;
  description: string;
  color: string;
}

function QuickAction({ href, icon: Icon, label, description, color }: QuickActionProps) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-${color}-300 hover:bg-${color}-50 transition-all duration-200 cursor-pointer group`}
      >
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 bg-${color}-100 rounded-lg flex items-center justify-center group-hover:bg-${color}-200 transition-colors`}>
            <Icon className={`w-5 h-5 text-${color}-600`} />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{label}</h4>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export function QuickActions() {
  const actions = [
    {
      href: '/products/new',
      icon: Plus,
      label: 'Add Product',
      description: 'Add new inventory item',
      color: 'primary',
    },
    {
      href: '/pos',
      icon: ShoppingCart,
      label: 'New Sale',
      description: 'Process a sale',
      color: 'success',
    },
    {
      href: '/orders/new',
      icon: Package,
      label: 'New Order',
      description: 'Create customer order',
      color: 'warning',
    },
    {
      href: '/customers/new',
      icon: Users,
      label: 'Add Customer',
      description: 'Register new customer',
      color: 'purple',
    },
    {
      href: '/reports',
      icon: BarChart3,
      label: 'View Reports',
      description: 'Check analytics',
      color: 'blue',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {actions.map((action, index) => (
        <motion.div
          key={action.href}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <QuickAction {...action} />
        </motion.div>
      ))}
    </div>
  );
}
