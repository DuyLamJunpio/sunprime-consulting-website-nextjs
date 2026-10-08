import type { MetadataRoute } from "next";
import { serviceSlugs } from "@/data/services";
import { showSampleContent } from "@/lib/feature-flags";
import { siteConfig, absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/gioi-thieu"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/services"), lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/tin-tuc"), lastModified, changeFrequency: "daily", priority: 0.8 },
    { url: absoluteUrl("/contact"), lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/chinh-sach-bao-mat"), lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/dieu-khoan-su-dung"), lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/chinh-sach-cookie"), lastModified, changeFrequency: "yearly", priority: 0.3 },
    // /stories chỉ đưa vào sitemap khi đã có case study thật.
    ...(showSampleContent
      ? [{ url: absoluteUrl("/stories"), lastModified, changeFrequency: "monthly" as const, priority: 0.6 }]
      : []),
  ];

  const serviceRoutes: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: absoluteUrl(`/services/${slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
