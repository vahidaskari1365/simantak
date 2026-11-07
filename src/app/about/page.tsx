import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/brand";
import { Reveal } from "@/components/reveal";
import { CTASection, PageHero, SectionHead } from "@/components/ui";
import { fa } from "@/lib/format";
import { site, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "درباره سیمان تک | تولیدکننده میکروسمنت و پوشش‌های سیمانی",
  description:
    "داستان بتن دکور سیمان تک؛ از تولید آزمایشگاهی در ۱۳۹۲ تا کارخانه تخصصی میکروسمنت و اجرای بیش از ۴۸۰ پروژه در ایران. توانمندی تولید، مزیت‌ها و فلسفه برند.",
  alternates: { canonical: "/about" },
};

const timeline = [
  {
    year: "۱۳۹۲",
    title: "شروع با آزمایشگاه",
    text: "فرمولاسیون اولین پوشش سیمانی دکوراتیو در مقیاس آزمایشگاهی و اجرای نمونه‌های محدود.",
  },
  {
    year: "۱۳۹۵",
    title: "خط تولید میکروسمنت",
    text: "راه‌اندازی خط تولید تخصصی در شهرک صنعتی چهاردانگه و عرضه کیت‌های آماده اجرا.",
  },
  {
    year: "۱۳۹۸",
    title: "تیم اجرایی اختصاصی",
    text: "تشکیل تیم‌های اجرا و پشتیبانی فنی برای پروژه‌های مسکونی، تجاری و اقامتی.",
  },
  {
    year: "۱۴۰۱",
    title: "سیستم نمای بیرونی",
    text: "توسعه فرمول مقاوم به UV و اجرای نماهای مسکونی و تجاری در تهران و شهرستان.",
  },
  {
    year: "۱۴۰۴",
    title: "پلتفرم دیجیتال برند",
    text: "راه‌اندازی ویترین دیجیتال و زیرساخت فروشگاه آنلاین محصولات و درخواست خدمات.",
  },
];

const capabilities = [
  { value: "۹۰", unit: "تن", label: "توان تولید ماهانه", text: "خط تولید مجزا برای پوشش‌های پایه سیمانی و سیستم‌های تکمیلی." },
  { value: "۳۸", unit: "رنگ", label: "پالت تولیدی", text: "رنگ‌بندی استاندارد و سفارشی با کنترل نمونه در آزمایشگاه." },
  { value: "۴۸۰", unit: "+", label: "پروژه اجراشده", text: "در فضاهای مسکونی، تجاری، اداری و اقامتی؛ تهران و شهرستان." },
  { value: "۱۸", unit: "استان", label: "پوشش ارسال", text: "ارسال کیت‌ها با بسته‌بندی مقاوم و راهنمای اجرای اختصاصی." },
];

const advantages = [
  {
    title: "تولید و اجرا در یک مجموعه",
    text: "مسئولیت فرمولاسیون، تولید و اجرا روی یک تیم است؛ بنابراین در صورت بروز مسئله، پاسخ‌گویی روشن و سریع است.",
  },
  {
    title: "فرمولاسیون بومی ایران",
    text: "فرمول‌ها با در نظر گرفتن اقلیم، بسترهای رایج و شرایط کارگاهی ایران تنظیم شده‌اند.",
  },
  {
    title: "کنترل کیفیت مستند",
    text: "هر بچ تولید آزمون چسبندگی و مقاومت دارد و مستندات اجرای پروژه آرشیو می‌شود.",
  },
  {
    title: "تیم اجرایی آموزش‌دیده",
    text: "مجریان سیمان تک دوره‌های عملی و ارزیابی کیفیت را می‌گذرانند و با نظارت فنی ثابت کار می‌کنند.",
  },
  {
    title: "پشتیبانی فنی واقعی",
    text: "برای مجریان و مشتریان، پاسخ فنی در ساعات کاری و راهنمای نگهداری پس از تحویل ارائه می‌شود.",
  },
  {
    title: "آماده توسعه فروشگاه",
    text: "کاتالوگ، موجودی، قیمت و درخواست‌ها بر پایه ساختار داده‌ای منظم طراحی شده تا فروشگاه آنلاین به‌سادگی افزوده شود.",
  },
];

const values = [
  { title: "صراحت", text: "اگر سیستم سیمانی برای کاربری شما مناسب نباشد، همان را می‌گوییم." },
  { title: "دقت", text: "جزئیات لبه، گوشه و اتصال متریال‌ها، بخش اصلی کیفیت است." },
  { title: "دوام", text: "ما به دنبال سطحی هستیم که سال‌ها بماند، نه فقط عکس زیبا." },
  { title: "آموزش", text: "دانش فنی را پنهان نمی‌کنیم؛ مجریان آموزش‌دیده کیفیت را بالا می‌برند." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="درباره سیمان تک"
        title="ماده‌ای ساده، با وسواسِ زیاد."
        intro="بتن دکور سیمان تک یک مجموعه تخصصی تولید و اجرای پوشش‌های سیمانی است. از سال ۱۳۹۲ روی یک پرسش کار می‌کنیم: چگونه می‌توان سطحی ساخت که هم زیبا باشد، هم سال‌ها دوام بیاورد و هم قابل ترمیم بماند؟"
        image="/images/craft.jpg"
        meta={[
          { label: "تأسیس", value: site.established },
          { label: "کارخانه و شوروم", value: site.addressShort },
          { label: "حوزه فعالیت", value: "تولید + اجرا + آموزش" },
          { label: "پروژه‌ها", value: "۴۸۰+ پروژه" },
        ]}
      />

      <section className="wrap py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-7">
            <span className="eyebrow">هویت و مسیر ما</span>
            <h2 className="mt-6 text-[clamp(1.6rem,3.2vw,2.5rem)] leading-[1.4]">
              ما یک برند متریال هستیم؛
              <br />
              اما کارمان با متریال تمام نمی‌شود.
            </h2>
            <div className="mt-6 space-y-5 text-[14px] leading-8 text-graphite">
              <p>
                سیمان تک از یک کارگاه کوچک و علاقه به بتن دکوراتیو شروع شد. در سال‌های اول، بیشتر
                وقت ما صرف آزمون و خطا در زیرسازی شد؛ چون فهمیدیم مشکل اصلی پروژه‌های ایرانی، خودِ
                محصول نیست، بلکه بستر، رطوبت و شرایط کارگاهی است.
              </p>
              <p>
                امروز در کارخانه چهاردانگه، کیت‌های میکروسمنت، میکروتاپینگ، پلاستر ونیزی، پوشش
                مینرال و سیلرهای محافظ تولید می‌شود. تیم اجرایی ما در کنار مشتریان است و تیم فنی،
                مجریان سراسر کشور را آموزش می‌دهد.
              </p>
              <p>
                باور ما این است که سطح سیمانی باید هم زیبایی معماری داشته باشد و هم پاسخ فنی
                روشن. به همین دلیل در هر پروژه، پیش از پیشنهاد قیمت، درباره محدودیت‌ها صحبت
                می‌کنیم.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/projects" className="btn btn-ink">
                نمونه‌کارها
                <ArrowIcon />
              </Link>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                گفت‌وگو با تیم
              </a>
            </div>
          </Reveal>

          <Reveal className="md:col-span-5" delay={100}>
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-paper-3">
              <Image
                src="/images/samples.jpg"
                alt="نمونه متریال‌ها و پالت رنگی سیمان تک"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="mt-4 border-r-2 border-amber pr-5">
              <p className="text-[13px] leading-7 text-ink">
                «هر سطحی که تحویل می‌دهیم، امضای ما را دارد. تا زمانی که قابل دفاع نباشد، تحویل
                نمی‌شود.»
              </p>
              <p className="mt-2 text-[11px] text-mist">تیم فنی سیمان تک</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper-2 py-16 md:py-24">
        <div className="wrap">
          <SectionHead
            label="تاریخچه"
            title="مسیر رشد، مرحله‌به‌مرحله."
            intro="از آزمایشگاه تا پلتفرم دیجیتال؛ هر مرحله بر اساس تجربه پروژه‌های واقعی شکل گرفته است."
          />
          <ol className="mt-12 border-t border-line">
            {timeline.map((item, index) => (
              <Reveal as="li" key={item.year} delay={index * 60}>
                <div className="grid gap-3 border-b border-line py-7 md:grid-cols-12 md:items-baseline md:gap-6">
                  <span className="font-mono text-[12px] tracking-[0.08em] text-red md:col-span-2">
                    {item.year}
                  </span>
                  <h3 className="text-lg md:col-span-4">{item.title}</h3>
                  <p className="text-[13px] leading-7 text-graphite md:col-span-6">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap py-16 md:py-24">
        <SectionHead
          label="توانمندی تولید"
          title="عددی که پشت هر سطح ایستاده است."
          intro="تولید متمرکز، کنترل کیفیت آزمایشگاهی و بسته‌بندی مناسب حمل، سه پایه اصلی توانمندی ما هستند."
        />
        <div className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((item) => (
            <div key={item.label} className="bg-paper p-7">
              <p className="text-[clamp(2rem,4vw,2.8rem)] leading-none">
                {item.value}
                <span className="ms-1 text-base text-amber">{item.unit}</span>
              </p>
              <p className="mt-3 text-[13px] text-ink">{item.label}</p>
              <p className="mt-2 text-[12px] leading-6 text-graphite">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="relative aspect-[16/11] overflow-hidden bg-paper-3">
            <Image
              src="/images/product-wall.jpg"
              alt="نمونه بافت میکروسمنت تولید سیمان تک"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center border border-line p-7 md:p-9">
            <h3 className="text-xl">آزمایشگاه و کنترل کیفیت</h3>
            <p className="mt-4 text-[13px] leading-7 text-graphite">
              هر بچ تولید از نظر زمان کارپذیری، چسبندگی به بستر، مقاومت فشاری و یکنواختی رنگ
              بررسی می‌شود. نمونه‌های شاهد تا پایان ماندگاری محصول نگه‌داری می‌شوند تا در صورت
              گزارش مشکل، بررسی دقیق ممکن باشد.
            </p>
            <ul className="mt-5 divide-y divide-line border-t border-line text-[12px] text-graphite">
              <li className="flex justify-between gap-4 py-3">
                <span>آزمون چسبندگی</span>
                <span className="text-ink">روی بستر سیمانی و کاشی</span>
              </li>
              <li className="flex justify-between gap-4 py-3">
                <span>کنترل رنگ</span>
                <span className="text-ink">مقایسه با نمونه شاهد</span>
              </li>
              <li className="flex justify-between gap-4 py-3">
                <span>مستندسازی پروژه</span>
                <span className="text-ink">آرشیو تصویری مراحل اجرا</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-paper md:py-24">
        <div className="wrap">
          <SectionHead
            label="مزیت رقابتی"
            tone="dark"
            title="چرا سیمان تک؟"
            intro="چیزی که ما را متفاوت می‌کند، ترکیب تولید، اجرا و صراحت فنی است — نه بزرگ‌ترین بودن."
          />
          <div className="mt-10 grid gap-px bg-paper/12 md:grid-cols-2 lg:grid-cols-3">
            {advantages.map((item, index) => (
              <div key={item.title} className="bg-ink p-6 md:p-7">
                <span className="font-mono text-[10px] text-amber">
                  {fa(String(index + 1).padStart(2, "0"))}
                </span>
                <h3 className="mt-4 text-base">{item.title}</h3>
                <p className="mt-2 text-[12px] leading-6 text-paper/55">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <span className="eyebrow">فلسفه برند</span>
            <h2 className="mt-6 text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.4]">
              چهار اصل،
              <br />
              بدون استثنا.
            </h2>
            <p className="mt-5 text-[13px] leading-7 text-graphite">
              این اصول در انتخاب متریال، قیمت‌گذاری و پذیرش پروژه راهنمای ما هستند.
            </p>
          </div>
          <div className="md:col-span-8">
            <div className="grid gap-px bg-line sm:grid-cols-2">
              {values.map((value, index) => (
                <div key={value.title} className="bg-paper p-7">
                  <span className="font-mono text-[10px] text-red">{fa(String(index + 1).padStart(2, "0"))}</span>
                  <h3 className="mt-4 text-lg">{value.title}</h3>
                  <p className="mt-2 text-[12px] leading-6 text-graphite">{value.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="اگر با ارزش‌های ما هم‌راستا هستید، پروژه را شروع کنیم."
        text="بازدید فنی، انتخاب متریال و برآورد هزینه — همه در یک مسیر شفاف."
        secondary={{ href: "/contact", label: "اطلاعات تماس" }}
      />
    </>
  );
}
