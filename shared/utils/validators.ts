/**
 * Validation utilities for the MADAS SaaS platform
 */

/**
 * Validate email address
 */
export const isValidEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim().toLowerCase());
};

/**
 * Validate password strength
 */
export const isValidPassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (!password || typeof password !== 'string') {
    errors.push('Password is required');
    return { isValid: false, errors };
  }
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (password.length > 128) {
    errors.push('Password must be less than 128 characters');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  // Check for common weak passwords
  const commonPasswords = [
    'password', '123456', '123456789', 'qwerty', 'abc123',
    'password123', 'admin', 'letmein', 'welcome', 'monkey'
  ];
  
  if (commonPasswords.includes(password.toLowerCase())) {
    errors.push('Password is too common, please choose a stronger password');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate phone number
 */
export const isValidPhone = (phone: string): boolean => {
  if (!phone || typeof phone !== 'string') return false;
  
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
};

/**
 * Validate URL
 */
export const isValidUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate business name
 */
export const validateBusinessName = (name: string): {
  isValid: boolean;
  error?: string;
} => {
  if (!name || typeof name !== 'string') {
    return { isValid: false, error: 'Business name is required' };
  }
  
  const trimmed = name.trim();
  
  if (trimmed.length < 2) {
    return { isValid: false, error: 'Business name must be at least 2 characters long' };
  }
  
  if (trimmed.length > 100) {
    return { isValid: false, error: 'Business name must be less than 100 characters' };
  }
  
  // Check for invalid characters
  if (!/^[a-zA-Z0-9\s\-&.,()]+$/.test(trimmed)) {
    return { isValid: false, error: 'Business name contains invalid characters' };
  }
  
  return { isValid: true };
};

/**
 * Validate SKU format
 */
export const validateSKU = (sku: string): {
  isValid: boolean;
  error?: string;
} => {
  if (!sku || typeof sku !== 'string') {
    return { isValid: false, error: 'SKU is required' };
  }
  
  const trimmed = sku.trim();
  
  if (trimmed.length < 1) {
    return { isValid: false, error: 'SKU cannot be empty' };
  }
  
  if (trimmed.length > 50) {
    return { isValid: false, error: 'SKU must be less than 50 characters' };
  }
  
  // Check for valid characters (alphanumeric, hyphens, underscores)
  if (!/^[a-zA-Z0-9\-_]+$/.test(trimmed)) {
    return { isValid: false, error: 'SKU can only contain letters, numbers, hyphens, and underscores' };
  }
  
  return { isValid: true };
};

/**
 * Validate price
 */
export const validatePrice = (price: number | string): {
  isValid: boolean;
  error?: string;
  value?: number;
} => {
  if (price === null || price === undefined || price === '') {
    return { isValid: false, error: 'Price is required' };
  }
  
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (isNaN(numericPrice)) {
    return { isValid: false, error: 'Price must be a valid number' };
  }
  
  if (numericPrice < 0) {
    return { isValid: false, error: 'Price cannot be negative' };
  }
  
  if (numericPrice > 999999.99) {
    return { isValid: false, error: 'Price cannot exceed $999,999.99' };
  }
  
  // Check for too many decimal places
  if (numericPrice.toString().includes('.') && numericPrice.toString().split('.')[1].length > 2) {
    return { isValid: false, error: 'Price cannot have more than 2 decimal places' };
  }
  
  return { isValid: true, value: numericPrice };
};

/**
 * Validate quantity
 */
export const validateQuantity = (quantity: number | string): {
  isValid: boolean;
  error?: string;
  value?: number;
} => {
  if (quantity === null || quantity === undefined || quantity === '') {
    return { isValid: false, error: 'Quantity is required' };
  }
  
  const numericQuantity = typeof quantity === 'string' ? parseFloat(quantity) : quantity;
  
  if (isNaN(numericQuantity)) {
    return { isValid: false, error: 'Quantity must be a valid number' };
  }
  
  if (!Number.isInteger(numericQuantity)) {
    return { isValid: false, error: 'Quantity must be a whole number' };
  }
  
  if (numericQuantity < 0) {
    return { isValid: false, error: 'Quantity cannot be negative' };
  }
  
  if (numericQuantity > 999999) {
    return { isValid: false, error: 'Quantity cannot exceed 999,999' };
  }
  
  return { isValid: true, value: numericQuantity };
};

/**
 * Validate tax rate
 */
export const validateTaxRate = (rate: number | string): {
  isValid: boolean;
  error?: string;
  value?: number;
} => {
  if (rate === null || rate === undefined || rate === '') {
    return { isValid: true, value: 0 }; // Tax rate is optional
  }
  
  const numericRate = typeof rate === 'string' ? parseFloat(rate) : rate;
  
  if (isNaN(numericRate)) {
    return { isValid: false, error: 'Tax rate must be a valid number' };
  }
  
  if (numericRate < 0) {
    return { isValid: false, error: 'Tax rate cannot be negative' };
  }
  
  if (numericRate > 100) {
    return { isValid: false, error: 'Tax rate cannot exceed 100%' };
  }
  
  return { isValid: true, value: numericRate };
};

/**
 * Validate discount percentage
 */
export const validateDiscount = (discount: number | string): {
  isValid: boolean;
  error?: string;
  value?: number;
} => {
  if (discount === null || discount === undefined || discount === '') {
    return { isValid: true, value: 0 }; // Discount is optional
  }
  
  const numericDiscount = typeof discount === 'string' ? parseFloat(discount) : discount;
  
  if (isNaN(numericDiscount)) {
    return { isValid: false, error: 'Discount must be a valid number' };
  }
  
  if (numericDiscount < 0) {
    return { isValid: false, error: 'Discount cannot be negative' };
  }
  
  if (numericDiscount > 100) {
    return { isValid: false, error: 'Discount cannot exceed 100%' };
  }
  
  return { isValid: true, value: numericDiscount };
};

/**
 * Validate address
 */
export const validateAddress = (address: {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}): {
  isValid: boolean;
  errors: Record<string, string>;
} => {
  const errors: Record<string, string> = {};
  
  if (!address.street || address.street.trim().length < 5) {
    errors.street = 'Street address must be at least 5 characters';
  }
  
  if (!address.city || address.city.trim().length < 2) {
    errors.city = 'City is required and must be at least 2 characters';
  }
  
  if (!address.state || address.state.trim().length < 2) {
    errors.state = 'State is required and must be at least 2 characters';
  }
  
  if (!address.zipCode || address.zipCode.trim().length < 5) {
    errors.zipCode = 'ZIP code must be at least 5 characters';
  }
  
  if (!address.country || address.country.trim().length < 2) {
    errors.country = 'Country is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate credit card number
 */
export const validateCreditCard = (cardNumber: string): {
  isValid: boolean;
  error?: string;
  type?: string;
} => {
  if (!cardNumber || typeof cardNumber !== 'string') {
    return { isValid: false, error: 'Card number is required' };
  }
  
  const cleaned = cardNumber.replace(/\D/g, '');
  
  if (cleaned.length < 13 || cleaned.length > 19) {
    return { isValid: false, error: 'Card number must be between 13 and 19 digits' };
  }
  
  // Luhn algorithm validation
  let sum = 0;
  let isEven = false;
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  if (sum % 10 !== 0) {
    return { isValid: false, error: 'Invalid card number' };
  }
  
  // Detect card type
  let cardType = 'unknown';
  if (/^4/.test(cleaned)) {
    cardType = 'visa';
  } else if (/^5[1-5]/.test(cleaned)) {
    cardType = 'mastercard';
  } else if (/^3[47]/.test(cleaned)) {
    cardType = 'amex';
  } else if (/^6/.test(cleaned)) {
    cardType = 'discover';
  }
  
  return { isValid: true, type: cardType };
};

/**
 * Validate CVV
 */
export const validateCVV = (cvv: string, cardType?: string): {
  isValid: boolean;
  error?: string;
} => {
  if (!cvv || typeof cvv !== 'string') {
    return { isValid: false, error: 'CVV is required' };
  }
  
  const cleaned = cvv.replace(/\D/g, '');
  
  if (cardType === 'amex') {
    if (cleaned.length !== 4) {
      return { isValid: false, error: 'CVV must be 4 digits for American Express' };
    }
  } else {
    if (cleaned.length !== 3) {
      return { isValid: false, error: 'CVV must be 3 digits' };
    }
  }
  
  return { isValid: true };
};

/**
 * Validate expiration date
 */
export const validateExpirationDate = (month: string, year: string): {
  isValid: boolean;
  error?: string;
} => {
  if (!month || !year) {
    return { isValid: false, error: 'Expiration month and year are required' };
  }
  
  const monthNum = parseInt(month);
  const yearNum = parseInt(year);
  
  if (isNaN(monthNum) || isNaN(yearNum)) {
    return { isValid: false, error: 'Invalid expiration date' };
  }
  
  if (monthNum < 1 || monthNum > 12) {
    return { isValid: false, error: 'Invalid month' };
  }
  
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  
  if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
    return { isValid: false, error: 'Card has expired' };
  }
  
  return { isValid: true };
};

/**
 * Validate name (for cards, users, etc.)
 */
export const validateName = (name: string, fieldName = 'Name'): {
  isValid: boolean;
  error?: string;
} => {
  if (!name || typeof name !== 'string') {
    return { isValid: false, error: `${fieldName} is required` };
  }
  
  const trimmed = name.trim();
  
  if (trimmed.length < 2) {
    return { isValid: false, error: `${fieldName} must be at least 2 characters` };
  }
  
  if (trimmed.length > 50) {
    return { isValid: false, error: `${fieldName} must be less than 50 characters` };
  }
  
  // Check for valid characters (letters, spaces, hyphens, apostrophes)
  if (!/^[a-zA-Z\s\-']+$/.test(trimmed)) {
    return { isValid: false, error: `${fieldName} can only contain letters, spaces, hyphens, and apostrophes` };
  }
  
  return { isValid: true };
};

/**
 * Validate postal code
 */
export const validatePostalCode = (postalCode: string, country = 'US'): {
  isValid: boolean;
  error?: string;
} => {
  if (!postalCode || typeof postalCode !== 'string') {
    return { isValid: false, error: 'Postal code is required' };
  }
  
  const trimmed = postalCode.trim().toUpperCase();
  
  if (country === 'US') {
    // US ZIP code validation
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!zipRegex.test(trimmed)) {
      return { isValid: false, error: 'Invalid US ZIP code format' };
    }
  } else if (country === 'CA') {
    // Canadian postal code validation
    const canadianPostalRegex = /^[A-Z]\d[A-Z] \d[A-Z]\d$/;
    if (!canadianPostalRegex.test(trimmed)) {
      return { isValid: false, error: 'Invalid Canadian postal code format' };
    }
  } else if (country === 'UK') {
    // UK postal code validation (simplified)
    const ukPostalRegex = /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/;
    if (!ukPostalRegex.test(trimmed)) {
      return { isValid: false, error: 'Invalid UK postal code format' };
    }
  }
  
  return { isValid: true };
};

/**
 * Validate file upload
 */
export const validateFileUpload = (
  file: File,
  options: {
    maxSize?: number; // in bytes
    allowedTypes?: string[];
    required?: boolean;
  } = {}
): {
  isValid: boolean;
  error?: string;
} => {
  if (!file && options.required) {
    return { isValid: false, error: 'File is required' };
  }
  
  if (!file) {
    return { isValid: true };
  }
  
  // Check file size
  if (options.maxSize && file.size > options.maxSize) {
    const maxSizeMB = options.maxSize / (1024 * 1024);
    return { isValid: false, error: `File size must be less than ${maxSizeMB}MB` };
  }
  
  // Check file type
  if (options.allowedTypes && options.allowedTypes.length > 0) {
    const fileType = file.type;
    const isValidType = options.allowedTypes.some(type => {
      if (type.includes('*')) {
        // Wildcard type (e.g., 'image/*')
        return fileType.startsWith(type.replace('*', ''));
      }
      return fileType === type;
    });
    
    if (!isValidType) {
      return { isValid: false, error: `File type must be one of: ${options.allowedTypes.join(', ')}` };
    }
  }
  
  return { isValid: true };
};

/**
 * Validate date range
 */
export const validateDateRange = (
  startDate: string | Date,
  endDate: string | Date
): {
  isValid: boolean;
  error?: string;
} => {
  try {
    const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
    const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
    
    if (isNaN(start.getTime())) {
      return { isValid: false, error: 'Invalid start date' };
    }
    
    if (isNaN(end.getTime())) {
      return { isValid: false, error: 'Invalid end date' };
    }
    
    if (start >= end) {
      return { isValid: false, error: 'End date must be after start date' };
    }
    
    const diffInDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    if (diffInDays > 365) {
      return { isValid: false, error: 'Date range cannot exceed 365 days' };
    }
    
    return { isValid: true };
  } catch (error) {
    return { isValid: false, error: 'Invalid date format' };
  }
};
