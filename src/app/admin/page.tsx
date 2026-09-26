import { getAllPostsAdmin, getDreams, getSubscribers, getAllSeries } from '@/lib/content';

export default async function AdminDashboard() {
  const posts = await getAllPostsAdmin();
  const dreams = await getDreams();
  const subscribers = await getSubscribers();
  const series = await getAllSeries();

  const stats = [
    { label: 'Posts', value: posts.length, icon: '📝', color: '#FF4F1A' },
    { label: 'Series', value: series.length, icon: '📚', color: '#1D4ED8' },
    { label: 'Dreams', value: dreams.length, icon: '✨', color: '#FFD700' },
    { label: 'Subscribers', value: subscribers.length, icon: '📬', color: '#047857' },
    { label: 'Dreams Done', value: dreams.filter(d => d.done).length, icon: '✅', color: '#DC2626' },
    { label: 'Drafts', value: posts.filter(p => p.draft).length, icon: '📋', color: '#6D28D9' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary tracking-tight mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-border p-5">
            <span className="text-2xl">{s.icon}</span>
            <p className="text-3xl font-bold mt-2" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs text-text-secondary font-medium mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-bold text-text-primary mb-4">Recent Posts</h2>
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bg-card border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 font-bold text-text-secondary">Title</th>
              <th className="text-left px-4 py-3 font-bold text-text-secondary">Category</th>
              <th className="text-left px-4 py-3 font-bold text-text-secondary">Format</th>
              <th className="text-left px-4 py-3 font-bold text-text-secondary">Date</th>
            </tr>
          </thead>
          <tbody>
            {posts.slice(0, 10).map((post) => (
              <tr key={post.id} className="border-b border-border last:border-0 hover:bg-bg-card/50">
                <td className="px-4 py-3 font-medium text-text-primary">{post.title}</td>
                <td className="px-4 py-3 text-text-secondary">{post.category}</td>
                <td className="px-4 py-3 text-text-secondary">{post.format}</td>
                <td className="px-4 py-3 text-text-secondary">{post.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
