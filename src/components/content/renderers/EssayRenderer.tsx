'use client';

import { motion } from 'framer-motion';
import { Post, categoryLabels, categoryColors } from '@/lib/types';
import ReadingProgress from '@/components/ui/ReadingProgress';

interface Props {
  post: Post;
}

export default function EssayRenderer({ post }: Props) {
  const paragraphs = post.content.split('\n\n').filter(Boolean);
  const color = categoryColors[post.category];
  const images = post.images || [];
  let imageIndex = 0;

  return (
    <>
      <ReadingProgress />

      <header className="max-w-3xl mx-auto px-6 pt-20 pb-12 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="text-xs font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full" style={{ color, backgroundColor: `${color}10` }}>
            {categoryLabels[post.category]}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-text-primary mt-6 leading-[1.1] tracking-tight">{post.title}</h1>
          <p className="text-lg text-text-secondary mt-5 max-w-xl mx-auto leading-relaxed">{post.description}</p>
          <div className="flex items-center justify-center gap-4 mt-6 text-xs text-text-secondary/50">
            <span>{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            {post.readTime && <><span>·</span><span>{post.readTime}</span></>}
          </div>
        </motion.div>
      </header>

      {post.image && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }} className="max-w-5xl mx-auto px-6 pb-12">
          <img src={post.image} alt={post.title} className="w-full rounded-2xl aspect-[2/1] object-cover" />
        </motion.div>
      )}

      <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="max-w-2xl mx-auto px-6 py-8">
        {paragraphs.map((p, i) => {
          const elements = [];
          if (i > 0 && i % 4 === 0 && imageIndex < images.length) {
            const img = images[imageIndex++];
            elements.push(
              <figure key={`img-${i}`} className="my-10 -mx-6 md:-mx-16">
                <img src={img.src} alt={img.alt || ''} className="w-full rounded-xl" />
                {img.caption && <figcaption className="text-xs text-text-secondary/60 text-center mt-3">{img.caption}</figcaption>}
              </figure>
            );
          }
          if (p.startsWith('## ')) elements.push(<h2 key={i} className="text-xl font-bold text-text-primary mt-12 mb-4 tracking-tight">{p.replace('## ', '')}</h2>);
          else if (p.startsWith('> ')) elements.push(
            <blockquote key={i} className="my-10 text-center">
              <p className="text-xl md:text-2xl font-bold text-text-primary leading-snug tracking-tight">{p.replace('> ', '')}</p>
              <div className="w-8 h-0.5 bg-accent mx-auto mt-4" />
            </blockquote>
          );
          else elements.push(<p key={i} className="text-[16px] leading-[1.85] text-text-secondary mb-5">{p}</p>);
          return elements;
        })}
      </motion.article>
    </>
  );
}
