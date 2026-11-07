import type { Metadata } from "next";
import Link from "next/link";
import { ProjectCard } from "@/components/cards";
import { Reveal } from "@/components/reveal";
import { CTASection, PageHero } from "@/components/ui";
import { filterProjects, projects, spaces, uses } from "@/lib/content/projects";
import { products } from "@/lib/content/products";
import { fa } from "@/lib/format";

export const metadata: Metadata = {
  title: "پروژه‌های اجراشده | نمونه‌کارهای میکروسمنت سیمان تک",
  description:
    "گالری پروژه‌های اجراشده سیمان تک در فضاهای مسکونی، تجاری، اداری و اقامتی؛ کف، دیوار، نما و فضاهای مرطوب با میکروسمنت و پوشش‌های دکوراتیو.",
  alternates: { canonical: "/projects" },
};

function buildHref(params: { space?: string; use?: string; product?: string }) {
  const query = new URLSearchParams();
  if (params.space) query.set("space", params.space);
  if (params.use) query.set("use", params.use);
  if (params.product) query.set("product", params.product);
  const qs = query.toString();
  return qs ? `/projects?${qs}` : "/projects";
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ space?: string; use?: string; product?: string }>;
}) {
  const { space, use, product } = await searchParams;
  const list = filterProjects({ space, use, product });
  const activeSpace = spaces.find((item) => item.id === space);
  const activeUse = uses.find((item) => item.id === use);
  const activeProduct = products.find((item) => item.slug === product);

  return (
    <>
      <PageHero
        label="نمونه‌کارها"
        title="پروژه‌هایی که با سطح، شکل گرفته‌اند."
        intro="هر پروژه، یک مسئله متفاوت دارد: بستر ناهمگون، زمان محدود، سازه قدیمی یا پالت رنگی خاص. این‌ها نمونه‌ای از راه‌حل‌هایی است که در عمل اجرا شده‌اند."
        image="/images/project-commercial.jpg"
        meta={[
          { label: "پروژه ثبت‌شده", value: `${fa(projects.length)} نمونه منتخب` },
          { label: "نوع فضا", value: "مسکونی، تجاری، اداری، اقامتی" },
          { label: "نوع کاربرد", value: "کف، دیوار، نما، فضای مرطوب" },
          { label: "گستره", value: "تهران و شهرستان" },
        ]}
      />

      <section className="wrap py-14 md:py-20">
        <div className="flex flex-col gap-6 border-b border-line pb-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="me-1 text-[11px] text-mist">نوع فضا:</span>
              <FilterChip href={buildHref({ use, product })} active={!space}>
                همه
              </FilterChip>
              {spaces.map((item) => (
                <FilterChip
                  key={item.id}
                  href={buildHref({ space: item.id, use, product })}
                  active={space === item.id}
                >
                  {item.label}
                </FilterChip>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="me-1 text-[11px] text-mist">کاربرد:</span>
              <FilterChip href={buildHref({ space, product })} active={!use}>
                همه
              </FilterChip>
              {uses.map((item) => (
                <FilterChip
                  key={item.id}
                  href={buildHref({ space, use: item.id, product })}
                  active={use === item.id}
                >
                  {item.label}
                </FilterChip>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="me-1 text-[11px] text-mist">متریال:</span>
            <FilterChip href={buildHref({ space, use })} active={!product}>
              همه
            </FilterChip>
            {products.map((item) => (
              <FilterChip
                key={item.slug}
                href={buildHref({ space, use, product: item.slug })}
                active={product === item.slug}
              >
                {item.name}
              </FilterChip>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-mist">
            <p>
              {fa(list.length)} پروژه
              {activeSpace ? ` — ${activeSpace.label}` : ""}
              {activeUse ? ` — ${activeUse.label}` : ""}
              {activeProduct ? ` — ${activeProduct.name}` : ""}
            </p>
            {activeSpace || activeUse || activeProduct ? (
              <Link href="/projects" className="text-ink underline decoration-line underline-offset-4">
                حذف فیلترها
              </Link>
            ) : null}
          </div>
        </div>

        {list.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-12 md:gap-x-6 md:gap-y-14">
            {list.map((project, index) => (
              <Reveal
                key={project.slug}
                delay={(index % 3) * 70}
                className={
                  index === 0
                    ? "md:col-span-7"
                    : index === 1
                      ? "md:col-span-5"
                      : "md:col-span-4"
                }
              >
                <ProjectCard
                  project={project}
                  priority={index < 2}
                  size={index === 0 || index === 1 ? "wide" : "default"}
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-sm text-graphite">
              برای این ترکیب فیلتر، پروژه‌ای ثبت نشده است.
            </p>
            <Link href="/projects" className="link-arrow mt-5 text-ink">
              مشاهده همه پروژه‌ها
            </Link>
          </div>
        )}
      </section>

      <section className="bg-paper-2 py-14">
        <div className="wrap flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-lg md:text-xl">پروژه شما می‌تواند نمونه‌کار بعدی باشد.</h2>
            <p className="mt-2 text-[12px] leading-6 text-graphite md:text-[13px]">
              برای پروژه‌های در حال طراحی، امکان همکاری از مرحله انتخاب متریال وجود دارد.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px]">
            {["مسکونی", "تجاری", "اقامتی", "اداری"].map((label) => (
              <span key={label} className="border border-line px-3 py-1.5 text-graphite">
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="نمونه‌کار مشابه پروژه خود را ببینید."
        text="تعدادی از پروژه‌ها به‌صورت کامل مستند شده‌اند. برای مشاهده نمونه مرتبط با کاربری خود، با ما تماس بگیرید."
        secondary={{ href: "/services", label: "خدمات اجرا" }}
      />
    </>
  );
}

function FilterChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={
        active
          ? "border border-ink bg-ink px-3.5 py-2 text-[11px] text-paper"
          : "border border-line px-3.5 py-2 text-[11px] text-graphite transition-colors hover:border-ink hover:text-ink"
      }
    >
      {children}
    </Link>
  );
}
