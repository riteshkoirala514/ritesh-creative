'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface Dream {
  id: number;
  text: string;
  category: string;
  done: boolean;
  image?: string;
}

interface DreamsContentProps {
  dreams: Dream[];
}

const categoryLabels: Record<string, { label: string; emoji: string }> = {
  places: { label: '🌍 Places', emoji: '🌍' },
  build: { label: '🛠️ Build', emoji: '🛠️' },
  create: { label: '📸 Create', emoji: '📸' },
  life: { label: '💭 Life', emoji: '💭' },
};

export default function DreamsContent({ dreams: initialDreams }: DreamsContentProps) {
  const [dreams, setDreams] = useState(initialDreams);
  const [filter, setFilter] = useState('all');

  const categories = [...new Set(dreams.map(d => d.category))];
  const totalDreams = dreams.length;
  const doneDreams = dreams.filter(d => d.done).length;
  const filtered = filter === 'all' ? dreams : dreams.filter(d => d.category === filter);

  const handleToggle = async (id: number) => {
    await fetch(`/api/dreams/${id}`, { method: 'PUT' });
    setDreams(dreams.map(d => d.id === id ? { ...d, done: !d.done } : d));
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-3 h-10 rounded-sm" style={{ background: 'linear-gradient(180deg, #FFD700, #DC2626)' }} />
          <h1 className="headline-xl text-text-primary">Dreams & Wishlist</h1>
        </div>
        <p className="text-text-secondary text-lg max-w-lg">Things I want to do, places I want to go, stuff I want to build. A public accountability list.</p>
        <div className="mt-6 flex items-center gap-4">
          <div className="flex-1 max-w-xs h-2 bg-bg-card rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${totalDreams > 0 ? (doneDreams / totalDreams) * 100 : 0}%` }} transition={{ duration: 1, delay: 0.3 }}
              className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #FFD700, #DC2626)' }} />
          </div>
          <span className="text-sm font-bold text-text-primary">{doneDreams}/{totalDreams} done</span>
        </div>
        <div className="editorial-divider mt-8" />
      </motion.header>

      <div className="flex flex-wrap gap-2 mb-10">
        <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${filter === 'all' ? 'bg-text-primary text-white' : 'bg-bg-card text-text-secondary border border-border'}`}>All</button>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${filter === cat ? 'bg-text-primary text-white' : 'bg-bg-card text-text-secondary border border-border'}`}>
            {categoryLabels[cat]?.label || cat}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((dream, i) => (
          <motion.div key={dream.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
            className={`flex items-center gap-3 p-3 rounded-xl border transition-colors cursor-pointer ${dream.done ? 'border-green/20 bg-green/[0.03]' : 'border-border hover:border-border-hover'}`}
            onClick={() => handleToggle(dream.id)}
          >
            <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${dream.done ? 'border-green bg-green' : 'border-border'}`}>
              {dream.done && <span className="text-white text-[10px]">✓</span>}
            </div>
            <span className={`flex-1 text-sm font-medium ${dream.done ? 'line-through text-text-secondary/50' : 'text-text-primary'}`}>{dream.text}</span>
            <span className="text-[10px] font-bold text-text-secondary/40 uppercase tracking-wider">{dream.category}</span>
            {dream.done && <span className="text-[10px] font-bold text-green uppercase tracking-wider">Done</span>}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
