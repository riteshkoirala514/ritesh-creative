'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const adminLinks = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/posts', label: 'Posts', icon: '📝' },
  { href: '/admin/dreams', label: 'Dreams', icon: '✨' },
  { href: '/admin/profile', label: 'Profile', icon: '👤' },
  { href: '/admin/series', label: 'Series', icon: '📚' },
  { href: '/admin/subscribers', label: 'Subscribers', icon: '📬' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-bg-card">
      {/* Admin header */}
      <div className="bg-text-primary text-white">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-extrabold tracking-tighter">RITESH<span className="text-[#DC2626]">.</span>ADMIN</span>
          </div>
          <Link href="/" className="text-xs text-white/50 hover:text-white transition-colors">← Back to site</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Nav tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                pathname === link.href
                  ? 'bg-text-primary text-white'
                  : 'bg-white text-text-secondary hover:bg-bg-elevated border border-border'
              }`}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        {children}
      </div>
    </div>
  );
}
