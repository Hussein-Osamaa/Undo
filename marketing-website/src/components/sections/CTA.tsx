/**
 * Call-to-Action section component for the marketing website
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';
import { Button } from '@madas/shared';

interface CTAProps {
  className?: string;
  variant?: 'default' | 'gradient' | 'minimal';
  title?: string;
  description?: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
}

export const CTA: React.FC<CTAProps> = ({
  className,
  variant = 'gradient',
  title = 'Ready to transform your business?',
  description = 'Join thousands of successful businesses that trust MADAS to streamline their operations and drive growth.',
  primaryAction = {
    label: 'Start Free Trial',
    href: '/signup',
  },
  secondaryAction = {
    label: 'Schedule Demo',
    href: '/demo',
  },
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
    default: 'bg-white',
    gradient: 'bg-gradient-to-r from-blue-600 to-purple-600',
    minimal: 'bg-gray-50',
  };

  const textColor = variant === 'gradient' ? 'text-white' : 'text-gray-900';
  const descriptionColor = variant === 'gradient' ? 'text-blue-100' : 'text-gray-600';

  return (
    <section className={`section-padding ${variants[variant]} ${className}`} ref={ref}>
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`heading-2 ${textColor} mb-6`}>
              {title}
            </h2>
            
            <p className={`text-xl ${descriptionColor} mb-8 max-w-2xl mx-auto`}>
              {description}
            </p>

            {/* Trust Indicators */}
            {variant === 'gradient' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap justify-center items-center gap-8 mb-8 text-blue-100"
              >
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm">14-day free trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm">No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm">Setup in minutes</span>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href={primaryAction.href}>
                <Button 
                  size="lg" 
                  variant={variant === 'gradient' ? 'secondary' : 'default'}
                  className="w-full sm:w-auto"
                >
                  {primaryAction.label}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              
              {secondaryAction && (
                <Link href={secondaryAction.href}>
                  <Button 
                    variant={variant === 'gradient' ? 'outline' : 'outline'}
                    size="lg"
                    className={`w-full sm:w-auto ${
                      variant === 'gradient' 
                        ? 'border-white text-white hover:bg-white hover:text-blue-600' 
                        : ''
                    }`}
                  >
                    <Play className="mr-2 w-5 h-5" />
                    {secondaryAction.label}
                  </Button>
                </Link>
              )}
            </motion.div>

            {/* Additional Info */}
            {variant === 'gradient' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-sm text-blue-100 mt-6"
              >
                Need help getting started?{' '}
                <Link href="/contact" className="underline hover:text-white transition-colors">
                  Contact our team
                </Link>
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
