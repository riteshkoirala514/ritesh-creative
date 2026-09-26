import { notFound } from 'next/navigation';
import { getPostBySlug, getPostsByCategory, getRelatedPosts } from '@/lib/content';
import PostRenderer from '@/components/content/PostRenderer';
import Signature from '@/components/content/Signature';
import ShareButtons from '@/components/ui/ShareButtons';
import RelatedPosts from '@/components/content/RelatedPosts';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug('ideas', slug);
  if (!post) return {};
  return { title: post.title, description: post.description, openGraph: { images: [post.thumbnail || post.image] } };
}

export async function generateStaticParams() {
  return (await getPostsByCategory('ideas')).map((p) => ({ slug: p.slug }));
}

export default async function IdeaArticle({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug('ideas', slug);
  if (!post) notFound();
  const related = await getRelatedPosts(slug, 'ideas');

  return (
    <>
      <PostRenderer post={post} />
      <ShareButtons title={post.title} url={`/ideas/${slug}`} />
      <Signature />
      <RelatedPosts posts={related} />
    </>
  );
}
