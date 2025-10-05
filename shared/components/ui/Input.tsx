/**
 * Input component for the MADAS SaaS platform
 */

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

/**
 * Input variants using class-variance-authority
 */
const inputVariants = cva(
  // Base styles
  'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
        error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
        success: 'border-green-500 focus:border-green-500 focus:ring-green-500',
        warning: 'border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500',
      },
      size: {
        default: 'h-10',
        sm: 'h-8 px-2 text-xs',
        lg: 'h-12 px-4 text-base',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fullWidth: true,
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  /**
   * Input label
   */
  label?: string;
  /**
   * Helper text below the input
   */
  helperText?: string;
  /**
   * Error message
   */
  error?: string;
  /**
   * Success message
   */
  success?: string;
  /**
   * Warning message
   */
  warning?: string;
  /**
   * Whether the input is required
   */
  required?: boolean;
  /**
   * Input type
   */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local';
  /**
   * Icon to show on the left side
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to show on the right side
   */
  rightIcon?: React.ReactNode;
  /**
   * Whether to show password toggle for password inputs
   */
  showPasswordToggle?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Whether input should take full width
   */
  fullWidth?: boolean;
  /**
   * Input group props for combining with other elements
   */
  groupProps?: {
    position: 'left' | 'right' | 'both';
    elements: React.ReactNode;
  };
}

/**
 * Input component
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      label,
      helperText,
      error,
      success,
      warning,
      required,
      type = 'text',
      leftIcon,
      rightIcon,
      showPasswordToggle = type === 'password',
      groupProps,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    const inputId = id || React.useId();
    const errorId = `${inputId}-error`;
    const helperTextId = `${inputId}-helper`;
    
    // Determine variant based on state
    const getVariant = (): VariantProps<typeof inputVariants>['variant'] => {
      if (error) return 'error';
      if (success) return 'success';
      if (warning) return 'warning';
      return variant;
    };
    
    // Determine input type
    const inputType = type === 'password' && showPassword ? 'text' : type;
    
    // Handle password toggle
    const handlePasswordToggle = () => {
      setShowPassword(!showPassword);
    };
    
    // Get right icon based on password toggle
    const getRightIcon = () => {
      if (type === 'password' && showPasswordToggle) {
        return (
          <button
            type="button"
            onClick={handlePasswordToggle}
            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        );
      }
      
      return rightIcon;
    };
    
    // Get status message
    const getStatusMessage = () => {
      if (error) return error;
      if (success) return success;
      if (warning) return warning;
      return helperText;
    };
    
    // Get status message variant
    const getStatusMessageVariant = () => {
      if (error) return 'text-red-600';
      if (success) return 'text-green-600';
      if (warning) return 'text-yellow-600';
      return 'text-gray-500';
    };
    
    // Input with icons wrapper
    const InputWithIcons = () => (
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          type={inputType}
          className={cn(
            inputVariants({ variant: getVariant(), size, fullWidth }),
            leftIcon && 'pl-10',
            (getRightIcon() || groupProps) && 'pr-10',
            groupProps?.position === 'left' && 'rounded-l-none',
            groupProps?.position === 'right' && 'rounded-r-none',
            groupProps?.position === 'both' && 'rounded-none',
            className
          )}
          disabled={disabled}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          aria-invalid={!!error}
          aria-describedby={cn(
            error && errorId,
            getStatusMessage() && !error && helperTextId
          )}
          {...props}
        />
        
        {(getRightIcon() || groupProps) && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
            {getRightIcon()}
          </div>
        )}
      </div>
    );
    
    return (
      <div className={cn('space-y-1', !fullWidth && 'inline-block')}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'block text-sm font-medium text-gray-700',
              required && "after:content-['*'] after:ml-0.5 after:text-red-500",
              error && 'text-red-600',
              success && 'text-green-600',
              warning && 'text-yellow-600'
            )}
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {groupProps?.position === 'left' && (
            <div className="absolute left-0 top-0 h-full flex items-center">
              {groupProps.elements}
            </div>
          )}
          
          {groupProps?.position === 'right' && (
            <div className="absolute right-0 top-0 h-full flex items-center">
              {groupProps.elements}
            </div>
          )}
          
          {groupProps?.position === 'both' ? (
            <div className="flex">
              <div className="flex items-center">
                {groupProps.elements}
              </div>
              <InputWithIcons />
            </div>
          ) : (
            <InputWithIcons />
          )}
        </div>
        
        {getStatusMessage() && (
          <p
            id={error ? errorId : helperTextId}
            className={cn('text-xs', getStatusMessageVariant())}
          >
            {getStatusMessage()}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

/**
 * Input group component for combining inputs with other elements
 */
export interface InputGroupProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
}

export const InputGroup: React.FC<InputGroupProps> = ({
  children,
  className,
  size = 'default',
}) => {
  const sizeClasses = {
    sm: 'text-xs',
    default: 'text-sm',
    lg: 'text-base',
  };
  
  return (
    <div
      className={cn(
        'flex rounded-md border border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * Input addon component for input groups
 */
export interface InputAddonProps {
  children: React.ReactNode;
  position: 'left' | 'right';
  className?: string;
}

export const InputAddon: React.FC<InputAddonProps> = ({
  children,
  position,
  className,
}) => {
  const positionClasses = {
    left: 'rounded-l-md border-r-0',
    right: 'rounded-r-md border-l-0',
  };
  
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 border border-gray-300 bg-gray-50 text-gray-500',
        positionClasses[position],
        className
      )}
    >
      {children}
    </span>
  );
};

/**
 * Textarea component
 */
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  warning?: string;
  required?: boolean;
  fullWidth?: boolean;
  className?: string;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      success,
      warning,
      required,
      fullWidth = true,
      resize = 'vertical',
      id,
      ...props
    },
    ref
  ) => {
    const textareaId = id || React.useId();
    const errorId = `${textareaId}-error`;
    const helperTextId = `${textareaId}-helper`;
    
    const getVariant = () => {
      if (error) return 'border-red-500 focus:border-red-500 focus:ring-red-500';
      if (success) return 'border-green-500 focus:border-green-500 focus:ring-green-500';
      if (warning) return 'border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500';
      return 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';
    };
    
    const getStatusMessage = () => {
      if (error) return error;
      if (success) return success;
      if (warning) return warning;
      return helperText;
    };
    
    const getStatusMessageVariant = () => {
      if (error) return 'text-red-600';
      if (success) return 'text-green-600';
      if (warning) return 'text-yellow-600';
      return 'text-gray-500';
    };
    
    const resizeClasses = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    };
    
    return (
      <div className={cn('space-y-1', !fullWidth && 'inline-block')}>
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              'block text-sm font-medium text-gray-700',
              required && "after:content-['*'] after:ml-0.5 after:text-red-500",
              error && 'text-red-600',
              success && 'text-green-600',
              warning && 'text-yellow-600'
            )}
          >
            {label}
          </label>
        )}
        
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'flex min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            getVariant(),
            resizeClasses[resize],
            fullWidth ? 'w-full' : '',
            className
          )}
          aria-invalid={!!error}
          aria-describedby={cn(
            error && errorId,
            getStatusMessage() && !error && helperTextId
          )}
          {...props}
        />
        
        {getStatusMessage() && (
          <p
            id={error ? errorId : helperTextId}
            className={cn('text-xs', getStatusMessageVariant())}
          >
            {getStatusMessage()}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

/**
 * Search input component
 */
export interface SearchInputProps extends Omit<InputProps, 'type'> {
  onSearch?: (value: string) => void;
  onClear?: () => void;
  clearable?: boolean;
  searchIcon?: React.ReactNode;
  clearIcon?: React.ReactNode;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      onSearch,
      onClear,
      clearable = true,
      searchIcon,
      clearIcon,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(value || '');
    const currentValue = value !== undefined ? value : internalValue;
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      onChange?.(e);
    };
    
    const handleSearch = () => {
      onSearch?.(currentValue as string);
    };
    
    const handleClear = () => {
      setInternalValue('');
      onClear?.();
      onChange?.({
        target: { value: '' }
      } as React.ChangeEvent<HTMLInputElement>);
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
      props.onKeyDown?.(e);
    };
    
    return (
      <div className="relative">
        <Input
          ref={ref}
          type="search"
          value={currentValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          leftIcon={
            searchIcon || (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )
          }
          rightIcon={
            clearable && currentValue ? (
              <button
                type="button"
                onClick={handleClear}
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                tabIndex={-1}
                aria-label="Clear search"
              >
                {clearIcon || (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            ) : undefined
          }
          {...props}
        />
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';

// Export all input components
export {
  inputVariants,
  Input,
  InputGroup,
  InputAddon,
  Textarea,
  SearchInput,
};
