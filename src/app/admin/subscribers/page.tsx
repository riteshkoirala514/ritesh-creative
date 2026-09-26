import { getSubscribers } from '@/lib/content';

export default async function AdminSubscribers() {
  const subscribers = await getSubscribers();

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary tracking-tight mb-6">Subscribers ({subscribers.length})</h1>
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {subscribers.length === 0 ? (
          <p className="p-6 text-text-secondary text-sm">No subscribers yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-bg-card border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-bold text-text-secondary">#</th>
                <th className="text-left px-4 py-3 font-bold text-text-secondary">Email</th>
                <th className="text-left px-4 py-3 font-bold text-text-secondary">Date</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s, i) => (
                <tr key={s.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 text-text-secondary">{i + 1}</td>
                  <td className="px-4 py-3 font-medium text-text-primary">{s.email}</td>
                  <td className="px-4 py-3 text-text-secondary">{s.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
