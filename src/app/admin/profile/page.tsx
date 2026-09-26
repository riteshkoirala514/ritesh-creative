'use client';

import { useState, useEffect } from 'react';
import ImageUpload from '@/components/admin/ImageUpload';

interface SocialLink { platform: string; url: string; label: string; }

const PLATFORM_OPTIONS = [
  { value: 'instagram', label: 'Instagram', icon: '📸' },
  { value: 'youtube', label: 'YouTube', icon: '🎬' },
  { value: 'linkedin', label: 'LinkedIn', icon: '💼' },
  { value: 'twitter', label: 'X / Twitter', icon: '𝕏' },
  { value: 'tiktok', label: 'TikTok', icon: '🎵' },
  { value: 'github', label: 'GitHub', icon: '💻' },
  { value: 'website', label: 'Website', icon: '🌐' },
  { value: 'email', label: 'Email', icon: '✉️' },
  { value: 'facebook', label: 'Facebook', icon: '👤' },
  { value: 'pinterest', label: 'Pinterest', icon: '📌' },
  { value: 'spotify', label: 'Spotify', icon: '🎧' },
  { value: 'medium', label: 'Medium', icon: '📝' },
  { value: 'behance', label: 'Behance', icon: '🎨' },
  { value: 'dribbble', label: 'Dribbble', icon: '🏀' },
  { value: 'threads', label: 'Threads', icon: '🧵' },
  { value: 'other', label: 'Other', icon: '🔗' },
];

export default function AdminProfile() {
  const [profile, setProfile] = useState({
    name: '', tagline: '', quote: '', bio: '', photo: '', brand_name: 'RITESH.CREATIVE',
    social_links: [] as SocialLink[],
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newPlatform, setNewPlatform] = useState('instagram');

  useEffect(() => { fetch('/api/profile').then(r => r.json()).then(setProfile); }, []);

  const handleSave = async () => {
    setSaving(true);
    const payload = { ...profile, social_links: JSON.stringify(profile.social_links) };
    await fetch('/api/profile', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const update = (field: string, value: unknown) => setProfile(p => ({ ...p, [field]: value }));

  const addSocialLink = () => {
    const opt = PLATFORM_OPTIONS.find(p => p.value === newPlatform);
    update('social_links', [...profile.social_links, { platform: newPlatform, url: '', label: opt?.label || newPlatform }]);
  };

  const updateSocialLink = (index: number, field: keyof SocialLink, value: string) => {
    const updated = [...profile.social_links];
    updated[index] = { ...updated[index], [field]: value };
    update('social_links', updated);
  };

  const removeSocialLink = (index: number) => update('social_links', profile.social_links.filter((_, i) => i !== index));

  const moveSocialLink = (from: number, to: number) => {
    if (to < 0 || to >= profile.social_links.length) return;
    const updated = [...profile.social_links];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    update('social_links', updated);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary tracking-tight mb-6">Profile & Settings</h1>
      <div className="space-y-6 max-w-3xl">
        {/* Brand */}
        <div className="bg-white rounded-xl border border-border p-5 space-y-4">
          <p className="text-xs font-bold text-text-primary uppercase tracking-wider">Brand</p>
          <div><label className="text-xs font-bold text-text-secondary mb-1 block">Brand Name (nav, footer, marquee)</label>
            <input value={profile.brand_name} onChange={e => update('brand_name', e.target.value)} className="w-full px-3 py-2.5 border border-border rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-accent/20" /></div>
        </div>

        {/* Identity */}
        <div className="bg-white rounded-xl border border-border p-5 space-y-4">
          <p className="text-xs font-bold text-text-primary uppercase tracking-wider">Identity</p>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-xs font-bold text-text-secondary mb-1 block">Full Name</label>
              <input value={profile.name} onChange={e => update('name', e.target.value)} className="w-full px-3 py-2.5 border border-border rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent/20" /></div>
            <div><label className="text-xs font-bold text-text-secondary mb-1 block">Tagline</label>
              <input value={profile.tagline} onChange={e => update('tagline', e.target.value)} className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20" /></div>
          </div>
          <div><label className="text-xs font-bold text-text-secondary mb-1 block">Quote</label>
            <input value={profile.quote} onChange={e => update('quote', e.target.value)} className="w-full px-3 py-2.5 border border-border rounded-lg text-sm italic focus:outline-none focus:ring-2 focus:ring-accent/20" /></div>
        </div>

        {/* Photo */}
        <div className="bg-white rounded-xl border border-border p-5">
          <ImageUpload value={profile.photo} onChange={(url) => update('photo', url)} label="Profile Photo" />
        </div>

        {/* Bio */}
        <div className="bg-white rounded-xl border border-border p-5">
          <label className="text-xs font-bold text-text-secondary mb-2 block">Bio / About Me</label>
          <textarea value={profile.bio} onChange={e => update('bio', e.target.value)} rows={8}
            className="w-full px-3 py-2.5 border border-border rounded-lg text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-accent/20"
            placeholder="Write your bio. Separate paragraphs with blank lines." />
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-xl border border-border p-5 space-y-4">
          <p className="text-xs font-bold text-text-primary uppercase tracking-wider">Social Links</p>
          <p className="text-[10px] text-text-secondary/50">Add any platform. Appears in Footer, About, everywhere. Order matters.</p>

          {profile.social_links.length > 0 && (
            <div className="space-y-2">
              {profile.social_links.map((link, i) => {
                const opt = PLATFORM_OPTIONS.find(p => p.value === link.platform);
                return (
                  <div key={i} className="flex items-center gap-2 p-3 border border-border rounded-lg bg-bg-card/50">
                    <span className="text-lg shrink-0">{opt?.icon || '🔗'}</span>
                    <input value={link.label} onChange={e => updateSocialLink(i, 'label', e.target.value)}
                      className="w-24 px-2 py-1.5 border border-border rounded text-xs font-bold focus:outline-none" />
                    <input value={link.url} onChange={e => updateSocialLink(i, 'url', e.target.value)}
                      className="flex-1 px-2 py-1.5 border border-border rounded text-xs focus:outline-none" placeholder="https://..." />
                    <button type="button" onClick={() => moveSocialLink(i, i - 1)} disabled={i === 0} className="text-text-secondary/30 hover:text-text-primary text-xs disabled:opacity-30">↑</button>
                    <button type="button" onClick={() => moveSocialLink(i, i + 1)} disabled={i === profile.social_links.length - 1} className="text-text-secondary/30 hover:text-text-primary text-xs disabled:opacity-30">↓</button>
                    <button type="button" onClick={() => removeSocialLink(i)} className="text-red-400 hover:text-red-600 text-xs">✕</button>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex gap-2">
            <select value={newPlatform} onChange={e => setNewPlatform(e.target.value)} className="px-3 py-2 border border-border rounded-lg text-sm">
              {PLATFORM_OPTIONS.map(p => <option key={p.value} value={p.value}>{p.icon} {p.label}</option>)}
            </select>
            <button type="button" onClick={addSocialLink} className="px-4 py-2 bg-accent text-white text-sm font-bold rounded-lg hover:bg-accent-hover transition-colors">+ Add</button>
          </div>
        </div>

        {/* Save */}
        <div className="flex items-center gap-4 pb-10">
          <button onClick={handleSave} disabled={saving} className="px-8 py-3 bg-accent text-white text-sm font-bold rounded-xl hover:bg-accent-hover disabled:opacity-50 transition-colors">
            {saving ? 'Saving...' : 'Save Everything'}
          </button>
          {saved && <span className="text-green text-sm font-bold">✓ Saved! Live everywhere.</span>}
        </div>
      </div>
    </div>
  );
}
