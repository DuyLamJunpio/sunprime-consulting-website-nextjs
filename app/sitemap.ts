import type { MetadataRoute } from "next";
import { serviceSlugs } from "@/data/services";
import { siteConfig, absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/gioi-thieu"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/services"), lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/tin-tuc"), lastModified, changeFrequency: "daily", priority: 0.8 },
    { url: absoluteUrl("/blog"), lastModified, changeFrequency: "daily", priority: 0.7 },
    { url: absoluteUrl("/stories"), lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/contact"), lastModified, changeFrequency: "monthly", priority: 0.7 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: absoluteUrl(`/services/${slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
