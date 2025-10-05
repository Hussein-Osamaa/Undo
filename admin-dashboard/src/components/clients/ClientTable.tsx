/**
 * Client table component with filtering, sorting, and actions
 */

'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  Edit,
  Mail,
  Phone,
  Trash2,
  UserCheck,
  UserX,
  CreditCard,
  AlertTriangle,
} from 'lucide-react';
import { Button, Input, Card, CardContent, CardHeader, CardTitle } from '@madas/shared';

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

interface ClientTableProps {
  clients: Client[];
  onClientSelect?: (client: Client) => void;
  onClientEdit?: (client: Client) => void;
  onClientDelete?: (client: Client) => void;
  loading?: boolean;
}

const mockClients: Client[] = [
  {
    id: '1',
    businessName: "Bella's Boutique",
    ownerName: 'Sarah Johnson',
    email: 'sarah@bellasboutique.com',
    phone: '+1 (555) 123-4567',
    plan: 'professional',
    status: 'active',
    signupDate: '2024-01-15',
    lastActivity: '2024-01-20',
    revenue: 34567,
    orders: 1247,
    products: 245,
    users: 3,
    location: 'San Francisco, CA',
    website: 'bellasboutique.com',
  },
  {
    id: '2',
    businessName: 'TechStore Pro',
    ownerName: 'Michael Chen',
    email: 'michael@techstorepro.com',
    phone: '+1 (555) 234-5678',
    plan: 'enterprise',
    status: 'active',
    signupDate: '2024-01-10',
    lastActivity: '2024-01-20',
    revenue: 78901,
    orders: 2890,
    products: 1200,
    users: 8,
    location: 'New York, NY',
    website: 'techstorepro.com',
  },
  {
    id: '3',
    businessName: 'Green Earth Café',
    ownerName: 'Emily Rodriguez',
    email: 'emily@greenearthcafe.com',
    phone: '+1 (555) 345-6789',
    plan: 'starter',
    status: 'trial',
    signupDate: '2024-01-18',
    lastActivity: '2024-01-19',
    revenue: 0,
    orders: 45,
    products: 67,
    users: 1,
    location: 'Austin, TX',
  },
  {
    id: '4',
    businessName: 'Fashion Forward',
    ownerName: 'David Thompson',
    email: 'david@fashionforward.com',
    phone: '+1 (555) 456-7890',
    plan: 'professional',
    status: 'past_due',
    signupDate: '2024-01-05',
    lastActivity: '2024-01-15',
    revenue: 23456,
    orders: 890,
    products: 156,
    users: 4,
    location: 'Miami, FL',
    website: 'fashionforward.com',
  },
  {
    id: '5',
    businessName: 'Urban Fashion Co.',
    ownerName: 'Lisa Park',
    email: 'lisa@urbanfashion.com',
    phone: '+1 (555) 567-8901',
    plan: 'enterprise',
    status: 'active',
    signupDate: '2024-01-12',
    lastActivity: '2024-01-20',
    revenue: 67890,
    orders: 2156,
    products: 890,
    users: 12,
    location: 'Los Angeles, CA',
    website: 'urbanfashion.com',
  },
];

export const ClientTable: React.FC<ClientTableProps> = ({
  clients = mockClients,
  onClientSelect,
  onClientEdit,
  onClientDelete,
  loading = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [planFilter, setPlanFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof Client>('signupDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedClients, setSelectedClients] = useState<string[]>([]);

  const filteredAndSortedClients = useMemo(() => {
    let filtered = clients.filter(client => {
      const matchesSearch = 
        client.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
      const matchesPlan = planFilter === 'all' || client.plan === planFilter;
      
      return matchesSearch && matchesStatus && matchesPlan;
    });

    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });

    return filtered;
  }, [clients, searchQuery, statusFilter, planFilter, sortField, sortDirection]);

  const handleSort = (field: keyof Client) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectClient = (clientId: string) => {
    setSelectedClients(prev =>
      prev.includes(clientId)
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  const handleSelectAll = () => {
    setSelectedClients(
      selectedClients.length === filteredAndSortedClients.length
        ? []
        : filteredAndSortedClients.map(client => client.id)
    );
  };

  const getStatusBadge = (status: Client['status']) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Active' },
      trial: { color: 'bg-blue-100 text-blue-800', label: 'Trial' },
      cancelled: { color: 'bg-gray-100 text-gray-800', label: 'Cancelled' },
      past_due: { color: 'bg-red-100 text-red-800', label: 'Past Due' },
    };

    const config = statusConfig[status];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getPlanBadge = (plan: Client['plan']) => {
    const planConfig = {
      starter: { color: 'bg-gray-100 text-gray-800', label: 'Starter' },
      professional: { color: 'bg-blue-100 text-blue-800', label: 'Professional' },
      enterprise: { color: 'bg-purple-100 text-purple-800', label: 'Enterprise' },
    };

    const config = planConfig[plan];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse flex items-center space-x-4">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Clients ({filteredAndSortedClients.length})</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Filters */}
        <div className="filter-bar mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search clients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="trial">Trial</option>
              <option value="cancelled">Cancelled</option>
              <option value="past_due">Past Due</option>
            </select>

            {/* Plan Filter */}
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Plans</option>
              <option value="starter">Starter</option>
              <option value="professional">Professional</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedClients.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">
                {selectedClients.length} client(s) selected
              </span>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedClients.length === filteredAndSortedClients.length && filteredAndSortedClients.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </th>
                <th>
                  <button
                    onClick={() => handleSort('businessName')}
                    className="flex items-center space-x-1 font-medium hover:text-primary"
                  >
                    <span>Business</span>
                    {sortField === 'businessName' && (
                      <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th>
                <th>Owner</th>
                <th>Plan</th>
                <th>
                  <button
                    onClick={() => handleSort('status')}
                    className="flex items-center space-x-1 font-medium hover:text-primary"
                  >
                    <span>Status</span>
                    {sortField === 'status' && (
                      <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => handleSort('revenue')}
                    className="flex items-center space-x-1 font-medium hover:text-primary"
                  >
                    <span>Revenue</span>
                    {sortField === 'revenue' && (
                      <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => handleSort('signupDate')}
                    className="flex items-center space-x-1 font-medium hover:text-primary"
                  >
                    <span>Signup Date</span>
                    {sortField === 'signupDate' && (
                      <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedClients.map((client) => (
                <motion.tr
                  key={client.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => onClientSelect?.(client)}
                >
                  <td onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedClients.includes(client.id)}
                      onChange={() => handleSelectClient(client.id)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </td>
                  <td>
                    <div>
                      <div className="font-medium text-gray-900">{client.businessName}</div>
                      <div className="text-sm text-gray-500">{client.email}</div>
                      {client.website && (
                        <div className="text-xs text-blue-600">{client.website}</div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="font-medium text-gray-900">{client.ownerName}</div>
                      <div className="text-sm text-gray-500">{client.phone}</div>
                    </div>
                  </td>
                  <td>{getPlanBadge(client.plan)}</td>
                  <td>{getStatusBadge(client.status)}</td>
                  <td>
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(client.revenue)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {client.orders} orders
                    </div>
                  </td>
                  <td>
                    <div className="text-sm text-gray-900">
                      {formatDate(client.signupDate)}
                    </div>
                    <div className="text-xs text-gray-500">
                      Last: {formatDate(client.lastActivity)}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onClientSelect?.(client);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onClientEdit?.(client);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onClientDelete?.(client);
                        }}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredAndSortedClients.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery || statusFilter !== 'all' || planFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'No clients have signed up yet'}
            </p>
            {(searchQuery || statusFilter !== 'all' || planFilter !== 'all') && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                  setPlanFilter('all');
                }}
              >
                Clear filters
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
