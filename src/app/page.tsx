import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Bug,
  Camera,
  ClipboardCheck,
  Droplets,
  Flame,
  Home,
  Lightbulb,
  Plug,
  ScanSearch,
  ShieldCheck,
  Snowflake,
  Sprout,
  Thermometer,
  Wind,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { aboutCopy, addonServices, business, heroServices, inspectItems } from "@/lib/business";

const inspectIcons = [
  Home, ShieldCheck, Wind, Flame, Home, Plug, Droplets, Snowflake, Wrench,
];

const addonIcons: Record<string, typeof ScanSearch> = {
  "Thermal imaging": ScanSearch,
  "Drone imaging": Camera,
  "Wood-destroying insects": Bug,
  "Radon gas test": Wind,
  "Mold inspection": Droplets,
  "Lawn irrigation system inspection": Sprout,
};

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-ink text-white">
        <Image src="/images/hero-house.jpg" alt="A well-kept home in a quiet neighborhood" fill priority className="object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/85 to-brand-ink/40" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="font-heading text-sm tracking-[0.28em] text-brand-gold uppercase">
              Welcome to {business.name}
            </p>
            <h1 className="mt-4 max-w-xl text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {business.heroStatement}
            </h1>
            <p className="mt-5 max-w-lg font-serif text-lg italic text-white/80">{business.tagline}</p>
            <p className="mt-3 max-w-lg text-white/75">
              {business.licensedLine}, serving {business.region}.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button render={<Link href="/schedule" />} className="h-12 rounded-none bg-brand-gold px-6 text-sm font-semibold uppercase tracking-wide text-white hover:bg-brand-gold/90">
                Schedule a call today
              </Button>
              <Button render={<Link href="/services" />} variant="outline" className="h-12 rounded-none border-white/40 bg-transparent px-6 text-sm font-semibold uppercase tracking-wide text-white hover:bg-white/10">
                View services
              </Button>
            </div>
          </div>
          <div className="relative hidden min-h-[280px] overflow-hidden bg-white lg:block lg:min-h-[420px]">
            <Image src="/images/business-card.jpg" alt={`${business.inspector}, ${business.credentials}`} fill className="object-contain p-6" />
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-10 grid max-w-6xl gap-4 px-4 sm:grid-cols-3">
        {heroServices.map((service) => (
          <article key={service.title} className="border border-black/5 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-brand-ink">{service.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-ink/70">{service.body}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-12">
        <p className="font-heading text-sm tracking-[0.24em] text-brand-gold uppercase">Add-on services</p>
        <h2 className="mt-3 text-3xl font-bold text-brand-ink sm:text-4xl">Add only what you need</h2>
        <p className="mt-3 max-w-2xl text-brand-ink/70">
          These are not part of the standard home inspection. Ask for them when you book.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {addonServices.map((service) => {
            const Icon = addonIcons[service.title] ?? ClipboardCheck;
            return (
              <article key={service.title} className="border border-black/8 bg-white p-6">
                <p className="font-heading text-xs tracking-[0.2em] text-brand-gold uppercase">Add-on</p>
                <Icon className="mt-3 size-8 text-brand-gold" />
                <h2 className="mt-3 text-xl font-semibold text-brand-ink">{service.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-brand-ink/70">{service.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 lg:grid-cols-2">
        <div className="relative aspect-square max-h-[420px] overflow-hidden bg-white">
          <Image src="/images/logo-mark.png" alt="Cornerstone Home Inspection house logo" fill className="object-contain p-8" />
        </div>
        <div>
          <p className="font-heading text-sm tracking-[0.24em] text-brand-gold uppercase">About me</p>
          <h2 className="mt-3 text-3xl font-bold text-brand-ink sm:text-4xl">{aboutCopy.heading}</h2>
          <p className="mt-2 font-heading text-sm tracking-[0.12em] text-brand-gold uppercase">{business.credentials}</p>
          <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-brand-ink/75">
            {aboutCopy.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="font-serif italic">{business.tagline}</p>
          </div>
        </div>
      </section>

      <section className="bg-brand-cream py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="font-heading text-sm tracking-[0.24em] text-brand-gold uppercase">What you can expect</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold text-brand-ink sm:text-4xl">
            A home inspection is a practical way to protect your purchase
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <ExpectCard title="Services" body="A full home inspection, plus add-ons you choose: thermal imaging, drone imaging, wood-destroying insects, radon gas test, mold inspection, and lawn irrigation system inspection. Pre-listing and condo inspections are available as well." />
            <ExpectCard title="Qualifications" body={`${business.licensedLine}. ${business.inspector} is a ${business.credentials.toLowerCase()} and the owner — one inspector, one report, one person accountable to you.`} />
            <ExpectCard title="Your report" body="After the inspection you receive a clear, detailed report. Findings are explained in plain language with photos where they help — ready to share with your realtor." />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <p className="font-heading text-sm tracking-[0.24em] text-brand-gold uppercase">What I inspect</p>
        <h2 className="mt-3 text-3xl font-bold text-brand-ink sm:text-4xl">Included in every inspection</h2>
        <p className="mt-4 max-w-2xl text-brand-ink/70">
          A thorough visual inspection of the property’s key structural elements, systems, and accessible components.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {inspectItems.map((item, index) => {
            const Icon = inspectIcons[index] ?? ClipboardCheck;
            return (
              <article key={item.title} className="flex gap-4 border border-black/8 bg-white p-5">
                <Icon className="mt-0.5 size-6 shrink-0 text-brand-gold" />
                <div>
                  <h3 className="font-semibold text-brand-ink">{item.title}</h3>
                  <p className="mt-1 text-sm text-brand-ink/70">{item.detail}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-ink py-20 text-white">
        <Image src="/images/inspect-roof.jpg" alt="Roof framing during construction" fill className="object-cover opacity-20" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2">
          <div>
            <p className="font-heading text-sm tracking-[0.24em] text-brand-gold uppercase">Tips for homebuyers</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Free tips for homebuyers</h2>
            <p className="mt-4 text-white/75">
              A short guide from {business.name} covering inspection day, radon in Michigan homes, and what to do with the report after you get it.
            </p>
            <Button render={<Link href="/tips" />} className="mt-6 h-12 rounded-none bg-brand-gold px-6 text-sm font-semibold uppercase tracking-wide text-white hover:bg-brand-gold/90">
              Read the guide
            </Button>
          </div>
          <div className="flex items-center gap-4 border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
            <BookOpen className="size-14 shrink-0 text-brand-gold" />
            <p className="text-sm leading-relaxed text-white/80">
              Bring the guide to your next showing. It is written for buyers who want a straight answer, not a sales pitch.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <p className="font-heading text-sm tracking-[0.24em] text-brand-gold uppercase">I educate my clients</p>
        <h2 className="mt-3 text-3xl font-bold text-brand-ink sm:text-4xl">Guiding homeowners every step of the way</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <EducateCard icon={Wrench} title="How to maintain it" body="Simple, proactive steps that prevent expensive repairs — from filters and grading to gutters and water heaters." />
          <EducateCard icon={Lightbulb} title="How to save energy" body="Straightforward ways to get more from HVAC, insulation, and air sealing without a full remodel." />
          <EducateCard icon={Thermometer} title="How it works" body="A walkthrough of how the home’s systems operate so you can manage them with confidence after closing." />
        </div>
      </section>

      <section className="bg-brand-gold px-4 py-16 text-center text-white">
        <h2 className="mx-auto max-w-3xl text-3xl font-bold sm:text-4xl">
          Committed to being your trusted partner for home inspection
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/90">
          Schedule a call today. We will walk the house with you and put the findings in writing so you can move forward with confidence.
        </p>
        <Button render={<Link href="/schedule" />} className="mt-8 h-12 rounded-none bg-brand-ink px-8 text-sm font-semibold uppercase tracking-wide text-white hover:bg-brand-ink/90">
          Schedule now
        </Button>
      </section>
    </>
  );
}

function ExpectCard({ title, body }: { title: string; body: string }) {
  return (
    <article>
      <h3 className="text-xl font-semibold text-brand-ink">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-brand-ink/70">{body}</p>
    </article>
  );
}

function EducateCard({ icon: Icon, title, body }: { icon: typeof Wrench; title: string; body: string }) {
  return (
    <article className="border border-black/8 bg-white p-6">
      <Icon className="size-8 text-brand-gold" />
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-brand-ink/70">{body}</p>
    </article>
  );
}
