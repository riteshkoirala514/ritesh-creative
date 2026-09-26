import fs from 'fs';
import path from 'path';
import { Post, Category, PostFormat, Series, ImageItem, VideoMeta } from './types';

const DB_PATH = path.join(process.cwd(), 'data', 'ritesh.db');

// sql.js needs async init — we cache the promise and the instance
let _db: any = null;
let _initPromise: Promise<any> | null = null;

async function initSql() {
  if (_db) return _db;
  if (_initPromise) return _initPromise;

  _initPromise = (async () => {
    // @ts-expect-error sql.js has no types
    const initSqlJs = (await import('sql.js')).default;
    const SQL = await initSqlJs({
      locateFile: () => path.join(process.cwd(), 'public', 'sql-wasm.wasm'),
    });

    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    if (fs.existsSync(DB_PATH)) {
      const buf = fs.readFileSync(DB_PATH);
      _db = new SQL.Database(buf);
    } else {
      _db = new SQL.Database();
    }

    initTables(_db);
    return _db;
  })();

  return _initPromise;
}

function saveDb() {
  if (!_db) return;
  const data = _db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

function initTables(db: any) {
  db.run(`CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT UNIQUE NOT NULL, title TEXT NOT NULL, description TEXT DEFAULT '', content TEXT DEFAULT '', date TEXT DEFAULT '', category TEXT NOT NULL, format TEXT DEFAULT 'article', image TEXT DEFAULT '', thumbnail TEXT, images TEXT, video TEXT, featured INTEGER DEFAULT 0, draft INTEGER DEFAULT 0, series_slug TEXT, tags TEXT, read_time TEXT, role TEXT, location TEXT, connection TEXT, people_type TEXT DEFAULT 'network', created_at TEXT DEFAULT CURRENT_TIMESTAMP, updated_at TEXT DEFAULT CURRENT_TIMESTAMP)`);
  db.run(`CREATE TABLE IF NOT EXISTS dreams (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT NOT NULL, category TEXT NOT NULL DEFAULT 'life', done INTEGER DEFAULT 0, image TEXT, notes TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP)`);
  db.run(`CREATE TABLE IF NOT EXISTS series (id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT UNIQUE NOT NULL, title TEXT NOT NULL, description TEXT DEFAULT '', image TEXT DEFAULT '')`);
  db.run(`CREATE TABLE IF NOT EXISTS profile (id INTEGER PRIMARY KEY DEFAULT 1, name TEXT DEFAULT 'Ritesh Koirala', tagline TEXT DEFAULT 'Writer · Creator · Explorer', quote TEXT DEFAULT 'The most interesting things happen when you stay curious.', bio TEXT DEFAULT '', photo TEXT DEFAULT '', brand_name TEXT DEFAULT 'RITESH.CREATIVE', social_links TEXT DEFAULT '[]', instagram TEXT DEFAULT '', youtube TEXT DEFAULT '', linkedin TEXT DEFAULT '')`);
  db.run(`CREATE TABLE IF NOT EXISTS subscribers (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP)`);
  db.run(`INSERT OR IGNORE INTO profile (id) VALUES (1)`);
  // Migrations — add columns if they don't exist
  try { db.run(`ALTER TABLE profile ADD COLUMN brand_name TEXT DEFAULT 'RITESH.CREATIVE'`); } catch { /* already exists */ }
  try { db.run(`ALTER TABLE profile ADD COLUMN social_links TEXT DEFAULT '[]'`); } catch { /* already exists */ }
  saveDb();
}

function getDbOrThrow(): any {
  if (!_db) throw new Error('DB not ready');
  return _db;
}

function queryAll(sql: string, params: unknown[] = []): Record<string, unknown>[] {
  const db = getDbOrThrow();
  const stmt = db.prepare(sql);
  if (params.length) stmt.bind(params);
  const results: Record<string, unknown>[] = [];
  while (stmt.step()) results.push(stmt.getAsObject() as Record<string, unknown>);
  stmt.free();
  return results;
}

function queryOne(sql: string, params: unknown[] = []): Record<string, unknown> | null {
  const r = queryAll(sql, params);
  return r[0] || null;
}

function runSql(sql: string, params: unknown[] = []) {
  const db = getDbOrThrow();
  db.run(sql, params);
  saveDb();
}

// ==================== ASYNC WRAPPERS (for pages) ====================
// Server components in Next.js can be async, so we init DB in each call

function rowToPost(row: Record<string, unknown>): Post {
  return {
    slug: row.slug as string, title: row.title as string, description: (row.description as string) || '',
    date: (row.date as string) || '', category: row.category as Category, format: (row.format as PostFormat) || 'article',
    image: (row.image as string) || '', thumbnail: row.thumbnail as string | undefined,
    images: row.images ? JSON.parse(row.images as string) as ImageItem[] : undefined,
    video: row.video ? JSON.parse(row.video as string) as VideoMeta : undefined,
    featured: row.featured === 1, draft: row.draft === 1, series: row.series_slug as string | undefined,
    tags: row.tags ? JSON.parse(row.tags as string) as string[] : undefined,
    readTime: row.read_time as string | undefined, role: row.role as string | undefined,
    location: row.location as string | undefined, connection: row.connection as string | undefined,
    peopleType: (row.people_type as 'family' | 'network') || 'network', content: (row.content as string) || '',
  };
}

// All public functions are now async — they init the DB first
export async function getAllPosts(): Promise<Post[]> { await initSql(); return queryAll('SELECT * FROM posts WHERE draft = 0 ORDER BY date DESC').map(rowToPost); }
export async function getPostsByCategory(category: Category): Promise<Post[]> { await initSql(); return queryAll('SELECT * FROM posts WHERE category = ? AND draft = 0 ORDER BY date DESC', [category]).map(rowToPost); }
export async function getPostBySlug(category: Category, slug: string): Promise<Post | null> { await initSql(); const r = queryOne('SELECT * FROM posts WHERE category = ? AND slug = ?', [category, slug]); return r ? rowToPost(r) : null; }
export async function getFeaturedPosts(): Promise<Post[]> { await initSql(); return queryAll('SELECT * FROM posts WHERE featured = 1 AND draft = 0 ORDER BY date DESC').map(rowToPost); }
export async function getLatestPosts(limit = 10): Promise<Post[]> { await initSql(); return queryAll('SELECT * FROM posts WHERE draft = 0 ORDER BY date DESC LIMIT ?', [limit]).map(rowToPost); }
export async function getRelatedPosts(currentSlug: string, category: Category, limit = 3): Promise<Post[]> { await initSql(); return queryAll('SELECT * FROM posts WHERE category = ? AND slug != ? AND draft = 0 ORDER BY date DESC LIMIT ?', [category, currentSlug, limit]).map(rowToPost); }
export async function getPostsBySeries(seriesSlug: string): Promise<Post[]> { await initSql(); return queryAll('SELECT * FROM posts WHERE series_slug = ? AND draft = 0 ORDER BY date ASC', [seriesSlug]).map(rowToPost); }
export async function getPostsByFormat(format: PostFormat): Promise<Post[]> { await initSql(); return queryAll('SELECT * FROM posts WHERE format = ? AND draft = 0 ORDER BY date DESC', [format]).map(rowToPost); }
export async function getPostById(id: number): Promise<Post | null> { await initSql(); const r = queryOne('SELECT * FROM posts WHERE id = ?', [id]); return r ? rowToPost(r) : null; }
export async function getAllPostsAdmin(): Promise<(Post & { id: number })[]> { await initSql(); return queryAll('SELECT * FROM posts ORDER BY date DESC').map(r => ({ ...rowToPost(r), id: r.id as number })); }

export async function createPost(post: Omit<Post, 'content'> & { content: string }) {
  await initSql();
  runSql(`INSERT INTO posts (slug, title, description, content, date, category, format, image, thumbnail, images, video, featured, draft, series_slug, tags, read_time, role, location, connection, people_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [post.slug, post.title, post.description, post.content, post.date, post.category, post.format, post.image, post.thumbnail || null,
     post.images ? JSON.stringify(post.images) : null, post.video ? JSON.stringify(post.video) : null,
     post.featured ? 1 : 0, post.draft ? 1 : 0, post.series || null, post.tags ? JSON.stringify(post.tags) : null,
     post.readTime || null, post.role || null, post.location || null, post.connection || null, post.peopleType || 'network']);
}

export async function updatePost(id: number, data: Record<string, unknown>) { await initSql(); const f = Object.keys(data).map(k => `${k} = ?`).join(', '); runSql(`UPDATE posts SET ${f}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, [...Object.values(data), id]); }
export async function deletePost(id: number) { await initSql(); runSql('DELETE FROM posts WHERE id = ?', [id]); }

// Series
export async function getAllSeries(): Promise<Series[]> { await initSql(); return queryAll('SELECT * FROM series ORDER BY title') as unknown as Series[]; }
export async function getSeriesBySlug(slug: string): Promise<Series | null> { await initSql(); return (queryOne('SELECT * FROM series WHERE slug = ?', [slug]) as unknown as Series) || null; }
export async function createSeries(s: { slug: string; title: string; description: string; image: string }) { await initSql(); runSql('INSERT INTO series (slug, title, description, image) VALUES (?, ?, ?, ?)', [s.slug, s.title, s.description, s.image]); }
export async function updateSeries(id: number, data: Record<string, unknown>) { await initSql(); const f = Object.keys(data).map(k => `${k} = ?`).join(', '); runSql(`UPDATE series SET ${f} WHERE id = ?`, [...Object.values(data), id]); }
export async function deleteSeries(id: number) { await initSql(); runSql('DELETE FROM series WHERE id = ?', [id]); }

// Dreams
export interface Dream { id: number; text: string; category: string; done: boolean; image?: string; notes?: string; created_at: string; }
export async function getDreams(): Promise<Dream[]> { await initSql(); return queryAll('SELECT * FROM dreams ORDER BY done ASC, created_at DESC').map(r => ({ id: r.id as number, text: r.text as string, category: r.category as string, done: r.done === 1, image: r.image as string | undefined, notes: r.notes as string | undefined, created_at: r.created_at as string })); }
export async function createDream(text: string, category: string, image?: string) { await initSql(); runSql('INSERT INTO dreams (text, category, image) VALUES (?, ?, ?)', [text, category, image || null]); }
export async function toggleDream(id: number) { await initSql(); runSql('UPDATE dreams SET done = CASE WHEN done = 0 THEN 1 ELSE 0 END WHERE id = ?', [id]); }
export async function deleteDream(id: number) { await initSql(); runSql('DELETE FROM dreams WHERE id = ?', [id]); }

// Profile
export interface SocialLink { platform: string; url: string; label: string; }
export interface Profile { name: string; tagline: string; quote: string; bio: string; photo: string; brand_name: string; social_links: SocialLink[]; instagram: string; youtube: string; linkedin: string; }
export async function getProfile(): Promise<Profile> {
  await initSql();
  const row = queryOne('SELECT * FROM profile WHERE id = 1');
  const defaults: Profile = { name: 'Ritesh Koirala', tagline: 'Writer · Creator · Explorer', quote: 'The most interesting things happen when you stay curious.', bio: '', photo: '', brand_name: 'RITESH.CREATIVE', social_links: [], instagram: '', youtube: '', linkedin: '' };
  if (!row) return defaults;
  let socialLinks: SocialLink[] = [];
  try { socialLinks = row.social_links ? JSON.parse(row.social_links as string) : []; } catch { socialLinks = []; }
  // Merge old instagram/youtube/linkedin into social_links if social_links is empty
  if (socialLinks.length === 0) {
    if (row.instagram) socialLinks.push({ platform: 'instagram', url: row.instagram as string, label: 'Instagram' });
    if (row.youtube) socialLinks.push({ platform: 'youtube', url: row.youtube as string, label: 'YouTube' });
    if (row.linkedin) socialLinks.push({ platform: 'linkedin', url: row.linkedin as string, label: 'LinkedIn' });
  }
  return { name: (row.name as string) || defaults.name, tagline: (row.tagline as string) || defaults.tagline, quote: (row.quote as string) || defaults.quote, bio: (row.bio as string) || '', photo: (row.photo as string) || '', brand_name: (row.brand_name as string) || defaults.brand_name, social_links: socialLinks, instagram: (row.instagram as string) || '', youtube: (row.youtube as string) || '', linkedin: (row.linkedin as string) || '' };
}
export async function updateProfile(data: Partial<Profile>) { await initSql(); const f = Object.keys(data).map(k => `${k} = ?`).join(', '); runSql(`UPDATE profile SET ${f} WHERE id = 1`, Object.values(data)); }

// Subscribers
export async function addSubscriber(email: string): Promise<boolean> { await initSql(); try { runSql('INSERT INTO subscribers (email) VALUES (?)', [email]); return true; } catch { return false; } }
export async function getSubscribers(): Promise<{ id: number; email: string; created_at: string }[]> { await initSql(); return queryAll('SELECT * FROM subscribers ORDER BY created_at DESC') as { id: number; email: string; created_at: string }[]; }

export async function initDatabase() { await initSql(); }
