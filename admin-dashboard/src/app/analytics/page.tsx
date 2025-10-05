/**
 * Analytics and reporting page
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Filter,
  RefreshCw,
  Eye,
  FileText,
  PieChart,
  Activity,
} from 'lucide-react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { AnalyticsCharts } from '@/components/analytics/AnalyticsCharts';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@madas/shared';

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<'revenue' | 'users' | 'engagement'>('revenue');

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate data refresh
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleExportReport = (format: 'pdf' | 'excel' | 'csv') => {
    console.log(`Exporting report as ${format}`);
    // TODO: Implement report export
  };

  const handleScheduleReport = () => {
    console.log('Scheduling automated report');
    // TODO: Implement report scheduling
  };

  // Mock data for quick insights
  const insights = [
    {
      title: 'Revenue Growth',
      value: '+15.2%',
      description: 'Month-over-month revenue increase',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-600',
    },
    {
      title: 'User Retention',
      value: '89.3%',
      description: 'Monthly active user retention rate',
      trend: 'up',
      icon: Activity,
      color: 'text-blue-600',
    },
    {
      title: 'Feature Adoption',
      value: '76%',
      description: 'Average feature adoption rate',
      trend: 'up',
      icon: PieChart,
      color: 'text-purple-600',
    },
    {
      title: 'Churn Rate',
      value: '3.2%',
      description: 'Monthly customer churn rate',
      trend: 'down',
      icon: BarChart3,
      color: 'text-red-600',
    },
  ];

  const quickActions = [
    {
      title: 'Generate Report',
      description: 'Create custom analytics report',
      icon: FileText,
      action: () => handleExportReport('pdf'),
    },
    {
      title: 'Export Data',
      description: 'Download data in various formats',
      icon: Download,
      action: () => handleExportReport('csv'),
    },
    {
      title: 'Schedule Reports',
      description: 'Set up automated reporting',
      icon: Calendar,
      action: handleScheduleReport,
    },
    {
      title: 'Custom Dashboard',
      description: 'Create personalized dashboard',
      icon: Eye,
      action: () => console.log('Create custom dashboard'),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
            <p className="text-gray-600 mt-1">
              Comprehensive insights into platform performance and business metrics
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={handleRefresh}
              isLoading={isLoading}
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline" onClick={() => handleExportReport('pdf')}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Insights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-lg bg-gray-100">
                      <insight.icon className={`w-6 h-6 ${insight.color}`} />
                    </div>
                    <div className={`text-sm font-medium ${
                      insight.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {insight.trend === 'up' ? '↗' : '↘'} Trending
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-2xl font-bold text-gray-900">{insight.value}</div>
                    <div className="text-sm font-medium text-gray-900 mt-1">{insight.title}</div>
                    <div className="text-xs text-gray-500 mt-1">{insight.description}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Metric Selector */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Analytics Overview</CardTitle>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Focus:</span>
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value as any)}
                  className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="revenue">Revenue Metrics</option>
                  <option value="users">User Analytics</option>
                  <option value="engagement">Engagement</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <button
                onClick={() => setSelectedMetric('revenue')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedMetric === 'revenue'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Revenue</div>
                    <div className="text-sm text-gray-600">Financial performance</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setSelectedMetric('users')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedMetric === 'users'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Activity className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Users</div>
                    <div className="text-sm text-gray-600">User behavior & growth</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setSelectedMetric('engagement')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedMetric === 'engagement'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <PieChart className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Engagement</div>
                    <div className="text-sm text-gray-600">Feature usage & satisfaction</div>
                  </div>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Charts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <AnalyticsCharts />
        </motion.div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <button
                    onClick={action.action}
                    className="w-full p-6 text-left border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors group"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-primary/10 transition-colors">
                        <action.icon className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors" />
                      </div>
                      <div className="font-medium text-gray-900">{action.title}</div>
                    </div>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Reports</CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: 'Monthly Revenue Report',
                  type: 'PDF',
                  size: '2.3 MB',
                  created: '2 hours ago',
                  status: 'ready',
                },
                {
                  name: 'User Growth Analysis',
                  type: 'Excel',
                  size: '1.8 MB',
                  created: '1 day ago',
                  status: 'ready',
                },
                {
                  name: 'Feature Usage Report',
                  type: 'CSV',
                  size: '856 KB',
                  created: '3 days ago',
                  status: 'ready',
                },
                {
                  name: 'Q1 Performance Summary',
                  type: 'PDF',
                  size: '4.1 MB',
                  created: '1 week ago',
                  status: 'ready',
                },
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{report.name}</div>
                      <div className="text-sm text-gray-600">
                        {report.type} • {report.size} • {report.created}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {report.status}
                    </span>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
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
