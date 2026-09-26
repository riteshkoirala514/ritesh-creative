'use client';

import { motion } from 'framer-motion';
import { Post, categoryColors } from '@/lib/types';

interface Props {
  post: Post;
}

export default function PhotoRenderer({ post }: Props) {
  const color = categoryColors[post.category];

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="relative w-full max-h-[85vh] overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover max-h-[85vh]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
            {post.tags && post.tags.length > 0 && <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">{post.tags.join(' · ')}</span>}
            <h1 className="text-2xl md:text-4xl font-bold text-white mt-2 tracking-tight">{post.title}</h1>
            <p className="text-white/60 text-sm md:text-base mt-2 max-w-lg">{post.description}</p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-xs text-white/40 font-medium">
                {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {post.content.trim() && (
        <div className="max-w-2xl mx-auto px-6 py-12">
          {post.content.split('\n\n').filter(Boolean).map((p, i) => (
            <p key={i} className="text-[16px] leading-[1.8] text-text-secondary mb-5">{p}</p>
          ))}
        </div>
      )}
    </>
  );
}
