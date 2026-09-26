import { getProfile } from '@/lib/content';
import LettersContent from '@/components/newsletter/LettersContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Letters',
  description: 'Notes, stories, ideas and things worth sharing. Occasionally delivered to your inbox.',
};

export default async function LettersPage() {
  const profile = await getProfile();
  return <LettersContent name={profile.name.split(' ')[0]} />;
}
