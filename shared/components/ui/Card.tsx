/**
 * Card component for the MADAS SaaS platform
 */

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

/**
 * Card variants using class-variance-authority
 */
const cardVariants = cva(
  'rounded-lg border bg-card text-card-foreground shadow-sm',
  {
    variants: {
      variant: {
        default: 'border-gray-200 bg-white',
        elevated: 'border-gray-200 bg-white shadow-lg',
        outlined: 'border-2 border-gray-300 bg-white',
        filled: 'border-gray-200 bg-gray-50',
        ghost: 'border-transparent bg-transparent shadow-none',
      },
      size: {
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
      },
      interactive: {
        true: 'cursor-pointer hover:shadow-md transition-shadow',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      interactive: false,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /**
   * Card content
   */
  children: React.ReactNode;
  /**
   * Whether card is interactive (clickable)
   */
  interactive?: boolean;
  /**
   * Click handler for interactive cards
   */
  onClick?: () => void;
  /**
   * Whether card is loading
   */
  loading?: boolean;
  /**
   * Loading skeleton content
   */
  loadingContent?: React.ReactNode;
}

/**
 * Card component
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      size,
      interactive,
      onClick,
      loading = false,
      loadingContent,
      children,
      ...props
    },
    ref
  ) => {
    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(cardVariants({ variant, size }), className)}
          {...props}
        >
          {loadingContent || <CardSkeleton />}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ variant, size, interactive }),
          interactive && 'cursor-pointer',
          className
        )}
        onClick={interactive ? onClick : undefined}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        onKeyDown={
          interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick?.();
                }
              }
            : undefined
        }
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * Card header component
 */
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 pb-4', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

/**
 * Card title component
 */
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, as: Component = 'h3', ...props }, ref) => (
    <Component
      ref={ref}
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    >
      {children}
    </Component>
  )
);

CardTitle.displayName = 'CardTitle';

/**
 * Card description component
 */
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    >
      {children}
    </p>
  )
);

CardDescription.displayName = 'CardDescription';

/**
 * Card content component
 */
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('pt-0', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardContent.displayName = 'CardContent';

/**
 * Card footer component
 */
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center pt-4', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardFooter.displayName = 'CardFooter';

/**
 * Stats card component
 */
export interface StatsCardProps extends Omit<CardProps, 'children'> {
  /**
   * Stat title
   */
  title: string;
  /**
   * Stat value
   */
  value: string | number;
  /**
   * Stat description or change
   */
  description?: string;
  /**
   * Stat icon
   */
  icon?: React.ReactNode;
  /**
   * Stat trend
   */
  trend?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
    label?: string;
  };
  /**
   * Stat color variant
   */
  color?: 'default' | 'blue' | 'green' | 'yellow' | 'red' | 'purple';
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  color = 'default',
  ...cardProps
}) => {
  const colorClasses = {
    default: 'text-gray-900',
    blue: 'text-blue-600',
    green: 'text-green-600',
    yellow: 'text-yellow-600',
    red: 'text-red-600',
    purple: 'text-purple-600',
  };

  const trendColors = {
    increase: 'text-green-600',
    decrease: 'text-red-600',
    neutral: 'text-gray-600',
  };

  const trendIcons = {
    increase: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
      </svg>
    ),
    decrease: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-9.2 9.2M7 7v10h10" />
      </svg>
    ),
    neutral: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
      </svg>
    ),
  };

  return (
    <Card {...cardProps}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        {icon && <div className={colorClasses[color]}>{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
        {trend && (
          <div className={cn('flex items-center mt-2', trendColors[trend.type])}>
            {trendIcons[trend.type]}
            <span className="ml-1 text-xs font-medium">
              {Math.abs(trend.value)}%
            </span>
            {trend.label && (
              <span className="ml-1 text-xs text-gray-500">
                {trend.label}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

/**
 * Feature card component
 */
export interface FeatureCardProps extends Omit<CardProps, 'children'> {
  /**
   * Feature title
   */
  title: string;
  /**
   * Feature description
   */
  description: string;
  /**
   * Feature icon
   */
  icon: React.ReactNode;
  /**
   * Feature action
   */
  action?: React.ReactNode;
  /**
   * Whether feature is available
   */
  available?: boolean;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  action,
  available = true,
  ...cardProps
}) => {
  return (
    <Card
      variant={available ? 'default' : 'ghost'}
      className={cn(
        'text-center',
        !available && 'opacity-50'
      )}
      {...cardProps}
    >
      <CardContent className="flex flex-col items-center space-y-4">
        <div className={cn(
          'p-3 rounded-full',
          available ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
        )}>
          {icon}
        </div>
        <div>
          <CardTitle className="mb-2">{title}</CardTitle>
          <CardDescription className="text-center">
            {description}
          </CardDescription>
        </div>
        {action && <div className="mt-4">{action}</div>}
      </CardContent>
    </Card>
  );
};

/**
 * Loading skeleton component
 */
export const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('animate-pulse', className)}>
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-20 bg-gray-200 rounded"></div>
    </div>
  </div>
);

/**
 * Card grid component
 */
export interface CardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'sm' | 'md' | 'lg';
}

export const CardGrid: React.FC<CardGridProps> = ({
  children,
  columns = 3,
  gap = 'md',
  className,
  ...props
}) => {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
  };

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  };

  return (
    <div
      className={cn(
        'grid',
        columnClasses[columns],
        gapClasses[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Export all card components
export {
  cardVariants,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  StatsCard,
  FeatureCard,
  CardSkeleton,
  CardGrid,
};
