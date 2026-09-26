'use client';

import { motion } from 'framer-motion';
import SeriesCard from './SeriesCard';
import { Series } from '@/lib/types';

interface SeriesGridProps {
  items: { series: Series; postCount: number }[];
}

export default function SeriesGrid({ items }: SeriesGridProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-14">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight">
          Series<span className="text-accent">.</span>
        </h1>
        <p className="text-text-secondary text-[15px] mt-3 max-w-md">
          Collections and ongoing stories. Follow along as they unfold.
        </p>
      </motion.header>

      {items.length === 0 ? (
        <p className="text-text-secondary text-sm">New series coming soon ✨</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map(({ series, postCount }, i) => (
            <motion.div key={series.slug} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <SeriesCard series={series} postCount={postCount} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
