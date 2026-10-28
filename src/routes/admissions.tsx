import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader, SampleTag } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { images, formatUGX, APPLICATION_FEE } from "@/lib/data";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions — All Saints University Lira" },
      { name: "description", content: "How to apply, entry requirements, intakes and fees at All Saints University Lira." },
      { property: "og:title", content: "Admissions — All Saints University Lira" },
      { property: "og:description", content: "How to apply, entry requirements, intakes and fees." },
    ],
  }),
  component: Admissions,
});

const steps = [
  ["Create an account", "Register on the applicant portal with your email and phone number."],
  ["Complete the application", "Provide personal details, academic background and programme choices."],
  ["Upload documents", "Attach your certificates, national ID and passport photo."],
  ["Pay the application fee", "Pay via MTN Mobile Money, Airtel Money, Visa or Mastercard."],
  ["Track your decision", "Follow your application status from your dashboard."],
];

function Admissions() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Admissions" title="Begin your application" intro="Everything you need to know to join All Saints University Lira." image={images.library} crumbs={[{ label: "Admissions" }]} />
      <section className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <p className="eyebrow gold-rule text-royal">How to Apply</p>
        <h2 className="text-4xl font-semibold text-navy">Five simple steps</h2>
        <ol className="mt-12 grid gap-px bg-border md:grid-cols-5">
          {steps.map(([t, d], i) => (
            <li key={t} className="bg-background p-6">
              <span className="font-display text-5xl text-gold">{i + 1}</span>
              <h3 className="mt-4 text-lg font-semibold text-navy">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex gap-3">
          <Button asChild size="lg" className="rounded-sm"><Link to="/portal">Go to Admissions Portal</Link></Button>
          <Button asChild size="lg" variant="outline" className="rounded-sm"><Link to="/academics">Browse Programmes</Link></Button>
        </div>
      </section>

      <section className="bg-soft py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="eyebrow gold-rule text-royal">Requirements</p>
            <h2 className="text-4xl font-semibold text-navy">Entry requirements</h2>
            <Accordion type="single" collapsible defaultValue="ug" className="mt-8">
              <AccordionItem value="ug"><AccordionTrigger className="text-lg">Undergraduate (Direct entry)</AccordionTrigger><AccordionContent className="text-muted-foreground">UCE with at least five passes and UACE with at least two principal passes relevant to the programme.</AccordionContent></AccordionItem>
              <AccordionItem value="dip"><AccordionTrigger className="text-lg">Diploma holders</AccordionTrigger><AccordionContent className="text-muted-foreground">A relevant diploma from a recognised institution, with at least a credit or second class.</AccordionContent></AccordionItem>
              <AccordionItem value="mature"><AccordionTrigger className="text-lg">Mature age entry</AccordionTrigger><AccordionContent className="text-muted-foreground">Applicants aged 25 and above who pass the mature age entry examination.</AccordionContent></AccordionItem>
              <AccordionItem value="pg"><AccordionTrigger className="text-lg">Postgraduate</AccordionTrigger><AccordionContent className="text-muted-foreground">A recognised bachelor's degree, with additional requirements per programme.</AccordionContent></AccordionItem>
              <AccordionItem value="intl"><AccordionTrigger className="text-lg">International applicants</AccordionTrigger><AccordionContent className="text-muted-foreground">Equivalent qualifications verified by the Uganda National Council for Higher Education.</AccordionContent></AccordionItem>
            </Accordion>
          </div>
          <div className="space-y-6">
            <div className="bg-navy p-8 text-navy-foreground">
              <p className="eyebrow text-gold">Intakes</p>
              <div className="mt-4 divide-y divide-navy-foreground/15">
                {[["January 2027", "Closes 15 Dec 2026"], ["May 2027", "Closes 15 Apr 2027"], ["August 2027", "Closes 15 Jul 2027"]].map(([a, b]) => (
                  <div key={a} className="flex justify-between py-3"><span className="font-display text-xl">{a}</span><span className="opacity-75">{b}</span></div>
                ))}
              </div>
            </div>
            <div className="border bg-background p-8">
              <p className="eyebrow text-royal">Application fee</p>
              <p className="mt-3 font-display text-4xl text-navy">{formatUGX(APPLICATION_FEE)}</p>
              <p className="mt-2 text-sm text-muted-foreground">Non-refundable. Payable by Mobile Money or card.</p>
            </div>
            <SampleTag>Sample fees and dates — demonstration only</SampleTag>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
