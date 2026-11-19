"use client";
import { memo } from "react";
import { BusFront, House, GraduationCap, Scissors, Check } from "lucide-react";
import { services } from "@/data/services";
import { BookingButton } from "@/components/booking/booking-provider";
const icons = {
  bus: BusFront,
  home: House,
  school: GraduationCap,
  craft: Scissors,
};
export const ServiceCard = memo(function ServiceCard({
  service,
}: {
  service: (typeof services)[number];
}) {
  const Icon = icons[service.icon as keyof typeof icons];
  return (
    <article className="service-card">
      <div className="service-card-top">
        <span className="service-icon">
          <Icon size={28} strokeWidth={1.5} />
        </span>
      </div>
      <div className="service-copy">
        <span className="service-purpose">{service.purpose}</span>
        <h3>{service.name}</h3>
        <p>{service.description}</p>
        <ul>
          {service.includes.map((item) => (
            <li key={item}>
              <Check size={14} />
              {item}
            </li>
          ))}
        </ul>
        <p className="service-brief-tip">
          <strong>A useful starting point:</strong> {service.brief}
        </p>
        <BookingButton service={service.type} className="service-booking">
          Let’s discuss this idea
        </BookingButton>
      </div>
    </article>
  );
});
export function ServiceGrid({
  items = services,
}: {
  items?: readonly (typeof services)[number][];
}) {
  return (
    <div className="service-grid">
      {items.map((service) => (
        <ServiceCard key={service.slug} service={service} />
      ))}
    </div>
  );
}
