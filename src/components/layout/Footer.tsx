import Link from 'next/link';
import Image from 'next/image';
import { getProfile } from '@/lib/content';

export default async function Footer() {
  const profile = await getProfile();

  return (
    <footer className="pb-24 md:pb-6">
      {/* Marquee — shown via client wrapper */}
      <FooterMarquee />

      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Image src="/logo.png" alt="R" width={28} height={28} className="rounded" />
              <span className="text-sm font-extrabold tracking-tighter">RITESH<span style={{color:'#DC2626'}}>.</span>CREATIVE</span>
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
            {profile.instagram && (
              <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="block text-sm text-text-secondary hover:text-accent transition-colors mb-1.5">Instagram ↗</a>
            )}
            {profile.youtube && (
              <a href={profile.youtube} target="_blank" rel="noopener noreferrer" className="block text-sm text-text-secondary hover:text-accent transition-colors mb-1.5">YouTube ↗</a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="block text-sm text-text-secondary hover:text-accent transition-colors mb-1.5">LinkedIn ↗</a>
            )}
            {!profile.instagram && !profile.youtube && !profile.linkedin && (
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

// Client component for marquee (needs usePathname)
import { FooterMarquee } from './FooterMarquee';
