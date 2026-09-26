'use client';

import { motion } from 'framer-motion';
import PhotoCard from './PhotoCard';

interface Photo {
  slug: string;
  description: string;
  image: string;
  tags?: string[];
}

export default function PlacesGrid({ places }: { places: Photo[] }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="mb-14"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-charcoal tracking-tight">
          Places
        </h1>
        <p className="text-muted text-[15px] mt-3 max-w-md">
          The world through my lens and words.
        </p>
      </motion.header>

      {places.length === 0 ? (
        <p className="text-muted text-sm">Adventures are being documented.</p>
      ) : (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {places.map((photo, i) => (
            <motion.div
              key={photo.slug}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="break-inside-avoid"
            >
              <PhotoCard photo={photo} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
