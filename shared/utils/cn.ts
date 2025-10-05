/**
 * Class name utility for the MADAS SaaS platform
 * Combines class-variance-authority with clsx for optimal class merging
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines clsx and tailwind-merge for optimal class name handling
 * 
 * @param inputs - Class values to merge
 * @returns Merged class string
 * 
 * @example
 * ```tsx
 * cn('px-2 py-1', 'px-3') // Returns 'py-1 px-3'
 * cn('bg-red-500', condition && 'bg-blue-500') // Returns conditional class
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Alternative function name for those who prefer a different naming convention
 */
export const cx = cn;

/**
 * Conditional class name utility
 * 
 * @param condition - Boolean condition
 * @param trueClass - Class to apply if condition is true
 * @param falseClass - Optional class to apply if condition is false
 * @returns Class string based on condition
 * 
 * @example
 * ```tsx
 * conditionalClass(isActive, 'bg-blue-500', 'bg-gray-500')
 * conditionalClass(isVisible, 'block')
 * ```
 */
export function conditionalClass(
  condition: boolean,
  trueClass: string,
  falseClass?: string
): string {
  return condition ? trueClass : (falseClass || '');
}

/**
 * Variant-based class name utility
 * 
 * @param baseClass - Base class to always apply
 * @param variants - Object with variant classes
 * @param selectedVariants - Object with selected variant values
 * @returns Combined class string
 * 
 * @example
 * ```tsx
 * variantClass('button', {
 *   size: { sm: 'px-2', md: 'px-4', lg: 'px-6' },
 *   color: { primary: 'bg-blue-500', secondary: 'bg-gray-500' }
 * }, {
 *   size: 'md',
 *   color: 'primary'
 * })
 * // Returns 'button px-4 bg-blue-500'
 * ```
 */
export function variantClass<T extends Record<string, Record<string, string>>>(
  baseClass: string,
  variants: T,
  selectedVariants: { [K in keyof T]?: keyof T[K] }
): string {
  const classes = [baseClass];
  
  Object.entries(selectedVariants).forEach(([key, value]) => {
    if (value && variants[key] && variants[key][value as string]) {
      classes.push(variants[key][value as string]);
    }
  });
  
  return cn(...classes);
}

/**
 * Responsive class name utility
 * 
 * @param classes - Object with responsive breakpoint classes
 * @returns Responsive class string
 * 
 * @example
 * ```tsx
 * responsiveClass({
 *   default: 'text-sm',
 *   sm: 'text-base',
 *   md: 'text-lg',
 *   lg: 'text-xl'
 * })
 * // Returns 'text-sm sm:text-base md:text-lg lg:text-xl'
 * ```
 */
export function responsiveClass(classes: {
  default?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
}): string {
  const responsiveClasses: string[] = [];
  
  if (classes.default) responsiveClasses.push(classes.default);
  if (classes.sm) responsiveClasses.push(`sm:${classes.sm}`);
  if (classes.md) responsiveClasses.push(`md:${classes.md}`);
  if (classes.lg) responsiveClasses.push(`lg:${classes.lg}`);
  if (classes.xl) responsiveClasses.push(`xl:${classes.xl}`);
  if (classes['2xl']) responsiveClasses.push(`2xl:${classes['2xl']}`);
  
  return cn(...responsiveClasses);
}

/**
 * State-based class name utility
 * 
 * @param baseClass - Base class
 * @param states - Object with state classes
 * @returns Combined class string
 * 
 * @example
 * ```tsx
 * stateClass('input', {
 *   focus: 'ring-2 ring-blue-500',
 *   error: 'border-red-500',
 *   disabled: 'opacity-50 cursor-not-allowed'
 * })
 * ```
 */
export function stateClass(
  baseClass: string,
  states: {
    focus?: string;
    hover?: string;
    active?: string;
    disabled?: string;
    error?: string;
    success?: string;
    loading?: string;
  }
): string {
  const stateClasses: string[] = [];
  
  if (states.focus) stateClasses.push(`focus:${states.focus}`);
  if (states.hover) stateClasses.push(`hover:${states.hover}`);
  if (states.active) stateClasses.push(`active:${states.active}`);
  if (states.disabled) stateClasses.push(`disabled:${states.disabled}`);
  if (states.error) stateClasses.push(states.error);
  if (states.success) stateClasses.push(states.success);
  if (states.loading) stateClasses.push(states.loading);
  
  return cn(baseClass, ...stateClasses);
}

/**
 * Animation class utility
 * 
 * @param animation - Animation type
 * @param duration - Animation duration
 * @param easing - Animation easing
 * @returns Animation class string
 * 
 * @example
 * ```tsx
 * animationClass('fade-in', '300ms', 'ease-out')
 * // Returns 'animate-fade-in duration-300 ease-out'
 * ```
 */
export function animationClass(
  animation: string,
  duration?: string,
  easing?: string
): string {
  const classes: string[] = [];
  
  classes.push(`animate-${animation}`);
  
  if (duration) {
    const durationClass = duration.replace('ms', '').replace('s', '');
    classes.push(`duration-${durationClass}`);
  }
  
  if (easing) {
    classes.push(`ease-${easing}`);
  }
  
  return cn(...classes);
}

/**
 * Spacing utility for consistent spacing
 * 
 * @param direction - Spacing direction
 * @param size - Spacing size
 * @returns Spacing class string
 * 
 * @example
 * ```tsx
 * spacing('margin', 'md') // Returns 'm-4'
 * spacing('padding', 'lg') // Returns 'p-6'
 * spacing('gap', 'sm') // Returns 'gap-2'
 * ```
 */
export function spacing(
  direction: 'margin' | 'padding' | 'gap',
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
): string {
  const sizeMap = {
    xs: '1',
    sm: '2',
    md: '4',
    lg: '6',
    xl: '8',
    '2xl': '12',
  };
  
  const prefixMap = {
    margin: 'm',
    padding: 'p',
    gap: 'gap',
  };
  
  return `${prefixMap[direction]}-${sizeMap[size]}`;
}

/**
 * Color utility for consistent color application
 * 
 * @param color - Color name
 * @param shade - Color shade (50-950)
 * @param opacity - Color opacity (0-100)
 * @returns Color class string
 * 
 * @example
 * ```tsx
 * colorClass('blue', 500) // Returns 'text-blue-500'
 * colorClass('red', 600, 80) // Returns 'text-red-600/80'
 * ```
 */
export function colorClass(
  color: string,
  shade: number,
  opacity?: number
): string {
  const baseClass = `text-${color}-${shade}`;
  
  if (opacity && opacity < 100) {
    return `${baseClass}/${opacity}`;
  }
  
  return baseClass;
}

/**
 * Background color utility
 * 
 * @param color - Color name
 * @param shade - Color shade (50-950)
 * @param opacity - Color opacity (0-100)
 * @returns Background color class string
 */
export function bgColorClass(
  color: string,
  shade: number,
  opacity?: number
): string {
  const baseClass = `bg-${color}-${shade}`;
  
  if (opacity && opacity < 100) {
    return `${baseClass}/${opacity}`;
  }
  
  return baseClass;
}

/**
 * Border color utility
 * 
 * @param color - Color name
 * @param shade - Color shade (50-950)
 * @param opacity - Color opacity (0-100)
 * @returns Border color class string
 */
export function borderColorClass(
  color: string,
  shade: number,
  opacity?: number
): string {
  const baseClass = `border-${color}-${shade}`;
  
  if (opacity && opacity < 100) {
    return `${baseClass}/${opacity}`;
  }
  
  return baseClass;
}
