import { PageHeading } from "@/components/ui/page-heading";
import ServiceCatalog from "@/components/portfolio/service-catalog";
import { BookingButton } from "@/components/booking/booking-provider";
export const metadata = {
  title: "Miniature Services",
  description:
    "Explore 40 miniature services: personalized figurines, architecture, dioramas, vehicles, corporate models, gifts, 3D printing and finishing.",
  alternates: { canonical: "/services" },
};
export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  return (
    <>
      <PageHeading
        eyebrow="Your idea, at a smaller scale"
        title="Miniature services."
        accent="Made around you."
        description="Seven creative categories. Forty ways to bring an idea to life. Find your starting point, explore the options and talk through the details with us."
      />
      <section className="section services-page">
        <ServiceCatalog key={category || "all"} initialCategory={category} />
      </section>
      <section className="section studio-quote">
        <span className="eyebrow">A note from the workbench</span>
        <blockquote>
          “The best place to start is with the detail that matters to you.”
        </blockquote>
        <p>A familiar colour, a meaningful place or a memory worth keeping.</p>
      </section>
      <section className="section brief-banner enhanced-cta">
        <span className="eyebrow">Can’t find the exact idea?</span>
        <h2>Let’s work it out together.</h2>
        <p>
          You don’t need a finished plan. Bring a reference, a thought or a
          sketch, and we’ll discuss the possibilities.
        </p>
        <BookingButton>Talk about your idea</BookingButton>
      </section>
    </>
  );
}
