import { Link } from "@tanstack/react-router";
import { ChevronDown, ArrowRight } from "lucide-react";
import { programmes, images } from "@/lib/data";

type Item = { label: string; to: string; desc?: string };
type Menu = { label: string; to: string; cols?: { title: string; items: Item[] }[]; feature?: { title: string; text: string; image: string; to: string } };

function facultyCols() {
  const map = new Map<string, Item[]>();
  for (const p of programmes) {
    const list = map.get(p.faculty) ?? [];
    list.push({ label: p.name, to: `/academics/${p.slug}`, desc: `${p.level} · ${p.duration}` });
    map.set(p.faculty, list);
  }
  return [...map.entries()].map(([title, items]) => ({ title, items }));
}

export const menus: Menu[] = [
  { label: "Home", to: "/" },
  {
    label: "About Us", to: "/about",
    cols: [{ title: "The University", items: [
      { label: "Our Story", to: "/about", desc: "History, mission and values" },
      { label: "Leadership", to: "/about", desc: "Council, Senate and management" },
      { label: "Accreditation", to: "/about", desc: "NCHE recognition (sample)" },
      { label: "Contact & Location", to: "/contact", desc: "Find us in Lira City" },
    ] }],
    feature: { title: "Faith · Knowledge · Service", text: "Discover what makes All Saints different.", image: images.graduation, to: "/about" },
  },
  { label: "Academics", to: "/academics", cols: facultyCols() },
  {
    label: "Admissions", to: "/admissions",
    cols: [{ title: "Apply", items: [
      { label: "How to Apply", to: "/admissions", desc: "Requirements and steps" },
      { label: "Apply Online", to: "/portal", desc: "Start your application" },
      { label: "Create Account", to: "/portal/register", desc: "First-time applicants" },
      { label: "Applicant Login", to: "/portal/login", desc: "Continue or track status" },
    ] }],
    feature: { title: "January 2027 intake open", text: "Apply online and pay by Mobile Money in minutes.", image: images.library, to: "/portal" },
  },
  {
    label: "Research & Innovation", to: "/research",
    cols: [{ title: "Research", items: [
      { label: "Research Centres", to: "/research", desc: "Agriculture, health and ICT" },
      { label: "Innovation Labs", to: "/research", desc: "Student-led prototypes" },
      { label: "Publications", to: "/research", desc: "Recent outputs (sample)" },
    ] }],
    feature: { title: "Centre of Excellence Labs", text: "Hands-on technology for Northern Uganda.", image: images.lab, to: "/research" },
  },
  {
    label: "Campus Life", to: "/campus-life",
    cols: [{ title: "Student Life", items: [
      { label: "Accommodation", to: "/campus-life", desc: "Halls and hostels" },
      { label: "Clubs & Sports", to: "/campus-life", desc: "Guild, chaplaincy, teams" },
      { label: "Gallery", to: "/#gallery", desc: "Sports, culture and events" },
      { label: "Student Support", to: "/campus-life", desc: "Counselling and careers" },
    ] }],
    feature: { title: "Life @ All Saints", text: "Community, worship and friendship.", image: images.campus, to: "/campus-life" },
  },
  { label: "News & Events", to: "/news" },
  { label: "Contact", to: "/contact" },
];

export function MegaNav() {
  return (
    <nav className="hidden items-center xl:flex">
      {menus.map((m) => (
        <div key={m.label} className="group">
          <Link
            to={m.to as "/"}
            activeOptions={{ exact: m.to === "/" }}
            className="relative flex items-center gap-1 px-2.5 py-6 text-sm font-medium text-foreground/80 transition-colors after:absolute after:bottom-4 after:left-2.5 after:right-2.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-gold after:transition-transform hover:text-royal group-hover:after:scale-x-100 data-[status=active]:text-royal"
          >
            {m.label}
            {m.cols && <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />}
          </Link>
          {m.cols && (
            <div className="invisible absolute inset-x-0 top-full translate-y-2 border-t-2 border-gold bg-background opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="mx-auto flex max-w-7xl gap-10 px-8 py-8">
                <div className={`grid flex-1 gap-8 ${m.cols.length > 1 ? "grid-cols-3" : "grid-cols-1"}`}>
                  {m.cols.map((c) => (
                    <div key={c.title}>
                      <p className="eyebrow mb-3 text-royal">{c.title}</p>
                      <ul className="space-y-1">
                        {c.items.map((it) => (
                          <li key={it.label}>
                            <Link to={it.to as "/"} className="group/i block border-l-2 border-transparent px-3 py-2 transition-colors hover:border-gold hover:bg-soft">
                              <span className="flex items-center gap-1 text-sm font-medium text-navy">{it.label}<ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all group-hover/i:translate-x-0 group-hover/i:opacity-100" /></span>
                              {it.desc && <span className="block text-xs text-muted-foreground">{it.desc}</span>}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                {m.feature && (
                  <Link to={m.feature.to as "/"} className="group/f relative block w-80 shrink-0 overflow-hidden bg-navy text-navy-foreground">
                    <img src={m.feature.image} alt="" className="h-44 w-full object-cover opacity-70 transition-transform duration-500 group-hover/f:scale-105" />
                    <div className="p-4">
                      <p className="font-display text-lg">{m.feature.title}</p>
                      <p className="mt-1 text-xs opacity-80">{m.feature.text}</p>
                    </div>
                  </Link>
                )}
                {m.label === "Academics" && (
                  <Link to="/academics" className="self-end text-sm font-semibold text-royal hover:underline">View all programmes →</Link>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
