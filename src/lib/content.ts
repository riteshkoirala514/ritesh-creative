import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, Category, PostFormat, Series, ImageItem, VideoMeta } from './types';

const contentDirectory = path.join(process.cwd(), 'src/content');
const isDev = process.env.NODE_ENV === 'development';

// === Parse a single MDX file into a Post ===
function parsePost(filePath: string, category: Category, slug: string): Post | null {
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  // Skip drafts in production
  if (data.draft && !isDev) return null;

  // Parse images array
  let images: ImageItem[] | undefined;
  if (Array.isArray(data.images)) {
    images = data.images.map((img: Record<string, string> | string) => {
      if (typeof img === 'string') return { src: img };
      return { src: img.src, alt: img.alt, caption: img.caption };
    });
  }

  // Parse video object
  let video: VideoMeta | undefined;
  if (data.video && typeof data.video === 'object') {
    video = {
      url: data.video.url || '',
      duration: data.video.duration,
      platform: data.video.platform,
    };
  }

  // Parse tags
  let tags: string[] | undefined;
  if (Array.isArray(data.tags)) {
    tags = data.tags.map(String);
  } else if (typeof data.tags === 'string') {
    tags = data.tags.split(',').map((t: string) => t.trim());
  }

  return {
    slug,
    title: data.title || '',
    description: data.description || '',
    date: data.date ? String(data.date) : '',
    category,
    format: (data.format as PostFormat) || 'article',
    image: data.image || '',
    thumbnail: data.thumbnail,
    images,
    video,
    featured: data.featured === true,
    draft: data.draft === true,
    series: data.series,
    tags,
    readTime: data.readTime,
    role: data.role,
    location: data.location,
    connection: data.connection,
    peopleType: data.peopleType || 'network',
    content,
  };
}

// === Get MDX files from a directory ===
function getMDXFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));
}

// === All posts across all categories ===
export function getAllPosts(): Post[] {
  const categories: Category[] = ['writing', 'people', 'places', 'ideas', 'create'];
  const posts: Post[] = [];

  for (const category of categories) {
    const dir = path.join(contentDirectory, category);
    for (const file of getMDXFiles(dir)) {
      const slug = file.replace('.mdx', '');
      const post = parsePost(path.join(dir, file), category, slug);
      if (post) posts.push(post);
    }
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// === Posts by category ===
export function getPostsByCategory(category: Category): Post[] {
  const dir = path.join(contentDirectory, category);
  return getMDXFiles(dir)
    .map((file) => parsePost(path.join(dir, file), category, file.replace('.mdx', '')))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// === Single post by slug ===
export function getPostBySlug(category: Category, slug: string): Post | null {
  return parsePost(path.join(contentDirectory, category, `${slug}.mdx`), category, slug);
}

// === Featured posts ===
export function getFeaturedPosts(): Post[] {
  return getAllPosts().filter((p) => p.featured);
}

// === Latest posts ===
export function getLatestPosts(limit = 10): Post[] {
  return getAllPosts().slice(0, limit);
}

// === Related posts (same category, excluding current) ===
export function getRelatedPosts(currentSlug: string, category: Category, limit = 3): Post[] {
  return getPostsByCategory(category)
    .filter((p) => p.slug !== currentSlug)
    .slice(0, limit);
}

// === Series ===
export function getAllSeries(): Series[] {
  const filePath = path.join(contentDirectory, 'series.json');
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export function getSeriesBySlug(slug: string): Series | null {
  return getAllSeries().find((s) => s.slug === slug) || null;
}

export function getPostsBySeries(seriesSlug: string): Post[] {
  return getAllPosts()
    .filter((p) => p.series === seriesSlug)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // chronological within series
}

// === Posts by format ===
export function getPostsByFormat(format: PostFormat): Post[] {
  return getAllPosts().filter((p) => p.format === format);
}
