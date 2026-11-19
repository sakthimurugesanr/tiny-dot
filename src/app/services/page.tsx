import { PageHeading } from "@/components/ui/page-heading";
import ServiceCatalog from "@/components/portfolio/service-catalog";
import { BookingButton } from "@/components/booking/booking-provider";
export const metadata = {
  title: "Miniature Services",
  description:
    "Search vehicle miniatures, home models, academic projects and handcraft services. Find the right direction for your custom project.",
  alternates: { canonical: "/services" },
};
export default function ServicesPage() {
  return (
    <>
      <PageHeading
        eyebrow="YOUR IDEA, AT A SMALLER SCALE"
        title="A little craft."
        accent="A lot of possibility."
        description="Find the service that fits your idea. Explore what can be personalised, what references to bring and how to start a conversation about your model."
      />
      <section className="section services-page">
        <ServiceCatalog />
      </section>
      <section className="section studio-quote">
        <span className="eyebrow">A NOTE FROM THE WORKBENCH</span>
        <blockquote>
          “The best place to start is with the detail that matters to you.”
        </blockquote>
        <p>A familiar colour, a meaningful place or a memory worth keeping.</p>
      </section>
      <section className="section brief-banner enhanced-cta">
        <span className="eyebrow">CAN’T FIND THE EXACT IDEA?</span>
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
