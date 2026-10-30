import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Lightbulb, Briefcase, HeartHandshake, Users, Cpu, TrendingUp, Stethoscope, Leaf, Quote, X } from "lucide-react";
import { SiteLayout, SampleTag } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { images, programmes, news, testimonials } from "@/lib/data";
import imgSports from "@/assets/sports.jpg";
import imgWorkshop from "@/assets/workshop.jpg";
import imgCulture from "@/assets/culture.jpg";
import imgOutreach from "@/assets/outreach.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "All Saints University Lira — Discover Your Potential" },
      { name: "description", content: "Explore programmes, admissions and campus life at All Saints University Lira, Uganda. Apply online for the January 2027 intake." },
      { property: "og:title", content: "All Saints University Lira — Discover Your Potential" },
      { property: "og:description", content: "Learn, innovate, lead and make a difference at All Saints University Lira, Uganda." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      <Hero />
      <Intro />
      <Programmes />
      <WhyUs />
      <AdmissionsBand />
      <CampusLife />
      <Gallery />
      <Research />
      <News />
      <Testimonials />
    </SiteLayout>
  );
}

// Set to a video URL (e.g. an .asset.json pointer's .url) to fade from the photo into background video.
const HERO_VIDEO: string | null = null;
const heroSlides = [
  { src: images.hero, label: "Campus" },
  { src: images.lab, label: "Innovation Labs" },
  { src: images.lecture, label: "Teaching" },
  { src: images.graduation, label: "Graduation" },
];

function Hero() {
  const [i, setI] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  useEffect(() => {
    if (HERO_VIDEO) return;
    const t = setInterval(() => setI((n) => (n + 1) % heroSlides.length), 6000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="relative isolate flex min-h-[88vh] items-end overflow-hidden bg-navy text-navy-foreground">
      {heroSlides.map((s, n) => (
        <img
          key={s.label}
          src={s.src}
          alt={n === 0 ? "University students on campus" : ""}
          width={1920}
          height={1088}
          className={`absolute inset-0 -z-10 h-full w-full object-cover transition-opacity duration-[1500ms] ${n === i && !videoReady ? "opacity-100 hero-kenburns" : "opacity-0"}`}
        />
      ))}
      {HERO_VIDEO && (
        <video
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          onPlaying={() => setVideoReady(true)}
          className={`absolute inset-0 -z-10 h-full w-full object-cover transition-opacity duration-[2000ms] ${videoReady ? "opacity-100" : "opacity-0"}`}
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/60 to-navy/20" />
      {!HERO_VIDEO && (
        <div className="absolute bottom-8 right-6 hidden gap-2 md:flex lg:right-10">
          {heroSlides.map((s, n) => (
            <button key={s.label} onClick={() => setI(n)} className={`border-b-2 px-1 pb-1 text-xs uppercase tracking-wider transition-colors ${n === i ? "border-gold text-gold" : "border-transparent opacity-70 hover:opacity-100"}`}>
              {s.label}
            </button>
          ))}
        </div>
      )}
      <div className="mx-auto w-full max-w-7xl px-4 pb-24 pt-32 lg:px-8">
        <p className="eyebrow text-gold animate-in fade-in slide-in-from-bottom-2 duration-700">All Saints University · Lira, Uganda</p>
        <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.05] md:text-7xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          Discover Your Potential. <em className="font-medium text-gold">Shape Tomorrow.</em>
        </h1>
        <p className="mt-6 max-w-xl text-lg opacity-90">
          Explore opportunities to learn, innovate, lead, and make a difference at All Saints University Lira.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild size="lg" className="h-12 rounded-sm px-7"><Link to="/portal">Apply for Admission <ArrowRight /></Link></Button>
          <Button asChild size="lg" variant="outline" className="h-12 rounded-sm border-navy-foreground/60 bg-transparent px-7 text-navy-foreground hover:bg-navy-foreground hover:text-navy">
            <Link to="/academics">Explore Programmes</Link>
          </Button>
        </div>
      </div>
      <a href="#intro" className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-xs uppercase tracking-[0.2em] opacity-80 hover:opacity-100">
        Scroll <ChevronDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}

function Intro() {
  return (
    <section id="intro" className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 lg:grid-cols-2 lg:px-8">
      <div>
        <p className="eyebrow gold-rule text-royal">Welcome</p>
        <h2 className="text-4xl font-semibold leading-tight text-navy md:text-5xl">Education That Opens New Possibilities</h2>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          All Saints University Lira is a learning community in Northern Uganda committed to academic excellence, integrity and service.
          We prepare graduates to think critically, lead with character and contribute to the development of their communities.
        </p>
        <p className="mt-4 text-sm italic text-muted-foreground">Institutional text is placeholder copy pending verification by the University.</p>
        <Button asChild size="lg" variant="outline" className="mt-8 rounded-sm border-navy text-navy"><Link to="/about">Discover Our University <ArrowRight /></Link></Button>
      </div>
      <div className="relative">
        <img src={images.lecture} alt="Lecturer teaching students in a lecture hall" loading="lazy" width={1280} height={896} className="aspect-[4/3] w-full object-cover" />
        <div className="absolute -bottom-6 -left-6 hidden bg-gold px-8 py-6 text-gold-foreground md:block">
          <p className="font-display text-3xl font-semibold">Faith · Knowledge · Service</p>
        </div>
      </div>
    </section>
  );
}

function Programmes() {
  return (
    <section className="bg-soft py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow gold-rule text-royal">Academics</p>
            <h2 className="text-4xl font-semibold text-navy md:text-5xl">Academic Programmes</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">Illustrative programmes shown until the University confirms its official offerings. <SampleTag /></p>
          </div>
          <Button asChild className="rounded-sm"><Link to="/academics">View All Programmes <ArrowRight /></Link></Button>
        </div>
        <div className="mt-12 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {programmes.slice(0, 6).map((p) => (
            <Link key={p.slug} to="/academics/$slug" params={{ slug: p.slug }} className="group bg-background">
              <div className="overflow-hidden">
                <img src={p.image} alt={p.name} loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-7">
                <p className="eyebrow text-muted-foreground">{p.level} · {p.duration}</p>
                <h3 className="mt-3 text-xl font-semibold text-navy">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-royal">Learn More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    { icon: Lightbulb, t: "Innovation", d: "Learning that encourages curiosity, problem-solving and practical projects." },
    { icon: Briefcase, t: "Career Development", d: "Guidance, internships and connections that prepare you for work." },
    { icon: HeartHandshake, t: "Community Engagement", d: "Outreach and service that put knowledge to work for society." },
    { icon: Users, t: "Student Support", d: "Mentorship, counselling and academic advising throughout your studies." },
  ];
  return (
    <section className="mx-auto grid max-w-7xl gap-16 px-4 py-24 lg:grid-cols-[1fr_1.4fr] lg:px-8">
      <div className="lg:sticky lg:top-40 lg:self-start">
        <p className="eyebrow gold-rule text-royal">Why All Saints</p>
        <h2 className="text-4xl font-semibold leading-tight text-navy md:text-5xl">A place to grow in mind and character.</h2>
        <img src={images.library} alt="Students studying in a library" loading="lazy" className="mt-10 aspect-[4/3] w-full object-cover" />
      </div>
      <div className="divide-y border-y">
        {items.map((i, n) => (
          <div key={i.t} className="grid grid-cols-[auto_1fr] gap-6 py-10">
            <span className="font-display text-4xl text-gold">0{n + 1}</span>
            <div>
              <h3 className="flex items-center gap-3 text-2xl font-semibold text-navy"><i.icon className="h-5 w-5 text-royal" /> {i.t}</h3>
              <p className="mt-3 text-lg text-muted-foreground">{i.d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AdmissionsBand() {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-navy-foreground">
      <img src={images.graduation} alt="" loading="lazy" className="absolute inset-y-0 right-0 -z-10 hidden h-full w-1/2 object-cover opacity-60 lg:block" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy from-50% to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <div className="max-w-xl border-l-2 border-gold pl-8">
          <p className="eyebrow text-gold">Admissions 2027</p>
          <h2 className="mt-4 text-5xl font-semibold md:text-6xl">Your Future Starts Here.</h2>
          <p className="mt-5 text-lg opacity-85">Apply online in a few simple steps. Pay your application fee securely by Mobile Money or card, and track your progress from your applicant dashboard.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-sm bg-gold text-gold-foreground hover:bg-gold/90"><Link to="/portal">Apply Now</Link></Button>
            <Button asChild size="lg" variant="outline" className="rounded-sm border-navy-foreground/50 bg-transparent text-navy-foreground hover:bg-navy-foreground hover:text-navy"><Link to="/admissions">Admission Requirements</Link></Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function CampusLife() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
      <div className="flex items-end justify-between">
        <div>
          <p className="eyebrow gold-rule text-royal">Campus Life</p>
          <h2 className="text-4xl font-semibold text-navy md:text-5xl">Life beyond the lecture hall</h2>
        </div>
        <Link to="/campus-life" className="hidden items-center gap-1 font-semibold text-royal md:inline-flex">Explore campus life <ArrowRight className="h-4 w-4" /></Link>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-4 md:grid-rows-2">
        <Tile img={images.campus} label="Outdoor study & friendship" className="md:col-span-2 md:row-span-2" />
        <Tile img={images.library} label="Library & learning spaces" />
        <Tile img={images.lab} label="Labs & projects" />
        <Tile img={images.graduation} label="Celebrations" className="md:col-span-2" />
      </div>
      <p className="mt-4 text-xs text-muted-foreground">Representative imagery — not photographs of the actual campus.</p>
    </section>
  );
}

function Tile({ img, label, className = "" }: { img: string; label: string; className?: string }) {
  return (
    <div className={`group relative min-h-56 overflow-hidden ${className}`}>
      <img src={img} alt={label} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
      <p className="absolute bottom-5 left-5 font-display text-xl text-navy-foreground">{label}</p>
    </div>
  );
}

function Research() {
  const themes = [
    { icon: Cpu, t: "Technology", d: "Digital tools for agriculture, education and public services." },
    { icon: TrendingUp, t: "Entrepreneurship", d: "Supporting student ventures and local enterprise." },
    { icon: Stethoscope, t: "Healthcare", d: "Community health and wellbeing in Northern Uganda." },
    { icon: Leaf, t: "Sustainable Development", d: "Climate-smart solutions and resilient communities." },
  ];
  return (
    <section className="bg-soft py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow gold-rule text-royal">Research & Innovation</p>
            <h2 className="text-4xl font-semibold leading-tight text-navy md:text-5xl">Ideas with purpose, close to home.</h2>
            <p className="mt-5 text-lg text-muted-foreground">Illustrative research themes reflecting the region's priorities.</p>
            <Button asChild variant="outline" className="mt-8 rounded-sm border-navy text-navy"><Link to="/research">Explore Research</Link></Button>
          </div>
          <div className="grid gap-px bg-border sm:grid-cols-2">
            {themes.map((t) => (
              <div key={t.t} className="bg-background p-8 transition-colors hover:bg-accent">
                <t.icon className="h-7 w-7 text-gold" />
                <h3 className="mt-5 text-xl font-semibold text-navy">{t.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function News() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
      <div className="flex items-end justify-between">
        <div>
          <p className="eyebrow gold-rule text-royal">News & Events</p>
          <h2 className="text-4xl font-semibold text-navy md:text-5xl">Latest from the University</h2>
        </div>
        <SampleTag>Sample articles</SampleTag>
      </div>
      <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <Link to="/news" className="group">
          <img src={news[0].image} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" />
          <p className="eyebrow mt-6 text-royal">{news[0].category} · {news[0].date}</p>
          <h3 className="mt-3 text-3xl font-semibold text-navy group-hover:underline">{news[0].title}</h3>
          <p className="mt-3 text-muted-foreground">{news[0].excerpt}</p>
        </Link>
        <div className="divide-y">
          {news.slice(1).map((n) => (
            <Link key={n.id} to="/news" className="group grid grid-cols-[120px_1fr] gap-5 py-5 first:pt-0">
              <img src={n.image} alt="" loading="lazy" className="aspect-square w-full object-cover" />
              <div>
                <p className="eyebrow text-royal">{n.category} · {n.date}</p>
                <h3 className="mt-2 text-lg font-semibold text-navy group-hover:underline">{n.title}</h3>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-royal">Read More <ArrowRight className="h-3 w-3" /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  const go = (d: number) => setI((i + d + testimonials.length) % testimonials.length);
  return (
    <section className="bg-navy py-24 text-navy-foreground">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <Quote className="mx-auto h-10 w-10 text-gold" />
        <blockquote key={i} className="mt-8 font-display text-2xl leading-relaxed animate-in fade-in duration-500 md:text-4xl">“{t.quote}”</blockquote>
        <p className="mt-8 font-semibold">{t.name}</p>
        <p className="text-sm opacity-70">{t.role}</p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <button onClick={() => go(-1)} aria-label="Previous" className="grid h-10 w-10 place-items-center border border-navy-foreground/30 hover:border-gold hover:text-gold"><ChevronLeft /></button>
          {testimonials.map((_, n) => (
            <button key={n} onClick={() => setI(n)} aria-label={`Testimonial ${n + 1}`} className={`h-1 w-8 ${n === i ? "bg-gold" : "bg-navy-foreground/30"}`} />
          ))}
          <button onClick={() => go(1)} aria-label="Next" className="grid h-10 w-10 place-items-center border border-navy-foreground/30 hover:border-gold hover:text-gold"><ChevronRight /></button>
        </div>
        <p className="mt-6 text-xs opacity-60">Fictional testimonials for demonstration.</p>
      </div>
    </section>
  );
}
