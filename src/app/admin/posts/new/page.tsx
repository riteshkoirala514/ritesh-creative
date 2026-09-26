'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewPost() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const form = new FormData(e.currentTarget);
    const data = {
      slug: form.get('slug'),
      title: form.get('title'),
      description: form.get('description'),
      content: form.get('content'),
      date: form.get('date'),
      category: form.get('category'),
      format: form.get('format'),
      image: form.get('image'),
      thumbnail: form.get('thumbnail') || undefined,
      featured: form.get('featured') === 'on',
      draft: form.get('draft') === 'on',
      series: form.get('series') || undefined,
      tags: form.get('tags') ? (form.get('tags') as string).split(',').map(t => t.trim()) : undefined,
      readTime: form.get('readTime') || undefined,
      role: form.get('role') || undefined,
      location: form.get('location') || undefined,
      connection: form.get('connection') || undefined,
      peopleType: form.get('peopleType') || 'network',
    };

    const res = await fetch('/api/posts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (res.ok) router.push('/admin/posts');
    else { alert('Error creating post'); setSaving(false); }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary tracking-tight mb-6">New Post</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-border p-6 space-y-4 max-w-3xl">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-text-secondary mb-1">Title *</label>
            <input name="title" required className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20" />
          </div>
          <div>
            <label className="block text-xs font-bold text-text-secondary mb-1">Slug *</label>
            <input name="slug" required className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-text-secondary mb-1">Description</label>
          <input name="description" className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-text-secondary mb-1">Category *</label>
            <select name="category" required className="w-full px-3 py-2 border border-border rounded-lg text-sm">
              <option value="writing">Writing</option><option value="people">People</option><option value="places">Places</option><option value="ideas">Ideas</option><option value="create">Create</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-text-secondary mb-1">Format</label>
            <select name="format" className="w-full px-3 py-2 border border-border rounded-lg text-sm">
              <option value="article">Article</option><option value="gallery">Gallery</option><option value="video">Video</option><option value="photo">Photo</option><option value="essay">Essay</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-text-secondary mb-1">Date</label>
            <input name="date" type="date" className="w-full px-3 py-2 border border-border rounded-lg text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-text-secondary mb-1">Cover Image URL</label>
          <input name="image" className="w-full px-3 py-2 border border-border rounded-lg text-sm" placeholder="https://..." />
        </div>
        <div>
          <label className="block text-xs font-bold text-text-secondary mb-1">Content (Markdown)</label>
          <textarea name="content" rows={12} className="w-full px-3 py-2 border border-border rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent/20" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-xs font-bold text-text-secondary mb-1">Tags (comma separated)</label><input name="tags" className="w-full px-3 py-2 border border-border rounded-lg text-sm" /></div>
          <div><label className="block text-xs font-bold text-text-secondary mb-1">Series slug</label><input name="series" className="w-full px-3 py-2 border border-border rounded-lg text-sm" /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-xs font-bold text-text-secondary mb-1">Read time</label><input name="readTime" className="w-full px-3 py-2 border border-border rounded-lg text-sm" placeholder="5 min read" /></div>
          <div><label className="block text-xs font-bold text-text-secondary mb-1">Thumbnail URL</label><input name="thumbnail" className="w-full px-3 py-2 border border-border rounded-lg text-sm" /></div>
        </div>
        <div className="flex gap-6 pt-2">
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="featured" className="rounded" /> Featured</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="draft" className="rounded" /> Draft</label>
        </div>
        <div className="pt-4">
          <button type="submit" disabled={saving} className="px-6 py-2.5 bg-accent text-white text-sm font-bold rounded-xl hover:bg-accent-hover disabled:opacity-50 transition-colors">
            {saving ? 'Creating...' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
}
