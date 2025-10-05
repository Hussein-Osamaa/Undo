/**
 * Testimonials section component for the marketing website
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote, Play } from 'lucide-react';
import { Card, Button } from '@madas/shared';

interface TestimonialsProps {
  className?: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  companyLogo?: string;
  avatar: string;
  rating: number;
  text: string;
  videoUrl?: string;
  metrics?: {
    label: string;
    value: string;
  }[];
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Owner',
    company: 'Bella\'s Boutique',
    avatar: '/images/testimonials/sarah-johnson.jpg',
    rating: 5,
    text: 'MADAS has completely transformed how we run our boutique. The inventory management alone has saved us 10 hours per week, and our sales have increased by 40% since implementing the POS system.',
    metrics: [
      { label: 'Sales Increase', value: '+40%' },
      { label: 'Time Saved', value: '10 hrs/week' },
    ],
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Operations Manager',
    company: 'TechStore Pro',
    avatar: '/images/testimonials/michael-chen.jpg',
    rating: 5,
    text: 'The analytics dashboard gives us insights we never had before. We can now make data-driven decisions that have improved our profit margins by 25%. The staff management features are also incredibly intuitive.',
    metrics: [
      { label: 'Profit Increase', value: '+25%' },
      { label: 'Staff Efficiency', value: '+60%' },
    ],
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Founder',
    company: 'Green Earth Café',
    avatar: '/images/testimonials/emily-rodriguez.jpg',
    rating: 5,
    text: 'Setting up our online store was so easy with MADAS. We went from having no online presence to processing 200+ orders per week in just 2 months. The customer support team is fantastic too.',
    metrics: [
      { label: 'Online Orders', value: '200+/week' },
      { label: 'Setup Time', value: '2 months' },
    ],
  },
  {
    id: '4',
    name: 'David Thompson',
    role: 'CEO',
    company: 'Thompson Electronics',
    avatar: '/images/testimonials/david-thompson.jpg',
    rating: 5,
    text: 'The multi-location support has been a game-changer for our business. We can now manage all 5 stores from one dashboard, and the real-time inventory sync prevents stockouts across locations.',
    metrics: [
      { label: 'Locations', value: '5 stores' },
      { label: 'Stockouts', value: '-90%' },
    ],
  },
  {
    id: '5',
    name: 'Lisa Park',
    role: 'Marketing Director',
    company: 'Urban Fashion Co.',
    avatar: '/images/testimonials/lisa-park.jpg',
    rating: 5,
    text: 'The customer management system has helped us build stronger relationships with our customers. We can now track purchase history, send targeted campaigns, and our customer retention has improved by 35%.',
    metrics: [
      { label: 'Retention Rate', value: '+35%' },
      { label: 'Campaign ROI', value: '+150%' },
    ],
  },
  {
    id: '6',
    name: 'James Wilson',
    role: 'Store Manager',
    company: 'Wilson\'s Hardware',
    avatar: '/images/testimonials/james-wilson.jpg',
    rating: 5,
    text: 'The staff scheduling feature has eliminated all our scheduling conflicts, and the time tracking has made payroll processing so much easier. Our team productivity has increased significantly.',
    metrics: [
      { label: 'Scheduling Conflicts', value: '-100%' },
      { label: 'Payroll Time', value: '-70%' },
    ],
  },
];

const companyLogos = [
  { name: 'Bella\'s Boutique', logo: '/images/logos/bellas-boutique.png' },
  { name: 'TechStore Pro', logo: '/images/logos/techstore-pro.png' },
  { name: 'Green Earth Café', logo: '/images/logos/green-earth-cafe.png' },
  { name: 'Thompson Electronics', logo: '/images/logos/thompson-electronics.png' },
  { name: 'Urban Fashion Co.', logo: '/images/logos/urban-fashion.png' },
  { name: 'Wilson\'s Hardware', logo: '/images/logos/wilsons-hardware.png' },
];

export const Testimonials: React.FC<TestimonialsProps> = ({ className }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedTestimonial, setSelectedTestimonial] = React.useState<string | null>(null);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
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
            Loved by{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              500+ businesses
            </span>{' '}
            worldwide
          </h2>
          <p className="text-xl text-gray-600">
            See how MADAS has helped businesses like yours streamline operations, increase sales, and grow faster.
          </p>
        </motion.div>

        {/* Company Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-8 mb-16 opacity-60"
        >
          {companyLogos.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="flex items-center justify-center h-12 w-32"
            >
              <div className="h-8 w-24 bg-gray-300 rounded flex items-center justify-center text-xs font-semibold text-gray-600">
                {company.name}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            >
              <Card className="h-full hover-lift">
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <div className="flex justify-start mb-4">
                    <Quote className="w-8 h-8 text-blue-100" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  {/* Metrics */}
                  {testimonial.metrics && (
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {testimonial.metrics.map((metric, metricIndex) => (
                        <div key={metricIndex} className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-lg font-bold text-blue-600">
                            {metric.value}
                          </div>
                          <div className="text-xs text-gray-600">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Author Info */}
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 flex items-center justify-center">
                      <span className="text-gray-600 font-semibold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Video Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          <Card className="overflow-hidden">
            <div className="relative aspect-video bg-gradient-to-br from-blue-500 to-purple-600">
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-white/30"
                  onClick={() => setSelectedTestimonial('video-1')}
                >
                  <Play className="w-6 h-6 mr-2" />
                  Watch Sarah's Story
                </Button>
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="font-semibold">Sarah Johnson</div>
                <div className="text-sm opacity-90">Bella's Boutique</div>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="relative aspect-video bg-gradient-to-br from-green-500 to-teal-600">
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-white/30"
                  onClick={() => setSelectedTestimonial('video-2')}
                >
                  <Play className="w-6 h-6 mr-2" />
                  Watch Michael's Story
                </Button>
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="font-semibold">Michael Chen</div>
                <div className="text-sm opacity-90">TechStore Pro</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="bg-white rounded-2xl shadow-large p-8 lg:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="heading-3 text-gray-900 mb-4">
              Trusted by businesses worldwide
            </h3>
            <p className="text-lg text-gray-600">
              Join thousands of successful businesses that rely on MADAS every day.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Active Businesses', value: '500+' },
              { label: 'Orders Processed', value: '1M+' },
              { label: 'Customer Satisfaction', value: '98%' },
              { label: 'Average ROI', value: '340%' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="text-center mt-16"
        >
          <h3 className="heading-3 text-gray-900 mb-4">
            Ready to join these successful businesses?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Start your 14-day free trial today and see how MADAS can transform your business operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="w-full sm:w-auto">
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Schedule Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
