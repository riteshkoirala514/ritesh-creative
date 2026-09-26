'use client';

import { motion } from 'framer-motion';

export default function Signature() {
  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="max-w-2xl mx-auto px-6 py-10 border-t border-border">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-accent to-pink flex items-center justify-center">
          <span className="text-white text-sm font-bold">R</span>
        </div>
        <div>
          <p className="text-sm font-bold text-text-primary">Ritesh Koirala</p>
          <p className="text-xs text-text-secondary">Writer, creator, professional overthinker ✌️</p>
        </div>
      </div>
    </motion.div>
  );
}
