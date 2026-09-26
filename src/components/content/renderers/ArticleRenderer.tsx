'use client';

import { motion } from 'framer-motion';
import { Post, categoryLabels, categoryColors } from '@/lib/types';
import ReadingProgress from '@/components/ui/ReadingProgress';

interface Props { post: Post; }

export default function ArticleRenderer({ post }: Props) {
  const paragraphs = post.content.split('\n\n').filter(Boolean);
  const color = categoryColors[post.category];

  return (
    <>
      <ReadingProgress />

      {/* Header */}
      <header className="max-w-[800px] mx-auto px-6 pt-10 pb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="label px-3 py-1 rounded-full" style={{ color, backgroundColor: `${color}10` }}>{categoryLabels[post.category]}</span>
            {post.readTime && <span className="label text-text-secondary/40">{post.readTime}</span>}
          </div>
          <h1 className="headline-xl text-text-primary">{post.title}</h1>
          <p className="body-lg mt-5 max-w-2xl">{post.description}</p>
          <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border">
            <span className="label text-text-secondary/40">{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </motion.div>

        {/* Cover image — contained */}
        {post.image && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="mt-8">
            <img src={post.image} alt={post.title} className="w-full aspect-[16/9] object-cover rounded-2xl" />
          </motion.div>
        )}
      </header>

      {/* Body */}
      <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="max-w-[700px] mx-auto px-6 py-8 article-content">
        {paragraphs.map((p, i) => {
          if (p.startsWith('## ')) return <h2 key={i}>{p.replace('## ', '')}</h2>;
          if (p.startsWith('### ')) return <h3 key={i}>{p.replace('### ', '')}</h3>;
          if (p.startsWith('> ')) return <blockquote key={i}>{p.replace('> ', '')}</blockquote>;
          return <p key={i}>{p}</p>;
        })}
      </motion.article>
    </>
  );
}
