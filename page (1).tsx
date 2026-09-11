import type { Metadata } from "next";
import { OfficeDashboard } from "@/components/office-dashboard";

export const metadata: Metadata = {
  title: "Office analytics",
  robots: { index: false, follow: false },
};

export default function OfficePage() {
  return <OfficeDashboard />;
}
