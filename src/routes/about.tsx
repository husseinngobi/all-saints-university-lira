import { createFileRoute } from "@tanstack/react-router";
import { Eye, Target, Award } from "lucide-react";
import { SiteLayout, PageHeader, CTA, SampleTag } from "@/components/site/SiteLayout";
import { images } from "@/lib/data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — All Saints University Lira" },
      { name: "description", content: "Our story, vision, mission, values and leadership at All Saints University Lira." },
      { property: "og:title", content: "About All Saints University Lira" },
      { property: "og:description", content: "Vision, mission, values and governance of All Saints University Lira." },
    ],
  }),
  component: About,
});

const leaders = [
  ["Vice Chancellor", "Prof. [Name to be confirmed]"],
  ["Deputy Vice Chancellor, Academic Affairs", "Assoc. Prof. [Name]"],
  ["University Secretary", "[Name to be confirmed]"],
  ["Academic Registrar", "[Name to be confirmed]"],
  ["Dean of Students", "[Name to be confirmed]"],
  ["University Bursar", "[Name to be confirmed]"],
];

function About() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="About the University" title="Rooted in faith. Committed to excellence." intro="A university serving Lira, Northern Uganda and beyond through quality teaching, research and community service." image={images.graduation} crumbs={[{ label: "About Us" }]} />

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-24 lg:grid-cols-[1fr_1fr] lg:px-8">
        <div>
          <p className="eyebrow gold-rule text-royal">Our Story</p>
          <h2 className="text-4xl font-semibold text-navy">A university for the region</h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>All Saints University Lira was founded to widen access to quality higher education in Northern Uganda, combining academic rigour with Christian values and a spirit of service.</p>
            <p>Today the University offers programmes across science and technology, business, health, engineering and education, with a growing focus on research that responds to local needs.</p>
          </div>
          <div className="mt-6"><SampleTag>Placeholder history — awaiting verification</SampleTag></div>
        </div>
        <img src={images.campus} alt="Students on campus" loading="lazy" className="aspect-[4/3] w-full object-cover" />
      </section>

      <section id="vision" className="bg-navy py-24 text-navy-foreground">
        <div className="mx-auto grid max-w-7xl gap-px bg-navy-foreground/10 px-4 md:grid-cols-3 lg:px-8">
          {[
            { icon: Eye, t: "Vision", d: "To be a centre of academic excellence and holistic transformation in Africa." },
            { icon: Target, t: "Mission", d: "To provide quality education, research and service grounded in Christian values for the development of society." },
            { icon: Award, t: "Core Values", d: "Integrity · Excellence · Service · Stewardship · Respect for all" },
          ].map((v) => (
            <div key={v.t} className="bg-navy p-10">
              <v.icon className="h-8 w-8 text-gold" />
              <h3 className="mt-6 text-3xl font-semibold">{v.t}</h3>
              <p className="mt-4 text-lg opacity-85">{v.d}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-7xl px-4 text-xs opacity-60 lg:px-8">Statements are placeholders pending confirmation by University management.</p>
      </section>

      <section id="leadership" className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <p className="eyebrow gold-rule text-royal">Leadership & Governance</p>
        <h2 className="text-4xl font-semibold text-navy">University leadership</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">The University is governed by its Council and Senate. Names and photographs will be added once confirmed.</p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {leaders.map(([role, name]) => (
            <div key={role} className="border-t-2 border-gold pt-6">
              <div className="mb-5 grid aspect-[4/3] place-items-center bg-soft font-display text-5xl text-navy/20">ASUL</div>
              <p className="eyebrow text-royal">{role}</p>
              <p className="mt-2 font-display text-xl text-navy">{name}</p>
            </div>
          ))}
        </div>
      </section>
      <CTA />
    </SiteLayout>
  );
}
