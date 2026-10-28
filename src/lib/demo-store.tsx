import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  seedApplications,
  seedTransactions,
  APPLICATION_FEE,
  type AdminApplication,
  type Transaction,
} from "./data";

export type ApplicationForm = {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  nationality: string;
  nin: string;
  email: string;
  phone: string;
  district: string;
  address: string;
  school: string;
  qualification: string;
  yearCompleted: string;
  grades: string;
  programme: string;
  secondChoice: string;
  intake: string;
  studyMode: string;
  campus: string;
  documents: Record<string, string>;
  declaration: boolean;
};

export const sampleForm: ApplicationForm = {
  firstName: "Akello",
  lastName: "Sarah",
  dob: "2006-04-18",
  gender: "Female",
  nationality: "Ugandan",
  nin: "CF06021XXXXXX",
  email: "akello.sarah@example.com",
  phone: "+256 772 412 503",
  district: "Lira",
  address: "Plot 14, Obote Avenue, Lira City",
  school: "Lira Town College",
  qualification: "UACE",
  yearCompleted: "2025",
  grades: "PCM — 15 points",
  programme: "computer-science",
  secondChoice: "information-technology",
  intake: "January 2027",
  studyMode: "Day",
  campus: "Main Campus, Lira",
  documents: {},
  declaration: false,
};

export type PaymentRecord = {
  status: "Successful" | "Failed" | "Pending" | "Cancelled";
  method: string;
  txn: string;
  amount: number;
  date: string;
};

type Store = {
  user: { name: string; email: string } | null;
  login: (name?: string, email?: string) => void;
  logout: () => void;
  form: ApplicationForm;
  setForm: (f: Partial<ApplicationForm>) => void;
  step: number;
  setStep: (n: number) => void;
  appRef: string;
  submitted: boolean;
  submittedAt: string | null;
  submit: () => void;
  payment: PaymentRecord | null;
  setPayment: (p: PaymentRecord) => void;
  applications: AdminApplication[];
  updateApplication: (ref: string, patch: Partial<AdminApplication>) => void;
  transactions: Transaction[];
  announcement: string;
  setAnnouncement: (s: string) => void;
  resetDemo: () => void;
};

const Ctx = createContext<Store | null>(null);
const KEY = "asul-demo-v1";
const DEFAULT_ANNOUNCEMENT = "Applications for the January 2027 intake are now open — apply online before 15 December 2026.";

export function DemoProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Store["user"]>(null);
  const [form, setFormState] = useState<ApplicationForm>(sampleForm);
  const [step, setStep] = useState(0);
  const [appRef] = useState("ASUL-2027-01187");
  const [submitted, setSubmitted] = useState(false);
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);
  const [payment, setPayment] = useState<PaymentRecord | null>(null);
  const [applications, setApplications] = useState(seedApplications);
  const [transactions, setTransactions] = useState(seedTransactions);
  const [announcement, setAnnouncement] = useState(DEFAULT_ANNOUNCEMENT);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw);
        setUser(s.user ?? null);
        setFormState(s.form ?? sampleForm);
        setStep(s.step ?? 0);
        setSubmitted(!!s.submitted);
        setSubmittedAt(s.submittedAt ?? null);
        setPayment(s.payment ?? null);
        if (s.applications) setApplications(s.applications);
        if (s.transactions) setTransactions(s.transactions);
        if (s.announcement) setAnnouncement(s.announcement);
      }
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    sessionStorage.setItem(
      KEY,
      JSON.stringify({ user, form, step, submitted, submittedAt, payment, applications, transactions, announcement }),
    );
  }, [loaded, user, form, step, submitted, submittedAt, payment, applications, transactions, announcement]);

  const applicantName = `${form.firstName} ${form.lastName}`.trim();

  const store: Store = {
    user,
    login: (name, email) => setUser({ name: name || applicantName || "Akello Sarah", email: email || form.email }),
    logout: () => setUser(null),
    form,
    setForm: (f) => setFormState((prev) => ({ ...prev, ...f })),
    step,
    setStep,
    appRef,
    submitted,
    submittedAt,
    submit: () => {
      setSubmitted(true);
      setSubmittedAt(new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }));
    },
    payment,
    setPayment: (p) => {
      setPayment(p);
      setTransactions((prev) => [
        { txn: p.txn, applicant: applicantName, appRef, amount: p.amount, method: p.method as Transaction["method"], date: p.date, status: p.status },
        ...prev.filter((t) => t.appRef !== appRef),
      ]);
      if (p.status === "Successful") {
        setApplications((prev) => {
          const others = prev.filter((a) => a.ref !== appRef);
          return [
            {
              ref: appRef,
              name: applicantName,
              email: form.email,
              phone: form.phone,
              programme: form.programme,
              date: p.date,
              payment: "Paid",
              status: "Submitted",
              school: form.school,
              grades: `${form.qualification}: ${form.grades}`,
              district: form.district,
              notes: [],
            },
            ...others,
          ];
        });
      }
    },
    applications,
    updateApplication: (ref, patch) =>
      setApplications((prev) => prev.map((a) => (a.ref === ref ? { ...a, ...patch } : a))),
    transactions,
    announcement,
    setAnnouncement,
    resetDemo: () => {
      setUser(null);
      setFormState(sampleForm);
      setStep(0);
      setSubmitted(false);
      setSubmittedAt(null);
      setPayment(null);
      setApplications(seedApplications);
      setTransactions(seedTransactions);
      setAnnouncement(DEFAULT_ANNOUNCEMENT);
    },
  };

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
}

export function useDemo() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useDemo must be used inside DemoProvider");
  return c;
}

export const totalFee = APPLICATION_FEE;
