import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import TopBar from '@/components/layout/TopBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BackgroundBlobs from '@/components/ui/BackgroundBlobs';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'ritesh.creative — Stories, ideas & things worth sharing',
    template: '%s — ritesh.creative',
  },
  description:
    'A personal creative journal by Ritesh Koirala. Writing, photography, people, places, ideas and things worth sharing.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text-primary">
        <BackgroundBlobs />
        <TopBar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Navbar />
      </body>
    </html>
  );
}
