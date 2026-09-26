'use client';

import { motion } from 'framer-motion';
import PostCard from './PostCard';
import type { Category } from '@/lib/types';

interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: Category;
  image: string;
  format?: string;
}

interface SectionPageProps {
  title: string;
  description: string;
  posts: Post[];
  emptyMessage: string;
  color?: string;
}

export default function SectionPage({ title, description, posts, emptyMessage, color = '#FF4F1A' }: SectionPageProps) {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-3 h-10 rounded-sm" style={{ backgroundColor: color }} />
          <h1 className="headline-xl text-text-primary">{title}</h1>
        </div>
        <p className="text-text-secondary text-lg max-w-lg">{description}</p>
        <div className="editorial-divider mt-8" />
      </motion.header>

      {posts.length === 0 ? (
        <p className="text-text-secondary text-lg">{emptyMessage}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {posts.map((post, i) => (
            <motion.div key={post.slug} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.06 }}>
              <PostCard post={post} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
