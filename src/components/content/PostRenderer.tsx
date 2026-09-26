import { Post } from '@/lib/types';
import { getSeriesBySlug, getPostsBySeries } from '@/lib/content';
import ArticleRenderer from './renderers/ArticleRenderer';
import GalleryRenderer from './renderers/GalleryRenderer';
import VideoRenderer from './renderers/VideoRenderer';
import PhotoRenderer from './renderers/PhotoRenderer';
import EssayRenderer from './renderers/EssayRenderer';
import SeriesNav from './SeriesNav';

interface PostRendererProps {
  post: Post;
}

export default function PostRenderer({ post }: PostRendererProps) {
  // Resolve series data on the server
  let seriesData: { title: string; slug: string; posts: { slug: string; title: string; category: string }[] } | null = null;
  if (post.series) {
    const series = getSeriesBySlug(post.series);
    const seriesPosts = getPostsBySeries(post.series);
    if (series) {
      seriesData = {
        title: series.title,
        slug: series.slug,
        posts: seriesPosts.map((p) => ({ slug: p.slug, title: p.title, category: p.category })),
      };
    }
  }

  const seriesNav = seriesData ? (
    <SeriesNav
      seriesTitle={seriesData.title}
      seriesSlug={seriesData.slug}
      posts={seriesData.posts}
      currentSlug={post.slug}
    />
  ) : null;

  switch (post.format) {
    case 'gallery':
      return <><GalleryRenderer post={post} />{seriesNav}</>;
    case 'video':
      return <><VideoRenderer post={post} />{seriesNav}</>;
    case 'photo':
      return <><PhotoRenderer post={post} />{seriesNav}</>;
    case 'essay':
      return <><EssayRenderer post={post} />{seriesNav}</>;
    case 'article':
    default:
      return <><ArticleRenderer post={post} />{seriesNav}</>;
  }
}
