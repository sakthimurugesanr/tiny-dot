import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { PageHeading } from "@/components/ui/page-heading";
import { ButtonLink } from "@/components/ui/button";
const ImageViewer = dynamic(() =>
  import("@/components/gallery/image-viewer").then((m) => m.ImageViewer),
);
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return {
    title: p?.name,
    description: p?.story,
    alternates: { canonical: `/portfolio/project/${slug}` },
    openGraph: { images: [p?.image || "/images/hero.webp"] },
  };
}
async function PageContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const p = projects[index];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return (
    <>
      <PageHeading
        section="Portfolio"
        eyebrow={p.kind}
        title={p.name}
        description={p.story}
        demo
      />
      <div className="project-hero-image">
        <Image
          src={p.image}
          alt={p.name + " concept scene"}
          fill
          priority
          sizes="100vw"
        />
      </div>
      <section className="section project-intro">
        <div data-reveal>
          <span className="eyebrow">THE ARTISTIC CONCEPT</span>
          <h2>
            A place to <em>get lost in.</em>
          </h2>
          <p>{p.concept}</p>
          <h3 style={{ marginTop: 35, marginBottom: 20 }}>
            From an idea to a world.
          </h3>
          <p>{p.process}</p>
        </div>
        <dl className="project-specs">
          {Object.entries({
            Project: p.name,
            Status: p.year,
            "Proposed scale": p.scale,
            "Proposed dimensions": p.dimensions,
            "Proposed materials": p.materials,
          }).map(([key, val]) => (
            <div key={key}>
              <dt>{key}</dt>
              <dd>{val}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-heading">
          <div>
            <span className="eyebrow">LOOK A LITTLE CLOSER</span>
            <h2>
              The world <em>in detail.</em>
            </h2>
          </div>
          <p>
            Open an image to explore.
            <br />
            Concept imagery; alternate crops are illustrative.
          </p>
        </div>
        <ImageViewer
          photos={[
            { src: p.image, caption: p.name + " — full concept" },
            { src: p.detail, caption: "Atmosphere and material study" },
            {
              src: "/images/workbench.webp",
              caption: "The imagined studio workbench",
            },
          ]}
        />
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="project-nav">
          <Link href={`/portfolio/project/${prev.slug}`}>
            <small>← PREVIOUS WORLD</small>
            {prev.name}
          </Link>
          <Link href={`/portfolio/project/${next.slug}`}>
            <small>NEXT WORLD →</small>
            {next.name}
          </Link>
        </div>
      </section>
      <section className="commission-preview section">
        <span className="eyebrow">YOUR STORY IS NEXT</span>
        <h2>
          What world do <em>you imagine?</em>
        </h2>
        <p>Every project begins with a conversation.</p>
        <ButtonLink href={`/commissions?project=${p.slug}`}>
          Discuss a similar commission
        </ButtonLink>
      </section>
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
