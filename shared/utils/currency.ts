/**
 * Currency utilities for the MADAS SaaS platform
 */

/**
 * Currency configuration
 */
export const CURRENCY_CONFIG = {
  USD: { symbol: '$', decimals: 2, position: 'before' },
  EUR: { symbol: '€', decimals: 2, position: 'after' },
  GBP: { symbol: '£', decimals: 2, position: 'before' },
  CAD: { symbol: 'C$', decimals: 2, position: 'before' },
  AUD: { symbol: 'A$', decimals: 2, position: 'before' },
  JPY: { symbol: '¥', decimals: 0, position: 'before' },
  CNY: { symbol: '¥', decimals: 2, position: 'before' },
  INR: { symbol: '₹', decimals: 2, position: 'before' },
  BRL: { symbol: 'R$', decimals: 2, position: 'before' },
  MXN: { symbol: '$', decimals: 2, position: 'before' },
} as const;

export type CurrencyCode = keyof typeof CURRENCY_CONFIG;

/**
 * Format currency amount
 */
export const formatCurrencyAmount = (
  amount: number,
  currency: CurrencyCode = 'USD',
  locale: string = 'en-US'
): string => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '0.00';
  }

  const config = CURRENCY_CONFIG[currency];
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: config.decimals,
    maximumFractionDigits: config.decimals,
  }).format(amount);
};

/**
 * Format currency amount with custom symbol
 */
export const formatCurrencyWithSymbol = (
  amount: number,
  symbol: string = '$',
  decimals: number = 2,
  position: 'before' | 'after' = 'before'
): string => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '0.00';
  }

  const formattedAmount = amount.toFixed(decimals);
  
  return position === 'before' 
    ? `${symbol}${formattedAmount}`
    : `${formattedAmount}${symbol}`;
};

/**
 * Parse currency string to number
 */
export const parseCurrencyString = (
  currencyString: string,
  currency: CurrencyCode = 'USD'
): number => {
  if (!currencyString || typeof currencyString !== 'string') {
    return 0;
  }

  const config = CURRENCY_CONFIG[currency];
  const symbol = config.symbol;
  
  // Remove currency symbol and other non-numeric characters except decimal point
  const cleaned = currencyString
    .replace(new RegExp(`\\${symbol}`, 'g'), '')
    .replace(/[^\d.-]/g, '');
  
  const parsed = parseFloat(cleaned);
  
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Convert amount between currencies (requires exchange rate)
 */
export const convertCurrency = (
  amount: number,
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode,
  exchangeRate: number
): number => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return 0;
  }

  if (fromCurrency === toCurrency) {
    return amount;
  }

  return amount * exchangeRate;
};

/**
 * Get currency symbol
 */
export const getCurrencySymbol = (currency: CurrencyCode): string => {
  return CURRENCY_CONFIG[currency]?.symbol || '$';
};

/**
 * Get currency decimals
 */
export const getCurrencyDecimals = (currency: CurrencyCode): number => {
  return CURRENCY_CONFIG[currency]?.decimals || 2;
};

/**
 * Check if currency code is valid
 */
export const isValidCurrency = (currency: string): currency is CurrencyCode => {
  return currency in CURRENCY_CONFIG;
};

/**
 * Format percentage
 */
export const formatPercentage = (
  value: number,
  decimals: number = 1,
  locale: string = 'en-US'
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
  locale: string = 'en-US',
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
export const formatCompactNumber = (
  value: number,
  locale: string = 'en-US'
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
 * Calculate percentage change
 */
export const calculatePercentageChange = (
  oldValue: number,
  newValue: number
): number => {
  if (oldValue === 0) {
    return newValue > 0 ? 100 : 0;
  }

  return ((newValue - oldValue) / Math.abs(oldValue)) * 100;
};

/**
 * Calculate compound annual growth rate (CAGR)
 */
export const calculateCAGR = (
  beginningValue: number,
  endingValue: number,
  numberOfYears: number
): number => {
  if (beginningValue <= 0 || endingValue <= 0 || numberOfYears <= 0) {
    return 0;
  }

  return Math.pow(endingValue / beginningValue, 1 / numberOfYears) - 1;
};

/**
 * Calculate simple interest
 */
export const calculateSimpleInterest = (
  principal: number,
  rate: number,
  time: number
): number => {
  return principal * rate * time;
};

/**
 * Calculate compound interest
 */
export const calculateCompoundInterest = (
  principal: number,
  rate: number,
  time: number,
  compoundingFrequency: number = 1
): number => {
  return principal * Math.pow(1 + (rate / compoundingFrequency), compoundingFrequency * time);
};

/**
 * Calculate monthly payment for loan
 */
export const calculateMonthlyPayment = (
  principal: number,
  annualRate: number,
  years: number
): number => {
  if (annualRate === 0) {
    return principal / (years * 12);
  }

  const monthlyRate = annualRate / 12 / 100;
  const numberOfPayments = years * 12;

  return principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
         (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
};

/**
 * Calculate present value
 */
export const calculatePresentValue = (
  futureValue: number,
  rate: number,
  periods: number
): number => {
  return futureValue / Math.pow(1 + rate, periods);
};

/**
 * Calculate future value
 */
export const calculateFutureValue = (
  presentValue: number,
  rate: number,
  periods: number
): number => {
  return presentValue * Math.pow(1 + rate, periods);
};

/**
 * Calculate net present value (NPV)
 */
export const calculateNPV = (
  cashFlows: number[],
  discountRate: number
): number => {
  return cashFlows.reduce((npv, cashFlow, period) => {
    return npv + (cashFlow / Math.pow(1 + discountRate, period));
  }, 0);
};

/**
 * Calculate internal rate of return (IRR)
 */
export const calculateIRR = (
  cashFlows: number[],
  guess: number = 0.1
): number => {
  const maxIterations = 100;
  const tolerance = 0.0001;

  let rate = guess;
  
  for (let i = 0; i < maxIterations; i++) {
    const npv = calculateNPV(cashFlows, rate);
    
    if (Math.abs(npv) < tolerance) {
      return rate;
    }

    // Calculate derivative for Newton-Raphson method
    let derivative = 0;
    for (let j = 0; j < cashFlows.length; j++) {
      derivative -= (j * cashFlows[j]) / Math.pow(1 + rate, j + 1);
    }

    if (derivative === 0) {
      break;
    }

    rate = rate - npv / derivative;
  }

  return rate;
};

/**
 * Calculate price with tax
 */
export const calculatePriceWithTax = (
  price: number,
  taxRate: number
): number => {
  return price * (1 + taxRate / 100);
};

/**
 * Calculate tax amount
 */
export const calculateTaxAmount = (
  price: number,
  taxRate: number
): number => {
  return price * (taxRate / 100);
};

/**
 * Calculate discount amount
 */
export const calculateDiscountAmount = (
  price: number,
  discountRate: number
): number => {
  return price * (discountRate / 100);
};

/**
 * Calculate price after discount
 */
export const calculatePriceAfterDiscount = (
  price: number,
  discountRate: number
): number => {
  return price * (1 - discountRate / 100);
};

/**
 * Calculate markup percentage
 */
export const calculateMarkupPercentage = (
  cost: number,
  sellingPrice: number
): number => {
  if (cost === 0) return 0;
  return ((sellingPrice - cost) / cost) * 100;
};

/**
 * Calculate margin percentage
 */
export const calculateMarginPercentage = (
  cost: number,
  sellingPrice: number
): number => {
  if (sellingPrice === 0) return 0;
  return ((sellingPrice - cost) / sellingPrice) * 100;
};

/**
 * Calculate break-even point
 */
export const calculateBreakEvenPoint = (
  fixedCosts: number,
  variableCostPerUnit: number,
  sellingPricePerUnit: number
): number => {
  const contributionMargin = sellingPricePerUnit - variableCostPerUnit;
  if (contributionMargin <= 0) return Infinity;
  return fixedCosts / contributionMargin;
};

/**
 * Calculate gross profit
 */
export const calculateGrossProfit = (
  revenue: number,
  costOfGoodsSold: number
): number => {
  return revenue - costOfGoodsSold;
};

/**
 * Calculate net profit
 */
export const calculateNetProfit = (
  revenue: number,
  expenses: number
): number => {
  return revenue - expenses;
};

/**
 * Calculate profit margin
 */
export const calculateProfitMargin = (
  netProfit: number,
  revenue: number
): number => {
  if (revenue === 0) return 0;
  return (netProfit / revenue) * 100;
};

/**
 * Calculate return on investment (ROI)
 */
export const calculateROI = (
  gain: number,
  cost: number
): number => {
  if (cost === 0) return 0;
  return ((gain - cost) / cost) * 100;
};

/**
 * Calculate payback period
 */
export const calculatePaybackPeriod = (
  initialInvestment: number,
  annualCashFlow: number
): number => {
  if (annualCashFlow <= 0) return Infinity;
  return initialInvestment / annualCashFlow;
};

/**
 * Round to nearest cent
 */
export const roundToCent = (amount: number): number => {
  return Math.round(amount * 100) / 100;
};

/**
 * Round to nearest dollar
 */
export const roundToDollar = (amount: number): number => {
  return Math.round(amount);
};

/**
 * Round up to nearest cent
 */
export const roundUpToCent = (amount: number): number => {
  return Math.ceil(amount * 100) / 100;
};

/**
 * Round down to nearest cent
 */
export const roundDownToCent = (amount: number): number => {
  return Math.floor(amount * 100) / 100;
};

/**
 * Check if amount is positive
 */
export const isPositiveAmount = (amount: number): boolean => {
  return amount > 0;
};

/**
 * Check if amount is negative
 */
export const isNegativeAmount = (amount: number): boolean => {
  return amount < 0;
};

/**
 * Check if amount is zero
 */
export const isZeroAmount = (amount: number): boolean => {
  return amount === 0;
};

/**
 * Get absolute amount
 */
export const getAbsoluteAmount = (amount: number): number => {
  return Math.abs(amount);
};

/**
 * Get sign of amount
 */
export const getAmountSign = (amount: number): 'positive' | 'negative' | 'zero' => {
  if (amount > 0) return 'positive';
  if (amount < 0) return 'negative';
  return 'zero';
};
