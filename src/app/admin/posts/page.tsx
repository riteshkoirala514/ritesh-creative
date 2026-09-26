'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Post {
  id: number;
  slug: string;
  title: string;
  category: string;
  format: string;
  date: string;
  image: string;
  featured: boolean;
  draft: boolean;
}

export default function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => { fetch('/api/posts').then(r => r.json()).then(setPosts); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this post permanently?')) return;
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    setPosts(posts.filter(p => p.id !== id));
  };

  const filtered = posts.filter(p => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterCat !== 'all' && p.category !== filterCat) return false;
    if (filterStatus === 'draft' && !p.draft) return false;
    if (filterStatus === 'published' && p.draft) return false;
    if (filterStatus === 'featured' && !p.featured) return false;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">Posts ({filtered.length})</h1>
        <Link href="/admin/posts/new" className="px-5 py-2.5 bg-accent text-white text-sm font-bold rounded-xl hover:bg-accent-hover transition-colors">
          + New Post
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-border p-4 mb-6 flex flex-wrap gap-3">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts..."
          className="flex-1 min-w-[200px] px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20" />
        <select value={filterCat} onChange={e => setFilterCat(e.target.value)} className="px-3 py-2 border border-border rounded-lg text-sm">
          <option value="all">All Categories</option>
          <option value="writing">Writing</option><option value="people">People</option><option value="places">Places</option><option value="ideas">Ideas</option><option value="create">Create</option>
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-2 border border-border rounded-lg text-sm">
          <option value="all">All Status</option><option value="published">Published</option><option value="draft">Drafts</option><option value="featured">Featured</option>
        </select>
      </div>

      {/* Posts table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bg-card border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 font-bold text-text-secondary w-12"></th>
              <th className="text-left px-4 py-3 font-bold text-text-secondary">Title</th>
              <th className="text-left px-4 py-3 font-bold text-text-secondary">Category</th>
              <th className="text-left px-4 py-3 font-bold text-text-secondary">Format</th>
              <th className="text-left px-4 py-3 font-bold text-text-secondary">Date</th>
              <th className="text-left px-4 py-3 font-bold text-text-secondary">Status</th>
              <th className="text-right px-4 py-3 font-bold text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((post) => (
              <tr key={post.id} className="border-b border-border last:border-0 hover:bg-bg-card/50">
                <td className="px-4 py-2.5">
                  {post.image && <img src={post.image} alt="" className="w-10 h-10 object-cover rounded-lg" />}
                </td>
                <td className="px-4 py-2.5">
                  <p className="font-bold text-text-primary">{post.title}</p>
                  <p className="text-[10px] text-text-secondary/50 font-mono">/{post.category}/{post.slug}</p>
                </td>
                <td className="px-4 py-2.5 text-text-secondary capitalize">{post.category}</td>
                <td className="px-4 py-2.5 text-text-secondary">{post.format}</td>
                <td className="px-4 py-2.5 text-text-secondary">{post.date?.slice(0, 10)}</td>
                <td className="px-4 py-2.5">
                  {post.draft ? (
                    <span className="text-[10px] font-bold bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Draft</span>
                  ) : post.featured ? (
                    <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded">Featured</span>
                  ) : (
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Published</span>
                  )}
                </td>
                <td className="px-4 py-2.5 text-right whitespace-nowrap">
                  <Link href={`/${post.category}/${post.slug}`} className="text-text-secondary text-xs mr-3 hover:text-text-primary">View</Link>
                  <Link href={`/admin/posts/${post.id}/edit`} className="text-accent text-xs font-bold mr-3 hover:underline">Edit</Link>
                  <button onClick={() => handleDelete(post.id)} className="text-red-500 text-xs font-bold hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-text-secondary">No posts found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
