/**
 * Subscription-related types for the MADAS SaaS platform
 */

export interface Subscription {
  subscriptionId: string;
  userId: string;
  businessId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  trialEndsAt?: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  stripePriceId: string;
  billingCycle: BillingCycle;
  paymentMethod: PaymentMethod;
  pricing: SubscriptionPricing;
  features: PlanFeatures;
  metadata: SubscriptionMetadata;
}

export type SubscriptionPlan = 'starter' | 'professional' | 'enterprise';

export type SubscriptionStatus = 
  | 'active' 
  | 'cancelled' 
  | 'expired' 
  | 'trial' 
  | 'past_due' 
  | 'unpaid' 
  | 'incomplete' 
  | 'incomplete_expired' 
  | 'trialing' 
  | 'paused';

export type BillingCycle = 'monthly' | 'yearly';

export interface PaymentMethod {
  type: 'card' | 'bank_account' | 'paypal' | 'apple_pay' | 'google_pay';
  last4?: string;
  brand?: string;
  expMonth?: number;
  expYear?: number;
  name?: string;
  stripePaymentMethodId?: string;
}

export interface SubscriptionPricing {
  amount: number; // in cents
  currency: string;
  interval: BillingCycle;
  intervalCount: number;
  annualDiscount?: number; // percentage
  setupFee?: number;
  trialPeriodDays?: number;
}

export interface PlanFeatures {
  maxProducts: number;
  maxUsers: number;
  maxOrders: number;
  maxCustomers: number;
  maxLocations: number;
  maxApiCalls: number;
  storageLimit: number; // in MB
  features: string[];
  integrations: string[];
  support: SupportLevel;
  sla: SLA;
}

export type SupportLevel = 'basic' | 'priority' | 'dedicated';

export interface SLA {
  uptime: number; // percentage
  responseTime: number; // in hours
  resolutionTime: number; // in hours
}

export interface SubscriptionMetadata {
  createdAt: string;
  updatedAt: string;
  cancelledAt?: string;
  cancelAtPeriodEnd: boolean;
  cancelReason?: string;
  reactivatedAt?: string;
  upgradeHistory: SubscriptionChange[];
  downgradeHistory: SubscriptionChange[];
  paymentHistory: PaymentRecord[];
  usageHistory: UsageRecord[];
}

export interface SubscriptionChange {
  fromPlan: SubscriptionPlan;
  toPlan: SubscriptionPlan;
  changedAt: string;
  changedBy: string;
  reason?: string;
  prorationAmount?: number;
}

export interface PaymentRecord {
  paymentId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  paidAt: string;
  failedAt?: string;
  retryCount: number;
  invoiceUrl?: string;
  receiptUrl?: string;
}

export type PaymentStatus = 'succeeded' | 'failed' | 'pending' | 'refunded' | 'partially_refunded';

export interface UsageRecord {
  period: string; // YYYY-MM format
  products: number;
  users: number;
  orders: number;
  customers: number;
  apiCalls: number;
  storageUsed: number; // in MB
  overages: UsageOverage[];
}

export interface UsageOverage {
  type: 'products' | 'users' | 'orders' | 'customers' | 'api_calls' | 'storage';
  limit: number;
  used: number;
  overage: number;
  charge: number; // in cents
}

export interface PlanComparison {
  starter: PlanDetails;
  professional: PlanDetails;
  enterprise: PlanDetails;
}

export interface PlanDetails {
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
    currency: string;
  };
  features: PlanFeatures;
  popular: boolean;
  cta: string;
  limitations: string[];
  benefits: string[];
}

export interface SubscriptionUpgrade {
  fromPlan: SubscriptionPlan;
  toPlan: SubscriptionPlan;
  immediate: boolean;
  prorationAmount: number;
  newBillingDate: string;
  featuresGained: string[];
  featuresLost: string[];
  costDifference: number;
}

export interface SubscriptionDowngrade {
  fromPlan: SubscriptionPlan;
  toPlan: SubscriptionPlan;
  effectiveDate: 'immediate' | 'end_of_period';
  refundAmount?: number;
  featuresLost: string[];
  limitations: string[];
  dataRetention: DataRetentionPolicy;
}

export interface DataRetentionPolicy {
  products: 'keep_all' | 'keep_within_limit' | 'archive_oldest';
  orders: 'keep_all' | 'keep_within_limit' | 'archive_oldest';
  customers: 'keep_all' | 'keep_within_limit' | 'archive_oldest';
  reports: 'keep_all' | 'keep_6_months' | 'keep_3_months' | 'delete_all';
  retentionPeriod: number; // in days
}

export interface TrialInfo {
  isTrial: boolean;
  trialEndsAt?: string;
  daysRemaining?: number;
  trialPlan: SubscriptionPlan;
  trialFeatures: PlanFeatures;
  conversionRate?: number;
  usageDuringTrial: TrialUsage;
}

export interface TrialUsage {
  productsCreated: number;
  ordersProcessed: number;
  customersAdded: number;
  staffInvited: number;
  featuresUsed: string[];
  lastActivity: string;
  engagementScore: number; // 0-100
}

export interface SubscriptionAnalytics {
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  mrr: number; // Monthly Recurring Revenue
  arr: number; // Annual Recurring Revenue
  churnRisk: ChurnRisk;
  usageTrends: UsageTrend[];
  featureAdoption: FeatureAdoption[];
  healthScore: number; // 0-100
  recommendations: string[];
}

export interface ChurnRisk {
  level: 'low' | 'medium' | 'high' | 'critical';
  score: number; // 0-100
  factors: ChurnFactor[];
  probability: number; // 0-1
  lastCalculated: string;
}

export interface ChurnFactor {
  factor: string;
  impact: 'low' | 'medium' | 'high';
  description: string;
  recommendation: string;
}

export interface UsageTrend {
  period: string;
  products: number;
  orders: number;
  customers: number;
  apiCalls: number;
  storage: number;
}

export interface FeatureAdoption {
  feature: string;
  adopted: boolean;
  lastUsed?: string;
  usageFrequency: 'never' | 'rarely' | 'sometimes' | 'frequently' | 'daily';
  valueRating?: number; // 1-5
}

export interface SubscriptionEvent {
  eventId: string;
  subscriptionId: string;
  type: SubscriptionEventType;
  data: Record<string, any>;
  timestamp: string;
  processed: boolean;
  retryCount: number;
}

export type SubscriptionEventType = 
  | 'subscription_created'
  | 'subscription_updated'
  | 'subscription_cancelled'
  | 'subscription_reactivated'
  | 'subscription_upgraded'
  | 'subscription_downgraded'
  | 'trial_started'
  | 'trial_ended'
  | 'payment_succeeded'
  | 'payment_failed'
  | 'invoice_created'
  | 'invoice_payment_succeeded'
  | 'invoice_payment_failed'
  | 'customer_created'
  | 'customer_updated'
  | 'usage_limit_reached'
  | 'overage_charged';

export interface SubscriptionWebhook {
  webhookId: string;
  subscriptionId: string;
  eventType: SubscriptionEventType;
  payload: Record<string, any>;
  receivedAt: string;
  processedAt?: string;
  status: 'pending' | 'processed' | 'failed' | 'retry';
  retryCount: number;
  errorMessage?: string;
}

export interface SubscriptionMetrics {
  totalSubscriptions: number;
  activeSubscriptions: number;
  trialSubscriptions: number;
  cancelledSubscriptions: number;
  mrr: number;
  arr: number;
  churnRate: number;
  conversionRate: number;
  averageRevenuePerUser: number;
  lifetimeValue: number;
  planDistribution: PlanDistribution;
  monthlyGrowth: number;
}

export interface PlanDistribution {
  starter: number;
  professional: number;
  enterprise: number;
}

export interface SubscriptionReport {
  reportId: string;
  type: 'usage' | 'billing' | 'churn' | 'growth';
  period: {
    start: string;
    end: string;
  };
  data: Record<string, any>;
  generatedAt: string;
  generatedBy: string;
  format: 'pdf' | 'csv' | 'json';
  downloadUrl?: string;
}
