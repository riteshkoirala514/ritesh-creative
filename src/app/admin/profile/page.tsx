'use client';

import { useState, useEffect } from 'react';

export default function AdminProfile() {
  const [profile, setProfile] = useState({ name: '', tagline: '', quote: '', bio: '', photo: '', instagram: '', youtube: '', linkedin: '' });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { fetch('/api/profile').then(r => r.json()).then(setProfile); }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/profile', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(profile) });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary tracking-tight mb-6">Profile</h1>
      <div className="bg-white rounded-xl border border-border p-6 space-y-4 max-w-2xl">
        <div><label className="block text-xs font-bold text-text-secondary mb-1">Name</label><input value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg text-sm" /></div>
        <div><label className="block text-xs font-bold text-text-secondary mb-1">Tagline</label><input value={profile.tagline} onChange={e => setProfile({...profile, tagline: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg text-sm" /></div>
        <div><label className="block text-xs font-bold text-text-secondary mb-1">Quote</label><input value={profile.quote} onChange={e => setProfile({...profile, quote: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg text-sm" /></div>
        <div><label className="block text-xs font-bold text-text-secondary mb-1">Photo URL</label><input value={profile.photo} onChange={e => setProfile({...profile, photo: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg text-sm" placeholder="https://..." /></div>
        <div><label className="block text-xs font-bold text-text-secondary mb-1">Bio</label><textarea value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} rows={6} className="w-full px-3 py-2 border border-border rounded-lg text-sm" /></div>
        <div className="grid grid-cols-3 gap-4">
          <div><label className="block text-xs font-bold text-text-secondary mb-1">Instagram</label><input value={profile.instagram} onChange={e => setProfile({...profile, instagram: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg text-sm" /></div>
          <div><label className="block text-xs font-bold text-text-secondary mb-1">YouTube</label><input value={profile.youtube} onChange={e => setProfile({...profile, youtube: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg text-sm" /></div>
          <div><label className="block text-xs font-bold text-text-secondary mb-1">LinkedIn</label><input value={profile.linkedin} onChange={e => setProfile({...profile, linkedin: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg text-sm" /></div>
        </div>
        <div className="pt-4 flex items-center gap-3">
          <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 bg-accent text-white text-sm font-bold rounded-xl hover:bg-accent-hover disabled:opacity-50 transition-colors">
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
          {saved && <span className="text-green text-sm font-bold">✓ Saved!</span>}
        </div>
      </div>
    </div>
  );
}
