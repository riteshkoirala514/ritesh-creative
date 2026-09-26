import { getPostsByCategory } from '@/lib/content';
import PlacesGrid from '@/components/gallery/PlacesGrid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Places',
  description: 'Travel, cities, photographs and experiences.',
};

export default async function PlacesPage() {
  const places = await getPostsByCategory('places');
  return <PlacesGrid places={places} />;
}
