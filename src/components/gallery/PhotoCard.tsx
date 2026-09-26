import Link from 'next/link';

interface PhotoCardProps {
  photo: {
    slug: string;
    description: string;
    image: string;
    tags?: string[];
  };
}

export default function PhotoCard({ photo }: PhotoCardProps) {
  const place = photo.tags?.[0] || '';
  const time = photo.tags?.[1] || '';

  return (
    <Link href={`/places/${photo.slug}`} className="group block card-hover rounded-xl overflow-hidden relative">
      <div className="aspect-[4/5]">
        <img
          src={photo.image}
          alt={photo.description}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {place && (
            <p className="text-[11px] text-blue font-bold uppercase tracking-[0.15em]">
              {place}{time ? ` · ${time}` : ''}
            </p>
          )}
          <p className="text-sm text-white/80 mt-1">
            {photo.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
