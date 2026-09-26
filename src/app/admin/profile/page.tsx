'use client';

import { useState, useEffect } from 'react';
import ImageUpload from '@/components/admin/ImageUpload';

export default function AdminProfile() {
  const [profile, setProfile] = useState({
    name: '', tagline: '', quote: '', bio: '', photo: '',
    instagram: '', youtube: '', linkedin: '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { fetch('/api/profile').then(r => r.json()).then(setProfile); }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/profile', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(profile) });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const update = (field: string, value: string) => setProfile(p => ({ ...p, [field]: value }));

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary tracking-tight mb-6">Profile</h1>

      <div className="space-y-6 max-w-3xl">
        {/* Identity */}
        <div className="bg-white rounded-xl border border-border p-5 space-y-4">
          <p className="text-xs font-bold text-text-primary uppercase tracking-wider">Identity</p>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-xs font-bold text-text-secondary mb-1 block">Full Name</label>
              <input value={profile.name} onChange={e => update('name', e.target.value)} className="w-full px-3 py-2.5 border border-border rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent/20" /></div>
            <div><label className="text-xs font-bold text-text-secondary mb-1 block">Tagline</label>
              <input value={profile.tagline} onChange={e => update('tagline', e.target.value)} className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20" placeholder="Writer · Creator · Explorer" /></div>
          </div>
          <div><label className="text-xs font-bold text-text-secondary mb-1 block">Quote</label>
            <input value={profile.quote} onChange={e => update('quote', e.target.value)} className="w-full px-3 py-2.5 border border-border rounded-lg text-sm italic focus:outline-none focus:ring-2 focus:ring-accent/20" placeholder="Your signature quote" /></div>
        </div>

        {/* Photo */}
        <div className="bg-white rounded-xl border border-border p-5">
          <ImageUpload value={profile.photo} onChange={(url) => update('photo', url)} label="Profile Photo" />
          <p className="text-[10px] text-text-secondary/50 mt-2">This photo appears in the TopBar, About page, and everywhere your profile is shown.</p>
        </div>

        {/* Bio */}
        <div className="bg-white rounded-xl border border-border p-5">
          <label className="text-xs font-bold text-text-secondary mb-2 block">Bio / About Me</label>
          <textarea value={profile.bio} onChange={e => update('bio', e.target.value)} rows={8}
            className="w-full px-3 py-2.5 border border-border rounded-lg text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-accent/20"
            placeholder="Write your bio here. Each paragraph on a new line. This appears on the About page." />
          <p className="text-[10px] text-text-secondary/50 mt-2">Separate paragraphs with blank lines. Shown on /about page.</p>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-xl border border-border p-5 space-y-4">
          <p className="text-xs font-bold text-text-primary uppercase tracking-wider">Social Links</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label className="text-xs font-bold text-text-secondary mb-1 block">📸 Instagram</label>
              <input value={profile.instagram} onChange={e => update('instagram', e.target.value)} className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20" placeholder="https://instagram.com/..." /></div>
            <div><label className="text-xs font-bold text-text-secondary mb-1 block">🎬 YouTube</label>
              <input value={profile.youtube} onChange={e => update('youtube', e.target.value)} className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20" placeholder="https://youtube.com/..." /></div>
            <div><label className="text-xs font-bold text-text-secondary mb-1 block">💼 LinkedIn</label>
              <input value={profile.linkedin} onChange={e => update('linkedin', e.target.value)} className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20" placeholder="https://linkedin.com/in/..." /></div>
          </div>
          <p className="text-[10px] text-text-secondary/50">These appear in Footer and About page. Leave empty to hide.</p>
        </div>

        {/* Save */}
        <div className="flex items-center gap-4 pb-10">
          <button onClick={handleSave} disabled={saving}
            className="px-8 py-3 bg-accent text-white text-sm font-bold rounded-xl hover:bg-accent-hover disabled:opacity-50 transition-colors">
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
          {saved && <span className="text-green text-sm font-bold">✓ Saved! Changes are live.</span>}
        </div>
      </div>
    </div>
  );
}
