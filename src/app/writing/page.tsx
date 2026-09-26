import { getPostsByCategory } from '@/lib/content';
import SectionPage from '@/components/content/SectionPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Essays, opinions, observations and personal writing.',
};

export default function WritingPage() {
  const posts = getPostsByCategory('writing');

  return (
    <SectionPage
      title="Writing"
      description="Words I've arranged in hopefully interesting ways."
      posts={posts}
      emptyMessage="Cooking up some stories"
      color="#FF6B35"
    />
  );
}
