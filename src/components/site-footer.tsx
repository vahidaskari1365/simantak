import Link from "next/link";
import { Brand, ArrowUpRight } from "@/components/brand";
import { products } from "@/lib/content/products";
import { services } from "@/lib/content/services";
import { site, whatsappHref } from "@/lib/site";

const companyLinks = [
  { href: "/about", label: "درباره سیمان تک" },
  { href: "/projects", label: "پروژه‌های اجراشده" },
  { href: "/journal", label: "مجله تخصصی" },
  { href: "/faq", label: "سوالات متداول" },
  { href: "/contact", label: "تماس با ما" },
  { href: "/admin", label: "پیش‌نمایش پنل مدیریت" },
];

export function SiteFooter() {
  return (
    <>
      <footer className="relative overflow-hidden bg-ink text-paper">
        <div className="wrap relative z-10 pt-16 md:pt-20">
          <div className="grid gap-12 border-b border-paper/12 pb-14 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-4">
              <Brand size="lg" />
              <p className="mt-6 max-w-xs text-[13px] leading-7 text-paper/55">
                تولید و اجرای میکروسمنت، پوشش‌های دکوراتیو و پوشش‌های تخصصی سیمانی. از کارخانه تا
                سطح نهایی پروژه شما.
              </p>
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3">
                {site.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-[12px] text-paper/60 transition-colors hover:text-amber"
                  >
                    {social.label}
                    <ArrowUpRight className="opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="md:col-span-3">
              <h3 className="text-[11px] tracking-[0.18em] text-paper/40">محصولات</h3>
              <ul className="mt-5 space-y-3">
                {products.slice(0, 5).map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={`/products/${product.slug}`}
                      className="text-[13px] text-paper/75 transition-colors hover:text-amber"
                    >
                      {product.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/products" className="text-[13px] text-amber transition-opacity hover:opacity-70">
                    مشاهده همه محصولات
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-[11px] tracking-[0.18em] text-paper/40">خدمات</h3>
              <ul className="mt-5 space-y-3">
                {services.slice(0, 5).map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-[13px] text-paper/75 transition-colors hover:text-amber"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3">
              <h3 className="text-[11px] tracking-[0.18em] text-paper/40">ارتباط</h3>
              <ul className="mt-5 space-y-4 text-[13px] text-paper/70">
                <li>
                  <a href={`tel:${site.phoneHref}`} className="transition-colors hover:text-amber" dir="ltr">
                    {site.phoneLabel}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className="transition-colors hover:text-amber">
                    {site.email}
                  </a>
                </li>
                <li className="leading-6 text-paper/55">{site.address}</li>
                <li>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-paper/25 px-4 py-2.5 text-[12px] text-paper transition-colors hover:border-amber hover:text-amber"
                  >
                    واتساپ — پاسخ سریع
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-6 border-b border-paper/12 py-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-sm text-paper/85">خبرنامه مواد و پروژه‌ها</h3>
              <p className="mt-1 text-[11px] text-paper/45">
                جدیدترین محصولات، نمونه‌کارها و مقالات تخصصی — حداکثر ماهی یک ایمیل.
              </p>
            </div>
            <form
              action="/contact"
              className="flex w-full max-w-sm items-center gap-0 border-b border-paper/30 focus-within:border-amber"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                ایمیل برای خبرنامه
              </label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                required
                placeholder="ایمیل شما"
                className="w-full bg-transparent py-3 text-[13px] text-paper placeholder:text-paper/35 focus:outline-none"
              />
              <button type="submit" className="px-3 py-3 text-[12px] text-amber" aria-label="عضویت در خبرنامه">
                عضویت
              </button>
            </form>
          </div>

          <div className="flex flex-col-reverse gap-5 py-8 text-[11px] text-paper/40 md:flex-row md:items-center md:justify-between">
            <p>
              © {site.established}–۱۴۰۴ {site.legalName}. تمامی حقوق محفوظ است.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {companyLinks.slice(0, 4).map((link) => (
                <Link key={link.href} href={link.href} className="transition-colors hover:text-paper/80">
                  {link.label}
                </Link>
              ))}
              <span className="hidden md:inline">·</span>
              <span>طراحی و توسعه: استودیو سیمان تک</span>
            </div>
          </div>
        </div>

        <div aria-hidden="true" className="wrap pointer-events-none select-none pb-6">
          <span className="block text-[clamp(3rem,12vw,11rem)] font-medium leading-[0.8] tracking-[0.05em] text-paper/[0.045]">
            SIMAN TAK
          </span>
        </div>
      </footer>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="گفت‌وگو در واتساپ"
        className="fixed bottom-5 left-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#1f8f5f] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.6-4.3A8.5 8.5 0 1 1 20.5 11.6Z"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M8.8 8.2c.3-.1.7 0 .9.4l.6 1.1c.1.3.1.6-.1.8l-.4.4c.5 1 1.3 1.8 2.3 2.3l.4-.4c.2-.2.5-.3.8-.1l1.1.6c.4.2.5.6.4.9-.3.8-1.1 1.4-2 1.4-2.6 0-4.8-2.2-4.8-4.8 0-.9.6-1.7 1.4-2Z"
            fill="currentColor"
          />
        </svg>
      </a>
    </>
  );
}
