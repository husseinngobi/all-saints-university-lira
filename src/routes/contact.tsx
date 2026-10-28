import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { images } from "@/lib/data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — All Saints University Lira" },
      { name: "description", content: "Get in touch with admissions and offices at All Saints University Lira." },
      { property: "og:title", content: "Contact All Saints University Lira" },
      { property: "og:description", content: "Reach admissions and university offices." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<Record<string, string>>({});
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const errors: Record<string, string> = {};
    if (!String(fd.get("name")).trim()) errors.name = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(String(fd.get("email")))) errors.email = "Enter a valid email address";
    if (String(fd.get("message")).trim().length < 10) errors.message = "Message should be at least 10 characters";
    setErr(errors);
    if (Object.keys(errors).length) return;
    setLoading(true);
    const form = e.currentTarget;
    setTimeout(() => { setLoading(false); form.reset(); toast.success("Message sent (demo). Admissions will respond within 2 working days."); }, 1200);
  };
  return (
    <SiteLayout>
      <PageHeader eyebrow="Contact" title="We'd love to hear from you" image={images.campus} crumbs={[{ label: "Contact" }]} />
      <section className="mx-auto grid max-w-7xl gap-16 px-4 py-20 lg:grid-cols-[1fr_1.3fr] lg:px-8">
        <div className="space-y-8">
          {[
            [MapPin, "Address", "P.O. Box 000, Lira City, Uganda"],
            [Phone, "Telephone", "+256 000 000 000"],
            [Mail, "Email", "admissions@asul.example"],
            [Clock, "Office hours", "Mon – Fri, 8:00 AM – 5:00 PM"],
          ].map(([I, k, v]) => {
            const Icon = I as typeof Mail;
            return (
              <div key={k as string} className="flex gap-5 border-b pb-6">
                <Icon className="h-6 w-6 text-gold" />
                <div><p className="eyebrow text-muted-foreground">{k as string}</p><p className="mt-1 text-lg text-navy">{v as string}</p></div>
              </div>
            );
          })}
          <p className="text-xs text-muted-foreground">Contact details are placeholders until confirmed.</p>
          <div className="grid aspect-video place-items-center bg-soft text-muted-foreground">Map placeholder — Lira City</div>
        </div>
        <form onSubmit={onSubmit} noValidate className="space-y-5 border-t-4 border-gold bg-soft p-8">
          <h2 className="text-3xl font-semibold text-navy">Send an enquiry</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <F label="Full name" name="name" err={err.name} />
            <F label="Email" name="email" type="email" err={err.email} />
          </div>
          <F label="Subject" name="subject" />
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" rows={6} className="mt-2 rounded-sm bg-background" />
            {err.message && <p className="mt-1 text-sm text-destructive">{err.message}</p>}
          </div>
          <Button type="submit" size="lg" disabled={loading} className="rounded-sm">{loading && <Loader2 className="animate-spin" />} Send Message</Button>
        </form>
      </section>
    </SiteLayout>
  );
}

function F({ label, name, type = "text", err }: { label: string; name: string; type?: string; err?: string }) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} className="mt-2 rounded-sm bg-background" />
      {err && <p className="mt-1 text-sm text-destructive">{err}</p>}
    </div>
  );
}
