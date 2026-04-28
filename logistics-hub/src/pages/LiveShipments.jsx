import { useEffect } from 'react';
import { useStore } from '../store/useStore';

export default function LiveShipments() {
  const { shipments, isLoadingShipments, fetchShipments, error } = useStore();

  useEffect(() => {
    fetchShipments();
  }, []);

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold font-sans">Live Shipments</h2>
      <div className="glass-card rounded-[var(--radius-lg)] overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[var(--color-surface-container-high)] border-b border-[var(--color-outline-variant)]">
            <tr>
              <th className="p-4 font-semibold text-[var(--color-on-surface-variant)] label-text">ID</th>
              <th className="p-4 font-semibold text-[var(--color-on-surface-variant)] label-text">Origin</th>
              <th className="p-4 font-semibold text-[var(--color-on-surface-variant)] label-text">Destination</th>
              <th className="p-4 font-semibold text-[var(--color-on-surface-variant)] label-text">Status</th>
              <th className="p-4 font-semibold text-[var(--color-on-surface-variant)] label-text">ETA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-outline-variant)] data-text">
            {isLoadingShipments ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-[var(--color-on-surface-variant)]">
                  <div className="flex justify-center items-center gap-2">
                    <div className="w-4 h-4 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
                    Loading telemetry...
                  </div>
                </td>
              </tr>
            ) : shipments.length === 0 ? (
               <tr>
                <td colSpan="5" className="p-8 text-center text-[var(--color-on-surface-variant)]">
                  No shipments found.
                </td>
              </tr>
            ) : shipments.map((s) => (
              <tr key={s.id} className="hover:bg-[var(--color-surface-bright)] transition-colors">
                <td className="p-4 text-[var(--color-primary)]">{s.id}</td>
                <td className="p-4">{s.origin}</td>
                <td className="p-4">{s.destination}</td>
                <td className="p-4">
                  <StatusBadge status={s.status} />
                </td>
                <td className="p-4">{new Date(s.eta).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  let colorClass = 'bg-[var(--color-status-healthy)]/10 text-[var(--color-status-healthy)]';
  if (status.toUpperCase() === 'DELAYED') {
    colorClass = 'bg-[var(--color-status-risk)]/10 text-[var(--color-status-risk)]';
  } else if (status.toUpperCase() === 'CRITICAL') {
    colorClass = 'bg-[var(--color-status-critical)]/10 text-[var(--color-status-critical)]';
  }
  return <span className={`px-2 py-1 rounded text-xs ${colorClass}`}>{status.toUpperCase()}</span>;
}
