import type { MetadataRoute } from "next";
import { articles } from "@/lib/content/articles";
import { products } from "@/lib/content/products";
import { projects } from "@/lib/content/projects";
import { services } from "@/lib/content/services";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, changeFrequency: "weekly", priority: 1, lastModified: now },
    { url: `${site.url}/products`, changeFrequency: "weekly", priority: 0.9, lastModified: now },
    { url: `${site.url}/services`, changeFrequency: "monthly", priority: 0.9, lastModified: now },
    { url: `${site.url}/projects`, changeFrequency: "weekly", priority: 0.9, lastModified: now },
    { url: `${site.url}/about`, changeFrequency: "monthly", priority: 0.7, lastModified: now },
    { url: `${site.url}/journal`, changeFrequency: "weekly", priority: 0.8, lastModified: now },
    { url: `${site.url}/faq`, changeFrequency: "monthly", priority: 0.7, lastModified: now },
    { url: `${site.url}/contact`, changeFrequency: "monthly", priority: 0.8, lastModified: now },
    { url: `${site.url}/shop`, changeFrequency: "weekly", priority: 0.8, lastModified: now },
  ];

  return [
    ...staticRoutes,
    ...products.map((product) => ({
      url: `${site.url}/products/${product.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      lastModified: now,
    })),
    ...services.map((service) => ({
      url: `${site.url}/services/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      lastModified: now,
    })),
    ...projects.map((project) => ({
      url: `${site.url}/projects/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      lastModified: now,
    })),
    ...articles.map((article) => ({
      url: `${site.url}/journal/${article.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      lastModified: new Date(article.dateISO),
    })),
  ];
}
