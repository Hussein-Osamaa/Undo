/**
 * Overview dashboard component with key metrics and charts
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  CreditCard,
  DollarSign,
  TrendingUp,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { MetricCard } from './MetricCard';
import { Card, CardContent, CardHeader, CardTitle } from '@madas/shared';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface OverviewData {
  totalClients: number;
  activeClients: number;
  mrr: number;
  arr: number;
  newTrials: number;
  churnRate: number;
  supportTickets: number;
  systemUptime: number;
}

interface ChartData {
  name: string;
  value: number;
  color?: string;
}

const mockOverviewData: OverviewData = {
  totalClients: 847,
  activeClients: 792,
  mrr: 42850,
  arr: 514200,
  newTrials: 124,
  churnRate: 3.2,
  supportTickets: 18,
  systemUptime: 99.97,
};

const mockRevenueData = [
  { month: 'Jan', revenue: 38000, clients: 720 },
  { month: 'Feb', revenue: 39500, clients: 735 },
  { month: 'Mar', revenue: 41200, clients: 752 },
  { month: 'Apr', revenue: 40800, clients: 748 },
  { month: 'May', revenue: 42500, clients: 768 },
  { month: 'Jun', revenue: 42850, clients: 792 },
];

const mockPlanDistribution = [
  { name: 'Starter', value: 45, color: '#3B82F6' },
  { name: 'Professional', value: 35, color: '#8B5CF6' },
  { name: 'Enterprise', value: 20, color: '#10B981' },
];

const mockRecentActivity = [
  {
    id: 1,
    type: 'signup',
    message: 'New client TechStore Pro signed up',
    time: '2 minutes ago',
    status: 'success',
  },
  {
    id: 2,
    type: 'payment',
    message: 'Bella\'s Boutique payment failed',
    time: '15 minutes ago',
    status: 'warning',
  },
  {
    id: 3,
    type: 'upgrade',
    message: 'Fashion Forward upgraded to Professional',
    time: '1 hour ago',
    status: 'success',
  },
  {
    id: 4,
    type: 'support',
    message: 'High priority ticket #1234 created',
    time: '2 hours ago',
    status: 'error',
  },
];

export const OverviewDashboard: React.FC = () => {
  const [overviewData, setOverviewData] = useState<OverviewData>(mockOverviewData);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'signup':
        return <Users className="w-4 h-4 text-green-600" />;
      case 'payment':
        return <CreditCard className="w-4 h-4 text-yellow-600" />;
      case 'upgrade':
        return <TrendingUp className="w-4 h-4 text-blue-600" />;
      case 'support':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your platform.</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Clients"
          value={overviewData.totalClients}
          change={{ value: 12, period: 'last month' }}
          icon={Users}
          iconColor="text-blue-600"
          iconBg="bg-blue-100"
          trend="up"
          loading={isLoading}
        />
        
        <MetricCard
          title="Active Clients"
          value={overviewData.activeClients}
          change={{ value: 8, period: 'last month' }}
          icon={CheckCircle}
          iconColor="text-green-600"
          iconBg="bg-green-100"
          trend="up"
          loading={isLoading}
        />
        
        <MetricCard
          title="Monthly Recurring Revenue"
          value={`$${overviewData.mrr.toLocaleString()}`}
          change={{ value: 15, period: 'last month' }}
          icon={DollarSign}
          iconColor="text-purple-600"
          iconBg="bg-purple-100"
          trend="up"
          loading={isLoading}
        />
        
        <MetricCard
          title="Annual Recurring Revenue"
          value={`$${overviewData.arr.toLocaleString()}`}
          change={{ value: 15, period: 'last month' }}
          icon={TrendingUp}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-100"
          trend="up"
          loading={isLoading}
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="New Trials"
          value={overviewData.newTrials}
          change={{ value: 23, period: 'this month' }}
          icon={Clock}
          iconColor="text-orange-600"
          iconBg="bg-orange-100"
          trend="up"
          loading={isLoading}
        />
        
        <MetricCard
          title="Churn Rate"
          value={`${overviewData.churnRate}%`}
          change={{ value: 0.5, period: 'last month' }}
          icon={TrendingUp}
          iconColor="text-red-600"
          iconBg="bg-red-100"
          trend="down"
          loading={isLoading}
        />
        
        <MetricCard
          title="Support Tickets"
          value={overviewData.supportTickets}
          change={{ value: 4, period: 'this week' }}
          icon={AlertTriangle}
          iconColor="text-yellow-600"
          iconBg="bg-yellow-100"
          trend="down"
          loading={isLoading}
        />
        
        <MetricCard
          title="System Uptime"
          value={`${overviewData.systemUptime}%`}
          icon={Activity}
          iconColor="text-green-600"
          iconBg="bg-green-100"
          trend="neutral"
          loading={isLoading}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="chart-container">
          <CardHeader>
            <CardTitle>Revenue & Client Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'revenue' ? `$${value.toLocaleString()}` : value,
                    name === 'revenue' ? 'Revenue' : 'Clients'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Revenue"
                />
                <Line 
                  type="monotone" 
                  dataKey="clients" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Clients"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Plan Distribution */}
        <Card className="chart-container">
          <CardHeader>
            <CardTitle>Plan Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockPlanDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockPlanDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRecentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${getActivityColor(activity.status)}`}>
                    {activity.message}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <div className="flex-shrink-0">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    activity.status === 'success' ? 'bg-green-100 text-green-800' :
                    activity.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    activity.status === 'error' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button className="text-sm text-primary hover:text-primary/80 font-medium">
              View all activity →
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
