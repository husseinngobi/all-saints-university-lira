import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Music, Trophy, Church, Home, HeartPulse } from "lucide-react";
import { SiteLayout, PageHeader, CTA } from "@/components/site/SiteLayout";
import { images } from "@/lib/data";

export const Route = createFileRoute("/campus-life")({
  head: () => ({
    meta: [
      { title: "Campus Life — All Saints University Lira" },
      { name: "description", content: "Clubs, sports, chaplaincy, accommodation and student support at All Saints University Lira." },
      { property: "og:title", content: "Campus Life — All Saints University Lira" },
      { property: "og:description", content: "Student life, clubs, sports and support services." },
    ],
  }),
  component: CampusLife,
});

const items = [
  { icon: BookOpen, t: "Academic Clubs", d: "Debate, coding, business and science societies." },
  { icon: Music, t: "Arts & Culture", d: "Music, drama, dance and cultural celebrations." },
  { icon: Trophy, t: "Sports", d: "Football, netball, athletics and inter-university games." },
  { icon: Church, t: "Chaplaincy", d: "Worship, fellowship and spiritual guidance." },
  { icon: Home, t: "Accommodation", d: "Guidance on safe housing on and near campus." },
  { icon: HeartPulse, t: "Health & Wellbeing", d: "Counselling and health support services." },
];

function CampusLife() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Campus Life" title="Belong. Grow. Lead." intro="A vibrant community where friendships, faith and leadership flourish." image={images.campus} crumbs={[{ label: "Campus Life" }]} />
      <section className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          <img src={images.campus} alt="Students outdoors" loading="lazy" className="aspect-[4/5] w-full object-cover md:row-span-2 md:h-full" />
          <img src={images.library} alt="Library" loading="lazy" className="aspect-[4/3] w-full object-cover" />
          <img src={images.graduation} alt="Graduation" loading="lazy" className="aspect-[4/3] w-full object-cover" />
          <div className="bg-navy p-8 text-navy-foreground md:col-span-2">
            <p className="font-display text-3xl leading-snug">“University is where you discover not only what you know, but who you are.”</p>
            <p className="mt-4 text-sm opacity-70">— Dean of Students (placeholder)</p>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Representative imagery.</p>
        <div className="mt-20 grid gap-x-12 gap-y-10 md:grid-cols-3">
          {items.map((i) => (
            <div key={i.t} className="border-l-2 border-gold pl-6">
              <i.icon className="h-6 w-6 text-royal" />
              <h3 className="mt-4 text-xl font-semibold text-navy">{i.t}</h3>
              <p className="mt-2 text-muted-foreground">{i.d}</p>
            </div>
          ))}
        </div>
      </section>
      <CTA />
    </SiteLayout>
  );
}
