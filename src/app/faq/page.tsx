import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/components/brand";
import { FaqList } from "@/components/faq-list";
import { CTASection, PageHero } from "@/components/ui";
import { faqGroups, faqs, faqsByGroup } from "@/lib/content/faqs";
import { fa } from "@/lib/format";
import { site, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "سوالات متداول | میکروسمنت، مقاومت، هزینه و اجرا",
  description:
    "پاسخ پرتکرارترین سوالات درباره میکروسمنت: تفاوت با سایر پوشش‌ها، مقاومت در برابر آب، روش و زمان اجرا، طول عمر، هزینه، نگهداری و شرایط خرید.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqGroups.flatMap((group) =>
      faqsByGroup(group.id).map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PageHero
        label="سوالات متداول"
        title="پاسخ‌های روشن، برای تصمیم‌های مهم."
        intro="پرسش‌هایی که بیشترین تکرار را در تماس‌های ما دارند؛ با پاسخ‌های فنی و بدون اغراق. اگر پاسخ سوال شما اینجا نبود، بپرسید."
        image="/images/product-bath.jpg"
        meta={[
          { label: "پرسش پاسخ‌داده‌شده", value: `${fa(faqs.length)} سوال` },
          { label: "موضوعات", value: "شناخت، اجرا، دوام، قیمت" },
          { label: "زمان پاسخ‌گویی", value: "کمتر از یک روز کاری" },
          { label: "پشتیبانی فنی", value: "تماس و واتساپ" },
        ]}
      />

      <section className="wrap py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <aside className="md:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div>
                <span className="eyebrow">فهرست موضوعی</span>
                <nav className="mt-5">
                  <ul className="divide-y divide-line border-y border-line">
                    {faqGroups.map((group, index) => (
                      <li key={group.id}>
                        <a
                          href={`#${group.id}`}
                          className="group flex items-start justify-between gap-4 py-4"
                        >
                          <span>
                            <span className="block text-[13px] text-ink transition-colors group-hover:text-red">
                              {group.label}
                            </span>
                            <span className="mt-1 block text-[10px] text-mist">
                              {group.description}
                            </span>
                          </span>
                          <span className="font-mono text-[10px] text-mist">
                            {fa(String(index + 1).padStart(2, "0"))}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div className="bg-ink p-5 text-paper">
                <h2 className="text-sm">پاسخ سوال خود را پیدا نکردید؟</h2>
                <p className="mt-2 text-[12px] leading-6 text-paper/60">
                  کارشناس فنی ما در ساعات کاری پاسخ می‌دهد؛ می‌توانید تصویر یا نقشه پروژه را هم
                  ارسال کنید.
                </p>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary mt-4 w-full"
                >
                  پرسیدن در واتساپ
                  <ArrowIcon />
                </a>
                <a
                  href={`tel:${site.phoneHref}`}
                  dir="ltr"
                  className="mt-3 block text-center text-[12px] text-paper/60 hover:text-amber"
                >
                  {site.phoneLabel}
                </a>
              </div>
            </div>
          </aside>

          <div className="md:col-span-8">
            <div className="space-y-14">
              {faqGroups.map((group, index) => (
                <section key={group.id} id={group.id} className="scroll-mt-28">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] text-red">
                      {fa(String(index + 1).padStart(2, "0"))}
                    </span>
                    <div>
                      <h2 className="text-2xl">{group.label}</h2>
                      <p className="mt-1 text-[12px] text-mist">{group.description}</p>
                    </div>
                  </div>
                  <FaqList items={faqsByGroup(group.id)} className="mt-6" defaultOpenFirst={index === 0} />
                </section>
              ))}
            </div>

            <div className="mt-14 border border-line bg-paper-2 p-6 md:p-8">
              <h2 className="text-lg">فکر می‌کنید سوال شما جای دیگری است؟</h2>
              <p className="mt-2 max-w-xl text-[13px] leading-7 text-graphite">
                فرم استعلام را پر کنید یا مستقیم تماس بگیرید. برای پاسخ دقیق‌تر، نوع فضا، متراژ و
                شهر پروژه را ذکر کنید.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-ink">
                  فرم تماس و استعلام
                  <ArrowIcon />
                </Link>
                <Link href="/journal" className="btn btn-outline">
                  مطالعه مجله تخصصی
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="هنوز تردید دارید؟ بگذارید بررسی کنیم."
        text="ارسال تصویر فضا و متراژ کافی است تا سیستم پیشنهادی و برآورد هزینه را دریافت کنید."
        secondary={{ href: "/products", label: "مشاهده محصولات" }}
      />
    </>
  );
}
