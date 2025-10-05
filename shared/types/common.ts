/**
 * Common types used across the MADAS SaaS platform
 */

export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
  timestamp: string;
  requestId?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, any>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  meta: {
    queryTime: number; // in milliseconds
    cached: boolean;
    cacheExpiry?: string;
  };
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: string;
  description?: string;
  group?: string;
}

export interface FilterOption {
  key: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'multiselect' | 'boolean';
  options?: SelectOption[];
  placeholder?: string;
  defaultValue?: any;
}

export interface SortOption {
  key: string;
  label: string;
  direction: 'asc' | 'desc';
  default?: boolean;
}

export interface TableColumn<T = any> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: T) => React.ReactNode;
  headerRender?: () => React.ReactNode;
}

export interface TableConfig<T = any> {
  columns: TableColumn<T>[];
  pagination?: boolean;
  sorting?: boolean;
  filtering?: boolean;
  selection?: boolean;
  actions?: TableAction<T>[];
  rowKey?: keyof T;
  loading?: boolean;
  emptyState?: React.ReactNode;
}

export interface TableAction<T = any> {
  key: string;
  label: string;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  onClick: (row: T) => void;
  disabled?: (row: T) => boolean;
  hidden?: (row: T) => boolean;
}

export interface SearchConfig {
  placeholder: string;
  debounceMs?: number;
  minLength?: number;
  filters?: FilterOption[];
  suggestions?: string[];
  recent?: string[];
}

export interface LoadingState {
  isLoading: boolean;
  error?: string;
  retry?: () => void;
}

export interface ErrorState {
  error: string;
  code?: string;
  details?: Record<string, any>;
  retry?: () => void;
  timestamp: string;
}

export interface SuccessState {
  message: string;
  type?: 'success' | 'info' | 'warning';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ModalConfig {
  title: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
  maskClosable?: boolean;
  footer?: React.ReactNode;
  onClose?: () => void;
  onConfirm?: () => void;
}

export interface FormConfig {
  fields: FormField[];
  validation?: ValidationConfig;
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
  disabled?: boolean;
  layout?: 'vertical' | 'horizontal' | 'inline';
}

export interface FormField {
  name: string;
  type: FormFieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  defaultValue?: any;
  options?: SelectOption[];
  validation?: FieldValidation;
  help?: string;
  dependencies?: string[];
}

export type FormFieldType = 
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'textarea'
  | 'select'
  | 'multiselect'
  | 'checkbox'
  | 'radio'
  | 'date'
  | 'datetime'
  | 'time'
  | 'file'
  | 'color'
  | 'range';

export interface FieldValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
  message?: string;
}

export interface ValidationConfig {
  mode?: 'onChange' | 'onBlur' | 'onSubmit';
  revalidateMode?: 'onChange' | 'onBlur' | 'onSubmit';
  criteriaMode?: 'firstError' | 'all';
}

export interface FileUpload {
  file: File;
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
  thumbnail?: string;
}

export interface FileUploadConfig {
  accept?: string;
  maxSize?: number; // in bytes
  maxFiles?: number;
  multiple?: boolean;
  autoUpload?: boolean;
  thumbnail?: boolean;
  preview?: boolean;
}

export interface ChartConfig {
  type: ChartType;
  data: any[];
  options?: ChartOptions;
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  plugins?: any[];
}

export type ChartType = 
  | 'line'
  | 'bar'
  | 'pie'
  | 'doughnut'
  | 'radar'
  | 'polarArea'
  | 'scatter'
  | 'bubble';

export interface ChartOptions {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  plugins?: {
    legend?: {
      position?: 'top' | 'bottom' | 'left' | 'right';
      display?: boolean;
    };
    tooltip?: {
      enabled?: boolean;
      mode?: 'index' | 'point' | 'nearest' | 'single' | 'label' | 'x-axis' | 'dataset';
    };
    title?: {
      display?: boolean;
      text?: string;
    };
  };
  scales?: {
    x?: AxisConfig;
    y?: AxisConfig;
  };
}

export interface AxisConfig {
  display?: boolean;
  title?: {
    display?: boolean;
    text?: string;
  };
  min?: number;
  max?: number;
  ticks?: {
    stepSize?: number;
    callback?: (value: any) => string;
  };
}

export interface NotificationConfig {
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
  closable?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom';
}

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
  active?: boolean;
}

export interface MenuItem {
  key: string;
  label: string;
  icon?: string;
  href?: string;
  children?: MenuItem[];
  disabled?: boolean;
  hidden?: boolean;
  badge?: string | number;
  permission?: string;
}

export interface TabItem {
  key: string;
  label: string;
  icon?: string;
  content: React.ReactNode;
  disabled?: boolean;
  hidden?: boolean;
  badge?: string | number;
}

export interface StepItem {
  key: string;
  title: string;
  description?: string;
  icon?: string;
  status: 'pending' | 'current' | 'completed' | 'error';
  disabled?: boolean;
}

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'default';
  icon?: string;
  user?: {
    name: string;
    avatar?: string;
  };
  metadata?: Record<string, any>;
}

export interface ProgressConfig {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
  animated?: boolean;
  striped?: boolean;
}

export interface TooltipConfig {
  content: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click' | 'focus';
  delay?: number;
  disabled?: boolean;
}

export interface DropdownConfig {
  items: DropdownItem[];
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  trigger?: 'hover' | 'click';
  disabled?: boolean;
}

export interface DropdownItem {
  key: string;
  label: string;
  icon?: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  hidden?: boolean;
  divider?: boolean;
  group?: string;
}

export interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  meta?: boolean;
  action: () => void;
  description?: string;
  global?: boolean;
}

export interface ThemeConfig {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    warning: string;
    success: string;
    info: string;
  };
  fonts: {
    primary: string;
    secondary: string;
    mono: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
}

export interface LocalizationConfig {
  locale: string;
  currency: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  numberFormat: {
    decimal: string;
    thousands: string;
    precision: number;
  };
  translations: Record<string, string>;
}

export interface CacheConfig {
  key: string;
  ttl: number; // Time to live in seconds
  tags?: string[];
  version?: string;
}

export interface CacheEntry<T = any> {
  data: T;
  timestamp: number;
  ttl: number;
  tags: string[];
  version: string;
}

export interface RateLimitConfig {
  key: string;
  limit: number;
  window: number; // in seconds
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

export interface FeatureFlag {
  key: string;
  enabled: boolean;
  description?: string;
  rolloutPercentage?: number;
  targetUsers?: string[];
  targetBusinesses?: string[];
  conditions?: Record<string, any>;
  expiresAt?: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  details: Record<string, any>;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  businessId?: string;
}

export interface SystemInfo {
  version: string;
  build: string;
  environment: 'development' | 'staging' | 'production';
  uptime: number;
  memory: {
    used: number;
    total: number;
  };
  cpu: {
    usage: number;
    cores: number;
  };
  disk: {
    used: number;
    total: number;
  };
  lastUpdated: string;
}

export interface HealthCheck {
  service: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  responseTime: number;
  lastChecked: string;
  details?: Record<string, any>;
  dependencies?: HealthCheck[];
}

export interface MetricsData {
  name: string;
  value: number;
  unit?: string;
  timestamp: string;
  tags?: Record<string, string>;
  metadata?: Record<string, any>;
}

export interface AlertRule {
  id: string;
  name: string;
  description?: string;
  condition: string;
  threshold: number;
  operator: 'gt' | 'gte' | 'lt' | 'lte' | 'eq' | 'neq';
  severity: 'low' | 'medium' | 'high' | 'critical';
  enabled: boolean;
  actions: AlertAction[];
  cooldown: number; // in minutes
  lastTriggered?: string;
}

export interface AlertAction {
  type: 'email' | 'sms' | 'webhook' | 'slack';
  config: Record<string, any>;
  enabled: boolean;
}

export interface AlertInstance {
  id: string;
  ruleId: string;
  triggeredAt: string;
  resolvedAt?: string;
  status: 'active' | 'resolved' | 'acknowledged';
  value: number;
  threshold: number;
  message: string;
  actions: AlertAction[];
  acknowledgedBy?: string;
  acknowledgedAt?: string;
}
