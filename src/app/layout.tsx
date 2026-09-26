import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import TopBarWrapper from '@/components/layout/TopBarWrapper';
import NavbarWrapper from '@/components/layout/NavbarWrapper';
import Footer from '@/components/layout/Footer';
import BackgroundBlobs from '@/components/ui/BackgroundBlobs';
import ParticleCursor from '@/components/ui/ParticleCursor';
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

import { getProfile } from '@/lib/content';

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const brand = profile.brand_name || 'ritesh.creative';
  return {
    title: {
      default: `${brand} — ${profile.quote || 'Stories, ideas & things worth sharing'}`,
      template: `%s — ${brand}`,
    },
    description: `A personal creative journal by ${profile.name}. Writing, photography, people, places, ideas and things worth sharing.`,
    icons: { icon: '/logo.png', apple: '/logo.png' },
  };
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text-primary">
        <BackgroundBlobs />
        <ParticleCursor />
        <TopBarWrapper />
        <main className="flex-1">{children}</main>
        <Footer />
        <NavbarWrapper />
      </body>
    </html>
  );
}
