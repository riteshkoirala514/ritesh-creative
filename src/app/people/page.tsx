import { getPostsByCategory } from '@/lib/content';
import PeopleGrid from '@/components/people/PeopleGrid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'People',
  description: 'Conversations, interviews and stories about people.',
};

export default async function PeoplePage() {
  const people = await getPostsByCategory('people');
  return <PeopleGrid people={people} />;
}
