/**
 * Footer component for the marketing website
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Instagram, 
  Youtube,
  ArrowRight,
  Shield,
  Award,
  Users,
  Globe
} from 'lucide-react';
import { Button, Input } from '@madas/shared';

interface FooterProps {
  className?: string;
}

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Integrations', href: '/integrations' },
      { label: 'API', href: '/api' },
      { label: 'Security', href: '/security' },
      { label: 'Roadmap', href: '/roadmap' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Retail', href: '/solutions/retail' },
      { label: 'Restaurants', href: '/solutions/restaurants' },
      { label: 'Healthcare', href: '/solutions/healthcare' },
      { label: 'Professional Services', href: '/solutions/professional-services' },
      { label: 'E-commerce', href: '/solutions/ecommerce' },
      { label: 'Multi-location', href: '/solutions/multi-location' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Help Center', href: '/help' },
      { label: 'Video Tutorials', href: '/tutorials' },
      { label: 'Blog', href: '/blog' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Webinars', href: '/webinars' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Partners', href: '/partners' },
      { label: 'Contact', href: '/contact' },
      { label: 'Status', href: 'https://status.madas.com', external: true },
    ],
  },
];

const socialLinks = [
  { name: 'Twitter', href: 'https://twitter.com/madas', icon: Twitter },
  { name: 'Facebook', href: 'https://facebook.com/madas', icon: Facebook },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/madas', icon: Linkedin },
  { name: 'Instagram', href: 'https://instagram.com/madas', icon: Instagram },
  { name: 'YouTube', href: 'https://youtube.com/madas', icon: Youtube },
];

const certifications = [
  { name: 'SOC 2 Type II', icon: Shield },
  { name: 'PCI DSS', icon: Award },
  { name: 'ISO 27001', icon: Users },
  { name: 'GDPR Compliant', icon: Globe },
];

export const Footer: React.FC<FooterProps> = ({ className }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset form
    setEmail('');
    setIsSubmitting(false);
    
    // Show success message (you can implement a toast notification here)
    alert('Thank you for subscribing to our newsletter!');
  };

  return (
    <footer className={`bg-gray-900 text-white ${className}`}>
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Stay updated with MADAS
              </h3>
              <p className="text-gray-300 text-lg">
                Get the latest product updates, business tips, and industry insights delivered to your inbox.
              </p>
            </div>
            
            <form onSubmit={handleNewsletterSubmit} className="flex gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button 
                type="submit" 
                loading={isSubmitting}
                disabled={!email}
              >
                Subscribe
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-2xl font-bold">MADAS</span>
            </Link>
            
            <p className="text-gray-300 mb-6 max-w-md">
              The all-in-one business management platform that helps you streamline operations, 
              manage inventory, process payments, and grow your business.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">support@madas.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">San Francisco, CA</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h5 className="text-sm font-semibold text-gray-400 mb-4">
                Security & Compliance
              </h5>
              <div className="flex flex-wrap gap-6">
                {certifications.map((cert) => (
                  <div key={cert.name} className="flex items-center space-x-2">
                    <cert.icon className="w-5 h-5 text-green-400" />
                    <span className="text-sm text-gray-300">{cert.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-sm text-gray-400">
              <p>Trusted by 500+ businesses worldwide</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-400">
              © 2024 MADAS. All rights reserved.
            </div>
            
            <div className="flex flex-wrap gap-6">
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-sm text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link href="/gdpr" className="text-sm text-gray-400 hover:text-white transition-colors">
                GDPR
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
