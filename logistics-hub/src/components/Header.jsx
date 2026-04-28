import { Bell, Search, UserCircle, Activity } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 glass-panel border-b border-[var(--color-outline-variant)] px-6 flex items-center justify-between z-10 sticky top-0">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-on-surface-variant)]" />
          <input 
            type="text" 
            placeholder="Search shipments, vessels, or alerts..." 
            className="w-full bg-[var(--color-surface-container)] border border-[var(--color-outline-variant)] rounded-[var(--radius-md)] pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-shadow placeholder:text-[var(--color-on-surface-variant)]/50"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-[var(--color-status-healthy)]/10 rounded-full border border-[var(--color-status-healthy)]/20">
          <div className="w-1.5 h-1.5 bg-[var(--color-status-healthy)] rounded-full animate-pulse"></div>
          <span className="text-[10px] font-mono text-[var(--color-status-healthy)] uppercase tracking-wider font-bold">Live Link</span>
        </div>
        <button className="relative p-2 text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)] transition-colors rounded-full hover:bg-[var(--color-surface-bright)]">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--color-error)] rounded-full border-2 border-[var(--color-surface)]"></span>
        </button>
        <div className="h-8 w-px bg-[var(--color-outline-variant)]"></div>
        <div className="flex items-center gap-2 cursor-pointer group">
          <UserCircle className="w-8 h-8 text-[var(--color-primary)]/80 group-hover:text-[var(--color-primary)] transition-colors" />
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-[var(--color-on-surface)]">A. Logistics</p>
            <p className="text-[11px] text-[var(--color-on-surface-variant)] uppercase tracking-wider font-sans font-bold">Global Ops</p>
          </div>
        </div>
      </div>
    </header>
  );
}
