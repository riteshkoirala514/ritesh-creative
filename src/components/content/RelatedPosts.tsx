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

interface RelatedPostsProps {
  posts: Post[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="max-w-[1400px] mx-auto px-6 py-16 border-t-2 border-text-primary">
      <div className="flex items-center gap-4 mb-10">
        <h2 className="text-2xl font-extrabold tracking-tight text-text-primary">Keep reading</h2>
        <div className="flex-1 editorial-divider" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <motion.div key={`${post.category}-${post.slug}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
            <PostCard post={post} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
