import type { MetadataRoute } from "next";
import { loadBreweryProducts } from "@/lib/brewery-products";
import { loadProjectCases } from "@/lib/project-cases";
import { getAbsoluteUrl } from "@/lib/site-config";
import { locales } from "@/lib/site-content";

const paths = ["", "/products", "/cases", "/news", "/about", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const projectCases = await loadProjectCases();
  const breweryProducts = loadBreweryProducts();

  const staticEntries = locales.flatMap((locale) =>
    paths.map((path) => {
      const freq = (path === "" ? "weekly" : "monthly") as "weekly" | "monthly";
      return {
        url: getAbsoluteUrl(`/${locale}${path}`),
        lastModified: now,
        changeFrequency: freq,
        priority: path === "" ? 1 : 0.7,
      };
    }),
  );

  const caseEntries = locales.flatMap((locale) =>
    projectCases.map((item) => ({
      url: getAbsoluteUrl(`/${locale}/cases/${encodeURIComponent(item.slug)}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );

  const productEntries = locales.flatMap((locale) =>
    breweryProducts.map((p) => ({
      url: getAbsoluteUrl(`/${locale}/products/${p.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );

  return [...staticEntries, ...caseEntries, ...productEntries];
}
