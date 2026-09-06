import type { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { business, faqGroups } from "@/lib/business";

export const metadata: Metadata = {
  title: "Home Inspection FAQs",
  description:
    "Answers about licensing, add-on services, reports, scheduling, and what to expect from a Cornerstone home inspection.",
};

export default function FaqPage() {
  return (
    <>
      <div className="bg-brand-ink px-4 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm text-white/60">Home / FAQ</p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            Frequently asked questions
          </h1>
          <p className="mt-4 max-w-2xl text-white/75">
            {business.licensedLine}. Straight answers on credentials, timing,
            tools, and how to book.
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-3xl space-y-12 px-4 py-16">
        {faqGroups.map((group) => (
          <div key={group.heading}>
            <h2 className="font-heading text-sm tracking-[0.24em] text-brand-gold uppercase">
              {group.heading}
            </h2>
            <Accordion className="mt-4" defaultValue={[group.items[0].q]}>
              {group.items.map((item) => (
                <AccordionItem key={item.q} value={item.q}>
                  <AccordionTrigger className="py-4 text-base font-semibold hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[15px] leading-relaxed text-brand-ink/75">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </section>
    </>
  );
}
