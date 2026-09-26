'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from './ImageUpload';
import GalleryBuilder from './GalleryBuilder';
import VideoFields from './VideoFields';

interface PostFormProps {
  initialData?: Record<string, unknown>;
  postId?: number;
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function PostForm({ initialData, postId }: PostFormProps) {
  const router = useRouter();
  const isEdit = !!postId;
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    title: (initialData?.title as string) || '',
    slug: (initialData?.slug as string) || '',
    description: (initialData?.description as string) || '',
    content: (initialData?.content as string) || '',
    date: (initialData?.date as string)?.slice(0, 10) || new Date().toISOString().slice(0, 10),
    category: (initialData?.category as string) || 'writing',
    format: (initialData?.format as string) || 'article',
    image: (initialData?.image as string) || '',
    thumbnail: (initialData?.thumbnail as string) || '',
    featured: (initialData?.featured as boolean) || false,
    draft: (initialData?.draft as boolean) || false,
    series: (initialData?.series as string) || '',
    tags: Array.isArray(initialData?.tags) ? (initialData.tags as string[]).join(', ') : (initialData?.tags as string) || '',
    readTime: (initialData?.readTime as string) || '',
    // People fields
    role: (initialData?.role as string) || '',
    location: (initialData?.location as string) || '',
    connection: (initialData?.connection as string) || '',
    peopleType: (initialData?.peopleType as string) || 'network',
    // Gallery
    images: (initialData?.images as { src: string; alt?: string; caption?: string }[]) || [],
    // Video
    video: (initialData?.video as { url: string; duration?: string; platform?: string }) || { url: '', duration: '', platform: 'youtube' },
  });

  const updateField = (field: string, value: unknown) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      // Auto-generate slug from title (only if creating and slug hasn't been manually edited)
      if (field === 'title' && !isEdit && prev.slug === slugify(prev.title)) {
        updated.slug = slugify(value as string);
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    const payload: Record<string, unknown> = {
      ...form,
      tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      images: form.format === 'gallery' || form.format === 'essay' ? form.images : undefined,
      video: form.format === 'video' ? form.video : undefined,
    };

    // Clean up empty optional fields
    if (!payload.thumbnail) delete payload.thumbnail;
    if (!payload.series) delete payload.series;
    if (!payload.readTime) delete payload.readTime;
    if (!payload.role) delete payload.role;
    if (!payload.location) delete payload.location;
    if (!payload.connection) delete payload.connection;

    try {
      const url = isEdit ? `/api/posts/${postId}` : '/api/posts';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });

      if (res.ok) {
        router.push('/admin/posts');
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to save');
        setSaving(false);
      }
    } catch {
      setError('Network error');
      setSaving(false);
    }
  };

  const showPeopleFields = form.category === 'people';
  const showGallery = form.format === 'gallery' || form.format === 'essay';
  const showVideo = form.format === 'video';

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-bold px-4 py-3 rounded-xl">{error}</div>}

      {/* Title + Slug */}
      <div className="bg-white rounded-xl border border-border p-5 space-y-4">
        <div>
          <label className="text-xs font-bold text-text-secondary mb-1 block">Title *</label>
          <input value={form.title} onChange={(e) => updateField('title', e.target.value)} required
            className="w-full px-3 py-2.5 border border-border rounded-lg text-base font-bold focus:outline-none focus:ring-2 focus:ring-accent/20" placeholder="Your post title" />
        </div>
        <div>
          <label className="text-xs font-bold text-text-secondary mb-1 block">Slug</label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-secondary">/</span>
            <input value={form.slug} onChange={(e) => updateField('slug', e.target.value)}
              className="flex-1 px-3 py-2 border border-border rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent/20" placeholder="auto-generated-from-title" />
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-text-secondary mb-1 block">Description</label>
          <textarea value={form.description} onChange={(e) => updateField('description', e.target.value)} rows={2}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20" placeholder="Brief description for cards and SEO" />
        </div>
      </div>

      {/* Category + Format + Date */}
      <div className="bg-white rounded-xl border border-border p-5">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-text-secondary mb-1 block">Category *</label>
            <select value={form.category} onChange={(e) => updateField('category', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm">
              <option value="writing">Writing</option><option value="people">People</option><option value="places">Places</option><option value="ideas">Ideas</option><option value="create">Create</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-text-secondary mb-1 block">Format</label>
            <select value={form.format} onChange={(e) => updateField('format', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm">
              <option value="article">Article</option><option value="gallery">Gallery</option><option value="video">Video</option><option value="photo">Photo</option><option value="essay">Essay</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-text-secondary mb-1 block">Date</label>
            <input type="date" value={form.date} onChange={(e) => updateField('date', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm" />
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="bg-white rounded-xl border border-border p-5">
        <ImageUpload value={form.image} onChange={(url) => updateField('image', url)} label="Cover Image" />
      </div>

      {/* Gallery Images — shown for gallery/essay format */}
      {showGallery && (
        <div className="bg-white rounded-xl border border-border p-5">
          <GalleryBuilder value={form.images} onChange={(imgs) => updateField('images', imgs)} />
        </div>
      )}

      {/* Video Fields — shown for video format */}
      {showVideo && (
        <div className="bg-white rounded-xl border border-border p-5">
          <VideoFields value={form.video} onChange={(v) => updateField('video', v)} />
        </div>
      )}

      {/* Content */}
      <div className="bg-white rounded-xl border border-border p-5">
        <label className="text-xs font-bold text-text-secondary mb-2 block">Content (Markdown)</label>
        <textarea value={form.content} onChange={(e) => updateField('content', e.target.value)} rows={16}
          className="w-full px-3 py-2 border border-border rounded-lg text-sm font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-accent/20"
          placeholder="Write your content in markdown..." />
      </div>

      {/* People-specific fields */}
      {showPeopleFields && (
        <div className="bg-white rounded-xl border border-border p-5 space-y-4">
          <p className="text-xs font-bold text-text-primary uppercase tracking-wider">People Details</p>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-xs font-bold text-text-secondary mb-1 block">Role</label><input value={form.role} onChange={(e) => updateField('role', e.target.value)} className="w-full px-3 py-2 border border-border rounded-lg text-sm" placeholder="Founder, Photographer..." /></div>
            <div><label className="text-xs font-bold text-text-secondary mb-1 block">Location</label><input value={form.location} onChange={(e) => updateField('location', e.target.value)} className="w-full px-3 py-2 border border-border rounded-lg text-sm" placeholder="London, NYC..." /></div>
          </div>
          <div><label className="text-xs font-bold text-text-secondary mb-1 block">Connection Story</label><input value={form.connection} onChange={(e) => updateField('connection', e.target.value)} className="w-full px-3 py-2 border border-border rounded-lg text-sm" placeholder="How you met or know this person" /></div>
          <div><label className="text-xs font-bold text-text-secondary mb-1 block">Type</label>
            <select value={form.peopleType} onChange={(e) => updateField('peopleType', e.target.value)} className="w-full px-3 py-2 border border-border rounded-lg text-sm">
              <option value="network">Network</option><option value="family">Family & Friends</option>
            </select>
          </div>
        </div>
      )}

      {/* Meta */}
      <div className="bg-white rounded-xl border border-border p-5">
        <div className="grid grid-cols-2 gap-4">
          <div><label className="text-xs font-bold text-text-secondary mb-1 block">Tags (comma separated)</label><input value={form.tags} onChange={(e) => updateField('tags', e.target.value)} className="w-full px-3 py-2 border border-border rounded-lg text-sm" placeholder="London, Photography, Night" /></div>
          <div><label className="text-xs font-bold text-text-secondary mb-1 block">Series Slug</label><input value={form.series} onChange={(e) => updateField('series', e.target.value)} className="w-full px-3 py-2 border border-border rounded-lg text-sm" placeholder="london-diaries" /></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div><label className="text-xs font-bold text-text-secondary mb-1 block">Read Time</label><input value={form.readTime} onChange={(e) => updateField('readTime', e.target.value)} className="w-full px-3 py-2 border border-border rounded-lg text-sm" placeholder="5 min read" /></div>
          <ImageUpload value={form.thumbnail} onChange={(url) => updateField('thumbnail', url)} label="Social Thumbnail (optional)" />
        </div>
        <div className="flex gap-6 mt-4 pt-4 border-t border-border">
          <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={form.featured} onChange={(e) => updateField('featured', e.target.checked)} className="rounded" /> <span className="font-medium">Featured</span></label>
          <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={form.draft} onChange={(e) => updateField('draft', e.target.checked)} className="rounded" /> <span className="font-medium">Draft (hidden)</span></label>
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-4">
        <button type="submit" disabled={saving}
          className="px-8 py-3 bg-accent text-white text-sm font-bold rounded-xl hover:bg-accent-hover disabled:opacity-50 transition-colors">
          {saving ? 'Saving...' : isEdit ? 'Update Post' : 'Create Post'}
        </button>
        <button type="button" onClick={() => router.push('/admin/posts')} className="px-6 py-3 text-sm font-bold text-text-secondary hover:text-text-primary transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}
