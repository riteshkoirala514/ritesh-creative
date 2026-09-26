import LettersContent from '@/components/newsletter/LettersContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Letters from Ritesh',
  description: 'Notes, stories, ideas and things I\'ve discovered. Occasionally delivered to your inbox.',
};

export default function LettersPage() {
  return <LettersContent />;
}
