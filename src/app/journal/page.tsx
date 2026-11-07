import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/cards";
import { ArrowIcon } from "@/components/brand";
import { Reveal } from "@/components/reveal";
import { CTASection, PageHero, Tag } from "@/components/ui";
import { articleCategories, articles } from "@/lib/content/articles";
import { fa } from "@/lib/format";

export const metadata: Metadata = {
  title: "مجله تخصصی | میکروسمنت، پوشش دکوراتیو و اجرا",
  description:
    "مقالات و راهنماهای تخصصی سیمان تک درباره میکروسمنت، زیرسازی، مقایسه پوشش‌های دکوراتیو، آب‌بندی، نگهداری و نکات فنی اجرا.",
  alternates: { canonical: "/journal" },
};

export default async function JournalPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active = articleCategories.find((item) => item.id === category);
  const list = active ? articles.filter((article) => article.category === active.id) : articles;
  const [lead, ...rest] = list;

  return (
    <>
      <PageHero
        label="مجله سیمان تک"
        title="دانش متریال، بدون شعار."
        intro="هر مقاله از تجربه اجرایی ما بیرون آمده است: چه چیزهایی کار می‌کند، چه چیزهایی نه و چرا. برای معماران، مجریان و کارفرمایان."
        image="/images/samples.jpg"
        meta={[
          { label: "مقالات منتشرشده", value: `${fa(articles.length)} مقاله تخصصی` },
          { label: "موضوعات", value: "شناخت، اجرا، مقایسه، نگهداری" },
          { label: "به‌روزرسانی", value: "ماهانه" },
          { label: "نویسندگان", value: "تیم فنی و اجرایی" },
        ]}
      />

      <section className="wrap py-14 md:py-20">
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto pb-1">
          <Link
            href="/journal"
            className={
              !active
                ? "shrink-0 border border-ink bg-ink px-4 py-2.5 text-[12px] text-paper"
                : "shrink-0 border border-line px-4 py-2.5 text-[12px] text-graphite transition-colors hover:border-ink hover:text-ink"
            }
          >
            همه موضوعات
          </Link>
          {articleCategories.map((item) => (
            <Link
              key={item.id}
              href={`/journal?category=${item.id}`}
              className={
                active?.id === item.id
                  ? "shrink-0 border border-ink bg-ink px-4 py-2.5 text-[12px] text-paper"
                  : "shrink-0 border border-line px-4 py-2.5 text-[12px] text-graphite transition-colors hover:border-ink hover:text-ink"
              }
            >
              {item.label}
            </Link>
          ))}
        </div>

        {lead ? (
          <Reveal className="mt-10">
            <Link
              href={`/journal/${lead.slug}`}
              className="group grid items-center gap-8 border-b border-line pb-12 md:grid-cols-12 md:gap-12"
            >
              <div className="img-zoom relative aspect-[16/10] w-full overflow-hidden bg-paper-3 md:col-span-7">
                <Image
                  src={lead.image}
                  alt={lead.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover"
                />
                <span className="absolute right-4 top-4">
                  <Tag className="bg-paper/90">مقاله شاخص</Tag>
                </span>
              </div>
              <div className="md:col-span-5">
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-mist">
                  <span className="text-red">
                    {articleCategories.find((item) => item.id === lead.category)?.label}
                  </span>
                  <span className="h-px w-4 bg-line" />
                  <span>{lead.date}</span>
                  <span>{lead.readTime}</span>
                </div>
                <h2 className="mt-4 text-[clamp(1.5rem,3vw,2.3rem)] leading-[1.35] transition-colors group-hover:text-red">
                  {lead.title}
                </h2>
                <p className="mt-4 text-[13px] leading-7 text-graphite">{lead.excerpt}</p>
                <span className="link-arrow mt-7 text-ink">
                  خواندن مقاله
                  <ArrowIcon />
                </span>
              </div>
            </Link>
          </Reveal>
        ) : null}

        <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {(active ? list : rest).map((article, index) => (
            <Reveal key={article.slug} delay={(index % 3) * 70}>
              <ArticleCard article={article} />
            </Reveal>
          ))}
        </div>

        {list.length === 0 ? (
          <p className="py-20 text-center text-sm text-mist">مقاله‌ای در این موضوع یافت نشد.</p>
        ) : null}
      </section>

      <section className="bg-paper-2 py-14">
        <div className="wrap grid items-center gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <span className="eyebrow">راهنمای فنی رایگان</span>
            <h2 className="mt-4 text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.4]">
              «راهنمای انتخاب و اجرای پوشش‌های سیمانی» را دریافت کنید.
            </h2>
            <p className="mt-3 max-w-xl text-[12px] leading-6 text-graphite">
              یک فایل PDF کوتاه درباره انواع سیستم، شرایط بستر، مقایسه هزینه و چک‌لیست پیش از اجرا.
            </p>
          </div>
          <div className="md:col-span-5 md:justify-self-end">
            <Link href="/contact" className="btn btn-ink">
              دریافت راهنما
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="سوال فنی دارید که پاسخ آن را در مقالات پیدا نکردید؟"
        text="تیم فنی سیمان تک به سوالات معماران، مجریان و کارفرمایان پاسخ می‌دهد."
        primary={{ href: "/faq", label: "سوالات متداول" }}
        secondary={{ href: "/contact", label: "پرسیدن سوال" }}
      />
    </>
  );
}
