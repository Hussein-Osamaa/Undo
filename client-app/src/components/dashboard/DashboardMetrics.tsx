'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, ShoppingCart, Package, Users, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: React.ElementType;
  color: string;
  delay: number;
}

function MetricCard({ title, value, change, changeType, icon: Icon, color, delay }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-lg shadow-soft p-6 border border-gray-200 hover:shadow-medium transition-all duration-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <div className="flex items-center mt-2">
            {changeType === 'increase' ? (
              <TrendingUp className="w-4 h-4 text-success-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-danger-500 mr-1" />
            )}
            <span
              className={`text-sm font-medium ${
                changeType === 'increase' ? 'text-success-600' : 'text-danger-600'
              }`}
            >
              {Math.abs(change)}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
        <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
}

export function DashboardMetrics() {
  const metrics = [
    {
      title: 'Today\'s Sales',
      value: '$2,847',
      change: 12.5,
      changeType: 'increase' as const,
      icon: DollarSign,
      color: 'bg-success-500',
      delay: 0.1,
    },
    {
      title: 'Orders Today',
      value: 47,
      change: 8.2,
      changeType: 'increase' as const,
      icon: ShoppingCart,
      color: 'bg-primary-500',
      delay: 0.2,
    },
    {
      title: 'Products',
      value: 156,
      change: 3.1,
      changeType: 'increase' as const,
      icon: Package,
      color: 'bg-warning-500',
      delay: 0.3,
    },
    {
      title: 'Customers',
      value: '1,247',
      change: 5.7,
      changeType: 'increase' as const,
      icon: Users,
      color: 'bg-purple-500',
      delay: 0.4,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-soft p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Key Metrics</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>
    </div>
  );
}
