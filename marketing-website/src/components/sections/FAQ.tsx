/**
 * FAQ section component for the marketing website
 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { Button } from '@madas/shared';

interface FAQProps {
  className?: string;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'pricing' | 'features' | 'support' | 'security';
}

const faqItems: FAQItem[] = [
  {
    id: '1',
    question: 'What is MADAS and how does it work?',
    answer: 'MADAS is an all-in-one business management platform that helps you streamline operations, manage inventory, process payments, and grow your business. It combines point of sale, inventory management, staff scheduling, analytics, and more into one unified system.',
    category: 'general',
  },
  {
    id: '2',
    question: 'Is there a free trial available?',
    answer: 'Yes! We offer a 14-day free trial for all plans. No credit card required to start. You can explore all features and see how MADAS fits your business needs before committing to a subscription.',
    category: 'pricing',
  },
  {
    id: '3',
    question: 'Can I switch between plans?',
    answer: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any billing differences. Downgrades will apply at your next billing cycle.',
    category: 'pricing',
  },
  {
    id: '4',
    question: 'Do you offer custom pricing for large businesses?',
    answer: 'Yes, we offer custom Enterprise plans for businesses with specific needs. Contact our sales team to discuss your requirements and get a personalized quote with custom features and pricing.',
    category: 'pricing',
  },
  {
    id: '5',
    question: 'What features are included in each plan?',
    answer: 'Starter includes basic POS, inventory management, and reporting for 1 user. Professional adds advanced analytics, website builder, and supports up to 5 users. Enterprise includes everything plus API access, custom integrations, and unlimited users.',
    category: 'features',
  },
  {
    id: '6',
    question: 'Can I use MADAS offline?',
    answer: 'Yes! Our POS system works offline and automatically syncs when you\'re back online. You can process sales, manage inventory, and access customer data even without an internet connection.',
    category: 'features',
  },
  {
    id: '7',
    question: 'Does MADAS integrate with other software?',
    answer: 'Yes, MADAS integrates with popular tools like QuickBooks, Xero, Shopify, WooCommerce, and many others. Enterprise plans also include API access for custom integrations.',
    category: 'features',
  },
  {
    id: '8',
    question: 'How secure is my business data?',
    answer: 'Security is our top priority. We use enterprise-grade encryption, regular security audits, PCI DSS compliance, and SOC 2 Type II certification. Your data is backed up daily and stored in secure, geographically distributed servers.',
    category: 'security',
  },
  {
    id: '9',
    question: 'What kind of support do you provide?',
    answer: 'We offer comprehensive support including email support for all plans, priority support for Professional plans, and 24/7 phone support for Enterprise customers. We also provide extensive documentation, video tutorials, and live chat support.',
    category: 'support',
  },
  {
    id: '10',
    question: 'Can I export my data if I cancel?',
    answer: 'Yes, you can export all your data at any time in multiple formats (CSV, JSON, PDF). We provide easy-to-use export tools and will help you migrate your data if needed. We never lock you into our platform.',
    category: 'support',
  },
  {
    id: '11',
    question: 'How long does it take to set up MADAS?',
    answer: 'Most businesses can get started in under 30 minutes. Our intuitive onboarding wizard guides you through setup, and you can import existing inventory and customer data. Our support team is also available to help with migration.',
    category: 'general',
  },
  {
    id: '12',
    question: 'Do you offer training for my team?',
    answer: 'Yes! We provide comprehensive training resources including video tutorials, live webinars, and documentation. Enterprise customers receive dedicated training sessions and ongoing support to ensure your team gets the most out of MADAS.',
    category: 'support',
  },
];

const categories = [
  { id: 'all', label: 'All Questions' },
  { id: 'general', label: 'General' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'features', label: 'Features' },
  { id: 'support', label: 'Support' },
  { id: 'security', label: 'Security' },
];

export const FAQ: React.FC<FAQProps> = ({ className }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filteredItems = activeCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const openAllItems = () => {
    setOpenItems(filteredItems.map(item => item.id));
  };

  const closeAllItems = () => {
    setOpenItems([]);
  };

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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
            <HelpCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="heading-2 text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Find answers to common questions about MADAS. Can't find what you're looking for? 
            <Button variant="link" className="p-0 h-auto text-blue-600">
              Contact our support team
            </Button>
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="space-y-4 mb-8">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">
                    {item.question}
                  </span>
                  <div className="flex-shrink-0">
                    {openItems.includes(item.id) ? (
                      <Minus className="w-5 h-5 text-gray-500" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {openItems.includes(item.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Expand/Collapse All */}
          <div className="flex justify-center gap-4 mb-12">
            <Button
              variant="outline"
              onClick={openAllItems}
              disabled={openItems.length === filteredItems.length}
            >
              Expand All
            </Button>
            <Button
              variant="outline"
              onClick={closeAllItems}
              disabled={openItems.length === 0}
            >
              Collapse All
            </Button>
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 lg:p-12 text-center"
        >
          <h3 className="heading-3 text-gray-900 mb-4">
            Still have questions?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Our support team is here to help. Get in touch and we'll answer any questions you have about MADAS.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Contact Support
            </Button>
            <Button variant="outline" size="lg">
              Schedule a Call
            </Button>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-16 text-center"
        >
          <h4 className="text-lg font-semibold text-gray-900 mb-6">
            Quick Links
          </h4>
          <div className="flex flex-wrap justify-center gap-6">
            <Button variant="link" className="text-blue-600">
              Documentation
            </Button>
            <Button variant="link" className="text-blue-600">
              Video Tutorials
            </Button>
            <Button variant="link" className="text-blue-600">
              API Reference
            </Button>
            <Button variant="link" className="text-blue-600">
              System Status
            </Button>
            <Button variant="link" className="text-blue-600">
              Community Forum
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
