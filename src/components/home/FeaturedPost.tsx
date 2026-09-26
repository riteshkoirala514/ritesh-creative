'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface FeaturedPostProps {
  post: {
    slug: string;
    title: string;
    description: string;
    date: string;
    category: string;
    image: string;
  };
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
        <p className="text-xs font-bold text-text-secondary uppercase tracking-[0.2em]">
          Featured
        </p>
        <div className="flex-1 h-px bg-border" />
      </motion.div>

      <Link href={`/${post.category}/${post.slug}`} className="group block">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[2.2/1] card-hover"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Category pill */}
          <div className="absolute top-6 left-6">
            <span className="px-3 py-1 bg-accent/90 text-white text-[11px] font-bold uppercase tracking-wider rounded-full">
              {post.category}
            </span>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight tracking-tight group-hover:text-accent transition-colors duration-300">
              {post.title}
            </h3>
            <p className="text-white/60 text-sm md:text-base mt-2 max-w-xl">
              {post.description}
            </p>
            <div className="flex items-center gap-3 mt-4">
              <span className="text-xs text-white/40">
                {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
              <span className="text-accent text-sm font-bold group-hover:translate-x-1 transition-transform duration-300">
                Read →
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </section>
  );
}
