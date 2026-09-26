'use client';

import { motion } from 'framer-motion';
import NewsletterForm from '@/components/newsletter/NewsletterForm';

interface NewsletterCTAProps {
  name?: string;
}

export default function NewsletterCTA({ name = 'Ritesh' }: NewsletterCTAProps) {
  return (
    <section className="max-w-[1400px] mx-auto px-6 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-text-primary rounded-2xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10"
      >
        <div className="md:max-w-md">
          <h2 className="headline-lg text-white">Letters from {name}</h2>
          <p className="text-white/50 text-base mt-3 leading-relaxed">
            The good stuff, straight to your inbox.
          </p>
        </div>
        <div className="w-full md:max-w-sm">
          <NewsletterForm dark />
        </div>
      </motion.div>
    </section>
  );
}
