import { getProfile } from '@/lib/content';
import AboutContent from '@/components/about/AboutContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'The story behind ritesh.creative.',
};

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const profile = await getProfile();
  return <AboutContent profile={profile} />;
}
