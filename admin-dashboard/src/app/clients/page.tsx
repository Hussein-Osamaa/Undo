/**
 * Clients management page
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Download, Filter } from 'lucide-react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { ClientTable } from '@/components/clients/ClientTable';
import { ClientDetailModal } from '@/components/clients/ClientDetailModal';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@madas/shared';

interface Client {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  plan: 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'trial' | 'cancelled' | 'past_due';
  signupDate: string;
  lastActivity: string;
  revenue: number;
  orders: number;
  products: number;
  users: number;
  location: string;
  website?: string;
}

export default function ClientsPage() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client);
    setIsDetailModalOpen(true);
  };

  const handleClientEdit = (client: Client) => {
    // TODO: Implement client editing
    console.log('Edit client:', client);
  };

  const handleClientDelete = (client: Client) => {
    // TODO: Implement client deletion
    console.log('Delete client:', client);
  };

  const handleCloseModal = () => {
    setIsDetailModalOpen(false);
    setSelectedClient(null);
  };

  const handleExportClients = () => {
    // TODO: Implement client export
    console.log('Export clients');
  };

  const handleAddClient = () => {
    // TODO: Implement add new client
    console.log('Add new client');
  };

  // Mock statistics
  const stats = {
    total: 847,
    active: 792,
    trial: 156,
    cancelled: 23,
    newThisMonth: 45,
    revenue: 4285000,
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
            <p className="text-gray-600 mt-1">
              Manage and monitor all your platform clients
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handleExportClients}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button onClick={handleAddClient}>
              <Plus className="w-4 h-4 mr-2" />
              Add Client
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
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-blue-100">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Clients</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total.toLocaleString()}</p>
                  </div>
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
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-green-100">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Clients</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.active.toLocaleString()}</p>
                  </div>
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
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-blue-100">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Trial Users</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.trial.toLocaleString()}</p>
                  </div>
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
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-purple-100">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">New This Month</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.newThisMonth.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Filter className="w-6 h-6" />
                <span>Filter by Status</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Download className="w-6 h-6" />
                <span>Export Data</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Plus className="w-6 h-6" />
                <span>Bulk Actions</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Users className="w-6 h-6" />
                <span>Client Groups</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Client Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <ClientTable
            onClientSelect={handleClientSelect}
            onClientEdit={handleClientEdit}
            onClientDelete={handleClientDelete}
            loading={isLoading}
          />
        </motion.div>

        {/* Client Detail Modal */}
        <ClientDetailModal
          client={selectedClient}
          isOpen={isDetailModalOpen}
          onClose={handleCloseModal}
          onEdit={handleClientEdit}
        />
      </div>
    </AdminLayout>
  );
}
