import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { SiteLayout, PageHeader, CTA, SampleTag } from "@/components/site/SiteLayout";
import { Input } from "@/components/ui/input";
import { images, programmes } from "@/lib/data";

export const Route = createFileRoute("/academics/")({
  head: () => ({
    meta: [
      { title: "Academic Programmes — All Saints University Lira" },
      { name: "description", content: "Browse undergraduate, postgraduate and diploma programmes at All Saints University Lira." },
      { property: "og:title", content: "Academic Programmes — All Saints University Lira" },
      { property: "og:description", content: "Undergraduate, postgraduate and diploma programmes." },
    ],
  }),
  component: Academics,
});

const levels = ["All", "Undergraduate", "Postgraduate", "Diploma"];

function Academics() {
  const [level, setLevel] = useState("All");
  const [q, setQ] = useState("");
  const list = useMemo(
    () => programmes.filter((p) => (level === "All" || p.level === level) && (p.name + p.faculty).toLowerCase().includes(q.toLowerCase())),
    [level, q],
  );
  return (
    <SiteLayout>
      <PageHeader eyebrow="Academics" title="Find the programme that fits your ambition" intro="Explore our faculties and programmes. All programmes listed are illustrative samples until officially confirmed." image={images.lab} crumbs={[{ label: "Academics" }]} />
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="flex flex-col gap-4 border-b pb-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-1">
            {levels.map((l) => (
              <button key={l} onClick={() => setLevel(l)} className={`px-4 py-2 text-sm font-medium transition-colors ${level === l ? "bg-navy text-navy-foreground" : "text-muted-foreground hover:bg-soft"}`}>{l}</button>
            ))}
          </div>
          <div className="relative md:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search programmes…" className="rounded-sm pl-9" />
          </div>
        </div>
        <div className="mt-2 flex justify-end"><SampleTag /></div>
        {list.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">No programmes match your search.</p>
        ) : (
          <div className="mt-6 divide-y border-y">
            {list.map((p) => (
              <Link key={p.slug} to="/academics/$slug" params={{ slug: p.slug }} className="group grid items-center gap-6 py-6 md:grid-cols-[200px_1fr_auto]">
                <img src={p.image} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" />
                <div>
                  <p className="eyebrow text-royal">{p.faculty}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-navy group-hover:underline">{p.name}</h3>
                  <p className="mt-2 text-muted-foreground">{p.summary}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{p.level} · {p.duration}</p>
                </div>
                <span className="inline-flex items-center gap-1 font-semibold text-royal">Learn More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        )}
      </section>
      <CTA />
    </SiteLayout>
  );
}
