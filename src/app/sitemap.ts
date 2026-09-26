import { MetadataRoute } from 'next';
import { getAllPosts, getAllSeries } from '@/lib/content';

const BASE_URL = 'https://ritesh.win';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const series = await getAllSeries();

  const postUrls = posts.map((post) => ({
    url: `${BASE_URL}/${post.category}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: post.featured ? 0.9 : 0.7,
  }));

  const seriesUrls = series.map((s) => ({
    url: `${BASE_URL}/series/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const staticPages = [
    { url: BASE_URL, changeFrequency: 'daily' as const, priority: 1 },
    { url: `${BASE_URL}/writing`, changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${BASE_URL}/people`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE_URL}/places`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE_URL}/ideas`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE_URL}/create`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE_URL}/letters`, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${BASE_URL}/series`, changeFrequency: 'weekly' as const, priority: 0.7 },
  ];

  return [...staticPages, ...postUrls, ...seriesUrls];
}
