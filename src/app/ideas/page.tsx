import { getPostsByCategory } from '@/lib/content';
import SectionPage from '@/components/content/SectionPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ideas',
  description: 'Technology, AI, products, business and things I\'m figuring out.',
};

export default async function IdeasPage() {
  const posts = await getPostsByCategory('ideas');

  return (
    <SectionPage
      title="Ideas"
      description="Things I can't stop thinking about."
      posts={posts}
      emptyMessage="Brain is still loading"
      color="#A855F7"
    />
  );
}
