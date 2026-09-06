"use client";

export function PrintPageButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex h-12 items-center justify-center border border-black/15 bg-white px-6 text-sm font-semibold tracking-wide text-brand-ink uppercase hover:bg-brand-cream"
    >
      Print this page
    </button>
  );
}
