import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon, ArrowUpRight } from "@/components/brand";
import { cx } from "@/lib/format";

export function SectionHead({
  label,
  title,
  intro,
  action,
  tone = "light",
  className,
}: {
  label: string;
  title: ReactNode;
  intro?: string;
  action?: { href: string; label: string };
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={cx("flex flex-col gap-8 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-3xl">
        <span className={cx("eyebrow", tone === "dark" && "text-paper/60")}>{label}</span>
        <h2 className="mt-5 text-[clamp(1.65rem,3.4vw,2.9rem)] leading-[1.25]">{title}</h2>
      </div>
      <div className="flex shrink-0 flex-col items-start gap-4 md:items-end md:pb-1">
        {intro ? (
          <p className={cx("max-w-md text-sm leading-7", tone === "dark" ? "text-paper/65" : "text-graphite")}>
            {intro}
          </p>
        ) : null}
        {action ? (
          <Link
            href={action.href}
            className={cx("link-arrow", tone === "dark" ? "text-amber-soft" : "text-ink")}
          >
            {action.label}
            <ArrowIcon />
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export function PageHero({
  label,
  title,
  intro,
  image,
  meta,
  children,
}: {
  label: string;
  title: ReactNode;
  intro?: string;
  image?: string;
  meta?: { label: string; value: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      {image ? (
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" className="h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/45" />
        </div>
      ) : (
        <div className="absolute inset-0 opacity-[0.16]">
          <div className="absolute -left-32 top-10 h-[26rem] w-[26rem] rounded-full bg-amber blur-[120px]" />
          <div className="absolute -right-20 bottom-0 h-[20rem] w-[20rem] rounded-full bg-red blur-[130px]" />
        </div>
      )}
      <div className="wrap relative pt-36 pb-16 md:pt-44 md:pb-24">
        <span className="eyebrow text-paper/60">{label}</span>
        <h1 className="mt-6 max-w-4xl text-[clamp(2.1rem,5.4vw,4.4rem)] font-normal leading-[1.18]">
          {title}
        </h1>
        {intro ? (
          <p className="mt-7 max-w-2xl text-sm leading-8 text-paper/70 md:text-base md:leading-9">
            {intro}
          </p>
        ) : null}
        {meta ? (
          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-paper/15 pt-8 md:grid-cols-4">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="text-[11px] tracking-[0.12em] text-paper/45">{item.label}</dt>
                <dd className="mt-2 text-sm text-paper/90">{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        {children}
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="مسیر صفحه" className="flex flex-wrap items-center gap-2 text-[11px] text-mist">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="flex items-center gap-2">
          {item.href ? (
            <Link href={item.href} className="transition-colors hover:text-ink">
              {item.label}
            </Link>
          ) : (
            <span className="text-graphite">{item.label}</span>
          )}
          {index < items.length - 1 ? <span className="opacity-50">/</span> : null}
        </span>
      ))}
    </nav>
  );
}

export function CTASection({
  label = "شروع همکاری",
  title,
  text,
  primary = { href: "/contact", label: "درخواست استعلام قیمت" },
  secondary,
}: {
  label?: string;
  title: ReactNode;
  text?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="bg-ink text-paper">
      <div className="wrap grid gap-12 py-20 md:grid-cols-[1.2fr_0.8fr] md:items-end md:py-28">
        <div>
          <span className="eyebrow text-paper/50">{label}</span>
          <h2 className="mt-6 max-w-2xl text-[clamp(1.8rem,4vw,3.4rem)] leading-[1.22]">{title}</h2>
        </div>
        <div className="md:pb-2">
          {text ? <p className="text-sm leading-8 text-paper/65">{text}</p> : null}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={primary.href} className="btn btn-primary">
              {primary.label}
              <ArrowIcon />
            </Link>
            {secondary ? (
              <Link href={secondary.href} className="btn btn-light">
                {secondary.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Tag({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark" | "red" | "amber";
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 border px-2.5 py-1 text-[10px] leading-none tracking-[0.06em]",
        tone === "light" && "border-line text-graphite",
        tone === "dark" && "border-paper/25 text-paper/80",
        tone === "red" && "border-red/30 bg-red/10 text-red",
        tone === "amber" && "border-amber/40 bg-amber/15 text-graphite",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function ArrowLink({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cx("link-arrow", className)}
      >
        {children}
        <ArrowUpRight />
      </a>
    );
  }
  return (
    <Link href={href} className={cx("link-arrow", className)}>
      {children}
      <ArrowIcon />
    </Link>
  );
}

export function FeatureRow({
  items,
}: {
  items: { title: string; text: string; index?: string }[];
}) {
  return (
    <div className="grid gap-px bg-line md:grid-cols-3">
      {items.map((item, index) => (
        <div key={item.title} className="bg-paper p-8 md:p-10">
          <span className="font-mono text-[11px] tracking-[0.2em] text-red">
            {item.index ?? String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-5 text-lg">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-graphite">{item.text}</p>
        </div>
      ))}
    </div>
  );
}
