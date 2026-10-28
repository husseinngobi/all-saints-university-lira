import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Clock, GraduationCap, Building2 } from "lucide-react";
import { SiteLayout, PageHeader, SampleTag } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { programmes, formatUGX, APPLICATION_FEE } from "@/lib/data";
import { useDemo } from "@/lib/demo-store";

export const Route = createFileRoute("/academics/$slug")({
  loader: ({ params }) => {
    const p = programmes.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return { slug: p.slug, name: p.name, summary: p.summary };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} — All Saints University Lira` : "Programme — All Saints University Lira" },
      { name: "description", content: loaderData?.summary ?? "Programme details" },
      { property: "og:title", content: loaderData?.name ?? "Programme" },
      { property: "og:description", content: loaderData?.summary ?? "Programme details" },
    ],
  }),
  component: ProgrammeDetail,
});

function ProgrammeDetail() {
  const { slug } = Route.useLoaderData();
  const p = programmes.find((x) => x.slug === slug)!;
  const { setForm, setStep } = useDemo();
  return (
    <SiteLayout>
      <PageHeader eyebrow={p.faculty} title={p.name} intro={p.summary} image={p.image} crumbs={[{ label: "Academics", to: "/academics" }, { label: p.name }]} />
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 lg:grid-cols-[1fr_340px] lg:px-8">
        <div>
          <SampleTag>Sample programme</SampleTag>
          <p className="mt-6 text-xl leading-relaxed text-foreground">{p.description}</p>
          <Tabs defaultValue="modules" className="mt-12">
            <TabsList className="h-auto w-full justify-start rounded-none border-b bg-transparent p-0">
              {["modules", "careers", "requirements"].map((t) => (
                <TabsTrigger key={t} value={t} className="rounded-none border-b-2 border-transparent px-5 py-3 capitalize data-[state=active]:border-gold data-[state=active]:shadow-none">{t === "modules" ? "Course Modules" : t === "careers" ? "Career Paths" : "Entry Requirements"}</TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="modules" className="mt-8 grid gap-3 sm:grid-cols-2">
              {p.modules.map((m, i) => (
                <div key={m} className="flex items-center gap-4 border p-4"><span className="font-display text-gold">{String(i + 1).padStart(2, "0")}</span>{m}</div>
              ))}
            </TabsContent>
            <TabsContent value="careers" className="mt-8 flex flex-wrap gap-3">
              {p.careers.map((c) => <span key={c} className="border bg-soft px-4 py-2">{c}</span>)}
            </TabsContent>
            <TabsContent value="requirements" className="mt-8 space-y-3">
              {p.requirements.map((r) => <p key={r} className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-success" />{r}</p>)}
            </TabsContent>
          </Tabs>
        </div>
        <aside className="h-fit border-t-4 border-gold bg-soft p-8 lg:sticky lg:top-36">
          <h3 className="text-xl font-semibold text-navy">Programme at a glance</h3>
          <dl className="mt-6 space-y-4 text-sm">
            <Row icon={GraduationCap} k="Level" v={p.level} />
            <Row icon={Clock} k="Duration" v={p.duration} />
            <Row icon={Building2} k="Faculty" v={p.faculty} />
          </dl>
          <p className="mt-6 text-sm text-muted-foreground">Application fee: <strong className="text-navy">{formatUGX(APPLICATION_FEE)}</strong> (sample)</p>
          <Button asChild className="mt-6 w-full rounded-sm" size="lg">
            <Link to="/portal/apply" onClick={() => { setForm({ programme: p.slug }); setStep(0); }}>Apply for this programme</Link>
          </Button>
          <Button asChild variant="outline" className="mt-2 w-full rounded-sm"><Link to="/academics">All programmes</Link></Button>
        </aside>
      </section>
    </SiteLayout>
  );
}

function Row({ icon: I, k, v }: { icon: typeof Clock; k: string; v: string }) {
  return (
    <div className="flex items-start gap-3"><I className="mt-0.5 h-4 w-4 text-royal" /><div><dt className="text-muted-foreground">{k}</dt><dd className="font-medium text-navy">{v}</dd></div></div>
  );
}
