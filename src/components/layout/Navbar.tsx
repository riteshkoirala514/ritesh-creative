'use client';

import Link from 'next/link';
/* eslint-disable @next/next/no-img-element */
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/writing', label: 'Writing' },
  { href: '/people', label: 'People' },
  { href: '/places', label: 'Places' },
  { href: '/ideas', label: 'Ideas' },
  { href: '/create', label: 'Create' },
  { href: '/series', label: 'Series' },
  { href: '/dreams', label: 'Dreams' },
  { href: '/letters', label: 'Letters' },
  { href: '/about', label: 'About' },
];

export default function Navbar({ brandName = 'RITESH.CREATIVE', quote = '' }: { brandName?: string; quote?: string }) {
  const pathname = usePathname();
  const bp = brandName.split('.');
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > 100 && latest > prev);
  });

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      {/* Floating pill — light glass */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: hidden && !open ? 100 : 0, opacity: hidden && !open ? 0 : 1 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex"
      >
        <div
          className="flex items-center bg-white/80 backdrop-blur-2xl rounded-2xl px-2 py-2 border border-border"
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)' }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-bg-card transition-colors mr-1">
            <img src="/logo.png" alt="R" className="w-7 h-7 rounded-md object-contain" />
          </Link>

          <div className="w-px h-6 bg-border mx-0.5" />

          {navLinks.filter(l => l.href !== '/').map((link) => {
            const isActive = pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'bg-text-primary text-white'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-card'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </motion.nav>

      {/* Mobile — floating button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setOpen(!open)}
        className="md:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-white/80 backdrop-blur-2xl rounded-2xl flex items-center justify-center border border-border"
        style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}
      >
        {open ? (
          <span className="text-text-primary text-lg font-bold">✕</span>
        ) : (
          <img src="/logo.png" alt="Menu" className="w-7 h-7 rounded-lg object-contain" />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl flex items-center justify-center"
          >
            <div className="w-full max-w-xs px-6">
              <div className="flex items-center gap-3 mb-8 justify-center">
                <img src="/logo.png" alt="R" className="w-9 h-9 rounded-xl object-contain" />
                <span className="text-text-primary text-xl font-extrabold tracking-tighter">
                  {bp[0]}<span style={{ color: '#DC2626' }}>.</span>{bp.slice(1).join('.')}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex flex-col items-center gap-1.5 p-4 rounded-2xl text-center transition-colors ${
                        pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href))
                          ? 'bg-text-primary text-white'
                          : 'bg-bg-card text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider">{link.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <p className="text-text-secondary text-xs font-bold italic text-center mt-8">
{quote ? `\u201C${quote}\u201D` : ''}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
