'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    const handleMove = (e: MouseEvent) => { setPosition({ x: e.clientX, y: e.clientY }); setIsVisible(true); };
    const handleEnter = () => setIsVisible(true);
    const handleLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseenter', handleEnter);
    document.addEventListener('mouseleave', handleLeave);

    const handleOverInteractive = () => setIsHovering(true);
    const handleLeaveInteractive = () => setIsHovering(false);

    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        el.addEventListener('mouseenter', handleOverInteractive);
        el.addEventListener('mouseleave', handleLeaveInteractive);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
      el.addEventListener('mouseenter', handleOverInteractive);
      el.addEventListener('mouseleave', handleLeaveInteractive);
    });

    return () => { window.removeEventListener('mousemove', handleMove); document.removeEventListener('mouseenter', handleEnter); document.removeEventListener('mouseleave', handleLeave); observer.disconnect(); };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-multiply hidden md:block"
        animate={{ x: position.x - 6, y: position.y - 6, scale: isHovering ? 3 : 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-accent/20 rounded-full pointer-events-none z-[9998] hidden md:block"
        animate={{ x: position.x - 16, y: position.y - 16, scale: isHovering ? 2 : 1, opacity: isHovering ? 0 : 0.4 }}
        transition={{ type: 'spring', stiffness: 250, damping: 20, mass: 0.8 }}
      />
    </>
  );
}
