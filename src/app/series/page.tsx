import { getAllSeries, getPostsBySeries } from '@/lib/content';
import SeriesGrid from '@/components/series/SeriesGrid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Series',
  description: 'Collections and ongoing stories.',
};

export default async function SeriesPage() {
  const allSeries = await getAllSeries();
  const seriesWithCounts = await Promise.all(allSeries.map(async (s) => ({
    series: s,
    postCount: (await getPostsBySeries(s.slug)).length,
  })));

  return <SeriesGrid items={seriesWithCounts} />;
}
