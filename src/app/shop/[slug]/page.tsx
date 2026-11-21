import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { PageHeading } from "@/components/ui/page-heading";
import { ButtonLink } from "@/components/ui/button";
import { ImageViewer } from "@/components/gallery/image-viewer";
export function generateStaticParams() {
  return projects.slice(0, 4).map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.slice(0, 4).find((p) => p.slug === slug);
  return {
    title: p?.name,
    description: p?.story,
    alternates: { canonical: `/shop/${slug}` },
  };
}
async function PageContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.slice(0, 4).find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <>
      <PageHeading
        section="Shop"
        eyebrow="The little gallery"
        title={p.name}
        description={p.story}
        demo
      />
      <section className="section editorial-split">
        <ImageViewer
          photos={[
            { src: p.image, caption: p.name + " — concept" },
            { src: p.detail, caption: "Illustrative material direction" },
          ]}
        />
        <div className="editorial-copy">
          <span className="eyebrow">Made-to-order concept</span>
          <h2>
            A world <em>worth keeping.</em>
          </h2>
          <p>{p.concept}</p>
          <dl className="project-specs" style={{ marginTop: 30 }}>
            {Object.entries({
              Materials: p.materials,
              "Proposed scale": p.scale,
              "Proposed dimensions": p.dimensions,
              Price: "Quoted after a scope review",
              Availability: "Concept direction, no physical stock",
              Edition: "Not specified",
              "Lead time": "Agreed per commission",
              Shipping: "Discussed before a booking",
            }).map(([key, val]) => (
              <div key={key}>
                <dt>{key}</dt>
                <dd>{val}</dd>
              </div>
            ))}
          </dl>
          <ButtonLink href={`/commissions?project=${p.slug}`} className="mt-8">
            Enquire about a similar piece
          </ButtonLink>
        </div>
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
