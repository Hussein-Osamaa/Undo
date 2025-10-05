/**
 * Support ticket table component with filtering and management actions
 */

'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Clock,
  AlertTriangle,
  CheckCircle,
  User,
  MessageSquare,
  Paperclip,
  MoreHorizontal,
  Eye,
  Edit,
  Archive,
  Tag,
  Calendar,
  Mail,
} from 'lucide-react';
import { Button, Input, Card, CardContent, CardHeader, CardTitle } from '@madas/shared';

interface SupportTicket {
  id: string;
  ticketNumber: string;
  businessName: string;
  ownerName: string;
  email: string;
  subject: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'waiting_customer' | 'resolved' | 'closed';
  category: 'technical' | 'billing' | 'feature_request' | 'general' | 'bug_report';
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  messageCount: number;
  attachments: number;
  tags: string[];
  estimatedResponseTime: string;
  actualResponseTime?: string;
}

interface SupportTicketTableProps {
  tickets: SupportTicket[];
  onTicketSelect?: (ticket: SupportTicket) => void;
  onTicketEdit?: (ticket: SupportTicket) => void;
  onTicketAssign?: (ticket: SupportTicket) => void;
  loading?: boolean;
}

const mockTickets: SupportTicket[] = [
  {
    id: '1',
    ticketNumber: 'T-2024-001',
    businessName: "Bella's Boutique",
    ownerName: 'Sarah Johnson',
    email: 'sarah@bellasboutique.com',
    subject: 'Payment processing issue',
    description: 'Unable to process payments through the POS system',
    priority: 'high',
    status: 'open',
    category: 'technical',
    assignedTo: 'John Doe',
    createdAt: '2024-01-20T10:30:00Z',
    updatedAt: '2024-01-20T10:30:00Z',
    messageCount: 3,
    attachments: 1,
    tags: ['payment', 'pos', 'urgent'],
    estimatedResponseTime: '2 hours',
  },
  {
    id: '2',
    ticketNumber: 'T-2024-002',
    businessName: 'TechStore Pro',
    ownerName: 'Michael Chen',
    email: 'michael@techstorepro.com',
    subject: 'Feature request: Bulk product import',
    description: 'Would like to import products in bulk from CSV',
    priority: 'medium',
    status: 'in_progress',
    category: 'feature_request',
    assignedTo: 'Jane Smith',
    createdAt: '2024-01-19T14:20:00Z',
    updatedAt: '2024-01-20T09:15:00Z',
    messageCount: 5,
    attachments: 2,
    tags: ['feature', 'import', 'products'],
    estimatedResponseTime: '4 hours',
    actualResponseTime: '1 hour',
  },
  {
    id: '3',
    ticketNumber: 'T-2024-003',
    businessName: 'Green Earth Café',
    ownerName: 'Emily Rodriguez',
    email: 'emily@greenearthcafe.com',
    subject: 'Billing question about subscription',
    description: 'Need clarification on the billing cycle and pricing',
    priority: 'low',
    status: 'resolved',
    category: 'billing',
    assignedTo: 'John Doe',
    createdAt: '2024-01-18T16:45:00Z',
    updatedAt: '2024-01-19T11:30:00Z',
    resolvedAt: '2024-01-19T11:30:00Z',
    messageCount: 2,
    attachments: 0,
    tags: ['billing', 'subscription'],
    estimatedResponseTime: '8 hours',
    actualResponseTime: '2 hours',
  },
  {
    id: '4',
    ticketNumber: 'T-2024-004',
    businessName: 'Fashion Forward',
    ownerName: 'David Thompson',
    email: 'david@fashionforward.com',
    subject: 'App crashes when adding new products',
    description: 'The app crashes every time I try to add a new product',
    priority: 'urgent',
    status: 'waiting_customer',
    category: 'bug_report',
    assignedTo: 'Jane Smith',
    createdAt: '2024-01-17T09:15:00Z',
    updatedAt: '2024-01-20T08:45:00Z',
    messageCount: 7,
    attachments: 3,
    tags: ['bug', 'crash', 'products', 'critical'],
    estimatedResponseTime: '1 hour',
    actualResponseTime: '30 minutes',
  },
  {
    id: '5',
    ticketNumber: 'T-2024-005',
    businessName: 'Urban Fashion Co.',
    ownerName: 'Lisa Park',
    email: 'lisa@urbanfashion.com',
    subject: 'General inquiry about integrations',
    description: 'What third-party integrations are available?',
    priority: 'low',
    status: 'closed',
    category: 'general',
    assignedTo: 'John Doe',
    createdAt: '2024-01-16T13:20:00Z',
    updatedAt: '2024-01-18T14:30:00Z',
    resolvedAt: '2024-01-18T14:30:00Z',
    messageCount: 4,
    attachments: 0,
    tags: ['integrations', 'general'],
    estimatedResponseTime: '8 hours',
    actualResponseTime: '1 hour',
  },
];

export const SupportTicketTable: React.FC<SupportTicketTableProps> = ({
  tickets = mockTickets,
  onTicketSelect,
  onTicketEdit,
  onTicketAssign,
  loading = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [assignedFilter, setAssignedFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof SupportTicket>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);

  const filteredAndSortedTickets = useMemo(() => {
    let filtered = tickets.filter(ticket => {
      const matchesSearch = 
        ticket.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
      const matchesCategory = categoryFilter === 'all' || ticket.category === categoryFilter;
      const matchesAssigned = assignedFilter === 'all' || ticket.assignedTo === assignedFilter;
      
      return matchesSearch && matchesStatus && matchesPriority && matchesCategory && matchesAssigned;
    });

    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });

    return filtered;
  }, [tickets, searchQuery, statusFilter, priorityFilter, categoryFilter, assignedFilter, sortField, sortDirection]);

  const handleSort = (field: keyof SupportTicket) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectTicket = (ticketId: string) => {
    setSelectedTickets(prev =>
      prev.includes(ticketId)
        ? prev.filter(id => id !== ticketId)
        : [...prev, ticketId]
    );
  };

  const handleSelectAll = () => {
    setSelectedTickets(
      selectedTickets.length === filteredAndSortedTickets.length
        ? []
        : filteredAndSortedTickets.map(ticket => ticket.id)
    );
  };

  const getPriorityBadge = (priority: SupportTicket['priority']) => {
    const priorityConfig = {
      low: { color: 'bg-gray-100 text-gray-800', label: 'Low', icon: Clock },
      medium: { color: 'bg-yellow-100 text-yellow-800', label: 'Medium', icon: Clock },
      high: { color: 'bg-orange-100 text-orange-800', label: 'High', icon: AlertTriangle },
      urgent: { color: 'bg-red-100 text-red-800', label: 'Urgent', icon: AlertTriangle },
    };

    const config = priorityConfig[priority];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    );
  };

  const getStatusBadge = (status: SupportTicket['status']) => {
    const statusConfig = {
      open: { color: 'bg-blue-100 text-blue-800', label: 'Open', icon: Clock },
      in_progress: { color: 'bg-yellow-100 text-yellow-800', label: 'In Progress', icon: Clock },
      waiting_customer: { color: 'bg-purple-100 text-purple-800', label: 'Waiting Customer', icon: User },
      resolved: { color: 'bg-green-100 text-green-800', label: 'Resolved', icon: CheckCircle },
      closed: { color: 'bg-gray-100 text-gray-800', label: 'Closed', icon: CheckCircle },
    };

    const config = statusConfig[status];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    );
  };

  const getCategoryBadge = (category: SupportTicket['category']) => {
    const categoryConfig = {
      technical: { color: 'bg-blue-100 text-blue-800', label: 'Technical' },
      billing: { color: 'bg-green-100 text-green-800', label: 'Billing' },
      feature_request: { color: 'bg-purple-100 text-purple-800', label: 'Feature Request' },
      general: { color: 'bg-gray-100 text-gray-800', label: 'General' },
      bug_report: { color: 'bg-red-100 text-red-800', label: 'Bug Report' },
    };

    const config = categoryConfig[category];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getResponseTimeColor = (ticket: SupportTicket) => {
    if (!ticket.actualResponseTime) return 'text-gray-500';
    
    const estimated = parseInt(ticket.estimatedResponseTime);
    const actual = parseInt(ticket.actualResponseTime);
    
    if (actual <= estimated) return 'text-green-600';
    if (actual <= estimated * 1.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Support Tickets</CardTitle>
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
          <CardTitle>Support Tickets ({filteredAndSortedTickets.length})</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              New Ticket
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Filters */}
        <div className="filter-bar mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search tickets..."
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
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="waiting_customer">Waiting Customer</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>

            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="technical">Technical</option>
              <option value="billing">Billing</option>
              <option value="feature_request">Feature Request</option>
              <option value="general">General</option>
              <option value="bug_report">Bug Report</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedTickets.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">
                {selectedTickets.length} ticket(s) selected
              </span>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Tag className="w-4 h-4 mr-2" />
                  Add Tags
                </Button>
                <Button variant="outline" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Assign
                </Button>
                <Button variant="outline" size="sm">
                  <Archive className="w-4 h-4 mr-2" />
                  Archive
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
                    checked={selectedTickets.length === filteredAndSortedTickets.length && filteredAndSortedTickets.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </th>
                <th>
                  <button
                    onClick={() => handleSort('ticketNumber')}
                    className="flex items-center space-x-1 font-medium hover:text-primary"
                  >
                    <span>Ticket</span>
                    {sortField === 'ticketNumber' && (
                      <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th>
                <th>Business</th>
                <th>Subject</th>
                <th>
                  <button
                    onClick={() => handleSort('priority')}
                    className="flex items-center space-x-1 font-medium hover:text-primary"
                  >
                    <span>Priority</span>
                    {sortField === 'priority' && (
                      <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th>
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
                <th>Category</th>
                <th>Assigned To</th>
                <th>
                  <button
                    onClick={() => handleSort('createdAt')}
                    className="flex items-center space-x-1 font-medium hover:text-primary"
                  >
                    <span>Created</span>
                    {sortField === 'createdAt' && (
                      <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th>
                <th>Response Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedTickets.map((ticket) => (
                <motion.tr
                  key={ticket.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => onTicketSelect?.(ticket)}
                >
                  <td onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedTickets.includes(ticket.id)}
                      onChange={() => handleSelectTicket(ticket.id)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </td>
                  <td>
                    <div>
                      <div className="font-medium text-gray-900">{ticket.ticketNumber}</div>
                      <div className="text-xs text-gray-500">{getTimeAgo(ticket.createdAt)}</div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="font-medium text-gray-900">{ticket.businessName}</div>
                      <div className="text-sm text-gray-500">{ticket.ownerName}</div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="font-medium text-gray-900 line-clamp-1">{ticket.subject}</div>
                      <div className="text-xs text-gray-500">
                        {ticket.messageCount} messages • {ticket.attachments} attachments
                      </div>
                    </div>
                  </td>
                  <td>{getPriorityBadge(ticket.priority)}</td>
                  <td>{getStatusBadge(ticket.status)}</td>
                  <td>{getCategoryBadge(ticket.category)}</td>
                  <td>
                    <div className="text-sm text-gray-900">
                      {ticket.assignedTo || 'Unassigned'}
                    </div>
                  </td>
                  <td>
                    <div className="text-sm text-gray-900">
                      {formatDate(ticket.createdAt)}
                    </div>
                  </td>
                  <td>
                    <div className={`text-sm font-medium ${getResponseTimeColor(ticket)}`}>
                      {ticket.actualResponseTime || ticket.estimatedResponseTime}
                    </div>
                    {ticket.actualResponseTime && (
                      <div className="text-xs text-gray-500">
                        Est: {ticket.estimatedResponseTime}
                      </div>
                    )}
                  </td>
                  <td>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onTicketSelect?.(ticket);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onTicketEdit?.(ticket);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onTicketAssign?.(ticket);
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
        {filteredAndSortedTickets.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery || statusFilter !== 'all' || priorityFilter !== 'all' || categoryFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'No support tickets have been created yet'}
            </p>
            {(searchQuery || statusFilter !== 'all' || priorityFilter !== 'all' || categoryFilter !== 'all') && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                  setPriorityFilter('all');
                  setCategoryFilter('all');
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
