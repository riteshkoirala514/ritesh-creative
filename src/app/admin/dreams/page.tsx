'use client';

import { useState, useEffect } from 'react';
import ImageUpload from '@/components/admin/ImageUpload';

interface Dream { id: number; text: string; category: string; done: boolean; image?: string; }

export default function AdminDreams() {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [newText, setNewText] = useState('');
  const [newCat, setNewCat] = useState('life');
  const [newImage, setNewImage] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const load = () => fetch('/api/dreams').then(r => r.json()).then(setDreams);
  useEffect(() => { load(); }, []);

  const handleAdd = async () => {
    if (!newText.trim()) return;
    await fetch('/api/dreams', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: newText, category: newCat, image: newImage || undefined }) });
    setNewText(''); setNewImage('');
    load();
  };

  const handleToggle = async (id: number) => {
    await fetch(`/api/dreams/${id}`, { method: 'PUT' });
    load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this dream?')) return;
    await fetch(`/api/dreams/${id}`, { method: 'DELETE' });
    load();
  };

  const categories = ['life', 'places', 'build', 'create'];
  const totalDone = dreams.filter(d => d.done).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">Dreams & Wishlist</h1>
        <span className="text-sm font-bold text-accent">{totalDone}/{dreams.length} done</span>
      </div>

      <div className="bg-white rounded-xl border border-border p-5 mb-6 space-y-3">
        <p className="text-xs font-bold text-text-primary uppercase tracking-wider">Add a Dream</p>
        <div className="flex gap-3">
          <input value={newText} onChange={e => setNewText(e.target.value)} placeholder="What do you dream of?"
            className="flex-1 px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
            onKeyDown={e => e.key === 'Enter' && handleAdd()} />
          <select value={newCat} onChange={e => setNewCat(e.target.value)} className="px-3 py-2.5 border border-border rounded-lg text-sm">
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button onClick={handleAdd} className="px-5 py-2.5 bg-accent text-white text-sm font-bold rounded-xl hover:bg-accent-hover transition-colors">Add</button>
        </div>
        <ImageUpload value={newImage} onChange={setNewImage} label="Dream Image (optional)" />
      </div>

      <div className="space-y-2">
        {dreams.map(d => (
          <div key={d.id} className={`flex items-start gap-3 p-4 bg-white rounded-xl border ${d.done ? 'border-green/20' : 'border-border'}`}>
            <button onClick={() => handleToggle(d.id)} className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center mt-0.5 ${d.done ? 'border-green bg-green' : 'border-border hover:border-accent'}`}>
              {d.done && <span className="text-white text-[10px]">✓</span>}
            </button>
            <div className="flex-1 min-w-0">
              {editingId === d.id ? (
                <div className="flex gap-2">
                  <input value={editText} onChange={e => setEditText(e.target.value)} className="flex-1 px-2 py-1 border border-border rounded text-sm focus:outline-none" autoFocus
                    onKeyDown={e => { if (e.key === 'Enter') setEditingId(null); }} />
                  <button onClick={() => setEditingId(null)} className="text-xs text-accent font-bold">Done</button>
                </div>
              ) : (
                <span className={`text-sm font-medium ${d.done ? 'line-through text-text-secondary/50' : 'text-text-primary'}`}>{d.text}</span>
              )}
              {d.image && <img src={d.image} alt="" className="w-20 h-14 object-cover rounded-lg mt-2" />}
            </div>
            <span className="text-[10px] font-bold text-text-secondary/40 uppercase shrink-0">{d.category}</span>
            <button onClick={() => { setEditingId(d.id); setEditText(d.text); }} className="text-text-secondary/40 text-xs hover:text-text-primary">✏️</button>
            <button onClick={() => handleDelete(d.id)} className="text-red-400 text-xs hover:text-red-600">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}
