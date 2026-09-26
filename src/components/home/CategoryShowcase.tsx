'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { categoryColors } from '@/lib/types';
import type { Category } from '@/lib/types';

interface Post {
  slug: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

interface CategoryShowcaseProps {
  title: string;
  description: string;
  href: string;
  posts: Post[];
  layout: 'portrait' | 'landscape';
  color?: string;
}

export default function CategoryShowcase({ title, description, href, posts, layout, color }: CategoryShowcaseProps) {
  if (posts.length === 0) return null;
  const accentColor = color || '#FF4F1A';

  return (
    <section className="max-w-[1400px] mx-auto px-6 pb-20">
      <div className="flex items-end justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-3 h-8 rounded-sm" style={{ backgroundColor: accentColor }} />
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-text-primary">{title}</h2>
            <p className="text-text-secondary text-sm">{description}</p>
          </div>
        </div>
        <Link href={href} className="label text-accent hover:text-accent-hover transition-colors hidden md:block">
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
          >
            <Link href={`/${post.category}/${post.slug}`} className="group block relative card-hover rounded-xl overflow-hidden">
              <div className={layout === 'portrait' ? 'aspect-[3/4]' : 'aspect-[16/10]'}>
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <span className="label text-[10px]" style={{ color: categoryColors[post.category as Category] || accentColor }}>{post.category}</span>
                  <h3 className="headline-md text-white mt-2 group-hover:text-accent transition-colors">{post.title}</h3>
                  <p className="text-white/50 text-sm mt-1">{post.description}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
