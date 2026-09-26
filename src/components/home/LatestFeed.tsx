'use client';

import { motion } from 'framer-motion';
import PostCard from '@/components/content/PostCard';
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

interface LatestFeedProps {
  posts: Post[];
}

export default function LatestFeed({ posts }: LatestFeedProps) {
  if (posts.length === 0) return null;

  return (
    <section className="max-w-[1400px] mx-auto px-6 pt-4 pb-10">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-text-primary">Latest</h2>
        <div className="flex-1 editorial-divider" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {posts.map((post, i) => (
          <motion.div
            key={`${post.category}-${post.slug}`}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
