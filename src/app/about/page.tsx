'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-14">
        <div className="flex items-center gap-4 mb-8">
          <Image src="/logo.png" alt="Ritesh" width={64} height={64} className="rounded-2xl" />
          <motion.div animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }} transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }} className="text-3xl inline-block">👋</motion.div>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight leading-[1.05]">
          I&apos;m <span className="gradient-text">Ritesh</span>.
          <br />I like making things.
        </h1>
      </motion.header>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="space-y-5 text-[16px] leading-[1.8] text-text-secondary">
        <p>I write, build, photograph, explore, learn and talk to people. Basically, I&apos;m <span className="text-text-primary font-medium">professionally curious</span>.</p>
        <p>I&apos;m interested in the world and the stories hiding inside it. The kind of stuff that makes you go <span className="text-accent font-medium">&ldquo;huh, that&apos;s interesting&rdquo;</span> at 2 AM.</p>
        <p>This place is where I collect everything — the writing that matters to me, the people I find fascinating, the places that changed how I see things, the ideas I can&apos;t stop thinking about, and the creative work I make along the way.</p>
        <p>I&apos;ve worked across technology, marketing, and creative industries. I&apos;ve lived in different cities and met people from every kind of background. Every experience shaped how I think and what I create.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-16 pt-10 border-t border-border">
        <h2 className="text-2xl font-bold text-text-primary tracking-tight mb-8">Things I believe<span className="text-accent">.</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { icon: '📖', title: 'Stories matter', desc: "They're how we make sense of the world." },
            { icon: '🔍', title: 'Curiosity is everything', desc: 'The best work comes from asking better questions.' },
            { icon: '🛠️', title: 'Create > consume', desc: "The world needs more makers, not more audiences." },
            { icon: '💡', title: 'Share generously', desc: 'The ideas you give away come back better.' },
          ].map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="p-5 bg-white rounded-xl border border-border hover:border-border-hover transition-colors">
              <span className="text-2xl">{item.icon}</span>
              <h3 className="text-sm font-bold text-text-primary mt-3">{item.title}</h3>
              <p className="text-sm text-text-secondary mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="mt-14 p-8 rounded-2xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FF6B35, #DB2777)' }}>
        <div className="absolute inset-0 noise" />
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white mb-2">Let&apos;s talk 💬</h3>
          <p className="text-sm text-white/70 leading-relaxed">I&apos;m always up for a good conversation. Hit me up about anything — collabs, stories, ideas, or just to say hey.</p>
          <div className="flex flex-wrap gap-3 mt-6">
            {[{ label: 'Instagram', icon: '📸' }, { label: 'LinkedIn', icon: '💼' }, { label: 'YouTube', icon: '🎬' }].map((item) => (
              <a key={item.label} href="#" className="px-4 py-2 bg-white/20 text-white text-sm font-bold rounded-full hover:bg-white/30 transition-colors duration-200 flex items-center gap-1.5">
                <span>{item.icon}</span> {item.label}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
