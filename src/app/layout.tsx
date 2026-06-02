import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { QueryProvider } from '@/providers/query-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const generalSans = localFont({
  variable: '--font-general-sans',
  display: 'swap',
  src: [
    {
      path: './fonts/GeneralSans-Variable.woff2',
      weight: '200 600',
      style: 'normal',
    },
    {
      path: './fonts/GeneralSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: {
    default: 'ExerciseLog',
    template: '%s | ExerciseLog',
  },
  description: 'Track your workouts, monitor progress, and generate AI-powered training plans.',
  applicationName: 'ExerciseLog',
  keywords: ['workout', 'exercise', 'fitness', 'tracker', 'training', 'gym'],
  authors: [{ name: 'ExerciseLog' }],
  creator: 'ExerciseLog',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'ExerciseLog',
    title: 'ExerciseLog',
    description: 'Track your workouts, monitor progress, and generate AI-powered training plans.',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={generalSans.variable} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
