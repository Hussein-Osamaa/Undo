/**
 * Main landing page for the MADAS marketing website
 */

import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Pricing } from '@/components/sections/Pricing';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQ } from '@/components/sections/FAQ';
import { CTA } from '@/components/sections/CTA';

export const metadata: Metadata = {
  title: 'MADAS - Everything Your Business Needs, All in One Place',
  description: 'Streamline your operations with our comprehensive business management platform. From point of sale to inventory management, we\'ve got you covered.',
  keywords: [
    'business management',
    'point of sale',
    'inventory management',
    'business software',
    'SaaS',
    'business dashboard',
    'staff management',
    'analytics',
    'ecommerce',
    'retail software'
  ],
  authors: [{ name: 'MADAS Team' }],
  creator: 'MADAS',
  publisher: 'MADAS',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://madas.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'MADAS - Everything Your Business Needs, All in One Place',
    description: 'Streamline your operations with our comprehensive business management platform. From point of sale to inventory management, we\'ve got you covered.',
    url: 'https://madas.com',
    siteName: 'MADAS',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MADAS Business Management Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MADAS - Everything Your Business Needs, All in One Place',
    description: 'Streamline your operations with our comprehensive business management platform.',
    images: ['/images/og-image.jpg'],
    creator: '@madas',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <Features />
      
      {/* Pricing Section */}
      <Pricing />
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* FAQ Section */}
      <FAQ />
      
      {/* Final CTA Section */}
      <CTA />
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
