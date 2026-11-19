import { BookingForm } from "@/components/booking/booking-form";
export function CommissionForm({
  project,
  serviceType,
  available,
}: {
  project?: string;
  serviceType?: string;
  available: boolean;
}) {
  return (
    <section className="section booking-page-section">
      <div className="booking-page-aside">
        <span className="eyebrow">A SIMPLE FIRST STEP</span>
        <h2>
          Big ideas.
          <br />
          Small beginnings.
        </h2>
        <p>
          Share a few details and request a convenient time to talk. We’ll
          discuss your idea before any work or payment is agreed.
        </p>
        <ul>
          <li>Custom buses, homes and craft models</li>
          <li>References and personal details welcome</li>
          <li>Pricing and timing discussed directly</li>
          <li>No payment required to send a request</li>
        </ul>
        <a href="tel:+917094341480">Prefer a call? 7094341480</a>
      </div>
      <div className="booking-page-card">
        <BookingForm
          service={serviceType}
          project={project}
          available={available}
        />
      </div>
    </section>
  );
}
