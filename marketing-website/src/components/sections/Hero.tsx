/**
 * Hero section component for the marketing website
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, ArrowRight, CheckCircle, Star } from 'lucide-react';
import { Button } from '@madas/shared';

interface HeroProps {
  className?: string;
}

const stats = [
  { label: 'Active Businesses', value: '500+' },
  { label: 'Orders Processed', value: '1M+' },
  { label: 'Customer Satisfaction', value: '98%' },
  { label: 'Uptime', value: '99.9%' },
];

const features = [
  'Point of Sale System',
  'Inventory Management',
  'Staff Management',
  'Analytics Dashboard',
  'Website Builder',
  'Multi-location Support',
];

export const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <section className={`relative overflow-hidden gradient-hero ${className}`}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-200/10 to-purple-200/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container-custom">
        <div className="pt-20 pb-16 lg:pt-32 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              {/* Trust Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-700 mb-6"
              >
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span>4.9/5 rating from 500+ businesses</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="heading-1 text-gray-900 mb-6"
              >
                Everything Your Business Needs,{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  All in One Place
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-gray-600 mb-8 max-w-2xl"
              >
                Streamline your operations with our comprehensive business management platform. 
                From point of sale to inventory management, we've got you covered.
              </motion.p>

              {/* Feature List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8"
              >
                {features.map((feature, index) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <Link href="/signup">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <Play className="mr-2 w-5 h-5" />
                    Watch Demo
                  </Button>
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-center lg:text-left"
              >
                <p className="text-sm text-gray-500 mb-4">
                  Trusted by businesses worldwide
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-8 opacity-60">
                  {/* Placeholder for company logos */}
                  <div className="h-8 w-24 bg-gray-300 rounded flex items-center justify-center text-xs font-semibold text-gray-600">
                    LOGO
                  </div>
                  <div className="h-8 w-24 bg-gray-300 rounded flex items-center justify-center text-xs font-semibold text-gray-600">
                    LOGO
                  </div>
                  <div className="h-8 w-24 bg-gray-300 rounded flex items-center justify-center text-xs font-semibold text-gray-600">
                    LOGO
                  </div>
                  <div className="h-8 w-24 bg-gray-300 rounded flex items-center justify-center text-xs font-semibold text-gray-600">
                    LOGO
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              {/* Dashboard Preview */}
              <div className="relative">
                {/* Main Dashboard Mockup */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="relative bg-white rounded-2xl shadow-large border border-gray-200 overflow-hidden"
                >
                  {/* Browser Header */}
                  <div className="flex items-center space-x-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                      <div className="w-3 h-3 bg-green-400 rounded-full" />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="h-6 bg-gray-200 rounded text-xs flex items-center justify-center text-gray-500">
                        dashboard.madas.com
                      </div>
                    </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Dashboard</h3>
                        <p className="text-sm text-gray-500">Welcome back, John!</p>
                      </div>
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                        JD
                      </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {stats.map((stat, index) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                          className="bg-gray-50 rounded-lg p-4"
                        >
                          <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                          <div className="text-xs text-gray-500">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Chart Placeholder */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 1.1 }}
                      className="h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center"
                    >
                      <div className="text-gray-500 text-sm">📊 Sales Chart</div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.3 }}
                  className="absolute -top-4 -right-4 bg-white rounded-xl shadow-medium border border-gray-200 p-4"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-gray-700">New Order</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">$127.50</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.5 }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-medium border border-gray-200 p-4"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full" />
                    <span className="text-sm font-medium text-gray-700">Low Stock</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">3 items</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-12 text-white"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="currentColor"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            fill="currentColor"
            opacity="0.5"
          />
        </svg>
      </div>
    </section>
  );
};
