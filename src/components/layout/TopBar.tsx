'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function TopBar() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header className={isHome ? '' : 'sticky top-0 z-50 bg-bg/95 backdrop-blur-xl'}>
      <div className="border-b-2 border-text-primary">
        <div className="max-w-[1400px] mx-auto px-6" style={{ padding: isHome ? '2.5rem 1.5rem' : '1.15rem 1.5rem' }}>
          <div className="flex items-center gap-6 md:gap-10">

            {/* Left: Logo + Name */}
            <div className="flex items-center gap-4 md:gap-5 flex-1 min-w-0">
              <Link href="/" className="shrink-0">
                <Image
                  src="/logo.png"
                  alt="Ritesh Koirala"
                  width={isHome ? 72 : 40}
                  height={isHome ? 72 : 40}
                  className={`border-2 border-text-primary ${isHome ? 'rounded-2xl' : 'rounded-xl'}`}
                />
              </Link>
              <div className="min-w-0">
                <Link href="/">
                  <h1 className={`font-extrabold tracking-tighter text-text-primary leading-none ${isHome ? 'text-4xl md:text-5xl' : 'text-xl md:text-2xl'}`}>
                    RITESH<span style={{ color: '#DC2626' }}>.</span>CREATIVE
                  </h1>
                </Link>
                <p className={`text-text-secondary font-medium mt-0.5 ${isHome ? 'text-sm md:text-base' : 'text-[10px] hidden sm:block'}`}>
                  Writer · Creator · Explorer
                </p>
              </div>
            </div>

            {/* Quote — always visible */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className={`text-text-primary font-bold italic hidden md:block text-right leading-snug ${isHome ? 'text-lg max-w-sm' : 'text-xs max-w-[220px]'}`}
            >
              &ldquo;The most interesting things happen when you stay curious.&rdquo;
            </motion.p>

            {/* Person photo — 3D hologram */}
            <div className="shrink-0">
              <motion.div
                whileHover={{ rotateY: 15, rotateX: -8, scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 250, damping: 18 }}
                style={{ perspective: 800, transformStyle: 'preserve-3d' }}
                className="relative"
              >
                {/* 3D depth layers — always, sized accordingly */}
                <div className={`absolute rounded-2xl bg-gradient-to-br from-[#FFD700]/20 via-[#DC2626]/20 to-[#C0C0C0]/20 blur-sm -z-20 ${isHome ? '-inset-2' : '-inset-1'}`} />
                <div className={`absolute rounded-2xl border border-[#FFD700]/30 -z-10 ${isHome ? '-inset-1.5' : '-inset-0.5'}`} style={{ transform: 'translateZ(-12px)' }} />
                <div className={`absolute rounded-2xl border border-[#DC2626]/15 -z-10 ${isHome ? '-inset-3' : '-inset-1.5'}`} style={{ transform: 'translateZ(-24px)' }} />

                {/* Photo */}
                <div className={`overflow-hidden border-2 border-text-primary relative ${isHome ? 'w-28 h-28 md:w-36 md:h-36 rounded-2xl' : 'w-12 h-12 md:w-14 md:h-14 rounded-xl'}`}
                  style={{ boxShadow: isHome ? '0 0 30px rgba(255,215,0,0.15), 0 0 60px rgba(220,38,38,0.1), 0 8px 32px rgba(0,0,0,0.15)' : '0 0 12px rgba(255,215,0,0.1), 0 4px 12px rgba(0,0,0,0.1)' }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=80"
                    alt="Ritesh Koirala"
                    className="w-full h-full object-cover"
                  />

                  {/* Color shift overlay */}
                  <motion.div
                    animate={{
                      background: [
                        'linear-gradient(0deg, rgba(255,215,0,0.25) 0%, transparent 40%, rgba(220,38,38,0.2) 100%)',
                        'linear-gradient(90deg, rgba(0,200,255,0.2) 0%, transparent 40%, rgba(255,215,0,0.2) 100%)',
                        'linear-gradient(180deg, rgba(220,38,38,0.2) 0%, transparent 40%, rgba(0,200,255,0.15) 100%)',
                        'linear-gradient(270deg, rgba(192,192,192,0.25) 0%, transparent 40%, rgba(220,38,38,0.2) 100%)',
                        'linear-gradient(360deg, rgba(255,215,0,0.25) 0%, transparent 40%, rgba(220,38,38,0.2) 100%)',
                      ],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 mix-blend-overlay"
                  />

                  {/* Rainbow prismatic edge */}
                  <motion.div
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      rotate: [0, 360],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    className="absolute -inset-[50%]"
                    style={{
                      background: 'conic-gradient(from 0deg, rgba(255,215,0,0.3), rgba(220,38,38,0.3), rgba(0,200,255,0.3), rgba(192,192,192,0.3), rgba(255,215,0,0.3))',
                      mixBlendMode: 'overlay',
                    }}
                  />

                  {/* Horizontal scanline sweep */}
                  <motion.div
                    animate={{ y: ['-100%', '300%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                    className={`absolute inset-x-0 bg-gradient-to-b from-transparent via-white/15 to-transparent ${isHome ? 'h-12' : 'h-4'}`}
                  />

                  {/* Vertical scanline sweep */}
                  <motion.div
                    animate={{ x: ['-100%', '300%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
                    className={`absolute inset-y-0 bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent ${isHome ? 'w-10' : 'w-3'}`}
                  />

                  {/* Glitch flicker */}
                  <motion.div
                    animate={{ opacity: [0, 0, 0, 0.15, 0, 0, 0, 0, 0.1, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-0 bg-[#00FFFF] mix-blend-overlay"
                  />

                  {/* Fine grid overlay for hologram texture */}
                  <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage: 'linear-gradient(0deg, #fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                      backgroundSize: isHome ? '4px 4px' : '3px 3px',
                    }}
                  />
                </div>

                {/* Status dot */}
                <div className={`absolute rounded-full bg-green border-2 border-bg z-10 ${isHome ? '-bottom-1 -right-1 w-5 h-5' : '-bottom-0.5 -right-0.5 w-3 h-3'}`} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
