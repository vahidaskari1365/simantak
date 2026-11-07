import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/cards";
import { Reveal } from "@/components/reveal";
import { CTASection, PageHero, SectionHead, Tag } from "@/components/ui";
import { productCategories, products, type CategoryId } from "@/lib/content/products";
import { fa } from "@/lib/format";

export const metadata: Metadata = {
  title: "محصولات | میکروسمنت، پوشش دکوراتیو و سیمانی",
  description:
    "کاتالوگ محصولات سیمان تک: میکروسمنت کف و دیوار، میکروسمنت نما و ضدآب، میکروتاپینگ، پلاستر ونیزی، پوشش مینرال نما و سیلر محافظ. مشخصات فنی، کاربردها و روش اجرا.",
  alternates: { canonical: "/products" },
};

const guides = [
  {
    title: "برای کف",
    text: "میکروسمنت کلاسیک یا میکروتاپینگ؛ انتخاب بر اساس وضعیت بستر و میزان تردد.",
    href: "/products/microcement-classic",
    label: "مشاهده سیستم کف",
    accent: "red",
  },
  {
    title: "برای دیوار",
    text: "میکروسمنت کلاسیک برای دیوار یکدست، پلاستر ونیزی برای بافت شاخص و دستی.",
    href: "/products/venetian-plaster",
    label: "مشاهده پلاستر ونیزی",
    accent: "amber",
  },
  {
    title: "برای نما و فضای مرطوب",
    text: "میکروسمنت نما با پایداری UV و سیستم ضدآب با لایه آب‌بند میانی.",
    href: "/products/microcement-wet",
    label: "مشاهده سیستم ضدآب",
    accent: "graphite",
  },
];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active = productCategories.find((item) => item.id === category);
  const list = active ? products.filter((product) => product.category === active.id) : products;

  return (
    <>
      <PageHero
        label="محصولات سیمان تک"
        title="متریال سیمانی، از پایه تا سطح نهایی."
        intro="هفت سیستم تخصصی برای کف، دیوار، نما و فضاهای مرطوب؛ همه با فرمولاسیون داخلی، رنگ‌بندی منعطف و پشتیبانی فنی در اجرا."
        image="/images/product-wall.jpg"
        meta={[
          { label: "خانواده محصول", value: `${fa(productCategories.length)} گروه تخصصی` },
          { label: "سیستم فعال", value: `${fa(products.length)} محصول` },
          { label: "پالت رنگی", value: "۱۸ رنگ استاندارد + سفارشی" },
          { label: "ارسال", value: "سراسر ایران" },
        ]}
      />

      <section className="wrap py-14 md:py-20">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto pb-1">
            <FilterLink href="/products" active={!active}>
              همه محصولات
            </FilterLink>
            {productCategories.map((item) => (
              <FilterLink
                key={item.id}
                href={`/products?category=${item.id}`}
                active={active?.id === item.id}
              >
                {item.name}
              </FilterLink>
            ))}
          </div>
          <p className="text-[11px] text-mist">{fa(list.length)} محصول نمایش داده می‌شود</p>
        </div>

        {active ? (
          <p className="mt-6 max-w-2xl border-r-2 border-amber pr-4 text-[13px] leading-7 text-graphite">
            {active.description}
          </p>
        ) : null}

        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((product, index) => (
            <Reveal key={product.slug} delay={(index % 3) * 70}>
              <ProductCard product={product} index={index} />
            </Reveal>
          ))}
        </div>

        {list.length === 0 ? (
          <p className="py-20 text-center text-sm text-mist">محصولی در این دسته یافت نشد.</p>
        ) : null}
      </section>

      <section className="bg-paper-2 py-20 md:py-24">
        <div className="wrap">
          <SectionHead
            label="راهنمای انتخاب"
            title="از کجا شروع کنیم؟"
            intro="اگر بین چند سیستم تردید دارید، این سه مسیر کوتاه انتخاب را ساده می‌کند. برای تصمیم دقیق‌تر، مشاوره فنی رایگان داریم."
          />
          <div className="mt-10 grid gap-px bg-line md:grid-cols-3">
            {guides.map((guide) => (
              <div key={guide.title} className="flex flex-col bg-paper p-7 md:p-9">
                <Tag tone={guide.accent === "red" ? "red" : guide.accent === "amber" ? "amber" : "light"}>
                  {guide.title}
                </Tag>
                <p className="mt-5 flex-1 text-sm leading-7 text-graphite">{guide.text}</p>
                <Link href={guide.href} className="link-arrow mt-6 text-ink">
                  {guide.label}
                  <span aria-hidden="true">←</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="نمی‌دانید کدام سیستم برای پروژه شما مناسب است؟"
        text="متراژ و نوع فضا را بگویید؛ کارشناس فنی سیمان تک سیستم پیشنهادی، تعداد کیت مورد نیاز و بازه هزینه را اعلام می‌کند."
        primary={{ href: "/contact", label: "مشاوره فنی رایگان" }}
        secondary={{ href: "/projects", label: "دیدن نمونه‌کارها" }}
      />
    </>
  );
}

function FilterLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={
        active
          ? "shrink-0 border border-ink bg-ink px-4 py-2.5 text-[12px] text-paper"
          : "shrink-0 border border-line px-4 py-2.5 text-[12px] text-graphite transition-colors hover:border-ink hover:text-ink"
      }
    >
      {children}
    </Link>
  );
}
