/**
 * Analytics charts component with various visualizations
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Scatter,
  ScatterChart,
  RadialBarChart,
  RadialBar,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@madas/shared';
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, BarChart3 } from 'lucide-react';

interface AnalyticsChartsProps {
  className?: string;
}

const mockRevenueData = [
  { month: 'Jan', revenue: 38000, mrr: 38000, arr: 456000, clients: 720, growth: 12.5 },
  { month: 'Feb', revenue: 39500, mrr: 39500, arr: 474000, clients: 735, growth: 3.9 },
  { month: 'Mar', revenue: 41200, mrr: 41200, arr: 494400, clients: 752, growth: 4.3 },
  { month: 'Apr', revenue: 40800, mrr: 40800, arr: 489600, clients: 748, growth: -1.0 },
  { month: 'May', revenue: 42500, mrr: 42500, arr: 510000, clients: 768, growth: 4.2 },
  { month: 'Jun', revenue: 42850, mrr: 42850, arr: 514200, clients: 792, growth: 0.8 },
];

const mockPlanDistribution = [
  { name: 'Starter', value: 380, percentage: 45, revenue: 11020, color: '#3B82F6' },
  { name: 'Professional', value: 295, percentage: 35, revenue: 23305, color: '#8B5CF6' },
  { name: 'Enterprise', value: 172, percentage: 20, revenue: 34228, color: '#10B981' },
];

const mockUserGrowth = [
  { month: 'Jan', newUsers: 45, churned: 12, netGrowth: 33 },
  { month: 'Feb', newUsers: 52, churned: 8, netGrowth: 44 },
  { month: 'Mar', newUsers: 38, churned: 15, netGrowth: 23 },
  { month: 'Apr', newUsers: 61, churned: 9, netGrowth: 52 },
  { month: 'May', newUsers: 47, churned: 11, netGrowth: 36 },
  { month: 'Jun', newUsers: 55, churned: 7, netGrowth: 48 },
];

const mockCohortData = [
  { cohort: 'Jan 2024', month0: 100, month1: 85, month2: 78, month3: 72, month4: 68, month5: 65 },
  { cohort: 'Feb 2024', month0: 100, month1: 88, month2: 82, month3: 76, month4: 71, month5: 67 },
  { cohort: 'Mar 2024', month0: 100, month1: 90, month2: 84, month3: 79, month4: 74, month5: 70 },
  { cohort: 'Apr 2024', month0: 100, month1: 87, month2: 81, month3: 75, month4: 70, month5: 66 },
  { cohort: 'May 2024', month0: 100, month1: 89, month2: 83, month3: 77, month4: 72, month5: 68 },
  { cohort: 'Jun 2024', month0: 100, month1: 92, month2: 86, month3: 80, month4: 75, month5: 71 },
];

const mockFeatureUsage = [
  { feature: 'POS System', usage: 89, satisfaction: 4.8, adoption: 95 },
  { feature: 'Inventory Mgmt', usage: 76, satisfaction: 4.6, adoption: 87 },
  { feature: 'Analytics', usage: 64, satisfaction: 4.4, adoption: 72 },
  { feature: 'Customer Mgmt', usage: 52, satisfaction: 4.2, adoption: 68 },
  { feature: 'Staff Mgmt', usage: 38, satisfaction: 4.0, adoption: 45 },
  { feature: 'Website Builder', usage: 28, satisfaction: 3.9, adoption: 32 },
];

const mockGeographicData = [
  { country: 'United States', users: 320, revenue: 25600, growth: 15.2 },
  { country: 'Canada', users: 85, revenue: 6800, growth: 12.8 },
  { country: 'United Kingdom', users: 76, revenue: 6080, growth: 8.5 },
  { country: 'Australia', users: 54, revenue: 4320, growth: 18.3 },
  { country: 'Germany', users: 43, revenue: 3440, growth: 6.7 },
  { country: 'France', users: 38, revenue: 3040, growth: 9.2 },
];

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ className }) => {
  const [activeChart, setActiveChart] = useState<'revenue' | 'users' | 'cohort'>('revenue');
  const [timeRange, setTimeRange] = useState<'6m' | '1y' | '2y'>('6m');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-600">{entry.name}:</span>
              <span className="text-sm font-medium text-gray-900">
                {entry.name.includes('revenue') || entry.name.includes('Revenue')
                  ? `$${entry.value.toLocaleString()}`
                  : entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? (
      <TrendingUp className="w-4 h-4 text-green-600" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-600" />
    );
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Chart Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Analytics Dashboard</CardTitle>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Chart:</span>
                <select
                  value={activeChart}
                  onChange={(e) => setActiveChart(e.target.value as any)}
                  className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="revenue">Revenue</option>
                  <option value="users">User Growth</option>
                  <option value="cohort">Cohort Analysis</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Period:</span>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value as any)}
                  className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="6m">Last 6 months</option>
                  <option value="1y">Last year</option>
                  <option value="2y">Last 2 years</option>
                </select>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Revenue Analytics */}
      {activeChart === 'revenue' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={mockRevenueData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3B82F6"
                    fillOpacity={1}
                    fill="url(#revenueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>MRR vs ARR</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={mockRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar yAxisId="left" dataKey="mrr" fill="#3B82F6" />
                  <Line yAxisId="right" type="monotone" dataKey="arr" stroke="#10B981" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* User Growth Analytics */}
      {activeChart === 'users' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockUserGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="newUsers" fill="#10B981" name="New Users" />
                  <Bar dataKey="churned" fill="#EF4444" name="Churned" />
                  <Bar dataKey="netGrowth" fill="#3B82F6" name="Net Growth" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Churn Rate Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockUserGrowth.map(item => ({
                  ...item,
                  churnRate: (item.churned / (item.newUsers + item.churned)) * 100
                }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="churnRate" stroke="#EF4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Cohort Analysis */}
      {activeChart === 'cohort' && (
        <Card>
          <CardHeader>
            <CardTitle>Cohort Retention Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={mockCohortData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                <YAxis dataKey="cohort" type="category" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="month0" stackId="a" fill="#3B82F6" name="Month 0" />
                <Bar dataKey="month1" stackId="a" fill="#8B5CF6" name="Month 1" />
                <Bar dataKey="month2" stackId="a" fill="#10B981" name="Month 2" />
                <Bar dataKey="month3" stackId="a" fill="#F59E0B" name="Month 3" />
                <Bar dataKey="month4" stackId="a" fill="#EF4444" name="Month 4" />
                <Bar dataKey="month5" stackId="a" fill="#6B7280" name="Month 5" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Plan Distribution & Feature Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Plan Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={mockPlanDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {mockPlanDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="space-y-2">
                {mockPlanDistribution.map((plan, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: plan.color }}
                      />
                      <span className="text-sm text-gray-600">{plan.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{plan.value} clients</div>
                      <div className="text-xs text-gray-500">${plan.revenue.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feature Usage & Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockFeatureUsage.map((feature, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{feature.feature}</span>
                    <span className="text-sm text-gray-600">{feature.satisfaction}/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${feature.usage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{feature.usage}% usage</span>
                    <span>{feature.adoption}% adoption</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Geographic Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Geographic Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Country</th>
                  <th className="text-right py-3 px-4">Users</th>
                  <th className="text-right py-3 px-4">Revenue</th>
                  <th className="text-right py-3 px-4">Growth</th>
                </tr>
              </thead>
              <tbody>
                {mockGeographicData.map((country, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{country.country}</td>
                    <td className="py-3 px-4 text-right text-gray-600">{country.users}</td>
                    <td className="py-3 px-4 text-right text-gray-600">${country.revenue.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">
                      <div className={`flex items-center justify-end space-x-1 ${getGrowthColor(country.growth)}`}>
                        {getGrowthIcon(country.growth)}
                        <span className="text-sm font-medium">{country.growth}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Revenue', value: '$428,500', change: 15.2, icon: DollarSign, color: 'text-green-600' },
          { title: 'Active Users', value: '792', change: 8.5, icon: Users, color: 'text-blue-600' },
          { title: 'Churn Rate', value: '3.2%', change: -0.5, icon: Activity, color: 'text-red-600' },
          { title: 'Avg. Revenue/User', value: '$541', change: 12.3, icon: BarChart3, color: 'text-purple-600' },
        ].map((metric, index) => (
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
                    <metric.icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                  <div className={`flex items-center space-x-1 ${getGrowthColor(metric.change)}`}>
                    {getGrowthIcon(metric.change)}
                    <span className="text-sm font-medium">{Math.abs(metric.change)}%</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                  <div className="text-sm text-gray-600">{metric.title}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
