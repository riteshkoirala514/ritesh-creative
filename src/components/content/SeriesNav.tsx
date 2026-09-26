'use client';

import Link from 'next/link';

interface SeriesPost {
  slug: string;
  title: string;
  category: string;
}

interface SeriesNavProps {
  seriesTitle: string;
  seriesSlug: string;
  posts: SeriesPost[];
  currentSlug: string;
}

export default function SeriesNav({ seriesTitle, seriesSlug, posts, currentSlug }: SeriesNavProps) {
  if (posts.length <= 1) return null;

  const currentIndex = posts.findIndex((p) => p.slug === currentSlug);
  const prev = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const next = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return (
    <div className="max-w-2xl mx-auto px-6 py-4 mb-4">
      <Link href={`/series/${seriesSlug}`} className="inline-flex items-center gap-2 px-4 py-2 bg-bg-card border border-border rounded-full text-sm hover:border-accent transition-colors">
        <span className="text-accent font-bold text-xs">Series</span>
        <span className="text-text-primary font-medium">{seriesTitle}</span>
        <span className="text-text-secondary/50 text-xs">({currentIndex + 1}/{posts.length})</span>
      </Link>

      {(prev || next) && (
        <div className="flex justify-between mt-3 text-xs">
          {prev ? <Link href={`/${prev.category}/${prev.slug}`} className="text-text-secondary hover:text-accent transition-colors">← {prev.title}</Link> : <span />}
          {next ? <Link href={`/${next.category}/${next.slug}`} className="text-text-secondary hover:text-accent transition-colors">{next.title} →</Link> : <span />}
        </div>
      )}
    </div>
  );
}
