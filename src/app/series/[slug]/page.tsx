import { notFound } from 'next/navigation';
import { getAllSeries, getSeriesBySlug, getPostsBySeries } from '@/lib/content';
import SeriesDetail from '@/components/series/SeriesDetail';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);
  if (!series) return {};
  return { title: series.title, description: series.description };
}

export function generateStaticParams() {
  return getAllSeries().map((s) => ({ slug: s.slug }));
}

export default async function SeriesPage({ params }: Props) {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);
  if (!series) notFound();
  const posts = getPostsBySeries(slug);

  return <SeriesDetail series={series} posts={posts} />;
}
