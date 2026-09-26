'use client';

import { motion } from 'framer-motion';
import { Post, categoryLabels, categoryColors } from '@/lib/types';

interface Props {
  post: Post;
}

function getEmbedUrl(url: string, platform?: string): string {
  if (platform === 'youtube' || url.includes('youtube.com') || url.includes('youtu.be')) {
    const id = url.match(/(?:v=|youtu\.be\/)([^&\s]+)/)?.[1];
    return id ? `https://www.youtube.com/embed/${id}` : url;
  }
  if (platform === 'vimeo' || url.includes('vimeo.com')) {
    const id = url.match(/vimeo\.com\/(\d+)/)?.[1];
    return id ? `https://player.vimeo.com/video/${id}` : url;
  }
  return url;
}

export default function VideoRenderer({ post }: Props) {
  const color = categoryColors[post.category];
  const embedUrl = post.video ? getEmbedUrl(post.video.url, post.video.platform) : '';

  return (
    <>
      <header className="max-w-4xl mx-auto px-6 pt-16 pb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full" style={{ color, backgroundColor: `${color}10` }}>
              {categoryLabels[post.category]}
            </span>
            {post.video?.duration && <span className="text-xs text-text-secondary/50 font-medium">⏱ {post.video.duration}</span>}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">{post.title}</h1>
          <p className="text-text-secondary mt-2 max-w-lg">{post.description}</p>
          <p className="text-xs text-text-secondary/40 mt-4 font-medium">
            {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </motion.div>
      </header>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="max-w-4xl mx-auto px-6 pb-8">
        <div className="rounded-2xl overflow-hidden bg-bg-card aspect-video">
          {embedUrl ? (
            <iframe src={embedUrl} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={post.title} />
          ) : (
            <div className="w-full h-full flex items-center justify-center"><img src={post.image} alt={post.title} className="w-full h-full object-cover" /></div>
          )}
        </div>
      </motion.div>

      {post.content.trim() && (
        <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="max-w-2xl mx-auto px-6 py-8 article-content">
          {post.content.split('\n\n').filter(Boolean).map((p, i) => (
            <p key={i} className="text-[16px] leading-[1.8] text-text-secondary mb-5">{p}</p>
          ))}
        </motion.article>
      )}
    </>
  );
}
