/**
 * Metric card component for displaying key statistics
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@madas/shared';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    period: string;
  };
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  trend?: 'up' | 'down' | 'neutral';
  loading?: boolean;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  iconColor = 'text-blue-600',
  iconBg = 'bg-blue-100',
  trend = 'neutral',
  loading = false,
  className,
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <Card className={`metric-card ${className}`}>
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              <div className="w-16 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="w-20 h-8 bg-gray-200 rounded"></div>
              <div className="w-24 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className="metric-card hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {/* Icon */}
            <div className={`p-3 rounded-lg ${iconBg}`}>
              <Icon className={`w-6 h-6 ${iconColor}`} />
            </div>

            {/* Trend */}
            {change && (
              <div className={`flex items-center space-x-1 text-sm font-medium ${getTrendColor()}`}>
                {getTrendIcon()}
                <span>{Math.abs(change.value)}%</span>
              </div>
            )}
          </div>

          {/* Value */}
          <div className="mt-4">
            <div className="metric-value">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </div>
            <div className="metric-label">{title}</div>
          </div>

          {/* Change Period */}
          {change && (
            <div className="mt-2">
              <p className="text-xs text-gray-500">
                vs {change.period}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
