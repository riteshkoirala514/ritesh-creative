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
  featured: boolean;
  draft: boolean;
}

export default function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('/api/posts').then(r => r.json()).then(setPosts);
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this post?')) return;
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    setPosts(posts.filter(p => p.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">Posts</h1>
        <Link href="/admin/posts/new" className="px-4 py-2 bg-accent text-white text-sm font-bold rounded-xl hover:bg-accent-hover transition-colors">
          + New Post
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bg-card border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 font-bold text-text-secondary">Title</th>
              <th className="text-left px-4 py-3 font-bold text-text-secondary">Category</th>
              <th className="text-left px-4 py-3 font-bold text-text-secondary">Format</th>
              <th className="text-left px-4 py-3 font-bold text-text-secondary">Date</th>
              <th className="text-left px-4 py-3 font-bold text-text-secondary">Status</th>
              <th className="text-right px-4 py-3 font-bold text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-border last:border-0 hover:bg-bg-card/50">
                <td className="px-4 py-3 font-medium text-text-primary">{post.title}</td>
                <td className="px-4 py-3 text-text-secondary">{post.category}</td>
                <td className="px-4 py-3 text-text-secondary">{post.format}</td>
                <td className="px-4 py-3 text-text-secondary">{post.date?.slice(0, 10)}</td>
                <td className="px-4 py-3">
                  {post.draft ? (
                    <span className="text-[10px] font-bold bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Draft</span>
                  ) : post.featured ? (
                    <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded">Featured</span>
                  ) : (
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Published</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/posts/${post.id}/edit`} className="text-accent text-xs font-bold mr-3 hover:underline">Edit</Link>
                  <button onClick={() => handleDelete(post.id)} className="text-red-500 text-xs font-bold hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
