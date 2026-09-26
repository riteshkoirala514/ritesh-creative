import { getPostsByCategory } from '@/lib/content';
import SectionPage from '@/components/content/SectionPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create',
  description: 'Photography, video, design, experiments and other creative work.',
};

export default function CreatePage() {
  const posts = getPostsByCategory('create');

  return (
    <SectionPage
      title="Create"
      description="The stuff I make when nobody's watching (and sometimes when they are)."
      posts={posts}
      emptyMessage="Making things as we speak"
      color="#10B981"
    />
  );
}
