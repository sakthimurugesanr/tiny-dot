import Link from "next/link";
import { ChevronRight, House } from "lucide-react";
export function PageHeading({
  eyebrow,
  title,
  accent,
  description,
  demo = false,
  section,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  demo?: boolean;
  section?: string;
}) {
  return (
    <section className="page-hero">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">
          <House size={14} aria-hidden="true" /> Home
        </Link>
        <ChevronRight size={14} aria-hidden="true" />
        {section && (
          <>
            <Link href={`/${section.toLowerCase()}`}>{section}</Link>
            <ChevronRight size={14} aria-hidden="true" />
          </>
        )}
        <span aria-current="page">{eyebrow}</span>
      </nav>
      <span className="eyebrow">{eyebrow}</span>
      <h1>
        {title} {accent && <em>{accent}</em>}
      </h1>
      {description && <p>{description}</p>}
      {demo && (
        <div className="demo-note">
          Concept portfolio · AI-generated imagery · Proposed specifications
        </div>
      )}
    </section>
  );
}
