import { useState } from 'react';
import { runSimulation } from '../services/api';
import { motion } from 'framer-motion';
import { Play, Wind, Activity, MapPin, AlertTriangle } from 'lucide-react';

export default function SimulationMode() {
  const [weather, setWeather] = useState(0.5);
  const [traffic, setTraffic] = useState(0.5);
  const [region, setRegion] = useState('Global');
  const [scenario, setScenario] = useState('Cyber Attack on Port Systems');
  const [isLoading, setIsLoading] = useState(false);
  const [lastIncident, setLastIncident] = useState(null);

  const handleRun = async () => {
    setIsLoading(true);
    try {
      const res = await runSimulation({
        scenario,
        parameters: {
          weather_severity: weather,
          traffic_level: traffic,
          region
        }
      });
      setLastIncident(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
      {/* Control Panel */}
      <div className="xl:col-span-1 glass-card rounded-[var(--radius-lg)] p-8 flex flex-col">
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">Simulated Stress Test</h2>
          <p className="text-sm text-[var(--color-on-surface-variant)]">Model global disruptions and monitor cascade effects.</p>
        </div>

        <div className="space-y-8 flex-1">
          {/* Scenario Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">Disruption Scenario</label>
            <input 
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
              className="w-full bg-[var(--color-surface-container)] border border-[var(--color-outline-variant)] rounded p-3 text-sm focus:outline-none focus:border-[var(--color-primary)]"
              placeholder="e.g. Typhoon 'Mawar' Impact"
            />
          </div>

          {/* Region Select */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] flex items-center gap-2">
              <MapPin className="w-3 h-3" /> Target Region
            </label>
            <select 
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full bg-[var(--color-surface-container)] border border-[var(--color-outline-variant)] rounded p-3 text-sm focus:outline-none focus:border-[var(--color-primary)]"
            >
              <option>Global</option>
              <option>Pacific Rim</option>
              <option>South East Asia</option>
              <option>North Atlantic</option>
              <option>Suez Canal</option>
            </select>
          </div>

          {/* Weather Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] flex items-center gap-2">
                <Wind className="w-3 h-3" /> Weather Severity
              </label>
              <span className="text-xs font-mono font-bold">{(weather * 100).toFixed(0)}%</span>
            </div>
            <input 
              type="range" min="0" max="1" step="0.1" 
              value={weather}
              onChange={(e) => setWeather(parseFloat(e.target.value))}
              className="w-full h-1 bg-[var(--color-surface-container)] rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)]"
            />
          </div>

          {/* Traffic Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] flex items-center gap-2">
                <Activity className="w-3 h-3" /> Traffic Congestion
              </label>
              <span className="text-xs font-mono font-bold">{(traffic * 100).toFixed(0)}%</span>
            </div>
            <input 
              type="range" min="0" max="1" step="0.1" 
              value={traffic}
              onChange={(e) => setTraffic(parseFloat(e.target.value))}
              className="w-full h-1 bg-[var(--color-surface-container)] rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)]"
            />
          </div>
        </div>

        <button 
          onClick={handleRun}
          disabled={isLoading}
          className="w-full mt-8 py-4 bg-gradient-to-r from-[var(--color-status-critical)] to-[var(--color-error)] text-white rounded-[var(--radius-lg)] font-bold text-lg flex items-center justify-center gap-3 hover:brightness-110 transition-all shadow-lg shadow-red-500/20 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <><Play className="fill-current" /> EXECUTE PROTOCOL</>
          )}
        </button>
      </div>

      {/* Monitor Display */}
      <div className="xl:col-span-2 space-y-6">
        <div className="glass-card rounded-[var(--radius-lg)] p-8 h-full flex flex-col border-dashed border-2 border-[var(--color-outline-variant)]">
          {!lastIncident ? (
             <div className="m-auto text-center space-y-4 opacity-30">
                <Wind className="w-24 h-24 mx-auto" />
                <p className="text-lg font-bold">Awaiting Simulation Parameters</p>
                <p className="text-sm">Configure disruption variables to start real-time monitoring.</p>
             </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
               <div className="flex items-center gap-4 text-[var(--color-status-critical)]">
                  <div className="w-3 h-3 bg-[var(--color-status-critical)] rounded-full animate-ping"></div>
                  <h3 className="text-xl font-bold uppercase tracking-tighter">Real-Time Impact Stream</h3>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[var(--color-surface-container)] rounded-[var(--radius-lg)] p-6">
                    <p className="text-xs font-bold text-[var(--color-on-surface-variant)] uppercase mb-2">Impacted Assets</p>
                    <p className="text-4xl font-mono">{lastIncident.affected_shipments_count}</p>
                    <p className="text-xs mt-2 text-[var(--color-status-critical)] font-bold">Telemetry spike detected</p>
                  </div>
                  <div className="bg-[var(--color-surface-container)] rounded-[var(--radius-lg)] p-6">
                    <p className="text-xs font-bold text-[var(--color-on-surface-variant)] uppercase mb-2">Broadcast Status</p>
                    <p className="text-4xl font-mono text-[var(--color-status-healthy)]">ACTIVE</p>
                    <p className="text-xs mt-2 text-[var(--color-on-surface-variant)]">Pushing WebSocket updates...</p>
                  </div>
               </div>

               <div className="bg-[var(--color-status-critical)]/10 border border-[var(--color-status-critical)]/20 rounded-[var(--radius-lg)] p-6">
                  <div className="flex gap-4">
                    <AlertTriangle className="w-8 h-8 text-[var(--color-status-critical)] shrink-0" />
                    <div>
                       <p className="text-xs font-bold uppercase text-[var(--color-status-critical)]">Last Broadcasted Alert</p>
                       <p className="text-lg font-bold mt-1">{lastIncident.new_alert.message}</p>
                       <p className="text-xs font-mono mt-2 opacity-50">{lastIncident.new_alert.timestamp}</p>
                    </div>
                  </div>
               </div>

               <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-on-surface-variant)]">Affected Shipment IDs</p>
                  <div className="flex flex-wrap gap-2">
                    {lastIncident.updates.slice(0, 15).map(u => (
                      <span key={u.id} className="text-[10px] font-mono px-2 py-1 bg-[var(--color-surface-bright)] border border-[var(--color-outline-variant)] rounded">
                        {u.id}
                      </span>
                    ))}
                    {lastIncident.updates.length > 15 && <span className="text-[10px] font-mono p-1">+{lastIncident.updates.length - 15} more...</span>}
                  </div>
               </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
