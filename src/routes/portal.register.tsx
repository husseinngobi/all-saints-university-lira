import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PortalShell, AuthCard, DemoBadge } from "@/components/portal/PortalShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useDemo } from "@/lib/demo-store";

export const Route = createFileRoute("/portal/register")({
  head: () => ({
    meta: [
      { title: "Create Applicant Account — All Saints University Lira" },
      { name: "description", content: "Register an applicant account to apply to All Saints University Lira." },
      { property: "og:title", content: "Create Applicant Account — ASUL" },
      { property: "og:description", content: "Register to begin your application." },
    ],
  }),
  component: Register,
});

function Register() {
  const { login, setForm, setStep } = useDemo();
  const nav = useNavigate();
  const [v, setV] = useState({ name: "Akello Sarah", email: "akello.sarah@example.com", phone: "+256 772 412 503", password: "", confirm: "" });
  const [err, setErr] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (v.name.trim().split(" ").length < 2) er.name = "Enter your full name (first and last)";
    if (!/^\S+@\S+\.\S+$/.test(v.email)) er.email = "Enter a valid email address";
    if (!/^\+?256\s?7\d{2}\s?\d{3}\s?\d{3}$/.test(v.phone.trim())) er.phone = "Use a Ugandan number e.g. +256 772 123 456";
    if (v.password.length < 8) er.password = "Password must be at least 8 characters";
    if (v.password !== v.confirm) er.confirm = "Passwords do not match";
    setErr(er);
    if (Object.keys(er).length) return;
    setLoading(true);
    setTimeout(() => {
      const [first, ...rest] = v.name.trim().split(" ");
      setForm({ firstName: first, lastName: rest.join(" "), email: v.email, phone: v.phone });
      setStep(0);
      login(v.name, v.email);
      toast.success("Demo account created. Let's start your application.");
      nav({ to: "/portal/apply" });
    }, 1000);
  };

  const field = (k: keyof typeof v, label: string, type = "text") => (
    <div>
      <Label htmlFor={k}>{label}</Label>
      <Input id={k} type={type} value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })} className="mt-2 rounded-sm" aria-invalid={!!err[k]} />
      {err[k] && <p className="mt-1 text-sm text-destructive">{err[k]}</p>}
    </div>
  );

  return (
    <PortalShell>
      <AuthCard title="Create your account" subtitle="Register to start your application.">
        <form onSubmit={submit} noValidate className="space-y-4">
          <DemoBadge>Demo — no real account is created</DemoBadge>
          {field("name", "Full name")}
          {field("email", "Email address", "email")}
          {field("phone", "Telephone")}
          <div className="grid gap-4 sm:grid-cols-2">
            {field("password", "Password", "password")}
            {field("confirm", "Confirm password", "password")}
          </div>
          <Button type="submit" size="lg" disabled={loading} className="w-full rounded-sm">{loading && <Loader2 className="animate-spin" />} Create Account</Button>
          <p className="text-center text-sm text-muted-foreground">Already registered? <Link to="/portal/login" className="font-semibold text-royal">Sign in</Link></p>
        </form>
      </AuthCard>
    </PortalShell>
  );
}
