'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Post } from '@/lib/types';

interface PeopleStripProps {
  people: Post[];
}

export default function PeopleStrip({ people }: PeopleStripProps) {
  if (people.length === 0) return null;

  return (
    <section className="max-w-[1400px] mx-auto px-6 pb-20">
      <div className="flex items-end justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-3 h-8 rounded-sm bg-pink" />
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-text-primary">People</h2>
            <p className="text-text-secondary text-sm">Family, friends, network — the people who matter.</p>
          </div>
        </div>
        <Link href="/people" className="label text-pink hover:text-pink/70 transition-colors hidden md:block">View all →</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {people.map((person, i) => (
          <motion.div
            key={person.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Link
              href={`/people/${person.slug}`}
              className="group flex gap-5 p-5 rounded-2xl border border-border hover:border-pink/40 hover:bg-pink/[0.02] transition-all duration-200 card-hover"
            >
              <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-border">
                <img src={person.image} alt={person.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-text-primary tracking-tight group-hover:text-pink transition-colors">
                  {person.title}
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                  {person.role && <span className="text-xs font-semibold text-text-secondary">{person.role}</span>}
                  {person.role && person.location && <span className="text-text-secondary/30">·</span>}
                  {person.location && <span className="text-xs text-text-secondary/60">{person.location}</span>}
                </div>
                {person.connection && (
                  <p className="text-sm text-text-secondary mt-2 italic line-clamp-1">&ldquo;{person.connection}&rdquo;</p>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
