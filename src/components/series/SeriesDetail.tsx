'use client';

import { motion } from 'framer-motion';
import { Series, Post } from '@/lib/types';
import PostCard from '@/components/content/PostCard';

interface SeriesDetailProps {
  series: Series;
  posts: Post[];
}

export default function SeriesDetail({ series, posts }: SeriesDetailProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Banner */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative rounded-2xl overflow-hidden mb-14">
        <div className="aspect-[3/1] md:aspect-[4/1]">
          <img src={series.image} alt={series.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <span className="text-xs font-bold text-accent uppercase tracking-[0.2em]">Series · {posts.length} posts</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 tracking-tight">{series.title}</h1>
            <p className="text-white/60 text-sm md:text-base mt-2 max-w-lg">{series.description}</p>
          </div>
        </div>
      </motion.div>

      {/* Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <motion.div key={post.slug} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.08 }}>
            <PostCard post={post} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
