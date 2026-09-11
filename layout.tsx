import type { Metadata } from "next";
import { Libre_Baskerville, Oswald, Source_Sans_3 } from "next/font/google";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { business } from "@/lib/business";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const libre = Libre_Baskerville({
  variable: "--font-libre",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(business.websiteUrl),
  title: {
    default: `Home Inspection | ${business.name} | ${business.region}`,
    template: `%s | ${business.name}`,
  },
  description:
    "Cornerstone Home Inspection is a Michigan-licensed inspection company serving Southeastern Michigan. John Nichols. We protect your interests with a clear report: what's wrong, why it matters, and what to do about it.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: business.name,
    title: `Home Inspection | ${business.name} | ${business.region}`,
    description:
      "Michigan-licensed home inspections in Southeastern Michigan. John Nichols. We protect your interests.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${oswald.variable} ${libre.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <AnalyticsTracker />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
