import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { editorialPages } from "@/data/pages";
import { projects, journals, categories } from "@/data/projects";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    ...Object.keys(editorialPages),
    "portfolio",
    "services",
    "commissions",
    "creative-process",
    "exhibitions",
    "testimonials",
    "faq",
    "contact",
    "privacy",
    "terms",
    "journal",
    "shop",
    ...categories.map((c) => `portfolio/${c.slug}`),
    ...projects.map((p) => `portfolio/project/${p.slug}`),
    ...projects.slice(0, 4).map((p) => `shop/${p.slug}`),
    ...journals.map((j) => `journal/${j.slug}`),
  ].map((path) => ({
    url: `${site.url}/${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
