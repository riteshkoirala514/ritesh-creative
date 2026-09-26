import Link from 'next/link';
import { Series } from '@/lib/types';

interface SeriesCardProps {
  series: Series;
  postCount: number;
}

export default function SeriesCard({ series, postCount }: SeriesCardProps) {
  return (
    <Link href={`/series/${series.slug}`} className="group block card-hover rounded-2xl overflow-hidden relative">
      <div className="aspect-[16/10]">
        <img src={series.image} alt={series.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="text-xs font-bold text-accent uppercase tracking-[0.15em]">{postCount} posts</span>
          <h3 className="text-xl md:text-2xl font-bold text-white mt-1 tracking-tight group-hover:text-accent transition-colors">{series.title}</h3>
          <p className="text-white/50 text-sm mt-1">{series.description}</p>
        </div>
      </div>
    </Link>
  );
}
