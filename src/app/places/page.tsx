import { getPostsByCategory } from '@/lib/content';
import PlacesGrid from '@/components/gallery/PlacesGrid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Places',
  description: 'Travel, cities, photographs and experiences.',
};

export default function PlacesPage() {
  const places = getPostsByCategory('places');
  return <PlacesGrid places={places} />;
}
