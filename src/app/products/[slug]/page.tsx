import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon } from "@/components/brand";
import { ProductCard } from "@/components/cards";
import { MaterialEstimator } from "@/components/material-estimator";
import { coverageFor } from "@/lib/content/coverage";
import { Reveal } from "@/components/reveal";
import { Breadcrumbs, CTASection, SectionHead, Tag } from "@/components/ui";
import {
  categoryOf,
  getProduct,
  products,
  relatedProducts,
} from "@/lib/content/products";
import { fa, faPriceToman } from "@/lib/format";
import { site, whatsappHref } from "@/lib/site";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "محصول یافت نشد" };
  return {
    title: `${product.name} | ${product.tagline}`,
    description: product.summary,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} — سیمان تک`,
      description: product.summary,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = categoryOf(product.category);
  const related = relatedProducts(product.slug);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    image: `${site.url}${product.image}`,
    brand: { "@type": "Brand", name: site.brandFa },
    category: category.name,
    offers: product.shop
      ? {
          "@type": "Offer",
          price: product.shop.price,
          priceCurrency: "IRR",
          availability: "https://schema.org/InStock",
          url: `${site.url}/shop`,
        }
      : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="relative overflow-hidden bg-ink pt-28 text-paper md:pt-32">
        <div className="wrap relative grid gap-10 pb-14 md:grid-cols-12 md:gap-12 md:pb-20">
          <div className="md:col-span-6 md:pt-6">
            <Breadcrumbs
              items={[
                { label: "خانه", href: "/" },
                { label: "محصولات", href: "/products" },
                { label: category.name, href: `/products?category=${category.id}` },
                { label: product.name },
              ]}
            />
            <div className="mt-8">
              <Tag tone="dark">{category.name}</Tag>
              <h1 className="mt-5 text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.2]">{product.name}</h1>
              <p className="mt-2 font-mono text-[11px] tracking-[0.18em] text-paper/45">
                {product.nameEn}
              </p>
              <p className="mt-6 max-w-lg text-sm leading-8 text-paper/70">{product.tagline}</p>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-paper/15 pt-7">
              <div>
                <dt className="text-[10px] tracking-[0.1em] text-paper/40">پوشش‌دهی</dt>
                <dd className="mt-1.5 text-[12px] leading-6 text-paper/85">{product.coverage}</dd>
              </div>
              <div>
                <dt className="text-[10px] tracking-[0.1em] text-paper/40">ضخامت نهایی</dt>
                <dd className="mt-1.5 text-[12px] leading-6 text-paper/85">
                  {product.specs.find((spec) => spec.label.includes("ضخامت"))?.value ?? "۲ تا ۴ میلی‌متر"}
                </dd>
              </div>
            </dl>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              {product.shop ? (
                <div>
                  <p className="text-[10px] text-paper/40">{product.shop.unit}</p>
                  <p className="mt-1 text-lg text-paper">{faPriceToman(product.shop.price)}</p>
                </div>
              ) : (
                <p className="text-[12px] text-paper/55">قیمت بر اساس متراژ پروژه — استعلام بگیرید</p>
              )}
              <div className="flex flex-wrap gap-2 sm:ms-auto">
                <Link href="/contact" className="btn btn-primary">
                  استعلام قیمت
                  <ArrowIcon />
                </Link>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-light"
                >
                  واتساپ
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-graphite">
              <Image
                src={product.image}
                alt={`${product.name} — ${product.tagline}`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {product.gallery.slice(1, 3).map((image) => (
                <div key={image} className="relative aspect-[4/3] overflow-hidden bg-graphite">
                  <Image
                    src={image}
                    alt={`نمونه اجرای ${product.name}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="wrap py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <span className="eyebrow">معرفی محصول</span>
            <div className="mt-6 space-y-5">
              {product.description.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-[14px] leading-8 text-graphite">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12">
              <h2 className="text-xl">ویژگی‌های کلیدی</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-[13px] leading-7 text-graphite">
                    <span className="mt-2.5 h-1 w-3 shrink-0 bg-amber" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12">
              <h2 className="text-xl">مزایا در پروژه واقعی</h2>
              <div className="mt-6 grid gap-px bg-line sm:grid-cols-3">
                {product.benefits.map((benefit, index) => (
                  <div key={benefit.title} className="bg-paper p-5">
                    <span className="font-mono text-[10px] text-red">
                      {fa(String(index + 1).padStart(2, "0"))}
                    </span>
                    <h3 className="mt-3 text-[15px]">{benefit.title}</h3>
                    <p className="mt-2 text-[12px] leading-6 text-graphite">{benefit.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-xl">روش اجرا</h2>
              <ol className="mt-5 border-t border-line">
                {product.execution.map((step) => (
                  <li key={step.title} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                    <span className="text-[13px] text-ink">{step.title}</span>
                    <span className="text-[13px] leading-7 text-graphite">{step.text}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-[11px] leading-6 text-mist">
                اجرای تخصصی این سیستم توسط تیم‌های سیمان تک با ضمانت ۱۰ ساله انجام می‌شود.{" "}
                <Link href="/services" className="text-ink underline decoration-line underline-offset-4">
                  مشاهده خدمات اجرا
                </Link>
              </p>
            </div>
          </div>

          <aside className="md:col-span-5">
            <div className="sticky top-28 space-y-6">
              <div className="border border-line">
                <h2 className="border-b border-line px-5 py-4 text-sm">مشخصات فنی</h2>
                <dl className="divide-y divide-line">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="flex items-start justify-between gap-4 px-5 py-3.5">
                      <dt className="text-[12px] text-mist">{spec.label}</dt>
                      <dd className="text-end text-[12px] text-ink">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="border border-line p-5">
                <h2 className="text-sm">کاربردها</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {product.applications.map((application) => (
                    <li key={application}>
                      <Tag>{application}</Tag>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-line p-5">
                <h2 className="text-sm">پالت رنگی</h2>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {product.colors.map((color) => (
                    <div key={color.name} className="flex items-center gap-2.5">
                      <span
                        className="h-7 w-7 shrink-0 border border-line"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-[11px] leading-5 text-graphite">{color.name}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[11px] leading-6 text-mist">
                  رنگ سفارشی بر اساس نمونه یا کد رنگ پروژه قابل تولید است.
                </p>
              </div>

              <MaterialEstimator
                slug={product.slug}
                unit={product.shop?.unit ?? "کیت ۲۰ کیلوگرمی"}
                price={product.shop?.price}
                coverage={coverageFor(product.slug)}
                whatsapp={whatsappHref.split("?")[0]}
              />

              <div className="bg-ink p-5 text-paper">
                <h2 className="text-sm">نیاز به مشاوره فنی دارید؟</h2>
                <p className="mt-2 text-[11px] leading-6 text-paper/60">
                  وضعیت بستر و کاربری فضا را بگویید تا مناسب‌ترین سیستم و تعداد لایه پیشنهاد شود.
                </p>
                <Link href="/contact" className="btn btn-primary mt-4 w-full">
                  دریافت مشاوره
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-paper-2 py-16 md:py-20">
        <div className="wrap">
          <SectionHead
            label="محصولات مرتبط"
            title="سیستم‌های تکمیلی این محصول"
            action={{ href: "/products", label: "کاتالوگ کامل" }}
          />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <Reveal key={item.slug} delay={index * 70}>
                <ProductCard product={item} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="این سیستم را برای پروژه‌تان بررسی کنیم؟"
        text="کارشناس فنی سیمان تک وضعیت بستر، کاربری و انتظارات شما را بررسی و مناسب‌ترین سیستم را پیشنهاد می‌کند."
        secondary={{ href: "/projects", label: "نمونه پروژه‌های مشابه" }}
      />
    </>
  );
}
