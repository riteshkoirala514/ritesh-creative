import Link from 'next/link';
import { Post } from '@/lib/types';

interface VideoCardProps {
  video: Post;
}

export default function VideoCard({ video }: VideoCardProps) {
  const duration = video.readTime || '';

  return (
    <Link href={`/create/${video.slug}`} className="group block">
      <div className="relative rounded-lg overflow-hidden bg-cream aspect-video mb-3">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          style={{
            backgroundImage: `url(${video.image})`,
            backgroundColor: '#EEEEEE',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center group-hover:bg-charcoal group-hover:scale-105 transition-all duration-300">
            <svg
              className="w-4 h-4 text-charcoal group-hover:text-white ml-0.5 transition-colors duration-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        {duration && (
          <div className="absolute bottom-2.5 right-2.5 bg-charcoal/80 text-white text-[11px] px-2 py-0.5 rounded">
            {duration}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-base font-semibold text-charcoal group-hover:text-accent transition-colors duration-200 leading-snug tracking-tight">
          {video.title}
        </h3>
        <p className="text-muted text-sm mt-1 leading-relaxed line-clamp-2">
          {video.description}
        </p>
        {video.tags && video.tags.length > 0 && (
          <div className="flex gap-1.5 mt-2">
            {video.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] text-muted bg-cream px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
