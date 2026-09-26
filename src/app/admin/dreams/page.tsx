'use client';

import { useState, useEffect } from 'react';

interface Dream { id: number; text: string; category: string; done: boolean; image?: string; }

export default function AdminDreams() {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [newText, setNewText] = useState('');
  const [newCat, setNewCat] = useState('life');

  const load = () => fetch('/api/dreams').then(r => r.json()).then(setDreams);
  useEffect(() => { load(); }, []);

  const handleAdd = async () => {
    if (!newText.trim()) return;
    await fetch('/api/dreams', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: newText, category: newCat }) });
    setNewText('');
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

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary tracking-tight mb-6">Dreams & Wishlist</h1>

      {/* Add new */}
      <div className="bg-white rounded-xl border border-border p-4 mb-6 flex gap-3">
        <input value={newText} onChange={e => setNewText(e.target.value)} placeholder="Add a dream..." className="flex-1 px-3 py-2 border border-border rounded-lg text-sm" onKeyDown={e => e.key === 'Enter' && handleAdd()} />
        <select value={newCat} onChange={e => setNewCat(e.target.value)} className="px-3 py-2 border border-border rounded-lg text-sm">
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button onClick={handleAdd} className="px-4 py-2 bg-accent text-white text-sm font-bold rounded-xl hover:bg-accent-hover transition-colors">Add</button>
      </div>

      {/* List */}
      <div className="space-y-2">
        {dreams.map(d => (
          <div key={d.id} className={`flex items-center gap-3 p-3 bg-white rounded-xl border ${d.done ? 'border-green/20' : 'border-border'}`}>
            <button onClick={() => handleToggle(d.id)} className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${d.done ? 'border-green bg-green' : 'border-border'}`}>
              {d.done && <span className="text-white text-[10px]">✓</span>}
            </button>
            <span className={`flex-1 text-sm ${d.done ? 'line-through text-text-secondary/50' : 'text-text-primary'}`}>{d.text}</span>
            <span className="text-[10px] font-bold text-text-secondary/40 uppercase">{d.category}</span>
            <button onClick={() => handleDelete(d.id)} className="text-red-400 text-xs hover:text-red-600">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}
