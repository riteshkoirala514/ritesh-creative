import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, 'data', 'ritesh.db');
const contentDir = path.join(__dirname, 'src/content');

if (!fs.existsSync(path.join(__dirname, 'data'))) fs.mkdirSync(path.join(__dirname, 'data'));

const SQL = await initSqlJs();
const db = new SQL.Database();

db.run(`
  CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT UNIQUE NOT NULL, title TEXT NOT NULL, description TEXT DEFAULT '', content TEXT DEFAULT '', date TEXT DEFAULT '', category TEXT NOT NULL, format TEXT DEFAULT 'article', image TEXT DEFAULT '', thumbnail TEXT, images TEXT, video TEXT, featured INTEGER DEFAULT 0, draft INTEGER DEFAULT 0, series_slug TEXT, tags TEXT, read_time TEXT, role TEXT, location TEXT, connection TEXT, people_type TEXT DEFAULT 'network', created_at TEXT DEFAULT CURRENT_TIMESTAMP, updated_at TEXT DEFAULT CURRENT_TIMESTAMP);
  CREATE TABLE IF NOT EXISTS dreams (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT NOT NULL, category TEXT NOT NULL DEFAULT 'life', done INTEGER DEFAULT 0, image TEXT, notes TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
  CREATE TABLE IF NOT EXISTS series (id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT UNIQUE NOT NULL, title TEXT NOT NULL, description TEXT DEFAULT '', image TEXT DEFAULT '');
  CREATE TABLE IF NOT EXISTS profile (id INTEGER PRIMARY KEY DEFAULT 1, name TEXT DEFAULT 'Ritesh Koirala', tagline TEXT DEFAULT 'Writer · Creator · Explorer', quote TEXT DEFAULT 'The most interesting things happen when you stay curious.', bio TEXT DEFAULT '', photo TEXT DEFAULT '', instagram TEXT DEFAULT '', youtube TEXT DEFAULT '', linkedin TEXT DEFAULT '');
  CREATE TABLE IF NOT EXISTS subscribers (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
  INSERT OR IGNORE INTO profile (id) VALUES (1);
`);

console.log('🌱 Seeding database...');

const categories = ['writing', 'people', 'places', 'ideas', 'create'];
let count = 0;

for (const cat of categories) {
  const dir = path.join(contentDir, cat);
  if (!fs.existsSync(dir)) continue;
  for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.mdx'))) {
    const { data, content } = matter(fs.readFileSync(path.join(dir, file), 'utf-8'));
    const slug = file.replace('.mdx', '');
    let tags = null;
    if (Array.isArray(data.tags)) tags = JSON.stringify(data.tags.map(String));
    else if (typeof data.tags === 'string') tags = JSON.stringify(data.tags.split(',').map(t => t.trim()));

    db.run(
      `INSERT OR REPLACE INTO posts (slug, title, description, content, date, category, format, image, thumbnail, images, video, featured, draft, series_slug, tags, read_time, role, location, connection, people_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [slug, data.title || slug, data.description || '', content, data.date ? String(data.date) : '', cat, data.format || 'article', data.image || '', data.thumbnail || null,
       data.images ? JSON.stringify(data.images) : null, data.video ? JSON.stringify(data.video) : null,
       data.featured ? 1 : 0, data.draft ? 1 : 0, data.series || null, tags, data.readTime || null,
       data.role || null, data.location || null, data.connection || null, data.peopleType || 'network']
    );
    count++;
    console.log(`  ✓ ${cat}/${slug}`);
  }
}

// Series
const seriesFile = path.join(contentDir, 'series.json');
if (fs.existsSync(seriesFile)) {
  for (const s of JSON.parse(fs.readFileSync(seriesFile, 'utf-8'))) {
    db.run('INSERT OR REPLACE INTO series (slug, title, description, image) VALUES (?, ?, ?, ?)', [s.slug, s.title, s.description, s.image]);
    console.log(`  ✓ series: ${s.slug}`);
  }
}

// Dreams
const dreams = [
  ['Watch sunrise at Machu Picchu', 'places'], ['Walk the streets of Tokyo at 3 AM', 'places'],
  ['Northern lights in Iceland', 'places'], ['Live in New York for a month', 'places'],
  ['Road trip across Italy', 'places'], ['Build a product used by 10,000 people', 'build'],
  ['Launch a newsletter with 1,000 subscribers', 'build'], ['Create a short film', 'create'],
  ['Build this website', 'build'], ['Start a podcast', 'build'], ['Write a book', 'create'],
  ['Photo exhibition', 'create'], ['365-day photo project', 'create'],
  ['Learn to surf', 'life'], ['Run a marathon', 'life'], ['Learn a third language', 'life'],
  ['Own a cabin in the mountains', 'life'], ['Mentor 10 people', 'life'],
];
for (const [text, cat] of dreams) db.run('INSERT INTO dreams (text, category) VALUES (?, ?)', [text, cat]);
db.run("UPDATE dreams SET done = 1 WHERE text IN ('Walk the streets of Tokyo at 3 AM', 'Build this website')");

// Save
const data = db.export();
fs.writeFileSync(DB_PATH, Buffer.from(data));
db.close();

console.log(`\n✅ Seeded ${count} posts, ${dreams.length} dreams`);
console.log('📁 Database at: data/ritesh.db');
