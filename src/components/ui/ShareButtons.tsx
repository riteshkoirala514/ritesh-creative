'use client';

import { motion } from 'framer-motion';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const links = [
    { label: '𝕏', href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`, bg: '#000' },
    { label: 'in', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, bg: '#0A66C2' },
    { label: '📋', href: '', bg: '#666', copy: true },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // fallback silent
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="max-w-2xl mx-auto px-6 py-6"
    >
      <div className="flex items-center gap-3">
        <span className="text-xs text-text-secondary font-medium">Share</span>
        <div className="flex gap-2">
          {links.map((link) =>
            link.copy ? (
              <button
                key={link.label}
                onClick={handleCopy}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold hover:scale-110 transition-transform"
                style={{ backgroundColor: link.bg }}
                title="Copy link"
              >
                {link.label}
              </button>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold hover:scale-110 transition-transform"
                style={{ backgroundColor: link.bg }}
              >
                {link.label}
              </a>
            )
          )}
        </div>
      </div>
    </motion.div>
  );
}
