/**
 * Data formatting utilities for the MADAS SaaS platform
 */

import { format, parseISO, isValid } from 'date-fns';

/**
 * Format currency amount
 */
export const formatCurrency = (
  amount: number,
  currency = 'USD',
  locale = 'en-US'
): string => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '$0.00';
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format currency with compact notation (K, M, B)
 */
export const formatCurrencyCompact = (
  amount: number,
  currency = 'USD',
  locale = 'en-US'
): string => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '$0';
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    notation: 'compact',
    compactDisplay: 'short',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(amount);
};

/**
 * Format percentage
 */
export const formatPercentage = (
  value: number,
  decimals = 1,
  locale = 'en-US'
): string => {
  if (typeof value !== 'number' || isNaN(value)) {
    return '0%';
  }

  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
};

/**
 * Format number with thousand separators
 */
export const formatNumber = (
  value: number,
  locale = 'en-US',
  options: Intl.NumberFormatOptions = {}
): string => {
  if (typeof value !== 'number' || isNaN(value)) {
    return '0';
  }

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  }).format(value);
};

/**
 * Format large numbers with K, M, B suffixes
 */
export const formatNumberCompact = (
  value: number,
  locale = 'en-US'
): string => {
  if (typeof value !== 'number' || isNaN(value)) {
    return '0';
  }

  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
  }).format(value);
};

/**
 * Format date
 */
export const formatDate = (
  date: string | Date,
  formatString = 'MMM dd, yyyy',
  locale = 'en-US'
): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    
    if (!isValid(dateObj)) {
      return 'Invalid Date';
    }

    return format(dateObj, formatString, { locale });
  } catch (error) {
    return 'Invalid Date';
  }
};

/**
 * Format date and time
 */
export const formatDateTime = (
  date: string | Date,
  formatString = 'MMM dd, yyyy HH:mm',
  locale = 'en-US'
): string => {
  return formatDate(date, formatString, locale);
};

/**
 * Format time only
 */
export const formatTime = (
  date: string | Date,
  formatString = 'HH:mm',
  locale = 'en-US'
): string => {
  return formatDate(date, formatString, locale);
};

/**
 * Format relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (
  date: string | Date,
  locale = 'en-US'
): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    
    if (!isValid(dateObj)) {
      return 'Invalid Date';
    }

    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

    if (diffInSeconds < 60) {
      return rtf.format(-diffInSeconds, 'second');
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return rtf.format(-minutes, 'minute');
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return rtf.format(-hours, 'hour');
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return rtf.format(-days, 'day');
    } else if (diffInSeconds < 31536000) {
      const months = Math.floor(diffInSeconds / 2592000);
      return rtf.format(-months, 'month');
    } else {
      const years = Math.floor(diffInSeconds / 31536000);
      return rtf.format(-years, 'year');
    }
  } catch (error) {
    return 'Invalid Date';
  }
};

/**
 * Format phone number
 */
export const formatPhoneNumber = (
  phone: string,
  locale = 'en-US'
): string => {
  if (!phone) return '';
  
  const cleaned = phone.replace(/\D/g, '');
  
  // US phone number formatting
  if (locale === 'en-US') {
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    } else if (cleaned.length === 11 && cleaned[0] === '1') {
      return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
  }
  
  return phone; // Return original if can't format
};

/**
 * Format file size
 */
export const formatFileSize = (
  bytes: number,
  locale = 'en-US'
): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Format duration in seconds to human readable format
 */
export const formatDuration = (seconds: number): string => {
  if (seconds < 60) {
    return `${Math.floor(seconds)}s`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    const remainingMinutes = Math.floor((seconds % 3600) / 60);
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  } else {
    const days = Math.floor(seconds / 86400);
    const remainingHours = Math.floor((seconds % 86400) / 3600);
    return remainingHours > 0 ? `${days}d ${remainingHours}h` : `${days}d`;
  }
};

/**
 * Format bytes per second to human readable format
 */
export const formatBandwidth = (bytesPerSecond: number): string => {
  const bitsPerSecond = bytesPerSecond * 8;
  
  if (bitsPerSecond < 1000) {
    return `${bitsPerSecond.toFixed(0)} bps`;
  } else if (bitsPerSecond < 1000000) {
    return `${(bitsPerSecond / 1000).toFixed(1)} Kbps`;
  } else if (bitsPerSecond < 1000000000) {
    return `${(bitsPerSecond / 1000000).toFixed(1)} Mbps`;
  } else {
    return `${(bitsPerSecond / 1000000000).toFixed(1)} Gbps`;
  }
};

/**
 * Format address
 */
export const formatAddress = (address: {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
}): string => {
  const parts = [
    address.street,
    `${address.city}, ${address.state} ${address.zipCode}`,
    address.country,
  ].filter(Boolean);
  
  return parts.join(', ');
};

/**
 * Format name with proper capitalization
 */
export const formatName = (name: string): string => {
  if (!name) return '';
  
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Format initials from name
 */
export const formatInitials = (name: string, maxLength = 2): string => {
  if (!name) return '';
  
  const words = name.trim().split(' ').filter(word => word.length > 0);
  
  if (words.length === 0) return '';
  
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  
  return words
    .slice(0, maxLength)
    .map(word => word.charAt(0).toUpperCase())
    .join('');
};

/**
 * Format credit card number (masked)
 */
export const formatCreditCard = (cardNumber: string): string => {
  if (!cardNumber) return '';
  
  const cleaned = cardNumber.replace(/\D/g, '');
  
  if (cleaned.length < 4) return cleaned;
  
  // Show last 4 digits, mask the rest
  const last4 = cleaned.slice(-4);
  const masked = '*'.repeat(Math.max(0, cleaned.length - 4));
  
  // Format with spaces every 4 digits
  const formatted = (masked + last4).replace(/(.{4})/g, '$1 ').trim();
  
  return formatted;
};

/**
 * Format order number with prefix
 */
export const formatOrderNumber = (
  orderId: string,
  prefix = 'ORD'
): string => {
  if (!orderId) return '';
  
  // Extract numeric part
  const numericPart = orderId.replace(/\D/g, '');
  
  // Pad with zeros if needed
  const paddedNumber = numericPart.padStart(6, '0');
  
  return `${prefix}-${paddedNumber}`;
};

/**
 * Format SKU with prefix
 */
export const formatSKU = (
  sku: string,
  prefix = 'SKU'
): string => {
  if (!sku) return '';
  
  // Remove existing prefix if present
  const cleanSku = sku.replace(/^[A-Z]+-/, '');
  
  return `${prefix}-${cleanSku}`;
};

/**
 * Format status with proper styling
 */
export const formatStatus = (status: string): {
  text: string;
  variant: 'success' | 'warning' | 'error' | 'info' | 'default';
} => {
  const statusMap: Record<string, { text: string; variant: string }> = {
    active: { text: 'Active', variant: 'success' },
    inactive: { text: 'Inactive', variant: 'default' },
    pending: { text: 'Pending', variant: 'warning' },
    cancelled: { text: 'Cancelled', variant: 'error' },
    completed: { text: 'Completed', variant: 'success' },
    processing: { text: 'Processing', variant: 'info' },
    failed: { text: 'Failed', variant: 'error' },
    expired: { text: 'Expired', variant: 'error' },
    trial: { text: 'Trial', variant: 'info' },
    paid: { text: 'Paid', variant: 'success' },
    unpaid: { text: 'Unpaid', variant: 'error' },
    overdue: { text: 'Overdue', variant: 'error' },
  };
  
  const normalizedStatus = status.toLowerCase();
  return statusMap[normalizedStatus] || { text: formatName(status), variant: 'default' };
};

/**
 * Format plan name with styling
 */
export const formatPlanName = (plan: string): {
  text: string;
  variant: 'primary' | 'secondary' | 'success' | 'warning';
} => {
  const planMap: Record<string, { text: string; variant: string }> = {
    starter: { text: 'Starter', variant: 'primary' },
    professional: { text: 'Professional', variant: 'secondary' },
    enterprise: { text: 'Enterprise', variant: 'success' },
    free: { text: 'Free', variant: 'warning' },
  };
  
  const normalizedPlan = plan.toLowerCase();
  return planMap[normalizedPlan] || { text: formatName(plan), variant: 'primary' };
};

/**
 * Format business type
 */
export const formatBusinessType = (type: string): string => {
  const typeMap: Record<string, string> = {
    retail: 'Retail Store',
    restaurant: 'Restaurant',
    service: 'Service Business',
    ecommerce: 'E-commerce',
    wholesale: 'Wholesale',
    other: 'Other',
  };
  
  return typeMap[type.toLowerCase()] || formatName(type);
};

/**
 * Format user role
 */
export const formatUserRole = (role: string): string => {
  const roleMap: Record<string, string> = {
    owner: 'Owner',
    manager: 'Manager',
    cashier: 'Cashier',
    staff: 'Staff',
    admin: 'Administrator',
    super_admin: 'Super Administrator',
    support: 'Support',
    analyst: 'Analyst',
  };
  
  return roleMap[role.toLowerCase()] || formatName(role);
};
