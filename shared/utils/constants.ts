/**
 * Constants for the MADAS SaaS platform
 */

/**
 * Subscription Plans Configuration
 */
export const SUBSCRIPTION_PLANS = {
  starter: {
    name: 'Starter',
    description: 'Perfect for small businesses getting started',
    price: {
      monthly: 29,
      yearly: 290, // 17% discount
    },
    currency: 'USD',
    features: {
      maxProducts: 100,
      maxUsers: 1,
      maxOrders: 500,
      maxCustomers: 1000,
      maxLocations: 1,
      maxApiCalls: 1000,
      storageLimit: 1024, // 1GB
      features: [
        'Basic POS',
        'Inventory Tracking',
        'Basic Reports',
        'Email Support',
        'Mobile App',
      ],
      integrations: ['Stripe'],
      support: 'basic' as const,
      sla: {
        uptime: 99.5,
        responseTime: 24,
        resolutionTime: 72,
      },
    },
    popular: false,
    cta: 'Start Free Trial',
    limitations: [
      'Limited to 1 user',
      'Basic reporting only',
      'No website builder',
      'No API access',
    ],
    benefits: [
      '14-day free trial',
      'No setup fees',
      'Cancel anytime',
      'Mobile responsive',
    ],
  },
  professional: {
    name: 'Professional',
    description: 'Advanced features for growing businesses',
    price: {
      monthly: 79,
      yearly: 790, // 17% discount
    },
    currency: 'USD',
    features: {
      maxProducts: 1000,
      maxUsers: 5,
      maxOrders: -1, // unlimited
      maxCustomers: -1, // unlimited
      maxLocations: 3,
      maxApiCalls: 10000,
      storageLimit: 5120, // 5GB
      features: [
        'Advanced POS',
        'Staff Management',
        'Advanced Reports',
        'Website Builder',
        'Priority Support',
        'Mobile App',
        'Inventory Alerts',
        'Customer Analytics',
      ],
      integrations: ['Stripe', 'QuickBooks', 'Shopify'],
      support: 'priority' as const,
      sla: {
        uptime: 99.9,
        responseTime: 12,
        resolutionTime: 48,
      },
    },
    popular: true,
    cta: 'Start Free Trial',
    limitations: [
      'Limited to 5 users',
      'No API access',
      'Limited integrations',
    ],
    benefits: [
      '14-day free trial',
      'No setup fees',
      'Cancel anytime',
      'Priority support',
      'Advanced analytics',
    ],
  },
  enterprise: {
    name: 'Enterprise',
    description: 'Complete solution for large businesses',
    price: {
      monthly: 199,
      yearly: 1990, // 17% discount
    },
    currency: 'USD',
    features: {
      maxProducts: -1, // unlimited
      maxUsers: -1, // unlimited
      maxOrders: -1, // unlimited
      maxCustomers: -1, // unlimited
      maxLocations: -1, // unlimited
      maxApiCalls: -1, // unlimited
      storageLimit: -1, // unlimited
      features: [
        'Everything in Professional',
        'Unlimited Users',
        'API Access',
        'Custom Integrations',
        'Dedicated Support',
        'White-label Options',
        'Advanced Security',
        'Custom Reports',
        'Multi-location Management',
      ],
      integrations: ['All Available'],
      support: 'dedicated' as const,
      sla: {
        uptime: 99.99,
        responseTime: 2,
        resolutionTime: 24,
      },
    },
    popular: false,
    cta: 'Contact Sales',
    limitations: [],
    benefits: [
      '14-day free trial',
      'No setup fees',
      'Cancel anytime',
      'Dedicated support',
      'Custom integrations',
      'API access',
      'White-label options',
    ],
  },
} as const;

/**
 * User Roles Configuration
 */
export const USER_ROLES = {
  owner: {
    name: 'Owner',
    description: 'Full access to everything',
    level: 100,
    permissions: {
      canManageProducts: true,
      canManageOrders: true,
      canManageStaff: true,
      canViewReports: true,
      canManageFinance: true,
      canAccessPOS: true,
      canManageCustomers: true,
      canManageInventory: true,
      canAccessWebsiteBuilder: true,
      canManageSettings: true,
      canManageIntegrations: true,
      canViewAnalytics: true,
      canExportData: true,
      canManageSubscription: true,
    },
  },
  manager: {
    name: 'Manager',
    description: 'Can manage operations but not business settings',
    level: 80,
    permissions: {
      canManageProducts: true,
      canManageOrders: true,
      canManageStaff: true,
      canViewReports: true,
      canManageFinance: true,
      canAccessPOS: true,
      canManageCustomers: true,
      canManageInventory: true,
      canAccessWebsiteBuilder: true,
      canManageSettings: false,
      canManageIntegrations: false,
      canViewAnalytics: true,
      canExportData: true,
      canManageSubscription: false,
    },
  },
  cashier: {
    name: 'Cashier',
    description: 'Can process sales and manage orders',
    level: 60,
    permissions: {
      canManageProducts: false,
      canManageOrders: true,
      canManageStaff: false,
      canViewReports: false,
      canManageFinance: false,
      canAccessPOS: true,
      canManageCustomers: true,
      canManageInventory: false,
      canAccessWebsiteBuilder: false,
      canManageSettings: false,
      canManageIntegrations: false,
      canViewAnalytics: false,
      canExportData: false,
      canManageSubscription: false,
    },
  },
  staff: {
    name: 'Staff',
    description: 'Limited access to view data',
    level: 40,
    permissions: {
      canManageProducts: false,
      canManageOrders: false,
      canManageStaff: false,
      canViewReports: false,
      canManageFinance: false,
      canAccessPOS: false,
      canManageCustomers: false,
      canManageInventory: false,
      canAccessWebsiteBuilder: false,
      canManageSettings: false,
      canManageIntegrations: false,
      canViewAnalytics: false,
      canExportData: false,
      canManageSubscription: false,
    },
  },
} as const;

/**
 * Admin Roles Configuration
 */
export const ADMIN_ROLES = {
  super_admin: {
    name: 'Super Administrator',
    description: 'Full system access',
    level: 100,
    permissions: {
      canViewAllBusinesses: true,
      canModifySubscriptions: true,
      canAccessFinancials: true,
      canManageAdmins: true,
      canViewSupport: true,
      canManagePlatformSettings: true,
      canExportData: true,
    },
  },
  admin: {
    name: 'Administrator',
    description: 'Standard admin access',
    level: 80,
    permissions: {
      canViewAllBusinesses: true,
      canModifySubscriptions: true,
      canAccessFinancials: true,
      canManageAdmins: false,
      canViewSupport: true,
      canManagePlatformSettings: false,
      canExportData: true,
    },
  },
  support: {
    name: 'Support',
    description: 'Support team access',
    level: 60,
    permissions: {
      canViewAllBusinesses: true,
      canModifySubscriptions: false,
      canAccessFinancials: false,
      canManageAdmins: false,
      canViewSupport: true,
      canManagePlatformSettings: false,
      canExportData: false,
    },
  },
  analyst: {
    name: 'Analyst',
    description: 'Analytics only access',
    level: 40,
    permissions: {
      canViewAllBusinesses: true,
      canModifySubscriptions: false,
      canAccessFinancials: true,
      canManageAdmins: false,
      canViewSupport: false,
      canManagePlatformSettings: false,
      canExportData: true,
    },
  },
} as const;

/**
 * Order Statuses
 */
export const ORDER_STATUSES = {
  pending: {
    name: 'Pending',
    color: 'warning',
    description: 'Order is waiting for processing',
  },
  processing: {
    name: 'Processing',
    color: 'info',
    description: 'Order is being prepared',
  },
  shipped: {
    name: 'Shipped',
    color: 'primary',
    description: 'Order has been shipped',
  },
  delivered: {
    name: 'Delivered',
    color: 'success',
    description: 'Order has been delivered',
  },
  cancelled: {
    name: 'Cancelled',
    color: 'error',
    description: 'Order has been cancelled',
  },
  refunded: {
    name: 'Refunded',
    color: 'secondary',
    description: 'Order has been refunded',
  },
} as const;

/**
 * Payment Methods
 */
export const PAYMENT_METHODS = {
  card: {
    name: 'Credit/Debit Card',
    icon: 'credit-card',
    enabled: true,
  },
  cash: {
    name: 'Cash',
    icon: 'dollar-sign',
    enabled: true,
  },
  bank_transfer: {
    name: 'Bank Transfer',
    icon: 'building-columns',
    enabled: true,
  },
  online: {
    name: 'Online Payment',
    icon: 'globe',
    enabled: true,
  },
  check: {
    name: 'Check',
    icon: 'file-text',
    enabled: false,
  },
  crypto: {
    name: 'Cryptocurrency',
    icon: 'coins',
    enabled: false,
  },
} as const;

/**
 * Business Types
 */
export const BUSINESS_TYPES = {
  retail: {
    name: 'Retail Store',
    description: 'Physical store selling products',
    icon: 'store',
    features: ['POS', 'Inventory', 'Customers'],
  },
  restaurant: {
    name: 'Restaurant',
    description: 'Food service business',
    icon: 'utensils',
    features: ['POS', 'Menu', 'Tables', 'Kitchen'],
  },
  service: {
    name: 'Service Business',
    description: 'Business providing services',
    icon: 'briefcase',
    features: ['Appointments', 'Services', 'Customers'],
  },
  ecommerce: {
    name: 'E-commerce',
    description: 'Online store',
    icon: 'shopping-cart',
    features: ['Online Store', 'Products', 'Orders'],
  },
  wholesale: {
    name: 'Wholesale',
    description: 'B2B sales business',
    icon: 'truck',
    features: ['Bulk Orders', 'Customers', 'Inventory'],
  },
  other: {
    name: 'Other',
    description: 'Other business type',
    icon: 'building',
    features: ['Custom Features'],
  },
} as const;

/**
 * Store Types
 */
export const STORE_TYPES = {
  physical: {
    name: 'Physical Store',
    description: 'Brick and mortar location',
    features: ['POS', 'Inventory', 'Staff'],
  },
  online: {
    name: 'Online Store',
    description: 'E-commerce website',
    features: ['Online Store', 'Digital Products', 'Shipping'],
  },
  both: {
    name: 'Both Physical & Online',
    description: 'Omnichannel business',
    features: ['POS', 'Online Store', 'Inventory Sync'],
  },
} as const;

/**
 * Support Categories
 */
export const SUPPORT_CATEGORIES = {
  technical: {
    name: 'Technical Issue',
    description: 'Bug reports and technical problems',
    priority: 'medium',
    sla: 24, // hours
  },
  billing: {
    name: 'Billing Question',
    description: 'Payment and subscription issues',
    priority: 'high',
    sla: 12, // hours
  },
  feature_request: {
    name: 'Feature Request',
    description: 'Suggestions for new features',
    priority: 'low',
    sla: 72, // hours
  },
  bug_report: {
    name: 'Bug Report',
    description: 'Report software bugs',
    priority: 'high',
    sla: 12, // hours
  },
  account: {
    name: 'Account Issue',
    description: 'Account and access problems',
    priority: 'high',
    sla: 12, // hours
  },
  integration: {
    name: 'Integration Help',
    description: 'Third-party integration support',
    priority: 'medium',
    sla: 24, // hours
  },
  other: {
    name: 'Other',
    description: 'General questions and other issues',
    priority: 'low',
    sla: 48, // hours
  },
} as const;

/**
 * Notification Types
 */
export const NOTIFICATION_TYPES = {
  success: {
    name: 'Success',
    color: 'green',
    icon: 'check-circle',
  },
  error: {
    name: 'Error',
    color: 'red',
    icon: 'x-circle',
  },
  warning: {
    name: 'Warning',
    color: 'yellow',
    icon: 'exclamation-triangle',
  },
  info: {
    name: 'Information',
    color: 'blue',
    icon: 'information-circle',
  },
} as const;

/**
 * File Upload Limits
 */
export const FILE_UPLOAD_LIMITS = {
  image: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    maxDimensions: { width: 4096, height: 4096 },
  },
  document: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  },
  csv: {
    maxSize: 2 * 1024 * 1024, // 2MB
    allowedTypes: ['text/csv', 'application/csv'],
  },
  video: {
    maxSize: 100 * 1024 * 1024, // 100MB
    allowedTypes: ['video/mp4', 'video/avi', 'video/mov', 'video/wmv'],
  },
} as const;

/**
 * API Rate Limits
 */
export const API_RATE_LIMITS = {
  auth: {
    login: { limit: 5, window: 900 }, // 5 attempts per 15 minutes
    passwordReset: { limit: 3, window: 3600 }, // 3 attempts per hour
    signup: { limit: 10, window: 3600 }, // 10 attempts per hour
  },
  general: {
    default: { limit: 1000, window: 3600 }, // 1000 requests per hour
    strict: { limit: 100, window: 3600 }, // 100 requests per hour
  },
  upload: {
    file: { limit: 50, window: 3600 }, // 50 uploads per hour
    image: { limit: 100, window: 3600 }, // 100 images per hour
  },
} as const;

/**
 * Cache TTL (Time To Live) in seconds
 */
export const CACHE_TTL = {
  user: 3600, // 1 hour
  business: 1800, // 30 minutes
  products: 900, // 15 minutes
  orders: 300, // 5 minutes
  analytics: 3600, // 1 hour
  reports: 1800, // 30 minutes
  static: 86400, // 24 hours
} as const;

/**
 * Pagination Limits
 */
export const PAGINATION_LIMITS = {
  default: 20,
  small: 10,
  medium: 50,
  large: 100,
  max: 1000,
} as const;

/**
 * Date Formats
 */
export const DATE_FORMATS = {
  short: 'MMM dd, yyyy',
  long: 'MMMM dd, yyyy',
  time: 'HH:mm',
  datetime: 'MMM dd, yyyy HH:mm',
  iso: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
  dateOnly: 'yyyy-MM-dd',
  timeOnly: 'HH:mm:ss',
} as const;

/**
 * Currency Codes
 */
export const CURRENCY_CODES = {
  USD: { name: 'US Dollar', symbol: '$', decimals: 2 },
  EUR: { name: 'Euro', symbol: '€', decimals: 2 },
  GBP: { name: 'British Pound', symbol: '£', decimals: 2 },
  CAD: { name: 'Canadian Dollar', symbol: 'C$', decimals: 2 },
  AUD: { name: 'Australian Dollar', symbol: 'A$', decimals: 2 },
  JPY: { name: 'Japanese Yen', symbol: '¥', decimals: 0 },
  CNY: { name: 'Chinese Yuan', symbol: '¥', decimals: 2 },
  INR: { name: 'Indian Rupee', symbol: '₹', decimals: 2 },
  BRL: { name: 'Brazilian Real', symbol: 'R$', decimals: 2 },
  MXN: { name: 'Mexican Peso', symbol: '$', decimals: 2 },
} as const;

/**
 * Time Zones
 */
export const TIME_ZONES = {
  'America/New_York': 'Eastern Time (ET)',
  'America/Chicago': 'Central Time (CT)',
  'America/Denver': 'Mountain Time (MT)',
  'America/Los_Angeles': 'Pacific Time (PT)',
  'Europe/London': 'Greenwich Mean Time (GMT)',
  'Europe/Paris': 'Central European Time (CET)',
  'Asia/Tokyo': 'Japan Standard Time (JST)',
  'Asia/Shanghai': 'China Standard Time (CST)',
  'Australia/Sydney': 'Australian Eastern Time (AET)',
  'UTC': 'Coordinated Universal Time (UTC)',
} as const;

/**
 * Feature Flags
 */
export const FEATURE_FLAGS = {
  websiteBuilder: 'website_builder',
  advancedReports: 'advanced_reports',
  apiAccess: 'api_access',
  whiteLabel: 'white_label',
  multiLocation: 'multi_location',
  customIntegrations: 'custom_integrations',
  aiAnalytics: 'ai_analytics',
  mobileApp: 'mobile_app',
  offlineMode: 'offline_mode',
  realTimeSync: 'real_time_sync',
} as const;

/**
 * Error Codes
 */
export const ERROR_CODES = {
  // Authentication errors
  AUTH_INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS',
  AUTH_USER_NOT_FOUND: 'AUTH_USER_NOT_FOUND',
  AUTH_EMAIL_NOT_VERIFIED: 'AUTH_EMAIL_NOT_VERIFIED',
  AUTH_ACCOUNT_LOCKED: 'AUTH_ACCOUNT_LOCKED',
  AUTH_TOKEN_EXPIRED: 'AUTH_TOKEN_EXPIRED',
  
  // Permission errors
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  PERMISSION_INSUFFICIENT: 'PERMISSION_INSUFFICIENT',
  
  // Validation errors
  VALIDATION_FAILED: 'VALIDATION_FAILED',
  VALIDATION_REQUIRED_FIELD: 'VALIDATION_REQUIRED_FIELD',
  VALIDATION_INVALID_FORMAT: 'VALIDATION_INVALID_FORMAT',
  
  // Business logic errors
  BUSINESS_LIMIT_EXCEEDED: 'BUSINESS_LIMIT_EXCEEDED',
  BUSINESS_NOT_FOUND: 'BUSINESS_NOT_FOUND',
  BUSINESS_INACTIVE: 'BUSINESS_INACTIVE',
  
  // Subscription errors
  SUBSCRIPTION_EXPIRED: 'SUBSCRIPTION_EXPIRED',
  SUBSCRIPTION_CANCELLED: 'SUBSCRIPTION_CANCELLED',
  SUBSCRIPTION_LIMIT_EXCEEDED: 'SUBSCRIPTION_LIMIT_EXCEEDED',
  
  // System errors
  SYSTEM_ERROR: 'SYSTEM_ERROR',
  SYSTEM_MAINTENANCE: 'SYSTEM_MAINTENANCE',
  SYSTEM_OVERLOADED: 'SYSTEM_OVERLOADED',
  
  // Network errors
  NETWORK_ERROR: 'NETWORK_ERROR',
  NETWORK_TIMEOUT: 'NETWORK_TIMEOUT',
  NETWORK_UNAVAILABLE: 'NETWORK_UNAVAILABLE',
} as const;
