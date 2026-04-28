import { NavLink } from "react-router-dom";
import { LayoutDashboard, Truck, ShieldAlert, Route, Zap } from "lucide-react";
import { cn } from "../utils/cn";

const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Live Shipments", path: "/shipments", icon: Truck },
  { name: "Risk Monitoring", path: "/risk", icon: ShieldAlert },
  { name: "Route Optimization", path: "/routes", icon: Route },
  { name: "Simulation Mode", path: "/simulation", icon: Zap },
];

export default function Sidebar() {
  return (
    <aside className="w-64 glass-panel border-r border-[var(--color-outline-variant)] flex flex-col z-10">
      <div className="p-6">
        <h1 className="text-xl font-bold tracking-tight text-[var(--color-primary)]">
          Logistics Hub
        </h1>
        <p className="text-[11px] text-[var(--color-outline)] uppercase tracking-[0.05em] mt-1 font-sans font-bold">
          Intelligence Core
        </p>
      </div>
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-[var(--radius-md)] transition-colors text-sm font-medium",
                isActive
                  ? "bg-[var(--color-primary-container)]/20 text-[var(--color-primary)] border border-[var(--color-primary)]/30 shadow-[0_0_15px_rgba(173,198,255,0.15)]"
                  : "text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-bright)] hover:text-[var(--color-on-surface)]"
              )
            }
          >
            <item.icon className="w-4 h-4" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-[var(--color-outline-variant)] flex justify-between items-center data-text text-[13px] text-[var(--color-on-surface-variant)]">
        <span>SYS.STAT</span>
        <span className="text-[var(--color-status-healthy)] flex items-center gap-1.5 font-medium tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-status-healthy)] shadow-[0_0_6px_var(--color-status-healthy)] animate-pulse"></span>
          OPTIMIZED
        </span>
      </div>
    </aside>
  );
}
