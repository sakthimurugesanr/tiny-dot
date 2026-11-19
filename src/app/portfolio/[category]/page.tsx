import { notFound } from "next/navigation";
import { categories } from "@/data/projects";
import { PageHeading } from "@/components/ui/page-heading";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { ButtonLink } from "@/components/ui/button";
export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const c = categories.find((c) => c.slug === category);
  return {
    title: c?.name,
    description: c?.description,
    alternates: { canonical: `/portfolio/${category}` },
  };
}
async function PageContent({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const c = categories.find((c) => c.slug === category);
  if (!c) notFound();
  return (
    <>
      <PageHeading
        section="Portfolio"
        eyebrow={c.name}
        title="A little more"
        accent="imagination."
        description={c.description}
        demo
      />
      <section className="section">
        <PortfolioGrid key={category} initial={category} filter={false} />
      </section>
      <section className="commission-preview section">
        <h2>
          A world <em>with your story.</em>
        </h2>
        <p>Let’s explore a unique direction for your own miniature.</p>
        <ButtonLink href="/commissions">Start a conversation</ButtonLink>
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
