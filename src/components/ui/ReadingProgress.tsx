'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [topOffset, setTopOffset] = useState(0);

  useEffect(() => {
    const header = document.querySelector('header');
    if (header) setTopOffset(header.offsetHeight);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };

    const handleResize = () => {
      const header = document.querySelector('header');
      if (header) setTopOffset(header.offsetHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.div
      className="fixed left-0 right-0 h-[3px] z-[49] origin-left"
      style={{
        top: topOffset,
        scaleX: progress / 100,
        background: 'linear-gradient(90deg, #FF4F1A, #DC2626, #FFD700)',
      }}
    />
  );
}
