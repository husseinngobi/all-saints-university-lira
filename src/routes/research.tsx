import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader, CTA, SampleTag } from "@/components/site/SiteLayout";
import { images } from "@/lib/data";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research & Innovation — All Saints University Lira" },
      { name: "description", content: "Research themes in technology, entrepreneurship, health and sustainable development." },
      { property: "og:title", content: "Research & Innovation — All Saints University Lira" },
      { property: "og:description", content: "Research with purpose for Northern Uganda and beyond." },
    ],
  }),
  component: Research,
});

const themes = [
  { t: "Digital Technology for Development", d: "Applying software, data and mobile technology to agriculture, education and public service delivery.", img: images.lab },
  { t: "Entrepreneurship & Enterprise", d: "Supporting student start-ups, small business growth and innovation in the regional economy.", img: images.lecture },
  { t: "Community Health", d: "Studying and improving maternal health, nutrition and disease prevention in surrounding communities.", img: images.campus },
  { t: "Sustainable Development", d: "Climate-smart agriculture, clean energy and resilient infrastructure for growing towns.", img: images.hero },
];

function Research() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Research & Innovation" title="Knowledge that serves society" intro="Our research priorities respond to the challenges and opportunities of Northern Uganda." image={images.lab} crumbs={[{ label: "Research & Innovation" }]} />
      <section className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <SampleTag>Illustrative research themes</SampleTag>
        <div className="mt-10 space-y-20">
          {themes.map((t, i) => (
            <article key={t.t} className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 ? "lg:[&>img]:order-2" : ""}`}>
              <img src={t.img} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" />
              <div>
                <span className="font-display text-6xl text-gold/70">0{i + 1}</span>
                <h2 className="mt-2 text-3xl font-semibold text-navy md:text-4xl">{t.t}</h2>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t.d}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CTA />
    </SiteLayout>
  );
}
