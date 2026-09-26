import { getAllPosts, getProfile } from '@/lib/content';

const BASE_URL = 'https://ritesh.win';

export async function GET() {
  const [posts, profile] = await Promise.all([getAllPosts(), getProfile()]);
  const feedPosts = posts.slice(0, 50);
  const brandName = profile.brand_name || 'ritesh.creative';
  const feedDesc = profile.quote || 'Stories, ideas & things worth sharing.';

  const items = feedPosts.map((post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${BASE_URL}/${post.category}/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/${post.category}/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${post.category}</category>
      ${post.image ? `<enclosure url="${post.image.replace(/&/g, '&amp;')}" type="image/jpeg" />` : ''}
    </item>`).join('');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${brandName}</title>
    <description>${feedDesc.replace(/&/g, '&amp;')}</description>
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
