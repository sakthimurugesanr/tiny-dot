import { bookingStorageDir } from "@/lib/server/booking-storage";
import { PageHeading } from "@/components/ui/page-heading";
import { CommissionForm } from "@/components/commissions/commission-form";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Book a Consultation",
  description:
    "Share your requirements for a handmade vehicle miniature, home model, academic project or bespoke craft piece.",
  alternates: { canonical: "/commissions" },
};
async function PageContent({
  searchParams,
}: {
  searchParams: Promise<{ project?: string; service?: string }>;
}) {
  const query = await searchParams;
  const project = projects.find((p) => p.slug === query.project);
  const service = services.find((s) => s.slug === query.service);
  const available = Boolean(bookingStorageDir());
  return (
    <>
      <PageHeading
        eyebrow="BOOKING REQUEST"
        title="Let’s talk"
        accent="about your miniature."
        description="A short form, a personal conversation. Share your idea and your preferred time to connect. We’ll confirm the details directly."
      />
      <CommissionForm
        available={available}
        project={project?.name}
        serviceType={service?.type}
      />
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
