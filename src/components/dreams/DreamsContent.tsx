'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface DreamItem {
  text: string;
  done: boolean;
  category: string;
}

const dreams: Record<string, DreamItem[]> = {
  '🌍 Places': [
    { text: 'Watch sunrise at Machu Picchu', done: false, category: 'places' },
    { text: 'Walk the streets of Tokyo at 3 AM', done: true, category: 'places' },
    { text: 'Northern lights in Iceland', done: false, category: 'places' },
    { text: 'Live in New York for a month', done: false, category: 'places' },
    { text: 'Road trip across Italy', done: false, category: 'places' },
    { text: 'Visit every continent', done: false, category: 'places' },
  ],
  '🛠️ Build': [
    { text: 'Build a product used by 10,000 people', done: false, category: 'build' },
    { text: 'Launch a newsletter with 1,000 subscribers', done: false, category: 'build' },
    { text: 'Create a short film', done: false, category: 'build' },
    { text: 'Build this website', done: true, category: 'build' },
    { text: 'Start a podcast', done: false, category: 'build' },
    { text: 'Write a book', done: false, category: 'build' },
  ],
  '📸 Create': [
    { text: 'Photo exhibition', done: false, category: 'create' },
    { text: '365-day photo project', done: false, category: 'create' },
    { text: 'Direct a music video', done: false, category: 'create' },
    { text: 'Design a typeface', done: false, category: 'create' },
  ],
  '💭 Life': [
    { text: 'Learn to surf', done: false, category: 'life' },
    { text: 'Run a marathon', done: false, category: 'life' },
    { text: 'Learn a third language', done: false, category: 'life' },
    { text: 'Own a cabin in the mountains', done: false, category: 'life' },
    { text: 'Mentor 10 people', done: false, category: 'life' },
  ],
};

const categoryColors: Record<string, string> = {
  places: '#1D4ED8',
  build: '#FFD700',
  create: '#047857',
  life: '#DC2626',
};

export default function DreamsContent() {
  const [filter, setFilter] = useState<string>('all');
  const categories = Object.keys(dreams);
  const totalDreams = Object.values(dreams).flat().length;
  const doneDreams = Object.values(dreams).flat().filter((d) => d.done).length;

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-3 h-10 rounded-sm" style={{ background: 'linear-gradient(180deg, #FFD700, #DC2626)' }} />
          <h1 className="headline-xl text-text-primary">Dreams & Wishlist</h1>
        </div>
        <p className="text-text-secondary text-lg max-w-lg">
          Things I want to do, places I want to go, stuff I want to build. A public accountability list.
        </p>

        {/* Progress */}
        <div className="mt-6 flex items-center gap-4">
          <div className="flex-1 max-w-xs h-2 bg-bg-card rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(doneDreams / totalDreams) * 100}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #FFD700, #DC2626)' }}
            />
          </div>
          <span className="text-sm font-bold text-text-primary">{doneDreams}/{totalDreams} done</span>
        </div>
        <div className="editorial-divider mt-8" />
      </motion.header>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
            filter === 'all' ? 'bg-text-primary text-white' : 'bg-bg-card text-text-secondary border border-border hover:bg-bg-elevated'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
              filter === cat ? 'bg-text-primary text-white' : 'bg-bg-card text-text-secondary border border-border hover:bg-bg-elevated'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Dream lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {(filter === 'all' ? categories : [filter]).map((category, ci) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: ci * 0.1 }}
          >
            <h2 className="text-xl font-bold text-text-primary tracking-tight mb-4">{category}</h2>
            <div className="space-y-2">
              {dreams[category].map((dream, i) => (
                <motion.div
                  key={dream.text}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: ci * 0.1 + i * 0.05 }}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
                    dream.done
                      ? 'border-green/20 bg-green/[0.03]'
                      : 'border-border hover:border-border-hover'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${
                      dream.done ? 'border-green bg-green' : 'border-border'
                    }`}
                  >
                    {dream.done && <span className="text-white text-[10px]">✓</span>}
                  </div>
                  <span className={`text-sm font-medium ${dream.done ? 'line-through text-text-secondary/50' : 'text-text-primary'}`}>
                    {dream.text}
                  </span>
                  {dream.done && (
                    <span className="ml-auto text-[10px] font-bold text-green uppercase tracking-wider">Done</span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
