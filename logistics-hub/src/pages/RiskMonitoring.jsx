import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { ShieldAlert, BrainCircuit, Zap, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RiskMonitoring() {
  const { alerts, isLoadingAlerts, fetchAlerts, error } = useStore();

  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold font-sans">Risk Monitoring & AI Analysis</h2>
        <div className="flex items-center gap-2 px-3 py-1 bg-[var(--color-primary)]/10 rounded-full border border-[var(--color-primary)]/20">
          <BrainCircuit className="w-4 h-4 text-[var(--color-primary)]" />
          <span className="text-xs font-mono text-[var(--color-primary)]">AI CO-PILOT ACTIVE</span>
        </div>
      </div>

      {error && <div className="text-red-500">Error: {error}</div>}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-on-surface-variant)]">Active Threat Stream</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isLoadingAlerts ? (
              <div className="glass-card rounded-[var(--radius-lg)] p-6 text-center text-[var(--color-on-surface-variant)] col-span-full">
                Scanning for threats...
              </div>
            ) : alerts.map((alert, index) => (
              <motion.div 
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-[var(--radius-lg)] p-6 flex flex-col justify-between border-l-4 border-l-transparent hover:border-l-[var(--color-primary)] transition-all"
              >
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <ShieldAlert className={getIconColor(alert.severity)} />
                    <h3 className={`text-lg font-semibold ${getIconColor(alert.severity)}`}>{alert.id}</h3>
                  </div>
                  <p className="text-sm text-[var(--color-on-surface-variant)] leading-relaxed mb-6">
                    {alert.message}
                  </p>
                </div>
                {alert.severity === 'critical' && (
                  <button className="w-full px-4 py-2 bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] rounded-[var(--radius-md)] text-sm font-semibold hover:bg-[var(--color-primary)] hover:text-[var(--color-surface)] transition-colors">
                    Execute Rerouting Protocol
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-on-surface-variant)]">AI Insights</h3>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-[var(--radius-lg)] p-6 border border-[var(--color-primary)]/30 bg-gradient-to-br from-[var(--color-surface-container-high)] to-[var(--color-surface)]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[var(--color-primary)]/20 rounded-lg text-[var(--color-primary)]">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-bold">Predicted Impact</h4>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[var(--color-on-surface-variant)]">Revenue at Risk</span>
                <span className="font-mono text-[var(--color-status-critical)]">$1.2M</span>
              </div>
              <div className="w-full bg-[var(--color-surface-container)] h-1 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '65%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="bg-[var(--color-status-critical)] h-full"
                ></motion.div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[var(--color-on-surface-variant)]">Supply Chain Drag</span>
                <span className="font-mono text-[var(--color-status-risk)]">+12.4%</span>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-[var(--color-outline-variant)]">
              <h4 className="text-xs font-bold uppercase mb-4 flex items-center gap-2">
                <TrendingDown className="w-3 h-3" /> Recommended Actions
              </h4>
              <ul className="text-xs space-y-3 text-[var(--color-on-surface-variant)]">
                <li className="flex gap-2">
                  <span className="text-[var(--color-primary)] font-bold">01</span>
                  Trigger contingency route 4B via Panama Canal.
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--color-primary)] font-bold">02</span>
                  Advise client on 48h delay for SHP-9013.
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function getIconColor(severity) {
  switch(severity.toLowerCase()) {
    case 'critical': return 'text-[var(--color-status-critical)]';
    case 'medium': return 'text-[var(--color-status-risk)]';
    default: return 'text-[var(--color-primary)]';
  }
}
