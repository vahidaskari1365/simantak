import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, ArrowUpRight } from "@/components/brand";
import { ContactForm } from "@/components/contact-form";
import { CTASection, PageHero, Tag } from "@/components/ui";
import { site, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "تماس با ما | استعلام قیمت و مشاوره فنی",
  description:
    "راه‌های ارتباط با بتن دکور سیمان تک: تلفن، واتساپ، ایمیل، آدرس کارخانه و شوروم در تهران، و فرم درخواست مشاوره و استعلام قیمت پوشش‌های میکروسمنت.",
  alternates: { canonical: "/contact" },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: site.legalName,
  image: `${site.url}/images/hero.jpg`,
  telephone: site.phoneHref,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address,
    addressLocality: "تهران",
    addressCountry: "IR",
  },
  openingHours: "Sa-We 09:00-18:00, Th 09:00-13:00",
  url: `${site.url}/contact`,
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <PageHero
        label="ارتباط با سیمان تک"
        title="یک گفت‌وگو، پیش از هر تصمیم."
        intro="برای استعلام قیمت، مشاوره متریال، بازدید فنی یا همکاری در پروژه‌ها با ما تماس بگیرید. پاسخ‌گویی در ساعات کاری و در کمترین زمان انجام می‌شود."
        image="/images/project-kitchen.jpg"
        meta={[
          { label: "تلفن دفتر", value: site.phoneLabel },
          { label: "موبایل و واتساپ", value: site.mobileLabel },
          { label: "ایمیل", value: site.email },
          { label: "بازدید فنی تهران", value: "حداکثر ۴۸ ساعت" },
        ]}
      />

      <section className="wrap py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-7">
            <ContactForm />
          </div>

          <aside className="md:col-span-5">
            <div className="space-y-6">
              <div className="border border-line bg-paper-2 p-6 md:p-7">
                <h2 className="text-lg">اطلاعات تماس</h2>
                <dl className="mt-5 space-y-5 text-[13px]">
                  <div>
                    <dt className="text-[10px] tracking-[0.1em] text-mist">تلفن دفتر</dt>
                    <dd className="mt-1">
                      <a href={`tel:${site.phoneHref}`} dir="ltr" className="text-ink hover:text-red">
                        {site.phoneLabel}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] tracking-[0.1em] text-mist">موبایل و واتساپ</dt>
                    <dd className="mt-1">
                      <a href={`tel:${site.mobileHref}`} dir="ltr" className="text-ink hover:text-red">
                        {site.mobileLabel}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] tracking-[0.1em] text-mist">ایمیل</dt>
                    <dd className="mt-1 space-y-1">
                      <a href={`mailto:${site.email}`} className="block text-ink hover:text-red">
                        {site.email}
                      </a>
                      <a href={`mailto:${site.salesEmail}`} className="block text-graphite hover:text-red">
                        {site.salesEmail} (فروش)
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] tracking-[0.1em] text-mist">کارخانه و شوروم</dt>
                    <dd className="mt-1 leading-7 text-graphite">{site.address}</dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-wrap gap-2">
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary !px-4 !py-2.5 text-[12px]">
                    واتساپ
                    <ArrowIcon />
                  </a>
                  <Link href="/faq" className="btn btn-outline !px-4 !py-2.5 text-[12px]">
                    سوالات متداول
                  </Link>
                </div>
              </div>

              <div className="border border-line p-6 md:p-7">
                <h2 className="text-sm">ساعات کاری</h2>
                <ul className="mt-4 divide-y divide-line text-[12px]">
                  {site.hours.map((item) => (
                    <li key={item.day} className="flex justify-between gap-4 py-2.5">
                      <span className="text-graphite">{item.day}</span>
                      <span className={item.time === "تعطیل" ? "text-red" : "text-ink"}>{item.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-line p-6 md:p-7">
                <h2 className="text-sm">شبکه‌های اجتماعی</h2>
                <p className="mt-2 text-[11px] leading-6 text-mist">
                  تصاویر پروژه‌ها، جزئیات اجرا و ویدیوهای کارگاهی را در اینستاگرام منتشر می‌کنیم.
                </p>
                <ul className="mt-4 divide-y divide-line">
                  {site.socials.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-3 py-3 text-[12px] text-graphite transition-colors hover:text-ink"
                      >
                        <span>
                          {social.label}
                          <span className="ms-2 text-[10px] text-mist">{social.handle}</span>
                        </span>
                        <ArrowUpRight className="opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-paper-2 py-14 md:py-20">
        <div className="wrap">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="eyebrow">موقعیت روی نقشه</span>
              <h2 className="mt-4 text-2xl">کارخانه و شوروم سیمان تک</h2>
              <p className="mt-2 text-[12px] leading-6 text-graphite">
                بازدید از شوروم و نمونه‌های متریال با هماهنگی قبلی انجام می‌شود.
              </p>
            </div>
            <a
              href={site.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow text-ink"
            >
              مسیریابی در گوگل‌مپ
              <ArrowUpRight />
            </a>
          </div>

          <div className="mt-6 overflow-hidden border border-line bg-paper-3">
            <iframe
              title="موقعیت کارخانه سیمان تک روی نقشه"
              src={site.mapEmbed}
              loading="lazy"
              className="h-[320px] w-full md:h-[440px]"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-[11px] text-mist">
            <Tag>تهران</Tag>
            <Tag>شهرک صنعتی چهاردانگه</Tag>
            <Tag>دسترسی از بزرگراه فتح</Tag>
            <span>پارکینگ مهمان موجود است.</span>
          </div>
        </div>
      </section>

      <CTASection
        title="برای همکاری در پروژه‌های بزرگ آماده‌ایم."
        text="پیمانکاران، دفاتر معماری و فروشگاه‌های متریال می‌توانند شرایط همکاری و نمایندگی را دریافت کنند."
        primary={{ href: "/about", label: "درباره سیمان تک" }}
        secondary={{ href: "/shop", label: "فروشگاه متریال" }}
      />
    </>
  );
}
