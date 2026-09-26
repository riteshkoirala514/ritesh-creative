'use client';

import { motion } from 'framer-motion';

interface ArticleBodyProps {
  content: string;
}

export default function ArticleBody({ content }: ArticleBodyProps) {
  const paragraphs = content.split('\n\n').filter(Boolean);

  return (
    <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="max-w-2xl mx-auto px-6 py-10 article-content">
      {paragraphs.map((paragraph, index) => {
        if (paragraph.startsWith('## ')) return <h2 key={index} className="text-xl font-bold text-text-primary mt-10 mb-4 tracking-tight">{paragraph.replace('## ', '')}</h2>;
        if (paragraph.startsWith('### ')) return <h3 key={index} className="text-lg font-bold text-text-primary mt-8 mb-3 tracking-tight">{paragraph.replace('### ', '')}</h3>;
        if (paragraph.startsWith('> ')) return <blockquote key={index} className="border-l-3 border-accent pl-5 my-8 text-[17px] text-text-secondary leading-relaxed">{paragraph.replace('> ', '')}</blockquote>;
        return <p key={index} className="text-[16px] leading-[1.8] text-text-secondary mb-5">{paragraph}</p>;
      })}
    </motion.article>
  );
}
