import { getProfile } from '@/lib/content';

export default async function Signature() {
  const profile = await getProfile();
  const initials = profile.name ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'R';

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 border-t border-border">
      <div className="flex items-center gap-4">
        {profile.photo ? (
          <img src={profile.photo} alt={profile.name} className="w-11 h-11 rounded-full object-cover border border-border" />
        ) : (
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FFD700] to-[#DC2626] flex items-center justify-center">
            <span className="text-white text-sm font-bold">{initials}</span>
          </div>
        )}
        <div>
          <p className="text-sm font-bold text-text-primary">{profile.name}</p>
          <p className="text-xs text-text-secondary">{profile.tagline}</p>
        </div>
      </div>
    </div>
  );
}
