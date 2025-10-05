/**
 * Button component for the MADAS SaaS platform
 */

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

/**
 * Button variants using class-variance-authority
 */
const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
        success: 'bg-green-600 text-white hover:bg-green-700',
        warning: 'bg-yellow-600 text-white hover:bg-yellow-700',
        info: 'bg-blue-600 text-white hover:bg-blue-700',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        xl: 'h-12 px-10 rounded-lg',
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8',
        'icon-lg': 'h-12 w-12',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
      loading: {
        true: 'cursor-wait',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fullWidth: false,
      loading: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Button content
   */
  children: React.ReactNode;
  /**
   * Loading state - shows spinner and disables button
   */
  loading?: boolean;
  /**
   * Loading text to show when loading
   */
  loadingText?: string;
  /**
   * Icon to show before the text
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to show after the text
   */
  rightIcon?: React.ReactNode;
  /**
   * Icon to show when loading
   */
  loadingIcon?: React.ReactNode;
  /**
   * Button type
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Whether button should take full width
   */
  fullWidth?: boolean;
  /**
   * Tooltip text
   */
  tooltip?: string;
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
  /**
   * Whether button is destructive action
   */
  destructive?: boolean;
}

/**
 * Loading spinner component
 */
const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  return (
    <svg
      className={`animate-spin ${sizeClasses[size]}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

/**
 * Button component
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading,
      loadingText,
      leftIcon,
      rightIcon,
      loadingIcon,
      children,
      disabled,
      type = 'button',
      tooltip,
      destructive,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const buttonVariant = destructive ? 'destructive' : variant;
    
    // Determine what to show as content
    const getContent = () => {
      if (loading) {
        return (
          <>
            {loadingIcon || <LoadingSpinner size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'} />}
            {loadingText && <span className="ml-2">{loadingText}</span>}
          </>
        );
      }

      return (
        <>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </>
      );
    };

    const buttonElement = (
      <button
        type={type}
        className={cn(
          buttonVariants({ variant: buttonVariant, size, fullWidth, loading }),
          className
        )}
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        {...props}
      >
        {getContent()}
      </button>
    );

    // Wrap with tooltip if provided
    if (tooltip) {
      return (
        <div className="relative group">
          {buttonElement}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
            {tooltip}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
          </div>
        </div>
      );
    }

    return buttonElement;
  }
);

Button.displayName = 'Button';

/**
 * Button group component for grouping related buttons
 */
export interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline';
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  className,
  orientation = 'horizontal',
  size = 'md',
  variant = 'default',
}) => {
  const orientationClasses = {
    horizontal: 'flex-row',
    vertical: 'flex-col',
  };

  const sizeClasses = {
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-3',
  };

  const variantClasses = {
    default: '',
    outline: 'border border-input rounded-md overflow-hidden',
  };

  return (
    <div
      className={cn(
        'inline-flex',
        orientationClasses[orientation],
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      role="group"
    >
      {children}
    </div>
  );
};

/**
 * Icon button component - shortcut for icon-only buttons
 */
export interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  /**
   * Icon to display
   */
  icon: React.ReactNode;
  /**
   * ARIA label for accessibility (required for icon buttons)
   */
  'aria-label': string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, size = 'icon', ...props }, ref) => {
    return (
      <Button ref={ref} size={size} {...props}>
        {icon}
      </Button>
    );
  }
);

IconButton.displayName = 'IconButton';

/**
 * Floating action button component
 */
export interface FabProps extends Omit<ButtonProps, 'size' | 'variant'> {
  /**
   * Icon to display
   */
  icon: React.ReactNode;
  /**
   * Position of the FAB
   */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  /**
   * Whether FAB is extended (shows text)
   */
  extended?: boolean;
  /**
   * Text to show when extended
   */
  extendedText?: string;
}

export const Fab: React.FC<FabProps> = ({
  icon,
  position = 'bottom-right',
  extended = false,
  extendedText,
  className,
  ...props
}) => {
  const positionClasses = {
    'bottom-right': 'fixed bottom-6 right-6',
    'bottom-left': 'fixed bottom-6 left-6',
    'top-right': 'fixed top-6 right-6',
    'top-left': 'fixed top-6 left-6',
  };

  const sizeClasses = extended ? 'h-14 px-6' : 'h-14 w-14';

  return (
    <Button
      className={cn(
        'shadow-lg z-50',
        positionClasses[position],
        sizeClasses,
        className
      )}
      size="lg"
      variant="default"
      {...props}
    >
      {icon}
      {extended && extendedText && (
        <span className="ml-2 font-medium">{extendedText}</span>
      )}
    </Button>
  );
};

/**
 * Split button component
 */
export interface SplitButtonProps {
  /**
   * Main button content
   */
  children: React.ReactNode;
  /**
   * Dropdown trigger icon
   */
  dropdownIcon?: React.ReactNode;
  /**
   * Main button click handler
   */
  onMainClick: () => void;
  /**
   * Dropdown items
   */
  items: Array<{
    label: string;
    onClick: () => void;
    disabled?: boolean;
    icon?: React.ReactNode;
  }>;
  /**
   * Button variant
   */
  variant?: ButtonProps['variant'];
  /**
   * Button size
   */
  size?: ButtonProps['size'];
  /**
   * Whether dropdown is open
   */
  isOpen?: boolean;
  /**
   * Callback when dropdown state changes
   */
  onOpenChange?: (open: boolean) => void;
}

export const SplitButton: React.FC<SplitButtonProps> = ({
  children,
  dropdownIcon = <span>▼</span>,
  onMainClick,
  items,
  variant = 'default',
  size = 'default',
  isOpen = false,
  onOpenChange,
}) => {
  const [internalIsOpen, setInternalIsOpen] = React.useState(false);
  const dropdownOpen = isOpen !== undefined ? isOpen : internalIsOpen;

  const handleDropdownToggle = () => {
    const newState = !dropdownOpen;
    if (isOpen === undefined) {
      setInternalIsOpen(newState);
    }
    onOpenChange?.(newState);
  };

  const handleItemClick = (onClick: () => void) => {
    onClick();
    handleDropdownToggle();
  };

  return (
    <div className="relative inline-flex">
      <Button
        variant={variant}
        size={size}
        onClick={onMainClick}
        className="rounded-r-none border-r-0"
      >
        {children}
      </Button>
      <Button
        variant={variant}
        size={size}
        onClick={handleDropdownToggle}
        className="rounded-l-none px-2"
        aria-expanded={dropdownOpen}
        aria-haspopup="menu"
      >
        {dropdownIcon}
      </Button>
      
      {dropdownOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => !item.disabled && handleItemClick(item.onClick)}
              disabled={item.disabled}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Export all button components
export {
  buttonVariants,
  Button,
  ButtonGroup,
  IconButton,
  Fab,
  SplitButton,
  LoadingSpinner,
};
