import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon } from "@/components/brand";
import { ProjectCard } from "@/components/cards";
import { Reveal } from "@/components/reveal";
import { Breadcrumbs, CTASection, Tag } from "@/components/ui";
import {
  getProject,
  projects,
  spaceLabel,
  useLabel,
} from "@/lib/content/projects";
import { getProduct } from "@/lib/content/products";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "پروژه یافت نشد" };
  return {
    title: `${project.title} | ${spaceLabel(project.space)} — ${project.location}`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} — نمونه‌کار سیمان تک`,
      description: project.summary,
      images: [{ url: project.image }],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = projects.filter((item) => item.slug !== project.slug).slice(0, 3);
  const usedProducts = project.products.map((item) => getProduct(item)).filter(Boolean);
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    about: project.summary,
    locationCreated: { "@type": "Place", name: project.location },
    image: `${site.url}${project.image}`,
    creator: { "@type": "Organization", name: site.legalName },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="relative bg-ink pt-28 text-paper md:pt-32">
        <div className="wrap relative pb-10">
          <Breadcrumbs
            items={[
              { label: "خانه", href: "/" },
              { label: "پروژه‌ها", href: "/projects" },
              { label: project.title },
            ]}
          />
          <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <div className="flex flex-wrap gap-2">
                <Tag tone="dark">{spaceLabel(project.space)}</Tag>
                <Tag tone="dark">{useLabel(project.use)}</Tag>
                <Tag tone="dark">{project.year}</Tag>
              </div>
              <h1 className="mt-6 text-[clamp(2rem,4.8vw,4rem)] leading-[1.18]">{project.title}</h1>
              <p className="mt-5 max-w-2xl text-sm leading-8 text-paper/65">{project.summary}</p>
            </div>
            <dl className="grid grid-cols-2 gap-5 border-t border-paper/15 pt-5 md:col-span-4 md:grid-cols-1 md:border-t-0 md:pt-0">
              <div>
                <dt className="text-[10px] tracking-[0.1em] text-paper/40">موقعیت</dt>
                <dd className="mt-1 text-[12px] text-paper/85">{project.location}</dd>
              </div>
              <div>
                <dt className="text-[10px] tracking-[0.1em] text-paper/40">متراژ</dt>
                <dd className="mt-1 text-[12px] text-paper/85">{project.area}</dd>
              </div>
              <div>
                <dt className="text-[10px] tracking-[0.1em] text-paper/40">زمان اجرا</dt>
                <dd className="mt-1 text-[12px] text-paper/85">{project.duration}</dd>
              </div>
            </dl>
          </div>
          <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden bg-graphite md:aspect-[21/9]">
            <Image
              src={project.image}
              alt={`${project.title} — ${project.location}`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="wrap py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <span className="eyebrow">شرح پروژه</span>
            <div className="mt-6 space-y-5">
              {project.description.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-[14px] leading-8 text-graphite">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12 grid gap-px bg-line">
              {[
                { title: "چالش", text: project.challenge, mark: "۰۱" },
                { title: "راه‌حل", text: project.solution, mark: "۰۲" },
                { title: "نتیجه", text: project.result, mark: "۰۳" },
              ].map((block) => (
                <div key={block.title} className="bg-paper p-6 md:p-7">
                  <div className="flex items-start gap-5">
                    <span className="mt-1 font-mono text-[10px] text-red">{block.mark}</span>
                    <div>
                      <h2 className="text-base">{block.title}</h2>
                      <p className="mt-2 text-[13px] leading-7 text-graphite">{block.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {project.quote ? (
              <blockquote className="mt-12 border-r-2 border-amber pr-6">
                <p className="text-[clamp(1.05rem,2vw,1.35rem)] leading-9 text-ink">
                  «{project.quote.text}»
                </p>
                <footer className="mt-3 text-[11px] text-mist">{project.quote.author}</footer>
              </blockquote>
            ) : null}
          </div>

          <aside className="md:col-span-5">
            <div className="sticky top-28 space-y-6">
              <div className="border border-line p-6">
                <h2 className="text-sm">متریال استفاده‌شده</h2>
                <ul className="mt-4 divide-y divide-line">
                  {usedProducts.map((product) =>
                    product ? (
                      <li key={product.slug}>
                        <Link
                          href={`/products/${product.slug}`}
                          className="group flex items-center justify-between gap-3 py-3"
                        >
                          <span>
                            <span className="block text-[13px] text-ink transition-colors group-hover:text-red">
                              {product.name}
                            </span>
                            <span className="mt-0.5 block text-[10px] text-mist">{product.nameEn}</span>
                          </span>
                          <span aria-hidden="true" className="text-graphite">
                            ←
                          </span>
                        </Link>
                      </li>
                    ) : null,
                  )}
                </ul>
              </div>

              <div className="bg-paper-2 p-6">
                <h2 className="text-sm">پروژه‌ای مشابه دارید؟</h2>
                <p className="mt-2 text-[12px] leading-6 text-graphite">
                  شرایط بستر و کاربری پروژه شما بررسی می‌شود و پیشنهاد متریال دریافت می‌کنید.
                </p>
                <Link href="/contact" className="btn btn-ink mt-5 w-full">
                  درخواست مشاوره
                  <ArrowIcon />
                </Link>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden bg-paper-3">
                <Image
                  src={project.gallery[1] ?? project.image}
                  alt={`جزئیات اجرای ${project.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-16">
          <h2 className="text-xl md:text-2xl">گالری پروژه</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {project.gallery.map((image, index) => (
              <div
                key={image}
                className={`relative overflow-hidden bg-paper-3 ${
                  index === 0 ? "aspect-[16/11] md:col-span-2" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={image}
                  alt={`${project.title} — تصویر ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-2 py-16 md:py-20">
        <div className="wrap">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-xl md:text-2xl">پروژه‌های دیگر</h2>
            <Link href="/projects" className="link-arrow text-ink">
              همه پروژه‌ها
              <ArrowIcon />
            </Link>
          </div>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <Reveal key={item.slug} delay={index * 70}>
                <ProjectCard project={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="سطح بعدی، پروژه شما."
        text="بازدید فنی، انتخاب سیستم و برآورد هزینه در یک مسیر شفاف."
        secondary={{ href: "/services", label: "خدمات اجرا" }}
      />
    </>
  );
}
