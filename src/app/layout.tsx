import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JerseyMakerPro',
  description: 'Design your own custom sports jersey in minutes.',
  themeColor: '#2563eb',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e3a8a" />
      </head>
      <body>{children}</body>
    </html>
  );
}
