'use client';

import { useState, useEffect } from 'react';
import ImageUpload from '@/components/admin/ImageUpload';

interface Series { id: number; slug: string; title: string; description: string; image: string; }

export default function AdminSeries() {
  const [series, setSeries] = useState<Series[]>([]);
  const [form, setForm] = useState({ slug: '', title: '', description: '', image: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  const load = () => fetch('/api/series').then(r => r.json()).then(setSeries);
  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    if (!form.slug || !form.title) return;
    if (editingId) {
      await fetch(`/api/series/${editingId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      setEditingId(null);
    } else {
      await fetch('/api/series', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    }
    setForm({ slug: '', title: '', description: '', image: '' });
    load();
  };

  const handleEdit = (s: Series) => { setEditingId(s.id); setForm({ slug: s.slug, title: s.title, description: s.description, image: s.image }); };
  const handleDelete = async (id: number) => { if (!confirm('Delete?')) return; await fetch(`/api/series/${id}`, { method: 'DELETE' }); load(); };

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary tracking-tight mb-6">Series</h1>
      <div className="bg-white rounded-xl border border-border p-5 mb-6 space-y-4">
        <p className="text-xs font-bold text-text-primary uppercase tracking-wider">{editingId ? 'Edit Series' : 'Add Series'}</p>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="text-xs font-bold text-text-secondary mb-1 block">Title</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20" /></div>
          <div><label className="text-xs font-bold text-text-secondary mb-1 block">Slug</label><input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent/20" /></div>
        </div>
        <div><label className="text-xs font-bold text-text-secondary mb-1 block">Description</label><input value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20" /></div>
        <ImageUpload value={form.image} onChange={(url) => setForm({...form, image: url})} label="Cover Image" />
        <div className="flex gap-3">
          <button onClick={handleSave} className="px-5 py-2.5 bg-accent text-white text-sm font-bold rounded-xl hover:bg-accent-hover transition-colors">{editingId ? 'Update' : 'Add'} Series</button>
          {editingId && <button onClick={() => { setEditingId(null); setForm({ slug: '', title: '', description: '', image: '' }); }} className="text-sm text-text-secondary">Cancel</button>}
        </div>
      </div>
      <div className="space-y-3">
        {series.map(s => (
          <div key={s.id} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-border">
            {s.image && <img src={s.image} alt={s.title} className="w-20 h-14 object-cover rounded-lg" />}
            <div className="flex-1"><p className="text-sm font-bold text-text-primary">{s.title}</p><p className="text-xs text-text-secondary">{s.slug} · {s.description}</p></div>
            <button onClick={() => handleEdit(s)} className="text-accent text-xs font-bold hover:underline">Edit</button>
            <button onClick={() => handleDelete(s.id)} className="text-red-400 text-xs font-bold hover:text-red-600">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
