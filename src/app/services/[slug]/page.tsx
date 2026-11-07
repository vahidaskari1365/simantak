import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon } from "@/components/brand";
import { Reveal } from "@/components/reveal";
import { Breadcrumbs, CTASection, PageHero, Tag } from "@/components/ui";
import { getService, services } from "@/lib/content/services";
import { products } from "@/lib/content/products";
import { fa } from "@/lib/format";
import { site, whatsappHref } from "@/lib/site";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "خدمت یافت نشد" };
  return {
    title: `${service.name} | ${service.tagline}`,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: service.name, description: service.summary, images: [{ url: service.image }] },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const relatedServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  const suggested = products.filter((product) =>
    ["microcement-classic", "microcement-wet", "sealer-system"].includes(product.slug),
  );

  return (
    <>
      <PageHero
        label="خدمات اجرا"
        title={service.name}
        intro={service.tagline}
        image={service.image}
        meta={[
          { label: "نوع فضا", value: service.space },
          { label: "زمان اجرا", value: service.duration },
          { label: "برآورد هزینه", value: service.startingPrice },
          { label: "ضمانت", value: "۱۰ سال" },
        ]}
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/contact" className="btn btn-primary">
            درخواست بازدید فنی
            <ArrowIcon />
          </Link>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-light">
            گفت‌وگو در واتساپ
          </a>
        </div>
      </PageHero>

      <section className="wrap py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <Breadcrumbs
              items={[
                { label: "خانه", href: "/" },
                { label: "خدمات", href: "/services" },
                { label: service.name },
              ]}
            />
            <h2 className="mt-8 text-2xl">درباره این خدمت</h2>
            <div className="mt-5 space-y-5">
              {service.description.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-[14px] leading-8 text-graphite">
                  {paragraph}
                </p>
              ))}
            </div>

            <h2 className="mt-12 text-2xl">محدوده خدمات</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {service.scope.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[13px] leading-7 text-graphite">
                  <span className="mt-2.5 h-1 w-3 shrink-0 bg-amber" />
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="mt-12 text-2xl">مراحل اجرا</h2>
            <ol className="mt-5 border-t border-line">
              {service.steps.map((step, index) => (
                <li key={step.title} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[3rem_10rem_1fr] sm:gap-5">
                  <span className="font-mono text-[10px] text-red">{fa(String(index + 1).padStart(2, "0"))}</span>
                  <span className="text-[13px] text-ink">{step.title}</span>
                  <span className="text-[13px] leading-7 text-graphite">{step.text}</span>
                </li>
              ))}
            </ol>

            <div className="mt-10">
              <h2 className="text-xl">تصاویر اجرا</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {service.gallery.map((image) => (
                  <div key={image} className="relative aspect-square overflow-hidden bg-paper-3">
                    <Image
                      src={image}
                      alt={`${service.name} — نمونه اجرا`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="md:col-span-5">
            <div className="sticky top-28 space-y-6">
              <div className="border border-line p-6">
                <h2 className="text-sm">مناسب برای</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {service.idealFor.map((item) => (
                    <li key={item}>
                      <Tag>{item}</Tag>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t border-line pt-5">
                  <h3 className="text-sm">نکات مهم</h3>
                  <ul className="mt-3 space-y-2.5">
                    {service.important.map((item) => (
                      <li key={item} className="text-[12px] leading-6 text-graphite">
                        — {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-ink p-6 text-paper">
                <h2 className="text-base">برآورد هزینه اجرا</h2>
                <p className="mt-2 text-[12px] leading-6 text-paper/60">
                  {service.startingPrice}. هزینه نهایی به وضعیت بستر، تعداد لایه و پالت رنگی بستگی دارد.
                </p>
                <div className="mt-5 space-y-2 text-[12px] text-paper/75">
                  <p className="flex justify-between gap-4">
                    <span className="text-paper/45">تماس دفتر</span>
                    <a href={`tel:${site.phoneHref}`} dir="ltr" className="hover:text-amber">
                      {site.phoneLabel}
                    </a>
                  </p>
                  <p className="flex justify-between gap-4">
                    <span className="text-paper/45">موبایل و واتساپ</span>
                    <a href={`tel:${site.mobileHref}`} dir="ltr" className="hover:text-amber">
                      {site.mobileLabel}
                    </a>
                  </p>
                </div>
                <Link href="/contact" className="btn btn-primary mt-5 w-full">
                  فرم استعلام
                  <ArrowIcon />
                </Link>
              </div>

              <div className="border border-line p-6">
                <h2 className="text-sm">محصولات پیشنهادی</h2>
                <ul className="mt-4 divide-y divide-line">
                  {suggested.map((product) => (
                    <li key={product.slug}>
                      <Link
                        href={`/products/${product.slug}`}
                        className="flex items-center justify-between gap-3 py-3 text-[12px] text-graphite transition-colors hover:text-ink"
                      >
                        {product.name}
                        <span aria-hidden="true">←</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-paper-2 py-16 md:py-20">
        <div className="wrap">
          <h2 className="text-xl md:text-2xl">سایر خدمات اجرایی</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {relatedServices.map((item, index) => (
              <Reveal key={item.slug} delay={index * 70}>
                <Link
                  href={`/services/${item.slug}`}
                  className="group flex h-full flex-col justify-between border border-line bg-paper p-6 transition-colors hover:border-ink"
                >
                  <div>
                    <Tag>{item.space}</Tag>
                    <h3 className="mt-4 text-base transition-colors group-hover:text-red">{item.name}</h3>
                    <p className="mt-2 text-[12px] leading-6 text-graphite">{item.summary}</p>
                  </div>
                  <span className="link-arrow mt-5 text-ink">
                    جزئیات
                    <ArrowIcon />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="برای این خدمت زمان‌بندی بگیرید."
        text="بازدید فنی، برآورد متریال و برنامه اجرا را در یک جلسه دریافت کنید."
        secondary={{ href: "/shop", label: "خرید متریال" }}
      />
    </>
  );
}
