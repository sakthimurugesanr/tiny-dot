"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects, categories } from "@/data/projects";

export function PortfolioGrid({
  initial = "all",
  filter = true,
}: {
  initial?: string;
  filter?: boolean;
}) {
  const [category, setCategory] = useState(initial);
  const [layout, setLayout] = useState("editorial");
  const items = projects.filter(
    (p) => category === "all" || p.category === category,
  );
  return (
    <div>
      {filter && (
        <div className="gallery-toolbar">
          <div
            className="filters"
            role="group"
            aria-label="Filter artwork by category"
          >
            {[{ name: "All projects", slug: "all" }, ...categories].map((c) => (
              <button
                key={c.slug}
                onClick={() => setCategory(c.slug)}
                aria-pressed={category === c.slug}
              >
                {c.name}
              </button>
            ))}
          </div>
          <div
            className="grid-options"
            role="group"
            aria-label="Project grid layout"
          >
            {["editorial", "compact"].map((value) => (
              <button
                key={value}
                onClick={() => setLayout(value)}
                aria-pressed={layout === value}
              >
                {value === "editorial" ? "Gallery view" : "Compact view"}
              </button>
            ))}
          </div>
        </div>
      )}
      <p className="gallery-count" role="status">
        Explore the concept collection
      </p>
      <div className={`portfolio-grid project-grid-${layout}`}>
        {items.map((p) => (
          <article className="portfolio-card" key={p.slug}>
            <Link
              className="project-image-link"
              href={`/portfolio/project/${p.slug}`}
              aria-label={`Explore ${p.name}`}
            >
              <div className="portfolio-image">
                <Image
                  src={p.image}
                  alt={`${p.name} — miniature concept illustration`}
                  fill
                  sizes="(max-width: 600px) 92vw, (max-width: 1000px) 44vw, 40vw"
                />
              </div>
            </Link>
            <div className="project-card-copy">
              <span className="eyebrow">
                {p.kind} · {p.scale}
              </span>
              <h2>
                <Link href={`/portfolio/project/${p.slug}`}>{p.name}</Link>
              </h2>
              <p>{p.concept}</p>
              <span className="project-materials">
                {p.dimensions} · {p.materials}
              </span>
              <div className="project-card-links">
                <Link href={`/portfolio/project/${p.slug}`}>View project</Link>
                <Link href={`/commissions?project=${p.slug}`}>
                  Request similar
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
