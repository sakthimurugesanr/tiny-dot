import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { journals } from "@/data/projects";
import { PageHeading } from "@/components/ui/page-heading";
export function generateStaticParams() {
  return journals.map((j) => ({ slug: j.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const j = journals.find((j) => j.slug === slug);
  return {
    title: j?.title,
    description: j?.excerpt,
    alternates: { canonical: `/journal/${slug}` },
  };
}
async function PageContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const j = journals.find((j) => j.slug === slug);
  if (!j) notFound();
  return (
    <>
      <PageHeading
        section="Journal"
        eyebrow={j.tag}
        title={j.title}
        description="STUDIO NOTES · 4 MIN READ"
      />
      <div className="project-hero-image">
        <Image
          src={j.image}
          alt={j.title + " concept illustration"}
          fill
          priority
          sizes="100vw"
        />
      </div>
      <article className="section article-body">
        <div className="content-block">
          <p className="lead">{j.excerpt}</p>
          {j.paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
          <p className="small-note">
            An editorial studio note. Artwork imagery is AI-generated concept
            material.
          </p>
          <Link className="text-link" href="/journal">
            ← Back to all stories
          </Link>
        </div>
      </article>
    </>
  );
}

export default async function Page(props: Parameters<typeof PageContent>[0]) {
  const content = await PageContent(props);
  return (
    <>
      {content}
    </>
  );
}
