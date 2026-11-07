"use client";

import { useState } from "react";
import { ArrowIcon } from "@/components/brand";
import { whatsappHref } from "@/lib/site";

type FormState = {
  name: string;
  phone: string;
  email: string;
  city: string;
  space: string;
  subject: string;
  area: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  city: "",
  space: "مسکونی",
  subject: "استعلام قیمت",
  area: "",
  message: "",
};

const spaces = ["مسکونی", "تجاری", "اداری", "اقامتی", "بازسازی", "سایر"];
const subjects = ["استعلام قیمت", "مشاوره محصول", "اجرای پروژه", "خرید متریال", "همکاری و نمایندگی"];

function normalizeDigits(value: string) {
  return value
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[^\d+]/g, "");
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 3) next.name = "نام و نام خانوادگی را کامل وارد کنید.";
    const phone = normalizeDigits(form.phone);
    if (phone.replace(/\D/g, "").length < 10) next.phone = "شماره تماس معتبر وارد کنید.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "ایمیل معتبر نیست.";
    if (form.message.trim().length < 10) next.message = "کمی بیشتر درباره پروژه توضیح دهید.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const orderText = encodeURIComponent(
    `سلام، درخواست مشاوره از سایت سیمان تک:\nنام: ${form.name}\nتلفن: ${form.phone}\nشهر: ${
      form.city || "—"
    }\nنوع فضا: ${form.space}\nموضوع: ${form.subject}\nمتراژ: ${form.area || "—"}\nتوضیحات: ${
      form.message
    }`,
  );
  const waLink = `${whatsappHref.split("?")[0]}?text=${orderText}`;

  if (submitted) {
    return (
      <div className="border border-line bg-paper-2 p-7 md:p-9">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-paper">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 10.5L8 14.5L16 6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
        <h3 className="mt-5 text-xl">درخواست شما آماده ارسال است.</h3>
        <p className="mt-3 max-w-lg text-[13px] leading-7 text-graphite">
          این نسخه از سایت به سرور متصل نیست؛ بنابراین اطلاعات در مرورگر شما باقی می‌ماند. برای
          دریافت پاسخ سریع، خلاصه درخواست را در واتساپ ارسال کنید یا با دفتر تماس بگیرید.
        </p>
        <dl className="mt-6 grid gap-x-6 gap-y-3 border-t border-line pt-5 text-[12px] sm:grid-cols-2">
          <div className="flex justify-between gap-3">
            <dt className="text-mist">نام</dt>
            <dd className="text-ink">{form.name}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-mist">تلفن</dt>
            <dd dir="ltr" className="text-ink">{form.phone}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-mist">نوع فضا</dt>
            <dd className="text-ink">{form.space}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-mist">موضوع</dt>
            <dd className="text-ink">{form.subject}</dd>
          </div>
        </dl>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            ارسال در واتساپ
            <ArrowIcon />
          </a>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => {
              setSubmitted(false);
              setForm(initialState);
            }}
          >
            درخواست جدید
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="border border-line bg-paper p-6 md:p-8">
      <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
        <h2 className="text-lg">فرم مشاوره و استعلام قیمت</h2>
        <span className="text-[10px] tracking-[0.1em] text-mist">پاسخ کمتر از یک روز کاری</span>
      </div>

      <div className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="field-label">
            نام و نام خانوادگی *
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="مثلاً سارا محمدی"
            className="field"
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name ? <p className="mt-1 text-[10px] text-red">{errors.name}</p> : null}
        </div>

        <div>
          <label htmlFor="phone" className="field-label">
            شماره تماس *
          </label>
          <input
            id="phone"
            name="phone"
            inputMode="tel"
            dir="ltr"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            placeholder="09xxxxxxxxx"
            className="field text-left"
            aria-invalid={Boolean(errors.phone)}
          />
          {errors.phone ? <p className="mt-1 text-[10px] text-red">{errors.phone}</p> : null}
        </div>

        <div>
          <label htmlFor="email" className="field-label">
            ایمیل (اختیاری)
          </label>
          <input
            id="email"
            name="email"
            type="email"
            dir="ltr"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder="you@example.com"
            className="field text-left"
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email ? <p className="mt-1 text-[10px] text-red">{errors.email}</p> : null}
        </div>

        <div>
          <label htmlFor="city" className="field-label">
            شهر پروژه
          </label>
          <input
            id="city"
            name="city"
            value={form.city}
            onChange={(event) => update("city", event.target.value)}
            placeholder="مثلاً تهران"
            className="field"
          />
        </div>

        <div>
          <label htmlFor="space" className="field-label">
            نوع فضا
          </label>
          <select
            id="space"
            name="space"
            value={form.space}
            onChange={(event) => update("space", event.target.value)}
            className="field appearance-none"
          >
            {spaces.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="subject" className="field-label">
            موضوع درخواست
          </label>
          <select
            id="subject"
            name="subject"
            value={form.subject}
            onChange={(event) => update("subject", event.target.value)}
            className="field appearance-none"
          >
            {subjects.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="area" className="field-label">
            متراژ تقریبی (متر مربع)
          </label>
          <input
            id="area"
            name="area"
            inputMode="numeric"
            value={form.area}
            onChange={(event) => update("area", event.target.value)}
            placeholder="مثلاً ۱۲۰"
            className="field"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="field-label">
            درباره پروژه بنویسید *
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={form.message}
            onChange={(event) => update("message", event.target.value)}
            placeholder="نوع سطح (کف، دیوار، نما…)، وضعیت فعلی بستر، بازه زمانی و هر نکته‌ای که مهم می‌دانید."
            className="field resize-none"
            aria-invalid={Boolean(errors.message)}
          />
          {errors.message ? <p className="mt-1 text-[10px] text-red">{errors.message}</p> : null}
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-[10px] leading-5 text-mist">
          اطلاعات شما فقط برای پاسخ به همین درخواست استفاده می‌شود و در اختیار شخص ثالث قرار
          نمی‌گیرد.
        </p>
        <button type="submit" className="btn btn-primary shrink-0">
          ثبت درخواست
          <ArrowIcon />
        </button>
      </div>
    </form>
  );
}
