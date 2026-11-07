import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon } from "@/components/brand";
import { ArticleCard } from "@/components/cards";
import { Breadcrumbs, CTASection, Tag } from "@/components/ui";
import {
  articleCategoryLabel,
  articles,
  getArticle,
  relatedArticles,
} from "@/lib/content/articles";
import { getProduct } from "@/lib/content/products";
import { fa } from "@/lib/format";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "مقاله یافت نشد" };
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/journal/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image }],
      publishedTime: article.dateISO,
      authors: [article.author],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = relatedArticles(article.slug);
  const productLinks = article.relatedProducts.map((item) => getProduct(item)).filter(Boolean);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: `${site.url}${article.image}`,
    datePublished: article.dateISO,
    author: { "@type": "Organization", name: article.author },
    publisher: { "@type": "Organization", name: site.legalName },
    mainEntityOfPage: `${site.url}/journal/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <article>
        <header className="bg-ink pt-28 text-paper md:pt-36">
          <div className="wrap pb-12 md:pb-16">
            <Breadcrumbs
              items={[
                { label: "خانه", href: "/" },
                { label: "مجله", href: "/journal" },
                { label: articleCategoryLabel(article.category) },
              ]}
            />
            <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
              <div className="md:col-span-8">
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-paper/50">
                  <Tag tone="dark">{articleCategoryLabel(article.category)}</Tag>
                  <span>{article.date}</span>
                  <span className="h-px w-4 bg-paper/25" />
                  <span>{article.readTime} مطالعه</span>
                </div>
                <h1 className="mt-6 text-[clamp(1.9rem,4.2vw,3.6rem)] leading-[1.28]">
                  {article.title}
                </h1>
                <p className="mt-6 max-w-2xl text-[13px] leading-8 text-paper/65 md:text-sm">
                  {article.excerpt}
                </p>
              </div>
              <div className="md:col-span-4 md:justify-self-end">
                <div className="border-t border-paper/15 pt-4 text-[11px] leading-6 text-paper/55 md:min-w-48">
                  <p className="text-paper/40">نویسنده</p>
                  <p className="mt-1 text-paper/85">{article.author}</p>
                  <p className="mt-3 text-paper/40">انتشار</p>
                  <p className="mt-1 text-paper/85">{article.date}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="wrap">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-graphite md:aspect-[21/9]">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        </header>

        <div className="wrap py-14 md:py-20">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <aside className="md:col-span-3">
              <div className="sticky top-28">
                <h2 className="text-[11px] tracking-[0.14em] text-mist">در این مقاله</h2>
                <ol className="mt-4 space-y-3 border-r border-line pr-4">
                  {article.sections.map((section, index) => (
                    <li key={section.heading}>
                      <a
                        href={`#section-${index + 1}`}
                        className="flex gap-2 text-[12px] leading-6 text-graphite transition-colors hover:text-red"
                      >
                        <span className="font-mono text-[10px] text-mist">
                          {fa(String(index + 1).padStart(2, "0"))}
                        </span>
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>
                <div className="mt-8 border border-line p-4">
                  <p className="text-[12px] leading-6 text-graphite">
                    سوال فنی دارید؟ کارشناسان سیمان تک پاسخ می‌دهند.
                  </p>
                  <Link href="/contact" className="link-arrow mt-3 text-ink">
                    تماس با ما
                    <ArrowIcon />
                  </Link>
                </div>
              </div>
            </aside>

            <div className="md:col-span-8 md:col-start-4">
              <div className="space-y-5">
                {article.intro.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="text-[15px] leading-9 text-graphite">
                    {paragraph}
                  </p>
                ))}
              </div>

              {article.sections.map((section, index) => (
                <section key={section.heading} id={`section-${index + 1}`} className="mt-12 scroll-mt-28">
                  <h2 className="text-[clamp(1.25rem,2.2vw,1.6rem)] leading-[1.5] text-ink">
                    {section.heading}
                  </h2>
                  {section.paragraphs ? (
                    <div className="mt-4 space-y-4">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph.slice(0, 24)} className="text-[14px] leading-9 text-graphite">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ) : null}
                  {section.bullets ? (
                    <ul className="mt-5 space-y-3 border-r-2 border-line pr-5">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="text-[13px] leading-7 text-graphite">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              <div className="mt-14 border border-line bg-paper-2 p-6 md:p-8">
                <h2 className="text-[11px] tracking-[0.14em] text-mist">جمع‌بندی</h2>
                <ul className="mt-4 space-y-3">
                  {article.takeaways.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[13px] leading-7 text-ink">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-amber" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {productLinks.length > 0 ? (
                <div className="mt-10">
                  <h2 className="text-[11px] tracking-[0.14em] text-mist">محصولات مرتبط با این مقاله</h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {productLinks.map((product) =>
                      product ? (
                        <Link
                          key={product.slug}
                          href={`/products/${product.slug}`}
                          className="group flex items-center gap-4 border border-line p-3 transition-colors hover:border-ink"
                        >
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-paper-3">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-[13px] text-ink transition-colors group-hover:text-red">
                              {product.name}
                            </p>
                            <p className="mt-1 text-[10px] text-mist">{product.nameEn}</p>
                          </div>
                        </Link>
                      ) : null,
                    )}
                  </div>
                </div>
              ) : null}

              <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-[11px] text-mist">
                <span>نویسنده: {article.author}</span>
                <Link href="/journal" className="link-arrow text-ink">
                  بازگشت به مجله
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className="bg-paper-2 py-16">
        <div className="wrap">
          <h2 className="text-xl">مقالات مرتبط</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ArticleCard key={item.slug} article={item} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="دانش خوب است؛ اجرای درست، مهم‌تر."
        text="اگر برای انتخاب سیستم یا اجرای پروژه به کمک نیاز دارید، تیم فنی سیمان تک همراه شماست."
        secondary={{ href: "/journal", label: "مقالات بیشتر" }}
      />
    </>
  );
}
