"use client";

import { useMemo, useState } from "react";
import { fa, faPriceToman } from "@/lib/format";

export type AdminProduct = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  active: boolean;
};

type Order = {
  id: string;
  customer: string;
  city: string;
  items: string;
  total: number;
  status: "جدید" | "در حال آماده‌سازی" | "ارسال‌شده" | "تحویل‌شده";
};

const initialOrders: Order[] = [
  { id: "ST-1404-018", customer: "سارا محمدی", city: "تهران", items: "میکروسمنت کلاسیک × ۴", total: 19400000, status: "جدید" },
  { id: "ST-1404-017", customer: "دفتر معماری آوند", city: "اصفهان", items: "سیلر محافظ × ۲، پوشش مینرال × ۳", total: 15440000, status: "در حال آماده‌سازی" },
  { id: "ST-1404-016", customer: "مهدی رستمی", city: "شیراز", items: "میکروسمنت ضدآب × ۲", total: 14700000, status: "ارسال‌شده" },
  { id: "ST-1404-015", customer: "هتل بوتیک کاشان", city: "کاشان", items: "میکروسمنت ضدآب × ۸", total: 58800000, status: "تحویل‌شده" },
];

const messages = [
  { id: 1, name: "نگار احمدی", topic: "استعلام قیمت", city: "تهران", text: "برای دیوار نشیمن ۳۲ متری، رنگ شنی روشن و زمان اجرا در مرداد را می‌خواستم.", unread: true },
  { id: 2, name: "استودیو فرم", topic: "همکاری و نمایندگی", city: "تبریز", text: "مایل به همکاری در اجرای پروژه‌های تجاری هستیم. شرایط نمایندگی را ارسال کنید.", unread: true },
  { id: 3, name: "علی کریمی", topic: "مشاوره محصول", city: "کرج", text: "تفاوت میکروسمنت کلاسیک و نما برای تراس سرپوشیده چیست؟", unread: false },
];

const contentRows = [
  { id: 1, title: "ویلای لواسان", type: "پروژه", status: "منتشرشده" },
  { id: 2, title: "میکروسمنت کلاسیک", type: "محصول", status: "منتشرشده" },
  { id: 3, title: "مراحل اجرای میکروسمنت", type: "مقاله", status: "منتشرشده" },
  { id: 4, title: "بازسازی کف ساختمان اداری", type: "پروژه", status: "پیش‌نویس" },
  { id: 5, title: "پوشش مینرال نما", type: "محصول", status: "پیش‌نویس" },
];

const tabs = ["محصولات", "سفارش‌ها", "محتوا", "پیام‌ها"] as const;
type Tab = (typeof tabs)[number];

export function AdminDemo({ initialProducts }: { initialProducts: AdminProduct[] }) {
  const [tab, setTab] = useState<Tab>("محصولات");
  const [products, setProducts] = useState<AdminProduct[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [readMessages, setReadMessages] = useState<number[]>([]);
  const [form, setForm] = useState({ name: "", price: "", stock: "" });
  const [notice, setNotice] = useState<string | null>(null);

  const stats = useMemo(() => {
    const revenue = orders.reduce((sum, order) => sum + order.total, 0);
    return [
      { label: "فروش ثبت‌شده (نمونه)", value: faPriceToman(revenue) },
      { label: "محصول فعال", value: `${fa(products.filter((product) => product.active).length)} از ${fa(products.length)}` },
      { label: "سفارش باز", value: fa(orders.filter((order) => order.status !== "تحویل‌شده").length) },
      { label: "پیام خوانده‌نشده", value: fa(messages.length - readMessages.length) },
    ];
  }, [orders, products, readMessages]);

  const addProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim() || !form.price) {
      setNotice("نام و قیمت محصول الزامی است.");
      return;
    }
    setProducts((current) => [
      {
        id: Math.max(0, ...current.map((product) => product.id)) + 1,
        name: form.name.trim(),
        category: "میکروسمنت",
        price: Number(form.price),
        stock: Number(form.stock) || 0,
        active: true,
      },
      ...current,
    ]);
    setForm({ name: "", price: "", stock: "" });
    setNotice("محصول جدید به فهرست پیش‌نمایش اضافه شد.");
  };

  return (
    <div className="border border-line bg-paper">
      <div className="flex items-start justify-between gap-4 border-b border-amber/40 bg-amber/15 px-5 py-3">
        <p className="text-[11px] leading-6 text-graphite">
          <span className="me-2 border border-amber/60 px-2 py-0.5 text-[10px] text-ink">دمو</span>
          این پنل نمونه رابط کاربری است. تغییرات در حافظه مرورگر نگه‌داری می‌شود؛ اتصال به پایگاه
          داده در فاز بعدی فعال خواهد شد.
        </p>
      </div>

      <div className="grid gap-px border-b border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-paper px-5 py-5">
            <p className="text-[10px] tracking-[0.06em] text-mist">{stat.label}</p>
            <p className="mt-2 text-lg text-ink">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="no-scrollbar flex gap-1 overflow-x-auto border-b border-line px-4 pt-3">
        {tabs.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={`shrink-0 border-b-2 px-4 py-3 text-[12px] transition-colors ${
              tab === item
                ? "border-red text-ink"
                : "border-transparent text-mist hover:text-ink"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="p-5 md:p-6">
        {notice ? (
          <p className="mb-4 border-r-2 border-amber bg-paper-2 px-4 py-2 text-[11px] text-graphite">
            {notice}
          </p>
        ) : null}

        {tab === "محصولات" ? (
          <div className="space-y-6">
            <form onSubmit={addProduct} className="grid gap-3 border border-line p-4 md:grid-cols-[1.6fr_1fr_1fr_auto]">
              <input
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                placeholder="نام محصول جدید"
                className="field !border !border-line !px-3 !py-2.5 text-[12px]"
                aria-label="نام محصول جدید"
              />
              <input
                value={form.price}
                onChange={(event) => setForm({ ...form, price: event.target.value.replace(/\D/g, "") })}
                inputMode="numeric"
                placeholder="قیمت (تومان)"
                className="field !border !border-line !px-3 !py-2.5 text-[12px]"
                aria-label="قیمت محصول"
              />
              <input
                value={form.stock}
                onChange={(event) => setForm({ ...form, stock: event.target.value.replace(/\D/g, "") })}
                inputMode="numeric"
                placeholder="موجودی"
                className="field !border !border-line !px-3 !py-2.5 text-[12px]"
                aria-label="موجودی محصول"
              />
              <button type="submit" className="btn btn-ink !py-2.5 text-[11px]">
                افزودن محصول
              </button>
            </form>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[36rem] border-collapse text-right">
                <thead>
                  <tr className="border-b border-line text-[10px] tracking-[0.06em] text-mist">
                    <th className="py-2 font-normal">محصول</th>
                    <th className="py-2 font-normal">دسته</th>
                    <th className="py-2 font-normal">قیمت</th>
                    <th className="py-2 font-normal">موجودی</th>
                    <th className="py-2 font-normal">وضعیت</th>
                    <th className="py-2 font-normal">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-line text-[12px]">
                      <td className="py-3 text-ink">{product.name}</td>
                      <td className="py-3 text-graphite">{product.category}</td>
                      <td className="py-3 text-graphite">{faPriceToman(product.price)}</td>
                      <td className="py-3 text-graphite">{fa(product.stock)}</td>
                      <td className="py-3">
                        <button
                          type="button"
                          onClick={() =>
                            setProducts((current) =>
                              current.map((item) =>
                                item.id === product.id ? { ...item, active: !item.active } : item,
                              ),
                            )
                          }
                          className={`border px-2 py-1 text-[10px] ${
                            product.active
                              ? "border-transparent bg-ink text-paper"
                              : "border-line text-mist"
                          }`}
                        >
                          {product.active ? "فعال" : "غیرفعال"}
                        </button>
                      </td>
                      <td className="py-3">
                        <button
                          type="button"
                          onClick={() =>
                            setProducts((current) => current.filter((item) => item.id !== product.id))
                          }
                          className="text-[10px] text-red transition-opacity hover:opacity-70"
                        >
                          حذف
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        {tab === "سفارش‌ها" ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[46rem] border-collapse text-right">
              <thead>
                <tr className="border-b border-line text-[10px] tracking-[0.06em] text-mist">
                  <th className="py-2 font-normal">شماره</th>
                  <th className="py-2 font-normal">مشتری</th>
                  <th className="py-2 font-normal">شهر</th>
                  <th className="py-2 font-normal">اقلام</th>
                  <th className="py-2 font-normal">مبلغ</th>
                  <th className="py-2 font-normal">وضعیت</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-line text-[12px]">
                    <td className="py-3 font-mono text-[11px] text-graphite">{order.id}</td>
                    <td className="py-3 text-ink">{order.customer}</td>
                    <td className="py-3 text-graphite">{order.city}</td>
                    <td className="py-3 text-graphite">{order.items}</td>
                    <td className="py-3 text-graphite">{faPriceToman(order.total)}</td>
                    <td className="py-3">
                      <select
                        value={order.status}
                        onChange={(event) =>
                          setOrders((current) =>
                            current.map((item) =>
                              item.id === order.id
                                ? { ...item, status: event.target.value as Order["status"] }
                                : item,
                            ),
                          )
                        }
                        className="border border-line bg-transparent px-2 py-1 text-[10px] text-graphite"
                        aria-label={`وضعیت سفارش ${order.id}`}
                      >
                        {["جدید", "در حال آماده‌سازی", "ارسال‌شده", "تحویل‌شده"].map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-[11px] text-mist">
              ثبت سفارش، پرداخت و کسر خودکار موجودی در نسخه متصل به پایگاه داده فعال می‌شود.
            </p>
          </div>
        ) : null}

        {tab === "محتوا" ? (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[32rem] border-collapse text-right">
                <thead>
                  <tr className="border-b border-line text-[10px] tracking-[0.06em] text-mist">
                    <th className="py-2 font-normal">عنوان</th>
                    <th className="py-2 font-normal">نوع</th>
                    <th className="py-2 font-normal">وضعیت</th>
                  </tr>
                </thead>
                <tbody>
                  {contentRows.map((row) => (
                    <tr key={row.id} className="border-b border-line text-[12px]">
                      <td className="py-3 text-ink">{row.title}</td>
                      <td className="py-3 text-graphite">{row.type}</td>
                      <td className="py-3">
                        <span
                          className={`border px-2 py-1 text-[10px] ${
                            row.status === "منتشرشده" ? "border-line text-graphite" : "border-amber/50 bg-amber/10 text-ink"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {["افزودن محصول", "افزودن پروژه", "افزودن مقاله"].map((label) => (
                <button key={label} type="button" className="border border-dashed border-line px-4 py-5 text-[11px] text-mist transition-colors hover:border-ink hover:text-ink">
                  + {label}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {tab === "پیام‌ها" ? (
          <ul className="divide-y divide-line">
            {messages.map((message) => {
              const isRead = readMessages.includes(message.id);
              return (
                <li key={message.id} className="flex flex-col gap-3 py-4 md:flex-row md:items-start md:justify-between">
                  <div className="max-w-xl">
                    <div className="flex flex-wrap items-center gap-2 text-[12px]">
                      <span className="text-ink">{message.name}</span>
                      <span className="text-[10px] text-mist">
                        {message.city} · {message.topic}
                      </span>
                      {!isRead ? <span className="h-1.5 w-1.5 rounded-full bg-red" /> : null}
                    </div>
                    <p className="mt-2 text-[12px] leading-6 text-graphite">{message.text}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setReadMessages((current) =>
                        isRead ? current.filter((id) => id !== message.id) : [...current, message.id],
                      )
                    }
                    className="shrink-0 border border-line px-3 py-2 text-[10px] text-graphite transition-colors hover:border-ink hover:text-ink"
                  >
                    {isRead ? "علامت‌گذاری خوانده‌نشده" : "خوانده شد"}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
