import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Ship, AlertTriangle, Clock, Navigation } from 'lucide-react';
import MapView from '../components/MapView';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { 
    metrics, 
    fetchMetrics, 
    isLoadingMetrics, 
    shipments, 
    fetchShipments 
  } = useStore();

  useEffect(() => {
    fetchMetrics();
    fetchShipments();
  }, [fetchMetrics, fetchShipments]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoadingMetrics ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="h-32 glass-panel rounded-[var(--radius-lg)] animate-pulse bg-[var(--color-surface-container)]"></div>
          ))
        ) : (
          <>
            <MetricCard 
              title="Total Shipments" 
              value={metrics.total_active_shipments} 
              icon={Ship}
              trend="+4.2%"
            />
            <MetricCard 
              title="Critical Alerts" 
              value={metrics.critical_alerts} 
              icon={AlertTriangle}
              status="critical"
            />
            <MetricCard 
              title="On-Time Rate" 
              value={`${metrics.on_time_percentage || 94}%`}
              icon={Clock}
              status="healthy"
            />
            <MetricCard 
              title="Active Vessels" 
              value={metrics.vessels_at_sea || 892} 
              icon={Navigation}
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[500px]">
          <MapView shipments={shipments} />
        </div>
        <div className="lg:col-span-1 space-y-4">
           <div className="glass-panel rounded-[var(--radius-lg)] p-5">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-on-surface-variant)] mb-4">Quick Analysis</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs">Port Efficiency</span>
                  <span className="text-xs font-mono font-bold text-[var(--color-status-healthy)]">8.4 / 10</span>
                </div>
                <div className="w-full bg-[var(--color-surface-container)] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[var(--color-status-healthy)] h-full w-[84%]"></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs">Fleet Utilization</span>
                  <span className="text-xs font-mono font-bold text-[var(--color-primary)]">92%</span>
                </div>
                <div className="w-full bg-[var(--color-surface-container)] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[var(--color-primary)] h-full w-[92%]"></div>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, trend, status }) {
  const statusColor = status === 'critical' ? 'text-[var(--color-status-critical)]' : 
                      status === 'healthy' ? 'text-[var(--color-status-healthy)]' : 
                      'text-[var(--color-primary)]';
  
  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass-panel p-5 rounded-[var(--radius-lg)] relative overflow-hidden"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-on-surface-variant)]">{title}</p>
          <h3 className={`text-2xl font-mono mt-2 font-bold ${statusColor}`}>{value}</h3>
        </div>
        <div className={`p-2 rounded-lg bg-[var(--color-surface-bright)] ${statusColor}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      {trend && (
        <p className="text-[10px] mt-4 font-bold text-[var(--color-status-healthy)]">{trend} <span className="opacity-50 text-[var(--color-on-surface)]">vs last month</span></p>
      )}
    </motion.div>
  );
}
