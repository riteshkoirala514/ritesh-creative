// === Post Formats ===
export type PostFormat = 'article' | 'gallery' | 'video' | 'photo' | 'essay';

// === Categories (fixed, in navbar) ===
export type Category = 'writing' | 'people' | 'places' | 'ideas' | 'create';

export const categoryLabels: Record<Category, string> = {
  writing: 'Writing',
  people: 'People',
  places: 'Places',
  ideas: 'Ideas',
  create: 'Create',
};

export const categoryDescriptions: Record<Category, string> = {
  writing: 'Essays, opinions, observations and personal writing.',
  people: 'Conversations, interviews and stories about people.',
  places: 'Travel, cities, photographs and experiences.',
  ideas: 'Technology, AI, products, business and things I\'m learning.',
  create: 'Photography, video, design, experiments and other creative work.',
};

export const categoryColors: Record<Category, string> = {
  writing: '#FF6B35',
  people: '#DB2777',
  places: '#2563EB',
  ideas: '#7C3AED',
  create: '#059669',
};

// === Media types ===
export interface ImageItem {
  src: string;
  alt?: string;
  caption?: string;
}

export interface VideoMeta {
  url: string;
  duration?: string;
  platform?: 'youtube' | 'vimeo' | 'self';
}

// === Post ===
export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: Category;
  format: PostFormat;
  image: string;
  thumbnail?: string;
  images?: ImageItem[];
  video?: VideoMeta;
  featured?: boolean;
  draft?: boolean;
  series?: string;
  tags?: string[];
  readTime?: string;
  // People-specific
  role?: string;
  location?: string;
  connection?: string;
  peopleType?: 'family' | 'network';
  content: string;
}

// === Series (dynamic collections, NOT in navbar) ===
export interface Series {
  slug: string;
  title: string;
  description: string;
  image: string;
  category?: Category;
}
