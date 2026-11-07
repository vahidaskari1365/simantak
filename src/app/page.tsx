import Image from "next/image";
import Link from "next/link";
import {
  ArrowIcon,
  ArrowUpRight,
} from "@/components/brand";
import { ArticleCard, ProductCard, ProjectCard, ServiceRow } from "@/components/cards";
import { FaqList } from "@/components/faq-list";
import { Reveal } from "@/components/reveal";
import { CTASection, SectionHead, Tag } from "@/components/ui";
import { articles } from "@/lib/content/articles";
import { faqs } from "@/lib/content/faqs";
import { productCategories, products, productsByCategory } from "@/lib/content/products";
import { projects } from "@/lib/content/projects";
import { services } from "@/lib/content/services";
import { fa } from "@/lib/format";
import { site, trustPoints } from "@/lib/site";

const featured = ["microcement-classic", "microcement-exterior", "microcement-wet"]
  .map((slug) => products.find((product) => product.slug === slug))
  .filter((product): product is NonNullable<typeof product> => Boolean(product));

const selectedProjects = projects.filter((project) => project.featured).slice(0, 4);

const process = [
  {
    step: "۰۱",
    title: "مشاوره و انتخاب متریال",
    text: "بررسی کاربری، نور، اقلیم و پالت پروژه؛ پیشنهاد سیستم مناسب و ارسال نمونه رنگ.",
  },
  {
    step: "۰۲",
    title: "بازدید فنی و برآورد",
    text: "کنترل بستر، رطوبت و تراز؛ ارائه پیش‌فاکتور شفاف با زمان‌بندی اجرا.",
  },
  {
    step: "۰۳",
    title: "اجرای مرحله‌به‌مرحله",
    text: "زیرسازی، لایه‌های سیمانی، رنگ و سیلر؛ با کنترل کیفیت در هر مرحله و مستندسازی تصویری.",
  },
  {
    step: "۰۴",
    title: "تحویل و پشتیبانی",
    text: "تحویل پس از خشک شدن کامل، ارائه راهنمای نگهداری و ضمانت ۱۰ ساله اجرا.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[100svh] overflow-hidden bg-ink text-paper">
        <Image
          src="/images/hero.jpg"
          alt="فضای داخلی مینیمال با دیوار و کف میکروسمنت سیمان تک"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-ink/95 via-ink/55 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/45" />
        <div className="grain absolute inset-0 opacity-40" />

        <div className="wrap relative flex min-h-[100svh] flex-col justify-end pb-8 pt-32 md:pb-12">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-9 lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3">
                <Tag tone="dark">از {site.established}</Tag>
                <span className="text-[11px] tracking-[0.14em] text-paper/55">
                  تولیدکننده و مجری پوشش‌های سیمانی
                </span>
              </div>
              <h1 className="mt-7 text-[clamp(2.4rem,6.4vw,5.2rem)] font-normal leading-[1.16] tracking-tight">
                سطحی که فضا را
                <br />
                <span className="text-amber-soft">یکدست</span> می‌کند.
              </h1>
              <p className="mt-7 max-w-xl text-sm leading-8 text-paper/70 md:text-[15px] md:leading-9">
                میکروسمنت، پوشش‌های دکوراتیو و پوشش‌های تخصصی سیمانی — از فرمولاسیون در کارخانه
                سیمان تک تا اجرای بی‌درز در کف، دیوار، نما و فضاهای مرطوب.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/products" className="btn btn-primary">
                  مشاهده محصولات
                  <ArrowIcon />
                </Link>
                <Link href="/projects" className="btn btn-light">
                  نمونه‌کارها
                </Link>
              </div>
            </div>

            <div className="md:col-span-3 lg:col-span-5">
              <div className="border border-paper/20 bg-ink/25 p-5 backdrop-blur-md md:ms-auto md:max-w-[19rem]">
                <span className="eyebrow text-paper/50">پروژه شاخص</span>
                <p className="mt-4 text-base leading-7">{selectedProjects[0]?.title}</p>
                <p className="mt-1 text-[11px] text-paper/50">
                  {selectedProjects[0]?.location} — {selectedProjects[0]?.area}
                </p>
                <Link
                  href={`/projects/${selectedProjects[0]?.slug}`}
                  className="link-arrow mt-4 text-amber"
                >
                  دیدن جزئیات
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-y-6 border-t border-paper/15 pt-7 md:grid-cols-4">
            {trustPoints.map((point, index) => (
              <div key={point} className="flex items-start gap-3 md:gap-4">
                <span className="font-mono text-[10px] text-amber/80">{fa(String(index + 1).padStart(2, "0"))}</span>
                <span className="text-[11px] leading-5 text-paper/65 md:text-[12px]">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="wrap py-20 md:py-28">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-7">
            <span className="eyebrow">فلسفه برند</span>
            <p className="mt-8 text-[clamp(1.35rem,2.7vw,2.15rem)] leading-[1.75] tracking-tight">
              ما در سیمان تک، سطح را بخشی از معماری می‌دانیم؛ نه لایه‌ای که روی آن تمام می‌شود.
              هر پروژه با شناخت بستر، نور و کاربری آغاز می‌شود و با یک سطح پیوسته، آرام و قابل
              اعتماد پایان می‌یابد.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href="/about" className="link-arrow text-ink">
                داستان سیمان تک
                <ArrowIcon />
              </Link>
              <a
                href={`tel:${site.phoneHref}`}
                className="link-arrow text-graphite"
                dir="ltr"
              >
                {site.phoneLabel}
              </a>
            </div>
          </Reveal>

          <Reveal className="md:col-span-5" delay={120}>
            <figure className="group">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-paper-3">
                <Image
                  src="/images/craft.jpg"
                  alt="اجرای دستی میکروسمنت با ماله استیل در کارگاه سیمان تک"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-3 flex items-start justify-between gap-4 text-[11px] text-mist">
                <span>اجرای دستی، لایه‌به‌لایه، با کنترل کیفیت در هر مرحله.</span>
                <span className="font-mono tracking-[0.12em]">S/T — 01</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-px border-t border-line bg-line md:mt-24 md:grid-cols-4">
          {site.stats.map((stat) => (
            <div key={stat.label} className="bg-paper px-1 py-7 md:px-6 md:py-9">
              <p className="text-[clamp(1.9rem,4vw,3rem)] font-normal leading-none">
                {stat.value}
                <span className="text-amber">{stat.suffix}</span>
              </p>
              <p className="mt-3 text-[11px] tracking-[0.04em] text-mist md:text-[12px]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="bg-paper-2 py-20 md:py-28">
        <div className="wrap">
          <SectionHead
            label="محصولات و سیستم‌ها"
            title={
              <>
                سه خانواده متریال،
                <br className="hidden md:block" /> یک زبان بصری مشترک.
              </>
            }
            intro="از میکروسمنت پایه برای کف و دیوار تا سیستم‌های نما و سیلرهای محافظ؛ همه محصولات در کارخانه سیمان تک تولید و پیش از عرضه کنترل کیفیت می‌شوند."
            action={{ href: "/products", label: "همه محصولات" }}
          />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {productCategories.map((category, index) => {
              const first = productsByCategory(category.id)[0];
              const count = productsByCategory(category.id).length;
              return (
                <Reveal key={category.id} delay={index * 90}>
                  <Link
                    href={`/products?category=${category.id}`}
                    className="group relative block overflow-hidden bg-ink text-paper"
                  >
                    <div className="relative aspect-[4/3] w-full opacity-90 transition-opacity duration-500 group-hover:opacity-100">
                      <Image
                        src={first.image}
                        alt={category.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <span className="font-mono text-[10px] tracking-[0.16em] text-paper/50">
                            {category.nameEn}
                          </span>
                          <h3 className="mt-2 text-xl">{category.name}</h3>
                        </div>
                        <span className="flex h-9 w-9 items-center justify-center border border-paper/30 transition-colors group-hover:border-amber group-hover:bg-amber group-hover:text-ink">
                          <ArrowUpRight />
                        </span>
                      </div>
                      <p className="mt-3 line-clamp-2 text-[12px] leading-6 text-paper/60">
                        {category.description}
                      </p>
                      <p className="mt-3 text-[10px] tracking-[0.1em] text-amber/90">
                        {fa(count)} محصول
                      </p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-14 grid gap-8 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product, index) => (
              <Reveal key={product.slug} delay={index * 80}>
                <ProductCard product={product} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="wrap py-20 md:py-28">
        <SectionHead
          label="خدمات اجرا"
          title={
            <>
              اجرای تخصصی،
              <br className="hidden md:block" /> در هر سطحی از پروژه.
            </>
          }
          intro="تیم‌های اجرایی سیمان تک در کف، دیوار، نما، سرویس بهداشتی، آشپزخانه و فضاهای دکوراتیو فعال‌اند؛ از یک واحد مسکونی تا پروژه هتلی چندواحدی."
          action={{ href: "/services", label: "جزئیات خدمات" }}
        />
        <div className="mt-12">
          {services.map((service, index) => (
            <ServiceRow key={service.slug} service={service} index={index} />
          ))}
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-5 border border-line bg-paper-2 p-6 md:flex-row md:items-center md:p-8">
          <div>
            <h3 className="text-base md:text-lg">پروژه شما در شهر دیگری است؟</h3>
            <p className="mt-2 text-[12px] leading-6 text-graphite md:text-[13px]">
              اعزام تیم اجرایی به سراسر ایران، یا آموزش و نظارت بر مجری محلی — هر دو ممکن است.
            </p>
          </div>
          <Link href="/contact" className="btn btn-ink shrink-0">
            بررسی شرایط پروژه
            <ArrowIcon />
          </Link>
        </div>
      </section>

      {/* Projects */}
      <section className="bg-ink py-20 text-paper md:py-28">
        <div className="wrap">
          <SectionHead
            label="پروژه‌های اجراشده"
            tone="dark"
            title={
              <>
                نمونه‌کارها، بهترین
                <br className="hidden md:block" /> معرف کیفیت ما هستند.
              </>
            }
            intro="پروژه‌هایی در تهران و شهرستان، در فضاهای مسکونی، تجاری، اداری و اقامتی؛ با تصاویر و جزئیات اجرایی واقعی."
            action={{ href: "/projects", label: "همه پروژه‌ها" }}
          />

          <div className="mt-12 grid gap-5 md:grid-cols-12">
            {selectedProjects.map((project, index) => (
              <Reveal
                key={project.slug}
                delay={index * 70}
                className={
                  index === 0
                    ? "md:col-span-7"
                    : index === 1
                      ? "md:col-span-5"
                      : "md:col-span-6"
                }
              >
                <ProjectCard
                  project={project}
                  size={index === 0 ? "wide" : "default"}
                  priority={index === 0}
                />
              </Reveal>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-paper/15 pt-8 md:flex-row md:items-center">
            <p className="max-w-lg text-[13px] leading-7 text-paper/55">
              از هر پروژه، مستندات تصویری و جزئیات فنی نگه‌داری می‌شود تا در آینده امکان
              نگهداری، ترمیم و بازسازی دقیق وجود داشته باشد.
            </p>
            <div className="flex flex-wrap gap-2">
              {["مسکونی", "تجاری", "اقامتی", "اداری"].map((label) => (
                <Link
                  key={label}
                  href="/projects"
                  className="border border-paper/20 px-4 py-2 text-[11px] text-paper/65 transition-colors hover:border-amber hover:text-amber"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="wrap py-20 md:py-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <span className="eyebrow">فرایند کار</span>
              <h2 className="mt-6 text-[clamp(1.7rem,3.4vw,2.8rem)] leading-[1.3]">
                از اولین تماس تا
                <br />
                سطح نهایی.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-graphite">
                اجرای یک سطح سیمانی، بیش از یک روز کاری است. فرایند ما شفاف است تا از ابتدا
                بدانید چه اتفاقی می‌افتد، چه زمانی و با چه هزینه‌ای.
              </p>
              <div className="relative mt-9 aspect-[4/3] overflow-hidden bg-paper-3">
                <Image
                  src="/images/samples.jpg"
                  alt="نمونه رنگ‌ها و متریال‌های میکروسمنت سیمان تک"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:pt-16">
            <ol className="border-t border-line">
              {process.map((item, index) => (
                <Reveal as="li" key={item.step} delay={index * 70} className="border-b border-line">
                  <div className="grid grid-cols-[auto_1fr] gap-5 py-7 md:gap-8">
                    <span className="font-mono text-[11px] tracking-[0.1em] text-red">{item.step}</span>
                    <div>
                      <h3 className="text-lg">{item.title}</h3>
                      <p className="mt-2 text-[13px] leading-7 text-graphite">{item.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] text-mist">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-amber" /> ضمانت اجرای ۱۰ ساله
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-red" /> کنترل کیفیت مستند
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-graphite" /> پشتیبانی پس از تحویل
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Journal */}
      <section className="bg-paper-2 py-20 md:py-28">
        <div className="wrap">
          <SectionHead
            label="مجله سیمان تک"
            title="دانش متریال، پیش از تصمیم‌گیری."
            intro="راهنماهای فنی، مقایسه‌ها و جزئیات اجرایی برای معماران، پیمانکاران و کارفرمایانی که می‌خواهند انتخاب درستی داشته باشند."
            action={{ href: "/journal", label: "همه مقالات" }}
          />
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {articles.slice(0, 3).map((article, index) => (
              <Reveal key={article.slug} delay={index * 80}>
                <ArticleCard article={article} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="wrap py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <span className="eyebrow">سوالات متداول</span>
            <h2 className="mt-6 text-[clamp(1.7rem,3.2vw,2.6rem)] leading-[1.3]">
              پرسش‌هایی که
              <br />
              زیاد می‌شنویم.
            </h2>
            <p className="mt-5 text-sm leading-7 text-graphite">
              پاسخ کوتاه و شفاف به پرتکرارترین سوالات درباره میکروسمنت، اجرا، مقاومت و قیمت.
            </p>
            <Link href="/faq" className="link-arrow mt-7 text-ink">
              همه سوالات متداول
              <ArrowIcon />
            </Link>
          </div>
          <div className="md:col-span-8">
            <FaqList items={faqs.slice(0, 6)} />
          </div>
        </div>
      </section>

      <CTASection
        label="استعلام قیمت"
        title={
          <>
            پروژه‌تان را برای ما توصیف کنید؛
            <br className="hidden md:block" /> برآورد شفاف را ما آماده می‌کنیم.
          </>
        }
        text="کافی است متراژ، نوع فضا و شهر پروژه را بگویید. در کمتر از یک روز کاری، پیشنهاد متریال و بازه قیمت را دریافت می‌کنید."
        secondary={{ href: "/contact", label: "تماس و موقعیت دفتر" }}
      />
    </>
  );
}
