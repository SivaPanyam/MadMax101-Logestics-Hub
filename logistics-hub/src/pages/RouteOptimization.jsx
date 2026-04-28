import { useState } from 'react';
import { optimizeRoute } from '../services/api';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, ShieldCheck, ChevronRight } from 'lucide-react';

export default function RouteOptimization() {
  const [origin, setOrigin] = useState('Shanghai');
  const [destination, setDestination] = useState('Rotterdam');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOptimize = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const res = await optimizeRoute({ origin, destination });
      setResult(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold font-sans">AI Route Optimization</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 glass-card rounded-[var(--radius-lg)] p-6">
          <h3 className="text-sm font-semibold mb-4 text-[var(--color-primary)]">Route Parameters</h3>
          <form onSubmit={handleOptimize} className="space-y-4">
            <div>
              <label className="label-text text-[var(--color-on-surface-variant)] block mb-1">Origin Port</label>
              <select 
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full bg-[var(--color-surface-container)] border border-[var(--color-outline-variant)] rounded p-2 text-sm focus:outline-none focus:border-[var(--color-primary)]"
              >
                <option>Shanghai</option>
                <option>Singapore</option>
                <option>Mumbai</option>
                <option>Los Angeles</option>
              </select>
            </div>
            <div>
              <label className="label-text text-[var(--color-on-surface-variant)] block mb-1">Destination Port</label>
              <select 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-[var(--color-surface-container)] border border-[var(--color-outline-variant)] rounded p-2 text-sm focus:outline-none focus:border-[var(--color-primary)]"
              >
                <option>Rotterdam</option>
                <option>New York</option>
                <option>Los Angeles</option>
              </select>
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full mt-4 px-4 py-2 bg-[var(--color-primary)] text-[var(--color-on-primary)] rounded-[var(--radius-md)] text-sm font-semibold hover:bg-[var(--color-primary-container)] transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Computing...' : 'Calculate Optimal Route'}
            </button>
          </form>
          {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
        </div>

        <div className="lg:col-span-3 space-y-6">
          {result ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Comparison Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RouteCard 
                  type="Current Route" 
                  data={result.current_route} 
                  isOptimized={false} 
                />
                <RouteCard 
                  type="Optimized Route" 
                  data={result.optimized_route} 
                  isOptimized={true} 
                  metrics={result.metrics}
                />
              </div>

              {/* Savings Summary */}
              <div className="glass-card rounded-[var(--radius-lg)] p-6 bg-gradient-to-r from-[var(--color-primary)]/5 to-transparent border-l-4 border-l-[var(--color-primary)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-[var(--color-primary)]" />
                      <div>
                        <p className="text-[10px] uppercase font-bold text-[var(--color-on-surface-variant)]">Time Saved</p>
                        <p className="text-xl font-mono text-[var(--color-primary)]">-{result.metrics.time_saved_hours}h</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-[var(--color-status-healthy)]" />
                      <div>
                        <p className="text-[10px] uppercase font-bold text-[var(--color-on-surface-variant)]">Risk Reduction</p>
                        <p className="text-xl font-mono text-[var(--color-status-healthy)]">{result.metrics.risk_reduction_pct}</p>
                      </div>
                    </div>
                  </div>
                  <button className="px-6 py-2 bg-[var(--color-primary)] text-white rounded font-bold text-sm hover:scale-105 transition-transform">
                    APPLY CHANGES
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-full min-h-[400px] glass-card rounded-[var(--radius-lg)] flex flex-col items-center justify-center text-[var(--color-on-surface-variant)] border-dashed border-2 border-[var(--color-outline-variant)]">
               <div className="w-16 h-16 bg-[var(--color-surface-container)] rounded-full flex items-center justify-center mb-4">
                <ArrowRight className="w-8 h-8 opacity-20" />
               </div>
               <p className="data-text">Select origin and destination to begin AI analysis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RouteCard({ type, data, isOptimized, metrics }) {
  return (
    <div className={`glass-card rounded-[var(--radius-lg)] p-5 border ${isOptimized ? 'border-[var(--color-primary)]/40 bg-[var(--color-primary)]/5' : 'border-[var(--color-outline-variant)]/30'}`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h4 className={`text-xs font-bold uppercase tracking-widest ${isOptimized ? 'text-[var(--color-primary)]' : 'text-[var(--color-on-surface-variant)]'}`}>
            {type}
          </h4>
          <p className="text-lg font-mono mt-1">{data.estimated_time_hours} Hours</p>
        </div>
        <div className={`px-2 py-1 rounded text-[10px] font-bold ${data.risk_level === 'Low' ? 'bg-[var(--color-status-healthy)]/20 text-[var(--color-status-healthy)]' : 'bg-[var(--color-status-critical)]/20 text-[var(--color-status-critical)]'}`}>
          {data.risk_level} RISK
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-[10px] uppercase font-bold text-[var(--color-on-surface-variant)]">Waypoint Sequence</p>
        <div className="flex flex-wrap items-center gap-2">
          {data.path.map((node, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className={`text-xs font-mono px-2 py-1 rounded ${isOptimized ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'bg-[var(--color-surface-container)]'}`}>
                {node}
              </span>
              {i < data.path.length - 1 && <ChevronRight className="w-3 h-3 opacity-30" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
