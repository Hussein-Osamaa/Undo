/**
 * Business-related types for the MADAS SaaS platform
 */

export interface Business {
  businessId: string;
  businessName: string;
  businessType: BusinessType;
  storeType: StoreType;
  owner: BusinessOwner;
  subscription: BusinessSubscription;
  settings: BusinessSettings;
  limits: BusinessLimits;
  usage: BusinessUsage;
  platformMetrics: PlatformMetrics;
  metadata: BusinessMetadata;
  staff: BusinessStaff[];
  integrations: BusinessIntegrations;
}

export type BusinessType = 'retail' | 'restaurant' | 'service' | 'ecommerce' | 'wholesale' | 'other';

export type StoreType = 'physical' | 'online' | 'both';

export interface BusinessOwner {
  userId: string;
  email: string;
  name: string;
  phone?: string;
}

export interface BusinessSubscription {
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  trialEndsAt?: string;
  stripePriceId: string;
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  billingCycle: BillingCycle;
  nextBillingDate: string;
  lastPaymentDate?: string;
  paymentMethod?: PaymentMethod;
}

export interface BusinessSettings {
  currency: string;
  timezone: string;
  taxRate: number;
  logo?: string;
  address: BusinessAddress;
  contact: BusinessContact;
  preferences: BusinessPreferences;
  branding: BusinessBranding;
}

export interface BusinessAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface BusinessContact {
  phone: string;
  email: string;
  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface BusinessPreferences {
  language: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  notifications: NotificationPreferences;
  privacy: PrivacySettings;
}

export interface NotificationPreferences {
  email: {
    orderNotifications: boolean;
    lowStockAlerts: boolean;
    paymentAlerts: boolean;
    marketingEmails: boolean;
    systemUpdates: boolean;
  };
  push: {
    orderNotifications: boolean;
    lowStockAlerts: boolean;
    paymentAlerts: boolean;
  };
  sms: {
    orderNotifications: boolean;
    lowStockAlerts: boolean;
    paymentAlerts: boolean;
  };
}

export interface PrivacySettings {
  shareAnalytics: boolean;
  allowMarketing: boolean;
  dataRetentionPeriod: number; // in days
  gdprCompliant: boolean;
}

export interface BusinessBranding {
  primaryColor: string;
  secondaryColor: string;
  logo?: string;
  favicon?: string;
  customDomain?: string;
  emailSignature?: string;
}

export interface BusinessLimits {
  maxProducts: number;
  maxUsers: number;
  maxOrders: number;
  maxCustomers: number;
  maxLocations: number;
  maxApiCalls: number;
  storageLimit: number; // in MB
  customFeatures: string[];
}

export interface BusinessUsage {
  currentProducts: number;
  currentUsers: number;
  currentMonthOrders: number;
  currentCustomers: number;
  currentLocations: number;
  currentMonthApiCalls: number;
  storageUsed: number; // in MB
  lastResetDate: string;
}

export interface PlatformMetrics {
  totalRevenue: number; // Total processed through their business
  totalOrders: number;
  totalCustomers: number;
  avgOrderValue: number;
  lifetimeValue: number;
  conversionRate: number;
  retentionRate: number;
  growthRate: number;
}

export interface BusinessMetadata {
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  lastActivityAt: string;
  signupSource: string;
  referralCode?: string;
  tags: string[];
  notes?: string;
  healthScore: number; // 0-100
  riskLevel: 'low' | 'medium' | 'high';
}

export interface BusinessStaff {
  userId: string;
  email: string;
  name: string;
  role: BusinessRole;
  status: StaffStatus;
  permissions: BusinessPermissions;
  invitedAt: string;
  approvedAt?: string;
  lastActiveAt?: string;
  department?: string;
  hourlyRate?: number;
  schedule?: StaffSchedule;
}

export type StaffStatus = 'active' | 'inactive' | 'pending' | 'suspended';

export interface StaffSchedule {
  monday: TimeSlot[];
  tuesday: TimeSlot[];
  wednesday: TimeSlot[];
  thursday: TimeSlot[];
  friday: TimeSlot[];
  saturday: TimeSlot[];
  sunday: TimeSlot[];
}

export interface TimeSlot {
  start: string; // HH:mm format
  end: string; // HH:mm format
  type: 'work' | 'break' | 'overtime';
}

export interface BusinessIntegrations {
  stripe: {
    connected: boolean;
    accountId?: string;
    webhookConfigured: boolean;
  };
  email: {
    provider: 'sendgrid' | 'mailgun' | 'ses' | 'other';
    configured: boolean;
    templateId?: string;
  };
  analytics: {
    googleAnalytics?: string;
    facebookPixel?: string;
    customTracking?: string;
  };
  social: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  accounting: {
    quickbooks?: string;
    xero?: string;
    other?: string;
  };
  shipping: {
    ups?: string;
    fedex?: string;
    usps?: string;
    dhl?: string;
  };
}

export interface BusinessRole {
  name: string;
  permissions: BusinessPermissions;
  description: string;
  isDefault: boolean;
  level: number; // Higher number = more permissions
}

export interface BusinessPermissions {
  canManageProducts: boolean;
  canManageOrders: boolean;
  canManageStaff: boolean;
  canViewReports: boolean;
  canManageFinance: boolean;
  canAccessPOS: boolean;
  canManageCustomers: boolean;
  canManageInventory: boolean;
  canAccessWebsiteBuilder: boolean;
  canManageSettings: boolean;
  canManageIntegrations: boolean;
  canViewAnalytics: boolean;
  canExportData: boolean;
  canManageSubscription: boolean;
}

export interface BusinessInvite {
  inviteId: string;
  businessId: string;
  email: string;
  role: BusinessRole;
  permissions: BusinessPermissions;
  invitedBy: string;
  invitedAt: string;
  expiresAt: string;
  status: 'pending' | 'accepted' | 'expired' | 'cancelled';
  acceptedAt?: string;
  token: string;
}

export interface BusinessActivity {
  activityId: string;
  businessId: string;
  userId: string;
  type: BusinessActivityType;
  description: string;
  metadata: Record<string, any>;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
}

export type BusinessActivityType = 
  | 'user_login'
  | 'user_logout'
  | 'product_created'
  | 'product_updated'
  | 'product_deleted'
  | 'order_created'
  | 'order_updated'
  | 'order_cancelled'
  | 'customer_created'
  | 'customer_updated'
  | 'staff_invited'
  | 'staff_removed'
  | 'settings_updated'
  | 'subscription_changed'
  | 'payment_processed'
  | 'report_generated'
  | 'data_exported';

export interface BusinessHealth {
  score: number; // 0-100
  factors: HealthFactor[];
  recommendations: string[];
  lastCalculated: string;
}

export interface HealthFactor {
  name: string;
  weight: number;
  score: number;
  status: 'good' | 'warning' | 'critical';
  description: string;
}

export interface BusinessStats {
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  startDate: string;
  endDate: string;
  revenue: number;
  orders: number;
  customers: number;
  products: number;
  staff: number;
  growth: {
    revenue: number;
    orders: number;
    customers: number;
  };
  topProducts: ProductPerformance[];
  topCustomers: CustomerPerformance[];
}

export interface ProductPerformance {
  productId: string;
  name: string;
  revenue: number;
  quantity: number;
  orders: number;
}

export interface CustomerPerformance {
  customerId: string;
  name: string;
  revenue: number;
  orders: number;
  lastOrderDate: string;
}

// Import related types
import { SubscriptionPlan, SubscriptionStatus, BillingCycle } from './subscription';
import { BusinessRole } from './user';
