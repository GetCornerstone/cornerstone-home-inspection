import Image from "next/image";
import { business } from "@/lib/business";
import { cn } from "@/lib/utils";

export function BrandLogo({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Image
        src="/images/logo-mark.png"
        alt=""
        width={56}
        height={52}
        className="h-10 w-auto sm:h-12"
        priority
      />
      <span className="leading-tight">
        <span
          className={cn(
            "block font-heading text-sm font-semibold tracking-[0.14em] uppercase sm:text-base",
            inverted ? "text-white" : "text-brand-ink",
          )}
        >
          Cornerstone
        </span>
        <span className="block font-heading text-[10px] font-medium tracking-[0.16em] text-brand-gold uppercase sm:text-xs">
          Home Inspection
        </span>
        <span
          className={cn(
            "mt-0.5 block text-[9px] tracking-[0.28em] uppercase",
            inverted ? "text-white/55" : "text-brand-ink/45",
          )}
        >
          LLC
        </span>
      </span>
      <span className="sr-only">{business.name}</span>
    </span>
  );
}
