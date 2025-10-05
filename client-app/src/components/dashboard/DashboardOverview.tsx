'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DashboardMetrics } from './DashboardMetrics';
import { SalesChart } from './SalesChart';
import { RecentOrders } from './RecentOrders';
import { LowStockAlerts } from './LowStockAlerts';
import { QuickActions } from './QuickActions';
import { BusinessOverview } from './BusinessOverview';

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-soft p-6 border border-gray-200"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back! 👋
            </h1>
            <p className="text-gray-600 mt-1">
              Here's what's happening with your business today.
            </p>
          </div>
          <div className="hidden md:block">
            <QuickActions />
          </div>
        </div>
      </motion.div>

      {/* Business Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <BusinessOverview />
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <DashboardMetrics />
      </motion.div>

      {/* Charts and Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <SalesChart />
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <RecentOrders />
        </motion.div>
      </div>

      {/* Alerts and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <LowStockAlerts />
        </motion.div>

        {/* Mobile Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="md:hidden"
        >
          <div className="bg-white rounded-lg shadow-soft p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <QuickActions />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
