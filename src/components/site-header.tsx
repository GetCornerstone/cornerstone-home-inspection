"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Menu, Phone } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { business, navLinks } from "@/lib/business";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 print:hidden">
      <div className="bg-brand-ink text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 text-xs sm:text-sm">
          <a
            href={`mailto:${business.email}`}
            className="inline-flex items-center gap-2 hover:text-brand-gold"
          >
            <Mail className="size-3.5" />
            {business.email}
          </a>
          <p className="hidden text-right text-white/80 md:block">
            {business.licensedLine}
          </p>
          <p className="text-right text-white/80 md:hidden">Michigan-licensed</p>
        </div>
      </div>
      <div className="border-b border-black/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="shrink-0">
            <BrandLogo />
          </Link>
          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-semibold tracking-wide uppercase",
                  pathname === link.href
                    ? "text-brand-gold"
                    : "text-brand-ink hover:text-brand-gold",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${business.phoneTel}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-ink"
            >
              <Phone className="size-4 text-brand-gold" />
              {business.phone}
            </a>
            <Button
              render={<Link href="/schedule" />}
              className="h-10 rounded-none bg-brand-gold px-5 text-sm font-semibold uppercase tracking-wide text-white hover:bg-brand-gold/90"
            >
              Schedule
            </Button>
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu" />
              }
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="bg-white">
              <SheetHeader>
                <SheetTitle>{business.shortName}</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 px-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "text-lg font-semibold",
                      pathname === link.href ? "text-brand-gold" : "text-brand-ink",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <a href={`tel:${business.phoneTel}`} className="font-semibold">
                  {business.phone}
                </a>
                <Button
                  render={<Link href="/schedule" onClick={() => setOpen(false)} />}
                  className="h-11 rounded-none bg-brand-gold text-white hover:bg-brand-gold/90"
                >
                  Schedule an inspection
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
