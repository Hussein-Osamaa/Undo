/**
 * Support tickets management page
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
  TrendingUp,
  TrendingDown,
  Users,
  Mail,
  Phone,
  Calendar,
  BarChart3,
} from 'lucide-react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { SupportTicketTable } from '@/components/support/SupportTicketTable';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@madas/shared';

export default function SupportPage() {
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTicketSelect = (ticket: any) => {
    setSelectedTicket(ticket);
    // TODO: Open ticket detail modal
    console.log('View ticket:', ticket);
  };

  const handleTicketEdit = (ticket: any) => {
    // TODO: Implement ticket editing
    console.log('Edit ticket:', ticket);
  };

  const handleTicketAssign = (ticket: any) => {
    // TODO: Implement ticket assignment
    console.log('Assign ticket:', ticket);
  };

  // Mock statistics
  const stats = {
    total: 156,
    open: 23,
    inProgress: 18,
    resolved: 98,
    closed: 17,
    avgResponseTime: '2.4h',
    satisfaction: 4.7,
    newToday: 8,
    urgent: 3,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'text-blue-600 bg-blue-100';
      case 'in_progress':
        return 'text-yellow-600 bg-yellow-100';
      case 'resolved':
        return 'text-green-600 bg-green-100';
      case 'closed':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: 'up' | 'down') => {
    return trend === 'up' ? (
      <TrendingUp className="w-4 h-4 text-green-600" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-600" />
    );
  };

  const getTrendColor = (trend: 'up' | 'down') => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Support Tickets</h1>
            <p className="text-gray-600 mt-1">
              Manage customer support requests and track team performance
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Mail className="w-4 h-4 mr-2" />
              Email Templates
            </Button>
            <Button variant="outline">
              <Users className="w-4 h-4 mr-2" />
              Team Management
            </Button>
            <Button>
              <MessageSquare className="w-4 h-4 mr-2" />
              New Ticket
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-lg bg-blue-100">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className={`flex items-center space-x-1 ${getTrendColor('up')}`}>
                    {getTrendIcon('up')}
                    <span className="text-sm font-medium">+12%</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                  <div className="text-sm text-gray-600">Total Tickets</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-lg bg-yellow-100">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className={`flex items-center space-x-1 ${getTrendColor('down')}`}>
                    {getTrendIcon('down')}
                    <span className="text-sm font-medium">-8%</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-bold text-gray-900">{stats.open}</div>
                  <div className="text-sm text-gray-600">Open Tickets</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-lg bg-green-100">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className={`flex items-center space-x-1 ${getTrendColor('up')}`}>
                    {getTrendIcon('up')}
                    <span className="text-sm font-medium">+5%</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-bold text-gray-900">{stats.resolved}</div>
                  <div className="text-sm text-gray-600">Resolved</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-lg bg-purple-100">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className={`flex items-center space-x-1 ${getTrendColor('down')}`}>
                    {getTrendIcon('down')}
                    <span className="text-sm font-medium">-15%</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-bold text-gray-900">{stats.avgResponseTime}</div>
                  <div className="text-sm text-gray-600">Avg Response Time</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Support Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Support Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Response Time</span>
                      <span className="text-sm font-bold text-gray-900">2.4h</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Target: &lt; 4h</div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Resolution Rate</span>
                      <span className="text-sm font-bold text-gray-900">94%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Target: &gt; 90%</div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Customer Satisfaction</span>
                      <span className="text-sm font-bold text-gray-900">4.7/5</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Target: &gt; 4.5</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <MessageSquare className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">New Today</div>
                        <div className="text-2xl font-bold text-blue-600">{stats.newToday}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">Urgent</div>
                        <div className="text-2xl font-bold text-red-600">{stats.urgent}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">Resolved Today</div>
                        <div className="text-2xl font-bold text-green-600">12</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'John Doe', tickets: 45, resolved: 42, satisfaction: 4.8 },
                  { name: 'Jane Smith', tickets: 38, resolved: 36, satisfaction: 4.6 },
                  { name: 'Mike Johnson', tickets: 32, resolved: 30, satisfaction: 4.7 },
                  { name: 'Sarah Wilson', tickets: 28, resolved: 26, satisfaction: 4.9 },
                ].map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-xs text-gray-500">{member.tickets} tickets</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{member.resolved}</div>
                      <div className="text-xs text-gray-500">{member.satisfaction}/5</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <span>Urgent Tickets</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Clock className="w-6 h-6 text-yellow-600" />
                <span>Overdue Tickets</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <User className="w-6 h-6 text-blue-600" />
                <span>Unassigned</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <BarChart3 className="w-6 h-6 text-purple-600" />
                <span>Performance Report</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Support Ticket Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <SupportTicketTable
            onTicketSelect={handleTicketSelect}
            onTicketEdit={handleTicketEdit}
            onTicketAssign={handleTicketAssign}
            loading={isLoading}
          />
        </motion.div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Activity</CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: 'Ticket T-2024-001 resolved by John Doe',
                  time: '2 hours ago',
                  type: 'resolved',
                },
                {
                  action: 'New ticket T-2024-008 created by Sarah Johnson',
                  time: '3 hours ago',
                  type: 'created',
                },
                {
                  action: 'Ticket T-2024-003 assigned to Jane Smith',
                  time: '4 hours ago',
                  type: 'assigned',
                },
                {
                  action: 'Ticket T-2024-002 priority changed to High',
                  time: '5 hours ago',
                  type: 'updated',
                },
                {
                  action: 'Ticket T-2024-005 closed by Mike Johnson',
                  time: '6 hours ago',
                  type: 'closed',
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
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
