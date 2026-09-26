'use client';

import Link from 'next/link';
import { categoryLabels, categoryColors } from '@/lib/types';
import type { Category } from '@/lib/types';

interface PostCardProps {
  post: {
    slug: string;
    title: string;
    description: string;
    date: string;
    category: Category;
    image: string;
    format?: string;
  };
  size?: 'default' | 'large';
}

export default function PostCard({ post, size = 'default' }: PostCardProps) {
  const color = categoryColors[post.category];
  const isLarge = size === 'large';

  return (
    <Link
      href={`/${post.category}/${post.slug}`}
      className="group block bg-white rounded-xl overflow-hidden border border-border hover:border-border-hover card-hover"
    >
      <div className={`overflow-hidden ${isLarge ? 'aspect-[16/10]' : 'aspect-[3/2]'}`}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3">
          <span className="label text-[10px]" style={{ color }}>{categoryLabels[post.category]}</span>
          {post.format && post.format !== 'article' && (
            <span className="label text-[10px] text-text-secondary/50">{post.format}</span>
          )}
        </div>
        <h3 className={`font-bold text-text-primary mt-2 group-hover:text-accent transition-colors duration-150 tracking-tight leading-snug ${isLarge ? 'headline-md' : 'text-lg'}`}>
          {post.title}
        </h3>
        <p className="text-text-secondary text-sm mt-1.5 leading-relaxed line-clamp-2">
          {post.description}
        </p>
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
          <span className="text-[11px] text-text-secondary/60 font-medium">
            {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
          <span className="text-[11px] text-accent font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Read →
          </span>
        </div>
      </div>
    </Link>
  );
}
