import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Voyager | Polska Galanteria Skórzana',
  description: 'Voyager - Wysokiej jakości galanteria skórzana. Paski, plecaki, torebki i akcesoria firmowe.',
  keywords: 'galanteria skórzana, paski, plecaki, torebki, akcesoria firmowe, personalizacja, skóra naturalna',
  authors: [{ name: 'Voyager' }],
  openGraph: {
    title: 'Voyager - Galanteria Skórzana',
    description: 'Wysokiej jakości galanteria skórzana dla firm i klientów indywidualnych',
    type: 'website',
    locale: 'pl_PL',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={`${inter.variable} ${playfair.variable} smooth-scroll`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#f4f0ea',
              color: '#2c2c2c',
              border: '1px solid #d5c6b5',
            },
          }}
        />
      </body>
    </html>
  );
}