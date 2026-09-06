import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { addonServices, business, coreServices } from "@/lib/business";

export const metadata: Metadata = {
  title: "Home Inspection Services",
  description:
    "Full home inspections plus add-ons: thermal imaging, drone imaging, wood-destroying insects, radon gas test, mold inspection, and lawn irrigation system inspection in Southeastern Michigan.",
};

export default function ServicesPage() {
  return (
    <>
      <div className="bg-brand-ink px-4 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm text-white/60">Home / Inspection services</p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Inspection services</h1>
          <p className="mt-4 max-w-2xl text-white/75">
            {business.licensedLine}. Residential inspections for buyers and
            sellers across {business.region}. Add-ons are quoted separately.
            Call {business.phone} for a quote on your property.
          </p>
        </div>
      </div>
      <section className="mx-auto max-w-6xl px-4 pt-16">
        <p className="font-heading text-sm tracking-[0.24em] text-brand-gold uppercase">Core inspections</p>
        <h2 className="mt-3 text-3xl font-bold text-brand-ink">What is included in the inspection</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {coreServices.map((service) => (
            <article key={service.title} className="border border-black/8 bg-white p-6">
              <h2 className="text-xl font-semibold text-brand-ink">{service.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-brand-ink/70">{service.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="font-heading text-sm tracking-[0.24em] text-brand-gold uppercase">Add-on services</p>
        <h2 className="mt-3 text-3xl font-bold text-brand-ink">Add only what you need</h2>
        <p className="mt-3 max-w-2xl text-brand-ink/70">
          Wood-destroying insects, radon gas testing, mold inspection, thermal imaging, drone imaging, and lawn irrigation are not part of the standard home inspection.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {addonServices.map((service) => (
            <article key={service.title} className="border border-brand-gold/40 bg-white p-6">
              <p className="font-heading text-xs tracking-[0.2em] text-brand-gold uppercase">Add-on service</p>
              <h2 className="mt-3 text-xl font-semibold text-brand-ink">{service.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-brand-ink/70">{service.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-brand-cream py-16">
        <div className="mx-auto max-w-6xl px-4">
          <p className="font-heading text-sm tracking-[0.24em] text-brand-gold uppercase">Pricing</p>
          <h2 className="mt-3 text-3xl font-bold text-brand-ink">Quoted for your house, not a spreadsheet</h2>
          <p className="mt-4 max-w-3xl text-brand-ink/70">
            Every property is different. Send the address, square footage if you have it, and any add-ons (thermal imaging, drone imaging, wood-destroying insects, radon gas test, mold inspection, lawn irrigation) and we will quote you before we put it on the calendar.
          </p>
          <Button render={<Link href="/schedule" />} className="mt-8 h-12 rounded-none bg-brand-gold px-6 text-sm font-semibold uppercase tracking-wide text-white hover:bg-brand-gold/90">
            Request a quote
          </Button>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image src="/images/inspect-interior.jpg" alt="Residential interior of a home ready for inspection" fill className="object-cover" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-brand-ink">The report is the product</h2>
          <p className="mt-4 text-brand-ink/75">
            {business.heroStatement} You can send it to your realtor the same day and use it to decide what to negotiate, what to budget, and what to leave alone.
          </p>
          <Button render={<Link href="/schedule" />} className="mt-6 h-12 rounded-none bg-brand-gold px-6 text-sm font-semibold uppercase tracking-wide text-white hover:bg-brand-gold/90">
            Book this service
          </Button>
        </div>
      </section>
    </>
  );
}
