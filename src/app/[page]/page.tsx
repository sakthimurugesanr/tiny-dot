import { AboutStudio } from "@/components/studio/about-studio";
import { ContactStudio } from "@/components/studio/contact-studio";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { PageHeading } from "@/components/ui/page-heading";
import { ButtonLink } from "@/components/ui/button";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { Testimonials } from "@/components/home/interactions";
import { editorialPages, faqs } from "@/data/pages";
import { processSteps, journals, projects } from "@/data/projects";
const additional = [
  "creative-process",
  "exhibitions",
  "testimonials",
  "faq",
  "contact",
  "privacy",
  "terms",
  "journal",
  "shop",
];
const titles: Record<string, string> = {
  "creative-process": "The Creative Process",
  exhibitions: "Exhibitions & Collaborations",
  testimonials: "Thoughts in Miniature",
  faq: "Frequently Asked Questions",
  contact: "Contact the Studio",
  privacy: "Privacy Notice",
  terms: "Terms of Use",
  journal: "The Studio Journal",
  shop: "The Little Gallery",
};
export function generateStaticParams() {
  return [...Object.keys(editorialPages), ...additional].map((page) => ({
    page,
  }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const p = editorialPages[page];
  return {
    title:
      page === "about"
        ? "About the Studio"
        : p
          ? `${p.title} ${p.accent}`
          : titles[page],
    description: p?.description || `${titles[page]} at TINY DOT’S miniatures.`,
    alternates: { canonical: `/${page}` },
  };
}
async function PageContent({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  if (page === "about") return <AboutStudio />;
  if (page === "contact") return <ContactStudio />;
  const p = editorialPages[page];
  if (p)
    return (
      <>
        <PageHeading
          eyebrow={p.eyebrow}
          title={p.title}
          accent={p.accent}
          description={p.description}
          demo
        />
        <section className="section editorial-split">
          <div className="editorial-image" data-reveal>
            <Image
              src={p.image}
              alt={p.eyebrow + " — studio concept imagery"}
              fill
              priority
              sizes="(max-width: 768px) 90vw, 45vw"
            />
          </div>
          <div className="editorial-copy" data-reveal>
            <span className="eyebrow">Big stories. Tiny worlds.</span>
            <h2>{p.heading}</h2>
            {p.body.map((text) => (
              <p key={text}>{text}</p>
            ))}
            <Link href="/creative-process" className="text-link">
              Discover the creative process <ArrowUpRight size={17} />
            </Link>
          </div>
        </section>
        {p.category ? (
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="section-heading">
              <h2>
                Imagined <em>possibilities.</em>
              </h2>
            </div>
            <PortfolioGrid initial={p.category} filter={false} />
          </section>
        ) : (
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="section-heading">
              <h2>
                A studio <em>visual diary.</em>
              </h2>
            </div>
            <div className="social-grid">
              {projects.slice(0, 5).map((p) => (
                <Link key={p.slug} href={`/portfolio/project/${p.slug}`}>
                  <Image
                    src={p.image}
                    alt={p.name + " concept"}
                    fill
                    sizes="(max-width: 768px) 45vw,20vw"
                  />
                </Link>
              ))}
            </div>
          </section>
        )}
        {p.category && (
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="faq-list">
              {faqs.slice(1, 4).map(([q, a]) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </section>
        )}
        <CTA />
      </>
    );
  if (!additional.includes(page)) notFound();
  if (page === "creative-process")
    return (
      <>
        <PageHeading
          eyebrow="The creative process"
          title="From a little idea"
          accent="to a whole world."
          description="Slowly, thoughtfully, and one tiny detail at a time."
        />
        <section className="section process-full">
          <div className="process-list">
            {processSteps.map(([title, desc], i) => (
              <div key={title} data-reveal>
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <div
                    style={{
                      position: "relative",
                      aspectRatio: 2,
                      marginTop: 25,
                      maxWidth: 650,
                    }}
                  >
                    <Image
                      src={
                        [
                          "/images/cottage.webp",
                          "/images/architecture.webp",
                          "/images/workbench.webp",
                          "/images/workbench.webp",
                          "/images/cottage.webp",
                          "/images/photography.webp",
                        ][i]
                      }
                      alt={title + " — illustrative concept"}
                      fill
                      sizes="(max-width: 768px) 75vw, 55vw"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <CTA />
      </>
    );
  if (page === "faq")
    return (
      <>
        <PageHeading
          eyebrow="A little clarity"
          title="Big questions."
          accent="Thoughtful answers."
          description="A few things you might be wondering before creating your own little world."
        />
        <section className="section">
          <div className="faq-list">
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
        <CTA />
      </>
    );
  if (page === "testimonials")
    return (
      <>
        <PageHeading
          eyebrow="Thoughts in miniature"
          title="Little worlds."
          accent="Lasting feelings."
          description="The emotional direction behind the work. The sample quotes below are illustrative demo copy, not client reviews."
        />
        <Testimonials />
        <CTA />
      </>
    );
  if (page === "exhibitions")
    return (
      <>
        <PageHeading
          eyebrow="Beyond the workbench"
          title="Made to be"
          accent="shared."
          description="Exhibitions, creative collaborations, workshops and gallery stories."
        />
        <section className="section editorial-split">
          <div className="editorial-image">
            <Image
              src="/images/architecture.webp"
              alt="Architectural miniature concept for a future gallery presentation"
              fill
              sizes="45vw"
            />
          </div>
          <div className="editorial-copy">
            <span className="eyebrow">The next chapter</span>
            <h2>
              A space for <em>new connections.</em>
            </h2>
            <p>
              No exhibitions, awards or media features have been verified for
              this concept studio. Confirmed dates and recognition will appear
              here when available.
            </p>
            <p>
              Interested in a workshop, a gallery conversation or a creative
              collaboration? Share your idea with the studio.
            </p>
            <ButtonLink href="/contact" className="mt-8">
              Discuss a collaboration
            </ButtonLink>
          </div>
        </section>
      </>
    );
  if (page === "journal")
    return (
      <>
        <PageHeading
          eyebrow="Notes from a small world"
          title="The studio"
          accent="journal."
          description="Creative observations, little discoveries, and stories from the workbench."
        />
        <section className="section">
          <div className="journal-grid">
            {journals.map((j) => (
              <Link
                key={j.slug}
                href={`/journal/${j.slug}`}
                className="journal-card"
              >
                <div className="journal-image">
                  <Image
                    src={j.image}
                    alt={j.title}
                    fill
                    sizes="(max-width:768px) 90vw,33vw"
                  />
                </div>
                <span className="eyebrow">{j.tag}</span>
                <h3>
                  {j.title}
                  <ArrowUpRight size={18} />
                </h3>
                <p>{j.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      </>
    );
  if (page === "shop")
    return (
      <>
        <PageHeading
          eyebrow="The little gallery"
          title="Extraordinary things."
          accent="Worth keeping."
          description="An enquiry-based collection of concept directions. No finished stock, binding prices or checkout are offered."
          demo
        />
        <section className="section">
          <div className="portfolio-grid">
            {projects.slice(0, 4).map((p) => (
              <Link
                className="portfolio-card shop-card"
                href={`/shop/${p.slug}`}
                key={p.slug}
              >
                <div className="portfolio-image">
                  <Image
                    src={p.image}
                    alt={p.name + " concept"}
                    fill
                    sizes="45vw"
                  />
                </div>
                <span className="eyebrow">{p.kind}</span>
                <h2>{p.name}</h2>
                <p>Made-to-order concept · {p.scale}</p>
                <div className="availability">
                  Enquire about a similar piece ↗
                </div>
              </Link>
            ))}
          </div>
        </section>
      </>
    );
  return (
    <>
      <PageHeading
        eyebrow="Studio information"
        title={page === "privacy" ? "Your privacy," : "A few things,"}
        accent={
          page === "privacy" ? "thoughtfully considered." : "clearly stated."
        }
      />
      <section className="section">
        <div className="content-block">
          {page === "privacy" ? (
            <>
              <h2>About this website</h2>
              <p>
                This website presents Tiny Dot’s miniatures. The main work
                gallery contains client-supplied model photographs and films.
                Older concept pages are separately labelled as illustrations.
                Call 7094341480 for business enquiries.
              </p>
              <h2>Information you choose to share</h2>
              <p>
                A booking request includes your name, phone number, optional
                email, service, preferred date and call time, message, and
                contact consent. This information is used to review and respond
                to your request.
              </p>
              <h2>Storage and access</h2>
              <p>
                Booking requests on the self-hosted website are saved privately
                on the studio’s server and are not published. No external email
                or database service receives these details. Dates and times
                remain preferences until confirmed directly. Any reference links
                shared in a message are stored as text and are not automatically
                visited.
              </p>
              <h2>Preferences and technical information</h2>
              <p>
                The website uses a single light appearance. The server may use a
                hashed network identifier for short-term spam protection. No
                analytics or advertising integrations are included. Hosting
                providers may retain operational request logs under their own
                policies.
              </p>
              <h2>Your choices</h2>
              <p>
                Do not include sensitive documents or private information in
                reference links. You can stop completing the form at any time;
                drafts are not saved in your browser. Before launch, the
                operator must publish its identity, privacy contact, retention
                period and an access or deletion request process.
              </p>
            </>
          ) : (
            <>
              <h2>Concept portfolio</h2>
              <p>
                Tiny Dot’s miniatures offers custom handmade models and craft
                work. The separately labelled AI-generated inspiration imagery
                and proposed model specifications demonstrate a visual
                direction. They do not establish completed commissions, physical
                inventory, awards or exhibition history.
              </p>
              <h2>Commission enquiries</h2>
              <p>
                Submitting a request does not create an order, guarantee
                availability, fix a price or confirm a delivery date. Scope,
                materials, timeline, price, payment, approvals, cancellations
                and delivery must be agreed in writing before work begins.
              </p>
              <h2>Artwork and references</h2>
              <p>
                Only share reference material you own or have permission to use.
                Rights in any commissioned physical artwork, photography or
                reproduction must be stated in a separate project agreement.
              </p>
              <h2>Gallery and shipping</h2>
              <p>
                The gallery supports enquiries only. There is no online
                checkout. Proposed dimensions and scales are illustrative.
                Edition sizes, production time, packing and shipping terms will
                be confirmed for each real artwork.
              </p>
              <h2>Before a commercial launch</h2>
              <p>
                The operator must add verified business identity, applicable
                consumer terms, delivery policies and jurisdiction-specific
                information. These concept terms should be reviewed for the
                actual studio and its customers.
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
function CTA() {
  return (
    <section
      className="commission-preview section"
      style={{ background: "var(--secondary)" }}
    >
      <span className="eyebrow">The next little world could be yours</span>
      <h2>
        Let’s make <em>something meaningful.</em>
      </h2>
      <p>Bring your story. We’ll bring a little imagination.</p>
      <ButtonLink href="/commissions">Start a commission</ButtonLink>
    </section>
  );
}

export default async function Page(props: Parameters<typeof PageContent>[0]) {
  const content = await PageContent(props);
  return <>{content}</>;
}
