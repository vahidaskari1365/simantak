import Link from "next/link";
import { cx } from "@/lib/format";

type Size = "sm" | "md" | "lg";

export function BrandMark({ className, size = "md" }: { className?: string; size?: Size }) {
  const px = size === "sm" ? 26 : size === "lg" ? 46 : 34;
  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect x="0.6" y="0.6" width="38.8" height="38.8" stroke="currentColor" strokeOpacity="0.35" />
      <path d="M9 28.5H31" stroke="#b4392c" strokeWidth="3.2" />
      <path d="M9 21.5H26" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.6" />
      <path d="M9 15H21.5" stroke="#d8a13c" strokeWidth="1.6" />
      <path d="M9 9.5H14.5" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.2" />
    </svg>
  );
}

export function Brand({
  className,
  size = "md",
  href = "/",
  showEn = true,
}: {
  className?: string;
  size?: Size;
  href?: string | null;
  showEn?: boolean;
}) {
  const content = (
    <span className={cx("inline-flex items-center gap-3", className)}>
      <BrandMark size={size} />
      <span className="flex flex-col leading-none">
        <span
          className={cx(
            "font-medium tracking-tight",
            size === "sm" ? "text-[15px]" : size === "lg" ? "text-2xl" : "text-lg",
          )}
        >
          سیمان تک
        </span>
        {showEn ? (
          <span className="mt-1.5 text-[9px] tracking-[0.34em] opacity-60">SIMAN TAK</span>
        ) : null}
      </span>
    </span>
  );

  if (!href) return content;
  return (
    <Link href={href} aria-label="سیمان تک — صفحه اصلی" className="inline-flex">
      {content}
    </Link>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="10"
      viewBox="0 0 18 10"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M17 5H1" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 1L1 5L5 9" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M3 11L11 3" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4.5 3H11V9.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
