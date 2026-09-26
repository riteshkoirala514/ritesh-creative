import { getAllPosts } from '@/lib/content';

const BASE_URL = 'https://ritesh.creative';

export async function GET() {
  const posts = getAllPosts().slice(0, 50);

  const items = posts.map((post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${BASE_URL}/${post.category}/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/${post.category}/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${post.category}</category>
      ${post.image ? `<enclosure url="${post.image}" type="image/jpeg" />` : ''}
    </item>`).join('');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ritesh.creative</title>
    <description>Stories, ideas &amp; things worth sharing.</description>
    <link>${BASE_URL}</link>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
