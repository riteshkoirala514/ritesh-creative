import Hero from '@/components/home/Hero';
import LatestFeed from '@/components/home/LatestFeed';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import PeopleStrip from '@/components/home/PeopleStrip';
import NewsletterCTA from '@/components/home/NewsletterCTA';
import SeriesStrip from '@/components/home/SeriesStrip';
import { getLatestPosts, getPostsByCategory, getAllSeries, getPostsBySeries } from '@/lib/content';

export default function HomePage() {
  const allPosts = getLatestPosts(12);
  const latestPosts = getLatestPosts(8);
  const peoplePosts = getPostsByCategory('people').slice(0, 4);
  const placesPosts = getPostsByCategory('places').slice(0, 2);
  const seriesData = getAllSeries().map((s) => ({ ...s, count: getPostsBySeries(s.slug).length }));

  return (
    <>
      <Hero posts={allPosts} />
      <LatestFeed posts={latestPosts} />
      {seriesData.length > 0 && <SeriesStrip series={seriesData} />}
      <PeopleStrip people={peoplePosts} />
      <CategoryShowcase title="Places" description="The world through my lens." href="/places" posts={placesPosts} layout="landscape" color="#1D4ED8" />
      <NewsletterCTA />
    </>
  );
}
