import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { business, navLinks } from "@/lib/business";

export function SiteFooter() {
  return (
    <footer className="bg-brand-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <BrandLogo inverted />
          <p className="mt-4 max-w-sm font-serif text-sm italic text-white/75">
            {business.tagline}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
            {business.licensedLine}. Owner-operated by {business.inspector},
            serving buyers and sellers across {business.region}.
          </p>
        </div>
        <div>
          <h2 className="font-heading text-sm tracking-[0.2em] text-brand-gold uppercase">
            Get in touch
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-white/85">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-gold" />
              {business.location}
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="inline-flex gap-3 hover:text-white">
                <Mail className="mt-0.5 size-4 shrink-0 text-brand-gold" />
                {business.email}
              </a>
            </li>
            <li>
              <a href={`tel:${business.phoneTel}`} className="inline-flex gap-3 hover:text-white">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand-gold" />
                {business.phone}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-heading text-sm tracking-[0.2em] text-brand-gold uppercase">
            Explore
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-brand-gold">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/tips" className="hover:text-brand-gold">
                Tips for homebuyers
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {business.name}. All rights reserved.
      </div>
    </footer>
  );
}
