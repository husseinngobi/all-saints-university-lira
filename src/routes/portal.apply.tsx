import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Loader2, Upload, Smartphone, CreditCard, XCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import { PortalShell, DemoBadge } from "@/components/portal/PortalShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useDemo, type ApplicationForm } from "@/lib/demo-store";
import { programmes, formatUGX, APPLICATION_FEE, PROCESSING_FEE } from "@/lib/data";

export const Route = createFileRoute("/portal/apply")({
  head: () => ({
    meta: [
      { title: "Application Form — All Saints University Lira" },
      { name: "description", content: "Complete your multi-step application to All Saints University Lira." },
      { property: "og:title", content: "Application Form — ASUL" },
      { property: "og:description", content: "Multi-step online application." },
    ],
  }),
  component: Apply,
});

const STEPS = ["Personal", "Academic", "Programme", "Documents", "Review", "Payment"];
const DOCS = ["UCE Certificate", "UACE Certificate", "National ID / Passport", "Passport Photo"];
const METHODS = [
  { id: "MTN Mobile Money", icon: Smartphone, note: "Pay with *165#" },
  { id: "Airtel Money", icon: Smartphone, note: "Pay with *185#" },
  { id: "Visa", icon: CreditCard, note: "Debit or credit card" },
  { id: "Mastercard", icon: CreditCard, note: "Debit or credit card" },
];

export const progName = (slug: string) => programmes.find((p) => p.slug === slug)?.name ?? slug;

function Apply() {
  const d = useDemo();
  const { form, setForm, step, setStep } = d;
  const nav = useNavigate();
  const [err, setErr] = useState<Record<string, string>>({});
  const [method, setMethod] = useState("MTN Mobile Money");
  const [outcome, setOutcome] = useState<"Successful" | "Failed" | "Pending">("Successful");
  const [phase, setPhase] = useState<"idle" | "processing" | "Failed" | "Pending">("idle");
  const [uploading, setUploading] = useState<string | null>(null);

  const f = (k: keyof ApplicationForm, label: string, type = "text") => (
    <div>
      <Label htmlFor={k}>{label}</Label>
      <Input id={k} type={type} value={String(form[k] ?? "")} onChange={(e) => setForm({ [k]: e.target.value })} className="mt-2 rounded-sm" />
      {err[k] && <p className="mt-1 text-sm text-destructive">{err[k]}</p>}
    </div>
  );
  const sel = (k: keyof ApplicationForm, label: string, opts: [string, string][]) => (
    <div>
      <Label htmlFor={k}>{label}</Label>
      <select id={k} value={String(form[k])} onChange={(e) => setForm({ [k]: e.target.value })} className="mt-2 h-9 w-full rounded-sm border border-input bg-background px-3 text-sm">
        {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </div>
  );

  const validate = () => {
    const e: Record<string, string> = {};
    const req: Record<number, (keyof ApplicationForm)[]> = { 0: ["firstName", "lastName", "dob", "email", "phone", "district"], 1: ["school", "yearCompleted", "grades"] };
    (req[step] ?? []).forEach((k) => { if (!String(form[k]).trim()) e[k] = "This field is required"; });
    if (step === 3 && Object.keys(form.documents).length < 2) e.docs = "Upload at least your certificates (2 documents) to continue";
    if (step === 4 && !form.declaration) e.declaration = "Please confirm the declaration";
    setErr(e);
    return !Object.keys(e).length;
  };
  const next = () => { if (validate()) setStep(Math.min(step + 1, 5)); else toast.error("Please fix the highlighted fields"); };

  const fakeUpload = (doc: string, file?: File) => {
    setUploading(doc);
    setTimeout(() => { setForm({ documents: { ...form.documents, [doc]: file?.name ?? `${doc.toLowerCase().replace(/\W+/g, "_")}.pdf` } }); setUploading(null); toast.success(`${doc} attached (demo — not uploaded)`); }, 800);
  };

  const pay = () => {
    setPhase("processing");
    setTimeout(() => {
      const rec = { status: outcome, method, txn: `TXN-DEMO-${Math.floor(100000 + Math.random() * 900000)}`, amount: APPLICATION_FEE + PROCESSING_FEE, date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) };
      d.setPayment(rec);
      if (outcome === "Successful") { d.submit(); toast.success("Demo payment successful"); nav({ to: "/portal/confirmation" }); setPhase("idle"); }
      else setPhase(outcome);
    }, 2500);
  };
  const cancel = () => { d.setPayment({ status: "Cancelled", method, txn: "TXN-DEMO-CANCELLED", amount: APPLICATION_FEE + PROCESSING_FEE, date: new Date().toLocaleDateString("en-GB") }); toast.warning("Payment cancelled (demo)"); };

  return (
    <PortalShell>
      <div className="mx-auto max-w-4xl px-4 py-10">
        <ol className="mb-8 grid grid-cols-6 gap-1">
          {STEPS.map((s, i) => (
            <li key={s}>
              <button onClick={() => i < step && setStep(i)} className="w-full text-left">
                <div className={`h-1 ${i <= step ? "bg-royal" : "bg-border"}`} />
                <p className={`mt-2 flex items-center gap-1 text-xs font-medium ${i === step ? "text-navy" : "text-muted-foreground"}`}>
                  {i < step ? <Check className="h-3 w-3 text-success" /> : <span>{i + 1}.</span>}<span className="hidden sm:inline">{s}</span>
                </p>
              </button>
            </li>
          ))}
        </ol>
        <div className="border bg-background p-6 md:p-10">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-navy md:text-3xl">Step {step + 1}: {["Personal Information", "Academic Background", "Programme Selection", "Document Upload", "Review Application", "Application Fee Payment"][step]}</h1>
            <DemoBadge />
          </div>

          {step === 0 && <div className="grid gap-4 sm:grid-cols-2">{f("firstName", "First name")}{f("lastName", "Surname")}{f("dob", "Date of birth", "date")}{sel("gender", "Gender", [["Female", "Female"], ["Male", "Male"]])}{f("nationality", "Nationality")}{f("nin", "National ID (NIN)")}{f("email", "Email", "email")}{f("phone", "Telephone")}{f("district", "District")}{f("address", "Address")}</div>}
          {step === 1 && <div className="grid gap-4 sm:grid-cols-2">{f("school", "Last school attended")}{sel("qualification", "Highest qualification", [["UACE", "UACE (A-Level)"], ["Diploma", "Diploma"], ["Degree", "Bachelor's degree"]])}{f("yearCompleted", "Year completed")}{f("grades", "Results / points")}</div>}
          {step === 2 && (
            <div className="space-y-6">
              <div className="grid gap-3 sm:grid-cols-2">
                {programmes.map((p) => (
                  <button key={p.slug} onClick={() => setForm({ programme: p.slug })} className={`border p-4 text-left transition-colors ${form.programme === p.slug ? "border-royal bg-accent" : "hover:bg-soft"}`}>
                    <p className="text-xs text-muted-foreground">{p.level} · {p.duration}</p><p className="font-semibold text-navy">{p.name}</p>
                  </button>
                ))}
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {sel("secondChoice", "Second choice", programmes.map((p) => [p.slug, p.name]))}
                {sel("intake", "Intake", [["January 2027", "January 2027"], ["May 2027", "May 2027"], ["August 2027", "August 2027"]])}
                {sel("studyMode", "Study mode", [["Day", "Day"], ["Evening", "Evening"], ["Weekend", "Weekend"]])}
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-3">
              {DOCS.map((doc) => (
                <div key={doc} className="flex items-center justify-between gap-4 border border-dashed p-4">
                  <div><p className="font-medium text-navy">{doc}</p><p className="text-sm text-muted-foreground">{form.documents[doc] ?? "PDF, JPG or PNG · max 5MB"}</p></div>
                  {uploading === doc ? <Loader2 className="animate-spin text-royal" /> : form.documents[doc] ? <span className="flex items-center gap-1 text-sm font-semibold text-success"><Check className="h-4 w-4" /> Attached</span> : (
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-sm border px-3 py-2 text-sm font-medium hover:bg-soft"><Upload className="h-4 w-4" /> Choose file<input type="file" className="hidden" onChange={(e) => fakeUpload(doc, e.target.files?.[0])} /></label>
                  )}
                </div>
              ))}
              <Button variant="link" className="px-0" onClick={() => DOCS.forEach((doc, i) => setTimeout(() => fakeUpload(doc), i * 50))}>Attach sample documents</Button>
              {err.docs && <p className="text-sm text-destructive">{err.docs}</p>}
              <p className="text-xs text-muted-foreground">Files stay in your browser — nothing is transmitted in this demo.</p>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-6">
              {[
                ["Personal", [["Name", `${form.firstName} ${form.lastName}`], ["Date of birth", form.dob], ["Email", form.email], ["Phone", form.phone], ["District", form.district]]],
                ["Academic", [["School", form.school], ["Qualification", form.qualification], ["Results", form.grades], ["Year", form.yearCompleted]]],
                ["Programme", [["First choice", progName(form.programme)], ["Second choice", progName(form.secondChoice)], ["Intake", form.intake], ["Mode", form.studyMode]]],
                ["Documents", Object.entries(form.documents)],
              ].map(([t, rows]) => (
                <div key={t as string}>
                  <h3 className="eyebrow mb-2 text-royal">{t as string}</h3>
                  <dl className="grid gap-x-6 gap-y-2 border-t pt-3 text-sm sm:grid-cols-2">
                    {(rows as string[][]).map(([k, v]) => <div key={k} className="flex justify-between gap-3"><dt className="text-muted-foreground">{k}</dt><dd className="text-right font-medium text-navy">{v}</dd></div>)}
                  </dl>
                </div>
              ))}
              <label className="flex items-start gap-3 bg-soft p-4 text-sm"><Checkbox checked={form.declaration} onCheckedChange={(c) => setForm({ declaration: !!c })} /> I declare that the information provided is true and complete to the best of my knowledge.</label>
              {err.declaration && <p className="text-sm text-destructive">{err.declaration}</p>}
            </div>
          )}
          {step === 5 && (
            <div className="grid gap-8 md:grid-cols-[1fr_280px]">
              <div>
                <p className="mb-3 font-medium text-navy">Choose payment method</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {METHODS.map((m) => (
                    <button key={m.id} onClick={() => setMethod(m.id)} className={`flex items-center gap-3 border p-4 text-left ${method === m.id ? "border-royal bg-accent ring-1 ring-royal" : "hover:bg-soft"}`}>
                      <m.icon className="h-6 w-6 text-navy" /><div><p className="font-semibold text-navy">{m.id}</p><p className="text-xs text-muted-foreground">{m.note}</p></div>
                    </button>
                  ))}
                </div>
                <div className="mt-5">
                  {method.includes("Money") ? (<div><Label>Mobile number</Label><Input defaultValue={form.phone} className="mt-2 rounded-sm" /></div>) : (
                    <div className="grid grid-cols-2 gap-3"><div className="col-span-2"><Label>Card number</Label><Input defaultValue="4242 4242 4242 4242" className="mt-2 rounded-sm" /></div><div><Label>Expiry</Label><Input defaultValue="12/28" className="mt-2 rounded-sm" /></div><div><Label>CVV</Label><Input defaultValue="123" className="mt-2 rounded-sm" /></div></div>
                  )}
                </div>
                <div className="mt-5 border border-dashed p-4">
                  <Label>Demo outcome to simulate</Label>
                  <div className="mt-2 flex gap-2">{(["Successful", "Pending", "Failed"] as const).map((o) => <Button key={o} size="sm" variant={outcome === o ? "default" : "outline"} className="rounded-sm" onClick={() => setOutcome(o)}>{o}</Button>)}</div>
                </div>
              </div>
              <div className="h-fit bg-soft p-5 text-sm">
                <p className="eyebrow text-royal">Order summary</p>
                <dl className="mt-3 space-y-2">
                  <div className="flex justify-between"><dt>Reference</dt><dd className="font-mono">{d.appRef}</dd></div>
                  <div className="flex justify-between gap-2"><dt>Applicant</dt><dd className="text-right">{form.firstName} {form.lastName}</dd></div>
                  <div><dt className="text-muted-foreground">Programme</dt><dd className="font-medium">{progName(form.programme)}</dd></div>
                  <div className="flex justify-between border-t pt-2"><dt>Application fee</dt><dd>{formatUGX(APPLICATION_FEE)}</dd></div>
                  <div className="flex justify-between"><dt>Processing</dt><dd>{formatUGX(PROCESSING_FEE)}</dd></div>
                  <div className="flex justify-between border-t pt-2 text-base font-semibold text-navy"><dt>Total</dt><dd>{formatUGX(APPLICATION_FEE + PROCESSING_FEE)}</dd></div>
                </dl>
                <Button className="mt-5 w-full rounded-sm" size="lg" onClick={pay}>Pay Now</Button>
                <Button variant="ghost" className="mt-2 w-full rounded-sm" onClick={cancel}>Cancel</Button>
                <p className="mt-3 text-center"><DemoBadge>Demo only — no real charge</DemoBadge></p>
              </div>
            </div>
          )}

          {step < 5 && (
            <div className="mt-10 flex justify-between border-t pt-6">
              <Button variant="outline" className="rounded-sm" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</Button>
              <div className="flex gap-2"><Button variant="ghost" onClick={() => toast.success("Progress saved (demo)")}>Save draft</Button><Button className="rounded-sm" onClick={next}>Continue</Button></div>
            </div>
          )}
          {step === 5 && <Button variant="outline" className="mt-8 rounded-sm" onClick={() => setStep(4)}>Back to review</Button>}
        </div>
      </div>
      <Dialog open={phase !== "idle"} onOpenChange={(o) => !o && phase !== "processing" && setPhase("idle")}>
        <DialogContent className="rounded-sm text-center">
          <DialogTitle className="sr-only">Payment status</DialogTitle>
          {phase === "processing" && <div className="py-6"><Loader2 className="mx-auto h-12 w-12 animate-spin text-royal" /><p className="mt-4 font-semibold text-navy">Processing {method} payment…</p><p className="text-sm text-muted-foreground">{method.includes("Money") ? "Approve the prompt on your phone (simulated)." : "Contacting your bank (simulated)."}</p><DemoBadge>Demo only</DemoBadge></div>}
          {phase === "Failed" && <div className="py-6"><XCircle className="mx-auto h-12 w-12 text-destructive" /><p className="mt-4 font-semibold text-navy">Payment failed</p><p className="text-sm text-muted-foreground">Insufficient balance (simulated). Try again or choose another method.</p><Button className="mt-4 rounded-sm" onClick={() => setPhase("idle")}>Try again</Button></div>}
          {phase === "Pending" && <div className="py-6"><Clock className="mx-auto h-12 w-12 text-warning" /><p className="mt-4 font-semibold text-navy">Payment pending</p><p className="text-sm text-muted-foreground">Awaiting confirmation from the network (simulated).</p><Button className="mt-4 rounded-sm" onClick={() => setPhase("idle")}>OK</Button></div>}
        </DialogContent>
      </Dialog>
    </PortalShell>
  );
}
