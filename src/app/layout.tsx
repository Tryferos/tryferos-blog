import type { Metadata } from 'next';
import { Geist_Mono, Poppins } from 'next/font/google';
import localFont from 'next/font/local';
import Link from 'next/link';

import { Toaster } from '@/components/ui/Toaster';
import { siteDescription, siteLabel, siteName } from '@/data/site.config';
import { cn } from '@/lib/utils';

import './globals.css';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const wotfard = localFont({
  variable: '--font-wotfard',
  display: 'swap',
  src: [
    { path: './fonts/wotfard-regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/wotfard-medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/wotfard-semibold.woff2', weight: '600', style: 'normal' },
  ],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s · ${siteName}`,
  },
  description: siteDescription,
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={cn(
        poppins.variable,
        wotfard.variable,
        geistMono.variable,
        'h-full antialiased',
      )}
    >
      <body className="flex min-h-full flex-col">
        <header className="mx-auto w-full max-w-2xl px-6 pt-8">
          <Link
            href="/"
            className="font-header text-sm font-medium text-primary"
          >
            {siteLabel}
          </Link>
        </header>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
