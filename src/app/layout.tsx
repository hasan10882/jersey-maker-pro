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
  <meta name="description" content="Design your own custom sports jersey in minutes with JerseyMakerPro." />
  <meta property="og:title" content="JerseyMakerPro" />
  <meta property="og:description" content="Customizable sportswear with virtual try-on and design previews." />
  <meta property="og:image" content="/cover.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.ico" />
</head>

      <body>{children}</body>
    </html>
  );
}
