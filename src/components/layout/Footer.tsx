import Link from 'next/link';
import Image from 'next/image';
import { getProfile } from '@/lib/content';
import { FooterMarquee } from './FooterMarquee';

const PLATFORM_ICONS: Record<string, string> = {
  instagram: '📸', youtube: '🎬', linkedin: '💼', twitter: '𝕏', tiktok: '🎵',
  github: '💻', website: '🌐', email: '✉️', facebook: '👤', pinterest: '📌',
  spotify: '🎧', medium: '📝', behance: '🎨', dribbble: '🏀', threads: '🧵', other: '🔗',
};

export default async function Footer() {
  const profile = await getProfile();
  const brandParts = (profile.brand_name || 'RITESH.CREATIVE').split('.');

  return (
    <footer className="pb-24 md:pb-6">
      <FooterMarquee />

      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Image src="/logo.png" alt="R" width={28} height={28} className="rounded" />
              <span className="text-sm font-extrabold tracking-tighter">
                {brandParts[0]}<span style={{color:'#DC2626'}}>.</span>{brandParts.slice(1).join('.')}
              </span>
            </div>
            <p className="text-text-secondary text-xs leading-relaxed max-w-[200px]">{profile.quote || 'Stories, ideas & things worth sharing.'}</p>
          </div>
          <div>
            <p className="label text-text-primary mb-3">Sections</p>
            {['Writing', 'People', 'Places', 'Ideas', 'Create'].map((s) => (
              <Link key={s} href={`/${s.toLowerCase()}`} className="block text-sm text-text-secondary hover:text-accent transition-colors mb-1.5">{s}</Link>
            ))}
          </div>
          <div>
            <p className="label text-text-primary mb-3">More</p>
            <Link href="/series" className="block text-sm text-text-secondary hover:text-accent transition-colors mb-1.5">Series</Link>
            <Link href="/dreams" className="block text-sm text-text-secondary hover:text-accent transition-colors mb-1.5">Dreams</Link>
            <Link href="/letters" className="block text-sm text-text-secondary hover:text-accent transition-colors mb-1.5">Newsletter</Link>
            <Link href="/about" className="block text-sm text-text-secondary hover:text-accent transition-colors mb-1.5">About</Link>
            <Link href="/feed.xml" className="block text-sm text-text-secondary hover:text-accent transition-colors mb-1.5">RSS Feed</Link>
          </div>
          <div>
            <p className="label text-text-primary mb-3">Connect</p>
            {(profile.social_links || []).length > 0 ? (
              (profile.social_links || []).map((link, i) => (
                link.url ? (
                  <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent transition-colors mb-1.5">
                    <span className="text-xs">{PLATFORM_ICONS[link.platform] || '🔗'}</span>
                    <span>{link.label} ↗</span>
                  </a>
                ) : null
              ))
            ) : (
              <p className="text-xs text-text-secondary/40 italic">Set social links in admin</p>
            )}
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border text-xs text-text-secondary">
          © {new Date().getFullYear()} {profile.name}
        </div>
      </div>
    </footer>
  );
}
