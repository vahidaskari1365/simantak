"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Brand, ArrowIcon } from "@/components/brand";
import { cx } from "@/lib/format";
import { nav, site, whatsappHref } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={cx(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          solid
            ? "border-b border-line bg-paper/95 text-ink backdrop-blur-md"
            : "border-b border-transparent text-paper",
        )}
      >
        <div className="wrap flex h-[72px] items-center justify-between gap-6 md:h-[84px]">
          <div className="flex items-center gap-3 md:gap-6">
            <Brand size="sm" />
            <span
              className={cx(
                "hidden border-r pr-6 text-[10px] leading-5 tracking-[0.05em] xl:block",
                solid ? "border-line text-mist" : "border-paper/25 text-paper/60",
              )}
            >
              تولیدکننده تخصصی
              <br />
              پوشش‌های میکروسمنت
            </span>
          </div>

          <nav aria-label="ناوبری اصلی" className="hidden lg:block">
            <ul className="flex items-center gap-6 xl:gap-8">
              {nav.map((item) => {
                const active =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cx(
                        "relative text-[13px] transition-colors",
                        active
                          ? solid
                            ? "text-red"
                            : "text-amber"
                          : solid
                            ? "text-graphite hover:text-ink"
                            : "text-paper/75 hover:text-paper",
                      )}
                    >
                      {item.label}
                      {active ? (
                        <span
                          className={cx(
                            "absolute -bottom-2 right-0 h-px w-full",
                            solid ? "bg-red" : "bg-amber",
                          )}
                        />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={cx(
                "hidden items-center gap-2 text-[12px] transition-opacity hover:opacity-70 md:flex",
                solid ? "text-graphite" : "text-paper/80",
              )}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.6-4.3A8.5 8.5 0 1 1 20.5 11.6Z"
                  stroke="currentColor"
                  strokeWidth="1.3"
                />
                <path
                  d="M8.8 8.2c.3-.1.7 0 .9.4l.6 1.1c.1.3.1.6-.1.8l-.4.4c.5 1 1.3 1.8 2.3 2.3l.4-.4c.2-.2.5-.3.8-.1l1.1.6c.4.2.5.6.4.9-.3.8-1.1 1.4-2 1.4-2.6 0-4.8-2.2-4.8-4.8 0-.9.6-1.7 1.4-2Z"
                  fill="currentColor"
                />
              </svg>
              {site.phoneLabel}
            </a>
            <Link
              href="/contact"
              className={cx(
                "btn hidden !px-5 !py-3 text-[12px] sm:inline-flex",
                solid ? "btn-primary" : "btn-light",
              )}
            >
              استعلام قیمت
              <ArrowIcon />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-label={open ? "بستن منو" : "باز کردن منو"}
              className={cx(
                "flex h-10 w-10 flex-col items-center justify-center gap-[5px] border transition-colors lg:hidden",
                solid ? "border-line text-ink" : "border-paper/30 text-paper",
              )}
            >
              <span
                className={cx(
                  "h-px w-4 bg-current transition-transform duration-300",
                  open && "translate-y-[3px] rotate-45",
                )}
              />
              <span
                className={cx(
                  "h-px w-4 bg-current transition-transform duration-300",
                  open && "-translate-y-[3px] -rotate-45",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        className={cx(
          "fixed inset-0 top-[72px] z-40 overflow-y-auto bg-paper text-ink transition-all duration-300 md:top-[84px] lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <div className="wrap flex min-h-full flex-col pb-12 pt-6">
          <ul className="divide-y divide-line border-y border-line">
            {nav.map((item, index) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-baseline justify-between py-4"
                  onClick={() => setOpen(false)}
                >
                  <span className="text-lg">{item.label}</span>
                  <span className="font-mono text-[10px] text-mist">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3">
            <Link href="/contact" className="btn btn-primary w-full" onClick={() => setOpen(false)}>
              درخواست مشاوره و استعلام قیمت
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline w-full"
            >
              واتساپ: {site.mobileLabel}
            </a>
          </div>
          <div className="mt-8 text-[11px] leading-6 text-mist">
            <p>{site.address}</p>
            <p className="mt-2">
              {site.phoneLabel} · {site.email}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
