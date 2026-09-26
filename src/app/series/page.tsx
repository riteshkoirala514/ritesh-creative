import { getAllSeries, getPostsBySeries } from '@/lib/content';
import SeriesGrid from '@/components/series/SeriesGrid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Series',
  description: 'Collections and ongoing stories.',
};

export default function SeriesPage() {
  const allSeries = getAllSeries();
  const seriesWithCounts = allSeries.map((s) => ({
    series: s,
    postCount: getPostsBySeries(s.slug).length,
  }));

  return <SeriesGrid items={seriesWithCounts} />;
}
