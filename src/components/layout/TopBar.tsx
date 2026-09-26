'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface Profile {
  name: string;
  tagline: string;
  quote: string;
  photo: string;
}

export default function TopBar({ profile }: { profile: Profile }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const photoUrl = profile.photo || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=80';

  if (!isHome) {
    // ===== COMPACT BAR for non-home pages =====
    return (
      <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur-xl">
        <div className="border-b-2 border-text-primary">
          <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-2.5">
            <div className="flex items-center gap-3 md:gap-6">
              {/* Logo + Name */}
              <Link href="/" className="flex items-center gap-2.5 shrink-0">
                <Image src="/logo.png" alt={profile.name} width={32} height={32} className="rounded-lg border-2 border-text-primary" />
                <span className="text-base md:text-xl font-extrabold tracking-tighter text-text-primary leading-none">
                  RITESH<span style={{ color: '#DC2626' }}>.</span>CREATIVE
                </span>
              </Link>

              {/* Tagline — hidden on small */}
              <span className="text-[10px] text-text-secondary font-medium hidden lg:block">{profile.tagline}</span>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Quote — hidden on small */}
              <p className="text-[11px] text-text-primary font-bold italic hidden md:block max-w-[200px] text-right leading-snug">
                &ldquo;{profile.quote}&rdquo;
              </p>

              {/* Photo — small */}
              <div className="shrink-0 relative">
                <div className="w-9 h-9 md:w-11 md:h-11 rounded-lg overflow-hidden border-2 border-text-primary"
                  style={{ boxShadow: '0 0 8px rgba(255,215,0,0.08)' }}>
                  <img src={photoUrl} alt={profile.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green border-2 border-bg" />
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // ===== BIG HERO BAR for homepage =====
  return (
    <header>
      <div className="border-b-2 border-text-primary">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-5 md:py-8">
          {/* Mobile: stack everything, Desktop: row */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-10">

            {/* Logo + Name + Tagline */}
            <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
              <Link href="/" className="shrink-0">
                <Image src="/logo.png" alt={profile.name} width={44} height={44}
                  className="rounded-xl border-2 border-text-primary md:w-[64px] md:h-[64px] md:rounded-2xl" />
              </Link>
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter text-text-primary leading-none">
                  RITESH<span style={{ color: '#DC2626' }}>.</span>CREATIVE
                </h1>
                <p className="text-[10px] sm:text-xs md:text-sm text-text-secondary font-medium mt-0.5">
                  {profile.tagline}
                </p>
              </div>
            </div>

            {/* Quote + Photo — side by side on md+, stacked on mobile */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-6">
              {/* Quote */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-xs sm:text-sm md:text-base lg:text-lg text-text-primary font-bold italic leading-snug sm:flex-1 md:max-w-sm md:text-right"
              >
                &ldquo;{profile.quote}&rdquo;
              </motion.p>

              {/* Photo — scales by breakpoint */}
              <div className="shrink-0 self-center">
                <motion.div
                  whileHover={{ rotateY: 15, rotateX: -8, scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 18 }}
                  style={{ perspective: 800, transformStyle: 'preserve-3d' }}
                  className="relative"
                >
                  <div className="absolute -inset-1 md:-inset-2 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#FFD700]/20 via-[#DC2626]/20 to-[#C0C0C0]/20 blur-sm -z-20" />
                  <div className="absolute -inset-0.5 md:-inset-1.5 rounded-xl md:rounded-2xl border border-[#FFD700]/30 -z-10" style={{ transform: 'translateZ(-12px)' }} />
                  <div className="absolute -inset-1.5 md:-inset-3 rounded-xl md:rounded-2xl border border-[#DC2626]/15 -z-10" style={{ transform: 'translateZ(-24px)' }} />

                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 lg:w-36 md:h-28 lg:h-36 rounded-xl md:rounded-2xl overflow-hidden border-2 border-text-primary relative"
                    style={{ boxShadow: '0 0 30px rgba(255,215,0,0.15), 0 0 60px rgba(220,38,38,0.1), 0 8px 32px rgba(0,0,0,0.15)' }}>
                    <img src={photoUrl} alt={profile.name} className="w-full h-full object-cover" />

                    <motion.div animate={{ background: [
                      'linear-gradient(0deg, rgba(255,215,0,0.25) 0%, transparent 40%, rgba(220,38,38,0.2) 100%)',
                      'linear-gradient(90deg, rgba(0,200,255,0.2) 0%, transparent 40%, rgba(255,215,0,0.2) 100%)',
                      'linear-gradient(180deg, rgba(220,38,38,0.2) 0%, transparent 40%, rgba(0,200,255,0.15) 100%)',
                      'linear-gradient(270deg, rgba(192,192,192,0.25) 0%, transparent 40%, rgba(220,38,38,0.2) 100%)',
                      'linear-gradient(360deg, rgba(255,215,0,0.25) 0%, transparent 40%, rgba(220,38,38,0.2) 100%)',
                    ]}} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 mix-blend-overlay" />

                    <motion.div animate={{ opacity: [0.3, 0.6, 0.3], rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                      className="absolute -inset-[50%]" style={{ background: 'conic-gradient(from 0deg, rgba(255,215,0,0.3), rgba(220,38,38,0.3), rgba(0,200,255,0.3), rgba(192,192,192,0.3), rgba(255,215,0,0.3))', mixBlendMode: 'overlay' }} />

                    <motion.div animate={{ y: ['-100%', '300%'] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                      className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-white/15 to-transparent" />

                    <motion.div animate={{ x: ['-100%', '300%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
                      className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent" />

                    <motion.div animate={{ opacity: [0, 0, 0, 0.15, 0, 0, 0, 0, 0.1, 0] }} transition={{ duration: 4, repeat: Infinity }}
                      className="absolute inset-0 bg-[#00FFFF] mix-blend-overlay" />

                    <div className="absolute inset-0 opacity-[0.04]"
                      style={{ backgroundImage: 'linear-gradient(0deg, #fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '4px 4px' }} />
                  </div>

                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green border-2 border-bg z-10" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
