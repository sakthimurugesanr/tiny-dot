import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Plus, PackageCheck, Clock3 } from "lucide-react";
import catalogue from "@/app/json_data/tiny_dot_miniature_services_catalog.json";
import { PageHeading } from "@/components/ui/page-heading";
import { BookingButton } from "@/components/booking/booking-provider";
import { serviceOptions, serviceSlug } from "@/data/services";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return catalogue.services.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = catalogue.services.find((item) => item.slug === slug);
  return service
    ? {
        title: service.name,
        description: service.short_description,
        alternates: { canonical: `/services/${slug}` },
      }
    : {};
}
export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = catalogue.services.find((item) => item.slug === slug);
  if (!service) notFound();
  const category = catalogue.service_categories.find(
    (item) => item.id === service.category_id,
  );
  const bookingService =
    serviceOptions.find((name) => serviceSlug(name) === slug) || "Other";
  const timing = service.indicative_timeline;
  return (
    <>
      <PageHeading
        eyebrow={category?.name || "Miniature services"}
        title={service.name}
        description={service.short_description}
        section="Services"
      />
      <section className="section service-detail-overview">
        <div>
          <span className="eyebrow">The details make it yours</span>
          <h2>A little more personal.</h2>
          <p>{service.detailed_description}</p>
          <div className="customization-chips">
            {service.customization_options.map((option) => (
              <span key={option}>{option}</span>
            ))}
          </div>
          <h3>What to bring</h3>
          <ul className="service-reference-list">
            {service.customer_requirements.map((requirement) => (
              <li key={requirement}>
                <Plus size={15} aria-hidden="true" />
                {requirement}
              </li>
            ))}
          </ul>
        </div>
        <aside className="service-quote-card">
          <span className="eyebrow">Your project, at a glance</span>
          <h3>{service.price_display}</h3>
          <p>
            <PackageCheck size={20} />
            {service.deliverable}
          </p>
          <p>
            <Clock3 size={20} />
            <span>
              <strong>
                {timing.production_working_days_min}–
                {timing.production_working_days_max} working days
              </strong>
              <br />
              Indicative production after approved design and complete inputs.
            </span>
          </p>
          <small>
            Approval waiting time, sourcing and delivery are additional. We
            confirm feasibility, price and the delivery window with your quote.
          </small>
          <BookingButton service={bookingService}>
            Request a custom quote
          </BookingButton>
          <Link href="/services" className="text-link">
            Explore all services
          </Link>
        </aside>
      </section>
      <section className="section service-detail-process">
        <div className="section-heading">
          <div>
            <span className="eyebrow">From first idea to finished piece</span>
            <h2>How it comes together.</h2>
          </div>
          <p>
            Explore each stage. Scope, approvals and timing are agreed before
            production begins.
          </p>
        </div>
        <div className="service-process-list">
          {service.process_steps.map((step) => (
            <details key={step.stage}>
              <summary>
                {step.title}
                <Plus size={17} />
              </summary>
              <p>{step.customer_action}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="section service-care-grid">
        <article>
          <span className="eyebrow">Packed with care</span>
          <h3>Ready for its journey.</h3>
          <p>
            {service.packaging_and_delivery}. Shipping availability and costs
            are confirmed with your quote.
          </p>
        </article>
        <article>
          <span className="eyebrow">A little aftercare</span>
          <h3>Keep the details beautiful.</h3>
          <p>{service.care_guidance}.</p>
        </article>
      </section>
    </>
  );
}
