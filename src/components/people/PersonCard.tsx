import Link from 'next/link';

interface PersonCardProps {
  person: {
    slug: string;
    title: string;
    description: string;
    image: string;
  };
}

export default function PersonCard({ person }: PersonCardProps) {
  return (
    <Link href={`/people/${person.slug}`} className="group block card-hover rounded-2xl overflow-hidden relative">
      <div className="aspect-[3/4]">
        <img
          src={person.image}
          alt={person.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors duration-200 tracking-tight">
            {person.title}
          </h3>
          <p className="text-white/50 text-sm mt-1 line-clamp-2">
            {person.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
