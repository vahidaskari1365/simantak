"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowIcon, ArrowUpRight } from "@/components/brand";
import { fa, faPriceToman } from "@/lib/format";

export type ShopItem = {
  slug: string;
  name: string;
  nameEn: string;
  image: string;
  unit: string;
  weight: string;
  price: number;
  stock: "in" | "low" | "pre";
  category: string;
  coverage: string;
};

type CartLine = { slug: string; qty: number };

const STORAGE_KEY = "simantak-cart-v1";
const WHATSAPP = "https://wa.me/989123456789";

const stockLabel: Record<ShopItem["stock"], string> = {
  in: "موجود در انبار",
  low: "موجودی محدود",
  pre: "پیش‌سفارش",
};

export function ShopCatalog({ items }: { items: ShopItem[] }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) setCart(parsed.filter((line) => line.qty > 0));
      }
    } catch {
      /* ignore corrupted storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart, ready]);

  const lines = useMemo(
    () =>
      cart
        .map((line) => {
          const item = items.find((product) => product.slug === line.slug);
          return item ? { ...line, item } : null;
        })
        .filter((line): line is { slug: string; qty: number; item: ShopItem } => Boolean(line)),
    [cart, items],
  );

  const total = lines.reduce((sum, line) => sum + line.item.price * line.qty, 0);
  const count = lines.reduce((sum, line) => sum + line.qty, 0);

  const add = (slug: string) => {
    setCart((current) => {
      const existing = current.find((line) => line.slug === slug);
      if (existing) {
        return current.map((line) => (line.slug === slug ? { ...line, qty: line.qty + 1 } : line));
      }
      return [...current, { slug, qty: 1 }];
    });
  };

  const decrement = (slug: string) => {
    setCart((current) =>
      current
        .map((line) => (line.slug === slug ? { ...line, qty: line.qty - 1 } : line))
        .filter((line) => line.qty > 0),
    );
  };

  const remove = (slug: string) => {
    setCart((current) => current.filter((line) => line.slug !== slug));
  };

  const orderText = encodeURIComponent(
    `سلام، سفارش از فروشگاه سیمان تک:\n${lines
      .map((line) => `• ${line.item.name} (${line.item.unit}) — ${line.qty} عدد`)
      .join("\n")}\nجمع تقریبی: ${faPriceToman(total)}`,
  );

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
          {items.map((item) => {
            const inCart = cart.find((line) => line.slug === item.slug)?.qty ?? 0;
            return (
              <article key={item.slug} className="group flex flex-col border-b border-line pb-6">
                <Link href={`/products/${item.slug}`} className="img-zoom relative block aspect-[5/4] overflow-hidden bg-paper-3">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <span
                    className={`absolute right-3 top-3 border px-2 py-1 text-[9px] backdrop-blur-sm ${
                      item.stock === "in"
                        ? "border-transparent bg-paper/90 text-graphite"
                        : item.stock === "low"
                          ? "border-amber/50 bg-amber/20 text-ink"
                          : "border-transparent bg-ink/70 text-paper"
                    }`}
                  >
                    {stockLabel[item.stock]}
                  </span>
                </Link>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <Link href={`/products/${item.slug}`} className="text-base transition-colors hover:text-red">
                      {item.name}
                    </Link>
                    <p className="mt-1 text-[10px] text-mist">{item.unit}</p>
                  </div>
                  <span className="shrink-0 text-[12px] text-graphite">{faPriceToman(item.price)}</span>
                </div>
                <p className="mt-2 text-[11px] text-mist">{item.coverage}</p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <Link href={`/products/${item.slug}`} className="link-arrow text-[11px] text-graphite">
                    مشخصات فنی
                    <ArrowUpRight />
                  </Link>
                  {inCart > 0 ? (
                    <div className="flex items-center border border-line">
                      <button
                        type="button"
                        onClick={() => decrement(item.slug)}
                        aria-label={`کاهش تعداد ${item.name}`}
                        className="h-9 w-9 text-graphite transition-colors hover:bg-paper-2"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-[12px]">{fa(inCart)}</span>
                      <button
                        type="button"
                        onClick={() => add(item.slug)}
                        aria-label={`افزایش تعداد ${item.name}`}
                        className="h-9 w-9 text-graphite transition-colors hover:bg-paper-2"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button type="button" onClick={() => add(item.slug)} className="btn btn-outline !px-4 !py-2.5 text-[11px]">
                      افزودن به سبد
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <aside className="lg:col-span-4">
        <div className="sticky top-28 border border-line bg-paper-2">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 className="text-sm">سبد خرید</h2>
            <span className="text-[11px] text-mist">{fa(count)} قلم</span>
          </div>

          {lines.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="text-[12px] leading-6 text-graphite">سبد خرید خالی است.</p>
              <p className="mt-2 text-[11px] leading-6 text-mist">
                محصول را انتخاب کنید تا برآورد هزینه را ببینید. سفارش نهایی از طریق واتساپ یا تلفن
                ثبت می‌شود.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-line px-5">
              {lines.map((line) => (
                <li key={line.slug} className="py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[12px] text-ink">{line.item.name}</p>
                      <p className="mt-1 text-[10px] text-mist">
                        {fa(line.qty)} × {faPriceToman(line.item.price)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(line.slug)}
                      className="text-[10px] text-mist transition-colors hover:text-red"
                    >
                      حذف
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="border-t border-line px-5 py-4">
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-mist">جمع تقریبی</span>
              <span className="text-ink">{faPriceToman(total)}</span>
            </div>
            <p className="mt-2 text-[10px] leading-5 text-mist">
              هزینه ارسال پس از تأیید آدرس محاسبه می‌شود. قیمت‌ها پیش‌نمایشی است.
            </p>
            <a
              href={lines.length ? `${WHATSAPP}?text=${orderText}` : undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={lines.length === 0}
              className={`btn mt-4 w-full ${
                lines.length ? "btn-primary" : "pointer-events-none border-line bg-paper-3 text-mist"
              }`}
            >
              ثبت سفارش در واتساپ
              <ArrowIcon />
            </a>
            <button
              type="button"
              disabled
              title="درگاه پرداخت در فاز بعدی راه‌اندازی می‌شود"
              className="mt-2 w-full cursor-not-allowed border border-line px-4 py-3 text-[11px] text-mist"
            >
              پرداخت آنلاین — به‌زودی
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
