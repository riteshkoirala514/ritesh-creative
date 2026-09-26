'use client';

import Link from 'next/link';
import Image from 'next/image';
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

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <footer className="pb-24 md:pb-6">
      {/* Marquee — only on non-home pages */}
      {!isHome && (
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
      )}

      {isHome && <div className="border-t-2 border-text-primary" />}

      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Image src="/logo.png" alt="R" width={28} height={28} className="rounded" />
              <span className="text-sm font-extrabold tracking-tighter">RITESH<span style={{color:'#DC2626'}}>.</span>CREATIVE</span>
            </div>
            <p className="text-text-secondary text-xs leading-relaxed max-w-[200px]">Stories, ideas & things worth sharing.</p>
          </div>
          <div>
            <p className="label text-text-primary mb-3">Sections</p>
            {['Writing', 'People', 'Places', 'Ideas', 'Create'].map((s) => (
              <Link key={s} href={`/${s.toLowerCase()}`} className="block text-sm text-text-secondary hover:text-accent transition-colors mb-1.5">{s}</Link>
            ))}
          </div>
          <div>
            <p className="label text-text-primary mb-3">More</p>
            <Link href="/series" className="block text-sm text-text-secondary hover:text-accent transition-colors mb-1.5">Series</Link>
            <Link href="/letters" className="block text-sm text-text-secondary hover:text-accent transition-colors mb-1.5">Newsletter</Link>
            <Link href="/about" className="block text-sm text-text-secondary hover:text-accent transition-colors mb-1.5">About</Link>
            <Link href="/feed.xml" className="block text-sm text-text-secondary hover:text-accent transition-colors mb-1.5">RSS Feed</Link>
          </div>
          <div>
            <p className="label text-text-primary mb-3">Connect</p>
            {['Instagram ↗', 'YouTube ↗', 'LinkedIn ↗'].map((s) => (
              <a key={s} href="#" className="block text-sm text-text-secondary hover:text-accent transition-colors mb-1.5">{s}</a>
            ))}
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border text-xs text-text-secondary">
          © {new Date().getFullYear()} Ritesh Koirala
        </div>
      </div>
    </footer>
  );
}
