import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { PortalShell, AuthCard } from "@/components/portal/PortalShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useDemo } from "@/lib/demo-store";

export const Route = createFileRoute("/portal/login")({
  head: () => ({
    meta: [
      { title: "Applicant Login — All Saints University Lira" },
      { name: "description", content: "Sign in to the All Saints University Lira applicant and student portal." },
      { property: "og:title", content: "Applicant Login — ASUL" },
      { property: "og:description", content: "Sign in to your applicant dashboard." },
    ],
  }),
  component: Login,
});

function Login() {
  const { login, form } = useDemo();
  const nav = useNavigate();
  const [email, setEmail] = useState(form.email);
  const [pw, setPw] = useState("demo1234");
  const [loading, setLoading] = useState(false);
  const go = (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(undefined, email);
      toast.success("Signed in with demonstration access");
      nav({ to: "/dashboard" });
    }, 900);
  };
  return (
    <PortalShell>
      <AuthCard title="Welcome back" subtitle="Sign in to continue your application.">
        <div className="mb-6 flex gap-3 border border-gold/60 bg-gold/10 p-4 text-sm">
          <ShieldCheck className="h-5 w-5 shrink-0 text-navy" />
          <p><strong>Demonstration access:</strong> any email and password will sign you in to the sample student dashboard.</p>
        </div>
        <form onSubmit={go} className="space-y-4">
          <div><Label htmlFor="email">Email address</Label><Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 rounded-sm" /></div>
          <div><Label htmlFor="pw">Password</Label><Input id="pw" type="password" value={pw} onChange={(e) => setPw(e.target.value)} className="mt-2 rounded-sm" /></div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2"><Checkbox defaultChecked /> Remember me</label>
            <button type="button" onClick={() => toast.info("Demo: a password reset link would be sent to your email.")} className="font-semibold text-royal hover:underline">Forgot password?</button>
          </div>
          <Button type="submit" size="lg" disabled={loading} className="w-full rounded-sm">{loading && <Loader2 className="animate-spin" />} Sign In</Button>
          <p className="text-center text-sm text-muted-foreground">New applicant? <Link to="/portal/register" className="font-semibold text-royal">Create an account</Link></p>
          <p className="text-center text-xs text-muted-foreground">University staff? <Link to="/admin" className="font-semibold text-royal">Open admin dashboard (demo)</Link></p>
        </form>
      </AuthCard>
    </PortalShell>
  );
}
