import Link from "next/link";
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
      <div className="breadcrumbs">
        <Link href="/">Home</Link>
        <span>/</span>
        {section && (
          <>
            <Link href={`/${section.toLowerCase()}`}>{section}</Link>
            <span>/</span>
          </>
        )}
        <span>{eyebrow}</span>
      </div>
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
