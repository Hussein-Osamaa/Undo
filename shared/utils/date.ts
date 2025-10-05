/**
 * Date manipulation utilities for the MADAS SaaS platform
 */

import { format, parseISO, isValid, addDays, addMonths, addYears, subDays, subMonths, subYears, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, isSameDay, isSameMonth, isSameYear, isAfter, isBefore, differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';

/**
 * Format date with timezone support
 */
export const formatDateWithTimezone = (
  date: string | Date,
  formatString: string = 'MMM dd, yyyy',
  timezone?: string
): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    
    if (!isValid(dateObj)) {
      return 'Invalid Date';
    }

    if (timezone) {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(dateObj);
    }

    return format(dateObj, formatString);
  } catch (error) {
    return 'Invalid Date';
  }
};

/**
 * Get start of day
 */
export const getStartOfDay = (date: string | Date): Date => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return startOfDay(dateObj);
};

/**
 * Get end of day
 */
export const getEndOfDay = (date: string | Date): Date => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return endOfDay(dateObj);
};

/**
 * Get start of week
 */
export const getStartOfWeek = (date: string | Date): Date => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return startOfWeek(dateObj, { weekStartsOn: 1 }); // Monday
};

/**
 * Get end of week
 */
export const getEndOfWeek = (date: string | Date): Date => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return endOfWeek(dateObj, { weekStartsOn: 1 }); // Monday
};

/**
 * Get start of month
 */
export const getStartOfMonth = (date: string | Date): Date => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return startOfMonth(dateObj);
};

/**
 * Get end of month
 */
export const getEndOfMonth = (date: string | Date): Date => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return endOfMonth(dateObj);
};

/**
 * Get start of year
 */
export const getStartOfYear = (date: string | Date): Date => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return startOfYear(dateObj);
};

/**
 * Get end of year
 */
export const getEndOfYear = (date: string | Date): Date => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return endOfYear(dateObj);
};

/**
 * Add days to date
 */
export const addDaysToDate = (date: string | Date, days: number): Date => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return addDays(dateObj, days);
};

/**
 * Add months to date
 */
export const addMonthsToDate = (date: string | Date, months: number): Date => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return addMonths(dateObj, months);
};

/**
 * Add years to date
 */
export const addYearsToDate = (date: string | Date, years: number): Date => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return addYears(dateObj, years);
};

/**
 * Subtract days from date
 */
export const subtractDaysFromDate = (date: string | Date, days: number): Date => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return subDays(dateObj, days);
};

/**
 * Subtract months from date
 */
export const subtractMonthsFromDate = (date: string | Date, months: number): Date => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return subMonths(dateObj, months);
};

/**
 * Subtract years from date
 */
export const subtractYearsFromDate = (date: string | Date, years: number): Date => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return subYears(dateObj, years);
};

/**
 * Check if two dates are the same day
 */
export const isSameDate = (date1: string | Date, date2: string | Date): boolean => {
  const dateObj1 = typeof date1 === 'string' ? parseISO(date1) : date1;
  const dateObj2 = typeof date2 === 'string' ? parseISO(date2) : date2;
  return isSameDay(dateObj1, dateObj2);
};

/**
 * Check if two dates are in the same month
 */
export const isSameMonth = (date1: string | Date, date2: string | Date): boolean => {
  const dateObj1 = typeof date1 === 'string' ? parseISO(date1) : date1;
  const dateObj2 = typeof date2 === 'string' ? parseISO(date2) : date2;
  return isSameMonth(dateObj1, dateObj2);
};

/**
 * Check if two dates are in the same year
 */
export const isSameYear = (date1: string | Date, date2: string | Date): boolean => {
  const dateObj1 = typeof date1 === 'string' ? parseISO(date1) : date1;
  const dateObj2 = typeof date2 === 'string' ? parseISO(date2) : date2;
  return isSameYear(dateObj1, dateObj2);
};

/**
 * Check if first date is after second date
 */
export const isDateAfter = (date1: string | Date, date2: string | Date): boolean => {
  const dateObj1 = typeof date1 === 'string' ? parseISO(date1) : date1;
  const dateObj2 = typeof date2 === 'string' ? parseISO(date2) : date2;
  return isAfter(dateObj1, dateObj2);
};

/**
 * Check if first date is before second date
 */
export const isDateBefore = (date1: string | Date, date2: string | Date): boolean => {
  const dateObj1 = typeof date1 === 'string' ? parseISO(date1) : date1;
  const dateObj2 = typeof date2 === 'string' ? parseISO(date2) : date2;
  return isBefore(dateObj1, dateObj2);
};

/**
 * Get difference in days between two dates
 */
export const getDaysDifference = (date1: string | Date, date2: string | Date): number => {
  const dateObj1 = typeof date1 === 'string' ? parseISO(date1) : date1;
  const dateObj2 = typeof date2 === 'string' ? parseISO(date2) : date2;
  return differenceInDays(dateObj1, dateObj2);
};

/**
 * Get difference in hours between two dates
 */
export const getHoursDifference = (date1: string | Date, date2: string | Date): number => {
  const dateObj1 = typeof date1 === 'string' ? parseISO(date1) : date1;
  const dateObj2 = typeof date2 === 'string' ? parseISO(date2) : date2;
  return differenceInHours(dateObj1, dateObj2);
};

/**
 * Get difference in minutes between two dates
 */
export const getMinutesDifference = (date1: string | Date, date2: string | Date): number => {
  const dateObj1 = typeof date1 === 'string' ? parseISO(date1) : date1;
  const dateObj2 = typeof date2 === 'string' ? parseISO(date2) : date2;
  return differenceInMinutes(dateObj1, dateObj2);
};

/**
 * Get current date as ISO string
 */
export const getCurrentDateISO = (): string => {
  return new Date().toISOString();
};

/**
 * Get current date as Date object
 */
export const getCurrentDate = (): Date => {
  return new Date();
};

/**
 * Get yesterday's date
 */
export const getYesterday = (): Date => {
  return subtractDaysFromDate(new Date(), 1);
};

/**
 * Get tomorrow's date
 */
export const getTomorrow = (): Date => {
  return addDaysToDate(new Date(), 1);
};

/**
 * Get date range for last N days
 */
export const getLastNDays = (days: number): { start: Date; end: Date } => {
  const end = getEndOfDay(new Date());
  const start = getStartOfDay(subtractDaysFromDate(new Date(), days - 1));
  return { start, end };
};

/**
 * Get date range for last N weeks
 */
export const getLastNWeeks = (weeks: number): { start: Date; end: Date } => {
  const end = getEndOfWeek(new Date());
  const start = getStartOfWeek(subtractDaysFromDate(new Date(), (weeks - 1) * 7));
  return { start, end };
};

/**
 * Get date range for last N months
 */
export const getLastNMonths = (months: number): { start: Date; end: Date } => {
  const end = getEndOfMonth(new Date());
  const start = getStartOfMonth(subtractMonthsFromDate(new Date(), months - 1));
  return { start, end };
};

/**
 * Get date range for last N years
 */
export const getLastNYears = (years: number): { start: Date; end: Date } => {
  const end = getEndOfYear(new Date());
  const start = getStartOfYear(subtractYearsFromDate(new Date(), years - 1));
  return { start, end };
};

/**
 * Get current week date range
 */
export const getCurrentWeek = (): { start: Date; end: Date } => {
  return {
    start: getStartOfWeek(new Date()),
    end: getEndOfWeek(new Date()),
  };
};

/**
 * Get current month date range
 */
export const getCurrentMonth = (): { start: Date; end: Date } => {
  return {
    start: getStartOfMonth(new Date()),
    end: getEndOfMonth(new Date()),
  };
};

/**
 * Get current year date range
 */
export const getCurrentYear = (): { start: Date; end: Date } => {
  return {
    start: getStartOfYear(new Date()),
    end: getEndOfYear(new Date()),
  };
};

/**
 * Get previous week date range
 */
export const getPreviousWeek = (): { start: Date; end: Date } => {
  const lastWeek = subtractDaysFromDate(new Date(), 7);
  return {
    start: getStartOfWeek(lastWeek),
    end: getEndOfWeek(lastWeek),
  };
};

/**
 * Get previous month date range
 */
export const getPreviousMonth = (): { start: Date; end: Date } => {
  const lastMonth = subtractMonthsFromDate(new Date(), 1);
  return {
    start: getStartOfMonth(lastMonth),
    end: getEndOfMonth(lastMonth),
  };
};

/**
 * Get previous year date range
 */
export const getPreviousYear = (): { start: Date; end: Date } => {
  const lastYear = subtractYearsFromDate(new Date(), 1);
  return {
    start: getStartOfYear(lastYear),
    end: getEndOfYear(lastYear),
  };
};

/**
 * Check if date is today
 */
export const isToday = (date: string | Date): boolean => {
  return isSameDate(date, new Date());
};

/**
 * Check if date is yesterday
 */
export const isYesterday = (date: string | Date): boolean => {
  return isSameDate(date, getYesterday());
};

/**
 * Check if date is tomorrow
 */
export const isTomorrow = (date: string | Date): boolean => {
  return isSameDate(date, getTomorrow());
};

/**
 * Check if date is in current week
 */
export const isCurrentWeek = (date: string | Date): boolean => {
  const week = getCurrentWeek();
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return dateObj >= week.start && dateObj <= week.end;
};

/**
 * Check if date is in current month
 */
export const isCurrentMonth = (date: string | Date): boolean => {
  return isSameMonth(date, new Date());
};

/**
 * Check if date is in current year
 */
export const isCurrentYear = (date: string | Date): boolean => {
  return isSameYear(date, new Date());
};

/**
 * Check if date is in the past
 */
export const isPast = (date: string | Date): boolean => {
  return isDateBefore(date, new Date());
};

/**
 * Check if date is in the future
 */
export const isFuture = (date: string | Date): boolean => {
  return isDateAfter(date, new Date());
};

/**
 * Get age from birth date
 */
export const getAge = (birthDate: string | Date): number => {
  const birth = typeof birthDate === 'string' ? parseISO(birthDate) : birthDate;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

/**
 * Get business days between two dates (excluding weekends)
 */
export const getBusinessDaysDifference = (startDate: string | Date, endDate: string | Date): number => {
  const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;
  
  let count = 0;
  const current = new Date(start);
  
  while (current <= end) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday (0) or Saturday (6)
      count++;
    }
    current.setDate(current.getDate() + 1);
  }
  
  return count;
};

/**
 * Add business days to date
 */
export const addBusinessDays = (date: string | Date, days: number): Date => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const result = new Date(dateObj);
  let addedDays = 0;
  
  while (addedDays < days) {
    result.setDate(result.getDate() + 1);
    const dayOfWeek = result.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday (0) or Saturday (6)
      addedDays++;
    }
  }
  
  return result;
};

/**
 * Get next business day
 */
export const getNextBusinessDay = (date: string | Date): Date => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  let nextDay = addDaysToDate(dateObj, 1);
  
  while (nextDay.getDay() === 0 || nextDay.getDay() === 6) { // Sunday or Saturday
    nextDay = addDaysToDate(nextDay, 1);
  }
  
  return nextDay;
};

/**
 * Get previous business day
 */
export const getPreviousBusinessDay = (date: string | Date): Date => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  let prevDay = subtractDaysFromDate(dateObj, 1);
  
  while (prevDay.getDay() === 0 || prevDay.getDay() === 6) { // Sunday or Saturday
    prevDay = subtractDaysFromDate(prevDay, 1);
  }
  
  return prevDay;
};

/**
 * Check if date is weekend
 */
export const isWeekend = (date: string | Date): boolean => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const dayOfWeek = dateObj.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
};

/**
 * Check if date is weekday
 */
export const isWeekday = (date: string | Date): boolean => {
  return !isWeekend(date);
};

/**
 * Get day of week name
 */
export const getDayOfWeekName = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dateObj.getDay()];
};

/**
 * Get month name
 */
export const getMonthName = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[dateObj.getMonth()];
};

/**
 * Get quarter from date
 */
export const getQuarter = (date: string | Date): number => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return Math.floor(dateObj.getMonth() / 3) + 1;
};

/**
 * Get fiscal year from date
 */
export const getFiscalYear = (date: string | Date, fiscalYearStart: number = 4): number => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1; // JavaScript months are 0-indexed
  
  return month >= fiscalYearStart ? year : year - 1;
};
