import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, ArrowUpRight } from "@/components/brand";
import { Reveal } from "@/components/reveal";
import { CTASection, PageHero, Tag } from "@/components/ui";
import { services } from "@/lib/content/services";
import { fa } from "@/lib/format";

export const metadata: Metadata = {
  title: "خدمات اجرا | میکروسمنت کف، دیوار، نما و فضای مرطوب",
  description:
    "خدمات اجرایی سیمان تک: اجرای میکروسمنت کف، دیوار، نما، سرویس بهداشتی، آشپزخانه و فضاهای دکوراتیو. زیرسازی، آب‌بندی، سیلر و ضمانت ۱۰ ساله.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="خدمات اجرا"
        title="از زیرسازی تا سیلر نهایی، در یک تیم."
        intro="اجرای پوشش‌های سیمانی، حساس‌ترین بخش پروژه است. تیم‌های اجرایی سیمان تک با تجربه پروژه‌های مسکونی، تجاری، اداری و اقامتی، نتیجه را همان‌طور که طراحی شده تحویل می‌دهند."
        image="/images/craft.jpg"
        meta={[
          { label: "تخصص", value: "۶ حوزه اجرایی" },
          { label: "پوشش جغرافیایی", value: "۱۸ استان" },
          { label: "ضمانت اجرا", value: "۱۰ سال" },
          { label: "اعزام تیم", value: "سراسر ایران" },
        ]}
      />

      <section className="wrap py-16 md:py-24">
        <div className="space-y-14 md:space-y-20">
          {services.map((service, index) => (
            <Reveal key={service.slug}>
              <article className="grid items-center gap-8 border-t border-line pt-10 md:grid-cols-12 md:gap-12">
                <div className={index % 2 === 0 ? "md:col-span-6" : "md:col-span-6 md:order-2"}>
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-paper-3">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <span className="absolute right-4 top-4">
                      <Tag className="bg-paper/90">{service.space}</Tag>
                    </span>
                  </div>
                </div>
                <div className={index % 2 === 0 ? "md:col-span-6" : "md:col-span-6 md:order-1"}>
                  <span className="font-mono text-[11px] tracking-[0.16em] text-red">
                    {fa(String(index + 1).padStart(2, "0"))}
                  </span>
                  <h2 className="mt-4 text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.35]">
                    {service.name}
                  </h2>
                  <p className="mt-2 font-mono text-[10px] tracking-[0.16em] text-mist">
                    {service.nameEn}
                  </p>
                  <p className="mt-5 text-[13px] leading-7 text-graphite">{service.summary}</p>
                  <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-4 text-[11px]">
                    <div>
                      <dt className="text-mist">زمان اجرا</dt>
                      <dd className="mt-1 text-ink">{service.duration}</dd>
                    </div>
                    <div>
                      <dt className="text-mist">هزینه تقریبی</dt>
                      <dd className="mt-1 text-ink">{service.startingPrice}</dd>
                    </div>
                  </dl>
                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <Link href={`/services/${service.slug}`} className="btn btn-outline">
                      جزئیات و مراحل اجرا
                      <ArrowIcon />
                    </Link>
                    <Link href="/contact" className="link-arrow text-graphite">
                      استعلام
                      <ArrowUpRight />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-paper-2 py-16 md:py-20">
        <div className="wrap grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="eyebrow">آنچه تضمین می‌کنیم</span>
            <h2 className="mt-5 text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.35]">
              اجرا، فقط بخشی از کار است.
            </h2>
          </div>
          <div className="grid gap-px bg-line sm:grid-cols-2 md:col-span-8">
            {[
              {
                title: "قرارداد شفاف",
                text: "متراژ، سیستم، تعداد لایه، زمان‌بندی و هزینه پیش از شروع در قرارداد مشخص می‌شود.",
              },
              {
                title: "کنترل کیفیت مستند",
                text: "از مراحل زیرسازی، آب‌بندی و لایه نهایی تصویر و گزارش ثبت می‌شود.",
              },
              {
                title: "تیم ثابت، نه پیمانکار متغیر",
                text: "تیم‌های آموزش‌دیده سیمان تک با نظارت فنی ثابت اجرا می‌کنند.",
              },
              {
                title: "پشتیبانی واقعی",
                text: "راهنمای نگهداری، بازدید دوره‌ای و ترمیم موضعی پس از تحویل.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-paper p-6 md:p-7">
                <h3 className="text-[15px]">{item.title}</h3>
                <p className="mt-2 text-[12px] leading-6 text-graphite">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="زمان‌بندی پروژه شما چیست؟"
        text="برای بازدید فنی و برآورد هزینه، شهر و متراژ پروژه را اعلام کنید. بازدید تهران معمولاً در ۴۸ ساعت انجام می‌شود."
        secondary={{ href: "/projects", label: "پروژه‌های اجراشده" }}
      />
    </>
  );
}
