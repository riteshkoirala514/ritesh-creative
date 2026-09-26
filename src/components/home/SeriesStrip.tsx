'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface SeriesItem {
  slug: string;
  title: string;
  description: string;
  image: string;
  count: number;
}

interface SeriesStripProps {
  series: SeriesItem[];
}

export default function SeriesStrip({ series }: SeriesStripProps) {
  return (
    <section className="max-w-[1400px] mx-auto px-6 pb-10">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-text-primary">Series</h2>
        <div className="flex-1 editorial-divider" />
        <Link href="/series" className="label text-accent hover:text-accent-hover transition-colors">View all →</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {series.map((s, i) => (
          <motion.div
            key={s.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Link href={`/series/${s.slug}`} className="group flex gap-5 p-4 rounded-xl border-2 border-border hover:border-text-primary transition-colors card-hover bg-bg">
              <div className="w-32 h-24 rounded-lg overflow-hidden shrink-0">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex-1 py-0.5">
                <span className="label text-accent text-[10px]">{s.count} posts</span>
                <h3 className="text-lg font-bold text-text-primary tracking-tight mt-0.5 group-hover:text-accent transition-colors">{s.title}</h3>
                <p className="text-text-secondary text-sm mt-1 line-clamp-1">{s.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
