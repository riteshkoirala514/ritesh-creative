'use client';

import { motion } from 'framer-motion';
import NewsletterForm from './NewsletterForm';

export default function LettersContent() {
  return (
    <div className="max-w-xl mx-auto px-6 py-20 md:py-28">
      <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-10 text-center">
        <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.2 }} className="text-5xl mb-4">✉️</motion.p>
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">Letters from <span className="gradient-text">Ritesh</span></h1>
        <p className="text-text-secondary text-[15px] mt-3 max-w-sm mx-auto leading-relaxed">The good stuff, straight to your inbox. Think of it as a letter from a friend who can&apos;t shut up about interesting things.</p>
      </motion.header>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="bg-white rounded-2xl border border-border p-8">
        <div className="space-y-4 text-sm text-text-secondary leading-relaxed mb-6">
          <p>Here&apos;s what you&apos;ll get:</p>
          <div className="space-y-2">
            {["✍️ Stories and essays I'm genuinely proud of", '💡 Ideas about tech, creativity & life', '📸 Photos and creative experiments', "🔗 Cool things I've found on the internet"].map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
        <NewsletterForm />
      </motion.div>

      <p className="text-[11px] text-text-secondary/40 mt-8 text-center font-medium">No spam ever. Unsubscribe with one click. Pinky promise 🤙</p>
    </div>
  );
}
