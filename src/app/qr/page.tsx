import type { Metadata } from "next";
import Image from "next/image";
import { PrintPageButton } from "@/components/print-page-button";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Website QR code",
  description: `Printable QR code for ${business.name}. Scan to open the website.`,
  robots: { index: false, follow: false },
};

export default function QrPage() {
  const host = business.websiteUrl.replace(/^https?:\/\//, "");

  return (
    <div className="bg-brand-cream/50">
      <div className="bg-brand-ink px-4 py-12 text-white print:hidden">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-white/60">Office / Print</p>
          <h1 className="mt-3 text-4xl font-bold">Website QR code</h1>
          <p className="mt-4 max-w-2xl text-white/75">
            Anyone who scans this code with a phone camera goes to {host}. The
            Cornerstone house mark sits in the center. Save the image for business
            cards, a yard sign, or the truck. If you later get a name like
            cornerstonehi.com, make a new code for that address.
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-3xl px-4 py-12">
        <div className="border border-black/10 bg-white p-6 sm:p-10 print:border-0">
          <p className="text-center font-heading text-sm tracking-[0.24em] text-brand-gold uppercase">
            {business.name}
          </p>
          <p className="mt-2 text-center text-2xl font-bold text-brand-ink print:text-3xl">
            Scan to visit the website
          </p>
          <Image
            src="/images/website-qr.png"
            alt={`QR code with Cornerstone house logo that opens ${business.websiteUrl}`}
            width={1696}
            height={1696}
            unoptimized
            className="mx-auto mt-6 w-full max-w-[420px] print:max-w-[360px]"
          />
          <p className="mt-2 break-all text-center text-sm text-brand-gold">{host}</p>
          <p className="mt-1 text-center text-sm text-brand-ink/70">{business.phone}</p>
        </div>

        <div className="mt-8 flex flex-col gap-3 print:hidden sm:flex-row">
          <a
            href="/images/website-qr.png"
            download="cornerstone-website-qr.png"
            className="inline-flex h-12 items-center justify-center bg-brand-gold px-6 text-sm font-semibold tracking-wide text-white uppercase hover:bg-brand-gold/90"
          >
            Download QR image
          </a>
          <a
            href="/images/website-qr-print.png"
            download="cornerstone-website-qr-print.png"
            className="inline-flex h-12 items-center justify-center border border-black/15 bg-white px-6 text-sm font-semibold tracking-wide text-brand-ink uppercase hover:bg-brand-cream"
          >
            Download flyer version
          </a>
          <PrintPageButton />
        </div>
        <p className="mt-6 text-sm leading-relaxed text-brand-ink/70 print:hidden">
          Test it before you print a batch: open the camera on your phone, point it at
          the code, and tap the banner. It should open {host}. The square file is best
          for dropping into a business-card layout. The flyer file already has the
          company name under the code. Keep some white space around the code so phones
          can read it.
        </p>
      </section>
    </div>
  );
}
