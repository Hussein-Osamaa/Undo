import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { QueryProvider } from '@/lib/providers/QueryProvider';
import { AuthProvider } from '@/lib/providers/AuthProvider';
import { BusinessProvider } from '@/lib/providers/BusinessProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MADAS - Business Management Platform',
  description: 'Complete business management solution with POS, inventory, orders, and more',
  keywords: ['business management', 'POS', 'inventory', 'orders', 'SaaS'],
  authors: [{ name: 'MADAS Team' }],
  creator: 'MADAS',
  publisher: 'MADAS',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://app.madas.com',
    title: 'MADAS - Business Management Platform',
    description: 'Complete business management solution with POS, inventory, orders, and more',
    siteName: 'MADAS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MADAS - Business Management Platform',
    description: 'Complete business management solution with POS, inventory, orders, and more',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#3b82f6',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-gray-50 antialiased`}>
        <QueryProvider>
          <AuthProvider>
            <BusinessProvider>
              {children}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                  },
                  success: {
                    duration: 3000,
                    iconTheme: {
                      primary: '#22c55e',
                      secondary: '#fff',
                    },
                  },
                  error: {
                    duration: 5000,
                    iconTheme: {
                      primary: '#ef4444',
                      secondary: '#fff',
                    },
                  },
                }}
              />
            </BusinessProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
