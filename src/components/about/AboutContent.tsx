'use client';

import { motion } from 'framer-motion';

interface SocialLink { platform: string; url: string; label: string; }
interface Profile {
  name: string;
  tagline: string;
  quote: string;
  bio: string;
  photo: string;
  social_links: SocialLink[];
  instagram: string;
  youtube: string;
  linkedin: string;
}

const PLATFORM_ICONS: Record<string, string> = {
  instagram: '📸', youtube: '🎬', linkedin: '💼', twitter: '𝕏', tiktok: '🎵',
  github: '💻', website: '🌐', email: '✉️', facebook: '👤', pinterest: '📌',
  spotify: '🎧', medium: '📝', behance: '🎨', dribbble: '🏀', threads: '🧵', other: '🔗',
};

export default function AboutContent({ profile }: { profile: Profile }) {
  const photoUrl = profile.photo || '';
  const socialLinks = profile.social_links || [];
  const bioLines = profile.bio ? profile.bio.split('\n').filter(Boolean) : [
    "I write, build, photograph, explore, learn and talk to people.",
    "I'm interested in the world and the stories hiding inside it.",
    "This place is where I collect everything — the writing that matters to me, the people I find fascinating, the places that changed how I see things, the ideas I can't stop thinking about, and the creative work I make along the way.",
    "I've worked across technology, marketing, and creative industries. I've lived in different cities and met people from every kind of background. Every experience shaped how I think and what I create.",
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-14">
        <div className="flex flex-col md:flex-row items-start gap-8 mb-10">
          {/* Photo with hologram */}
          <motion.div
            whileHover={{ rotateY: 10, rotateX: -5, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 250, damping: 18 }}
            style={{ perspective: 800, transformStyle: 'preserve-3d' }}
            className="relative shrink-0"
          >
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-[#FFD700]/20 via-[#DC2626]/20 to-[#C0C0C0]/20 blur-sm -z-20" />
            <div className="w-40 h-40 md:w-52 md:h-52 rounded-3xl overflow-hidden border-2 border-text-primary shadow-xl relative"
              style={{ boxShadow: '0 0 30px rgba(255,215,0,0.12), 0 0 60px rgba(220,38,38,0.08)' }}>
              <img src={photoUrl} alt={profile.name} className="w-full h-full object-cover" />
              <motion.div animate={{ background: [
                'linear-gradient(135deg, rgba(255,215,0,0.2) 0%, transparent 50%, rgba(220,38,38,0.15) 100%)',
                'linear-gradient(315deg, rgba(220,38,38,0.2) 0%, transparent 50%, rgba(192,192,192,0.15) 100%)',
                'linear-gradient(135deg, rgba(255,215,0,0.2) 0%, transparent 50%, rgba(220,38,38,0.15) 100%)',
              ]}} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }} className="absolute inset-0" />
              <motion.div animate={{ y: ['-100%', '300%'] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            </div>
          </motion.div>

          <div className="flex-1">
            <motion.div animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }} transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }} className="text-3xl inline-block mb-4">👋</motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight leading-[1.05]">
              I&apos;m <span className="gradient-text">{profile.name.split(' ')[0]}</span>.
              <br />I like making things.
            </h1>
            {profile.tagline && <p className="text-text-secondary text-base mt-3">{profile.tagline}</p>}
          </div>
        </div>
      </motion.header>

      {/* Bio */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
        className="space-y-5 text-[16px] leading-[1.8] text-text-secondary">
        {bioLines.map((line, i) => <p key={i}>{line}</p>)}
      </motion.div>

      {/* Quote */}
      {profile.quote && (
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12 py-8 border-t border-b border-border text-center">
          <p className="text-xl md:text-2xl font-bold text-text-primary italic">&ldquo;{profile.quote}&rdquo;</p>
        </motion.div>
      )}

      {/* Contact */}
      {socialLinks.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mt-14 p-8 rounded-2xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FF4F1A, #DC2626)' }}>
          <div className="noise absolute inset-0" />
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-2">Let&apos;s talk 💬</h3>
            <p className="text-sm text-white/70 leading-relaxed">I&apos;m always up for a good conversation.</p>
            <div className="flex flex-wrap gap-3 mt-6">
              {socialLinks.filter(l => l.url).map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/20 text-white text-sm font-bold rounded-full hover:bg-white/30 transition-colors flex items-center gap-1.5">
                  <span>{PLATFORM_ICONS[link.platform] || '🔗'}</span> {link.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
