import { getDreams } from '@/lib/content';
import DreamsContent from '@/components/dreams/DreamsContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dreams & Wishlist',
  description: 'Things I want to do, places I want to go, stuff I want to build.',
};

export const dynamic = 'force-dynamic';

export default async function DreamsPage() {
  const dreams = await getDreams();
  return <DreamsContent dreams={dreams} />;
}
