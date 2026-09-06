import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ScheduleForm } from "@/components/schedule-form";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Schedule a Home Inspection",
  description: `Book a Cornerstone home inspection in ${business.region}. Call ${business.phone} or send a message.`,
};

export default function SchedulePage() {
  return (
    <>
      <div className="bg-brand-ink px-4 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm text-white/60">Home / Schedule now</p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Schedule your inspection today</h1>
          <p className="mt-4 max-w-2xl text-white/75">
            Call, email, or send a message. You will get an immediate written reply from the site, then John follows up to confirm timing and a quote.
          </p>
        </div>
      </div>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="font-heading text-sm tracking-[0.24em] text-brand-gold uppercase">Get in touch</p>
          <h2 className="mt-3 text-3xl font-bold text-brand-ink">{business.inspector}</h2>
          <p className="mt-1 font-heading text-sm tracking-[0.12em] text-brand-gold uppercase">{business.credentials}</p>
          <ul className="mt-6 space-y-4 text-brand-ink/80">
            <li className="flex gap-3">
              <MapPin className="mt-1 size-5 text-brand-gold" />
              {business.location}
            </li>
            <li>
              <a href={`tel:${business.phoneTel}`} className="flex gap-3 hover:text-brand-gold">
                <Phone className="mt-1 size-5 text-brand-gold" />
                {business.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="flex gap-3 hover:text-brand-gold">
                <Mail className="mt-1 size-5 text-brand-gold" />
                {business.email}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Send us a message</h2>
          <p className="mb-6 text-sm text-brand-ink/70">
            Have questions or need to schedule an inspection? Send the form below. An automatic reply is generated right away so you know the request landed.
          </p>
          <ScheduleForm />
        </div>
      </section>
    </>
  );
}
