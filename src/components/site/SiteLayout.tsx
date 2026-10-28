import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, ChevronRight, Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { useDemo } from "@/lib/demo-store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/academics", label: "Academics" },
  { to: "/admissions", label: "Admissions" },
  { to: "/research", label: "Research & Innovation" },
  { to: "/campus-life", label: "Campus Life" },
  { to: "/news", label: "News & Events" },
  { to: "/contact", label: "Contact" },
] as const;

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3">
      <span className={`grid h-11 w-11 place-items-center border-2 border-gold font-display text-lg font-bold ${light ? "text-gold" : "bg-navy text-gold"}`}>
        AS
      </span>
      <span className="leading-tight">
        <span className={`block font-display text-lg font-semibold ${light ? "text-navy-foreground" : "text-navy"}`}>All Saints University</span>
        <span className={`eyebrow block !text-[0.62rem] ${light ? "text-gold" : "text-muted-foreground"}`}>Lira · Uganda</span>
      </span>
    </Link>
  );
}

function AnnouncementBar() {
  const { announcement } = useDemo();
  return (
    <div className="bg-navy text-navy-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2 text-center text-xs sm:text-sm">
        <span className="hidden rounded-sm bg-gold px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-gold-foreground sm:inline">Notice</span>
        <span className="opacity-90">{announcement}</span>
        <Link to="/portal" className="hidden items-center font-semibold text-gold hover:underline sm:inline-flex">
          Apply <ChevronRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40">
      <AnnouncementBar />
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
          <Logo />
          <nav className="hidden items-center gap-5 xl:flex">
            {navItems.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-royal data-[status=active]:text-royal"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-2 xl:flex">
            <Button asChild variant="outline" size="sm" className="rounded-sm border-navy text-navy">
              <Link to="/portal/login">Student Portal</Link>
            </Button>
            <Button asChild size="sm" className="rounded-sm">
              <Link to="/portal">Apply Now</Link>
            </Button>
          </div>
          <button className="p-2 xl:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="border-t bg-background px-4 pb-6 xl:hidden">
            {navItems.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block border-b py-3 font-medium">
                {n.label}
              </Link>
            ))}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button asChild variant="outline" className="rounded-sm"><Link to="/portal/login">Student Portal</Link></Button>
              <Button asChild className="rounded-sm"><Link to="/portal">Apply Now</Link></Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export function SiteFooter() {
  const soon = () => toast.info("Placeholder link — to be connected when official content is provided.");
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <Logo light />
          <p className="mt-5 max-w-sm text-sm leading-relaxed opacity-75">
            A community of learning, faith and service in Northern Uganda. Contact details below are placeholders pending confirmation.
          </p>
          <div className="mt-5 space-y-2 text-sm opacity-80">
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" /> P.O. Box 000, Lira City, Uganda</p>
            <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold" /> +256 000 000 000</p>
            <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold" /> info@asul.example</p>
          </div>
          <div className="mt-6 flex gap-3">
            {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((I, i) => (
              <button key={i} onClick={soon} aria-label="Social media placeholder" className="grid h-9 w-9 place-items-center border border-navy-foreground/20 transition-colors hover:border-gold hover:text-gold">
                <I className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>
        <FooterCol title="University" links={[["About Us", "/about"], ["Research & Innovation", "/research"], ["Campus Life", "/campus-life"], ["News & Events", "/news"], ["Contact", "/contact"]]} />
        <FooterCol title="Admissions" links={[["How to Apply", "/admissions"], ["Apply Online", "/portal"], ["Applicant Login", "/portal/login"], ["Create Account", "/portal/register"]]} />
        <FooterCol title="Academics" links={[["All Programmes", "/academics"], ["Computer Science", "/academics/computer-science"], ["Business Administration", "/academics/business-administration"], ["Staff Admin (Demo)", "/admin"]]} />
      </div>
      <div className="border-t border-navy-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs opacity-70 sm:flex-row lg:px-8">
          <p>© 2026 All Saints University Lira · Design prototype — sample content.</p>
          <div className="flex gap-5">
            <button onClick={soon} className="hover:text-gold">Privacy Policy</button>
            <button onClick={soon} className="hover:text-gold">Terms of Use</button>
            <button onClick={soon} className="hover:text-gold">Accessibility</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="eyebrow mb-4 text-gold">{title}</h4>
      <ul className="space-y-2.5 text-sm">
        {links.map(([l, to]) => (
          <li key={l}>
            <Link to={to} className="opacity-80 transition-opacity hover:opacity-100 hover:text-gold">{l}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHeader({ eyebrow, title, intro, image, crumbs }: { eyebrow: string; title: string; intro?: string; image: string; crumbs: { label: string; to?: string }[] }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-navy-foreground">
      <img src={image} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
        <nav className="mb-8 flex flex-wrap items-center gap-1 text-xs opacity-80">
          <Link to="/" className="hover:text-gold">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1">
              <ChevronRight className="h-3 w-3" />
              {c.to ? <Link to={c.to} className="hover:text-gold">{c.label}</Link> : <span className="text-gold">{c.label}</span>}
            </span>
          ))}
        </nav>
        <p className="eyebrow text-gold">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg opacity-85">{intro}</p>}
      </div>
    </section>
  );
}

export function SampleTag({ children = "Sample content" }: { children?: ReactNode }) {
  return <span className="inline-block border border-gold/60 bg-gold/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-gold-foreground">{children}</span>;
}

export function CTA() {
  return (
    <section className="bg-soft">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-14 md:flex-row md:items-center lg:px-8">
        <div>
          <h2 className="text-3xl font-semibold text-navy">Ready to begin your journey?</h2>
          <p className="mt-2 text-muted-foreground">Applications for the January 2027 intake are open (sample dates).</p>
        </div>
        <div className="flex gap-3">
          <Button asChild size="lg" className="rounded-sm"><Link to="/portal">Apply Now</Link></Button>
          <Button asChild size="lg" variant="outline" className="rounded-sm border-navy text-navy"><Link to="/contact">Talk to Admissions</Link></Button>
        </div>
      </div>
    </section>
  );
}
