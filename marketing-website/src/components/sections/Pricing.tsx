/**
 * Pricing section component for the marketing website
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, X, ArrowRight, Zap, Star } from 'lucide-react';
import { Button, Card } from '@madas/shared';

interface PricingProps {
  className?: string;
}

interface PricingPlan {
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: string[];
  limitations: string[];
  popular?: boolean;
  cta: string;
  href: string;
  icon: React.ReactNode;
}

const pricingPlans: PricingPlan[] = [
  {
    name: 'Starter',
    description: 'Perfect for small businesses getting started',
    price: {
      monthly: 29,
      yearly: 290,
    },
    features: [
      '1 user account',
      '100 products',
      '500 orders/month',
      'Basic reporting',
      'Email support',
      'Mobile app access',
      'POS system',
      'Inventory tracking',
    ],
    limitations: [
      'No advanced analytics',
      'No website builder',
      'No API access',
    ],
    cta: 'Start Free Trial',
    href: '/signup?plan=starter',
    icon: <Zap className="w-6 h-6" />,
  },
  {
    name: 'Professional',
    description: 'Ideal for growing businesses',
    price: {
      monthly: 79,
      yearly: 790,
    },
    features: [
      '5 user accounts',
      '1,000 products',
      'Unlimited orders',
      'Advanced analytics',
      'Priority support',
      'Website builder',
      'Custom branding',
      'Multi-location support',
      'Staff scheduling',
      'Customer management',
      'Email marketing',
    ],
    limitations: [
      'No API access',
      'Limited integrations',
    ],
    popular: true,
    cta: 'Start Free Trial',
    href: '/signup?plan=professional',
    icon: <Star className="w-6 h-6" />,
  },
  {
    name: 'Enterprise',
    description: 'For large businesses with advanced needs',
    price: {
      monthly: 199,
      yearly: 1990,
    },
    features: [
      'Unlimited users',
      'Unlimited products',
      'Unlimited orders',
      'Advanced analytics & AI',
      '24/7 phone support',
      'Custom website builder',
      'API access',
      'Custom integrations',
      'Advanced security',
      'Dedicated account manager',
      'Custom reporting',
      'White-label options',
      'Multi-currency support',
    ],
    limitations: [],
    cta: 'Contact Sales',
    href: '/contact?plan=enterprise',
    icon: <ArrowRight className="w-6 h-6" />,
  },
];

const comparisonFeatures = [
  {
    category: 'Core Features',
    features: [
      { name: 'Dashboard', starter: true, professional: true, enterprise: true },
      { name: 'Point of Sale', starter: true, professional: true, enterprise: true },
      { name: 'Inventory Management', starter: true, professional: true, enterprise: true },
      { name: 'Order Management', starter: true, professional: true, enterprise: true },
      { name: 'Customer Management', starter: false, professional: true, enterprise: true },
      { name: 'Staff Management', starter: false, professional: true, enterprise: true },
    ],
  },
  {
    category: 'Analytics & Reporting',
    features: [
      { name: 'Basic Reports', starter: true, professional: true, enterprise: true },
      { name: 'Advanced Analytics', starter: false, professional: true, enterprise: true },
      { name: 'Custom Reports', starter: false, professional: false, enterprise: true },
      { name: 'AI Insights', starter: false, professional: false, enterprise: true },
    ],
  },
  {
    category: 'Online Presence',
    features: [
      { name: 'Website Builder', starter: false, professional: true, enterprise: true },
      { name: 'Custom Domain', starter: false, professional: true, enterprise: true },
      { name: 'SEO Tools', starter: false, professional: true, enterprise: true },
      { name: 'White-label Options', starter: false, professional: false, enterprise: true },
    ],
  },
  {
    category: 'Support & Integration',
    features: [
      { name: 'Email Support', starter: true, professional: true, enterprise: true },
      { name: 'Priority Support', starter: false, professional: true, enterprise: true },
      { name: '24/7 Phone Support', starter: false, professional: false, enterprise: true },
      { name: 'API Access', starter: false, professional: false, enterprise: true },
      { name: 'Custom Integrations', starter: false, professional: false, enterprise: true },
    ],
  },
];

export const Pricing: React.FC<PricingProps> = ({ className }) => {
  const [isYearly, setIsYearly] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getPrice = (plan: PricingPlan) => {
    return isYearly ? plan.price.yearly : plan.price.monthly;
  };

  const getPeriod = () => {
    return isYearly ? '/year' : '/month';
  };

  const getSavings = (plan: PricingPlan) => {
    if (!isYearly) return null;
    const monthlyTotal = plan.price.monthly * 12;
    const savings = monthlyTotal - plan.price.yearly;
    return Math.round((savings / monthlyTotal) * 100);
  };

  return (
    <section className={`section-padding bg-gray-50 ${className}`} ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="heading-2 text-gray-900 mb-6">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Choose the plan that fits your business needs. All plans include a 14-day free trial.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white rounded-lg p-1 shadow-medium">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                !isYearly
                  ? 'bg-primary text-primary-foreground'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isYearly
                  ? 'bg-primary text-primary-foreground'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
            </button>
            {isYearly && (
              <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Save up to 17%
              </span>
            )}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + 0.1 * index }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <Card
                className={`h-full ${
                  plan.popular
                    ? 'border-2 border-primary shadow-large'
                    : 'hover-lift'
                }`}
              >
                <Card.Header className="text-center pb-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${
                    plan.popular ? 'bg-primary text-primary-foreground' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {plan.icon}
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {plan.description}
                  </CardDescription>
                </Card.Header>

                <CardContent className="text-center pb-6">
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      ${getPrice(plan)}
                    </span>
                    <span className="text-gray-600">{getPeriod()}</span>
                    {getSavings(plan) && (
                      <div className="text-sm text-green-600 font-medium mt-1">
                        Save {getSavings(plan)}% annually
                      </div>
                    )}
                  </div>

                  <Link href={plan.href} className="block">
                    <Button
                      variant={plan.popular ? 'default' : 'outline'}
                      size="lg"
                      className="w-full"
                    >
                      {plan.cta}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>

                <CardFooter className="pt-0">
                  <div className="w-full">
                    <h4 className="font-semibold text-gray-900 mb-3">What's included:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-2xl shadow-large overflow-hidden"
        >
          <div className="p-8 border-b border-gray-200">
            <h3 className="heading-3 text-center text-gray-900 mb-4">
              Compare all features
            </h3>
            <p className="text-center text-gray-600">
              See exactly what's included in each plan
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-6 font-semibold text-gray-900">Features</th>
                  <th className="text-center p-6 font-semibold text-gray-900">Starter</th>
                  <th className="text-center p-6 font-semibold text-gray-900">Professional</th>
                  <th className="text-center p-6 font-semibold text-gray-900">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((category, categoryIndex) => (
                  <React.Fragment key={category.category}>
                    <tr className="bg-gray-50">
                      <td colSpan={4} className="p-4 font-semibold text-gray-900">
                        {category.category}
                      </td>
                    </tr>
                    {category.features.map((feature, featureIndex) => (
                      <tr key={featureIndex} className="border-b border-gray-100">
                        <td className="p-4 text-gray-700">{feature.name}</td>
                        <td className="p-4 text-center">
                          {feature.starter ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 mx-auto" />
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {feature.professional ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 mx-auto" />
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {feature.enterprise ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 mx-auto" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <h3 className="heading-3 text-gray-900 mb-4">
            Questions about pricing?
          </h3>
          <p className="text-gray-600 mb-8">
            We're here to help you choose the right plan for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Sales
              </Button>
            </Link>
            <Link href="/faq">
              <Button variant="ghost" size="lg">
                View FAQ
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
