import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Logo } from "@/components/site/SiteLayout";

export function DemoBadge({ children = "Demo only" }: { children?: ReactNode }) {
  return <span className="inline-flex items-center rounded-sm bg-gold px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-gold-foreground">{children}</span>;
}

export function PortalShell({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return (
    <div className="min-h-screen bg-soft">
      <header className="border-b bg-background print:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="hidden border-l pl-4 text-sm font-semibold text-navy sm:block">Admissions Portal</span>
            <DemoBadge>Demo</DemoBadge>
          </div>
          <div className="flex items-center gap-4 text-sm">
            {right}
            <Link to="/" className="text-muted-foreground hover:text-royal">← Main website</Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="py-8 text-center text-xs text-muted-foreground print:hidden">
        Demonstration prototype — no real accounts, documents or payments are processed.
      </footer>
    </div>
  );
}

export function AuthCard({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="mx-auto grid max-w-5xl overflow-hidden border bg-background md:my-12 md:grid-cols-2">
      <div className="hidden flex-col justify-between bg-navy p-10 text-navy-foreground md:flex">
        <div>
          <p className="eyebrow text-gold">All Saints University Lira</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight">Your future starts with a single step.</h2>
        </div>
        <p className="text-sm opacity-70">Need help? admissions@asul.example (placeholder)</p>
      </div>
      <div className="p-8 md:p-12">
        <h1 className="text-3xl font-semibold text-navy">{title}</h1>
        <p className="mt-2 text-muted-foreground">{subtitle}</p>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
