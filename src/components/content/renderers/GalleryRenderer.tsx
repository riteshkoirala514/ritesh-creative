'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Post, categoryLabels, categoryColors } from '@/lib/types';

interface Props {
  post: Post;
}

export default function GalleryRenderer({ post }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const images = post.images || [];
  const color = categoryColors[post.category];

  return (
    <>
      <header className="max-w-5xl mx-auto px-6 pt-16 pb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full" style={{ color, backgroundColor: `${color}10` }}>
              {categoryLabels[post.category]}
            </span>
            <span className="text-xs text-text-secondary/50 font-medium">{images.length} photos</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">{post.title}</h1>
          <p className="text-text-secondary mt-2 max-w-lg">{post.description}</p>
          <p className="text-xs text-text-secondary/40 mt-4 font-medium">
            {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </motion.div>
      </header>

      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((img, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="break-inside-avoid cursor-pointer group" onClick={() => setLightbox(i)}>
              <div className="rounded-xl overflow-hidden">
                <img src={img.src} alt={img.alt || img.caption || ''} className="w-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
              </div>
              {img.caption && <p className="text-xs text-text-secondary mt-2 px-1">{img.caption}</p>}
            </motion.div>
          ))}
        </div>
        {post.content.trim() && (
          <div className="max-w-2xl mx-auto mt-12">
            {post.content.split('\n\n').filter(Boolean).map((p, i) => (
              <p key={i} className="text-[15px] leading-[1.8] text-text-secondary mb-4">{p}</p>
            ))}
          </div>
        )}
      </div>

      {lightbox !== null && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl font-bold z-10">✕</button>
          {lightbox > 0 && <button onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }} className="absolute left-4 md:left-8 text-white/60 hover:text-white text-3xl font-bold">‹</button>}
          {lightbox < images.length - 1 && <button onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); }} className="absolute right-4 md:right-8 text-white/60 hover:text-white text-3xl font-bold">›</button>}
          <div className="max-w-5xl max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <img src={images[lightbox].src} alt={images[lightbox].alt || ''} className="max-w-full max-h-[80vh] object-contain rounded-lg" />
            {images[lightbox].caption && <p className="text-white/60 text-sm text-center mt-3">{images[lightbox].caption}</p>}
          </div>
        </motion.div>
      )}
    </>
  );
}
