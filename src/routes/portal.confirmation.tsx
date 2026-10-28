import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Download } from "lucide-react";
import { PortalShell, DemoBadge } from "@/components/portal/PortalShell";
import { Button } from "@/components/ui/button";
import { useDemo } from "@/lib/demo-store";
import { formatUGX, programmes } from "@/lib/data";

export const Route = createFileRoute("/portal/confirmation")({
  head: () => ({
    meta: [
      { title: "Application Submitted — All Saints University Lira" },
      { name: "description", content: "Application confirmation and payment receipt." },
      { property: "og:title", content: "Application Submitted — ASUL" },
      { property: "og:description", content: "Your application confirmation and receipt." },
    ],
  }),
  component: Confirmation,
});

function Confirmation() {
  const { appRef, form, payment, submittedAt } = useDemo();
  const prog = programmes.find((p) => p.slug === form.programme)?.name ?? form.programme;
  return (
    <PortalShell>
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-8 text-center print:hidden">
          <CheckCircle2 className="mx-auto h-14 w-14 text-success" />
          <h1 className="mt-4 text-3xl font-semibold text-navy">Application submitted</h1>
          <p className="mt-2 text-muted-foreground">Your reference number is <strong className="font-mono text-navy">{appRef}</strong>.</p>
        </div>
        <div className="border bg-background p-8">
          <div className="flex items-start justify-between border-b pb-6">
            <div><p className="font-display text-xl text-navy">All Saints University Lira</p><p className="text-sm text-muted-foreground">Official Payment Receipt</p></div>
            <DemoBadge>Demo receipt</DemoBadge>
          </div>
          <dl className="grid gap-3 py-6 text-sm sm:grid-cols-2">
            {[["Application ref", appRef], ["Applicant", `${form.firstName} ${form.lastName}`], ["Programme", prog], ["Application date", submittedAt ?? "—"], ["Transaction", payment?.txn ?? "—"], ["Method", payment?.method ?? "—"], ["Status", payment?.status ?? "—"], ["Amount paid", payment ? formatUGX(payment.amount) : "—"]].map(([k, v]) => (
              <div key={k}><dt className="text-muted-foreground">{k}</dt><dd className="font-medium text-navy">{v}</dd></div>
            ))}
          </dl>
          <p className="border-t pt-4 text-xs text-muted-foreground">DEMO ONLY — this receipt is a simulation and is not proof of payment.</p>
        </div>
        <div className="mt-6 flex justify-center gap-3 print:hidden">
          <Button asChild className="rounded-sm"><Link to="/dashboard">View Dashboard</Link></Button>
          <Button variant="outline" className="rounded-sm" onClick={() => window.print()}><Download /> Download Receipt</Button>
        </div>
      </div>
    </PortalShell>
  );
}
