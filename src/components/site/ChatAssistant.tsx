import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { formatUGX, APPLICATION_FEE } from "@/lib/data";

type Msg = { from: "bot" | "me"; text: string };

const quick = ["How do I apply?", "What is the application fee?", "How do I pay?", "When is the deadline?", "Programmes offered"];

function reply(q: string): string {
  const s = q.toLowerCase();
  if (s.includes("fee") || s.includes("cost")) return `The application fee is ${formatUGX(APPLICATION_FEE)} (sample), paid once online.`;
  if (s.includes("pay") || s.includes("momo") || s.includes("airtel")) return "You can pay with MTN Mobile Money, Airtel Money, Visa or Mastercard. You'll get a prompt on your phone to approve, then an instant receipt.";
  if (s.includes("deadline") || s.includes("intake") || s.includes("when")) return "The January 2027 intake closes on 15 December 2026 (sample dates).";
  if (s.includes("programme") || s.includes("course")) return "We offer undergraduate, diploma and postgraduate programmes in Science & Technology, Business, Health, Education and more. See the Academics menu.";
  if (s.includes("apply") || s.includes("register") || s.includes("account")) return "Click Apply Now, create a free applicant account, fill the form, upload documents and pay the fee. You can save and continue any time.";
  return "Thanks! An admissions officer would follow up on that. For now, try one of the quick questions below. (Demo assistant)";
}

export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "bot", text: "Hello! I'm Grace, the All Saints admissions assistant. How may I help you today?" }]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => end.current?.scrollIntoView({ behavior: "smooth" }), [msgs, typing]);

  const send = (q: string) => {
    if (!q.trim()) return;
    setMsgs((m) => [...m, { from: "me", text: q }]);
    setText("");
    setTyping(true);
    setTimeout(() => { setTyping(false); setMsgs((m) => [...m, { from: "bot", text: reply(q) }]); }, 800);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 flex h-[28rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col border bg-background shadow-2xl animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between bg-navy px-4 py-3 text-navy-foreground">
            <div><p className="font-display font-semibold">Grace · Admissions</p><p className="text-[0.65rem] uppercase tracking-wider text-gold">Demo assistant · online</p></div>
            <button onClick={() => setOpen(false)} aria-label="Close chat"><X className="h-4 w-4" /></button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto bg-soft p-4 text-sm">
            {msgs.map((m, i) => (
              <div key={i} className={`max-w-[85%] px-3 py-2 ${m.from === "bot" ? "bg-background text-foreground" : "ml-auto bg-royal text-primary-foreground"}`}>{m.text}</div>
            ))}
            {typing && <div className="w-14 bg-background px-3 py-2 text-muted-foreground">•••</div>}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {quick.map((q) => <button key={q} onClick={() => send(q)} className="border border-royal/40 bg-background px-2 py-1 text-xs text-royal hover:bg-royal hover:text-primary-foreground">{q}</button>)}
            </div>
            <div ref={end} />
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(text); }} className="flex border-t">
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your question…" className="flex-1 px-3 py-3 text-sm outline-none" />
            <button className="px-4 text-royal" aria-label="Send"><Send className="h-4 w-4" /></button>
          </form>
        </div>
      )}
      <button onClick={() => setOpen(!open)} aria-label="Open admissions chat" className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold text-gold-foreground shadow-lg transition-transform hover:scale-110">
        {open ? <X /> : <MessageCircle />}
      </button>
    </div>
  );
}
