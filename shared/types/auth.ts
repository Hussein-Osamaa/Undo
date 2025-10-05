/**
 * Authentication-related types for the MADAS SaaS platform
 */

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  emailVerified: boolean;
  createdAt: string;
  lastLoginAt: string;
  phoneNumber?: string;
  isAdmin?: boolean;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupData {
  email: string;
  password: string;
  displayName: string;
  businessName: string;
  plan: SubscriptionPlan;
  phoneNumber?: string;
  businessEmail?: string;
}

export interface PasswordResetData {
  email: string;
}

export interface AuthError {
  code: string;
  message: string;
}

export interface AdminUser extends User {
  role: AdminRole;
  permissions: AdminPermissions;
  lastActiveAt: string;
  ipWhitelist?: string[];
}

export type AdminRole = 'super_admin' | 'admin' | 'support' | 'analyst';

export interface AdminPermissions {
  canViewAllBusinesses: boolean;
  canModifySubscriptions: boolean;
  canAccessFinancials: boolean;
  canManageAdmins: boolean;
  canViewSupport: boolean;
  canManagePlatformSettings: boolean;
  canExportData: boolean;
}

export interface BusinessUser extends User {
  businessId: string;
  role: BusinessRole;
  permissions: BusinessPermissions;
  status: UserStatus;
  invitedAt?: string;
  approvedAt?: string;
  lastActiveAt: string;
}

export type BusinessRole = 'owner' | 'manager' | 'cashier' | 'staff';

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
}

export type UserStatus = 'active' | 'inactive' | 'pending' | 'suspended';

export interface SessionData {
  userId: string;
  businessId: string;
  email: string;
  displayName: string;
  businessName: string;
  role: BusinessRole;
  plan: SubscriptionPlan;
  permissions: BusinessPermissions;
  loginTime: string;
  lastActivityAt: string;
  isAuthenticated: boolean;
  sessionId: string;
}

export interface AuthContextType {
  user: User | null;
  businessUser: BusinessUser | null;
  adminUser: AdminUser | null;
  sessionData: SessionData | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (data: PasswordResetData) => Promise<void>;
  switchBusiness: (businessId: string) => Promise<void>;
  hasPermission: (permission: keyof BusinessPermissions) => boolean;
  hasAdminPermission: (permission: keyof AdminPermissions) => boolean;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermissions?: (keyof BusinessPermissions)[];
  requiredAdminPermissions?: (keyof AdminPermissions)[];
  fallback?: React.ReactNode;
}

export interface SocialAuthProvider {
  providerId: 'google' | 'github' | 'facebook' | 'twitter';
  providerName: string;
  icon: string;
  enabled: boolean;
}

export interface TwoFactorAuth {
  enabled: boolean;
  secret?: string;
  backupCodes?: string[];
  lastUsed?: string;
}

export interface LoginAttempt {
  email: string;
  timestamp: string;
  success: boolean;
  ipAddress: string;
  userAgent: string;
  failureReason?: string;
}

export interface SecuritySettings {
  requireEmailVerification: boolean;
  requireTwoFactor: boolean;
  sessionTimeout: number; // in minutes
  maxLoginAttempts: number;
  lockoutDuration: number; // in minutes
  ipWhitelist: string[];
  allowedDomains: string[];
}

// Import related types
import { SubscriptionPlan } from './subscription';
import { BusinessRole } from './business';
