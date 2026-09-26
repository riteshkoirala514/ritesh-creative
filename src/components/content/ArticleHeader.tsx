'use client';

import { motion } from 'framer-motion';
import { categoryLabels } from '@/lib/types';
import type { Category } from '@/lib/types';

const categoryColors: Record<Category, string> = {
  writing: '#FF6B35',
  people: '#DB2777',
  places: '#2563EB',
  ideas: '#7C3AED',
  create: '#059669',
};

interface ArticleHeaderProps {
  post: {
    title: string;
    description: string;
    date: string;
    category: Category;
    image: string;
    readTime?: string;
  };
}

export default function ArticleHeader({ post }: ArticleHeaderProps) {
  return (
    <header className="max-w-4xl mx-auto px-6 pt-16 pb-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="flex items-center gap-3 mb-5">
          <span
            className="text-xs font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full"
            style={{ color: categoryColors[post.category], backgroundColor: `${categoryColors[post.category]}10` }}
          >
            {categoryLabels[post.category]}
          </span>
          {post.readTime && <span className="text-xs text-text-secondary/50 font-medium">{post.readTime}</span>}
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-[1.1] tracking-tight">{post.title}</h1>
        <p className="text-base md:text-lg text-text-secondary mt-4 leading-relaxed max-w-xl">{post.description}</p>
        <p className="text-xs text-text-secondary/40 mt-5 font-medium">
          {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="mt-8">
        <div className="rounded-2xl overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full aspect-[16/9] object-cover" />
        </div>
      </motion.div>
    </header>
  );
}
