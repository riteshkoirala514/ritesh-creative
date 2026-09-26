'use client';

import { usePathname } from 'next/navigation';

const marqueeWords = [
  { text: 'WRITING', color: '#C0C0C0' },
  { text: 'PEOPLE', color: '#FFD700' },
  { text: 'PLACES', color: '#DC2626' },
  { text: 'IDEAS', color: '#C0C0C0' },
  { text: 'CREATE', color: '#FFD700' },
  { text: 'PHOTOGRAPHY', color: '#DC2626' },
  { text: 'VIDEO', color: '#C0C0C0' },
  { text: 'STORIES', color: '#FFD700' },
  { text: 'JOURNALS', color: '#DC2626' },
];

export function FooterMarquee() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  if (isHome) return <div className="border-t-2 border-text-primary" />;

  return (
    <div className="py-4 overflow-hidden border-t-2 border-b-2 border-text-primary">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {Array.from({ length: 3 }).map((_, rep) => (
          <div key={rep} className="flex items-center shrink-0">
            {marqueeWords.map((word, i) => (
              <div key={`${rep}-${i}`} className="flex items-center">
                <span className="text-4xl md:text-6xl font-extrabold tracking-tighter mx-3 select-none" style={{ color: word.color }}>{word.text}</span>
                <span className="text-2xl md:text-3xl mx-2 font-black select-none" style={{ color: '#DC2626' }}>●</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
