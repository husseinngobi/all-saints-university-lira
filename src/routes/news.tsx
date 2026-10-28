import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout, PageHeader, SampleTag } from "@/components/site/SiteLayout";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { images, news, events } from "@/lib/data";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Events — All Saints University Lira" },
      { name: "description", content: "Latest news, stories and upcoming events from All Saints University Lira." },
      { property: "og:title", content: "News & Events — All Saints University Lira" },
      { property: "og:description", content: "Latest news and upcoming events." },
    ],
  }),
  component: News,
});

function News() {
  const [open, setOpen] = useState<(typeof news)[number] | null>(null);
  return (
    <SiteLayout>
      <PageHeader eyebrow="News & Events" title="Stories from our community" image={images.lecture} crumbs={[{ label: "News & Events" }]} />
      <section className="mx-auto grid max-w-7xl gap-16 px-4 py-20 lg:grid-cols-[1fr_360px] lg:px-8">
        <div>
          <div className="flex items-center justify-between"><h2 className="text-3xl font-semibold text-navy">Latest News</h2><SampleTag>Sample articles</SampleTag></div>
          <div className="mt-8 grid gap-10 sm:grid-cols-2">
            {news.map((n) => (
              <article key={n.id} className="group cursor-pointer" onClick={() => setOpen(n)}>
                <div className="overflow-hidden"><img src={n.image} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                <p className="eyebrow mt-5 text-royal">{n.category} · {n.date}</p>
                <h3 className="mt-2 text-xl font-semibold text-navy group-hover:underline">{n.title}</h3>
                <p className="mt-2 text-muted-foreground">{n.excerpt}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-royal">Read More <ArrowRight className="h-3 w-3" /></span>
              </article>
            ))}
          </div>
        </div>
        <aside>
          <h2 className="text-3xl font-semibold text-navy">Upcoming Events</h2>
          <div className="mt-8 divide-y border-y">
            {events.map((e) => (
              <div key={e.title} className="flex gap-5 py-5">
                <div className="w-16 shrink-0 bg-navy py-2 text-center text-navy-foreground"><p className="font-display text-2xl">{e.date}</p><p className="text-xs uppercase text-gold">{e.month}</p></div>
                <div>
                  <h3 className="font-semibold text-navy">{e.title}</h3>
                  <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-3 w-3" />{e.place} <Clock className="ml-2 h-3 w-3" />{e.time}</p>
                  <button onClick={() => toast.success(`Added "${e.title}" to your calendar (demo)`)} className="mt-2 text-sm font-semibold text-royal hover:underline">Add to calendar</button>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>
      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-2xl rounded-sm">
          {open && (
            <>
              <img src={open.image} alt="" className="aspect-[16/8] w-full object-cover" />
              <DialogHeader>
                <p className="eyebrow text-royal">{open.category} · {open.date}</p>
                <DialogTitle className="font-display text-2xl text-navy">{open.title}</DialogTitle>
              </DialogHeader>
              <p className="text-muted-foreground">{open.excerpt} This is a fictional demonstration article. The full story will be published once verified content is supplied by the University Communications Office.</p>
              <Button onClick={() => setOpen(null)} className="w-fit rounded-sm">Close</Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </SiteLayout>
  );
}
