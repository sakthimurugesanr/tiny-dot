import { PageHeading } from "@/components/ui/page-heading";
import { WorkGallery } from "@/components/portfolio/work-gallery";
import { BookingButton } from "@/components/booking/booking-provider";
export const metadata = {
  title: "Our Work",
  description:
    "Explore photographs and studio films from the Tiny Dot’s handmade miniature collection.",
  alternates: { canonical: "/portfolio" },
};
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await searchParams;
  return (
    <>
      <PageHeading
        eyebrow="Real models. Little details."
        title="The work,"
        accent="up close."
        description="A curated collection of photographs and films. Explore vehicle miniatures, homes, architectural models and moments from the making process."
      />
      <section className="section real-work-section">
        <WorkGallery
          key={view || "photos"}
          initialType={view === "videos" ? "videos" : "photos"}
        />
      </section>
      <section className="section brief-banner enhanced-cta">
        <span className="eyebrow">Inspired by a little detail?</span>
        <h2>Let’s make it personal.</h2>
        <p>
          Bring your references and your idea. We’ll talk through a miniature of
          your own.
        </p>
        <BookingButton>Book an appointment</BookingButton>
      </section>
    </>
  );
}
