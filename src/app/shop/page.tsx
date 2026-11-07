import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/components/brand";
import { ShopCatalog, type ShopItem } from "@/components/shop-catalog";
import { CTASection, PageHero, SectionHead } from "@/components/ui";
import { categoryOf, products } from "@/lib/content/products";
import { fa } from "@/lib/format";

export const metadata: Metadata = {
  title: "فروشگاه متریال | خرید کیت میکروسمنت و سیلر",
  description:
    "پیش‌نمایش فروشگاه آنلاین سیمان تک: کیت‌های میکروسمنت، میکروتاپینگ، پوشش مینرال و سیلر محافظ با قیمت و موجودی. سفارش فعلاً از طریق واتساپ و تلفن ثبت می‌شود.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  const items: ShopItem[] = products
    .filter((product) => product.shop)
    .map((product) => ({
      slug: product.slug,
      name: product.name,
      nameEn: product.nameEn,
      image: product.image,
      unit: product.shop!.unit,
      weight: product.shop!.weight,
      price: product.shop!.price,
      stock: product.shop!.stock,
      category: categoryOf(product.category).name,
      coverage: product.coverage,
    }));

  return (
    <>
      <PageHero
        label="فروشگاه سیمان تک"
        title="متریال، آماده برای اجرا."
        intro="کیت‌های آماده اجرا با راهنمای فنی، بسته‌بندی مقاوم و ارسال به سراسر ایران. این صفحه پیش‌نمایش فروشگاه است؛ سبد خرید کار می‌کند و سفارش از طریق واتساپ ثبت می‌شود تا درگاه پرداخت آنلاین در فاز بعدی فعال شود."
        image="/images/samples.jpg"
        meta={[
          { label: "محصول آماده فروش", value: `${fa(items.length)} کیت` },
          { label: "ارسال", value: "سراسر ایران" },
          { label: "پرداخت آنلاین", value: "در فاز بعدی" },
          { label: "پشتیبانی فنی", value: "همراه کیت" },
        ]}
      />

      <div className="border-b border-amber/40 bg-amber/15">
        <div className="wrap flex flex-col items-start justify-between gap-3 py-3.5 text-[11px] leading-6 text-graphite md:flex-row md:items-center">
          <p>
            <span className="me-2 border border-amber/60 px-2 py-0.5 text-[10px] text-ink">پیش‌نمایش</span>
            ساختار فروشگاه، موجودی، قیمت‌گذاری و سبد خرید آماده است. پرداخت آنلاین و پنل سفارش در
            فاز توسعه فعال می‌شود.
          </p>
          <Link href="/admin" className="link-arrow shrink-0 text-ink">
            مشاهده پیش‌نمایش پنل مدیریت
            <ArrowIcon />
          </Link>
        </div>
      </div>

      <section className="wrap py-14 md:py-20">
        <SectionHead
          label="کاتالوگ خرید"
          title="کیت‌های آماده اجرا"
          intro="هر کیت شامل اجزای کامل و راهنمای اختلاط و اجراست. برای پروژه‌های بزرگ، امکان قیمت‌گذاری عمده و ارسال فوری وجود دارد."
        />
        <div className="mt-10">
          <ShopCatalog items={items} />
        </div>
      </section>

      <section className="bg-paper-2 py-14 md:py-20">
        <div className="wrap">
          <div className="grid gap-px bg-line md:grid-cols-3">
            {[
              {
                title: "بسته‌بندی حرفه‌ای",
                text: "کیت‌ها به‌صورت دو جزئی و با پلمب مقاوم بسته‌بندی می‌شوند تا در حمل، کیفیت حفظ شود.",
              },
              {
                title: "ارسال و تحویل",
                text: "ارسال به سراسر ایران با باربری و پیک؛ زمان تحویل پس از تأیید سفارش اعلام می‌شود.",
              },
              {
                title: "پشتیبانی اجرا",
                text: "راهنمای اجرای اختصاصی و پاسخ فنی تلفنی برای خریداران کیت، بدون هزینه اضافه.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-paper p-7">
                <h3 className="text-base">{item.title}</h3>
                <p className="mt-2 text-[12px] leading-6 text-graphite">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[11px] leading-6 text-mist">
            توجه: مشخصات و قیمت‌های این صفحه پیش‌نمایش است. برای استعلام رسمی، پیش‌فاکتور و شرایط
            فروش عمده با واحد فروش تماس بگیرید.
          </p>
        </div>
      </section>

      <CTASection
        title="خرید عمده یا پروژه‌ای دارید؟"
        text="برای پیمانکاران، فروشگاه‌ها و پروژه‌های بزرگ، قیمت‌گذاری ویژه و پشتیبانی اجرایی اختصاصی ارائه می‌شود."
        primary={{ href: "/contact", label: "درخواست پیش‌فاکتور" }}
        secondary={{ href: "/products", label: "مشخصات محصولات" }}
      />
    </>
  );
}
