'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/admin');
    } else {
      setError('Wrong password. Try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Image src="/logo.png" alt="R" width={48} height={48} className="rounded-xl mx-auto mb-4 border-2 border-text-primary" />
          <h1 className="text-2xl font-extrabold tracking-tighter text-text-primary">
            RITESH<span style={{ color: '#DC2626' }}>.</span>ADMIN
          </h1>
          <p className="text-text-secondary text-sm mt-1">Enter your password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-border p-6 shadow-sm">
          <div className="mb-4">
            <label className="block text-xs font-bold text-text-secondary mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoFocus
              className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 transition-all"
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs font-bold mb-4 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-text-primary text-white text-sm font-bold rounded-xl hover:bg-text-primary/90 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-[10px] text-text-secondary/40 mt-6">
          This is a private admin area.
        </p>
      </div>
    </div>
  );
}
