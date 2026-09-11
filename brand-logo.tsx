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
    <span className={cn("flex items-center gap-3 sm:gap-3.5", className)}>
      <span
        className={cn(
          "flex size-12 shrink-0 items-center justify-center sm:size-14 md:size-16 lg:size-[4.5rem]",
          inverted ? "rounded-sm bg-white p-1" : "bg-transparent",
        )}
      >
        <Image
          src="/images/logo-house.png"
          alt=""
          width={527}
          height={427}
          className="h-full w-auto"
          priority
        />
      </span>
      <span
        aria-hidden
        className="h-10 w-0.5 shrink-0 self-center bg-brand-gold sm:h-12 md:h-14"
      />
      <span className="flex min-w-0 flex-col justify-center leading-none">
        <span
          className={cn(
            "font-heading text-[1.05rem] font-bold tracking-[0.12em] uppercase sm:text-xl md:text-[1.7rem]",
            inverted ? "text-white" : "text-brand-ink",
          )}
        >
          Cornerstone
        </span>
        <span className="mt-1 font-heading text-[10px] font-semibold tracking-[0.18em] text-brand-gold uppercase sm:mt-1.5 sm:text-xs md:text-sm md:tracking-[0.22em]">
          Home Inspection
        </span>
        <span
          className={cn(
            "mt-1 text-[9px] tracking-[0.28em] uppercase sm:text-[10px]",
            inverted ? "text-white/70" : "text-brand-ink/60",
          )}
        >
          LLC
        </span>
      </span>
      <span className="sr-only">{business.name}</span>
    </span>
  );
}
