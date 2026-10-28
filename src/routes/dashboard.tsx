import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LayoutDashboard, FileText, Activity, Receipt, Bell, User, LogOut, Check } from "lucide-react";
import { toast } from "sonner";
import { DashShell, Stat, StatusBadge } from "@/components/portal/DashShell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useDemo } from "@/lib/demo-store";
import { formatUGX, programmes } from "@/lib/data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Student Dashboard — All Saints University Lira" },
      { name: "description", content: "Track your application, payments and notifications." },
      { property: "og:title", content: "Student Dashboard — ASUL" },
      { property: "og:description", content: "Applicant and student dashboard." },
    ],
  }),
  component: Dashboard,
});

const items = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "application", label: "My Application", icon: FileText },
  { id: "status", label: "Application Status", icon: Activity },
  { id: "payments", label: "Payments & Receipts", icon: Receipt },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "profile", label: "My Profile", icon: User },
];

function Dashboard() {
  const d = useDemo();
  const nav = useNavigate();
  const [tab, setTab] = useState("overview");
  const name = d.user?.name ?? `${d.form.firstName} ${d.form.lastName}`;
  const paid = d.payment?.status === "Successful";
  const adminRec = d.applications.find((a) => a.ref === d.appRef);
  const decided = adminRec && ["Approved", "Rejected"].includes(adminRec.status);
  const timeline = [
    ["Account Created", true], ["Application Started", true], ["Application Submitted", d.submitted], ["Application Fee Confirmed", paid], ["Documents Under Review", paid], ["Admission Decision", !!decided],
  ] as const;
  const done = timeline.filter((t) => t[1]).length;
  const prog = programmes.find((p) => p.slug === d.form.programme)?.name ?? d.form.programme;
  const notes = [
    paid ? "Your application fee payment was confirmed." : "Complete your application fee payment to submit.",
    "Open Day takes place on 15 November 2026.",
    adminRec?.status === "Documents Requested" ? "Admissions has requested additional documents." : "Application deadline: 15 December 2026.",
  ];
  const logout = () => { d.logout(); toast.success("Signed out"); nav({ to: "/portal/login" }); };

  const Timeline = () => (
    <ol className="relative space-y-6 border-l-2 border-border pl-6">
      {timeline.map(([t, ok]) => (
        <li key={t} className="relative">
          <span className={`absolute -left-[33px] grid h-5 w-5 place-items-center rounded-full ${ok ? "bg-success text-navy-foreground" : "border-2 bg-background"}`}>{ok && <Check className="h-3 w-3" />}</span>
          <p className={`font-medium ${ok ? "text-navy" : "text-muted-foreground"}`}>{t}</p>
          {t === "Admission Decision" && adminRec && decided && <StatusBadge s={adminRec.status} />}
        </li>
      ))}
    </ol>
  );

  return (
    <DashShell title="Student Portal" items={items} active={tab} onSelect={setTab} footer={<button onClick={logout} className="flex w-full items-center gap-3 px-3 py-2 text-sm hover:bg-sidebar-accent"><LogOut className="h-4 w-4" /> Logout</button>}>
      {tab === "overview" && (
        <div className="space-y-6">
          <div className="bg-navy p-6 text-navy-foreground"><p className="text-sm opacity-75">Welcome back,</p><h1 className="text-3xl font-semibold">{name}</h1><p className="mt-1 text-sm opacity-75">{d.form.email} · {d.form.phone}</p></div>
          <div className="grid gap-4 md:grid-cols-4">
            <Stat label="Application ref" value={<span className="font-mono text-lg">{d.appRef}</span>} />
            <Stat label="Programme" value={<span className="text-lg">{prog}</span>} />
            <Stat label="Payment" value={<StatusBadge s={paid ? "Paid" : d.payment?.status ?? "Unpaid"} />} />
            <Stat label="Progress" value={`${Math.round((done / 6) * 100)}%`} />
          </div>
          <Progress value={(done / 6) * 100} />
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="border bg-background p-6 lg:col-span-1"><h2 className="mb-5 font-semibold text-navy">Application timeline</h2><Timeline /></div>
            <div className="border bg-background p-6"><h2 className="mb-4 font-semibold text-navy">Recent notifications</h2>{notes.map((n) => <p key={n} className="border-b py-3 text-sm last:border-0">{n}</p>)}</div>
            <div className="border bg-background p-6"><h2 className="mb-4 font-semibold text-navy">Important dates</h2>{[["15 Nov", "Open Day"], ["15 Dec", "Application deadline"], ["13 Jan", "Orientation"]].map(([a, b]) => <div key={b} className="flex gap-4 border-b py-3 text-sm last:border-0"><span className="w-14 font-semibold text-royal">{a}</span>{b}</div>)}</div>
          </div>
          {!paid && <Button asChild className="rounded-sm"><Link to="/portal/apply">Continue application</Link></Button>}
        </div>
      )}
      {tab === "application" && (
        <div className="border bg-background p-6">
          <h2 className="text-xl font-semibold text-navy">My Application</h2>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">{[["Name", name], ["Programme", prog], ["Intake", d.form.intake], ["Mode", d.form.studyMode], ["School", d.form.school], ["Results", d.form.grades], ["Documents", `${Object.keys(d.form.documents).length} attached`]].map(([k, v]) => <div key={k}><dt className="text-muted-foreground">{k}</dt><dd className="font-medium text-navy">{v}</dd></div>)}</dl>
          <Button asChild variant="outline" className="mt-6 rounded-sm"><Link to="/portal/apply">Edit application</Link></Button>
        </div>
      )}
      {tab === "status" && <div className="max-w-xl border bg-background p-6"><h2 className="mb-6 text-xl font-semibold text-navy">Application Status</h2><Timeline /></div>}
      {tab === "payments" && (
        <div className="border bg-background p-6">
          <h2 className="text-xl font-semibold text-navy">Payments & Receipts</h2>
          {d.payment ? (
            <table className="mt-4 w-full text-sm"><thead className="text-left text-muted-foreground"><tr><th className="py-2">Transaction</th><th>Method</th><th>Amount</th><th>Status</th><th /></tr></thead>
              <tbody><tr className="border-t"><td className="py-3 font-mono">{d.payment.txn}</td><td>{d.payment.method}</td><td>{formatUGX(d.payment.amount)}</td><td><StatusBadge s={d.payment.status} /></td><td>{paid && <Link to="/portal/confirmation" className="font-semibold text-royal">Receipt</Link>}</td></tr></tbody></table>
          ) : <p className="py-10 text-center text-muted-foreground">No payments yet. <Link to="/portal/apply" className="text-royal">Pay application fee</Link></p>}
        </div>
      )}
      {tab === "notifications" && <div className="border bg-background p-6">{notes.map((n) => <div key={n} className="flex items-center justify-between border-b py-4 text-sm last:border-0">{n}<Button size="sm" variant="ghost" onClick={() => toast.success("Marked as read")}>Mark read</Button></div>)}</div>}
      {tab === "profile" && (
        <div className="max-w-xl border bg-background p-6">
          <h2 className="text-xl font-semibold text-navy">My Profile</h2>
          <dl className="mt-4 space-y-3 text-sm">{[["Name", name], ["Email", d.form.email], ["Phone", d.form.phone], ["District", d.form.district], ["Nationality", d.form.nationality]].map(([k, v]) => <div key={k} className="flex justify-between border-b pb-2"><dt className="text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></div>)}</dl>
          <Button className="mt-6 rounded-sm" onClick={() => toast.success("Profile updated (demo)")}>Save changes</Button>
        </div>
      )}
    </DashShell>
  );
}
