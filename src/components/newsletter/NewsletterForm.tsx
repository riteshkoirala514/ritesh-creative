'use client';

import { useState } from 'react';

interface NewsletterFormProps {
  compact?: boolean;
  dark?: boolean;
}

export default function NewsletterForm({ compact = false, dark = false }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      if (res.ok) { setStatus('success'); setEmail(''); } else { setStatus('error'); }
    } catch { setStatus('error'); }
  };

  if (status === 'success') {
    return <div className={compact ? '' : 'text-center'}><p className={`text-sm font-bold ${dark ? 'text-white' : 'text-accent'}`}>You&apos;re in! Welcome to the club 🎉</p></div>;
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? '' : 'max-w-sm mx-auto'}>
      <div className="flex flex-col sm:flex-row gap-2.5">
        <input
          type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required
          className={`flex-1 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
            dark ? 'bg-white/15 border border-white/20 text-white placeholder:text-white/40 focus:ring-white/30' : 'bg-white border border-border text-text-primary placeholder:text-text-secondary/40 focus:ring-accent/20'
          }`}
        />
        <button type="submit" disabled={status === 'loading'}
          className={`px-6 py-3 text-sm font-bold rounded-xl transition-all duration-200 disabled:opacity-50 whitespace-nowrap ${
            dark ? 'bg-white text-black hover:bg-white/90' : 'bg-accent text-white hover:bg-accent-hover'
          }`}
        >
          {status === 'loading' ? 'Joining...' : 'Count me in →'}
        </button>
      </div>
      {status === 'error' && <p className="text-red-500 text-xs mt-2">Oops, something broke. Try again?</p>}
    </form>
  );
}
