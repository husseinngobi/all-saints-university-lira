import { useState, type ReactNode } from "react";
import { Menu } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Logo } from "@/components/site/SiteLayout";
import { DemoBadge } from "./PortalShell";

export type NavItem = { id: string; label: string; icon: LucideIcon };

export function DashShell({ items, active, onSelect, title, footer, children }: { items: NavItem[]; active: string; onSelect: (id: string) => void; title: string; footer?: ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-soft">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-sidebar text-sidebar-foreground transition-transform lg:static lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="border-b border-sidebar-border p-5"><Logo light /></div>
        <p className="eyebrow px-5 pt-5 text-gold">{title}</p>
        <nav className="mt-3 space-y-1 px-3">
          {items.map((i) => (
            <button key={i.id} onClick={() => { onSelect(i.id); setOpen(false); }} className={`flex w-full items-center gap-3 px-3 py-2.5 text-sm ${active === i.id ? "bg-sidebar-accent text-sidebar-accent-foreground border-l-2 border-gold" : "hover:bg-sidebar-accent/60"}`}>
              <i.icon className="h-4 w-4" />{i.label}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 w-full border-t border-sidebar-border p-3">{footer}</div>
      </aside>
      {open && <div className="fixed inset-0 z-30 bg-navy/50 lg:hidden" onClick={() => setOpen(false)} />}
      <div className="min-w-0 flex-1">
        <header className="flex items-center justify-between border-b bg-background px-4 py-3 lg:px-8">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Menu"><Menu /></button>
          <p className="font-semibold text-navy">{items.find((i) => i.id === active)?.label}</p>
          <DemoBadge>Demo data</DemoBadge>
        </header>
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export function Stat({ label, value, sub }: { label: string; value: ReactNode; sub?: string }) {
  return <div className="border bg-background p-5"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-2 font-display text-3xl text-navy">{value}</p>{sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}</div>;
}

const tone: Record<string, string> = {
  Paid: "bg-success/15 text-success", Successful: "bg-success/15 text-success", Approved: "bg-success/15 text-success",
  Pending: "bg-warning/20 text-gold-foreground", "Under Review": "bg-warning/20 text-gold-foreground", "Documents Requested": "bg-warning/20 text-gold-foreground",
  Failed: "bg-destructive/15 text-destructive", Rejected: "bg-destructive/15 text-destructive", Cancelled: "bg-destructive/15 text-destructive",
  Submitted: "bg-royal/15 text-royal",
};
export function StatusBadge({ s }: { s: string }) {
  return <span className={`inline-block whitespace-nowrap px-2 py-0.5 text-xs font-semibold ${tone[s] ?? "bg-muted text-muted-foreground"}`}>{s}</span>;
}
