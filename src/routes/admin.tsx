import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { LayoutDashboard, FileText, Wallet, GraduationCap, PenSquare, LogOut, Search } from "lucide-react";
import { toast } from "sonner";
import { DashShell, Stat, StatusBadge } from "@/components/portal/DashShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDemo } from "@/lib/demo-store";
import { formatUGX, programmes as seedProgrammes, news, type AdminApplication, type Transaction } from "@/lib/data";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Administration Dashboard — All Saints University Lira" },
      { name: "description", content: "Demo admissions administration dashboard." },
      { property: "og:title", content: "Admin Dashboard — ASUL" },
      { property: "og:description", content: "Admissions review and payments administration (demo)." },
    ],
  }),
  component: Admin,
});

const items = [
  { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard },
  { id: "applications", label: "Applications", icon: FileText },
  { id: "payments", label: "Payments", icon: Wallet },
  { id: "programmes", label: "Programmes", icon: GraduationCap },
  { id: "content", label: "Content", icon: PenSquare },
];
const progName = (s: string) => seedProgrammes.find((p) => p.slug === s)?.name ?? s;

function Admin() {
  const d = useDemo();
  const [tab, setTab] = useState("overview");
  const [review, setReview] = useState<string | null>(null);
  const apps = d.applications;
  const cur = apps.find((a) => a.ref === review);
  return (
    <DashShell title="Administration" items={items} active={tab} onSelect={(t) => { setTab(t); setReview(null); }} footer={<Link to="/" className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-sidebar-accent"><LogOut className="h-4 w-4" /> Exit to website</Link>}>
      {cur ? <Review a={cur} onBack={() => setReview(null)} /> : (
        <>
          {tab === "overview" && <Overview apps={apps} txns={d.transactions} onOpen={(r) => { setTab("applications"); setReview(r); }} />}
          {tab === "applications" && <Applications apps={apps} onOpen={setReview} />}
          {tab === "payments" && <Payments txns={d.transactions} />}
          {tab === "programmes" && <Programmes />}
          {tab === "content" && <Content />}
        </>
      )}
    </DashShell>
  );
}

function Overview({ apps, txns, onOpen }: { apps: AdminApplication[]; txns: Transaction[]; onOpen: (r: string) => void }) {
  const count = (s: string) => apps.filter((a) => a.status === s).length;
  const byProg = seedProgrammes.map((p) => ({ n: p.name.replace(/Bachelor of (Science in )?/, ""), c: apps.filter((a) => progName(a.programme) === p.name || a.programme === p.slug).length }));
  const max = Math.max(1, ...byProg.map((b) => b.c));
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Stat label="Total applications" value={apps.length} />
        <Stat label="Pending (draft)" value={count("Draft")} />
        <Stat label="Submitted" value={count("Submitted")} />
        <Stat label="Confirmed demo payments" value={txns.filter((t) => t.status === "Successful").length} />
        <Stat label="Awaiting review" value={count("Under Review") + count("Documents Requested")} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="border bg-background p-6"><h2 className="mb-4 font-semibold text-navy">Applications by programme</h2>
          {byProg.map((b) => <div key={b.n} className="mb-3 text-sm"><div className="flex justify-between"><span>{b.n}</span><span>{b.c}</span></div><div className="mt-1 h-2 bg-soft"><div className="h-2 bg-navy" style={{ width: `${(b.c / max) * 100}%` }} /></div></div>)}
        </div>
        <div className="border bg-background p-6"><h2 className="mb-4 font-semibold text-navy">Recent activity</h2>
          {apps.slice(0, 6).map((a) => <button key={a.ref} onClick={() => onOpen(a.ref)} className="flex w-full items-center justify-between border-b py-3 text-left text-sm last:border-0 hover:bg-soft"><span><strong className="text-navy">{a.name}</strong> · {a.date}</span><StatusBadge s={a.status} /></button>)}
        </div>
      </div>
    </div>
  );
}

function Applications({ apps, onOpen }: { apps: AdminApplication[]; onOpen: (r: string) => void }) {
  const [q, setQ] = useState(""); const [st, setSt] = useState("All"); const [pay, setPay] = useState("All");
  const list = useMemo(() => apps.filter((a) => (a.name + a.ref + progName(a.programme)).toLowerCase().includes(q.toLowerCase()) && (st === "All" || a.status === st) && (pay === "All" || a.payment === pay)), [apps, q, st, pay]);
  return (
    <div className="border bg-background">
      <div className="flex flex-wrap gap-3 border-b p-4">
        <div className="relative min-w-60 flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, ref, programme" className="rounded-sm pl-9" /></div>
        <Sel v={st} set={setSt} opts={["All", "Draft", "Submitted", "Under Review", "Documents Requested", "Approved", "Rejected"]} />
        <Sel v={pay} set={setPay} opts={["All", "Paid", "Pending", "Failed", "Unpaid"]} />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm"><thead className="bg-soft text-left text-muted-foreground"><tr>{["Applicant", "Reference", "Programme", "Date", "Payment", "Status", ""].map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}</tr></thead>
          <tbody>{list.map((a) => <tr key={a.ref} className="border-t hover:bg-soft/60"><td className="px-4 py-3 font-medium text-navy">{a.name}</td><td className="px-4 font-mono text-xs">{a.ref}</td><td className="px-4">{progName(a.programme)}</td><td className="px-4 whitespace-nowrap">{a.date}</td><td className="px-4"><StatusBadge s={a.payment} /></td><td className="px-4"><StatusBadge s={a.status} /></td><td className="px-4"><Button size="sm" variant="outline" className="rounded-sm" onClick={() => onOpen(a.ref)}>View Application</Button></td></tr>)}</tbody></table>
        {!list.length && <p className="py-12 text-center text-muted-foreground">No applications match these filters.</p>}
      </div>
    </div>
  );
}

function Sel({ v, set, opts }: { v: string; set: (s: string) => void; opts: string[] }) {
  return <select value={v} onChange={(e) => set(e.target.value)} className="h-9 rounded-sm border border-input bg-background px-3 text-sm">{opts.map((o) => <option key={o}>{o}</option>)}</select>;
}

function Review({ a, onBack }: { a: AdminApplication; onBack: () => void }) {
  const { updateApplication } = useDemo();
  const [note, setNote] = useState(""); const [noteOpen, setNoteOpen] = useState(false);
  const act = (status: AdminApplication["status"], msg: string) => { updateApplication(a.ref, { status }); toast.success(msg); };
  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack}>← Back to applications</Button>
      <div className="flex flex-wrap items-center justify-between gap-4 bg-navy p-6 text-navy-foreground">
        <div><p className="font-mono text-xs opacity-75">{a.ref}</p><h1 className="text-3xl font-semibold">{a.name}</h1><p className="text-sm opacity-75">{progName(a.programme)}</p></div>
        <StatusBadge s={a.status} />
      </div>
      <div className="flex flex-wrap gap-2">
        <Button className="rounded-sm bg-success hover:bg-success/90" onClick={() => act("Approved", "Application approved (demo)")}>Approve Application</Button>
        <Button variant="destructive" className="rounded-sm" onClick={() => act("Rejected", "Application rejected (demo)")}>Reject Application</Button>
        <Button variant="outline" className="rounded-sm" onClick={() => act("Documents Requested", "Document request sent to applicant (demo)")}>Request Documents</Button>
        <Button variant="outline" className="rounded-sm" onClick={() => setNoteOpen(true)}>Add Review Note</Button>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card t="Applicant details" rows={[["Email", a.email], ["Phone", a.phone], ["District", a.district], ["Applied", a.date], ["Payment", a.payment]]} />
        <Card t="Academic information" rows={[["School", a.school], ["Results", a.grades], ["Programme", progName(a.programme)]]} />
        <div className="border bg-background p-6"><h2 className="mb-3 font-semibold text-navy">Documents</h2>{["UCE Certificate", "UACE Certificate", "National ID", "Passport Photo"].map((x) => <button key={x} onClick={() => toast.info(`${x} preview placeholder (demo)`)} className="flex w-full justify-between border-b py-2 text-sm hover:text-royal">{x}<span className="text-xs text-muted-foreground">PDF</span></button>)}</div>
      </div>
      <div className="border bg-background p-6"><h2 className="mb-3 font-semibold text-navy">Review notes & timeline</h2>
        {[...a.notes].reverse().map((n, i) => <p key={i} className="border-l-2 border-gold py-1 pl-3 text-sm">{n}</p>)}
        <p className="mt-2 text-sm text-muted-foreground">Submitted {a.date} · Current status: {a.status}</p>
      </div>
      <Dialog open={noteOpen} onOpenChange={setNoteOpen}>
        <DialogContent className="rounded-sm"><DialogHeader><DialogTitle>Add review note</DialogTitle></DialogHeader>
          <Textarea value={note} onChange={(e) => setNote(e.target.value)} rows={4} placeholder="e.g. Results verified with UNEB." />
          <Button className="rounded-sm" onClick={() => { if (!note.trim()) return toast.error("Note cannot be empty"); updateApplication(a.ref, { notes: [...a.notes, note] }); setNote(""); setNoteOpen(false); toast.success("Note added"); }}>Save note</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Card({ t, rows }: { t: string; rows: string[][] }) {
  return <div className="border bg-background p-6"><h2 className="mb-3 font-semibold text-navy">{t}</h2><dl className="space-y-2 text-sm">{rows.map(([k, v]) => <div key={k} className="flex justify-between gap-3"><dt className="text-muted-foreground">{k}</dt><dd className="text-right font-medium">{v}</dd></div>)}</dl></div>;
}

function Payments({ txns }: { txns: Transaction[] }) {
  const [q, setQ] = useState(""); const [st, setSt] = useState("All"); const [m, setM] = useState("All"); const [view, setView] = useState<Transaction | null>(null);
  const list = txns.filter((t) => (t.txn + t.applicant + t.appRef).toLowerCase().includes(q.toLowerCase()) && (st === "All" || t.status === st) && (m === "All" || t.method === m));
  return (
    <div className="border bg-background">
      <div className="flex flex-wrap gap-3 border-b p-4">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search transactions" className="max-w-xs rounded-sm" />
        <Sel v={st} set={setSt} opts={["All", "Successful", "Pending", "Failed", "Cancelled"]} />
        <Sel v={m} set={setM} opts={["All", "MTN Mobile Money", "Airtel Money", "Visa", "Mastercard"]} />
      </div>
      <div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-soft text-left text-muted-foreground"><tr>{["Transaction", "Applicant", "App ref", "Amount", "Method", "Date", "Status", ""].map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}</tr></thead>
        <tbody>{list.map((t) => <tr key={t.txn} className="border-t"><td className="px-4 py-3 font-mono text-xs">{t.txn}</td><td className="px-4">{t.applicant}</td><td className="px-4 font-mono text-xs">{t.appRef}</td><td className="px-4 whitespace-nowrap">{formatUGX(t.amount)}</td><td className="px-4">{t.method}</td><td className="px-4 whitespace-nowrap">{t.date}</td><td className="px-4"><StatusBadge s={t.status} /></td><td className="px-4"><Button size="sm" variant="outline" className="rounded-sm" onClick={() => setView(t)}>View Details</Button></td></tr>)}</tbody></table>
        {!list.length && <p className="py-12 text-center text-muted-foreground">No transactions found.</p>}
      </div>
      <Dialog open={!!view} onOpenChange={(o) => !o && setView(null)}>
        <DialogContent className="rounded-sm"><DialogHeader><DialogTitle>Transaction details (demo)</DialogTitle></DialogHeader>
          {view && <dl className="space-y-2 text-sm">{Object.entries(view).map(([k, v]) => <div key={k} className="flex justify-between border-b pb-1"><dt className="capitalize text-muted-foreground">{k}</dt><dd>{k === "amount" ? formatUGX(v as number) : String(v)}</dd></div>)}</dl>}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Programmes() {
  const [list, setList] = useState(seedProgrammes.map((p) => ({ slug: p.slug, name: p.name, level: p.level, faculty: p.faculty, archived: false })));
  const [edit, setEdit] = useState<{ slug: string; name: string; level: string; faculty: string } | null>(null);
  const save = () => {
    if (!edit?.name.trim()) return toast.error("Name is required");
    setList((l) => l.some((p) => p.slug === edit.slug) ? l.map((p) => p.slug === edit.slug ? { ...p, ...edit } : p) : [...l, { ...edit, archived: false }]);
    toast.success("Programme saved (demo)"); setEdit(null);
  };
  return (
    <div className="border bg-background">
      <div className="flex justify-between border-b p-4"><h2 className="font-semibold text-navy">Programmes</h2><Button className="rounded-sm" onClick={() => setEdit({ slug: `new-${Date.now()}`, name: "", level: "Undergraduate", faculty: "" })}>Add Programme</Button></div>
      <table className="w-full text-sm"><tbody>{list.map((p) => <tr key={p.slug} className={`border-t ${p.archived ? "opacity-50" : ""}`}><td className="px-4 py-3 font-medium text-navy">{p.name}</td><td className="px-4">{p.level}</td><td className="hidden px-4 md:table-cell">{p.faculty}</td><td className="space-x-2 px-4 text-right whitespace-nowrap"><Button size="sm" variant="outline" className="rounded-sm" onClick={() => setEdit(p)}>Edit</Button><Button size="sm" variant="ghost" onClick={() => { setList((l) => l.map((x) => x.slug === p.slug ? { ...x, archived: !x.archived } : x)); toast.success(p.archived ? "Restored" : "Archived"); }}>{p.archived ? "Restore" : "Archive"}</Button></td></tr>)}</tbody></table>
      <Dialog open={!!edit} onOpenChange={(o) => !o && setEdit(null)}>
        <DialogContent className="rounded-sm"><DialogHeader><DialogTitle>Programme</DialogTitle></DialogHeader>
          {edit && <div className="space-y-3"><Input value={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} placeholder="Programme name" /><Input value={edit.faculty} onChange={(e) => setEdit({ ...edit, faculty: e.target.value })} placeholder="Faculty" /><Sel v={edit.level} set={(level) => setEdit({ ...edit, level })} opts={["Undergraduate", "Postgraduate", "Diploma"]} /><Button className="w-full rounded-sm" onClick={save}>Save</Button></div>}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Content() {
  const { announcement, setAnnouncement } = useDemo();
  const [a, setA] = useState(announcement);
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="border bg-background p-6"><h2 className="font-semibold text-navy">Homepage announcement</h2><Textarea value={a} onChange={(e) => setA(e.target.value)} rows={3} className="mt-3" /><Button className="mt-3 rounded-sm" onClick={() => { setAnnouncement(a); toast.success("Announcement published — visible on the website (demo)"); }}>Publish</Button></div>
      <div className="border bg-background p-6"><h2 className="font-semibold text-navy">University information</h2>{[["Name", "All Saints University Lira"], ["Email", "info@asul.example"], ["Phone", "+256 000 000 000"]].map(([k, v]) => <div key={k} className="mt-3"><p className="text-xs text-muted-foreground">{k}</p><Input defaultValue={v} /></div>)}<Button className="mt-3 rounded-sm" onClick={() => toast.success("Saved (demo)")}>Save</Button></div>
      <div className="border bg-background p-6 lg:col-span-2"><div className="flex justify-between"><h2 className="font-semibold text-navy">News & events</h2><Button size="sm" className="rounded-sm" onClick={() => toast.success("New article draft created (demo)")}>New article</Button></div>
        {news.map((n) => <div key={n.id} className="flex items-center justify-between border-b py-3 text-sm last:border-0"><span>{n.title}<span className="ml-2 text-muted-foreground">{n.date}</span></span><Button size="sm" variant="ghost" onClick={() => toast.info("Editor opened (demo)")}>Edit</Button></div>)}
      </div>
    </div>
  );
}
