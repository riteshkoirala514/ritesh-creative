import { getSubscribers } from '@/lib/content';

export const dynamic = 'force-dynamic';

export default async function AdminSubscribers() {
  const subscribers = await getSubscribers();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">Subscribers ({subscribers.length})</h1>
        {subscribers.length > 0 && (
          <a
            href={`data:text/csv;charset=utf-8,Email,Date\n${subscribers.map(s => `${s.email},${s.created_at}`).join('\n')}`}
            download="subscribers.csv"
            className="px-4 py-2 bg-text-primary text-white text-sm font-bold rounded-xl hover:bg-text-primary/90 transition-colors"
          >
            Export CSV
          </a>
        )}
      </div>
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {subscribers.length === 0 ? (
          <p className="p-6 text-text-secondary text-sm">No subscribers yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-bg-card border-b border-border">
              <tr><th className="text-left px-4 py-3 font-bold text-text-secondary">#</th><th className="text-left px-4 py-3 font-bold text-text-secondary">Email</th><th className="text-left px-4 py-3 font-bold text-text-secondary">Date</th></tr>
            </thead>
            <tbody>
              {subscribers.map((s, i) => (
                <tr key={s.id} className="border-b border-border last:border-0"><td className="px-4 py-3 text-text-secondary">{i + 1}</td><td className="px-4 py-3 font-medium text-text-primary">{s.email}</td><td className="px-4 py-3 text-text-secondary">{s.created_at}</td></tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
