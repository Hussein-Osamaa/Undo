/**
 * User-related types for the MADAS SaaS platform
 */

export interface User {
  uid: string;
  email: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  photoURL?: string;
  emailVerified: boolean;
  phoneNumber?: string;
  createdAt: string;
  lastLoginAt: string;
  isActive: boolean;
  preferences: UserPreferences;
  metadata: UserMetadata;
}

export interface UserPreferences {
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  theme: 'light' | 'dark' | 'system';
  notifications: NotificationPreferences;
  privacy: PrivacyPreferences;
}

export interface NotificationPreferences {
  email: {
    marketing: boolean;
    updates: boolean;
    security: boolean;
    billing: boolean;
    support: boolean;
  };
  push: {
    enabled: boolean;
    marketing: boolean;
    updates: boolean;
    security: boolean;
  };
  sms: {
    enabled: boolean;
    security: boolean;
    billing: boolean;
  };
}

export interface PrivacyPreferences {
  profileVisibility: 'public' | 'private' | 'business_only';
  dataSharing: boolean;
  analyticsTracking: boolean;
  marketingEmails: boolean;
  twoFactorAuth: boolean;
}

export interface UserMetadata {
  signupSource: string;
  referralCode?: string;
  ipAddress?: string;
  userAgent?: string;
  lastActiveAt: string;
  loginCount: number;
  failedLoginAttempts: number;
  lastFailedLogin?: string;
  accountLocked: boolean;
  lockoutExpiresAt?: string;
}

export interface UserProfile {
  uid: string;
  personal: PersonalInfo;
  professional: ProfessionalInfo;
  contact: ContactInfo;
  social: SocialInfo;
  settings: UserSettings;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  bio?: string;
  avatar?: string;
}

export interface ProfessionalInfo {
  title?: string;
  company?: string;
  industry?: string;
  experience?: string;
  skills?: string[];
  linkedinUrl?: string;
  portfolioUrl?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  address?: Address;
  website?: string;
  timezone: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface SocialInfo {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface UserSettings {
  dashboard: DashboardSettings;
  security: SecuritySettings;
  integrations: IntegrationSettings;
  accessibility: AccessibilitySettings;
}

export interface DashboardSettings {
  defaultView: 'dashboard' | 'products' | 'orders' | 'customers';
  widgets: string[];
  layout: 'grid' | 'list';
  density: 'compact' | 'comfortable' | 'spacious';
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark' | 'auto';
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  backupCodes?: string[];
  trustedDevices: TrustedDevice[];
  loginAlerts: boolean;
  passwordExpiry: number; // in days
  sessionTimeout: number; // in minutes
}

export interface TrustedDevice {
  deviceId: string;
  name: string;
  type: 'desktop' | 'mobile' | 'tablet';
  browser?: string;
  os?: string;
  location?: string;
  addedAt: string;
  lastUsed: string;
}

export interface IntegrationSettings {
  calendar: {
    provider: 'google' | 'outlook' | 'apple' | 'none';
    connected: boolean;
    syncEnabled: boolean;
  };
  email: {
    provider: 'gmail' | 'outlook' | 'yahoo' | 'other';
    connected: boolean;
    syncEnabled: boolean;
  };
  storage: {
    provider: 'google_drive' | 'dropbox' | 'onedrive' | 'none';
    connected: boolean;
    syncEnabled: boolean;
  };
}

export interface AccessibilitySettings {
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  colorBlindSupport: boolean;
}

export interface UserActivity {
  activityId: string;
  userId: string;
  type: UserActivityType;
  description: string;
  metadata: Record<string, any>;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  sessionId?: string;
}

export type UserActivityType = 
  | 'login'
  | 'logout'
  | 'profile_updated'
  | 'password_changed'
  | 'email_changed'
  | 'phone_changed'
  | 'two_factor_enabled'
  | 'two_factor_disabled'
  | 'device_trusted'
  | 'device_removed'
  | 'settings_updated'
  | 'preferences_changed'
  | 'integration_connected'
  | 'integration_disconnected'
  | 'data_exported'
  | 'account_deleted';

export interface UserSession {
  sessionId: string;
  userId: string;
  deviceInfo: DeviceInfo;
  location: LocationInfo;
  createdAt: string;
  lastActivityAt: string;
  expiresAt: string;
  isActive: boolean;
  ipAddress: string;
  userAgent: string;
}

export interface DeviceInfo {
  type: 'desktop' | 'mobile' | 'tablet';
  os: string;
  browser: string;
  version: string;
  isTrusted: boolean;
}

export interface LocationInfo {
  country: string;
  region: string;
  city: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  isp?: string;
  timezone: string;
}

export interface UserInvitation {
  invitationId: string;
  email: string;
  invitedBy: string;
  businessId: string;
  role: BusinessRole;
  permissions: BusinessPermissions;
  invitedAt: string;
  expiresAt: string;
  status: 'pending' | 'accepted' | 'expired' | 'cancelled';
  acceptedAt?: string;
  token: string;
  message?: string;
}

export interface UserNotification {
  notificationId: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  read: boolean;
  createdAt: string;
  readAt?: string;
  expiresAt?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: NotificationCategory;
}

export type NotificationType = 
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'system'
  | 'marketing'
  | 'security'
  | 'billing'
  | 'support';

export type NotificationCategory = 
  | 'general'
  | 'security'
  | 'billing'
  | 'support'
  | 'marketing'
  | 'system'
  | 'business';

export interface UserRole {
  roleId: string;
  name: string;
  description: string;
  permissions: BusinessPermissions;
  level: number; // Higher number = more permissions
  isDefault: boolean;
  isCustom: boolean;
  businessId?: string; // If custom role
  createdBy?: string;
  createdAt?: string;
}

export interface UserPermission {
  permission: keyof BusinessPermissions;
  granted: boolean;
  grantedBy?: string;
  grantedAt?: string;
  expiresAt?: string;
  reason?: string;
}

export interface UserAnalytics {
  userId: string;
  period: 'daily' | 'weekly' | 'monthly';
  metrics: {
    logins: number;
    sessions: number;
    duration: number; // in minutes
    actions: number;
    featuresUsed: string[];
    devicesUsed: string[];
    locationsUsed: string[];
  };
  trends: {
    loginTrend: number[];
    activityTrend: number[];
    featureUsageTrend: Record<string, number[]>;
  };
  insights: {
    mostActiveTime: string;
    mostUsedFeature: string;
    preferredDevice: string;
    engagementScore: number; // 0-100
  };
}

export interface UserSupport {
  ticketId: string;
  userId: string;
  subject: string;
  description: string;
  category: SupportCategory;
  priority: SupportPriority;
  status: SupportStatus;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  messages: SupportMessage[];
  attachments: SupportAttachment[];
}

export type SupportCategory = 
  | 'technical'
  | 'billing'
  | 'feature_request'
  | 'bug_report'
  | 'account'
  | 'integration'
  | 'other';

export type SupportPriority = 'low' | 'medium' | 'high' | 'urgent';

export type SupportStatus = 'open' | 'in_progress' | 'waiting_for_user' | 'resolved' | 'closed';

export interface SupportMessage {
  messageId: string;
  senderId: string;
  senderType: 'user' | 'support';
  message: string;
  timestamp: string;
  read: boolean;
  attachments?: SupportAttachment[];
}

export interface SupportAttachment {
  attachmentId: string;
  filename: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
}

// Import related types
import { BusinessRole, BusinessPermissions } from './business';
