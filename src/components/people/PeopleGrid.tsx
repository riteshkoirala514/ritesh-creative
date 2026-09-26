'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import type { Post } from '@/lib/types';

interface PeopleGridProps {
  people: Post[];
}

const tabs = [
  { id: 'family', label: 'Family & Friends', emoji: '❤️' },
  { id: 'network', label: 'Network', emoji: '🤝' },
] as const;

export default function PeopleGrid({ people }: PeopleGridProps) {
  const [activeTab, setActiveTab] = useState<'family' | 'network'>('family');
  const filtered = people.filter((p) => (p.peopleType || 'network') === activeTab);

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-3 h-10 rounded-sm bg-pink" />
          <h1 className="headline-xl text-text-primary">People</h1>
        </div>
        <p className="text-text-secondary text-lg max-w-lg">
          The people in my life — family, friends, mentors, collaborators and everyone who shaped who I am.
        </p>
        <div className="editorial-divider mt-8" />
      </motion.header>

      {/* Tabs */}
      <div className="flex gap-2 mb-10">
        {tabs.map((tab) => {
          const count = people.filter((p) => (p.peopleType || 'network') === tab.id).length;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold tracking-tight transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-text-primary text-white'
                  : 'bg-bg-card text-text-secondary hover:bg-bg-elevated hover:text-text-primary border border-border'
              }`}
            >
              <span>{tab.emoji}</span>
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-border text-text-secondary'
              }`}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* People list */}
      {filtered.length === 0 ? (
        <p className="text-text-secondary text-sm py-8">
          {activeTab === 'family' ? 'Family stories coming soon...' : 'Growing the network...'}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((person, i) => (
            <motion.div
              key={person.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                href={`/people/${person.slug}`}
                className="group flex gap-5 p-5 rounded-2xl border border-border hover:border-pink/40 hover:bg-pink/[0.02] transition-all duration-200 card-hover"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shrink-0 border border-border">
                  <img src={person.image} alt={person.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex-1 min-w-0 py-0.5">
                  <h3 className="text-xl font-bold text-text-primary tracking-tight group-hover:text-pink transition-colors">
                    {person.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    {person.role && <span className="text-xs font-semibold text-text-secondary">{person.role}</span>}
                    {person.role && person.location && <span className="text-text-secondary/30">·</span>}
                    {person.location && <span className="text-xs text-text-secondary/60">{person.location}</span>}
                  </div>
                  {person.connection && (
                    <p className="text-sm text-text-secondary mt-2 italic leading-relaxed line-clamp-2">
                      &ldquo;{person.connection}&rdquo;
                    </p>
                  )}
                </div>
                <div className="shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity text-pink font-bold">→</div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
