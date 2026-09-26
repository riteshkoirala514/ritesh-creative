'use client';

import { useState, useEffect } from 'react';

interface Series { id: number; slug: string; title: string; description: string; image: string; }

export default function AdminSeries() {
  const [series, setSeries] = useState<Series[]>([]);
  const [form, setForm] = useState({ slug: '', title: '', description: '', image: '' });

  const load = () => fetch('/api/series').then(r => r.json()).then(setSeries);
  useEffect(() => { load(); }, []);

  const handleAdd = async () => {
    if (!form.slug || !form.title) return;
    await fetch('/api/series', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setForm({ slug: '', title: '', description: '', image: '' });
    load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this series?')) return;
    await fetch(`/api/series/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary tracking-tight mb-6">Series</h1>

      <div className="bg-white rounded-xl border border-border p-4 mb-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Title" className="px-3 py-2 border border-border rounded-lg text-sm" />
        <input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} placeholder="slug" className="px-3 py-2 border border-border rounded-lg text-sm" />
        <input value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Description" className="px-3 py-2 border border-border rounded-lg text-sm" />
        <button onClick={handleAdd} className="px-4 py-2 bg-accent text-white text-sm font-bold rounded-xl hover:bg-accent-hover transition-colors">Add Series</button>
      </div>

      <div className="space-y-3">
        {series.map(s => (
          <div key={s.id} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-border">
            {s.image && <img src={s.image} alt={s.title} className="w-16 h-12 object-cover rounded-lg" />}
            <div className="flex-1">
              <p className="text-sm font-bold text-text-primary">{s.title}</p>
              <p className="text-xs text-text-secondary">{s.slug} · {s.description}</p>
            </div>
            <button onClick={() => handleDelete(s.id)} className="text-red-400 text-xs hover:text-red-600">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
