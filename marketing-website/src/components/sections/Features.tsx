/**
 * Features section component for the marketing website
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  BarChart3,
  ShoppingCart,
  Package,
  Users,
  Globe,
  Smartphone,
  CreditCard,
  Shield,
  Zap,
  TrendingUp,
  Clock,
  HeadphonesIcon,
} from 'lucide-react';
import { FeatureCard } from '@madas/shared';

interface FeaturesProps {
  className?: string;
}

const features = [
  {
    title: 'Real-time Dashboard',
    description: 'Get instant insights into your business performance with live data updates and customizable widgets.',
    icon: <BarChart3 className="w-8 h-8" />,
    color: 'blue' as const,
  },
  {
    title: 'Point of Sale',
    description: 'Streamline in-store transactions with our intuitive POS system that works on any device.',
    icon: <ShoppingCart className="w-8 h-8" />,
    color: 'green' as const,
  },
  {
    title: 'Inventory Management',
    description: 'Track stock levels, set low-stock alerts, and manage suppliers all from one central location.',
    icon: <Package className="w-8 h-8" />,
    color: 'purple' as const,
  },
  {
    title: 'Team Management',
    description: 'Assign roles, manage schedules, and track staff performance with our comprehensive HR tools.',
    icon: <Users className="w-8 h-8" />,
    color: 'orange' as const,
  },
  {
    title: 'Website Builder',
    description: 'Create a professional online store with our drag-and-drop website builder and customizable templates.',
    icon: <Globe className="w-8 h-8" />,
    color: 'indigo' as const,
  },
  {
    title: 'Mobile Apps',
    description: 'Manage your business on the go with our iOS and Android apps for owners and staff.',
    icon: <Smartphone className="w-8 h-8" />,
    color: 'pink' as const,
  },
  {
    title: 'Payment Processing',
    description: 'Accept all major payment methods with integrated payment processing and automated reconciliation.',
    icon: <CreditCard className="w-8 h-8" />,
    color: 'teal' as const,
  },
  {
    title: 'Security & Compliance',
    description: 'Enterprise-grade security with PCI compliance, data encryption, and regular security audits.',
    icon: <Shield className="w-8 h-8" />,
    color: 'red' as const,
  },
];

const highlights = [
  {
    title: 'Lightning Fast',
    description: 'Optimized for speed with sub-second load times',
    icon: <Zap className="w-6 h-6" />,
  },
  {
    title: 'Always Growing',
    description: 'Track your business growth with detailed analytics',
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    title: '24/7 Support',
    description: 'Get help when you need it with our dedicated support team',
    icon: <HeadphonesIcon className="w-6 h-6" />,
  },
  {
    title: 'Easy Setup',
    description: 'Get started in minutes with our intuitive onboarding',
    icon: <Clock className="w-6 h-6" />,
  },
];

export const Features: React.FC<FeaturesProps> = ({ className }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className={`section-padding bg-white ${className}`} ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="heading-2 text-gray-900 mb-6">
            Everything you need to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              run your business
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Our comprehensive platform combines all the tools you need to manage, grow, and scale your business efficiently.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                color={feature.color}
                className="h-full hover-lift"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Highlights Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 lg:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="heading-3 text-gray-900 mb-4">
              Why businesses choose MADAS
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of successful businesses that have transformed their operations with our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + 0.1 * index }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-medium mb-4">
                  <div className="text-blue-600">
                    {highlight.icon}
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {highlight.title}
                </h4>
                <p className="text-gray-600">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
