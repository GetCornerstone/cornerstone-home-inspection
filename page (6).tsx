import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Tips for Homebuyers",
  description: "A free guide for Southeastern Michigan homebuyers covering inspection day, radon, roofs, and using your report.",
};

const tips = [
  { title: "Attend the inspection", body: "Plan to be there. You will learn how the house works, what is already in good shape, and which items belong on a repair or maintenance list. Reading a report later is not the same as seeing the attic, the panel, and the grading in person." },
  { title: "Ask about the big-ticket systems", body: "Roof, foundation, electrical service, furnace, air conditioner, and water heater drive most post-closing costs. Make sure those are covered in the walkthrough and the report." },
  { title: "Test for radon in Michigan", body: "Southeastern Michigan has areas with elevated radon. A radon gas test is an add-on — ask to include it during the inspection window so you have a result before you waive contingencies." },
  { title: "Use the report the same day", body: "Your report names what is wrong, why it matters, and what to do about it. Send it to your realtor immediately so repair requests are specific instead of vague." },
  { title: "Ask for thermal imaging when heat or moisture is a concern", body: "Thermal imaging is an add-on. It helps locate faulty electrical circuits, improper insulation, heating and cooling inefficiencies, and water intrusions." },
  { title: "Use drone imaging for roofs and the lot", body: "Drone imaging is an add-on. It aids roof inspections, property layouts, and video if desired, especially on steep or high roofs." },
  { title: "Have the irrigation system checked", body: "A lawn irrigation system inspection is an add-on. It verifies that system components are present, the condition of those components, and the location of valve boxes for all zones." },
  { title: "Sellers: inspect before you list", body: "A pre-listing inspection lets you repair or disclose issues before buyers walk through. Pricing around a known report often nets more than a surprise at the 11th hour." },
  { title: "Call after you have questions", body: "The report should stand on its own, but if a contractor gives you two conflicting stories, call Cornerstone. We wrote the findings and can walk you through them." },
];

export default function TipsPage() {
  return (
    <>
      <div className="bg-brand-ink px-4 py-16 text-white">
        <div className="mx-auto max-w-3xl">
          <p className="font-heading text-sm tracking-[0.24em] text-brand-gold uppercase">Free booklet</p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Tips for homebuyers</h1>
          <p className="mt-4 text-white/75">
            A short field guide from {business.inspector} at {business.name}. Print it, save it, and bring it to your next showing.
          </p>
        </div>
      </div>
      <article className="mx-auto max-w-3xl space-y-8 px-4 py-16">
        {tips.map((tip, index) => (
          <section key={tip.title}>
            <h2 className="text-2xl font-semibold text-brand-ink">{index + 1}. {tip.title}</h2>
            <p className="mt-2 leading-relaxed text-brand-ink/75">{tip.body}</p>
          </section>
        ))}
        <div className="flex flex-wrap gap-3 border-t border-black/10 pt-8">
          <Button render={<Link href="/schedule" />} className="h-12 rounded-none bg-brand-gold px-6 text-sm font-semibold uppercase tracking-wide text-white hover:bg-brand-gold/90">
            Schedule an inspection
          </Button>
          <Button render={<Link href="/services" />} variant="outline" className="h-12 rounded-none px-6 text-sm font-semibold uppercase tracking-wide">
            See services
          </Button>
        </div>
      </article>
    </>
  );
}
