'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { categoryColors } from '@/lib/types';
import type { Category } from '@/lib/types';

interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
}

interface HeroProps {
  posts: Post[];
}

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

export default function Hero({ posts }: HeroProps) {
  const lead = posts[0];
  const secondFeature = posts[1];
  const side = posts.slice(2, 6);

  return (
    <>
      {/* Marquee */}
      <div className="py-4 overflow-hidden border-b-2 border-text-primary">
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

      {/* Hero grid */}
      <section className="max-w-[1400px] mx-auto px-6 pt-5 pb-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Lead — 8 cols */}
          {lead && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-8"
            >
              <Link href={`/${lead.category}/${lead.slug}`} className="group block relative rounded-xl overflow-hidden">
                <div className="aspect-[16/10]">
                  <img src={lead.image} alt={lead.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                    <span className="label text-[10px]" style={{ color: categoryColors[lead.category as Category] || '#FF4F1A' }}>{lead.category}</span>
                    <h2 className="headline-lg text-white mt-2 group-hover:text-[#FFD700] transition-colors duration-200 max-w-2xl">{lead.title}</h2>
                    <p className="text-white/50 text-base mt-2 max-w-lg">{lead.description}</p>
                    <p className="label text-white/30 mt-4 text-[10px]">
                      {new Date(lead.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Sidebar — 4 cols */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {/* Second feature — image card with overlay */}
            {secondFeature && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <Link href={`/${secondFeature.category}/${secondFeature.slug}`} className="group block relative rounded-xl overflow-hidden">
                  <div className="aspect-[16/9]">
                    <img src={secondFeature.image} alt={secondFeature.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                      <span className="label text-[9px]" style={{ color: categoryColors[secondFeature.category as Category] || '#FF4F1A' }}>{secondFeature.category}</span>
                      <h3 className="text-base md:text-lg font-bold text-white mt-1 group-hover:text-[#FFD700] transition-colors leading-snug tracking-tight">{secondFeature.title}</h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Remaining sidebar items */}
            {side.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
              >
                <Link href={`/${post.category}/${post.slug}`} className="group flex gap-3 items-center p-2 -mx-2 rounded-xl hover:bg-bg-card transition-colors">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden shrink-0 bg-bg-card">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="label text-[9px]" style={{ color: categoryColors[post.category as Category] || '#FF4F1A' }}>{post.category}</span>
                    <h3 className="text-sm md:text-[15px] font-bold text-text-primary mt-0.5 group-hover:text-accent transition-colors leading-snug tracking-tight line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-text-secondary text-xs mt-1 line-clamp-1">{post.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
