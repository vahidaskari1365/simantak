import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/brand";
import { Tag } from "@/components/ui";
import { fa } from "@/lib/format";
import { categoryOf, type Product } from "@/lib/content/products";
import { spaceLabel, useLabel, type Project } from "@/lib/content/projects";
import { articleCategoryLabel, type Article } from "@/lib/content/articles";
import type { Service } from "@/lib/content/services";

export function ProductCard({
  product,
  index,
  tone = "light",
}: {
  product: Product;
  index?: number;
  tone?: "light" | "dark";
}) {
  const category = categoryOf(product.category);
  return (
    <Link href={`/products/${product.slug}`} className="group flex h-full flex-col">
      <div className="img-zoom relative aspect-[4/5] w-full overflow-hidden bg-paper-3">
        <Image
          src={product.image}
          alt={`${product.name} — ${product.tagline}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          <Tag tone={tone === "dark" ? "dark" : "light"} className="bg-paper/90 backdrop-blur-sm">
            {category.name}
          </Tag>
          {typeof index === "number" ? (
            <span className="font-mono text-[10px] tracking-[0.16em] text-paper/85 mix-blend-difference">
              {fa(String(index + 1).padStart(2, "0"))}
            </span>
          ) : null}
        </div>
      </div>
      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg leading-snug transition-colors group-hover:text-red">
              {product.name}
            </h3>
            <p className="mt-1 font-mono text-[10px] tracking-[0.12em] text-mist">{product.nameEn}</p>
          </div>
          <ArrowUpRight className="mt-1 shrink-0 text-graphite transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
        <p className="mt-3 text-[13px] leading-6 text-graphite">{product.summary}</p>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-line pt-3 text-[11px] text-mist">
          <span>پوشش‌دهی: {product.coverage.split("،")[0].split("در")[0].trim()}</span>
        </div>
      </div>
    </Link>
  );
}

export function ProjectCard({
  project,
  priority = false,
  size = "default",
}: {
  project: Project;
  priority?: boolean;
  size?: "default" | "tall" | "wide";
}) {
  const aspect =
    size === "tall" ? "aspect-[3/4]" : size === "wide" ? "aspect-[16/10]" : "aspect-[4/3]";
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className={`img-zoom relative w-full overflow-hidden bg-paper-3 ${aspect}`}>
        <Image
          src={project.image}
          alt={`${project.title} — ${project.location}`}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/5 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
          <div>
            <p className="text-[10px] tracking-[0.12em] text-paper/70">{project.location}</p>
            <h3 className="mt-1.5 text-lg text-paper">{project.title}</h3>
          </div>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-paper/40 text-paper transition-colors group-hover:border-amber group-hover:bg-amber group-hover:text-ink">
            <ArrowUpRight />
          </span>
        </div>
        <span className="absolute right-4 top-4">
          <Tag tone="dark" className="bg-ink/40 backdrop-blur-sm">
            {spaceLabel(project.space)} · {useLabel(project.use)}
          </Tag>
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between text-[11px] text-mist">
        <span>{project.area}</span>
        <span>{project.year}</span>
      </div>
    </Link>
  );
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/journal/${article.slug}`} className="group flex h-full flex-col">
      <div className="img-zoom relative aspect-[16/11] w-full overflow-hidden bg-paper-3">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="mt-5 flex items-center gap-3 text-[11px] text-mist">
        <span className="text-red">{articleCategoryLabel(article.category)}</span>
        <span className="h-px w-4 bg-line" />
        <span>{article.date}</span>
        <span className="ms-auto">{article.readTime}</span>
      </div>
      <h3 className="mt-3 text-lg leading-8 transition-colors group-hover:text-red">
        {article.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-[13px] leading-6 text-graphite">{article.excerpt}</p>
      <span className="link-arrow mt-auto inline-flex pt-5 text-ink">
        مطالعه مقاله
        <ArrowUpRight />
      </span>
    </Link>
  );
}

export function ServiceRow({ service, index }: { service: Service; index: number }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-4 border-t border-line py-6 transition-colors last:border-b hover:bg-paper-2 md:gap-8 md:px-4"
    >
      <span className="font-mono text-[11px] tracking-[0.12em] text-mist transition-colors group-hover:text-red">
        {fa(String(index + 1).padStart(2, "0"))}
      </span>
      <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-5">
        <h3 className="text-base transition-colors group-hover:text-red md:text-xl">{service.name}</h3>
        <span className="text-[11px] text-mist">{service.tagline}</span>
      </div>
      <div className="flex items-center gap-4">
        <Tag className="hidden md:inline-flex">{service.space}</Tag>
        <span className="flex h-9 w-9 items-center justify-center border border-line text-graphite transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
          <ArrowUpRight />
        </span>
      </div>
    </Link>
  );
}
