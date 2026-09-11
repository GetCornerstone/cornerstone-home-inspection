import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="font-heading text-sm tracking-[0.24em] text-brand-gold uppercase">404</p>
      <h1 className="mt-3 text-3xl font-bold text-brand-ink">That page is not on this site</h1>
      <p className="mt-3 text-brand-ink/70">Check the address, or head back home to schedule an inspection.</p>
      <a href="/" className="mt-8 inline-flex h-12 items-center bg-brand-gold px-6 text-sm font-semibold uppercase tracking-wide text-white">
        Back to home
      </a>
    </div>
  );
}
