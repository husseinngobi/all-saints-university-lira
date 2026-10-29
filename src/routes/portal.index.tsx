import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, CalendarDays, Wallet, CheckCircle2, ArrowRight, LogIn, RotateCcw } from "lucide-react";
import { PortalShell, DemoBadge } from "@/components/portal/PortalShell";
import { Button } from "@/components/ui/button";
import { formatUGX, APPLICATION_FEE, images } from "@/lib/data";
import { useDemo } from "@/lib/demo-store";

export const Route = createFileRoute("/portal/")({
  head: () => ({
    meta: [
      { title: "Admissions Portal — All Saints University Lira" },
      { name: "description", content: "Start or continue your application to All Saints University Lira." },
      { property: "og:title", content: "Admissions Portal — All Saints University Lira" },
      { property: "og:description", content: "Start or continue your online application." },
    ],
  }),
  component: PortalLanding,
});

function PortalLanding() {
  const { step, setStep } = useDemo();
  return (
    <PortalShell right={<Link to="/portal/login" className="font-semibold text-royal">Applicant Login</Link>}>
      <section className="relative isolate overflow-hidden bg-navy text-navy-foreground">
        <img src={images.library} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25" />
        <div className="mx-auto max-w-6xl px-4 py-16">
          <DemoBadge>Demonstration</DemoBadge>
          <h1 className="mt-4 text-4xl font-semibold md:text-5xl">Welcome to the Admissions Portal</h1>
          <p className="mt-4 max-w-2xl text-lg opacity-85">Apply for undergraduate, diploma and postgraduate programmes online. Save your progress, pay your fee and track your decision.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-sm bg-gold text-gold-foreground hover:bg-gold/90"><Link to="/portal/register">Start Application <ArrowRight /></Link></Button>
            <Button asChild size="lg" variant="outline" className="rounded-sm border-navy-foreground/50 bg-transparent text-navy-foreground hover:bg-navy-foreground hover:text-navy">
              <Link to="/portal/apply"><RotateCcw /> Continue Application{step > 0 ? ` (Step ${step + 1})` : ""}</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="rounded-sm text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground"><Link to="/portal/login"><LogIn /> Applicant Login</Link></Button>
          </div>
        </div>
      </section>
      <section className="border-b bg-soft">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <p className="eyebrow text-royal">How applying works</p>
          <h2 className="mt-2 text-3xl font-semibold text-navy">New applicant? No prior login needed.</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">First-time applicants create a free applicant account in under a minute. That account saves your form, links your payment to your application, and lets you track your decision later.</p>
          <ol className="mt-8 grid gap-4 md:grid-cols-5">
            {[
              ["Create account", "Name, email & phone. A verification code is sent by SMS (simulated)."],
              ["Fill the form", "Personal details, academics, programme choice. Saves automatically."],
              ["Upload documents", "Result slips, ID and passport photo."],
              ["Pay the fee", `${formatUGX(APPLICATION_FEE)} via MTN MoMo, Airtel Money or card — you approve on your phone.`],
              ["Get your receipt", "Instant reference number, receipt by email/SMS, then track status."],
            ].map(([t, d], n) => (
              <li key={t} className="relative border-t-2 border-navy bg-background p-5">
                <span className="font-display text-3xl text-gold">0{n + 1}</span>
                <p className="mt-2 font-semibold text-navy">{t}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-muted-foreground">Already started? <Link to="/portal/login" className="font-semibold text-royal hover:underline">Log in to continue</Link> — your progress and payment status are saved.</p>
        </div>
      </section>
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 lg:grid-cols-3">
        <div className="border bg-background p-6 lg:col-span-2">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-navy"><FileText className="h-5 w-5 text-royal" /> Application instructions</h2>
          <ol className="mt-5 space-y-3 text-sm">
            {["Create an applicant account using a valid email and phone number.", "Complete all six steps of the application form.", "Upload clear scans of your academic documents and ID.", "Pay the non-refundable application fee via Mobile Money or card.", "Monitor your dashboard for updates and the admission decision."].map((s, i) => (
              <li key={s} className="flex gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center bg-navy text-xs text-navy-foreground">{i + 1}</span>{s}</li>
            ))}
          </ol>
          <h3 className="mt-8 font-semibold text-navy">Requirements checklist</h3>
          <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            {["UCE certificate / result slip", "UACE certificate / result slip", "National ID or passport", "Recent passport photo", "Diploma transcript (if applicable)", "Recommendation letter (postgraduate)"].map((r) => (
              <li key={r} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" />{r}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-6">
          <div className="border bg-background p-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-navy"><CalendarDays className="h-5 w-5 text-royal" /> Admission cycles</h2>
            <div className="mt-4 space-y-3 text-sm">
              {[["January 2027", "Open", "15 Dec 2026"], ["May 2027", "Opens Jan", "15 Apr 2027"], ["August 2027", "Opens Mar", "15 Jul 2027"]].map(([a, s, d]) => (
                <div key={a} className="flex items-center justify-between border-b pb-3 last:border-0">
                  <div><p className="font-medium text-navy">{a}</p><p className="text-muted-foreground">Deadline {d}</p></div>
                  <span className={`px-2 py-0.5 text-xs font-semibold ${s === "Open" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>{s}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t-4 border-gold bg-background p-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-navy"><Wallet className="h-5 w-5 text-royal" /> Application fee</h2>
            <p className="mt-3 font-display text-3xl text-navy">{formatUGX(APPLICATION_FEE)}</p>
            <p className="mt-1 text-sm text-muted-foreground">MTN MoMo · Airtel Money · Visa · Mastercard</p>
            <p className="mt-3"><DemoBadge>Sample fee</DemoBadge></p>
          </div>
          <Button variant="outline" className="w-full rounded-sm" onClick={() => setStep(0)} asChild><Link to="/portal/apply">Open application wizard</Link></Button>
        </div>
      </div>
    </PortalShell>
  );
}
