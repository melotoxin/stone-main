import type { SVGProps } from "react";

/** Fine-line architectural icons following the homepage reference. */
export function StoneBenefitIcon({ index, ...props }: SVGProps<SVGSVGElement> & { index: number }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {index === 0 && <>
        <path d="M7 59h50M10 58V26a2 2 0 0 1 2-2h10M42 24h10a2 2 0 0 1 2 2v32M22 58V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v52" />
        <path d="M28 14h4m3 0h2M28 24h4m3 0h2M28 34h4m3 0h2M28 44h4m3 0h2M28 58V49h8v9M16 31v6m0 8v6m32-20v6m0 8v6" />
      </>}
      {index === 1 && <>
        <path d="M6 42A30 30 0 1 1 61 31M8 44l3-8m-3 8-4-6M52 8l3 7 6-4" />
        <path d="m22 35-12 14a4 4 0 0 0 0 6l3 3a4 4 0 0 0 6 0l13-14m5-9 15-16-6-6-4 2-4-3-7 7 1 7-8 8M32 38 19 24l-7-1-2-8 9-1 6 6-1 6 24 23a4 4 0 0 1 0 6l-3 3a4 4 0 0 1-6 0L26 44" />
      </>}
      {index === 2 && <>
        <circle cx="32" cy="32" r="28" />
        <ellipse cx="32" cy="32" rx="13" ry="28" />
        <path d="M32 4v56M4 32h56M9 16c13 6 33 6 46 0M9 48c13-6 33-6 46 0" />
      </>}
      {index === 3 && <>
        <circle cx="32" cy="32" r="29" />
        <path d="M21 46V23a3 3 0 0 1 3-3h13l5 5v5M21 46h10M37 20v6h6M36 45a7 7 0 0 0-14 0m21-1c0-5-2-8-6-9" />
        <circle cx="29" cy="31" r="4.5" />
        <path d="M39 31c4-3 8 1 6 4l-3 3M29 40v5" />
      </>}
    </svg>
  );
}
