import type { Metadata } from "next";
import { AdminDemo, type AdminProduct } from "@/components/admin-demo";
import { categoryOf, products } from "@/lib/content/products";
import { fa } from "@/lib/format";

export const metadata: Metadata = {
  title: "پیش‌نمایش پنل مدیریت",
  description:
    "پیش‌نمایش پنل مدیریت محتوا و فروشگاه سیمان تک؛ مدیریت محصولات، قیمت‌ها، موجودی، سفارش‌ها، پروژه‌ها، مقالات و پیام‌های مشتریان.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  const initialProducts: AdminProduct[] = products.map((product, index) => ({
    id: index + 1,
    name: product.name,
    category: categoryOf(product.category).name,
    price: product.shop?.price ?? 0,
    stock: product.shop ? (product.shop.stock === "in" ? 42 : product.shop.stock === "low" ? 6 : 0) : 0,
    active: true,
  }));

  return (
    <>
      <section className="bg-ink pt-28 text-paper md:pt-36">
        <div className="wrap pb-10 md:pb-14">
          <span className="eyebrow text-paper/50">مدیریت سایت</span>
          <div className="mt-5 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h1 className="text-[clamp(1.9rem,4vw,3rem)] leading-[1.25]">
                پنل مدیریت سیمان تک
              </h1>
              <p className="mt-4 max-w-2xl text-[13px] leading-7 text-paper/60">
                مدیریت محصولات، قیمت‌گذاری، موجودی، سفارش‌ها، محتوا و درخواست‌های مشتریان — بدون
                نیاز به برنامه‌نویس. این صفحه، نقشه راه فاز بعدی پنل است.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-[10px] text-paper/60">
              {["نقش‌های کاربری", "تاریخچه تغییرات", "پشتیبان‌گیری روزانه", "دسترسی امن"].map((item) => (
                <span key={item} className="border border-paper/20 px-3 py-1.5">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="wrap py-10 md:py-14">
        <AdminDemo initialProducts={initialProducts} />

        <div className="mt-10 grid gap-px bg-line md:grid-cols-3">
          {[
            {
              title: "مدیریت محتوا",
              text: "افزودن و ویرایش محصولات، پروژه‌ها، مقالات، دسته‌بندی‌ها و تصاویر با ویرایشگر ساده.",
            },
            {
              title: "فروش و انبار",
              text: "قیمت‌گذاری، تخفیف، کنترل موجودی، ثبت سفارش و مشاهده اطلاعات مشتریان.",
            },
            {
              title: "امنیت و پشتیبان",
              text: "ورود دو مرحله‌ای، سطوح دسترسی و نسخه پشتیبان خودکار از محتوا و سفارش‌ها.",
            },
          ].map((item) => (
            <div key={item.title} className="bg-paper p-6">
              <h2 className="text-base">{item.title}</h2>
              <p className="mt-2 text-[12px] leading-6 text-graphite">{item.text}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-[11px] leading-6 text-mist">
          تعداد محصولات فعلی کاتالوگ: {fa(products.length)} — محتوای این صفحه برای موتورهای جستجو
          ایندکس نمی‌شود.
        </p>
      </section>
    </>
  );
}
